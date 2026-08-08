import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/shared/SiteHeader";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { StudyProgressProvider } from "@/components/progress/StudyProgressProvider";

export const SITE_URL = "https://phlebotomyexamprep.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Phlebotomy Exam Prep — know what to study before your CPT exam",
    template: "%s | Phlebotomy Exam Prep",
  },
  description:
    "Free phlebotomy certification study tool. Practice questions with " +
    "explanations, an interactive order of draw drill, tube and additive " +
    "training, timed mock exams, and progress tracking that tells you what " +
    "to study next.",
  applicationName: "Phlebotomy Exam Prep",
  authors: [{ name: "Phlebotomy Exam Prep" }],
  keywords: [
    "phlebotomy exam prep",
    "phlebotomy practice questions",
    "order of draw",
    "phlebotomy tube colors",
    "CPT certification study",
  ],
  openGraph: {
    type: "website",
    siteName: "Phlebotomy Exam Prep",
    title: "Phlebotomy Exam Prep — know what to study before your CPT exam",
    description:
      "Practice questions with explanations, an interactive order of draw " +
      "drill, tube mastery training, and progress tracking that tells you " +
      "what to study next.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Phlebotomy Exam Prep",
    description:
      "Know what to study before your phlebotomy certification exam.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Zoom is never disabled. Students read explanations on small screens.
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfaf8" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1312" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="flex min-h-dvh flex-col">
        <StudyProgressProvider>
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </StudyProgressProvider>
      </body>
    </html>
  );
}
