/**
 * Canonical site origin.
 *
 * Used for `metadataBase`, canonical URLs, the sitemap, and robots.txt. Set
 * `NEXT_PUBLIC_SITE_URL` at build time when deploying to a different domain so
 * every absolute URL follows.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://phlebotomyexamprep.app";

export const SITE_NAME = "Phlebotomy Exam Prep";
