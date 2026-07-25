import * as React from "react";

import { cn } from "@/lib/utils";

export function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div data-slot="table-container" className="relative w-full overflow-x-auto">
      <table
        data-slot="table"
        className={cn("w-full caption-bottom border-collapse text-left text-[length:var(--font-size-sm)]", className)}
        {...props}
      />
    </div>
  );
}

export function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return <thead data-slot="table-header" className={cn("border-b border-[var(--border-default)]", className)} {...props} />;
}

export function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return <tbody data-slot="table-body" className={cn("[&_tr:last-child]:border-0", className)} {...props} />;
}

export function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return <tfoot data-slot="table-footer" className={cn("border-t border-[var(--border-default)] bg-[var(--surface-raised)]", className)} {...props} />;
}

export function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn("border-b border-[var(--border-default)] transition-colors hover:bg-[var(--surface-raised)] data-[state=selected]:bg-[var(--surface-card-alt)]", className)}
      {...props}
    />
  );
}

export function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn("h-[var(--control-height)] px-[var(--space-4)] align-middle text-[length:var(--font-size-xs)] uppercase tracking-[var(--tracking-label)] text-[var(--text-muted)]", className)}
      {...props}
    />
  );
}

export function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return <td data-slot="table-cell" className={cn("px-[var(--space-4)] py-[var(--space-3)] align-middle text-[var(--text-secondary)]", className)} {...props} />;
}

export function TableCaption({ className, ...props }: React.ComponentProps<"caption">) {
  return <caption data-slot="table-caption" className={cn("mt-[var(--space-3)] text-[length:var(--font-size-xs)] text-[var(--text-muted)]", className)} {...props} />;
}
