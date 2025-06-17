import { createClient } from "@supabase/supabase-js"

// Check if environment variables are available
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl) {
  console.warn("NEXT_PUBLIC_SUPABASE_URL is not set. Supabase features will be disabled.")
}

if (!supabaseAnonKey) {
  console.warn("NEXT_PUBLIC_SUPABASE_ANON_KEY is not set. Supabase features will be disabled.")
}

// Create a mock client if environment variables are missing
const createMockClient = () => ({
  from: () => ({
    select: () => ({
      eq: () => ({
        eq: () => ({
          order: () => ({
            limit: () => Promise.resolve({ data: [], error: null }),
          }),
        }),
      }),
    }),
    insert: () => Promise.resolve({ data: null, error: null }),
    update: () => ({
      eq: () => Promise.resolve({ data: null, error: null }),
    }),
    delete: () => ({
      eq: () => Promise.resolve({ data: null, error: null }),
    }),
  }),
})

export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : (createMockClient() as any)

// Database types
export interface Babysitter {
  id: string
  user_id: string
  first_name: string
  last_name: string
  bio: string
  hourly_rate: number
  profile_image_url: string
  rating: number
  review_count: number
  location: string
  is_verified: boolean
  is_background_checked: boolean
  certifications: string[]
  availability_status: "available" | "busy" | "offline"
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  clerk_user_id: string
  email: string
  first_name: string
  last_name: string
  user_type: "parent" | "sitter"
  created_at: string
  updated_at: string
}

// Helper function to check if Supabase is configured
export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey)
}
