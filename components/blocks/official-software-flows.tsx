"use client";

import TimelineBlock from "@/components/timeline-block";
import IntegrationsBlock from "@/components/integrations-block";
import HowItWorksBlock from "@/components/how-it-works-block";

export function OfficialSoftwareFlows() {
  return (
    <div className="registry-flow-stack">
      <HowItWorksBlock />
      <IntegrationsBlock />
      <TimelineBlock />
    </div>
  );
}
