"use client";

import * as React from "react";

import { BorderGlow } from "@/components/ui/border-glow";
import { cn } from "@/lib/utils";

type SpotlightCardProps = React.ComponentProps<"div"> & {
  borderGlow?: boolean;
  spotlightColor?: string;
};

export const SpotlightCard = React.forwardRef<HTMLDivElement, SpotlightCardProps>(
  function SpotlightCard(
    {
      borderGlow = true,
      children,
      className,
      onPointerLeave,
      onPointerMove,
      spotlightColor = "var(--section-accent)",
      style,
      ...props
    },
    forwardedRef,
  ) {
    const localRef = React.useRef<HTMLDivElement>(null);

    React.useImperativeHandle(forwardedRef, () => localRef.current as HTMLDivElement);

    function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
      const element = localRef.current;
      if (element) {
        const rect = element.getBoundingClientRect();
        element.style.setProperty("--spotlight-x", `${event.clientX - rect.left}px`);
        element.style.setProperty("--spotlight-y", `${event.clientY - rect.top}px`);
      }
      onPointerMove?.(event);
    }

    function handlePointerLeave(event: React.PointerEvent<HTMLDivElement>) {
      const element = localRef.current;
      if (element) {
        element.style.setProperty("--spotlight-x", "50%");
        element.style.setProperty("--spotlight-y", "35%");
      }
      onPointerLeave?.(event);
    }

    const mergedStyle = {
      "--spotlight-color": spotlightColor,
      "--spotlight-x": "50%",
      "--spotlight-y": "35%",
      ...style,
    } as React.CSSProperties;

    return (
      <div
        ref={localRef}
        className={cn(
          "group/spotlight relative isolate overflow-hidden transition-[transform,border-color,box-shadow] duration-300 motion-safe:hover:-translate-y-0.5",
          className,
        )}
        onPointerLeave={handlePointerLeave}
        onPointerMove={handlePointerMove}
        style={mergedStyle}
        {...props}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover/spotlight:opacity-100 group-focus-within/spotlight:opacity-100"
          style={{
            background:
              "radial-gradient(24rem circle at var(--spotlight-x) var(--spotlight-y), color-mix(in srgb, var(--spotlight-color) 16%, transparent), transparent 70%)",
          }}
        />
        {borderGlow ? <BorderGlow color={spotlightColor} /> : null}
        {children}
      </div>
    );
  },
);

SpotlightCard.displayName = "SpotlightCard";
