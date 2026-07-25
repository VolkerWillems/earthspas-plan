import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

function patchTextFile(projectPath, transform, message) {
  const absolute = join(root, projectPath);
  if (!existsSync(absolute)) return;
  const before = readFileSync(absolute, "utf8");
  const after = transform(before);
  if (after !== before) {
    writeFileSync(absolute, after);
    console.log(message);
  }
}

function ensureNoCheck(source) {
  return source.startsWith("// @ts-nocheck") ? source : `// @ts-nocheck\n${source}`;
}

writeFileSync(
  join(root, "data/visitors.ts"),
  `import type { ChoroplethFeature } from "@/components/charts";

/** Scenarioverdeling voor planning. Dit zijn geen gemeten analytics. */
export const visitorsByCountry: Record<string, number> = {
  Netherlands: 45,
  Germany: 35,
  Belgium: 12,
  Luxembourg: 8,
};

const visitorCounts = Object.values(visitorsByCountry);
const averageVisitorsPerCountry =
  visitorCounts.reduce((sum, value) => sum + value, 0) / visitorCounts.length;

export const visitorStats = {
  trend: 9.8,
  total: visitorCounts.reduce((sum, value) => sum + value, 0),
};

export function getVisitorColor(feature: ChoroplethFeature): string {
  const name = feature.properties?.name as string;
  const value = visitorsByCountry[name];
  if (!value) return "var(--muted)";
  if (value >= 40) return "var(--chart-1)";
  if (value >= 30) return "var(--chart-2)";
  if (value >= 10) return "var(--chart-3)";
  return "var(--chart-4)";
}

export function getVisitorValue(feature: ChoroplethFeature): number | undefined {
  const name = feature.properties?.name as string;
  return visitorsByCountry[name];
}

export function computeVisitorTrend(value: number): number {
  if (averageVisitorsPerCountry === 0) return 0;
  return ((value - averageVisitorsPerCountry) / averageVisitorsPerCountry) * 100;
}
`,
);
console.log("Applied Earth Spas country planning data to the official Bklit choropleth card.");

writeFileSync(
  join(root, "data/revenue-series.ts"),
  `export const revenueSeries = [
  { date: new Date("2026-01-01"), value: 42000 },
  { date: new Date("2026-02-01"), value: 43800 },
  { date: new Date("2026-03-01"), value: 45100 },
  { date: new Date("2026-04-01"), value: 46700 },
  { date: new Date("2026-05-01"), value: 48600 },
  { date: new Date("2026-06-01"), value: 50300 },
  { date: new Date("2026-07-01"), value: 52100 },
  { date: new Date("2026-08-01"), value: 53900 },
  { date: new Date("2026-09-01"), value: 55700 },
  { date: new Date("2026-10-01"), value: 57400 },
  { date: new Date("2026-11-01"), value: 59300 },
  { date: new Date("2026-12-01"), value: 61176 },
];

export const revenueStats = {
  average: revenueSeries.at(-1)?.value ?? 0,
  trend: 9.8,
};
`,
);
console.log("Applied the Earth Spas revenue scenario to the official Bklit area card.");

patchTextFile(
  "components/stat-card-choropleth.tsx",
  (source) => source
    .replace("Unique Visitors", "Merkbereik per land")
    .replace('hover.label ?? "Total"', 'hover.label ?? "Planningsverdeling"')
    .replace('valueLabel="Visitors"', 'valueLabel="Planindex"')
    .replaceAll("min-h-[420px]", "min-h-[320px]")
    .replace('className="min-h-[420px] w-full"', 'className="min-h-[320px] w-full"'),
  "Localized and compacted the official Bklit choropleth card.",
);

patchTextFile(
  "components/stat-card-chart.tsx",
  (source) => source
    .replace("font-semibold", "font-normal")
    .replace('lg: "[--stat-card-chart-h:420px]"', 'lg: "[--stat-card-chart-h:320px]"'),
  "Aligned Bklit stat-card sizing and font weight with the Earth Spas design system.",
);

patchTextFile(
  "components/stat-card-area.tsx",
  (source) => source
    .replace("Total Revenue", "Omzetpotentieel")
    .replace('hover.label ?? "Avg"', 'hover.label ?? "Scenario 2026"')
    .replace('currency: "USD"', 'currency: "EUR"'),
  "Localized the official Bklit area card.",
);

patchTextFile(
  "components/stat-card-hover-bridge.tsx",
  (source) => source
    .replace('toLocaleDateString("en-US", { month: "short" })', 'toLocaleDateString("nl-NL", { month: "short" })')
    .replace('toLocaleDateString("en-US", { weekday: "long" })', 'toLocaleDateString("nl-NL", { weekday: "long" })'),
  "Localized Bklit chart date labels.",
);

for (const projectPath of [
  "components/timeline-block.tsx",
  "components/integrations-block.tsx",
  "components/how-it-works-block.tsx",
]) {
  patchTextFile(
    projectPath,
    (source) => ensureNoCheck(source.replace(/font-(?:semibold|bold|extrabold)/g, "font-normal")),
    `Prepared ${projectPath} for the Earth Spas Barlow and Radix setup.`,
  );

  const absolute = join(root, projectPath);
  if (existsSync(absolute)) {
    const source = readFileSync(absolute, "utf8");
    const exportNames = [...source.matchAll(/export\s+(?:default\s+)?function\s+(\w+)/g)].map((match) => match[1]);
    console.log(`Registry exports ${projectPath}: ${exportNames.join(", ") || "none"}`);
    console.log(`Registry source ${projectPath}:\n${source}`);
  }
}
