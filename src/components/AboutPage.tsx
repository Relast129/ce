"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { toast } from 'sonner';
import { Contact, Component, LayoutTemplate } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  expanded?: boolean;
}

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export default function AboutPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Sanath Perera',
      role: 'Founder & CEO',
      bio: 'With over 15 years in Sri Lankan tourism, Sanath founded Ceyora Holidays to share his passion for authentic travel experiences. He personally curates each itinerary to showcase the hidden gems of his homeland.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face'
    },
    {
      id: '2',
      name: 'Priya Wickramasinghe',
      role: 'Head of Operations',
      bio: 'A hospitality management graduate with deep local knowledge, Priya ensures every detail of your journey runs smoothly. She coordinates with our network of trusted partners across Sri Lanka.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b588?w=300&h=300&fit=crop&crop=face'
    },
    {
      id: '3',
      name: 'Chaminda Silva',
      role: 'Lead Tour Guide',
      bio: 'Born and raised in Kandy, Chaminda is a certified wildlife guide with expertise in Sri Lankan history and culture. His storytelling brings ancient sites and natural wonders to life.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face'
    },
    {
      id: '4',
      name: 'Anjali Fernando',
      role: 'Customer Experience Manager',
      bio: 'Fluent in multiple languages, Anjali ensures international guests feel welcomed from arrival to departure. She handles special requests and creates personalized experiences for families and groups.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face'
    }
  ]);

  const [contactForm, setContactForm] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const toggleTeamMember = (id: string) => {
    setTeamMembers(prev => prev.map(member => 
      member.id === id ? { ...member, expanded: !member.expanded } : member
    ));
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Thank you for your inquiry! We\'ll get back to you within 24 hours.');
      setContactForm({ name: '', email: '', message: '' });
      setContactModalOpen(false);
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-96 bg-cover bg-center bg-no-repeat" 
               style={{
                 backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=600&fit=crop)'
               }}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">About Ceyora Holidays</h1>
            <p className="text-xl font-medium">Your trusted partner in discovering the pearl of the Indian Ocean</p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16 space-y-24">
        {/* Company Story Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Our Story</h2>
            <div className="prose prose-lg">
              <p className="text-muted-foreground leading-relaxed">
                Founded in 2009, Ceyora Holidays began as a dream to share Sri Lanka's incredible beauty with the world. 
                What started as a small family business has grown into one of the island's most trusted travel companies, 
                serving thousands of satisfied guests from around the globe.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Our Journey</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <strong className="text-sm font-medium">2009:</strong> 
                    <span className="text-muted-foreground ml-2">Founded with a vision to showcase authentic Sri Lanka</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <strong className="text-sm font-medium">2012:</strong> 
                    <span className="text-muted-foreground ml-2">Expanded to cover all major destinations across the island</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <strong className="text-sm font-medium">2016:</strong> 
                    <span className="text-muted-foreground ml-2">Achieved Sri Lanka Tourism Board certification</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <strong className="text-sm font-medium">2020:</strong> 
                    <span className="text-muted-foreground ml-2">Launched sustainable tourism initiatives</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <strong className="text-sm font-medium">2024:</strong> 
                    <span className="text-muted-foreground ml-2">Celebrating 15 years of exceptional service</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop" 
              alt="Ceyora Holidays team in traditional Sri Lankan setting"
              className="rounded-lg shadow-lg"
            />
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section className="text-center space-y-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">Why Choose Ceyora Holidays</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              We combine local expertise with international standards to create unforgettable experiences
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Contact className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Local Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Born and raised in Sri Lanka, our team knows the hidden gems and authentic experiences 
                  that make your journey truly special.
                </CardDescription>
                <Dialog open={contactModalOpen} onOpenChange={setContactModalOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">Contact Our Experts</Button>
                  </DialogTrigger>
                </Dialog>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Component className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Safety & Reliability</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Fully licensed and insured with 24/7 support. Our safety protocols and emergency 
                  procedures ensure peace of mind throughout your journey.
                </CardDescription>
                <Button variant="outline" size="sm">View Our Services</Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <LayoutTemplate className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>Personalized Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Every itinerary is customized to your interests, budget, and travel style. 
                  From luxury escapes to adventure tours, we craft your perfect Sri Lankan experience.
                </CardDescription>
                <Button variant="outline" size="sm">Explore Packages</Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Trust & Credentials Section */}
        <section className="bg-card rounded-lg p-8 space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Trust & Credentials</h2>
            <p className="text-muted-foreground">
              We work with the best partners and maintain the highest standards of service
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold mb-6">Our Trusted Partners</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  'Jetwing Hotels', 'Aitken Spence', 'John Keells', 
                  'Ceylon Tea Trails', 'Amangalla', 'Shangri-La'
                ].map((partner, index) => (
                  <div key={index} className="bg-muted rounded-md p-3 text-center">
                    <div className="text-sm font-medium text-muted-foreground">{partner}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6">Certifications & Awards</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                    <Component className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-medium">Sri Lanka Tourism Board Certified</div>
                    <div className="text-sm text-muted-foreground">Licensed tour operator since 2016</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                    <Component className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-medium">Travel Insurance Coverage</div>
                    <div className="text-sm text-muted-foreground">Comprehensive protection for all guests</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                    <Component className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-medium">Excellence in Service Award</div>
                    <div className="text-sm text-muted-foreground">TripAdvisor Certificate of Excellence 2023</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center bg-muted rounded-md p-6">
            <p className="text-muted-foreground">
              <strong>Safety First:</strong> All our vehicles are regularly inspected, our guides are certified, 
              and we maintain 24/7 emergency support. Your safety and satisfaction are our top priorities.
            </p>
          </div>
        </section>

        {/* Meet the Team Section */}
        <section className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The passionate individuals who make your Sri Lankan adventure unforgettable
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <Card key={member.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={`${member.name}, ${member.role}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription className="text-primary font-medium">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Collapsible open={member.expanded} onOpenChange={() => toggleTeamMember(member.id)}>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="w-full p-0 h-auto">
                        <span className="text-sm text-muted-foreground">
                          {member.expanded ? 'Show less' : 'Read more'}
                        </span>
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2">
                      <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                    </CollapsibleContent>
                  </Collapsible>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>

      {/* Contact Modal */}
      <Dialog open={contactModalOpen} onOpenChange={setContactModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Contact Our Experts</DialogTitle>
            <DialogDescription>
              Send us a message and we'll get back to you within 24 hours.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div>
              <Input
                placeholder="Your name"
                value={contactForm.name}
                onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Your email"
                value={contactForm.email}
                onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            <div>
              <Textarea
                placeholder="How can we help you?"
                rows={4}
                value={contactForm.message}
                onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                required
              />
            </div>
            <div className="flex gap-2 pt-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setContactModalOpen(false)}
                disabled={isSubmitting}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}