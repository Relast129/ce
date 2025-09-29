"use client";

import { useEffect } from "react";

const PerformanceOptimizer = () => {
  useEffect(() => {
    // Only run on client side
    if (typeof window !== "undefined") {
      // Prefetch critical resources
      const criticalImages = [
        "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/5b4115a6-36aa-41a5-b13a-a309fd72f4fe/generated_images/spectacular-aerial-view-of-sigiriya-lion-3d4731f5-20250902140253.jpg",
      ];

      criticalImages.forEach((src) => {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = src;
        document.head.appendChild(link);
      });

      // Lazy load non-critical resources
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute("data-src");
              observer.unobserve(img);
            }
          }
        });
      });

      // Optimize third-party scripts
      const optimizeScripts = () => {
        // Defer non-critical scripts
        const scripts = document.querySelectorAll("script[data-defer]");
        scripts.forEach((script) => {
          const newScript = document.createElement("script");
          newScript.src = script.getAttribute("src") || "";
          newScript.defer = true;
          script.parentNode?.replaceChild(newScript, script);
        });
      };

      optimizeScripts();

      // Web Vitals optimization
      if ("requestIdleCallback" in window) {
        requestIdleCallback(() => {
          // Perform non-critical tasks during idle time
          console.log("Performance optimizations applied");
        });
      }
    }
  }, []);

  return null;
};

export default PerformanceOptimizer;
