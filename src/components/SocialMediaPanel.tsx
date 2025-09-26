"use client";

import React, { useState, useCallback, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  Facebook,
  Instagram,
  Phone,
  Mail,
  X,
  ChevronLeft,
  ChevronRight,
  Video,
} from "lucide-react";

interface SocialLink {
  name: string;
  icon: React.ComponentType<any>;
  url: string;
  color: string;
  hoverColor: string;
}

const SocialMediaPanel = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile and auto-expand on desktop
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Auto-expand on desktop, collapsed on mobile
      setIsExpanded(!mobile);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const socialLinks: SocialLink[] = useMemo(
    () => [
      {
        name: "WhatsApp",
        icon: MessageCircle,
        url: "https://wa.me/94768118780",
        color: "bg-green-500",
        hoverColor: "hover:bg-green-600",
      },
      {
        name: "Phone",
        icon: Phone,
        url: "tel:+94768118780",
        color: "bg-blue-500",
        hoverColor: "hover:bg-blue-600",
      },
      {
        name: "Email",
        icon: Mail,
        url: "mailto:ceyoraholidays@gmail.com",
        color: "bg-red-500",
        hoverColor: "hover:bg-red-600",
      },
      {
        name: "Facebook",
        icon: Facebook,
        url: "https://www.facebook.com/CeyoraHoliday",
        color: "bg-blue-600",
        hoverColor: "hover:bg-blue-700",
      },
      {
        name: "Instagram",
        icon: Instagram,
        url: "https://www.instagram.com/_ceyora_holidays_",
        color: "bg-pink-500",
        hoverColor: "hover:bg-pink-600",
      },
      {
        name: "TikTok",
        icon: Video,
        url: "https://www.tiktok.com/@Ceyora_Holidays",
        color: "bg-black",
        hoverColor: "hover:bg-gray-800",
      },
    ],
    []
  );

  const handleSocialClick = useCallback((url: string) => {
    if (url.startsWith("tel:") || url.startsWith("mailto:")) {
      // For tel: and mailto: links, open directly
      window.location.href = url;
    } else {
      // For external links, open in new tab with security attributes
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }, []);

  const toggleExpanded = useCallback(() => {
    // Only allow manual toggle on mobile
    if (isMobile) {
      setIsExpanded((prev) => !prev);
    }
  }, [isMobile]);

  return (
    <div className="fixed right-2 sm:right-4 top-1/2 -translate-y-1/2 z-50 flex items-center">
      <motion.div
        className="flex flex-col items-end space-y-1.5 sm:space-y-2"
        initial={false}
        animate={isExpanded ? "expanded" : "collapsed"}
      >
        {/* Social Links */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="flex flex-col space-y-1.5 sm:space-y-2 mr-2 sm:mr-3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3, staggerChildren: 0.05 }}
            >
              {socialLinks.map((social, index) => (
                <motion.div
                  key={social.name}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => handleSocialClick(social.url)}
                    className={`${social.color} ${social.hoverColor} text-white shadow-lg hover:shadow-xl transition-all duration-300 w-10 sm:w-12 h-10 sm:h-12 p-0 rounded-full group relative`}
                    aria-label={`Contact via ${social.name}`}
                  >
                    <social.icon className="h-4 sm:h-5 w-4 sm:w-5" />

                    {/* Tooltip - Hidden on mobile */}
                    <div className="hidden sm:block absolute right-14 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-1 rounded-md text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                      {social.name}
                      <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
                    </div>
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button - Only show on mobile */}
        {isMobile && (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={toggleExpanded}
              className={`${
                isExpanded
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-primary hover:bg-primary/90"
              } text-white shadow-lg hover:shadow-xl transition-all duration-300 w-12 sm:w-14 h-12 sm:h-14 p-0 rounded-full relative group`}
              aria-label={
                isExpanded ? "Close social panel" : "Open social panel"
              }
            >
              <AnimatePresence mode="wait">
                {isExpanded ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 sm:h-6 w-5 sm:w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronLeft className="h-5 sm:h-6 w-5 sm:w-6" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Pulse Animation */}
              {!isExpanded && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-primary"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ opacity: 0.3 }}
                />
              )}

              {/* Tooltip for main button - Hidden on mobile */}
              <div className="hidden sm:block absolute right-16 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-1 rounded-md text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                {isExpanded ? "Close" : "Contact Us"}
                <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
              </div>
            </Button>
          </motion.div>
        )}
      </motion.div>

      {/* WhatsApp Notification Badge */}
      {!isExpanded && (
        <motion.div
          className="absolute -top-1 sm:-top-2 -left-1 sm:-left-2 bg-green-500 text-white text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full shadow-lg"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          24/7
        </motion.div>
      )}
    </div>
  );
};

export default SocialMediaPanel;
