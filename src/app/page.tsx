"use client";

import { useState } from "react";
import SiteHeaderFooter from "@/components/SiteHeaderFooter";
import { SiteFooter } from "@/components/SiteHeaderFooter";
import HomeLanding from "@/components/HomeLanding";
import AboutPage from "@/components/AboutPage";
import ServicesPage from "@/components/ServicesPage";
import PackagesPage from "@/components/PackagesPage";
import ContactPage from "@/components/ContactPage";

export default function Page() {
  const [currentRoute, setCurrentRoute] = useState("/");

  const renderCurrentRoute = () => {
    switch (currentRoute) {
      case "/":
        return <HomeLanding />;
      case "/about":
        return <AboutPage />;
      case "/services":
        return <ServicesPage />;
      case "/packages":
        return <PackagesPage />;
      case "/contact":
        return <ContactPage />;
      default:
        return <HomeLanding />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeaderFooter currentPath={currentRoute} />
      
      <main id="main-content" className="flex-1">
        <div className="max-w-7xl mx-auto">
          {renderCurrentRoute()}
        </div>
      </main>
      
      <SiteFooter />
    </div>
  );
}