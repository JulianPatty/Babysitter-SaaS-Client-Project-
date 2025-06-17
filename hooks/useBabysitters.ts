"use client"

import { useState, useEffect } from "react"
import { supabase, isSupabaseConfigured, type Babysitter } from "@/lib/supabase"

// Mock data for when Supabase is not configured
const mockBabysitters: Babysitter[] = [
  {
    id: "1",
    user_id: "user1",
    first_name: "Sarah",
    last_name: "M.",
    bio: "Experienced nanny with 5+ years caring for children ages 2-12",
    hourly_rate: 18,
    profile_image_url: "/placeholder.svg?height=200&width=300&text=Sarah M.",
    rating: 4.9,
    review_count: 127,
    location: "Downtown Seattle",
    is_verified: true,
    is_background_checked: true,
    certifications: ["First Aid", "CPR", "Bilingual"],
    availability_status: "available",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    user_id: "user2",
    first_name: "Jessica",
    last_name: "L.",
    bio: "Certified early childhood educator with a passion for child development",
    hourly_rate: 22,
    profile_image_url: "/placeholder.svg?height=200&width=300&text=Jessica L.",
    rating: 4.8,
    review_count: 89,
    location: "Capitol Hill",
    is_verified: true,
    is_background_checked: true,
    certifications: ["First Aid", "CPR", "Early Education"],
    availability_status: "available",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "3",
    user_id: "user3",
    first_name: "Emily",
    last_name: "R.",
    bio: "Fun-loving babysitter who creates engaging activities for kids",
    hourly_rate: 16,
    profile_image_url: "/placeholder.svg?height=200&width=300&text=Emily R.",
    rating: 4.7,
    review_count: 64,
    location: "Fremont",
    is_verified: true,
    is_background_checked: false,
    certifications: ["CPR"],
    availability_status: "available",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "4",
    user_id: "user4",
    first_name: "Michael",
    last_name: "J.",
    bio: "Male babysitter with experience in sports and outdoor activities",
    hourly_rate: 20,
    profile_image_url: "/placeholder.svg?height=200&width=300&text=Michael J.",
    rating: 4.6,
    review_count: 45,
    location: "Ballard",
    is_verified: true,
    is_background_checked: true,
    certifications: ["First Aid", "CPR", "Sports Coach"],
    availability_status: "available",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
]

export function useBabysitters() {
  const [babysitters, setBabysitters] = useState<Babysitter[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchBabysitters() {
      try {
        setLoading(true)

        // Check if Supabase is configured
        if (!isSupabaseConfigured()) {
          console.warn("Supabase not configured, using mock data")
          // Simulate loading delay
          await new Promise((resolve) => setTimeout(resolve, 1000))
          setBabysitters(mockBabysitters)
          return
        }

        const { data, error } = await supabase
          .from("babysitters")
          .select("*")
          .eq("availability_status", "available")
          .eq("is_verified", true)
          .order("rating", { ascending: false })
          .limit(4)

        if (error) throw error

        setBabysitters(data || [])
      } catch (err) {
        console.error("Error fetching babysitters:", err)
        setError(err instanceof Error ? err.message : "An error occurred")
        // Fallback to mock data on error
        setBabysitters(mockBabysitters)
      } finally {
        setLoading(false)
      }
    }

    fetchBabysitters()
  }, [])

  return { babysitters, loading, error }
}
