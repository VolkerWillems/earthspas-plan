"use client";

import Link from "next/link";
import * as React from "react";
import { ArrowRight } from "@/lib/phosphor-icons";
import { cn } from "@/lib/utils";

type Accent = "primary" | "secondary";

export function PageIntro({ eyebrow, title, text, accent = "secondary", actions }: { eyebrow: string; title: string; text: string; accent?: Accent; actions?: React.ReactNode }) {
  return (
    <section className={cn("page-intro", accent === "primary" ? "theme-primary" : "theme-secondary")}>
      <div className="content-shell py-14 sm:py-20 lg:py-24">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 max-w-5xl text-4xl uppercase leading-[1.02] sm:text-5xl lg:text-6xl">{title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-white/82 sm:text-xl">{text}</p>
        {actions && <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{actions}</div>}
      </div>
    </section>
  );
}

export function SectionHeader({ eyebrow, title, text, accent = "primary" }: { eyebrow: string; title: string; text?: string; accent?: Accent }) {
  return (
    <div className={accent === "primary" ? "theme-primary" : "theme-secondary"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 max-w-4xl text-3xl uppercase leading-tight sm:text-4xl">{title}</h2>
      {text && <p className="mt-4 max-w-4xl text-lg leading-8 text-white/76">{text}</p>}
    </div>
  );
}

export function Panel({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("panel", className)}>{children}</div>;
}

export function StatCard({ label, value, detail, accent = "primary" }: { label: string; value: string; detail?: string; accent?: Accent }) {
  return (
    <Panel className={cn("stat-card", accent === "primary" ? "theme-primary" : "theme-secondary")}>
      <p className="text-sm uppercase tracking-[0.14em] text-white/58">{label}</p>
      <p className="mt-3 text-3xl text-[var(--section-accent)] sm:text-4xl">{value}</p>
      {detail && <p className="mt-3 text-base leading-6 text-white/72">{detail}</p>}
    </Panel>
  );
}

export function PrimaryLink({ href, children, accent = "primary" }: { href: string; children: React.ReactNode; accent?: Accent }) {
  return (
    <Link href={href} className={cn("action-link", accent === "primary" ? "theme-primary" : "theme-secondary")}>
      <span>{children}</span>
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}

export function RangeField({ label, helper, value, min, max, step, display, onChange, accent = "primary" }: { label: string; helper?: string; value: number; min: number; max: number; step: number; display: string; onChange: (value: number) => void; accent?: Accent }) {
  return (
    <label className={cn("block", accent === "primary" ? "theme-primary" : "theme-secondary")}>
      <div className="mb-3 flex items-start justify-between gap-4">
        <div>
          <span className="text-base text-white">{label}</span>
          {helper && <p className="mt-1 text-sm leading-5 text-white/58">{helper}</p>}
        </div>
        <span className="value-chip">{display}</span>
      </div>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(event) => onChange(Number(event.target.value))}
        className="site-range"
      />
    </label>
  );
}

export function ProgressBar({ value, accent = "primary" }: { value: number; accent?: Accent }) {
  return (
    <div className={cn("theme-primary", accent === "secondary" && "theme-secondary")}>
      <div className="h-2.5 overflow-hidden rounded-full bg-white/8">
        <div className="h-full rounded-full bg-[var(--section-accent)] transition-all duration-300" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
      </div>
    </div>
  );
}

export function NumberField({ label, value, onChange, suffix }: { label: string; value: number; onChange: (value: number) => void; suffix?: string }) {
  return (
    <label className="block">
      <span className="text-sm uppercase tracking-[0.13em] text-white/58">{label}</span>
      <div className="mt-2 flex items-center rounded-md border border-border bg-background/70 focus-within:border-primary">
        <input type="number" min={0} value={value} onChange={(event) => onChange(Math.max(0, Number(event.target.value)))} className="min-h-11 w-full bg-transparent px-3 text-lg text-white outline-none" />
        {suffix && <span className="px-3 text-sm text-white/50">{suffix}</span>}
      </div>
    </label>
  );
}
