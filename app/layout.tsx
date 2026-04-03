import type { Metadata } from "next";
import { Saira, Outfit } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "../lib/i18n/context";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CookieConsent } from "@/components/CookieConsent";
import { ConsentScripts } from "@/components/ConsentScripts";

const isProduction = process.env.NODE_ENV === 'production';

const saira = Saira({
  subsets: ["latin"],
  variable: "--font-saira",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.apexautosolutionsinc.com'),
  title: {
    default: "Apex Auto Solutions Inc - Auto Loan Calculator & Refinancing",
    template: "%s | Apex Auto Solutions Inc"
  },
  description: "Get instant auto loan estimates with state-specific tax calculations. Competitive rates, fast approval, and exceptional service. Auto refinancing and comprehensive vehicle coverage.",
  keywords: [
    "auto loans",
    "car financing", 
    "vehicle loans",
    "auto financing",
    "car loans",
    "refinancing",
    "auto refinance",
    "vehicle coverage",
    "vehicle coverage certifications",
    "home refinance",
    "insurance consultation",
    "Detroit auto loans",
    "Michigan car financing"
  ],
  authors: [{ name: "Apex Auto Solutions Inc" }],
  creator: "Apex Auto Solutions Inc",
  publisher: "Apex Auto Solutions Inc",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.apexautosolutionsinc.com",
    siteName: "Apex Auto Solutions Inc",
    title: "Apex Auto Solutions Inc - Auto Loan Calculator & Refinancing",
    description: "Get instant auto loan estimates with state-specific tax calculations. Competitive rates, fast approval, and exceptional service.",
    images: [
      {
        url: "/auto/car-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Apex Auto Solutions - Professional auto financing consultation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apex Auto Solutions Inc - Auto Loan Calculator & Refinancing",
    description: "Get instant auto loan estimates with state-specific tax calculations. Competitive rates, fast approval, and exceptional service.",
    images: ["/auto/car-hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  alternates: {
    canonical: "https://www.apexautosolutionsinc.com",
  },
  category: "finance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Apex Auto Solutions Inc",
    "url": "https://www.apexautosolutionsinc.com",
    "logo": "https://www.apexautosolutionsinc.com/logo-apex.png",
    "description": "Professional auto financing solutions including auto loans, refinancing, and vehicle coverage services.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "211 W Wacker Drive Suite 120",
      "addressLocality": "Chicago",
      "addressRegion": "IL",
      "postalCode": "60606",
      "addressCountry": "US"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-888-990-7112",
      "contactType": "customer service",
      "email": "support@apexautosolutionsinc.com",
      "availableLanguage": ["English", "Spanish", "Polish", "Italian", "French"]
    },
    "sameAs": [
      "https://www.facebook.com/apexautosolutions",
      "https://www.twitter.com/apexautosolutions",
      "https://www.linkedin.com/company/apexautosolutions"
    ],
    "foundingDate": "2012",
    "numberOfEmployees": "50-100",
    "areaServed": "United States",
    "serviceType": [
      "Auto Loan Refinancing",
      "Vehicle Coverage",
      "Vehicle Coverage Certifications",
      "Home Refinancing",
      "Insurance Consultation"
    ]
  };

  return (
    <html lang="en-US">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#1a2744" />
      </head>
      <body className={`${saira.variable} ${outfit.variable} font-outfit antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:bg-white focus:text-apex-navy focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg focus:font-semibold focus:text-sm focus:ring-2 focus:ring-apex-blue focus:outline-none"
        >
          Skip to main content
        </a>
        <I18nProvider>
          <main id="main-content">
            {children}
          </main>
        </I18nProvider>
        <ConsentScripts />
        <CookieConsent />
        {isProduction && <Analytics />}
        {isProduction && <SpeedInsights />}
      </body>
    </html>
  );
}
