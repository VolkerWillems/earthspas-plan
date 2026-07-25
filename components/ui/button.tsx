import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex min-h-[var(--control-height)] items-center justify-center gap-[var(--control-gap)] whitespace-nowrap rounded-[var(--radius-md)] border px-[var(--space-4)] text-[length:var(--font-size-sm)] transition-[color,background-color,background-position,border-color,box-shadow,transform,filter] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:pointer-events-none disabled:opacity-45 [&_svg]:pointer-events-none [&_svg]:size-[var(--font-size-icon)] [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border-[color-mix(in_srgb,var(--section-accent)_72%,var(--border-default))] bg-[linear-gradient(115deg,var(--section-accent),color-mix(in_srgb,var(--section-accent)_68%,var(--brand-secondary)),var(--section-accent))] bg-[length:220%_100%] text-[var(--primary-foreground)] shadow-[0_0.65rem_1.9rem_color-mix(in_srgb,var(--section-accent)_18%,transparent),inset_0_1px_0_color-mix(in_srgb,var(--palette-white)_18%,transparent)] hover:-translate-y-px hover:bg-[position:100%_0] hover:brightness-105 hover:shadow-[0_0.9rem_2.6rem_color-mix(in_srgb,var(--section-accent)_26%,transparent),inset_0_1px_0_color-mix(in_srgb,var(--palette-white)_24%,transparent)] active:translate-y-0",
        secondary:
          "border-[var(--border-default)] bg-[linear-gradient(145deg,var(--surface-raised),var(--surface-card))] text-[var(--text-primary)] shadow-[var(--shadow-sm),var(--shadow-inset)] hover:-translate-y-px hover:border-[var(--border-hover)] hover:bg-[var(--surface-card-alt)]",
        outline:
          "border-[var(--section-accent)]/55 bg-transparent text-[var(--section-accent)] hover:-translate-y-px hover:bg-[color-mix(in_srgb,var(--section-accent)_9%,transparent)]",
        ghost:
          "border-transparent bg-transparent text-[var(--text-secondary)] hover:bg-[var(--surface-raised)] hover:text-[var(--text-primary)]",
        destructive:
          "border-[var(--destructive)] bg-[var(--destructive)] text-white hover:-translate-y-px hover:brightness-105",
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
