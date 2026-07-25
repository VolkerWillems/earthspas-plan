import {
  choiceGroups,
  checklistItems,
  defaultChecklist,
  defaultFeatureSelections,
  features,
  recommendedChoices,
} from "@/lib/choice-data";

export type WorkHours = {
  website: number;
  content: number;
  marketing: number;
  automation: number;
  infrastructure: number;
};

export type SiteState = {
  toolChoices: Record<string, string>;
  featureSelections: Record<string, boolean>;
  checklist: Record<string, boolean>;
  metaBudget: number;
  googleBudget: number;
  contentBudget: number;
  aiApiBudget: number;
  aiDevelopmentBudget: number;
  aiMediaBudget: number;
  currentAnnualRevenue: number;
  currentAnnualSales: number;
  grossMargin: number;
  acquisitionCostPerSale: number;
  incrementalCostPerSale: number;
  involvement: "free" | "structured";
  hoursPerWeek: number;
  clientName: string;
  notes: string;
  workedHours: WorkHours;
};

export const defaultSiteState: SiteState = {
  toolChoices: recommendedChoices,
  featureSelections: defaultFeatureSelections,
  checklist: defaultChecklist,
  metaBudget: 1000,
  googleBudget: 1500,
  contentBudget: 250,
  aiApiBudget: 250,
  aiDevelopmentBudget: 150,
  aiMediaBudget: 150,
  currentAnnualRevenue: 624000,
  currentAnnualSales: 104,
  grossMargin: 38,
  acquisitionCostPerSale: 1500,
  incrementalCostPerSale: 150,
  involvement: "structured",
  hoursPerWeek: 10,
  clientName: "",
  notes: "",
  workedHours: {
    website: 0,
    content: 0,
    marketing: 0,
    automation: 0,
    infrastructure: 0,
  },
};

export function calculateSiteModel(state: SiteState) {
  const selectedOptions = choiceGroups.map((group) =>
    group.options.find((option) => option.id === state.toolChoices[group.id]) ?? group.options[0],
  );
  const recommendedOptions = choiceGroups.map((group) =>
    group.options.find((option) => option.recommended) ?? group.options[0],
  );
  const selectedFeatures = features.filter((feature) => state.featureSelections[feature.id]);
  const platformMonthly = selectedOptions.reduce((sum, option) => sum + option.monthly, 0);
  const recommendedMonthly = recommendedOptions.reduce((sum, option) => sum + option.monthly, 0);
  const adsMonthly = state.metaBudget + state.googleBudget;
  const aiMonthly = state.aiApiBudget + state.aiDevelopmentBudget + state.aiMediaBudget;
  const totalMonthly = platformMonthly + adsMonthly + state.contentBudget + aiMonthly;
  const annualOperating = totalMonthly * 12;

  const currentUnitsYear = Math.max(0, state.currentAnnualSales);
  const currentRevenue = Math.max(0, state.currentAnnualRevenue);
  const averageSalePrice = currentUnitsYear > 0 ? currentRevenue / currentUnitsYear : 0;
  const currentSalesPerWeek = currentUnitsYear / 52;

  const readiness = Math.min(
    1.18,
    0.62 + selectedFeatures.length * 0.035 + (state.involvement === "structured" ? Math.min(state.hoursPerWeek, 20) * 0.018 : 0.02),
  );
  const effectiveGrowthBudgetMonthly =
    adsMonthly +
    state.contentBudget * 0.7 +
    state.aiApiBudget * 0.55 +
    state.aiDevelopmentBudget * 0.25 +
    state.aiMediaBudget * 0.55 +
    platformMonthly * 0.12;
  const baseExtraSales = effectiveGrowthBudgetMonthly > 0
    ? (effectiveGrowthBudgetMonthly * 12 / Math.max(state.acquisitionCostPerSale, 1)) * readiness
    : 0;
  const lowExtraSales = baseExtraSales * 0.65;
  const highExtraSales = baseExtraSales * 1.35;
  const baseExtraRevenue = baseExtraSales * averageSalePrice;
  const lowExtraRevenue = lowExtraSales * averageSalePrice;
  const highExtraRevenue = highExtraSales * averageSalePrice;
  const growthPct = currentRevenue ? baseExtraRevenue / currentRevenue * 100 : 0;
  const grossProfitPerSale = Math.max(
    0,
    averageSalePrice / 1.2 * state.grossMargin / 100 - state.incrementalCostPerSale,
  );
  const breakEvenSales = grossProfitPerSale ? annualOperating / grossProfitPerSale : 0;
  const expectedContribution = baseExtraSales * grossProfitPerSale - annualOperating;
  const contributionRoi = annualOperating ? expectedContribution / annualOperating * 100 : 0;
  const buildHoursLow = selectedFeatures.reduce((sum, feature) => sum + feature.hoursLow, 0);
  const buildHoursHigh = selectedFeatures.reduce((sum, feature) => sum + feature.hoursHigh, 0);
  const marketBuildLow = selectedFeatures.reduce((sum, feature) => sum + feature.marketLow, 0);
  const marketBuildHigh = selectedFeatures.reduce((sum, feature) => sum + feature.marketHigh, 0);
  const completedTasks = checklistItems.filter((item) => state.checklist[item.id]).length;
  const checklistProgress = Math.round(completedTasks / checklistItems.length * 100);
  const totalWorkedHours = Object.values(state.workedHours).reduce((sum, value) => sum + value, 0);

  return {
    selectedOptions,
    selectedFeatures,
    platformMonthly,
    recommendedMonthly,
    adsMonthly,
    aiMonthly,
    totalMonthly,
    annualOperating,
    currentUnitsYear,
    currentRevenue,
    averageSalePrice,
    currentSalesPerWeek,
    lowExtraSales,
    baseExtraSales,
    highExtraSales,
    lowExtraRevenue,
    baseExtraRevenue,
    highExtraRevenue,
    growthPct,
    grossProfitPerSale,
    breakEvenSales,
    expectedContribution,
    contributionRoi,
    buildHoursLow,
    buildHoursHigh,
    marketBuildLow,
    marketBuildHigh,
    completedTasks,
    checklistProgress,
    totalWorkedHours,
  };
}
