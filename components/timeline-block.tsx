import { CalendarBlank, Check, Database, Robot, RocketLaunch } from "@/lib/phosphor-icons";
import { Badge } from "@/components/ui/badge";

type Status = "Gereed" | "Bezig" | "Gepland";
const milestones = [
  { date: "Nu", title: "Digitale basis", copy: "Website, hosting, repositories, branding, PWA en eerste tracking staan als werkende basis.", icon: Check, status: "Gereed" as Status },
  { date: "0–30 dagen", title: "Eigenaarschap en meting", copy: "Accounts, billing, beheerders, consent en conversiemeting worden volledig onder Earth Spas gebracht.", icon: CalendarBlank, status: "Bezig" as Status },
  { date: "31–90 dagen", title: "CRM en leadflow", copy: "Leads, afspraken, offertes en verkoopstatussen worden centraal meetbaar en opvolgbaar.", icon: Database, status: "Gepland" as Status },
  { date: "3–6 maanden", title: "Sales- en serviceautomatisering", copy: "Reminders, lead recovery, servicetaken en managementsignalen worden geautomatiseerd.", icon: RocketLaunch, status: "Gepland" as Status },
  { date: "Na bewezen data", title: "Agents en voorspelling", copy: "AI ondersteunt advies, support, content en forecasting met menselijke controle.", icon: Robot, status: "Gepland" as Status },
];
const variants: Record<Status, "default" | "secondary" | "outline"> = { Gereed: "default", Bezig: "secondary", Gepland: "outline" };

export default function TimelineBlock() {
  return (
    <div className="w-full max-w-3xl">
      <div className="mb-8"><p className="eyebrow">Development timeline</p><h2 className="mt-2 text-3xl font-normal uppercase tracking-tight">Van basis naar automatisering</h2><p className="mt-3 text-muted-foreground">Nieuwe software volgt pas nadat eigenaarschap, data en processen betrouwbaar zijn.</p></div>
      <ol className="flex flex-col">
        {milestones.map((item, index) => { const last = index === milestones.length - 1; return (
          <li key={item.title} className="flex gap-5"><div className="flex flex-col items-center"><span className="flex size-10 shrink-0 items-center justify-center border border-border bg-card"><item.icon className="size-5" /></span>{!last && <span className="w-px flex-1 bg-border" />}</div><div className={last ? "pb-0" : "pb-9"}><div className="flex flex-wrap items-center gap-2.5"><span className="font-mono text-xs text-muted-foreground">{item.date}</span><Badge variant={variants[item.status]}>{item.status}</Badge></div><h3 className="mt-2 text-base font-normal uppercase">{item.title}</h3><p className="mt-1.5 text-sm leading-6 text-muted-foreground">{item.copy}</p></div></li>
        ); })}
      </ol>
    </div>
  );
}
