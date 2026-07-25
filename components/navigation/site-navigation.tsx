"use client";

import Link from "next/link";
import {
  ArrowClockwise,
  ChartBar,
  Check,
  Code,
  FadersHorizontal,
  MagicWand,
  Target,
} from "@/lib/phosphor-icons";

import { cn } from "@/lib/utils";

export const siteNavigationItems = [
  { href: "/", label: "Overzicht", icon: ChartBar },
  { href: "/strategie", label: "Strategie", icon: Target },
  { href: "/marketing", label: "Marketing", icon: MagicWand },
  { href: "/software", label: "Software", icon: Code },
  { href: "/calculator", label: "Calculator", icon: FadersHorizontal },
  { href: "/checklist", label: "Acties", icon: Check },
] as const;

export function DesktopNavigation({ pathname }: { pathname: string }) {
  return (
    <nav className="desktop-nav" aria-label="Hoofdnavigatie">
      {siteNavigationItems.map((item) => {
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
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

type MobileNavigationProps = {
  pathname: string;
  open: boolean;
  onClose: () => void;
  onReset: () => void;
};

export function MobileNavigation({
  pathname,
  open,
  onClose,
  onReset,
}: MobileNavigationProps) {
  return (
    <div
      id="mobile-site-menu"
      className={cn("mobile-menu", open ? "mobile-menu-open" : "mobile-menu-closed")}
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
      aria-label="Mobiele navigatie"
    >
      <button
        className="mobile-menu-backdrop"
        aria-label="Navigatie sluiten"
        onClick={onClose}
        tabIndex={open ? 0 : -1}
      />
      <div className="mobile-menu-panel">
        <div className="mobile-menu-heading">
          <p>Earth Spas</p>
          <span>Kies een onderdeel</span>
        </div>
        <nav aria-label="Mobiele hoofdnavigatie">
          {siteNavigationItems.map((item, index) => {
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
          <button
            type="button"
            onClick={onReset}
            tabIndex={open ? 0 : -1}
            className="mobile-nav-link mobile-reset-button"
          >
            <span className="mobile-nav-number">R</span>
            <ArrowClockwise className="h-6 w-6" />
            <span className="flex-1">Reset keuzes</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
