import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Earth Spas | Interactieve keuzehulp",
  description: "Interactieve keuzehulp voor eigenaarschap, accounts, infrastructuur, AI, marketing en doorontwikkeling.",
  robots: { index: false, follow: false },
  icons: {
    icon: "/screens/favicon.ico",
    shortcut: "/screens/favicon.ico",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl" className="dark">
      <body>{children}</body>
    </html>
  );
}
