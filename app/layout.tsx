import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Earth Spas | Keuzehulp",
  description: "Interactieve keuzehulp voor platform, marketing, automatisering en doorontwikkeling.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl" className="dark">
      <body>{children}</body>
    </html>
  );
}
