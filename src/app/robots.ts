import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/api/", "/login"],
      },
    ],
    sitemap: "https://realitywize.vercel.app/sitemap.xml",
    host: "https://realitywize.vercel.app",
  };
}
