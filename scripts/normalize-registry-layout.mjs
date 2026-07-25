import { writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

writeFileSync(
  join(root, "components/how-it-works-block.tsx"),
  `import { Globe, Database, RocketLaunch } from "@/lib/phosphor-icons";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeader } from "@/components/plan-ui";

const steps = [
  { number: "01", icon: Globe, title: "Lead komt binnen", copy: "Website, advertenties, showroom of serviceformulier leveren één herkenbare aanvraag op." },
  { number: "02", icon: Database, title: "Data wordt verrijkt", copy: "Bron, regio, interesse, status en opvolging worden centraal in CRM en workflows vastgelegd." },
  { number: "03", icon: RocketLaunch, title: "Actie wordt gestart", copy: "Sales, afspraak, offerte, reminder of serviceproces krijgt automatisch de juiste vervolgstap." },
];

export default function HowItWorksBlock() {
  return (
    <section className="w-full">
      <SectionHeader
        eyebrow="Procesflow"
        title="Van aanvraag naar actie"
        text="De software verbindt marketing, verkoop en service zonder handmatig kopieerwerk tussen losse systemen."
      />
      <div className="mt-[var(--space-6)] grid grid-cols-1 gap-[var(--space-4)] sm:grid-cols-3">
        {steps.map(({ number, icon: Icon, title, copy }) => (
          <Card key={number} className="relative p-[var(--card-padding)]">
            <span className="absolute right-[var(--space-4)] top-[var(--space-4)] text-xs text-muted-foreground">{number}</span>
            <CardHeader className="p-0">
              <span className="flex size-[var(--icon-box)] items-center justify-center rounded-[var(--radius-md)] border border-border bg-muted text-[var(--section-accent)]">
                <Icon className="size-[var(--font-size-icon)]" />
              </span>
              <CardTitle className="mt-[var(--space-5)] uppercase">{title}</CardTitle>
              <CardDescription className="mt-[var(--space-2)] leading-[var(--line-height-body)]">{copy}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
`,
);

writeFileSync(
  join(root, "components/integrations-block.tsx"),
  `import { ChartBar, Code, Database, MagicWand, Server, Users } from "@/lib/phosphor-icons";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeader } from "@/components/plan-ui";

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
    <section className="w-full">
      <SectionHeader
        eyebrow="Integraties"
        title="Systemen die samenwerken"
        text="Alleen koppelingen die eigenaarschap, meetbaarheid of opvolging verbeteren krijgen een plek."
      />
      <div className="mt-[var(--space-6)] grid grid-cols-1 gap-[var(--space-4)] sm:grid-cols-2 lg:grid-cols-3">
        {integrations.map(({ name, description, icon: Icon, status }) => (
          <Card key={name}>
            <CardHeader className="p-[var(--card-padding)]">
              <span className="flex size-[var(--icon-box)] items-center justify-center rounded-[var(--radius-md)] border border-border bg-muted text-[var(--section-accent)]">
                <Icon className="size-[var(--font-size-icon)]" />
              </span>
              <div className="mt-[var(--space-4)] flex items-start justify-between gap-[var(--space-3)]">
                <CardTitle>{name}</CardTitle>
                <span className="eyebrow shrink-0">{status}</span>
              </div>
              <CardDescription className="leading-[var(--line-height-body)]">{description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
`,
);

writeFileSync(
  join(root, "components/timeline-block.tsx"),
  `import { CalendarBlank, Check, Database, Robot, RocketLaunch } from "@/lib/phosphor-icons";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/plan-ui";

type Status = "Gereed" | "Bezig" | "Gepland";

const milestones = [
  { date: "Nu", title: "Digitale basis", copy: "Website, hosting, repositories, branding, PWA en eerste tracking staan als werkende basis.", icon: Check, status: "Gereed" as Status },
  { date: "0–30 dagen", title: "Eigenaarschap en meting", copy: "Accounts, billing, beheerders, consent en conversiemeting worden volledig onder Earth Spas gebracht.", icon: CalendarBlank, status: "Bezig" as Status },
  { date: "31–90 dagen", title: "CRM en leadflow", copy: "Leads, afspraken, offertes en verkoopstatussen worden centraal meetbaar en opvolgbaar.", icon: Database, status: "Gepland" as Status },
  { date: "3–6 maanden", title: "Sales- en serviceautomatisering", copy: "Reminders, lead recovery, servicetaken en managementsignalen worden geautomatiseerd.", icon: RocketLaunch, status: "Gepland" as Status },
  { date: "Na bewezen data", title: "Agents en voorspelling", copy: "AI ondersteunt advies, support, content en forecasting met menselijke controle.", icon: Robot, status: "Gepland" as Status },
];

const variants: Record<Status, "default" | "secondary" | "outline"> = {
  Gereed: "default",
  Bezig: "secondary",
  Gepland: "outline",
};

export default function TimelineBlock() {
  return (
    <section className="w-full max-w-[var(--reading-max)]">
      <SectionHeader
        eyebrow="Development timeline"
        title="Van basis naar automatisering"
        text="Nieuwe software volgt pas nadat eigenaarschap, data en processen betrouwbaar zijn."
      />
      <ol className="mt-[var(--space-6)] flex flex-col">
        {milestones.map((item, index) => {
          const last = index === milestones.length - 1;
          return (
            <li key={item.title} className="flex gap-[var(--space-5)]">
              <div className="flex flex-col items-center">
                <span className="flex size-[var(--icon-box)] shrink-0 items-center justify-center rounded-[var(--radius-md)] border border-border bg-card text-[var(--section-accent)]">
                  <item.icon className="size-[var(--font-size-icon)]" />
                </span>
                {!last && <span className="w-px flex-1 bg-border" />}
              </div>
              <div className={last ? "pb-0" : "pb-[var(--space-8)]"}>
                <div className="flex flex-wrap items-center gap-[var(--space-2)]">
                  <span className="font-mono text-xs text-muted-foreground">{item.date}</span>
                  <Badge variant={variants[item.status]}>{item.status}</Badge>
                </div>
                <h3 className="heading-card mt-[var(--space-2)] uppercase">{item.title}</h3>
                <p className="mt-[var(--space-2)] text-sm leading-[var(--line-height-body)] text-muted-foreground">{item.copy}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
`,
);

console.log("Normalized generated 7Ovr sections to shared Earth Spas components and tokens.");
