import { BrandIconGroup, type BrandIconItem } from "@/components/ui/brand-icon";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type Integration = {
  name: string;
  description: string;
  icons: BrandIconItem[];
  status: string;
};

const integrations: Integration[] = [
  {
    name: "GitHub",
    description: "Broncode, versies en gecontroleerde releases.",
    icons: [{ src: "/brand-icons/github.svg", label: "GitHub", invert: true }],
    status: "Actief",
  },
  {
    name: "Vercel",
    description: "Frontenddeployments, domeinen en productiehosting.",
    icons: [{ src: "/brand-icons/vercel.svg", label: "Vercel" }],
    status: "Actief",
  },
  {
    name: "Supabase / database",
    description: "CRM-data, formulieren, accounts en rapportagebasis.",
    icons: [{ src: "/brand-icons/supabase.svg", label: "Supabase" }],
    status: "Gefaseerd",
  },
  {
    name: "GA4 en GTM",
    description: "Gedrag, conversies en campagne-attributie.",
    icons: [
      { src: "/brand-icons/google-analytics.svg", label: "Google Analytics" },
      { src: "/brand-icons/google-tag-manager.svg", label: "Google Tag Manager" },
    ],
    status: "Inrichten",
  },
  {
    name: "Meta en Google Ads",
    description: "Campagnes, doelgroepen en remarketing.",
    icons: [
      { src: "/brand-icons/meta.svg", label: "Meta" },
      { src: "/brand-icons/google-ads.svg", label: "Google Ads" },
    ],
    status: "Testfase",
  },
  {
    name: "Sales en service",
    description: "Afspraken, offertes, opvolging en supporthistorie.",
    icons: [
      { src: "/brand-icons/directus.svg", label: "Directus" },
      { src: "/brand-icons/n8n.svg", label: "n8n" },
    ],
    status: "Gepland",
  },
];

export default function IntegrationsBlock() {
  return (
    <div className="w-full">
      <div className="mb-[var(--space-8)] max-w-[var(--reading-max)]">
        <p className="eyebrow">Integraties</p>
        <h2 className="mt-[var(--space-2)] text-[length:var(--font-size-section)] font-normal uppercase tracking-[var(--tracking-tight)]">
          Systemen die samenwerken
        </h2>
        <p className="mt-[var(--space-3)] text-[length:var(--font-size-body)] leading-[var(--line-height-body)] text-[var(--text-secondary)]">
          Alleen koppelingen die eigenaarschap, meetbaarheid of opvolging verbeteren krijgen een plek.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-[var(--space-4)] sm:grid-cols-2 lg:grid-cols-3">
        {integrations.map(({ name, description, icons, status }) => (
          <Card key={name} className="h-full">
            <CardHeader className="h-full">
              <div className="flex items-start justify-between gap-[var(--space-4)]">
                <BrandIconGroup icons={icons} />
                <span className="shrink-0 rounded-[var(--radius)] border border-[var(--border-default)] bg-[var(--surface-raised)] px-[var(--space-2)] py-[var(--space-1)] text-[length:var(--font-size-2xs)] uppercase tracking-[var(--tracking-label)] text-[var(--text-muted)]">
                  {status}
                </span>
              </div>

              <div className="mt-[var(--space-4)] grid gap-[var(--space-2)]">
                <CardTitle className="uppercase tracking-[var(--tracking-wide)]">{name}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
