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

  React.useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header className="site-header">
        <div className="content-shell flex h-[74px] items-center justify-between gap-5">
          <Link href="/" className="flex min-w-0 items-center gap-4">
            <img src="/screens/logo-full-gold.png" alt="Earth Spas" className="h-10 w-auto max-w-[190px] object-contain" />
            <span className="hidden border-l border-border/80 pl-4 text-sm uppercase tracking-[0.18em] text-white/65 xl:block">digitale keuzehulp</span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn("nav-link", active && "nav-link-active")}
                >
                  <Icon className="h-4 w-4" weight="regular" />
                  <span>{item.short}</span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:block">
            <button onClick={reset} className="icon-button" title="Alles resetten">
              <ArrowClockwise className="h-5 w-5" />
            </button>
          </div>

          <button className="mobile-menu-button lg:hidden" onClick={() => setOpen((value) => !value)} aria-label="Navigatie openen" aria-expanded={open}>
            {open ? <X className="h-6 w-6" /> : <List className="h-7 w-7" />}
          </button>
        </div>

        {open && (
          <div className="mobile-menu lg:hidden">
            <nav className="content-shell py-4">
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href} className={cn("mobile-nav-link", active && "mobile-nav-link-active")}>
                    <Icon className="h-5 w-5" />
                    <span className="flex-1">{item.label}</span>
                    <span className="text-sm text-white/45">0{navigation.indexOf(item) + 1}</span>
                  </Link>
                );
              })}
              <button onClick={reset} className="mobile-nav-link mt-3 w-full text-left">
                <ArrowClockwise className="h-5 w-5" />
                <span>Alle keuzes resetten</span>
              </button>
            </nav>
          </div>
        )}
      </header>

      {children}

      <nav className="mobile-bottom-nav lg:hidden">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className={cn("mobile-bottom-link", active && "mobile-bottom-link-active")}>
              <Icon className="h-5 w-5" weight={active ? "fill" : "regular"} />
              <span>{item.short}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
