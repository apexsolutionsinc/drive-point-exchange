# Enhanced Calculator Database Migration

This document explains how to update your Supabase database to support the enhanced auto loan calculator with credit score, state tax, and vehicle factors.

## 🚀 Quick Start

1. **Run the Migration Script**
   - Go to your Supabase Dashboard
   - Navigate to SQL Editor
   - Copy and paste the contents of `supabase-migration-enhanced-calculator.sql`
   - Click "Run" to execute the migration

2. **Verify the Migration**
   - Check that new columns were added to `auto_loan_leads` table
   - Verify the enhanced views were created
   - Test the admin dashboard with new data

## 📊 What's New

### Enhanced Auto Loan Calculator Features

✅ **Credit Score Integration**
- Automatic interest rate calculation based on credit tiers
- Visual credit score badges in admin dashboard
- Credit score range tracking (720+, 680-719, etc.)

✅ **State Sales Tax Calculation**
- Automatic sales tax calculation by state
- State-specific tax rate tracking
- Location-based lead analytics

✅ **Vehicle Information Tracking**
- Vehicle price, year, and category
- Down payment and trade-in value
- Vehicle type (new/used) with age-based rate adjustments

✅ **Enhanced Financial Calculations**
- Total interest tracking
- Sales tax breakdown
- Comprehensive loan cost analysis

### New Database Fields

| Field | Type | Description |
|-------|------|-------------|
| `vehicle_price` | NUMERIC | Original vehicle price |
| `down_payment` | NUMERIC | Customer's down payment |
| `trade_in_value` | NUMERIC | Trade-in vehicle value |
| `sales_tax` | NUMERIC | Calculated sales tax amount |
| `sales_tax_rate` | NUMERIC | State sales tax rate |
| `state_code` | TEXT | Two-letter state code |
| `state_name` | TEXT | Full state name |
| `vehicle_year` | INTEGER | Year of the vehicle |
| `vehicle_category` | TEXT | Vehicle category (sedan, SUV, etc.) |
| `credit_score_tier` | TEXT | Credit score tier (excellent, good, etc.) |
| `credit_score_range` | TEXT | Credit score range (720+, 680-719, etc.) |
| `total_interest` | NUMERIC | Total interest over loan term |
| `total_cost` | NUMERIC | Total cost of the loan |
| `is_manual_rate` | BOOLEAN | Whether rate was manually adjusted |

### Enhanced Views

✅ **`auto_loan_leads_enhanced`**
- Comprehensive view with all lead details
- Calculated fields (down payment %, loan-to-value ratio)
- Lead age tracking

✅ **`auto_loan_leads_summary`**
- Analytics view for dashboard
- Credit score distribution
- Vehicle type and state analytics
- Average loan metrics

## 🔧 Migration Steps

### Step 1: Backup Your Data
```sql
-- Create a backup of existing data
CREATE TABLE auto_loan_leads_backup AS 
SELECT * FROM auto_loan_leads;
```

### Step 2: Run the Migration
Execute the migration script in Supabase SQL Editor.

### Step 3: Verify Migration
```sql
-- Check new columns exist
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'auto_loan_leads' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Test the enhanced view
SELECT * FROM auto_loan_leads_enhanced LIMIT 5;

-- Check summary statistics
SELECT * FROM auto_loan_leads_summary LIMIT 10;
```

## 📈 Admin Dashboard Updates

The admin dashboard now displays:

- **Enhanced Lead Table**: Shows vehicle details, credit scores, and state information
- **Credit Score Badges**: Color-coded credit score indicators
- **Vehicle Information**: Year, category, and type details
- **Financial Breakdown**: Down payment, sales tax, and total costs
- **State Analytics**: Lead distribution by state

## 🔒 Data Validation

The migration includes data validation constraints:

- Credit score tiers must be valid values
- Vehicle categories must be from predefined list
- Vehicle years must be realistic (1990 to current year + 1)
- Proper indexing for performance

## 🚨 Important Notes

### Backward Compatibility
- All existing data remains intact
- New columns are nullable to handle existing records
- Existing API endpoints continue to work
- Gradual migration of old data is possible

### Performance
- New indexes added for better query performance
- Views optimized for dashboard analytics
- Proper constraints prevent invalid data

### Security
- Row Level Security (RLS) policies remain intact
- Service role permissions preserved
- No security vulnerabilities introduced

## 🐛 Troubleshooting

### Common Issues

**Migration Fails**
- Check that you have service role permissions
- Verify all required environment variables are set
- Ensure RLS policies are properly configured

**Data Not Appearing**
- Check that new columns were added successfully
- Verify the enhanced views were created
- Test with sample data insertion

**Admin Dashboard Issues**
- Clear browser cache
- Check that TypeScript types are updated
- Verify API endpoints are working

### Support

If you encounter issues:
1. Check the Supabase logs for errors
2. Verify environment variables
3. Test with sample data
4. Contact support if needed

## 📋 Post-Migration Checklist

- [ ] Migration script executed successfully
- [ ] New columns added to `auto_loan_leads` table
- [ ] Enhanced views created (`auto_loan_leads_enhanced`, `auto_loan_leads_summary`)
- [ ] Indexes created for performance
- [ ] Admin dashboard updated with new columns
- [ ] Email templates updated with enhanced data
- [ ] Calculator tested with new fields
- [ ] Sample lead created and verified

## 🎯 Next Steps

After successful migration:

1. **Test the Enhanced Calculator**
   - Use the calculator with various credit scores
   - Test different states and vehicle types
   - Verify email templates include new data

2. **Update Admin Workflows**
   - Train staff on new lead information
   - Update follow-up processes
   - Leverage enhanced analytics

3. **Monitor Performance**
   - Check query performance
   - Monitor lead conversion rates
   - Analyze credit score distributions

---

**Migration completed successfully!** 🎉

Your enhanced calculator is now ready to provide more accurate loan estimates with comprehensive lead tracking.
