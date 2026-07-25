"use client";

import { OfficialBudgetGrowthChart } from "@/components/blocks/official-budget-growth-chart";

export function StrategyRouteVisuals() {
  return (
    <div className="route-visual-restoration">
      <section className="route-visual-chart-section theme-primary" aria-labelledby="strategy-growth-chart-title">
        <div className="content-shell">
          <div className="route-visual-chart-heading">
            <p className="eyebrow">Advertentiebudget naar groeiscenario</p>
            <h2 id="strategy-growth-chart-title">Voorzichtig rekenen, zichtbaar bijsturen</h2>
            <p>De grafiek vergelijkt drie scenario&apos;s voor advertentiebudget. Software, hosting, AI en content blijven afzonderlijke kosten.</p>
          </div>
          <OfficialBudgetGrowthChart />
        </div>
      </section>
    </div>
  );
}
