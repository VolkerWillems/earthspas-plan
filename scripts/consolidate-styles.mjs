// Canonical repository-level style consolidation. Do not replace with registry generation.
import {
  existsSync,
  readFileSync,
  readdirSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { extname, join, relative } from "node:path";

const root = process.cwd();
const stylesDirectory = join(root, "styles");
const globalsPath = join(root, "app", "globals.css");
const packagePath = join(root, "package.json");
const componentsConfigPath = join(root, "components.json");
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

const expectedRegistries = {
  "@7ovr": "https://7ovr.com/r/{name}.json",
  "@bklit": "https://ui.bklit.com/r/{name}.json",
};

const sourceRoots = ["app", "components", "hooks", "lib", "scripts"];
const sourceExtensions = new Set([".cjs", ".js", ".jsx", ".mjs", ".ts", ".tsx"]);

function read(path) {
  return readFileSync(path, "utf8");
}

function readJson(path) {
  return JSON.parse(read(path));
}

function write(path, content) {
  writeFileSync(path, content.replace(/\r\n/g, "\n").trimEnd() + "\n");
}

function currentCssFiles() {
  return readdirSync(stylesDirectory)
    .filter((file) => file.endsWith(".css"))
    .sort();
}

function collectSourceFiles(directory) {
  if (!existsSync(directory)) return [];

  const files = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || entry.name === "node_modules") continue;

    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectSourceFiles(path));
      continue;
    }

    if (sourceExtensions.has(extname(entry.name))) files.push(path);
  }

  return files;
}

function assertCanonicalStyles() {
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
  if (globals.trim() !== '@import "../styles/index.css";') {
    throw new Error("app/globals.css must import only styles/index.css.");
  }

  const indexImports = [...index.matchAll(/^@import\s+"(\.\/[^\"]+\.css)";\s*$/gm)].map(
    (match) => match[1],
  );
  if (JSON.stringify(indexImports) !== JSON.stringify(["./components.css", "./responsive.css"])) {
    throw new Error("styles/index.css must import only components.css and responsive.css, in that order.");
  }

  const componentImports = [...components.matchAll(/^@import\s+"(\.\/[^\"]+\.css)";\s*$/gm)].map(
    (match) => match[1],
  );
  if (JSON.stringify(componentImports) !== JSON.stringify(["./theme.css"])) {
    throw new Error("styles/components.css must import only theme.css as a relative stylesheet.");
  }
}

function assertUiFoundation() {
  const packageJson = readJson(packagePath);
  const componentsConfig = readJson(componentsConfigPath);
  const directDependencies = {
    ...(packageJson.dependencies ?? {}),
    ...(packageJson.devDependencies ?? {}),
  };

  if (!directDependencies.motion) {
    throw new Error('The UI foundation requires the direct dependency "motion".');
  }
  if (directDependencies["framer-motion"]) {
    throw new Error('Do not add "framer-motion" as a direct dependency; use motion/react.');
  }

  for (const forbiddenScript of ["ui:add", "ui:sync"]) {
    if (packageJson.scripts?.[forbiddenScript]) {
      throw new Error(`Forbidden registry regeneration script detected: ${forbiddenScript}.`);
    }
  }

  for (const [name, command] of Object.entries(packageJson.scripts ?? {})) {
    if (command.includes("shadcn") && command.includes("--overwrite")) {
      throw new Error(`Package script ${name} may not run shadcn with --overwrite.`);
    }
  }

  for (const [registry, expectedUrl] of Object.entries(expectedRegistries)) {
    if (componentsConfig.registries?.[registry] !== expectedUrl) {
      throw new Error(`Registry ${registry} must remain configured as ${expectedUrl}.`);
    }
  }

  const files = sourceRoots.flatMap((directory) => collectSourceFiles(join(root, directory)));
  for (const path of files) {
    const projectPath = relative(root, path).replaceAll("\\", "/");
    if (projectPath === "scripts/consolidate-styles.mjs") continue;

    const content = read(path);
    if (/(?:from\s+|import\s*)["']framer-motion(?:\/[^"']*)?["']/.test(content)) {
      throw new Error(`Direct framer-motion import detected in ${projectPath}; use motion/react.`);
    }
    if (/shadcn(?:@[\w.-]+)?\s+add\b[^\n]*--overwrite/.test(content)) {
      throw new Error(`Unsafe shadcn --overwrite command detected in ${projectPath}.`);
    }

    const cssImports = [...content.matchAll(/(?:import\s+|from\s+)["']([^"']+\.css)["']/g)].map(
      (match) => match[1],
    );
    for (const cssImport of cssImports) {
      const allowedGlobalImport = projectPath === "app/layout.tsx" && cssImport === "./globals.css";
      if (!allowedGlobalImport) {
        throw new Error(`Unexpected component-level CSS import ${cssImport} in ${projectPath}.`);
      }
    }
  }
}

function assertFoundation() {
  assertCanonicalStyles();
  assertUiFoundation();
}

if (checkOnly) {
  assertFoundation();
  console.log("UI foundation valid: four stylesheets, approved registries and one motion library.");
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

assertFoundation();
console.log("Consolidated and validated the Earth Spas UI foundation.");
