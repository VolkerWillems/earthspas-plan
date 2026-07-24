"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import {
  Activity,
  BarChart3,
  Bot,
  BriefcaseBusiness,
  CalendarClock,
  Check,
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
  LayoutDashboard,
  LineChart,
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
  WandSparkles,
  Workflow,
  X,
} from "lucide-react";
import { cn, euro, number } from "@/lib/utils";

type ToolItem = {
  id: string;
  name: string;
  category: "basis" | "actief" | "productie";
  monthly: number;
  description: string;
  required?: boolean;
  icon: React.ComponentType<{ className?: string }>;
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
  icon: React.ComponentType<{ className?: string }>;
};

type SavedState = {
  toolSelections: Record<string, boolean>;
  featureSelections: Record<string, boolean>;
  metaBudget: number;
  googleBudget: number;
  contentBudget: number;
  aiApiBudget: number;
  currentSalesPerWeek: number;
  averageSalePrice: number;
  grossMargin: number;
  costPerExtraSale: number;
  involvement: "free" | "structured";
  hoursPerWeek: number;
  clientName: string;
  notes: string;
};

const tools: ToolItem[] = [
  { id: "m365", name: "Microsoft 365 Business Basic", category: "basis", monthly: 5.2, description: "Mail, agenda, SharePoint en bestanden.", required: true, icon: Mail },
  { id: "bitwarden", name: "Bitwarden Teams", category: "basis", monthly: 7, description: "Wachtwoorden, 2FA en noodtoegang voor twee beheerders.", required: true, icon: ShieldCheck },
  { id: "github", name: "GitHub Team", category: "basis", monthly: 4, description: "Broncode en repository-eigendom onder Earth Spas.", required: true, icon: Code2 },
  { id: "vercel", name: "Vercel Pro", category: "basis", monthly: 18, description: "Websitehosting, previews en spend controls.", required: true, icon: Globe2 },
  { id: "resend", name: "Resend Pro", category: "basis", monthly: 18, description: "Contactformulieren, bevestigingen en notificaties.", required: true, icon: Mail },
  { id: "supabase", name: "Supabase Pro", category: "basis", monthly: 22, description: "Productiedatabase, storage en back-ups.", required: true, icon: Database },
  { id: "hetzner", name: "Hetzner CPX32 + back-ups", category: "basis", monthly: 46, description: "Directus, n8n en backend los van persoonlijke infrastructuur.", required: true, icon: Server },
  { id: "chatgpt", name: "ChatGPT Business", category: "actief", monthly: 35, description: "Centrale AI-werkruimte, analyse, agents en Codex.", icon: Bot },
  { id: "figma", name: "Figma Professional", category: "actief", monthly: 14, description: "Website- en appdesign, prototypes en handoff.", icon: LayoutDashboard },
  { id: "canva", name: "Canva Pro", category: "actief", monthly: 11, description: "Socialcontent, presentaties en snelle video.", icon: ImageIcon },
  { id: "copilot", name: "GitHub Copilot Pro+", category: "productie", monthly: 34, description: "Snellere actieve bouw- en reviewmaanden.", icon: WandSparkles },
  { id: "envato", name: "Envato Core", category: "productie", monthly: 14, description: "Stock, templates, muziek en commerciële assets.", icon: Sparkles },
  { id: "elevenlabs", name: "ElevenLabs Starter", category: "productie", monthly: 5, description: "Meertalige voice-overs en uitlegcontent.", icon: Headphones },
  { id: "runway", name: "Runway Pro", category: "productie", monthly: 25, description: "AI-video, effects en campagnevarianten.", icon: Activity },
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

const defaultTools = Object.fromEntries(tools.map((tool) => [tool.id, tool.required || ["chatgpt", "figma", "canva"].includes(tool.id)]));
const defaultFeatures = Object.fromEntries(features.map((feature) => [feature.id, ["crm", "booking", "finder", "advisor", "recovery", "marketing-agent", "analytics"].includes(feature.id)]));

const initialState: SavedState = {
  toolSelections: defaultTools,
  featureSelections: defaultFeatures,
  metaBudget: 1000,
  googleBudget: 1500,
  contentBudget: 250,
  aiApiBudget: 150,
  currentSalesPerWeek: 2,
  averageSalePrice: 6000,
  grossMargin: 38,
  costPerExtraSale: 2200,
  involvement: "structured",
  hoursPerWeek: 10,
  clientName: "Jeroen",
  notes: "",
};

function Button({ className, variant = "primary", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "outline" | "ghost" }) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        variant === "primary" && "bg-primary text-primary-foreground hover:bg-primary/90",
        variant === "outline" && "border border-border bg-card/70 text-foreground hover:border-primary/60 hover:bg-accent",
        variant === "ghost" && "text-muted-foreground hover:bg-accent hover:text-foreground",
        className,
      )}
      {...props}
    />
  );
}

