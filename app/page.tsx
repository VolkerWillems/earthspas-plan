"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Bot,
  BriefcaseBusiness,
  CalendarClock,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  Cloud,
  Code2,
  Database,
  Download,
  Gauge,
  Globe2,
  Headphones,
  Image as ImageIcon,
  Info,
  KeyRound,
  LayoutDashboard,
  LineChart,
  ListChecks,
  LockKeyhole,
  Mail,
  MessageSquareText,
  MousePointerClick,
  RefreshCw,
  Rocket,
  Save,
  Server,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Target,
  Users,
  WalletCards,
  WandSparkles,
  Workflow,
} from "lucide-react";
import { cn, euro, number } from "@/lib/utils";

type ToolItem = {
  id: string;
  name: string;
  category: "basis" | "actief" | "productie";
  monthly: number;
  description: string;
  required?: boolean;
  recommended?: boolean;
  exclusiveGroup?: "chatgpt";
  logoSlug?: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
};

type FeatureItem = {
  id: string;
  name: string;
  description: string;
  hoursLow: number;
  hoursHigh: number;
  marketLow: number;
  marketHigh: number;
  impact: "Verkoop" | "Marketing" | "Support" | "Data";
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
};

type ChecklistItem = {
  id: string;
  group: "Eigenaarschap" | "Techniek" | "Marketing" | "Afronding";
  title: string;
  description: string;
  owner: string;
  priority: "Nu" | "Daarna" | "Voor livegang";
};

type SavedState = {
  toolSelections: Record<string, boolean>;
  featureSelections: Record<string, boolean>;
  checklist: Record<string, boolean>;
  metaBudget: number;
  googleBudget: number;
  contentBudget: number;
  aiApiBudget: number;
  aiDevelopmentBudget: number;
  aiMediaBudget: number;
  currentSalesPerWeek: number;
  averageSalePrice: number;
  grossMargin: number;
  acquisitionCostPerSale: number;
  incrementalCostPerSale: number;
  involvement: "free" | "structured";
  hoursPerWeek: number;
  clientName: string;
  notes: string;
};

const tools: ToolItem[] = [
  { id: "payment", name: "Zakelijke betaalkaart", category: "basis", monthly: 0, description: "Alle accounts en credits rechtstreeks door Earth Spas betaald, met harde maandlimieten.", required: true, recommended: true, logoSlug: "paypal", icon: WalletCards },
  { id: "m365", name: "Microsoft 365 Business Basic", category: "basis", monthly: 5.2, description: "Zakelijke mail, agenda, SharePoint en gedeelde bestanden.", required: true, logoSlug: "microsoft", icon: Mail },
  { id: "bitwarden", name: "Bitwarden Teams", category: "basis", monthly: 7, description: "Wachtwoorden, 2FA, herstelcodes en noodtoegang voor twee beheerders.", required: true, logoSlug: "bitwarden", icon: ShieldCheck },
  { id: "github", name: "GitHub Team", category: "basis", monthly: 4, description: "Broncode en repository-eigendom aantoonbaar onder Earth Spas.", required: true, logoSlug: "github", icon: Code2 },
  { id: "cloudflare", name: "Cloudflare", category: "basis", monthly: 0, description: "DNS, SSL, CDN en basisbeveiliging voor NL, DE en LU.", required: true, logoSlug: "cloudflare", icon: Cloud },
  { id: "hetzner", name: "Eigen Hetzner-server + back-ups", category: "basis", monthly: 46, description: "Aanbevolen kern: Directus, n8n, agents en backend draaien onder Earth Spas-eigendom.", required: true, recommended: true, logoSlug: "hetzner", icon: Server },
  { id: "directus", name: "Directus self-hosted", category: "basis", monthly: 0, description: "Centrale bron voor modellen, content, media, SEO en vertalingen op de eigen server.", required: true, logoSlug: "directus", icon: Database },
  { id: "n8n", name: "n8n self-hosted", category: "basis", monthly: 0, description: "Workflows en agentautomatisering zonder tarief per uitvoering.", required: true, logoSlug: "n8n", icon: Workflow },
  { id: "doppler", name: "Doppler Developer", category: "basis", monthly: 0, description: "API-sleutels en deploymentconfiguratie centraal en overdraagbaar.", required: true, logoSlug: "doppler", icon: KeyRound },
  { id: "supabase", name: "Supabase Pro", category: "basis", monthly: 22, description: "Productiedatabase, storage, authenticatie en dagelijkse back-ups.", required: true, logoSlug: "supabase", icon: Database },
  { id: "vercel", name: "Vercel Pro", category: "actief", monthly: 18, description: "Alleen voor de snelle Next.js-frontend, previews en deployments; de kern draait op de eigen server.", recommended: true, logoSlug: "vercel", icon: Globe2 },
  { id: "resend", name: "Resend Pro", category: "actief", monthly: 18, description: "Betrouwbare formulieren, bevestigingen en systeemnotificaties op meerdere domeinen.", recommended: true, logoSlug: "resend", icon: Mail },
  { id: "chatgpt-plus", name: "ChatGPT Plus", category: "actief", monthly: 18, description: "Goedkoopste individuele AI-werkruimte met lagere gebruikslimieten.", exclusiveGroup: "chatgpt", logoSlug: "openai", icon: Bot },
  { id: "chatgpt-pro100", name: "ChatGPT Pro 5x", category: "actief", monthly: 88, description: "Voorkeurskeuze voor structureel research-, content-, analyse- en Codexwerk door Volker.", recommended: true, exclusiveGroup: "chatgpt", logoSlug: "openai", icon: Bot },
  { id: "chatgpt-pro200", name: "ChatGPT Pro 20x", category: "productie", monthly: 176, description: "Voor zeer intensieve bouw- en productiemaanden met de hoogste individuele gebruikslimiet.", exclusiveGroup: "chatgpt", logoSlug: "openai", icon: Rocket },
  { id: "chatgpt-business", name: "ChatGPT Business, 2 seats", category: "actief", monthly: 44, description: "Teamworkspace en centraal beheer; minder logisch als Volker de primaire intensieve gebruiker is.", exclusiveGroup: "chatgpt", logoSlug: "openai", icon: BriefcaseBusiness },
  { id: "figma", name: "Figma Professional", category: "actief", monthly: 14, description: "Website- en appdesign, prototypes en developer handoff.", recommended: true, logoSlug: "figma", icon: LayoutDashboard },
  { id: "canva", name: "Canva Pro", category: "actief", monthly: 11, description: "Dagelijkse socialcontent, presentaties, video en brand templates.", recommended: true, logoSlug: "canva", icon: ImageIcon },
  { id: "copilot", name: "GitHub Copilot Pro+", category: "productie", monthly: 34, description: "Premium codingmodellen en credits tijdens actieve bouw- en reviewmaanden.", recommended: true, logoSlug: "githubcopilot", icon: WandSparkles },
  { id: "envato", name: "Envato Core", category: "productie", monthly: 14, description: "Stock, templates, muziek, graphics en commerciële assets.", recommended: true, logoSlug: "envato", icon: Sparkles },
  { id: "elevenlabs", name: "ElevenLabs Starter", category: "productie", monthly: 5, description: "Meertalige voice-overs en uitlegcontent.", recommended: true, logoSlug: "elevenlabs", icon: Headphones },
  { id: "runway", name: "Runway Pro", category: "productie", monthly: 25, description: "AI-video, effecten en campagnevarianten met eigen Earth Spas-credits.", recommended: true, logoSlug: "runway", icon: Activity },
];

