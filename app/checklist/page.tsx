"use client";

import {
  Check,
  CreditCard,
  Key,
  ShieldCheck,
  Warning,
} from "@/lib/phosphor-icons";
import { useSiteState } from "@/components/site-state";
import { calculateSiteModel } from "@/lib/site-model";
import { checklistItems, choiceGroups } from "@/lib/choice-data";
import { euro } from "@/lib/utils";
import {
  PageIntro,
  Panel,
  PrimaryLink,
  ProgressBar,
  SectionHeader,
  StatCard,
} from "@/components/plan-ui";

const groupCopy = {
  Eigenaarschap: {
    title: "Accounts, betaling en toegang",
    text: "Deze taken voorkomen dat essentiële onderdelen aan persoonlijke accounts, kaarten of herstelmethoden blijven hangen.",
  },
  Techniek: {
    title: "Server, data en systemen",
    text: "Back-ups, secrets, domeinen, databases en deployments moeten aantoonbaar beheersbaar en herstelbaar worden.",
  },
  Marketing: {
    title: "Kanalen, billing en meting",
    text: "Advertentieaccounts en socialkanalen moeten twee beheerders, correcte billing en betrouwbare conversiemeting krijgen.",
  },
  Afronding: {
    title: "Acceptatie en veilige overdracht",
    text: "Persoonlijke toegang verdwijnt pas nadat alles getest, teruggezet en door een tweede beheerder bereikbaar is.",
  },
};

