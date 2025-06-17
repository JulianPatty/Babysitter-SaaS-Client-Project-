-- Create users table to sync with Clerk
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  clerk_user_id TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  user_type TEXT CHECK (user_type IN ('parent', 'sitter')) DEFAULT 'parent',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create babysitters table
CREATE TABLE IF NOT EXISTS babysitters (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  bio TEXT,
  hourly_rate DECIMAL(10,2) NOT NULL,
  profile_image_url TEXT,
  rating DECIMAL(3,2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  location TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  is_background_checked BOOLEAN DEFAULT FALSE,
  certifications TEXT[] DEFAULT '{}',
  availability_status TEXT CHECK (availability_status IN ('available', 'busy', 'offline')) DEFAULT 'available',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_babysitters_user_id ON babysitters(user_id);
CREATE INDEX IF NOT EXISTS idx_babysitters_location ON babysitters(location);
CREATE INDEX IF NOT EXISTS idx_babysitters_availability ON babysitters(availability_status);
CREATE INDEX IF NOT EXISTS idx_babysitters_rating ON babysitters(rating DESC);
CREATE INDEX IF NOT EXISTS idx_users_clerk_id ON users(clerk_user_id);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE babysitters ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (auth.uid()::text = clerk_user_id);

CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (auth.uid()::text = clerk_user_id);

-- Create policies for babysitters table
CREATE POLICY "Anyone can view babysitters" ON babysitters
  FOR SELECT USING (true);

CREATE POLICY "Babysitters can update their own profile" ON babysitters
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = babysitters.user_id 
      AND users.clerk_user_id = auth.uid()::text
    )
  );
