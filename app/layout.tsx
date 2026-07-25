import type { Metadata, Viewport } from "next";
import "./globals.css";
import "@/lib/choice-corrections";
import { InstallPrompt } from "@/components/pwa/install-prompt";
import { SiteShell } from "@/components/site-shell";
import { SiteStateProvider } from "@/components/site-state";

export const metadata: Metadata = {
  title: {
    default: "Earth Spas | Digitale keuzehulp",
    template: "%s | Earth Spas",
  },
  description: "Meerpagina-keuzehulp voor de huidige digitale situatie, marketing, software, budgetten en noodzakelijke acties van Earth Spas.",
  manifest: "/manifest.webmanifest",
  robots: { index: false, follow: false },
  appleWebApp: {
    capable: true,
    title: "Earth Spas",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: "/screens/favicon.ico",
    shortcut: "/screens/favicon.ico",
    apple: "/screens/logo-full-gold.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#071017",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl" className="dark" suppressHydrationWarning>
      <body>
        <SiteStateProvider>
          <SiteShell>{children}</SiteShell>
          <InstallPrompt />
        </SiteStateProvider>
      </body>
    </html>
  );
}
