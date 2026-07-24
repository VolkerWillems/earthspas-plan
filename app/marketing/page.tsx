"use client";

import {
  ChartBar,
  ChartLine,
  ChatText,
  Globe,
  Image,
  MagicWand,
  Target,
  Users,
} from "@/lib/phosphor-icons";
import { useSiteState } from "@/components/site-state";
import { calculateSiteModel } from "@/lib/site-model";
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
  RevenueScenarioChart,
  SalesRampChart,
} from "@/components/decision-visuals";

const strategyPillars = [
  { title: "Zoekintentie pakken", text: "Google Ads en SEO rond concrete koop-, showroom- en servicevragen in Nederland, Duitsland en België.", icon: Target },
  { title: "Vertrouwen bewijzen", text: "Installaties, reviews, showroombeelden, productvergelijkingen en persoonlijke begeleiding zichtbaar maken.", icon: Users },
  { title: "Leads blijven opvolgen", text: "Niet iedere bezoeker koopt vandaag. E-mail, WhatsApp en remarketing houden de interesse warm zonder spamcircus.", icon: ChatText },
  { title: "Meten tot verkoop", text: "Campagne, lead, afspraak, offerte en uiteindelijke verkoop moeten in één meetketen terechtkomen.", icon: ChartBar },
];

const campaignExamples = [
  { phase: "Altijd actief", title: "Google Search: koopintentie", text: "Campagnes rond premium whirlpool kopen, showroom bezoeken, modellen vergelijken en levering in de regio." },
  { phase: "Altijd actief", title: "Meta remarketing", text: "Bezoekers opnieuw bereiken met installaties, reviews, onderhoudsvoordelen en persoonlijke showroomafspraken." },
  { phase: "Maandelijks", title: "Installatieverhaal", text: "Van levering tot eindresultaat: één klantcase als websiteartikel, socialreeks, korte video en advertentievariant." },
  { phase: "Per seizoen", title: "Seizoenscampagne", text: "Voorjaar: tuin en terras. Najaar: warmte en herstel. Winter: showroom en levering voor het nieuwe seizoen." },
  { phase: "Na inrichting CRM", title: "Lead recovery", text: "Automatische opvolging voor mensen die modellen bekeken, een aanvraag begonnen of na een offerte stilvallen." },
  { phase: "Na voldoende data", title: "Lookalike en value-based", text: "Nieuwe doelgroepen bouwen op echte afspraken en verkopen, niet alleen op goedkope kliks die verder niets doen." },
];

