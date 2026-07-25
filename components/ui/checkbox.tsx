"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "@/lib/phosphor-icons";

import { cn } from "@/lib/utils";

export function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer grid size-[var(--checkbox-size)] shrink-0 place-items-center rounded-[var(--radius-sm)] border border-[var(--border-strong)] bg-[var(--surface-card)] text-[var(--primary-foreground)] shadow-[var(--shadow-inset)] outline-none transition-[background-color,border-color,box-shadow] hover:border-[var(--border-hover)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] data-[state=checked]:border-[var(--section-accent)] data-[state=checked]:bg-[var(--section-accent)] disabled:cursor-not-allowed disabled:opacity-45",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator data-slot="checkbox-indicator">
        <Check className="size-[calc(var(--checkbox-size)*.64)]" weight="bold" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
