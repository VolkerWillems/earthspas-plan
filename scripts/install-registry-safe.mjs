import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const protectedCssFiles = [
  "app/globals.css",
  "styles/global.css",
  "styles/theme.css",
  "styles/responsive.css",
  "styles/motion.css",
];
const snapshots = new Map();

for (const projectPath of protectedCssFiles) {
  const absolute = join(root, projectPath);
  if (existsSync(absolute)) snapshots.set(absolute, readFileSync(absolute));
}

function run(script) {
  execFileSync(process.execPath, [join(root, script)], {
    cwd: root,
    stdio: "inherit",
    env: process.env,
  });
}

try {
  run("scripts/install-registry-components.mjs");
  run("scripts/customize-registry-components.mjs");
  run("scripts/normalize-registry-layout.mjs");
  if (existsSync(join(root, "scripts/enhance-visual-system.mjs"))) {
    run("scripts/enhance-visual-system.mjs");
  }
} finally {
  for (const [absolute, content] of snapshots) writeFileSync(absolute, content);
  console.log("Restored the canonical styles-folder CSS architecture after registry generation.");
}
