import type { MetadataRoute } from "next";
import { brandAssets } from "@/lib/brand-assets";

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
        src: brandAssets.androidIcon192,
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: brandAssets.androidIcon512,
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  };
}
