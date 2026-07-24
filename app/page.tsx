"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import {
  Activity,
  ArchiveBox,
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
  FileText,
  FloppyDisk,
  FlowArrow,
  FadersHorizontal,
  Gauge,
  GitBranch,
  Globe,
  Headphones,
  Image as ImageIcon,
  Info,
  Key,
  Layout,
  List,
  MagicWand,
  Pause,
  Robot,
  RocketLaunch,
  Server,
  ShieldCheck,
  Sparkle,
  Target,
  Users,
  Video,
  Wallet,
  Warning,
  X,
} from "@phosphor-icons/react";
import { cn, euro, number } from "@/lib/utils";
import {
  choiceGroups,
  checklistItems,
  defaultChecklist,
  defaultFeatureSelections,
  features,
  recommendedChoices,
  type ChoiceOption,
  type FeatureItem,
} from "@/lib/choice-data";
import {
  BudgetChart,
  DecisionRow,
  DecisionTable,
  RevenueScenarioChart,
  SalesRampChart,
  TrafficSourceChart,
} from "@/components/decision-visuals";

type IconType = React.ComponentType<{
  className?: string;
  size?: number | string;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
}>;

type SavedState = {
  toolChoices: Record<string, string>;
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

const iconMap: Record<string, IconType> = {
  activity: Activity,
  archive: ArchiveBox,
  briefcase: Briefcase,
  calendar: CalendarBlank,
  chart: ChartBar,
  chat: ChatText,
  cloud: Cloud,
  code: Code,
  "credit-card": CreditCard,
  database: Database,
  envelope: EnvelopeSimple,
  file: FileText,
  flow: FlowArrow,
  git: GitBranch,
  globe: Globe,
  headphones: Headphones,
  image: ImageIcon,
  key: Key,
  layout: Layout,
  magic: MagicWand,
  pause: Pause,
  robot: Robot,
  rocket: RocketLaunch,
  server: Server,
  shield: ShieldCheck,
  sparkle: Sparkle,
  target: Target,
  users: Users,
  video: Video,
  wallet: Wallet,
  warning: Warning,
};

const initialState: SavedState = {
  toolChoices: recommendedChoices,
  featureSelections: defaultFeatureSelections,
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

const resultCards = [
  { value: "652", label: "actieve gebruikers", detail: "9.742 gemeten gebeurtenissen in GA4", accent: "primary" as const },
  { value: "321", label: "organische Google-sessies", detail: "zonder structurele SEO-campagne", accent: "primary" as const },
  { value: "€35,90", label: "eerste Meta-test", detail: "287 landingspaginaweergaven voor €0,13 per weergave", accent: "secondary" as const },
  { value: "5,0", label: "Google-profiel", detail: "19 reviews en 504 klantinteracties", accent: "secondary" as const },
];

const trafficSources = [
  { label: "Direct", value: 496 },
  { label: "Google organisch", value: 321 },
  { label: "Betaald verkeer", value: 58 },
  { label: "AI-assistenten", value: 15 },
];

function Button({ className, variant = "primary", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "outline" | "ghost" }) {
  return (
    <button
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 py-2.5 text-base transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        variant === "primary" && "bg-primary text-primary-foreground hover:bg-primary/90",
        variant === "secondary" && "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        variant === "outline" && "border border-border bg-card/75 text-white hover:border-primary/70 hover:bg-accent",
        variant === "ghost" && "text-white hover:bg-accent",
        className,
      )}
      {...props}
    />
  );
}

function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("print-card rounded-lg border border-border bg-card/94 shadow-xl hairline", className)} {...props} />;
}

function Switch({ checked, onCheckedChange, label }: { checked: boolean; onCheckedChange: (value: boolean) => void; label: string }) {
  return (
    <SwitchPrimitive.Root
      aria-label={label}
      checked={checked}
      onCheckedChange={onCheckedChange}
      className="relative h-7 w-12 shrink-0 rounded-full border border-border bg-input transition data-[state=checked]:border-primary data-[state=checked]:bg-primary"
    >
      <SwitchPrimitive.Thumb className="block h-5 w-5 translate-x-0.5 rounded-full bg-white shadow transition data-[state=checked]:translate-x-[1.45rem]" />
    </SwitchPrimitive.Root>
  );
}

function Range({ value, min, max, step, onChange, ariaLabel, accent = "primary" }: { value: number; min: number; max: number; step: number; onChange: (value: number) => void; ariaLabel: string; accent?: "primary" | "secondary" }) {
  return (
    <SliderPrimitive.Root aria-label={ariaLabel} value={[value]} min={min} max={max} step={step} onValueChange={(next) => onChange(next[0])} className="relative flex h-8 w-full touch-none select-none items-center">
      <SliderPrimitive.Track className="relative h-2 grow overflow-hidden rounded-full bg-input">
        <SliderPrimitive.Range className={cn("absolute h-full", accent === "primary" ? "bg-primary" : "bg-secondary")} />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className={cn("block h-6 w-6 rounded-full border-2 bg-background shadow-md transition hover:scale-110 focus-visible:outline-none focus-visible:ring-2", accent === "primary" ? "border-primary focus-visible:ring-primary" : "border-secondary focus-visible:ring-secondary")} />
    </SliderPrimitive.Root>
  );
}

