"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import {
  ArrowClockwise,
  ChartBar,
  Check,
  Code,
  FadersHorizontal,
  List,
  MagicWand,
  X,
} from "@/lib/phosphor-icons";
import { MotionController } from "@/components/motion-controller";
import { useSiteState } from "@/components/site-state";
import { cn } from "@/lib/utils";

const navigation = [
  { href: "/", label: "Stand van zaken", short: "Overzicht", icon: ChartBar },
  { href: "/marketing", label: "Marketingplan", short: "Marketing", icon: MagicWand },
  { href: "/software", label: "Softwareplan", short: "Software", icon: Code },
  { href: "/calculator", label: "Keuzes & calculator", short: "Calculator", icon: FadersHorizontal },
  { href: "/checklist", label: "Actielijst", short: "Acties", icon: Check },
];

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { reset } = useSiteState();
  const [open, setOpen] = React.useState(false);
  const menuButtonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => setOpen(false), [pathname]);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <MotionController />
      <header className="site-header">
        <div className="site-progress" aria-hidden="true" />
        <div className="content-shell site-header-inner">
          <Link href="/" className="site-brand" aria-label="Earth Spas keuzehulp homepage">
            <img src="/screens/logo-full-gold.png" alt="Earth Spas" />
            <span>Digitale keuzehulp</span>
          </Link>

          <nav className="desktop-nav" aria-label="Hoofdnavigatie">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn("nav-link", active && "nav-link-active")}
                >
                  <Icon className="h-4 w-4" weight="regular" />
                  <span>{item.short}</span>
                </Link>
              );
            })}
          </nav>

          <div className="desktop-actions">
            <button onClick={reset} className="icon-button" title="Alles resetten" aria-label="Alle keuzes resetten">
              <ArrowClockwise className="h-5 w-5" />
            </button>
          </div>

          <button
            ref={menuButtonRef}
            className="mobile-menu-button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Navigatie sluiten" : "Navigatie openen"}
            aria-expanded={open}
            aria-controls="mobile-site-menu"
          >
            <span className="menu-icon-stage" aria-hidden="true">
              <List className={cn("menu-icon menu-icon-open", open && "menu-icon-hidden")} />
              <X className={cn("menu-icon menu-icon-close", !open && "menu-icon-hidden")} />
            </span>
          </button>
        </div>
      </header>

      <div
        id="mobile-site-menu"
        className={cn("mobile-menu", open ? "mobile-menu-open" : "mobile-menu-closed")}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        aria-label="Mobiele navigatie"
      >
        <button className="mobile-menu-backdrop" aria-label="Navigatie sluiten" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1} />
        <div className="mobile-menu-panel">
          <div className="mobile-menu-heading">
            <p>Earth Spas</p>
            <span>Kies een onderdeel</span>
          </div>
          <nav>
            {navigation.map((item, index) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  tabIndex={open ? 0 : -1}
                  aria-current={active ? "page" : undefined}
                  className={cn("mobile-nav-link", active && "mobile-nav-link-active")}
                >
                  <span className="mobile-nav-number">0{index + 1}</span>
                  <Icon className="h-6 w-6" weight="regular" />
                  <span className="flex-1">{item.label}</span>
                </Link>
              );
            })}
            <button onClick={reset} tabIndex={open ? 0 : -1} className="mobile-nav-link mobile-reset-button">
              <span className="mobile-nav-number">R</span>
              <ArrowClockwise className="h-6 w-6" />
              <span className="flex-1">Alle keuzes resetten</span>
            </button>
          </nav>
        </div>
      </div>

      <div key={pathname} className="route-transition">
        {children}
      </div>
    </>
  );
}
