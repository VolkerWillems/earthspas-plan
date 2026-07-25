import "@/lib/choice-runtime-additions";
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

const approvedDefaultToolChoices: Record<string, string> = {
  ...recommendedChoices,
  payment: "prepaid-card",
  workspace: "m365",
  source: "github-team",
  dns: "cloudflare",
  server: "hetzner-production",
  cms: "directus",
  automation: "make",
  secrets: "doppler",
  database: "supabase-pro",
  frontend: "vercel-pro",
  "transactional-email": "resend-pro",
  "ai-workspace": "chatgpt-pro5",
  design: "figma-pro",
  "social-content": "canva-pro",
  "coding-ai": "copilot-proplus",
  stock: "free-assets",
  voice: "elevenlabs",
  "video-ai": "runway",
};

const approvedDefaultFeatures = Object.fromEntries(
  Object.keys(defaultFeatureSelections).map((featureId) => [featureId, true]),
);

export const defaultSiteState: SiteState = {
  toolChoices: approvedDefaultToolChoices,
  featureSelections: approvedDefaultFeatures,
  checklist: defaultChecklist,
  metaBudget: 500,
  googleBudget: 0,
  contentBudget: 250,
  aiApiBudget: 100,
  aiDevelopmentBudget: 0,
  aiMediaBudget: 150,
  currentAnnualRevenue: 624000,
  currentAnnualSales: 102,
  grossMargin: 38,
  acquisitionCostPerSale: 1200,
  incrementalCostPerSale: 0,
  involvement: "structured",
  hoursPerWeek: 24,
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

  // Only spend that actively supports acquisition is used to predict extra sales.
  // Fixed accounts, hosting and development tooling remain part of total break-even,
  // but they do not magically produce customers by themselves.
  const growthBudgetMonthly =
    adsMonthly + state.contentBudget + state.aiApiBudget + state.aiMediaBudget;
  const growthBudgetAnnual = growthBudgetMonthly * 12;
  const baseAcquisitionCost = Math.max(state.acquisitionCostPerSale, 1);
  const conservativeAcquisitionCost = baseAcquisitionCost * 1.25;
  const strongAcquisitionCost = baseAcquisitionCost * 0.75;

  const lowExtraSales = growthBudgetAnnual / conservativeAcquisitionCost;
  const baseExtraSales = growthBudgetAnnual / baseAcquisitionCost;
  const highExtraSales = growthBudgetAnnual / strongAcquisitionCost;
  const lowExtraRevenue = lowExtraSales * averageSalePrice;
  const baseExtraRevenue = baseExtraSales * averageSalePrice;
  const highExtraRevenue = highExtraSales * averageSalePrice;
  const growthPct = currentRevenue ? (baseExtraRevenue / currentRevenue) * 100 : 0;

  const grossProfitPerSale = Math.max(
    0,
    averageSalePrice / 1.21 * state.grossMargin / 100 - state.incrementalCostPerSale,
  );
  const breakEvenSales = grossProfitPerSale ? annualOperating / grossProfitPerSale : 0;
  const marketingBreakEvenSales = grossProfitPerSale ? growthBudgetAnnual / grossProfitPerSale : 0;
  const marketingContributionLow = lowExtraSales * grossProfitPerSale - growthBudgetAnnual;
  const marketingContributionBase = baseExtraSales * grossProfitPerSale - growthBudgetAnnual;
  const marketingContributionHigh = highExtraSales * grossProfitPerSale - growthBudgetAnnual;
  const expectedContribution = baseExtraSales * grossProfitPerSale - annualOperating;
  const contributionRoi = annualOperating ? expectedContribution / annualOperating * 100 : 0;
  const buildHoursLow = selectedFeatures.reduce((sum, feature) => sum + feature.hoursLow, 0);
  const buildHoursHigh = selectedFeatures.reduce((sum, feature) => sum + feature.hoursHigh, 0);
  const marketBuildLow = selectedFeatures.reduce((sum, feature) => sum + feature.marketLow, 0);
  const marketBuildHigh = selectedFeatures.reduce((sum, feature) => sum + feature.marketHigh, 0);
  const completedTasks = checklistItems.filter((item) => state.checklist[item.id]).length;
  const checklistProgress = Math.round(completedTasks / checklistItems.length * 100);
  const enteredWorkedHours = Object.values(state.workedHours).reduce((sum, value) => sum + value, 0);
  // The registered project baseline is 950 hours. Legacy browser state stored five zeroes,
  // which must not overwrite the confirmed baseline in the executive summary.
  const totalWorkedHours = enteredWorkedHours || 950;

  return {
    selectedOptions,
    selectedFeatures,
    platformMonthly,
    recommendedMonthly,
    adsMonthly,
    aiMonthly,
    totalMonthly,
    annualOperating,
    growthBudgetMonthly,
    growthBudgetAnnual,
    baseAcquisitionCost,
    conservativeAcquisitionCost,
    strongAcquisitionCost,
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
    marketingBreakEvenSales,
    marketingContributionLow,
    marketingContributionBase,
    marketingContributionHigh,
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
