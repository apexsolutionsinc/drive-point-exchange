-- =====================================================
-- Apex Auto Solutions - Supabase Database Setup Scripts
-- =====================================================
-- Run these scripts in your Supabase SQL Editor
-- Order: Run scripts 1-4 first, then script 5 for admin user

-- =====================================================
-- 1. CREATE AUTO LOAN LEADS TABLE
-- =====================================================
CREATE TABLE auto_loan_leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    mobile_number TEXT,
    loan_amount NUMERIC NOT NULL,
    interest_rate NUMERIC NOT NULL,
    term_months INTEGER NOT NULL,
    vehicle_type TEXT NOT NULL,
    monthly_payment NUMERIC NOT NULL,
    total_cost NUMERIC NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE auto_loan_leads ENABLE ROW LEVEL SECURITY;

-- Create policy for service role (admin operations)
CREATE POLICY "Service role can do everything" ON auto_loan_leads
    FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- 2. CREATE HOME LOAN LEADS TABLE
-- =====================================================
CREATE TABLE home_loan_leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    mobile_number TEXT,
    home_price NUMERIC NOT NULL,
    down_payment NUMERIC NOT NULL,
    loan_amount NUMERIC NOT NULL,
    loan_term INTEGER NOT NULL,
    interest_rate NUMERIC NOT NULL,
    property_tax NUMERIC NOT NULL,
    home_insurance NUMERIC NOT NULL,
    pmi NUMERIC NOT NULL,
    monthly_payment NUMERIC NOT NULL,
    total_interest NUMERIC NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE home_loan_leads ENABLE ROW LEVEL SECURITY;

-- Create policy for service role (admin operations)
CREATE POLICY "Service role can do everything" ON home_loan_leads
    FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- 3. CREATE CONTACT LEADS TABLE
-- =====================================================
CREATE TABLE contact_leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    loan_type TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE contact_leads ENABLE ROW LEVEL SECURITY;

-- Create policy for service role (admin operations)
CREATE POLICY "Service role can do everything" ON contact_leads
    FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- 4. CREATE ADMIN USERS TABLE (OPTIONAL - FOR CUSTOM AUTH)
-- =====================================================
-- Note: This table is optional if using Supabase Auth
-- Remove this section if you're using Supabase Auth for admin login

-- CREATE TABLE admin_users (
--     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
--     email TEXT UNIQUE NOT NULL,
--     password_hash TEXT NOT NULL,
--     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
--     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
-- );

-- -- Enable Row Level Security
-- ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- -- Create policy for service role (admin operations)
-- CREATE POLICY "Service role can do everything" ON admin_users
--     FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- 5. INSERT DEFAULT ADMIN USER (REMOVED - USING SUPABASE AUTH)
-- =====================================================
-- Admin authentication is now handled by Supabase Auth
-- No need to pre-create admin users in database

-- =====================================================
-- 6. CREATE INDEXES FOR BETTER PERFORMANCE
-- =====================================================
-- Indexes for faster queries
CREATE INDEX idx_auto_loan_leads_email ON auto_loan_leads(email);
CREATE INDEX idx_auto_loan_leads_created_at ON auto_loan_leads(created_at);

CREATE INDEX idx_home_loan_leads_email ON home_loan_leads(email);
CREATE INDEX idx_home_loan_leads_created_at ON home_loan_leads(created_at);

CREATE INDEX idx_contact_leads_email ON contact_leads(email);
CREATE INDEX idx_contact_leads_created_at ON contact_leads(created_at);

-- CREATE INDEX idx_admin_users_email ON admin_users(email);

-- =====================================================
-- 7. VERIFICATION QUERIES
-- =====================================================
-- Run these to verify everything was created correctly:

-- Check tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('auto_loan_leads', 'home_loan_leads', 'contact_leads');

-- Check RLS policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE schemaname = 'public';

-- =====================================================
-- SETUP INSTRUCTIONS
-- =====================================================
/*
SETUP STEPS:
1. Go to your Supabase Dashboard
2. Click "SQL Editor" in the left sidebar
3. Copy and paste this entire script
4. Click "Run" to execute all commands
5. Verify the tables were created in the "Table Editor"
6. Admin login is handled by Supabase Auth (magic links enabled)
7. Access admin dashboard at /admin after authentication

SECURITY NOTES:
- Admin authentication is handled by Supabase Auth
- Magic links are enabled for secure login
- All tables have Row Level Security enabled
- Only service role can access the data
- Admin dashboard is protected by middleware

TROUBLESHOOTING:
- If you get permission errors, make sure you're using the service role key
- Check that RLS policies are created correctly
- Verify environment variables are set in .env file
*/
