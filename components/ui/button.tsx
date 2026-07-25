import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex min-h-[var(--control-height)] items-center justify-center gap-[var(--control-gap)] whitespace-nowrap rounded-[var(--radius-md)] border px-[var(--space-4)] text-[length:var(--font-size-sm)] transition-[color,background-color,border-color,box-shadow,transform,filter] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:pointer-events-none disabled:opacity-45 [&_svg]:pointer-events-none [&_svg]:size-[var(--font-size-icon)] [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border-[var(--section-accent)] bg-[var(--section-accent)] text-[var(--primary-foreground)] shadow-[var(--shadow-sm)] hover:brightness-105 active:translate-y-px",
        secondary:
          "border-[var(--border-default)] bg-[var(--surface-raised)] text-[var(--text-primary)] hover:border-[var(--border-hover)] hover:bg-[var(--surface-card-alt)]",
        outline:
          "border-[var(--section-accent)]/55 bg-transparent text-[var(--section-accent)] hover:bg-[color-mix(in_srgb,var(--section-accent)_9%,transparent)]",
        ghost:
          "border-transparent bg-transparent text-[var(--text-secondary)] hover:bg-[var(--surface-raised)] hover:text-[var(--text-primary)]",
        destructive:
          "border-[var(--destructive)] bg-[var(--destructive)] text-white hover:brightness-105",
      },
      size: {
        default: "h-[var(--control-height)]",
        sm: "min-h-[var(--control-height-sm)] px-[var(--space-3)] text-[length:var(--font-size-xs)]",
        lg: "min-h-[calc(var(--control-height)+var(--space-2))] px-[var(--space-6)]",
        icon: "size-[var(--control-height)] min-h-0 px-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  asChild = false,
  type,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      type={asChild ? undefined : type ?? "button"}
      {...props}
    />
  );
}
