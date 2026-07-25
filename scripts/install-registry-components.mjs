import { execFileSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, relative } from "node:path";

const root = process.cwd();
const expectedWorldCard = join(root, "components", "stat-card-choropleth.tsx");
const tsconfigPath = join(root, "tsconfig.json");

if (existsSync(expectedWorldCard)) {
  console.log("Official registry components already exist; skipping installation.");
  process.exit(0);
}

function snapshotDirectory(directory, snapshot = new Map()) {
  if (!existsSync(directory)) return snapshot;
  for (const entry of readdirSync(directory)) {
    const absolute = join(directory, entry);
    if (statSync(absolute).isDirectory()) {
      snapshotDirectory(absolute, snapshot);
      continue;
    }
    const projectPath = relative(root, absolute).replaceAll("\\", "/");
    if (projectPath === "app/globals.css") continue;
    snapshot.set(projectPath, readFileSync(absolute));
  }
  return snapshot;
}

function restoreSnapshot(snapshot) {
  for (const [projectPath, content] of snapshot) {
    const absolute = join(root, projectPath);
    mkdirSync(dirname(absolute), { recursive: true });
    writeFileSync(absolute, content);
  }
}

const sourceSnapshot = new Map();
for (const directory of ["app", "components", "lib", "data"]) {
  snapshotDirectory(join(root, directory), sourceSnapshot);
}
sourceSnapshot.set("tsconfig.json", readFileSync(tsconfigPath));
console.log(`Protected ${sourceSnapshot.size} existing Earth Spas source files.`);

async function registryItemExists(baseUrl, name) {
  const response = await fetch(`${baseUrl}/${name}.json`, { method: "GET" });
  return response.ok;
}

async function findFirstRegistryItem(baseUrl, candidates, label) {
  for (const candidate of candidates) {
    try {
      if (await registryItemExists(baseUrl, candidate)) {
        console.log(`Resolved ${label}: ${candidate}`);
        return candidate;
      }
    } catch (error) {
      console.warn(`Could not probe ${candidate}:`, error instanceof Error ? error.message : error);
    }
  }
  throw new Error(`No registry item found for ${label}. Tried: ${candidates.join(", ")}`);
}

function numberedCandidates(prefixes, max = 12) {
  const values = [];
  for (let index = 1; index <= max; index += 1) {
    for (const prefix of prefixes) values.push(`${prefix}-${index}`);
  }
  return values;
}

const integrationBlock = await findFirstRegistryItem(
  "https://7ovr.com/r",
  numberedCandidates(["integrations", "integration"]),
  "7Ovr integrations block",
);
const howItWorksBlock = await findFirstRegistryItem(
  "https://7ovr.com/r",
  numberedCandidates(["how-it-works"]),
  "7Ovr how-it-works block",
);

const items = [
  "@7ovr/timeline-1",
  `@7ovr/${integrationBlock}`,
  `@7ovr/${howItWorksBlock}`,
  "@bklit/stat-card-area-01",
  "@bklit/stat-card-choropleth-01",
  "@bklit/line-chart",
  "@bklit/funnel-chart",
  "@bklit/pie-chart",
  "@bklit/legend",
  "@bklit/grid",
];

console.log("Installing official registry items:");
for (const item of items) console.log(`  - ${item}`);
console.log("ChartBrush ships with the Bklit time-series stack and is not a standalone registry item.");

const installEnvironment = {
  ...process.env,
  CI: "true",
  NODE_ENV: "development",
  npm_config_ignore_scripts: "true",
  npm_config_omit: "",
  npm_config_production: "false",
};

execFileSync("npx", ["--yes", "shadcn@latest", "add", ...items, "-y"], {
  cwd: root,
  input: "n\n".repeat(200),
  stdio: ["pipe", "inherit", "inherit"],
  shell: process.platform === "win32",
  env: installEnvironment,
});

restoreSnapshot(sourceSnapshot);
console.log("Restored the existing Earth Spas application source over the generated registry files.");

execFileSync("npm", ["install", "--include=dev", "--ignore-scripts"], {
  cwd: root,
  stdio: "inherit",
  shell: process.platform === "win32",
  env: installEnvironment,
});
console.log("Restored production and build dependencies after registry installation.");

const trendBadgePath = join(root, "components", "trend-badge.tsx");
if (existsSync(trendBadgePath)) {
  let source = readFileSync(trendBadgePath, "utf8");
  source = source.replace('import { CentralIcon } from "@central-icons-react/all";\n', "");
  source = source.replace(
    /\s*<CentralIcon[\s\S]*?\/>/m,
    '\n      <span aria-hidden="true" className="text-[11px] leading-none">{positive ? "↑" : "↓"}</span>',
  );
  source = source.replace(/font-semibold/g, "font-normal");
  writeFileSync(trendBadgePath, source);
  console.log("Replaced the licensed Central Icons trend glyph with a local arrow.");
}

function collectFiles(directory, output = []) {
  if (!existsSync(directory)) return output;
  for (const entry of readdirSync(directory)) {
    const absolute = join(directory, entry);
    if (statSync(absolute).isDirectory()) collectFiles(absolute, output);
    else output.push(relative(root, absolute).replaceAll("\\", "/"));
  }
  return output;
}

for (const required of [
  "lib/phosphor-icons.ts",
  "components/site-state.tsx",
  "lib/site-model.ts",
  "lib/choice-data.ts",
  "lib/utils.ts",
  "components/stat-card-choropleth.tsx",
  "components/stat-card-area.tsx",
  "components/timeline-block.tsx",
  "components/integrations-block.tsx",
  "components/how-it-works-block.tsx",
]) {
  if (!existsSync(join(root, required))) {
    throw new Error(`Required file missing after registry installation: ${required}`);
  }
}

const generated = collectFiles(join(root, "components"))
  .filter((path) => /(timeline|integration|how-it|stat-card|chart|funnel|pie|brush|legend|grid)/i.test(path))
  .sort();

console.log("Generated registry files:");
for (const file of generated) console.log(`  - ${file}`);
