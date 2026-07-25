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
import { DevelopmentShowcase } from "@/components/development-showcase";
import { useSiteState } from "@/components/site-state";
import { calculateSiteModel } from "@/lib/site-model";
import { checklistItems, choiceGroups } from "@/lib/choice-data";
import { projectBaseline } from "@/lib/project-baseline";
import { getBusinessOwnerLabel, getBusinessTaskTitle } from "@/lib/presentation-copy";
import { euro, number } from "@/lib/utils";
import {
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
  { channel: "Website & GA4", metric: "9.742 gebeurtenissen", detail: "652 actieve gebruikers; directe en organische basis is meetbaar." },
  { channel: "Google organisch", metric: "321 sessies", detail: "Binnengekomen zonder structurele SEO-campagne of vaste contentproductie." },
  { channel: "Google-bedrijfsprofiel", metric: "504 interacties", detail: "5,0 uit 19 reviews; het sterkste bestaande social-proofkanaal." },
  { channel: "Meta websiteverkeer", metric: "9.013 vertoningen", detail: "7.008 uniek bereik en 287 landingspaginaweergaven voor €35,90." },
  { channel: "Meta lokaal bereik", metric: "14.206 vertoningen", detail: "10.874 mensen bereikt voor €15,90; €1,46 per 1.000 bereikte mensen." },
  { channel: "Pinterest", metric: "164 maandweergaven", detail: "Het profiel is ingericht, maar heeft nog geen structurele content- of groeiaanpak." },
  { channel: "LinkedIn", metric: "20 zoekvermeldingen", detail: "+233,3% in zeven dagen; de bedrijfspagina heeft momenteel 2 volgers." },
];

const pageCards = [
  { href: "/marketing", number: "02", title: "Marketingplan", text: "Strategie, doelgroepen, campagnes, budgetkeuzes, voorbeelden en groeiscenario's.", icon: MagicWand, image: "/cards/marketing-card.png" },
  { href: "/software", number: "03", title: "Softwareplan", text: "Infrastructuur, agents, CRM, support, automatiseringen, bouwtijd en marktwaarde.", icon: Code, image: "/cards/software-card.png" },
  { href: "/calculator", number: "04", title: "Keuzes & calculator", text: "Accounts, providers, budgetten en aannames in één totale berekening.", icon: FadersHorizontal, image: "/cards/calculator-card.png" },
  { href: "/checklist", number: "05", title: "Actielijst", text: "Alle noodzakelijke overdrachts-, beveiligings- en acceptatietaken in één overzicht.", icon: Check, image: "/cards/actielijst-card.png" },
];

const accountGroups = ["payment", "workspace", "passwords", "source", "dns", "server", "database", "frontend"];
const accountIcons = [CreditCard, Users, ShieldCheck, Code, Globe, Server, Database, Briefcase];

