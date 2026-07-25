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
            <h2 id="software-flow-title">Van eerste klik naar verkoop en langdurige service</h2>
            <p>De toekomstige software wordt niet opgebouwd als vijf losse dashboards. Iedere stap schrijft naar dezelfde klant- en productdata, zodat marketing, verkoop, planning en service eindelijk niet meer ieder hun eigen versie van de werkelijkheid beheren.</p>
          </div>
          <div className="software-flow-principle">
            <Database aria-hidden="true" />
            <span><strong>Single source of truth</strong>Directus, Supabase en gekoppelde services delen gecontroleerde gegevens.</span>
          </div>
        </div>

        <div className="software-flow-canvas" data-reveal="up">
          <svg className="software-flow-lines" viewBox="0 0 1200 260" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="flowLineGradient" x1="0" x2="1">
                <stop offset="0%" stopColor="var(--brand-primary)" stopOpacity=".25" />
                <stop offset="45%" stopColor="var(--brand-primary)" stopOpacity="1" />
                <stop offset="100%" stopColor="var(--brand-secondary)" stopOpacity=".65" />
              </linearGradient>
              <filter id="flowGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <path className="software-flow-line software-flow-line-main" d="M110 130C220 28 315 28 425 130S625 232 735 130 930 28 1090 130" />
            <path className="software-flow-line software-flow-line-return" d="M1090 168C930 242 800 220 694 170S438 94 110 180" />
            <circle className="software-flow-packet software-flow-packet-a" r="6" />
            <circle className="software-flow-packet software-flow-packet-b" r="5" />
            <circle className="software-flow-packet software-flow-packet-c" r="4" />
          </svg>

          <div className="software-flow-nodes">
            {flowNodes.map((node) => {
              const Icon = node.icon;
              return (
                <article key={node.id} className="software-flow-node">
                  <div className="software-flow-node-top">
                    <span>{node.number}</span>
                    <Icon aria-hidden="true" />
                  </div>
                  <h3>{node.title}</h3>
                  <p>{node.text}</p>
                </article>
              );
            })}
          </div>

          <div className="software-flow-automation">
            <span className="software-flow-automation-icon"><Robot aria-hidden="true" /></span>
            <div>
              <p className="eyebrow">Automatisering als ondersteunende laag</p>
              <h3>Agents voeren taken uit, mensen houden beslissingen en uitzonderingen onder controle</h3>
            </div>
            <FlowArrow aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