export default function MarketingPage() {
  const { state, update } = useSiteState();
  const model = calculateSiteModel(state);

  const revenueData = [
    { name: "Huidig", omzet: model.currentRevenue },
    { name: "Voorzichtig", omzet: model.currentRevenue + model.lowExtraRevenue },
    { name: "Verwacht", omzet: model.currentRevenue + model.baseExtraRevenue },
    { name: "Sterk", omzet: model.currentRevenue + model.highExtraRevenue },
  ];
  const months = ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];
  const salesRampData = months.map((maand, index) => ({
    maand,
    verkoop: model.currentUnitsYear / 12 + model.baseExtraSales / 12 * (0.25 + index / 11 * 0.75),
  }));

  return (
    <main>
      <PageIntro
        eyebrow="02 · marketingplan"
        title="Van organische verkoop naar meetbare, gecontroleerde groei"
        text="Earth Spas verkoopt nu zonder structurele marketing. Dat is een sterke uitgangspositie: het marketingbudget hoeft niet de hele onderneming te redden, maar moet aantoonbaar extra afspraken, offertes en verkopen toevoegen. De luxe om verstandig te testen. Mensen blijken daar soms zelfs beter van te slapen."
        accent="primary"
        actions={<><PrimaryLink href="/calculator">Open totale calculator</PrimaryLink><PrimaryLink href="/software" accent="secondary">Bekijk benodigde software</PrimaryLink></>}
      />

      <section className="section-block theme-secondary">
        <div className="content-shell">
          <SectionHeader eyebrow="Doel" title="Niet meer bereik verzamelen, maar verkoopkansen bouwen" text="De marketingaanpak wordt beoordeeld op kwaliteit van aanvragen, showroomafspraken, offertes, verkochte spa's en marge. Bereik en kliks blijven nuttige tussenstappen, geen eindoverwinning met confetti." accent="secondary" />
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {strategyPillars.map((pillar) => {
              const Icon = pillar.icon;
              return <Panel key={pillar.title} className="theme-secondary border-secondary/35 p-6"><Icon className="h-7 w-7 text-secondary" /><h3 className="mt-5 text-xl uppercase text-secondary">{pillar.title}</h3><p className="mt-3 text-base leading-7 text-white/72">{pillar.text}</p></Panel>;
            })}
          </div>
        </div>
      </section>

      <section className="section-block theme-primary">
        <div className="content-shell">
          <SectionHeader eyebrow="Budgetkeuzes" title="Bepaal per kanaal hoeveel er werkelijk beschikbaar is" text="Softwareabonnementen staan apart van mediabudget. AI-credits zijn eveneens opgesplitst, zodat duidelijk blijft of geld naar advertenties, agents, development of productie verdwijnt." accent="primary" />
          <div className="mt-9 grid gap-6 xl:grid-cols-[1.1fr_.9fr]">
            <Panel className="p-6 sm:p-8">
              <div className="space-y-8">
                <RangeField label="Meta Ads" helper="Facebook, Instagram en remarketing" value={state.metaBudget} min={0} max={7500} step={50} display={euro.format(state.metaBudget)} onChange={(value) => update("metaBudget", value)} />
                <RangeField label="Google Ads" helper="Zoekintentie, showroom en regio's" value={state.googleBudget} min={0} max={7500} step={50} display={euro.format(state.googleBudget)} onChange={(value) => update("googleBudget", value)} accent="secondary" />
                <RangeField label="Externe contentreserve" helper="Fotografie, video of losse productie buiten Volker" value={state.contentBudget} min={0} max={3000} step={50} display={euro.format(state.contentBudget)} onChange={(value) => update("contentBudget", value)} />
                <RangeField label="Agent- en API-credits" helper="Analyses, supportagents, leadflows en automatiseringen" value={state.aiApiBudget} min={0} max={2500} step={25} display={euro.format(state.aiApiBudget)} onChange={(value) => update("aiApiBudget", value)} />
                <RangeField label="Media-AI-credits" helper="Beeld, video, voice en campagnevarianten" value={state.aiMediaBudget} min={0} max={2500} step={25} display={euro.format(state.aiMediaBudget)} onChange={(value) => update("aiMediaBudget", value)} />
              </div>
            </Panel>
            <Panel className="p-6 sm:p-8">
              <p className="eyebrow">Verdeling per maand</p>
              <BudgetChart total={euro.format(model.totalMonthly)} data={[
                { name: "Advertenties", value: model.adsMonthly },
                { name: "Content", value: state.contentBudget },
                { name: "AI voor marketing", value: state.aiApiBudget + state.aiMediaBudget },
                { name: "Tools & hosting", value: model.platformMonthly },
              ]} />
              <div className="mt-3 grid grid-cols-2 gap-3">
                <StatCard label="Marketingmedia" value={`${euro.format(model.adsMonthly)} p/m`} detail="Meta + Google" />
                <StatCard label="Totale externe inzet" value={`${euro.format(model.totalMonthly)} p/m`} detail="inclusief tools en AI" />
              </div>
            </Panel>
          </div>
        </div>
      </section>

      <section className="section-block theme-secondary">
        <div className="content-shell">
          <SectionHeader eyebrow="Resultaatvoorspelling" title="Drie scenario's, geen verkoopgarantie" text="Het model gebruikt het budget, de gekozen functies, structurele inzet en een instelbare acquisitiekost per extra verkoop. Daarmee ontstaat een bandbreedte. Geen glazen bol, wel aanzienlijk nuttiger dan willekeurig geld naar Meta slingeren." accent="secondary" />
          <div className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            <StatCard label="Extra verkopen" value={`${number.format(model.lowExtraSales)}–${number.format(model.highExtraSales)}`} detail={`${number.format(model.baseExtraSales)} verwacht`} accent="secondary" />
            <StatCard label="Extra omzet" value={euro.format(model.baseExtraRevenue)} detail="verwacht scenario" accent="secondary" />
            <StatCard label="Omzetgroei" value={`${number.format(model.growthPct)}%`} detail="tegenover huidige omzet" accent="secondary" />
            <StatCard label="Break-even" value={`${number.format(model.breakEvenSales)} spa's`} detail="op extern jaarbudget" accent="secondary" />
            <StatCard label="Bijdrage-ROI" value={`${number.format(model.contributionRoi)}%`} detail="na extern budget" accent="secondary" />
          </div>
          <div className="mt-6 grid gap-6 xl:grid-cols-2">
            <Panel className="border-secondary/35 p-6"><p className="eyebrow">Omzetscenario's</p><h3 className="mt-2 text-2xl uppercase text-secondary">Huidig, voorzichtig, verwacht en sterk</h3><RevenueScenarioChart data={revenueData} /></Panel>
            <Panel className="border-secondary/35 p-6"><p className="eyebrow">Opbouw door het jaar</p><h3 className="mt-2 text-2xl uppercase text-secondary">Verkoop groeit geleidelijk</h3><SalesRampChart data={salesRampData} /></Panel>
          </div>
        </div>
      </section>

      <section className="section-block theme-primary">
        <div className="content-shell">
          <SectionHeader eyebrow="Campagnevoorbeelden" title="Wat er concreet gemaakt en uitgevoerd kan worden" text="De voorbeelden zijn geen losse creatieve ingevingen. Elk onderdeel hoort een vaste landingspagina, meetpunt, doelgroep, opvolging en herbruikbare contentset te krijgen." accent="primary" />
          <div className="mt-9 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {campaignExamples.map((campaign) => (
              <Panel key={campaign.title} className="p-6">
                <p className="text-sm uppercase tracking-[0.13em] text-primary">{campaign.phase}</p>
                <h3 className="mt-3 text-xl uppercase text-white">{campaign.title}</h3>
                <p className="mt-3 text-base leading-7 text-white/70">{campaign.text}</p>
              </Panel>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block theme-secondary">
        <div className="content-shell grid gap-6 lg:grid-cols-3">
          <Panel className="border-secondary/35 p-6"><Globe className="h-7 w-7 text-secondary" /><h3 className="mt-4 text-xl uppercase text-secondary">Drie landen, aparte intentie</h3><p className="mt-3 leading-7 text-white/70">Nederland, Duitsland en België krijgen eigen zoekwoorden, teksten, bewijs, landingspagina's en regionale campagnegroepen.</p></Panel>
          <Panel className="border-secondary/35 p-6"><Image className="h-7 w-7 text-secondary" /><h3 className="mt-4 text-xl uppercase text-secondary">Content uit echte installaties</h3><p className="mt-3 leading-7 text-white/70">Iedere levering kan materiaal opleveren voor cases, socialposts, advertenties, FAQ's en showroomvertrouwen.</p></Panel>
          <Panel className="border-secondary/35 p-6"><ChartLine className="h-7 w-7 text-secondary" /><h3 className="mt-4 text-xl uppercase text-secondary">Maandelijks beslissen</h3><p className="mt-3 leading-7 text-white/70">Budget verschuift op basis van afspraken, offertes en verkopen. Niet omdat een dashboard enthousiast groen kleurt.</p></Panel>
        </div>
      </section>

      <footer className="border-t border-border py-10 pb-28 text-center text-sm text-white/45 lg:pb-10">Marketingplan · gekoppeld aan dezelfde calculator en keuzes als de overige pagina's</footer>
    </main>
  );
}
