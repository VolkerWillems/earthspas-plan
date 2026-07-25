"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { ArrowRight, Info } from "@/lib/phosphor-icons";
import { cn } from "@/lib/utils";
import { HeroMockupGallery, type HeroMockupItem } from "@/components/hero-mockup-gallery";
import { SpotlightCard } from "@/components/ui/spotlight-card";

type Accent = "primary" | "secondary";

const routeHeaderCopy: Record<string, { title: string; kicker: string }> = {
  "/": { title: "Digitale basis", kicker: "Status en groei" },
  "/strategie": { title: "Premium groeistrategie", kicker: "Positionering en markten" },
  "/marketing": { title: "Meetbare groei", kicker: "Campagnes en opvolging" },
  "/software": { title: "Verkoop- en serviceplatform", kicker: "Data en automatisering" },
  "/calculator": { title: "Kosten en scenario's", kicker: "Keuzes en resultaat" },
  "/checklist": { title: "Veilige overdracht", kicker: "Accounts en eigenaarschap" },
};

const routeHeroAssets: Record<string, { image: string; alt: string; position?: string }> = {
  "/": {
    image: "/earth-spas-collage-a-starry-lake-1920x1080.jpg",
    alt: "Earth Spas spa in een premium buitenomgeving",
    position: "center",
  },
  "/strategie": {
    image: "/earth-spas-collage-b-glacier-1920x1080.jpg",
    alt: "Earth Spas spa in een rustige premium wellnessomgeving",
    position: "center",
  },
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

const sectionTitleOverrides: Record<string, string> = {
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

function compactSectionTitle(title: string) {
  const override = sectionTitleOverrides[title];
  if (override) return override;

  const firstClause = title.split(/[;:]/)[0]?.trim() || title;
  const words = firstClause.split(/\s+/);
  return words.length > 6 ? words.slice(0, 6).join(" ") : firstClause;
}

function getNodeText(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getNodeText).join(" ");
  if (React.isValidElement<{ children?: React.ReactNode }>(node)) return getNodeText(node.props.children);
  return "";
}

function compactPremiumStatement(node: React.ReactNode): React.ReactNode {
  return React.Children.map(node, (child) => {
    if (!React.isValidElement<{ children?: React.ReactNode; className?: string }>(child)) return child;

    const isStatement = child.type === "blockquote";
    const nextChildren = isStatement
      ? "Premium advies. Betrouwbare installatie. Blijvende service."
      : compactPremiumStatement(child.props.children);

    return React.cloneElement(child, {
      children: nextChildren,
      className: isStatement
        ? cn(child.props.className, "max-w-[25ch] !text-[clamp(1.55rem,2.5vw,2.35rem)] !leading-[1.08]")
        : child.props.className,
    });
  });
}

const marketingMockups: HeroMockupItem[] = [
  {
    id: "marketing",
    label: "Marketing",
    title: "Marketingdashboard",
    description: "Campagnes, kanaalprestaties, budget, leads en omzetresultaten in één managementoverzicht.",
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
          <div className="page-intro-visual motion-border" data-reveal="scale" data-reveal-delay="90" data-motion-card aria-hidden={resolvedImageAlt ? undefined : true}>
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
  const displayTitle = compactSectionTitle(title);

  return (
    <div className="section-header" data-reveal="up">
      <p className="eyebrow">{eyebrow}</p>
      <h2 title={title}>{displayTitle}</h2>
      {text && <p>{text}</p>}
      {showBudgetStrategy && (
        <div className="budget-test-strategy">
          <div className="budget-test-intro">
            <Info className="h-6 w-6 shrink-0" />
            <div>
              <strong>Eerst testen, dan opschalen</strong>
              <p>Start klein en meet leadkwaliteit, afspraken, offertes en verkopen. Alleen bewezen campagnes krijgen extra budget.</p>
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

export function Panel({ className, children }: { className?: string; children: React.ReactNode }) {
  const isPremiumStatement = getNodeText(children).includes("Positioneringszin");
  const displayChildren = isPremiumStatement ? compactPremiumStatement(children) : children;
  const backgroundImage = isPremiumStatement
    ? "linear-gradient(110deg, rgba(7,16,23,.97), rgba(7,16,23,.74)), url('/cards/card-bg.png')"
    : "linear-gradient(145deg, color-mix(in srgb, var(--surface-raised) 90%, var(--highlight-soft)), var(--surface-card) 72%)";

  return (
    <SpotlightCard
      className={cn(
        "panel motion-card [&>*]:relative [&>*]:z-[1] hover:border-[color-mix(in_srgb,var(--section-accent)_52%,var(--border-default))]",
        isPremiumStatement && "premium-statement-card",
        className,
      )}
      data-motion-card
      data-reveal="up"
      spotlightColor="var(--section-accent)"
      style={{
        backgroundColor: "var(--surface-card)",
        backgroundImage,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        borderColor: "color-mix(in srgb, var(--section-accent) 28%, var(--border-default))",
        boxShadow: "0 1px 0 var(--highlight-soft), 0 1.1rem 3.5rem color-mix(in srgb, var(--palette-black) 34%, transparent)",
      }}
    >
      {displayChildren}
    </SpotlightCard>
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
    <Link
      href={href}
      className="action-link bg-[length:220%_100%] transition-[background-position,transform,box-shadow,filter] duration-500 motion-safe:hover:-translate-y-px hover:bg-[position:100%_0]"
      style={{
        backgroundImage: "linear-gradient(115deg, var(--section-accent), color-mix(in srgb, var(--section-accent) 68%, var(--brand-secondary)), var(--section-accent))",
        backgroundSize: "220% 100%",
        boxShadow: "0 0.65rem 1.9rem color-mix(in srgb, var(--section-accent) 16%, transparent), inset 0 1px 0 color-mix(in srgb, var(--palette-white) 18%, transparent)",
      }}
    >
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
