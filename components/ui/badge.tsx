import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center gap-1.5 rounded-[var(--radius-md)] border px-[var(--space-2)] py-1 text-[length:var(--font-size-2xs)] uppercase tracking-[var(--tracking-label)] leading-none",
  {
    variants: {
      variant: {
        default:
          "border-[var(--section-accent)]/45 bg-[color-mix(in_srgb,var(--section-accent)_12%,var(--surface-card))] text-[var(--section-accent)]",
        secondary:
          "border-[var(--border-default)] bg-[var(--surface-raised)] text-[var(--text-secondary)]",
        outline:
          "border-[var(--border-default)] bg-transparent text-[var(--text-primary)]",
        success:
          "border-[var(--success)]/45 bg-[color-mix(in_srgb,var(--success)_12%,var(--surface-card))] text-[var(--success)]",
        warning:
          "border-[var(--warning)]/45 bg-[color-mix(in_srgb,var(--warning)_12%,var(--surface-card))] text-[var(--warning)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type BadgeProps = React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}
