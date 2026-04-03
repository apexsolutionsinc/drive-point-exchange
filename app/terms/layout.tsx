import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions - Apex Auto Solutions Legal Terms",
  description: "Terms and conditions for Apex Auto Solutions Inc auto financing services. Read our legal terms, disclaimers, and service agreements.",
  keywords: [
    "terms and conditions",
    "legal terms",
    "service agreement",
    "auto financing terms",
    "loan terms",
    "legal disclaimer",
    "terms of service",
    "user agreement"
  ],
  openGraph: {
    title: "Terms and Conditions - Apex Auto Solutions Legal Terms",
    description: "Terms and conditions for Apex Auto Solutions Inc auto financing services. Read our legal terms and service agreements.",
  },
  twitter: {
    title: "Terms and Conditions - Apex Auto Solutions Legal Terms",
    description: "Terms and conditions for Apex Auto Solutions Inc auto financing services.",
  },
  alternates: {
    canonical: "https://www.apexautosolutionsinc.com/terms",
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
