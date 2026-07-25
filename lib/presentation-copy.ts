import type { ChecklistItem, ChoiceOption } from "@/lib/choice-data";

const ownerLabels: Record<string, string> = {
  "Jeroen / Wim": "Directie / finance",
  "Volker + Jeroen": "Earth Spas + technisch beheer",
  "Jeroen + Volker": "Earth Spas + technisch beheer",
  Volker: "Technisch beheer",
  Samen: "Gezamenlijk",
  "Earth Spas": "Earth Spas",
};

export function getBusinessOwnerLabel(owner: string) {
  return ownerLabels[owner] ?? owner;
}

export function getBusinessTaskTitle(task: ChecklistItem) {
  if (task.id === "workform") return "Uitvoeringsvorm en structurele capaciteit vastleggen";
  return task.title;
}

export function getBusinessOptionDescription(option: ChoiceOption) {
  if (option.id === "chatgpt-pro5") {
    return "Voorkeurskeuze voor structureel en intensief individueel gebruik binnen ontwikkeling, analyse en contentproductie.";
  }
  return option.description;
}