function ProviderLogo({ option }: { option: ChoiceOption }) {
  const [failed, setFailed] = React.useState(false);
  const Icon = iconMap[option.icon] ?? Activity;
  return (
    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md border border-border bg-[#071018] text-white">
      {option.logoSlug && !failed ? (
        <img src={`https://cdn.simpleicons.org/${option.logoSlug}`} alt={`${option.name} logo`} className="h-6 w-6 object-contain" loading="lazy" onError={() => setFailed(true)} />
      ) : (
        <Icon className="h-6 w-6" weight="regular" />
      )}
    </div>
  );
}

function SectionHeading({ kicker, title, text, accent = "primary" }: { kicker: string; title: string; text: string; accent?: "primary" | "secondary" }) {
  return (
    <div className="max-w-4xl">
      <p className={accent === "primary" ? "section-kicker" : "section-kicker-secondary"}>{kicker}</p>
      <h2 className="mt-3 text-3xl uppercase leading-tight sm:text-4xl lg:text-5xl">{title}</h2>
      <p className="mt-5 text-lg leading-8 text-white/90 sm:text-xl">{text}</p>
    </div>
  );
}

function Metric({ label, value, helper, icon: Icon, accent = "primary" }: { label: string; value: string; helper: string; icon: IconType; accent?: "primary" | "secondary" }) {
  return (
    <Card className={cn("p-5 sm:p-6", accent === "primary" ? "border-primary/35" : "border-secondary/45")}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.14em] text-white/70">{label}</p>
          <p className={cn("mt-2 font-[family-name:var(--font-heading)] text-3xl", accent === "primary" ? "text-primary" : "text-secondary")}>{value}</p>
          <p className="mt-2 text-base leading-6 text-white/85">{helper}</p>
        </div>
        <div className={cn("rounded-md border p-2.5", accent === "primary" ? "border-primary/35 bg-primary/10 text-primary" : "border-secondary/40 bg-secondary/10 text-secondary")}><Icon className="h-5 w-5" weight="regular" /></div>
      </div>
    </Card>
  );
}

