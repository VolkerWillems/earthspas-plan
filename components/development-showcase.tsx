"use client";

import * as React from "react";
import {
  ArrowRight,
  ChartLine,
  Code,
  Database,
  Image,
  MagicWand,
  Robot,
  Server,
  ShieldCheck,
  Target,
} from "@/lib/phosphor-icons";
import { projectBaseline } from "@/lib/project-baseline";
import { cn, number } from "@/lib/utils";

const slides = [
  { id: "strategy", title: "Strategie en projectrichting", hours: 35, icon: Target, delivered: "Scope, prioriteiten, projectstructuur en samenhang tussen website, marketing, techniek en toekomstige software.", opportunity: "Nieuwe keuzes kunnen sneller worden beoordeeld en uitgevoerd zonder telkens opnieuw vanaf nul te beginnen." },
  { id: "infrastructure", title: "Techniek en infrastructuur", hours: 131, icon: Server, delivered: "Repositories, hosting, domeinen, accountstructuur, beveiliging en de technische basis voor centraal beheer.", opportunity: "Een stabiele basis maakt uitbreiding, onderhoud en overdracht veiliger en beter voorspelbaar." },
  { id: "website", title: "Website, ontwerp en kwaliteit", hours: 252, icon: Code, delivered: "Meertalige website, responsive componenten, designsysteem, pagina-opbouw en uitgebreide kwaliteitscontrole.", opportunity: "De website kan gericht worden doorontwikkeld naar meer aanvragen, afspraken en meetbare verkoopkansen." },
  { id: "content", title: "Content, beelden en assets", hours: 144, icon: Image, delivered: "Productcontent, leveranciersmateriaal en een gestructureerde bibliotheek met herbruikbare afbeeldingen en video’s.", opportunity: "Bestaande content kan efficiënter worden ingezet voor campagnes, social media, SEO en verkoopondersteuning." },
  { id: "backend", title: "CMS, backend en integraties", hours: 88, icon: Database, delivered: "Contentbeheer, formulieren, databasebasis, reviews, logging en voorbereiding van technische koppelingen.", opportunity: "Leads en klantdata kunnen centraal worden verzameld en later rechtstreeks worden gekoppeld aan CRM en automatisering." },
  { id: "marketing", title: "Marketing, SEO en analytics", hours: 113, icon: ChartLine, delivered: "Meetbare kanalen, socialprofielen, advertentietests, lokale zichtbaarheid, analytics en een basis voor vindbaarheid.", opportunity: "De bewezen basis kan worden uitgebouwd naar structurele campagnes en volledige meting van advertentie tot verkoop." },
  { id: "ai", title: "AI-agents en automatisering", hours: 37, icon: Robot, delivered: "Herbruikbare projectkennis, contextoverdracht en voorbereiding van agents voor marketing, support en interne processen.", opportunity: "Terugkerend werk kan stapsgewijs worden geautomatiseerd zonder controle over kwaliteit en gegevens te verliezen." },
  { id: "quality", title: "Doorontwikkeling en controles", hours: 150, icon: ShieldCheck, delivered: "Recente verbeteringen, platformuitwerking, controles en aanvullende ontwikkeling bovenop het eerdere detailoverzicht.", opportunity: "De opgebouwde omgeving kan gecontroleerd doorgroeien in plaats van te blijven hangen als een eenmalig project." },
] as const;

const AUTO_DELAY = 5600;

export function DevelopmentShowcase() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const [reducedMotion, setReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  React.useEffect(() => {
    if (paused || reducedMotion) return;
    const timer = window.setInterval(() => setActiveIndex((current) => (current + 1) % slides.length), AUTO_DELAY);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion]);

  const active = slides[activeIndex];
  const ActiveIcon = active.icon;

  return (
    <div
      className="dev-showcase"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false);
      }}
    >
      <div className="dev-showcase__summary">
        <div><span>Totale geregistreerde inzet</span><strong>{number.format(projectBaseline.totalHours)} uur</strong></div>
        <div><span>Uitgewerkte onderdelen</span><strong>{slides.length}</strong></div>
        <div><span>Bestaande fundamenten</span><strong>{projectBaseline.foundation.length}</strong></div>
        <p>Alleen aantoonbaar uitgevoerd werk. Geen abonnementen, scenario-budgetten of toekomstige uitgaven.</p>
      </div>

      <div className="dev-showcase__stage">
        <div key={active.id} className="dev-showcase__active" aria-live="polite">
          <div className="dev-showcase__active-header">
            <span className="dev-showcase__icon"><ActiveIcon aria-hidden="true" /></span>
            <span className="dev-showcase__counter">0{activeIndex + 1} / 0{slides.length}</span>
          </div>

          <div className="dev-showcase__body">
            <p className="eyebrow">Wat is opgebouwd</p>
            <h3>{active.title}</h3>
            <div className="dev-showcase__hours"><span>{active.hours}</span> uur</div>
            <p className="dev-showcase__delivered">{active.delivered}</p>
            <div className="dev-showcase__opportunity">
              <MagicWand aria-hidden="true" />
              <div><span>Groeikans</span><p>{active.opportunity}</p></div>
            </div>
          </div>

          <div className="dev-showcase__footer">
            <button type="button" onClick={() => setActiveIndex((current) => (current - 1 + slides.length) % slides.length)} aria-label="Vorig ontwikkeld onderdeel">
              <ArrowRight className="dev-showcase__previous" />
            </button>
            <div className="dev-showcase__progress" aria-hidden="true">
              <span
                key={`${active.id}-${paused}`}
                className={cn("dev-showcase__progress-fill", paused && "is-paused")}
                style={{ "--dev-showcase-duration": `${AUTO_DELAY}ms` } as React.CSSProperties}
              />
            </div>
            <button type="button" onClick={() => setActiveIndex((current) => (current + 1) % slides.length)} aria-label="Volgend ontwikkeld onderdeel"><ArrowRight /></button>
          </div>
        </div>

        <div className="dev-showcase__navigation" role="tablist" aria-label="Opgebouwde onderdelen">
          {slides.map((slide, index) => {
            const Icon = slide.icon;
            const selected = index === activeIndex;
            return (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveIndex(index)}
                className={cn("dev-showcase__nav-item", selected && "is-active")}
              >
                <span className="dev-showcase__nav-icon"><Icon aria-hidden="true" /></span>
                <span className="dev-showcase__nav-copy"><span>{slide.title}</span><small>{slide.hours} uur</small></span>
                <span className="dev-showcase__nav-arrow"><ArrowRight aria-hidden="true" /></span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
