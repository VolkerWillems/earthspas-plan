import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const badgeVariants = cva(
  "inline-flex h-auto min-h-0 w-fit shrink-0 items-center gap-[var(--space-1)] rounded-[var(--radius-sm)] border px-[var(--badge-padding-inline)] py-[0.18rem] text-[length:var(--badge-font-size)] uppercase tracking-[var(--tracking-label)] leading-none whitespace-nowrap",
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
        destructive:
          "border-[var(--destructive)]/45 bg-[color-mix(in_srgb,var(--destructive)_12%,var(--surface-card))] text-[var(--destructive)]",
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
