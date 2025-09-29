import SiteHeaderFooter from "@/components/SiteHeaderFooter";
import { SiteFooter } from "@/components/SiteHeaderFooter";
import HomeLanding from "@/components/HomeLanding";

// Force dynamic rendering for this page
export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeaderFooter />

      <main id="main-content" className="flex-1">
        <div className="max-w-7xl mx-auto">
          <HomeLanding />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
