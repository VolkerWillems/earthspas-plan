"use client";

import dynamic from "next/dynamic";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

const StrategyRouteVisuals = dynamic(
  () => import("@/components/layout/route-visuals/strategy-visuals").then((module) => module.StrategyRouteVisuals),
  { ssr: false },
);

const MarketingRouteVisuals = dynamic(
  () => import("@/components/layout/route-visuals/marketing-visuals").then((module) => module.MarketingRouteVisuals),
  { ssr: false },
);

const SoftwareRouteVisuals = dynamic(
  () => import("@/components/layout/route-visuals/software-visuals").then((module) => module.SoftwareRouteVisuals),
  { ssr: false },
);

function RouteVisualContent({ pathname }: { pathname: string }) {
  if (pathname === "/strategie") return <StrategyRouteVisuals />;
  if (pathname === "/marketing") return <MarketingRouteVisuals />;
  if (pathname === "/software") return <SoftwareRouteVisuals />;
  return null;
}

export function RouteVisualSections({ pathname }: { pathname: string }) {
  const [portalNode, setPortalNode] = useState<HTMLElement | null>(null);
  const hasVisuals = pathname === "/strategie" || pathname === "/marketing" || pathname === "/software";

  useEffect(() => {
    if (!hasVisuals) {
      setPortalNode(null);
      return;
    }

    const intro = document.querySelector<HTMLElement>(".route-transition .page-intro");
    if (!intro) return;

    const slot = document.createElement("div");
    slot.className = "route-visual-slot";
    slot.dataset.routeVisuals = pathname;
    intro.insertAdjacentElement("afterend", slot);
    setPortalNode(slot);

    return () => {
      setPortalNode(null);
      slot.remove();
    };
  }, [hasVisuals, pathname]);

  if (!hasVisuals || !portalNode) return null;
  return createPortal(<RouteVisualContent pathname={pathname} />, portalNode);
}
