"use client";

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { toast } from 'sonner';
import { 
  MapPin, 
  Calendar, 
  Users, 
  Star, 
  Heart, 
  Filter, 
  Search, 
  Clock, 
  Mountain, 
  Waves, 
  TreePine, 
  Camera, 
  Compass, 
  Phone, 
  Mail, 
  Check,
  X,
  Plus,
  Minus,
  Eye,
  ShoppingCart,
  ArrowRight,
  Globe,
  Plane,
  Car,
  Hotel,
  UtensilsCrossed,
  Shield
} from 'lucide-react';

interface Package {
  id: string;
  title: string;
  duration: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  rating: number;
  reviewCount: number;
  highlights: string[];
  featured: boolean;
  groupSize: string;
  includes: string[];
  excludes: string[];
  itinerary: { day: number; title: string; description: string; }[];
  whatToBring: string[];
  bookingTerms: string[];
}

interface Filter {
  duration: string;
  category: string;
  priceRange: string;
  groupSize: string;
  searchQuery: string;
}

const packageCategories = [
  { id: 'cultural', name: 'Cultural Tours', icon: Globe, color: 'bg-amber-100 text-amber-800' },
  { id: 'adventure', name: 'Adventure Tours', icon: Mountain, color: 'bg-green-100 text-green-800' },
  { id: 'beach', name: 'Beach Holidays', icon: Waves, color: 'bg-blue-100 text-blue-800' },
  { id: 'wildlife', name: 'Wildlife Safaris', icon: TreePine, color: 'bg-emerald-100 text-emerald-800' },
  { id: 'hill-country', name: 'Hill Country', icon: Mountain, color: 'bg-purple-100 text-purple-800' },
  { id: 'photography', name: 'Photography Tours', icon: Camera, color: 'bg-pink-100 text-pink-800' }
];

