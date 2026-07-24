"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import {
  Activity,
  ArrowClockwise,
  ArrowRight,
  Briefcase,
  CalendarBlank,
  CaretRight,
  ChartBar,
  ChartLine,
  ChatText,
  Check,
  ClipboardText,
  Cloud,
  Code,
  CreditCard,
  CurrencyEur,
  Database,
  DownloadSimple,
  EnvelopeSimple,
  FloppyDisk,
  FlowArrow,
  FadersHorizontal,
  Gauge,
  Globe,
  Headphones,
  Image as ImageIcon,
  Info,
  Key,
  Layout,
  List,
  MagicWand,
  Robot,
  RocketLaunch,
  Server,
  ShieldCheck,
  Sparkle,
  Target,
  Users,
  X,
} from "@phosphor-icons/react";
import { cn, euro, number } from "@/lib/utils";
import {
  BudgetChart,
  DecisionRow,
  DecisionTable,
  RevenueScenarioChart,
  SalesRampChart,
  TrafficSourceChart,
} from "@/components/decision-visuals";

type PhosphorIcon = React.ComponentType<{
  className?: string;
  size?: number | string;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
}>;

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
  icon: PhosphorIcon;
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
  icon: PhosphorIcon;
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
  { id: "payment", name: "Zakelijke betaalkaart", category: "basis", monthly: 0, description: "Alle accounts en credits rechtstreeks door Earth Spas betaald, met harde maandlimieten.", required: true, recommended: true, icon: CreditCard },
  { id: "m365", name: "Microsoft 365 Business Basic", category: "basis", monthly: 5.2, description: "Zakelijke mail, agenda, SharePoint en gedeelde bestanden.", required: true, logoSlug: "microsoft", icon: EnvelopeSimple },
  { id: "bitwarden", name: "Bitwarden Teams", category: "basis", monthly: 7, description: "Wachtwoorden, 2FA, herstelcodes en noodtoegang voor twee beheerders.", required: true, logoSlug: "bitwarden", icon: ShieldCheck },
  { id: "github", name: "GitHub Team", category: "basis", monthly: 4, description: "Broncode en repository-eigendom aantoonbaar onder Earth Spas.", required: true, logoSlug: "github", icon: Code },
  { id: "cloudflare", name: "Cloudflare", category: "basis", monthly: 0, description: "DNS, SSL, CDN en basisbeveiliging voor NL, DE en LU.", required: true, logoSlug: "cloudflare", icon: Cloud },
  { id: "hetzner", name: "Eigen Hetzner-server + back-ups", category: "basis", monthly: 46, description: "Aanbevolen kern: Directus, n8n, agents en backend draaien onder Earth Spas-eigendom.", required: true, recommended: true, logoSlug: "hetzner", icon: Server },
  { id: "directus", name: "Directus self-hosted", category: "basis", monthly: 0, description: "Centrale bron voor modellen, content, media, SEO en vertalingen op de eigen server.", required: true, logoSlug: "directus", icon: Database },
  { id: "n8n", name: "n8n self-hosted", category: "basis", monthly: 0, description: "Workflows en agentautomatisering zonder tarief per uitvoering.", required: true, logoSlug: "n8n", icon: FlowArrow },
  { id: "doppler", name: "Doppler Developer", category: "basis", monthly: 0, description: "API-sleutels en deploymentconfiguratie centraal en overdraagbaar.", required: true, logoSlug: "doppler", icon: Key },
  { id: "supabase", name: "Supabase Pro", category: "basis", monthly: 22, description: "Productiedatabase, storage, authenticatie en dagelijkse back-ups.", required: true, logoSlug: "supabase", icon: Database },
  { id: "vercel", name: "Vercel Pro", category: "actief", monthly: 18, description: "Alleen voor de snelle Next.js-frontend, previews en deployments; de kern draait op de eigen server.", recommended: true, logoSlug: "vercel", icon: Globe },
  { id: "resend", name: "Resend Pro", category: "actief", monthly: 18, description: "Betrouwbare formulieren, bevestigingen en systeemnotificaties op meerdere domeinen.", recommended: true, logoSlug: "resend", icon: EnvelopeSimple },
  { id: "chatgpt-plus", name: "ChatGPT Plus", category: "actief", monthly: 18, description: "Goedkoopste individuele AI-werkruimte met lagere gebruikslimieten.", exclusiveGroup: "chatgpt", logoSlug: "openai", icon: Robot },
  { id: "chatgpt-pro100", name: "ChatGPT Pro 5x", category: "actief", monthly: 88, description: "Voorkeurskeuze voor structureel research-, content-, analyse- en Codexwerk door Volker.", recommended: true, exclusiveGroup: "chatgpt", logoSlug: "openai", icon: Robot },
  { id: "chatgpt-pro200", name: "ChatGPT Pro 20x", category: "productie", monthly: 176, description: "Voor zeer intensieve bouw- en productiemaanden met de hoogste individuele gebruikslimiet.", exclusiveGroup: "chatgpt", logoSlug: "openai", icon: RocketLaunch },
  { id: "chatgpt-business", name: "ChatGPT Business, 2 seats", category: "actief", monthly: 44, description: "Teamworkspace en centraal beheer; minder logisch als Volker de primaire intensieve gebruiker is.", exclusiveGroup: "chatgpt", logoSlug: "openai", icon: Briefcase },
  { id: "figma", name: "Figma Professional", category: "actief", monthly: 14, description: "Website- en appdesign, prototypes en developer handoff.", recommended: true, logoSlug: "figma", icon: Layout },
  { id: "canva", name: "Canva Pro", category: "actief", monthly: 11, description: "Dagelijkse socialcontent, presentaties, video en brand templates.", recommended: true, logoSlug: "canva", icon: ImageIcon },
  { id: "copilot", name: "GitHub Copilot Pro+", category: "productie", monthly: 34, description: "Premium codingmodellen en credits tijdens actieve bouw- en reviewmaanden.", recommended: true, logoSlug: "githubcopilot", icon: MagicWand },
  { id: "envato", name: "Envato Core", category: "productie", monthly: 14, description: "Stock, templates, muziek, graphics en commerciële assets.", recommended: true, logoSlug: "envato", icon: Sparkle },
  { id: "elevenlabs", name: "ElevenLabs Starter", category: "productie", monthly: 5, description: "Meertalige voice-overs en uitlegcontent.", recommended: true, logoSlug: "elevenlabs", icon: Headphones },
  { id: "runway", name: "Runway Pro", category: "productie", monthly: 25, description: "AI-video, effecten en campagnevarianten met eigen Earth Spas-credits.", recommended: true, logoSlug: "runway", icon: Activity },
];

