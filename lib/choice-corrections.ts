import {
  checklistItems,
  choiceGroups,
  pricingReview,
  recommendedChoices,
} from "@/lib/choice-data";
import { softwareGroupGuidance } from "@/lib/software-choice-guidance";

function group(groupId: string) {
  const value = choiceGroups.find((item) => item.id === groupId);
  if (!value) throw new Error(`Missing choice group: ${groupId}`);
  return value;
}

function recommendOnly(groupId: string, optionId: string) {
  const value = group(groupId);
  value.options.forEach((option) => {
    option.recommended = option.id === optionId;
  });
  recommendedChoices[groupId] = optionId;
}

pricingReview.reviewedAt = "25 juli 2026";
pricingReview.note = "Bedragen zijn de afgesproken planningsbedragen voor Earth Spas. Alleen noodzakelijke vaste diensten staan standaard geselecteerd; creatieve, AI- en productietools blijven optioneel en worden pas na budgetgoedkeuring geactiveerd.";

const workspace = group("workspace");
const microsoft = workspace.options.find((option) => option.id === "m365");
if (microsoft) {
  microsoft.name = "Microsoft 365 Business";
  microsoft.monthly = 14;
  microsoft.description = "Zakelijke Microsoft-licentie voor mail, agenda, bestanden en centraal beheer. Vast planningsbedrag: €14 per maand.";
}
recommendOnly("workspace", "m365");

const passwordGroupIndex = choiceGroups.findIndex((item) => item.id === "passwords");
if (passwordGroupIndex >= 0) choiceGroups.splice(passwordGroupIndex, 1);
delete recommendedChoices.passwords;
delete softwareGroupGuidance.passwords;

const passwordTaskIndex = checklistItems.findIndex((item) => item.id === "passwords");
if (passwordTaskIndex >= 0) checklistItems.splice(passwordTaskIndex, 1);

const server = group("server");
const productionServer = server.options.find((option) => option.id === "hetzner-production");
if (productionServer) {
  productionServer.monthly = 103;
  productionServer.description = "Werkelijk planningsbedrag voor de Earth Spas-productieserver, back-ups, monitoring en benodigde servercapaciteit.";
}
server.options = server.options.filter((option) => option.id !== "managed-server");
recommendOnly("server", "hetzner-production");

recommendOnly("payment", "prepaid-card");
recommendOnly("ai-workspace", "no-chatgpt");
recommendOnly("design", "figma-free");
recommendOnly("social-content", "canva-free");
recommendOnly("coding-ai", "no-coding-ai");
recommendOnly("stock", "free-assets");
recommendOnly("voice", "no-voice");
recommendOnly("video-ai", "video-credits-only");

softwareGroupGuidance.payment = {
  simple: "Dit bepaalt van welke kaart alle software, advertenties en AI-kosten worden betaald.",
  reason: "Een prepaid of virtuele Earth Spas-kaart met een vooraf vastgesteld saldo geeft direct controle en voorkomt dat digitale kosten nog via een persoonlijke kaart lopen.",
  benefits: ["Kosten staan direct los van privé-uitgaven.", "Het beschikbare saldo vormt een harde bestedingsgrens.", "Software en advertenties kunnen na akkoord direct worden geactiveerd."],
  drawbacks: ["De kaart moet tijdig worden opgewaardeerd.", "Saldo en terugkerende betalingen moeten maandelijks worden gecontroleerd."],
};

softwareGroupGuidance.workspace.reason = "Microsoft 365 vormt de centrale zakelijke omgeving voor mail, agenda en bestanden. Voor deze keuzehulp geldt het afgesproken bedrag van €14 per maand. Wachtwoorden blijven in Microsoft Edge, dus daar is geen extra tool of abonnement voor nodig.";
softwareGroupGuidance.server.reason = "De Earth Spas-productieserver is begroot op €103 per maand voor de benodigde capaciteit, back-ups en monitoring.";
