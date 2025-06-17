-- Insert sample users
INSERT INTO users (clerk_user_id, email, first_name, last_name, user_type) VALUES
('user_sample1', 'sarah.m@example.com', 'Sarah', 'Martinez', 'sitter'),
('user_sample2', 'jessica.l@example.com', 'Jessica', 'Lee', 'sitter'),
('user_sample3', 'emily.r@example.com', 'Emily', 'Rodriguez', 'sitter'),
('user_sample4', 'michael.j@example.com', 'Michael', 'Johnson', 'sitter')
ON CONFLICT (clerk_user_id) DO NOTHING;

-- Insert sample babysitters
INSERT INTO babysitters (
  user_id, 
  first_name, 
  last_name, 
  bio, 
  hourly_rate, 
  profile_image_url, 
  rating, 
  review_count, 
  location, 
  is_verified, 
  is_background_checked, 
  certifications, 
  availability_status
) VALUES
(
  (SELECT id FROM users WHERE clerk_user_id = 'user_sample1'),
  'Sarah',
  'M.',
  'Experienced nanny with 5+ years caring for children ages 2-12',
  18.00,
  '/placeholder.svg?height=200&width=300&text=Sarah M.',
  4.9,
  127,
  'Downtown Seattle',
  true,
  true,
  ARRAY['First Aid', 'CPR', 'Bilingual'],
  'available'
),
(
  (SELECT id FROM users WHERE clerk_user_id = 'user_sample2'),
  'Jessica',
  'L.',
  'Certified early childhood educator with a passion for child development',
  22.00,
  '/placeholder.svg?height=200&width=300&text=Jessica L.',
  4.8,
  89,
  'Capitol Hill',
  true,
  true,
  ARRAY['First Aid', 'CPR', 'Early Education'],
  'available'
),
(
  (SELECT id FROM users WHERE clerk_user_id = 'user_sample3'),
  'Emily',
  'R.',
  'Fun-loving babysitter who creates engaging activities for kids',
  16.00,
  '/placeholder.svg?height=200&width=300&text=Emily R.',
  4.7,
  64,
  'Fremont',
  true,
  false,
  ARRAY['CPR'],
  'busy'
),
(
  (SELECT id FROM users WHERE clerk_user_id = 'user_sample4'),
  'Michael',
  'J.',
  'Male babysitter with experience in sports and outdoor activities',
  20.00,
  '/placeholder.svg?height=200&width=300&text=Michael J.',
  4.6,
  45,
  'Ballard',
  true,
  true,
  ARRAY['First Aid', 'CPR', 'Sports Coach'],
  'available'
);
