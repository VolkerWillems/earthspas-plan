import * as React from "react";

import { cn } from "@/lib/utils";

export function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      data-slot="input"
      type={type}
      className={cn(
        "h-[var(--control-height)] w-full min-w-0 rounded-[var(--radius-md)] border border-[var(--border-default)] bg-[var(--surface-card)] px-[var(--space-4)] text-[length:var(--font-size-body)] text-[var(--text-primary)] shadow-[var(--shadow-inset)] outline-none transition-[border-color,box-shadow,background-color] placeholder:text-[var(--text-muted)] hover:border-[var(--border-hover)] focus-visible:border-[var(--section-accent)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] disabled:cursor-not-allowed disabled:opacity-45",
        className,
      )}
      {...props}
    />
  );
}
