"use client";
import SiteHeaderFooter from "@/components/SiteHeaderFooter";
import { SiteFooter } from "@/components/SiteHeaderFooter";
import AboutPage from "@/components/AboutPage";

// Force dynamic rendering for this page
export const dynamic = "force-dynamic";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeaderFooter />

      <main id="main-content" className="flex-1">
        <AboutPage />
      </main>

      <SiteFooter />
    </div>
  );
}