const features: FeatureItem[] = [
  { id: "crm", name: "CRM en commerciële pipeline", description: "Leads, bron, taal, modelinteresse, afspraken, offertes en omzet in één proces.", hoursLow: 120, hoursHigh: 220, marketLow: 12000, marketHigh: 25000, impact: "Verkoop", icon: Users },
  { id: "booking", name: "Showroom booking en reminders", description: "Beschikbare tijden, bevestiging, route, reminders en opvolging.", hoursLow: 40, hoursHigh: 80, marketLow: 5000, marketHigh: 10000, impact: "Verkoop", icon: CalendarClock },
  { id: "finder", name: "Spa Finder en productvergelijker", description: "Gestructureerd advies met maximaal drie passende modellen.", hoursLow: 60, hoursHigh: 120, marketLow: 8000, marketHigh: 15000, impact: "Verkoop", icon: MousePointerClick },
  { id: "advisor", name: "AI Spa Advisor", description: "Meertalige adviesagent op gevalideerde productdata, gekoppeld aan CRM.", hoursLow: 120, hoursHigh: 240, marketLow: 15000, marketHigh: 30000, impact: "Verkoop", icon: Bot },
  { id: "recovery", name: "Lead recovery en automatische opvolging", description: "E-mail, WhatsApp, reminders en nurture op basis van gedrag en voorkeuren.", hoursLow: 70, hoursHigh: 140, marketLow: 8000, marketHigh: 16000, impact: "Marketing", icon: Workflow },
  { id: "marketing-agent", name: "Marketing- en contentagent", description: "SEO, social posts, advertentievarianten, contentplanning en analyses.", hoursLow: 140, hoursHigh: 280, marketLow: 15000, marketHigh: 35000, impact: "Marketing", icon: WandSparkles },
  { id: "capture", name: "Mobiele installatie-capture app", description: "Foto- en videochecklist, tagging, crops, cases en publicatieworkflows.", hoursLow: 180, hoursHigh: 360, marketLow: 20000, marketHigh: 45000, impact: "Marketing", icon: ImageIcon },
  { id: "support", name: "Supportagent en kennisbank", description: "Onderhoud, handleidingen, foutmeldingen, tickets en menselijke escalatie.", hoursLow: 140, hoursHigh: 280, marketLow: 15000, marketHigh: 35000, impact: "Support", icon: MessageSquareText },
  { id: "voice", name: "Voice agent", description: "Gesproken advies via website of telefoon met samenvatting naar CRM.", hoursLow: 120, hoursHigh: 240, marketLow: 15000, marketHigh: 35000, impact: "Support", icon: Headphones },
  { id: "analytics", name: "Attribution en managementdashboards", description: "Van campagne naar lead, afspraak, offerte, verkoop en omzet.", hoursLow: 90, hoursHigh: 200, marketLow: 10000, marketHigh: 25000, impact: "Data", icon: BarChart3 },
];

const checklistItems: ChecklistItem[] = [
  { id: "payment-card", group: "Eigenaarschap", title: "Zakelijke betaalkaart regelen", description: "Earth Spas-betaalmiddel met vooraf afgesproken saldo en harde limieten voor software, AI en advertenties.", owner: "Jeroen / Wim", priority: "Nu" },
  { id: "admins", group: "Eigenaarschap", title: "Twee vaste beheerders aanwijzen", description: "Primaire en tweede beheerder voor accounts, hersteltoegang en noodgevallen vastleggen.", owner: "Earth Spas", priority: "Nu" },
  { id: "bitwarden", group: "Eigenaarschap", title: "Bitwarden-organisatie maken", description: "Wachtwoorden, 2FA-codes, herstelcodes en gedeelde kluizen gecontroleerd migreren.", owner: "Volker + Jeroen", priority: "Nu" },
  { id: "m365", group: "Eigenaarschap", title: "Microsoft 365-tenant aanmaken", description: "Earth Spas-tenant, gebruikers, gedeelde mailboxen, domeinen en migratiemoment vastleggen.", owner: "Volker + Jeroen", priority: "Nu" },
  { id: "github", group: "Eigenaarschap", title: "GitHub onder Earth Spas-eigendom", description: "Organisatie, repositories, twee owners en repositoryregels correct instellen.", owner: "Volker", priority: "Nu" },
  { id: "personal-payments", group: "Afronding", title: "Persoonlijke betaalmethoden verwijderen", description: "Pas nadat iedere nieuwe account, billingroute en acceptatietest aantoonbaar werkt.", owner: "Volker", priority: "Voor livegang" },
  { id: "cloudflare", group: "Techniek", title: "Cloudflare-account en DNS-inventaris", description: "Alle records exporteren, drie domeinen koppelen en nameserverwijziging alleen met rollbackplan uitvoeren.", owner: "Volker", priority: "Nu" },
  { id: "hetzner", group: "Techniek", title: "Eigen Hetzner-server inrichten", description: "Server hardenen, updates, firewall, Tailscale, monitoring en dagelijkse back-ups activeren.", owner: "Volker", priority: "Nu" },
  { id: "directus", group: "Techniek", title: "Directus gecontroleerd migreren", description: "Schema, database en assets back-uppen, testen en daarna pas naar de Earth Spas-server verplaatsen.", owner: "Volker", priority: "Daarna" },
  { id: "n8n", group: "Techniek", title: "n8n-workflows inventariseren en migreren", description: "Credentials opnieuw koppelen, foutmeldingen toevoegen en iedere kritieke flow testen.", owner: "Volker", priority: "Daarna" },
  { id: "supabase", group: "Techniek", title: "Supabase-organisatie overzetten", description: "Twee beheerders, RLS, back-ups, spend cap en productieproject onder Earth Spas plaatsen.", owner: "Volker", priority: "Nu" },
  { id: "vercel", group: "Techniek", title: "Vercel-team en projecten overzetten", description: "Frontend, environment variables, domeinen, previews en spend controls controleren.", owner: "Volker", priority: "Daarna" },
  { id: "resend", group: "Techniek", title: "Resend en e-maildomeinen overzetten", description: "Afzenders verifiëren en alle contact-, showroom- en serviceformulieren end-to-end testen.", owner: "Volker", priority: "Daarna" },
  { id: "doppler", group: "Techniek", title: "Doppler-workspace normaliseren", description: "Secrets roteren, rollen instellen en persoonlijke tokens uit productie verwijderen.", owner: "Volker", priority: "Daarna" },
  { id: "storage", group: "Techniek", title: "Bestands- en mediastructuur vastleggen", description: "SharePoint voor intern, Supabase/R2 voor publieke media, vaste namen en automatische back-up.", owner: "Samen", priority: "Daarna" },
  { id: "meta", group: "Marketing", title: "Meta Business volledig overzetten", description: "Pagina, Instagram, datasets, Pixel, betaalmethode, WhatsApp-route en twee beheerders controleren.", owner: "Samen", priority: "Nu" },
  { id: "google", group: "Marketing", title: "Google-accounts en billing normaliseren", description: "Business Profile, Cloud, Analytics, Tag Manager, Search Console en API-limieten onder Earth Spas.", owner: "Samen", priority: "Nu" },
  { id: "social", group: "Marketing", title: "Overige socialaccounts beveiligen", description: "TikTok, YouTube, Pinterest en LinkedIn met herstelmail, 2FA en twee beheerders.", owner: "Samen", priority: "Daarna" },
  { id: "ai-tools", group: "Marketing", title: "AI- en contenttools onder Earth Spas", description: "ChatGPT Pro, Copilot, Canva, Figma, Envato, ElevenLabs en Runway met losse creditlimieten.", owner: "Jeroen + Volker", priority: "Nu" },
  { id: "tracking", group: "Marketing", title: "Conversiemeting en CRM-events instellen", description: "Lead, showroomafspraak, offerte en verkoop terugkoppelen naar bron en campagne.", owner: "Volker", priority: "Voor livegang" },
  { id: "privacy", group: "Afronding", title: "AVG en toestemmingen vastleggen", description: "Marketingtoestemming, klantfoto's, WhatsApp, voice-transcripten en agent-escalaties goedkeuren.", owner: "Earth Spas", priority: "Voor livegang" },
  { id: "acceptance", group: "Afronding", title: "Acceptatietest en rollback uitvoeren", description: "Website, mail, formulieren, database, workflows, back-ups en herstelprocedure samen testen.", owner: "Samen", priority: "Voor livegang" },
  { id: "budgets", group: "Afronding", title: "Definitieve maandlimieten vastleggen", description: "Vast platform, AI/API, development-AI, media-AI, Meta Ads en Google Ads apart goedkeuren.", owner: "Jeroen / Wim", priority: "Nu" },
  { id: "workform", group: "Afronding", title: "Vorm van Volkers betrokkenheid kiezen", description: "Vrij en incidenteel of structureel aantal uren per week; tegenprestatie blijft buiten dit document.", owner: "Jeroen + Volker", priority: "Nu" },
];

const achievedResults = [
  { value: "652", label: "actieve gebruikers", helper: "GA4, 1 jan t/m 24 jul 2026" },
  { value: "321", label: "organische Google-sessies", helper: "zonder structurele SEO-campagne" },
  { value: "287", label: "landingspaginaweergaven", helper: "uit €35,90 Meta-test" },
  { value: "€0,13", label: "per landingspaginaweergave", helper: "eerste kleine advertentietest" },
  { value: "10.874", label: "lokaal bereik", helper: "uit €15,90 bereikcampagne" },
  { value: "504", label: "Google-klantinteracties", helper: "bedrijfsprofiel" },
  { value: "5,0", label: "Google-score", helper: "19 reviews" },
  { value: "9.742", label: "gemeten gebeurtenissen", helper: "huidige GA4-basis" },
];

