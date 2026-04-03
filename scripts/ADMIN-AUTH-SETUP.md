# Admin Authentication Setup

This document explains how to set up and use the admin authentication system for Apex Auto Solutions.

## Features

- **Magic Link Authentication**: Passwordless login via email
- **Password Authentication**: Traditional email/password login
- **Secure Session Management**: Handled by Supabase Auth
- **Admin Dashboard Access**: Protected admin routes

## Setup Instructions

### 1. Environment Variables

Make sure your `.env.local` file contains the required Supabase configuration:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 2. Create Admin Users

#### Option A: Using the Script (Recommended)

Run the interactive admin user creation script:

```bash
npm run create-admin
```

This will prompt you for:
- Email address
- Password (minimum 6 characters)
- Password confirmation

#### Option B: Command Line

Create an admin user directly:

```bash
npm run create-admin create admin@yourdomain.com yourpassword123
```

#### Option C: List Existing Admins

View all current admin users:

```bash
npm run list-admins
```

### 3. Access Admin Login

Navigate to `/auth/admin/login` in your browser.

You'll see two authentication options:

1. **Magic Link**: Enter your email and receive a secure login link
2. **Password**: Enter your email and password for immediate access

## Authentication Methods

### Magic Link Authentication

- **Pros**: 
  - No password to remember
  - Highly secure (link expires)
  - Works from any device
- **Cons**: 
  - Requires email access
  - Slight delay for email delivery

### Password Authentication

- **Pros**: 
  - Immediate access
  - Familiar login experience
  - Works offline (after initial setup)
- **Cons**: 
  - Password management required
  - Potential security risks if password is compromised

## Security Features

- **Row Level Security**: All database tables are protected
- **Service Role Access**: Only authenticated admin users can access data
- **Session Management**: Automatic token refresh and secure logout
- **Email Verification**: Admin users are auto-confirmed during creation

## Troubleshooting

### Common Issues

1. **"Invalid credentials" error**
   - Verify the email and password are correct
   - Check that the user was created successfully
   - Ensure the user is confirmed in Supabase Auth

2. **Magic link not received**
   - Check spam/junk folder
   - Verify SMTP configuration in environment variables
   - Check Supabase Auth logs for delivery issues

3. **"User not found" error**
   - Run `npm run list-admins` to verify user exists
   - Check Supabase Auth dashboard for user status
   - Recreate the user if necessary

4. **Admin dashboard shows "No leads found" but data exists in Supabase**
   - This is a Row Level Security (RLS) policy issue
   - The dashboard can't access data due to restrictive policies
   - **Solution**: Run the RLS fix script (see below)

### Row Level Security (RLS) Fix

If your admin dashboard shows "No leads found" even though data exists in your Supabase tables, you need to update the RLS policies:

1. **Go to your Supabase Dashboard**
2. **Click "SQL Editor" in the left sidebar**
3. **Copy and paste the contents of `lib/supabase-fix-rls-policies.sql`**
4. **Click "Run" to execute the script**
5. **Verify the policies were created successfully**

This fix will:
- Allow authenticated admin users to read leads data
- Maintain service role full access for API operations
- Keep security by requiring authentication
- Fix the "No leads found" issue in the admin dashboard

### Debugging Steps

1. Check environment variables are loaded correctly
2. Verify Supabase connection in browser console
3. Check Supabase Auth logs in dashboard
4. Test with a fresh admin user creation
5. **If dashboard shows no data**: Run the RLS fix script
6. **Check browser console**: Look for RLS policy errors
7. **Verify policies**: Run verification queries in Supabase SQL Editor

## API Endpoints

- `POST /api/auth/send-magic-link` - Send magic link email
- `POST /api/auth/signin` - Password authentication
- `GET /auth/callback` - Handle authentication callbacks

## Database Schema

Admin authentication uses Supabase Auth, which manages:
- User accounts and passwords
- Email verification
- Session tokens
- Security policies

The application data (leads, contacts) is stored in separate tables with Row Level Security policies that only allow access to authenticated admin users.

## Development Notes

- Admin users are created with `role: 'admin'` metadata
- All admin users are auto-confirmed during creation
- The system supports both authentication methods simultaneously
- Session management is handled automatically by Supabase
- Admin dashboard is protected by authentication middleware
