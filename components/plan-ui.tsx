"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { ArrowRight } from "@/lib/phosphor-icons";
import { cn } from "@/lib/utils";
import { HeroMockupGallery, type HeroMockupItem } from "@/components/hero-mockup-gallery";

type Accent = "primary" | "secondary";

const marketingMockups: HeroMockupItem[] = [
  {
    id: "marketing",
    label: "Marketing",
    title: "Centrale marketingsturing",
    description: "Campagnes, kanaalprestaties, advertentiebudget, leads en omzetresultaten worden samengebracht in één helder managementoverzicht.",
    image: "/mockup/marketing.png",
    imageAlt: "Canva-concept van een premium Earth Spas marketingdashboard",
  },
];

const softwareMockups: HeroMockupItem[] = [
  {
    id: "crm",
    label: "CRM",
    title: "CRM en commerciële pipeline",
    description: "Leads, contacten, afspraken, offertes, kansen en omzet worden zichtbaar in het commerciële dashboard van dezelfde Earth Spas-app.",
    image: "/mockup/crm.png",
    imageAlt: "Canva-concept van een premium CRM- en verkoopdashboard",
  },
  {
    id: "support",
    label: "Support",
    title: "Service- en supportdashboard",
    description: "Tickets, kennisbank, klantstatus, servicegeschiedenis en AI-ondersteuning worden beheerd in het supportdashboard van dezelfde app.",
    image: "/mockup/support.png",
    imageAlt: "Canva-concept van een premium support- en servicedashboard",
  },
  {
    id: "management",
    label: "Management",
    title: "Managementdashboard",
    description: "Kerncijfers, meldingen, teamoverzicht en commerciële voortgang blijven in het managementdashboard van dezelfde app direct inzichtelijk, ook mobiel.",
    image: "/mockup/App2.png",
    imageAlt: "Canva-concept van het mobiele Earth Spas managementdashboard",
  },
];

export function PageIntro({
  eyebrow,
  title,
  text,
  accent = "secondary",
  actions,
  image,
  imageAlt = "",
  imagePosition = "center",
}: {
  eyebrow: string;
  title: string;
  text: string;
  accent?: Accent;
  actions?: React.ReactNode;
  image?: string;
  imageAlt?: string;
  imagePosition?: string;
}) {
  const pathname = usePathname();
  const mockupConfig = pathname === "/marketing"
    ? { eyebrow: "Concept · centrale marketingsturing", items: marketingMockups }
    : pathname === "/software"
      ? { eyebrow: "Concept · één app, drie dashboards", items: softwareMockups }
      : null;

  return (
    <section className={cn("page-intro", accent === "primary" ? "theme-primary" : "theme-secondary")}>
      <div className={cn("content-shell page-intro-inner", (image || mockupConfig) && "page-intro-split")}>
        <div className="page-intro-copy" data-reveal="up">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-4 max-w-5xl text-3xl uppercase leading-[1.02] sm:text-4xl lg:text-5xl">{title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/82 sm:text-xl">{text}</p>
          {actions && <div className="action-group mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{actions}</div>}
        </div>
        {mockupConfig ? (
          <div data-reveal="scale" data-reveal-delay="90">
            <HeroMockupGallery eyebrow={mockupConfig.eyebrow} items={mockupConfig.items} />
          </div>
        ) : image ? (
          <div className="page-intro-visual motion-border" data-reveal="scale" data-reveal-delay="90" data-motion-card aria-hidden={imageAlt ? undefined : true}>
            <img src={image} alt={imageAlt} style={{ objectPosition: imagePosition }} />
            <div className="page-intro-visual-shade" />
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function SectionHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string; accent?: Accent }) {
  return (
    <div data-reveal="up">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 max-w-4xl text-3xl uppercase leading-tight sm:text-4xl">{title}</h2>
      {text && <p className="mt-4 max-w-4xl text-lg leading-8 text-white/76">{text}</p>}
    </div>
  );
}

export function Panel({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("panel motion-card", className)} data-reveal="up" data-motion-card>{children}</div>;
}

export function StatCard({ label, value, detail }: { label: string; value: string; detail?: string; accent?: Accent }) {
  return (
    <Panel className="stat-card">
      <p className="text-sm uppercase tracking-[0.14em] text-white/58">{label}</p>
      <p key={value} className="value-change mt-3 text-3xl text-[var(--section-accent)] sm:text-4xl">{value}</p>
      {detail && <p className="mt-3 text-base leading-6 text-white/72">{detail}</p>}
    </Panel>
  );
}

export function PrimaryLink({ href, children }: { href: string; children: React.ReactNode; accent?: Accent }) {
  return (
    <Link href={href} className="action-link">
      <span>{children}</span>
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}

export function RangeField({ label, helper, value, min, max, step, display, onChange }: { label: string; helper?: string; value: number; min: number; max: number; step: number; display: string; onChange: (value: number) => void; accent?: Accent }) {
  const progress = max === min ? 0 : Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));

  return (
    <label className="range-field block">
      <div className="mb-3 flex items-start justify-between gap-4">
        <div>
          <span className="text-base text-white">{label}</span>
          {helper && <p className="mt-1 text-sm leading-5 text-white/58">{helper}</p>}
        </div>
        <span key={display} className="value-chip value-change">{display}</span>
      </div>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        aria-label={label}
        aria-valuetext={display}
        onChange={(event) => onChange(Number(event.target.value))}
        className="site-range"
        style={{ "--range-progress": `${progress}%` } as React.CSSProperties}
      />
    </label>
  );
}

export function ProgressBar({ value }: { value: number; accent?: Accent }) {
  return (
    <div className="progress-track h-2.5 overflow-hidden rounded-full bg-white/8">
      <div className="progress-fill h-full rounded-full bg-[var(--section-accent)] transition-all duration-500" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}

export function NumberField({
  label,
  helper,
  value,
  onChange,
  prefix,
  suffix,
  step = 1,
  max,
}: {
  label: string;
  helper?: string;
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
  step?: number;
  max?: number;
}) {
  return (
    <label className="number-field block">
      <span className="text-sm uppercase tracking-[0.13em] text-white/58">{label}</span>
      {helper && <p className="mt-1 text-sm leading-5 text-white/52">{helper}</p>}
      <div className="number-field-control mt-2 flex items-center rounded-md border border-border bg-background/70 focus-within:border-[var(--section-accent)]">
        {prefix && <span className="pl-3 text-base text-white/55">{prefix}</span>}
        <input
          type="number"
          min={0}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(Math.max(0, Number(event.target.value)))}
          className="min-h-11 min-w-0 w-full bg-transparent px-3 text-lg text-white outline-none"
        />
        {suffix && <span className="number-field-suffix whitespace-nowrap px-3 text-sm text-white/50">{suffix}</span>}
      </div>
    </label>
  );
}
