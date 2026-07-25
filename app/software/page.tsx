"use client";

import * as React from "react";
import {
  Briefcase,
  CalendarBlank,
  CaretRight,
  Check,
  Database,
  FlowArrow,
  Robot,
  Server,
  ShieldCheck,
  Users,
} from "@/lib/phosphor-icons";
import { useSiteState } from "@/components/site-state";
import { calculateSiteModel } from "@/lib/site-model";
import { choiceGroups, features } from "@/lib/choice-data";
import { getBusinessOptionDescription } from "@/lib/presentation-copy";
import { softwareAlternativeGuidance, softwareGroupGuidance } from "@/lib/software-choice-guidance";
import { euro } from "@/lib/utils";
import {
  PageIntro,
  Panel,
  PrimaryLink,
  SectionHeader,
  StatCard,
} from "@/components/plan-ui";

const phases = [
  { number: "01", title: "Eigenaarschap en basis", text: "Accounts, betaalmethoden, toegang, server, back-ups, secrets en duidelijke beheerders.", items: ["payment", "passwords", "source", "dns", "server", "secrets"] },
  { number: "02", title: "Data en commerciële kern", text: "Directus, database, formulieren, CRM, afspraken, leadbronnen en verkoopstatussen.", items: ["cms", "database", "transactional-email", "frontend"] },
  { number: "03", title: "Automatisering en agents", text: "n8n, AI Spa Advisor, lead recovery, contentagent, supportagent en menselijke escalatie.", items: ["automation", "ai-workspace", "coding-ai"] },
  { number: "04", title: "Optimalisatie en schaal", text: "Attribution, dashboards, voice, mobiele installatiecapture en campagne-automatisering.", items: ["design", "social-content", "stock", "voice", "video-ai"] },
];

