"use client";

import { StatCardArea } from "@/components/stat-card-area";
import { StatCardChoropleth } from "@/components/stat-card-choropleth";
import { Panel } from "@/components/plan-ui";

const markets = [
  { country: "Nederland", detail: "Actieve markt", label: "actief", status: "active" },
  { country: "Duitsland · NRW", detail: "Actief en groeiprioriteit", label: "prioriteit", status: "priority" },
  { country: "België", detail: "Latere onderzoeksfase", label: "later", status: "later" },
  { country: "Luxemburg", detail: "Review voor marktactivatie", label: "review", status: "review" },
] as const;

export function OfficialGrowthCards() {
  return (
    <div className="growth-card-layout">
      <div className="growth-map-main">
        <StatCardChoropleth />
      </div>

      <div className="growth-support-grid">
        <Panel className="growth-market-panel">
          <p className="eyebrow">Marktstatus</p>
          <h3>Vier landen, twee actieve markten</h3>
          <p>De kaart toont een planningsscenario. België en Luxemburg zijn geen actieve marktclaim.</p>
          <div className="growth-market-list">
            {markets.map((market) => (
              <div key={market.country} className="growth-market-status" data-status={market.status}>
                <span className="growth-market-indicator" aria-hidden="true" />
                <span className="growth-market-copy"><strong>{market.country}</strong><small>{market.detail}</small></span>
                <span>{market.label}</span>
              </div>
            ))}
          </div>
        </Panel>

        <div className="growth-revenue-slot">
          <StatCardArea />
        </div>
      </div>
    </div>
  );
}
