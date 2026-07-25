"use client";

import { StatCardArea } from "@/components/stat-card-area";
import { StatCardChoropleth } from "@/components/stat-card-choropleth";

export function OfficialGrowthCards() {
  return (
    <div className="mt-8 grid gap-4 xl:grid-cols-[1.15fr_.85fr]">
      <div className="min-w-0 [&>*]:h-full">
        <StatCardChoropleth />
      </div>
      <div className="min-w-0 [&>*]:h-full">
        <StatCardArea />
      </div>
    </div>
  );
}
