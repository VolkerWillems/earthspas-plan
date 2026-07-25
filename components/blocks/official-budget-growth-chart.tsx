"use client";

import { useMemo, useState } from "react";
import { LineChart } from "@/components/charts/line-chart";
import { Line } from "@/components/charts/line";
import { Grid } from "@/components/charts/grid";

const months = ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];

function euro(value: number) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function OfficialBudgetGrowthChart() {
  const [monthlyBudget, setMonthlyBudget] = useState(1000);

  const data = useMemo(() => months.map((month, index) => {
    const progress = (index + 1) / months.length;
    const annualBudget = monthlyBudget * 12;
    return {
      date: new Date(2026, index, 1),
      month,
      voorzichtig: Math.round(annualBudget * 2.9 * progress),
      werkbasis: Math.round(annualBudget * 5.1 * progress),
      sterk: Math.round(annualBudget * 6.8 * progress),
    };
  }), [monthlyBudget]);

  const final = data.at(-1);

  return (
    <article className="panel motion-card p-5 sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="eyebrow">Budgetscenario</p>
          <h3 className="mt-2 text-2xl uppercase text-white">Groei per budgetniveau</h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/58">Drie planningslijnen. De slider verandert het maandbudget; echte CRM-resultaten vervangen later de aannames.</p>
        </div>
        <div className="min-w-[240px]">
          <div className="mb-2 flex items-center justify-between gap-4 text-sm">
            <label htmlFor="growth-budget" className="text-white/62">Maandbudget</label>
            <span className="text-lg text-[var(--section-accent)]">{euro(monthlyBudget)}</span>
          </div>
          <input
            id="growth-budget"
            aria-label="Maandelijks groeibudget"
            className="site-range w-full"
            max={3000}
            min={500}
            onChange={(event) => setMonthlyBudget(Number(event.target.value))}
            step={100}
            type="range"
            value={monthlyBudget}
            style={{ "--range-progress": `${((monthlyBudget - 500) / 2500) * 100}%` } as React.CSSProperties}
          />
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="border border-[#2E333B] p-4"><p className="text-xs uppercase tracking-[.12em] text-white/48">Voorzichtig</p><p className="mt-2 text-xl text-white">{euro(final?.voorzichtig ?? 0)}</p></div>
        <div className="border border-[#2E333B] p-4"><p className="text-xs uppercase tracking-[.12em] text-white/48">Werkbasis</p><p className="mt-2 text-xl text-[var(--section-accent)]">{euro(final?.werkbasis ?? 0)}</p></div>
        <div className="border border-[#2E333B] p-4"><p className="text-xs uppercase tracking-[.12em] text-white/48">Sterk gemeten</p><p className="mt-2 text-xl text-white">{euro(final?.sterk ?? 0)}</p></div>
      </div>

      <div className="mt-5 h-[360px]">
        <LineChart aspectRatio="2.4 / 1" className="h-full w-full" data={data} xDataKey="date">
          <Grid horizontal vertical strokeOpacity={0.45} />
          <Line dataKey="voorzichtig" fadeEdges={false} showMarkers stroke="var(--chart-3)" strokeWidth={1.5} />
          <Line dataKey="werkbasis" fadeEdges={false} showMarkers stroke="var(--chart-1)" strokeWidth={2.5} />
          <Line dataKey="sterk" fadeEdges={false} showMarkers stroke="var(--chart-2)" strokeWidth={1.5} />
        </LineChart>
      </div>
      <p className="mt-3 text-xs leading-5 text-white/42">Scenario, geen omzetbelofte. Werkelijke kosten per lead, afspraak, offerte en verkoop moeten dit model vervangen.</p>
    </article>
  );
}
