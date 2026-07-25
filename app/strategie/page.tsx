"use client";

import {
  ArrowRight,
  ChartLine,
  Check,
  Globe,
  Image,
  MagicWand,
  RocketLaunch,
  ShieldCheck,
  Target,
  Users,
  Warning,
} from "@/lib/phosphor-icons";
import { useSiteState } from "@/components/site-state";
import { calculateSiteModel } from "@/lib/site-model";
import { euro, number } from "@/lib/utils";
import {
  PageIntro,
  Panel,
  PrimaryLink,
  SectionHeader,
  StatCard,
} from "@/components/plan-ui";

const brandPillars = [
  {
    icon: Users,
    title: "Persoonlijk advies",
    text: "Geen anonieme webshop of prijsdumping. De website moet bezoekers helpen kiezen en sturen naar een showroomafspraak of persoonlijk adviesgesprek.",
  },
  {
    icon: ShieldCheck,
    title: "Zekerheid rondom plaatsing",
    text: "Toegang, fundering, elektra, levering, installatie en ingebruikname worden vooraf besproken. Daarmee verkoopt Earth Spas niet alleen een product, maar een beheerst totaalproject.",
  },
  {
    icon: ChartLine,
    title: "Comfort en gebruikskosten",
    text: "Energie-efficiëntie, isolatie, onderhoud en levensduur worden begrijpelijk uitgelegd zonder onbewezen claims of technisch toneelstuk.",
  },
  {
    icon: ShieldCheck,
    title: "Service na aankoop",
    text: "Onderhoud, support, bereikbaarheid en aftercare worden zichtbaar onderdeel van het merk. Dat onderscheidt Earth Spas van prijs- en voorraadgedreven aanbieders.",
  },
];

const marketFocus = [
  {
    market: "Nederland",
    priority: "Direct actief",
    focus: "Noord-Limburg, Oost-Brabant en Gelderland vanuit showroom Venlo, daarna landelijke high-intent campagnes.",
    why: "Sterke fit met koopwoningen, eengezinswoningen en korte operationele afstand naar showroom, installatie en service.",
  },
  {
    market: "Duitsland · NRW",
    priority: "Hoogste groeiprioriteit",
    focus: "Duitstalige showroom-, koop-, energie- en servicecampagnes rond Düsseldorf, Essen, Köln en de grensregio.",
    why: "NRW biedt veel groter marktvolume en Venlo kan als bereikbare showroom- en servicehub worden gepositioneerd.",
  },
  {
    market: "Luxemburg",
    priority: "Compacte premiumlaag",
    focus: "Kleine, zeer gerichte campagne voor advies, levering en installatie, alleen met complete lokale landingspagina en opvolging.",
    why: "Beperkt volume maar hoge koopkracht; rendabel wanneer campagnes klein blijven en leadkwaliteit boven bereik wordt gezet.",
  },
  {
    market: "België",
    priority: "Tweede groeifase",
    focus: "Vlaanderen en Wallonië volledig gescheiden op taal, landingspagina, advertenties en opvolging.",
    why: "De research is beschikbaar, maar activatie is pas verstandig wanneer NL en NRW aantoonbaar werken en Franse opvolging echt beschikbaar is.",
  },
];

const swot = [
  {
    title: "Sterktes",
    tone: "positive",
    items: [
      "Showroom in Venlo, direct bruikbaar voor Nederland en NRW.",
      "Premium collectie met advies, installatie en service als totaalpropositie.",
      "Bestaande reviews, organisch verkeer en eerste goedkope verkeer-tests.",
      "Meertalige digitale basis en veel voorbereid software- en marketingwerk.",
    ],
  },
  {
    title: "Zwaktes",
    tone: "warning",
    items: [
      "Nog beperkte merkbekendheid buiten de bestaande klantenkring.",
      "Geen betrouwbare volledige attributie van campagne tot verkoop.",
      "Onvoldoende structurele contentproductie en commerciële opvolging.",
      "Lokalisatie, accountoverdracht en meetinrichting moeten eerst worden afgerond.",
    ],
  },
  {
    title: "Kansen",
    tone: "positive",
    items: [
      "High-intent Google Search rond kopen, showroom, energie en installatie.",
      "Lokale SEO voor Venlo, Limburg, Brabant, Gelderland en grensregio NRW.",
      "Echte installatiecases, klantverhalen en aftercare als onderscheidende content.",
      "CRM, lead scoring en automatische opvolging om minder aanvragen te verliezen.",
    ],
  },
  {
    title: "Bedreigingen",
    tone: "warning",
    items: [
      "Prijsplatformen, outlets en grote showroomketens drukken de prijsperceptie.",
      "Brede campagnes kunnen snel geld verbranden aan goedkope of irrelevante intentie.",
      "Onvoldoende snelle opvolging maakt zelfs goede leads waardeloos.",
      "Onbewezen energie-, gezondheids- of besparingsclaims kunnen vertrouwen en compliance schaden.",
    ],
  },
];

