import type { Metadata } from "next";
import "./globals.css";
// import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import { Toaster } from "sonner";
import SocialMediaPanel from "@/components/SocialMediaPanel";
import PerformanceOptimizer from "@/components/PerformanceOptimizer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ceyora Holidays | Luxury Sri Lanka Travel & Tours",
  description:
    "Experience the beauty of Sri Lanka with Ceyora Holidays. Discover tailor-made luxury tours, cultural experiences, and unforgettable adventures in paradise.",
  keywords:
    "Sri Lanka travel, luxury tours, Sri Lanka holidays, Ceyora Holidays, travel packages, Sri Lanka adventures",
  authors: [{ name: "Ceyora Holidays" }],
  creator: "Ceyora Holidays",
  publisher: "Ceyora Holidays",
  openGraph: {
    title: "Ceyora Holidays | Luxury Sri Lanka Travel & Tours",
    description:
      "Experience the beauty of Sri Lanka with Ceyora Holidays. Discover tailor-made luxury tours, cultural experiences, and unforgettable adventures in paradise.",
    url: "https://ceyoraholidays.com",
    siteName: "Ceyora Holidays",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ceyora Holidays | Luxury Sri Lanka Travel & Tours",
    description:
      "Experience the beauty of Sri Lanka with Ceyora Holidays. Discover tailor-made luxury tours, cultural experiences, and unforgettable adventures in paradise.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-background text-foreground">
        <ErrorReporter />
        <PerformanceOptimizer />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        {children}
        <SocialMediaPanel />
        <Toaster position="top-right" richColors />
        {/* <VisualEditsMessenger /> */}
      </body>
    </html>
  );
}
