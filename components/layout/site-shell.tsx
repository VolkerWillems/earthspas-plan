"use client";

import { usePathname } from "next/navigation";
import * as React from "react";

import { PrepaidDelegationBanner } from "@/components/blocks";
import { SiteHeader } from "@/components/layout/site-header";
import { RouteVisualSections } from "@/components/layout/route-visual-sections";
import { MotionController } from "@/components/motion-controller";
import { MobileNavigation } from "@/components/navigation/site-navigation";
import { PageBottomSummaryOptimized } from "@/components/page-bottom-summary-optimized";
import { useSiteState } from "@/components/site-state";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { reset } = useSiteState();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuButtonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => setMenuOpen(false), [pathname]);

  React.useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <MotionController />
      <SiteHeader
        pathname={pathname}
        menuOpen={menuOpen}
        menuButtonRef={menuButtonRef}
        onToggleMenu={() => setMenuOpen((value) => !value)}
        onReset={reset}
      />
      <MobileNavigation
        pathname={pathname}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onReset={reset}
      />

      <div key={pathname} className="route-transition">
        {children}
        <RouteVisualSections pathname={pathname} />
        {pathname === "/checklist" && <PrepaidDelegationBanner />}
        <PageBottomSummaryOptimized />
      </div>
    </>
  );
}