const socialPlan = [
  {
    channel: "Instagram & Facebook",
    cadence: "3 kernposts per week + stories",
    role: "Bereik, vertrouwen, remarketing en showroominteresse.",
    formats: "Installatiereels, carrousels, klantcases, modeldetails, showroomvideo en korte onderhoudstips.",
  },
  {
    channel: "Google Business Profile",
    cadence: "1 update per week",
    role: "Lokale zichtbaarheid, route, bellen, reviews en showroomvertrouwen.",
    formats: "Nieuwe plaatsingen, showroomupdates, openingstijden, serviceberichten en reviewreacties.",
  },
  {
    channel: "YouTube",
    cadence: "2 inhoudelijke video's per maand",
    role: "Diepe uitleg en bewijs voor bezoekers die een aankoop zorgvuldig onderzoeken.",
    formats: "Koopadvies, installatieplanning, energiegebruik, modelvergelijking en onderhoud.",
  },
  {
    channel: "Pinterest",
    cadence: "4–8 hergebruikte pins per maand",
    role: "Langdurige inspiratie rond tuin, wellness en premium buitenleven.",
    formats: "Verticale installatiebeelden, tuinconcepten, modeldetails en voor/na-projecten.",
  },
  {
    channel: "LinkedIn",
    cadence: "2 sterke posts per maand",
    role: "Zakelijk vertrouwen, partners, hospitality en projectmatige toepassingen.",
    formats: "Projectcases, technische expertise, serviceorganisatie en samenwerking met hoveniers of verblijfsconcepten.",
  },
];

const contentPillars = [
  { title: "Showroom & advies", text: "Wat ziet de klant, hoe verloopt een afspraak en waarom voorkomt persoonlijk advies een verkeerde keuze?" },
  { title: "Installatie & voorbereiding", text: "Toegang, fundering, kraanwerk, elektra, levering en oplevering stap voor stap zichtbaar maken." },
  { title: "Product & techniek", text: "Jets, zitindeling, bediening, isolatie en onderhoud helder uitleggen zonder een technische catalogus na te bouwen." },
  { title: "Echte klantproof", text: "Reviews, tuinfoto's, korte klantverhalen en gebruikservaringen met aantoonbare toestemming." },
  { title: "Energie & eigendom", text: "Werkelijke factoren achter verbruik, afdekking, temperatuur, plaatsing, onderhoud en levensduur." },
  { title: "Aftercare & service", text: "Onderhoud, storingen, waterkwaliteit, wintergebruik en bereikbaarheid als zichtbaar onderdeel van de aankoopwaarde." },
];

const roadmap = [
  {
    phase: "Fase 1 · 0–30 dagen",
    title: "Fundament en meting afronden",
    items: [
      "Earth Spas-accounts, prepaidkaart, billing en beheerders volledig inrichten.",
      "GA4, GTM, consent, Meta Pixel/CAPI en Google Ads-conversies correct testen.",
      "CRM-statussen vastleggen: nieuw, gekwalificeerd, afspraak, showroom, offerte, gewonnen of verloren.",
      "NL- en DE-landingspagina's controleren op taal, CTA, vertrouwen en mobiele conversie.",
    ],
  },
  {
    phase: "Fase 2 · 31–90 dagen",
    title: "Kleine gecontroleerde tests",
    items: [
      "Start Google Search op high-intent termen in NL en NRW.",
      "Gebruik Meta voor installatiecases, showroomproof en remarketing, niet als blind bereikskanon.",
      "Meet kosten per gekwalificeerde lead, afspraak, offerte en verkoop.",
      "Stop zwakke combinaties snel en documenteer waarom leads wel of niet verkopen.",
    ],
  },
  {
    phase: "Fase 3 · 3–6 maanden",
    title: "Winnaars opschalen",
    items: [
      "Verhoog alleen budget op zoekwoorden, doelgroepen en visuals met aantoonbare verkoopkwaliteit.",
      "Bouw lokale SEO-pagina's met unieke cases, route, reviews en installatiecontext.",
      "Automatiseer bevestiging, reminders, lead recovery en sales-taken.",
      "Maak een maanddashboard met spend, leads, afspraken, offertes, omzet en brutobijdrage.",
    ],
  },
  {
    phase: "Fase 4 · 6–12 maanden",
    title: "Nieuwe markten en schaal",
    items: [
      "Breid NRW gecontroleerd uit vanuit bewezen regio's en zoektermen.",
      "Activeer Luxemburg compact wanneer lokale pagina en opvolging gereed zijn.",
      "Start België pas met gescheiden NL- en FR-funnel en echte taalcapaciteit.",
      "Gebruik klantdata voor lookalikes, segmentatie en betere omzetvoorspellingen.",
    ],
  },
];

