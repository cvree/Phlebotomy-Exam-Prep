import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Session routes are personal and stateful; there is nothing there for a
      // crawler and indexing them would surface half-finished exams.
      disallow: ["/practice/session", "/mock-exam/session", "/mock-exam/results"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