function ChoiceGroupCard({ groupId, selectedId, onSelect }: { groupId: string; selectedId: string; onSelect: (optionId: string) => void }) {
  const group = choiceGroups.find((item) => item.id === groupId)!;
  const selected = group.options.find((option) => option.id === selectedId) ?? group.options[0];
  const recommended = group.options.find((option) => option.recommended);
  const recommendedSelected = selected.id === recommended?.id;

  return (
    <Card className="overflow-hidden">
      <div className="border-b border-border p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl uppercase">{group.title}</h3>
            <p className="mt-2 text-base leading-7 text-white/70">{group.description}</p>
          </div>
          <div className={cn("shrink-0 rounded-md border px-2.5 py-1 text-sm", recommendedSelected ? "border-secondary/45 bg-secondary/10 text-secondary" : "border-primary/45 bg-primary/10 text-primary")}>{recommendedSelected ? "advies gekozen" : "eigen keuze"}</div>
        </div>
      </div>
      <div className="divide-y divide-border">
        {group.options.map((option) => {
          const active = option.id === selected.id;
          const accent = option.recommended ? "secondary" : "primary";
          return (
            <button key={option.id} onClick={() => onSelect(option.id)} className={cn("flex w-full items-start gap-4 p-5 text-left transition sm:p-6", active ? accent === "secondary" ? "bg-secondary/10" : "bg-primary/10" : "hover:bg-accent/70")}>
              <span className={cn("mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full border", active ? accent === "secondary" ? "border-secondary bg-secondary" : "border-primary bg-primary" : "border-border bg-background")}>
                {active && <span className="h-2 w-2 rounded-full bg-background" />}
              </span>
              <ProviderLogo option={option} />
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center justify-between gap-2">
                  <span className={cn("text-lg", active ? accent === "secondary" ? "text-secondary" : "text-primary" : "text-white")}>{option.name}</span>
                  <span className="text-lg text-white">{option.monthly === 0 ? "€0" : `${euro.format(option.monthly)} p/m`}</span>
                </span>
                <span className="mt-2 block text-base leading-7 text-white/80">{option.description}</span>
                <span className="mt-3 flex flex-wrap gap-3 text-sm uppercase tracking-[0.12em]">
                  {option.recommended && <span className="text-secondary">aanbevolen</span>}
                  {option.caution && <span className="text-destructive">tijdelijk / minder wenselijk</span>}
                  {!option.recommended && !option.caution && <span className="text-white/55">alternatief</span>}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </Card>
  );
}

function FeatureRow({ feature, checked, onChange }: { feature: FeatureItem; checked: boolean; onChange: (value: boolean) => void }) {
  const Icon = iconMap[feature.icon] ?? Activity;
  return (
    <div className={cn("grid gap-4 border-b border-border px-5 py-6 last:border-0 lg:grid-cols-[70px_1.4fr_.65fr_.75fr_.8fr] lg:items-center", !checked && "opacity-55")}>
      <Switch checked={checked} onCheckedChange={onChange} label={feature.name} />
      <div className="flex gap-3">
        <div className="mt-0.5 rounded-md border border-primary/35 bg-primary/10 p-2 text-primary"><Icon className="h-5 w-5" weight="regular" /></div>
        <div><h3 className="text-lg">{feature.name}</h3><p className="mt-1 text-base leading-7 text-white">{feature.description}</p></div>
      </div>
      <div><span className="mb-1 block text-sm uppercase tracking-[.12em] text-white/60 lg:hidden">Impact</span><span className="text-primary">{feature.impact}</span></div>
      <div><span className="mb-1 block text-sm uppercase tracking-[.12em] text-white/60 lg:hidden">Ontwikkeltijd</span>{feature.hoursLow}-{feature.hoursHigh} uur</div>
      <div><span className="mb-1 block text-sm uppercase tracking-[.12em] text-white/60 lg:hidden">Marktwaarde</span>{euro.format(feature.marketLow)}-{euro.format(feature.marketHigh)}</div>
    </div>
  );
}

export default function Page() {
  const [state, setState] = React.useState<SavedState>(initialState);
  const [mounted, setMounted] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem("earth-spas-choice-guide-v5");
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<SavedState>;
        setState({
          ...initialState,
          ...parsed,
          toolChoices: { ...initialState.toolChoices, ...(parsed.toolChoices || {}) },
          featureSelections: { ...initialState.featureSelections, ...(parsed.featureSelections || {}) },
          checklist: { ...initialState.checklist, ...(parsed.checklist || {}) },
        });
      }
    } catch {}
  }, []);

  React.useEffect(() => {
    if (mounted) localStorage.setItem("earth-spas-choice-guide-v5", JSON.stringify(state));
  }, [state, mounted]);

  const selectedOptions = choiceGroups.map((group) => group.options.find((option) => option.id === state.toolChoices[group.id]) ?? group.options[0]);
  const platformMonthly = selectedOptions.reduce((sum, option) => sum + option.monthly, 0);
  const recommendedOptions = choiceGroups.map((group) => group.options.find((option) => option.recommended) ?? group.options[0]);
  const recommendedMonthly = recommendedOptions.reduce((sum, option) => sum + option.monthly, 0);
  const selectedFeatures = features.filter((feature) => state.featureSelections[feature.id]);
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
  const selectTool = (groupId: string, optionId: string) => setState((previous) => ({ ...previous, toolChoices: { ...previous.toolChoices, [groupId]: optionId } }));
  const toggleFeature = (id: string, value: boolean) => setState((previous) => ({ ...previous, featureSelections: { ...previous.featureSelections, [id]: value } }));
  const toggleTask = (id: string) => setState((previous) => ({ ...previous, checklist: { ...previous.checklist, [id]: !previous.checklist[id] } }));
  const getSelectedOption = (groupId?: string) => groupId ? choiceGroups.find((group) => group.id === groupId)?.options.find((option) => option.id === state.toolChoices[groupId]) : undefined;

  const reset = () => {
    setState(initialState);
    localStorage.removeItem("earth-spas-choice-guide-v5");
  };

  const summary = `Earth Spas keuzehulp\n\nAccounts en tools: ${euro.format(platformMonthly)} per maand.\nAanbevolen stack: ${euro.format(recommendedMonthly)} per maand.\nExtern totaalbudget: ${euro.format(totalMonthly)} per maand / ${euro.format(annualOperating)} per jaar.\nVerwacht scenario: ${number.format(baseExtraSales)} extra spa's, ${euro.format(baseExtraRevenue)} extra omzet en ${number.format(growthPct)}% groei.\nAcquisitiekosten: ${euro.format(state.acquisitionCostPerSale)} per extra verkoop.\nExtra uitvoering: ${euro.format(state.incrementalCostPerSale)} per extra spa.\nVolker: ${state.involvement === "structured" ? `${state.hoursPerWeek} uur per week` : "vrij en incidenteel"}.\nActielijst: ${completedTasks}/${checklistItems.length}.\nExterne marktwaarde bouw: ${euro.format(marketBuildLow)}-${euro.format(marketBuildHigh)}.\nNotities: ${state.notes || "geen"}`;

  const copySummary = async () => {
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const revenueData = [
    { name: "Huidig", omzet: currentRevenue },
    { name: "Voorzichtig", omzet: currentRevenue + lowExtraRevenue },
    { name: "Verwacht", omzet: currentRevenue + baseExtraRevenue },
    { name: "Sterk", omzet: currentRevenue + highExtraRevenue },
  ];
  const months = ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];
  const salesRampData = months.map((maand, index) => ({ maand, verkoop: currentUnitsYear / 12 + baseExtraSales / 12 * (0.25 + index / 11 * 0.75) }));
  const decisionRows: DecisionRow[] = [
    { item: "Accounts en tools", month: euro.format(platformMonthly), year: euro.format(platformMonthly * 12), result: `${choiceGroups.length} onderdelen gekozen; aanbevolen stack kost ${euro.format(recommendedMonthly)} p/m` },
    { item: "Advertenties", month: euro.format(adsMonthly), year: euro.format(adsMonthly * 12), result: `Meta ${euro.format(state.metaBudget)} + Google ${euro.format(state.googleBudget)}` },
    { item: "AI-creditpotten", month: euro.format(aiMonthly), year: euro.format(aiMonthly * 12), result: `Agents ${euro.format(state.aiApiBudget)}, development ${euro.format(state.aiDevelopmentBudget)}, media ${euro.format(state.aiMediaBudget)}` },
    { item: "Betrokkenheid Volker", month: "niet financieel ingevuld", year: "apart bespreken", result: state.involvement === "structured" ? `${state.hoursPerWeek} uur per week` : "vrij en incidenteel" },
    { item: "Bouw en maatwerk", month: "los van budget", year: "los van budget", result: `Externe marktwaarde ${euro.format(marketBuildLow)}-${euro.format(marketBuildHigh)}` },
    { item: "Actielijst", month: `${completedTasks}/${checklistItems.length}`, year: `${checklistProgress}%`, result: "Accounts, betaling, techniek, marketing en acceptatie" },
    { item: "Totaal extern operationeel", month: euro.format(totalMonthly), year: euro.format(annualOperating), result: `${number.format(baseExtraSales)} extra spa's / ${euro.format(baseExtraRevenue)} extra omzet`, highlight: true },
  ];

  const navItems = [["#resultaten", "Resultaten"], ["#basis", "Aannames"], ["#tools", "Accounts"], ["#bouw", "Bouw"], ["#marketing", "Budget"], ["#acties", "Acties"], ["#resultaat", "Uitkomst"]];

  return (
    <main id="top">
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
        <div className="content-shell relative flex min-h-[680px] items-end py-16 lg:items-center lg:py-24">
          <div className="max-w-3xl">
            <p className="section-kicker">Van Volker aan {state.clientName || "Jeroen"}</p>
            <h1 className="mt-5 text-3xl uppercase leading-[1.05] sm:text-5xl lg:text-6xl">Geen verkooppitch. Gewoon zien wat er staat, wat het kost en wat we ermee kunnen.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white sm:text-xl">Kies per onderdeel de aanbevolen optie, een goedkoper alternatief of behoud voorlopig de huidige route. Niets staat vast en niets is vergrendeld.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button onClick={() => document.getElementById("resultaten")?.scrollIntoView({ behavior: "smooth" })}>Bekijk de basis <ArrowRight className="h-4 w-4" /></Button><Button variant="outline" onClick={copySummary}>{copied ? <Check className="h-4 w-4" /> : <ClipboardText className="h-4 w-4" />}{copied ? "Gekopieerd" : "Kopieer samenvatting"}</Button></div>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/85">Het advies is zichtbaar, maar Jeroen houdt per onderdeel gewoon de keuze. Dat lijkt vanzelfsprekend, maar software houdt opvallend veel van dictator spelen.</p>
          </div>
        </div>
      </section>

      <section id="resultaten" className="content-shell py-16 sm:py-24">
        <SectionHeading kicker="Tot nu toe behaald" title="De basis werkt al zonder structurele marketing." text="De cijfers bewijzen bereik, verkeer en een werkende digitale basis. Ze bewijzen nog niet hoeveel spa's rechtstreeks uit campagnes zijn verkocht, dus dat onderscheid blijft duidelijk zichtbaar." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{resultCards.map((item) => <Card key={item.label} className={cn("p-6", item.accent === "primary" ? "border-primary/40" : "border-secondary/50")}><p className={cn("font-[family-name:var(--font-heading)] text-4xl", item.accent === "primary" ? "text-primary" : "text-secondary")}>{item.value}</p><h3 className="mt-3 text-xl uppercase">{item.label}</h3><p className="mt-3 text-base leading-7 text-white/80">{item.detail}</p></Card>)}</div>
        <div className="mt-6 grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <Card className="p-6 sm:p-8"><p className="section-kicker">Herkomst van sessies</p><h3 className="mt-2 text-2xl uppercase">Organisch doet nu al het meeste werk</h3><div className="mt-5"><TrafficSourceChart data={trafficSources} /></div><p className="mt-4 text-base leading-7 text-white/80">Betaald verkeer is nog maar een klein deel. Dat geeft ruimte om gecontroleerd te testen zonder de huidige omzet aan advertenties toe te schrijven.</p></Card>
          <Card className="relative min-h-[420px] overflow-hidden border-primary/40"><img src="/earth-spas-collage-a-starry-lake-1920x1080.jpg" alt="Earth Spas sfeerbeeld" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-background via-background/82 to-background/10" /><div className="relative flex min-h-[420px] flex-col justify-end p-6 sm:p-8"><p className="section-kicker">Eerste advertentieproef</p><h3 className="mt-3 max-w-xl text-3xl uppercase">€35,90 leverde 287 landingspaginaweergaven op.</h3><p className="mt-4 max-w-2xl text-lg leading-8 text-white">Geen bewijs van verkoop, wel bewijs dat websiteverkeer goedkoop kan worden ingekocht. De volgende stap is lead-, afspraak-, offerte- en verkoopmeting.</p></div></Card>
        </div>
      </section>

      <section id="basis" className="border-y border-border bg-muted/55">
        <div className="content-shell py-16 sm:py-24">
          <SectionHeading kicker="Uitgangspunt" title="Marketing moet aantoonbaar extra groei toevoegen." text="Acquisitiekosten en extra uitvoeringskosten zijn apart. De eerste waarde schat welk groeibudget nodig is om één extra verkoop te genereren. De tweede waarde is alleen het extra werk nadat die spa al verkocht is en kan dus op €0, €100 of €200 staan." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Metric label="Verkoop per jaar" value={number.format(currentUnitsYear)} helper={`${number.format(state.currentSalesPerWeek)} per week`} icon={Target} /><Metric label="Huidige omzet" value={euro.format(currentRevenue)} helper="inclusief btw" icon={CurrencyEur} accent="secondary" /><Metric label="Acquisitiekosten" value={euro.format(state.acquisitionCostPerSale)} helper="groeibudget per extra verkoop" icon={ChartLine} /><Metric label="Extra uitvoering" value={euro.format(state.incrementalCostPerSale)} helper="mag op €0 staan" icon={Gauge} /></div>
          <Card className="mt-6 p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4"><div><h3 className="text-2xl uppercase">Basisaannames</h3><p className="mt-2 text-base text-white/75">Alle waarden werken direct door in de grafieken en berekeningen.</p></div><FadersHorizontal className="h-6 w-6 text-primary" /></div>
            <div className="mt-8 grid gap-8 md:grid-cols-2 xl:grid-cols-3">{[
              { label: "Spa's per week", helper: "Bestaande organische verkoop", value: state.currentSalesPerWeek, min: .5, max: 8, step: .5, display: number.format(state.currentSalesPerWeek), set: (value: number) => update("currentSalesPerWeek", value), accent: "primary" as const },
              { label: "Gemiddelde verkoopprijs", helper: "Inclusief btw", value: state.averageSalePrice, min: 3500, max: 15000, step: 250, display: euro.format(state.averageSalePrice), set: (value: number) => update("averageSalePrice", value), accent: "secondary" as const },
              { label: "Brutomarge", helper: "Na inkoopprijs van de spa", value: state.grossMargin, min: 20, max: 60, step: 1, display: `${state.grossMargin}%`, set: (value: number) => update("grossMargin", value), accent: "primary" as const },
              { label: "Acquisitiekosten per extra verkoop", helper: "Marketing- en groeibudget; niet de inkoopprijs", value: state.acquisitionCostPerSale, min: 250, max: 4000, step: 50, display: euro.format(state.acquisitionCostPerSale), set: (value: number) => update("acquisitionCostPerSale", value), accent: "primary" as const },
              { label: "Extra uitvoeringskosten per spa", helper: "Extra administratie, planning of ondersteuning", value: state.incrementalCostPerSale, min: 0, max: 1500, step: 25, display: euro.format(state.incrementalCostPerSale), set: (value: number) => update("incrementalCostPerSale", value), accent: "primary" as const },
            ].map((item) => <label key={item.label} className="block"><div className="mb-3 flex items-start justify-between gap-4"><div><span className="text-base text-white">{item.label}</span><p className="mt-1 text-sm leading-5 text-white/65">{item.helper}</p></div><span className={cn("shrink-0 rounded-md border px-2.5 py-1 text-base", item.accent === "secondary" ? "border-secondary/45 bg-secondary/10 text-secondary" : "border-primary/45 bg-primary/10 text-primary")}>{item.display}</span></div><Range value={item.value} min={item.min} max={item.max} step={item.step} onChange={item.set} ariaLabel={item.label} accent={item.accent} /></label>)}</div>
          </Card>
        </div>
      </section>

      <section id="tools" className="content-shell py-16 sm:py-24">
        <SectionHeading kicker="Accounts en infrastructuur" title="Per onderdeel kiezen, met een zichtbaar advies maar zonder locks." text="Iedere categorie bevat een aanbevolen keuze, een goedkoper alternatief en waar logisch een route om voorlopig niets te veranderen. De calculator telt alleen de daadwerkelijk geselecteerde opties mee." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Metric label="Jouw selectie" value={`${euro.format(platformMonthly)} p/m`} helper={`${euro.format(platformMonthly * 12)} per jaar`} icon={CreditCard} />
          <Metric label="Aanbevolen stack" value={`${euro.format(recommendedMonthly)} p/m`} helper={`${euro.format(recommendedMonthly * 12)} per jaar`} icon={ShieldCheck} accent="secondary" />
          <Metric label="Verschil" value={euro.format(platformMonthly - recommendedMonthly)} helper="negatief is goedkoper dan advies" icon={ChartLine} />
          <Metric label="Keuzecategorieën" value={`${choiceGroups.length}`} helper="geen onderdeel is vergrendeld" icon={FadersHorizontal} />
        </div>
        <div className="mt-8 grid gap-6 xl:grid-cols-2">{choiceGroups.map((group) => <ChoiceGroupCard key={group.id} groupId={group.id} selectedId={state.toolChoices[group.id]} onSelect={(optionId) => selectTool(group.id, optionId)} />)}</div>
      </section>

      <section id="bouw" className="border-y border-border bg-muted/55">
        <div className="content-shell py-16 sm:py-24">
          <SectionHeading kicker="Wat kan er gebouwd worden?" title="Vergelijk ontwikkeltijd met normale externe marktwaarde." text="Deze bedragen zijn uitsluitend vergelijkingsmateriaal voor ontwerp, ontwikkeling, integratie, testen en oplevering door een extern softwarebedrijf. Ze worden niet bij het operationele budget opgeteld." />
          <div className="mt-10 overflow-hidden rounded-lg border border-border bg-card/90"><div className="hidden grid-cols-[70px_1.4fr_.65fr_.75fr_.8fr] gap-4 border-b border-border bg-accent px-5 py-4 text-sm uppercase tracking-[.12em] text-white/75 lg:grid"><span>Kies</span><span>Onderdeel</span><span>Impact</span><span>Ontwikkeltijd</span><span>Marktwaarde</span></div>{features.map((feature) => <FeatureRow key={feature.id} feature={feature} checked={state.featureSelections[feature.id]} onChange={(value) => toggleFeature(feature.id, value)} />)}</div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Metric label="Geselecteerde functies" value={`${selectedFeatures.length}`} helper={`van ${features.length} onderdelen`} icon={Check} /><Metric label="Ontwikkelomvang" value={`${buildHoursLow}-${buildHoursHigh} uur`} helper="totale bandbreedte" icon={Code} /><Metric label="Externe marktwaarde" value={`${euro.format(marketBuildLow)}-${euro.format(marketBuildHigh)}`} helper="niet opgenomen in budget" icon={Briefcase} accent="secondary" /><Metric label="Fulltime bouwtijd" value={`${Math.ceil(buildHoursLow / 160)}-${Math.ceil(buildHoursHigh / 160)} maanden`} helper="bij één developer" icon={CalendarBlank} /></div>
        </div>
      </section>

      <section id="marketing" className="content-shell py-16 sm:py-24">
        <SectionHeading kicker="Budget en inzet" title="Vul het echte maandbudget in en kies hoe structureel jij eraan werkt." text="AI-abonnementen en verbruikscredits zijn gescheiden. Zo is zichtbaar wat nodig is voor agents, development en media, zonder dat die uitgaven ongemerkt op Volkers eigen accounts blijven hangen." />
        <div className="mt-10 grid gap-6 xl:grid-cols-[1.05fr_.95fr]">
          <Card className="p-6 sm:p-8"><h3 className="text-2xl uppercase">Maandbudgetten</h3><div className="mt-8 space-y-8">{[
            { label: "Meta Ads", helper: "Facebook, Instagram en remarketing", value: state.metaBudget, max: 7500, set: (value: number) => update("metaBudget", value), accent: "primary" as const },
            { label: "Google Ads", helper: "Zoekintentie, showroom en regio's", value: state.googleBudget, max: 7500, set: (value: number) => update("googleBudget", value), accent: "secondary" as const },
            { label: "Externe contentreserve", helper: "Fotografie, video of losse productie buiten Volker", value: state.contentBudget, max: 3000, set: (value: number) => update("contentBudget", value), accent: "primary" as const },
            { label: "Agent- en API-credits", helper: "OpenAI API, supportagents, analyses en workflows", value: state.aiApiBudget, max: 2500, set: (value: number) => update("aiApiBudget", value), accent: "primary" as const },
            { label: "Development-AI-credits", helper: "Codex, Copilot-overages en actieve bouwmaanden", value: state.aiDevelopmentBudget, max: 2500, set: (value: number) => update("aiDevelopmentBudget", value), accent: "primary" as const },
            { label: "Media-AI-credits", helper: "Beeld, video, voice en campagnevarianten", value: state.aiMediaBudget, max: 2500, set: (value: number) => update("aiMediaBudget", value), accent: "primary" as const },
          ].map((item) => <label key={item.label} className="block"><div className="mb-3 flex items-end justify-between gap-4"><div><span className="text-base text-white">{item.label}</span><p className="mt-1 text-sm text-white/65">{item.helper}</p></div><span className={cn("shrink-0 rounded-md border px-2.5 py-1", item.accent === "secondary" ? "border-secondary/45 bg-secondary/10 text-secondary" : "border-primary/45 bg-primary/10 text-primary")}>{euro.format(item.value)}</span></div><Range value={item.value} min={0} max={item.max} step={25} onChange={item.set} ariaLabel={item.label} accent={item.accent} /></label>)}</div></Card>
          <Card className="p-6 sm:p-8"><h3 className="text-2xl uppercase">Betrokkenheid Volker</h3><div className="mt-6 grid gap-3 sm:grid-cols-2"><button onClick={() => update("involvement", "free")} className={cn("rounded-lg border p-5 text-left transition", state.involvement === "free" ? "border-secondary/55 bg-secondary/10" : "border-border bg-muted")}><Sparkle className="h-6 w-6 text-secondary" /><h4 className="mt-4 text-xl">Vrij en incidenteel</h4><p className="mt-2 text-base leading-7 text-white">Werken wanneer het uitkomt en oppakken wat op dat moment interessant of nodig is.</p></button><button onClick={() => update("involvement", "structured")} className={cn("rounded-lg border p-5 text-left transition", state.involvement === "structured" ? "border-primary/55 bg-primary/10" : "border-border bg-muted")}><RocketLaunch className="h-6 w-6 text-primary" /><h4 className="mt-4 text-xl">Structurele betrokkenheid</h4><p className="mt-2 text-base leading-7 text-white">Vaste uren voor socials, marketing, website, agents, data en doorontwikkeling.</p></button></div>{state.involvement === "structured" && <div className="mt-7 rounded-lg border border-primary/35 bg-primary/10 p-5"><div className="mb-3 flex items-center justify-between"><span className="text-white">Uren per week</span><span className="text-2xl text-primary">{state.hoursPerWeek} uur</span></div><Range value={state.hoursPerWeek} min={2} max={32} step={1} onChange={(value) => update("hoursPerWeek", value)} ariaLabel="Uren per week" /><div className="mt-5 grid grid-cols-3 gap-2 text-center text-sm text-white/70"><div className="rounded-md border border-primary/30 p-2"><span className="block text-base text-white">{Math.round(structuredAnnualHours)}</span>uur/jaar</div><div className="rounded-md border border-primary/30 p-2"><span className="block text-base text-white">{Math.round(structuredAnnualHours * .32)}</span>marketing</div><div className="rounded-md border border-primary/30 p-2"><span className="block text-base text-white">{Math.round(structuredAnnualHours * .42)}</span>bouw/data</div></div></div>}<div className="mt-6 rounded-lg border border-secondary/40 bg-secondary/10 p-4 text-base leading-7 text-white"><Info className="mr-2 inline h-5 w-5 text-secondary" />Wat hier tegenover staat wordt onderling besproken en staat niet in deze keuzehulp.</div></Card>
        </div>
      </section>

      <section id="acties" className="border-y border-border bg-muted/55">
        <div className="content-shell py-16 sm:py-24">
          <SectionHeading kicker="Actielijst" title="Alles wat nu geregeld en verplaatst moet worden." text="De taken volgen de gemaakte keuzes. Bij iedere account- of infrastructuurtaak staat de geselecteerde oplossing erbij, zodat de checklist geen Microsoft- of Bitwarden-verplichting suggereert wanneer een alternatief is gekozen." />
          <Card className="mt-10 border-secondary/45 p-6 sm:p-8"><div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="section-kicker-secondary">Voortgang</p><h3 className="mt-2 text-3xl">{completedTasks} van {checklistItems.length} acties afgerond</h3></div><div><p className="text-4xl text-secondary">{checklistProgress}%</p><p className="text-base text-white/65">lokaal bewaard</p></div></div><div className="mt-5 h-3 overflow-hidden rounded-full bg-input"><div className="h-full rounded-full bg-secondary transition-all" style={{ width: `${checklistProgress}%` }} /></div></Card>
          <div className="mt-8 space-y-10">{(["Eigenaarschap", "Techniek", "Marketing", "Afronding"] as const).map((group) => { const groupItems = checklistItems.filter((item) => item.group === group); const done = groupItems.filter((item) => state.checklist[item.id]).length; return <div key={group}><div className="mb-4 flex items-end justify-between gap-4"><div><p className="section-kicker">{group}</p><h3 className="mt-1 text-2xl uppercase">{group === "Eigenaarschap" ? "Accounts, betaling en toegang" : group === "Techniek" ? "Server, data en systemen" : group === "Marketing" ? "Kanalen, AI en meting" : "Veilige afronding en afspraken"}</h3></div><span className="text-primary">{done}/{groupItems.length}</span></div><div className="grid gap-3 xl:grid-cols-2">{groupItems.map((item) => { const checked = state.checklist[item.id]; const chosen = getSelectedOption(item.choiceGroupId); return <button key={item.id} onClick={() => toggleTask(item.id)} className={cn("flex w-full gap-4 rounded-lg border p-4 text-left transition sm:p-5", checked ? "border-secondary/55 bg-secondary/10" : "border-border bg-card hover:border-primary/50")}><span className={cn("mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md border", checked ? "border-secondary bg-secondary text-secondary-foreground" : "border-border bg-muted text-transparent")}><Check className="h-4 w-4" /></span><span className="min-w-0 flex-1"><span className="flex flex-wrap items-start justify-between gap-2"><span className={checked ? "text-lg text-secondary" : "text-lg text-white"}>{item.title}</span><span className="rounded-full border border-border px-2 py-.5 text-sm text-white/65">{item.priority}</span></span>{chosen && <span className="mt-2 block text-sm uppercase tracking-[.12em] text-primary">Gekozen: {chosen.name}</span>}<span className="mt-2 block text-base leading-7 text-white">{item.description}</span><span className="mt-3 block text-sm uppercase tracking-[.12em] text-white/55">Eigenaar: {item.owner}</span></span></button>; })}</div></div>; })}</div>
        </div>
      </section>

      <section id="resultaat" className="content-shell py-16 sm:py-24">
        <SectionHeading kicker="Live resultaatmodel" title="Iedere keuze werkt door in kosten, groei en break-even." text="De acquisitiekosten-aannname stuurt het verwachte aantal extra verkopen. De aparte uitvoeringskosten kunnen op €0, €100 of €200 staan en beïnvloeden alleen de bijdrage en break-even." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-5"><Metric label="Extern budget" value={`${euro.format(totalMonthly)} p/m`} helper={`${euro.format(annualOperating)} per jaar`} icon={CurrencyEur} accent="secondary" /><Metric label="Extra verkopen" value={`${number.format(lowExtraSales)}-${number.format(highExtraSales)}`} helper={`${number.format(baseExtraSales)} verwacht`} icon={Target} /><Metric label="Omzetgroei" value={`${number.format(growthPct)}%`} helper={`${euro.format(baseExtraRevenue)} extra omzet`} icon={ChartLine} /><Metric label="Break-even" value={`${number.format(breakEvenSales)} spa's`} helper={`na ${euro.format(state.incrementalCostPerSale)} extra uitvoering`} icon={Gauge} /><Metric label="Bijdrage-ROI" value={`${number.format(contributionRoi)}%`} helper={`${euro.format(expectedContribution)} na extern budget`} icon={ChartBar} accent="secondary" /></div>
        <div className="mt-6 grid gap-6 xl:grid-cols-3"><Card className="p-6"><p className="section-kicker">Budgetverdeling</p><h3 className="mt-2 text-2xl uppercase">Waar gaat het geld naartoe?</h3><BudgetChart total={euro.format(totalMonthly)} data={[{ name: "Tools", value: platformMonthly }, { name: "Advertenties", value: adsMonthly }, { name: "Content", value: state.contentBudget }, { name: "AI-credits", value: aiMonthly }]} /></Card><Card className="border-secondary/45 p-6"><p className="section-kicker-secondary">Omzetvergelijking</p><h3 className="mt-2 text-2xl uppercase">Huidig tegenover scenario</h3><RevenueScenarioChart data={revenueData} /><div className="rounded-md border border-secondary/35 bg-secondary/10 p-4"><p className="text-sm uppercase tracking-[.12em] text-white/65">Omzet per €1 extern budget</p><p className="mt-1 text-3xl text-secondary">€{number.format(revenuePerEuro)}</p></div></Card><Card className="p-6"><p className="section-kicker">Verkoopontwikkeling</p><h3 className="mt-2 text-2xl uppercase">Verwachte maandelijkse opbouw</h3><SalesRampChart data={salesRampData} /><p className="mt-2 text-base leading-7 text-white/80">Groei loopt geleidelijk op. Geen spreadsheetmagie waarbij vier spa's op dinsdagochtend uit de lucht vallen.</p></Card></div>
        <Card className="mt-6 overflow-hidden"><div className="border-b border-border px-6 py-5"><p className="section-kicker">Beslisoverzicht</p><h3 className="mt-2 text-2xl uppercase">Geselecteerde keuzes en financiële uitkomst</h3></div><div className="p-4 md:p-0"><DecisionTable rows={decisionRows} /></div></Card>
      </section>

      <section className="border-t border-border bg-muted/55">
        <div className="content-shell grid gap-6 py-16 sm:py-24 xl:grid-cols-[1fr_.8fr]">
          <div><p className="section-kicker-secondary">Persoonlijke afsluiting</p><h2 className="mt-3 text-4xl uppercase">Wat zou ik kiezen?</h2><p className="mt-5 max-w-2xl text-xl leading-9 text-white">De aanbevolen stack blijft mijn voorkeur, met een eigen server, eigen betaalroute, ChatGPT Pro en structurele betrokkenheid. Maar ieder onderdeel kan bewust goedkoper, anders of voorlopig niet worden ingericht.</p><div className="mt-7 flex flex-col gap-3 no-print sm:flex-row"><Button variant="secondary" onClick={() => window.print()}><DownloadSimple className="h-4 w-4" />Bewaar als PDF</Button><Button variant="outline" onClick={copySummary}>{copied ? <Check className="h-4 w-4" /> : <FloppyDisk className="h-4 w-4" />}{copied ? "Gekopieerd" : "Kopieer keuzes"}</Button></div></div>
          <Card className="p-6"><label className="block text-white">Naam</label><input value={state.clientName} onChange={(event) => update("clientName", event.target.value)} className="mt-2 min-h-12 w-full rounded-md border border-input bg-background px-3 py-2.5 text-lg text-white outline-none focus:border-primary" /><label className="mt-5 block text-white">Notities of afspraken</label><textarea value={state.notes} onChange={(event) => update("notes", event.target.value)} rows={7} placeholder="Bijvoorbeeld: voorlopig Google Workspace houden, wel eigen server en ChatGPT Pro..." className="mt-2 w-full resize-y rounded-md border border-input bg-background px-3 py-2.5 text-lg text-white outline-none focus:border-primary" /><p className="mt-3 text-sm text-white/60">Keuzes en checklist worden automatisch lokaal in deze browser bewaard.</p></Card>
        </div>
      </section>

      <div className="no-print sticky bottom-0 z-40 border-t border-primary/35 bg-background/95 px-4 py-3 backdrop-blur-xl lg:hidden"><div className="flex items-center justify-between gap-3"><div><p className="text-sm text-white/60">Extern budget p/m</p><p className="text-xl text-primary">{euro.format(totalMonthly)}</p></div><Button onClick={() => document.getElementById("resultaat")?.scrollIntoView({ behavior: "smooth" })}>Uitkomst <CaretRight className="h-4 w-4" /></Button></div></div>
      <footer className="border-t border-border px-4 py-10 text-center text-base text-white/65">Earth Spas keuzehulp · Volker / 3ECK Technology · scenario's zijn indicatief, geen verkoopgaranties</footer>
    </main>
  );
}