export default function StrategyPage() {
  const { state } = useSiteState();
  const model = calculateSiteModel(state);

  const scenarios = [
    {
      label: "Voorzichtig",
      cac: model.conservativeAcquisitionCost,
      sales: model.lowExtraSales,
      revenue: model.lowExtraRevenue,
      contribution: model.marketingContributionLow,
    },
    {
      label: "Werkbasis",
      cac: model.baseAcquisitionCost,
      sales: model.baseExtraSales,
      revenue: model.baseExtraRevenue,
      contribution: model.marketingContributionBase,
    },
    {
      label: "Sterk gemeten",
      cac: model.strongAcquisitionCost,
      sales: model.highExtraSales,
      revenue: model.highExtraRevenue,
      contribution: model.marketingContributionHigh,
    },
  ];

  const googleTestBudget = Math.round(model.adsMonthly * 0.6);
  const metaTestBudget = model.adsMonthly - googleTestBudget;

  return (
    <main>
      <PageIntro
        eyebrow="02 · merk- en groeistrategie"
        title="Positioneer Earth Spas als premium advies-, installatie- en servicepartner"
        text="De strategie is gebaseerd op de bestaande markt-, concurrentie-, SEO-, paid-media-, social-, tracking- en salesresearch voor Nederland, NRW, Luxemburg en België. De centrale keuze: niet concurreren als goedkope webshop, maar winnen met persoonlijk advies, showroomervaring, betrouwbare installatie en langdurige aftercare."
        accent="secondary"
        image="/earth-spas-collage-a-starry-lake-1920x1080.jpg"
        imageAlt="Premium Earth Spas in een sfeervolle buitenomgeving"
        actions={
          <>
            <PrimaryLink href="#groeiplan">Bekijk groeiplan</PrimaryLink>
            <PrimaryLink href="/calculator">Open budgetcalculator</PrimaryLink>
          </>
        }
      />

      <section className="section-block theme-primary">
        <div className="content-shell">
          <SectionHeader
            eyebrow="Merkpresentatie"
            title="Rustig premium, persoonlijk en aantoonbaar deskundig"
            text="Earth Spas moet geen schreeuwerig luxe-imago spelen en ook niet afzakken naar kortingstaal. De merkervaring moet voelen als een betrouwbare specialist die de klant helpt een kostbaar tuin- en wellnessproject goed uit te voeren."
          />
          <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {brandPillars.map(({ icon: Icon, title, text }) => (
              <Panel key={title} className="p-6">
                <span className="grid h-12 w-12 place-items-center rounded-[5px] border border-[var(--section-accent)]/40 bg-[color-mix(in_srgb,var(--section-accent)_9%,transparent)] text-[var(--section-accent)]">
                  <Icon className="h-6 w-6" weight="duotone" />
                </span>
                <h3 className="mt-5 text-xl uppercase text-[var(--section-accent)]">{title}</h3>
                <p className="mt-3 text-base leading-7 text-white/72">{text}</p>
              </Panel>
            ))}
          </div>
          <Panel className="mt-6 overflow-hidden p-0">
            <div className="grid lg:grid-cols-[.85fr_1.15fr]">
              <div className="p-6 sm:p-8">
                <p className="eyebrow">Positioneringszin</p>
                <blockquote className="mt-4 font-[family-name:var(--font-heading)] text-3xl uppercase leading-tight text-[var(--section-accent)] sm:text-4xl">
                  Premium spa's met persoonlijk advies, betrouwbare installatie en service die ook na de aankoop blijft bestaan.
                </blockquote>
                <p className="mt-5 text-base leading-7 text-white/66">Deze zin vormt de inhoudelijke toets voor website, advertenties, social content en verkoopgesprekken. Alles wat alleen over korting, voorraad of losse specificaties gaat, ondersteunt het merk onvoldoende.</p>
              </div>
              <img src="/earth-spas-special-features-1920x1080.jpg" alt="Detail van premium Earth Spas functies" className="min-h-72 h-full w-full object-cover" />
            </div>
          </Panel>
        </div>
      </section>

      <section className="section-block theme-secondary">
        <div className="content-shell">
          <SectionHeader
            eyebrow="Marktfocus"
            title="Eerst Nederland en NRW bewijzen, daarna pas breder uitbreiden"
            text="De markten verschillen sterk in omvang, taal en operationele afstand. Daarom krijgt niet ieder land tegelijk hetzelfde budget. Nederland en NRW hebben de beste combinatie van koopintentie, bereikbaarheid van Venlo en uitvoerbare salesopvolging."
          />
          <div className="mt-9 grid gap-4 lg:grid-cols-2">
            {marketFocus.map((item, index) => (
              <Panel key={item.market} className="p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-4xl text-[var(--section-accent)]">0{index + 1}</span>
                  <span className="rounded-full border border-[var(--section-accent)]/35 px-3 py-1 text-xs uppercase tracking-[.12em] text-[var(--section-accent)]">{item.priority}</span>
                </div>
                <h3 className="mt-5 text-2xl uppercase text-white">{item.market}</h3>
                <p className="mt-3 text-base leading-7 text-white/76"><strong className="font-normal text-[var(--section-accent)]">Focus:</strong> {item.focus}</p>
                <p className="mt-3 text-base leading-7 text-white/62"><strong className="font-normal text-white/82">Waarom:</strong> {item.why}</p>
              </Panel>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block theme-primary">
        <div className="content-shell">
          <SectionHeader
            eyebrow="SWOT-analyse"
            title="Waar Earth Spas voordeel heeft en waar eerst discipline nodig is"
            text="De groeikans is reëel, maar alleen wanneer merk, tracking, content en opvolging als één systeem worden behandeld. Losse advertenties boven op een half ingerichte funnel zijn slechts een bijzonder efficiënte manier om geld te laten verdwijnen."
          />
          <div className="mt-9 grid gap-4 lg:grid-cols-2">
            {swot.map((group) => (
              <Panel key={group.title} className={`p-6 sm:p-7 ${group.tone === "warning" ? "border-amber-300/25" : ""}`}>
                <div className="flex items-center gap-3">
                  {group.tone === "warning" ? <Warning className="h-7 w-7 text-amber-200" /> : <Check className="h-7 w-7 text-[var(--section-accent)]" />}
                  <h3 className="text-2xl uppercase text-white">{group.title}</h3>
                </div>
                <ul className="mt-5 space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-3 text-base leading-7 text-white/72">
                      <span className={`mt-2.5 h-2 w-2 shrink-0 rounded-full ${group.tone === "warning" ? "bg-amber-200" : "bg-[var(--section-accent)]"}`} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Panel>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block theme-secondary">
        <div className="content-shell">
          <SectionHeader
            eyebrow="Social media plan"
            title="Gebruik ieder kanaal voor een duidelijke functie"
            text="Social media moet niet bestaan uit willekeurige productfoto's met drie hashtags en hoop. Ieder kanaal krijgt een eigen rol binnen bereik, vertrouwen, uitleg, remarketing of zakelijke samenwerking."
          />
          <div className="mt-9 overflow-hidden rounded-[5px] border border-[var(--section-accent)]/35 bg-card">
            <div className="hidden grid-cols-[.75fr_.65fr_.95fr_1.4fr] gap-4 border-b border-border bg-white/[.025] px-5 py-3 text-xs uppercase tracking-[.12em] text-[var(--section-accent)] lg:grid">
              <span>Kanaal</span><span>Cadans</span><span>Functie</span><span>Formats</span>
            </div>
            {socialPlan.map((item) => (
              <div key={item.channel} className="grid gap-3 border-b border-border/70 px-5 py-5 last:border-0 lg:grid-cols-[.75fr_.65fr_.95fr_1.4fr] lg:items-start">
                <h3 className="text-lg text-white">{item.channel}</h3>
                <p className="text-sm leading-6 text-[var(--section-accent)]">{item.cadence}</p>
                <p className="text-sm leading-6 text-white/72">{item.role}</p>
                <p className="text-sm leading-6 text-white/58">{item.formats}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block theme-primary">
        <div className="content-shell">
          <SectionHeader
            eyebrow="Content- en visualplan"
            title="Laat echte projecten, expertise en zekerheid het verkoopwerk doen"
            text="De visuele stijl blijft donker, rustig en premium, maar de inhoud moet echt zijn: showroom, installatie, klanten, techniek en service. Stockbeelden mogen ondersteunen, maar mogen nooit het bewijs vervangen."
          />
          <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {contentPillars.map((item, index) => (
              <Panel key={item.title} className="p-6">
                <div className="flex items-center justify-between gap-4">
                  <Image className="h-7 w-7 text-[var(--section-accent)]" />
                  <span className="text-sm tracking-[.18em] text-white/34">0{index + 1}</span>
                </div>
                <h3 className="mt-5 text-xl uppercase text-[var(--section-accent)]">{item.title}</h3>
                <p className="mt-3 text-base leading-7 text-white/70">{item.text}</p>
              </Panel>
            ))}
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            <article className="group relative min-h-[25rem] overflow-hidden rounded-[5px] border border-white/12">
              <img src="/showroom-building.jpeg" alt="Earth Spas showroom" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-xs uppercase tracking-[.16em] text-[var(--section-accent)]">Voorbeeld · showroom</p>
                <h3 className="mt-2 text-3xl uppercase text-white">Kies niet vanaf een scherm. Ervaar het verschil.</h3>
                <p className="mt-3 text-sm leading-6 text-white/72">Video of carousel met route, modellen, adviseur en duidelijke afspraak-CTA.</p>
              </div>
            </article>
            <article className="group relative min-h-[25rem] overflow-hidden rounded-[5px] border border-white/12">
              <img src="/earth-spas-eco-smart-1920x1080.jpg" alt="Earth Spas energie-efficiënte techniek" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-xs uppercase tracking-[.16em] text-[var(--section-accent)]">Voorbeeld · eigendomskosten</p>
                <h3 className="mt-2 text-3xl uppercase text-white">Comfort begint bij een spa die bij uw gebruik past.</h3>
                <p className="mt-3 text-sm leading-6 text-white/72">Uitleg over isolatie, afdekking, temperatuur en onderhoud zonder niet-onderbouwde besparingsclaims.</p>
              </div>
            </article>
            <article className="group relative min-h-[25rem] overflow-hidden rounded-[5px] border border-white/12">
              <img src="/earth-spas-collage-b-glacier-1920x1080.jpg" alt="Earth Spas premium wellnessomgeving" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-xs uppercase tracking-[.16em] text-[var(--section-accent)]">Voorbeeld · service</p>
                <h3 className="mt-2 text-3xl uppercase text-white">Van eerste advies tot jarenlang zorgeloos gebruik.</h3>
                <p className="mt-3 text-sm leading-6 text-white/72">Klantcase waarin keuze, plaatsing, oplevering en aftercare samen worden verteld.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="groeiplan" className="section-block theme-secondary">
        <div className="content-shell">
          <SectionHeader
            eyebrow="Groeistrategie"
            title="Bouw eerst bewijs, schaal daarna alleen wat verkoopt"
            text="De strategie koppelt techniek, content, marketing en salesopvolging aan elkaar. Iedere fase heeft een duidelijke voorwaarde voordat extra budget wordt vrijgegeven."
          />
          <div className="mt-9 grid gap-4 lg:grid-cols-2">
            {roadmap.map((phase) => (
              <Panel key={phase.phase} className="p-6 sm:p-7">
                <p className="text-sm uppercase tracking-[.15em] text-[var(--section-accent)]">{phase.phase}</p>
                <h3 className="mt-3 text-2xl uppercase text-white">{phase.title}</h3>
                <ul className="mt-5 space-y-3">
                  {phase.items.map((item) => (
                    <li key={item} className="flex gap-3 text-base leading-7 text-white/70">
                      <ArrowRight className="mt-1.5 h-4 w-4 shrink-0 text-[var(--section-accent)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Panel>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block theme-primary">
        <div className="content-shell">
          <SectionHeader
            eyebrow="Budget naar omzet"
            title="Een transparante scenario-calculatie zonder verborgen groeifactoren"
            text="De berekening gebruikt alleen het actieve groeibudget voor extra verkopen. Vaste accounts en hosting tellen wel mee voor de totale break-even, maar worden niet behandeld alsof zij rechtstreeks klanten genereren. Zodra echte CRM-data beschikbaar is, vervangt de gemeten acquisitiekost deze planningsaannames."
          />

          <div className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Actief groeibudget" value={`${euro.format(model.growthBudgetMonthly)} p/m`} detail={`${euro.format(model.growthBudgetAnnual)} per jaar voor ads, content en acquisitieondersteuning`} />
            <StatCard label="Vaste digitale basis" value={`${euro.format(model.platformMonthly)} p/m`} detail="accounts, licenties, hosting en infrastructuur" />
            <StatCard label="Gemiddelde verkoopprijs" value={euro.format(model.averageSalePrice)} detail={`${number.format(model.currentUnitsYear)} verkopen uit ${euro.format(model.currentRevenue)} jaaromzet`} />
            <StatCard label="Totale break-even" value={`${number.format(model.breakEvenSales)} extra spa's`} detail="om alle externe jaarkosten uit brutobijdrage terug te verdienen" />
          </div>

          <Panel className="mt-6 overflow-hidden">
            <div className="border-b border-border p-5 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="eyebrow">Scenario's op blended acquisitiekosten</p>
                  <h3 className="mt-2 text-2xl uppercase text-[var(--section-accent)]">Van groeibudget naar extra omzet</h3>
                </div>
                <p className="max-w-xl text-sm leading-6 text-white/58">Voorzichtige planning: €{number.format(model.conservativeAcquisitionCost)} per extra verkoop. Werkbasis: €{number.format(model.baseAcquisitionCost)}. Sterk gemeten scenario: €{number.format(model.strongAcquisitionCost)}.</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                <thead className="bg-white/[.025] text-xs uppercase tracking-[.12em] text-white/58">
                  <tr>
                    <th className="px-5 py-3">Scenario</th>
                    <th className="px-5 py-3">Acquisitiekost</th>
                    <th className="px-5 py-3">Extra verkopen</th>
                    <th className="px-5 py-3">Extra omzet</th>
                    <th className="px-5 py-3">Bijdrage na groeibudget</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/70">
                  {scenarios.map((scenario, index) => (
                    <tr key={scenario.label} className={index === 1 ? "bg-[color-mix(in_srgb,var(--section-accent)_7%,transparent)]" : ""}>
                      <td className="px-5 py-4 text-white">{scenario.label}</td>
                      <td className="px-5 py-4 text-white/76">{euro.format(scenario.cac)}</td>
                      <td className="px-5 py-4 font-[family-name:var(--font-heading)] text-xl text-[var(--section-accent)]">{number.format(scenario.sales)}</td>
                      <td className="px-5 py-4 font-[family-name:var(--font-heading)] text-xl text-white">{euro.format(scenario.revenue)}</td>
                      <td className={`px-5 py-4 font-[family-name:var(--font-heading)] text-xl ${scenario.contribution >= 0 ? "text-[var(--section-accent)]" : "text-amber-200"}`}>{euro.format(scenario.contribution)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>

          <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_.9fr]">
            <Panel className="p-6 sm:p-7">
              <p className="eyebrow">Aanbevolen eerste advertentietest</p>
              <h3 className="mt-3 text-2xl uppercase text-white">Verdeel het huidige advertentiebudget over intentie en bewijs</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[5px] border border-[var(--section-accent)]/35 bg-black/15 p-5">
                  <p className="text-sm uppercase tracking-[.12em] text-white/48">Google Search · 60%</p>
                  <p className="mt-2 text-3xl text-[var(--section-accent)]">{euro.format(googleTestBudget)} p/m</p>
                  <p className="mt-3 text-sm leading-6 text-white/64">High-intent koop-, showroom-, model- en energietermen in Nederland en NRW.</p>
                </div>
                <div className="rounded-[5px] border border-[var(--section-accent)]/35 bg-black/15 p-5">
                  <p className="text-sm uppercase tracking-[.12em] text-white/48">Meta · 40%</p>
                  <p className="mt-2 text-3xl text-[var(--section-accent)]">{euro.format(metaTestBudget)} p/m</p>
                  <p className="mt-3 text-sm leading-6 text-white/64">Installatiecases, showroomproof en remarketing naar bezoekers die al interesse hebben getoond.</p>
                </div>
              </div>
            </Panel>
            <Panel className="p-6 sm:p-7">
              <Target className="h-8 w-8 text-[var(--section-accent)]" />
              <h3 className="mt-4 text-2xl uppercase text-white">Wanneer mag het budget omhoog?</h3>
              <ul className="mt-5 space-y-3 text-base leading-7 text-white/70">
                <li className="flex gap-3"><Check className="mt-1 h-5 w-5 shrink-0 text-[var(--section-accent)]" /><span>Conversies zijn technisch correct gemeten en aan CRM-statussen gekoppeld.</span></li>
                <li className="flex gap-3"><Check className="mt-1 h-5 w-5 shrink-0 text-[var(--section-accent)]" /><span>Leads blijken bereikbaar, passend bij regio en serieus genoeg voor advies of showroom.</span></li>
                <li className="flex gap-3"><Check className="mt-1 h-5 w-5 shrink-0 text-[var(--section-accent)]" /><span>De gemeten blended acquisitiekost blijft binnen de gekozen scenario-grens.</span></li>
                <li className="flex gap-3"><Check className="mt-1 h-5 w-5 shrink-0 text-[var(--section-accent)]" /><span>Salesopvolging kan extra volume snel genoeg verwerken.</span></li>
              </ul>
            </Panel>
          </div>

          <Panel className="mt-6 border-[var(--section-accent)]/40 bg-[color-mix(in_srgb,var(--section-accent)_7%,var(--card))] p-6 sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <MagicWand className="h-8 w-8 shrink-0 text-[var(--section-accent)]" />
              <div>
                <h3 className="text-2xl uppercase text-[var(--section-accent)]">Belangrijk: dit is een planningsmodel, geen omzetbelofte</h3>
                <p className="mt-3 max-w-6xl text-base leading-7 text-white/72">De research onderbouwt marktkeuze, koopintentie, content, kanalen en meetmethode, maar Earth Spas heeft nog geen volledige historische CRM-attributie waarmee de werkelijke cost per sale bewezen is. Daarom starten we met een conservatieve bandbreedte. Na de eerste 60–90 dagen worden de aannames vervangen door echte kosten per gekwalificeerde lead, showroomafspraak, offerte en gewonnen verkoop.</p>
              </div>
            </div>
          </Panel>
        </div>
      </section>

      <section className="section-block theme-secondary">
        <div className="content-shell grid gap-5 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <div>
            <p className="eyebrow">Onderzoeksbasis</p>
            <h2 className="mt-3 max-w-5xl text-3xl uppercase leading-tight sm:text-4xl">De strategie combineert dertien onderzoeksgebieden</h2>
            <p className="mt-4 max-w-4xl text-lg leading-8 text-white/72">Marktanalyses voor NL, NRW, Luxemburg en België, keyword- en SERP-onderzoek, concurrenten, lokale SEO, content/CRO, Google Ads, Meta/social, tracking, compliance en support/sales. België blijft een expliciete activeringsbeslissing; swim spa, webshop, prijzen en checkout blijven buiten Earth Spas V1.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <PrimaryLink href="/marketing">Naar marketinguitvoering</PrimaryLink>
              <PrimaryLink href="/checklist">Naar uitvoeringschecklist</PrimaryLink>
            </div>
          </div>
          <Panel className="p-6 sm:p-7">
            <Globe className="h-8 w-8 text-[var(--section-accent)]" />
            <h3 className="mt-4 text-2xl uppercase text-white">Beslissing in één zin</h3>
            <p className="mt-4 text-xl leading-8 text-white/76">Maak Earth Spas eerst aantoonbaar sterk in Nederland en NRW met premium advies, lokale showroomkracht, echte cases en meetbare salesopvolging. Breid pas daarna uit naar kleinere of complexere markten.</p>
            <div className="mt-6 flex items-center gap-3 border-t border-border pt-5 text-sm text-white/52">
              <RocketLaunch className="h-5 w-5 text-[var(--section-accent)]" />
              <span>Onderzoeksset bijgewerkt in april 2026 en verwerkt in deze strategie.</span>
            </div>
          </Panel>
        </div>
      </section>
    </main>
  );
}
