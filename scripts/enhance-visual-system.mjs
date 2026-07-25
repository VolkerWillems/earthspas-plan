import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

function patch(projectPath, transform) {
  const absolute = join(root, projectPath);
  if (!existsSync(absolute)) return;
  const before = readFileSync(absolute, "utf8");
  const after = transform(before);
  if (after !== before) writeFileSync(absolute, after);
}

patch("app/page.tsx", (source) => source
  .replace("€35,90 leverde 287 page views op", "€35,90 leverde 287 landingspaginaweergaven op")
  .replace("gemiddeld €0,13 per page view.", "gemiddeld €0,13 per landingspaginaweergave.")
  .replace(">per landing<", ">per landingspaginaweergave<")
  .replace(">Landingspagina<", ">Landingspaginaweergaven<")
  .replace(">Kosten per view<", ">Kosten per weergave<")
  .replace('className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_.85fr]"', 'className="investment-grid mt-6 grid gap-6 xl:grid-cols-[1.15fr_.85fr]"'));

patch("app/software/page.tsx", (source) => source
  .replace('className="mt-9 grid gap-5 xl:grid-cols-2"', 'className="software-choice-grid mt-9 grid gap-5 xl:grid-cols-2"'));

patch("data/visitors.ts", (source) => source
  .replace('if (!value) return "var(--muted)";', 'if (!value) return "var(--chart-land)";'));

patch("components/stat-card-choropleth.tsx", (source) => source
  .replace('className="relative w-full gap-0 overflow-hidden py-0"', 'className="growth-map-card relative w-full gap-0 overflow-hidden py-0"')
  .replaceAll('min-h-[320px]', 'min-h-[var(--growth-map-height)]')
  .replace('aspectRatio="2.5 / 1"', 'aspectRatio="1.7 / 1"')
  .replace('displayLabel = hover.label ?? "Planningsverdeling"', 'displayLabel = hover.label ?? "Scenarioverdeling"'));

patch("components/stat-card-area.tsx", (source) => source
  .replace('className="w-full gap-0 py-0"', 'className="growth-revenue-card w-full gap-0 py-0"'));

console.log("Applied Earth Spas fluid layout and visual enhancements.");