const trafficSources = [
  { label: "Direct", value: 496 },
  { label: "Google organisch", value: 321 },
  { label: "Betaald verkeer", value: 58 },
  { label: "AI-assistenten", value: 15 },
];

const defaultTools = Object.fromEntries(tools.map((tool) => [tool.id, Boolean(tool.required || tool.recommended)]));
const defaultFeatures = Object.fromEntries(features.map((feature) => [feature.id, ["crm", "booking", "finder", "advisor", "recovery", "marketing-agent", "analytics"].includes(feature.id)]));
const defaultChecklist = Object.fromEntries(checklistItems.map((item) => [item.id, false]));

const initialState: SavedState = {
  toolSelections: defaultTools,
  featureSelections: defaultFeatures,
  checklist: defaultChecklist,
  metaBudget: 1000,
  googleBudget: 1500,
  contentBudget: 250,
  aiApiBudget: 250,
  aiDevelopmentBudget: 150,
  aiMediaBudget: 150,
  currentSalesPerWeek: 2,
  averageSalePrice: 6000,
  grossMargin: 38,
  acquisitionCostPerSale: 1500,
  incrementalCostPerSale: 150,
  involvement: "structured",
  hoursPerWeek: 10,
  clientName: "Jeroen",
  notes: "",
};

function Button({ className, variant = "primary", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "outline" | "ghost" | "gold" }) {
  return (
    <button
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 py-2.5 text-base font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        variant === "primary" && "bg-primary text-primary-foreground hover:bg-primary/90",
        variant === "gold" && "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        variant === "outline" && "border border-border bg-card/75 text-foreground hover:border-secondary/70 hover:bg-accent",
        variant === "ghost" && "text-foreground/90 hover:bg-accent hover:text-foreground",
        className,
      )}
      {...props}
    />
  );
}

function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("print-card rounded-lg border border-border bg-card/92 shadow-xl hairline", className)} {...props} />;
}

function LabelPill({ children, tone = "cyan" }: { children: React.ReactNode; tone?: "cyan" | "gold" | "white" }) {
  return (
    <span className={cn(
      "inline-flex items-center rounded-full border px-2.5 py-1 text-sm font-semibold",
      tone === "cyan" && "border-primary/40 bg-primary/10 text-primary",
      tone === "gold" && "border-secondary/50 bg-secondary/10 text-secondary",
      tone === "white" && "border-white/20 bg-white/5 text-foreground",
    )}>{children}</span>
  );
}

