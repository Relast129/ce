"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image";
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Video,
  Youtube,
  ChevronRight,
} from "lucide-react";

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const SiteHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50 transition-all duration-200"
      >
        Skip to content
      </a>

      <header
        className={`sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ${
          isScrolled ? "shadow-md" : ""
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex h-14 items-center justify-between sm:h-16 lg:h-20">
            {/* Logo and Brand */}
            <Link
              href="/"
              className="flex items-center space-x-3 hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md"
            >
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg overflow-hidden">
                <Image
                  src="https://i.postimg.cc/dVsw8yq9/Pink-and-Black-Modern-Initials-Logo-Design.png"
                  alt="Ceyora Holidays Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-base sm:text-lg lg:text-xl text-foreground leading-tight">
                  Ceyora Holidays
                </span>
                <span className="text-xs text-muted-foreground hidden xs:block sm:block">
                  Discover Sri Lanka
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav
              className="hidden lg:flex lg:items-center lg:space-x-8"
              role="navigation"
            >
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md px-2 py-1.5 relative group ${
                    pathname === link.href
                      ? "text-primary"
                      : "text-foreground/80"
                  }`}
                  aria-current={pathname === link.href ? "page" : undefined}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform duration-300 ${
                      pathname === link.href
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  ></span>
                </Link>
              ))}
            </nav>

            {/* Desktop CTA Buttons */}
            <div className="hidden md:flex lg:flex items-center space-x-2 lg:space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  window.open(
                    "https://wa.me/94768118780",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
                className="hover:bg-primary hover:text-primary-foreground transition-colors duration-200 text-xs sm:text-sm px-3 sm:px-4"
              >
                WhatsApp
              </Button>
              <Link href="/contact">
                <Button
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 px-4 sm:px-6 text-xs sm:text-sm"
                >
                  Contact
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden lg:hidden p-2 hover:bg-muted rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden lg:hidden">
            <div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="fixed right-0 top-0 h-full w-full max-w-xs sm:max-w-sm bg-card border-l border-border shadow-xl">
              <div className="flex h-14 sm:h-16 items-center justify-between px-4 border-b border-border">
                <span className="font-heading font-semibold text-base sm:text-lg">
                  Menu
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-muted rounded-md transition-colors duration-200"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </div>
              <nav className="px-4 py-6 space-y-4" role="navigation">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={handleMobileMenuClose}
                    className={`flex items-center justify-between w-full p-3 rounded-lg text-left hover:bg-muted transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring ${
                      pathname === link.href ? "bg-primary/10 text-primary" : ""
                    }`}
                    aria-current={pathname === link.href ? "page" : undefined}
                  >
                    <span className="font-medium text-sm sm:text-base">
                      {link.label}
                    </span>
                    <ChevronRight className="h-4 w-4 opacity-50" />
                  </Link>
                ))}
                <div className="pt-4 space-y-3 border-t border-border">
                  <Button
                    variant="outline"
                    className="w-full justify-center text-sm"
                    onClick={() => {
                      handleMobileMenuClose();
                      window.open(
                        "https://wa.me/94768118780",
                        "_blank",
                        "noopener,noreferrer"
                      );
                    }}
                  >
                    WhatsApp Us
                  </Button>
                  <Link href="/contact" onClick={handleMobileMenuClose}>
                    <Button className="w-full justify-center bg-primary text-primary-foreground hover:bg-primary/90 text-sm">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export const SiteFooter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubscribing(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success(
        "Thank you for subscribing! We'll send you amazing travel deals."
      );
      setEmail("");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubscribing(false);
    }
  };

  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
  ];

  const servicesLinks = [
    {
      href: "https://wa.me/94768118780",
      label: "WhatsApp: +94 76 811 8780",
      external: true,
    },
    { href: "/contact", label: "Contact Form" },
    { href: "tel:+94768118780", label: "Call Us", external: true },
  ];

  const legalLinks = [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/sitemap", label: "Sitemap" },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://www.facebook.com/CeyoraHoliday",
      label: "Facebook",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/_ceyora_holidays_",
      label: "Instagram",
    },
    {
      icon: Video,
      href: "https://www.tiktok.com/@Ceyora_Holidays",
      label: "TikTok",
    },
    { icon: Youtube, href: "https://wa.me/94768118780", label: "WhatsApp" },
  ];

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          {/* Column 1: Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10 rounded-lg overflow-hidden">
                <Image
                  src="https://i.postimg.cc/dVsw8yq9/Pink-and-Black-Modern-Initials-Logo-Design.png"
                  alt="Ceyora Holidays Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-foreground">
                  Ceyora Holidays
                </h3>
                <p className="text-sm text-muted-foreground">
                  Discover Sri Lanka
                </p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Your trusted partner for unforgettable Sri Lankan adventures.
              Available 24/7 on WhatsApp for instant booking and travel
              assistance - no office visits required!
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">
                  112/7 Uyanwatta, Dewanagala, Sri Lanka
                </span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">
                  +94 76 811 8780 (WhatsApp)
                </span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">
                  ceyoraholidays@gmail.com
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:col-span-1">
            <div>
              <h4 className="font-heading font-semibold text-foreground mb-4">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-semibold text-foreground mb-4">
                Contact Options
              </h4>
              <ul className="space-y-3">
                {servicesLinks.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <h5 className="font-medium text-foreground mb-3 text-sm">
                  Legal
                </h5>
                <ul className="space-y-2">
                  {legalLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Column 3: Newsletter */}
          <div className="space-y-6">
            <div>
              <h4 className="font-heading font-semibold text-foreground mb-4">
                Stay Updated
              </h4>
              <p className="text-sm text-muted-foreground mb-4">
                Get the latest travel deals and Sri Lankan adventure tips
                delivered to your inbox.
              </p>
            </div>

            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div>
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <Input
                  id="newsletter-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubscribing}
                  className="w-full"
                  aria-describedby="newsletter-description"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubscribing}
                className="w-full bg-primary hover:bg-primary/90 transition-colors duration-200"
              >
                {isSubscribing ? "Subscribing..." : "Subscribe"}
              </Button>
              <p
                id="newsletter-description"
                className="text-xs text-muted-foreground"
              >
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          </div>

          {/* Column 4: Social & WhatsApp Contact */}
          <div className="space-y-6">
            <div>
              <h4 className="font-heading font-semibold text-foreground mb-4">
                Follow Us
              </h4>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                <h4 className="font-heading font-semibold text-foreground mb-3 flex items-center">
                  <Phone className="h-5 w-5 text-green-500 mr-2" />
                  Book Instantly via WhatsApp - 24/7
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  No forms, no waiting! Get instant responses, customized
                  packages, and book your Sri Lankan adventure directly through
                  WhatsApp.
                </p>
                <a
                  href={`https://wa.me/94768118780?text=${encodeURIComponent(
                    "Hi! I'm interested in booking a Sri Lanka tour. Can you help me with packages and pricing?"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                >
                  <span className="mr-2">💬</span>
                  Book Now via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border bg-muted/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} Ceyora Holidays. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              {legalLinks.map((link, index) => (
                <span key={link.href} className="flex items-center">
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                  >
                    {link.label}
                  </Link>
                  {index < legalLinks.length - 1 && (
                    <span className="mx-3 text-muted-foreground">•</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface SiteHeaderFooterProps {
  currentPath?: string;
}

const SiteHeaderFooter = ({ currentPath }: SiteHeaderFooterProps) => {
  return <SiteHeader />;
};

export default SiteHeaderFooter;
