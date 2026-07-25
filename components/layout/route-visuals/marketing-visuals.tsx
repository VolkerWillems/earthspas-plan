"use client";

import { OfficialMarketingCharts } from "@/components/blocks/official-marketing-charts";

export function MarketingRouteVisuals() {
  return (
    <section className="route-visual-chart-section route-visual-restoration theme-secondary" aria-labelledby="marketing-visuals-title">
      <div className="content-shell">
        <div className="route-visual-chart-heading">
          <p className="eyebrow">Meetbare marketingketen</p>
          <h2 id="marketing-visuals-title">Van bereik naar afspraak en verkoop</h2>
          <p>Funnel, marktverdeling en verkoopschema maken zichtbaar waar bereik omzet wordt en waar opvolging verloren gaat.</p>
        </div>
        <OfficialMarketingCharts />
      </div>
    </section>
  );
}
