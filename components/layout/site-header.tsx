"use client";

import Link from "next/link";
import type * as React from "react";
import { ArrowClockwise, List, X } from "@/lib/phosphor-icons";

import { DesktopNavigation } from "@/components/navigation/site-navigation";
import { Button } from "@/components/ui/button";
import { brandAssets } from "@/lib/brand-assets";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  pathname: string;
  menuOpen: boolean;
  menuButtonRef: React.RefObject<HTMLButtonElement | null>;
  onToggleMenu: () => void;
  onReset: () => void;
};

export function SiteHeader({
  pathname,
  menuOpen,
  menuButtonRef,
  onToggleMenu,
  onReset,
}: SiteHeaderProps) {
  return (
    <header className="site-header">
      <div className="site-progress" aria-hidden="true" />
      <div className="content-shell site-header-inner">
        <Link href="/" className="site-brand" aria-label="Earth Spas homepage">
          <img src={brandAssets.goldLogo} alt="Earth Spas" />
        </Link>

        <DesktopNavigation pathname={pathname} />

        <div className="desktop-actions">
          <Button
            variant="ghost"
            size="icon"
            onClick={onReset}
            className="icon-button"
            title="Alles resetten"
            aria-label="Alle keuzes resetten"
          >
            <ArrowClockwise className="h-5 w-5" />
          </Button>
        </div>

        <Button
          ref={menuButtonRef}
          variant="ghost"
          size="icon"
          className="mobile-menu-button"
          onClick={onToggleMenu}
          aria-label={menuOpen ? "Navigatie sluiten" : "Navigatie openen"}
          aria-expanded={menuOpen}
          aria-controls="mobile-site-menu"
        >
          <span className="menu-icon-stage" aria-hidden="true">
            <List className={cn("menu-icon menu-icon-open", menuOpen && "menu-icon-hidden")} />
            <X className={cn("menu-icon menu-icon-close", !menuOpen && "menu-icon-hidden")} />
          </span>
        </Button>
      </div>
    </header>
  );
}
