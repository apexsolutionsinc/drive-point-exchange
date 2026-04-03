-- Migration: TCPA Compliance & Agent Disclosure
-- Adds SMS consent tracking, IP/user-agent audit trail fields
-- Run against Supabase SQL editor

-- auto_loan_leads: add compliance fields (is_agent already exists)
ALTER TABLE auto_loan_leads ADD COLUMN IF NOT EXISTS sms_consent BOOLEAN DEFAULT FALSE;
ALTER TABLE auto_loan_leads ADD COLUMN IF NOT EXISTS sms_consent_at TIMESTAMPTZ NULL;
ALTER TABLE auto_loan_leads ADD COLUMN IF NOT EXISTS sms_consent_source VARCHAR(100) NULL;
ALTER TABLE auto_loan_leads ADD COLUMN IF NOT EXISTS ip_address TEXT NULL;
ALTER TABLE auto_loan_leads ADD COLUMN IF NOT EXISTS user_agent TEXT NULL;

-- home_loan_leads: add agent + compliance fields
ALTER TABLE home_loan_leads ADD COLUMN IF NOT EXISTS is_agent BOOLEAN DEFAULT FALSE;
ALTER TABLE home_loan_leads ADD COLUMN IF NOT EXISTS sms_consent BOOLEAN DEFAULT FALSE;
ALTER TABLE home_loan_leads ADD COLUMN IF NOT EXISTS sms_consent_at TIMESTAMPTZ NULL;
ALTER TABLE home_loan_leads ADD COLUMN IF NOT EXISTS sms_consent_source VARCHAR(100) NULL;
ALTER TABLE home_loan_leads ADD COLUMN IF NOT EXISTS ip_address TEXT NULL;
ALTER TABLE home_loan_leads ADD COLUMN IF NOT EXISTS user_agent TEXT NULL;
