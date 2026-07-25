"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { ChartBrushOverlayHost } from "./chart-brush-track-overlay";
import { useChartStable } from "./chart-context";

export interface ChartBrushSelectionPattern {
  preset?: string;
  color?: string;
  opacity?: number;
}

export interface ChartBrushSelectionOverlayProps {
  innerWidth: number;
  innerHeight: number;
  selectionX0: number;
  selectionX1: number;
  pattern?: ChartBrushSelectionPattern;
}

export function ChartBrushSelectionOverlayContent({
  containerRef,
  margin,
  innerWidth,
  innerHeight,
  selectionX0,
  selectionX1,
  pattern,
}: ChartBrushSelectionOverlayProps & ChartBrushOverlayHost) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const container = containerRef.current;
  if (!(mounted && container && pattern?.color)) return null;

  const x0 = Math.max(0, Math.min(selectionX0, selectionX1, innerWidth));
  const x1 = Math.max(
    x0,
    Math.min(Math.max(selectionX0, selectionX1), innerWidth)
  );
  const selectionWidth = x1 - x0;
  if (selectionWidth <= 0) return null;

  return createPortal(
    <div
      aria-hidden="true"
      className="pointer-events-none absolute z-[1]"
      style={{
        top: margin.top,
        left: margin.left + x0,
        width: selectionWidth,
        height: innerHeight,
        backgroundColor: pattern.color,
        opacity: pattern.opacity ?? 0.08,
      }}
    />,
    container
  );
}

export function ChartBrushSelectionOverlay(
  props: ChartBrushSelectionOverlayProps
) {
  const { containerRef, margin } = useChartStable();
  return (
    <ChartBrushSelectionOverlayContent
      {...props}
      containerRef={containerRef}
      margin={margin}
    />
  );
}
