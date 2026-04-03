# Drive Point Exchange

Modern auto financing website with loan calculators, lead capture, and admin dashboard.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Database:** Supabase (PostgreSQL + Auth + RLS)
- **Email:** Nodemailer (Gmail SMTP) / Resend
- **Deployment:** Vercel

## Features

- Auto & Home Loan calculators with real-time estimates and state-specific tax calculations
- Lead capture with automated email notifications to customers and business owners
- Secure admin dashboard with authentication, lead management, and CSV export
- Multi-language support (English, Spanish, Polish, Italian, French)
- SEO optimized with structured data, sitemap, and proper meta tags
- Fully responsive mobile-first design
- Social media feed integration (Instagram, TikTok, Facebook, YouTube)
- Cookie consent and GDPR compliance
- Trustpilot review widget

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment template and configure
cp .env.example .env.local

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

See `.env.example` for all required environment variables.

### Database Setup

Run the SQL scripts in `lib/` against your Supabase project:
1. `supabase-setup.sql` — initial schema
2. `supabase-migration-enhanced-calculator.sql` — calculator features
3. `supabase-fix-rls-policies.sql` — Row Level Security policies

### Admin Dashboard

```bash
npm run create-admin    # Create admin user
npm run list-admins     # List existing admins
```

Access at `/admin` after authentication.

## Project Structure

```
app/
├── (home)/          # Landing page with hero + calculator
├── calculator/      # Auto & Home loan calculators
├── services/        # Service descriptions
├── benefits/        # Why choose Drive Point Exchange
├── about-us/        # Company info + team
├── contact/         # Contact form
├── admin/           # Protected lead management dashboard
├── auth/            # Authentication flows
└── api/             # Email, auth, and admin API routes
components/
├── Navigation.tsx
├── Footer.tsx
├── LoanCalculator.tsx
├── HomeLoanCalculator.tsx
├── SocialFeed.tsx
├── TrustpilotReviews.tsx
└── calculator/      # Calculator sub-components
lib/
├── supabase.ts      # Supabase client
├── mailer.ts        # Email service
├── email-templates.ts
├── i18n/            # Internationalization
└── *.sql            # Database migrations
translations/        # en, es, fr, it, pl
public/              # Logo, images, favicon
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run create-admin` | Create admin user |
| `npm run list-admins` | List admin users |

## Deployment

Connected to Vercel — auto-deploys on push to `main`. Set all environment variables in the Vercel dashboard.