export default function HomePage() {
  const { state } = useSiteState();
  const model = calculateSiteModel(state);

  return (
    <main>
      <PageIntro
        eyebrow="01 · huidige stand van zaken"
        title="Project status, prestaties en aanbevolen vervolgstappen"
        text="Dit dashboard geeft een zakelijk overzicht van de bestaande digitale basis, geregistreerde projectinzet, kanaalprestaties en de voortgang van de noodzakelijke overdracht. Het vormt het vertrekpunt voor beslissingen over marketing, software en verdere groei."
        accent="secondary"
        image="/showroom-building.jpeg"
        imageAlt="Earth Spas showroom"
        imagePosition="center"
        actions={
          <>
            <PrimaryLink href="/marketing">Ga naar marketingplan</PrimaryLink>
            <PrimaryLink href="/checklist">Bekijk noodzakelijke actielijst</PrimaryLink>
          </>
        }
      />

      <section className="section-block theme-primary">
        <div className="content-shell">
          <SectionHeader
            eyebrow="Opgebouwde digitale basis"
            title="Software status en development uren per onderdeel"
            text="Dit overzicht toont uitsluitend aantoonbaar uitgevoerd werk. De onderdelen wisselen automatisch en laten per ontwikkelgebied zien wat is opgeleverd, hoeveel geregistreerde uren daarin zitten en welke groeikans daardoor beschikbaar is."
          />
          <DevelopmentShowcase />
        </div>
      </section>

      <section className="section-block theme-secondary">
        <div className="content-shell">
          <SectionHeader eyebrow="Resultaten tot nu toe" title="De bestaande basis levert aantoonbaar bereik, verkeer en vertrouwen" text="De cijfers hieronder zijn een momentopname uit GA4, Google, Meta, LinkedIn en Pinterest. Ze bewijzen nog geen directe verkopen uit advertenties, maar wel organische vraag, goedkoop websiteverkeer, lokaal bereik en sterke Google-social-proof." />

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
                <h3 className="text-xl uppercase text-[var(--section-accent)]">Zakelijke conclusie</h3>
                <p className="mt-2 text-base leading-7 text-white/78">Google en de website leveren momenteel de meeste aantoonbare waarde. Meta laat zien dat verkeer en lokaal bereik tegen lage kosten kunnen worden ingekocht. LinkedIn en Pinterest zijn technisch aanwezig, maar nog nauwelijks ontwikkeld. De ontbrekende schakel is volledige meting van advertentie naar lead, afspraak, offerte en verkoop.</p>
              </div>
            </div>
          </Panel>
        </div>
      </section>

      <section className="section-block theme-primary">
        <div className="content-shell">
          <SectionHeader eyebrow="Bestaande investering" title="Geregistreerde projectinzet en opgeleverde digitale basis" text="De aangeleverde uren- en plandocumenten brengen de totale geregistreerde inzet op circa 950 uur. De waarde hieronder is een bureauvergelijking en nadrukkelijk geen factuur of onderdeel van het operationele budget." />

          <div className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Totale geregistreerde inzet" value={`${number.format(projectBaseline.totalHours)} uur`} detail="analyse, ontwerp, ontwikkeling, content en integraties" />
            <StatCard label="Referentiewaarde" value={euro.format(projectBaseline.bureauEquivalent)} detail={`${euro.format(projectBaseline.referenceRate)} per uur als vaste vergelijking`} />
            <StatCard label="Eerder gedetailleerd overzicht" value={`${number.format(projectBaseline.breakdownSourceHours)} uur`} detail="verdeeld over acht hoofdonderdelen" />
            <StatCard label="Aanvullende uitwerking" value={`${number.format(projectBaseline.additionalHours)} uur`} detail="latere platform-, plan- en keuzehulpontwikkeling" />
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_.85fr]">
            <Panel className="overflow-hidden">
              <div className="border-b border-border p-5 sm:p-6">
                <p className="eyebrow">Urenverdeling</p>
                <h3 className="mt-2 text-2xl uppercase text-[var(--section-accent)]">Wat aantoonbaar is opgebouwd</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                  <thead className="bg-white/[.025] text-xs uppercase tracking-[0.12em] text-white/68">
                    <tr><th className="px-5 py-3">Onderdeel</th><th className="px-5 py-3">Uren</th><th className="px-5 py-3">Opgeleverde waarde</th></tr>
                  </thead>
                  <tbody className="divide-y divide-border/70">
                    {projectBaseline.breakdown.map((item) => (
                      <tr key={item.category}>
                        <td className="px-5 py-3 text-white">{item.category}</td>
                        <td className="px-5 py-3 font-[family-name:var(--font-heading)] text-lg text-[var(--section-accent)]">{item.hours}</td>
                        <td className="px-5 py-3 leading-6 text-white/68">{item.result}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="border-t border-border px-5 py-4 text-sm leading-6 text-white/55">De detailverdeling is gebaseerd op het eerdere urenoverzicht van 840 uur. Latere documenten vermelden circa 950 uur totaal; het verschil is afzonderlijk opgenomen als aanvullende platform- en planuitwerking.</p>
            </Panel>

            <div className="space-y-6">
              <Panel className="overflow-hidden">
                <div className="border-b border-border p-5 sm:p-6"><p className="eyebrow">Opgeleverde basis</p><h3 className="mt-2 text-2xl uppercase text-[var(--section-accent)]">Zeven bestaande fundamenten</h3></div>
                <div className="divide-y divide-border/70">
                  {projectBaseline.foundation.map((item) => (
                    <div key={item.title} className="px-5 py-4">
                      <p className="text-base text-white">{item.title}</p>
                      <p className="mt-1 text-sm leading-6 text-white/62">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </Panel>

              <Panel className="p-6 sm:p-8">
                <div className="flex items-end justify-between gap-4">
                  <div><p className="text-sm uppercase tracking-[0.13em] text-white/55">Overdrachtsvoortgang</p><p className="mt-2 text-3xl text-[var(--section-accent)]">{model.checklistProgress}%</p></div>
                  <p className="text-right text-base text-white/65">{model.completedTasks} van {checklistItems.length}<br />acties afgerond</p>
                </div>
                <div className="mt-5"><ProgressBar value={model.checklistProgress} /></div>
                <div className="mt-6 space-y-3">
                  {checklistItems.filter((item) => item.priority === "Nu").slice(0, 5).map((item) => (
                    <div key={item.id} className="flex items-start gap-3 border-t border-border/70 pt-3 first:border-0 first:pt-0">
                      <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-sm border ${state.checklist[item.id] ? "border-[var(--section-accent)] bg-[var(--section-accent)] text-primary-foreground" : "border-white/35"}`}>
                        {state.checklist[item.id] && <Check className="h-3.5 w-3.5" />}
                      </span>
                      <div><p className="text-base text-white">{getBusinessTaskTitle(item)}</p><p className="mt-1 text-sm text-white/52">{getBusinessOwnerLabel(item.owner)}</p></div>
                    </div>
                  ))}
                </div>
                <div className="mt-6"><PrimaryLink href="/checklist">Open volledige actielijst</PrimaryLink></div>
              </Panel>
            </div>
          </div>
        </div>
      </section>

      <section className="section-block theme-secondary">
        <div className="content-shell">
          <SectionHeader eyebrow="Accounts en providers" title="De huidige geselecteerde digitale stack" text="Iedere categorie kan in de calculator worden gewijzigd. Dit overzicht toont de actuele selectie, de bijbehorende maandkosten en de status van de noodzakelijke overdracht." />
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
          <SectionHeader eyebrow="Verder in dit plan" title="Vier pagina's met ieder één duidelijke functie" text="De informatie is verdeeld over afzonderlijke onderdelen voor strategie, techniek, financiële keuzes en noodzakelijke uitvoering. Daardoor blijft iedere beslissing snel terug te vinden." />
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
        Earth Spas digitale keuzehulp · scenario's zijn indicatief · interne ontwikkeltijd staat buiten het operationele budget
      </footer>
    </main>
  );
}
