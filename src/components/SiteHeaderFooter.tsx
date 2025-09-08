"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter, usePathname } from "next/navigation";
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
  Twitter,
  Youtube,
  ChevronRight,
  Mountain
} from "lucide-react";

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/packages", label: "Packages" },
  { href: "/contact", label: "Contact" }
];

export const SiteHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
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

  const handleNavigation = (href: string) => {
    setIsMobileMenuOpen(false);
    router.push(href);
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
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between lg:h-20">
            {/* Logo and Brand */}
            <button
              onClick={() => handleNavigation("/")}
              className="flex items-center space-x-3 hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md"
              aria-label="Ceyora Holidays home"
            >
              <div className="relative w-10 h-10 lg:w-12 lg:h-12 rounded-lg overflow-hidden">
                <Image
                  src="https://i.postimg.cc/dVsw8yq9/Pink-and-Black-Modern-Initials-Logo-Design.png"
                  alt="Ceyora Holidays Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-lg lg:text-xl text-foreground">
                  Ceyora Holidays
                </span>
                <span className="text-xs text-muted-foreground hidden sm:block">
                  Discover Sri Lanka
                </span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex lg:items-center lg:space-x-8" role="navigation">
              {navigationLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavigation(link.href)}
                  className={`text-sm font-medium transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md px-2 py-1.5 relative group ${
                    pathname === link.href ? "text-primary" : "text-foreground/80"
                  }`}
                  aria-current={pathname === link.href ? "page" : undefined}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform duration-300 ${pathname === link.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                </button>
              ))}
            </nav>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleNavigation("/packages")}
                className="hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
              >
                Explore Packages
              </Button>
              <Button
                size="sm"
                onClick={() => handleNavigation("/contact")}
                className="bg-primary hover:bg-primary/90 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 px-6"
              >
                Book Your Trip
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-muted rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
            <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-card border-l border-border shadow-xl">
              <div className="flex h-16 items-center justify-between px-4 border-b border-border">
                <span className="font-heading font-semibold text-lg">Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-muted rounded-md transition-colors duration-200"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="px-4 py-6 space-y-4" role="navigation">
                {navigationLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => handleNavigation(link.href)}
                    className={`flex items-center justify-between w-full p-3 rounded-lg text-left hover:bg-muted transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring ${
                      pathname === link.href ? "bg-primary/10 text-primary" : ""
                    }`}
                    aria-current={pathname === link.href ? "page" : undefined}
                  >
                    <span className="font-medium">{link.label}</span>
                    <ChevronRight className="h-4 w-4 opacity-50" />
                  </button>
                ))}
                <div className="pt-4 space-y-3 border-t border-border">
                  <Button
                    variant="outline"
                    className="w-full justify-center"
                    onClick={() => handleNavigation("/packages")}
                  >
                    Explore Packages
                  </Button>
                  <Button
                    className="w-full justify-center bg-accent text-accent-foreground hover:bg-accent/90"
                    onClick={() => handleNavigation("/contact")}
                  >
                    Book Your Trip
                  </Button>
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
  const router = useRouter();

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
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Thank you for subscribing! We'll send you amazing travel deals.");
      setEmail("");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubscribing(false);
    }
  };

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/services", label: "Our Services" },
    { href: "/packages", label: "Tour Packages" }
  ];

  const servicesLinks = [
    { href: "/services#cultural", label: "Cultural Tours" },
    { href: "/services#adventure", label: "Adventure Tours" },
    { href: "/services#beach", label: "Beach Holidays" },
    { href: "/contact", label: "Contact Us" }
  ];

  const legalLinks = [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/sitemap", label: "Sitemap" }
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "YouTube" }
  ];

  const travelTips = [
    "Best time to visit Sri Lanka's hill country",
    "Essential items for your Sri Lanka adventure",
    "Top 5 hidden gems in southern Sri Lanka"
  ];

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
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
                <p className="text-sm text-muted-foreground">Discover Sri Lanka</p>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your trusted partner for unforgettable Sri Lankan adventures. We create personalized experiences that showcase the beauty, culture, and warmth of our island nation.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">123 Galle Road, Colombo 03, Sri Lanka</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">+94 11 234 5678</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">info@ceyoraholidays.com</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="grid grid-cols-2 gap-6 md:gap-8">
            <div>
              <h4 className="font-heading font-semibold text-foreground mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <button
                      onClick={() => handleNavigation(link.href)}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-heading font-semibold text-foreground mb-4">Services</h4>
              <ul className="space-y-3">
                {servicesLinks.map((link) => (
                  <li key={link.href}>
                    <button
                      onClick={() => handleNavigation(link.href)}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6">
                <h5 className="font-medium text-foreground mb-3 text-sm">Legal</h5>
                <ul className="space-y-2">
                  {legalLinks.map((link) => (
                    <li key={link.href}>
                      <button
                        onClick={() => handleNavigation(link.href)}
                        className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Column 3: Newsletter */}
          <div className="space-y-6">
            <div>
              <h4 className="font-heading font-semibold text-foreground mb-4">Stay Updated</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Get the latest travel deals and Sri Lankan adventure tips delivered to your inbox.
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
              <p id="newsletter-description" className="text-xs text-muted-foreground">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          </div>

          {/* Column 4: Social & Blog */}
          <div className="space-y-6">
            <div>
              <h4 className="font-heading font-semibold text-foreground mb-4">Follow Us</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-heading font-semibold text-foreground mb-4">Travel Tips</h4>
              <ul className="space-y-3">
                {travelTips.map((tip, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleNavigation("/blog")}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 text-left focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                    >
                      {tip}
                    </button>
                  </li>
                ))}
              </ul>
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
                  <button
                    onClick={() => handleNavigation(link.href)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                  >
                    {link.label}
                  </button>
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