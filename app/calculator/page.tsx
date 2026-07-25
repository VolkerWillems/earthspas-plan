"use client";

import * as React from "react";
import {
  Check,
  ClipboardText,
  DownloadSimple,
  RocketLaunch,
  Sparkle,
} from "@/lib/phosphor-icons";
import { useSiteState } from "@/components/site-state";
import { calculateSiteModel } from "@/lib/site-model";
import { choiceGroups } from "@/lib/choice-data";
import { euro, number } from "@/lib/utils";
import {
  PageIntro,
  Panel,
  PrimaryLink,
  RangeField,
  SectionHeader,
  StatCard,
} from "@/components/plan-ui";
import {
  BudgetChart,
  DecisionTable,
  RevenueScenarioChart,
} from "@/components/decision-visuals";

export default function CalculatorPage() {
  const { state, setState, update } = useSiteState();
  const model = calculateSiteModel(state);
  const [copied, setCopied] = React.useState(false);

  const selectOption = (groupId: string, optionId: string) => {
    setState((previous) => ({ ...previous, toolChoices: { ...previous.toolChoices, [groupId]: optionId } }));
  };

  const summary = `Earth Spas totaalkeuze\n\nAccounts en tools: ${euro.format(model.platformMonthly)} per maand.\nAdvertenties: ${euro.format(model.adsMonthly)} per maand.\nAI-credits: ${euro.format(model.aiMonthly)} per maand.\nTotaal extern: ${euro.format(model.totalMonthly)} per maand / ${euro.format(model.annualOperating)} per jaar.\nVerwacht: ${number.format(model.baseExtraSales)} extra spa's en ${euro.format(model.baseExtraRevenue)} extra omzet.\nOmzetgroei: ${number.format(model.growthPct)}%.\nBreak-even: ${number.format(model.breakEvenSales)} extra spa's.\nSoftwaremarktwaarde: ${euro.format(model.marketBuildLow)}–${euro.format(model.marketBuildHigh)}.\nUitvoeringsvorm: ${state.involvement === "structured" ? `${state.hoursPerWeek} uur structurele capaciteit per week` : "flexibel en incidenteel"}.`;

  const copySummary = async () => {
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const rows = [
    { item: "Accounts, tools en hosting", month: euro.format(model.platformMonthly), year: euro.format(model.platformMonthly * 12), result: `${choiceGroups.length} categorieën ingevuld` },
    { item: "Meta en Google Ads", month: euro.format(model.adsMonthly), year: euro.format(model.adsMonthly * 12), result: `Meta ${euro.format(state.metaBudget)} + Google ${euro.format(state.googleBudget)}` },
    { item: "AI-creditpotten", month: euro.format(model.aiMonthly), year: euro.format(model.aiMonthly * 12), result: `Agents ${euro.format(state.aiApiBudget)}, development ${euro.format(state.aiDevelopmentBudget)}, media ${euro.format(state.aiMediaBudget)}` },
    { item: "Contentreserve", month: euro.format(state.contentBudget), year: euro.format(state.contentBudget * 12), result: "Externe fotografie, video of gespecialiseerde productie" },
    { item: "Interne bouw en doorontwikkeling", month: "niet opgenomen", year: "apart vast te leggen", result: `${model.selectedFeatures.length} gekozen onderdelen, ${model.buildHoursLow}–${model.buildHoursHigh} uur indicatief` },
    { item: "Totaal extern operationeel", month: euro.format(model.totalMonthly), year: euro.format(model.annualOperating), result: `${number.format(model.baseExtraSales)} extra spa's / ${euro.format(model.baseExtraRevenue)} extra omzet`, highlight: true },
  ];

  const revenueData = [
    { name: "Huidig", omzet: model.currentRevenue },
    { name: "Voorzichtig", omzet: model.currentRevenue + model.lowExtraRevenue },
    { name: "Verwacht", omzet: model.currentRevenue + model.baseExtraRevenue },
    { name: "Sterk", omzet: model.currentRevenue + model.highExtraRevenue },
  ];

  return (
    <main>
      <PageIntro
        eyebrow="04 · keuzes en totaalcalculator"
        title="Alle accounts, budgetten en aannames in één beslisoverzicht"
        text="Deze pagina vormt de centrale invullijst. Iedere wijziging in provider, advertentiebudget, verkoopprijs, marge of uitvoeringscapaciteit wordt direct verwerkt in de overige pagina's en in het totale scenario."
        accent="primary"
        image="/earth-spas-special-features-1920x1080.jpg"
        imageAlt="Earth Spas productdetails en speciale functies"
        actions={
          <>
            <button className="action-link" onClick={copySummary}>{copied ? <Check className="h-4 w-4" /> : <ClipboardText className="h-4 w-4" />}<span>{copied ? "Samenvatting gekopieerd" : "Kopieer samenvatting"}</span></button>
            <button className="action-link" onClick={() => window.print()}><DownloadSimple className="h-4 w-4" /><span>Bewaar als PDF</span></button>
          </>
        }
      />

      <section className="section-block theme-secondary">
        <div className="content-shell">
          <SectionHeader eyebrow="Basisaannames" title="De commerciële uitgangspunten" text="Het startscenario gebruikt twee verkochte spa's per week en een gemiddelde verkoopprijs van €6.000 inclusief btw. Pas de waarden aan wanneer actuele bedrijfsgegevens een realistischer uitgangspunt geven." />
          <div className="mt-9 grid gap-6 xl:grid-cols-[1.15fr_.85fr]">
            <Panel className="p-6 sm:p-8">
              <div className="grid gap-8 md:grid-cols-2">
                <RangeField label="Spa's per week" helper="Huidige organische verkoop" value={state.currentSalesPerWeek} min={0.5} max={8} step={0.5} display={number.format(state.currentSalesPerWeek)} onChange={(value) => update("currentSalesPerWeek", value)} />
                <RangeField label="Gemiddelde verkoopprijs" helper="Inclusief btw" value={state.averageSalePrice} min={3500} max={15000} step={250} display={euro.format(state.averageSalePrice)} onChange={(value) => update("averageSalePrice", value)} />
                <RangeField label="Brutomarge" helper="Na inkoopprijs van de spa" value={state.grossMargin} min={20} max={60} step={1} display={`${state.grossMargin}%`} onChange={(value) => update("grossMargin", value)} />
                <RangeField label="Acquisitiekosten per extra verkoop" helper="Marketing- en groeibudget, niet de inkoopprijs" value={state.acquisitionCostPerSale} min={250} max={4000} step={50} display={euro.format(state.acquisitionCostPerSale)} onChange={(value) => update("acquisitionCostPerSale", value)} />
                <RangeField label="Extra uitvoeringskosten per spa" helper="Aanvullende administratie of ondersteuning; mag €0 zijn" value={state.incrementalCostPerSale} min={0} max={1500} step={25} display={euro.format(state.incrementalCostPerSale)} onChange={(value) => update("incrementalCostPerSale", value)} />
              </div>
            </Panel>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
              <StatCard label="Huidige jaaromzet" value={euro.format(model.currentRevenue)} detail={`${number.format(model.currentUnitsYear)} spa's per jaar`} />
              <StatCard label="Brutobijdrage per extra spa" value={euro.format(model.grossProfitPerSale)} detail={`na ${euro.format(state.incrementalCostPerSale)} extra uitvoeringskosten`} />
              <StatCard label="Break-even" value={`${number.format(model.breakEvenSales)} extra spa's`} detail="voor het volledige externe jaarbudget" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-block theme-primary">
        <div className="content-shell">
          <SectionHeader eyebrow="Accounts en providers" title="Selecteer één route per onderdeel" text="De aanbevolen keuze staat als eerste of is gemarkeerd. Geen optie is vergrendeld. De maand- en jaarbedragen veranderen direct zodra een andere oplossing wordt geselecteerd." />
          <div className="mt-9 overflow-hidden rounded-lg border border-[var(--section-accent)]/35 bg-card">
            <div className="hidden grid-cols-[1fr_1.25fr_.55fr] gap-4 border-b border-border bg-white/[.025] px-5 py-3 text-xs uppercase tracking-[0.13em] text-[var(--section-accent)] md:grid"><span>Onderdeel</span><span>Gekozen oplossing</span><span>Per maand</span></div>
            {choiceGroups.map((group) => {
              const selected = group.options.find((option) => option.id === state.toolChoices[group.id]) ?? group.options[0];
              return (
                <div key={group.id} className="grid gap-3 border-b border-border/70 px-5 py-4 last:border-0 md:grid-cols-[1fr_1.25fr_.55fr] md:items-center">
                  <div><p className="text-base text-white">{group.title}</p><p className="mt-1 text-sm leading-5 text-white/48">{group.description}</p></div>
                  <select value={selected.id} onChange={(event) => selectOption(group.id, event.target.value)} className="min-h-11 w-full rounded-md border border-white/25 bg-background text-base text-white outline-none focus:border-[var(--section-accent)]">
                    {group.options.map((option) => <option key={option.id} value={option.id}>{option.name}{option.recommended ? " · aanbevolen" : ""}</option>)}
                  </select>
                  <div className="choice-price text-left md:text-right">{selected.monthly === 0 ? "€0" : euro.format(selected.monthly)}</div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <StatCard label="Geselecteerde stack" value={`${euro.format(model.platformMonthly)} p/m`} detail={`${euro.format(model.platformMonthly * 12)} per jaar`} />
            <StatCard label="Aanbevolen stack" value={`${euro.format(model.recommendedMonthly)} p/m`} detail="wanneer alle adviezen worden gekozen" />
            <StatCard label="Verschil" value={euro.format(model.platformMonthly - model.recommendedMonthly)} detail="negatief is goedkoper dan advies" />
          </div>
        </div>
      </section>

      <section className="section-block theme-secondary">
        <div className="content-shell">
          <SectionHeader eyebrow="Maandbudget" title="Advertenties, content en AI afzonderlijk instellen" text="De budgetten zijn bewust gescheiden. Hierdoor blijft zichtbaar welk deel naar bereik, productie, agents, development en vaste infrastructuur gaat." />
          <div className="mt-9 grid gap-6 xl:grid-cols-[1.1fr_.9fr]">
            <Panel className="p-6 sm:p-8">
              <div className="space-y-8">
                <RangeField label="Meta Ads" value={state.metaBudget} min={0} max={7500} step={50} display={euro.format(state.metaBudget)} onChange={(value) => update("metaBudget", value)} />
                <RangeField label="Google Ads" value={state.googleBudget} min={0} max={7500} step={50} display={euro.format(state.googleBudget)} onChange={(value) => update("googleBudget", value)} />
                <RangeField label="Externe contentreserve" value={state.contentBudget} min={0} max={3000} step={50} display={euro.format(state.contentBudget)} onChange={(value) => update("contentBudget", value)} />
                <RangeField label="Agent- en API-credits" value={state.aiApiBudget} min={0} max={2500} step={25} display={euro.format(state.aiApiBudget)} onChange={(value) => update("aiApiBudget", value)} />
                <RangeField label="Development-AI-credits" value={state.aiDevelopmentBudget} min={0} max={2500} step={25} display={euro.format(state.aiDevelopmentBudget)} onChange={(value) => update("aiDevelopmentBudget", value)} />
                <RangeField label="Media-AI-credits" value={state.aiMediaBudget} min={0} max={2500} step={25} display={euro.format(state.aiMediaBudget)} onChange={(value) => update("aiMediaBudget", value)} />
              </div>
            </Panel>
            <Panel className="p-6 sm:p-8"><p className="eyebrow">Totale verdeling</p><BudgetChart total={euro.format(model.totalMonthly)} data={[{ name: "Tools", value: model.platformMonthly }, { name: "Advertenties", value: model.adsMonthly }, { name: "Content", value: state.contentBudget }, { name: "AI", value: model.aiMonthly }]} /></Panel>
          </div>
        </div>
      </section>

      <section className="section-block theme-primary">
        <div className="content-shell">
          <SectionHeader eyebrow="Uitvoeringsvorm" title="Flexibele uitvoering of structurele capaciteit" text="De financiële of persoonlijke afspraken over interne uitvoering staan buiten dit document. Deze keuze beïnvloedt uitsluitend de uitvoeringscapaciteit die in het resultaatmodel wordt gebruikt." />
          <div className="mt-9 grid gap-4 lg:grid-cols-2">
            <button onClick={() => update("involvement", "free")} className={`panel p-6 text-left ${state.involvement === "free" ? "border-[var(--section-accent)]/70 bg-[color-mix(in_srgb,var(--section-accent)_10%,transparent)]" : ""}`}><Sparkle className="h-7 w-7 text-[var(--section-accent)]" /><h3 className="mt-4 text-2xl uppercase text-[var(--section-accent)]">Flexibele uitvoering</h3><p className="mt-3 text-lg leading-8 text-white/70">Werkzaamheden worden uitgevoerd op basis van beschikbare tijd, actuele noodzaak en prioriteit, zonder vaste wekelijkse capaciteit.</p></button>
            <button onClick={() => update("involvement", "structured")} className={`panel p-6 text-left ${state.involvement === "structured" ? "border-[var(--section-accent)]/70 bg-[color-mix(in_srgb,var(--section-accent)_10%,transparent)]" : ""}`}><RocketLaunch className="h-7 w-7 text-[var(--section-accent)]" /><h3 className="mt-4 text-2xl uppercase text-[var(--section-accent)]">Structurele uitvoering</h3><p className="mt-3 text-lg leading-8 text-white/70">Een vast aantal uren per week wordt gereserveerd voor marketing, content, website, data, agents en doorontwikkeling.</p></button>
          </div>
          {state.involvement === "structured" && <Panel className="mt-4 p-6"><RangeField label="Structurele uren per week" helper="46 actieve weken per jaar als rekenbasis" value={state.hoursPerWeek} min={2} max={32} step={1} display={`${state.hoursPerWeek} uur`} onChange={(value) => update("hoursPerWeek", value)} /></Panel>}
        </div>
      </section>

      <section className="section-block theme-secondary">
        <div className="content-shell">
          <SectionHeader eyebrow="Uitkomst" title="Totaalbudget en verwacht scenario" text="De uitkomst blijft een bandbreedte. Het model maakt zichtbaar welke aannames nodig zijn om de verhouding tussen budget, capaciteit, omzetgroei en break-even zakelijk te beoordelen." />
          <div className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            <StatCard label="Extern budget" value={`${euro.format(model.totalMonthly)} p/m`} detail={`${euro.format(model.annualOperating)} per jaar`} />
            <StatCard label="Extra verkopen" value={`${number.format(model.lowExtraSales)}–${number.format(model.highExtraSales)}`} detail={`${number.format(model.baseExtraSales)} verwacht`} />
            <StatCard label="Extra omzet" value={euro.format(model.baseExtraRevenue)} detail={`${number.format(model.growthPct)}% omzetgroei`} />
            <StatCard label="Bijdrage-ROI" value={`${number.format(model.contributionRoi)}%`} detail={`${euro.format(model.expectedContribution)} na extern budget`} />
            <StatCard label="Externe bouwmarktwaarde" value={`${euro.format(model.marketBuildLow)}–${euro.format(model.marketBuildHigh)}`} detail={`${model.selectedFeatures.length} gekozen functies`} />
          </div>
          <div className="mt-6 grid gap-6 xl:grid-cols-[.9fr_1.1fr]">
            <Panel className="p-6"><p className="eyebrow">Omzetscenario's</p><RevenueScenarioChart data={revenueData} /></Panel>
            <Panel className="overflow-hidden"><div className="border-b border-border p-5"><p className="eyebrow">Beslisoverzicht</p><h3 className="mt-2 text-2xl uppercase text-[var(--section-accent)]">Alle kosten naast elkaar</h3></div><div className="p-4 md:p-0"><DecisionTable rows={rows} /></div></Panel>
          </div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row"><PrimaryLink href="/checklist">Ga naar noodzakelijke actielijst</PrimaryLink><PrimaryLink href="/marketing">Terug naar marketingstrategie</PrimaryLink></div>
        </div>
      </section>

      <footer className="border-t border-border py-10 text-center text-sm text-white/45">Totaalcalculator · alle keuzes worden automatisch op de andere pagina's gebruikt</footer>
    </main>
  );
}
