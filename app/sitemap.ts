import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Emitted as a static file at build time (the app is a static export).
export const dynamic = "force-static";

/**
 * Only indexable, content-bearing routes appear here.
 *
 * Session routes are excluded: they are stateful, personal, and carry
 * `robots: noindex` of their own.
 */
const ROUTES: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/nha-cpt", priority: 0.9, changeFrequency: "weekly" },
  { path: "/nha-cpt/practice-test", priority: 0.9, changeFrequency: "weekly" },
  { path: "/study/order-of-draw", priority: 0.9, changeFrequency: "monthly" },
  { path: "/study/phlebotomy-tube-colors", priority: 0.9, changeFrequency: "monthly" },
  { path: "/study/specimen-handling", priority: 0.8, changeFrequency: "monthly" },
  { path: "/study/venipuncture-complications", priority: 0.8, changeFrequency: "monthly" },
  { path: "/study/california-requirements", priority: 0.9, changeFrequency: "monthly" },
  { path: "/practice", priority: 0.8, changeFrequency: "weekly" },
  { path: "/drills", priority: 0.7, changeFrequency: "monthly" },
  { path: "/drills/order-of-draw", priority: 0.8, changeFrequency: "monthly" },
  { path: "/drills/tube-colors", priority: 0.8, changeFrequency: "monthly" },
  { path: "/mock-exam", priority: 0.7, changeFrequency: "monthly" },
  { path: "/progress", priority: 0.5, changeFrequency: "monthly" },
  { path: "/about/methodology", priority: 0.6, changeFrequency: "monthly" },
  { path: "/pricing", priority: 0.4, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
