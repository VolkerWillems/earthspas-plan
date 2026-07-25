import { choiceGroups } from "@/lib/choice-data";

const automationGroup = choiceGroups.find((group) => group.id === "automation");

if (automationGroup && !automationGroup.options.some((option) => option.id === "make")) {
  automationGroup.options.push({
    id: "make",
    groupId: "automation",
    name: "Make Core · Earth Spas-account",
    monthly: 10,
    description: "Eigen Earth Spas-account voor de goedgekeurde workflows, met eigen billing, credentials en minimaal twee beheerders.",
    logoSlug: "make",
    icon: "flow",
  });
}
