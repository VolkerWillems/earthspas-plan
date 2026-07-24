"use client";

import {
  Briefcase,
  CalendarBlank,
  Check,
  Code,
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

  const selectOption = (groupId: string, optionId: string) => {
    setState((previous) => ({ ...previous, toolChoices: { ...previous.toolChoices, [groupId]: optionId } }));
  };

  const toggleFeature = (featureId: string) => {
    setState((previous) => ({ ...previous, featureSelections: { ...previous.featureSelections, [featureId]: !previous.featureSelections[featureId] } }));
  };

  return (
    <main>
      <PageIntro
        eyebrow="03 · softwareplan"
        title="Eerst een zelfstandige digitale basis, daarna pas slimme agents"
        text="Het softwareplan bestaat uit twee lagen: de accounts en infrastructuur die Earth Spas zelf moet bezitten, en de commerciële functies die daarop kunnen worden gebouwd. Agents zonder betrouwbare data en eigenaarschap zijn vooral dure improvisatietheaterstukken."
        accent="secondary"
        actions={<><PrimaryLink href="/calculator" accent="secondary">Open volledige calculator</PrimaryLink><PrimaryLink href="/checklist">Bekijk overdrachtstaken</PrimaryLink></>}
      />

      <section className="section-block theme-primary">
        <div className="content-shell">
          <SectionHeader eyebrow="Architectuur" title="De aanbevolen technische opbouw" text="De voorkeur blijft een eigen Hetzner-server voor Directus, n8n, agents en backendservices. De frontend kan op Vercel blijven. Database en storage kunnen beheerd of self-hosted worden, zolang back-ups, eigenaarschap en toegangsbeheer aantoonbaar kloppen." accent="primary" />
          <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Panel className="p-6"><Server className="h-7 w-7 text-primary" /><h3 className="mt-4 text-xl uppercase text-primary">Eigen kernserver</h3><p className="mt-3 leading-7 text-white/70">Directus, n8n, agents, monitoring en backend draaien onder Earth Spas-eigendom.</p></Panel>
            <Panel className="p-6"><Database className="h-7 w-7 text-primary" /><h3 className="mt-4 text-xl uppercase text-primary">Eén gegevensbron</h3><p className="mt-3 leading-7 text-white/70">Producten, content, leads, afspraken en supportinformatie worden centraal bruikbaar.</p></Panel>
            <Panel className="p-6"><ShieldCheck className="h-7 w-7 text-primary" /><h3 className="mt-4 text-xl uppercase text-primary">Overdraagbare toegang</h3><p className="mt-3 leading-7 text-white/70">Minimaal twee beheerders, centrale secrets, herstelcodes en geen persoonlijke betaalroute als fundament.</p></Panel>
            <Panel className="p-6"><FlowArrow className="h-7 w-7 text-primary" /><h3 className="mt-4 text-xl uppercase text-primary">Modulaire automatisering</h3><p className="mt-3 leading-7 text-white/70">Workflows en agents zijn losse modules. Ze kunnen groeien zonder de hele omgeving opnieuw te bouwen.</p></Panel>
          </div>
        </div>
      </section>

      <section className="section-block theme-secondary">
        <div className="content-shell">
          <SectionHeader eyebrow="Fasering" title="Vier bouwfasen met een logische afhankelijkheid" text="Niet alles hoeft tegelijk. Wat wel tegelijk moet, is nadenken. De fasen voorkomen dat een voice-agent wordt gebouwd terwijl nog niemand weet waar offertes en klantstatussen thuishoren." accent="secondary" />
          <div className="mt-9 grid gap-4 lg:grid-cols-2">
            {phases.map((phase) => (
              <Panel key={phase.number} className="border-secondary/35 p-6">
                <div className="flex items-start justify-between gap-5"><span className="text-4xl text-secondary">{phase.number}</span><span className="rounded-full border border-secondary/35 px-3 py-1 text-sm text-secondary">{phase.items.length} keuzes</span></div>
                <h3 className="mt-5 text-2xl uppercase text-secondary">{phase.title}</h3>
                <p className="mt-3 text-lg leading-8 text-white/72">{phase.text}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {phase.items.map((groupId) => {
                    const group = choiceGroups.find((item) => item.id === groupId)!;
                    const selected = group.options.find((option) => option.id === state.toolChoices[groupId]) ?? group.options[0];
                    return <span key={groupId} className="rounded-md border border-white/12 bg-white/[.025] px-3 py-2 text-sm text-white/65">{group.title}: <span className="text-white">{selected.name}</span></span>;
                  })}
                </div>
              </Panel>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block theme-primary">
        <div className="content-shell">
          <SectionHeader eyebrow="Infrastructuurkeuzes" title="Kies per technisch onderdeel de passende route" text="De aanbevolen optie is gemarkeerd, maar niet vergrendeld. Iedere keuze werkt direct door in de totale maandkosten op de calculator en het dashboard." accent="primary" />
          <div className="mt-9 grid gap-5 xl:grid-cols-2">
            {choiceGroups.map((group) => {
              const selectedId = state.toolChoices[group.id];
              return (
                <Panel key={group.id} className="overflow-hidden">
                  <div className="border-b border-border p-5"><p className="text-sm uppercase tracking-[0.13em] text-primary">{group.title}</p><p className="mt-2 text-base leading-6 text-white/62">{group.description}</p></div>
                  <div className="divide-y divide-border/70">
                    {group.options.map((option) => {
                      const active = option.id === selectedId;
                      return (
                        <button key={option.id} onClick={() => selectOption(group.id, option.id)} className={`flex w-full items-start gap-3 p-4 text-left transition ${active ? "bg-primary/10" : "hover:bg-white/[.025]"}`}>
                          <span className={`mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 ${active ? "border-primary bg-primary" : "border-white/30"}`}>{active && <span className="h-2 w-2 rounded-full bg-background" />}</span>
                          <span className="min-w-0 flex-1"><span className="flex flex-wrap justify-between gap-2"><span className={active ? "text-primary" : "text-white"}>{option.name}</span><span className="text-white/72">{option.monthly === 0 ? "€0" : `${euro.format(option.monthly)} p/m`}</span></span><span className="mt-1 block text-sm leading-6 text-white/58">{option.description}</span>{option.recommended && <span className="mt-2 block text-xs uppercase tracking-[0.12em] text-primary">aanbevolen</span>}</span>
                        </button>
                      );
                    })}
                  </div>
                </Panel>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-block theme-secondary">
        <div className="content-shell">
          <SectionHeader eyebrow="Mogelijke software" title="Selecteer wat uiteindelijk gebouwd kan worden" text="De marktwaarde is een indicatie van wat ontwerp, development, integratie en testen bij een extern softwarebedrijf ongeveer zouden kosten. De bouwkosten van Volker blijven buiten deze calculator." accent="secondary" />
          <div className="mt-9 overflow-hidden rounded-lg border border-secondary/35 bg-card">
            <div className="hidden grid-cols-[60px_1.5fr_.55fr_.65fr_.75fr] gap-3 border-b border-border bg-white/[.025] px-4 py-3 text-xs uppercase tracking-[0.13em] text-secondary lg:grid"><span>Kies</span><span>Onderdeel</span><span>Impact</span><span>Tijd</span><span>Marktwaarde</span></div>
            {features.map((feature) => {
              const active = state.featureSelections[feature.id];
              return (
                <button key={feature.id} onClick={() => toggleFeature(feature.id)} className={`grid w-full gap-3 border-b border-border/70 px-4 py-4 text-left last:border-0 lg:grid-cols-[60px_1.5fr_.55fr_.65fr_.75fr] lg:items-center ${active ? "bg-secondary/[.055]" : "opacity-60 hover:opacity-85"}`}>
                  <span className={`grid h-6 w-6 place-items-center rounded-sm border-2 ${active ? "border-secondary bg-secondary text-secondary-foreground" : "border-white/35"}`}>{active && <Check className="h-4 w-4" />}</span>
                  <span><span className="block text-base text-white">{feature.name}</span><span className="mt-1 block text-sm leading-5 text-white/55">{feature.description}</span></span>
                  <span><span className="mb-1 block text-xs uppercase text-white/42 lg:hidden">Impact</span><span className="text-secondary">{feature.impact}</span></span>
                  <span><span className="mb-1 block text-xs uppercase text-white/42 lg:hidden">Ontwikkeltijd</span>{feature.hoursLow}–{feature.hoursHigh} uur</span>
                  <span><span className="mb-1 block text-xs uppercase text-white/42 lg:hidden">Marktwaarde</span>{euro.format(feature.marketLow)}–{euro.format(feature.marketHigh)}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Geselecteerd" value={`${model.selectedFeatures.length} functies`} detail={`van ${features.length}`} accent="secondary" />
            <StatCard label="Ontwikkelomvang" value={`${model.buildHoursLow}–${model.buildHoursHigh} uur`} detail="indicatieve bandbreedte" accent="secondary" />
            <StatCard label="Externe marktwaarde" value={`${euro.format(model.marketBuildLow)}–${euro.format(model.marketBuildHigh)}`} detail="niet opgenomen in budget" accent="secondary" />
            <StatCard label="Tools & hosting" value={`${euro.format(model.platformMonthly)} p/m`} detail="op basis van keuzes" accent="secondary" />
          </div>
        </div>
      </section>

      <section className="section-block theme-primary">
        <div className="content-shell grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <Panel className="p-6"><Users className="h-7 w-7 text-primary" /><h3 className="mt-4 text-xl uppercase text-primary">CRM eerst</h3><p className="mt-3 leading-7 text-white/70">Zonder centrale lead- en verkoopstatus kan marketing niet betrouwbaar aan omzet worden gekoppeld.</p></Panel>
          <Panel className="p-6"><Robot className="h-7 w-7 text-primary" /><h3 className="mt-4 text-xl uppercase text-primary">Agents daarna</h3><p className="mt-3 leading-7 text-white/70">Agents werken pas verantwoord wanneer productdata, processen en escalaties vooraf zijn vastgelegd.</p></Panel>
          <Panel className="p-6"><CalendarBlank className="h-7 w-7 text-primary" /><h3 className="mt-4 text-xl uppercase text-primary">Iteratief bouwen</h3><p className="mt-3 leading-7 text-white/70">Iedere module krijgt een kleine livegang, meetbare acceptatie en pas daarna uitbreiding.</p></Panel>
          <Panel className="p-6"><Briefcase className="h-7 w-7 text-primary" /><h3 className="mt-4 text-xl uppercase text-primary">Eigendom vastleggen</h3><p className="mt-3 leading-7 text-white/70">Accounts, data, broncode, domeinen en betaalmethoden blijven onder Earth Spas-controle.</p></Panel>
        </div>
      </section>

      <footer className="border-t border-border py-10 pb-28 text-center text-sm text-white/45 lg:pb-10">Softwareplan · keuzes worden automatisch gedeeld met dashboard, calculator en checklist</footer>
    </main>
  );
}
