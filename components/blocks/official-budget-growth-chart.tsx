"use client";

import { useMemo, useState } from "react";
import { ChartBrush } from "@/components/charts/chart-brush";
import { ChartBrushLayout } from "@/components/charts/chart-brush-layout";
import { Grid } from "@/components/charts/grid";
import { Line } from "@/components/charts/line";
import { LineChart } from "@/components/charts/line-chart";

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
    <article className="panel motion-card p-[var(--card-padding)]">
      <div className="flex flex-col gap-[var(--space-5)] lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="eyebrow">Budgetscenario</p>
          <h3 className="heading-card mt-[var(--space-2)] uppercase">Groei per budgetniveau</h3>
          <p className="mt-[var(--space-2)] max-w-2xl text-sm leading-6 text-muted-foreground">Drie planningslijnen. De slider verandert het maandbudget; de brush selecteert de zichtbare periode.</p>
        </div>
        <div className="min-w-[clamp(13rem,22vw,16rem)]">
          <div className="mb-[var(--space-2)] flex items-center justify-between gap-[var(--space-4)] text-sm">
            <label htmlFor="growth-budget" className="text-muted-foreground">Maandbudget</label>
            <span className="text-[var(--font-size-card-title)] text-[var(--section-accent)]">{euro(monthlyBudget)}</span>
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

      <div className="mt-[var(--space-5)] grid gap-[var(--space-3)] sm:grid-cols-3">
        <div className="rounded-[var(--radius-md)] border border-border bg-card p-[var(--card-padding)]"><p className="text-xs uppercase tracking-[var(--tracking-label)] text-muted-foreground">Voorzichtig</p><p className="mt-[var(--space-2)] text-[var(--font-size-card-title)] text-foreground">{euro(final?.voorzichtig ?? 0)}</p></div>
        <div className="rounded-[var(--radius-md)] border border-border bg-card p-[var(--card-padding)]"><p className="text-xs uppercase tracking-[var(--tracking-label)] text-muted-foreground">Werkbasis</p><p className="mt-[var(--space-2)] text-[var(--font-size-card-title)] text-[var(--section-accent)]">{euro(final?.werkbasis ?? 0)}</p></div>
        <div className="rounded-[var(--radius-md)] border border-border bg-card p-[var(--card-padding)]"><p className="text-xs uppercase tracking-[var(--tracking-label)] text-muted-foreground">Sterk gemeten</p><p className="mt-[var(--space-2)] text-[var(--font-size-card-title)] text-foreground">{euro(final?.sterk ?? 0)}</p></div>
      </div>

      <div className="mt-[var(--space-5)] h-[clamp(22rem,34vw,27.5rem)]">
        <ChartBrushLayout
          brushStrip={({ brushSelection, onBrushSelectionChange }) => (
            <LineChart
              aspectRatio={undefined}
              className="h-full w-full"
              data={data}
              margin={{ top: 8, right: 18, bottom: 8, left: 18 }}
              style={{ height: "100%" }}
              xDataKey="date"
            >
              <Line dataKey="werkbasis" fadeEdges={false} stroke="var(--chart-1)" strokeWidth={1.5} />
              <ChartBrush
                fadeOuterEdges
                initialSelection={brushSelection}
                onSelectionChange={onBrushSelectionChange}
                selection={brushSelection}
              />
            </LineChart>
          )}
          data={data}
          enabled
          height={76}
          xDataKey="date"
        >
          {({ xDomain, xDomainSlotCount }) => (
            <LineChart
              aspectRatio={undefined}
              className="h-full w-full"
              data={data}
              style={{ height: "100%" }}
              tweenYDomainOnXDomainChange
              xDataKey="date"
              xDomain={xDomain}
              xDomainSlotCount={xDomainSlotCount}
            >
              <Grid horizontal vertical strokeOpacity={0.45} />
              <Line dataKey="voorzichtig" fadeEdges={false} showMarkers stroke="var(--chart-3)" strokeWidth={1.5} />
              <Line dataKey="werkbasis" fadeEdges={false} showMarkers stroke="var(--chart-1)" strokeWidth={2.5} />
              <Line dataKey="sterk" fadeEdges={false} showMarkers stroke="var(--chart-2)" strokeWidth={1.5} />
            </LineChart>
          )}
        </ChartBrushLayout>
      </div>
      <p className="mt-[var(--space-3)] text-xs leading-5 text-muted-foreground">Scenario, geen omzetbelofte. Werkelijke kosten per lead, afspraak, offerte en verkoop moeten dit model vervangen.</p>
    </article>
  );
}