const features: FeatureItem[] = [
  { id: "crm", name: "CRM en commerciële pipeline", description: "Leads, bron, taal, modelinteresse, afspraken, offertes en omzet in één proces.", hoursLow: 120, hoursHigh: 220, marketLow: 12000, marketHigh: 25000, impact: "Verkoop", icon: Users },
  { id: "booking", name: "Showroom booking en reminders", description: "Beschikbare tijden, bevestiging, route, reminders en opvolging.", hoursLow: 40, hoursHigh: 80, marketLow: 5000, marketHigh: 10000, impact: "Verkoop", icon: CalendarBlank },
  { id: "finder", name: "Spa Finder en productvergelijker", description: "Gestructureerd advies met maximaal drie passende modellen.", hoursLow: 60, hoursHigh: 120, marketLow: 8000, marketHigh: 15000, impact: "Verkoop", icon: Target },
  { id: "advisor", name: "AI Spa Advisor", description: "Meertalige adviesagent op gevalideerde productdata, gekoppeld aan CRM.", hoursLow: 120, hoursHigh: 240, marketLow: 15000, marketHigh: 30000, impact: "Verkoop", icon: Robot },
  { id: "recovery", name: "Lead recovery en automatische opvolging", description: "E-mail, WhatsApp, reminders en nurture op basis van gedrag en voorkeuren.", hoursLow: 70, hoursHigh: 140, marketLow: 8000, marketHigh: 16000, impact: "Marketing", icon: FlowArrow },
  { id: "marketing-agent", name: "Marketing- en contentagent", description: "SEO, social posts, advertentievarianten, contentplanning en analyses.", hoursLow: 140, hoursHigh: 280, marketLow: 15000, marketHigh: 35000, impact: "Marketing", icon: MagicWand },
  { id: "capture", name: "Mobiele installatie-capture app", description: "Foto- en videochecklist, tagging, crops, cases en publicatieworkflows.", hoursLow: 180, hoursHigh: 360, marketLow: 20000, marketHigh: 45000, impact: "Marketing", icon: ImageIcon },
  { id: "support", name: "Supportagent en kennisbank", description: "Onderhoud, handleidingen, foutmeldingen, tickets en menselijke escalatie.", hoursLow: 140, hoursHigh: 280, marketLow: 15000, marketHigh: 35000, impact: "Support", icon: ChatText },
  { id: "voice", name: "Voice agent", description: "Gesproken advies via website of telefoon met samenvatting naar CRM.", hoursLow: 120, hoursHigh: 240, marketLow: 15000, marketHigh: 35000, impact: "Support", icon: Headphones },
  { id: "analytics", name: "Attribution en managementdashboards", description: "Van campagne naar lead, afspraak, offerte, verkoop en omzet.", hoursLow: 90, hoursHigh: 200, marketLow: 10000, marketHigh: 25000, impact: "Data", icon: ChartBar },
];

const checklistItems: ChecklistItem[] = [
  { id: "payment-card", group: "Eigenaarschap", title: "Zakelijke betaalkaart regelen", description: "Earth Spas-betaalmiddel met vooraf afgesproken saldo en harde limieten voor software, AI en advertenties.", owner: "Jeroen / Wim", priority: "Nu" },
  { id: "admins", group: "Eigenaarschap", title: "Twee vaste beheerders aanwijzen", description: "Primaire en tweede beheerder voor accounts, hersteltoegang en noodgevallen vastleggen.", owner: "Earth Spas", priority: "Nu" },
  { id: "bitwarden", group: "Eigenaarschap", title: "Bitwarden-organisatie maken", description: "Wachtwoorden, 2FA-codes, herstelcodes en gedeelde kluizen gecontroleerd migreren.", owner: "Volker + Jeroen", priority: "Nu" },
  { id: "m365", group: "Eigenaarschap", title: "Microsoft 365-tenant aanmaken", description: "Earth Spas-tenant, gebruikers, gedeelde mailboxen, domeinen en migratiemoment vastleggen.", owner: "Volker + Jeroen", priority: "Nu" },
  { id: "github", group: "Eigenaarschap", title: "GitHub onder Earth Spas-eigendom", description: "Organisatie, repositories, twee owners en repositoryregels correct instellen.", owner: "Volker", priority: "Nu" },
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
  { id: "personal-payments", group: "Afronding", title: "Persoonlijke betaalmethoden verwijderen", description: "Pas nadat iedere nieuwe account, billingroute en acceptatietest aantoonbaar werkt.", owner: "Volker", priority: "Voor livegang" },
];

const resultCards = [
  { id: "website", accent: "primary" as const, value: "652", label: "actieve gebruikers", detail: "9.742 gemeten gebeurtenissen in GA4" },
  { id: "organic", accent: "primary" as const, value: "321", label: "organische Google-sessies", detail: "zonder structurele SEO-campagne" },
  { id: "ads", accent: "secondary" as const, value: "€35,90", label: "eerste Meta-test", detail: "287 landingspaginaweergaven voor €0,13 per weergave" },
  { id: "google", accent: "secondary" as const, value: "5,0", label: "Google-profiel", detail: "19 reviews en 504 klantinteracties" },
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

function Button({ className, variant = "primary", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "outline" | "ghost" }) {
  return <button className={cn("inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 py-2.5 text-base transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50", variant === "primary" && "bg-primary text-primary-foreground hover:bg-primary/90", variant === "secondary" && "bg-secondary text-secondary-foreground hover:bg-secondary/90", variant === "outline" && "border border-border bg-card/75 text-white hover:border-primary/70 hover:bg-accent", variant === "ghost" && "text-white hover:bg-accent", className)} {...props} />;
}

function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("print-card rounded-lg border border-border bg-card/94 shadow-xl hairline", className)} {...props} />;
}

function Switch({ checked, onCheckedChange, disabled, label, accent = "primary" }: { checked: boolean; onCheckedChange: (value: boolean) => void; disabled?: boolean; label: string; accent?: "primary" | "secondary" }) {
  return <SwitchPrimitive.Root aria-label={label} checked={checked} onCheckedChange={onCheckedChange} disabled={disabled} className={cn("relative h-7 w-12 shrink-0 rounded-full border border-border bg-input transition disabled:cursor-not-allowed disabled:opacity-75", accent === "primary" ? "data-[state=checked]:border-primary data-[state=checked]:bg-primary" : "data-[state=checked]:border-secondary data-[state=checked]:bg-secondary")}><SwitchPrimitive.Thumb className="block h-5 w-5 translate-x-0.5 rounded-full bg-white shadow transition data-[state=checked]:translate-x-[1.45rem]" /></SwitchPrimitive.Root>;
}

