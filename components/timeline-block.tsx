import { CalendarBlank, Check, Database, Robot, RocketLaunch } from "@/lib/phosphor-icons";
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
    <section className="timeline-block">
      <SectionHeader
        eyebrow="Development timeline"
        title="Van basis naar automatisering"
        text="Nieuwe software volgt pas nadat eigenaarschap, data en processen betrouwbaar zijn."
      />
      <ol className="timeline-list">
        {milestones.map((item, index) => {
          const last = index === milestones.length - 1;
          const Icon = item.icon;

          return (
            <li key={item.title} className="timeline-item">
              <div className="timeline-rail" aria-hidden="true">
                <span className="timeline-marker">
                  <Icon weight="duotone" />
                </span>
                {!last && <span className="timeline-line" />}
              </div>
              <div className="timeline-content">
                <div className="timeline-meta">
                  <span className="timeline-date">{item.date}</span>
                  <Badge variant={variants[item.status]}>{item.status}</Badge>
                </div>
                <h3 className="timeline-title">{item.title}</h3>
                <p className="timeline-copy">{item.copy}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
