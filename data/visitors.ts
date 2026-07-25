import type { ChoroplethFeature } from "@/components/charts/choropleth/choropleth-context";

/** Scenarioverdeling voor planning. Dit zijn geen gemeten analytics. */
export const visitorsByCountry: Record<string, number> = {
  Netherlands: 45,
  Germany: 35,
  Belgium: 12,
  Luxembourg: 8,
};

const visitorCounts = Object.values(visitorsByCountry);
const averageVisitorsPerCountry = visitorCounts.reduce((sum, value) => sum + value, 0) / visitorCounts.length;

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
  return visitorsByCountry[feature.properties?.name as string];
}

export function computeVisitorTrend(value: number): number {
  if (averageVisitorsPerCountry === 0) return 0;
  return ((value - averageVisitorsPerCountry) / averageVisitorsPerCountry) * 100;
}
