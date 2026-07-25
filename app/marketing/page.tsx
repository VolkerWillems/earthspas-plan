"use client";

import {
  ChartBar,
  ChartLine,
  ChatText,
  Globe,
  Image,
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
  { title: "Zoekintentie benutten", text: "Google Ads en SEO rond concrete koop-, showroom- en servicevragen in Nederland, Duitsland en België.", icon: Target },
  { title: "Vertrouwen onderbouwen", text: "Installaties, reviews, showroombeelden, productvergelijkingen en persoonlijke begeleiding zichtbaar maken.", icon: Users },
  { title: "Leads gestructureerd opvolgen", text: "E-mail, WhatsApp en remarketing houden relevante interesse actief totdat een vervolgstap passend is.", icon: ChatText },
  { title: "Meten tot verkoop", text: "Campagne, lead, afspraak, offerte en uiteindelijke verkoop worden in één meetketen gekoppeld.", icon: ChartBar },
];

const campaignExamples = [
  { phase: "Altijd actief", title: "Google Search: koopintentie", text: "Campagnes rond premium whirlpool kopen, showroom bezoeken, modellen vergelijken en levering in de regio." },
  { phase: "Altijd actief", title: "Meta remarketing", text: "Websitebezoekers opnieuw bereiken met installaties, reviews, onderhoudsvoordelen en showroomafspraken." },
  { phase: "Maandelijks", title: "Installatieverhaal", text: "Eén klantcase uitwerken als websiteartikel, socialreeks, korte video en advertentievariant." },
  { phase: "Per seizoen", title: "Seizoenscampagne", text: "Voorjaar: tuin en terras. Najaar: warmte en herstel. Winter: showroom en levering voor het nieuwe seizoen." },
  { phase: "Na inrichting CRM", title: "Lead recovery", text: "Automatische opvolging voor bezoekers die modellen bekeken, een aanvraag begonnen of na een offerte niet verder gingen." },
  { phase: "Na voldoende data", title: "Lookalike en value-based", text: "Nieuwe doelgroepen bouwen op echte afspraken en verkopen in plaats van uitsluitend op bereik en klikken." },
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
        text="De huidige verkoop wordt zonder structurele marketing gerealiseerd. Daardoor kan het marketingbudget volledig worden ingezet voor aantoonbare extra afspraken, offertes en verkopen, zonder afhankelijkheid van betaalde acquisitie voor de bestaande omzet."
        accent="primary"
        image="/earth-spas-collage-a-starry-lake-1920x1080.jpg"
        imageAlt="Earth Spas whirlpool in avondsetting"
        actions={<><PrimaryLink href="/calculator">Open totale calculator</PrimaryLink><PrimaryLink href="/software">Bekijk benodigde software</PrimaryLink></>}
      />

      <section className="section-block theme-secondary">
        <div className="content-shell">
          <SectionHeader eyebrow="Doel" title="Niet alleen bereik inkopen, maar verkoopkansen opbouwen" text="De marketingaanpak wordt beoordeeld op kwaliteit van aanvragen, showroomafspraken, offertes, verkochte spa's en marge. Bereik en klikken blijven relevante tussenstappen, maar zijn geen zelfstandig eindresultaat." />
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {strategyPillars.map((pillar) => {
              const Icon = pillar.icon;
              return <Panel key={pillar.title} className="p-6"><Icon className="h-7 w-7 text-[var(--section-accent)]" /><h3 className="mt-5 text-xl uppercase text-[var(--section-accent)]">{pillar.title}</h3><p className="mt-3 text-base leading-7 text-white/72">{pillar.text}</p></Panel>;
            })}
          </div>
        </div>
      </section>

      <section className="section-block theme-primary">
        <div className="content-shell">
          <SectionHeader eyebrow="Budgetkeuzes" title="Bepaal per kanaal hoeveel structureel beschikbaar is" text="Softwareabonnementen staan apart van mediabudget. AI-credits zijn eveneens gescheiden, zodat duidelijk blijft welk deel naar advertenties, automatisering, development of productie gaat." />
          <div className="mt-9 grid gap-6 xl:grid-cols-[1.1fr_.9fr]">
            <Panel className="p-6 sm:p-8">
              <div className="space-y-8">
                <RangeField label="Meta Ads" helper="Facebook, Instagram en remarketing" value={state.metaBudget} min={0} max={7500} step={50} display={euro.format(state.metaBudget)} onChange={(value) => update("metaBudget", value)} />
                <RangeField label="Google Ads" helper="Zoekintentie, showroom en regio's" value={state.googleBudget} min={0} max={7500} step={50} display={euro.format(state.googleBudget)} onChange={(value) => update("googleBudget", value)} />
                <RangeField label="Externe contentreserve" helper="Fotografie, video of gespecialiseerde productie" value={state.contentBudget} min={0} max={3000} step={50} display={euro.format(state.contentBudget)} onChange={(value) => update("contentBudget", value)} />
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
          <SectionHeader eyebrow="Resultaatvoorspelling" title="Drie scenario's op basis van expliciete aannames" text="Het model gebruikt het beschikbare budget, de geselecteerde functies, de uitvoeringscapaciteit en een instelbare acquisitiekost per extra verkoop. Daarmee ontstaat een indicatieve bandbreedte, geen verkoopgarantie." />
          <div className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            <StatCard label="Extra verkopen" value={`${number.format(model.lowExtraSales)}–${number.format(model.highExtraSales)}`} detail={`${number.format(model.baseExtraSales)} verwacht`} />
            <StatCard label="Extra omzet" value={euro.format(model.baseExtraRevenue)} detail="verwacht scenario" />
            <StatCard label="Omzetgroei" value={`${number.format(model.growthPct)}%`} detail="tegenover huidige omzet" />
            <StatCard label="Break-even" value={`${number.format(model.breakEvenSales)} spa's`} detail="op extern jaarbudget" />
            <StatCard label="Bijdrage-ROI" value={`${number.format(model.contributionRoi)}%`} detail="na extern budget" />
          </div>
          <div className="mt-6 grid gap-6 xl:grid-cols-2">
            <Panel className="p-6"><p className="eyebrow">Omzetscenario's</p><h3 className="mt-2 text-2xl uppercase text-[var(--section-accent)]">Huidig, voorzichtig, verwacht en sterk</h3><RevenueScenarioChart data={revenueData} /></Panel>
            <Panel className="p-6"><p className="eyebrow">Opbouw door het jaar</p><h3 className="mt-2 text-2xl uppercase text-[var(--section-accent)]">Verwachte geleidelijke verkoopontwikkeling</h3><SalesRampChart data={salesRampData} /></Panel>
          </div>
        </div>
      </section>

      <section className="section-block theme-primary">
        <div className="content-shell">
          <SectionHeader eyebrow="Campagnevoorbeelden" title="Concrete campagnes met vaste meet- en opvolgpunten" text="Ieder campagneonderdeel krijgt een passende landingspagina, doelgroep, meetpunt, opvolgroute en herbruikbare contentset. Hierdoor kunnen resultaten per kanaal en per verkoopfase worden beoordeeld." />
          <div className="mt-9 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {campaignExamples.map((campaign) => (
              <Panel key={campaign.title} className="p-6">
                <p className="text-sm uppercase tracking-[0.13em] text-[var(--section-accent)]">{campaign.phase}</p>
                <h3 className="mt-3 text-xl uppercase text-white">{campaign.title}</h3>
                <p className="mt-3 text-base leading-7 text-white/70">{campaign.text}</p>
              </Panel>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block theme-secondary">
        <div className="content-shell grid gap-6 lg:grid-cols-3">
          <Panel className="p-6"><Globe className="h-7 w-7 text-[var(--section-accent)]" /><h3 className="mt-4 text-xl uppercase text-[var(--section-accent)]">Drie landen, aparte intentie</h3><p className="mt-3 leading-7 text-white/70">Nederland, Duitsland en België krijgen eigen zoekwoorden, teksten, bewijs, landingspagina's en regionale campagnegroepen.</p></Panel>
          <Panel className="p-6"><Image className="h-7 w-7 text-[var(--section-accent)]" /><h3 className="mt-4 text-xl uppercase text-[var(--section-accent)]">Content uit echte installaties</h3><p className="mt-3 leading-7 text-white/70">Iedere levering kan materiaal opleveren voor cases, socialposts, advertenties, FAQ's en showroomvertrouwen.</p></Panel>
          <Panel className="p-6"><ChartLine className="h-7 w-7 text-[var(--section-accent)]" /><h3 className="mt-4 text-xl uppercase text-[var(--section-accent)]">Maandelijkse budgetsturing</h3><p className="mt-3 leading-7 text-white/70">Budget wordt verschoven op basis van afspraken, offertes, verkopen en marge in plaats van uitsluitend op bereik of klikvolume.</p></Panel>
        </div>
      </section>

      <footer className="border-t border-border py-10 text-center text-sm text-white/45">Marketingplan · gekoppeld aan dezelfde calculator en keuzes als de overige pagina's</footer>
    </main>
  );
}
