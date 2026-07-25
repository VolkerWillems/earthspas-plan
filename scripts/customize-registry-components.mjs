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

function insertOnce(source, anchor, insertion) {
  if (source.includes(insertion.trim())) return source;
  if (!source.includes(anchor)) throw new Error(`Patch anchor not found: ${anchor.slice(0, 80)}`);
  return source.replace(anchor, `${insertion}${anchor}`);
}

writeFileSync(
  join(root, "data/visitors.ts"),
  `import type { ChoroplethFeature } from "@/components/charts/choropleth/choropleth-context";

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
`,
);

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

writeFileSync(
  join(root, "components/stat-card-choropleth-hover-bridge.tsx"),
  `"use client";

import { useEffect } from "react";
import { useChoropleth } from "@/components/charts/choropleth/choropleth-context";
import { computeVisitorTrend, getVisitorValue } from "@/data/visitors";
import type { StatCardHoverState } from "@/components/stat-card-chart";

export function StatCardChoroplethHoverBridge({ onHoverChange }: { onHoverChange: (state: StatCardHoverState) => void }) {
  const { tooltipData } = useChoropleth();

  useEffect(() => {
    if (!tooltipData?.feature) {
      onHoverChange({ value: null, label: null, trend: null });
      return;
    }
    const feature = tooltipData.feature;
    const label = (feature.properties?.name as string | undefined) ?? "Onbekend";
    const value = getVisitorValue(feature) ?? 0;
    onHoverChange({ value, label, trend: computeVisitorTrend(value) });
  }, [onHoverChange, tooltipData]);

  return null;
}
`,
);

writeFileSync(
  join(root, "components/stat-card-choropleth.tsx"),
  `"use client";

import { useState } from "react";
import type { ChoroplethFeature } from "@/components/charts/choropleth/choropleth-context";
import { ChoroplethChart } from "@/components/charts/choropleth/choropleth-chart";
import { ChoroplethFeature as ChoroplethFeatureComponent } from "@/components/charts/choropleth/choropleth-feature";
import { ChoroplethTooltip } from "@/components/charts/choropleth/choropleth-tooltip";
import { ChartStatFlow } from "@/components/charts/chart-stat-flow";
import { useWorldDataStandalone } from "@/lib/use-world-data";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getVisitorColor, getVisitorValue, visitorStats } from "@/data/visitors";
import { StatCardChart, type StatCardHoverState, statCardLabelClassName, statCardValueClassName } from "@/components/stat-card-chart";
import { StatCardChoroplethHoverBridge } from "@/components/stat-card-choropleth-hover-bridge";
import { TrendBadge } from "@/components/trend-badge";

export function StatCardChoropleth() {
  const { worldData, isLoading } = useWorldDataStandalone();
  const [hover, setHover] = useState<StatCardHoverState>({ value: null, label: null, trend: null });
  const displayValue = hover.value ?? visitorStats.total;
  const displayLabel = hover.label ?? "Planningsverdeling";
  const displayTrend = hover.trend ?? visitorStats.trend;

  return (
    <Card className="relative w-full gap-0 overflow-hidden py-0">
      <CardHeader className="pointer-events-none absolute inset-x-0 top-0 z-10 grid auto-rows-min grid-cols-[1fr_auto] items-start gap-1 border-0 bg-gradient-to-b from-45% from-card to-transparent px-4 py-3 pb-10 shadow-none ring-0">
        <div className="flex flex-col gap-0.5">
          <CardTitle>Merkbereik per land</CardTitle>
          <ChartStatFlow label={displayLabel} labelClassName={statCardLabelClassName} value={displayValue} valueClassName={statCardValueClassName} />
        </div>
        <CardAction><TrendBadge value={displayTrend} /></CardAction>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading || !worldData ? (
          <StatCardChart className="mx-0 mb-0 min-h-[320px]" size="lg"><div className="flex h-full min-h-[320px] items-center justify-center text-xs text-muted-foreground">Wereldkaart laden…</div></StatCardChart>
        ) : (
          <StatCardChart className="mx-0 mb-0 min-h-[320px]" size="lg">
            <ChoroplethChart aspectRatio="2.5 / 1" className="min-h-[320px] w-full" data={worldData}>
              <StatCardChoroplethHoverBridge onHoverChange={setHover} />
              <ChoroplethFeatureComponent getFeatureColor={(feature: ChoroplethFeature) => getVisitorColor(feature)} />
              <ChoroplethTooltip getFeatureValue={getVisitorValue} valueLabel="Planindex" />
            </ChoroplethChart>
          </StatCardChart>
        )}
      </CardContent>
    </Card>
  );
}
`,
);

