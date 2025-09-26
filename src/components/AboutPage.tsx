"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  MapPin,
  Heart,
  Camera,
  Shield,
  Globe,
  Mail,
  ChevronLeft,
  ChevronRight,
  X,
  Upload,
  AlertCircle,
  CheckCircle,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

interface TourImage {
  id: string;
  src: string;
  title: string;
  location: string;
  description: string;
}

interface UploadedFile {
  file: File;
  id: string;
  preview: string;
  isValid: boolean;
  error?: string;
}

interface UploadFormData {
  travelerName: string;
  visitLocation: string;
  photoDescription: string;
}

export default function AboutPage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Upload state
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadFormData, setUploadFormData] = useState<UploadFormData>({
    travelerName: "",
    visitLocation: "",
    photoDescription: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Upload constants
  const MAX_FILES = 5;
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes
  const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png"];

  // Tour images with proper descriptions
  const tourImages: TourImage[] = [
    {
      id: "1",
      src: "/images/tours/WhatsApp Image 2025-09-15 at 20.09.12_a712087f.jpg",
      title: "Ancient Temple Visit",
      location: "Kandy, Sri Lanka",
      description:
        "Exploring the sacred Buddhist temples with our experienced guides",
    },
    {
      id: "2",
      src: "/images/tours/WhatsApp Image 2025-09-15 at 20.09.12_bde75721.jpg",
      title: "Cultural Heritage Tour",
      location: "Colombo, Sri Lanka",
      description:
        "Discovering the rich cultural heritage and colonial architecture",
    },
    {
      id: "3",
      src: "/images/tours/WhatsApp Image 2025-09-15 at 20.09.13_30455589.jpg",
      title: "Wildlife Safari Experience",
      location: "Yala National Park",
      description: "Unforgettable wildlife encounters in their natural habitat",
    },
    {
      id: "4",
      src: "/images/tours/WhatsApp Image 2025-09-15 at 20.09.13_32ecfd8e.jpg",
      title: "Tea Plantation Journey",
      location: "Nuwara Eliya",
      description: "Experience the scenic beauty of Ceylon tea gardens",
    },
    {
      id: "5",
      src: "/images/tours/WhatsApp Image 2025-09-15 at 20.09.13_d76985a3.jpg",
      title: "Beach Paradise",
      location: "Mirissa Beach",
      description: "Relaxing on pristine beaches with crystal clear waters",
    },
    {
      id: "6",
      src: "/images/tours/WhatsApp Image 2025-09-15 at 20.09.14_b9c7ab07.jpg",
      title: "Adventure Hiking",
      location: "Ella Rock",
      description: "Challenging hikes with breathtaking mountain views",
    },
    {
      id: "7",
      src: "/images/tours/WhatsApp Image 2025-09-15 at 20.09.15_a1d24eb4.jpg",
      title: "Local Market Experience",
      location: "Pettah Market",
      description: "Immersive cultural experience in local markets",
    },
    {
      id: "8",
      src: "/images/tours/WhatsApp Image 2025-09-15 at 20.09.15_a75740a6.jpg",
      title: "Historical Sites",
      location: "Sigiriya",
      description: "Exploring ancient kingdoms and archaeological wonders",
    },
    {
      id: "9",
      src: "/images/tours/WhatsApp Image 2025-09-15 at 20.09.16_30203e68.jpg",
      title: "Coastal Adventures",
      location: "Galle Fort",
      description: "Discovering Dutch colonial heritage by the coast",
    },
    {
      id: "10",
      src: "/images/tours/WhatsApp Image 2025-09-15 at 20.09.16_538c8e78.jpg",
      title: "Traditional Cuisine",
      location: "Local Restaurant",
      description: "Authentic Sri Lankan culinary experiences",
    },
    {
      id: "11",
      src: "/images/tours/WhatsApp Image 2025-09-15 at 20.09.17_1e83b4fb.jpg",
      title: "Scenic Train Journey",
      location: "Kandy to Ella",
      description: "One of the world's most beautiful train rides",
    },
    {
      id: "12",
      src: "/images/tours/WhatsApp Image 2025-09-15 at 20.09.17_4d1616ec.jpg",
      title: "Elephant Sanctuary",
      location: "Pinnawala",
      description: "Ethical elephant experiences and conservation",
    },
    {
      id: "13",
      src: "/images/tours/WhatsApp Image 2025-09-15 at 20.09.17_700cf804.jpg",
      title: "Sunset Views",
      location: "Unawatuna",
      description: "Spectacular sunset moments by the Indian Ocean",
    },
    {
      id: "14",
      src: "/images/tours/WhatsApp Image 2025-09-15 at 20.09.19_a979b6ee.jpg",
      title: "Adventure Sports",
      location: "Kitulgala",
      description: "White water rafting and adventure activities",
    },
  ];

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setCurrentImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % tourImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + tourImages.length) % tourImages.length
    );
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex !== null) {
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") prevImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex]);

  // Upload validation functions
  const validateFile = (file: File): { isValid: boolean; error?: string } => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return { isValid: false, error: "Only JPG and PNG files are allowed" };
    }
    if (file.size > MAX_FILE_SIZE) {
      return { isValid: false, error: "File size must be less than 10MB" };
    }
    return { isValid: true };
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    const totalFiles = uploadedFiles.length + fileArray.length;

    if (totalFiles > MAX_FILES) {
      toast.error(`You can only upload up to ${MAX_FILES} images at once`);
      return;
    }

    const newFiles: UploadedFile[] = [];

    fileArray.forEach((file) => {
      const validation = validateFile(file);
      const preview = URL.createObjectURL(file);
      const uploadedFile: UploadedFile = {
        file,
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        preview,
        isValid: validation.isValid,
        error: validation.error,
      };
      newFiles.push(uploadedFile);
    });

    setUploadedFiles((prev) => [...prev, ...newFiles]);

    const validFiles = newFiles.filter((f) => f.isValid).length;
    const invalidFiles = newFiles.filter((f) => !f.isValid).length;

    if (validFiles > 0) {
      toast.success(`${validFiles} file(s) added successfully`);
    }
    if (invalidFiles > 0) {
      toast.error(
        `${invalidFiles} file(s) were rejected due to validation errors`
      );
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === fileId);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter((f) => f.id !== fileId);
    });
  };

  const handleFormChange = (field: keyof UploadFormData, value: string) => {
    setUploadFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleUploadSubmit = async () => {
    const validFiles = uploadedFiles.filter((f) => f.isValid);

    if (validFiles.length === 0) {
      toast.error("Please select at least one valid image to upload");
      return;
    }

    if (!uploadFormData.travelerName.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!uploadFormData.visitLocation.trim()) {
      toast.error("Please enter the location you visited");
      return;
    }

    setIsUploading(true);

    try {
      // Simulate upload process
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success(
        `Successfully uploaded ${validFiles.length} photo(s)! Thank you for sharing your memories.`
      );

      // Reset form
      setUploadedFiles([]);
      setUploadFormData({
        travelerName: "",
        visitLocation: "",
        photoDescription: "",
      });

      // Clear file previews
      uploadedFiles.forEach((file) => {
        URL.revokeObjectURL(file.preview);
      });
    } catch (error) {
      toast.error("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  // Cleanup file previews on component unmount
  useEffect(() => {
    return () => {
      uploadedFiles.forEach((file) => {
        URL.revokeObjectURL(file.preview);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[50vh] sm:h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/tours/WhatsApp Image 2025-09-15 at 20.09.12_a712087f.jpg"
            alt="Ceyora Holidays - Authentic Sri Lankan Experiences"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
        </div>

        <motion.div
          className="relative z-10 h-full flex items-center justify-center text-center text-white px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 sm:mb-6 bg-white/20 text-white border-white/30 text-sm sm:text-base lg:text-lg px-4 sm:px-6 py-1.5 sm:py-2 backdrop-blur-sm shadow-lg">
              ✨ Stories Written in Paradise
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-heading font-bold mb-4 sm:mb-6 leading-tight px-2">
              About <span className="text-accent">Ceyora Holidays</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed px-2">
              Your trusted partner in creating unforgettable Sri Lankan
              adventures. We don't just show you places – we share the stories
              that make them magical.
            </p>
          </div>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 space-y-16 sm:space-y-20 lg:space-y-24">
        {/* Tour Gallery Section */}
        <motion.section
          className="space-y-8 sm:space-y-10 lg:space-y-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 sm:mb-6 bg-gradient-to-r from-primary/20 to-accent/20 text-primary border-primary/30 text-sm sm:text-base lg:text-lg px-4 sm:px-6 py-1.5 sm:py-2 backdrop-blur-sm shadow-sm">
              <Camera className="h-4 sm:h-5 w-4 sm:w-5 mr-1.5 sm:mr-2" />
              Real Moments, Real Adventures
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 sm:mb-6">
              Our <span className="text-accent">Tour Gallery</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2">
              See the magic through our travelers' eyes. These are real moments
              from real adventures, captured during our guided tours across Sri
              Lanka.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {tourImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 },
                }}
                className="group cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 border-0 shadow-lg">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                      quality={75}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                        <Camera className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}{" "}
          </div>
        </motion.section>

        {/* Travel Picture Upload Section */}
        <motion.section
          className="space-y-8 sm:space-y-10 lg:space-y-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 sm:mb-6 bg-gradient-to-r from-accent/20 to-primary/20 text-accent border-accent/30 text-sm sm:text-base lg:text-lg px-4 sm:px-6 py-1.5 sm:py-2 backdrop-blur-sm shadow-sm">
              <Camera className="h-4 sm:h-5 w-4 sm:w-5 mr-1.5 sm:mr-2" />
              Share Your Journey
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 sm:mb-6">
              Upload Your <span className="text-accent">Travel Pictures</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2">
              Share your amazing Sri Lankan moments with fellow travelers.
              Upload your favorite travel photos and inspire others to explore
              the beauty of our island.
            </p>
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-border/50 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Camera className="w-6 h-6 text-primary" />
                  Share Your Travel Memories
                </CardTitle>
                <CardDescription className="text-base">
                  Upload your favorite travel photos from Sri Lanka and help
                  inspire other travelers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Upload Guidelines */}
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 sm:p-4">
                  <h4 className="font-semibold text-primary mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
                    <Camera className="h-3 sm:h-4 w-3 sm:w-4 mr-1.5 sm:mr-2" />
                    Upload Guidelines
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-green-500 rounded-full mr-1.5 sm:mr-2"></span>
                      <span>
                        <strong>Max 5 images</strong> per upload
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-blue-500 rounded-full mr-1.5 sm:mr-2"></span>
                      <span>
                        <strong>Max 10MB</strong> per image
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-purple-500 rounded-full mr-1.5 sm:mr-2"></span>
                      <span>
                        <strong>JPG, PNG</strong> formats only
                      </span>
                    </div>
                  </div>
                </div>

                {/* Upload Area */}
                <div
                  className={`border-2 border-dashed transition-colors rounded-lg p-4 sm:p-6 lg:p-8 text-center ${
                    isDragging
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center space-y-3 sm:space-y-4">
                    <div
                      className={`w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16 rounded-full flex items-center justify-center transition-colors ${
                        isDragging ? "bg-primary/20" : "bg-primary/10"
                      }`}
                    >
                      <Upload
                        className={`w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8 transition-colors ${
                          isDragging ? "text-primary" : "text-primary"
                        }`}
                      />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold mb-1.5 sm:mb-2">
                        {isDragging
                          ? "Drop your photos here"
                          : "Drag & drop your photos"}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 sm:mb-4">
                        or click to browse your device
                      </p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/jpeg,image/jpg,image/png"
                        className="hidden"
                        onChange={(e) => handleFileSelect(e.target.files)}
                      />
                      <Button
                        className="bg-primary hover:bg-primary/90 text-sm sm:text-base"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploadedFiles.length >= MAX_FILES}
                      >
                        <Camera className="mr-1.5 sm:mr-2 h-3 sm:h-4 w-3 sm:w-4" />
                        <span className="hidden sm:inline">
                          Choose Photos ({uploadedFiles.length}/{MAX_FILES})
                        </span>
                        <span className="sm:hidden">
                          Choose ({uploadedFiles.length}/{MAX_FILES})
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* File Preview */}
                {uploadedFiles.length > 0 && (
                  <div className="space-y-3 sm:space-y-4">
                    <h4 className="font-semibold flex items-center gap-2 text-sm sm:text-base">
                      <Camera className="h-3 sm:h-4 w-3 sm:w-4" />
                      Selected Photos (
                      {uploadedFiles.filter((f) => f.isValid).length} valid)
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                      {uploadedFiles.map((uploadedFile) => (
                        <div key={uploadedFile.id} className="relative group">
                          <div
                            className={`relative aspect-square rounded-lg overflow-hidden border-2 ${
                              uploadedFile.isValid
                                ? "border-green-200"
                                : "border-red-200"
                            }`}
                          >
                            <Image
                              src={uploadedFile.preview}
                              alt="Preview"
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Button
                                size="sm"
                                variant="destructive"
                                className="h-8 w-8 p-0"
                                onClick={() => removeFile(uploadedFile.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="absolute top-2 right-2">
                              {uploadedFile.isValid ? (
                                <div className="bg-green-500 rounded-full p-1">
                                  <CheckCircle className="h-3 w-3 text-white" />
                                </div>
                              ) : (
                                <div className="bg-red-500 rounded-full p-1">
                                  <AlertCircle className="h-3 w-3 text-white" />
                                </div>
                              )}
                            </div>
                          </div>
                          {!uploadedFile.isValid && uploadedFile.error && (
                            <p className="text-xs text-red-500 mt-1 text-center">
                              {uploadedFile.error}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground mt-1 text-center truncate">
                            {uploadedFile.file.name}
                          </p>
                          <p className="text-xs text-muted-foreground text-center">
                            {(uploadedFile.file.size / (1024 * 1024)).toFixed(
                              1
                            )}
                            MB
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Additional Info Form */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="travelerName" className="text-sm">
                      Your Name *
                    </Label>
                    <Input
                      id="travelerName"
                      placeholder="Enter your name"
                      className="w-full h-10 sm:h-11"
                      value={uploadFormData.travelerName}
                      onChange={(e) =>
                        handleFormChange("travelerName", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="visitLocation" className="text-sm">
                      Location Visited *
                    </Label>
                    <Input
                      id="visitLocation"
                      placeholder="e.g., Sigiriya, Kandy, Galle"
                      className="w-full h-10 sm:h-11"
                      value={uploadFormData.visitLocation}
                      onChange={(e) =>
                        handleFormChange("visitLocation", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor="photoDescription" className="text-sm">
                    Photo Description (Optional)
                  </Label>
                  <Textarea
                    id="photoDescription"
                    placeholder="Tell us about this moment... What made it special?"
                    className="min-h-[80px] sm:min-h-[100px] resize-none text-sm"
                    maxLength={300}
                    value={uploadFormData.photoDescription}
                    onChange={(e) =>
                      handleFormChange("photoDescription", e.target.value)
                    }
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    {uploadFormData.photoDescription.length}/300 characters
                  </p>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-3 sm:pt-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                    onClick={handleUploadSubmit}
                    disabled={
                      isUploading ||
                      uploadedFiles.filter((f) => f.isValid).length === 0
                    }
                  >
                    {isUploading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 sm:h-5 w-4 sm:w-5 border-2 border-white border-t-transparent mr-2" />
                        <span className="hidden sm:inline">Uploading...</span>
                        <span className="sm:hidden">Uploading</span>
                      </>
                    ) : (
                      <>
                        <Camera className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
                        <span className="hidden sm:inline">
                          Upload {uploadedFiles.filter((f) => f.isValid).length}{" "}
                          Photo
                          {uploadedFiles.filter((f) => f.isValid).length !== 1
                            ? "s"
                            : ""}
                        </span>
                        <span className="sm:hidden">
                          Upload (
                          {uploadedFiles.filter((f) => f.isValid).length})
                        </span>
                      </>
                    )}
                  </Button>
                </div>

                {/* Terms */}
                <p className="text-xs text-muted-foreground text-center max-w-2xl mx-auto leading-relaxed">
                  By uploading photos, you agree to allow Ceyora Holidays to
                  feature your images on our website and social media with
                  proper attribution. All uploaded content will be reviewed
                  before publication.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.section>

        {/* Why Choose Us Section */}
        <motion.section
          className="space-y-8 sm:space-y-10 lg:space-y-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 sm:mb-6">
              Why Choose <span className="text-primary">Ceyora Holidays</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2">
              We combine local expertise with international standards to create
              unforgettable experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="text-center hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-primary/20 h-full">
                <CardHeader className="pb-3 sm:pb-4 p-4 sm:p-6">
                  <div className="w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Heart className="w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl lg:text-2xl">
                    Local Expertise
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <CardDescription className="text-sm sm:text-base leading-relaxed">
                    Born and raised in Sri Lanka, our team knows the hidden gems
                    and authentic experiences that make your journey truly
                    special.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="text-center hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-primary/20 h-full">
                <CardHeader className="pb-3 sm:pb-4 p-4 sm:p-6">
                  <div className="w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Shield className="w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl lg:text-2xl">
                    Safety & Reliability
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <CardDescription className="text-sm sm:text-base leading-relaxed">
                    Fully licensed and insured with 24/7 support. Our safety
                    protocols and emergency procedures ensure peace of mind
                    throughout your journey.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="text-center hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-primary/20 h-full">
                <CardHeader className="pb-3 sm:pb-4 p-4 sm:p-6">
                  <div className="w-12 sm:w-14 lg:w-16 h-12 sm:h-14 lg:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Globe className="w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl lg:text-2xl">
                    Personalized Experience
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <CardDescription className="text-sm sm:text-base leading-relaxed">
                    Every itinerary is customized to your interests, budget, and
                    travel style. From luxury escapes to adventure tours, we
                    craft your perfect Sri Lankan experience.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 sm:mb-6 bg-green-500/20 text-green-700 border-green-500/30 text-sm sm:text-base lg:text-lg px-4 sm:px-6 py-1.5 sm:py-2 backdrop-blur-sm shadow-sm">
              💬 Ready to Explore?
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 sm:mb-6">
              Start Your Sri Lankan{" "}
              <span className="text-primary">Adventure</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed px-2">
              Ready to create your own Sri Lankan story? Contact us on WhatsApp
              and let our local experts craft the perfect itinerary for your
              dream vacation.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-lg mx-auto">
              <Button
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                onClick={() => {
                  const message =
                    "Hi! I'd like to book a Sri Lanka tour. Can you help me?";
                  window.open(
                    `https://wa.me/94768118780?text=${encodeURIComponent(
                      message
                    )}`,
                    "_blank",
                    "noopener,noreferrer"
                  );
                }}
              >
                <span className="hidden sm:inline">
                  💬 WhatsApp: +94 76 811 8780
                </span>
                <span className="sm:hidden">💬 WhatsApp</span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold border-2 hover:bg-muted w-full sm:w-auto"
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <Mail className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
                <span className="hidden sm:inline">Contact Form</span>
                <span className="sm:hidden">Contact</span>
              </Button>
            </div>
          </motion.div>
        </motion.section>
      </div>

      {/* Image Lightbox */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-2 sm:p-4"
          onClick={(e) => {
            // Close lightbox when clicking on backdrop
            if (e.target === e.currentTarget) {
              closeLightbox();
            }
          }}
        >
          <div className="relative max-w-5xl max-h-full w-full flex flex-col items-center">
            <button
              onClick={closeLightbox}
              className="absolute top-2 sm:top-4 right-2 sm:right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 sm:p-2 transition-colors"
            >
              <X className="h-5 sm:h-6 w-5 sm:w-6" />
            </button>

            <button
              onClick={prevImage}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 sm:p-2 transition-colors"
            >
              <ChevronLeft className="h-5 sm:h-6 w-5 sm:w-6" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 sm:p-2 transition-colors"
            >
              <ChevronRight className="h-5 sm:h-6 w-5 sm:w-6" />
            </button>

            <div className="relative flex items-center justify-center">
              <Image
                src={tourImages[currentImageIndex].src}
                alt={tourImages[currentImageIndex].title}
                width={1200}
                height={800}
                className="object-contain max-h-[80vh] max-w-full w-auto h-auto"
                priority
                unoptimized
              />
            </div>

            <div className="text-center mt-2 sm:mt-4 text-white/70 text-sm sm:text-base">
              {currentImageIndex + 1} / {tourImages.length}
            </div>

            {/* Image title and location */}
            <div className="text-center mt-2 text-white">
              <h3 className="text-lg sm:text-xl font-semibold">
                {tourImages[currentImageIndex].title}
              </h3>
              <p className="text-sm sm:text-base text-white/80">
                {tourImages[currentImageIndex].location}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
