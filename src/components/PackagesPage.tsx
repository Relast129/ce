"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  PackageSearch, 
  ListFilter, 
  Package, 
  Star, 
  MapPin, 
  Clock, 
  Users, 
  Calendar as CalendarIcon,
  Plane,
  Camera,
  Mountain,
  Waves,
  TreePalm,
  ChevronLeft,
  ChevronRight,
  ZoomIn
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

interface TravelPackage {
  id: string;
  title: string;
  excerpt: string;
  description: string;
  region: string;
  duration: number;
  price: number;
  rating: number;
  reviewCount: number;
  images: string[];
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: { day: number; title: string; description: string; }[];
  travelStyle: string[];
}

const mockPackages: TravelPackage[] = [
  {
    id: "1",
    title: "Cultural Heritage & Ancient Cities",
    excerpt: "Explore Sri Lanka's ancient kingdoms and UNESCO World Heritage sites",
    description: "Journey through time as you discover the magnificent ancient cities of Anuradhapura, Polonnaruwa, and the iconic Sigiriya Rock Fortress. This cultural immersion includes traditional dance performances, local craft workshops, and authentic cuisine experiences.",
    region: "Central & North Central",
    duration: 7,
    price: 1299,
    rating: 4.8,
    reviewCount: 142,
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800",
      "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800"
    ],
    highlights: ["Sigiriya Rock Fortress", "Ancient Polonnaruwa", "Temple of the Tooth", "Cultural Performances"],
    inclusions: ["Accommodation", "All meals", "Professional guide", "Entrance fees", "Transportation"],
    exclusions: ["International flights", "Travel insurance", "Personal expenses", "Tips"],
    itinerary: [
      { day: 1, title: "Arrival in Colombo", description: "Airport transfer and city orientation tour" },
      { day: 2, title: "Colombo to Sigiriya", description: "Visit Dambulla Cave Temple en route" },
      { day: 3, title: "Sigiriya Rock Fortress", description: "Early morning climb and afternoon village tour" },
      { day: 4, title: "Polonnaruwa Ancient City", description: "Full day exploring the ancient ruins" },
      { day: 5, title: "Kandy Cultural Triangle", description: "Temple of the Tooth and cultural show" },
      { day: 6, title: "Kandy to Colombo", description: "Shopping and city tour" },
      { day: 7, title: "Departure", description: "Airport transfer" }
    ],
    travelStyle: ["cultural", "historical"]
  },
  {
    id: "2",
    title: "Tropical Beach Paradise",
    excerpt: "Pristine beaches, crystal waters, and luxury beach resorts",
    description: "Relax on the golden beaches of the south and west coasts. Enjoy water sports, whale watching, and beachfront dining at some of Sri Lanka's most beautiful coastal destinations.",
    region: "Southern & Western Coast",
    duration: 5,
    price: 899,
    rating: 4.6,
    reviewCount: 98,
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
      "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4?w=800"
    ],
    highlights: ["Unawatuna Beach", "Whale Watching", "Galle Fort", "Water Sports"],
    inclusions: ["Beach resort accommodation", "Breakfast", "Airport transfers", "Whale watching tour"],
    exclusions: ["Lunch & dinner", "Water sports equipment", "Travel insurance", "Personal expenses"],
    itinerary: [
      { day: 1, title: "Arrival & Negombo", description: "Beach relaxation and fresh seafood dinner" },
      { day: 2, title: "Galle & Unawatuna", description: "Historic fort tour and beach time" },
      { day: 3, title: "Mirissa Whale Watching", description: "Early morning whale watching excursion" },
      { day: 4, title: "Beach Activities", description: "Water sports and spa treatments" },
      { day: 5, title: "Departure", description: "Last-minute shopping and airport transfer" }
    ],
    travelStyle: ["beach", "relaxation"]
  },
  {
    id: "3",
    title: "Adventure & Wildlife Safari",
    excerpt: "Thrilling wildlife encounters and outdoor adventures",
    description: "Experience Sri Lanka's incredible biodiversity with safaris in Yala National Park, elephant encounters, and adventure activities in the hill country.",
    region: "Hill Country & Southern",
    duration: 9,
    price: 1599,
    rating: 4.9,
    reviewCount: 76,
    images: [
      "https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800",
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800",
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800"
    ],
    highlights: ["Yala Safari", "Elephant Orphanage", "White Water Rafting", "Hiking Adventures"],
    inclusions: ["Eco-lodge accommodation", "All meals", "Safari drives", "Adventure activities", "Professional guides"],
    exclusions: ["International flights", "Travel insurance", "Personal expenses", "Alcoholic beverages"],
    itinerary: [
      { day: 1, title: "Arrival & Negombo", description: "Wildlife orientation briefing" },
      { day: 2, title: "Pinnawala Elephant Orphanage", description: "Elephant feeding and bathing experience" },
      { day: 3, title: "Kandy to Nuwara Eliya", description: "Scenic train journey through tea country" },
      { day: 4, title: "Hill Country Adventures", description: "Hiking and tea plantation tours" },
      { day: 5, title: "White Water Rafting", description: "Thrilling rapids in Kitulgala" },
      { day: 6, title: "Yala National Park", description: "Afternoon safari game drive" },
      { day: 7, title: "Full Day Safari", description: "Early morning and evening game drives" },
      { day: 8, title: "Coastal Journey", description: "Travel to southern beaches" },
      { day: 9, title: "Departure", description: "Final wildlife spotting and airport transfer" }
    ],
    travelStyle: ["adventure", "wildlife"]
  }
];

