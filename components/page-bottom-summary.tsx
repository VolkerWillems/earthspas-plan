"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, Check, X } from "@/lib/phosphor-icons";
import { useSiteState } from "@/components/site-state";
import { calculateSiteModel } from "@/lib/site-model";
import { checklistItems } from "@/lib/choice-data";
import { getBusinessOwnerLabel, getBusinessTaskTitle } from "@/lib/presentation-copy";
import { taskExecutionPlans } from "@/lib/task-execution-plans";
import { euro, number } from "@/lib/utils";

const checklistGroups = ["Eigenaarschap", "Techniek", "Marketing", "Afronding"] as const;

type PageSummaryItem = {
  label: string;
  value: string;
  text: string;
};

type PageSummary = {
  eyebrow: string;
  title: string;
  text: string;
  items: PageSummaryItem[];
};

export function PageBottomSummary() {
  const pathname = usePathname();
  const { state, setState } = useSiteState();
  const model = calculateSiteModel(state);
  const [activeTaskId, setActiveTaskId] = React.useState<string | null>(null);

  React.useEffect(() => setActiveTaskId(null), [pathname]);

  const toggleTask = (taskId: string) => {
    setState((previous) => ({
      ...previous,
      checklist: {
        ...previous.checklist,
        [taskId]: !previous.checklist[taskId],
      },
    }));
  };

  const variableMonthly = model.adsMonthly + state.contentBudget + model.aiMonthly;
  const hoursLabel = state.involvement === "structured"
    ? `${number.format(state.hoursPerWeek)} uur per week`
    : "Incidenteel";

  const pageSummaries: Record<string, PageSummary> = {
    "/": {
      eyebrow: "Compact paginaoverzicht",
      title: "Wat de huidige stand van zaken vastlegt",
      text: "De kernpunten van deze pagina in één scanbaar overzicht, zonder opnieuw dezelfde totaaltabel onder iedere route te parkeren.",
      items: [
        {
          label: "Commerciële basis",
          value: euro.format(model.currentRevenue),
          text: `${number.format(model.currentUnitsYear)} verkochte spa's per jaar vormen de huidige uitgangspositie.`,
        },
        {
          label: "Bestaande digitale basis",
          value: `${number.format(model.totalWorkedHours)} uur`,
          text: "Geregistreerde ontwikkeling, inrichting en digitale werkzaamheden tot nu toe.",
        },
        {
          label: "Geselecteerde bouw",
          value: `${model.selectedFeatures.length} onderdelen`,
          text: `${number.format(model.buildHoursLow)}–${number.format(model.buildHoursHigh)} uur indicatieve aanvullende bouwomvang.`,
        },
        {
          label: "Vervolgstructuur",
          value: hoursLabel,
          text: "De gekozen capaciteit bepaalt hoeveel beheer, marketing en doorontwikkeling structureel kan worden uitgevoerd.",
        },
      ],
    },
    "/marketing": {
      eyebrow: "Compact marketingoverzicht",
      title: "Van kleine test naar aantoonbare groei",
      text: "De marketingroute begint met meten en valideren. Budget wordt pas verhoogd wanneer leadkwaliteit, showroomafspraken en verkopen dat rechtvaardigen.",
      items: [
        {
          label: "Eerste testbudget",
          value: `${euro.format(model.adsMonthly)} p/m`,
          text: `Meta ${euro.format(state.metaBudget)} en Google ${euro.format(state.googleBudget)} binnen afzonderlijke limieten.`,
        },
        {
          label: "Meetketen",
          value: "Bron → verkoop",
          text: "Campagne, lead, showroomafspraak, offerte en verkoop moeten aan elkaar worden gekoppeld.",
        },
        {
          label: "Resultaatbandbreedte",
          value: `${number.format(model.lowExtraSales)}–${number.format(model.highExtraSales)} spa's`,
          text: "Scenario, geen garantie. De echte resultaten bepalen of budget wordt aangepast of opgeschaald.",
        },
        {
          label: "Opschaalregel",
          value: "Alleen winnaars",
          text: "Zwakke campagnes worden gestopt of aangepast; alleen bewezen combinaties krijgen extra budget.",
        },
      ],
    },
    "/software": {
      eyebrow: "Compact softwareoverzicht",
      title: "Eigendom, infrastructuur en te bouwen functies",
      text: "Deze pagina beschrijft welke bedrijfssystemen verplicht onder Earth Spas moeten vallen en welke software daarna kan worden gebouwd.",
      items: [
        {
          label: "Accountstructuur",
          value: `${model.selectedOptions.length} onderdelen`,
          text: "Noodzakelijke accounts krijgen Earth Spas-eigendom, eigen billing en minimaal twee beheerders.",
        },
        {
          label: "Geselecteerde stack",
          value: `${euro.format(model.platformMonthly)} p/m`,
          text: "De actuele selectie van accounts, hosting, infrastructuur en productietools.",
        },
        {
          label: "Softwareomvang",
          value: `${model.selectedFeatures.length} functies`,
          text: `${number.format(model.buildHoursLow)}–${number.format(model.buildHoursHigh)} uur indicatieve bouwtijd.`,
        },
        {
          label: "Veilige overdracht",
          value: "2 beheerders",
          text: "Back-up, herstel en rollback worden getest voordat persoonlijke accounts of tokens verdwijnen.",
        },
      ],
    },
    "/calculator": {
      eyebrow: "Compact beslisoverzicht",
      title: "De ingevulde uitgangspunten van deze calculator",
      text: "Dit is een korte inhoudssamenvatting van de calculatorpagina. Het uitgebreide kostenoverzicht blijft op de pagina zelf staan waar het thuishoort.",
      items: [
        {
          label: "Bedrijfsbasis",
          value: euro.format(model.currentRevenue),
          text: `${number.format(model.currentUnitsYear)} spa's per jaar en gemiddeld ${euro.format(model.averageSalePrice)} per verkoop.`,
        },
        {
          label: "Vaste digitale stack",
          value: `${euro.format(model.platformMonthly)} p/m`,
          text: "Accounts, tools en hosting volgens de huidige geselecteerde instellingen.",
        },
        {
          label: "Voorzichtig testbudget",
          value: `${euro.format(variableMonthly)} p/m`,
          text: "Advertenties, content en AI worden eerst beperkt getest en afzonderlijk gemeten.",
        },
        {
          label: "Uitvoering en scenario",
          value: hoursLabel,
          text: `${number.format(model.lowExtraSales)}–${number.format(model.highExtraSales)} extra spa's als berekende bandbreedte.`,
        },
      ],
    },
  };

  const pageSummary = pageSummaries[pathname];

  return (
    <>
      {pathname === "/checklist" ? (
        <section className="section-block theme-primary compact-checklist-section">
          <div className="content-shell">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow">Compacte actielijst</p>
                <h2 className="mt-3 max-w-5xl text-3xl uppercase leading-tight sm:text-4xl">Alle acties, voortgang en uitvoering in één overzicht</h2>
                <p className="mt-4 max-w-5xl text-lg leading-8 text-white/76">Vink acties af of open direct het praktische stappenplan. Links brengen je naar de juiste beheerpagina of naar het relevante onderdeel van deze keuzehulp.</p>
              </div>
              <div className="summary-progress-card">
                <span>{model.completedTasks}/{checklistItems.length}</span>
                <small>{model.checklistProgress}% afgerond</small>
              </div>
            </div>

            <div className="compact-checklist-table mt-8 overflow-x-auto rounded-[5px] border border-[var(--section-accent)]/35 bg-card">
              <table className="w-full min-w-[900px] border-collapse text-left">
                <thead>
                  <tr>
                    <th className="w-16">Gereed</th>
                    <th>Actie</th>
                    <th className="w-44">Verantwoordelijk</th>
                    <th className="w-36">Prioriteit</th>
                    <th className="w-40">Uitvoering</th>
                  </tr>
                </thead>
                <tbody>
                  {checklistGroups.map((group) => {
                    const tasks = checklistItems.filter((item) => item.group === group);
                    const completed = tasks.filter((item) => state.checklist[item.id]).length;
                    return (
                      <React.Fragment key={group}>
                        <tr className="compact-checklist-group">
                          <td colSpan={5}>
                            <span>{group}</span>
                            <small>{completed}/{tasks.length} afgerond</small>
                          </td>
                        </tr>
                        {tasks.map((task) => {
                          const checked = Boolean(state.checklist[task.id]);
                          const active = activeTaskId === task.id;
                          const plan = taskExecutionPlans[task.id];
                          return (
                            <React.Fragment key={task.id}>
                              <tr className={checked ? "compact-checklist-complete" : undefined}>
                                <td>
                                  <button
                                    type="button"
                                    onClick={() => toggleTask(task.id)}
                                    className={`compact-check ${checked ? "compact-check-active" : ""}`}
                                    aria-label={`${getBusinessTaskTitle(task)} ${checked ? "als niet afgerond markeren" : "afronden"}`}
                                  >
                                    {checked && <Check className="h-4 w-4" />}
                                  </button>
                                </td>
                                <td>
                                  <button type="button" onClick={() => toggleTask(task.id)} className="compact-checklist-title">
                                    {getBusinessTaskTitle(task)}
                                  </button>
                                </td>
                                <td>{getBusinessOwnerLabel(task.owner)}</td>
                                <td><span className="compact-priority">{task.priority}</span></td>
                                <td>
                                  <button
                                    type="button"
                                    className={`task-execute-button ${active ? "task-execute-button-active" : ""}`}
                                    onClick={() => setActiveTaskId(active ? null : task.id)}
                                    aria-expanded={active}
                                  >
                                    <span>{active ? "Sluiten" : "Nu uitvoeren"}</span>
                                    {active ? <X className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                                  </button>
                                </td>
                              </tr>
                              {active && plan && (
                                <tr className="task-execution-row">
                                  <td colSpan={5}>
                                    <div className="task-execution-panel">
                                      <div>
                                        <p className="eyebrow">Stappenplan</p>
                                        <h3>{getBusinessTaskTitle(task)}</h3>
                                        <p className="task-execution-intro">{plan.intro}</p>
                                      </div>
                                      <ol>
                                        {plan.steps.map((step, index) => (
                                          <li key={step}>
                                            <span>{index + 1}</span>
                                            <p>{step}</p>
                                          </li>
                                        ))}
                                      </ol>
                                      {plan.links.length > 0 && (
                                        <div className="task-execution-links">
                                          {plan.links.map((link) => {
                                            const external = link.href.startsWith("http");
                                            return (
                                              <a
                                                key={`${task.id}-${link.href}`}
                                                href={link.href}
                                                target={external ? "_blank" : undefined}
                                                rel={external ? "noreferrer" : undefined}
                                              >
                                                <span>{link.label}</span>
                                                <ArrowRight className="h-4 w-4" />
                                              </a>
                                            );
                                          })}
                                        </div>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ) : pageSummary ? (
        <section className="section-block theme-secondary page-content-summary">
          <div className="content-shell">
            <div>
              <p className="eyebrow">{pageSummary.eyebrow}</p>
              <h2 className="mt-3 max-w-5xl text-3xl uppercase leading-tight sm:text-4xl">{pageSummary.title}</h2>
              <p className="mt-4 max-w-5xl text-lg leading-8 text-white/76">{pageSummary.text}</p>
            </div>
            <div className="page-summary-grid mt-8">
              {pageSummary.items.map((item, index) => (
                <article key={item.label} className="page-summary-card">
                  <span className="page-summary-index">0{index + 1}</span>
                  <div>
                    <p className="page-summary-label">{item.label}</p>
                    <strong>{item.value}</strong>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <footer className="global-plan-footer">Earth Spas digitale keuzehulp · pagina-inhoud, keuzes en actievoortgang worden centraal uit dezelfde instellingen bijgewerkt</footer>
    </>
  );
}
