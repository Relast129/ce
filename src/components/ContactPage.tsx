"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import {
  Phone,
  MapPin,
  Building2,
  Contact,
  MailCheck,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  consent: boolean;
  honeypot: string; // Anti-spam field
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  consent?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    consent: false,
    honeypot: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.subject) {
      newErrors.subject = "Please select a subject";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    if (!formData.consent) {
      newErrors.consent = "Please accept our communication policy";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check honeypot
    if (formData.honeypot) {
      return; // Silent fail for bots
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setIsSubmitted(true);
      toast.success("Message sent successfully!", {
        description: "We'll respond within 24 hours during business days.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        consent: false,
        honeypot: "",
      });
      setErrors({});
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    field: keyof FormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <>
      {/* Structured Data for Local Business */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelAgency",
            name: "Ceyora Holidays",
            address: {
              "@type": "PostalAddress",
              streetAddress: "112/7 Uyanwatta, Dewanagala",
              addressLocality: "Dewanagala",
              addressRegion: "Western Province",
              postalCode: "00000",
              addressCountry: "LK",
            },
            telephone: "+94768118780",
            email: "ceyoraholidays@gmail.com",
            url: "https://ceyoraholidays.com",
            openingHours: ["Mo-Su 00:00-23:59"],
          }),
        }}
      />

      <div className="bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-7xl">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-3 sm:mb-4 px-2">
              Contact Us Anytime
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
              We're available 24/7 on WhatsApp for instant booking and travel
              assistance. No office visits needed - book your Sri Lankan
              adventure from anywhere!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {/* Contact Form */}
            <Card className="bg-card border-border">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Contact className="w-4 sm:w-5 h-4 sm:h-5 text-primary" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-6"
                >
                  {/* Honeypot field (hidden) */}
                  <input
                    type="text"
                    name="website"
                    value={formData.honeypot}
                    onChange={(e) =>
                      handleInputChange("honeypot", e.target.value)
                    }
                    style={{
                      position: "absolute",
                      left: "-9999px",
                      opacity: 0,
                    }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-1.5 sm:space-y-2">
                      <Label htmlFor="name" className="text-sm">
                        Name *
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        className={`h-10 sm:h-11 ${
                          errors.name ? "border-destructive" : ""
                        }`}
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        aria-invalid={!!errors.name}
                        aria-describedby={
                          errors.name ? "name-error" : undefined
                        }
                      />
                      {errors.name && (
                        <p
                          id="name-error"
                          className="text-xs sm:text-sm text-destructive"
                          role="alert"
                        >
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5 sm:space-y-2">
                      <Label htmlFor="email" className="text-sm">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        className={`h-10 sm:h-11 ${
                          errors.email ? "border-destructive" : ""
                        }`}
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        aria-invalid={!!errors.email}
                        aria-describedby={
                          errors.email ? "email-error" : undefined
                        }
                      />
                      {errors.email && (
                        <p
                          id="email-error"
                          className="text-xs sm:text-sm text-destructive"
                          role="alert"
                        >
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="phone" className="text-sm">
                      Phone (Optional)
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      className="h-10 sm:h-11"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      placeholder="+94 11 234 5678"
                    />
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="subject" className="text-sm">
                      Subject *
                    </Label>
                    <Select
                      value={formData.subject}
                      onValueChange={(value) =>
                        handleInputChange("subject", value)
                      }
                    >
                      <SelectTrigger
                        className={`h-10 sm:h-11 ${
                          errors.subject ? "border-destructive" : ""
                        }`}
                      >
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="booking">Package Booking</SelectItem>
                        <SelectItem value="custom">
                          Custom Tour Request
                        </SelectItem>
                        <SelectItem value="support">
                          Customer Support
                        </SelectItem>
                        <SelectItem value="partnership">
                          Business Partnership
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.subject && (
                      <p
                        className="text-xs sm:text-sm text-destructive"
                        role="alert"
                      >
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="message" className="text-sm">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      rows={4}
                      className={`min-h-[100px] sm:min-h-[120px] text-sm ${
                        errors.message ? "border-destructive" : ""
                      }`}
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange("message", e.target.value)
                      }
                      placeholder="Tell us about your travel plans, questions, or special requirements..."
                      aria-invalid={!!errors.message}
                      aria-describedby={
                        errors.message ? "message-error" : undefined
                      }
                    />
                    {errors.message && (
                      <p
                        id="message-error"
                        className="text-xs sm:text-sm text-destructive"
                        role="alert"
                      >
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <Checkbox
                      id="consent"
                      checked={formData.consent}
                      onCheckedChange={(checked) =>
                        handleInputChange("consent", !!checked)
                      }
                      className={`mt-0.5 ${
                        errors.consent ? "border-destructive" : ""
                      }`}
                      aria-invalid={!!errors.consent}
                      aria-describedby={
                        errors.consent ? "consent-error" : undefined
                      }
                    />
                    <div className="space-y-1">
                      <Label
                        htmlFor="consent"
                        className="text-xs sm:text-sm leading-relaxed cursor-pointer"
                      >
                        I agree to receive marketing communications from Ceyora
                        Holidays about travel packages and special offers. You
                        can unsubscribe at any time.
                      </Label>
                      {errors.consent && (
                        <p
                          id="consent-error"
                          className="text-xs text-destructive"
                          role="alert"
                        >
                          {errors.consent}
                        </p>
                      )}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-11 sm:h-12 text-base font-semibold"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>

                  {isSubmitted && (
                    <div
                      className="p-4 bg-primary/10 border border-primary/20 rounded-lg"
                      role="status"
                      aria-live="polite"
                    >
                      <div className="flex items-center gap-2 text-primary">
                        <MailCheck className="w-5 h-5" />
                        <p className="font-medium">
                          Message sent successfully!
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Thank you for contacting us. We'll respond within 24
                        hours during business days.
                      </p>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>

            {/* Company Details & Map */}
            <div className="space-y-4 sm:space-y-6">
              {/* Company Details */}
              <Card className="bg-card border-border">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <Building2 className="w-4 sm:w-5 h-4 sm:h-5 text-primary" />
                    Contact Information - Available 24/7
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0 space-y-4 sm:space-y-6">
                  <address className="not-italic">
                    <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <MapPin className="w-4 sm:w-5 h-4 sm:h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-sm sm:text-base">
                          Ceyora Holidays
                        </p>
                        <p className="text-muted-foreground text-sm">
                          112/7 Uyanwatta, Dewanagala
                        </p>
                        <p className="text-muted-foreground text-sm">
                          Sri Lanka
                        </p>
                      </div>
                    </div>
                  </address>

                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Phone className="w-4 sm:w-5 h-4 sm:h-5 text-primary" />
                      <div>
                        <p className="font-medium text-sm sm:text-base">
                          Phone & WhatsApp
                        </p>
                        <a
                          href="tel:+94768118780"
                          className="text-primary hover:underline text-sm sm:text-base"
                        >
                          +94 76 811 8780
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3">
                      <MailCheck className="w-4 sm:w-5 h-4 sm:h-5 text-primary" />
                      <div>
                        <p className="font-medium text-sm sm:text-base">
                          Email
                        </p>
                        <a
                          href="mailto:ceyoraholidays@gmail.com"
                          className="text-primary hover:underline text-sm sm:text-base break-all"
                        >
                          ceyoraholidays@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="pt-3 sm:pt-4 border-t">
                      <p className="font-medium mb-2 text-sm sm:text-base">
                        WhatsApp Availability
                      </p>
                      <div className="space-y-1 text-muted-foreground">
                        <p className="text-green-600 font-semibold text-sm sm:text-base">
                          24/7 - Available Anytime
                        </p>
                        <p className="text-xs sm:text-sm">
                          No office visits required
                        </p>
                        <p className="text-xs sm:text-sm">
                          Instant responses via WhatsApp
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="pt-3 sm:pt-4 border-t">
                    <p className="font-medium mb-2 sm:mb-3 text-sm sm:text-base">
                      Quick Booking
                    </p>
                    <div className="flex flex-col sm:flex-row flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="h-9 sm:h-10 text-xs sm:text-sm justify-start"
                      >
                        <a
                          href={`https://wa.me/94768118780?text=${encodeURIComponent(
                            "Hi! I'd like to book a Sri Lanka tour. Can you help me?"
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageCircle className="w-3 sm:w-4 h-3 sm:h-4 mr-1.5 sm:mr-2" />
                          <span className="hidden sm:inline">
                            Book via WhatsApp
                          </span>
                          <span className="sm:hidden">WhatsApp</span>
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="h-9 sm:h-10 text-xs sm:text-sm justify-start"
                      >
                        <a href="tel:+94768118780">
                          <Phone className="w-3 sm:w-4 h-3 sm:h-4 mr-1.5 sm:mr-2" />
                          <span className="hidden sm:inline">Call Now</span>
                          <span className="sm:hidden">Call</span>
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="h-9 sm:h-10 text-xs sm:text-sm justify-start"
                      >
                        <a href="mailto:ceyoraholidays@gmail.com">
                          <MailCheck className="w-3 sm:w-4 h-3 sm:h-4 mr-1.5 sm:mr-2" />
                          <span className="hidden sm:inline">Email Us</span>
                          <span className="sm:hidden">Email</span>
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Google Maps */}
              <Card className="bg-card border-border">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <MapPin className="w-4 sm:w-5 h-4 sm:h-5 text-primary" />
                    Find Us on Map
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="relative">
                    {/* Mobile: Thumbnail that expands to full map */}
                    <div className="md:hidden">
                      {!showMap ? (
                        <button
                          onClick={() => setShowMap(true)}
                          className="w-full h-40 sm:h-48 bg-muted rounded-lg border-2 border-dashed border-border hover:border-primary transition-colors flex flex-col items-center justify-center gap-2 group"
                        >
                          <MapPin className="w-6 sm:w-8 h-6 sm:h-8 text-primary group-hover:scale-110 transition-transform" />
                          <p className="text-sm font-medium">Tap to view map</p>
                          <p className="text-xs text-muted-foreground">
                            Interactive Google Maps
                          </p>
                        </button>
                      ) : (
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.798467890855!2d79.8612449!3d6.9194841!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sGalle%20Rd%2C%20Colombo!5e0!3m2!1sen!2slk!4v1640995200000!5m2!1sen!2slk"
                          width="100%"
                          height="250"
                          style={{ border: 0 }}
                          allowFullScreen={true}
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          className="rounded-lg"
                          title="Ceyora Holidays Office Location"
                        />
                      )}
                    </div>

                    {/* Desktop: Always show map */}
                    <div className="hidden md:block">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.798467890855!2d79.8612449!3d6.9194841!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sGalle%20Rd%2C%20Colombo!5e0!3m2!1sen!2slk!4v1640995200000!5m2!1sen!2slk"
                        width="100%"
                        height="300"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="rounded-lg"
                        title="Ceyora Holidays Office Location"
                      />
                    </div>

                    <div className="mt-2 sm:mt-3 text-xs text-muted-foreground text-center">
                      <p>112/7 Uyanwatta, Dewanagala, Sri Lanka</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
