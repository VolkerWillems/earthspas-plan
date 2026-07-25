"use client";

import Link from "next/link";
import {
  Briefcase,
  ChartBar,
  Check,
  Code,
  CreditCard,
  Database,
  FadersHorizontal,
  Globe,
  MagicWand,
  Server,
  ShieldCheck,
  Users,
} from "@/lib/phosphor-icons";
import { useSiteState } from "@/components/site-state";
import { calculateSiteModel } from "@/lib/site-model";
import { checklistItems, choiceGroups } from "@/lib/choice-data";
import { euro, number } from "@/lib/utils";
import {
  NumberField,
  PageIntro,
  Panel,
  PrimaryLink,
  ProgressBar,
  SectionHeader,
  StatCard,
} from "@/components/plan-ui";

const performance = [
  { value: "652", label: "actieve gebruikers", detail: "GA4, 1 januari tot 24 juli 2026" },
  { value: "321", label: "organische Google-sessies", detail: "zonder structurele SEO-campagne" },
  { value: "€0,13", label: "per landingspaginaweergave", detail: "eerste kleine Meta-test" },
  { value: "10.874", label: "lokaal bereik", detail: "uit €15,90 advertentiebudget" },
  { value: "504", label: "Google-klantinteracties", detail: "via het bedrijfsprofiel" },
  { value: "5,0", label: "Google-score", detail: "op basis van 19 reviews" },
];

const pageCards = [
  { href: "/marketing", number: "02", title: "Marketingplan", text: "Strategie, doelgroepen, campagnes, budgetkeuzes, voorbeelden en groeiscenario's.", icon: MagicWand, image: "/earth-spas-collage-a-starry-lake-1920x1080.jpg" },
  { href: "/software", number: "03", title: "Softwareplan", text: "Infrastructuur, agents, CRM, support, automatiseringen, bouwtijd en marktwaarde.", icon: Code, image: "/earth-spas-eco-smart-1920x1080.jpg" },
  { href: "/calculator", number: "04", title: "Keuzes & calculator", text: "Alle accounts, providers, budgetten en aannames in één totale berekening.", icon: FadersHorizontal, image: "/earth-spas-special-features-1920x1080.jpg" },
  { href: "/checklist", number: "05", title: "Actielijst", text: "Alles wat ongeacht de overige plannen snel geregeld, overgezet en getest moet worden.", icon: Check, image: "/earth-spas-collage-b-glacier-1920x1080.jpg" },
];

const accountGroups = ["payment", "workspace", "passwords", "source", "dns", "server", "database", "frontend"];
const accountIcons = [CreditCard, Users, ShieldCheck, Code, Globe, Server, Database, Briefcase];

