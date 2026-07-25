import {
  Briefcase,
  CalendarBlank,
  Database,
  FlowArrow,
  Globe,
  Robot,
  ShieldCheck,
  Users,
} from "@/lib/phosphor-icons";
import { Card } from "@/components/ui/card";

const flowNodes = [
  {
    id: "acquisition",
    number: "01",
    icon: Globe,
    title: "Website & campagnes",
    text: "Bezoekers komen binnen via organisch verkeer, advertenties, social media en lokale zoekresultaten.",
  },
  {
    id: "lead",
    number: "02",
    icon: Users,
    title: "Lead intake",
    text: "Formulieren, calls en showroominteresse worden als één herkenbaar klantrecord vastgelegd.",
  },
  {
    id: "appointment",
    number: "03",
    icon: CalendarBlank,
    title: "CRM & afspraken",
    text: "Kwalificatie, opvolging, reminders en showroomafspraken krijgen een vaste status en eigenaar.",
  },
  {
    id: "sale",
    number: "04",
    icon: Briefcase,
    title: "Offerte & verkoop",
    text: "Offertes, verkoopkansen, redenen van verlies en gerealiseerde omzet worden meetbaar gekoppeld.",
  },
  {
    id: "service",
    number: "05",
    icon: ShieldCheck,
    title: "Service & klantwaarde",
    text: "Installatie, onderhoud, support en aftercare blijven onderdeel van hetzelfde klantdossier.",
  },
] as const;

export function SoftwareFlowDiagram() {
  return (
    <section className="software-flow-section theme-primary" aria-labelledby="software-flow-title">
      <div className="content-shell">
        <div className="software-flow-header" data-reveal="up">
          <div>
            <p className="eyebrow">Softwareconcept · één gegevensstroom</p>
            <h2 id="software-flow-title">Klik naar klantwaarde</h2>
            <p>Marketing, verkoop, planning en service schrijven naar dezelfde klant- en productdata. Geen vijf dashboards met ieder hun eigen versie van de werkelijkheid.</p>
          </div>
          <Card className="software-flow-principle">
            <Database aria-hidden="true" />
            <span><strong>Single source of truth</strong>Directus, Supabase en gekoppelde services delen gecontroleerde gegevens.</span>
          </Card>
        </div>

        <div className="software-flow-canvas" data-reveal="up">
          <div className="software-flow-nodes">
            {flowNodes.map((node) => {
              const Icon = node.icon;
              return (
                <Card key={node.id} className="software-flow-node">
                  <div className="software-flow-node-top">
                    <span>{node.number}</span>
                    <Icon aria-hidden="true" />
                  </div>
                  <h3>{node.title}</h3>
                  <p>{node.text}</p>
                </Card>
              );
            })}
          </div>

          <Card className="software-flow-automation">
            <span className="software-flow-automation-icon"><Robot aria-hidden="true" /></span>
            <div>
              <p className="eyebrow">Ondersteunende automatisering</p>
              <h3>Agents voeren taken uit. Mensen houden beslissingen en uitzonderingen onder controle.</h3>
            </div>
            <FlowArrow aria-hidden="true" />
          </Card>
        </div>
      </div>
    </section>
  );
}
