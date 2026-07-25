"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function TrendBadge({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const positive = value >= 0;

  return (
    <Badge
      className={cn(
        positive &&
          "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        className
      )}
      variant={positive ? "outline" : "destructive"}
    >
      <span aria-hidden="true" className="text-[11px] leading-none">{positive ? "↑" : "↓"}</span>
      {positive ? "+" : ""}
      {value.toFixed(1)}%
    </Badge>
  );
}
