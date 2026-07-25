"use client";

import * as React from "react";
import { Check, X } from "@/lib/phosphor-icons";
import { cn } from "@/lib/utils";
import "./hero-mockup-gallery.module.css";

export type HeroMockupItem = {
  id: string;
  label: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  kind?: "desktop" | "mobile";
};

export function HeroMockupGallery({
  eyebrow,
  items,
}: {
  eyebrow: string;
  items: HeroMockupItem[];
}) {
  const [activeId, setActiveId] = React.useState(items[0]?.id ?? "");
  const [expanded, setExpanded] = React.useState(false);
  const active = items.find((item) => item.id === activeId) ?? items[0];

  React.useEffect(() => {
    if (!expanded) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [expanded]);

  if (!active) return null;

  return (
    <div className="hero-mockup" aria-label={eyebrow}>
      <div className="hero-mockup-heading">
        <div>
          <p className="hero-mockup-eyebrow">{eyebrow}</p>
          <p className="hero-mockup-note"><Check className="h-4 w-4" /> Functioneel concept, branding en gegevens worden aangepast aan Earth Spas.</p>
        </div>
        {items.length > 1 && (
          <div className="hero-mockup-tabs" role="tablist" aria-label="Mockup kiezen">
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={item.id === active.id}
                onClick={() => setActiveId(item.id)}
                className={cn("hero-mockup-tab", item.id === active.id && "hero-mockup-tab-active")}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <button
        key={active.id}
        type="button"
        className={cn("hero-mockup-stage", active.kind === "mobile" && "hero-mockup-stage-mobile")}
        onClick={() => setExpanded(true)}
        aria-label={`${active.title} op groot formaat bekijken`}
      >
        <span className="hero-mockup-toolbar" aria-hidden="true">
          <span /><span /><span />
          <span className="hero-mockup-toolbar-label">Concept preview</span>
        </span>
        <span className="hero-mockup-canvas">
          <img src={active.image} alt={active.imageAlt} loading="eager" />
        </span>
        <span className="hero-mockup-expand">Klik voor groot beeld</span>
      </button>

      <div key={`${active.id}-copy`} className="hero-mockup-copy">
        <p className="hero-mockup-title">{active.title}</p>
        <p>{active.description}</p>
      </div>

      {expanded && (
        <div className="mockup-lightbox" role="dialog" aria-modal="true" aria-label={active.title}>
          <button className="mockup-lightbox-backdrop" type="button" onClick={() => setExpanded(false)} aria-label="Sluiten" />
          <div className={cn("mockup-lightbox-panel", active.kind === "mobile" && "mockup-lightbox-panel-mobile")}>
            <div className="mockup-lightbox-header">
              <div>
                <p className="hero-mockup-eyebrow">Conceptvisualisatie</p>
                <h2>{active.title}</h2>
              </div>
              <button type="button" className="mockup-lightbox-close" onClick={() => setExpanded(false)} aria-label="Mockup sluiten"><X className="h-5 w-5" /></button>
            </div>
            <div className="mockup-lightbox-image"><img src={active.image} alt={active.imageAlt} /></div>
            <p className="mockup-lightbox-caption">{active.description} De getoonde namen, cijfers en Nexora-branding zijn uitsluitend illustratief.</p>
          </div>
        </div>
      )}
    </div>
  );
}
