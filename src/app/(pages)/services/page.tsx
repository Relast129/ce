"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  MapPin, 
  Mountain, 
  Waves, 
  Car, 
  Building2, 
  Utensils, 
  Camera, 
  Clock, 
  Users, 
  Star, 
  Shield, 
  Phone, 
  Mail, 
  CheckCircle,
  ArrowRight,
  Calendar,
  Award,
  Globe,
  Heart
} from "lucide-react";

const services = [
  {
    id: "cultural-tours",
    title: "Cultural Tours",
    icon: MapPin,
    description: "Immerse yourself in Sri Lanka's rich heritage with guided tours of ancient temples, UNESCO World Heritage sites, and traditional villages.",
    highlights: ["Ancient temple visits", "Heritage site exploration", "Traditional craft workshops", "Local guide expertise"],
    startingPrice: "$89",
    duration: "Full day",
    groupSize: "2-15 people",
    image: "/api/placeholder/600/400",
    features: [
      "Professional multilingual guides",
      "Temple entrance fees included",
      "Traditional lunch experience",
      "Cultural performance shows",
      "Photography opportunities"
    ]
  },
  {
    id: "adventure-tours",
    title: "Adventure Tours",
    icon: Mountain,
    description: "Experience thrilling adventures from hiking misty mountains to wildlife safaris and exciting water sports activities.",
    highlights: ["Mountain hiking trails", "Wildlife safari expeditions", "Water sports adventures", "Nature photography"],
    startingPrice: "$125",
    duration: "Half/Full day",
    groupSize: "4-12 people",
    image: "/api/placeholder/600/400",
    features: [
      "Professional adventure guides",
      "Safety equipment provided",
      "Wildlife expert commentary",
      "Packed adventure meals",
      "Emergency support included"
    ]
  },
  {
    id: "beach-holidays",
    title: "Beach Holidays",
    icon: Waves,
    description: "Relax and unwind on pristine beaches with luxury resort stays and coastal exploration packages.",
    highlights: ["Pristine beach access", "Luxury accommodations", "Water sports activities", "Sunset experiences"],
    startingPrice: "$199",
    duration: "3-7 days",
    groupSize: "Couples/Families",
    image: "/api/placeholder/600/400",
    features: [
      "Beachfront accommodations",
      "Daily breakfast included",
      "Complimentary water sports",
      "Spa treatment options",
      "Private beach access"
    ]
  },
  {
    id: "transport-services",
    title: "Transport Services",
    icon: Car,
    description: "Comfortable and reliable transportation solutions including airport transfers, private vehicles, and group transport.",
    highlights: ["Airport transfers", "Private vehicle hire", "Group transportation", "24/7 availability"],
    startingPrice: "$45",
    duration: "As required",
    groupSize: "1-45 people",
    image: "/api/placeholder/600/400",
    features: [
      "Professional chauffeurs",
      "Modern air-conditioned vehicles",
      "GPS tracking systems",
      "Flexible scheduling",
      "Luggage assistance included"
    ]
  },
  {
    id: "hotel-booking",
    title: "Hotel Booking",
    icon: Building2,
    description: "Curated accommodations from luxury resorts to boutique hotels and eco-friendly lodges across Sri Lanka.",
    highlights: ["Luxury resort options", "Boutique hotel selection", "Eco-lodge experiences", "Best price guarantee"],
    startingPrice: "$75",
    duration: "Per night",
    groupSize: "All sizes",
    image: "/api/placeholder/600/400",
    features: [
      "Hand-picked accommodations",
      "Best rate guarantee",
      "24/7 concierge support",
      "Complimentary upgrades",
      "Flexible cancellation"
    ]
  },
  {
    id: "restaurant-arrangements",
    title: "Restaurant Arrangements",
    icon: Utensils,
    description: "Exceptional dining experiences featuring fine restaurants, local cuisine tours, and authentic cooking classes.",
    highlights: ["Fine dining reservations", "Local cuisine tours", "Cooking class experiences", "Chef recommendations"],
    startingPrice: "$35",
    duration: "2-4 hours",
    groupSize: "2-20 people",
    image: "/api/placeholder/600/400",
    features: [
      "Restaurant reservations",
      "Menu customization",
      "Dietary accommodations",
      "Wine pairing options",
      "Traditional cooking classes"
    ]
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "United Kingdom",
    service: "Cultural Tours",
    rating: 5,
    comment: "The cultural tour was absolutely incredible. Our guide was so knowledgeable about the history and traditions. The temple visits were spiritual and enlightening.",
    image: "/api/placeholder/80/80"
  },
  {
    name: "Michael Chen",
    location: "Australia",
    service: "Adventure Tours", 
    rating: 5,
    comment: "Amazing adventure experience! The wildlife safari exceeded our expectations. Saw elephants, leopards, and countless bird species. Safety was prioritized throughout.",
    image: "/api/placeholder/80/80"
  },
  {
    name: "Emma Davis",
    location: "Canada",
    service: "Beach Holidays",
    rating: 5,
    comment: "Perfect beach holiday! The resort was stunning and the service was exceptional. Every detail was taken care of. Will definitely book again.",
    image: "/api/placeholder/80/80"
  }
];

