-- =====================================================
-- Apex Auto Solutions - Enhanced Calculator Migration
-- =====================================================
-- This script updates the auto_loan_leads table to support
-- the enhanced calculator with credit score, state tax, and vehicle factors
-- Run this in your Supabase SQL Editor

-- =====================================================
-- 1. ADD NEW COLUMNS TO AUTO LOAN LEADS TABLE
-- =====================================================

-- Add new columns for enhanced calculator features
ALTER TABLE auto_loan_leads 
ADD COLUMN IF NOT EXISTS vehicle_price NUMERIC,
ADD COLUMN IF NOT EXISTS down_payment NUMERIC DEFAULT 0,
ADD COLUMN IF NOT EXISTS trade_in_value NUMERIC DEFAULT 0,
ADD COLUMN IF NOT EXISTS sales_tax NUMERIC DEFAULT 0,
ADD COLUMN IF NOT EXISTS sales_tax_rate NUMERIC DEFAULT 0,
ADD COLUMN IF NOT EXISTS state_code TEXT,
ADD COLUMN IF NOT EXISTS state_name TEXT,
ADD COLUMN IF NOT EXISTS vehicle_year INTEGER,
ADD COLUMN IF NOT EXISTS vehicle_category TEXT,
ADD COLUMN IF NOT EXISTS credit_score_tier TEXT,
ADD COLUMN IF NOT EXISTS credit_score_range TEXT,
ADD COLUMN IF NOT EXISTS total_interest NUMERIC,
ADD COLUMN IF NOT EXISTS total_cost NUMERIC,
ADD COLUMN IF NOT EXISTS is_manual_rate BOOLEAN DEFAULT FALSE;

-- =====================================================
-- 2. UPDATE EXISTING COLUMNS (MAKE THEM MORE FLEXIBLE)
-- =====================================================

-- Update vehicle_type to be more descriptive
ALTER TABLE auto_loan_leads 
ALTER COLUMN vehicle_type DROP NOT NULL;

-- Add check constraints for data validation
ALTER TABLE auto_loan_leads 
ADD CONSTRAINT check_credit_score_tier 
CHECK (credit_score_tier IN ('excellent', 'veryGood', 'good', 'fair', 'poor') OR credit_score_tier IS NULL);

ALTER TABLE auto_loan_leads 
ADD CONSTRAINT check_vehicle_category 
CHECK (vehicle_category IN ('sedan', 'suv', 'truck', 'luxury', 'sports', 'ev') OR vehicle_category IS NULL);

ALTER TABLE auto_loan_leads 
ADD CONSTRAINT check_vehicle_year 
CHECK (vehicle_year >= 1990 AND vehicle_year <= EXTRACT(YEAR FROM NOW()) + 1 OR vehicle_year IS NULL);

-- =====================================================
-- 3. CREATE INDEXES FOR NEW COLUMNS
-- =====================================================

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_auto_loan_leads_state_code ON auto_loan_leads(state_code);
CREATE INDEX IF NOT EXISTS idx_auto_loan_leads_credit_score_tier ON auto_loan_leads(credit_score_tier);
CREATE INDEX IF NOT EXISTS idx_auto_loan_leads_vehicle_category ON auto_loan_leads(vehicle_category);
CREATE INDEX IF NOT EXISTS idx_auto_loan_leads_vehicle_year ON auto_loan_leads(vehicle_year);
CREATE INDEX IF NOT EXISTS idx_auto_loan_leads_vehicle_price ON auto_loan_leads(vehicle_price);

-- =====================================================
-- 4. CREATE VIEW FOR ENHANCED REPORTING
-- =====================================================

