"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { GrowthChoroplethCard, SoftwareFlowDiagram } from "@/components/blocks";
import { OfficialBudgetGrowthChart } from "@/components/blocks/official-budget-growth-chart";
import { OfficialMarketingCharts } from "@/components/blocks/official-marketing-charts";
import { OfficialSoftwareFlows } from "@/components/blocks/official-software-flows";
import { AgentFlowShowcase } from "@/components/motion";

function RouteVisualContent({ pathname }: { pathname: string }) {
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
            <p>Funnel, marktverdeling en het voorzichtige verkoopschema staan weer direct bij de marketingintro. Planningsdata wordt later vervangen door CRM-resultaten.</p>
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
              <p>Proces-, integratie- en tijdlijncomponenten staan direct onder de softwareintro, in plaats van na de volledige pagina te verdwijnen.</p>
            </div>
            <OfficialSoftwareFlows />
          </div>
        </section>
      </div>
    );
  }

  return null;
}

export function RouteVisualSections({ pathname }: { pathname: string }) {
  const [portalNode, setPortalNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!["/strategie", "/marketing", "/software"].includes(pathname)) {
      setPortalNode(null);
      return;
    }

    const intro = document.querySelector<HTMLElement>(".route-transition .page-intro");
    if (!intro) {
      setPortalNode(null);
      return;
    }

    const slot = document.createElement("div");
    slot.className = "route-visual-slot";
    slot.dataset.routeVisuals = pathname;
    intro.insertAdjacentElement("afterend", slot);
    setPortalNode(slot);

    return () => {
      slot.remove();
    };
  }, [pathname]);

  if (!portalNode) return null;
  return createPortal(<RouteVisualContent pathname={pathname} />, portalNode);
}
