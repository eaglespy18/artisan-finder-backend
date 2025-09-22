-- sql/schema.sql

-- create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT now()
);

-- create artisans table
CREATE TABLE IF NOT EXISTS artisans (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  skill VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  phone VARCHAR(100),
  experience VARCHAR(100),
  description TEXT,
  rating NUMERIC(3,2),
  completed_jobs INTEGER DEFAULT 0,
  avatar VARCHAR(255)
);

-- create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  artisan_id INTEGER REFERENCES artisans(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- seed artisans (from your mock db.json)
INSERT INTO artisans (id, name, skill, location, phone, experience, description, rating, completed_jobs, avatar)
VALUES
(1, 'Samuel Ochieng', 'Carpenter', 'Nairobi, Kenya', '+254 712 345 678', '8 years', 'Experienced carpenter specializing in custom furniture, kitchen cabinets, and home renovations. Known for quality craftsmanship and timely delivery.', 4.8, 156, '/placeholder.svg'),
(2, 'Grace Wanjiku', 'Tailor', 'Kisumu, Kenya', '+254 723 456 789', '12 years', 'Professional tailor offering custom clothing, alterations, and traditional wear. Specializes in both modern and traditional African designs.', 4.9, 243, '/placeholder.svg'),
(3, 'John Mwangi', 'Plumber', 'Mombasa, Kenya', '+254 734 567 890', '6 years', 'Reliable plumber providing installation, repair, and maintenance services for residential and commercial properties. Available 24/7 for emergencies.', 4.7, 98, '/placeholder.svg'),
(4, 'Mary Akinyi', 'Mason', 'Eldoret, Kenya', '+254 745 678 901', '10 years', 'Skilled mason with expertise in construction, tile work, and decorative stonework. Has worked on numerous residential and commercial projects.', 4.6, 134, '/placeholder.svg'),
(5, 'Peter Kimani', 'Mechanic', 'Nakuru, Kenya', '+254 756 789 012', '15 years', 'Experienced auto mechanic specializing in car repairs, maintenance, and diagnostics. Works with all vehicle makes and models.', 4.8, 287, '/placeholder.svg'),
(6, 'Ruth Nyong''o', 'Electrician', 'Nairobi, Kenya', '+254 767 890 123', '7 years', 'Certified electrician providing electrical installation, repair, and maintenance services. Experienced in both residential and commercial electrical work.', 4.7, 176, '/placeholder.svg')
ON CONFLICT DO NOTHING;
