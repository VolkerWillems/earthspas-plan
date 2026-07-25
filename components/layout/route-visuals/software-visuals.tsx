"use client";

import { SoftwareFlowDiagram } from "@/components/blocks/software-flow-diagram";
import { OfficialSoftwareFlows } from "@/components/blocks/official-software-flows";
import { AgentFlowShowcase } from "@/components/motion/agent-flow-showcase";

export function SoftwareRouteVisuals() {
  return (
    <div className="route-visual-restoration">
      <SoftwareFlowDiagram />
      <AgentFlowShowcase />
      <section className="route-visual-chart-section theme-secondary" aria-labelledby="software-registry-flows-title">
        <div className="content-shell">
          <div className="route-visual-chart-heading">
            <p className="eyebrow">Uitvoering en integraties</p>
            <h2 id="software-registry-flows-title">Van technische basis naar beheersbare automatisering</h2>
            <p>De proces-, integratie- en tijdlijnweergaven tonen welke afhankelijkheden eerst op orde moeten zijn.</p>
          </div>
          <OfficialSoftwareFlows />
        </div>
      </section>
    </div>
  );
}
