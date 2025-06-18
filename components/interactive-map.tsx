"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Shield, MapPin, ZoomIn, ZoomOut, RotateCcw, Layers, Navigation, Clock } from "lucide-react"
import Link from "next/link"

// Real coordinates for Seattle neighborhoods
const geocodeLocation = (location: string): [number, number] => {
  const locationMap: { [key: string]: [number, number] } = {
    "Downtown Seattle": [47.6062, -122.3321],
    "Capitol Hill": [47.6205, -122.3212],
    Fremont: [47.6513, -122.3501],
    Ballard: [47.6685, -122.3834],
    "Queen Anne": [47.6236, -122.3564],
    Wallingford: [47.6615, -122.334],
    "University District": [47.6587, -122.3138],
    "Beacon Hill": [47.5739, -122.3089],
  }

  return locationMap[location] || [47.6062, -122.3321] // Default to downtown Seattle
}

// Calculate distance between two lat/lng points using Haversine formula
const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const R = 3959 // Earth's radius in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

// Estimate travel time based on distance (rough approximation)
const estimateTravelTime = (distanceMiles: number): string => {
  // Assume average city driving speed of 25 mph
  const timeHours = distanceMiles / 25
  const timeMinutes = Math.round(timeHours * 60)

  if (timeMinutes < 60) {
    return `${timeMinutes} min`
  } else {
    const hours = Math.floor(timeMinutes / 60)
    const minutes = timeMinutes % 60
    return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`
  }
}

// Convert lat/lng to tile coordinates
const latLngToTile = (lat: number, lng: number, zoom: number) => {
  const x = Math.floor(((lng + 180) / 360) * Math.pow(2, zoom))
  const y = Math.floor(
    ((1 - Math.log(Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)) / Math.PI) / 2) *
      Math.pow(2, zoom),
  )
  return { x, y }
}

// Convert lat/lng to pixel coordinates within the map container
const latLngToPixel = (
  lat: number,
  lng: number,
  centerLat: number,
  centerLng: number,
  zoom: number,
  mapSize: { width: number; height: number },
) => {
  const scale = Math.pow(2, zoom) * 256
  const centerX = ((centerLng + 180) / 360) * scale
  const centerY =
    ((1 - Math.log(Math.tan((centerLat * Math.PI) / 180) + 1 / Math.cos((centerLat * Math.PI) / 180)) / Math.PI) / 2) *
    scale

  const pointX = ((lng + 180) / 360) * scale
  const pointY =
    ((1 - Math.log(Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)) / Math.PI) / 2) * scale

  return {
    x: mapSize.width / 2 + (pointX - centerX),
    y: mapSize.height / 2 + (pointY - centerY),
  }
}

interface InteractiveMapProps {
  babysitters: any[]
  selectedBabysitter: string | null
  onSelectBabysitter: (id: string | null) => void
}

interface UserLocation {
  lat: number
  lng: number
  accuracy?: number
}

export default function InteractiveMap({ babysitters, selectedBabysitter, onSelectBabysitter }: InteractiveMapProps) {
  const [center, setCenter] = useState({ lat: 47.6062, lng: -122.3321 }) // Seattle center
  const [zoom, setZoom] = useState(12)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, centerLat: 0, centerLng: 0 })
  const [showPopup, setShowPopup] = useState<string | null>(null)
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 })
  const [mapStyle, setMapStyle] = useState<"standard" | "satellite">("standard")
  const [tilesLoaded, setTilesLoaded] = useState(false)
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)

  const mapSize = { width: 800, height: 600 }

  // Get user's current location
  const getUserLocation = () => {
    setIsLoadingLocation(true)
    setLocationError(null)

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser")
      setIsLoadingLocation(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
        }
        setUserLocation(location)
        setCenter(location) // Center map on user location
        setZoom(14) // Zoom in closer
        setIsLoadingLocation(false)
      },
      (error) => {
        let errorMessage = "Unable to get your location"
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied. Please enable location services."
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable."
            break
          case error.TIMEOUT:
            errorMessage = "Location request timed out."
            break
        }
        setLocationError(errorMessage)
        setIsLoadingLocation(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      },
    )
  }

  // Calculate distances for all babysitters
  const babysittersWithDistance = babysitters.map((babysitter) => {
    const [lat, lng] = geocodeLocation(babysitter.location)
    let distance = null
    let travelTime = null

    if (userLocation) {
      distance = calculateDistance(userLocation.lat, userLocation.lng, lat, lng)
      travelTime = estimateTravelTime(distance)
    }

    return {
      ...babysitter,
      distance,
      travelTime,
      coordinates: { lat, lng },
    }
  })

  // Sort babysitters by distance if user location is available
  const sortedBabysitters = userLocation
    ? [...babysittersWithDistance].sort(
        (a, b) => (a.distance || Number.POSITIVE_INFINITY) - (b.distance || Number.POSITIVE_INFINITY),
      )
    : babysittersWithDistance

  // Calculate which tiles to load
  const getTilesInView = () => {
    const tileZoom = Math.floor(zoom)
    const centerTile = latLngToTile(center.lat, center.lng, tileZoom)
    const tilesNeeded = Math.ceil(Math.max(mapSize.width, mapSize.height) / 256) + 2

    const tiles = []
    for (let x = centerTile.x - tilesNeeded; x <= centerTile.x + tilesNeeded; x++) {
      for (let y = centerTile.y - tilesNeeded; y <= centerTile.y + tilesNeeded; y++) {
        if (x >= 0 && y >= 0 && x < Math.pow(2, tileZoom) && y < Math.pow(2, tileZoom)) {
          tiles.push({ x, y, z: tileZoom })
        }
      }
    }
    return tiles
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({
      x: e.clientX,
      y: e.clientY,
      centerLat: center.lat,
      centerLng: center.lng,
    })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const deltaX = e.clientX - dragStart.x
      const deltaY = e.clientY - dragStart.y

      // Convert pixel movement to lat/lng movement
      const scale = Math.pow(2, zoom) * 256
      const lngDelta = -(deltaX / scale) * 360
      const latDelta = (deltaY / scale) * 180

      setCenter({
        lat: Math.max(-85, Math.min(85, dragStart.centerLat + latDelta)),
        lng: dragStart.centerLng + lngDelta,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 1, 18))
  }

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 1, 3))
  }

  const handleReset = () => {
    if (userLocation) {
      setCenter(userLocation)
      setZoom(14)
    } else {
      setCenter({ lat: 47.6062, lng: -122.3321 })
      setZoom(12)
    }
    setPan({ x: 0, y: 0 })
  }

  const handleMarkerClick = (babysitter: any, pixelPos: { x: number; y: number }) => {
    onSelectBabysitter(babysitter.id === selectedBabysitter ? null : babysitter.id)
    setShowPopup(babysitter.id)
    setPopupPosition(pixelPos)
  }

  const tiles = getTilesInView()

  return (
    <div className="relative w-full h-full bg-gray-200 rounded-lg overflow-hidden">
      {/* Map Tiles */}
      <div
        ref={mapRef}
        className="w-full h-full cursor-grab active:cursor-grabbing relative"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Tile Layer */}
        {tiles.map((tile) => {
          const tileUrl =
            mapStyle === "standard"
              ? `https://tile.openstreetmap.org/${tile.z}/${tile.x}/${tile.y}.png`
              : `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${tile.z}/${tile.y}/${tile.x}`

          // Calculate tile position
          const scale = Math.pow(2, Math.floor(zoom)) * 256
          const centerTileX = ((center.lng + 180) / 360) * scale
          const centerTileY =
            ((1 -
              Math.log(Math.tan((center.lat * Math.PI) / 180) + 1 / Math.cos((center.lat * Math.PI) / 180)) / Math.PI) /
              2) *
            scale

          const tilePixelX = tile.x * 256
          const tilePixelY = tile.y * 256

          const offsetX = mapSize.width / 2 + (tilePixelX - centerTileX)
          const offsetY = mapSize.height / 2 + (tilePixelY - centerTileY)

          return (
            <img
              key={`${tile.x}-${tile.y}-${tile.z}`}
              src={tileUrl || "/placeholder.svg"}
              alt=""
              className="absolute pointer-events-none"
              style={{
                left: offsetX,
                top: offsetY,
                width: 256,
                height: 256,
              }}
              onLoad={() => setTilesLoaded(true)}
              onError={(e) => {
                // Fallback to a placeholder if tile fails to load
                const target = e.target as HTMLImageElement
                target.style.backgroundColor = "#f3f4f6"
                target.style.border = "1px solid #d1d5db"
              }}
            />
          )
        })}

        {/* Loading overlay */}
        {!tilesLoaded && (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-gray-600">Loading map tiles...</p>
            </div>
          </div>
        )}

        {/* User Location Marker */}
        {userLocation && (
          <div
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
            style={{
              left: latLngToPixel(userLocation.lat, userLocation.lng, center.lat, center.lng, zoom, mapSize).x,
              top: latLngToPixel(userLocation.lat, userLocation.lng, center.lat, center.lng, zoom, mapSize).y,
            }}
          >
            {/* User location dot with pulse animation */}
            <div className="relative">
              <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg"></div>
              <div className="absolute inset-0 w-4 h-4 bg-blue-600 rounded-full animate-ping opacity-75"></div>
              {/* Accuracy circle if available */}
              {userLocation.accuracy && userLocation.accuracy < 100 && (
                <div
                  className="absolute border border-blue-300 rounded-full opacity-30"
                  style={{
                    width: Math.min(userLocation.accuracy / 10, 100),
                    height: Math.min(userLocation.accuracy / 10, 100),
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                ></div>
              )}
            </div>
          </div>
        )}

        {/* Babysitter Markers */}
        {sortedBabysitters.map((babysitter) => {
          const pixelPos = latLngToPixel(
            babysitter.coordinates.lat,
            babysitter.coordinates.lng,
            center.lat,
            center.lng,
            zoom,
            mapSize,
          )
          const isSelected = selectedBabysitter === babysitter.id

          // Only show markers that are within the visible area
          if (
            pixelPos.x < -50 ||
            pixelPos.x > mapSize.width + 50 ||
            pixelPos.y < -50 ||
            pixelPos.y > mapSize.height + 50
          ) {
            return null
          }

          return (
            <div
              key={babysitter.id}
              className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer z-10"
              style={{ left: pixelPos.x, top: pixelPos.y }}
              onClick={() => handleMarkerClick(babysitter, pixelPos)}
            >
              {/* Price Marker with Distance */}
              <div
                className={`bg-white border-2 rounded-full px-3 py-1 shadow-lg font-semibold text-sm whitespace-nowrap transition-all hover:scale-110 ${
                  isSelected ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <div>${babysitter.hourly_rate}/hr</div>
                {babysitter.distance && (
                  <div className="text-xs text-gray-600 font-normal">
                    {babysitter.distance.toFixed(1)} mi • {babysitter.travelTime}
                  </div>
                )}
              </div>
              {/* Marker Tail */}
              <div
                className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent ${
                  isSelected ? "border-t-blue-500" : "border-t-gray-300"
                }`}
              ></div>
            </div>
          )
        })}
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
        <Button
          variant="outline"
          size="sm"
          className="bg-white shadow-md"
          onClick={getUserLocation}
          disabled={isLoadingLocation}
        >
          {isLoadingLocation ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          ) : (
            <Navigation className="h-4 w-4" />
          )}
        </Button>
        <Button variant="outline" size="sm" className="bg-white shadow-md" onClick={handleZoomIn}>
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" className="bg-white shadow-md" onClick={handleZoomOut}>
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" className="bg-white shadow-md" onClick={handleReset}>
          <RotateCcw className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="bg-white shadow-md"
          onClick={() => setMapStyle(mapStyle === "standard" ? "satellite" : "standard")}
        >
          <Layers className="h-4 w-4" />
        </Button>
      </div>

      {/* Location Error Toast */}
      {locationError && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-50 border border-red-200 rounded-lg p-3 shadow-lg z-30">
          <div className="flex items-center gap-2 text-red-800">
            <MapPin className="h-4 w-4" />
            <span className="text-sm font-medium">{locationError}</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-red-600 hover:text-red-800"
              onClick={() => setLocationError(null)}
            >
              ×
            </Button>
          </div>
        </div>
      )}

      {/* Popup */}
      {showPopup && (
        <div
          className="absolute z-30 bg-white rounded-lg shadow-xl border p-4 w-64"
          style={{
            left: Math.min(popupPosition.x, mapSize.width - 280),
            top: Math.max(popupPosition.y - 200, 20),
          }}
        >
          {(() => {
            const babysitter = sortedBabysitters.find((b) => b.id === showPopup)
            if (!babysitter) return null

            return (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 h-6 w-6 p-0"
                  onClick={() => setShowPopup(null)}
                >
                  ×
                </Button>

                <div className="flex items-start gap-3 mb-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={babysitter.profile_image_url || "/placeholder.svg"}
                      alt={`${babysitter.first_name} ${babysitter.last_name}`}
                    />
                    <AvatarFallback>
                      {babysitter.first_name[0]}
                      {babysitter.last_name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">
                      {babysitter.first_name} {babysitter.last_name}
                    </h4>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{babysitter.rating}</span>
                      <span>({babysitter.review_count} reviews)</span>
                    </div>
                    <div className="text-lg font-semibold text-gray-900 mt-1">${babysitter.hourly_rate}/hour</div>
                    {babysitter.distance && (
                      <div className="flex items-center gap-1 text-sm text-blue-600 mt-1">
                        <MapPin className="h-3 w-3" />
                        <span>{babysitter.distance.toFixed(1)} miles away</span>
                      </div>
                    )}
                    {babysitter.travelTime && (
                      <div className="flex items-center gap-1 text-sm text-green-600">
                        <Clock className="h-3 w-3" />
                        <span>{babysitter.travelTime} drive</span>
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{babysitter.bio}</p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {babysitter.is_verified && (
                    <Badge variant="secondary" className="text-xs">
                      <Shield className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                  {babysitter.certifications.slice(0, 2).map((cert: string) => (
                    <Badge key={cert} variant="outline" className="text-xs">
                      {cert}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1" asChild>
                    <Link href={`/sitter/${babysitter.id}`}>View Profile</Link>
                  </Button>
                  <Button size="sm" variant="outline">
                    Message
                  </Button>
                </div>
              </>
            )
          })()}
        </div>
      )}

      {/* Map Attribution */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-2 text-xs text-gray-600 z-20">
        <div className="flex items-center gap-2">
          <MapPin className="h-3 w-3" />
          <span>
            {mapStyle === "standard" ? (
              <>
                ©{" "}
                <a
                  href="https://www.openstreetmap.org/copyright"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  OpenStreetMap
                </a>
              </>
            ) : (
              <>
                ©{" "}
                <a
                  href="https://www.esri.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Esri
                </a>
              </>
            )}
          </span>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Zoom: {Math.floor(zoom)} • {babysitters.length} babysitters shown
          {userLocation && <span> • Location enabled</span>}
        </div>
      </div>
    </div>
  )
}