export default function SoftwarePage() {
  const { state, setState } = useSiteState();
  const model = calculateSiteModel(state);
  const [expandedGroups, setExpandedGroups] = React.useState<Record<string, boolean>>({});

  const selectOption = (groupId: string, optionId: string) => {
    setState((previous) => ({ ...previous, toolChoices: { ...previous.toolChoices, [groupId]: optionId } }));
  };

  const toggleFeature = (featureId: string) => {
    setState((previous) => ({ ...previous, featureSelections: { ...previous.featureSelections, [featureId]: !previous.featureSelections[featureId] } }));
  };

  const toggleAlternatives = (groupId: string, currentValue: boolean) => {
    setExpandedGroups((previous) => ({ ...previous, [groupId]: !currentValue }));
  };

  return (
    <main>
      <PageIntro
        eyebrow="03 · softwareplan"
        title="Eerst een zelfstandige digitale basis, daarna slimme automatisering"
        text="Het softwareplan bestaat uit twee lagen: accounts en infrastructuur die aantoonbaar onder Earth Spas vallen, en commerciële functies die daarop modulair kunnen worden gebouwd. Betrouwbare data, eigenaarschap en herstelbaarheid vormen de noodzakelijke basis voor verantwoord gebruik van agents en automatiseringen."
        accent="secondary"
        image="/earth-spas-eco-smart-1920x1080.jpg"
        imageAlt="Earth Spas techniek en duurzame spa-opbouw"
        actions={<><PrimaryLink href="/calculator">Open volledige calculator</PrimaryLink><PrimaryLink href="/checklist">Bekijk overdrachtstaken</PrimaryLink></>}
      />

      <section className="section-block theme-primary">
        <div className="content-shell">
          <SectionHeader eyebrow="Architectuur" title="De aanbevolen technische opbouw" text="De voorkeursarchitectuur gebruikt een eigen productieserver voor Directus, n8n, agents en backendservices, met Vercel als frontendlaag. Database en storage kunnen beheerd of self-hosted worden, zolang back-ups, eigenaarschap en toegangsbeheer aantoonbaar zijn ingericht." />
          <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Panel className="p-6"><Server className="h-7 w-7 text-[var(--section-accent)]" /><h3 className="mt-4 text-xl uppercase text-[var(--section-accent)]">Eigen kernserver</h3><p className="mt-3 leading-7 text-white/70">Directus, n8n, agents, monitoring en backend draaien onder Earth Spas-eigendom.</p></Panel>
            <Panel className="p-6"><Database className="h-7 w-7 text-[var(--section-accent)]" /><h3 className="mt-4 text-xl uppercase text-[var(--section-accent)]">Eén gegevensbron</h3><p className="mt-3 leading-7 text-white/70">Producten, content, leads, afspraken en supportinformatie worden centraal beheerd en hergebruikt.</p></Panel>
            <Panel className="p-6"><ShieldCheck className="h-7 w-7 text-[var(--section-accent)]" /><h3 className="mt-4 text-xl uppercase text-[var(--section-accent)]">Overdraagbare toegang</h3><p className="mt-3 leading-7 text-white/70">Minimaal twee beheerders, centrale secrets, herstelcodes en zakelijke betaalroutes beperken operationeel risico.</p></Panel>
            <Panel className="p-6"><FlowArrow className="h-7 w-7 text-[var(--section-accent)]" /><h3 className="mt-4 text-xl uppercase text-[var(--section-accent)]">Modulaire automatisering</h3><p className="mt-3 leading-7 text-white/70">Workflows en agents worden als losse modules opgebouwd en kunnen zonder volledige herbouw worden uitgebreid.</p></Panel>
          </div>
        </div>
      </section>

      <section className="section-block theme-secondary">
        <div className="content-shell">
          <SectionHeader eyebrow="Fasering" title="Vier bouwfasen met duidelijke afhankelijkheden" text="Niet ieder onderdeel hoeft gelijktijdig te worden uitgevoerd. De fasering voorkomt dat geavanceerde agents of rapportages worden ontwikkeld voordat gegevensbronnen, processen en eigenaarschap betrouwbaar zijn ingericht." />
          <div className="mt-9 grid gap-4 lg:grid-cols-2">
            {phases.map((phase) => (
              <Panel key={phase.number} className="p-6">
                <div className="flex items-start justify-between gap-5"><span className="text-4xl text-[var(--section-accent)]">{phase.number}</span><span className="rounded-[5px] border border-[var(--section-accent)]/35 px-3 py-1 text-sm text-[var(--section-accent)]">{phase.items.length} keuzes</span></div>
                <h3 className="mt-5 text-2xl uppercase text-[var(--section-accent)]">{phase.title}</h3>
                <p className="mt-3 text-lg leading-8 text-white/72">{phase.text}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {phase.items.map((groupId) => {
                    const group = choiceGroups.find((item) => item.id === groupId)!;
                    const selected = group.options.find((option) => option.id === state.toolChoices[groupId]) ?? group.options[0];
                    return <span key={groupId} className="rounded-[5px] border border-white/12 bg-white/[.025] px-3 py-2 text-sm text-white/65">{group.title}: <span className="text-white">{selected.name}</span></span>;
                  })}
                </div>
              </Panel>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block theme-primary">
        <div className="content-shell">
          <SectionHeader eyebrow="Infrastructuurkeuzes" title="De voorkeurskeuze staat voorop; alternatieven blijven beschikbaar" text="Per onderdeel staat standaard de aanbevolen oplossing met een duidelijke uitleg, voordelen en aandachtspunten. Andere routes worden pas zichtbaar wanneer de knop ‘Alternatieve opties’ wordt geopend. Zo blijft het overzicht compact en is meteen duidelijk welke richting de voorkeur heeft." />
          <div className="mt-9 grid gap-5 xl:grid-cols-2">
            {choiceGroups.map((group) => {
              const recommended = group.options.find((option) => option.recommended) ?? group.options[0];
              const selected = group.options.find((option) => option.id === state.toolChoices[group.id]) ?? recommended;
              const alternatives = group.options.filter((option) => option.id !== recommended.id);
              const guidance = softwareGroupGuidance[group.id];
              const alternativesOpen = expandedGroups[group.id] ?? (selected.id !== recommended.id);
              const recommendedSelected = selected.id === recommended.id;

              return (
                <Panel key={group.id} className="overflow-hidden">
                  <div className="p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm uppercase tracking-[0.13em] text-[var(--section-accent)]">{group.title}</p>
                        <h3 className="mt-2 text-xl uppercase text-white">Wat wordt hiermee geregeld?</h3>
                      </div>
                      <span className="shrink-0 rounded-[5px] border border-[var(--section-accent)]/40 bg-[color-mix(in_srgb,var(--section-accent)_8%,transparent)] px-2.5 py-1 text-xs uppercase tracking-[0.1em] text-[var(--section-accent)]">voorkeursroute</span>
                    </div>

                    <p className="mt-3 text-base leading-7 text-white/72">{guidance?.simple ?? group.description}</p>

                    <button
                      type="button"
                      aria-pressed={recommendedSelected}
                      onClick={() => selectOption(group.id, recommended.id)}
                      className={`mt-5 w-full rounded-[5px] border p-4 text-left transition ${recommendedSelected ? "border-[var(--section-accent)] bg-[color-mix(in_srgb,var(--section-accent)_9%,transparent)]" : "border-white/18 bg-white/[.018] hover:border-[var(--section-accent)]/55"}`}
                    >
                      <span className="flex items-start gap-3">
                        <span className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-[5px] border-2 ${recommendedSelected ? "border-[var(--section-accent)] bg-[var(--section-accent)] text-background" : "border-white/40 text-transparent"}`}><Check className="h-4 w-4" /></span>
                        <span className="min-w-0 flex-1">
                          <span className="flex flex-wrap items-start justify-between gap-3">
                            <span>
                              <span className="block text-xs uppercase tracking-[0.12em] text-[var(--section-accent)]">Voorkeurskeuze</span>
                              <span className="mt-1 block text-xl text-white">{recommended.name}</span>
                            </span>
                            <span className="font-[family-name:var(--font-heading)] text-2xl text-[var(--section-accent)]">{recommended.monthly === 0 ? "€0" : `${euro.format(recommended.monthly)} p/m`}</span>
                          </span>
                          <span className="mt-3 block text-base leading-7 text-white/75">{getBusinessOptionDescription(recommended)}</span>
                          {guidance?.reason && <span className="mt-3 block border-l-2 border-[var(--section-accent)] pl-3 text-sm leading-6 text-white/68"><span className="text-white">Waarom deze keuze:</span> {guidance.reason}</span>}
                        </span>
                      </span>
                    </button>

                    {guidance && (
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-[5px] border border-white/12 bg-white/[.02] p-4">
                          <p className="text-xs uppercase tracking-[0.12em] text-[var(--section-accent)]">Voordelen</p>
                          <ul className="mt-3 space-y-2">
                            {guidance.benefits.map((benefit) => <li key={benefit} className="flex gap-2 text-sm leading-6 text-white/72"><Check className="mt-1 h-4 w-4 shrink-0 text-[var(--section-accent)]" /><span>{benefit}</span></li>)}
                          </ul>
                        </div>
                        <div className="rounded-[5px] border border-white/12 bg-white/[.02] p-4">
                          <p className="text-xs uppercase tracking-[0.12em] text-[var(--section-accent)]">Aandachtspunten</p>
                          <ul className="mt-3 space-y-2">
                            {guidance.drawbacks.map((drawback) => <li key={drawback} className="flex gap-2 text-sm leading-6 text-white/72"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--section-accent)]" /><span>{drawback}</span></li>)}
                          </ul>
                        </div>
                      </div>
                    )}

                    <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-sm text-white/58">{recommendedSelected ? "De voorkeurskeuze is geselecteerd." : `Momenteel geselecteerd: ${selected.name}`}</p>
                      <button
                        type="button"
                        aria-expanded={alternativesOpen}
                        onClick={() => toggleAlternatives(group.id, alternativesOpen)}
                        className="inline-flex min-h-9 items-center justify-center gap-2 self-end rounded-[5px] border border-[var(--section-accent)]/45 px-3 py-2 text-sm text-[var(--section-accent)] transition hover:bg-[color-mix(in_srgb,var(--section-accent)_8%,transparent)] sm:self-auto"
                      >
                        <span>{alternativesOpen ? "Alternatieven sluiten" : `Alternatieve opties (${alternatives.length})`}</span>
                        <CaretRight className={`h-4 w-4 transition-transform ${alternativesOpen ? "rotate-90" : ""}`} />
                      </button>
                    </div>
                  </div>

                  {alternativesOpen && (
                    <div className="border-t border-[var(--section-accent)]/25 bg-black/15 p-4 sm:p-5">
                      <p className="mb-3 text-xs uppercase tracking-[0.13em] text-[var(--section-accent)]">Andere mogelijke routes</p>
                      <div className="space-y-3">
                        {alternatives.map((option) => {
                          const active = option.id === selected.id;
                          const alternativeGuidance = softwareAlternativeGuidance[option.id];
                          return (
                            <button
                              key={option.id}
                              type="button"
                              aria-pressed={active}
                              onClick={() => selectOption(group.id, option.id)}
                              className={`w-full rounded-[5px] border p-4 text-left transition ${active ? "border-[var(--section-accent)] bg-[color-mix(in_srgb,var(--section-accent)_8%,transparent)]" : "border-white/14 bg-white/[.015] hover:border-white/30"}`}
                            >
                              <span className="flex items-start gap-3">
                                <span className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-[5px] border-2 ${active ? "border-[var(--section-accent)] bg-[var(--section-accent)] text-background" : "border-white/35 text-transparent"}`}><Check className="h-3.5 w-3.5" /></span>
                                <span className="min-w-0 flex-1">
                                  <span className="flex flex-wrap items-start justify-between gap-3">
                                    <span className={active ? "text-lg text-[var(--section-accent)]" : "text-lg text-white"}>{option.name}</span>
                                    <span className="font-[family-name:var(--font-heading)] text-xl text-white">{option.monthly === 0 ? "€0" : `${euro.format(option.monthly)} p/m`}</span>
                                  </span>
                                  <span className="mt-2 block text-sm leading-6 text-white/68">{getBusinessOptionDescription(option)}</span>
                                  {alternativeGuidance && (
                                    <span className="mt-3 grid gap-2 text-sm leading-6 sm:grid-cols-2">
                                      <span className="rounded-[5px] border border-white/10 bg-white/[.02] px-3 py-2 text-white/68"><span className="text-white">Past goed als:</span> {alternativeGuidance.fitsWhen}.</span>
                                      <span className="rounded-[5px] border border-white/10 bg-white/[.02] px-3 py-2 text-white/68"><span className="text-white">Afweging:</span> {alternativeGuidance.tradeoff}.</span>
                                    </span>
                                  )}
                                </span>
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </Panel>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-block theme-secondary">
        <div className="content-shell">
          <SectionHeader eyebrow="Mogelijke software" title="Selecteer welke functies uiteindelijk worden ontwikkeld" text="De marktwaarde is een indicatie van de externe kosten voor ontwerp, development, integratie, testen en oplevering. Interne ontwikkeltijd staat buiten het operationele maandbudget en wordt uitsluitend als omvangsvergelijking getoond." />
          <div className="mt-9 overflow-hidden rounded-[5px] border border-[var(--section-accent)]/35 bg-card">
            <div className="hidden grid-cols-[60px_1.5fr_.55fr_.65fr_.75fr] gap-3 border-b border-border bg-white/[.025] px-4 py-3 text-xs uppercase tracking-[0.13em] text-[var(--section-accent)] lg:grid"><span>Kies</span><span>Onderdeel</span><span>Impact</span><span>Tijd</span><span>Marktwaarde</span></div>
            {features.map((feature) => {
              const active = state.featureSelections[feature.id];
              return (
                <button key={feature.id} onClick={() => toggleFeature(feature.id)} className={`grid w-full gap-3 border-b border-border/70 px-4 py-4 text-left last:border-0 lg:grid-cols-[60px_1.5fr_.55fr_.65fr_.75fr] lg:items-center ${active ? "bg-[color-mix(in_srgb,var(--section-accent)_6%,transparent)]" : "opacity-60 hover:opacity-85"}`}>
                  <span className={`grid h-6 w-6 place-items-center rounded-[5px] border-2 ${active ? "border-[var(--section-accent)] bg-[var(--section-accent)] text-secondary-foreground" : "border-white/40"}`}>{active && <Check className="h-4 w-4" />}</span>
                  <span><span className="block text-base text-white">{feature.name}</span><span className="mt-1 block text-sm leading-5 text-white/55">{feature.description}</span></span>
                  <span><span className="mb-1 block text-xs uppercase text-white/42 lg:hidden">Impact</span><span className="text-[var(--section-accent)]">{feature.impact}</span></span>
                  <span><span className="mb-1 block text-xs uppercase text-white/42 lg:hidden">Ontwikkeltijd</span>{feature.hoursLow}–{feature.hoursHigh} uur</span>
                  <span><span className="mb-1 block text-xs uppercase text-white/42 lg:hidden">Marktwaarde</span>{euro.format(feature.marketLow)}–{euro.format(feature.marketHigh)}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Geselecteerd" value={`${model.selectedFeatures.length} functies`} detail={`van ${features.length}`} />
            <StatCard label="Ontwikkelomvang" value={`${model.buildHoursLow}–${model.buildHoursHigh} uur`} detail="indicatieve bandbreedte" />
            <StatCard label="Externe marktwaarde" value={`${euro.format(model.marketBuildLow)}–${euro.format(model.marketBuildHigh)}`} detail="niet opgenomen in budget" />
            <StatCard label="Tools & hosting" value={`${euro.format(model.platformMonthly)} p/m`} detail="op basis van keuzes" />
          </div>
        </div>
      </section>

      <section className="section-block theme-primary">
        <div className="content-shell grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <Panel className="p-6"><Users className="h-7 w-7 text-[var(--section-accent)]" /><h3 className="mt-4 text-xl uppercase text-[var(--section-accent)]">CRM als commerciële basis</h3><p className="mt-3 leading-7 text-white/70">Een centrale lead- en verkoopstatus is nodig om marketing betrouwbaar aan omzet te koppelen.</p></Panel>
          <Panel className="p-6"><Robot className="h-7 w-7 text-[var(--section-accent)]" /><h3 className="mt-4 text-xl uppercase text-[var(--section-accent)]">Agents op gevalideerde data</h3><p className="mt-3 leading-7 text-white/70">Agents worden pas ingezet wanneer productdata, processen, bevoegdheden en escalaties zijn vastgelegd.</p></Panel>
          <Panel className="p-6"><CalendarBlank className="h-7 w-7 text-[var(--section-accent)]" /><h3 className="mt-4 text-xl uppercase text-[var(--section-accent)]">Iteratieve oplevering</h3><p className="mt-3 leading-7 text-white/70">Iedere module krijgt een afgebakende livegang, meetbare acceptatiecriteria en pas daarna uitbreiding.</p></Panel>
          <Panel className="p-6"><Briefcase className="h-7 w-7 text-[var(--section-accent)]" /><h3 className="mt-4 text-xl uppercase text-[var(--section-accent)]">Eigendom vastleggen</h3><p className="mt-3 leading-7 text-white/70">Accounts, data, broncode, domeinen en betaalmethoden blijven onder controle van Earth Spas.</p></Panel>
        </div>
      </section>

      <footer className="border-t border-border py-10 text-center text-sm text-white/45">Softwareplan · keuzes worden automatisch gedeeld met overzicht, calculator en checklist</footer>
    </main>
  );
}