const packages: Package[] = [
  {
    id: '1',
    title: 'Ancient Kingdoms Explorer',
    duration: '7 Days / 6 Nights',
    description: 'Journey through Sri Lanka\'s ancient capitals and UNESCO World Heritage sites.',
    price: 1299,
    originalPrice: 1499,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop',
    category: 'cultural',
    difficulty: 'Easy',
    rating: 4.8,
    reviewCount: 127,
    highlights: [
      'Visit Sigiriya Rock Fortress',
      'Explore Polonnaruwa ruins',
      'Temple of the Tooth in Kandy',
      'Traditional dance performances',
      'Local craft workshops'
    ],
    featured: true,
    groupSize: '8-12 people',
    includes: ['Accommodation', 'All meals', 'Transportation', 'Guide', 'Entrance fees'],
    excludes: ['International flights', 'Personal expenses', 'Tips', 'Travel insurance'],
    itinerary: [
      { day: 1, title: 'Arrival in Colombo', description: 'Airport pickup and transfer to hotel. Welcome dinner.' },
      { day: 2, title: 'Colombo to Sigiriya', description: 'Travel to Sigiriya. Climb the ancient rock fortress.' },
      { day: 3, title: 'Polonnaruwa Day Trip', description: 'Explore the medieval capital ruins.' }
    ],
    whatToBring: ['Comfortable walking shoes', 'Hat and sunscreen', 'Camera', 'Light clothing'],
    bookingTerms: ['50% deposit required', 'Free cancellation 14 days before', 'Full payment 7 days before']
  },
  {
    id: '2',
    title: 'Tropical Beach Paradise',
    duration: '5 Days / 4 Nights',
    description: 'Relax on pristine beaches and enjoy water sports in southern Sri Lanka.',
    price: 899,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop',
    category: 'beach',
    difficulty: 'Easy',
    rating: 4.6,
    reviewCount: 89,
    highlights: [
      'Unawatuna Beach relaxation',
      'Whale watching in Mirissa',
      'Stilt fishermen photography',
      'Galle Fort exploration',
      'Ayurvedic spa treatments'
    ],
    featured: true,
    groupSize: '4-8 people',
    includes: ['Beach resort accommodation', 'Breakfast & dinner', 'Water sports', 'Transfers'],
    excludes: ['Lunch', 'Alcoholic beverages', 'Spa treatments', 'Personal expenses'],
    itinerary: [
      { day: 1, title: 'Arrival in Colombo', description: 'Transfer to beach resort in Unawatuna.' },
      { day: 2, title: 'Beach Day', description: 'Snorkeling, surfing lessons, beach relaxation.' },
      { day: 3, title: 'Whale Watching', description: 'Early morning whale watching cruise from Mirissa.' }
    ],
    whatToBring: ['Swimwear', 'Sunscreen SPF 50+', 'Beach towel', 'Waterproof camera'],
    bookingTerms: ['30% deposit required', 'Cancellation 7 days before', 'Weather dependent activities']
  },
  {
    id: '3',
    title: 'Himalayan Tea Country',
    duration: '6 Days / 5 Nights',
    description: 'Discover misty mountains, tea plantations, and colonial hill stations.',
    price: 1099,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=500&h=300&fit=crop',
    category: 'hill-country',
    difficulty: 'Moderate',
    rating: 4.9,
    reviewCount: 156,
    highlights: [
      'Scenic train journey to Ella',
      'Tea factory visits in Nuwara Eliya',
      'Nine Arch Bridge photography',
      'Little Adam\'s Peak hike',
      'Traditional tea tasting sessions'
    ],
    featured: true,
    groupSize: '6-10 people',
    includes: ['Boutique hotels', 'All meals', 'Train tickets', 'Tea plantation tours', 'Hiking guide'],
    excludes: ['Personal expenses', 'Additional beverages', 'Optional activities', 'Laundry'],
    itinerary: [
      { day: 1, title: 'Colombo to Kandy', description: 'Journey to the cultural capital of Sri Lanka.' },
      { day: 2, title: 'Kandy to Nuwara Eliya', description: 'Travel through tea country to hill station.' },
      { day: 3, title: 'Tea Plantation Tour', description: 'Visit working tea estate and factory.' }
    ],
    whatToBring: ['Warm clothing', 'Rain jacket', 'Hiking boots', 'Camera with extra batteries'],
    bookingTerms: ['40% deposit required', 'Weather dependent', 'Physical fitness required for hikes']
  },
  {
    id: '4',
    title: 'Wild Safari Adventure',
    duration: '4 Days / 3 Nights',
    description: 'Encounter elephants, leopards, and exotic birds in national parks.',
    price: 749,
    image: 'https://images.unsplash.com/photo-1549366021-9f761d040a94?w=500&h=300&fit=crop',
    category: 'wildlife',
    difficulty: 'Easy',
    rating: 4.7,
    reviewCount: 203,
    highlights: [
      'Yala National Park safari',
      'Elephant orphanage visit',
      'Bird watching in Bundala',
      'Night safari experience',
      'Wildlife photography workshop'
    ],
    featured: true,
    groupSize: '4-6 people',
    includes: ['Safari lodge accommodation', 'All meals', 'Game drives', 'Park entrance fees', 'Binoculars'],
    excludes: ['Alcoholic drinks', 'Personal expenses', 'Tips for guides', 'Camera equipment'],
    itinerary: [
      { day: 1, title: 'Arrival at Safari Lodge', description: 'Check-in and evening game drive.' },
      { day: 2, title: 'Full Day Safari', description: 'Morning and afternoon game drives in Yala.' },
      { day: 3, title: 'Elephant Orphanage', description: 'Visit elephant sanctuary and rehabilitation center.' }
    ],
    whatToBring: ['Khaki/neutral clothing', 'Binoculars', 'Camera with telephoto lens', 'Insect repellent'],
    bookingTerms: ['Full payment required', 'Animal sightings not guaranteed', 'Early morning starts']
  },
  {
    id: '5',
    title: 'Adventure Seeker\'s Dream',
    duration: '8 Days / 7 Nights',
    description: 'Thrilling activities from white water rafting to rock climbing.',
    price: 1599,
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=500&h=300&fit=crop',
    category: 'adventure',
    difficulty: 'Challenging',
    rating: 4.5,
    reviewCount: 74,
    highlights: [
      'White water rafting in Kitulgala',
      'Rock climbing at Ella Rock',
      'Zip-lining through rainforest',
      'Canyoning and abseiling',
      'Mountain biking trails'
    ],
    featured: true,
    groupSize: '6-8 people',
    includes: ['Adventure accommodation', 'All equipment', 'Professional guides', 'Safety gear', 'Meals'],
    excludes: ['Travel insurance', 'Personal gear', 'Medical expenses', 'Additional activities'],
    itinerary: [
      { day: 1, title: 'Adventure Briefing', description: 'Safety orientation and equipment fitting.' },
      { day: 2, title: 'White Water Rafting', description: 'Grade 3-4 rapids on Kelani River.' },
      { day: 3, title: 'Rock Climbing', description: 'Climbing instruction and guided climbs.' }
    ],
    whatToBring: ['Adventure clothing', 'Personal first aid kit', 'Waterproof bags', 'Energy snacks'],
    bookingTerms: ['Medical certificate required', 'Age restrictions apply', 'Weather dependent']
  },
  {
    id: '6',
    title: 'Photography Masterclass',
    duration: '10 Days / 9 Nights',
    description: 'Capture Sri Lanka\'s beauty with professional photography guidance.',
    price: 1899,
    image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=500&h=300&fit=crop',
    category: 'photography',
    difficulty: 'Moderate',
    rating: 4.8,
    reviewCount: 45,
    highlights: [
      'Golden hour landscape sessions',
      'Street photography in markets',
      'Wildlife photography techniques',
      'Cultural portrait sessions',
      'Post-processing workshops'
    ],
    featured: false,
    groupSize: '4-6 people',
    includes: ['Photography guide', 'Model releases', 'Editing software', 'Print portfolio', 'All accommodation'],
    excludes: ['Camera equipment', 'Memory cards', 'Printing costs', 'Personal expenses'],
    itinerary: [
      { day: 1, title: 'Photography Basics', description: 'Camera settings and composition theory.' },
      { day: 2, title: 'Landscape Photography', description: 'Sunrise shoot at Sigiriya Rock.' },
      { day: 3, title: 'Cultural Photography', description: 'Temple ceremonies and local life.' }
    ],
    whatToBring: ['DSLR/Mirrorless camera', 'Tripod', 'Extra batteries', 'Lens cleaning kit'],
    bookingTerms: ['Photography equipment required', 'Model releases included', 'Copyright retained by photographer']
  }
];

