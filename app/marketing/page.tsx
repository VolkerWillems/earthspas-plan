"use client";

import {
  ChartBar,
  ChartLine,
  ChatText,
  Globe,
  Image as ImageIcon,
  Target,
  Users,
} from "@/lib/phosphor-icons";
import {
  CardGrid,
  Container,
  ContentCard,
  MetricCard,
  PageHero,
  Section,
  SectionContent,
  SectionHeader,
  SplitGrid,
} from "@/components/foundation-ui";
import { PrimaryLink, RangeField } from "@/components/plan-ui";
import { useSiteState } from "@/components/site-state";
import {
  BudgetChart,
  RevenueScenarioChart,
  SalesRampChart,
} from "@/components/decision-visuals";
import { calculateSiteModel } from "@/lib/site-model";
import { euro, number } from "@/lib/utils";

const strategyPillars = [
  {
    title: "Zoekintentie benutten",
    text: "Google Ads en SEO richten zich eerst op concrete koop-, showroom- en servicevragen in Nederland en Duitsland, met NRW als primaire groeiregio.",
    icon: Target,
  },
  {
    title: "Vertrouwen onderbouwen",
    text: "Installaties, reviews, showroombeelden, productvergelijkingen en persoonlijke begeleiding maken de kwaliteit van Earth Spas aantoonbaar.",
    icon: Users,
  },
  {
    title: "Leads gestructureerd opvolgen",
    text: "E-mail, WhatsApp en remarketing houden relevante interesse actief totdat een showroomafspraak, offerte of ander vervolgmoment passend is.",
    icon: ChatText,
  },
  {
    title: "Meten tot verkoop",
    text: "Campagne, lead, afspraak, offerte en verkoop worden in één meetketen gekoppeld. Bereik en klikken blijven tussenstappen, geen eindresultaat.",
    icon: ChartBar,
  },
];

