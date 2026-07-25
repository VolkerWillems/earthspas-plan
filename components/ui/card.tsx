import * as React from "react";

import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "group/card relative isolate flex min-w-0 flex-col gap-[var(--space-5)] overflow-hidden rounded-[var(--radius-md)] border border-[color-mix(in_srgb,var(--section-accent)_26%,var(--border-default))] bg-[linear-gradient(145deg,color-mix(in_srgb,var(--surface-raised)_88%,var(--highlight-soft)),var(--surface-card)_72%)] py-[var(--card-padding)] text-[var(--text-primary)] shadow-[0_1px_0_var(--highlight-soft),0_1.1rem_3.5rem_color-mix(in_srgb,var(--palette-black)_34%,transparent)] transition-[transform,border-color,box-shadow,background-color] duration-300 before:pointer-events-none before:absolute before:inset-0 before:z-0 before:bg-[radial-gradient(circle_at_12%_0%,color-mix(in_srgb,var(--section-accent)_10%,transparent),transparent_38%)] before:opacity-80 after:pointer-events-none after:absolute after:inset-px after:z-0 after:rounded-[calc(var(--radius-md)-1px)] after:shadow-[inset_0_1px_0_color-mix(in_srgb,var(--palette-white)_7%,transparent)] motion-safe:hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--section-accent)_52%,var(--border-default))] hover:shadow-[0_1px_0_var(--highlight-medium),0_1.5rem_4.5rem_color-mix(in_srgb,var(--palette-black)_46%,transparent),0_0_2.5rem_color-mix(in_srgb,var(--section-accent)_9%,transparent)] [&>*]:relative [&>*]:z-[1]",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "grid gap-[var(--space-2)] px-[var(--card-padding)]",
        className,
      )}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-[family-name:var(--font-heading)] text-[length:var(--font-size-card-title)] leading-[var(--line-height-heading)] tracking-[var(--tracking-tight)] text-[var(--text-primary)]",
        className,
      )}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn(
        "text-[length:var(--font-size-sm)] leading-[var(--line-height-body)] text-[var(--text-secondary)]",
        className,
      )}
      {...props}
    />
  );
}

export function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("justify-self-end", className)}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-[var(--card-padding)]", className)}
      {...props}
    />
  );
}

export function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center px-[var(--card-padding)] pt-[var(--space-2)]",
        className,
      )}
      {...props}
    />
  );
}