function Range({ value, min, max, step, onChange, ariaLabel, accent = "primary" }: { value: number; min: number; max: number; step: number; onChange: (value: number) => void; ariaLabel: string; accent?: "primary" | "secondary" }) {
  return <SliderPrimitive.Root aria-label={ariaLabel} value={[value]} min={min} max={max} step={step} onValueChange={(next) => onChange(next[0])} className="relative flex h-8 w-full touch-none select-none items-center"><SliderPrimitive.Track className="relative h-2 grow overflow-hidden rounded-full bg-input"><SliderPrimitive.Range className={cn("absolute h-full", accent === "primary" ? "bg-primary" : "bg-secondary")} /></SliderPrimitive.Track><SliderPrimitive.Thumb className={cn("block h-6 w-6 rounded-full border-2 bg-background shadow-md transition hover:scale-110 focus-visible:outline-none focus-visible:ring-2", accent === "primary" ? "border-primary focus-visible:ring-primary" : "border-secondary focus-visible:ring-secondary")} /></SliderPrimitive.Root>;
}

function ProviderLogo({ slug, icon: Icon, name }: { slug?: string; icon: PhosphorIcon; name: string }) {
  const [failed, setFailed] = React.useState(false);
  return <div className="grid h-12 w-12 shrink-0 place-items-center rounded-md border border-border bg-[#071018] text-white">{slug && !failed ? <img src={`https://cdn.simpleicons.org/${slug}`} alt={`${name} logo`} className="h-6 w-6 object-contain" loading="lazy" onError={() => setFailed(true)} /> : <Icon className="h-6 w-6" weight="regular" />}</div>;
}

function SectionHeading({ kicker, title, text, accent = "primary" }: { kicker: string; title: string; text: string; accent?: "primary" | "secondary" }) {
  return <div className="max-w-4xl"><p className={accent === "primary" ? "section-kicker" : "section-kicker-secondary"}>{kicker}</p><h2 className="mt-3 text-3xl uppercase leading-tight sm:text-4xl lg:text-5xl">{title}</h2><p className="mt-5 text-lg leading-8 text-white/90 sm:text-xl">{text}</p></div>;
}

function Metric({ label, value, helper, icon: Icon, accent = "primary" }: { label: string; value: string; helper: string; icon: PhosphorIcon; accent?: "primary" | "secondary" }) {
  return <Card className={cn("p-5 sm:p-6", accent === "primary" ? "border-primary/35" : "border-secondary/45")}><div className="flex items-start justify-between gap-4"><div><p className="text-sm uppercase tracking-[0.14em] text-white/70">{label}</p><p className={cn("mt-2 font-[family-name:var(--font-heading)] text-3xl", accent === "primary" ? "text-primary" : "text-secondary")}>{value}</p><p className="mt-2 text-base leading-6 text-white/85">{helper}</p></div><div className={cn("rounded-md border p-2.5", accent === "primary" ? "border-primary/35 bg-primary/10 text-primary" : "border-secondary/40 bg-secondary/10 text-secondary")}><Icon className="h-5 w-5" weight="regular" /></div></div></Card>;
}

