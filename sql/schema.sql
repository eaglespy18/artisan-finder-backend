-- Drop tables if they already exist (for dev resets)
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS artisans CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- =====================
-- USERS TABLE
-- =====================
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user', -- can be 'user' or 'admin'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================
-- ARTISANS TABLE
-- =====================
CREATE TABLE artisans (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    skill VARCHAR(100) NOT NULL,
    location VARCHAR(150) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    experience VARCHAR(50),
    description TEXT,
    rating NUMERIC(2,1) DEFAULT 0.0,
    completed_jobs INT DEFAULT 0,
    avatar VARCHAR(255) DEFAULT '/placeholder.svg',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================
-- REVIEWS TABLE
-- =====================
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    artisan_id INT REFERENCES artisans(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) ON DELETE SET NULL,
    rating NUMERIC(2,1) NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================
-- SEED ADMIN USER
-- =====================
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM users WHERE email = 'admin@artisan.com') THEN
    INSERT INTO users (username, email, password, role)
    VALUES ('admin', 'admin@artisan.com', 'admin123', 'admin');
  END IF;
END $$;

-- ============
-- SEED ARTISANS
-- =============
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM artisans) THEN
    INSERT INTO artisans (name, skill, location, phone, experience, description, rating, completed_jobs, avatar)
    VALUES
      
      ('Samuel Ochieng', 'Carpenter', 'Nairobi, Kenya', '+254 712 345 678', '8 years', 'Experienced carpenter specializing in custom furniture, kitchen cabinets, and home renovations.', 4.8, 156, '/placeholder.svg'),
      ('Grace Wanjiku', 'Tailor', 'Kisumu, Kenya', '+254 723 456 789', '12 years', 'Professional tailor offering custom clothing, alterations, and traditional wear.', 4.9, 243, '/placeholder.svg'),
      ('John Mwangi', 'Plumber', 'Mombasa, Kenya', '+254 734 567 890', '6 years', 'Reliable plumber providing installation, repair, and maintenance services.', 4.7, 98, '/placeholder.svg'),
      ('Mary Akinyi', 'Mason', 'Eldoret, Kenya', '+254 745 678 901', '10 years', 'Skilled mason with expertise in construction, tile work, and decorative stonework.', 4.6, 134, '/placeholder.svg'),
      ('Peter Kimani', 'Mechanic', 'Nakuru, Kenya', '+254 756 789 012', '15 years', 'Experienced auto mechanic specializing in car repairs and diagnostics.', 4.8, 287, '/placeholder.svg'),
      ('Ruth Nyong''o', 'Electrician', 'Nairobi, Kenya', '+254 767 890 123', '7 years', 'Certified electrician providing electrical installation, repair, and maintenance services.', 4.7, 176, '/placeholder.svg'),
      ('Kwame Mensah', 'Painter', 'Accra, Ghana', '+233 24 123 4567', '9 years', 'Professional painter specializing in residential and commercial painting, wall finishes, and decorative designs.', 4.9, 202, '/placeholder.svg'),
      ('Ama Serwaa', 'Seamstress', 'Kumasi, Ghana', '+233 20 987 6543', '11 years', 'Talented seamstress skilled in kente styles, wedding gowns, and modern outfits.', 4.8, 310, '/placeholder.svg'),
      ('Yaw Boateng', 'Plumber', 'Takoradi, Ghana', '+233 26 765 4321', '7 years', 'Experienced plumber handling installations, leak repairs, and drainage solutions.', 4.6, 145, '/placeholder.svg'),
      ('Akosua Nyarko', 'Hairdresser', 'Cape Coast, Ghana', '+233 55 333 2211', '10 years', 'Professional hairdresser specializing in braids, natural hair, and bridal styling.', 4.9, 270, '/placeholder.svg'),
      ('Kofi Asante', 'Mason', 'Tamale, Ghana', '+233 27 888 9999', '14 years', 'Mason skilled in building projects, concrete works, and tiling.', 4.7, 190, '/placeholder.svg');
  END IF;
END $$;