const campaignExamples = [
  {
    phase: "Altijd actief",
    title: "Google Search: koopintentie",
    text: "Campagnes rond premium whirlpool kopen, showroom bezoeken, modellen vergelijken en levering in Nederland en NRW.",
  },
  {
    phase: "Altijd actief",
    title: "Meta remarketing",
    text: "Websitebezoekers opnieuw bereiken met installaties, reviews, onderhoudsvoordelen en showroomafspraken.",
  },
  {
    phase: "Maandelijks",
    title: "Installatieverhaal",
    text: "Eén klantcase uitwerken als websiteartikel, socialreeks, korte video en advertentievariant.",
  },
  {
    phase: "Per seizoen",
    title: "Seizoenscampagne",
    text: "Voorjaar: tuin en terras. Najaar: warmte en herstel. Winter: showroom en levering voor het nieuwe seizoen.",
  },
  {
    phase: "Na inrichting CRM",
    title: "Lead recovery",
    text: "Automatische opvolging voor bezoekers die modellen bekeken, een aanvraag begonnen of na een offerte niet verder gingen.",
  },
  {
    phase: "Na voldoende data",
    title: "Lookalike en value-based",
    text: "Nieuwe doelgroepen bouwen op echte afspraken en verkopen in plaats van uitsluitend op bereik en klikken.",
  },
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
    verkoop: model.currentUnitsYear / 12 + (model.baseExtraSales / 12) * (0.25 + (index / 11) * 0.75),
  }));

  return (
    <main>
      <PageHero
        eyebrow="02 · marketingplan"
        kicker="Meetbare groei"
        title="Van organische verkoop naar gecontroleerde groei"
        text="De huidige verkoop ontstaat zonder structurele marketing. Nieuwe mediabudgetten moeten daarom aantoonbaar bijdragen aan extra gekwalificeerde leads, showroomafspraken, offertes en verkopen, zonder bestaande omzet als campagnewinst te tellen."
        accent="primary"
        image="/mockup/marketing.png"
        imageAlt="Earth Spas marketingdashboard met campagnes, leads en omzet"
        actions={
          <>
            <PrimaryLink href="/calculator">Open totale calculator</PrimaryLink>
            <PrimaryLink href="/software">Bekijk benodigde software</PrimaryLink>
          </>
        }
      />

      <Section accent="secondary">
        <Container>
          <SectionHeader
            eyebrow="Doel"
            title="Bouw verkoopkansen, geen los bereik"
            description="De marketingaanpak wordt beoordeeld op kwaliteit van aanvragen, showroomafspraken, offertes, verkochte spa's en marge. Bereik en klikken blijven relevante tussenstappen, maar zijn geen zelfstandig eindresultaat."
            accent="secondary"
          />
          <SectionContent>
            <CardGrid columns={2}>
              {strategyPillars.map(({ title, text, icon }) => (
                <ContentCard key={title} title={title} icon={icon}>
                  <p>{text}</p>
                </ContentCard>
              ))}
            </CardGrid>
          </SectionContent>
        </Container>
      </Section>

      <Section accent="primary">
        <Container>
          <SectionHeader
            eyebrow="Budgetkeuzes"
            title="Bepaal per kanaal wat structureel beschikbaar is"
            description="Softwareabonnementen staan apart van mediabudget. AI-credits en contentproductie blijven eveneens afzonderlijk zichtbaar, zodat duidelijk is welk deel naar bereik, productie, automatisering of platformkosten gaat."
            accent="primary"
          />
          <SectionContent>
            <SplitGrid>
              <ContentCard eyebrow="Maandelijkse invoer" title="Budget per groeilaag">
                <div className="space-y-8">
                  <RangeField
                    label="Meta Ads"
                    helper="Facebook, Instagram en remarketing"
                    value={state.metaBudget}
                    min={0}
                    max={7500}
                    step={50}
                    display={euro.format(state.metaBudget)}
                    onChange={(value) => update("metaBudget", value)}
                  />
                  <RangeField
                    label="Google Ads"
                    helper="Zoekintentie, showroom en regio's"
                    value={state.googleBudget}
                    min={0}
                    max={7500}
                    step={50}
                    display={euro.format(state.googleBudget)}
                    onChange={(value) => update("googleBudget", value)}
                  />
                  <RangeField
                    label="Externe contentreserve"
                    helper="Fotografie, video of gespecialiseerde productie"
                    value={state.contentBudget}
                    min={0}
                    max={3000}
                    step={50}
                    display={euro.format(state.contentBudget)}
                    onChange={(value) => update("contentBudget", value)}
                  />
                  <RangeField
                    label="Agent- en API-credits"
                    helper="Analyses, supportagents, leadflows en automatiseringen"
                    value={state.aiApiBudget}
                    min={0}
                    max={2500}
                    step={25}
                    display={euro.format(state.aiApiBudget)}
                    onChange={(value) => update("aiApiBudget", value)}
                  />
                  <RangeField
                    label="Media-AI-credits"
                    helper="Beeld, video, voice en campagnevarianten"
                    value={state.aiMediaBudget}
                    min={0}
                    max={2500}
                    step={25}
                    display={euro.format(state.aiMediaBudget)}
                    onChange={(value) => update("aiMediaBudget", value)}
                  />
                </div>
              </ContentCard>

              <div className="grid items-start gap-5">
                <ContentCard eyebrow="Verdeling per maand" title="Waar het totale budget naartoe gaat">
                  <BudgetChart
                    total={euro.format(model.totalMonthly)}
                    data={[
                      { name: "Advertenties", value: model.adsMonthly },
                      { name: "Content", value: state.contentBudget },
                      { name: "AI voor marketing", value: state.aiApiBudget + state.aiMediaBudget },
                      { name: "Tools & hosting", value: model.platformMonthly },
                    ]}
                  />
                </ContentCard>
                <CardGrid columns={2}>
                  <MetricCard label="Marketingmedia" value={`${euro.format(model.adsMonthly)} p/m`} detail="Meta + Google" />
                  <MetricCard
                    label="Totale externe inzet"
                    value={`${euro.format(model.totalMonthly)} p/m`}
                    detail="inclusief tools, content en AI"
                  />
                </CardGrid>
              </div>
            </SplitGrid>
          </SectionContent>
        </Container>
      </Section>

      <Section accent="secondary">
        <Container>
          <SectionHeader
            eyebrow="Resultaatvoorspelling"
            title="Scenario's op basis van expliciete aannames"
            description="Het model gebruikt het beschikbare budget, de geselecteerde functies, de uitvoeringscapaciteit en een instelbare acquisitiekost per extra verkoop. De uitkomst is een indicatieve bandbreedte en geen verkoopgarantie."
            accent="secondary"
          />
          <SectionContent>
            <ContentCard eyebrow="Werkbasis" title="Verwachte bandbreedte voor extra verkopen">
              <div className="grid gap-5 sm:grid-cols-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.08em] text-[var(--text-muted)]">Voorzichtig</p>
                  <p className="mt-2 font-[family-name:var(--font-heading)] text-3xl leading-10 text-[var(--section-accent)]">
                    {number.format(model.lowExtraSales)}
                  </p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.08em] text-[var(--text-muted)]">Verwacht</p>
                  <p className="mt-2 font-[family-name:var(--font-heading)] text-3xl leading-10 text-[var(--section-accent)]">
                    {number.format(model.baseExtraSales)}
                  </p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.08em] text-[var(--text-muted)]">Sterk gemeten</p>
                  <p className="mt-2 font-[family-name:var(--font-heading)] text-3xl leading-10 text-[var(--section-accent)]">
                    {number.format(model.highExtraSales)}
                  </p>
                </div>
              </div>
            </ContentCard>

            <CardGrid columns={4} className="mt-5">
              <MetricCard label="Extra omzet" value={euro.format(model.baseExtraRevenue)} detail="verwacht scenario" />
              <MetricCard label="Omzetgroei" value={`${number.format(model.growthPct)}%`} detail="tegenover huidige omzet" />
              <MetricCard label="Break-even" value={`${number.format(model.breakEvenSales)} spa's`} detail="op extern jaarbudget" />
              <MetricCard label="Bijdrage-ROI" value={`${number.format(model.contributionRoi)}%`} detail="na extern budget" />
            </CardGrid>

            <CardGrid columns={2} className="mt-5">
              <ContentCard eyebrow="Omzetscenario's" title="Huidig, voorzichtig, verwacht en sterk">
                <RevenueScenarioChart data={revenueData} />
              </ContentCard>
              <ContentCard eyebrow="Opbouw door het jaar" title="Verwachte geleidelijke verkoopontwikkeling">
                <SalesRampChart data={salesRampData} />
              </ContentCard>
            </CardGrid>
          </SectionContent>
        </Container>
      </Section>

      <Section accent="primary">
        <Container>
          <SectionHeader
            eyebrow="Campagnevoorbeelden"
            title="Concrete campagnes met vaste meet- en opvolgpunten"
            description="Ieder campagneonderdeel krijgt een passende landingspagina, doelgroep, meetpunt, opvolgroute en herbruikbare contentset. Resultaten worden per kanaal en per verkoopfase beoordeeld."
            accent="primary"
          />
          <SectionContent>
            <CardGrid columns={3}>
              {campaignExamples.map((campaign) => (
                <ContentCard key={campaign.title} eyebrow={campaign.phase} title={campaign.title}>
                  <p>{campaign.text}</p>
                </ContentCard>
              ))}
            </CardGrid>
          </SectionContent>
        </Container>
      </Section>

      <Section accent="secondary">
        <Container>
          <SectionHeader
            eyebrow="Marktvolgorde"
            title="Eerst Nederland en NRW bewijzen"
            description="Markten worden niet tegelijk geactiveerd. Nederland en Duitsland krijgen de eerste meetbare campagnes. België volgt pas na bewezen processen; Luxemburg blijft een afzonderlijk besluit en voorlopig geen actieve groeimarkt."
            accent="secondary"
          />
          <SectionContent>
            <CardGrid columns={3}>
              <ContentCard eyebrow="Actief" title="Nederland en Duitsland · NRW" icon={Globe}>
                <p>Eigen zoekwoorden, teksten, bewijs, landingspagina's en regionale campagnegroepen, gekoppeld aan showroom, installatie en service vanuit Venlo.</p>
              </ContentCard>
              <ContentCard eyebrow="Tweede fase" title="België na bewezen resultaten" icon={ImageIcon}>
                <p>België wordt pas geactiveerd wanneer de Nederlandse en Duitse funnel aantoonbaar werkt en taal, opvolging en lokale content volledig beschikbaar zijn.</p>
              </ContentCard>
              <ContentCard eyebrow="Besluit nodig" title="Luxemburg voorlopig niet actief" icon={ChartLine}>
                <p>Luxemburg blijft een aparte premiumoptie. Activatie volgt alleen na een expliciet besluit, een lokale landingspagina en beschikbare commerciële opvolging.</p>
              </ContentCard>
            </CardGrid>
          </SectionContent>
        </Container>
      </Section>
    </main>
  );
}
