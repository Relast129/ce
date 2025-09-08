"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TrainFront, ConciergeBell, Utensils, Calendar, Navigation } from "lucide-react";
import { toast } from "sonner";

interface ServiceFormData {
  transport: {
    pickup: string;
    dropoff: string;
    date: string;
    time: string;
    vehicleType: string;
  };
  hotel: {
    location: string;
    checkin: string;
    checkout: string;
    guests: string;
    roomType: string;
  };
  restaurant: {
    cuisine: string;
    date: string;
    time: string;
    partySize: string;
    occasion: string;
  };
}

interface ServiceState {
  isLoading: boolean;
  showModal: boolean;
  errors: Record<string, string>;
}

export default function ServicesPage() {
  const [formData, setFormData] = useState<ServiceFormData>({
    transport: {
      pickup: "",
      dropoff: "",
      date: "",
      time: "",
      vehicleType: ""
    },
    hotel: {
      location: "",
      checkin: "",
      checkout: "",
      guests: "",
      roomType: ""
    },
    restaurant: {
      cuisine: "",
      date: "",
      time: "",
      partySize: "",
      occasion: ""
    }
  });

  const [serviceStates, setServiceStates] = useState<Record<string, ServiceState>>({
    transport: { isLoading: false, showModal: false, errors: {} },
    hotel: { isLoading: false, showModal: false, errors: {} },
    restaurant: { isLoading: false, showModal: false, errors: {} }
  });

  const validateForm = (service: keyof ServiceFormData) => {
    const errors: Record<string, string> = {};
    const data = formData[service];

    if (service === "transport") {
      if (!data.pickup) errors.pickup = "Pickup location is required";
      if (!data.dropoff) errors.dropoff = "Drop-off location is required";
      if (!data.date) errors.date = "Date is required";
      if (!data.time) errors.time = "Time is required";
      if (!data.vehicleType) errors.vehicleType = "Vehicle type is required";
    } else if (service === "hotel") {
      if (!data.location) errors.location = "Location is required";
      if (!data.checkin) errors.checkin = "Check-in date is required";
      if (!data.checkout) errors.checkout = "Check-out date is required";
      if (!data.guests) errors.guests = "Number of guests is required";
      if (!data.roomType) errors.roomType = "Room type is required";
    } else if (service === "restaurant") {
      if (!data.cuisine) errors.cuisine = "Cuisine preference is required";
      if (!data.date) errors.date = "Date is required";
      if (!data.time) errors.time = "Time is required";
      if (!data.partySize) errors.partySize = "Party size is required";
    }

    return errors;
  };

  const handleInputChange = (service: keyof ServiceFormData, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [service]: {
        ...prev[service],
        [field]: value
      }
    }));

    // Clear error when user starts typing
    if (serviceStates[service].errors[field]) {
      setServiceStates(prev => ({
        ...prev,
        [service]: {
          ...prev[service],
          errors: {
            ...prev[service].errors,
            [field]: ""
          }
        }
      }));
    }
  };

  const handleSubmit = async (service: keyof ServiceFormData) => {
    const errors = validateForm(service);
    
    if (Object.keys(errors).length > 0) {
      setServiceStates(prev => ({
        ...prev,
        [service]: {
          ...prev[service],
          errors
        }
      }));
      return;
    }

    setServiceStates(prev => ({
      ...prev,
      [service]: {
        ...prev[service],
        isLoading: true,
        errors: {}
      }
    }));

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setServiceStates(prev => ({
      ...prev,
      [service]: {
        ...prev[service],
        isLoading: false,
        showModal: true
      }
    }));

    toast.success("Booking request submitted successfully!");
  };

  const closeModal = (service: string) => {
    setServiceStates(prev => ({
      ...prev,
      [service]: {
        ...prev[service],
        showModal: false
      }
    }));
  };

  const ServicePanel = ({ 
    service, 
    icon: Icon, 
    title, 
    description, 
    benefits, 
    features, 
    imageUrl, 
    reverse = false 
  }: {
    service: keyof ServiceFormData;
    icon: any;
    title: string;
    description: string;
    benefits: string[];
    features: string[];
    imageUrl: string;
    reverse?: boolean;
  }) => {
    const state = serviceStates[service];
    const data = formData[service];

    return (
      <Card className="bg-card shadow-lg overflow-hidden">
        <div className={`grid lg:grid-cols-2 gap-0 ${reverse ? 'lg:grid-flow-col-dense' : ''}`}>
          {/* Image */}
          <div className={`relative h-64 lg:h-full ${reverse ? 'lg:col-start-2' : ''}`}>
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
          </div>

          {/* Content */}
          <div className={`p-8 lg:p-12 flex flex-col justify-center ${reverse ? 'lg:col-start-1' : ''}`}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-primary/10">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-heading font-bold">{title}</h2>
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">{description}</p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">Benefits</h3>
                <ul className="space-y-2">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">Features</h3>
                <ul className="space-y-2">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Quick Booking Form */}
            <Card className="bg-secondary/50 border-0">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Quick Booking</CardTitle>
                <CardDescription>Fill out the form below to get started</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {service === "transport" && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`${service}-pickup`}>Pickup Location</Label>
                        <Input
                          id={`${service}-pickup`}
                          name={`${service}-pickup`}
                          placeholder="Enter pickup location"
                          value={data.pickup}
                          onChange={(e) => handleInputChange(service, "pickup", e.target.value)}
                          className={state.errors.pickup ? "border-destructive" : ""}
                        />
                        {state.errors.pickup && (
                          <p className="text-sm text-destructive mt-1">{state.errors.pickup}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor={`${service}-dropoff`}>Drop-off Location</Label>
                        <Input
                          id={`${service}-dropoff`}
                          name={`${service}-dropoff`}
                          placeholder="Enter drop-off location"
                          value={data.dropoff}
                          onChange={(e) => handleInputChange(service, "dropoff", e.target.value)}
                          className={state.errors.dropoff ? "border-destructive" : ""}
                        />
                        {state.errors.dropoff && (
                          <p className="text-sm text-destructive mt-1">{state.errors.dropoff}</p>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`${service}-date`}>Date</Label>
                        <Input
                          id={`${service}-date`}
                          name={`${service}-date`}
                          type="date"
                          value={data.date}
                          onChange={(e) => handleInputChange(service, "date", e.target.value)}
                          className={state.errors.date ? "border-destructive" : ""}
                        />
                        {state.errors.date && (
                          <p className="text-sm text-destructive mt-1">{state.errors.date}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor={`${service}-time`}>Time</Label>
                        <Input
                          id={`${service}-time`}
                          name={`${service}-time`}
                          type="time"
                          value={data.time}
                          onChange={(e) => handleInputChange(service, "time", e.target.value)}
                          className={state.errors.time ? "border-destructive" : ""}
                        />
                        {state.errors.time && (
                          <p className="text-sm text-destructive mt-1">{state.errors.time}</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor={`${service}-vehicleType`}>Vehicle Type</Label>
                      <Select
                        value={data.vehicleType}
                        onValueChange={(value) => handleInputChange(service, "vehicleType", value)}
                      >
                        <SelectTrigger className={state.errors.vehicleType ? "border-destructive" : ""}>
                          <SelectValue placeholder="Select vehicle type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sedan">Sedan</SelectItem>
                          <SelectItem value="suv">SUV</SelectItem>
                          <SelectItem value="van">Van</SelectItem>
                          <SelectItem value="luxury">Luxury Car</SelectItem>
                          <SelectItem value="bus">Mini Bus</SelectItem>
                        </SelectContent>
                      </Select>
                      {state.errors.vehicleType && (
                        <p className="text-sm text-destructive mt-1">{state.errors.vehicleType}</p>
                      )}
                    </div>
                  </>
                )}

                {service === "hotel" && (
                  <>
                    <div>
                      <Label htmlFor={`${service}-location`}>Location</Label>
                      <Input
                        id={`${service}-location`}
                        name={`${service}-location`}
                        placeholder="Enter preferred location"
                        value={data.location}
                        onChange={(e) => handleInputChange(service, "location", e.target.value)}
                        className={state.errors.location ? "border-destructive" : ""}
                      />
                      {state.errors.location && (
                        <p className="text-sm text-destructive mt-1">{state.errors.location}</p>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`${service}-checkin`}>Check-in Date</Label>
                        <Input
                          id={`${service}-checkin`}
                          name={`${service}-checkin`}
                          type="date"
                          value={data.checkin}
                          onChange={(e) => handleInputChange(service, "checkin", e.target.value)}
                          className={state.errors.checkin ? "border-destructive" : ""}
                        />
                        {state.errors.checkin && (
                          <p className="text-sm text-destructive mt-1">{state.errors.checkin}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor={`${service}-checkout`}>Check-out Date</Label>
                        <Input
                          id={`${service}-checkout`}
                          name={`${service}-checkout`}
                          type="date"
                          value={data.checkout}
                          onChange={(e) => handleInputChange(service, "checkout", e.target.value)}
                          className={state.errors.checkout ? "border-destructive" : ""}
                        />
                        {state.errors.checkout && (
                          <p className="text-sm text-destructive mt-1">{state.errors.checkout}</p>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`${service}-guests`}>Number of Guests</Label>
                        <Select
                          value={data.guests}
                          onValueChange={(value) => handleInputChange(service, "guests", value)}
                        >
                          <SelectTrigger className={state.errors.guests ? "border-destructive" : ""}>
                            <SelectValue placeholder="Select guests" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 Guest</SelectItem>
                            <SelectItem value="2">2 Guests</SelectItem>
                            <SelectItem value="3">3 Guests</SelectItem>
                            <SelectItem value="4">4 Guests</SelectItem>
                            <SelectItem value="5plus">5+ Guests</SelectItem>
                          </SelectContent>
                        </Select>
                        {state.errors.guests && (
                          <p className="text-sm text-destructive mt-1">{state.errors.guests}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor={`${service}-roomType`}>Room Type</Label>
                        <Select
                          value={data.roomType}
                          onValueChange={(value) => handleInputChange(service, "roomType", value)}
                        >
                          <SelectTrigger className={state.errors.roomType ? "border-destructive" : ""}>
                            <SelectValue placeholder="Select room type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="standard">Standard Room</SelectItem>
                            <SelectItem value="deluxe">Deluxe Room</SelectItem>
                            <SelectItem value="suite">Suite</SelectItem>
                            <SelectItem value="villa">Villa</SelectItem>
                          </SelectContent>
                        </Select>
                        {state.errors.roomType && (
                          <p className="text-sm text-destructive mt-1">{state.errors.roomType}</p>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {service === "restaurant" && (
                  <>
                    <div>
                      <Label htmlFor={`${service}-cuisine`}>Cuisine Preference</Label>
                      <Select
                        value={data.cuisine}
                        onValueChange={(value) => handleInputChange(service, "cuisine", value)}
                      >
                        <SelectTrigger className={state.errors.cuisine ? "border-destructive" : ""}>
                          <SelectValue placeholder="Select cuisine type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sri-lankan">Sri Lankan</SelectItem>
                          <SelectItem value="seafood">Seafood</SelectItem>
                          <SelectItem value="international">International</SelectItem>
                          <SelectItem value="vegetarian">Vegetarian</SelectItem>
                          <SelectItem value="fine-dining">Fine Dining</SelectItem>
                        </SelectContent>
                      </Select>
                      {state.errors.cuisine && (
                        <p className="text-sm text-destructive mt-1">{state.errors.cuisine}</p>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`${service}-date`}>Date</Label>
                        <Input
                          id={`${service}-date`}
                          name={`${service}-date`}
                          type="date"
                          value={data.date}
                          onChange={(e) => handleInputChange(service, "date", e.target.value)}
                          className={state.errors.date ? "border-destructive" : ""}
                        />
                        {state.errors.date && (
                          <p className="text-sm text-destructive mt-1">{state.errors.date}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor={`${service}-time`}>Time</Label>
                        <Select
                          value={data.time}
                          onValueChange={(value) => handleInputChange(service, "time", value)}
                        >
                          <SelectTrigger className={state.errors.time ? "border-destructive" : ""}>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="breakfast">Breakfast (7-10 AM)</SelectItem>
                            <SelectItem value="lunch">Lunch (12-3 PM)</SelectItem>
                            <SelectItem value="dinner">Dinner (6-10 PM)</SelectItem>
                          </SelectContent>
                        </Select>
                        {state.errors.time && (
                          <p className="text-sm text-destructive mt-1">{state.errors.time}</p>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`${service}-partySize`}>Party Size</Label>
                        <Select
                          value={data.partySize}
                          onValueChange={(value) => handleInputChange(service, "partySize", value)}
                        >
                          <SelectTrigger className={state.errors.partySize ? "border-destructive" : ""}>
                            <SelectValue placeholder="Select party size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2">2 People</SelectItem>
                            <SelectItem value="4">4 People</SelectItem>
                            <SelectItem value="6">6 People</SelectItem>
                            <SelectItem value="8plus">8+ People</SelectItem>
                          </SelectContent>
                        </Select>
                        {state.errors.partySize && (
                          <p className="text-sm text-destructive mt-1">{state.errors.partySize}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor={`${service}-occasion`}>Special Occasion</Label>
                        <Select
                          value={data.occasion}
                          onValueChange={(value) => handleInputChange(service, "occasion", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select occasion (optional)" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">No Special Occasion</SelectItem>
                            <SelectItem value="birthday">Birthday</SelectItem>
                            <SelectItem value="anniversary">Anniversary</SelectItem>
                            <SelectItem value="business">Business Meeting</SelectItem>
                            <SelectItem value="celebration">Celebration</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </>
                )}

                <Button
                  onClick={() => handleSubmit(service)}
                  disabled={state.isLoading}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  {state.isLoading ? "Processing..." : "Submit Booking Request"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Booking Confirmation Modal */}
        <Dialog open={state.showModal} onOpenChange={() => closeModal(service)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Icon className="h-5 w-5 text-primary" />
                Booking Request Submitted
              </DialogTitle>
              <DialogDescription>
                Your {title.toLowerCase()} booking request has been received successfully.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="bg-secondary/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Booking Summary</h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  {service === "transport" && (
                    <>
                      <p><span className="font-medium">Route:</span> {data.pickup} → {data.dropoff}</p>
                      <p><span className="font-medium">Date & Time:</span> {data.date} at {data.time}</p>
                      <p><span className="font-medium">Vehicle:</span> {data.vehicleType}</p>
                    </>
                  )}
                  {service === "hotel" && (
                    <>
                      <p><span className="font-medium">Location:</span> {data.location}</p>
                      <p><span className="font-medium">Dates:</span> {data.checkin} to {data.checkout}</p>
                      <p><span className="font-medium">Guests:</span> {data.guests} • {data.roomType}</p>
                    </>
                  )}
                  {service === "restaurant" && (
                    <>
                      <p><span className="font-medium">Cuisine:</span> {data.cuisine}</p>
                      <p><span className="font-medium">Date & Time:</span> {data.date} • {data.time}</p>
                      <p><span className="font-medium">Party Size:</span> {data.partySize}</p>
                    </>
                  )}
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                <p>We'll contact you within 2 hours to confirm availability and provide detailed pricing.</p>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => closeModal(service)}
                  variant="outline"
                  className="flex-1"
                >
                  Close
                </Button>
                <Button className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground">
                  View All Bookings
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </Card>
    );
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Navigation className="h-8 w-8 text-primary" />
              <h1 className="text-4xl lg:text-5xl font-bold font-heading">Our Services</h1>
            </div>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
              Comprehensive travel services designed to make your Sri Lankan adventure seamless and unforgettable. 
              From comfortable transport to luxury accommodations and authentic dining experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Service Panels */}
      <section className="py-16 lg:py-24">
        <div className="container max-w-7xl mx-auto px-4 space-y-16">
          <ServicePanel
            service="transport"
            icon={TrainFront}
            title="Transport Services"
            description="Professional, reliable transportation solutions with experienced local drivers who know Sri Lanka's roads and attractions intimately. From airport transfers to multi-day touring, we ensure comfortable and safe journeys."
            benefits={[
              "Professional local drivers",
              "Reliable and punctual service",
              "Well-maintained vehicles",
              "Flexible scheduling",
              "Competitive pricing"
            ]}
            features={[
              "Sedans & SUVs",
              "Luxury vehicles",
              "Mini buses",
              "Airport transfers",
              "Multi-day tours"
            ]}
            imageUrl="https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=800&h=600&fit=crop"
          />

          <ServicePanel
            service="hotel"
            icon={ConciergeBell}
            title="Hotel Booking"
            description="Carefully selected accommodations ranging from boutique hotels to luxury resorts. We work with vetted properties that meet our high standards for comfort, service, and authentic Sri Lankan hospitality."
            benefits={[
              "Vetted quality properties",
              "Best rate guarantee",
              "Prime locations",
              "24/7 support",
              "Authentic experiences"
            ]}
            features={[
              "Boutique hotels",
              "Beach resorts",
              "Hill country lodges",
              "Heritage properties",
              "Eco-friendly options"
            ]}
            imageUrl="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop"
            reverse={true}
          />

          <ServicePanel
            service="restaurant"
            icon={Utensils}
            title="Restaurant Arrangements"
            description="Curated dining experiences showcasing the best of Sri Lankan cuisine and international options. From street food tours to fine dining, we connect you with authentic flavors and memorable culinary adventures."
            benefits={[
              "Curated restaurant selection",
              "Authentic local cuisine",
              "Special occasion planning",
              "Dietary accommodations",
              "Cultural experiences"
            ]}
            features={[
              "Traditional Sri Lankan",
              "Fresh seafood",
              "Vegetarian options",
              "Fine dining",
              "Street food tours"
            ]}
            imageUrl="https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&h=600&fit=crop"
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold font-heading mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Everything you need to know about our services and policies
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="booking-policy" className="bg-card rounded-lg px-6">
              <AccordionTrigger className="text-left">
                What is your booking and cancellation policy?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <div className="space-y-3">
                  <p>Our booking policy varies by service type:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Transport:</strong> Free cancellation up to 24 hours before scheduled pickup</li>
                    <li><strong>Hotels:</strong> Cancellation policy depends on the property, typically 48-72 hours</li>
                    <li><strong>Restaurants:</strong> Free cancellation up to 4 hours before reservation</li>
                  </ul>
                  <p>All bookings require a confirmation deposit, with full payment due upon service completion.</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="payment-methods" className="bg-card rounded-lg px-6">
              <AccordionTrigger className="text-left">
                What payment methods do you accept?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <div className="space-y-3">
                  <p>We accept multiple payment methods for your convenience:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Credit and debit cards (Visa, Mastercard, American Express)</li>
                    <li>Bank transfers for advance bookings</li>
                    <li>Cash payments (Sri Lankan Rupees or US Dollars)</li>
                    <li>Digital wallets and mobile payments</li>
                  </ul>
                  <p>Secure payment processing ensures your financial information is protected.</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="travel-insurance" className="bg-card rounded-lg px-6">
              <AccordionTrigger className="text-left">
                Do you provide travel insurance coverage?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <div className="space-y-3">
                  <p>While we maintain comprehensive business insurance, we strongly recommend travelers purchase their own travel insurance covering:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Trip cancellation and interruption</li>
                    <li>Medical expenses and emergency evacuation</li>
                    <li>Lost or delayed baggage</li>
                    <li>Personal liability coverage</li>
                  </ul>
                  <p>We can recommend trusted travel insurance providers upon request.</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="special-requirements" className="bg-card rounded-lg px-6">
              <AccordionTrigger className="text-left">
                Can you accommodate special dietary or accessibility requirements?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <div className="space-y-3">
                  <p>Absolutely! We pride ourselves on inclusive service:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Dietary:</strong> Vegetarian, vegan, gluten-free, halal, and other dietary restrictions</li>
                    <li><strong>Accessibility:</strong> Wheelchair-accessible vehicles and accommodations</li>
                    <li><strong>Medical:</strong> Assistance with medical requirements and equipment transport</li>
                    <li><strong>Cultural:</strong> Respectful accommodation of religious and cultural needs</li>
                  </ul>
                  <p>Please inform us of any special requirements when booking so we can make appropriate arrangements.</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="emergency-support" className="bg-card rounded-lg px-6">
              <AccordionTrigger className="text-left">
                What support is available during my trip?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <div className="space-y-3">
                  <p>Our commitment to your experience extends throughout your journey:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>24/7 emergency contact line for urgent assistance</li>
                    <li>Local support team available during business hours</li>
                    <li>Real-time updates for any service changes or delays</li>
                    <li>Coordination with local authorities if needed</li>
                    <li>Backup arrangements for unforeseen circumstances</li>
                  </ul>
                  <p>You'll receive emergency contact information with your booking confirmation.</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
}