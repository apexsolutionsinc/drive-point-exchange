import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auto Loan Calculator & Refinancing Services",
  description: "Get instant auto loan estimates with our free calculator. Lower rates, flexible terms, fast approval. Auto refinancing and comprehensive vehicle coverage services.",
  keywords: [
    "auto loan calculator",
    "car loan calculator", 
    "auto refinancing",
    "car financing rates",
    "vehicle loan calculator",
    "auto loan pre approval",
    "Detroit auto loans",
    "Michigan car financing"
  ],
  openGraph: {
    title: "Auto Loan Calculator & Refinancing Services | Apex Auto Solutions",
    description: "Get instant auto loan estimates with our free calculator. Lower rates, flexible terms, fast approval.",
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
    title: "Auto Loan Calculator & Refinancing Services",
    description: "Get instant auto loan estimates with our free calculator. Lower rates, flexible terms, fast approval.",
  },
  alternates: {
    canonical: "https://www.apexautosolutionsinc.com",
  },
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
