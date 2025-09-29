"use client";
import SiteHeaderFooter from "@/components/SiteHeaderFooter";
import { SiteFooter } from "@/components/SiteHeaderFooter";
import ContactPage from "@/components/ContactPage";

// Force dynamic rendering for this page
export const dynamic = "force-dynamic";

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeaderFooter />

      <main id="main-content" className="flex-1">
        <ContactPage />
      </main>

      <SiteFooter />
    </div>
  );
}
