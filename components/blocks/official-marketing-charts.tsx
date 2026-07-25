"use client";

import { FunnelChart } from "@/components/charts/funnel-chart";
import { PieChart } from "@/components/charts/pie-chart";
import { PieSlice } from "@/components/charts/pie-slice";
import { PieCenter } from "@/components/charts/pie-center";

const funnelData = [
  { label: "Bereik", value: 1000, displayValue: "1.000" },
  { label: "Website", value: 120, displayValue: "120" },
  { label: "Leads", value: 18, displayValue: "18" },
  { label: "Afspraken", value: 6, displayValue: "6" },
  { label: "Verkopen", value: 2, displayValue: "2" },
];

const countryFocus = [
  { label: "Nederland", value: 45, color: "var(--chart-1)" },
  { label: "Duitsland · NRW", value: 35, color: "var(--chart-2)" },
  { label: "België · later", value: 12, color: "var(--chart-3)" },
  { label: "Luxemburg · review", value: 8, color: "var(--chart-4)" },
];

const incrementalSales = [
  { label: "Nederland", value: 4.5, color: "var(--chart-1)" },
  { label: "Duitsland · NRW", value: 3.5, color: "var(--chart-2)" },
  { label: "België · later", value: 1.2, color: "var(--chart-3)" },
  { label: "Luxemburg · review", value: 0.8, color: "var(--chart-4)" },
];

function PieLegend({ data, suffix = "%" }: { data: typeof countryFocus; suffix?: string }) {
  return (
    <div className="space-y-2">
      {data.map((item) => (
        <div key={item.label} className="flex items-center justify-between gap-4 text-sm">
          <span className="flex min-w-0 items-center gap-2 text-white/68">
            <span className="h-2.5 w-2.5 shrink-0 rounded-[2px]" style={{ backgroundColor: item.color }} />
            <span className="truncate">{item.label}</span>
          </span>
          <span className="text-white">{item.value}{suffix}</span>
        </div>
      ))}
    </div>
  );
}

export function OfficialMarketingCharts() {
  return (
    <div className="mt-8 grid gap-4 xl:grid-cols-3">
      <article className="panel motion-card p-5 sm:p-6">
        <p className="eyebrow">Leads funnel</p>
        <h3 className="mt-2 text-2xl uppercase text-white">Van bereik naar verkoop</h3>
        <p className="mt-2 text-sm leading-6 text-white/58">Planning per 1.000 bereikte personen. Vervangen door CRM-data zodra de volledige funnel meetbaar is.</p>
        <div className="mt-5 h-[340px]">
          <FunnelChart
            className="h-full w-full"
            data={funnelData}
            edges="straight"
            grid
            orientation="vertical"
            showLabels
            showPercentage
            showValues
          />
        </div>
      </article>

      <article className="panel motion-card p-5 sm:p-6">
        <p className="eyebrow">Regionale focus</p>
        <h3 className="mt-2 text-2xl uppercase text-white">Groeiaandacht per land</h3>
        <p className="mt-2 text-sm leading-6 text-white/58">Planningsverdeling, geen gemeten marktaandeel.</p>
        <div className="mt-5 h-[250px]">
          <PieChart className="h-full w-full" cornerRadius={4} data={countryFocus} innerRadius={64} padAngle={0.025}>
            {countryFocus.map((item, index) => (
              <PieSlice color={item.color} index={index} key={item.label} />
            ))}
            <PieCenter defaultLabel="Plan" suffix="%" />
          </PieChart>
        </div>
        <PieLegend data={countryFocus} />
      </article>

      <article className="panel motion-card p-5 sm:p-6">
        <p className="eyebrow">Verkoopscenario</p>
        <h3 className="mt-2 text-2xl uppercase text-white">Tien extra verkopen</h3>
        <p className="mt-2 text-sm leading-6 text-white/58">Indicatieve verdeling bij tien extra verkopen. Geen omzetgarantie.</p>
        <div className="mt-5 h-[250px]">
          <PieChart className="h-full w-full" cornerRadius={4} data={incrementalSales} innerRadius={64} padAngle={0.025}>
            {incrementalSales.map((item, index) => (
              <PieSlice color={item.color} index={index} key={item.label} />
            ))}
            <PieCenter defaultLabel="Extra spa's" />
          </PieChart>
        </div>
        <PieLegend data={incrementalSales} suffix="" />
      </article>
    </div>
  );
}
