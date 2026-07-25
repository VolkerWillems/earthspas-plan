import { Globe, Database, RocketLaunch } from "@/lib/phosphor-icons";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const steps = [
  { number: "01", icon: Globe, title: "Lead komt binnen", copy: "Website, advertenties, showroom of serviceformulier leveren één herkenbare aanvraag op." },
  { number: "02", icon: Database, title: "Data wordt verrijkt", copy: "Bron, regio, interesse, status en opvolging worden centraal in CRM en workflows vastgelegd." },
  { number: "03", icon: RocketLaunch, title: "Actie wordt gestart", copy: "Sales, afspraak, offerte, reminder of serviceproces krijgt automatisch de juiste vervolgstap." },
];

export default function HowItWorksBlock() {
  return (
    <div className="w-full">
      <div className="mb-7"><p className="eyebrow">Procesflow</p><h2 className="mt-2 text-3xl font-normal uppercase tracking-tight">Van aanvraag naar actie</h2><p className="mt-3 max-w-2xl text-muted-foreground">De software verbindt marketing, verkoop en service zonder handmatig kopieerwerk tussen losse systemen.</p></div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {steps.map(({ number, icon: Icon, title, copy }) => (
          <Card key={number} className="relative p-6"><span className="absolute right-5 top-5 text-xs text-muted-foreground">{number}</span><CardHeader className="p-0"><span className="flex size-12 items-center justify-center border border-border bg-muted"><Icon className="size-5" /></span><CardTitle className="mt-5 text-base font-normal uppercase">{title}</CardTitle><CardDescription className="mt-2 text-sm leading-6">{copy}</CardDescription></CardHeader></Card>
        ))}
      </div>
    </div>
  );
}
