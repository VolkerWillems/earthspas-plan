"use client";

import { usePathname } from "next/navigation";
import { Check } from "@/lib/phosphor-icons";
import { useSiteState } from "@/components/site-state";
import { calculateSiteModel } from "@/lib/site-model";
import { checklistItems } from "@/lib/choice-data";
import { getBusinessOwnerLabel, getBusinessTaskTitle } from "@/lib/presentation-copy";
import { euro, number } from "@/lib/utils";

const pageLabels: Record<string, string> = {
  "/": "Stand van zaken",
  "/marketing": "Marketingplan",
  "/software": "Softwareplan",
  "/calculator": "Keuzes en calculator",
  "/checklist": "Actielijst",
};

const checklistGroups = ["Eigenaarschap", "Techniek", "Marketing", "Afronding"] as const;

export function PageBottomSummary() {
  const pathname = usePathname();
  const { state, setState } = useSiteState();
  const model = calculateSiteModel(state);
  const pageLabel = pageLabels[pathname] ?? "Digitaal plan";

  const toggleTask = (taskId: string) => {
    setState((previous) => ({
      ...previous,
      checklist: {
        ...previous.checklist,
        [taskId]: !previous.checklist[taskId],
      },
    }));
  };

  const rows = [
    {
      item: "Vaste accounts, tools en hosting",
      month: model.platformMonthly,
      year: model.platformMonthly * 12,
      detail: `${model.selectedOptions.length} categorieën onder Earth Spas-beheer`,
    },
    {
      item: "Meta en Google Ads",
      month: model.adsMonthly,
      year: model.adsMonthly * 12,
      detail: `Meta ${euro.format(state.metaBudget)} + Google ${euro.format(state.googleBudget)}`,
    },
    {
      item: "Externe contentreserve",
      month: state.contentBudget,
      year: state.contentBudget * 12,
      detail: "Fotografie, video of gespecialiseerde productie",
    },
    {
      item: "AI- en mediacredits",
      month: model.aiMonthly,
      year: model.aiMonthly * 12,
      detail: `Agents ${euro.format(state.aiApiBudget)}, development ${euro.format(state.aiDevelopmentBudget)}, media ${euro.format(state.aiMediaBudget)}`,
    },
    {
      item: "Totaal extern operationeel",
      month: model.totalMonthly,
      year: model.annualOperating,
      detail: `${number.format(model.baseExtraSales)} verwachte extra spa's · ${euro.format(model.baseExtraRevenue)} verwachte extra omzet`,
      total: true,
    },
  ];

  return (
    <>
      {pathname === "/checklist" && (
        <section className="section-block theme-primary compact-checklist-section">
          <div className="content-shell">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow">Compacte actielijst</p>
                <h2 className="mt-3 max-w-5xl text-3xl uppercase leading-tight sm:text-4xl">Alles wat nog geregeld moet worden in één checklist</h2>
                <p className="mt-4 max-w-5xl text-lg leading-8 text-white/76">Klik op het vakje om een actie af te ronden. De status wordt direct verwerkt in het overzicht en lokaal in deze browser opgeslagen.</p>
              </div>
              <div className="summary-progress-card">
                <span>{model.completedTasks}/{checklistItems.length}</span>
                <small>{model.checklistProgress}% afgerond</small>
              </div>
            </div>

            <div className="compact-checklist-table mt-8 overflow-x-auto rounded-[5px] border border-[var(--section-accent)]/35 bg-card">
              <table className="w-full min-w-[760px] border-collapse text-left">
                <thead>
                  <tr>
                    <th className="w-16">Gereed</th>
                    <th>Actie</th>
                    <th className="w-44">Verantwoordelijk</th>
                    <th className="w-36">Prioriteit</th>
                  </tr>
                </thead>
                <tbody>
                  {checklistGroups.map((group) => {
                    const tasks = checklistItems.filter((item) => item.group === group);
                    const completed = tasks.filter((item) => state.checklist[item.id]).length;
                    return [
                      <tr key={`${group}-heading`} className="compact-checklist-group">
                        <td colSpan={4}>
                          <span>{group}</span>
                          <small>{completed}/{tasks.length} afgerond</small>
                        </td>
                      </tr>,
                      ...tasks.map((task) => {
                        const checked = Boolean(state.checklist[task.id]);
                        return (
                          <tr key={task.id} className={checked ? "compact-checklist-complete" : undefined}>
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
                          </tr>
                        );
                      }),
                    ];
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      <section className="section-block theme-secondary page-total-summary">
        <div className="content-shell">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Totaaloverzicht · {pageLabel}</p>
              <h2 className="mt-3 max-w-5xl text-3xl uppercase leading-tight sm:text-4xl">De belangrijkste bedragen en uitkomsten naast elkaar</h2>
              <p className="mt-4 max-w-5xl text-lg leading-8 text-white/76">Dit overzicht gebruikt overal dezelfde actuele instellingen. Wijzigingen in de calculator worden daardoor automatisch onderaan iedere pagina bijgewerkt.</p>
            </div>
          </div>

          <div className="summary-metrics mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div><span>Totaal per maand</span><strong>{euro.format(model.totalMonthly)}</strong></div>
            <div><span>Totaal per jaar</span><strong>{euro.format(model.annualOperating)}</strong></div>
            <div><span>Verwachte extra omzet</span><strong>{euro.format(model.baseExtraRevenue)}</strong></div>
            <div><span>Actievoortgang</span><strong>{model.checklistProgress}%</strong></div>
          </div>

          <div className="summary-table mt-5 overflow-x-auto rounded-[5px] border border-[var(--section-accent)]/35 bg-card">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead>
                <tr>
                  <th>Onderdeel</th>
                  <th>Per maand</th>
                  <th>Per jaar</th>
                  <th>Resultaat / toelichting</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.item} className={row.total ? "summary-total-row" : undefined}>
                    <td>{row.item}</td>
                    <td>{euro.format(row.month)}</td>
                    <td>{euro.format(row.year)}</td>
                    <td>{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="summary-footnote mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <p><span>Omzetbasis</span>{euro.format(model.currentRevenue)} · {number.format(model.currentUnitsYear)} spa's</p>
            <p><span>Geselecteerde software</span>{model.selectedFeatures.length} functies</p>
            <p><span>Bouwomvang</span>{number.format(model.buildHoursLow)}–{number.format(model.buildHoursHigh)} uur</p>
            <p><span>Vaste capaciteit</span>{state.involvement === "structured" ? `${number.format(state.hoursPerWeek)} uur per week` : "incidenteel"}</p>
          </div>
        </div>
      </section>

      <footer className="global-plan-footer">Earth Spas digitale keuzehulp · alle bedragen en scenario's worden centraal uit dezelfde instellingen berekend</footer>
    </>
  );
}