export default function HomePage() {
  const { state, setState } = useSiteState();
  const model = calculateSiteModel(state);

  const updateWorkedHours = (key: keyof typeof state.workedHours, value: number) => {
    setState((previous) => ({
      ...previous,
      workedHours: { ...previous.workedHours, [key]: value },
    }));
  };

  return (
    <main>
      <PageIntro
        eyebrow="01 · huidige stand van zaken"
        title="Wat staat er al, wat is bereikt en wat moet nu worden overgedragen?"
        text="Dit dashboard geeft Jeroen eerst het eerlijke vertrekpunt: bestaande prestaties, gewerkte uren, gekozen accounts, vaste kosten en de voortgang van de noodzakelijke overdracht. Daarna pas komen marketingdromen en softwarekastelen. Een zeldzame aanval van logische volgorde."
        accent="secondary"
        image="/showroom-building.jpeg"
        imageAlt="Earth Spas showroom"
        imagePosition="center"
        actions={
          <>
            <PrimaryLink href="/marketing">Ga naar marketingplan</PrimaryLink>
            <PrimaryLink href="/checklist">Bekijk urgente actielijst</PrimaryLink>
          </>
        }
      />

      <section className="section-block theme-primary">
        <div className="content-shell">
          <SectionHeader eyebrow="Kernoverzicht" title="De digitale basis in zes cijfers" text="De huidige omzet is zonder structurele marketing gegenereerd. De onderstaande bedragen zijn daarom geen vervanging van bestaande verkoop, maar het vertrekpunt voor extra groei en professioneel eigenaarschap." />
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            <StatCard label="Huidige omzet" value={euro.format(model.currentRevenue)} detail={`${number.format(model.currentUnitsYear)} spa's per jaar`} />
            <StatCard label="Tools & accounts" value={`${euro.format(model.platformMonthly)} p/m`} detail="op basis van huidige keuzes" />
            <StatCard label="Totaal extern budget" value={`${euro.format(model.totalMonthly)} p/m`} detail={`${euro.format(model.annualOperating)} per jaar`} />
            <StatCard label="Gewerkte uren" value={number.format(model.totalWorkedHours)} detail="zelf in te vullen, niet doorberekend" />
            <StatCard label="Acties afgerond" value={`${model.completedTasks}/${checklistItems.length}`} detail={`${model.checklistProgress}% gereed`} />
            <StatCard label="Geselecteerde bouw" value={`${model.selectedFeatures.length}`} detail="softwareonderdelen" />
          </div>
        </div>
      </section>

      <section className="section-block theme-secondary">
        <div className="content-shell">
          <SectionHeader eyebrow="Resultaten tot nu toe" title="Er is al genoeg bewijs dat de basis werkt" text="Geen van deze cijfers bewijst direct verkochte spa's uit advertenties. Ze bewijzen wel organische vindbaarheid, lokale interesse, een bruikbaar Google-profiel en opvallend goedkoop websiteverkeer." />
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {performance.map((item) => (
              <Panel key={item.label} className="p-5 sm:p-6">
                <p className="text-4xl text-[var(--section-accent)]">{item.value}</p>
                <h3 className="mt-3 text-xl uppercase text-white">{item.label}</h3>
                <p className="mt-2 text-base leading-6 text-white/65">{item.detail}</p>
              </Panel>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block theme-primary">
        <div className="content-shell grid gap-8 xl:grid-cols-[1fr_.9fr]">
          <div>
            <SectionHeader eyebrow="Gewerkte uren" title="Maak zichtbaar wat al is opgebouwd" text="De uren worden bewust niet financieel gewaardeerd. Vul alleen de werkelijk bestede tijd per categorie in. Zo ziet Jeroen de omvang zonder dat deze keuzehulp ineens een factuur vermomd als vriendschapsdocument wordt." />
            <Panel className="mt-8 p-6 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <NumberField label="Website & contentstructuur" value={state.workedHours.website} onChange={(value) => updateWorkedHours("website", value)} suffix="uur" />
                <NumberField label="Content & media" value={state.workedHours.content} onChange={(value) => updateWorkedHours("content", value)} suffix="uur" />
                <NumberField label="Marketing & analytics" value={state.workedHours.marketing} onChange={(value) => updateWorkedHours("marketing", value)} suffix="uur" />
                <NumberField label="Agents & automatisering" value={state.workedHours.automation} onChange={(value) => updateWorkedHours("automation", value)} suffix="uur" />
                <NumberField label="Accounts & infrastructuur" value={state.workedHours.infrastructure} onChange={(value) => updateWorkedHours("infrastructure", value)} suffix="uur" />
                <div className="rounded-md border border-[var(--section-accent)]/45 bg-[color-mix(in_srgb,var(--section-accent)_8%,transparent)] p-4">
                  <p className="text-sm uppercase tracking-[0.13em] text-white/55">Totaal geregistreerd</p>
                  <p className="mt-2 text-4xl text-[var(--section-accent)]">{number.format(model.totalWorkedHours)} uur</p>
                </div>
              </div>
            </Panel>
          </div>

          <div>
            <SectionHeader eyebrow="Overdracht" title="Noodzakelijke acties lopen los van groeiplannen" text="Accounts, betaalmethoden, toegang, back-ups en eigenaarschap moeten hoe dan ook geregeld worden. Zelfs wanneer er voorlopig nul euro naar advertenties of nieuwe software gaat." />
            <Panel className="mt-8 p-6 sm:p-8">
              <div className="flex items-end justify-between gap-4">
                <div><p className="text-sm uppercase tracking-[0.13em] text-white/55">Voortgang</p><p className="mt-2 text-3xl text-[var(--section-accent)]">{model.checklistProgress}%</p></div>
                <p className="text-right text-base text-white/65">{model.completedTasks} van {checklistItems.length}<br />acties afgerond</p>
              </div>
              <div className="mt-5"><ProgressBar value={model.checklistProgress} /></div>
              <div className="mt-6 space-y-3">
                {checklistItems.filter((item) => item.priority === "Nu").slice(0, 5).map((item) => (
                  <div key={item.id} className="flex items-start gap-3 border-t border-border/70 pt-3 first:border-0 first:pt-0">
                    <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-sm border ${state.checklist[item.id] ? "border-[var(--section-accent)] bg-[var(--section-accent)] text-primary-foreground" : "border-white/35"}`}>
                      {state.checklist[item.id] && <Check className="h-3.5 w-3.5" />}
                    </span>
                    <div><p className="text-base text-white">{item.title}</p><p className="mt-1 text-sm text-white/52">{item.owner}</p></div>
                  </div>
                ))}
              </div>
              <div className="mt-6"><PrimaryLink href="/checklist">Open volledige actielijst</PrimaryLink></div>
            </Panel>
          </div>
        </div>
      </section>

      <section className="section-block theme-secondary">
        <div className="content-shell">
          <SectionHeader eyebrow="Accounts en providers" title="De huidige gekozen digitale stack" text="Dit is geen definitieve verplichting. Iedere categorie kan in de calculator worden gewijzigd. Het overzicht laat alleen zien wat nu geselecteerd staat en of de bijbehorende overdracht al is afgerond." />
          <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {accountGroups.map((groupId, index) => {
              const group = choiceGroups.find((item) => item.id === groupId)!;
              const selected = group.options.find((option) => option.id === state.toolChoices[groupId]) ?? group.options[0];
              const relatedTask = checklistItems.find((item) => item.choiceGroupId === groupId);
              const completed = relatedTask ? state.checklist[relatedTask.id] : false;
              const Icon = accountIcons[index];
              return (
                <Panel key={groupId} className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-md border border-[var(--section-accent)]/35 bg-[color-mix(in_srgb,var(--section-accent)_8%,transparent)] text-[var(--section-accent)]"><Icon className="h-5 w-5" /></div>
                    <span className={`rounded-full border px-2 py-1 text-xs uppercase tracking-[0.1em] ${completed ? "border-[var(--section-accent)]/45 bg-[color-mix(in_srgb,var(--section-accent)_10%,transparent)] text-[var(--section-accent)]" : "border-white/15 text-white/48"}`}>{completed ? "geregeld" : "te regelen"}</span>
                  </div>
                  <p className="mt-4 text-sm uppercase tracking-[0.13em] text-white/48">{group.title}</p>
                  <h3 className="mt-2 text-lg text-white">{selected.name}</h3>
                  <p className="mt-3 text-base text-[var(--section-accent)]">{selected.monthly === 0 ? "€0 per maand" : `${euro.format(selected.monthly)} per maand`}</p>
                </Panel>
              );
            })}
          </div>
          <div className="mt-7"><PrimaryLink href="/calculator">Pas account- en providerkeuzes aan</PrimaryLink></div>
        </div>
      </section>

      <section className="section-block theme-primary">
        <div className="content-shell">
          <SectionHeader eyebrow="Verder in dit plan" title="Vier pagina's, ieder met één duidelijke taak" text="De informatie is opgesplitst zodat Jeroen niet meer door een digitaal telefoonboek hoeft te scrollen om één keuze terug te vinden." />
          <div className="mt-9 grid gap-5 lg:grid-cols-2">
            {pageCards.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href} className="panel group block overflow-hidden transition hover:-translate-y-0.5 hover:border-[var(--section-accent)]/70">
                  <div className="plan-card-image"><img src={item.image} alt="" /></div>
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-5">
                      <div className="grid h-12 w-12 place-items-center rounded-md border border-[var(--section-accent)]/40 bg-[color-mix(in_srgb,var(--section-accent)_8%,transparent)] text-[var(--section-accent)]"><Icon className="h-6 w-6" /></div>
                      <span className="text-sm tracking-[0.18em] text-white/38">{item.number}</span>
                    </div>
                    <h3 className="mt-6 text-2xl uppercase text-[var(--section-accent)]">{item.title}</h3>
                    <p className="mt-3 text-lg leading-8 text-white/72">{item.text}</p>
                    <p className="mt-6 text-sm uppercase tracking-[0.14em] text-white/58 group-hover:text-[var(--section-accent)]">Open pagina →</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-10 text-center text-sm text-white/45">
        Earth Spas digitale keuzehulp · scenario's zijn indicatief · bouwkosten van Volker staan buiten het budget
      </footer>
    </main>
  );
}
