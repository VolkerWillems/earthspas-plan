"use client";

import { useMemo, useState, type CSSProperties } from "react";
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

const scenarios = [
  { key: "voorzichtig", label: "Voorzichtig", color: "var(--chart-3)" },
  { key: "werkbasis", label: "Werkbasis", color: "var(--chart-1)", primary: true },
  { key: "sterk", label: "Sterk gemeten", color: "var(--chart-2)" },
] as const;

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
    <article className="panel motion-card budget-growth-chart">
      <div className="budget-growth-chart__header">
        <div className="budget-growth-chart__intro">
          <p className="eyebrow">Budgetscenario</p>
          <h3 className="heading-card mt-[var(--space-2)] uppercase">Groeiscenario</h3>
          <p className="mt-[var(--space-2)] text-sm leading-[var(--line-height-body)] text-muted-foreground">
            Vergelijk drie planningslijnen en selecteer met de brush de zichtbare periode.
          </p>
        </div>
        <div className="budget-growth-chart__slider">
          <div className="budget-growth-chart__slider-head">
            <label htmlFor="growth-budget">Maandbudget</label>
            <span className="budget-growth-chart__slider-value">{euro(monthlyBudget)}</span>
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
            style={{ "--range-progress": `${((monthlyBudget - 500) / 2500) * 100}%` } as CSSProperties}
          />
        </div>
      </div>

      <div className="budget-growth-chart__metrics" aria-label="Scenario-uitkomsten">
        {scenarios.map((scenario) => (
          <div
            key={scenario.key}
            className={`budget-growth-chart__metric${scenario.primary ? " is-primary" : ""}`}
          >
            <p className="budget-growth-chart__metric-label">
              <span
                className="chart-series-dot"
                style={{ "--series-color": scenario.color } as CSSProperties}
                aria-hidden="true"
              />
              {scenario.label}
            </p>
            <strong className="budget-growth-chart__metric-value">
              {euro(final?.[scenario.key] ?? 0)}
            </strong>
          </div>
        ))}
      </div>

      <div className="budget-growth-chart__canvas">
        <ChartBrushLayout
          brushStrip={({ brushSelection, onBrushSelectionChange }) => (
            <LineChart
              aspectRatio={undefined}
              className="h-full w-full"
              data={data}
              margin={{ top: 5, right: 12, bottom: 5, left: 12 }}
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
          height={48}
          xDataKey="date"
        >
          {({ xDomain, xDomainSlotCount }) => (
            <LineChart
              aspectRatio={undefined}
              className="h-full w-full"
              data={data}
              margin={{ top: 14, right: 18, bottom: 10, left: 18 }}
              style={{ height: "100%" }}
              tweenYDomainOnXDomainChange
              xDataKey="date"
              xDomain={xDomain}
              xDomainSlotCount={xDomainSlotCount}
            >
              <Grid horizontal vertical={false} strokeOpacity={0.34} />
              <Line dataKey="voorzichtig" fadeEdges={false} stroke="var(--chart-3)" strokeWidth={1.25} />
              <Line dataKey="werkbasis" fadeEdges={false} showMarkers stroke="var(--chart-1)" strokeWidth={2.25} />
              <Line dataKey="sterk" fadeEdges={false} stroke="var(--chart-2)" strokeWidth={1.25} />
            </LineChart>
          )}
        </ChartBrushLayout>
      </div>
      <p className="budget-growth-chart__note">
        Indicatief scenario, geen omzetbelofte. Werkelijke kosten per lead, afspraak, offerte en verkoop vervangen dit model zodra voldoende data beschikbaar is.
      </p>
    </article>
  );
}
