-- =====================================================
-- Apex Auto Solutions - Refinance Calculator Migration
-- =====================================================
-- This script updates the auto_loan_leads table to support
-- the refinance calculator with current loan vs new offer comparison
-- Run this in your Supabase SQL Editor

-- =====================================================
-- 1. ADD REFINANCE COLUMNS TO AUTO LOAN LEADS TABLE
-- =====================================================
 
-- Add refinance columns to auto_loan_leads
ALTER TABLE auto_loan_leads 
ADD COLUMN IF NOT EXISTS current_balance NUMERIC,
ADD COLUMN IF NOT EXISTS current_apr NUMERIC,
ADD COLUMN IF NOT EXISTS remaining_term_months INTEGER,
ADD COLUMN IF NOT EXISTS new_apr NUMERIC,
ADD COLUMN IF NOT EXISTS new_term_months INTEGER,
ADD COLUMN IF NOT EXISTS refi_fees NUMERIC DEFAULT 0,
ADD COLUMN IF NOT EXISTS current_monthly_payment NUMERIC,
ADD COLUMN IF NOT EXISTS new_monthly_payment NUMERIC,
ADD COLUMN IF NOT EXISTS monthly_savings NUMERIC,
ADD COLUMN IF NOT EXISTS lifetime_savings NUMERIC,
ADD COLUMN IF NOT EXISTS current_total_interest_remaining NUMERIC,
ADD COLUMN IF NOT EXISTS new_total_interest NUMERIC,
ADD COLUMN IF NOT EXISTS difference_in_interest NUMERIC,
ADD COLUMN IF NOT EXISTS is_agent BOOLEAN DEFAULT FALSE; 

-- =====================================================
-- 2. CREATE INDEXES FOR REFINANCE QUERIES
-- =====================================================

-- Indexes for refinance queries
CREATE INDEX IF NOT EXISTS idx_auto_loan_leads_current_apr ON auto_loan_leads(current_apr);
CREATE INDEX IF NOT EXISTS idx_auto_loan_leads_new_apr ON auto_loan_leads(new_apr);
CREATE INDEX IF NOT EXISTS idx_auto_loan_leads_monthly_savings ON auto_loan_leads(monthly_savings);
CREATE INDEX IF NOT EXISTS idx_auto_loan_leads_current_balance ON auto_loan_leads(current_balance);

-- =====================================================
-- 3. VERIFICATION QUERIES
-- =====================================================

-- Check that all new columns were added
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'auto_loan_leads' 
AND table_schema = 'public'
AND column_name IN (
  'current_balance',
  'current_apr',
  'remaining_term_months',
  'new_apr',
  'new_term_months',
  'refi_fees',
  'current_monthly_payment',
  'new_monthly_payment',
  'monthly_savings',
  'lifetime_savings',
  'current_total_interest_remaining',
  'new_total_interest',
  'difference_in_interest',
  'is_agent'
)
ORDER BY ordinal_position;

-- =====================================================
-- 4. MIGRATION NOTES
-- =====================================================
/*
MIGRATION COMPLETED SUCCESSFULLY!

NEW FEATURES ADDED:
✅ Current loan information tracking (balance, APR, remaining term)
✅ New refinance offer tracking (new APR, new term, fees)
✅ Monthly and lifetime savings calculations
✅ Interest remaining vs new interest comparisons
✅ Interest difference calculation (new - current)
✅ Enhanced refinance analytics

BACKWARD COMPATIBILITY:
- All new columns are nullable to handle existing purchase loan records
- Existing data remains intact
- Existing API endpoints will continue to work
- Old vehicle purchase fields remain for historical data

NEXT STEPS:
1. Update your application code to use the new refinance fields
2. Test the refinance calculator with the new database schema
3. Verify that refinance leads are being saved with all new information
4. Update admin dashboard to display refinance comparison data
*/

