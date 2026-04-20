import type { MetadataRoute } from "next";
import { BUSINESS } from "@/lib/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: BUSINESS.name,
    short_name: BUSINESS.shortName,
    description: BUSINESS.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#fbf8f3",
    theme_color: "#0b3b5c",
    orientation: "portrait",
    categories: ["business", "lifestyle", "productivity"],
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
