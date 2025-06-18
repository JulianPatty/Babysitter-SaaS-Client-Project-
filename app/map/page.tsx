"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Star, Shield, Heart, Filter, List, MapIcon, Navigation, Clock } from "lucide-react"
import { useBabysitters } from "@/hooks/useBabysitters"
import dynamic from "next/dynamic"
import Link from "next/link"

// Dynamically import the map component to avoid SSR issues
const InteractiveMap = dynamic(() => import("@/components/interactive-map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
        <p className="text-gray-600">Loading map...</p>
      </div>
    </div>
  ),
})

export default function MapPage() {
  const { babysitters, loading, error } = useBabysitters()
  const [selectedBabysitter, setSelectedBabysitter] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"split" | "list" | "map">("split")
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [sortBy, setSortBy] = useState<"distance" | "price" | "rating">("distance")

  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(id)) {
      newFavorites.delete(id)
    } else {
      newFavorites.add(id)
    }
    setFavorites(newFavorites)
  }

  // Sort babysitters based on selected criteria
  const sortedBabysitters = [...babysitters].sort((a, b) => {
    switch (sortBy) {
      case "price":
        return a.hourly_rate - b.hourly_rate
      case "rating":
        return b.rating - a.rating
      case "distance":
      default:
        // Distance sorting will be handled in the map component
        return 0
    }
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
                ))}
              </div>
              <div className="h-full bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Unable to load map</h2>
          <p className="text-gray-600 mb-4">There was an error loading the babysitter locations.</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b bg-white sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{babysitters.length} babysitters available</h1>
              <p className="text-gray-600">Find trusted childcare near you</p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              {/* Sort Options */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "distance" | "price" | "rating")}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="distance">Sort by Distance</option>
                <option value="price">Sort by Price</option>
                <option value="rating">Sort by Rating</option>
              </select>

              {/* View Mode Toggle */}
              <div className="hidden md:flex bg-gray-100 rounded-lg p-1">
                <Button
                  variant={viewMode === "split" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("split")}
                  className="px-3"
                >
                  <MapIcon className="h-4 w-4 mr-1" />
                  Map
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="px-3"
                >
                  <List className="h-4 w-4 mr-1" />
                  List
                </Button>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-1" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Location Permission Banner */}
      <div className="bg-blue-50 border-b border-blue-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-blue-800">
              <Navigation className="h-4 w-4" />
              <span className="text-sm font-medium">
                Enable location services to see distances and travel times to babysitters
              </span>
            </div>
            <Button size="sm" variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
              Enable Location
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {viewMode === "list" ? (
          // List View Only
          <div className="space-y-4">
            {sortedBabysitters.map((babysitter) => (
              <BabysitterCard
                key={babysitter.id}
                babysitter={babysitter}
                isFavorite={favorites.has(babysitter.id)}
                onToggleFavorite={() => toggleFavorite(babysitter.id)}
                isSelected={selectedBabysitter === babysitter.id}
                onClick={() => setSelectedBabysitter(babysitter.id)}
                showDistance={true}
              />
            ))}
          </div>
        ) : viewMode === "map" ? (
          // Map View Only
          <div className="h-[calc(100vh-200px)] rounded-lg overflow-hidden">
            <InteractiveMap
              babysitters={babysitters}
              selectedBabysitter={selectedBabysitter}
              onSelectBabysitter={setSelectedBabysitter}
            />
          </div>
        ) : (
          // Split View (Default)
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
            {/* Babysitter List */}
            <div className="overflow-y-auto space-y-4 pr-2">
              {sortedBabysitters.map((babysitter) => (
                <BabysitterCard
                  key={babysitter.id}
                  babysitter={babysitter}
                  isFavorite={favorites.has(babysitter.id)}
                  onToggleFavorite={() => toggleFavorite(babysitter.id)}
                  isSelected={selectedBabysitter === babysitter.id}
                  onClick={() => setSelectedBabysitter(babysitter.id)}
                  showDistance={true}
                />
              ))}
            </div>

            {/* Map */}
            <div className="sticky top-24 h-full rounded-lg overflow-hidden">
              <InteractiveMap
                babysitters={babysitters}
                selectedBabysitter={selectedBabysitter}
                onSelectBabysitter={setSelectedBabysitter}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

interface BabysitterCardProps {
  babysitter: any
  isFavorite: boolean
  onToggleFavorite: () => void
  isSelected: boolean
  onClick: () => void
  showDistance?: boolean
}

function BabysitterCard({
  babysitter,
  isFavorite,
  onToggleFavorite,
  isSelected,
  onClick,
  showDistance,
}: BabysitterCardProps) {
  return (
    <Card
      className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
        isSelected ? "ring-2 ring-blue-500 shadow-lg" : ""
      }`}
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="flex gap-4 p-4">
          {/* Profile Image */}
          <div className="relative flex-shrink-0">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={babysitter.profile_image_url || "/placeholder.svg"}
                alt={`${babysitter.first_name} ${babysitter.last_name}`}
              />
              <AvatarFallback>
                {babysitter.first_name[0]}
                {babysitter.last_name[0]}
              </AvatarFallback>
            </Avatar>
            <Button
              variant="ghost"
              size="sm"
              className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-white shadow-md hover:bg-gray-50"
              onClick={(e) => {
                e.stopPropagation()
                onToggleFavorite()
              }}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-gray-900 truncate">
                  {babysitter.first_name} {babysitter.last_name}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-3 w-3" />
                  {babysitter.location}
                </div>
                {showDistance && (
                  <div className="flex items-center gap-3 text-sm mt-1">
                    <div className="flex items-center gap-1 text-blue-600">
                      <MapPin className="h-3 w-3" />
                      <span>2.3 miles away</span>
                    </div>
                    <div className="flex items-center gap-1 text-green-600">
                      <Clock className="h-3 w-3" />
                      <span>8 min drive</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="text-right flex-shrink-0">
                <div className="font-semibold text-gray-900">${babysitter.hourly_rate}/hr</div>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span>{babysitter.rating}</span>
                  <span className="text-gray-500">({babysitter.review_count})</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{babysitter.bio}</p>

            {/* Badges */}
            <div className="flex flex-wrap gap-1 mb-3">
              {babysitter.is_verified && (
                <Badge variant="secondary" className="text-xs">
                  <Shield className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              )}
              {babysitter.is_background_checked && (
                <Badge variant="secondary" className="text-xs">
                  Background Check
                </Badge>
              )}
              {babysitter.certifications.slice(0, 2).map((cert: string) => (
                <Badge key={cert} variant="outline" className="text-xs">
                  {cert}
                </Badge>
              ))}
              {babysitter.certifications.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{babysitter.certifications.length - 2} more
                </Badge>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button size="sm" className="flex-1" asChild>
                <Link href={`/sitter/${babysitter.id}`}>View Profile</Link>
              </Button>
              <Button size="sm" variant="outline">
                Message
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
