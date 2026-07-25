import { ChartBar, Code, Database, MagicWand, Server, Users } from "@/lib/phosphor-icons";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const integrations = [
  { name: "GitHub", description: "Broncode, versies en gecontroleerde releases.", icon: Code, status: "Actief" },
  { name: "Vercel", description: "Frontenddeployments, domeinen en productiehosting.", icon: Server, status: "Actief" },
  { name: "Supabase / database", description: "CRM-data, formulieren, accounts en rapportagebasis.", icon: Database, status: "Gefaseerd" },
  { name: "GA4 en GTM", description: "Gedrag, conversies en campagne-attributie.", icon: ChartBar, status: "Inrichten" },
  { name: "Meta en Google Ads", description: "Campagnes, doelgroepen en remarketing.", icon: MagicWand, status: "Testfase" },
  { name: "Sales en service", description: "Afspraken, offertes, opvolging en supporthistorie.", icon: Users, status: "Gepland" },
];

export default function IntegrationsBlock() {
  return (
    <div className="w-full">
      <div className="mb-7"><p className="eyebrow">Integraties</p><h2 className="mt-2 text-3xl font-normal uppercase tracking-tight">Systemen die samenwerken</h2><p className="mt-3 max-w-2xl text-muted-foreground">Alleen koppelingen die eigenaarschap, meetbaarheid of opvolging verbeteren krijgen een plek.</p></div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {integrations.map(({ name, description, icon: Icon, status }) => (
          <Card key={name}><CardHeader><span className="flex size-11 items-center justify-center border border-border bg-background"><Icon className="size-5" /></span><div className="mt-4 flex items-start justify-between gap-3"><CardTitle className="text-base font-normal">{name}</CardTitle><span className="text-xs uppercase tracking-[.12em] text-muted-foreground">{status}</span></div><CardDescription className="text-sm leading-6">{description}</CardDescription></CardHeader></Card>
        ))}
      </div>
    </div>
  );
}