writeFileSync(
  join(root, "components/stat-card-area.tsx"),
  `"use client";

import { useState } from "react";
import { curveCardinal } from "@visx/curve";
import { AreaChart } from "@/components/charts/area-chart";
import { Area } from "@/components/charts/area";
import { ChartStatFlow } from "@/components/charts/chart-stat-flow";
import { LinearGradient } from "@visx/gradient";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { revenueSeries, revenueStats } from "@/data/revenue-series";
import { StatCardChart, statCardLabelClassName, statCardValueClassName } from "@/components/stat-card-chart";
import { formatStatCardMonth, StatCardHoverBridge, type StatCardHoverState } from "@/components/stat-card-hover-bridge";
import { TrendBadge } from "@/components/trend-badge";

export function StatCardArea() {
  const [hover, setHover] = useState<StatCardHoverState>({ value: null, label: null, trend: null });
  const displayValue = hover.value ?? revenueStats.average;
  const displayLabel = hover.label ?? "Scenario 2026";
  const displayTrend = hover.trend ?? revenueStats.trend;

  return (
    <Card className="w-full gap-0 py-0">
      <CardHeader className="px-4 py-3"><CardTitle>Omzetpotentieel</CardTitle><CardAction><TrendBadge value={displayTrend} /></CardAction></CardHeader>
      <CardContent className="flex flex-col gap-3 px-4 pt-2 pb-3">
        <ChartStatFlow formatOptions={{ currency: "EUR", maximumFractionDigits: 0, style: "currency" }} label={displayLabel} labelClassName={statCardLabelClassName} value={displayValue} valueClassName={statCardValueClassName} />
        <StatCardChart size="md">
          <AreaChart aspectRatio="2.5 / 1" className="w-full" data={revenueSeries} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <StatCardHoverBridge dataKey="value" formatLabel={formatStatCardMonth} onHoverChange={setHover} />
            <LinearGradient from="var(--chart-1)" fromOpacity={0.45} id="stat-card-area-fill" to="var(--chart-1)" toOpacity={0} />
            <Area curve={curveCardinal.tension(0.65)} dataKey="value" fill="url(#stat-card-area-fill)" fillOpacity={1} gradientToOpacity={0} showHighlight stroke="var(--chart-1)" strokeWidth={2} />
          </AreaChart>
        </StatCardChart>
        <p className="text-xs leading-5 text-muted-foreground">Planning op huidig groeibudget, geen omzetgarantie.</p>
      </CardContent>
    </Card>
  );
}
`,
);

patchTextFile(
  "components/stat-card-chart.tsx",
  (source) => source.replace(/font-(?:semibold|bold|extrabold)/g, "font-normal").replace('lg: "[--stat-card-chart-h:420px]"', 'lg: "[--stat-card-chart-h:320px]"'),
  "Aligned official Bklit stat-card styling.",
);
patchTextFile(
  "components/stat-card-hover-bridge.tsx",
  (source) => source
    .replace('import { useChart } from "@/components/charts";', 'import { useChart } from "@/components/charts/chart-context";')
    .replace('toLocaleDateString("en-US", { month: "short" })', 'toLocaleDateString("nl-NL", { month: "short" })')
    .replace('toLocaleDateString("en-US", { weekday: "long" })', 'toLocaleDateString("nl-NL", { weekday: "long" })'),
  "Localized official Bklit chart labels.",
);

