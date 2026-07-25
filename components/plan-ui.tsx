"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import {
  ArrowRight,
  ChartBar,
  CurrencyEur,
  Gauge,
  Globe,
  Info,
  ShieldCheck,
  Target,
  Users,
} from "@/lib/phosphor-icons";
import { cn } from "@/lib/utils";
import { HeroMockupGallery, type HeroMockupItem } from "@/components/hero-mockup-gallery";

type Accent = "primary" | "secondary";

type PanelProps = {
  className?: string;
  children: React.ReactNode;
  metricIcon?: React.ElementType;
};

const routeHeaderCopy: Record<string, { title: string; kicker: string }> = {
  "/": { title: "Digitale basis", kicker: "Status en groei" },
  "/strategie": { title: "Premium groeistrategie", kicker: "Positionering en markten" },
  "/marketing": { title: "Meetbare groei", kicker: "Campagnes en opvolging" },
  "/software": { title: "Verkoop- en serviceplatform", kicker: "Data en automatisering" },
  "/calculator": { title: "Kosten en scenario's", kicker: "Keuzes en resultaat" },
  "/checklist": { title: "Veilige overdracht", kicker: "Accounts en eigenaarschap" },
};

const routeHeroAssets: Record<string, { image: string; alt: string; position?: string }> = {
  "/calculator": {
    image: "/cards/calculator-card.png",
    alt: "Earth Spas kosten- en scenariocalculator",
    position: "center",
  },
  "/checklist": {
    image: "/cards/actielijst-card.png",
    alt: "Earth Spas overdrachts- en actielijst",
    position: "center",
  },
};

const conciseSectionTitles: Record<string, string> = {
  "Software status en development uren per onderdeel": "Gebouwde digitale basis",
  "De bestaande basis levert aantoonbaar bereik, verkeer en vertrouwen": "Bereik en vertrouwen",
  "Geregistreerde projectinzet en opgeleverde digitale basis": "Projectinzet en waarde",
  "De huidige geselecteerde digitale stack": "Geselecteerde digitale stack",
  "Vier pagina's met ieder één duidelijke functie": "Vervolgonderdelen",
  "Rustig premium, persoonlijk en aantoonbaar deskundig": "Premium merkpositie",
  "Eerst Nederland en NRW bewijzen, daarna pas breder uitbreiden": "Nederland en NRW eerst",
  "Waar Earth Spas voordeel heeft en waar eerst discipline nodig is": "Sterktes en risico's",
  "Gebruik ieder kanaal voor een duidelijke functie": "Rol per kanaal",
  "Laat echte projecten, expertise en zekerheid het verkoopwerk doen": "Echte projecten verkopen",
  "Bouw eerst bewijs, schaal daarna alleen wat verkoopt": "Bewijs voor schaal",
  "Een transparante scenario-calculatie zonder verborgen groeifactoren": "Budget naar omzet",
  "Niet alleen bereik inkopen, maar verkoopkansen opbouwen": "Van bereik naar verkoop",
  "Bepaal per kanaal hoeveel structureel beschikbaar is": "Budget per kanaal",
  "Drie scenario's op basis van expliciete aannames": "Drie groeiscenario's",
  "Concrete campagnes met vaste meet- en opvolgpunten": "Campagnes en meetpunten",
  "Advertenties, content en AI afzonderlijk instellen": "Budget per groeilaag",
  "De aanbevolen technische opbouw": "Technische opbouw",
  "Vier bouwfasen met duidelijke afhankelijkheden": "Vier bouwfasen",
  "De voorkeurskeuze staat voorop; alternatieven blijven beschikbaar": "Voorkeurskeuzes",
  "De acties met prioriteit ‘Nu’": "Directe acties",
  "Vier risico's die momenteel onnodig zijn geconcentreerd": "Vier directe risico's",
  "Persoonlijke accounts pas als laatste loskoppelen": "Accounts als laatste",
};

const metricIconRules: Array<{ pattern: RegExp; icon: React.ElementType }> = [
  { pattern: /websitegebruikers|actieve gebruikers|klanten/, icon: Users },
  { pattern: /google-score|reviews|vertrouwen/, icon: ShieldCheck },
  { pattern: /google-sessies|landingspagina|websiteverkeer|lokaal bereik|vertoningen/, icon: ChartBar },
  { pattern: /budget|omzet|kosten|prijs|break-even|besteed|euro/, icon: CurrencyEur },
  { pattern: /markt|regio|nederland|duitsland|belgië|luxemburg/, icon: Globe },
  { pattern: /groei|scenario|conversie|doel/, icon: Target },
  { pattern: /uur|inzet|gemiddeld|score/, icon: Gauge },
];

function getNodeText(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getNodeText).join(" ");
  if (React.isValidElement<{ children?: React.ReactNode }>(node)) return getNodeText(node.props.children);
  return "";
}

function getAutomaticMetricIcon(children: React.ReactNode) {
  const elements = React.Children.toArray(children).filter(
    (child): child is React.ReactElement<{ className?: string; children?: React.ReactNode }> => React.isValidElement(child),
  );

  const first = elements[0];
  const second = elements[1];
  if (!first || !second || first.type !== "p") return undefined;
  if (first.props.className?.includes("eyebrow")) return undefined;

  const secondIsHeading = second.type === "h3";
  const secondIsMetricValue = second.type === "p" && second.props.className?.includes("value-change");
  if (!secondIsHeading && !secondIsMetricValue) return undefined;

  const metricText = elements.slice(0, 3).map(getNodeText).join(" ").toLowerCase();
  return metricIconRules.find(({ pattern }) => pattern.test(metricText))?.icon;
}

