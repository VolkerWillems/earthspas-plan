"use client";

import * as React from "react";
import { ArrowRight, Globe, Target } from "@/lib/phosphor-icons";
import { useSiteState } from "@/components/site-state";
import { calculateSiteModel } from "@/lib/site-model";
import { euro, number } from "@/lib/utils";

const markets = [
  { id: "nl", label: "Nederland", status: "Direct actief", share: 45, path: "M87 89l22-12 20 8 7 19-8 22-20 6-18-13-8-18z", labelX: 108, labelY: 106 },
  { id: "de", label: "Duitsland · NRW", status: "Groeiprioriteit", share: 35, path: "M140 74l47-11 34 18 9 37-18 41-39 12-31-22-13-37z", labelX: 181, labelY: 114 },
  { id: "be", label: "België", status: "Tweede fase", share: 12, path: "M66 126l39-5 20 18-10 23-35 2-20-16z", labelX: 91, labelY: 146 },
  { id: "lu", label: "Luxemburg", status: "Compacte premiumtest", share: 8, path: "M122 153l15-3 10 12-7 16-15-2-7-11z", labelX: 133, labelY: 166 },
] as const;

type MarketId = (typeof markets)[number]["id"];

export function GrowthChoroplethCard() {
  const { state } = useSiteState();
  const model = calculateSiteModel(state);
  const [activeId, setActiveId] = React.useState<MarketId>("de");
  const activeMarket = markets.find((market) => market.id === activeId) ?? markets[0];
  const marketSales = model.baseExtraSales * activeMarket.share / 100;
  const marketRevenue = model.baseExtraRevenue * activeMarket.share / 100;

  return (
    <section className="growth-map-section theme-secondary" aria-labelledby="growth-map-title">
      <div className="content-shell">
        <div className="growth-map-card" data-reveal="up">
          <div className="growth-map-copy">
            <div className="growth-map-heading">
              <span className="growth-map-icon"><Globe aria-hidden="true" /></span>
              <div><p className="eyebrow">Indicatieve groeifocus</p><h1 id="growth-map-title">Van sterke basis naar meetbare regionale groei</h1></div>
            </div>

            <p className="growth-map-intro">De kaart vertaalt het huidige werkbudget naar een voorzichtig groeiscenario. Nederland en NRW staan voorop; België en Luxemburg volgen pas wanneer tracking, opvolging en conversie aantoonbaar werken.</p>

            <div className="growth-map-metrics" aria-label="Berekend groeiscenario">
              <div><span>Werkbasis</span><strong>+{number.format(model.baseExtraSales)} spa&apos;s</strong><small>berekende extra verkopen per jaar</small></div>
              <div><span>Extra omzet</span><strong>{euro.format(model.baseExtraRevenue)}</strong><small>scenario, geen omzetgarantie</small></div>
              <div><span>Omzetgroei</span><strong>+{number.format(model.growthPct)}%</strong><small>op basis van de huidige invoer</small></div>
            </div>

            <div className="growth-map-market-detail" aria-live="polite">
              <div><span>{activeMarket.status}</span><h2>{activeMarket.label}</h2></div>
              <div className="growth-map-market-result"><ArrowRight aria-hidden="true" /><p><strong>circa {number.format(marketSales)} verkopen</strong><span>{euro.format(marketRevenue)} extra omzet in de werkbasis</span></p></div>
            </div>

            <p className="growth-map-note"><Target aria-hidden="true" /> De verdeling is een planningsaanname. Budget verschuift naar regio&apos;s die daadwerkelijk afspraken, offertes en verkopen opleveren.</p>
          </div>

          <div className="growth-map-visual" aria-label="Interactieve groeikaart Nederland, Duitsland, België en Luxemburg">
            <svg viewBox="0 0 300 230" role="img" aria-labelledby="growth-map-svg-title">
              <title id="growth-map-svg-title">Regionale groeifocus Earth Spas</title>
              <defs><radialGradient id="growthGlow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="var(--section-accent)" stopOpacity=".28" /><stop offset="100%" stopColor="var(--section-accent)" stopOpacity="0" /></radialGradient></defs>
              <circle cx="155" cy="118" r="104" fill="url(#growthGlow)" />
              <path className="growth-map-orbit" d="M29 117C55 38 192 7 267 76c56 52-4 140-100 144C76 224 7 174 29 117Z" />
              {markets.map((market, index) => (
                <g
                  key={market.id}
                  className={activeId === market.id ? "growth-map-region is-active" : "growth-map-region"}
                  role="button"
                  tabIndex={0}
                  aria-label={`${market.label}, ${market.status}`}
                  onMouseEnter={() => setActiveId(market.id)}
                  onFocus={() => setActiveId(market.id)}
                  onClick={() => setActiveId(market.id)}
                  onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") setActiveId(market.id); }}
                >
                  <path d={market.path} style={{ "--region-index": index } as React.CSSProperties} />
                  <circle cx={market.labelX} cy={market.labelY} r="3.5" />
                </g>
              ))}
              <path className="growth-map-route growth-map-route-a" d="M108 106C132 84 153 84 181 114" />
              <path className="growth-map-route growth-map-route-b" d="M91 146C108 144 120 151 133 166" />
              <circle className="growth-map-pulse growth-map-pulse-a" r="4" />
              <circle className="growth-map-pulse growth-map-pulse-b" r="4" />
            </svg>

            <div className="growth-map-legend">
              {markets.map((market) => (
                <button key={market.id} type="button" className={activeId === market.id ? "is-active" : undefined} onClick={() => setActiveId(market.id)}>
                  <span>{market.share}%</span><span><strong>{market.label}</strong><small>{market.status}</small></span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
