import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Earth Spas digitale keuzehulp",
    short_name: "Earth Spas",
    description: "Interactieve keuzehulp voor de digitale basis, groei, software en overdracht van Earth Spas.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#000305",
    theme_color: "#071017",
    categories: ["business", "productivity"],
    icons: [
      {
        src: "/screens/logo-full-gold.png",
        sizes: "any",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/screens/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
        purpose: "any",
      },
    ],
  };
}
