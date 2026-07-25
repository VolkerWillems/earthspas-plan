"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useSiteState } from "@/components/site-state";
import { calculateSiteModel } from "@/lib/site-model";
import { euro, number } from "@/lib/utils";

const ChecklistExecution = dynamic(
  () => import("@/components/page-bottom-summary").then((module) => module.PageBottomSummary),
  { ssr: false },
);

type SummaryItem = {
  label: string;
  value: string;
  text: string;
};

type SummaryContent = {
  eyebrow: string;
  title: string;
  text: string;
  items: SummaryItem[];
};

export function PageBottomSummaryOptimized() {
  const pathname = usePathname();
  const { state } = useSiteState();
  const model = calculateSiteModel(state);

  if (pathname === "/checklist") return <ChecklistExecution />;
  if (pathname === "/") return null;

  const hoursLabel = state.involvement === "structured"
    ? `${number.format(state.hoursPerWeek)} uur per week`
    : "Incidenteel";

  const summaries: Record<string, SummaryContent> = {
    "/strategie": {
      eyebrow: "Beslisoverzicht",
      title: "Eerst bewijs, daarna schaal",
      text: "De groeistrategie begint in Nederland en NRW. Nieuwe markten volgen pas wanneer meting, opvolging en verkoopkwaliteit aantoonbaar werken.",
      items: [
        {
          label: "Marktfocus",
          value: "NL + NRW",
          text: "De showroom in Venlo blijft het commerciële en operationele vertrekpunt.",
        },
        {
          label: "Testbudget",
          value: `${euro.format(model.adsMonthly)} p/m`,
          text: "Google en Meta worden afzonderlijk getest en op verkoopkwaliteit beoordeeld.",
        },
        {
          label: "Schaalregel",
          value: "Alleen winnaars",
          text: "Budget stijgt pas na aantoonbare afspraken, offertes en verkopen.",
        },
      ],
    },
    "/marketing": {
      eyebrow: "Marketingbesluit",
      title: "Meet van campagne tot verkoop",
      text: "Bereik en goedkope klikken zijn nuttig, maar alleen wanneer de volledige keten naar afspraak, offerte en verkoop zichtbaar is.",
      items: [
        {
          label: "Advertenties",
          value: `${euro.format(model.adsMonthly)} p/m`,
          text: `Meta ${euro.format(state.metaBudget)} en Google ${euro.format(state.googleBudget)} met eigen limieten.`,
        },
        {
          label: "Meetketen",
          value: "Bron → omzet",
          text: "Iedere lead krijgt een bron, status, opvolging en verkoopuitkomst.",
        },
        {
          label: "Opschalen",
          value: `${number.format(model.lowExtraSales)}–${number.format(model.highExtraSales)} spa's`,
          text: "Dit is een scenario. Werkelijke verkoopdata bepaalt het volgende budget.",
        },
      ],
    },
    "/software": {
      eyebrow: "Softwarebesluit",
      title: "Eerst eigendom, daarna automatisering",
      text: "Accounts, billing, back-ups en beheer moeten onder Earth Spas vallen voordat extra softwarefuncties worden gebouwd.",
      items: [
        {
          label: "Vaste stack",
          value: `${euro.format(model.platformMonthly)} p/m`,
          text: "De actuele selectie van accounts, hosting en productietools.",
        },
        {
          label: "Bouwomvang",
          value: `${number.format(model.buildHoursLow)}–${number.format(model.buildHoursHigh)} uur`,
          text: `${model.selectedFeatures.length} geselecteerde functies, gefaseerd op afhankelijkheid en waarde.`,
        },
        {
          label: "Beheer",
          value: "2 beheerders",
          text: "Herstel, back-up en rollback worden getest voor persoonlijke toegang verdwijnt.",
        },
      ],
    },
    "/calculator": {
      eyebrow: "Ingevulde keuzes",
      title: "Eén financieel uitgangspunt",
      text: "De calculator scheidt vaste platformkosten, variabele groeibudgetten en aanvullende bouw zodat keuzes niet door elkaar gaan lopen.",
      items: [
        {
          label: "Vaste stack",
          value: `${euro.format(model.platformMonthly)} p/m`,
          text: "Accounts, hosting en productietools volgens de huidige selectie.",
        },
        {
          label: "Variabel budget",
          value: `${euro.format(model.adsMonthly + state.contentBudget + model.aiMonthly)} p/m`,
          text: "Advertenties, content en AI worden afzonderlijk begrensd en gemeten.",
        },
        {
          label: "Uitvoering",
          value: hoursLabel,
          text: "Beschikbare capaciteit bepaalt wat structureel kan worden beheerd en verbeterd.",
        },
      ],
    },
  };

  const summary = summaries[pathname];
  if (!summary) return null;

  return (
    <section className="section-block theme-secondary page-content-summary">
      <div className="content-shell">
        <div className="section-header" data-reveal="up">
          <p className="eyebrow">{summary.eyebrow}</p>
          <h2>{summary.title}</h2>
          <p>{summary.text}</p>
        </div>
        <div className="page-summary-grid mt-8">
          {summary.items.map((item, index) => (
            <article key={item.label} className="page-summary-card">
              <span className="page-summary-index">0{index + 1}</span>
              <div>
                <p className="page-summary-label">{item.label}</p>
                <strong>{item.value}</strong>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
