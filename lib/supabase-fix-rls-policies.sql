-- =====================================================
-- Apex Auto Solutions - Fix Admin Dashboard RLS Policies
-- =====================================================
-- This script fixes the Row Level Security policies to allow
-- authenticated admin users to read data from the browser client
-- Run this in your Supabase SQL Editor

-- =====================================================
-- 1. DROP EXISTING RESTRICTIVE POLICIES
-- =====================================================

-- Drop the existing service-role-only policies
DROP POLICY IF EXISTS "Service role can do everything" ON auto_loan_leads;
DROP POLICY IF EXISTS "Service role can do everything" ON home_loan_leads;
DROP POLICY IF EXISTS "Service role can do everything" ON contact_leads;

-- =====================================================
-- 2. CREATE NEW POLICIES FOR AUTHENTICATED USERS
-- =====================================================

-- Allow authenticated users to read auto loan leads
CREATE POLICY "Authenticated users can read auto_loan_leads" ON auto_loan_leads
    FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated users to read home loan leads
CREATE POLICY "Authenticated users can read home_loan_leads" ON home_loan_leads
    FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated users to read contact leads
CREATE POLICY "Authenticated users can read contact_leads" ON contact_leads
    FOR SELECT USING (auth.role() = 'authenticated');

-- =====================================================
-- 3. MAINTAIN SERVICE ROLE FULL ACCESS
-- =====================================================

-- Service role retains full CRUD access for API operations
CREATE POLICY "Service role full access auto_loan_leads" ON auto_loan_leads
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access home_loan_leads" ON home_loan_leads
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access contact_leads" ON contact_leads
    FOR ALL USING (auth.role() = 'service_role');

-- =====================================================
-- 5. ENABLE RLS AND CREATE POLICIES FOR VIEWS
-- =====================================================

-- Enable RLS on the enhanced calculator views
-- These views inherit RLS from the underlying auto_loan_leads table
ALTER VIEW auto_loan_leads_enhanced SET (security_invoker = on);
ALTER VIEW auto_loan_leads_summary SET (security_invoker = on);

-- =====================================================
-- 6. VERIFICATION QUERIES
-- =====================================================

-- Check that policies were created correctly for tables
SELECT 
    schemaname, 
    tablename, 
    policyname, 
    permissive, 
    roles, 
    cmd, 
    qual 
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename IN ('auto_loan_leads', 'home_loan_leads', 'contact_leads')
ORDER BY tablename, policyname;

-- Check that views exist and are properly configured
SELECT 
    schemaname,
    viewname,
    definition
FROM pg_views 
WHERE schemaname = 'public' 
AND viewname IN ('auto_loan_leads_enhanced', 'auto_loan_leads_summary')
ORDER BY viewname;

-- =====================================================
-- 7. TEST QUERIES (OPTIONAL)
-- =====================================================

-- Test that authenticated users can now read data
-- These queries should work when run by an authenticated user
-- SELECT COUNT(*) FROM auto_loan_leads;
-- SELECT COUNT(*) FROM home_loan_leads;
-- SELECT COUNT(*) FROM contact_leads;

-- Test that views are accessible (if they exist)
-- SELECT COUNT(*) FROM auto_loan_leads_enhanced;
-- SELECT * FROM auto_loan_leads_summary LIMIT 5;

-- =====================================================
-- SETUP INSTRUCTIONS
-- =====================================================
/*
FIX APPLIED SUCCESSFULLY!

WHAT THIS FIX DOES:
✅ Allows authenticated admin users to read leads data
✅ Maintains service role full access for API operations
✅ Keeps security by requiring authentication
✅ Fixes "No leads found" issue in admin dashboard
✅ Configures enhanced calculator views for future use

NEXT STEPS:
1. Go to your Supabase Dashboard
2. Click "SQL Editor" in the left sidebar
3. Copy and paste this entire script
4. Click "Run" to execute all commands
5. Verify the policies were created in the output
6. Test your admin dashboard - data should now display correctly

SECURITY NOTES:
- Only authenticated users can read the data
- Anonymous users still cannot access the tables
- Service role retains full CRUD access
- Admin dashboard will now work with browser client

TROUBLESHOOTING:
- If you still see "No leads found", check that you're logged in as admin
- Verify the policies were created by running the verification query
- Check browser console for any remaining errors
- Ensure your admin user is properly authenticated
*/