export default function Page() {
  const [state, setState] = React.useState<SavedState>(initialState);
  const [mounted, setMounted] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem("earth-spas-choice-guide-v4");
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<SavedState>;
        setState({ ...initialState, ...parsed, toolSelections: { ...initialState.toolSelections, ...(parsed.toolSelections || {}) }, featureSelections: { ...initialState.featureSelections, ...(parsed.featureSelections || {}) }, checklist: { ...initialState.checklist, ...(parsed.checklist || {}) } });
      }
    } catch {}
  }, []);

  React.useEffect(() => {
    if (mounted) localStorage.setItem("earth-spas-choice-guide-v4", JSON.stringify(state));
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
  const lowExtraSales = baseExtraSales * 0.65;
  const highExtraSales = baseExtraSales * 1.35;
  const baseExtraRevenue = baseExtraSales * state.averageSalePrice;
  const lowExtraRevenue = lowExtraSales * state.averageSalePrice;
  const highExtraRevenue = highExtraSales * state.averageSalePrice;
  const growthPct = currentRevenue ? baseExtraRevenue / currentRevenue * 100 : 0;
  const revenuePerEuro = annualOperating ? baseExtraRevenue / annualOperating : 0;
  const grossProfitPerSale = Math.max(0, state.averageSalePrice / 1.2 * state.grossMargin / 100 - state.incrementalCostPerSale);
  const breakEvenSales = grossProfitPerSale ? annualOperating / grossProfitPerSale : 0;
  const expectedContribution = baseExtraSales * grossProfitPerSale - annualOperating;
  const contributionRoi = annualOperating ? expectedContribution / annualOperating * 100 : 0;
  const buildHoursLow = selectedFeatures.reduce((sum, feature) => sum + feature.hoursLow, 0);
  const buildHoursHigh = selectedFeatures.reduce((sum, feature) => sum + feature.hoursHigh, 0);
  const marketBuildLow = selectedFeatures.reduce((sum, feature) => sum + feature.marketLow, 0);
  const marketBuildHigh = selectedFeatures.reduce((sum, feature) => sum + feature.marketHigh, 0);
  const structuredAnnualHours = state.involvement === "structured" ? state.hoursPerWeek * 46 : 0;
  const completedTasks = checklistItems.filter((item) => state.checklist[item.id]).length;
  const checklistProgress = Math.round(completedTasks / checklistItems.length * 100);

  const update = <K extends keyof SavedState>(key: K, value: SavedState[K]) => setState((previous) => ({ ...previous, [key]: value }));
  const toggleTool = (tool: ToolItem, value: boolean) => setState((previous) => {
    const next = { ...previous.toolSelections, [tool.id]: value };
    if (value && tool.exclusiveGroup) tools.filter((candidate) => candidate.exclusiveGroup === tool.exclusiveGroup && candidate.id !== tool.id).forEach((candidate) => { next[candidate.id] = false; });
    return { ...previous, toolSelections: next };
  });
  const toggleFeature = (id: string, value: boolean) => setState((previous) => ({ ...previous, featureSelections: { ...previous.featureSelections, [id]: value } }));
  const toggleTask = (id: string) => setState((previous) => ({ ...previous, checklist: { ...previous.checklist, [id]: !previous.checklist[id] } }));

  const reset = () => { setState(initialState); localStorage.removeItem("earth-spas-choice-guide-v4"); };
  const summary = `Earth Spas keuzehulp\n\nExtern budget: ${euro.format(totalMonthly)} per maand / ${euro.format(annualOperating)} per jaar.\nVerwacht scenario: ${number.format(baseExtraSales)} extra spa's, ${euro.format(baseExtraRevenue)} extra omzet en ${number.format(growthPct)}% groei.\nAcquisitiekosten: ${euro.format(state.acquisitionCostPerSale)} per extra verkoop.\nExtra uitvoering: ${euro.format(state.incrementalCostPerSale)} per extra spa.\nVolker: ${state.involvement === "structured" ? `${state.hoursPerWeek} uur per week` : "vrij en incidenteel"}.\nActielijst: ${completedTasks}/${checklistItems.length}.\nExterne marktwaarde bouw: ${euro.format(marketBuildLow)}-${euro.format(marketBuildHigh)}.\nNotities: ${state.notes || "geen"}`;
  const copySummary = async () => { await navigator.clipboard.writeText(summary); setCopied(true); window.setTimeout(() => setCopied(false), 1800); };

  const revenueData = [
    { name: "Huidig", omzet: currentRevenue },
    { name: "Voorzichtig", omzet: currentRevenue + lowExtraRevenue },
    { name: "Verwacht", omzet: currentRevenue + baseExtraRevenue },
    { name: "Sterk", omzet: currentRevenue + highExtraRevenue },
  ];
  const months = ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];
  const salesRampData = months.map((maand, index) => ({ maand, verkoop: currentUnitsYear / 12 + baseExtraSales / 12 * (0.25 + index / 11 * 0.75) }));
  const decisionRows: DecisionRow[] = [
    { item: "Platform en tools", month: euro.format(platformMonthly), year: euro.format(platformMonthly * 12), result: `${selectedTools.length} actieve diensten, eigen server als kern` },
    { item: "Advertenties", month: euro.format(adsMonthly), year: euro.format(adsMonthly * 12), result: `Meta ${euro.format(state.metaBudget)} + Google ${euro.format(state.googleBudget)}` },
    { item: "AI-creditpotten", month: euro.format(aiMonthly), year: euro.format(aiMonthly * 12), result: `Agents ${euro.format(state.aiApiBudget)}, development ${euro.format(state.aiDevelopmentBudget)}, media ${euro.format(state.aiMediaBudget)}` },
    { item: "Betrokkenheid Volker", month: "niet financieel ingevuld", year: "apart bespreken", result: state.involvement === "structured" ? `${state.hoursPerWeek} uur per week` : "vrij en incidenteel" },
    { item: "Bouw en maatwerk", month: "los van budget", year: "los van budget", result: `Externe marktwaarde ${euro.format(marketBuildLow)}-${euro.format(marketBuildHigh)}` },
    { item: "Actielijst", month: `${completedTasks}/${checklistItems.length}`, year: `${checklistProgress}%`, result: "Accounts, betaling, techniek, marketing en acceptatie" },
    { item: "Totaal extern operationeel", month: euro.format(totalMonthly), year: euro.format(annualOperating), result: `${number.format(baseExtraSales)} extra spa's / ${euro.format(baseExtraRevenue)} extra omzet`, highlight: true },
  ];

  const navItems = [["#resultaten", "Resultaten"], ["#basis", "Aannames"], ["#tools", "Accounts"], ["#bouw", "Bouw"], ["#marketing", "Budget"], ["#acties", "Acties"], ["#resultaat", "Uitkomst"]];

  return <main id="top">
    <header className="no-print sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-xl">
      <div className="content-shell flex h-16 items-center justify-between gap-4 lg:h-20">
        <a href="#top" className="flex items-center"><img src="/screens/logo-full-gold.png" alt="Earth Spas" className="h-9 w-auto object-contain lg:h-11" /></a>
        <nav className="hidden items-center gap-6 lg:flex">{navItems.map(([href, label]) => <a key={href} href={href} className="text-base text-white transition hover:text-primary">{label}</a>)}</nav>
        <div className="hidden items-center gap-2 lg:flex"><Button variant="ghost" onClick={reset}><ArrowClockwise className="h-4 w-4" />Reset</Button><Button variant="outline" onClick={() => window.print()}><DownloadSimple className="h-4 w-4" />PDF</Button></div>
        <span className="absolute left-1/2 -translate-x-1/2 text-base uppercase tracking-[0.16em] text-white lg:hidden">Keuzehulp</span>
        <button aria-label="Menu" aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen((open) => !open)} className="grid h-11 w-11 place-items-center border-l border-border text-white lg:hidden">{mobileMenuOpen ? <X className="h-6 w-6" /> : <List className="h-7 w-7" />}</button>
      </div>
      {mobileMenuOpen && <div className="border-t border-border bg-card lg:hidden"><nav className="content-shell divide-y divide-border">{navItems.map(([href, label]) => <a key={href} href={href} onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between py-4 text-lg text-white"><span>{label}</span><CaretRight className="h-5 w-5 text-primary" /></a>)}<div className="grid grid-cols-2 gap-3 py-4"><Button variant="ghost" onClick={reset}><ArrowClockwise className="h-4 w-4" />Reset</Button><Button variant="outline" onClick={() => window.print()}><DownloadSimple className="h-4 w-4" />PDF</Button></div></nav></div>}
    </header>

    <section className="relative min-h-[680px] overflow-hidden border-b border-border">
      <img src="/hero-home.jpg" alt="Earth Spas showroom en premium whirlpools" className="absolute inset-0 h-full w-full object-cover object-center" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,12,17,.36),rgba(7,12,17,.96)_80%)] lg:bg-[linear-gradient(90deg,rgba(7,12,17,.96)_5%,rgba(7,12,17,.78)_55%,rgba(7,12,17,.24))]" />
      <div className="content-shell relative flex min-h-[680px] items-end py-16 lg:items-center lg:py-24"><div className="max-w-3xl"><p className="section-kicker">Van Volker aan {state.clientName || "Jeroen"}</p><h1 className="mt-5 text-3xl uppercase leading-[1.05] sm:text-5xl lg:text-6xl">Geen verkooppitch. Gewoon zien wat er staat, wat het kost en wat we ermee kunnen.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-white sm:text-xl">Zet accounts, functies en budgetten aan of uit. De pagina rekent kosten, ontwikkeltijd, marktwaarde, verwachte groei en de concrete actielijst direct door.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button onClick={() => document.getElementById("resultaten")?.scrollIntoView({ behavior: "smooth" })}>Bekijk de basis <ArrowRight className="h-4 w-4" /></Button><Button variant="outline" onClick={copySummary}>{copied ? <Check className="h-4 w-4" /> : <ClipboardText className="h-4 w-4" />}{copied ? "Gekopieerd" : "Kopieer samenvatting"}</Button></div><p className="mt-6 max-w-2xl text-base leading-7 text-white/85">Jouw bouwkosten en eventuele tegenprestatie staan niet in de calculator. Software, hosting, AI-credits en advertenties wel.</p></div></div>
    </section>

    <section id="resultaten" className="content-shell py-16 sm:py-24">
      <SectionHeading kicker="Tot nu toe behaald" title="De basis werkt al zonder structurele marketing." text="De cijfers zijn goed genoeg om te laten zien, mits we eerlijk blijven over wat ze betekenen. Ze bewijzen bereik, verkeer en een werkende digitale basis; nog niet hoeveel spa's rechtstreeks uit campagnes zijn verkocht." />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{resultCards.map((item) => <Card key={item.id} className={cn("p-6", item.accent === "primary" ? "border-primary/40" : "border-secondary/50")}><p className={cn("font-[family-name:var(--font-heading)] text-4xl", item.accent === "primary" ? "text-primary" : "text-secondary")}>{item.value}</p><h3 className="mt-3 text-xl uppercase">{item.label}</h3><p className="mt-3 text-base leading-7 text-white/80">{item.detail}</p></Card>)}</div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
        <Card className="p-6 sm:p-8"><p className="section-kicker">Herkomst van sessies</p><h3 className="mt-2 text-2xl uppercase">Organisch doet nu al het meeste werk</h3><div className="mt-5"><TrafficSourceChart data={trafficSources} /></div><p className="mt-4 text-base leading-7 text-white/80">Betaald verkeer is nog maar een klein deel. Dat geeft ruimte om gecontroleerd te testen zonder de huidige omzet ten onrechte aan advertenties toe te schrijven.</p></Card>
        <Card className="relative min-h-[420px] overflow-hidden border-primary/40"><img src="/earth-spas-collage-a-starry-lake-1920x1080.jpg" alt="Earth Spas sfeerbeeld" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-background via-background/82 to-background/10" /><div className="relative flex min-h-[420px] flex-col justify-end p-6 sm:p-8"><p className="section-kicker">Eerste advertentieproef</p><h3 className="mt-3 max-w-xl text-3xl uppercase">€35,90 leverde 287 landingspaginaweergaven op.</h3><p className="mt-4 max-w-2xl text-lg leading-8 text-white">Geen bewijs van verkoop, wel bewijs dat websiteverkeer goedkoop kan worden ingekocht. De volgende stap is lead-, afspraak-, offerte- en verkoopmeting.</p></div></Card>
      </div>
    </section>

    <section id="basis" className="border-y border-border bg-muted/55"><div className="content-shell py-16 sm:py-24"><SectionHeading kicker="Uitgangspunt" title="Marketing moet aantoonbaar extra groei toevoegen." text="Acquisitiekosten en extra uitvoeringskosten zijn nu apart. De eerste waarde schat welk groeibudget nodig is om één extra verkoop te genereren. De tweede waarde is alleen het extra werk nadat die spa al verkocht is en kan dus gewoon op €0, €100 of €200 staan." />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Metric label="Verkoop per jaar" value={number.format(currentUnitsYear)} helper={`${number.format(state.currentSalesPerWeek)} per week`} icon={Target} /><Metric label="Huidige omzet" value={euro.format(currentRevenue)} helper="inclusief btw" icon={CurrencyEur} accent="secondary" /><Metric label="Acquisitiekosten" value={euro.format(state.acquisitionCostPerSale)} helper="groeibudget per extra verkoop" icon={ChartLine} /><Metric label="Extra uitvoering" value={euro.format(state.incrementalCostPerSale)} helper="mag op €0 staan" icon={Gauge} /></div>
      <Card className="mt-6 p-6 sm:p-8"><div className="flex items-start justify-between gap-4"><div><h3 className="text-2xl uppercase">Basisaannames</h3><p className="mt-2 text-base text-white/75">Alle waarden werken direct door in de grafieken en berekeningen.</p></div><FadersHorizontal className="h-6 w-6 text-primary" /></div><div className="mt-8 grid gap-8 md:grid-cols-2 xl:grid-cols-3">{[
        { label: "Spa's per week", helper: "Bestaande organische verkoop", value: state.currentSalesPerWeek, min: .5, max: 8, step: .5, display: number.format(state.currentSalesPerWeek), set: (value: number) => update("currentSalesPerWeek", value) },
        { label: "Gemiddelde verkoopprijs", helper: "Inclusief btw", value: state.averageSalePrice, min: 3500, max: 15000, step: 250, display: euro.format(state.averageSalePrice), set: (value: number) => update("averageSalePrice", value) },
        { label: "Brutomarge", helper: "Na inkoopprijs van de spa", value: state.grossMargin, min: 20, max: 60, step: 1, display: `${state.grossMargin}%`, set: (value: number) => update("grossMargin", value) },
        { label: "Acquisitiekosten per extra verkoop", helper: "Marketing- en groeibudget; niet de inkoopprijs", value: state.acquisitionCostPerSale, min: 250, max: 4000, step: 50, display: euro.format(state.acquisitionCostPerSale), set: (value: number) => update("acquisitionCostPerSale", value) },
        { label: "Extra uitvoeringskosten per spa", helper: "Extra administratie, planning of ondersteuning", value: state.incrementalCostPerSale, min: 0, max: 1500, step: 25, display: euro.format(state.incrementalCostPerSale), set: (value: number) => update("incrementalCostPerSale", value) },
      ].map((item, index) => <label key={item.label} className="block"><div className="mb-3 flex items-start justify-between gap-4"><div><span className="text-base text-white">{item.label}</span><p className="mt-1 text-sm leading-5 text-white/65">{item.helper}</p></div><span className={cn("shrink-0 rounded-md border px-2.5 py-1 text-base", index === 1 ? "border-secondary/45 bg-secondary/10 text-secondary" : "border-primary/45 bg-primary/10 text-primary")}>{item.display}</span></div><Range value={item.value} min={item.min} max={item.max} step={item.step} onChange={item.set} ariaLabel={item.label} accent={index === 1 ? "secondary" : "primary"} /></label>)}</div></Card>
    </div></section>

    <section id="tools" className="content-shell py-16 sm:py-24"><SectionHeading kicker="Accounts en infrastructuur" title="De eigen server is de kern. De rest ondersteunt die basis." text="De aanbevolen route is een eigen Hetzner-server voor Directus, n8n, agents en backend. Vercel blijft alleen de frontendlaag. ChatGPT Pro en andere credittools staan apart, zodat Earth Spas de inzet betaalt in plaats van Volkers privéaccounts." />
      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{tools.map((tool) => { const active = state.toolSelections[tool.id]; const accent = tool.recommended ? "secondary" : "primary"; return <Card key={tool.id} className={cn("p-5 transition sm:p-6", active ? accent === "secondary" ? "border-secondary/50" : "border-primary/35" : "opacity-60")}><div className="flex items-start justify-between gap-4"><div className="flex min-w-0 gap-3"><ProviderLogo slug={tool.logoSlug} icon={tool.icon} name={tool.name} /><div className="min-w-0"><h3 className="text-lg leading-6">{tool.name}</h3><p className="mt-1 text-sm text-white/60">{tool.required ? "vaste basis" : tool.recommended ? "aanbevolen" : tool.category}</p></div></div><Switch checked={active} onCheckedChange={(value) => toggleTool(tool, value)} disabled={tool.required} label={tool.name} accent={accent} /></div><p className="mt-4 text-base leading-7 text-white">{tool.description}</p><div className="mt-5 flex items-center justify-between border-t border-border pt-4"><span className="text-sm uppercase tracking-[.14em] text-white/60">per maand</span><span className={accent === "secondary" ? "text-xl text-secondary" : "text-xl text-primary"}>{tool.monthly === 0 ? "€0" : euro.format(tool.monthly)}</span></div></Card>; })}</div>
      <Card className="mt-6 border-secondary/45 p-6 sm:p-8"><p className="section-kicker-secondary">Geselecteerde platformlaag</p><div className="mt-2 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"><div><h3 className="text-4xl text-secondary">{euro.format(platformMonthly)} per maand</h3><p className="mt-3 text-lg text-white">{selectedTools.length} actieve diensten. Advertenties en AI-credits staan apart.</p></div><p className="max-w-xl text-base leading-7 text-white/75">De server is het eigendomspunt; losse SaaS-tools blijven vervangbare onderdelen. Dat scheelt later weer een ceremonie rond persoonlijke accounts en vergeten betaalkaarten.</p></div></Card>
    </section>

    <section id="bouw" className="border-y border-border bg-muted/55"><div className="content-shell py-16 sm:py-24"><SectionHeading kicker="Wat kan er gebouwd worden?" title="Vergelijk ontwikkeltijd met normale externe marktwaarde." text="Deze bedragen zijn uitsluitend vergelijkingsmateriaal voor ontwerp, ontwikkeling, integratie, testen en oplevering door een extern softwarebedrijf. Ze worden niet bij het operationele budget opgeteld." />
      <div className="mt-10 overflow-hidden rounded-lg border border-border bg-card/90"><div className="hidden grid-cols-[70px_1.4fr_.65fr_.75fr_.8fr] gap-4 border-b border-border bg-accent px-5 py-4 text-sm uppercase tracking-[.12em] text-white/75 lg:grid"><span>Kies</span><span>Onderdeel</span><span>Impact</span><span>Ontwikkeltijd</span><span>Marktwaarde</span></div>{features.map((feature) => { const active = state.featureSelections[feature.id]; const Icon = feature.icon; return <div key={feature.id} className={cn("grid gap-4 border-b border-border px-5 py-6 last:border-0 lg:grid-cols-[70px_1.4fr_.65fr_.75fr_.8fr] lg:items-center", !active && "opacity-55")}><Switch checked={active} onCheckedChange={(value) => toggleFeature(feature.id, value)} label={feature.name} /><div className="flex gap-3"><div className="mt-0.5 rounded-md border border-primary/35 bg-primary/10 p-2 text-primary"><Icon className="h-5 w-5" /></div><div><h3 className="text-lg">{feature.name}</h3><p className="mt-1 text-base leading-7 text-white">{feature.description}</p></div></div><div><span className="mb-1 block text-sm uppercase tracking-[.12em] text-white/60 lg:hidden">Impact</span><span className="text-primary">{feature.impact}</span></div><div><span className="mb-1 block text-sm uppercase tracking-[.12em] text-white/60 lg:hidden">Ontwikkeltijd</span>{feature.hoursLow}-{feature.hoursHigh} uur</div><div><span className="mb-1 block text-sm uppercase tracking-[.12em] text-white/60 lg:hidden">Marktwaarde</span>{euro.format(feature.marketLow)}-{euro.format(feature.marketHigh)}</div></div>; })}</div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Metric label="Geselecteerde functies" value={`${selectedFeatures.length}`} helper={`van ${features.length} onderdelen`} icon={Check} /><Metric label="Ontwikkelomvang" value={`${buildHoursLow}-${buildHoursHigh} uur`} helper="totale bandbreedte" icon={Code} /><Metric label="Externe marktwaarde" value={`${euro.format(marketBuildLow)}-${euro.format(marketBuildHigh)}`} helper="niet opgenomen in budget" icon={Briefcase} accent="secondary" /><Metric label="Fulltime bouwtijd" value={`${Math.ceil(buildHoursLow / 160)}-${Math.ceil(buildHoursHigh / 160)} maanden`} helper="bij één developer" icon={CalendarBlank} /></div>
    </div></section>

    <section id="marketing" className="content-shell py-16 sm:py-24"><SectionHeading kicker="Budget en inzet" title="Vul het echte maandbudget in en kies hoe structureel jij eraan werkt." text="AI-abonnementen en verbruikscredits zijn bewust gescheiden. Zo is zichtbaar wat nodig is voor agents, development en media, zonder dat die uitgaven ongemerkt op Volkers eigen accounts blijven hangen." />
      <div className="mt-10 grid gap-6 xl:grid-cols-[1.05fr_.95fr]"><Card className="p-6 sm:p-8"><h3 className="text-2xl uppercase">Maandbudgetten</h3><div className="mt-8 space-y-8">{[
        { label: "Meta Ads", helper: "Facebook, Instagram en remarketing", value: state.metaBudget, max: 7500, set: (value: number) => update("metaBudget", value) },
        { label: "Google Ads", helper: "Zoekintentie, showroom en regio's", value: state.googleBudget, max: 7500, set: (value: number) => update("googleBudget", value) },
        { label: "Externe contentreserve", helper: "Fotografie, video of losse productie buiten Volker", value: state.contentBudget, max: 3000, set: (value: number) => update("contentBudget", value) },
        { label: "Agent- en API-credits", helper: "OpenAI API, supportagents, analyses en workflows", value: state.aiApiBudget, max: 2500, set: (value: number) => update("aiApiBudget", value) },
        { label: "Development-AI-credits", helper: "Codex, Copilot-overages en actieve bouwmaanden", value: state.aiDevelopmentBudget, max: 2500, set: (value: number) => update("aiDevelopmentBudget", value) },
        { label: "Media-AI-credits", helper: "Beeld, video, voice en campagnevarianten", value: state.aiMediaBudget, max: 2500, set: (value: number) => update("aiMediaBudget", value) },
      ].map((item, index) => <label key={item.label} className="block"><div className="mb-3 flex items-end justify-between gap-4"><div><span className="text-base text-white">{item.label}</span><p className="mt-1 text-sm text-white/65">{item.helper}</p></div><span className={cn("shrink-0 rounded-md border px-2.5 py-1", index === 1 ? "border-secondary/45 bg-secondary/10 text-secondary" : "border-primary/45 bg-primary/10 text-primary")}>{euro.format(item.value)}</span></div><Range value={item.value} min={0} max={item.max} step={25} onChange={item.set} ariaLabel={item.label} accent={index === 1 ? "secondary" : "primary"} /></label>)}</div></Card>
        <Card className="p-6 sm:p-8"><h3 className="text-2xl uppercase">Betrokkenheid Volker</h3><div className="mt-6 grid gap-3 sm:grid-cols-2"><button onClick={() => update("involvement", "free")} className={cn("rounded-lg border p-5 text-left transition", state.involvement === "free" ? "border-secondary/55 bg-secondary/10" : "border-border bg-muted")}><Sparkle className="h-6 w-6 text-secondary" /><h4 className="mt-4 text-xl">Vrij en incidenteel</h4><p className="mt-2 text-base leading-7 text-white">Werken wanneer het uitkomt en oppakken wat op dat moment interessant of nodig is.</p></button><button onClick={() => update("involvement", "structured")} className={cn("rounded-lg border p-5 text-left transition", state.involvement === "structured" ? "border-primary/55 bg-primary/10" : "border-border bg-muted")}><RocketLaunch className="h-6 w-6 text-primary" /><h4 className="mt-4 text-xl">Structurele betrokkenheid</h4><p className="mt-2 text-base leading-7 text-white">Vaste uren voor socials, marketing, website, agents, data en doorontwikkeling.</p></button></div>{state.involvement === "structured" && <div className="mt-7 rounded-lg border border-primary/35 bg-primary/10 p-5"><div className="mb-3 flex items-center justify-between"><span className="text-white">Uren per week</span><span className="text-2xl text-primary">{state.hoursPerWeek} uur</span></div><Range value={state.hoursPerWeek} min={2} max={32} step={1} onChange={(value) => update("hoursPerWeek", value)} ariaLabel="Uren per week" /><div className="mt-5 grid grid-cols-3 gap-2 text-center text-sm text-white/70"><div className="rounded-md border border-primary/30 p-2"><span className="block text-base text-white">{Math.round(structuredAnnualHours)}</span>uur/jaar</div><div className="rounded-md border border-primary/30 p-2"><span className="block text-base text-white">{Math.round(structuredAnnualHours * .32)}</span>marketing</div><div className="rounded-md border border-primary/30 p-2"><span className="block text-base text-white">{Math.round(structuredAnnualHours * .42)}</span>bouw/data</div></div></div>}<div className="mt-6 rounded-lg border border-secondary/40 bg-secondary/10 p-4 text-base leading-7 text-white"><Info className="mr-2 inline h-5 w-5 text-secondary" />Wat hier tegenover staat wordt onderling besproken en staat niet in deze keuzehulp.</div></Card>
      </div>
    </section>

    <section id="acties" className="border-y border-border bg-muted/55"><div className="content-shell py-16 sm:py-24"><SectionHeading kicker="Actielijst" title="Alles wat nu geregeld en verplaatst moet worden." text="Vink taken tijdens de uitvoering af. Persoonlijke kaarten en rechten verdwijnen pas nadat de nieuwe omgeving aantoonbaar werkt. Eerst alles verwijderen en daarna kijken wat breekt is geen migratiestrategie, hoe efficiënt het op papier ook oogt." />
      <Card className="mt-10 border-secondary/45 p-6 sm:p-8"><div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="section-kicker-secondary">Voortgang</p><h3 className="mt-2 text-3xl">{completedTasks} van {checklistItems.length} acties afgerond</h3></div><div><p className="text-4xl text-secondary">{checklistProgress}%</p><p className="text-base text-white/65">lokaal bewaard</p></div></div><div className="mt-5 h-3 overflow-hidden rounded-full bg-input"><div className="h-full rounded-full bg-secondary transition-all" style={{ width: `${checklistProgress}%` }} /></div></Card>
      <div className="mt-8 space-y-10">{(["Eigenaarschap", "Techniek", "Marketing", "Afronding"] as ChecklistItem["group"][]).map((group) => { const groupItems = checklistItems.filter((item) => item.group === group); const done = groupItems.filter((item) => state.checklist[item.id]).length; return <div key={group}><div className="mb-4 flex items-end justify-between gap-4"><div><p className="section-kicker">{group}</p><h3 className="mt-1 text-2xl uppercase">{group === "Eigenaarschap" ? "Accounts, betaling en toegang" : group === "Techniek" ? "Server, data en systemen" : group === "Marketing" ? "Kanalen, AI en meting" : "Veilige afronding en afspraken"}</h3></div><span className="text-primary">{done}/{groupItems.length}</span></div><div className="grid gap-3 xl:grid-cols-2">{groupItems.map((item) => { const checked = state.checklist[item.id]; return <button key={item.id} onClick={() => toggleTask(item.id)} className={cn("flex w-full gap-4 rounded-lg border p-4 text-left transition sm:p-5", checked ? "border-secondary/55 bg-secondary/10" : "border-border bg-card hover:border-primary/50")}><span className={cn("mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md border", checked ? "border-secondary bg-secondary text-secondary-foreground" : "border-border bg-muted text-transparent")}><Check className="h-4 w-4" /></span><span className="min-w-0 flex-1"><span className="flex flex-wrap items-start justify-between gap-2"><span className={checked ? "text-lg text-secondary" : "text-lg text-white"}>{item.title}</span><span className="rounded-full border border-border px-2 py-.5 text-sm text-white/65">{item.priority}</span></span><span className="mt-2 block text-base leading-7 text-white">{item.description}</span><span className="mt-3 block text-sm uppercase tracking-[.12em] text-white/55">Eigenaar: {item.owner}</span></span></button>; })}</div></div>; })}</div>
    </div></section>

    <section id="resultaat" className="content-shell py-16 sm:py-24"><SectionHeading kicker="Live resultaatmodel" title="Iedere keuze werkt door in kosten, groei en break-even." text="De acquisitiekosten-aannname stuurt het verwachte aantal extra verkopen. De aparte uitvoeringskosten kunnen op €0, €100 of €200 staan en beïnvloeden alleen de bijdrage en break-even." />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-5"><Metric label="Extern budget" value={`${euro.format(totalMonthly)} p/m`} helper={`${euro.format(annualOperating)} per jaar`} icon={CurrencyEur} accent="secondary" /><Metric label="Extra verkopen" value={`${number.format(lowExtraSales)}-${number.format(highExtraSales)}`} helper={`${number.format(baseExtraSales)} verwacht`} icon={Target} /><Metric label="Omzetgroei" value={`${number.format(growthPct)}%`} helper={`${euro.format(baseExtraRevenue)} extra omzet`} icon={ChartLine} /><Metric label="Break-even" value={`${number.format(breakEvenSales)} spa's`} helper={`na ${euro.format(state.incrementalCostPerSale)} extra uitvoering`} icon={Gauge} /><Metric label="Bijdrage-ROI" value={`${number.format(contributionRoi)}%`} helper={`${euro.format(expectedContribution)} na extern budget`} icon={ChartBar} accent="secondary" /></div>
      <div className="mt-6 grid gap-6 xl:grid-cols-3"><Card className="p-6"><p className="section-kicker">Budgetverdeling</p><h3 className="mt-2 text-2xl uppercase">Waar gaat het geld naartoe?</h3><BudgetChart total={euro.format(totalMonthly)} data={[{ name: "Platform", value: platformMonthly }, { name: "Advertenties", value: adsMonthly }, { name: "Content", value: state.contentBudget }, { name: "AI-credits", value: aiMonthly }]} /></Card><Card className="border-secondary/45 p-6"><p className="section-kicker-secondary">Omzetvergelijking</p><h3 className="mt-2 text-2xl uppercase">Huidig tegenover scenario</h3><RevenueScenarioChart data={revenueData} /><div className="rounded-md border border-secondary/35 bg-secondary/10 p-4"><p className="text-sm uppercase tracking-[.12em] text-white/65">Omzet per €1 extern budget</p><p className="mt-1 text-3xl text-secondary">€{number.format(revenuePerEuro)}</p></div></Card><Card className="p-6"><p className="section-kicker">Verkoopontwikkeling</p><h3 className="mt-2 text-2xl uppercase">Verwachte maandelijkse opbouw</h3><SalesRampChart data={salesRampData} /><p className="mt-2 text-base leading-7 text-white/80">Groei loopt geleidelijk op. Geen spreadsheetmagie waarbij vier spa's op dinsdagochtend uit de lucht vallen.</p></Card></div>
      <Card className="mt-6 overflow-hidden"><div className="border-b border-border px-6 py-5"><p className="section-kicker">Beslisoverzicht</p><h3 className="mt-2 text-2xl uppercase">Geselecteerde keuzes en financiële uitkomst</h3></div><div className="p-4 md:p-0"><DecisionTable rows={decisionRows} /></div></Card>
    </section>

    <section className="border-t border-border bg-muted/55"><div className="content-shell grid gap-6 py-16 sm:py-24 xl:grid-cols-[1fr_.8fr]"><div><p className="section-kicker-secondary">Persoonlijke afsluiting</p><h2 className="mt-3 text-4xl uppercase">Wat zou ik kiezen?</h2><p className="mt-5 max-w-2xl text-xl leading-9 text-white">Een zelfstandige Earth Spas-server, eigen accounts en betaalmethoden, ChatGPT Pro met aparte creditlimieten, een beheerst advertentiebudget en structurele betrokkenheid.</p><div className="mt-7 flex flex-col gap-3 no-print sm:flex-row"><Button variant="secondary" onClick={() => window.print()}><DownloadSimple className="h-4 w-4" />Bewaar als PDF</Button><Button variant="outline" onClick={copySummary}>{copied ? <Check className="h-4 w-4" /> : <FloppyDisk className="h-4 w-4" />}{copied ? "Gekopieerd" : "Kopieer keuzes"}</Button></div></div><Card className="p-6"><label className="block text-white">Naam</label><input value={state.clientName} onChange={(event) => update("clientName", event.target.value)} className="mt-2 min-h-12 w-full rounded-md border border-input bg-background px-3 py-2.5 text-lg text-white outline-none focus:border-primary" /><label className="mt-5 block text-white">Notities of afspraken</label><textarea value={state.notes} onChange={(event) => update("notes", event.target.value)} rows={7} placeholder="Bijvoorbeeld: eerst accounts en server, daarna CRM en tracking..." className="mt-2 w-full resize-y rounded-md border border-input bg-background px-3 py-2.5 text-lg text-white outline-none focus:border-primary" /><p className="mt-3 text-sm text-white/60">Keuzes en checklist worden automatisch lokaal in deze browser bewaard.</p></Card></div></section>

    <div className="no-print sticky bottom-0 z-40 border-t border-primary/35 bg-background/95 px-4 py-3 backdrop-blur-xl lg:hidden"><div className="flex items-center justify-between gap-3"><div><p className="text-sm text-white/60">Extern budget p/m</p><p className="text-xl text-primary">{euro.format(totalMonthly)}</p></div><Button onClick={() => document.getElementById("resultaat")?.scrollIntoView({ behavior: "smooth" })}>Uitkomst <CaretRight className="h-4 w-4" /></Button></div></div>
    <footer className="border-t border-border px-4 py-10 text-center text-base text-white/65">Earth Spas keuzehulp · Volker / 3ECK Technology · scenario's zijn indicatief, geen verkoopgaranties</footer>
  </main>;
}
