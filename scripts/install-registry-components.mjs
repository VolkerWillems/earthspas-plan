import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const expectedWorldCard = join(root, "components", "stat-card-choropleth.tsx");

if (existsSync(expectedWorldCard)) {
  console.log("Official registry components already exist; skipping installation.");
  process.exit(0);
}

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
console.log("ChartBrush ships with @bklit/line-chart and is not a separate registry item.");

execFileSync(
  "npx",
  ["--yes", "shadcn@latest", "add", ...items, "-y"],
  {
    cwd: root,
    input: "n\n".repeat(200),
    stdio: ["pipe", "inherit", "inherit"],
    shell: process.platform === "win32",
    env: {
      ...process.env,
      CI: "true",
      npm_config_ignore_scripts: "true",
    },
  },
);

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

const generated = collectFiles(join(root, "components"))
  .filter((path) => /(timeline|integration|how-it|stat-card|chart|funnel|pie|brush|legend|grid)/i.test(path))
  .sort();

console.log("Generated registry files:");
for (const file of generated) console.log(`  - ${file}`);