const testimonials = [
  {
    id: '1',
    name: 'Sarah Johnson',
    location: 'London, UK',
    rating: 5,
    comment: 'The Ancient Kingdoms Explorer tour was absolutely incredible! Our guide was knowledgeable and the sites were breathtaking.',
    packageId: '1',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '2',
    name: 'Michael Chen',
    location: 'Sydney, Australia',
    rating: 5,
    comment: 'Perfect beach holiday! Great organization, beautiful locations, and excellent value for money.',
    packageId: '2',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: '3',
    name: 'Emma Schmidt',
    location: 'Berlin, Germany',
    rating: 5,
    comment: 'The tea country tour exceeded all expectations. The scenery was magical and the train journey unforgettable.',
    packageId: '3',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
  }
];

export default function PackagesPage() {
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);
  const [filters, setFilters] = useState<Filter>({
    duration: 'all',
    category: 'all',
    priceRange: 'all',
    groupSize: 'all',
    searchQuery: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [customPackageForm, setCustomPackageForm] = useState({
    destinations: [] as string[],
    duration: '',
    groupSize: '',
    budget: '',
    interests: [] as string[],
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const filteredPackages = useMemo(() => {
    return packages.filter(pkg => {
      const matchesSearch = pkg.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                          pkg.description.toLowerCase().includes(filters.searchQuery.toLowerCase());
      
      const matchesDuration = filters.duration === 'all' || 
        (filters.duration === '1-3' && parseInt(pkg.duration) <= 3) ||
        (filters.duration === '4-7' && parseInt(pkg.duration) >= 4 && parseInt(pkg.duration) <= 7) ||
        (filters.duration === '8+' && parseInt(pkg.duration) >= 8);
      
      const matchesCategory = filters.category === 'all' || pkg.category === filters.category;
      
      const matchesPrice = filters.priceRange === 'all' ||
        (filters.priceRange === '0-999' && pkg.price < 1000) ||
        (filters.priceRange === '1000-1499' && pkg.price >= 1000 && pkg.price < 1500) ||
        (filters.priceRange === '1500+' && pkg.price >= 1500);
      
      return matchesSearch && matchesDuration && matchesCategory && matchesPrice;
    });
  }, [filters]);

  const featuredPackages = filteredPackages.filter(pkg => pkg.featured);

  const handleFilterChange = (key: keyof Filter, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const togglePackageSelection = (packageId: string) => {
    setSelectedPackages(prev => 
      prev.includes(packageId) 
        ? prev.filter(id => id !== packageId)
        : [...prev, packageId]
    );
  };

  const handleCustomPackageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Custom package request submitted! We\'ll contact you within 24 hours.');
    setCustomPackageForm({
      destinations: [],
      duration: '',
      groupSize: '',
      budget: '',
      interests: [],
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  const handleDestinationToggle = (destination: string) => {
    setCustomPackageForm(prev => ({
      ...prev,
      destinations: prev.destinations.includes(destination)
        ? prev.destinations.filter(d => d !== destination)
        : [...prev.destinations, destination]
    }));
  };

  const handleInterestToggle = (interest: string) => {
    setCustomPackageForm(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/30" />
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-6">
            Discover Sri Lanka's
            <span className="text-primary block">Amazing Packages</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            From ancient kingdoms to pristine beaches, from misty mountains to wildlife adventures. 
            Choose from our carefully crafted tour packages or create your own custom journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8">
              <Search className="mr-2 h-5 w-5" />
              Browse Packages
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8">
              <Plus className="mr-2 h-5 w-5" />
              Create Custom Package
            </Button>
          </div>
        </div>
      </section>

      {/* Package Categories */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
              Choose Your Adventure
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore Sri Lanka through different themes and experiences
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {packageCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Card 
                  key={category.id}
                  className="cursor-pointer hover:shadow-lg transition-all duration-300 group"
                  onClick={() => handleFilterChange('category', category.id)}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${category.color} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="font-semibold text-sm text-foreground">
                      {category.name}
                    </h3>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Search and Filter Bar */}
      <section className="py-8 px-4 bg-card/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search packages..."
                value={filters.searchQuery}
                onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2">
              <Select value={filters.duration} onValueChange={(value) => handleFilterChange('duration', value)}>
                <SelectTrigger className="w-[140px]">
                  <Clock className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Durations</SelectItem>
                  <SelectItem value="1-3">1-3 Days</SelectItem>
                  <SelectItem value="4-7">4-7 Days</SelectItem>
                  <SelectItem value="8+">8+ Days</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.priceRange} onValueChange={(value) => handleFilterChange('priceRange', value)}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="0-999">Under $1,000</SelectItem>
                  <SelectItem value="1000-1499">$1,000 - $1,499</SelectItem>
                  <SelectItem value="1500+">$1,500+</SelectItem>
                </SelectContent>
              </Select>

              <Sheet open={showFilters} onOpenChange={setShowFilters}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    More Filters
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filter Packages</SheetTitle>
                    <SheetDescription>
                      Refine your search to find the perfect package
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-6 space-y-6">
                    <div>
                      <Label className="text-base font-medium mb-3 block">Category</Label>
                      <div className="space-y-2">
                        {[
                          { value: 'all', label: 'All Categories' },
                          ...packageCategories.map(cat => ({ value: cat.id, label: cat.name }))
                        ].map(option => (
                          <div key={option.value} className="flex items-center space-x-2">
                            <Checkbox
                              id={option.value}
                              checked={filters.category === option.value}
                              onCheckedChange={() => handleFilterChange('category', option.value)}
                            />
                            <Label htmlFor={option.value}>{option.label}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Packages Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-heading font-bold text-foreground mb-2">
                Featured Packages
              </h2>
              <p className="text-muted-foreground">
                Showing {filteredPackages.length} of {packages.length} packages
              </p>
            </div>
            
            {selectedPackages.length > 1 && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Eye className="mr-2 h-4 w-4" />
                    Compare ({selectedPackages.length})
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Package Comparison</DialogTitle>
                    <DialogDescription>
                      Compare selected packages side by side
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {selectedPackages.map(packageId => {
                      const pkg = packages.find(p => p.id === packageId);
                      if (!pkg) return null;
                      
                      return (
                        <Card key={pkg.id}>
                          <CardHeader>
                            <img 
                              src={pkg.image} 
                              alt={pkg.title}
                              className="w-full h-32 object-cover rounded-lg mb-4"
                            />
                            <CardTitle className="text-lg">{pkg.title}</CardTitle>
                            <CardDescription>{pkg.duration}</CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="text-2xl font-bold text-primary">
                              ${pkg.price}
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">Highlights:</h4>
                              <ul className="text-sm space-y-1">
                                {pkg.highlights.slice(0, 3).map((highlight, idx) => (
                                  <li key={idx} className="flex items-center">
                                    <Check className="h-3 w-3 text-green-500 mr-2" />
                                    {highlight}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">Includes:</h4>
                              <ul className="text-sm space-y-1">
                                {pkg.includes.slice(0, 3).map((item, idx) => (
                                  <li key={idx} className="flex items-center">
                                    <Check className="h-3 w-3 text-green-500 mr-2" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => (
              <Card key={pkg.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <img 
                    src={pkg.image} 
                    alt={pkg.title}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {pkg.featured && (
                      <Badge className="bg-accent text-accent-foreground">
                        Featured
                      </Badge>
                    )}
                    <Badge variant="secondary" className={packageCategories.find(c => c.id === pkg.category)?.color}>
                      {packageCategories.find(c => c.id === pkg.category)?.name}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="bg-white/90 hover:bg-white"
                      onClick={() => togglePackageSelection(pkg.id)}
                    >
                      {selectedPackages.includes(pkg.id) ? (
                        <Minus className="h-4 w-4" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <Badge variant={pkg.difficulty === 'Easy' ? 'default' : pkg.difficulty === 'Moderate' ? 'secondary' : 'destructive'}>
                      {pkg.difficulty}
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl mb-2">{pkg.title}</CardTitle>
                      <CardDescription className="flex items-center text-sm">
                        <Calendar className="mr-1 h-4 w-4" />
                        {pkg.duration}
                        <Users className="ml-3 mr-1 h-4 w-4" />
                        {pkg.groupSize}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center mb-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm font-medium">{pkg.rating}</span>
                        <span className="ml-1 text-xs text-muted-foreground">({pkg.reviewCount})</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{pkg.description}</p>
                  
                  <div>
                    <h4 className="font-medium mb-2">Highlights:</h4>
                    <ul className="space-y-1">
                      {pkg.highlights.slice(0, 3).map((highlight, idx) => (
                        <li key={idx} className="flex items-center text-sm">
                          <Check className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                          {highlight}
                        </li>
                      ))}
                      {pkg.highlights.length > 3 && (
                        <li className="text-sm text-muted-foreground">
                          +{pkg.highlights.length - 3} more highlights
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <div className="flex items-center gap-2">
                        {pkg.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${pkg.originalPrice}
                          </span>
                        )}
                        <span className="text-2xl font-bold text-primary">
                          ${pkg.price}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">per person</span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex gap-2 pt-0">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-2xl">{pkg.title}</DialogTitle>
                        <DialogDescription>
                          {pkg.duration} • {pkg.groupSize} • {pkg.difficulty} difficulty
                        </DialogDescription>
                      </DialogHeader>
                      
                      <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="grid w-full grid-cols-4">
                          <TabsTrigger value="overview">Overview</TabsTrigger>
                          <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                          <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
                          <TabsTrigger value="terms">Terms</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="overview" className="space-y-6">
                          <img 
                            src={pkg.image} 
                            alt={pkg.title}
                            className="w-full h-64 object-cover rounded-lg"
                          />
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h3 className="font-semibold mb-3">Package Highlights</h3>
                              <ul className="space-y-2">
                                {pkg.highlights.map((highlight, idx) => (
                                  <li key={idx} className="flex items-center">
                                    <Check className="h-4 w-4 text-green-500 mr-2" />
                                    {highlight}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h3 className="font-semibold mb-3">Package Details</h3>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span>Duration:</span>
                                  <span>{pkg.duration}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Group Size:</span>
                                  <span>{pkg.groupSize}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Difficulty:</span>
                                  <Badge variant="outline" size="sm">{pkg.difficulty}</Badge>
                                </div>
                                <div className="flex justify-between">
                                  <span>Rating:</span>
                                  <div className="flex items-center">
                                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                    <span className="ml-1">{pkg.rating} ({pkg.reviewCount} reviews)</span>
                                  </div>
                                </div>
                                <Separator />
                                <div className="flex justify-between items-center pt-2">
                                  <span className="font-semibold">Price:</span>
                                  <div className="text-right">
                                    {pkg.originalPrice && (
                                      <div className="text-sm text-muted-foreground line-through">
                                        ${pkg.originalPrice}
                                      </div>
                                    )}
                                    <div className="text-2xl font-bold text-primary">
                                      ${pkg.price}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="itinerary">
                          <div className="space-y-4">
                            <h3 className="font-semibold text-lg">Day by Day Itinerary</h3>
                            {pkg.itinerary.map((day, idx) => (
                              <Card key={idx}>
                                <CardHeader className="pb-3">
                                  <CardTitle className="text-base flex items-center">
                                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm mr-3">
                                      {day.day}
                                    </div>
                                    {day.title}
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <p className="text-muted-foreground">{day.description}</p>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="inclusions">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h3 className="font-semibold text-lg mb-4 text-green-600">What's Included</h3>
                              <ul className="space-y-2">
                                {pkg.includes.map((item, idx) => (
                                  <li key={idx} className="flex items-center">
                                    <Check className="h-4 w-4 text-green-500 mr-3" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg mb-4 text-red-600">What's Not Included</h3>
                              <ul className="space-y-2">
                                {pkg.excludes.map((item, idx) => (
                                  <li key={idx} className="flex items-center">
                                    <X className="h-4 w-4 text-red-500 mr-3" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <Separator className="my-6" />
                          <div>
                            <h3 className="font-semibold text-lg mb-4">What to Bring</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {pkg.whatToBring.map((item, idx) => (
                                <li key={idx} className="flex items-center">
                                  <ArrowRight className="h-4 w-4 text-muted-foreground mr-2" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="terms">
                          <div className="space-y-4">
                            <h3 className="font-semibold text-lg">Booking Terms & Conditions</h3>
                            <ul className="space-y-3">
                              {pkg.bookingTerms.map((term, idx) => (
                                <li key={idx} className="flex items-start">
                                  <Shield className="h-5 w-5 text-primary mr-3 mt-0.5" />
                                  {term}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </TabsContent>
                      </Tabs>
                      
                      <div className="flex gap-4 pt-6 border-t">
                        <Button className="flex-1">
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Book Now - ${pkg.price}
                        </Button>
                        <Button variant="outline">
                          <Heart className="mr-2 h-4 w-4" />
                          Save
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Button size="sm" className="flex-1">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Book Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
              What Our Travelers Say
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Real experiences from our satisfied customers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.comment}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Package Builder */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
              Create Your Custom Package
            </h2>
            <p className="text-muted-foreground text-lg">
              Can't find the perfect package? Let us create one just for you.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Custom Package Request</CardTitle>
              <CardDescription>
                Tell us about your dream Sri Lankan adventure and we'll craft the perfect itinerary
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCustomPackageSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-base font-medium mb-3 block">
                      Preferred Destinations
                    </Label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        'Colombo', 'Kandy', 'Sigiriya', 'Polonnaruwa', 'Anuradhapura',
                        'Dambulla', 'Ella', 'Nuwara Eliya', 'Galle', 'Mirissa',
                        'Unawatuna', 'Yala', 'Udawalawe', 'Arugam Bay'
                      ].map(destination => (
                        <div key={destination} className="flex items-center space-x-2">
                          <Checkbox
                            id={destination}
                            checked={customPackageForm.destinations.includes(destination)}
                            onCheckedChange={() => handleDestinationToggle(destination)}
                          />
                          <Label htmlFor={destination} className="text-sm">{destination}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-medium mb-3 block">
                      Special Interests
                    </Label>
                    <div className="space-y-2">
                      {[
                        'Cultural Heritage', 'Wildlife & Nature', 'Adventure Sports',
                        'Beach & Relaxation', 'Photography', 'Ayurveda & Wellness',
                        'Food & Culinary', 'Train Journeys'
                      ].map(interest => (
                        <div key={interest} className="flex items-center space-x-2">
                          <Checkbox
                            id={interest}
                            checked={customPackageForm.interests.includes(interest)}
                            onCheckedChange={() => handleInterestToggle(interest)}
                          />
                          <Label htmlFor={interest} className="text-sm">{interest}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Select 
                      value={customPackageForm.duration} 
                      onValueChange={(value) => setCustomPackageForm(prev => ({ ...prev, duration: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3-5">3-5 Days</SelectItem>
                        <SelectItem value="6-8">6-8 Days</SelectItem>
                        <SelectItem value="9-12">9-12 Days</SelectItem>
                        <SelectItem value="13+">13+ Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="groupSize">Group Size</Label>
                    <Select 
                      value={customPackageForm.groupSize} 
                      onValueChange={(value) => setCustomPackageForm(prev => ({ ...prev, groupSize: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select group size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-2">1-2 People</SelectItem>
                        <SelectItem value="3-4">3-4 People</SelectItem>
                        <SelectItem value="5-8">5-8 People</SelectItem>
                        <SelectItem value="9+">9+ People</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="budget">Budget Range (per person)</Label>
                    <Select 
                      value={customPackageForm.budget} 
                      onValueChange={(value) => setCustomPackageForm(prev => ({ ...prev, budget: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                        <SelectItem value="1000-1500">$1,000 - $1,500</SelectItem>
                        <SelectItem value="1500-2500">$1,500 - $2,500</SelectItem>
                        <SelectItem value="2500+">$2,500+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={customPackageForm.name}
                      onChange={(e) => setCustomPackageForm(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={customPackageForm.email}
                      onChange={(e) => setCustomPackageForm(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={customPackageForm.phone}
                      onChange={(e) => setCustomPackageForm(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Additional Requirements</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more about your preferences, special requirements, or any specific requests..."
                    value={customPackageForm.message}
                    onChange={(e) => setCustomPackageForm(prev => ({ ...prev, message: e.target.value }))}
                    rows={4}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  <ArrowRight className="mr-2 h-5 w-5" />
                  Submit Custom Package Request
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Booking Process Overview */}
      <section className="py-16 px-4 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
              How to Book Your Adventure
            </h2>
            <p className="text-muted-foreground text-lg">
              Simple steps to secure your Sri Lankan getaway
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: 'Choose Package',
                description: 'Browse our packages or request a custom one',
                icon: Search
              },
              {
                step: 2,
                title: 'Get Quote',
                description: 'Receive detailed pricing and itinerary',
                icon: Calculator
              },
              {
                step: 3,
                title: 'Secure Booking',
                description: 'Pay deposit to confirm your reservation',
                icon: Shield
              },
              {
                step: 4,
                title: 'Start Adventure',
                description: 'Arrive and begin your amazing journey',
                icon: Plane
              }
            ].map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="text-center">
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    {step.step}. {step.title}
                  </h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-16 px-4 bg-primary/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
            Ready to Start Your Sri Lankan Adventure?
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Our travel experts are standing by to help you plan the perfect trip. 
            Contact us today for personalized assistance.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="text-center p-6">
              <Phone className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Call Us</h3>
              <p className="text-muted-foreground">+94 11 234 5678</p>
            </Card>
            
            <Card className="text-center p-6">
              <Mail className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Email Us</h3>
              <p className="text-muted-foreground">info@ceyoraholidays.com</p>
            </Card>
            
            <Card className="text-center p-6">
              <Compass className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Visit Office</h3>
              <p className="text-muted-foreground">Colombo, Sri Lanka</p>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8">
              <Phone className="mr-2 h-5 w-5" />
              Call Now
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8">
              <Mail className="mr-2 h-5 w-5" />
              Send Inquiry
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}