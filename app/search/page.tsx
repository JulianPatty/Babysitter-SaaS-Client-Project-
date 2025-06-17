"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Search,
  MapPin,
  Calendar,
  Star,
  Heart,
  Filter,
  Grid3X3,
  List,
  Map,
  CheckCircle,
  Shield,
  Clock,
  MessageCircle,
  Phone,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useBabysitters } from "@/hooks/useBabysitters"
import type { Babysitter } from "@/lib/supabase"
import { BookingModal } from "@/components/booking-modal"

type ViewMode = "grid" | "list" | "map"
type SortOption = "rating" | "price-low" | "price-high" | "distance"

interface SearchFilters {
  location: string
  date: string
  time: string
  children: string
  ageGroup: string[]
  priceRange: [number, number]
  skills: string[]
  availability: string
  verified: boolean
  backgroundCheck: boolean
}

export default function SearchPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [sortBy, setSortBy] = useState<SortOption>("rating")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedSitter, setSelectedSitter] = useState<Babysitter | null>(null)
  const [showBookingModal, setShowBookingModal] = useState(false)

  const [filters, setFilters] = useState<SearchFilters>({
    location: "",
    date: "",
    time: "",
    children: "",
    ageGroup: [],
    priceRange: [10, 50],
    skills: [],
    availability: "",
    verified: false,
    backgroundCheck: false,
  })

  const { babysitters, loading, error } = useBabysitters()
  const [filteredSitters, setFilteredSitters] = useState<Babysitter[]>([])

  // Filter and sort babysitters based on current filters
  useEffect(() => {
    let filtered = [...babysitters]

    // Apply filters
    if (filters.location) {
      filtered = filtered.filter((sitter) => sitter.location.toLowerCase().includes(filters.location.toLowerCase()))
    }

    if (filters.priceRange) {
      filtered = filtered.filter(
        (sitter) => sitter.hourly_rate >= filters.priceRange[0] && sitter.hourly_rate <= filters.priceRange[1],
      )
    }

    if (filters.skills.length > 0) {
      filtered = filtered.filter((sitter) => filters.skills.some((skill) => sitter.certifications.includes(skill)))
    }

    if (filters.verified) {
      filtered = filtered.filter((sitter) => sitter.is_verified)
    }

    if (filters.backgroundCheck) {
      filtered = filtered.filter((sitter) => sitter.is_background_checked)
    }

    // Apply sorting
    switch (sortBy) {
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "price-low":
        filtered.sort((a, b) => a.hourly_rate - b.hourly_rate)
        break
      case "price-high":
        filtered.sort((a, b) => b.hourly_rate - a.hourly_rate)
        break
      default:
        break
    }

    setFilteredSitters(filtered)
  }, [babysitters, filters, sortBy])

  const handleBookNow = (sitter: Babysitter) => {
    setSelectedSitter(sitter)
    setShowBookingModal(true)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-primary">BabyCare</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/become-sitter" className="text-sm font-medium hover:text-primary">
                Become a Sitter
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

      {/* Search Bar */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Where do you need a sitter?"
                      className="pl-10"
                      value={filters.location}
                      onChange={(e) => setFilters((prev) => ({ ...prev, location: e.target.value }))}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="date"
                      className="pl-10"
                      value={filters.date}
                      onChange={(e) => setFilters((prev) => ({ ...prev, date: e.target.value }))}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pick-up Time</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="time"
                      className="pl-10"
                      value={filters.time}
                      onChange={(e) => setFilters((prev) => ({ ...prev, time: e.target.value }))}
                      placeholder="When do you need pick-up?"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Children</label>
                  <Select
                    value={filters.children}
                    onValueChange={(value) => setFilters((prev) => ({ ...prev, children: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="How many?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="one">1 child</SelectItem>
                      <SelectItem value="two">2 children</SelectItem>
                      <SelectItem value="three">3 children</SelectItem>
                      <SelectItem value="fourPlus">4+ children</SelectItem>
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
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-80 space-y-6">
            <FilterSidebar filters={filters} setFilters={setFilters} />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls Bar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold">{filteredSitters.length} babysitters available</h1>

                {/* Mobile Filter Button */}
                <Sheet open={showFilters} onOpenChange={setShowFilters}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="lg:hidden">
                      <Filter className="w-4 h-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterSidebar filters={filters} setFilters={setFilters} />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              <div className="flex items-center gap-4">
                {/* Sort Dropdown */}
                <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="distance">Nearest First</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode Toggle */}
                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-none border-x"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "map" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("map")}
                    className="rounded-l-none"
                  >
                    <Map className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Results */}
            {loading ? (
              <SearchResultsSkeleton viewMode={viewMode} />
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-600 mb-4">Error loading babysitters: {error}</p>
                <Button variant="outline" onClick={() => window.location.reload()}>
                  Try Again
                </Button>
              </div>
            ) : (
              <SearchResults sitters={filteredSitters} viewMode={viewMode} onBookNow={handleBookNow} />
            )}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {selectedSitter && (
        <BookingModal
          sitter={selectedSitter}
          open={showBookingModal}
          onOpenChange={setShowBookingModal}
          initialFilters={filters}
        />
      )}
    </div>
  )
}

function FilterSidebar({
  filters,
  setFilters,
}: {
  filters: SearchFilters
  setFilters: React.Dispatch<React.SetStateAction<SearchFilters>>
}) {
  const skillOptions = ["First Aid", "CPR", "Early Education", "Bilingual", "Sports Coach", "Music", "Art"]
  const ageGroups = ["Infants (0-1)", "Toddlers (1-3)", "Preschool (3-5)", "School Age (5-12)", "Teens (12+)"]

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Price Range</h3>
          <div className="space-y-4">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => setFilters((prev) => ({ ...prev, priceRange: value as [number, number] }))}
              max={50}
              min={10}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>${filters.priceRange[0]}/hr</span>
              <span>${filters.priceRange[1]}/hr</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Age Groups</h3>
          <div className="space-y-3">
            {ageGroups.map((age) => (
              <div key={age} className="flex items-center space-x-2">
                <Checkbox
                  id={age}
                  checked={filters.ageGroup.includes(age)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFilters((prev) => ({ ...prev, ageGroup: [...prev.ageGroup, age] }))
                    } else {
                      setFilters((prev) => ({ ...prev, ageGroup: prev.ageGroup.filter((a) => a !== age) }))
                    }
                  }}
                />
                <label htmlFor={age} className="text-sm font-medium">
                  {age}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Special Skills</h3>
          <div className="space-y-3">
            {skillOptions.map((skill) => (
              <div key={skill} className="flex items-center space-x-2">
                <Checkbox
                  id={skill}
                  checked={filters.skills.includes(skill)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFilters((prev) => ({ ...prev, skills: [...prev.skills, skill] }))
                    } else {
                      setFilters((prev) => ({ ...prev, skills: prev.skills.filter((s) => s !== skill) }))
                    }
                  }}
                />
                <label htmlFor={skill} className="text-sm font-medium">
                  {skill}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Verification</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="verified"
                checked={filters.verified}
                onCheckedChange={(checked) => setFilters((prev) => ({ ...prev, verified: !!checked }))}
              />
              <label htmlFor="verified" className="text-sm font-medium">
                Identity Verified
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="background"
                checked={filters.backgroundCheck}
                onCheckedChange={(checked) => setFilters((prev) => ({ ...prev, backgroundCheck: !!checked }))}
              />
              <label htmlFor="background" className="text-sm font-medium">
                Background Check
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Availability</h3>
          <Select
            value={filters.availability}
            onValueChange={(value) => setFilters((prev) => ({ ...prev, availability: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Any time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any time</SelectItem>
              <SelectItem value="morning">Morning (6AM - 12PM)</SelectItem>
              <SelectItem value="afternoon">Afternoon (12PM - 6PM)</SelectItem>
              <SelectItem value="evening">Evening (6PM - 12AM)</SelectItem>
              <SelectItem value="overnight">Overnight (12AM - 6AM)</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </div>
  )
}

function SearchResults({
  sitters,
  viewMode,
  onBookNow,
}: {
  sitters: Babysitter[]
  viewMode: ViewMode
  onBookNow: (sitter: Babysitter) => void
}) {
  if (sitters.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <Search className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No babysitters found</h3>
        <p className="text-gray-600 mb-4">Try adjusting your filters or search criteria</p>
        <Button variant="outline">Clear All Filters</Button>
      </div>
    )
  }

  if (viewMode === "map") {
    return (
      <Card className="h-96">
        <CardContent className="p-6 h-full flex items-center justify-center">
          <div className="text-center">
            <Map className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600">Map view coming soon</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (viewMode === "list") {
    return (
      <div className="space-y-4">
        {sitters.map((sitter) => (
          <SitterListCard key={sitter.id} sitter={sitter} onBookNow={onBookNow} />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {sitters.map((sitter) => (
        <SitterGridCard key={sitter.id} sitter={sitter} onBookNow={onBookNow} />
      ))}
    </div>
  )
}

function SitterGridCard({
  sitter,
  onBookNow,
}: {
  sitter: Babysitter
  onBookNow: (sitter: Babysitter) => void
}) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
      <div className="relative">
        <Image
          src={sitter.profile_image_url || `/placeholder.svg?height=200&width=300&text=${sitter.first_name}`}
          alt={`${sitter.first_name} ${sitter.last_name}`}
          width={300}
          height={200}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
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
        {sitter.availability_status === "available" && (
          <Badge className="absolute bottom-3 left-3 bg-green-500">Available Now</Badge>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-900">
            {sitter.first_name} {sitter.last_name}
          </h3>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 ml-1">{sitter.rating}</span>
            <span className="text-xs text-gray-500 ml-1">({sitter.review_count})</span>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-2">{sitter.location}</p>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{sitter.bio}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {sitter.certifications.slice(0, 3).map((cert, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {cert}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="font-semibold text-gray-900">${sitter.hourly_rate}/hour</span>
            {sitter.is_background_checked && (
              <div className="flex items-center mt-1">
                <Shield className="w-3 h-3 text-green-600 mr-1" />
                <span className="text-xs text-green-600">Background Checked</span>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <MessageCircle className="w-4 h-4" />
            </Button>
            <Button size="sm" onClick={() => onBookNow(sitter)}>
              Book Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function SitterListCard({
  sitter,
  onBookNow,
}: {
  sitter: Babysitter
  onBookNow: (sitter: Babysitter) => void
}) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex gap-6">
          <div className="relative flex-shrink-0">
            <Image
              src={sitter.profile_image_url || `/placeholder.svg?height=120&width=120&text=${sitter.first_name}`}
              alt={`${sitter.first_name} ${sitter.last_name}`}
              width={120}
              height={120}
              className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg"
            />
            {sitter.is_verified && (
              <Badge className="absolute -top-2 -right-2 bg-green-500">
                <CheckCircle className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-lg text-gray-900">
                  {sitter.first_name} {sitter.last_name}
                </h3>
                <div className="flex items-center gap-4 mt-1">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">{sitter.rating}</span>
                    <span className="text-xs text-gray-500 ml-1">({sitter.review_count} reviews)</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{sitter.location}</span>
                  </div>
                </div>
              </div>
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                <Heart className="w-4 h-4" />
              </Button>
            </div>

            <p className="text-gray-600 mb-3 line-clamp-2">{sitter.bio}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {sitter.certifications.map((cert, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {cert}
                </Badge>
              ))}
              {sitter.is_background_checked && (
                <Badge variant="outline" className="text-xs text-green-600 border-green-600">
                  <Shield className="w-3 h-3 mr-1" />
                  Background Checked
                </Badge>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <span className="font-semibold text-lg text-gray-900">${sitter.hourly_rate}/hour</span>
                </div>
                {sitter.availability_status === "available" && <Badge className="bg-green-500">Available Now</Badge>}
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message
                </Button>
                <Button size="sm" variant="outline">
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
                <Button size="sm" onClick={() => onBookNow(sitter)}>
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function SearchResultsSkeleton({ viewMode }: { viewMode: ViewMode }) {
  if (viewMode === "list") {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="overflow-hidden animate-pulse">
            <CardContent className="p-6">
              <div className="flex gap-6">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-200 rounded-lg flex-shrink-0"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="flex gap-2">
                    <div className="h-6 w-16 bg-gray-200 rounded"></div>
                    <div className="h-6 w-12 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
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
