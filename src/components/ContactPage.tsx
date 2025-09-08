"use client";

import React, { useState } from 'react';
import { toast } from 'sonner';
import { Phone, MapPin, Building2, Contact, MailCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    consent: false,
    honeypot: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject) {
      newErrors.subject = 'Please select a subject';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    if (!formData.consent) {
      newErrors.consent = 'Please accept our communication policy';
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
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitted(true);
      toast.success('Message sent successfully!', {
        description: 'We\'ll respond within 24 hours during business days.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        consent: false,
        honeypot: ''
      });
      setErrors({});
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
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
            "name": "Ceyora Holidays",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "123 Galle Road",
              "addressLocality": "Colombo",
              "addressRegion": "Western Province",
              "postalCode": "00300",
              "addressCountry": "LK"
            },
            "telephone": "+94 11 234 5678",
            "email": "hello@ceyoraholidays.com",
            "url": "https://ceyoraholidays.com",
            "openingHours": [
              "Mo-Fr 09:00-18:00",
              "Sa 09:00-16:00"
            ]
          })
        }}
      />

      <div className="bg-background">
        <div className="container mx-auto px-4 py-12 max-w-7xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ready to plan your perfect Sri Lankan adventure? Contact us today and let's create unforgettable memories together.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Contact className="w-5 h-5 text-primary" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Honeypot field (hidden) */}
                  <input
                    type="text"
                    name="website"
                    value={formData.honeypot}
                    onChange={(e) => handleInputChange('honeypot', e.target.value)}
                    style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={errors.name ? 'border-destructive' : ''}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                      />
                      {errors.name && (
                        <p id="name-error" className="text-sm text-destructive" role="alert">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={errors.email ? 'border-destructive' : ''}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                      {errors.email && (
                        <p id="email-error" className="text-sm text-destructive" role="alert">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone (Optional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+94 11 234 5678"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Select value={formData.subject} onValueChange={(value) => handleInputChange('subject', value)}>
                      <SelectTrigger className={errors.subject ? 'border-destructive' : ''}>
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="booking">Package Booking</SelectItem>
                        <SelectItem value="custom">Custom Tour Request</SelectItem>
                        <SelectItem value="support">Customer Support</SelectItem>
                        <SelectItem value="partnership">Business Partnership</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.subject && (
                      <p className="text-sm text-destructive" role="alert">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className={errors.message ? 'border-destructive' : ''}
                      placeholder="Tell us about your travel plans, questions, or special requirements..."
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                    />
                    {errors.message && (
                      <p id="message-error" className="text-sm text-destructive" role="alert">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="consent"
                      checked={formData.consent}
                      onCheckedChange={(checked) => handleInputChange('consent', !!checked)}
                      className={errors.consent ? 'border-destructive' : ''}
                      aria-invalid={!!errors.consent}
                      aria-describedby={errors.consent ? 'consent-error' : undefined}
                    />
                    <div className="space-y-1">
                      <Label htmlFor="consent" className="text-sm leading-relaxed cursor-pointer">
                        I agree to receive marketing communications from Ceyora Holidays about travel packages and special offers. You can unsubscribe at any time.
                      </Label>
                      {errors.consent && (
                        <p id="consent-error" className="text-sm text-destructive" role="alert">
                          {errors.consent}
                        </p>
                      )}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>

                  {isSubmitted && (
                    <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg" role="status" aria-live="polite">
                      <div className="flex items-center gap-2 text-primary">
                        <MailCheck className="w-5 h-5" />
                        <p className="font-medium">Message sent successfully!</p>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Thank you for contacting us. We'll respond within 24 hours during business days.
                      </p>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>

            {/* Company Details & Map */}
            <div className="space-y-6">
              {/* Company Details */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-primary" />
                    Visit Our Office
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <address className="not-italic">
                    <div className="flex items-start gap-3 mb-4">
                      <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Ceyora Holidays</p>
                        <p className="text-muted-foreground">123 Galle Road</p>
                        <p className="text-muted-foreground">Colombo 00300, Sri Lanka</p>
                      </div>
                    </div>
                  </address>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <a href="tel:+94112345678" className="text-primary hover:underline">
                          +94 11 234 5678
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <MailCheck className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Email</p>
                        <a href="mailto:hello@ceyoraholidays.com" className="text-primary hover:underline">
                          hello@ceyoraholidays.com
                        </a>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <p className="font-medium mb-2">Business Hours</p>
                      <div className="space-y-1 text-muted-foreground">
                        <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                        <p>Saturday: 9:00 AM - 4:00 PM</p>
                        <p>Sunday: Closed</p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="pt-4 border-t">
                    <p className="font-medium mb-3">Quick Contact</p>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <a href="tel:+94112345678">
                          <Phone className="w-4 h-4 mr-2" />
                          Call Now
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href="mailto:hello@ceyoraholidays.com">
                          <MailCheck className="w-4 h-4 mr-2" />
                          Email Us
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href="https://wa.me/94112345678" target="_blank" rel="noopener noreferrer">
                          <Phone className="w-4 h-4 mr-2" />
                          WhatsApp
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Google Maps */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Find Us on Map
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    {/* Mobile: Thumbnail that expands to full map */}
                    <div className="md:hidden">
                      {!showMap ? (
                        <button
                          onClick={() => setShowMap(true)}
                          className="w-full h-48 bg-muted rounded-lg border-2 border-dashed border-border hover:border-primary transition-colors flex flex-col items-center justify-center gap-2 group"
                        >
                          <MapPin className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                          <p className="text-sm font-medium">Tap to view map</p>
                          <p className="text-xs text-muted-foreground">Interactive Google Maps</p>
                        </button>
                      ) : (
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

                    <div className="mt-3 text-xs text-muted-foreground text-center">
                      <p>123 Galle Road, Colombo 00300, Sri Lanka</p>
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