const faqs = [
  {
    question: "What's included in your tour packages?",
    answer: "Our packages typically include professional guides, transportation, entrance fees, meals as specified, and emergency support. Specific inclusions vary by service type and are detailed in each package description."
  },
  {
    question: "Do you offer customized tour packages?",
    answer: "Yes! We specialize in creating personalized itineraries based on your interests, budget, and time constraints. Contact us to discuss your custom requirements."
  },
  {
    question: "What safety measures do you have in place?",
    answer: "We prioritize safety with certified guides, quality equipment, comprehensive insurance, emergency communication systems, and regular safety briefings for all adventure activities."
  },
  {
    question: "Can dietary restrictions be accommodated?",
    answer: "Absolutely! We can accommodate various dietary requirements including vegetarian, vegan, gluten-free, and religious dietary restrictions. Please inform us during booking."
  },
  {
    question: "What's your cancellation policy?",
    answer: "Cancellation policies vary by service type. Generally, we offer free cancellation 48-72 hours in advance. Emergency cancellations are handled case by case with maximum flexibility."
  },
  {
    question: "Do you provide travel insurance?",
    answer: "We work with trusted insurance partners to offer comprehensive travel insurance options. We strongly recommend travel insurance for all our services, especially adventure activities."
  }
];

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    travelDates: "",
    groupSize: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20 py-20 lg:py-32">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-10"></div>
        <div className="container relative z-10 text-center">
          <Badge className="mb-6 bg-accent text-accent-foreground">
            Comprehensive Services
          </Badge>
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            Exceptional Travel Services
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
            From cultural explorations to luxury accommodations, we provide comprehensive travel services
            to make your Sri Lankan adventure unforgettable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              <Calendar className="mr-2 h-5 w-5" />
              Book Service Now
            </Button>
            <Button size="lg" variant="outline">
              <Phone className="mr-2 h-5 w-5" />
              Speak to Expert
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
              Our Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our comprehensive range of travel services designed to create
              memorable experiences throughout Sri Lanka.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <Card 
                  key={service.id} 
                  className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
                >
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 rounded-t-lg relative overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 rounded-full p-2">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <Badge className="bg-accent text-accent-foreground">
                        From {service.startingPrice}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {service.title}
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {service.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2" />
                        {service.duration}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="h-4 w-4 mr-2" />
                        {service.groupSize}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {service.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center text-sm">
                          <CheckCircle className="h-3 w-3 text-green-500 mr-1 flex-shrink-0" />
                          <span className="text-muted-foreground truncate">{highlight}</span>
                        </div>
                      ))}
                    </div>

                    {selectedService === service.id && (
                      <div className="mt-4 pt-4 border-t space-y-3">
                        <h4 className="font-semibold">Service Features:</h4>
                        {service.features.map((feature, index) => (
                          <div key={index} className="flex items-center text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <Button className="w-full mt-4">
                      <Calendar className="mr-2 h-4 w-4" />
                      Book {service.title}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Service Comparison Table */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
              Service Comparison
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Compare our services to find the perfect match for your travel needs.
            </p>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="font-semibold">Service Type</div>
                <div className="font-semibold text-center">Starting Price</div>
                <div className="font-semibold text-center">Duration</div>
                <div className="font-semibold text-center">Group Size</div>
              </div>
              
              {services.map((service) => (
                <div key={service.id} className="grid grid-cols-4 gap-4 py-4 border-b border-border items-center">
                  <div className="flex items-center">
                    <service.icon className="h-5 w-5 text-primary mr-3" />
                    <span className="font-medium">{service.title}</span>
                  </div>
                  <div className="text-center">
                    <Badge variant="secondary">{service.startingPrice}</Badge>
                  </div>
                  <div className="text-center text-muted-foreground">
                    {service.duration}
                  </div>
                  <div className="text-center text-muted-foreground">
                    {service.groupSize}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Custom Packages Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-accent text-accent-foreground">
              Personalized Experience
            </Badge>
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
              Custom Tour Packages
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              Create your perfect Sri Lankan adventure with our personalized tour planning service.
              We'll design an itinerary that matches your interests, schedule, and budget.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="text-center p-6">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Tailored Itineraries</h3>
                <p className="text-muted-foreground">
                  Every detail crafted to match your unique preferences and travel style.
                </p>
              </Card>

              <Card className="text-center p-6">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Local Expertise</h3>
                <p className="text-muted-foreground">
                  Benefit from our deep local knowledge and insider access to hidden gems.
                </p>
              </Card>

              <Card className="text-center p-6">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Premium Support</h3>
                <p className="text-muted-foreground">
                  24/7 concierge service and dedicated support throughout your journey.
                </p>
              </Card>
            </div>

            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Phone className="mr-2 h-5 w-5" />
              Plan My Custom Tour
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
              What Our Guests Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real experiences from travelers who've enjoyed our services.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                  </div>
                </div>
                
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-muted-foreground mb-3">"{testimonial.comment}"</p>
                
                <Badge variant="secondary" className="text-xs">
                  {testimonial.service}
                </Badge>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get answers to common questions about our services and booking process.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Service Inquiry Form */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                Service Inquiry
              </h2>
              <p className="text-lg text-muted-foreground">
                Ready to book or have questions? Send us your inquiry and we'll get back to you within 24 hours.
              </p>
            </div>

            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input 
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input 
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service">Service Interest *</Label>
                    <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.title}
                          </SelectItem>
                        ))}
                        <SelectItem value="custom">Custom Package</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="travelDates">Preferred Travel Dates</Label>
                    <Input 
                      id="travelDates"
                      placeholder="e.g., March 15-22, 2024"
                      value={formData.travelDates}
                      onChange={(e) => handleInputChange("travelDates", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="groupSize">Group Size</Label>
                    <Select value={formData.groupSize} onValueChange={(value) => handleInputChange("groupSize", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select group size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Solo Traveler</SelectItem>
                        <SelectItem value="2">Couple (2 people)</SelectItem>
                        <SelectItem value="3-5">Small Group (3-5 people)</SelectItem>
                        <SelectItem value="6-10">Medium Group (6-10 people)</SelectItem>
                        <SelectItem value="10+">Large Group (10+ people)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message"
                    placeholder="Tell us about your travel preferences, special requirements, or any questions you have..."
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    rows={5}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  <Mail className="mr-2 h-5 w-5" />
                  Send Inquiry
                </Button>

                <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 mr-1" />
                    Secure & Private
                  </div>
                  <Separator orientation="vertical" className="h-4" />
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    24hr Response
                  </div>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}