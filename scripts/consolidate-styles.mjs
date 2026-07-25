// Canonical repository-level style consolidation. Do not replace with registry generation.
import {
  existsSync,
  readFileSync,
  readdirSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const stylesDirectory = join(root, "styles");
const globalsPath = join(root, "app", "globals.css");
const checkOnly = process.argv.includes("--check");

const canonicalFiles = [
  "components.css",
  "index.css",
  "responsive.css",
  "theme.css",
].sort();

const mergedSources = [
  {
    file: "ui.css",
    marker: "/* MERGED SOURCE: ui.css */",
  },
  {
    file: "cards.css",
    marker: "/* MERGED SOURCE: cards.css */",
  },
];

function read(path) {
  return readFileSync(path, "utf8");
}

function write(path, content) {
  writeFileSync(path, content.replace(/\r\n/g, "\n").trimEnd() + "\n");
}

function currentCssFiles() {
  return readdirSync(stylesDirectory)
    .filter((file) => file.endsWith(".css"))
    .sort();
}

function assertCanonical() {
  const files = currentCssFiles();
  if (JSON.stringify(files) !== JSON.stringify(canonicalFiles)) {
    throw new Error(
      `Styles contract violated. Expected exactly: ${canonicalFiles.join(", ")}. Found: ${files.join(", ")}`,
    );
  }

  const index = read(join(stylesDirectory, "index.css"));
  const components = read(join(stylesDirectory, "components.css"));
  const globals = read(globalsPath);

  if (/^@import\s+"\.\/(?:ui|cards|flows|charts|motion|motion-base)\.css";/m.test(index)) {
    throw new Error("styles/index.css still imports a retired stylesheet.");
  }
  if (components.includes('@import "./motion.css";')) {
    throw new Error("styles/components.css still imports retired motion.css.");
  }
  if (globals.includes("styles/cards.css")) {
    throw new Error("app/globals.css still imports retired styles/cards.css.");
  }
}

if (checkOnly) {
  assertCanonical();
  console.log("Styles contract valid: exactly four canonical CSS files.");
  process.exit(0);
}

const indexPath = join(stylesDirectory, "index.css");
const componentsPath = join(stylesDirectory, "components.css");

let index = read(indexPath);
let components = read(componentsPath);
let globals = read(globalsPath);

index = index.replace(
  /^@import\s+"\.\/(?:components|responsive|flows|charts|ui|cards|motion|motion-base)\.css";\s*$/gm,
  "",
);
index = `@import "./components.css";\n@import "./responsive.css";\n\n${index.trimStart()}`;

for (const { file, marker } of mergedSources) {
  const sourcePath = join(stylesDirectory, file);
  if (!existsSync(sourcePath) || index.includes(marker)) continue;
  index += `\n\n${marker}\n${read(sourcePath).trim()}\n`;
}

components = components.replace(/^@import\s+"\.\/motion\.css";\s*$/m, "");
globals = globals.replace(/^@import\s+"\.\.\/styles\/cards\.css";\s*$/m, "");

write(indexPath, index);
write(componentsPath, components);
write(globalsPath, globals);

for (const file of currentCssFiles()) {
  if (canonicalFiles.includes(file)) continue;
  unlinkSync(join(stylesDirectory, file));
  console.log(`Removed retired stylesheet: styles/${file}`);
}

assertCanonical();
console.log("Consolidated styles into four canonical CSS files.");
