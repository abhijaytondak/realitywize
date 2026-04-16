import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "RealtyWize — Premium Property Listings in Noida & NCR",
    short_name: "RealtyWize",
    description:
      "Discover premium residential, commercial, and industrial properties across Noida and the NCR region.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#173124",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