writeFileSync(
  join(root, "components/how-it-works-block.tsx"),
  `import { Globe, Database, RocketLaunch } from "@/lib/phosphor-icons";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const steps = [
  { number: "01", icon: Globe, title: "Lead komt binnen", copy: "Website, advertenties, showroom of serviceformulier leveren één herkenbare aanvraag op." },
  { number: "02", icon: Database, title: "Data wordt verrijkt", copy: "Bron, regio, interesse, status en opvolging worden centraal in CRM en workflows vastgelegd." },
  { number: "03", icon: RocketLaunch, title: "Actie wordt gestart", copy: "Sales, afspraak, offerte, reminder of serviceproces krijgt automatisch de juiste vervolgstap." },
];

export default function HowItWorksBlock() {
  return (
    <div className="w-full">
      <div className="mb-7"><p className="eyebrow">Procesflow</p><h2 className="mt-2 text-3xl font-normal uppercase tracking-tight">Van aanvraag naar actie</h2><p className="mt-3 max-w-2xl text-muted-foreground">De software verbindt marketing, verkoop en service zonder handmatig kopieerwerk tussen losse systemen.</p></div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {steps.map(({ number, icon: Icon, title, copy }) => (
          <Card key={number} className="relative p-6"><span className="absolute right-5 top-5 text-xs text-muted-foreground">{number}</span><CardHeader className="p-0"><span className="flex size-12 items-center justify-center border border-border bg-muted"><Icon className="size-5" /></span><CardTitle className="mt-5 text-base font-normal uppercase">{title}</CardTitle><CardDescription className="mt-2 text-sm leading-6">{copy}</CardDescription></CardHeader></Card>
        ))}
      </div>
    </div>
  );
}
`,
);

writeFileSync(
  join(root, "components/integrations-block.tsx"),
  `import { ChartBar, Code, Database, MagicWand, Server, Users } from "@/lib/phosphor-icons";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const integrations = [
  { name: "GitHub", description: "Broncode, versies en gecontroleerde releases.", icon: Code, status: "Actief" },
  { name: "Vercel", description: "Frontenddeployments, domeinen en productiehosting.", icon: Server, status: "Actief" },
  { name: "Supabase / database", description: "CRM-data, formulieren, accounts en rapportagebasis.", icon: Database, status: "Gefaseerd" },
  { name: "GA4 en GTM", description: "Gedrag, conversies en campagne-attributie.", icon: ChartBar, status: "Inrichten" },
  { name: "Meta en Google Ads", description: "Campagnes, doelgroepen en remarketing.", icon: MagicWand, status: "Testfase" },
  { name: "Sales en service", description: "Afspraken, offertes, opvolging en supporthistorie.", icon: Users, status: "Gepland" },
];

export default function IntegrationsBlock() {
  return (
    <div className="w-full">
      <div className="mb-7"><p className="eyebrow">Integraties</p><h2 className="mt-2 text-3xl font-normal uppercase tracking-tight">Systemen die samenwerken</h2><p className="mt-3 max-w-2xl text-muted-foreground">Alleen koppelingen die eigenaarschap, meetbaarheid of opvolging verbeteren krijgen een plek.</p></div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {integrations.map(({ name, description, icon: Icon, status }) => (
          <Card key={name}><CardHeader><span className="flex size-11 items-center justify-center border border-border bg-background"><Icon className="size-5" /></span><div className="mt-4 flex items-start justify-between gap-3"><CardTitle className="text-base font-normal">{name}</CardTitle><span className="text-xs uppercase tracking-[.12em] text-muted-foreground">{status}</span></div><CardDescription className="text-sm leading-6">{description}</CardDescription></CardHeader></Card>
        ))}
      </div>
    </div>
  );
}
`,
);

writeFileSync(
  join(root, "components/timeline-block.tsx"),
  `import { CalendarBlank, Check, Database, Robot, RocketLaunch } from "@/lib/phosphor-icons";
import { Badge } from "@/components/ui/badge";

type Status = "Gereed" | "Bezig" | "Gepland";
const milestones = [
  { date: "Nu", title: "Digitale basis", copy: "Website, hosting, repositories, branding, PWA en eerste tracking staan als werkende basis.", icon: Check, status: "Gereed" as Status },
  { date: "0–30 dagen", title: "Eigenaarschap en meting", copy: "Accounts, billing, beheerders, consent en conversiemeting worden volledig onder Earth Spas gebracht.", icon: CalendarBlank, status: "Bezig" as Status },
  { date: "31–90 dagen", title: "CRM en leadflow", copy: "Leads, afspraken, offertes en verkoopstatussen worden centraal meetbaar en opvolgbaar.", icon: Database, status: "Gepland" as Status },
  { date: "3–6 maanden", title: "Sales- en serviceautomatisering", copy: "Reminders, lead recovery, servicetaken en managementsignalen worden geautomatiseerd.", icon: RocketLaunch, status: "Gepland" as Status },
  { date: "Na bewezen data", title: "Agents en voorspelling", copy: "AI ondersteunt advies, support, content en forecasting met menselijke controle.", icon: Robot, status: "Gepland" as Status },
];
const variants: Record<Status, "default" | "secondary" | "outline"> = { Gereed: "default", Bezig: "secondary", Gepland: "outline" };

export default function TimelineBlock() {
  return (
    <div className="w-full max-w-3xl">
      <div className="mb-8"><p className="eyebrow">Development timeline</p><h2 className="mt-2 text-3xl font-normal uppercase tracking-tight">Van basis naar automatisering</h2><p className="mt-3 text-muted-foreground">Nieuwe software volgt pas nadat eigenaarschap, data en processen betrouwbaar zijn.</p></div>
      <ol className="flex flex-col">
        {milestones.map((item, index) => { const last = index === milestones.length - 1; return (
          <li key={item.title} className="flex gap-5"><div className="flex flex-col items-center"><span className="flex size-10 shrink-0 items-center justify-center border border-border bg-card"><item.icon className="size-5" /></span>{!last && <span className="w-px flex-1 bg-border" />}</div><div className={last ? "pb-0" : "pb-9"}><div className="flex flex-wrap items-center gap-2.5"><span className="font-mono text-xs text-muted-foreground">{item.date}</span><Badge variant={variants[item.status]}>{item.status}</Badge></div><h3 className="mt-2 text-base font-normal uppercase">{item.title}</h3><p className="mt-1.5 text-sm leading-6 text-muted-foreground">{item.copy}</p></div></li>
        ); })}
      </ol>
    </div>
  );
}
`,
);

