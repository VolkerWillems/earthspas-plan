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

const performanceSummary = [
  { value: "652", label: "actieve websitegebruikers", detail: "GA4, 1 januari tot 24 juli 2026" },
  { value: "321", label: "organische Google-sessies", detail: "zonder structurele SEO-campagne" },
  { value: "287", label: "landingspaginaweergaven", detail: "uit €35,90 aan eerste Meta-tests" },
  { value: "€0,13", label: "gemiddeld per landingspaginaweergave", detail: "over alle websiteverkeer-tests samen" },
  { value: "10.874", label: "lokaal bereik", detail: "uit €15,90 promotiebudget" },
  { value: "5,0", label: "Google-score", detail: "19 reviews en 504 klantinteracties" },
];

const paidAdVariants = [
  { name: "Variant 4", landingViews: 169, costPerView: "€0,11", spend: "€18,05", impressions: "5.091" },
  { name: "Variant 1", landingViews: 68, costPerView: "€0,15", spend: "€10,42", impressions: "2.523" },
  { name: "Variant 3", landingViews: 32, costPerView: "€0,13", spend: "€4,30", impressions: "815" },
  { name: "Variant 6", landingViews: 16, costPerView: "€0,15", spend: "€2,34", impressions: "486" },
  { name: "Variant 2", landingViews: 2, costPerView: "€0,39", spend: "€0,77", impressions: "97" },
];

