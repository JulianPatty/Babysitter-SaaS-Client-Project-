"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MapPin, Search, Star, Shield, Heart, Clock, Award, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useBabysitters } from "@/hooks/useBabysitters"

function LogoSlider() {
  const logos = [
    { name: "TechCorp", logo: "/placeholder.svg?height=60&width=120&text=TechCorp" },
    { name: "StartupHub", logo: "/placeholder.svg?height=60&width=120&text=StartupHub" },
    { name: "InnovateLab", logo: "/placeholder.svg?height=60&width=120&text=InnovateLab" },
    { name: "FutureWorks", logo: "/placeholder.svg?height=60&width=120&text=FutureWorks" },
    { name: "CreativeStudio", logo: "/placeholder.svg?height=60&width=120&text=CreativeStudio" },
    { name: "DataFlow", logo: "/placeholder.svg?height=60&width=120&text=DataFlow" },
    { name: "CloudTech", logo: "/placeholder.svg?height=60&width=120&text=CloudTech" },
    { name: "NextGen", logo: "/placeholder.svg?height=60&width=120&text=NextGen" },
  ]

  return (
    <div className="bg-gray-50 py-12 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <p className="text-gray-600 font-medium">Trusted by families working at</p>
        </div>
        <div className="relative">
          <div className="flex animate-scroll space-x-12">
            {/* First set of logos */}
            {logos.map((company, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 flex items-center justify-center h-16 w-32 grayscale hover:grayscale-0 transition-all duration-300"
              >
                <Image
                  src={company.logo || "/placeholder.svg"}
                  alt={company.name}
                  width={120}
                  height={60}
                  className="max-h-12 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {logos.map((company, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 flex items-center justify-center h-16 w-32 grayscale hover:grayscale-0 transition-all duration-300"
              >
                <Image
                  src={company.logo || "/placeholder.svg"}
                  alt={company.name}
                  width={120}
                  height={60}
                  className="max-h-12 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ServicesSection() {
  const services = [
    {
      title: "Child Care",
      description:
        "Professional babysitters and nannies for children of all ages. From infants to teens, our caregivers provide safe, nurturing, and engaging care.",
      icon: "👶",
      color: "bg-blue-50 border-blue-200",
      iconBg: "bg-blue-100",
      textColor: "text-blue-600",
      features: ["Age-appropriate activities", "Meal preparation", "Bedtime routines", "Emergency certified"],
    },
    {
      title: "Tutoring",
      description:
        "Academic support and homework help from qualified tutors. Boost your child's learning with personalized educational assistance.",
      icon: "📚",
      color: "bg-green-50 border-green-200",
      iconBg: "bg-green-100",
      textColor: "text-green-600",
      features: ["All subjects covered", "Test preparation", "Study skills", "Progress tracking"],
    },
    {
      title: "Pet Care",
      description:
        "Reliable pet sitting and walking services for your furry family members. Keep your pets happy and healthy while you're away.",
      icon: "🐕",
      color: "bg-purple-50 border-purple-200",
      iconBg: "bg-purple-100",
      textColor: "text-purple-600",
      features: ["Dog walking", "Pet sitting", "Feeding schedules", "Playtime & exercise"],
    },
    {
      title: "Housekeeping",
      description:
        "Light housekeeping and organization services to keep your home tidy. Professional cleaning while caring for your family.",
      icon: "🧹",
      color: "bg-orange-50 border-orange-200",
      iconBg: "bg-orange-100",
      textColor: "text-orange-600",
      features: ["Light cleaning", "Laundry assistance", "Organization", "Kitchen cleanup"],
    },
    {
      title: "Special Needs",
      description:
        "Specialized care for children with unique needs. Our trained caregivers provide compassionate, professional support.",
      icon: "💙",
      color: "bg-indigo-50 border-indigo-200",
      iconBg: "bg-indigo-100",
      textColor: "text-indigo-600",
      features: ["Specialized training", "Individualized care", "Therapy support", "Medical awareness"],
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Comprehensive care services for your family</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From childcare to pet sitting, we connect you with trusted professionals for all your family's needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className={`${service.color} border-2 hover:shadow-lg transition-all duration-300 cursor-pointer group`}
            >
              <CardContent className="p-6 text-center">
                <div
                  className={`w-16 h-16 ${service.iconBg} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <span className="text-2xl">{service.icon}</span>
                </div>
                <h3 className={`font-bold text-lg mb-3 ${service.textColor}`}>{service.title}</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{service.description}</p>

                <div className="space-y-2 mb-4">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-xs text-gray-500">
                      <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  size="sm"
                  className={`w-full ${service.textColor.replace("text-", "bg-").replace("-600", "-600")} hover:${service.textColor.replace("text-", "bg-").replace("-600", "-700")} text-white`}
                >
                  Find {service.title} Providers
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Need a combination of services?</p>
          <Button variant="outline" size="lg">
            <Search className="w-4 h-4 mr-2" />
            Browse All Services
          </Button>
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-primary">TuttiCare</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/become-sitter" className="text-sm font-medium hover:text-primary">
                {"Find a Job "}
              </Link>
              <Link href="/help" className="text-sm font-medium hover:text-primary">
                Help
              </Link>
              <Button variant="outline" size="sm">
                Sign In
              </Button>
              <Button size="sm">Sign Up</Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Find trusted babysitters in your neighborhood
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Connect with verified, experienced babysitters who care for your children like their own
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <Card className="p-6 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input placeholder="Where do you need a sitter?" className="pl-10" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date & Time</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input placeholder="Select date" className="pl-10" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Children</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="How many?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 child</SelectItem>
                      <SelectItem value="2">2 children</SelectItem>
                      <SelectItem value="3">3 children</SelectItem>
                      <SelectItem value="4+">4+ children</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button className="w-full h-10">
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                </div>
              </div>

              {/* Quick Filters */}
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
                <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-white">
                  <Clock className="w-3 h-3 mr-1" />
                  Available Tonight
                </Badge>
                <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-white">
                  <Shield className="w-3 h-3 mr-1" />
                  Background Checked
                </Badge>
                <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-white">
                  <Award className="w-3 h-3 mr-1" />
                  First Aid Certified
                </Badge>
                <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-white">
                  Under $20/hr
                </Badge>
              </div>
            </Card>
          </div>
          <div className="text-center mt-8">
            <Link href="/search">
              <Button size="lg" className="px-8 py-6 text-lg">
                Find Your Perfect Babysitter
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Logo Slider */}
      <LogoSlider />

      {/* Services Section */}
      <ServicesSection />

      {/* Trust Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your family's safety is our priority</h2>
            <p className="text-lg text-gray-600">Every sitter is thoroughly vetted and verified</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Background Checks</h3>
              <p className="text-sm text-gray-600">Comprehensive criminal background screening</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Identity Verified</h3>
              <p className="text-sm text-gray-600">Government ID and address verification</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Certified Sitters</h3>
              <p className="text-sm text-gray-600">CPR and First Aid certified professionals</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Reviewed & Rated</h3>
              <p className="text-sm text-gray-600">Real reviews from verified families</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Babysitters */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured babysitters near you</h2>
            <Button variant="outline">View All</Button>
          </div>

          <FeaturedBabysitters />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How TuttiCare works</h2>
            <p className="text-lg text-gray-600">Find the perfect sitter in just a few steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Search & Filter</h3>
              <p className="text-gray-600">Find sitters by location, availability, and your specific needs</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Connect & Book</h3>
              <p className="text-gray-600">Message sitters, check availability, and book instantly or request</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Relax & Enjoy</h3>
              <p className="text-gray-600">Your children are in safe hands with our verified, trusted sitters</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">BabyCare</span>
              </div>
              <p className="text-gray-400">
                Connecting families with trusted, verified babysitters in their community.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Parents</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Find a Sitter
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Safety
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Sitters</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Become a Sitter
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Sitter Resources
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Background Check
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Earnings
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Trust & Safety
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 BabyCare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeaturedBabysitters() {
  const { babysitters, loading, error } = useBabysitters()

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-200"></div>
            <CardContent className="p-4">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded mb-3"></div>
              <div className="flex gap-1 mb-3">
                <div className="h-5 w-12 bg-gray-200 rounded"></div>
                <div className="h-5 w-8 bg-gray-200 rounded"></div>
              </div>
              <div className="flex justify-between items-center">
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
                <div className="h-8 w-20 bg-gray-200 rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Error loading babysitters: {error}</p>
        <Button variant="outline" onClick={() => window.location.reload()} className="mt-4">
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {babysitters.map((sitter) => (
        <Card key={sitter.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
          <div className="relative">
            <Image
              src={
                sitter.profile_image_url ||
                `/placeholder.svg?height=200&width=300&text=${sitter.first_name || "/placeholder.svg"} ${sitter.last_name}`
              }
              alt={`${sitter.first_name} ${sitter.last_name}`}
              width={300}
              height={200}
              className="w-full h-48 object-cover"
            />
            {sitter.is_verified && (
              <Badge className="absolute top-3 left-3 bg-green-500">
                <CheckCircle className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            )}
            <Button size="sm" variant="secondary" className="absolute top-3 right-3 h-8 w-8 p-0">
              <Heart className="w-4 h-4" />
            </Button>
          </div>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900">
                {sitter.first_name} {sitter.last_name}
              </h3>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm text-gray-600 ml-1">{sitter.rating}</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{sitter.bio}</p>
            <div className="flex flex-wrap gap-1 mb-3">
              {sitter.certifications.slice(0, 3).map((cert, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {cert}
                </Badge>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-900">${sitter.hourly_rate}/hour</span>
              <Link href={`/sitter/${sitter.id}`}>
                <Button size="sm">Book Now</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
