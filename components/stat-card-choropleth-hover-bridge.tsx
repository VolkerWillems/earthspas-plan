"use client";

import { useEffect } from "react";
import { useChoropleth } from "@/components/charts/choropleth/choropleth-context";
import { computeVisitorTrend, getVisitorValue } from "@/data/visitors";
import type { StatCardHoverState } from "@/components/stat-card-chart";

export function StatCardChoroplethHoverBridge({ onHoverChange }: { onHoverChange: (state: StatCardHoverState) => void }) {
  const { tooltipData } = useChoropleth();

  useEffect(() => {
    if (!tooltipData?.feature) {
      onHoverChange({ value: null, label: null, trend: null });
      return;
    }
    const feature = tooltipData.feature;
    const label = (feature.properties?.name as string | undefined) ?? "Onbekend";
    const value = getVisitorValue(feature) ?? 0;
    onHoverChange({ value, label, trend: computeVisitorTrend(value) });
  }, [onHoverChange, tooltipData]);

  return null;
}