patchTextFile(
  "app/page.tsx",
  (source) => {
    source = insertOnce(source, 'import { DevelopmentShowcase } from "@/components/development-showcase";\n', 'import { OfficialGrowthCards } from "@/components/blocks/official-growth-cards";\n');
    return insertOnce(source, '      <section className="section-block theme-primary">\n', '      <section className="section-block theme-secondary">\n        <div className="content-shell">\n          <SectionHeader eyebrow="Groeiscenario" title="Regionale groei" text="Officiële Bklit-kaarten met een expliciete planningsverdeling. Nederland en Duitsland zijn actief; België en Luxemburg blijven latere beslissingen." />\n          <OfficialGrowthCards />\n        </div>\n      </section>\n\n');
  },
  "Placed the official Bklit world and area cards on the homepage.",
);

patchTextFile(
  "app/software/page.tsx",
  (source) => {
    source = insertOnce(source, 'import { useSiteState } from "@/components/site-state";\n', 'import { OfficialSoftwareFlows } from "@/components/blocks/official-software-flows";\n');
    return insertOnce(source, '      <section className="section-block theme-primary">\n', '      <section className="section-block theme-secondary">\n        <div className="content-shell">\n          <OfficialSoftwareFlows />\n        </div>\n      </section>\n\n');
  },
  "Placed the official 7Ovr software flows on the software page.",
);

patchTextFile(
  "app/marketing/page.tsx",
  (source) => {
    source = insertOnce(source, 'import { useSiteState } from "@/components/site-state";\n', 'import { OfficialMarketingCharts } from "@/components/blocks/official-marketing-charts";\n');
    return insertOnce(source, '      <section className="section-block theme-secondary">\n', '      <section className="section-block theme-primary">\n        <div className="content-shell">\n          <SectionHeader eyebrow="Marketingvisuals" title="Funnel en landverdeling" text="Officiële Bklit funnel- en piecharts. Alle niet-gemeten waarden zijn duidelijk als scenario gelabeld." />\n          <OfficialMarketingCharts />\n        </div>\n      </section>\n\n');
  },
  "Placed the official Bklit funnel and pie charts on the marketing page.",
);

patchTextFile(
  "app/calculator/page.tsx",
  (source) => {
    source = insertOnce(source, 'import { useSiteState } from "@/components/site-state";\n', 'import { OfficialBudgetGrowthChart } from "@/components/blocks/official-budget-growth-chart";\n');
    return insertOnce(source, '      <section className="section-block theme-primary">\n', '      <section className="section-block theme-secondary">\n        <div className="content-shell">\n          <SectionHeader eyebrow="Groeiberekening" title="Budget naar omzet" text="Officiële Bklit-lijngrafiek met drie scenario’s en een directe budgetslider." />\n          <OfficialBudgetGrowthChart />\n        </div>\n      </section>\n\n');
  },
  "Placed the official Bklit budget line chart on the calculator page.",
);

console.log("Applied Earth Spas content and route placement to all official registry components.");
