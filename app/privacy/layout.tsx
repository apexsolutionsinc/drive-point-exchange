import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Apex Auto Solutions Data Protection",
  description: "Privacy policy for Apex Auto Solutions Inc. Learn how we collect, use, and protect your personal information when using our auto financing services.",
  keywords: [
    "privacy policy",
    "data protection",
    "personal information",
    "auto financing privacy",
    "loan application privacy",
    "data security",
    "privacy rights",
    "information collection"
  ],
  openGraph: {
    title: "Privacy Policy - Apex Auto Solutions Data Protection",
    description: "Privacy policy for Apex Auto Solutions Inc. Learn how we collect, use, and protect your personal information.",
  },
  twitter: {
    title: "Privacy Policy - Apex Auto Solutions Data Protection",
    description: "Privacy policy for Apex Auto Solutions Inc. Learn how we collect, use, and protect your personal information.",
  },
  alternates: {
    canonical: "https://www.apexautosolutionsinc.com/privacy",
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
