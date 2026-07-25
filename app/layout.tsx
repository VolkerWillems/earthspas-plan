import type { Metadata, Viewport } from "next";
import "./globals.css";
import "@/lib/choice-corrections";
import { InstallPrompt } from "@/components/pwa/install-prompt";
import { SiteShell } from "@/components/site-shell";
import { SiteStateProvider } from "@/components/site-state";
import { brandAssets } from "@/lib/brand-assets";

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
    icon: [
      { url: brandAssets.favicon16, sizes: "16x16", type: "image/png" },
      { url: brandAssets.favicon32, sizes: "32x32", type: "image/png" },
      { url: brandAssets.favicon },
    ],
    shortcut: brandAssets.favicon,
    apple: [{ url: brandAssets.appleTouchIcon, sizes: "180x180", type: "image/png" }],
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