const marketingMockups: HeroMockupItem[] = [
  {
    id: "marketing",
    label: "Marketing",
    title: "Marketingdashboard",
    description: "Campagnes, kanaalprestaties, budget, leads en omzet in één managementoverzicht.",
    image: "/mockup/marketing.png",
    imageAlt: "Earth Spas marketingdashboard",
  },
];

const softwareMockups: HeroMockupItem[] = [
  {
    id: "crm",
    label: "CRM",
    title: "CRM en pipeline",
    description: "Leads, afspraken, offertes, kansen en omzet in één commercieel dashboard.",
    image: "/mockup/crm.png",
    imageAlt: "Earth Spas CRM- en verkoopdashboard",
  },
  {
    id: "support",
    label: "Support",
    title: "Service en support",
    description: "Tickets, klantstatus, servicehistorie en AI-ondersteuning in één dashboard.",
    image: "/mockup/support.png",
    imageAlt: "Earth Spas support- en servicedashboard",
  },
  {
    id: "management",
    label: "Management",
    title: "Managementdashboard",
    description: "Kerncijfers, meldingen en commerciële voortgang, ook mobiel.",
    image: "/mockup/App2.png",
    imageAlt: "Earth Spas mobiel managementdashboard",
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
  const headerCopy = routeHeaderCopy[pathname];
  const routeHero = routeHeroAssets[pathname];
  const resolvedImage = routeHero?.image ?? image;
  const resolvedImageAlt = routeHero?.alt ?? imageAlt;
  const resolvedImagePosition = routeHero?.position ?? imagePosition;
  const mockupConfig = pathname === "/marketing"
    ? { eyebrow: "Marketingconcept", items: marketingMockups }
    : pathname === "/software"
      ? { eyebrow: "Softwareconcept", items: softwareMockups }
      : null;

  return (
    <section className={cn("page-intro", accent === "primary" ? "theme-primary" : "theme-secondary")}>
      <div className={cn("content-shell page-intro-inner", (resolvedImage || mockupConfig) && "page-intro-split")}>
        <div className="page-intro-copy" data-reveal="up">
          <p className="eyebrow">{eyebrow}</p>
          <p className="page-intro-kicker">{headerCopy?.kicker ?? title}</p>
          <h1>{headerCopy?.title ?? title}</h1>
          <p className="page-intro-subtitle">{text}</p>
          {actions && <div className="action-group">{actions}</div>}
        </div>
        {mockupConfig ? (
          <div data-reveal="scale" data-reveal-delay="90">
            <HeroMockupGallery eyebrow={mockupConfig.eyebrow} items={mockupConfig.items} />
          </div>
        ) : resolvedImage ? (
          <div
            className="page-intro-visual motion-border"
            data-reveal="scale"
            data-reveal-delay="90"
            data-motion-card
            aria-hidden={resolvedImageAlt ? undefined : true}
          >
            <img src={resolvedImage} alt={resolvedImageAlt} style={{ objectPosition: resolvedImagePosition }} />
            <div className="page-intro-visual-shade" />
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function SectionHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string; accent?: Accent }) {
  const showBudgetStrategy = title === "Advertenties, content en AI afzonderlijk instellen";
  const displayTitle = conciseSectionTitles[title] ?? title;

  return (
    <div className="section-header" data-reveal="up">
      <p className="eyebrow">{eyebrow}</p>
      <h2 title={displayTitle === title ? undefined : title}>{displayTitle}</h2>
      {text && <p>{text}</p>}
      {showBudgetStrategy && (
        <div className="budget-test-strategy">
          <div className="budget-test-intro">
            <Info className="h-6 w-6 shrink-0" />
            <div>
              <strong>Eerst testen, dan opschalen</strong>
              <p>Start klein en meet leads, afspraken, offertes en verkopen. Alleen bewezen campagnes krijgen meer budget.</p>
            </div>
          </div>
          <div className="budget-test-steps">
            <div><span>01</span><strong>Kleine test</strong><p>Beperkt budget, één doelgroep en één boodschap.</p></div>
            <div><span>02</span><strong>Resultaat meten</strong><p>Volg kosten per lead, afspraak, offerte en verkoop.</p></div>
            <div><span>03</span><strong>Opschalen</strong><p>Vergroot winnaars en stop zwakke tests.</p></div>
          </div>
        </div>
      )}
    </div>
  );
}

export function Panel({ className, children, metricIcon }: PanelProps) {
  const isPremiumStatement = getNodeText(children).includes("Positioneringszin");
  const MetricIcon = metricIcon ?? getAutomaticMetricIcon(children);
  const premiumStyle: React.CSSProperties | undefined = isPremiumStatement
    ? {
        backgroundImage: "linear-gradient(110deg, rgba(7,16,23,.97), rgba(7,16,23,.74)), url('/cards/card-bg.png')",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }
    : undefined;

  return (
    <div
      className={cn(
        "panel motion-card",
        MetricIcon && "metric-panel",
        isPremiumStatement && "premium-statement-card",
        className,
      )}
      style={premiumStyle}
      data-reveal="up"
      data-motion-card
    >
      {MetricIcon && (
        <span className="panel-metric-icon" aria-hidden="true">
          <MetricIcon />
        </span>
      )}
      {children}
    </div>
  );
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

export function RangeField({
  label,
  helper,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string;
  helper?: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="range-field">
      <span className="range-field-head">
        <span>{label}</span>
        <strong>{display}</strong>
      </span>
      {helper && <span className="range-field-helper">{helper}</span>}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="progress-track" aria-label={`${value}% voltooid`}>
      <div className="progress-value" style={{ width: `${value}%` }} />
    </div>
  );
}