const regions = ["All Regions", "Central & North Central", "Southern & Western Coast", "Hill Country & Southern", "Eastern Province"];
const travelStyles = ["cultural", "beach", "adventure", "wildlife", "relaxation", "historical"];

export default function PackagesPage() {
  const [packages, setPackages] = useState<TravelPackage[]>(mockPackages);
  const [filteredPackages, setFilteredPackages] = useState<TravelPackage[]>(mockPackages);
  const [loading, setLoading] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<TravelPackage | null>(null);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [durationRange, setDurationRange] = useState([1, 14]);
  const [priceRange, setPriceRange] = useState([500, 2000]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  
  // Booking states
  const [bookingDate, setBookingDate] = useState<Date | undefined>(undefined);
  const [travelers, setTravelers] = useState(2);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);
  const [bookingReference, setBookingReference] = useState("");
  
  // Gallery state
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Filter packages based on current filter states
  useEffect(() => {
    let filtered = packages;

    if (searchTerm) {
      filtered = filtered.filter(pkg => 
        pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedRegion !== "All Regions") {
      filtered = filtered.filter(pkg => pkg.region === selectedRegion);
    }

    filtered = filtered.filter(pkg => 
      pkg.duration >= durationRange[0] && pkg.duration <= durationRange[1]
    );

    filtered = filtered.filter(pkg => 
      pkg.price >= priceRange[0] && pkg.price <= priceRange[1]
    );

    if (selectedStyles.length > 0) {
      filtered = filtered.filter(pkg => 
        pkg.travelStyle.some(style => selectedStyles.includes(style))
      );
    }

    setFilteredPackages(filtered);
  }, [packages, searchTerm, selectedRegion, durationRange, priceRange, selectedStyles]);

  const toggleTravelStyle = (style: string) => {
    setSelectedStyles(prev => 
      prev.includes(style) 
        ? prev.filter(s => s !== style)
        : [...prev, style]
    );
  };

  const handleBooking = async () => {
    if (!bookingDate || !selectedPackage) return;
    
    setBookingLoading(true);
    
    // Simulate booking API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const reference = `BK${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    setBookingReference(reference);
    setShowBookingConfirmation(true);
    setBookingLoading(false);
    
    toast.success("Booking confirmed successfully!");
  };

  const resetBookingForm = () => {
    setBookingDate(undefined);
    setTravelers(2);
    setShowBookingConfirmation(false);
    setBookingReference("");
    setSelectedPackage(null);
  };

  const generateStructuredData = (pkg: TravelPackage) => {
    return {
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      "name": pkg.title,
      "description": pkg.description,
      "duration": `P${pkg.duration}D`,
      "offers": {
        "@type": "Offer",
        "price": pkg.price,
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": pkg.rating,
        "reviewCount": pkg.reviewCount
      },
      "itinerary": pkg.itinerary.map(item => ({
        "@type": "Day",
        "name": item.title,
        "description": item.description
      }))
    };
  };

  const getTravelStyleIcon = (style: string) => {
    switch (style) {
      case "beach": return <Waves className="w-4 h-4" />;
      case "cultural": return <Camera className="w-4 h-4" />;
      case "adventure": return <Mountain className="w-4 h-4" />;
      case "wildlife": return <TreePalm className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <section className="bg-card border-b border-border">
        <div className="container max-w-7xl mx-auto px-4 py-12">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Travel Packages
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover handcrafted travel experiences that showcase the best of Sri Lanka. 
              From cultural heritage tours to pristine beaches and thrilling adventures.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-0 z-40 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="container max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <ListFilter className="w-4 h-4" />
              Filters:
            </div>
            
            {/* Search */}
            <div className="relative flex-1 min-w-[200px] max-w-[300px]">
              <PackageSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search packages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Region Filter */}
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                {regions.map(region => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Duration Range */}
            <div className="flex items-center gap-2 min-w-[150px]">
              <Label className="text-sm whitespace-nowrap">Duration:</Label>
              <div className="flex-1">
                <Slider
                  value={durationRange}
                  onValueChange={setDurationRange}
                  max={14}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>{durationRange[0]}d</span>
                  <span>{durationRange[1]}d</span>
                </div>
              </div>
            </div>

            {/* Price Range */}
            <div className="flex items-center gap-2 min-w-[150px]">
              <Label className="text-sm whitespace-nowrap">Price:</Label>
              <div className="flex-1">
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={3000}
                  min={500}
                  step={100}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Travel Styles */}
          <div className="flex flex-wrap gap-2 mt-4">
            <Label className="text-sm text-muted-foreground">Travel Style:</Label>
            {travelStyles.map(style => (
              <Badge
                key={style}
                variant={selectedStyles.includes(style) ? "default" : "outline"}
                className="cursor-pointer capitalize transition-colors"
                onClick={() => toggleTravelStyle(style)}
              >
                {getTravelStyleIcon(style)}
                <span className="ml-1">{style}</span>
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Results Count */}
      <div className="container max-w-7xl mx-auto px-4 py-4">
        <p className="text-sm text-muted-foreground" aria-live="polite">
          Showing {filteredPackages.length} of {packages.length} packages
        </p>
      </div>

      {/* Results Grid */}
      <section className="container max-w-7xl mx-auto px-4 pb-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="aspect-[4/3] bg-muted animate-pulse" />
                <CardContent className="p-6">
                  <div className="h-4 bg-muted rounded animate-pulse mb-2" />
                  <div className="h-3 bg-muted rounded animate-pulse mb-4 w-3/4" />
                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded animate-pulse w-1/2" />
                    <div className="h-3 bg-muted rounded animate-pulse w-1/3" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredPackages.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No packages found</h3>
            <p className="text-muted-foreground">Try adjusting your filters to see more results.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPackages.map((pkg) => (
              <Card key={pkg.id} className="overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={pkg.images[0]}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
                    ${pkg.price}
                  </Badge>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(pkg.rating) 
                              ? "fill-primary text-primary" 
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {pkg.rating} ({pkg.reviewCount} reviews)
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-2 line-clamp-2">
                    {pkg.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {pkg.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {pkg.duration} days
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {pkg.region}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {pkg.highlights.slice(0, 3).map((highlight, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                    {pkg.highlights.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{pkg.highlights.length - 3} more
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => setSelectedPackage(pkg)}
                        >
                          <ZoomIn className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        {selectedPackage && (
                          <>
                            <script
                              type="application/ld+json"
                              dangerouslySetInnerHTML={{ 
                                __html: JSON.stringify(generateStructuredData(selectedPackage)) 
                              }}
                            />
                            
                            <DialogHeader>
                              <DialogTitle className="text-2xl font-heading">
                                {selectedPackage.title}
                              </DialogTitle>
                            </DialogHeader>
                            
                            <Tabs defaultValue="overview" className="w-full">
                              <TabsList className="grid w-full grid-cols-4">
                                <TabsTrigger value="overview">Overview</TabsTrigger>
                                <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                                <TabsTrigger value="details">Details</TabsTrigger>
                                <TabsTrigger value="booking">Book Now</TabsTrigger>
                              </TabsList>
                              
                              <TabsContent value="overview" className="space-y-6">
                                {/* Image Gallery */}
                                <div className="space-y-4">
                                  <div className="aspect-[16/9] relative overflow-hidden rounded-lg">
                                    <img
                                      src={selectedPackage.images[selectedImageIndex]}
                                      alt={selectedPackage.title}
                                      className="w-full h-full object-cover"
                                    />
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                                      onClick={() => setSelectedImageIndex(prev => 
                                        prev === 0 ? selectedPackage.images.length - 1 : prev - 1
                                      )}
                                    >
                                      <ChevronLeft className="w-4 h-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                                      onClick={() => setSelectedImageIndex(prev => 
                                        prev === selectedPackage.images.length - 1 ? 0 : prev + 1
                                      )}
                                    >
                                      <ChevronRight className="w-4 h-4" />
                                    </Button>
                                  </div>
                                  
                                  <div className="flex gap-2 overflow-x-auto">
                                    {selectedPackage.images.map((image, i) => (
                                      <button
                                        key={i}
                                        onClick={() => setSelectedImageIndex(i)}
                                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                                          i === selectedImageIndex ? "border-primary" : "border-transparent"
                                        }`}
                                      >
                                        <img
                                          src={image}
                                          alt={`${selectedPackage.title} ${i + 1}`}
                                          className="w-full h-full object-cover"
                                        />
                                      </button>
                                    ))}
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                  <div className="md:col-span-2">
                                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                                    <p className="text-muted-foreground mb-4">
                                      {selectedPackage.description}
                                    </p>
                                    
                                    <h3 className="text-lg font-semibold mb-2">Highlights</h3>
                                    <div className="flex flex-wrap gap-2">
                                      {selectedPackage.highlights.map((highlight, i) => (
                                        <Badge key={i} variant="secondary">
                                          {highlight}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-4">
                                    <Card>
                                      <CardContent className="p-4">
                                        <div className="text-center">
                                          <div className="text-3xl font-bold text-primary mb-1">
                                            ${selectedPackage.price}
                                          </div>
                                          <div className="text-sm text-muted-foreground mb-4">
                                            per person
                                          </div>
                                          
                                          <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                              <span>Duration:</span>
                                              <span>{selectedPackage.duration} days</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span>Region:</span>
                                              <span>{selectedPackage.region}</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span>Rating:</span>
                                              <span>{selectedPackage.rating}/5</span>
                                            </div>
                                          </div>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </div>
                                </div>
                              </TabsContent>
                              
                              <TabsContent value="itinerary" className="space-y-4">
                                <h3 className="text-lg font-semibold">Day-by-Day Itinerary</h3>
                                <div className="space-y-4">
                                  {selectedPackage.itinerary.map((day, i) => (
                                    <Card key={i}>
                                      <CardContent className="p-4">
                                        <div className="flex gap-4">
                                          <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                                            {day.day}
                                          </div>
                                          <div className="flex-1">
                                            <h4 className="font-semibold text-foreground">
                                              {day.title}
                                            </h4>
                                            <p className="text-muted-foreground text-sm mt-1">
                                              {day.description}
                                            </p>
                                          </div>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  ))}
                                </div>
                              </TabsContent>
                              
                              <TabsContent value="details" className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div>
                                    <h3 className="text-lg font-semibold mb-4">What's Included</h3>
                                    <ul className="space-y-2">
                                      {selectedPackage.inclusions.map((item, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm">
                                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                                          {item}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  
                                  <div>
                                    <h3 className="text-lg font-semibold mb-4">What's Not Included</h3>
                                    <ul className="space-y-2">
                                      {selectedPackage.exclusions.map((item, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm">
                                          <div className="w-2 h-2 bg-red-500 rounded-full" />
                                          {item}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </TabsContent>
                              
                              <TabsContent value="booking" className="space-y-6">
                                {showBookingConfirmation ? (
                                  <div className="text-center py-8">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                      <Package className="w-8 h-8 text-green-600" />
                                    </div>
                                    <h3 className="text-2xl font-semibold text-foreground mb-2">
                                      Booking Confirmed!
                                    </h3>
                                    <p className="text-muted-foreground mb-4">
                                      Your travel package has been successfully booked.
                                    </p>
                                    <div className="bg-muted p-4 rounded-lg mb-6">
                                      <p className="text-sm text-muted-foreground mb-1">
                                        Booking Reference
                                      </p>
                                      <p className="text-lg font-mono font-semibold">
                                        {bookingReference}
                                      </p>
                                    </div>
                                    <div className="space-y-2 text-sm text-muted-foreground mb-6">
                                      <p>Package: {selectedPackage.title}</p>
                                      <p>Travel Date: {bookingDate ? format(bookingDate, "PPP") : "N/A"}</p>
                                      <p>Travelers: {travelers}</p>
                                      <p>Total: ${selectedPackage.price * travelers}</p>
                                    </div>
                                    <Button onClick={resetBookingForm}>
                                      Book Another Package
                                    </Button>
                                  </div>
                                ) : (
                                  <div className="space-y-6">
                                    <h3 className="text-lg font-semibold">Book Your Trip</h3>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                      <div className="space-y-4">
                                        <div>
                                          <Label htmlFor="travel-date">Travel Date</Label>
                                          <Popover>
                                            <PopoverTrigger asChild>
                                              <Button
                                                variant="outline"
                                                className="w-full justify-start text-left font-normal mt-2"
                                              >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {bookingDate ? format(bookingDate, "PPP") : "Select date"}
                                              </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                              <Calendar
                                                mode="single"
                                                selected={bookingDate}
                                                onSelect={setBookingDate}
                                                disabled={(date) => date < new Date()}
                                                initialFocus
                                              />
                                            </PopoverContent>
                                          </Popover>
                                        </div>
                                        
                                        <div>
                                          <Label htmlFor="travelers">Number of Travelers</Label>
                                          <Select value={travelers.toString()} onValueChange={(value) => setTravelers(parseInt(value))}>
                                            <SelectTrigger className="mt-2">
                                              <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                              {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                                                <SelectItem key={num} value={num.toString()}>
                                                  {num} {num === 1 ? "person" : "people"}
                                                </SelectItem>
                                              ))}
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        
                                        <div>
                                          <Label htmlFor="special-requests">Special Requests</Label>
                                          <Textarea
                                            id="special-requests"
                                            placeholder="Any special requirements or requests..."
                                            className="mt-2"
                                          />
                                        </div>
                                      </div>
                                      
                                      <div>
                                        <Card>
                                          <CardHeader>
                                            <h4 className="font-semibold">Booking Summary</h4>
                                          </CardHeader>
                                          <CardContent className="space-y-4">
                                            <div className="flex justify-between">
                                              <span>Package:</span>
                                              <span className="text-right text-sm">
                                                {selectedPackage.title}
                                              </span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span>Price per person:</span>
                                              <span>${selectedPackage.price}</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span>Travelers:</span>
                                              <span>{travelers}</span>
                                            </div>
                                            <div className="border-t pt-4">
                                              <div className="flex justify-between font-semibold text-lg">
                                                <span>Total:</span>
                                                <span>${selectedPackage.price * travelers}</span>
                                              </div>
                                            </div>
                                            
                                            <Button 
                                              className="w-full" 
                                              onClick={handleBooking}
                                              disabled={!bookingDate || bookingLoading}
                                            >
                                              {bookingLoading ? (
                                                <>
                                                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                                                  Processing...
                                                </>
                                              ) : (
                                                <>
                                                  <Plane className="w-4 h-4 mr-2" />
                                                  Confirm Booking
                                                </>
                                              )}
                                            </Button>
                                          </CardContent>
                                        </Card>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </TabsContent>
                            </Tabs>
                          </>
                        )}
                      </DialogContent>
                    </Dialog>
                    
                    <Button className="flex-1">
                      <Package className="w-4 h-4 mr-2" />
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        {/* Load More Button */}
        {!loading && filteredPackages.length > 0 && filteredPackages.length < packages.length && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" onClick={() => setLoading(true)}>
              Load More Packages
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}