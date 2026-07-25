"use client";

import { useState } from "react";
import type { ChoroplethFeature } from "@/components/charts/choropleth/choropleth-context";
import { ChoroplethChart } from "@/components/charts/choropleth/choropleth-chart";
import { ChoroplethFeature as ChoroplethFeatureComponent } from "@/components/charts/choropleth/choropleth-feature";
import { ChoroplethTooltip } from "@/components/charts/choropleth/choropleth-tooltip";
import { ChartStatFlow } from "@/components/charts/chart-stat-flow";
import { useWorldDataStandalone } from "@/lib/use-world-data";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getVisitorColor, getVisitorValue, visitorStats } from "@/data/visitors";
import { StatCardChart, type StatCardHoverState, statCardLabelClassName, statCardValueClassName } from "@/components/stat-card-chart";
import { StatCardChoroplethHoverBridge } from "@/components/stat-card-choropleth-hover-bridge";
import { TrendBadge } from "@/components/trend-badge";

export function StatCardChoropleth() {
  const { worldData, isLoading } = useWorldDataStandalone();
  const [hover, setHover] = useState<StatCardHoverState>({ value: null, label: null, trend: null });
  const displayValue = hover.value ?? visitorStats.total;
  const displayLabel = hover.label ?? "Planningsverdeling";
  const displayTrend = hover.trend ?? visitorStats.trend;

  return (
    <Card className="relative w-full gap-0 overflow-hidden py-0">
      <CardHeader className="pointer-events-none absolute inset-x-0 top-0 z-10 grid auto-rows-min grid-cols-[1fr_auto] items-start gap-1 border-0 bg-gradient-to-b from-45% from-card to-transparent px-4 py-3 pb-10 shadow-none ring-0">
        <div className="flex flex-col gap-0.5">
          <CardTitle>Merkbereik per land</CardTitle>
          <ChartStatFlow label={displayLabel} labelClassName={statCardLabelClassName} value={displayValue} valueClassName={statCardValueClassName} />
        </div>
        <CardAction><TrendBadge value={displayTrend} /></CardAction>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading || !worldData ? (
          <StatCardChart className="mx-0 mb-0 min-h-[320px]" size="lg"><div className="flex h-full min-h-[320px] items-center justify-center text-xs text-muted-foreground">Wereldkaart laden…</div></StatCardChart>
        ) : (
          <StatCardChart className="mx-0 mb-0 min-h-[320px]" size="lg">
            <ChoroplethChart aspectRatio="2.5 / 1" className="min-h-[320px] w-full" data={worldData}>
              <StatCardChoroplethHoverBridge onHoverChange={setHover} />
              <ChoroplethFeatureComponent getFeatureColor={(feature: ChoroplethFeature) => getVisitorColor(feature)} />
              <ChoroplethTooltip getFeatureValue={getVisitorValue} valueLabel="Planindex" />
            </ChoroplethChart>
          </StatCardChart>
        )}
      </CardContent>
    </Card>
  );
}
