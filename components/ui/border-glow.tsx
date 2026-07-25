import * as React from "react";

import { cn } from "@/lib/utils";

type BorderGlowProps = {
  className?: string;
  color?: string;
};

export function BorderGlow({
  className,
  color = "var(--section-accent)",
}: BorderGlowProps) {
  const style = {
    "--border-glow-color": color,
    background:
      "radial-gradient(18rem circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), color-mix(in srgb, var(--border-glow-color) 72%, transparent), transparent 68%)",
    padding: "1px",
    WebkitMask:
      "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
    WebkitMaskComposite: "xor",
    maskComposite: "exclude",
  } as React.CSSProperties;

  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 z-[2] rounded-[inherit] opacity-45 transition-opacity duration-500 group-hover/spotlight:opacity-100",
        className,
      )}
      style={style}
    />
  );
}