const channelResults = [
  { channel: "Website & GA4", metric: "9.742 gebeurtenissen", detail: "652 actieve gebruikers; directe en organische basis is al meetbaar." },
  { channel: "Google organisch", metric: "321 sessies", detail: "Binnengekomen zonder structurele SEO-campagne of vaste contentproductie." },
  { channel: "Google-bedrijfsprofiel", metric: "504 interacties", detail: "5,0 uit 19 reviews; sterkste bestaande social-proofkanaal." },
  { channel: "Meta websiteverkeer", metric: "9.013 vertoningen", detail: "7.008 uniek bereik en 287 landingspaginaweergaven voor €35,90." },
  { channel: "Meta lokaal bereik", metric: "14.206 vertoningen", detail: "10.874 mensen bereikt voor €15,90; €1,46 per 1.000 bereikte mensen." },
  { channel: "Pinterest", metric: "164 maandweergaven", detail: "Profiel staat klaar, maar heeft nog 0 volgers en vrijwel geen structurele inzet gehad." },
  { channel: "LinkedIn", metric: "20 zoekvermeldingen", detail: "+233,3% in zeven dagen; bedrijfspagina heeft momenteel 2 volgers." },
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
          <SectionHeader eyebrow="Resultaten tot nu toe" title="De bestaande basis presteert beter dan een paar losse screenshots doen vermoeden" text="De cijfers hieronder zijn een momentopname uit GA4, Google, Meta, LinkedIn en Pinterest. Ze bewijzen nog geen verkochte spa's uit advertenties, maar wel organische vraag, goedkoop websiteverkeer, lokaal bereik en sterke Google-social-proof." />

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {performanceSummary.map((item) => (
              <Panel key={item.label} className="p-5 sm:p-6">
                <p className="font-[family-name:var(--font-heading)] text-4xl text-[var(--section-accent)]">{item.value}</p>
                <h3 className="mt-3 text-lg uppercase text-white">{item.label}</h3>
                <p className="mt-2 text-sm leading-6 text-white/68">{item.detail}</p>
              </Panel>
            ))}
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[1.08fr_.92fr]">
            <Panel className="overflow-hidden">
              <div className="border-b border-border p-5 sm:p-6">
                <p className="eyebrow">Meta websiteverkeer-test</p>
                <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h3 className="text-2xl uppercase text-[var(--section-accent)]">€35,90 leverde 287 landingspaginaweergaven op</h3>
                    <p className="mt-2 max-w-3xl text-base leading-7 text-white/72">De campagne kwam uit op 9.013 vertoningen, 7.008 uniek bereik en gemiddeld €0,13 per landingspaginaweergave.</p>
                  </div>
                  <div className="shrink-0 rounded-[5px] border border-[var(--section-accent)]/45 bg-[color-mix(in_srgb,var(--section-accent)_9%,transparent)] px-4 py-3 text-right">
                    <p className="text-xs uppercase tracking-[0.13em] text-white/58">beste variant</p>
                    <p className="mt-1 font-[family-name:var(--font-heading)] text-3xl text-[var(--section-accent)]">€0,11</p>
                    <p className="text-sm text-white/68">per landing</p>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[650px] border-collapse text-left text-sm">
                  <thead className="bg-white/[.025] text-xs uppercase tracking-[0.12em] text-white/68">
                    <tr>
                      <th className="px-5 py-3">Advertentie</th>
                      <th className="px-5 py-3">Landingspagina</th>
                      <th className="px-5 py-3">Kosten per view</th>
                      <th className="px-5 py-3">Besteed</th>
                      <th className="px-5 py-3">Vertoningen</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/70">
                    {paidAdVariants.map((item, index) => (
                      <tr key={item.name} className={index === 0 ? "bg-[color-mix(in_srgb,var(--section-accent)_8%,transparent)]" : ""}>
                        <td className="px-5 py-3 text-white">{item.name}{index === 0 && <span className="ml-2 text-xs uppercase tracking-[0.1em] text-[var(--section-accent)]">beste</span>}</td>
                        <td className="px-5 py-3 font-[family-name:var(--font-heading)] text-lg text-white">{item.landingViews}</td>
                        <td className="px-5 py-3 font-[family-name:var(--font-heading)] text-lg text-[var(--section-accent)]">{item.costPerView}</td>
                        <td className="px-5 py-3 text-white/88">{item.spend}</td>
                        <td className="px-5 py-3 text-white/88">{item.impressions}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Panel>

            <div className="space-y-4">
              <Panel className="p-5 sm:p-6">
                <p className="eyebrow">Lokale bereikcampagne</p>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-2">
                  <div><p className="font-[family-name:var(--font-heading)] text-3xl text-[var(--section-accent)]">10.874</p><p className="mt-1 text-sm text-white/65">bereikte mensen</p></div>
                  <div><p className="font-[family-name:var(--font-heading)] text-3xl text-[var(--section-accent)]">14.206</p><p className="mt-1 text-sm text-white/65">vertoningen</p></div>
                  <div><p className="font-[family-name:var(--font-heading)] text-3xl text-[var(--section-accent)]">€15,90</p><p className="mt-1 text-sm text-white/65">totaal besteed</p></div>
                  <div><p className="font-[family-name:var(--font-heading)] text-3xl text-[var(--section-accent)]">€1,46</p><p className="mt-1 text-sm text-white/65">per 1.000 bereikt</p></div>
                </div>
              </Panel>

              <Panel className="overflow-hidden">
                <div className="border-b border-border p-5 sm:p-6">
                  <p className="eyebrow">Kanaaloverzicht</p>
                  <h3 className="mt-2 text-2xl uppercase text-[var(--section-accent)]">Organische basis en socialprofielen</h3>
                </div>
                <div className="divide-y divide-border/70">
                  {channelResults.map((item) => (
                    <div key={item.channel} className="grid gap-2 px-5 py-4 sm:grid-cols-[.8fr_1fr] sm:items-start">
                      <div>
                        <p className="text-base text-white">{item.channel}</p>
                        <p className="mt-1 font-[family-name:var(--font-heading)] text-xl text-[var(--section-accent)]">{item.metric}</p>
                      </div>
                      <p className="text-sm leading-6 text-white/68">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </Panel>
            </div>
          </div>

          <Panel className="mt-6 border-[var(--section-accent)]/45 bg-[color-mix(in_srgb,var(--section-accent)_7%,var(--card))] p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <ChartBar className="mt-1 h-7 w-7 shrink-0 text-[var(--section-accent)]" />
              <div>
                <h3 className="text-xl uppercase text-[var(--section-accent)]">Eerlijke conclusie</h3>
                <p className="mt-2 text-base leading-7 text-white/78">Google en de website leveren nu de meeste aantoonbare waarde. Meta toont dat verkeer en lokaal bereik goedkoop ingekocht kunnen worden. LinkedIn en Pinterest zijn technisch aanwezig, maar nog nauwelijks ontwikkeld. De ontbrekende schakel is volledige meting van advertentie naar lead, afspraak, offerte en verkoop.</p>
              </div>
            </div>
          </Panel>
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
                <div className="rounded-[5px] border border-[var(--section-accent)]/45 bg-[color-mix(in_srgb,var(--section-accent)_8%,transparent)] p-4">
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
                    <div className="grid h-10 w-10 place-items-center rounded-[5px] border border-[var(--section-accent)]/35 bg-[color-mix(in_srgb,var(--section-accent)_8%,transparent)] text-[var(--section-accent)]"><Icon className="h-5 w-5" /></div>
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
                      <div className="grid h-12 w-12 place-items-center rounded-[5px] border border-[var(--section-accent)]/40 bg-[color-mix(in_srgb,var(--section-accent)_8%,transparent)] text-[var(--section-accent)]"><Icon className="h-6 w-6" /></div>
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
