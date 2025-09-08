import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MapPin, 
  Users, 
  Award, 
  Shield, 
  Heart, 
  Target, 
  Eye, 
  Star, 
  Quote,
  CheckCircle,
  Calendar,
  Globe,
  Phone,
  Mail
} from 'lucide-react';

export default function AboutPage() {
  const milestones = [
    { year: '2015', title: 'Foundation', description: 'Ceyora Holidays was founded with a vision to showcase the beauty of Sri Lanka' },
    { year: '2017', title: 'Expansion', description: 'Launched comprehensive tour packages covering all nine provinces' },
    { year: '2019', title: 'Recognition', description: 'Received "Best Local Tour Operator" award from Sri Lanka Tourism Board' },
    { year: '2021', title: 'Digital Transformation', description: 'Introduced online booking system and virtual tour experiences' },
    { year: '2023', title: 'Sustainability Focus', description: 'Launched eco-friendly tour initiatives and community partnerships' },
    { year: '2024', title: 'Excellence Continues', description: 'Serving 5000+ happy travelers with 98% satisfaction rate' }
  ];

  const team = [
    {
      name: 'Rajesh Perera',
      position: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      description: '15+ years in Sri Lankan tourism industry'
    },
    {
      name: 'Priyanka Silva',
      position: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
      description: 'Expert in wildlife and cultural tours'
    },
    {
      name: 'Chaminda Fernando',
      position: 'Lead Tour Guide',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      description: 'Licensed guide with 12+ years experience'
    },
    {
      name: 'Amara Jayasinghe',
      position: 'Customer Relations Manager',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      description: 'Ensuring exceptional customer experiences'
    }
  ];

  const features = [
    {
      icon: MapPin,
      title: 'Local Expertise',
      description: 'Born and raised in Sri Lanka, we know every hidden gem and authentic experience the island offers.'
    },
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Fully licensed and insured with 24/7 support. Your safety and comfort are our top priorities.'
    },
    {
      icon: Users,
      title: 'Small Group Tours',
      description: 'Intimate group sizes (max 12 people) ensure personalized attention and authentic connections.'
    },
    {
      icon: Award,
      title: 'Award Winning',
      description: 'Recognized by Sri Lanka Tourism Board and consistently rated 5-stars by international travelers.'
    },
    {
      icon: Heart,
      title: 'Sustainable Tourism',
      description: 'Supporting local communities and conservation efforts while creating unforgettable memories.'
    },
    {
      icon: Globe,
      title: 'Multilingual Guides',
      description: 'Our certified guides speak English, German, French, and local languages fluently.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Mitchell',
      country: 'Australia',
      rating: 5,
      text: 'Ceyora Holidays made our Sri Lankan adventure absolutely magical. Every detail was perfectly planned, and our guide Chaminda was incredible!',
      image: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Hans Mueller',
      country: 'Germany',
      rating: 5,
      text: 'The most authentic travel experience we have ever had. The team truly cares about showing the real Sri Lanka, not just tourist spots.',
      image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Emma Thompson',
      country: 'United Kingdom',
      rating: 5,
      text: 'From ancient temples to pristine beaches, every moment was breathtaking. The small group size made it feel like a private tour.',
      image: 'https://images.unsplash.com/photo-1557862921-37829c790f19?w=100&h=100&fit=crop&crop=face'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop"
            alt="Beautiful Sri Lankan landscape with tea plantations and mountains"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl text-white">
            <Badge className="mb-4 bg-primary text-primary-foreground">Since 2015</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Your Gateway to 
              <span className="text-accent"> Authentic Sri Lanka</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              We are passionate local experts crafting unforgettable journeys through the Pearl of the Indian Ocean, 
              sharing our island's hidden treasures with travelers from around the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Phone className="mr-2 h-5 w-5" />
                Contact Our Team
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20">
                <Globe className="mr-2 h-5 w-5" />
                View Our Services
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 space-y-24">
        {/* Company Story */}
        <section>
          <div className="text-center mb-16">
            <Badge className="mb-4">Our Journey</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">The Ceyora Holidays Story</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Founded by travel enthusiasts who believe in the transformative power of authentic experiences, 
              we have been sharing Sri Lanka's wonders with the world for nearly a decade.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-semibold mb-6">From Passion to Purpose</h3>
              <p className="text-muted-foreground mb-6">
                What started as a simple desire to share our homeland's beauty has grown into Sri Lanka's 
                most trusted boutique tour operator. We believe that travel should be more than sightseeing—it 
                should be about connection, understanding, and creating memories that last a lifetime.
              </p>
              <p className="text-muted-foreground mb-6">
                Our small, dedicated team combines decades of local expertise with a genuine passion for 
                hospitality. We don't just show you Sri Lanka; we invite you to experience it as we do—with 
                wonder, respect, and deep appreciation for its natural beauty and rich cultural heritage.
              </p>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">5000+</div>
                  <div className="text-sm text-muted-foreground">Happy Travelers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">98%</div>
                  <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">9</div>
                  <div className="text-sm text-muted-foreground">Years Excellence</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1582550945154-019d7831ac8c?w=600&h=400&fit=crop"
                alt="Traditional Sri Lankan cultural performance"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary/20 hidden md:block" />
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:pl-8'}`}>
                    <Card className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="h-4 w-4 text-primary" />
                          <Badge variant="outline">{milestone.year}</Badge>
                        </div>
                        <CardTitle className="text-lg">{milestone.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="hidden md:flex w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg z-10 absolute left-1/2 transform -translate-x-1/2" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section>
          <div className="text-center mb-16">
            <Badge className="mb-4">Our Purpose</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Mission & Vision</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl mb-4">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To create authentic, sustainable, and transformative travel experiences that showcase 
                  Sri Lanka's natural beauty, rich culture, and warm hospitality while supporting local 
                  communities and conservation efforts.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                  <Eye className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-2xl mb-4">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To be Sri Lanka's leading sustainable tourism company, recognized globally for our 
                  commitment to authentic experiences, environmental responsibility, and positive impact 
                  on local communities.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Team Section */}
        <section>
          <div className="text-center mb-16">
            <Badge className="mb-4">Meet Our Team</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">The People Behind Your Journey</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our passionate team of local experts, certified guides, and travel enthusiasts are dedicated 
              to making your Sri Lankan adventure unforgettable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <Card key={member.name} className="text-center hover:shadow-lg transition-shadow group">
                <CardHeader className="pb-4">
                  <div className="relative mx-auto mb-4">
                    <Avatar className="w-24 h-24 mx-auto border-4 border-primary/10 group-hover:border-primary/30 transition-colors">
                      <AvatarImage src={member.image} alt={member.name} />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <Badge variant="secondary" className="w-fit mx-auto">{member.position}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section>
          <div className="text-center mb-16">
            <Badge className="mb-4">Why Choose Us</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What Makes Us Different</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We're not just another tour company. We're your local friends who happen to be travel experts, 
              committed to showing you the Sri Lanka that guidebooks can't capture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="p-6 hover:shadow-lg transition-shadow group">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg mb-2">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section>
          <div className="text-center mb-16">
            <Badge className="mb-4">What Our Guests Say</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Real Stories, Real Experiences</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it. Here's what travelers from around the world say about their 
              Ceyora Holidays experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="p-6 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <Quote className="h-6 w-6 text-primary mb-2" />
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={testimonial.image} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-sm">{testimonial.name}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.country}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section>
          <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-center p-12">
            <CardContent className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Discover Sri Lanka?</h2>
              <p className="text-xl mb-8 text-primary-foreground/90">
                Let us craft your perfect Sri Lankan adventure. From ancient temples to pristine beaches, 
                wildlife safaris to cultural immersions—your journey of a lifetime awaits.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Us Now
                </Button>
                <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                  <Mail className="mr-2 h-5 w-5" />
                  Get Custom Quote
                </Button>
              </div>
              <div className="flex items-center justify-center gap-6 mt-8 pt-8 border-t border-primary-foreground/20">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>24/7 Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Best Price Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Instant Confirmation</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}