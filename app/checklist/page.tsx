"use client";

import {
  CreditCard,
  Key,
  ShieldCheck,
  Warning,
} from "@/lib/phosphor-icons";
import { useSiteState } from "@/components/site-state";
import { calculateSiteModel } from "@/lib/site-model";
import { checklistItems } from "@/lib/choice-data";
import { euro } from "@/lib/utils";
import {
  PageIntro,
  Panel,
  PrimaryLink,
  ProgressBar,
  SectionHeader,
  StatCard,
} from "@/components/plan-ui";

export default function ChecklistPage() {
  const { state } = useSiteState();
  const model = calculateSiteModel(state);
  const nowTasks = checklistItems.filter((item) => item.priority === "Nu");
  const nowCompleted = nowTasks.filter((item) => state.checklist[item.id]).length;

  return (
    <main>
      <PageIntro
        eyebrow="05 · noodzakelijke actielijst"
        title="Wat zo snel mogelijk moet worden geregeld, ongeacht het groeiplan"
        text="Deze pagina staat los van de keuze om extra marketing of software te ontwikkelen. Accounts, betaalmethoden, eigenaarschap, back-ups en hersteltoegang moeten in alle scenario's op orde zijn. Daarmee wordt de digitale omgeving onafhankelijker, veiliger en beter overdraagbaar."
        accent="secondary"
        image="/earth-spas-collage-b-glacier-1920x1080.jpg"
        imageAlt="Earth Spas in een rustige bergomgeving"
        actions={<><PrimaryLink href="/calculator">Controleer gemaakte keuzes</PrimaryLink><PrimaryLink href="/">Terug naar overzicht</PrimaryLink></>}
      />

      <section className="section-block theme-primary">
        <div className="content-shell">
          <SectionHeader eyebrow="Direct regelen" title="De acties met prioriteit ‘Nu’" text="Deze lijst vormt de minimale overdrachtsbasis. Niet ieder technisch onderdeel hoeft direct volledig te zijn afgerond, maar eigenaarschap, betaalroutes, toegang en migratiekeuzes moeten wel worden vastgelegd." />
          <div className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Alle acties" value={`${model.completedTasks}/${checklistItems.length}`} detail={`${model.checklistProgress}% afgerond`} />
            <StatCard label="Prioriteit Nu" value={`${nowCompleted}/${nowTasks.length}`} detail="directe beslissingen en overdracht" />
            <StatCard label="Gekozen vaste kosten" value={`${euro.format(model.platformMonthly)} p/m`} detail="accounts, tools en hosting" />
            <StatCard label="Persoonlijke betaling verwijderen" value={state.checklist["personal-payments"] ? "Afgerond" : "Nog niet"} detail="pas na volledige acceptatietest" />
          </div>

          <Panel className="mt-6 p-6 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div><p className="eyebrow">Totale voortgang</p><p className="mt-2 text-4xl text-[var(--section-accent)]">{model.checklistProgress}%</p></div>
              <p className="max-w-xl text-base leading-7 text-white/65">De status wordt lokaal in deze browser opgeslagen en automatisch verwerkt in het centrale overzicht.</p>
            </div>
            <div className="mt-5"><ProgressBar value={model.checklistProgress} /></div>
          </Panel>
        </div>
      </section>

      <section className="section-block theme-secondary">
        <div className="content-shell">
          <SectionHeader eyebrow="Waarom dit eerst moet" title="Vier risico's die momenteel onnodig zijn geconcentreerd" />
          <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Panel className="p-6"><CreditCard className="h-7 w-7 text-[var(--section-accent)]" /><h3 className="mt-4 text-xl uppercase text-[var(--section-accent)]">Persoonlijke billing</h3><p className="mt-3 leading-7 text-white/70">Kosten zijn moeilijk toe te wijzen en diensten kunnen stoppen wanneer een persoonlijke kaart wordt vervangen of geblokkeerd.</p></Panel>
            <Panel className="p-6"><Key className="h-7 w-7 text-[var(--section-accent)]" /><h3 className="mt-4 text-xl uppercase text-[var(--section-accent)]">Eén herstelroute</h3><p className="mt-3 leading-7 text-white/70">Zonder tweede beheerder en herstelcodes kan verlies van één apparaat toegang tot meerdere bedrijfsdiensten blokkeren.</p></Panel>
            <Panel className="p-6"><ShieldCheck className="h-7 w-7 text-[var(--section-accent)]" /><h3 className="mt-4 text-xl uppercase text-[var(--section-accent)]">Onduidelijk eigendom</h3><p className="mt-3 leading-7 text-white/70">Broncode, data, domeinen, advertentieaccounts en contracten moeten aantoonbaar onder Earth Spas vallen.</p></Panel>
            <Panel className="p-6"><Warning className="h-7 w-7 text-[var(--section-accent)]" /><h3 className="mt-4 text-xl uppercase text-[var(--section-accent)]">Ontbrekende rollback</h3><p className="mt-3 leading-7 text-white/70">Migraties zonder export, back-up en hersteltest vergroten het risico op uitval, gegevensverlies en onnodige hersteltijd.</p></Panel>
          </div>
        </div>
      </section>

      <section className="section-block theme-secondary">
        <div className="content-shell grid gap-6 lg:grid-cols-[1fr_.8fr]">
          <div>
            <SectionHeader eyebrow="Veilige eindvolgorde" title="Persoonlijke accounts pas als laatste loskoppelen" text="De overdracht is pas afgerond wanneer website, mail, formulieren, database, workflows, back-ups, billing en hersteltoegang gezamenlijk zijn getest." />
            <ol className="mt-8 space-y-3">
              {["Nieuwe eigenaar en tweede beheerder toevoegen", "Nieuwe betaalmethode en factuurgegevens testen", "Exports en back-ups maken", "Domeinen, mail, formulieren en workflows testen", "Herstelprocedure door tweede beheerder laten uitvoeren", "Pas daarna persoonlijke kaarten, tokens en toegang verwijderen"].map((step, index) => <li key={step} className="panel flex items-center gap-4 p-4"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-[color-mix(in_srgb,var(--section-accent)_10%,transparent)] text-[var(--section-accent)]">{index + 1}</span><span className="text-base text-white/78">{step}</span></li>)}
            </ol>
            <div className="mt-6 overflow-hidden rounded-[5px] border border-[var(--section-accent)]/35 bg-card shadow-[0_18px_50px_rgba(0,0,0,.32)]">
              <img src="/earth-spas-collage-a-starry-lake-1920x1080.jpg" alt="Earth Spas whirlpool in een premium avondsetting" className="h-56 w-full object-cover sm:h-72" />
            </div>
          </div>
          <Panel className="h-fit p-6 sm:p-8">
            <p className="eyebrow">Vaste kosten na overdracht</p>
            <p className="mt-3 text-4xl text-[var(--section-accent)]">{euro.format(model.platformMonthly)} p/m</p>
            <p className="mt-3 text-base leading-7 text-white/65">Dit bedrag betreft alleen de actuele selectie van accounts, tools en hosting. Marketingbudget en variabel AI-verbruik staan hier bewust buiten.</p>
            <div className="mt-6"><PrimaryLink href="/calculator">Controleer alle providerkeuzes</PrimaryLink></div>
          </Panel>
        </div>
      </section>
    </main>
  );
}