function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("print-card rounded-xl border border-border bg-card/85 shadow-lg hairline", className)} {...props} />;
}

function Badge({ children, tone = "default" }: { children: React.ReactNode; tone?: "default" | "success" | "warning" }) {
  return (
    <span className={cn(
      "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold",
      tone === "default" && "border-primary/30 bg-primary/10 text-chart-1",
      tone === "success" && "border-emerald-400/25 bg-emerald-400/10 text-emerald-300",
      tone === "warning" && "border-amber-400/25 bg-amber-400/10 text-amber-300",
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
      className="relative h-6 w-11 shrink-0 rounded-full border border-border bg-input transition data-[state=checked]:border-primary/70 data-[state=checked]:bg-primary disabled:cursor-not-allowed disabled:opacity-60"
    >
      <SwitchPrimitive.Thumb className="block h-4.5 w-4.5 translate-x-0.5 rounded-full bg-white shadow transition data-[state=checked]:translate-x-[1.35rem]" />
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
      className="relative flex h-5 w-full touch-none select-none items-center"
    >
      <SliderPrimitive.Track className="relative h-1.5 grow overflow-hidden rounded-full bg-input">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background shadow-md ring-offset-background transition hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
    </SliderPrimitive.Root>
  );
}

function Metric({ label, value, helper, icon: Icon }: { label: string; value: string; helper?: string; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
          <p className="mt-2 font-[family-name:var(--font-heading)] text-3xl font-semibold tracking-tight text-card-foreground">{value}</p>
          {helper && <p className="mt-2 text-sm text-muted-foreground">{helper}</p>}
        </div>
        <div className="rounded-lg border border-primary/25 bg-primary/10 p-2.5 text-primary"><Icon className="h-5 w-5" /></div>
      </div>
    </Card>
  );
}

function SectionHeading({ kicker, title, text }: { kicker: string; title: string; text: string }) {
  return (
    <div className="max-w-3xl">
      <p className="section-kicker">{kicker}</p>
      <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">{text}</p>
    </div>
  );
}

function BudgetDonut({ platform, ads, content, api }: { platform: number; ads: number; content: number; api: number }) {
  const total = Math.max(platform + ads + content + api, 1);
  const values = [platform, ads, content, api];
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
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">per maand</p>
          <p className="mt-1 text-2xl font-semibold">{euro.format(total)}</p>
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
    <div className="space-y-4">
      {rows.map((row) => (
        <div key={row.label}>
          <div className="mb-1.5 flex items-center justify-between text-sm"><span className="text-muted-foreground">{row.label}</span><span className="font-semibold">{euro.format(row.value)}</span></div>
          <div className="h-3 overflow-hidden rounded-full bg-input"><div className={cn("h-full rounded-full transition-all duration-500", row.className)} style={{ width: `${Math.max((row.value / max) * 100, 3)}%` }} /></div>
        </div>
      ))}
    </div>
  );
}

function SalesRamp({ currentPerMonth, extraPerYear }: { currentPerMonth: number; extraPerYear: number }) {
  const points = Array.from({ length: 12 }, (_, index) => {
    const ramp = 0.35 + (index / 11) * 0.65;
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
      <path d={path} fill="none" stroke="var(--chart-2)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      {points.map((value, index) => <circle key={index} cx={x(index)} cy={y(value)} r="4" fill="var(--background)" stroke="var(--chart-1)" strokeWidth="2" />)}
      <text x="18" y="187" fill="var(--muted-foreground)" fontSize="10">jan</text>
      <text x="190" y="187" fill="var(--muted-foreground)" fontSize="10">jun</text>
      <text x="365" y="187" fill="var(--muted-foreground)" fontSize="10">dec</text>
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
      const raw = localStorage.getItem("earth-spas-choice-guide");
      if (raw) setState({ ...initialState, ...JSON.parse(raw) });
    } catch {
      // A broken localStorage record should not break the decision tool.
    }
  }, []);

  React.useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("earth-spas-choice-guide", JSON.stringify(state));
  }, [state, mounted]);

  const selectedTools = tools.filter((tool) => state.toolSelections[tool.id]);
  const selectedFeatures = features.filter((feature) => state.featureSelections[feature.id]);
  const platformMonthly = selectedTools.reduce((sum, tool) => sum + tool.monthly, 0);
  const adsMonthly = state.metaBudget + state.googleBudget;
  const totalMonthly = platformMonthly + adsMonthly + state.contentBudget + state.aiApiBudget;
  const annualOperating = totalMonthly * 12;
  const currentUnitsYear = state.currentSalesPerWeek * 52;
  const currentRevenue = currentUnitsYear * state.averageSalePrice;
  const readiness = Math.min(1.16, 0.68 + selectedFeatures.length * 0.035 + (state.involvement === "structured" ? Math.min(state.hoursPerWeek, 16) * 0.018 : 0));
  const growthBudget = (adsMonthly + state.contentBudget + state.aiApiBudget + platformMonthly * 0.25) * 12;
  const baseExtraSales = growthBudget > 0 ? (growthBudget / Math.max(state.costPerExtraSale, 1)) * readiness : 0;
  const lowExtraSales = Math.max(0, baseExtraSales * 0.72);
  const highExtraSales = baseExtraSales * 1.28;
  const baseExtraRevenue = baseExtraSales * state.averageSalePrice;
  const lowExtraRevenue = lowExtraSales * state.averageSalePrice;
  const highExtraRevenue = highExtraSales * state.averageSalePrice;
  const baseTotalRevenue = currentRevenue + baseExtraRevenue;
  const lowTotalRevenue = currentRevenue + lowExtraRevenue;
  const highTotalRevenue = currentRevenue + highExtraRevenue;
  const growthPct = currentRevenue ? (baseExtraRevenue / currentRevenue) * 100 : 0;
  const revenuePerEuro = annualOperating ? baseExtraRevenue / annualOperating : 0;
  const saleExVat = state.averageSalePrice / 1.2;
  const grossProfitPerSale = saleExVat * (state.grossMargin / 100);
  const breakEvenSales = grossProfitPerSale ? annualOperating / grossProfitPerSale : 0;
  const buildHoursLow = selectedFeatures.reduce((sum, feature) => sum + feature.hoursLow, 0);
  const buildHoursHigh = selectedFeatures.reduce((sum, feature) => sum + feature.hoursHigh, 0);
  const marketBuildLow = selectedFeatures.reduce((sum, feature) => sum + feature.marketLow, 0);
  const marketBuildHigh = selectedFeatures.reduce((sum, feature) => sum + feature.marketHigh, 0);
  const structuredAnnualHours = state.involvement === "structured" ? state.hoursPerWeek * 46 : 0;

  const update = <K extends keyof SavedState>(key: K, value: SavedState[K]) => setState((previous) => ({ ...previous, [key]: value }));
  const toggleTool = (id: string, value: boolean) => setState((previous) => ({ ...previous, toolSelections: { ...previous.toolSelections, [id]: value } }));
  const toggleFeature = (id: string, value: boolean) => setState((previous) => ({ ...previous, featureSelections: { ...previous.featureSelections, [id]: value } }));

  const reset = () => {
    setState(initialState);
    localStorage.removeItem("earth-spas-choice-guide");
  };

  const summary = `Earth Spas keuzehulp\n\nVaste platformkosten: ${euro.format(platformMonthly)} p/m\nMeta Ads: ${euro.format(state.metaBudget)} p/m\nGoogle Ads: ${euro.format(state.googleBudget)} p/m\nContent: ${euro.format(state.contentBudget)} p/m\nAI/API: ${euro.format(state.aiApiBudget)} p/m\nTotaal extern budget: ${euro.format(totalMonthly)} p/m (${euro.format(annualOperating)} p/j)\n\nVerwacht scenario: ${number.format(baseExtraSales)} extra spa's, ${euro.format(baseExtraRevenue)} extra omzet, ${number.format(growthPct)}% groei.\n\nBetrokkenheid Volker: ${state.involvement === "structured" ? `${state.hoursPerWeek} uur per week structureel` : "vrij en incidenteel"}.\n\nIndicatieve externe marktwaarde geselecteerde bouw: ${euro.format(marketBuildLow)} - ${euro.format(marketBuildHigh)}.\n\nNotities: ${state.notes || "geen"}`;

  const copySummary = async () => {
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <main>
      <header className="no-print sticky top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <a href="#top" className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full border border-primary/35 bg-primary/10 text-primary"><span className="text-xl font-bold">e</span></div>
            <div><p className="font-[family-name:var(--font-heading)] text-lg font-semibold leading-none">earth spas</p><p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-muted-foreground">keuzehulp</p></div>
          </a>
          <nav className="hidden items-center gap-5 text-sm text-muted-foreground lg:flex">
            <a href="#basis" className="hover:text-foreground">Basis</a>
            <a href="#tools" className="hover:text-foreground">Tools</a>
            <a href="#bouw" className="hover:text-foreground">Bouw</a>
            <a href="#marketing" className="hover:text-foreground">Budget</a>
            <a href="#resultaat" className="hover:text-foreground">Resultaat</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="hidden sm:inline-flex" onClick={reset}><RefreshCw className="h-4 w-4" />Reset</Button>
            <Button variant="outline" onClick={() => window.print()}><Download className="h-4 w-4" />PDF</Button>
          </div>
        </div>
      </header>

      <section id="top" className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(13,13,14,.98)_10%,rgba(13,13,14,.82)_60%,rgba(13,13,14,.95))]" />
        <div className="absolute inset-y-0 right-0 hidden w-[44%] lg:block">
          <img src="/screens/social-profile.png" alt="Earth Spas bestaande socialomgeving" className="h-full w-full object-cover opacity-20 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/65 to-transparent" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
          <div className="max-w-3xl">
            <Badge>Van Volker aan {state.clientName || "Jeroen"}</Badge>
            <h1 className="mt-7 text-balance text-5xl font-semibold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">Geen verkoopverhaal. Gewoon kiezen wat we met Earth Spas gaan doen.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">Zet onderdelen aan of uit, vul budgetten in en bekijk direct de maandkosten, ontwikkeltijd, normale externe marktwaarde en een voorzichtig verwacht groeiscenario.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button onClick={() => document.getElementById("basis")?.scrollIntoView({ behavior: "smooth" })}>Start met kiezen <ChevronRight className="h-4 w-4" /></Button>
              <Button variant="outline" onClick={copySummary}>{copied ? <Check className="h-4 w-4" /> : <ClipboardCheck className="h-4 w-4" />}{copied ? "Gekopieerd" : "Kopieer samenvatting"}</Button>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">Jouw bouwkosten en eventuele tegenprestatie staan bewust niet in deze calculator. Die bespreken jullie onderling, zoals beschaafde mensen met kipvleugels en Corona.</p>
          </div>
        </div>
      </section>

      <section id="basis" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading kicker="Uitgangspunt" title="De bestaande omzet is organisch. Marketing is dus bedoeld voor extra groei." text="De calculator start met twee verkochte spa's per week en een gemiddelde verkoopwaarde van €6.000. Alle aannames zijn aanpasbaar, want een rekenmodel dat zich voordoet als natuurwet verdient wantrouwen." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Metric label="Verkoop per jaar" value={number.format(currentUnitsYear)} helper={`${number.format(state.currentSalesPerWeek)} per week`} icon={Target} />
          <Metric label="Huidige omzet" value={euro.format(currentRevenue)} helper="inclusief btw" icon={CircleDollarSign} />
          <Metric label="Actieve gebruikers" value="652" helper="GA4, 1 jan t/m 24 jul 2026" icon={Users} />
          <Metric label="Eerste advertentietest" value="€0,13" helper="per landingspaginaweergave" icon={MousePointerClick} />
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
          <Card className="p-6 sm:p-7">
            <div className="flex items-start justify-between gap-4"><div><h3 className="text-2xl font-semibold">Basisaannames</h3><p className="mt-2 text-sm text-muted-foreground">Deze waarden sturen alle grafieken en berekeningen.</p></div><SlidersHorizontal className="h-5 w-5 text-primary" /></div>
            <div className="mt-7 grid gap-7 sm:grid-cols-2">
              {[
                { label: "Spa's per week", value: state.currentSalesPerWeek, min: 0.5, max: 6, step: 0.5, set: (value: number) => update("currentSalesPerWeek", value), display: number.format(state.currentSalesPerWeek) },
                { label: "Gemiddelde verkoopprijs", value: state.averageSalePrice, min: 3500, max: 15000, step: 250, set: (value: number) => update("averageSalePrice", value), display: euro.format(state.averageSalePrice) },
                { label: "Brutomarge", value: state.grossMargin, min: 20, max: 60, step: 1, set: (value: number) => update("grossMargin", value), display: `${state.grossMargin}%` },
                { label: "Verwachte kosten per extra verkoop", value: state.costPerExtraSale, min: 1000, max: 5000, step: 100, set: (value: number) => update("costPerExtraSale", value), display: euro.format(state.costPerExtraSale) },
              ].map((item) => (
                <label key={item.label} className="block">
                  <div className="mb-3 flex items-center justify-between gap-4"><span className="text-sm font-medium">{item.label}</span><span className="rounded-md border border-border bg-muted px-2 py-1 text-sm font-semibold">{item.display}</span></div>
                  <Range value={item.value} min={item.min} max={item.max} step={item.step} onChange={item.set} ariaLabel={item.label} />
                </label>
              ))}
            </div>
          </Card>
          <Card className="overflow-hidden p-0">
            <img src="/screens/meta-ads.png" alt="Eerste Earth Spas Meta advertentietest" className="h-52 w-full object-cover object-top opacity-80" />
            <div className="p-6"><p className="section-kicker">Al getest</p><h3 className="mt-2 text-2xl font-semibold">Voor een paar tientjes is al serieus verkeer opgehaald.</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">Dat bewijst nog geen verkoop. Het bewijst wel dat er genoeg ruimte is om professioneel te meten, verbeteren en opschalen.</p></div>
          </Card>
        </div>
      </section>

      <section id="tools" className="border-y border-border bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading kicker="Externe kosten" title="Kies welke accounts, software en productietools Earth Spas zelf draagt." text="Dit zijn echte maandkosten. De bouw door Volker/3ECK staat hier niet tussen. Verplichte basisitems kunnen niet worden uitgezet, omdat een bedrijfsplatform zonder eigenaarschap en back-ups vooral een toekomstige ruzie met extra stappen is." />
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {tools.map((tool) => {
              const Icon = tool.icon;
              const active = state.toolSelections[tool.id];
              return (
                <Card key={tool.id} className={cn("p-5 transition", active ? "border-primary/45" : "opacity-70")}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-3"><div className="rounded-lg border border-border bg-accent p-2 text-primary"><Icon className="h-5 w-5" /></div><div><div className="flex flex-wrap items-center gap-2"><h3 className="font-semibold">{tool.name}</h3>{tool.required && <Badge tone="warning">basis</Badge>}</div><p className="mt-1 text-sm leading-5 text-muted-foreground">{tool.description}</p></div></div>
                    <Switch checked={active} onCheckedChange={(value) => toggleTool(tool.id, value)} disabled={tool.required} label={tool.name} />
                  </div>
                  <div className="mt-5 flex items-center justify-between border-t border-border pt-4"><span className="text-xs uppercase tracking-[0.14em] text-muted-foreground">per maand</span><span className="text-lg font-semibold">{tool.monthly === 0 ? "€0" : euro.format(tool.monthly)}</span></div>
                </Card>
              );
            })}
          </div>
          <Card className="mt-6 p-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center"><div><p className="section-kicker">Geselecteerde platformlaag</p><h3 className="mt-2 text-3xl font-semibold">{euro.format(platformMonthly)} per maand</h3><p className="mt-2 text-sm text-muted-foreground">{selectedTools.length} actieve diensten. AI/API-verbruik en advertenties worden apart begrensd.</p></div><div className="grid grid-cols-2 gap-3 text-center sm:grid-cols-3">{[100, 150, 225, 300, 400].map((level) => <div key={level} className={cn("rounded-lg border px-4 py-3", Math.abs(platformMonthly - level) < 35 ? "border-primary bg-primary/10" : "border-border bg-muted")}><p className="text-xs text-muted-foreground">niveau</p><p className="mt-1 font-semibold">€{level}+</p></div>)}</div></div>
          </Card>
        </div>
      </section>

      <section id="bouw" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading kicker="Wat kan er gebouwd worden?" title="Zet functies aan en vergelijk ontwikkeltijd met normale externe marktwaarde." text="De bedragen zijn brede marktindicaties voor ontwerp, ontwikkeling, integratie, testen en oplevering door een extern softwarebedrijf. Ze worden niet bij het operationele budget opgeteld en zijn nadrukkelijk niet jouw prijs." />
        <div className="mt-10 overflow-hidden rounded-xl border border-border bg-card/80 shadow-xl">
          <div className="hidden grid-cols-[70px_1.4fr_.7fr_.75fr_.75fr] gap-4 border-b border-border bg-accent px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground lg:grid"><span>Kies</span><span>Onderdeel</span><span>Impact</span><span>Ontwikkeltijd</span><span>Marktwaarde</span></div>
          {features.map((feature) => {
            const Icon = feature.icon;
            const active = state.featureSelections[feature.id];
            return (
              <div key={feature.id} className={cn("grid gap-4 border-b border-border px-5 py-5 last:border-0 lg:grid-cols-[70px_1.4fr_.7fr_.75fr_.75fr] lg:items-center", !active && "opacity-55")}>
                <Switch checked={active} onCheckedChange={(value) => toggleFeature(feature.id, value)} label={feature.name} />
                <div className="flex gap-3"><div className="mt-0.5 rounded-lg border border-border bg-accent p-2 text-primary"><Icon className="h-5 w-5" /></div><div><h3 className="font-semibold">{feature.name}</h3><p className="mt-1 text-sm leading-5 text-muted-foreground">{feature.description}</p></div></div>
                <div><span className="lg:hidden text-xs uppercase tracking-[0.12em] text-muted-foreground">Impact </span><Badge>{feature.impact}</Badge></div>
                <div className="text-sm"><span className="lg:hidden text-xs uppercase tracking-[0.12em] text-muted-foreground">Ontwikkeltijd </span><strong>{feature.hoursLow}-{feature.hoursHigh} uur</strong></div>
                <div className="text-sm"><span className="lg:hidden text-xs uppercase tracking-[0.12em] text-muted-foreground">Marktwaarde </span><strong>{euro.format(feature.marketLow)}-{euro.format(feature.marketHigh)}</strong></div>
              </div>
            );
          })}
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Metric label="Geselecteerde functies" value={`${selectedFeatures.length}`} helper={`van ${features.length} onderdelen`} icon={Check} />
          <Metric label="Ontwikkelomvang" value={`${buildHoursLow}-${buildHoursHigh} uur`} helper="indicatieve totale bandbreedte" icon={Code2} />
          <Metric label="Externe marktwaarde" value={`${euro.format(marketBuildLow)}-${euro.format(marketBuildHigh)}`} helper="niet opgenomen in budget" icon={BriefcaseBusiness} />
          <Metric label="Fasen" value={`${Math.ceil(buildHoursLow / 160)}-${Math.ceil(buildHoursHigh / 160)} maanden`} helper="bij één fulltime developer" icon={CalendarClock} />
        </div>
      </section>

      <section id="marketing" className="border-y border-border bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading kicker="Budget en inzet" title="Vul het echte maandbudget in en kies hoe structureel jij eraan werkt." text="De software kan veel automatiseren, maar iemand moet nog steeds beoordelen, optimaliseren en doorontwikkelen. De mensheid is helaas nog niet volledig uit het proces verwijderd." />
          <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
            <Card className="p-6 sm:p-7">
              <h3 className="text-2xl font-semibold">Maandbudgetten</h3>
              <div className="mt-7 space-y-7">
                {[
                  { label: "Meta Ads", helper: "Facebook en Instagram", value: state.metaBudget, min: 0, max: 5000, step: 50, set: (value: number) => update("metaBudget", value) },
                  { label: "Google Ads", helper: "Zoekintentie, showroom en regio's", value: state.googleBudget, min: 0, max: 5000, step: 50, set: (value: number) => update("googleBudget", value) },
                  { label: "Contentreserve", helper: "Externe fotografie, video of losse productie", value: state.contentBudget, min: 0, max: 2500, step: 50, set: (value: number) => update("contentBudget", value) },
                  { label: "AI/API-verbruik", helper: "Agents, generatie, analyse en automatisering", value: state.aiApiBudget, min: 0, max: 1500, step: 25, set: (value: number) => update("aiApiBudget", value) },
                ].map((item) => (
                  <label key={item.label} className="block">
                    <div className="mb-3 flex items-end justify-between gap-4"><div><span className="font-medium">{item.label}</span><p className="mt-0.5 text-xs text-muted-foreground">{item.helper}</p></div><span className="rounded-md border border-border bg-muted px-2.5 py-1 text-sm font-semibold">{euro.format(item.value)}</span></div>
                    <Range value={item.value} min={item.min} max={item.max} step={item.step} onChange={item.set} ariaLabel={item.label} />
                  </label>
                ))}
              </div>
            </Card>
            <Card className="p-6 sm:p-7">
              <h3 className="text-2xl font-semibold">Betrokkenheid Volker</h3>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <button onClick={() => update("involvement", "free")} className={cn("rounded-xl border p-5 text-left transition", state.involvement === "free" ? "border-primary bg-primary/10" : "border-border bg-muted hover:border-primary/50")}><div className="flex items-start justify-between gap-3"><Sparkles className="h-5 w-5 text-primary" />{state.involvement === "free" && <Check className="h-5 w-5 text-primary" />}</div><h4 className="mt-4 font-semibold">Vrij en incidenteel</h4><p className="mt-2 text-sm leading-6 text-muted-foreground">Werken wanneer het uitkomt en oppakken wat op dat moment interessant of nodig is.</p></button>
                <button onClick={() => update("involvement", "structured")} className={cn("rounded-xl border p-5 text-left transition", state.involvement === "structured" ? "border-primary bg-primary/10" : "border-border bg-muted hover:border-primary/50")}><div className="flex items-start justify-between gap-3"><Rocket className="h-5 w-5 text-primary" />{state.involvement === "structured" && <Check className="h-5 w-5 text-primary" />}</div><h4 className="mt-4 font-semibold">Structurele betrokkenheid</h4><p className="mt-2 text-sm leading-6 text-muted-foreground">Vaste uren voor socials, marketing, website, agents, data en doorontwikkeling.</p></button>
              </div>
              {state.involvement === "structured" && <div className="mt-7 rounded-xl border border-border bg-muted p-5"><div className="mb-3 flex items-center justify-between"><span className="font-medium">Uren per week</span><span className="text-xl font-semibold">{state.hoursPerWeek} uur</span></div><Range value={state.hoursPerWeek} min={2} max={24} step={1} onChange={(value) => update("hoursPerWeek", value)} ariaLabel="Uren per week" /><div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs text-muted-foreground"><div className="rounded-md border border-border p-2"><strong className="block text-sm text-foreground">{Math.round(structuredAnnualHours)}</strong>uur/jaar</div><div className="rounded-md border border-border p-2"><strong className="block text-sm text-foreground">{Math.round(structuredAnnualHours * 0.32)}</strong>marketing</div><div className="rounded-md border border-border p-2"><strong className="block text-sm text-foreground">{Math.round(structuredAnnualHours * 0.42)}</strong>bouw/data</div></div></div>}
              <div className="mt-6 rounded-lg border border-primary/25 bg-primary/10 p-4 text-sm leading-6 text-muted-foreground"><Info className="mr-2 inline h-4 w-4 text-primary" />Wat hier tegenover staat wordt onderling besproken en staat niet in deze keuzehulp.</div>
            </Card>
          </div>
        </div>
      </section>

      <section id="resultaat" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading kicker="Live resultaatmodel" title="Iedere keuze werkt direct door in kosten, groei, break-even en verwachte omzet." text="De bandbreedte is een scenario, geen belofte. Verander de kosten per extra verkoop, marge en inzet om pessimistische of ambitieuzere aannames te testen." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Metric label="Extern budget" value={`${euro.format(totalMonthly)} p/m`} helper={`${euro.format(annualOperating)} per jaar`} icon={CircleDollarSign} />
          <Metric label="Extra verkopen" value={`${number.format(lowExtraSales)}-${number.format(highExtraSales)}`} helper={`${number.format(baseExtraSales)} verwacht`} icon={Target} />
          <Metric label="Omzetgroei" value={`${number.format(growthPct)}%`} helper={`${euro.format(baseExtraRevenue)} extra omzet`} icon={LineChart} />
          <Metric label="Break-even" value={`${number.format(breakEvenSales)} spa's`} helper={`bij ${state.grossMargin}% brutomarge`} icon={Gauge} />
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <Card className="p-6"><div className="mb-6"><p className="section-kicker">Budgetverdeling</p><h3 className="mt-2 text-2xl font-semibold">Waar gaat het geld naartoe?</h3></div><BudgetDonut platform={platformMonthly} ads={adsMonthly} content={state.contentBudget} api={state.aiApiBudget} /><div className="mt-6 grid grid-cols-2 gap-3 text-sm">{[["Platform", platformMonthly, "bg-chart-2"], ["Advertenties", adsMonthly, "bg-chart-1"], ["Content", state.contentBudget, "bg-chart-3"], ["AI/API", state.aiApiBudget, "bg-chart-4"]].map(([label, value, color]) => <div key={String(label)} className="flex items-center justify-between gap-3"><span className="flex items-center gap-2 text-muted-foreground"><span className={cn("h-2.5 w-2.5 rounded-full", color)} />{label}</span><strong>{euro.format(Number(value))}</strong></div>)}</div></Card>
          <Card className="p-6"><div className="mb-6"><p className="section-kicker">Omzetvergelijking</p><h3 className="mt-2 text-2xl font-semibold">Huidig tegenover scenario</h3></div><RevenueBars current={currentRevenue} low={lowTotalRevenue} base={baseTotalRevenue} high={highTotalRevenue} /><div className="mt-6 rounded-lg border border-border bg-muted p-4"><p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">Omzet per €1 extern budget</p><p className="mt-1 text-2xl font-semibold">€{number.format(revenuePerEuro)}</p></div></Card>
          <Card className="p-6"><div className="mb-4"><p className="section-kicker">Verkoopontwikkeling</p><h3 className="mt-2 text-2xl font-semibold">Verwachte maandelijkse ramp</h3></div><SalesRamp currentPerMonth={currentUnitsYear / 12} extraPerYear={baseExtraSales} /><p className="mt-3 text-sm leading-6 text-muted-foreground">Het model laat groei geleidelijk oplopen. Marketing werkt zelden op maandag om 09:00 en levert dinsdag exact vier spa's, hoe prettig spreadsheets dat ook zouden vinden.</p></Card>
        </div>

        <Card className="mt-6 overflow-hidden">
          <div className="border-b border-border px-6 py-5"><p className="section-kicker">Beslisoverzicht</p><h3 className="mt-2 text-2xl font-semibold">Geselecteerde keuzes en financiële uitkomst</h3></div>
          <div className="overflow-x-auto"><table className="w-full min-w-[780px] text-left text-sm"><thead className="bg-accent text-xs uppercase tracking-[0.12em] text-muted-foreground"><tr><th className="px-6 py-4">Onderdeel</th><th className="px-6 py-4">Maand</th><th className="px-6 py-4">Jaar</th><th className="px-6 py-4">Resultaat / afspraak</th></tr></thead><tbody className="divide-y divide-border">
            <tr><td className="px-6 py-4 font-medium">Platform en tools</td><td className="px-6 py-4">{euro.format(platformMonthly)}</td><td className="px-6 py-4">{euro.format(platformMonthly * 12)}</td><td className="px-6 py-4 text-muted-foreground">{selectedTools.length} actieve diensten</td></tr>
            <tr><td className="px-6 py-4 font-medium">Advertenties</td><td className="px-6 py-4">{euro.format(adsMonthly)}</td><td className="px-6 py-4">{euro.format(adsMonthly * 12)}</td><td className="px-6 py-4 text-muted-foreground">Meta {euro.format(state.metaBudget)} + Google {euro.format(state.googleBudget)}</td></tr>
            <tr><td className="px-6 py-4 font-medium">Content en AI/API</td><td className="px-6 py-4">{euro.format(state.contentBudget + state.aiApiBudget)}</td><td className="px-6 py-4">{euro.format((state.contentBudget + state.aiApiBudget) * 12)}</td><td className="px-6 py-4 text-muted-foreground">Harde maandlimieten</td></tr>
            <tr><td className="px-6 py-4 font-medium">Betrokkenheid Volker</td><td className="px-6 py-4">niet financieel ingevuld</td><td className="px-6 py-4">apart bespreken</td><td className="px-6 py-4 text-muted-foreground">{state.involvement === "structured" ? `${state.hoursPerWeek} uur per week` : "vrij en incidenteel"}</td></tr>
            <tr><td className="px-6 py-4 font-medium">Bouw en maatwerk</td><td className="px-6 py-4">los van budget</td><td className="px-6 py-4">los van budget</td><td className="px-6 py-4 text-muted-foreground">Normale externe marktwaarde {euro.format(marketBuildLow)}-{euro.format(marketBuildHigh)}</td></tr>
            <tr className="bg-primary/5"><td className="px-6 py-4 font-semibold">Totaal extern operationeel</td><td className="px-6 py-4 text-lg font-semibold">{euro.format(totalMonthly)}</td><td className="px-6 py-4 text-lg font-semibold">{euro.format(annualOperating)}</td><td className="px-6 py-4 font-semibold">{number.format(baseExtraSales)} extra spa's / {euro.format(baseExtraRevenue)} extra omzet</td></tr>
          </tbody></table></div>
        </Card>
      </section>

      <section className="border-t border-border bg-muted/40">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_.8fr] lg:px-8">
          <div><p className="section-kicker">Persoonlijke afsluiting</p><h2 className="mt-3 text-4xl font-semibold">Wat zou ik kiezen?</h2><p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">Een zelfstandige technische basis, beheerst advertentiebudget en structurele betrokkenheid. Dan bouwen we niet alleen slimme dingen, maar zorgen we ook dat ze worden gebruikt, gemeten en verbeterd.</p><div className="mt-7 flex flex-wrap gap-3 no-print"><Button onClick={() => window.print()}><Download className="h-4 w-4" />Bewaar als PDF</Button><Button variant="outline" onClick={copySummary}>{copied ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}{copied ? "Gekopieerd" : "Kopieer keuzes"}</Button></div></div>
          <Card className="p-6"><label className="block text-sm font-medium">Naam</label><input value={state.clientName} onChange={(event) => update("clientName", event.target.value)} className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2.5 text-foreground outline-none focus:border-primary" /><label className="mt-5 block text-sm font-medium">Notities of afspraken</label><textarea value={state.notes} onChange={(event) => update("notes", event.target.value)} rows={6} placeholder="Bijvoorbeeld: eerst CRM en tracking, daarna campagnes opschalen..." className="mt-2 w-full resize-y rounded-md border border-input bg-background px-3 py-2.5 text-foreground outline-none focus:border-primary" /><p className="mt-3 text-xs text-muted-foreground">Keuzes worden automatisch lokaal in deze browser bewaard.</p></Card>
        </div>
      </section>

      <footer className="border-t border-border px-4 py-8 text-center text-sm text-muted-foreground"><p>Earth Spas keuzehulp · Volker / 3ECK Technology · indicatieve scenario’s, geen verkoopgaranties</p></footer>
    </main>
  );
}