export default function ChecklistPage() {
  const { state, setState } = useSiteState();
  const model = calculateSiteModel(state);

  const toggleTask = (taskId: string) => {
    setState((previous) => ({ ...previous, checklist: { ...previous.checklist, [taskId]: !previous.checklist[taskId] } }));
  };

  const selectedOption = (choiceGroupId?: string) => {
    if (!choiceGroupId) return null;
    const group = choiceGroups.find((item) => item.id === choiceGroupId);
    return group?.options.find((option) => option.id === state.toolChoices[choiceGroupId]) ?? group?.options[0] ?? null;
  };

  const nowTasks = checklistItems.filter((item) => item.priority === "Nu");
  const nowCompleted = nowTasks.filter((item) => state.checklist[item.id]).length;

  return (
    <main>
      <PageIntro
        eyebrow="05 · noodzakelijke actielijst"
        title="Wat zo snel mogelijk geregeld moet worden, ongeacht het groeiplan"
        text="Deze pagina staat bewust los van de keuze om meer marketing of software te bouwen. Accounts, betaalmethoden, eigenaarschap, back-ups en hersteltoegang moeten sowieso op orde. Anders blijft Earth Spas afhankelijk van Volkers kaarten, accounts en geheugen. Dat laatste is niet eens kritiek op Volker; menselijke geheugens zijn gewoon beroerde infrastructuur."
        accent="secondary"
        actions={<><PrimaryLink href="/calculator" accent="secondary">Controleer gemaakte keuzes</PrimaryLink><PrimaryLink href="/">Terug naar dashboard</PrimaryLink></>}
      />

      <section className="section-block theme-primary">
        <div className="content-shell">
          <SectionHeader eyebrow="Direct regelen" title="De acties met prioriteit ‘Nu’" text="Deze lijst is de minimale overdracht. Niet alles hoeft vandaag technisch af te zijn, maar eigenaars, betaalroutes en migratiekeuzes moeten wel worden vastgelegd." accent="primary" />
          <div className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Alle acties" value={`${model.completedTasks}/${checklistItems.length}`} detail={`${model.checklistProgress}% afgerond`} />
            <StatCard label="Prioriteit Nu" value={`${nowCompleted}/${nowTasks.length}`} detail="directe beslissingen en overdracht" />
            <StatCard label="Gekozen vaste kosten" value={`${euro.format(model.platformMonthly)} p/m`} detail="accounts, tools en hosting" />
            <StatCard label="Persoonlijke betaling verwijderen" value={state.checklist["personal-payments"] ? "Afgerond" : "Nog niet"} detail="pas na volledige acceptatietest" />
          </div>

          <Panel className="mt-6 p-6 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div><p className="eyebrow">Totale voortgang</p><p className="mt-2 text-4xl text-primary">{model.checklistProgress}%</p></div>
              <p className="max-w-xl text-base leading-7 text-white/65">De status wordt lokaal in deze browser opgeslagen en wordt ook op het dashboard gebruikt.</p>
            </div>
            <div className="mt-5"><ProgressBar value={model.checklistProgress} /></div>
          </Panel>
        </div>
      </section>

      <section className="section-block theme-secondary">
        <div className="content-shell">
          <SectionHeader eyebrow="Waarom dit eerst moet" title="Vier risico's die nu onnodig bij één persoon liggen" accent="secondary" />
          <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Panel className="border-secondary/35 p-6"><CreditCard className="h-7 w-7 text-secondary" /><h3 className="mt-4 text-xl uppercase text-secondary">Persoonlijke billing</h3><p className="mt-3 leading-7 text-white/70">Kosten zijn moeilijk toe te wijzen en diensten kunnen stoppen wanneer een persoonlijke kaart wordt vervangen of geblokkeerd.</p></Panel>
            <Panel className="border-secondary/35 p-6"><Key className="h-7 w-7 text-secondary" /><h3 className="mt-4 text-xl uppercase text-secondary">Eén herstelroute</h3><p className="mt-3 leading-7 text-white/70">Zonder tweede beheerder en herstelcodes kan een verloren telefoon een complete bedrijfsomgeving gijzelen.</p></Panel>
            <Panel className="border-secondary/35 p-6"><ShieldCheck className="h-7 w-7 text-secondary" /><h3 className="mt-4 text-xl uppercase text-secondary">Onduidelijk eigendom</h3><p className="mt-3 leading-7 text-white/70">Broncode, data, domeinen en advertentieaccounts moeten aantoonbaar onder Earth Spas vallen.</p></Panel>
            <Panel className="border-secondary/35 p-6"><Warning className="h-7 w-7 text-secondary" /><h3 className="mt-4 text-xl uppercase text-secondary">Geen rollback</h3><p className="mt-3 leading-7 text-white/70">Migraties zonder export, back-up en hersteltest veranderen een kleine fout in een volledige werkdag vloeken.</p></Panel>
          </div>
        </div>
      </section>

      {(["Eigenaarschap", "Techniek", "Marketing", "Afronding"] as const).map((group, groupIndex) => {
        const tasks = checklistItems.filter((item) => item.group === group);
        const completed = tasks.filter((item) => state.checklist[item.id]).length;
        const accent = groupIndex % 2 === 0 ? "primary" : "secondary";
        return (
          <section key={group} className={`section-block ${accent === "primary" ? "theme-primary" : "theme-secondary"}`}>
            <div className="content-shell">
              <SectionHeader eyebrow={group} title={groupCopy[group].title} text={groupCopy[group].text} accent={accent} />
              <div className="mt-6 flex items-center gap-4"><span className="text-3xl text-[var(--section-accent)]">{completed}/{tasks.length}</span><div className="max-w-sm flex-1"><ProgressBar value={tasks.length ? completed / tasks.length * 100 : 0} accent={accent} /></div></div>
              <div className="mt-8 grid gap-4 xl:grid-cols-2">
                {tasks.map((task) => {
                  const checked = state.checklist[task.id];
                  const option = selectedOption(task.choiceGroupId);
                  return (
                    <button key={task.id} onClick={() => toggleTask(task.id)} className={`panel flex w-full gap-4 p-5 text-left transition ${checked ? "border-[var(--section-accent)]/70 bg-[var(--section-accent)]/8" : "hover:border-white/30"}`}>
                      <span className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-sm border-2 ${checked ? "border-[var(--section-accent)] bg-[var(--section-accent)] text-background" : "border-white/35"}`}>{checked && <Check className="h-4 w-4" />}</span>
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-start justify-between gap-2"><span className={`text-lg ${checked ? "text-[var(--section-accent)]" : "text-white"}`}>{task.title}</span><span className="rounded-full border border-white/15 px-2 py-1 text-xs uppercase tracking-[0.1em] text-white/55">{task.priority}</span></span>
                        {option && <span className="mt-2 flex flex-wrap items-center gap-2 text-sm"><span className="uppercase tracking-[0.1em] text-[var(--section-accent)]">Gekozen</span><span className="text-white/78">{option.name}</span><span className="text-white/45">· {option.monthly === 0 ? "€0" : `${euro.format(option.monthly)} p/m`}</span></span>}
                        <span className="mt-3 block text-base leading-7 text-white/68">{task.description}</span>
                        <span className="mt-3 block text-sm uppercase tracking-[0.11em] text-white/45">Eigenaar: {task.owner}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}

      <section className="section-block theme-secondary">
        <div className="content-shell grid gap-6 lg:grid-cols-[1fr_.8fr]">
          <div>
            <SectionHeader eyebrow="Veilige eindvolgorde" title="Persoonlijke accounts pas als laatste loskoppelen" text="De overdracht is pas afgerond wanneer website, mail, formulieren, database, workflows, back-ups, billing en hersteltoegang gezamenlijk zijn getest." accent="secondary" />
            <ol className="mt-8 space-y-3">
              {["Nieuwe eigenaar en tweede beheerder toevoegen", "Nieuwe betaalmethode en factuurgegevens testen", "Exports en back-ups maken", "Domeinen, mail, formulieren en workflows testen", "Herstelprocedure door tweede beheerder laten uitvoeren", "Pas daarna persoonlijke kaarten, tokens en toegang verwijderen"].map((step, index) => <li key={step} className="panel flex items-center gap-4 p-4"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-secondary/10 text-secondary">{index + 1}</span><span className="text-base text-white/78">{step}</span></li>)}
            </ol>
          </div>
          <Panel className="h-fit border-secondary/40 p-6 sm:p-8">
            <p className="eyebrow">Vaste kosten na overdracht</p>
            <p className="mt-3 text-4xl text-secondary">{euro.format(model.platformMonthly)} p/m</p>
            <p className="mt-3 text-base leading-7 text-white/65">Dit is alleen de huidige selectie van accounts, tools en hosting. Marketingbudget en AI-verbruik staan hier bewust buiten.</p>
            <div className="mt-6"><PrimaryLink href="/calculator" accent="secondary">Controleer alle providerkeuzes</PrimaryLink></div>
          </Panel>
        </div>
      </section>

      <footer className="border-t border-border py-10 pb-28 text-center text-sm text-white/45 lg:pb-10">Actielijst · deze overdracht blijft noodzakelijk, ook wanneer marketing en software voorlopig niet worden uitgebreid</footer>
    </main>
  );
}
