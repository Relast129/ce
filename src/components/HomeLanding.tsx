"use client";

import { useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Car, 
  Hotel, 
  UtensilsCrossed, 
  Star, 
  Users, 
  Shield, 
  Award, 
  Leaf,
  MapPin,
  Calendar,
  ArrowRight,
  Mail,
  Sparkles,
  Heart,
  Camera,
  Mountain,
  Waves,
  TreePine,
  Sun,
  Clock,
  Check,
  Plane,
  Quote,
  MessageSquareQuote,
  Moon,
  Compass,
  Globe
} from 'lucide-react'

export default function HomeLanding() {
  const heroRef = useRef<HTMLDivElement>(null)
  const journeyRef = useRef<HTMLDivElement>(null)
  const packagesRef = useRef<HTMLDivElement>(null)
  const storiesRef = useRef<HTMLDivElement>(null)
  
  const [selectedJourney, setSelectedJourney] = useState(0)
  
  const isJourneyInView = useInView(journeyRef, { once: true, margin: "-100px" })
  const isPackagesInView = useInView(packagesRef, { once: true, margin: "-100px" })
  const isStoriesInView = useInView(storiesRef, { once: true, margin: "-100px" })
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const heroTextY = useTransform(scrollYProgress, [0, 0.5], ["0%", "30%"])
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 80,
      scale: 0.9,
      rotateX: 15
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1],
        type: "spring",
        stiffness: 100
      }
    }
  }

  const fadeInUpVariant = {
    hidden: { 
      opacity: 0, 
      y: 40
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1]
      }
    }
  }

  const staggerContainerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3
      }
    }
  }

  const floatingVariants = {
    initial: { y: 0, rotate: 0, scale: 1 },
    animate: {
      y: [-3, 3, -3],
      rotate: [0, 5, -5, 0],
      scale: [1, 1.05, 1],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  // Story-driven journey phases
  const journeyPhases = [
    {
      phase: "Arrival",
      icon: Plane,
      title: "Your Sri Lankan Story Begins",
      description: "Land in Colombo where warm smiles and tropical air welcome you. Your local guide shares the first tales of our ancient island.",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/5b4115a6-36aa-41a5-b13a-a309fd72f4fe/generated_images/spectacular-aerial-view-of-sigiriya-lion-3d4731f5-20250902140253.jpg",
      color: "from-blue-500 to-cyan-500"
    },
    {
      phase: "Discovery",
      icon: Compass,
      title: "Uncover Ancient Mysteries",
      description: "Climb Sigiriya at dawn, walk through 2000-year-old ruins, and feel the whispers of kings and legends in every stone.",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/5b4115a6-36aa-41a5-b13a-a309fd72f4fe/generated_images/spectacular-aerial-view-of-sigiriya-lion-3d4731f5-20250902140253.jpg",
      color: "from-orange-500 to-amber-500"
    },
    {
      phase: "Adventure",
      icon: Mountain,
      title: "Into the Wild Heart",
      description: "Safari through Yala where elephants roam free, trek misty mountains, and surf world-class waves under golden sunsets.",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/5b4115a6-36aa-41a5-b13a-a309fd72f4fe/generated_images/majestic-sri-lankan-elephant-in-yala-nat-14e1a6db-20250902140325.jpg",
      color: "from-green-500 to-emerald-500"
    },
    {
      phase: "Connection",
      icon: Heart,
      title: "Feel the Island's Soul",
      description: "Share meals with local families, learn traditional crafts, and discover why Sri Lankans say our smiles are the warmest in the world.",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/5b4115a6-36aa-41a5-b13a-a309fd72f4fe/generated_images/beautiful-sri-lankan-tea-plantation-terr-2a0af708-20250902140304.jpg",
      color: "from-purple-500 to-pink-500"
    }
  ]

  // Enhanced story-driven packages
  const storyPackages = [
    {
      id: 1,
      story: "The Legend of the Lion Rock",
      title: "Ancient Kingdoms & Mystical Fortresses",
      duration: "5 Days • 4 Nights",
      price: "Rs. 135,000",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/5b4115a6-36aa-41a5-b13a-a309fd72f4fe/generated_images/spectacular-aerial-view-of-sigiriya-lion-3d4731f5-20250902140253.jpg",
      narrative: "Follow the footsteps of ancient kings. Climb the legendary Sigiriya at sunrise, where King Kasyapa once ruled from his sky palace. Explore 2000-year-old cave temples and discover the secrets of Polonnaruwa's golden age.",
      experiences: ["Dawn ascent of Sigiriya Lion Rock", "Dambulla Cave Temple meditation", "Royal palace ruins exploration", "Traditional village cooking class"],
      travelers: "Perfect for history lovers and spiritual seekers",
      highlight: "Watch sunrise from a 5th-century sky fortress"
    },
    {
      id: 2,
      story: "Where Ocean Meets Paradise",
      title: "Southern Coast Whale Tales",
      duration: "7 Days • 6 Nights", 
      price: "Rs. 195,000",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/5b4115a6-36aa-41a5-b13a-a309fd72f4fe/generated_images/pristine-mirissa-beach-in-sri-lanka-with-8d7982bf-20250902140314.jpg",
      narrative: "Dance with giants of the deep. Watch blue whales breach in Mirissa's turquoise waters, surf world-class breaks, and wander through Galle's 400-year-old Dutch fortifications as ocean breezes carry stories of spice traders.",
      experiences: ["Blue whale watching expedition", "Surfing lessons at Coconut Tree Hill", "Galle Fort sunset walk", "Fisherman's stilt fishing experience"],
      travelers: "Ideal for ocean lovers and adventure seekers",
      highlight: "Swim alongside the largest creatures on Earth"
    },
    {
      id: 3,
      story: "In the Clouds of Ceylon",
      title: "Misty Mountains & Tea Tales",
      duration: "6 Days • 5 Nights",
      price: "Rs. 165,000",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/5b4115a6-36aa-41a5-b13a-a309fd72f4fe/generated_images/beautiful-sri-lankan-tea-plantation-terr-2a0af708-20250902140304.jpg",
      narrative: "Journey through emerald dreams. Travel on mountain trains through cloud forests, pick tea with Tamil workers who've perfected their craft for generations, and sleep in colonial bungalows where time stands beautifully still.",
      experiences: ["Scenic train journey to Ella", "Tea plantation immersion day", "Little Adam's Peak hiking", "Traditional Tamil tea ceremony"],
      travelers: "Made for nature enthusiasts and culture seekers",
      highlight: "Sleep in clouds at 6,000 feet above sea level"
    },
    {
      id: 4,
      story: "Call of the Wild",
      title: "Safari Kingdom Adventures", 
      duration: "4 Days • 3 Nights",
      price: "Rs. 112,500",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/5b4115a6-36aa-41a5-b13a-a309fd72f4fe/generated_images/majestic-sri-lankan-elephant-in-yala-nat-14e1a6db-20250902140325.jpg",
      narrative: "Enter the kingdom where animals rule. Track leopards through ancient jungle paths, watch elephant families gather at watering holes, and sleep under stars in the wild where every sound tells a story of survival and beauty.",
      experiences: ["Dawn leopard tracking safari", "Elephant orphanage visit", "Jungle camping experience", "Wildlife photography workshop"],
      travelers: "Adventure lovers and wildlife photographers",
      highlight: "Sleep in the jungle under a canopy of stars"
    }
  ]

  // Travel stories from real experiences
  const travelStories = [
    {
      storyteller: "Emma & James",
      from: "Scotland",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      story: "The Sunrise That Changed Everything",
      moment: "\"At 5 AM, climbing Sigiriya in darkness felt crazy. But watching the sun paint the jungle gold from atop this ancient fortress... we cried. Actually cried. Our guide Saman shared legends of King Kasyapa as monkeys played in the ruins. This wasn't just sightseeing - it was time travel.\"",
      location: "Sigiriya Lion Rock",
      emotion: "🌅 Life-changing"
    },
    {
      storyteller: "Marcus",
      from: "Germany", 
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      story: "Dancing with Giants",
      moment: "\"The blue whale surfaced 10 meters from our boat. 30 meters long, graceful as a dancer. My heart stopped. The Sri Lankan crew started cheering like we'd won the World Cup. In that moment, floating on the Indian Ocean, I understood why they call this the Pearl. It's not just beautiful - it's magical.\"",
      location: "Mirissa Ocean",
      emotion: "🐋 Absolutely magical"
    },
    {
      storyteller: "Sophie & Marie",
      from: "France",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      story: "Tea, Smiles, and Family",
      moment: "\"Priya taught us to pick tea leaves at dawn. Her weathered hands moved like poetry. She invited us for lunch - curry so good we asked for recipes. Her children sang French songs they'd learned at school. We came as tourists, left as family. That's the Sri Lankan way.\"",
      location: "Nuwara Eliya Tea Estate",
      emotion: "❤️ Heartwarming"
    }
  ]

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Epic Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: heroY, scale: heroScale }}
        >
          <Image
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/5b4115a6-36aa-41a5-b13a-a309fd72f4fe/generated_images/spectacular-aerial-view-of-sigiriya-lion-3d4731f5-20250902140253.jpg"
            alt="Spectacular aerial view of Sigiriya Lion Rock, Sri Lanka's ancient fortress"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
          
          {/* Floating cinematic elements */}
          <motion.div 
            className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full"
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{ duration: 4, repeat: Infinity, delay: 0 }}
          />
          <motion.div 
            className="absolute top-1/3 right-1/3 w-3 h-3 bg-accent/40 rounded-full"
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.7, 0.2],
              scale: [1, 2, 1]
            }}
            transition={{ duration: 6, repeat: Infinity, delay: 2 }}
          />
        </motion.div>
        
        <motion.div 
          className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto"
          style={{ opacity: heroOpacity, y: heroTextY }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="mb-4"
          >
            <Badge className="bg-accent/80 text-white px-4 py-1.5 text-base font-medium backdrop-blur-sm">
              <Sparkles className="h-4 w-4 mr-2" /> ආයුබෝවන් - Welcome to Sri Lanka!
            </Badge>
          </motion.div>

          <motion.h1 
            className="text-6xl md:text-8xl font-heading font-bold mb-8 leading-none"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
          >
            <span className="block bg-gradient-to-r from-white via-accent to-white bg-clip-text text-transparent">
              Stories Written in
            </span>
            <span className="block text-accent text-shadow-lg">Paradise</span>
          </motion.h1>

          <motion.p 
            className="text-2xl md:text-3xl mb-12 text-white/90 max-w-3xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            Where ancient kings built sky fortresses, elephants roam free, and every sunset paints a new masterpiece. Your Sri Lankan story starts with a single step.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
              Book Your Trip
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-white/50 text-white hover:bg-white/10 hover:border-white hover:text-white px-8 py-6 text-lg backdrop-blur-sm transition-all duration-300">
              <Camera className="mr-2 h-5 w-5" />
              View Packages
            </Button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center backdrop-blur-sm bg-black/10 hover:bg-black/20 transition-all duration-300 cursor-pointer">
              <div className="w-1.5 h-3 bg-white/70 rounded-full mt-2"></div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Your Journey Story Timeline */}
      <section ref={journeyRef} className="py-32 bg-gradient-to-b from-background to-card/50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        </div>

        <div className="container max-w-7xl mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={isJourneyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 bg-gradient-to-r from-primary/20 to-accent/20 text-primary border-primary/30 text-lg px-6 py-2 backdrop-blur-sm shadow-sm">
              ✨ Your Story Unfolds
            </Badge>
            <h2 className="text-5xl md:text-7xl font-heading font-bold mb-8 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Every Journey Tells a Story
            </h2>
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              From the moment you land to your tearful goodbye, every chapter of your Sri Lankan adventure 
              is carefully crafted to create memories that last lifetimes.
            </p>
          </motion.div>

          {/* Interactive Journey Timeline */}
          <div className="relative">
            {/* Journey phases */}
            <div className="grid lg:grid-cols-4 gap-8 mb-16">
              {journeyPhases.map((phase, index) => (
                <motion.div
                  key={index}
                  className={`cursor-pointer transition-all duration-500 ${
                    selectedJourney === index ? 'scale-105' : 'hover:scale-102'
                  }`}
                  onClick={() => setSelectedJourney(index)}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isJourneyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className={`h-full border-2 transition-all duration-500 ${
                    selectedJourney === index 
                      ? 'border-primary shadow-2xl shadow-primary/20 bg-gradient-to-br from-primary/5 to-accent/5' 
                      : 'border-border hover:border-primary/50 hover:shadow-xl'
                  }`}>
                    <CardContent className="p-8 text-center">
                      <div className={`w-20 h-20 mx-auto mb-6 rounded-3xl flex items-center justify-center transition-all duration-500 ${
                        selectedJourney === index 
                          ? `bg-gradient-to-r ${phase.color} text-white shadow-xl`
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        <phase.icon className="h-10 w-10" />
                      </div>
                      <Badge className={`mb-4 ${
                        selectedJourney === index ? 'bg-primary text-white' : 'bg-muted'
                      }`}>
                        {phase.phase}
                      </Badge>
                      <h3 className="text-xl font-bold mb-4">{phase.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {phase.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Selected journey detail */}
            <motion.div
              key={selectedJourney}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative h-96 rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image
                src={journeyPhases[selectedJourney].image}
                alt={journeyPhases[selectedJourney].title}
                fill
                className="object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${journeyPhases[selectedJourney].color} opacity-80`} />
              <div className="absolute inset-0 flex items-center justify-center text-center text-white p-8">
                <div>
                  <h3 className="text-4xl md:text-5xl font-bold mb-6">{journeyPhases[selectedJourney].title}</h3>
                  <p className="text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto">
                    {journeyPhases[selectedJourney].description}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story-driven packages */}
      <section ref={packagesRef} className="py-32 relative overflow-hidden" id="packages">
        {/* Cinematic background elements */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          animate={{
            background: [
              "radial-gradient(circle at 20% 80%, var(--primary) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, var(--accent) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 40%, var(--primary) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        {/* Enhanced background with subtle texture */}
        <div className="absolute inset-0 bg-[url('https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/5b4115a6-36aa-41a5-b13a-a309fd72f4fe/generated_images/beautiful-sri-lankan-tea-plantation-terr-2a0af708-20250902140304.jpg')] opacity-5 bg-fixed bg-cover bg-center" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-40" />

        {/* Floating story elements */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-primary/5"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            variants={floatingVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: i * 1.5 }}
          >
            <Sparkles className="h-4 w-4" />
          </motion.div>
        ))}
        
        <div className="container max-w-7xl mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={isPackagesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 bg-gradient-to-r from-accent/20 to-primary/20 text-accent-foreground border-accent/30 text-lg px-6 py-2 backdrop-blur-sm shadow-sm">
              <Sparkles className="h-4 w-4 mr-2" /> Adventure Chronicles
            </Badge>
            <h2 className="text-5xl md:text-7xl font-heading font-bold mb-8">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Which Story Will You Live?
              </span>
            </h2>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Every package is a carefully crafted narrative, designed to immerse you in the heart and soul of Sri Lanka. 
              Choose your adventure, and let your story begin.
            </p>
          </motion.div>

          <motion.div 
            className="grid lg:grid-cols-2 gap-12"
            variants={containerVariants}
            initial="hidden"
            animate={isPackagesInView ? "visible" : "hidden"}
          >
            {storyPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                variants={cardVariants}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.4, type: "spring" }
                }}
                className="group"
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-700 border-0 shadow-xl bg-card/80 backdrop-blur-sm hover:bg-card">
                  <div className="relative h-80 overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.8 }}
                    >
                      <Image
                        src={pkg.image}
                        alt={pkg.title}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Story badge */}
                    <motion.div 
                      className="absolute top-6 left-6"
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <Badge className="bg-white/95 text-primary font-bold text-sm px-4 py-2 shadow-lg backdrop-blur-sm">
                        {pkg.story}
                      </Badge>
                    </motion.div>
                    
                    <motion.div 
                      className="absolute top-6 right-6"
                      initial={{ x: 30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <Badge className="bg-gradient-to-r from-accent to-primary text-white font-bold text-lg px-4 py-2 shadow-lg">
                        {pkg.price}
                      </Badge>
                    </motion.div>

                    {/* Duration and highlight */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <Badge className="bg-black/50 text-white mb-3 backdrop-blur-sm">
                        {pkg.duration}
                      </Badge>
                      <p className="text-white/90 text-sm font-medium">
                        ✨ {pkg.highlight}
                      </p>
                    </div>
                  </div>
                  
                  <CardContent className="p-8">
                    <motion.h3 
                      className="text-3xl font-heading font-bold mb-4 group-hover:text-primary transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                    >
                      {pkg.title}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-muted-foreground mb-6 leading-relaxed text-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                    >
                      {pkg.narrative}
                    </motion.p>

                    <motion.div 
                      className="mb-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                    >
                      <h4 className="font-semibold mb-3 text-primary">Your Story Includes:</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {pkg.experiences.map((experience, expIndex) => (
                          <motion.div
                            key={expIndex}
                            className="flex items-center text-sm text-muted-foreground"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.0 + index * 0.1 + expIndex * 0.05 }}
                          >
                            <div className="w-2 h-2 bg-accent rounded-full mr-3 flex-shrink-0"></div>
                            {experience}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div
                      className="mb-6"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.1 + index * 0.1 }}
                    >
                      <Badge variant="secondary" className="text-sm">
                        {pkg.travelers}
                      </Badge>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 + index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-bold text-lg py-4 transition-all duration-300 group/btn hover:shadow-xl hover:shadow-primary/25 relative overflow-hidden">
                        <motion.span
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"
                        />
                        <span className="relative z-10">Start This Adventure</span>
                        <motion.div
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 400 }}
                          className="relative z-10"
                        >
                          <ArrowRight className="ml-3 h-5 w-5" />
                        </motion.div>
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Travel Stories Section */}
      <section ref={storiesRef} className="py-32 bg-gradient-to-b from-card/30 to-background relative overflow-hidden" id="stories">
        <div className="container max-w-7xl mx-auto px-4">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={isStoriesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 bg-gradient-to-r from-heart/20 to-primary/20 text-primary border-primary/30 text-lg px-6 py-2">
              <MessageSquareQuote className="h-4 w-4 mr-2" /> Stories That Touch Hearts
            </Badge>
            <h2 className="text-5xl md:text-7xl font-heading font-bold mb-8">
              <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Real Stories, Real Magic
              </span>
            </h2>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              These aren't just reviews – they're chapters from the travel diaries of people whose hearts were stolen by Sri Lanka. 
              What will your story be?
            </p>
          </motion.div>

          <motion.div 
            className="grid lg:grid-cols-3 gap-10"
            variants={containerVariants}
            initial="hidden"
            animate={isStoriesInView ? "visible" : "hidden"}
          >
            {travelStories.map((story, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-500 border-0 shadow-lg bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <Avatar className="w-16 h-16 mr-4 ring-2 ring-primary/20">
                        <AvatarImage src={story.avatar} alt={story.storyteller} />
                        <AvatarFallback>{story.storyteller.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-bold text-lg">{story.storyteller}</h4>
                        <p className="text-muted-foreground">{story.from}</p>
                        <Badge variant="secondary" className="mt-1 text-xs">
                          {story.emotion}
                        </Badge>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-4 text-primary group-hover:text-accent transition-colors">
                      "{story.story}"
                    </h3>
                    
                    <blockquote className="text-muted-foreground mb-4 italic leading-relaxed text-base">
                      {story.moment}
                    </blockquote>
                    
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2 text-accent" />
                      {story.location}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              size="lg"
            >
              Start Your Journey
              <Plane className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Call to Adventure */}
      <section id="contact" className="py-36 bg-gradient-to-r from-primary/90 via-accent/90 to-primary/90 relative overflow-hidden">
        {/* Animated background pattern */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{ duration: 30, repeat: Infinity, repeatType: "reverse" }}
          style={{
            backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYtMi42ODYgNi02cy0yLjY4Ni02LTYtNmMtMy4zMTQgMC02IDIuNjg2LTYgNnMyLjY4NiA2IDYgNnptMTIgMTJjMy4zMTQgMCA2LTIuNjg2IDYtNnMtMi42ODYtNi02LTZjLTMuMzE0IDAtNiAyLjY4Ni02IDZzMi42ODYgNiA2IDZ6TTEyIDQyYzMuMzE0IDAgNi0yLjY4NiA2LTZzLTIuNjg2LTYtNi02Yy0zLjMxNCAwLTYgMi42ODYtNiA2czIuNjg2IDYgNiA2em0xMi0xMmMzLjMxNCAwIDYtMi42ODYgNi02cy0yLjY4Ni02LTYtNmMtMy4zMTQgMC02IDIuNjg2LTYgNnMyLjY4NiA2IDYgNnptMCAxMmMzLjMxNCAwIDYtMi42ODYgNi02cy0yLjY4Ni02LTYtNmMtMy4zMTQgMC02IDIuNjg2LTYgNnMyLjY4NiA2IDYgNnptMTItMTJjMy4zMTQgMCA2LTIuNjg2IDYtNnMtMi42ODYtNi02LTZjLTMuMzE0IDAtNiAyLjY4Ni02IDZzMi42ODYgNiA2IDZ6IiBzdHJva2U9IiNGRkYiIHN0cm9rZS1vcGFjaXR5PSIuNSIvPjxwYXRoIGQ9Ik0zNiA0MmMzLjMxNCAwIDYtMi42ODYgNi02cy0yLjY4Ni02LTYtNmMtMy4zMTQgMC02IDIuNjg2LTYgNnMyLjY4NiA2IDYgNnptMTIgMGMzLjMxNCAwIDYtMi42ODYgNi02cy0yLjY4Ni02LTYtNmMtMy4zMTQgMC02IDIuNjg2LTYgNnMyLjY4NiA2IDYgNnoiIHN0cm9rZT0iI0ZGRiIgc3Ryb2tlLW9wYWNpdHk9Ii41Ii8+PC9nPjwvc3ZnPg==')",
            backgroundSize: "60px 60px"
          }}
        />
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-background to-transparent opacity-20" />
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        
        <div className="container max-w-5xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-md rounded-3xl p-10 border border-white/20 shadow-2xl"
          >
            <Badge className="mb-8 bg-white/20 text-white border-white/30 text-lg px-6 py-2 backdrop-blur-sm shadow-lg">
              <Sparkles className="h-5 w-5 mr-2" /> Your Adventure Awaits
            </Badge>
            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-8 text-white tracking-tight">
              Ready to Write Your <span className="text-white/90 underline decoration-accent decoration-wavy decoration-2 underline-offset-8">Sri Lankan</span> Story?
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed">
              Every great story begins with someone brave enough to turn the page. 
              Your Sri Lankan adventure is waiting to unfold. What are you waiting for?
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto mb-8">
              <Input
                type="email"
                placeholder="Enter your email for your story to begin..."
                className="flex-1 h-14 text-lg border-white/30 bg-white/10 text-white placeholder:text-white/70 backdrop-blur-sm rounded-full px-6 focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
              />
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-8 font-bold text-lg transition-all duration-300 hover:scale-105 shadow-xl rounded-full">
                <Mail className="mr-2 h-5 w-5" />
                Start My Story
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 mt-12 mb-6">
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Shield className="h-5 w-5 text-white/80 mr-2" />
                <span className="text-sm text-white/80">Secure Booking</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Clock className="h-5 w-5 text-white/80 mr-2" />
                <span className="text-sm text-white/80">24/7 Support</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Heart className="h-5 w-5 text-white/80 mr-2" />
                <span className="text-sm text-white/80">Personalized Experience</span>
              </div>
            </div>

            <p className="text-sm text-white/70 mt-8">
              ✨ Get exclusive Sri Lankan travel secrets, cultural insights, and special offers
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}