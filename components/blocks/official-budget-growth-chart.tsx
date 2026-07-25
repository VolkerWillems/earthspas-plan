"use client";

import { useMemo, useState, type CSSProperties } from "react";
import { Grid } from "@/components/charts/grid";
import { Line } from "@/components/charts/line";
import { LineChart } from "@/components/charts/line-chart";
import { Panel } from "@/components/plan-ui";

const months = ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];

function euro(value: number) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

type ScenarioKey = "voorzichtig" | "werkbasis" | "sterk";

type Scenario = {
  key: ScenarioKey;
  label: string;
  color: string;
  primary: boolean;
};

const scenarios: Scenario[] = [
  { key: "voorzichtig", label: "Voorzichtig", color: "var(--chart-3)", primary: false },
  { key: "werkbasis", label: "Werkbasis", color: "var(--chart-1)", primary: true },
  { key: "sterk", label: "Goed resultaat", color: "var(--chart-2)", primary: false },
];

export function OfficialBudgetGrowthChart() {
  const [monthlyBudget, setMonthlyBudget] = useState(1000);

  const data = useMemo(() => months.map((month, index) => {
    const progress = (index + 1) / months.length;
    const annualBudget = monthlyBudget * 12;
    return {
      date: new Date(2026, index, 1),
      month,
      voorzichtig: Math.round(annualBudget * 1.45 * progress),
      werkbasis: Math.round(annualBudget * 2.55 * progress),
      sterk: Math.round(annualBudget * 3.4 * progress),
    };
  }), [monthlyBudget]);

  const final = data.at(-1);

  return (
    <Panel className="budget-growth-chart">
      <div className="budget-growth-chart__header">
        <div className="budget-growth-chart__intro">
          <p className="eyebrow">Budgetscenario</p>
          <h3 className="heading-card mt-[var(--space-2)] uppercase">Voorzichtige omzetbandbreedte</h3>
          <p className="mt-[var(--space-2)] text-sm leading-[var(--line-height-body)] text-muted-foreground">
            Conservatieve planning op 50% van de theoretische advertentie-uitkomst. Software, hosting, AI en content staan los van dit mediabudget.
          </p>
        </div>
        <div className="budget-growth-chart__slider">
          <div className="budget-growth-chart__slider-head">
            <label htmlFor="growth-budget">Advertentiebudget per maand</label>
            <span className="budget-growth-chart__slider-value">{euro(monthlyBudget)}</span>
          </div>
          <input
            id="growth-budget"
            aria-label="Maandelijks advertentiebudget"
            className="site-range w-full"
            max={3000}
            min={250}
            onChange={(event) => setMonthlyBudget(Number(event.target.value))}
            step={50}
            type="range"
            value={monthlyBudget}
            style={{ "--range-progress": `${((monthlyBudget - 250) / 2750) * 100}%` } as CSSProperties}
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
        <LineChart
          aspectRatio={undefined}
          className="h-full w-full"
          data={data}
          margin={{ top: 18, right: 20, bottom: 14, left: 20 }}
          style={{ height: "100%" }}
          xDataKey="date"
        >
          <Grid horizontal vertical={false} strokeOpacity={0.28} />
          <Line dataKey="voorzichtig" fadeEdges={false} stroke="var(--chart-3)" strokeWidth={1.25} />
          <Line dataKey="werkbasis" fadeEdges={false} showMarkers stroke="var(--chart-1)" strokeWidth={2.25} />
          <Line dataKey="sterk" fadeEdges={false} stroke="var(--chart-2)" strokeWidth={1.25} />
        </LineChart>
      </div>
      <p className="budget-growth-chart__note">
        Indicatief scenario, geen omzetbelofte. Werkelijke kosten per lead, afspraak, offerte en verkoop vervangen dit model zodra voldoende CRM-data beschikbaar is.
      </p>
    </Panel>
  );
}