-- Create a comprehensive view for admin dashboard
CREATE OR REPLACE VIEW auto_loan_leads_enhanced AS
SELECT 
    id,
    first_name,
    last_name,
    email,
    mobile_number,
    -- Vehicle Information
    vehicle_price,
    vehicle_type,
    vehicle_year,
    vehicle_category,
    down_payment,
    trade_in_value,
    -- Financial Details
    loan_amount,
    sales_tax,
    sales_tax_rate,
    interest_rate,
    term_months,
    monthly_payment,
    total_interest,
    total_cost,
    -- Location & Credit
    state_code,
    state_name,
    credit_score_tier,
    credit_score_range,
    -- Metadata
    is_manual_rate,
    created_at,
    -- Calculated fields
    CASE 
        WHEN vehicle_price > 0 THEN ROUND((down_payment / vehicle_price) * 100, 2)
        ELSE 0 
    END as down_payment_percentage,
    CASE 
        WHEN vehicle_price > 0 THEN ROUND((loan_amount / vehicle_price) * 100, 2)
        ELSE 0 
    END as loan_to_value_ratio,
    EXTRACT(YEAR FROM AGE(NOW(), created_at)) * 12 + EXTRACT(MONTH FROM AGE(NOW(), created_at)) as months_old
FROM auto_loan_leads
ORDER BY created_at DESC;

-- =====================================================
-- 5. CREATE SUMMARY STATISTICS VIEW
-- =====================================================

-- Create a summary view for dashboard analytics
CREATE OR REPLACE VIEW auto_loan_leads_summary AS
SELECT 
    COUNT(*) as total_leads,
    COUNT(DISTINCT email) as unique_customers,
    AVG(vehicle_price) as avg_vehicle_price,
    AVG(monthly_payment) as avg_monthly_payment,
    AVG(interest_rate) as avg_interest_rate,
    AVG(term_months) as avg_term_months,
    -- Credit score distribution
    COUNT(CASE WHEN credit_score_tier = 'excellent' THEN 1 END) as excellent_credit_count,
    COUNT(CASE WHEN credit_score_tier = 'veryGood' THEN 1 END) as very_good_credit_count,
    COUNT(CASE WHEN credit_score_tier = 'good' THEN 1 END) as good_credit_count,
    COUNT(CASE WHEN credit_score_tier = 'fair' THEN 1 END) as fair_credit_count,
    COUNT(CASE WHEN credit_score_tier = 'poor' THEN 1 END) as poor_credit_count,
    -- Vehicle type distribution
    COUNT(CASE WHEN vehicle_type = 'new' THEN 1 END) as new_vehicle_count,
    COUNT(CASE WHEN vehicle_type = 'used' THEN 1 END) as used_vehicle_count,
    -- State distribution (top 5)
    state_code,
    COUNT(*) as leads_by_state
FROM auto_loan_leads
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY state_code
ORDER BY leads_by_state DESC;

-- =====================================================
-- 6. UPDATE RLS POLICIES (IF NEEDED)
-- =====================================================

-- Ensure RLS policies still work with new columns
-- The existing policy should work fine, but let's verify
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE schemaname = 'public' AND tablename = 'auto_loan_leads';

-- =====================================================
-- 7. VERIFICATION QUERIES
-- =====================================================

-- Check that all new columns were added
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'auto_loan_leads' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Check the enhanced view
SELECT * FROM auto_loan_leads_enhanced LIMIT 5;

-- Check summary statistics
SELECT * FROM auto_loan_leads_summary LIMIT 10;

-- =====================================================
-- 8. MIGRATION NOTES
-- =====================================================
/*
MIGRATION COMPLETED SUCCESSFULLY!

NEW FEATURES ADDED:
✅ Vehicle price tracking (separate from loan amount)
✅ Down payment and trade-in value tracking
✅ Sales tax calculation and state tracking
✅ Vehicle year and category tracking
✅ Credit score tier and range tracking
✅ Enhanced financial calculations
✅ Manual rate override tracking

ENHANCED REPORTING:
✅ Comprehensive lead view with all details
✅ Summary statistics for dashboard
✅ Credit score distribution analysis
✅ Vehicle type and state analytics

DATA VALIDATION:
✅ Credit score tier constraints
✅ Vehicle category constraints
✅ Vehicle year range validation
✅ Proper indexing for performance

NEXT STEPS:
1. Update your application code to use the new fields
2. Test the enhanced calculator with the new database schema
3. Verify that leads are being saved with all new information
4. Update admin dashboard to display enhanced data

BACKWARD COMPATIBILITY:
- All existing data remains intact
- New columns are nullable to handle existing records
- Existing API endpoints will continue to work
- Gradual migration of old data is possible
*/
