import type { Metadata } from "next";
import "./globals.css";
import "./motion.css";
import "./asset-polish.css";
import "./targeted-fixes.css";
import "@/lib/choice-corrections";
import { SiteShell } from "@/components/site-shell";
import { SiteStateProvider } from "@/components/site-state";

export const metadata: Metadata = {
  title: {
    default: "Earth Spas | Digitale keuzehulp",
    template: "%s | Earth Spas",
  },
  description: "Meerpagina-keuzehulp voor de huidige digitale situatie, marketing, software, budgetten en noodzakelijke acties van Earth Spas.",
  robots: { index: false, follow: false },
  icons: {
    icon: "/screens/favicon.ico",
    shortcut: "/screens/favicon.ico",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl" className="dark">
      <body>
        <SiteStateProvider>
          <SiteShell>{children}</SiteShell>
        </SiteStateProvider>
      </body>
    </html>
  );
}