function Switch({ checked, onCheckedChange, disabled, label }: { checked: boolean; onCheckedChange: (value: boolean) => void; disabled?: boolean; label: string }) {
  return (
    <SwitchPrimitive.Root
      aria-label={label}
      checked={checked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      className="relative h-7 w-12 shrink-0 rounded-full border border-border bg-input transition data-[state=checked]:border-primary/70 data-[state=checked]:bg-primary disabled:cursor-not-allowed disabled:opacity-75"
    >
      <SwitchPrimitive.Thumb className="block h-5 w-5 translate-x-0.5 rounded-full bg-white shadow transition data-[state=checked]:translate-x-[1.45rem]" />
    </SwitchPrimitive.Root>
  );
}

function Range({ value, min, max, step, onChange, ariaLabel }: { value: number; min: number; max: number; step: number; onChange: (value: number) => void; ariaLabel: string }) {
  return (
    <SliderPrimitive.Root
      aria-label={ariaLabel}
      value={[value]}
      min={min}
      max={max}
      step={step}
      onValueChange={(next) => onChange(next[0])}
      className="relative flex h-8 w-full touch-none select-none items-center"
    >
      <SliderPrimitive.Track className="relative h-2 grow overflow-hidden rounded-full bg-input">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-6 w-6 rounded-full border-2 border-secondary bg-background shadow-md ring-offset-background transition hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
    </SliderPrimitive.Root>
  );
}

function ProviderLogo({ slug, icon: Icon, name }: { slug?: string; icon: ToolItem["icon"]; name: string }) {
  const [failed, setFailed] = React.useState(false);
  return (
    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-md border border-border bg-[#071018] text-secondary">
      {slug && !failed ? (
        <img
          src={`https://cdn.simpleicons.org/${slug}/C1B48C`}
          alt={`${name} logo`}
          className="h-6 w-6 object-contain"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : <Icon className="h-6 w-6" strokeWidth={1.6} />}
    </div>
  );
}

function Metric({ label, value, helper, icon: Icon, accent = "cyan" }: { label: string; value: string; helper?: string; icon: FeatureItem["icon"]; accent?: "cyan" | "gold" }) {
  return (
    <Card className="p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-foreground/75">{label}</p>
          <p className={cn("mt-2 font-[family-name:var(--font-heading)] text-3xl font-semibold tracking-tight", accent === "gold" ? "text-secondary" : "text-primary")}>{value}</p>
          {helper && <p className="mt-2 text-base leading-6 text-foreground/85">{helper}</p>}
        </div>
        <div className={cn("rounded-md border p-2.5", accent === "gold" ? "border-secondary/40 bg-secondary/10 text-secondary" : "border-primary/35 bg-primary/10 text-primary")}><Icon className="h-5 w-5" strokeWidth={1.6} /></div>
      </div>
    </Card>
  );
}

function SectionHeading({ kicker, title, text }: { kicker: string; title: string; text: string }) {
  return (
    <div className="max-w-4xl">
      <p className="section-kicker">{kicker}</p>
      <h2 className="mt-3 text-balance text-3xl font-semibold uppercase tracking-[0.03em] sm:text-4xl lg:text-5xl">{title}</h2>
      <p className="mt-5 text-lg leading-8 text-foreground/90 sm:text-xl">{text}</p>
    </div>
  );
}

function BudgetDonut({ platform, ads, content, ai }: { platform: number; ads: number; content: number; ai: number }) {
  const total = Math.max(platform + ads + content + ai, 1);
  const values = [platform, ads, content, ai];
  const colors = ["var(--chart-2)", "var(--chart-1)", "var(--chart-3)", "var(--chart-4)"];
  let cursor = 0;
  const stops = values.map((value, index) => {
    const start = cursor;
    cursor += (value / total) * 360;
    return `${colors[index]} ${start}deg ${cursor}deg`;
  });
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[260px] rounded-full" style={{ background: `conic-gradient(${stops.join(",")})` }}>
      <div className="absolute inset-[22%] grid place-items-center rounded-full border border-border bg-card text-center">
        <div>
          <p className="text-sm uppercase tracking-[0.14em] text-foreground/75">per maand</p>
          <p className="mt-1 text-2xl font-semibold text-secondary">{euro.format(total)}</p>
        </div>
      </div>
    </div>
  );
}

function RevenueBars({ current, low, base, high }: { current: number; low: number; base: number; high: number }) {
  const max = Math.max(high, current, 1);
  const rows = [
    { label: "Huidig", value: current, className: "bg-chart-5" },
    { label: "Voorzichtig", value: low, className: "bg-chart-4" },
    { label: "Verwacht", value: base, className: "bg-chart-2" },
    { label: "Sterk", value: high, className: "bg-chart-1" },
  ];
  return (
    <div className="space-y-5">
      {rows.map((row) => (
        <div key={row.label}>
          <div className="mb-2 flex items-center justify-between text-base"><span className="text-foreground/80">{row.label}</span><span className="font-semibold">{euro.format(row.value)}</span></div>
          <div className="h-3 overflow-hidden rounded-full bg-input"><div className={cn("h-full rounded-full transition-all duration-500", row.className)} style={{ width: `${Math.max((row.value / max) * 100, 3)}%` }} /></div>
        </div>
      ))}
    </div>
  );
}

function TrafficBars() {
  const max = Math.max(...trafficSources.map((source) => source.value));
  return (
    <div className="space-y-5">
      {trafficSources.map((source, index) => (
        <div key={source.label}>
          <div className="mb-2 flex items-center justify-between gap-3"><span className="font-medium">{source.label}</span><strong className={index === 1 ? "text-secondary" : "text-foreground"}>{number.format(source.value)}</strong></div>
          <div className="h-2.5 overflow-hidden rounded-full bg-input"><div className={cn("h-full rounded-full", index === 1 ? "bg-secondary" : "bg-primary")} style={{ width: `${Math.max((source.value / max) * 100, 3)}%` }} /></div>
        </div>
      ))}
    </div>
  );
}

function SalesRamp({ currentPerMonth, extraPerYear }: { currentPerMonth: number; extraPerYear: number }) {
  const points = Array.from({ length: 12 }, (_, index) => {
    const ramp = 0.25 + (index / 11) * 0.75;
    return currentPerMonth + (extraPerYear / 12) * ramp;
  });
  const min = Math.min(...points) * 0.9;
  const max = Math.max(...points) * 1.08;
  const x = (index: number) => 18 + (index / 11) * 364;
  const y = (value: number) => 170 - ((value - min) / Math.max(max - min, 0.01)) * 135;
  const path = points.map((value, index) => `${index === 0 ? "M" : "L"}${x(index)},${y(value)}`).join(" ");
  return (
    <svg viewBox="0 0 400 190" className="h-auto w-full" role="img" aria-label="Verwachte verkoopontwikkeling per maand">
      {[0, 1, 2, 3].map((line) => <line key={line} x1="18" x2="382" y1={35 + line * 45} y2={35 + line * 45} stroke="var(--border)" strokeWidth="1" />)}
      <path d={path} fill="none" stroke="var(--secondary)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      {points.map((value, index) => <circle key={index} cx={x(index)} cy={y(value)} r="4" fill="var(--background)" stroke="var(--primary)" strokeWidth="2" />)}
      <text x="18" y="187" fill="var(--foreground)" fontSize="11">jan</text>
      <text x="190" y="187" fill="var(--foreground)" fontSize="11">jun</text>
      <text x="365" y="187" fill="var(--foreground)" fontSize="11">dec</text>
    </svg>
  );
}

export default function Page() {
  const [state, setState] = React.useState<SavedState>(initialState);
  const [mounted, setMounted] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem("earth-spas-choice-guide-v3");
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<SavedState>;
        setState({
          ...initialState,
          ...parsed,
          toolSelections: { ...initialState.toolSelections, ...(parsed.toolSelections || {}) },
          featureSelections: { ...initialState.featureSelections, ...(parsed.featureSelections || {}) },
          checklist: { ...initialState.checklist, ...(parsed.checklist || {}) },
        });
      }
    } catch {
      // A broken local record should never break the decision guide.
    }
  }, []);

  React.useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("earth-spas-choice-guide-v3", JSON.stringify(state));
  }, [state, mounted]);

  const selectedTools = tools.filter((tool) => state.toolSelections[tool.id]);
  const selectedFeatures = features.filter((feature) => state.featureSelections[feature.id]);
  const platformMonthly = selectedTools.reduce((sum, tool) => sum + tool.monthly, 0);
  const adsMonthly = state.metaBudget + state.googleBudget;
  const aiMonthly = state.aiApiBudget + state.aiDevelopmentBudget + state.aiMediaBudget;
  const totalMonthly = platformMonthly + adsMonthly + state.contentBudget + aiMonthly;
  const annualOperating = totalMonthly * 12;
  const currentUnitsYear = state.currentSalesPerWeek * 52;
  const currentRevenue = currentUnitsYear * state.averageSalePrice;
  const readiness = Math.min(1.18, 0.62 + selectedFeatures.length * 0.035 + (state.involvement === "structured" ? Math.min(state.hoursPerWeek, 20) * 0.018 : 0.02));
  const effectiveGrowthBudgetMonthly = adsMonthly + state.contentBudget * 0.7 + state.aiApiBudget * 0.55 + state.aiDevelopmentBudget * 0.25 + state.aiMediaBudget * 0.55 + platformMonthly * 0.12;
  const baseExtraSales = effectiveGrowthBudgetMonthly > 0 ? (effectiveGrowthBudgetMonthly * 12 / Math.max(state.acquisitionCostPerSale, 1)) * readiness : 0;
  const lowExtraSales = Math.max(0, baseExtraSales * 0.65);
  const highExtraSales = baseExtraSales * 1.35;
  const baseExtraRevenue = baseExtraSales * state.averageSalePrice;
  const lowExtraRevenue = lowExtraSales * state.averageSalePrice;
  const highExtraRevenue = highExtraSales * state.averageSalePrice;
  const baseTotalRevenue = currentRevenue + baseExtraRevenue;
  const lowTotalRevenue = currentRevenue + lowExtraRevenue;
  const highTotalRevenue = currentRevenue + highExtraRevenue;
  const growthPct = currentRevenue ? (baseExtraRevenue / currentRevenue) * 100 : 0;
  const revenuePerEuro = annualOperating ? baseExtraRevenue / annualOperating : 0;
  const saleExVat = state.averageSalePrice / 1.2;
  const grossProfitPerSale = Math.max(0, saleExVat * (state.grossMargin / 100) - state.incrementalCostPerSale);
  const breakEvenSales = grossProfitPerSale ? annualOperating / grossProfitPerSale : 0;
  const expectedContribution = baseExtraSales * grossProfitPerSale - annualOperating;
  const contributionRoi = annualOperating ? (expectedContribution / annualOperating) * 100 : 0;
  const buildHoursLow = selectedFeatures.reduce((sum, feature) => sum + feature.hoursLow, 0);
  const buildHoursHigh = selectedFeatures.reduce((sum, feature) => sum + feature.hoursHigh, 0);
  const marketBuildLow = selectedFeatures.reduce((sum, feature) => sum + feature.marketLow, 0);
  const marketBuildHigh = selectedFeatures.reduce((sum, feature) => sum + feature.marketHigh, 0);
  const structuredAnnualHours = state.involvement === "structured" ? state.hoursPerWeek * 46 : 0;
  const completedTasks = checklistItems.filter((item) => state.checklist[item.id]).length;
  const checklistProgress = Math.round((completedTasks / checklistItems.length) * 100);

  const update = <K extends keyof SavedState>(key: K, value: SavedState[K]) => setState((previous) => ({ ...previous, [key]: value }));
  const toggleTool = (tool: ToolItem, value: boolean) => {
    setState((previous) => {
      const next = { ...previous.toolSelections, [tool.id]: value };
      if (value && tool.exclusiveGroup) {
        tools.filter((candidate) => candidate.exclusiveGroup === tool.exclusiveGroup && candidate.id !== tool.id).forEach((candidate) => { next[candidate.id] = false; });
      }
      return { ...previous, toolSelections: next };
    });
  };
  const toggleFeature = (id: string, value: boolean) => setState((previous) => ({ ...previous, featureSelections: { ...previous.featureSelections, [id]: value } }));
  const toggleTask = (id: string, value: boolean) => setState((previous) => ({ ...previous, checklist: { ...previous.checklist, [id]: value } }));

  const reset = () => {
    setState(initialState);
    localStorage.removeItem("earth-spas-choice-guide-v3");
  };

  const summary = `Earth Spas keuzehulp\n\nPlatform en tools: ${euro.format(platformMonthly)} p/m\nMeta Ads: ${euro.format(state.metaBudget)} p/m\nGoogle Ads: ${euro.format(state.googleBudget)} p/m\nContent: ${euro.format(state.contentBudget)} p/m\nAI/API: ${euro.format(state.aiApiBudget)} p/m\nDevelopment-AI: ${euro.format(state.aiDevelopmentBudget)} p/m\nMedia-AI: ${euro.format(state.aiMediaBudget)} p/m\nTotaal extern budget: ${euro.format(totalMonthly)} p/m (${euro.format(annualOperating)} p/j)\n\nVerwacht scenario: ${number.format(baseExtraSales)} extra spa's, ${euro.format(baseExtraRevenue)} extra omzet, ${number.format(growthPct)}% groei.\nAcquisitiekosten-aannname: ${euro.format(state.acquisitionCostPerSale)} per extra verkoop.\nExtra uitvoeringskosten: ${euro.format(state.incrementalCostPerSale)} per extra spa.\n\nBetrokkenheid Volker: ${state.involvement === "structured" ? `${state.hoursPerWeek} uur per week structureel` : "vrij en incidenteel"}.\nActielijst: ${completedTasks}/${checklistItems.length} afgerond.\nIndicatieve externe marktwaarde bouw: ${euro.format(marketBuildLow)} - ${euro.format(marketBuildHigh)}.\n\nNotities: ${state.notes || "geen"}`;

  const copySummary = async () => {
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <main id="top">
      <header className="no-print sticky top-0 z-50 border-b border-border/90 bg-background/92 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <a href="#top" className="flex min-w-0 items-center gap-3">
            <img src="/screens/logo-full-gold.png" alt="Earth Spas" className="h-9 w-auto max-w-[145px] object-contain sm:h-11 sm:max-w-[190px]" />
            <span className="hidden border-l border-border pl-3 text-sm uppercase tracking-[0.18em] text-foreground/70 sm:block">keuzehulp</span>
          </a>
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="hidden md:inline-flex" onClick={reset}><RefreshCw className="h-4 w-4" />Reset</Button>
            <Button variant="outline" className="px-3 sm:px-4" onClick={() => window.print()}><Download className="h-4 w-4" /><span className="hidden sm:inline">PDF</span></Button>
          </div>
        </div>
        <nav className="scrollbar-none flex gap-2 overflow-x-auto border-t border-border/70 px-4 py-2 text-sm sm:px-6 lg:justify-center">
          {[["#resultaten", "Resultaten"], ["#basis", "Aannames"], ["#tools", "Accounts"], ["#bouw", "Bouw"], ["#marketing", "Budget"], ["#acties", "Actielijst"], ["#resultaat", "Uitkomst"]].map(([href, label]) => <a key={href} href={href} className="whitespace-nowrap rounded-full border border-border bg-card px-3 py-1.5 text-foreground/90 transition hover:border-secondary/60 hover:text-secondary">{label}</a>)}
        </nav>
      </header>

      <section className="relative min-h-[700px] overflow-hidden border-b border-border sm:min-h-[720px]">
        <img src="/screens/mauna-kea-range.png" alt="Earth Spas premium whirlpool" className="absolute inset-0 h-full w-full object-cover object-center opacity-55" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,12,17,.70),rgba(7,12,17,.96)_75%)] sm:bg-[linear-gradient(90deg,rgba(7,12,17,.98)_5%,rgba(7,12,17,.84)_58%,rgba(7,12,17,.30))]" />
        <div className="relative mx-auto flex min-h-[700px] max-w-7xl items-end px-4 py-16 sm:min-h-[720px] sm:items-center sm:px-6 sm:py-24 lg:px-8">
          <div className="max-w-3xl">
            <p className="section-kicker">Van Volker aan {state.clientName || "Jeroen"}</p>
            <h1 className="mt-5 text-balance text-4xl font-semibold uppercase leading-[1.02] tracking-[0.025em] sm:text-6xl lg:text-7xl">Geen verkooppitch. Gewoon zien wat er staat, wat het kost en wat we ermee kunnen.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white sm:text-xl">Zet accounts, tools, functies en budgetten aan of uit. De pagina rekent kosten, ontwikkeltijd, marktwaarde, verwachte groei en de concrete actielijst direct door.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button variant="gold" onClick={() => document.getElementById("resultaten")?.scrollIntoView({ behavior: "smooth" })}>Bekijk wat er al staat <ArrowRight className="h-4 w-4" /></Button>
              <Button variant="outline" onClick={copySummary}>{copied ? <Check className="h-4 w-4" /> : <ClipboardCheck className="h-4 w-4" />}{copied ? "Gekopieerd" : "Kopieer samenvatting"}</Button>
            </div>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/85">Jouw bouwkosten en eventuele tegenprestatie staan niet in de calculator. Software, hosting, AI-credits en advertenties wel. De ene categorie eet kipvleugels; de andere verstuurt facturen.</p>
          </div>
        </div>
      </section>

      <section id="resultaten" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <SectionHeading kicker="Tot nu toe behaald" title="De resultaten zijn goed genoeg om te laten zien. Ze bewijzen vooral dat de basis werkt." text="Er is nauwelijks structureel marketingbudget gebruikt en socialmedia is beperkt bijgehouden. Toch is er al organisch verkeer, goedkoop betaald bereik, een sterk Google-profiel en een meetbare websitebasis. Dit zijn nog geen aantoonbaar verkochte spa's uit campagnes, maar wel een bruikbaar vertrekpunt." />
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {achievedResults.map((result, index) => (
            <Card key={result.label} className={cn("p-4 sm:p-5", index === 3 || index === 6 ? "border-secondary/55" : "") }>
              <p className={cn("font-[family-name:var(--font-heading)] text-2xl font-semibold sm:text-3xl", index === 3 || index === 6 ? "text-secondary" : "text-primary")}>{result.value}</p>
              <p className="mt-2 text-base font-semibold leading-5">{result.label}</p>
              <p className="mt-2 text-sm leading-5 text-foreground/75">{result.helper}</p>
            </Card>
          ))}
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <Card className="p-6 sm:p-7">
            <p className="section-kicker">Herkomst van sessies</p>
            <h3 className="mt-2 text-2xl font-semibold uppercase">Organisch doet nu al het meeste werk</h3>
            <div className="mt-7"><TrafficBars /></div>
            <p className="mt-6 text-base leading-7 text-foreground/85">Betaald verkeer is nog maar een klein deel. Dat is precies waarom er ruimte is om gecontroleerd te testen zonder te doen alsof de huidige omzet door advertenties is veroorzaakt.</p>
          </Card>
          <Card className="relative min-h-[360px] overflow-hidden">
            <img src="/screens/kern-river-range.png" alt="Earth Spas Kern River" className="absolute inset-0 h-full w-full object-cover opacity-45" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/25" />
            <div className="relative flex h-full min-h-[360px] flex-col justify-end p-6 sm:p-8">
              <LabelPill tone="gold">Eerste bewijs</LabelPill>
              <h3 className="mt-4 max-w-xl text-3xl font-semibold uppercase">€35,90 leverde 287 landingspaginaweergaven op.</h3>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-white">Dat bewijst geen verkoop, maar wel dat bereik en websitebezoek goedkoop kunnen worden ingekocht. De volgende stap is lead-, afspraak-, offerte- en verkoopmeting.</p>
            </div>
          </Card>
        </div>
      </section>

      <section id="basis" className="border-y border-border bg-muted/55">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <SectionHeading kicker="Uitgangspunt" title="De bestaande omzet is organisch. Marketing moet dus aantoonbaar extra groei toevoegen." text="De calculator start met twee verkochte spa's per week en €6.000 gemiddelde verkoopwaarde. Twee verschillende kostenvelden voorkomen verwarring: acquisitiekosten bepalen hoeveel groeibudget gemiddeld nodig is voor één extra verkoop; extra uitvoeringskosten zijn alleen de aanvullende kosten nadat die spa al verkocht is." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Metric label="Verkoop per jaar" value={number.format(currentUnitsYear)} helper={`${number.format(state.currentSalesPerWeek)} per week`} icon={Target} />
            <Metric label="Huidige omzet" value={euro.format(currentRevenue)} helper="inclusief btw" icon={CircleDollarSign} accent="gold" />
            <Metric label="Acquisitiekosten" value={euro.format(state.acquisitionCostPerSale)} helper="groeibudget per extra verkoop" icon={MousePointerClick} />
            <Metric label="Extra uitvoeringskosten" value={euro.format(state.incrementalCostPerSale)} helper="mag op €0 staan" icon={Gauge} />
          </div>
          <Card className="mt-6 p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4"><div><h3 className="text-2xl font-semibold uppercase">Basisaannames</h3><p className="mt-2 text-base text-foreground/80">Alle waarden werken direct door in de grafieken en het resultaatmodel.</p></div><SlidersHorizontal className="h-6 w-6 text-secondary" strokeWidth={1.6} /></div>
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { label: "Spa's per week", helper: "Bestaande organische verkoop", value: state.currentSalesPerWeek, min: 0.5, max: 8, step: 0.5, set: (value: number) => update("currentSalesPerWeek", value), display: number.format(state.currentSalesPerWeek) },
                { label: "Gemiddelde verkoopprijs", helper: "Inclusief btw", value: state.averageSalePrice, min: 3500, max: 15000, step: 250, set: (value: number) => update("averageSalePrice", value), display: euro.format(state.averageSalePrice) },
                { label: "Brutomarge", helper: "Na inkoopprijs van de spa", value: state.grossMargin, min: 20, max: 60, step: 1, set: (value: number) => update("grossMargin", value), display: `${state.grossMargin}%` },
                { label: "Acquisitiekosten per extra verkoop", helper: "Marketing- en groeibudget nodig voor één extra verkoop; niet de inkoopprijs", value: state.acquisitionCostPerSale, min: 250, max: 4000, step: 50, set: (value: number) => update("acquisitionCostPerSale", value), display: euro.format(state.acquisitionCostPerSale) },
                { label: "Extra uitvoeringskosten per extra spa", helper: "Alleen extra administratie, planning, levering of ondersteuning; mag €0 zijn", value: state.incrementalCostPerSale, min: 0, max: 1500, step: 25, set: (value: number) => update("incrementalCostPerSale", value), display: euro.format(state.incrementalCostPerSale) },
              ].map((item) => (
                <label key={item.label} className="block">
                  <div className="mb-3 flex items-start justify-between gap-4"><div><span className="font-semibold">{item.label}</span><p className="mt-1 text-sm leading-5 text-foreground/70">{item.helper}</p></div><span className="shrink-0 rounded-md border border-secondary/45 bg-secondary/10 px-2.5 py-1 text-base font-semibold text-secondary">{item.display}</span></div>
                  <Range value={item.value} min={item.min} max={item.max} step={item.step} onChange={item.set} ariaLabel={item.label} />
                </label>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section id="tools" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <SectionHeading kicker="Accounts, providers en infrastructuur" title="De eigen server is de kern. De rest ondersteunt die basis." text="De aanbevolen route is een eigen Hetzner-server voor Directus, n8n, agents en backend. Vercel blijft alleen de snelle frontendlaag. ChatGPT Pro en andere AI-credittools staan apart, zodat Earth Spas de inzet betaalt in plaats van Volkers privéaccounts." />
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool) => {
            const active = state.toolSelections[tool.id];
            return (
              <Card key={tool.id} className={cn("p-5 transition sm:p-6", active ? tool.recommended ? "border-secondary/55" : "border-primary/35" : "opacity-65") }>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 gap-3">
                    <ProviderLogo slug={tool.logoSlug} icon={tool.icon} name={tool.name} />
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold leading-6">{tool.name}</h3>
                      <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-sm text-foreground/70">
                        {tool.required && <span className="inline-flex items-center gap-1"><LockKeyhole className="h-3.5 w-3.5" />vaste basis</span>}
                        {tool.recommended && <span className="text-secondary">aanbevolen</span>}
                      </div>
                    </div>
                  </div>
                  <Switch checked={active} onCheckedChange={(value) => toggleTool(tool, value)} disabled={tool.required} label={tool.name} />
                </div>
                <p className="mt-4 text-base leading-7 text-white">{tool.description}</p>
                <div className="mt-5 flex items-center justify-between border-t border-border pt-4"><span className="text-sm uppercase tracking-[0.14em] text-foreground/70">per maand</span><span className="text-xl font-semibold text-secondary">{tool.monthly === 0 ? "€0" : euro.format(tool.monthly)}</span></div>
              </Card>
            );
          })}
        </div>
        <Card className="mt-6 border-secondary/40 p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center"><div><p className="section-kicker gold">Geselecteerde platformlaag</p><h3 className="mt-2 text-4xl font-semibold text-secondary">{euro.format(platformMonthly)} per maand</h3><p className="mt-3 text-lg text-white">{selectedTools.length} actieve diensten. Advertenties en drie aparte AI-creditpotten worden niet verstopt in dit bedrag.</p></div><div className="grid grid-cols-2 gap-3 text-center sm:grid-cols-4">{[[150, "zelfstandig"], [225, "actief"], [300, "productie"], [400, "hoog volume"]].map(([level, label]) => <div key={level} className={cn("rounded-md border px-4 py-3", Math.abs(platformMonthly - Number(level)) < 45 ? "border-secondary bg-secondary/10" : "border-border bg-muted")}><p className="text-sm text-foreground/70">{label}</p><p className="mt-1 font-semibold">€{level}+</p></div>)}</div></div>
        </Card>
      </section>

      <section id="bouw" className="border-y border-border bg-muted/55">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <SectionHeading kicker="Wat kan er gebouwd worden?" title="Zet functies aan en vergelijk ontwikkeltijd met normale externe marktwaarde." text="De marktwaardes zijn indicaties voor ontwerp, ontwikkeling, integratie, testen en oplevering door een softwarebedrijf. Ze zijn uitsluitend vergelijkingsmateriaal en worden niet opgeteld bij het maandbudget of jouw afspraken met Earth Spas." />
          <div className="mt-10 overflow-hidden rounded-lg border border-border bg-card/90 shadow-xl">
            <div className="hidden grid-cols-[70px_1.4fr_.7fr_.75fr_.75fr] gap-4 border-b border-border bg-accent px-5 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-foreground/80 lg:grid"><span>Kies</span><span>Onderdeel</span><span>Impact</span><span>Ontwikkeltijd</span><span>Marktwaarde</span></div>
            {features.map((feature) => {
              const Icon = feature.icon;
              const active = state.featureSelections[feature.id];
              return (
                <div key={feature.id} className={cn("grid gap-4 border-b border-border px-5 py-6 last:border-0 lg:grid-cols-[70px_1.4fr_.7fr_.75fr_.75fr] lg:items-center", !active && "opacity-55") }>
                  <Switch checked={active} onCheckedChange={(value) => toggleFeature(feature.id, value)} label={feature.name} />
                  <div className="flex gap-3"><div className="mt-0.5 rounded-md border border-border bg-accent p-2 text-secondary"><Icon className="h-5 w-5" strokeWidth={1.6} /></div><div><h3 className="text-lg font-semibold">{feature.name}</h3><p className="mt-1 text-base leading-7 text-white">{feature.description}</p></div></div>
                  <div><span className="mb-1 block text-sm uppercase tracking-[0.12em] text-foreground/65 lg:hidden">Impact</span><LabelPill tone={feature.impact === "Verkoop" ? "gold" : "cyan"}>{feature.impact}</LabelPill></div>
                  <div className="text-base"><span className="mb-1 block text-sm uppercase tracking-[0.12em] text-foreground/65 lg:hidden">Ontwikkeltijd</span><strong>{feature.hoursLow}-{feature.hoursHigh} uur</strong></div>
                  <div className="text-base"><span className="mb-1 block text-sm uppercase tracking-[0.12em] text-foreground/65 lg:hidden">Marktwaarde</span><strong>{euro.format(feature.marketLow)}-{euro.format(feature.marketHigh)}</strong></div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Metric label="Geselecteerde functies" value={`${selectedFeatures.length}`} helper={`van ${features.length} onderdelen`} icon={Check} />
            <Metric label="Ontwikkelomvang" value={`${buildHoursLow}-${buildHoursHigh} uur`} helper="indicatieve totale bandbreedte" icon={Code2} />
            <Metric label="Externe marktwaarde" value={`${euro.format(marketBuildLow)}-${euro.format(marketBuildHigh)}`} helper="niet opgenomen in budget" icon={BriefcaseBusiness} accent="gold" />
            <Metric label="Fulltime bouwtijd" value={`${Math.ceil(buildHoursLow / 160)}-${Math.ceil(buildHoursHigh / 160)} maanden`} helper="bij één developer" icon={CalendarClock} />
          </div>
        </div>
      </section>

      <section id="marketing" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <SectionHeading kicker="Budget en inzet" title="Vul het echte maandbudget in en kies hoe structureel jij eraan werkt." text="AI-abonnementen en verbruikscredits zijn bewust gescheiden. Zo is zichtbaar wat nodig is voor agents, development en media, en verdwijnen die kosten niet langer stilletjes van Volkers eigen kaart." />
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
          <Card className="p-6 sm:p-8">
            <h3 className="text-2xl font-semibold uppercase">Maandbudgetten</h3>
            <div className="mt-8 space-y-8">
              {[
                { label: "Meta Ads", helper: "Facebook, Instagram en remarketing", value: state.metaBudget, min: 0, max: 7500, step: 50, set: (value: number) => update("metaBudget", value) },
                { label: "Google Ads", helper: "Zoekintentie, showroom en regio's", value: state.googleBudget, min: 0, max: 7500, step: 50, set: (value: number) => update("googleBudget", value) },
                { label: "Externe contentreserve", helper: "Fotografie, video of losse productie buiten Volker", value: state.contentBudget, min: 0, max: 3000, step: 50, set: (value: number) => update("contentBudget", value) },
                { label: "Agent- en API-credits", helper: "OpenAI API, supportagents, analyses en workflows", value: state.aiApiBudget, min: 0, max: 2500, step: 25, set: (value: number) => update("aiApiBudget", value) },
                { label: "Development-AI-credits", helper: "Codex, Copilot-overages, code review en actieve bouwmaanden", value: state.aiDevelopmentBudget, min: 0, max: 2500, step: 25, set: (value: number) => update("aiDevelopmentBudget", value) },
                { label: "Media-AI-credits", helper: "Beeld, video, voice en campagnevarianten", value: state.aiMediaBudget, min: 0, max: 2500, step: 25, set: (value: number) => update("aiMediaBudget", value) },
              ].map((item) => (
                <label key={item.label} className="block">
                  <div className="mb-3 flex items-end justify-between gap-4"><div><span className="font-semibold">{item.label}</span><p className="mt-1 text-sm text-foreground/70">{item.helper}</p></div><span className="shrink-0 rounded-md border border-secondary/45 bg-secondary/10 px-2.5 py-1 text-base font-semibold text-secondary">{euro.format(item.value)}</span></div>
                  <Range value={item.value} min={item.min} max={item.max} step={item.step} onChange={item.set} ariaLabel={item.label} />
                </label>
              ))}
            </div>
          </Card>
          <Card className="p-6 sm:p-8">
            <h3 className="text-2xl font-semibold uppercase">Betrokkenheid Volker</h3>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button onClick={() => update("involvement", "free")} className={cn("rounded-lg border p-5 text-left transition", state.involvement === "free" ? "border-secondary bg-secondary/10" : "border-border bg-muted hover:border-primary/50")}><div className="flex items-start justify-between gap-3"><Sparkles className="h-6 w-6 text-secondary" strokeWidth={1.6} />{state.involvement === "free" && <Check className="h-6 w-6 text-secondary" />}</div><h4 className="mt-4 text-xl font-semibold">Vrij en incidenteel</h4><p className="mt-2 text-base leading-7 text-white">Werken wanneer het uitkomt en oppakken wat op dat moment interessant of nodig is.</p></button>
              <button onClick={() => update("involvement", "structured")} className={cn("rounded-lg border p-5 text-left transition", state.involvement === "structured" ? "border-primary bg-primary/10" : "border-border bg-muted hover:border-primary/50")}><div className="flex items-start justify-between gap-3"><Rocket className="h-6 w-6 text-primary" strokeWidth={1.6} />{state.involvement === "structured" && <Check className="h-6 w-6 text-primary" />}</div><h4 className="mt-4 text-xl font-semibold">Structurele betrokkenheid</h4><p className="mt-2 text-base leading-7 text-white">Vaste uren voor socials, marketing, website, agents, data en doorontwikkeling.</p></button>
            </div>
            {state.involvement === "structured" && <div className="mt-7 rounded-lg border border-border bg-muted p-5"><div className="mb-3 flex items-center justify-between"><span className="font-semibold">Uren per week</span><span className="text-2xl font-semibold text-secondary">{state.hoursPerWeek} uur</span></div><Range value={state.hoursPerWeek} min={2} max={32} step={1} onChange={(value) => update("hoursPerWeek", value)} ariaLabel="Uren per week" /><div className="mt-5 grid grid-cols-3 gap-2 text-center text-sm text-foreground/75"><div className="rounded-md border border-border p-2"><strong className="block text-base text-foreground">{Math.round(structuredAnnualHours)}</strong>uur/jaar</div><div className="rounded-md border border-border p-2"><strong className="block text-base text-foreground">{Math.round(structuredAnnualHours * 0.32)}</strong>marketing</div><div className="rounded-md border border-border p-2"><strong className="block text-base text-foreground">{Math.round(structuredAnnualHours * 0.42)}</strong>bouw/data</div></div></div>}
            <div className="mt-6 rounded-lg border border-secondary/35 bg-secondary/10 p-4 text-base leading-7 text-white"><Info className="mr-2 inline h-5 w-5 text-secondary" />Wat hier tegenover staat wordt onderling besproken en staat niet in deze keuzehulp.</div>
          </Card>
        </div>
      </section>

      <section id="acties" className="border-y border-border bg-muted/55">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <SectionHeading kicker="Actielijst" title="Alles wat nu geregeld en verplaatst moet worden, in de juiste volgorde." text="Vink taken af tijdens de uitvoering. De status wordt automatisch in deze browser opgeslagen. Persoonlijke kaarten en rechten verdwijnen pas nadat de nieuwe omgeving aantoonbaar werkt; heldhaftig eerst alles verwijderen is geen migratiestrategie." />
          <Card className="mt-10 border-secondary/40 p-6 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div><p className="section-kicker gold">Voortgang</p><h3 className="mt-2 text-3xl font-semibold">{completedTasks} van {checklistItems.length} acties afgerond</h3></div>
              <div className="text-left sm:text-right"><p className="text-4xl font-semibold text-secondary">{checklistProgress}%</p><p className="text-base text-foreground/75">lokaal bewaard</p></div>
            </div>
            <div className="mt-5 h-3 overflow-hidden rounded-full bg-input"><div className="h-full rounded-full bg-secondary transition-all duration-500" style={{ width: `${checklistProgress}%` }} /></div>
          </Card>
          <div className="mt-8 space-y-8">
            {(["Eigenaarschap", "Techniek", "Marketing", "Afronding"] as ChecklistItem["group"][]).map((group) => {
              const groupItems = checklistItems.filter((item) => item.group === group);
              const done = groupItems.filter((item) => state.checklist[item.id]).length;
              return (
                <div key={group}>
                  <div className="mb-4 flex items-end justify-between gap-4"><div><p className="section-kicker">{group}</p><h3 className="mt-1 text-2xl font-semibold uppercase">{group === "Eigenaarschap" ? "Accounts, betaling en toegang" : group === "Techniek" ? "Server, data en systemen" : group === "Marketing" ? "Kanalen, AI en meting" : "Veilige afronding en afspraken"}</h3></div><LabelPill tone={done === groupItems.length ? "gold" : "white"}>{done}/{groupItems.length}</LabelPill></div>
                  <div className="grid gap-3 lg:grid-cols-2">
                    {groupItems.map((item) => {
                      const checked = state.checklist[item.id];
                      return (
                        <button key={item.id} onClick={() => toggleTask(item.id, !checked)} className={cn("group flex w-full gap-4 rounded-lg border p-4 text-left transition sm:p-5", checked ? "border-secondary/60 bg-secondary/10" : "border-border bg-card hover:border-primary/55")}>
                          <span className={cn("mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md border", checked ? "border-secondary bg-secondary text-secondary-foreground" : "border-border bg-muted text-transparent group-hover:text-primary")}><Check className="h-4 w-4" /></span>
                          <span className="min-w-0 flex-1">
                            <span className="flex flex-wrap items-start justify-between gap-2"><strong className={cn("text-lg", checked && "text-secondary")}>{item.title}</strong><span className="rounded-full border border-border px-2 py-0.5 text-sm text-foreground/75">{item.priority}</span></span>
                            <span className="mt-2 block text-base leading-7 text-white">{item.description}</span>
                            <span className="mt-3 block text-sm uppercase tracking-[0.12em] text-foreground/65">Eigenaar: {item.owner}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="resultaat" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <SectionHeading kicker="Live resultaatmodel" title="Iedere keuze werkt door in kosten, groei, break-even en verwachte omzet." text="Dit blijft een scenario, geen garantie. De acquisitiekosten-aannname stuurt het aantal extra verkopen. De aparte uitvoeringskosten kunnen op €0, €100 of €200 staan en beïnvloeden alleen de bijdrage en break-even, niet de verwachte verkoopproductie." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <Metric label="Extern budget" value={`${euro.format(totalMonthly)} p/m`} helper={`${euro.format(annualOperating)} per jaar`} icon={CircleDollarSign} accent="gold" />
          <Metric label="Extra verkopen" value={`${number.format(lowExtraSales)}-${number.format(highExtraSales)}`} helper={`${number.format(baseExtraSales)} verwacht`} icon={Target} />
          <Metric label="Omzetgroei" value={`${number.format(growthPct)}%`} helper={`${euro.format(baseExtraRevenue)} extra omzet`} icon={LineChart} />
          <Metric label="Break-even" value={`${number.format(breakEvenSales)} spa's`} helper={`na €${number.format(state.incrementalCostPerSale)} extra uitvoering`} icon={Gauge} />
          <Metric label="Bijdrage-ROI" value={`${number.format(contributionRoi)}%`} helper={`${euro.format(expectedContribution)} na extern budget`} icon={BarChart3} accent="gold" />
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <Card className="p-6"><div className="mb-6"><p className="section-kicker">Budgetverdeling</p><h3 className="mt-2 text-2xl font-semibold uppercase">Waar gaat het geld naartoe?</h3></div><BudgetDonut platform={platformMonthly} ads={adsMonthly} content={state.contentBudget} ai={aiMonthly} /><div className="mt-6 grid grid-cols-2 gap-3 text-base">{[["Platform", platformMonthly, "bg-chart-2"], ["Advertenties", adsMonthly, "bg-chart-1"], ["Content", state.contentBudget, "bg-chart-3"], ["AI-credits", aiMonthly, "bg-chart-4"]].map(([label, value, color]) => <div key={String(label)} className="flex items-center justify-between gap-3"><span className="flex items-center gap-2 text-foreground/80"><span className={cn("h-2.5 w-2.5 rounded-full", color)} />{label}</span><strong>{euro.format(Number(value))}</strong></div>)}</div></Card>
          <Card className="p-6"><div className="mb-6"><p className="section-kicker gold">Omzetvergelijking</p><h3 className="mt-2 text-2xl font-semibold uppercase">Huidig tegenover scenario</h3></div><RevenueBars current={currentRevenue} low={lowTotalRevenue} base={baseTotalRevenue} high={highTotalRevenue} /><div className="mt-6 rounded-lg border border-secondary/35 bg-secondary/10 p-4"><p className="text-sm uppercase tracking-[0.12em] text-foreground/75">Omzet per €1 extern budget</p><p className="mt-1 text-3xl font-semibold text-secondary">€{number.format(revenuePerEuro)}</p></div></Card>
          <Card className="p-6"><div className="mb-4"><p className="section-kicker">Verkoopontwikkeling</p><h3 className="mt-2 text-2xl font-semibold uppercase">Verwachte maandelijkse opbouw</h3></div><SalesRamp currentPerMonth={currentUnitsYear / 12} extraPerYear={baseExtraSales} /><p className="mt-3 text-base leading-7 text-white">Het model laat groei geleidelijk oplopen. Er wordt dus niet gedaan alsof advertenties dinsdagochtend exact vier jacuzzi's uit de lucht laten vallen.</p></Card>
        </div>

        <Card className="mt-6 overflow-hidden">
          <div className="border-b border-border px-6 py-5"><p className="section-kicker">Beslisoverzicht</p><h3 className="mt-2 text-2xl font-semibold uppercase">Geselecteerde keuzes en financiële uitkomst</h3></div>
          <div className="overflow-x-auto"><table className="w-full min-w-[820px] text-left text-base"><thead className="bg-accent text-sm uppercase tracking-[0.12em] text-foreground/80"><tr><th className="px-6 py-4">Onderdeel</th><th className="px-6 py-4">Maand</th><th className="px-6 py-4">Jaar</th><th className="px-6 py-4">Resultaat / afspraak</th></tr></thead><tbody className="divide-y divide-border">
            <tr><td className="px-6 py-4 font-medium">Platform en tools</td><td className="px-6 py-4">{euro.format(platformMonthly)}</td><td className="px-6 py-4">{euro.format(platformMonthly * 12)}</td><td className="px-6 py-4 text-white">{selectedTools.length} actieve diensten, eigen server als kern</td></tr>
            <tr><td className="px-6 py-4 font-medium">Advertenties</td><td className="px-6 py-4">{euro.format(adsMonthly)}</td><td className="px-6 py-4">{euro.format(adsMonthly * 12)}</td><td className="px-6 py-4 text-white">Meta {euro.format(state.metaBudget)} + Google {euro.format(state.googleBudget)}</td></tr>
            <tr><td className="px-6 py-4 font-medium">AI-creditpotten</td><td className="px-6 py-4">{euro.format(aiMonthly)}</td><td className="px-6 py-4">{euro.format(aiMonthly * 12)}</td><td className="px-6 py-4 text-white">Agents {euro.format(state.aiApiBudget)}, development {euro.format(state.aiDevelopmentBudget)}, media {euro.format(state.aiMediaBudget)}</td></tr>
            <tr><td className="px-6 py-4 font-medium">Betrokkenheid Volker</td><td className="px-6 py-4">niet financieel ingevuld</td><td className="px-6 py-4">apart bespreken</td><td className="px-6 py-4 text-white">{state.involvement === "structured" ? `${state.hoursPerWeek} uur per week` : "vrij en incidenteel"}</td></tr>
            <tr><td className="px-6 py-4 font-medium">Bouw en maatwerk</td><td className="px-6 py-4">los van budget</td><td className="px-6 py-4">los van budget</td><td className="px-6 py-4 text-white">Externe marktwaarde {euro.format(marketBuildLow)}-{euro.format(marketBuildHigh)}</td></tr>
            <tr><td className="px-6 py-4 font-medium">Actielijst</td><td className="px-6 py-4">{completedTasks}/{checklistItems.length}</td><td className="px-6 py-4">{checklistProgress}%</td><td className="px-6 py-4 text-white">Accounts, betaling, techniek, marketing en acceptatie</td></tr>
            <tr className="bg-secondary/10"><td className="px-6 py-4 font-semibold">Totaal extern operationeel</td><td className="px-6 py-4 text-xl font-semibold text-secondary">{euro.format(totalMonthly)}</td><td className="px-6 py-4 text-xl font-semibold text-secondary">{euro.format(annualOperating)}</td><td className="px-6 py-4 font-semibold">{number.format(baseExtraSales)} extra spa's / {euro.format(baseExtraRevenue)} extra omzet</td></tr>
          </tbody></table></div>
        </Card>
      </section>

      <section className="border-t border-border bg-muted/55">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1fr_.8fr] lg:px-8">
          <div><p className="section-kicker gold">Persoonlijke afsluiting</p><h2 className="mt-3 text-4xl font-semibold uppercase">Wat zou ik kiezen?</h2><p className="mt-5 max-w-2xl text-xl leading-9 text-white">Een zelfstandige Earth Spas-server, eigen accounts en betaalmethoden, ChatGPT Pro met aparte creditlimieten, een beheerst advertentiebudget en structurele betrokkenheid. Dan bouwen we niet alleen slimme dingen, maar zorgen we ook dat ze daadwerkelijk worden gebruikt, gemeten en verbeterd.</p><div className="mt-7 flex flex-col gap-3 no-print sm:flex-row sm:flex-wrap"><Button variant="gold" onClick={() => window.print()}><Download className="h-4 w-4" />Bewaar als PDF</Button><Button variant="outline" onClick={copySummary}>{copied ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}{copied ? "Gekopieerd" : "Kopieer keuzes"}</Button></div></div>
          <Card className="p-6"><label className="block font-semibold">Naam</label><input value={state.clientName} onChange={(event) => update("clientName", event.target.value)} className="mt-2 min-h-12 w-full rounded-md border border-input bg-background px-3 py-2.5 text-lg text-foreground outline-none focus:border-secondary" /><label className="mt-5 block font-semibold">Notities of afspraken</label><textarea value={state.notes} onChange={(event) => update("notes", event.target.value)} rows={7} placeholder="Bijvoorbeeld: eerst accounts en server, daarna CRM en tracking..." className="mt-2 w-full resize-y rounded-md border border-input bg-background px-3 py-2.5 text-lg text-foreground outline-none focus:border-secondary" /><p className="mt-3 text-sm text-foreground/70">Keuzes en checklist worden automatisch lokaal in deze browser bewaard.</p></Card>
        </div>
      </section>

      <div className="no-print sticky bottom-0 z-40 border-t border-secondary/35 bg-background/95 px-4 py-3 backdrop-blur-xl md:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3"><div><p className="text-sm text-foreground/70">Extern budget p/m</p><p className="text-xl font-semibold text-secondary">{euro.format(totalMonthly)}</p></div><Button onClick={() => document.getElementById("resultaat")?.scrollIntoView({ behavior: "smooth" })}>Bekijk uitkomst <ChevronRight className="h-4 w-4" /></Button></div>
      </div>

      <footer className="border-t border-border px-4 py-10 text-center text-base text-foreground/75"><p>Earth Spas keuzehulp · Volker / 3ECK Technology · scenario's zijn indicatief, geen verkoopgaranties</p></footer>
    </main>
  );
}
