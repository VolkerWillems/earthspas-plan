import { choiceGroups, pricingReview, recommendedChoices } from "@/lib/choice-data";
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

const passwords = group("passwords");
passwords.title = "Wachtwoorden en hersteltoegang";
passwords.description = "Geen extra abonnement; herstelcodes en tweede beheerder worden binnen de bestaande beheerafspraken vastgelegd.";
passwords.options = [
  {
    id: "passwords-current",
    groupId: "passwords",
    name: "Geen extra wachtwoordtool",
    monthly: 0,
    description: "Bitwarden is niet nodig. Herstelcodes, 2FA en tweede toegang worden zonder extra abonnement georganiseerd.",
    recommended: true,
    icon: "key",
  },
];
recommendedChoices.passwords = "passwords-current";

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

softwareGroupGuidance.passwords = {
  simple: "Herstelcodes, tweestapsverificatie en tweede toegang moeten overdraagbaar zijn, maar daar is nu geen extra abonnement voor nodig.",
  reason: "De bestaande beheerafspraken zijn voldoende zolang herstelcodes centraal worden vastgelegd en minimaal twee beheerders toegang hebben.",
  benefits: ["Geen extra maandkosten.", "Bitwarden hoeft niet te worden ingericht of onderhouden.", "Toegang en herstel blijven wel aantoonbaar geregeld."],
  drawbacks: ["De handmatige beheerafspraken moeten consequent worden gevolgd.", "Herstelcodes en wijzigingen moeten direct worden bijgewerkt."],
};

softwareGroupGuidance.workspace.reason = "Microsoft 365 vormt de centrale zakelijke omgeving voor mail, agenda en bestanden. Voor deze keuzehulp geldt het afgesproken bedrag van €14 per maand.";
softwareGroupGuidance.server.reason = "De Earth Spas-productieserver is begroot op €103 per maand voor de benodigde capaciteit, back-ups en monitoring.";
