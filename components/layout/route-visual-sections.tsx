"use client";

import { GrowthChoroplethCard, SoftwareFlowDiagram } from "@/components/blocks";
import { OfficialBudgetGrowthChart } from "@/components/blocks/official-budget-growth-chart";
import { OfficialMarketingCharts } from "@/components/blocks/official-marketing-charts";
import { OfficialSoftwareFlows } from "@/components/blocks/official-software-flows";
import { AgentFlowShowcase } from "@/components/motion";

export function RouteVisualSections({ pathname }: { pathname: string }) {
  if (pathname === "/strategie") {
    return (
      <div className="route-visual-restoration">
        <GrowthChoroplethCard />
        <section className="route-visual-chart-section theme-primary" aria-labelledby="strategy-growth-chart-title">
          <div className="content-shell">
            <div className="route-visual-chart-heading">
              <p className="eyebrow">Advertentiebudget naar groeiscenario</p>
              <h2 id="strategy-growth-chart-title">Voorzichtig rekenen, zichtbaar bijsturen</h2>
              <p>De grafiek toont drie scenario&apos;s voor een zelfstandig advertentiebudget. Software, hosting, AI en content blijven afzonderlijke kosten.</p>
            </div>
            <OfficialBudgetGrowthChart />
          </div>
        </section>
      </div>
    );
  }

  if (pathname === "/marketing") {
    return (
      <section className="route-visual-chart-section route-visual-restoration theme-secondary" aria-labelledby="marketing-visuals-title">
        <div className="content-shell">
          <div className="route-visual-chart-heading">
            <p className="eyebrow">Meetbare marketingketen</p>
            <h2 id="marketing-visuals-title">Van bereik naar afspraken en verkopen</h2>
            <p>Deze visualisaties maken funnel, regionale focus en het voorzichtige verkoopschema opnieuw zichtbaar. Planningsdata wordt later vervangen door CRM-resultaten.</p>
          </div>
          <OfficialMarketingCharts />
        </div>
      </section>
    );
  }

  if (pathname === "/software") {
    return (
      <div className="route-visual-restoration">
        <SoftwareFlowDiagram />
        <AgentFlowShowcase />
        <section className="route-visual-chart-section theme-secondary" aria-labelledby="software-registry-flows-title">
          <div className="content-shell">
            <div className="route-visual-chart-heading">
              <p className="eyebrow">Uitvoering en integraties</p>
              <h2 id="software-registry-flows-title">Van technische basis naar beheersbare automatisering</h2>
              <p>De proces-, integratie- en tijdlijncomponenten staan weer expliciet op de softwarepagina in plaats van los in de repository te verstoffen.</p>
            </div>
            <OfficialSoftwareFlows />
          </div>
        </section>
      </div>
    );
  }

  return null;
}
