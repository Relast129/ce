"use client";

import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Users, Send, Calendar, DollarSign, Globe, Facebook, Instagram, Twitter, Linkedin, Star, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { toast } from 'sonner';

interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  inquiryType: string;
  travelDates: string;
  groupSize: string;
  budgetRange: string;
  message: string;
}

const ContactPage = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    inquiryType: '',
    travelDates: '',
    groupSize: '',
    budgetRange: '',
    message: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.inquiryType) newErrors.inquiryType = 'Please select an inquiry type';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fill in all required fields correctly');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Thank you! Your message has been sent successfully. We\'ll respond within 24 hours.');
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        inquiryType: '',
        travelDates: '',
        groupSize: '',
        budgetRange: '',
        message: ''
      });
      setErrors({});
      
    } catch (error) {
      toast.error('Failed to send message. Please try again or contact us directly.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  const teamMembers = [
    {
      name: 'Amara Silva',
      role: 'Travel Director',
      phone: '+94 77 123 4567',
      email: 'amara@ceyoraholidays.com',
      specialty: 'Luxury Tours & Cultural Experiences'
    },
    {
      name: 'Nuwan Perera',
      role: 'Operations Manager',
      phone: '+94 77 234 5678',
      email: 'nuwan@ceyoraholidays.com',
      specialty: 'Adventure Tours & Group Bookings'
    },
    {
      name: 'Sanduni Fernando',
      role: 'Customer Relations',
      phone: '+94 77 345 6789',
      email: 'sanduni@ceyoraholidays.com',
      specialty: 'Custom Itineraries & Special Requests'
    }
  ];

  const faqs = [
    {
      question: 'How far in advance should I book my Sri Lanka tour?',
      answer: 'We recommend booking at least 4-6 weeks in advance, especially during peak season (December to March and July to August). However, we can accommodate last-minute bookings based on availability.'
    },
    {
      question: 'What is included in your tour packages?',
      answer: 'Our packages typically include accommodation, transportation, professional guide services, entrance fees to attractions, and some meals as specified. Detailed inclusions vary by package and are clearly outlined in each itinerary.'
    },
    {
      question: 'Do you offer customizable tour packages?',
      answer: 'Absolutely! We specialize in creating personalized itineraries based on your interests, budget, and time constraints. Contact us to discuss your specific requirements.'
    },
    {
      question: 'What is your cancellation policy?',
      answer: 'Cancellation policies vary by package and timing. Generally, cancellations made 30+ days before travel receive full refund minus processing fees. Please refer to our detailed terms and conditions for specific policies.'
    },
    {
      question: 'Are your guides English-speaking?',
      answer: 'Yes, all our guides are fluent in English and many speak additional languages including German, French, and Japanese. We can arrange for specific language requirements with advance notice.'
    },
    {
      question: 'What should I pack for Sri Lanka?',
      answer: 'Pack light, breathable clothing, comfortable walking shoes, sun protection, and modest attire for temple visits. We provide a detailed packing list with your booking confirmation.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-gradient-start to-bg-gradient-end">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary/10 to-primary/5 py-20 lg:py-32">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Get in Touch
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Ready to explore the wonders of Sri Lanka? Our expert team is here to help you plan the perfect journey. Contact us today for personalized assistance.
            </p>
            
            {/* Quick Contact Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-card/80 backdrop-blur-sm p-6 rounded-lg border border-border/50">
                <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Quick Response</h3>
                <p className="text-sm text-muted-foreground">Within 2 hours during business hours</p>
              </div>
              <div className="bg-card/80 backdrop-blur-sm p-6 rounded-lg border border-border/50">
                <Users className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Expert Team</h3>
                <p className="text-sm text-muted-foreground">Local specialists ready to help</p>
              </div>
              <div className="bg-card/80 backdrop-blur-sm p-6 rounded-lg border border-border/50">
                <Star className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">24/7 Support</h3>
                <p className="text-sm text-muted-foreground">Emergency assistance available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          
          {/* Contact Form */}
          <div className="space-y-8">
            <Card className="bg-card/90 backdrop-blur-sm border-border/50 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Send className="w-6 h-6 text-primary" />
                  Send Us a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="Enter your full name"
                      className={errors.fullName ? 'border-destructive' : ''}
                    />
                    {errors.fullName && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Email & Phone Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your@email.com"
                        className={errors.email ? 'border-destructive' : ''}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => {
                          const formatted = formatPhoneNumber(e.target.value);
                          handleInputChange('phone', formatted);
                        }}
                        placeholder="+94 77 123 4567"
                        className={errors.phone ? 'border-destructive' : ''}
                      />
                      {errors.phone && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Inquiry Type */}
                  <div className="space-y-2">
                    <Label htmlFor="inquiryType">Inquiry Type *</Label>
                    <Select 
                      value={formData.inquiryType} 
                      onValueChange={(value) => handleInputChange('inquiryType', value)}
                    >
                      <SelectTrigger className={errors.inquiryType ? 'border-destructive' : ''}>
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="package">Package Booking</SelectItem>
                        <SelectItem value="custom">Custom Tour</SelectItem>
                        <SelectItem value="group">Group Booking</SelectItem>
                        <SelectItem value="corporate">Corporate Travel</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.inquiryType && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.inquiryType}
                      </p>
                    )}
                  </div>

                  {/* Travel Details Row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="travelDates">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        Travel Dates
                      </Label>
                      <Input
                        id="travelDates"
                        value={formData.travelDates}
                        onChange={(e) => handleInputChange('travelDates', e.target.value)}
                        placeholder="e.g., Dec 15-25, 2024"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="groupSize">
                        <Users className="w-4 h-4 inline mr-1" />
                        Group Size
                      </Label>
                      <Select 
                        value={formData.groupSize} 
                        onValueChange={(value) => handleInputChange('groupSize', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-2">1-2 people</SelectItem>
                          <SelectItem value="3-5">3-5 people</SelectItem>
                          <SelectItem value="6-10">6-10 people</SelectItem>
                          <SelectItem value="11-20">11-20 people</SelectItem>
                          <SelectItem value="20+">20+ people</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="budgetRange">
                        <DollarSign className="w-4 h-4 inline mr-1" />
                        Budget Range
                      </Label>
                      <Select 
                        value={formData.budgetRange} 
                        onValueChange={(value) => handleInputChange('budgetRange', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-500">Under $500/person</SelectItem>
                          <SelectItem value="500-1000">$500-$1000/person</SelectItem>
                          <SelectItem value="1000-2000">$1000-$2000/person</SelectItem>
                          <SelectItem value="2000+">$2000+/person</SelectItem>
                          <SelectItem value="flexible">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Tell us about your travel interests, special requirements, or any questions you have..."
                      className={`min-h-[120px] resize-none ${errors.message ? 'border-destructive' : ''}`}
                      maxLength={500}
                    />
                    <div className="flex justify-between items-center">
                      {errors.message && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.message}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground ml-auto">
                        {formData.message.length}/500
                      </p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Quick Contact Actions */}
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" size="lg" className="h-auto p-4 flex-col gap-2">
                <Phone className="w-5 h-5 text-primary" />
                <div className="text-center">
                  <div className="font-semibold">Call Now</div>
                  <div className="text-sm text-muted-foreground">+94 11 234 5678</div>
                </div>
              </Button>
              
              <Button variant="outline" size="lg" className="h-auto p-4 flex-col gap-2">
                <MessageCircle className="w-5 h-5 text-primary" />
                <div className="text-center">
                  <div className="font-semibold">WhatsApp</div>
                  <div className="text-sm text-muted-foreground">Quick Chat</div>
                </div>
              </Button>
            </div>
          </div>

          {/* Contact Information & Map */}
          <div className="space-y-8">
            {/* Office Location */}
            <Card className="bg-card/90 backdrop-blur-sm border-border/50 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <MapPin className="w-6 h-6 text-primary" />
                  Visit Our Office
                </CardTitle>
                <CardDescription>
                  Located in the heart of Colombo, Sri Lanka
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Address */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground">Main Office</h4>
                      <p className="text-muted-foreground">
                        No. 45, Galle Road<br />
                        Colombo 03, Sri Lanka<br />
                        10300
                      </p>
                    </div>
                  </div>
                </div>

                {/* Google Maps Placeholder */}
                <div className="bg-muted rounded-lg h-48 flex items-center justify-center border border-border">
                  <div className="text-center space-y-2">
                    <MapPin className="w-8 h-8 text-muted-foreground mx-auto" />
                    <p className="text-sm text-muted-foreground">Interactive Map</p>
                    <p className="text-xs text-muted-foreground">Google Maps integration</p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    Business Hours (Sri Lanka Time)
                  </h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span>9:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span>Closed</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="mt-2">
                    Emergency support available 24/7
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Contact Methods */}
            <Card className="bg-card/90 backdrop-blur-sm border-border/50 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Phone Numbers */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" />
                    Phone Numbers
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Office</span>
                      <span className="font-medium">+94 11 234 5678</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Mobile/WhatsApp</span>
                      <span className="font-medium">+94 77 123 4567</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Emergency</span>
                      <span className="font-medium">+94 77 999 8888</span>
                    </div>
                  </div>
                </div>

                {/* Email Addresses */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" />
                    Email Addresses
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">General</span>
                      <span className="font-medium">info@ceyoraholidays.com</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bookings</span>
                      <span className="font-medium">bookings@ceyoraholidays.com</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Support</span>
                      <span className="font-medium">support@ceyoraholidays.com</span>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <Globe className="w-4 h-4 text-primary" />
                    Follow Us
                  </h4>
                  <div className="flex gap-3">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Facebook className="w-4 h-4 mr-1" />
                      Facebook
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Instagram className="w-4 h-4 mr-1" />
                      Instagram
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Twitter className="w-4 h-4 mr-1" />
                      Twitter
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Team Section */}
        <section className="mt-16">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Meet Our Expert Team
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our passionate travel specialists are here to help you discover the beauty of Sri Lanka
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card key={index} className="bg-card/90 backdrop-blur-sm border-border/50 shadow-lg text-center">
                <CardContent className="p-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className="font-semibold text-lg text-foreground mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground mb-4">{member.specialty}</p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{member.phone}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span>{member.email}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-16">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Quick answers to common questions about our services and booking process
            </p>
          </div>

          <Card className="bg-card/90 backdrop-blur-sm border-border/50 shadow-lg max-w-4xl mx-auto">
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left hover:text-primary">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </section>

        {/* Response Time Commitment */}
        <section className="mt-16">
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20 max-w-4xl mx-auto">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <CheckCircle className="w-8 h-8 text-primary" />
                <h3 className="font-heading text-2xl font-bold text-foreground">
                  Our Response Commitment
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">2 Hours</div>
                  <p className="text-sm text-muted-foreground">Response during business hours</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">24 Hours</div>
                  <p className="text-sm text-muted-foreground">Maximum response time</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                  <p className="text-sm text-muted-foreground">Emergency support available</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        <Button size="lg" className="rounded-full shadow-lg">
          <Phone className="w-5 h-5 mr-2" />
          Call Now
        </Button>
        <Button variant="outline" size="lg" className="rounded-full shadow-lg bg-card">
          <MessageCircle className="w-5 h-5 mr-2" />
          WhatsApp
        </Button>
      </div>
    </div>
  );
};

export default ContactPage;