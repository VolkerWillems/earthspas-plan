import * as React from "react";

import { cn } from "@/lib/utils";

type BrandIconSize = "sm" | "md" | "lg";

export type BrandIconItem = {
  src: string;
  label: string;
  invert?: boolean;
  imageClassName?: string;
};

type BrandIconProps = BrandIconItem & {
  size?: BrandIconSize;
  className?: string;
};

type BrandIconGroupProps = {
  icons: BrandIconItem[];
  size?: BrandIconSize;
  className?: string;
};

const sizeClasses: Record<BrandIconSize, string> = {
  sm: "size-[var(--icon-box-sm)]",
  md: "size-[var(--icon-box)]",
  lg: "size-[var(--icon-box-lg)]",
};

export function BrandIcon({
  src,
  label,
  invert = false,
  imageClassName,
  size = "md",
  className,
}: BrandIconProps) {
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center overflow-hidden rounded-[var(--radius)] border border-[var(--border-default)] bg-[var(--surface-raised)] p-[var(--space-2)] shadow-[var(--shadow-inset)]",
        sizeClasses[size],
        className,
      )}
      title={label}
      aria-hidden="true"
    >
      <img
        src={src}
        alt=""
        className={cn("h-full w-full object-contain", invert && "invert", imageClassName)}
      />
    </span>
  );
}

export function BrandIconGroup({ icons, size = "md", className }: BrandIconGroupProps) {
  return (
    <span className={cn("flex items-center gap-[var(--space-2)]", className)} aria-hidden="true">
      {icons.map((icon) => (
        <BrandIcon key={`${icon.src}-${icon.label}`} {...icon} size={size} />
      ))}
    </span>
  );
}
