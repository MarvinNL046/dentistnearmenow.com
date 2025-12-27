import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

// PWA Viewport configuration
export const viewport: Viewport = {
  themeColor: "#1A73E8",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  title: {
    default: "Dentist Near Me Now - Find Dentists & Dental Clinics in the USA",
    template: "%s | Dentist Near Me Now",
  },
  description: "Find dentists, dental clinics, and orthodontists near you. Search by state, city, or zip code. Get directions, contact info, and reviews for dental practices across the United States.",
  keywords: "dentist near me, dental clinic, orthodontist, family dentist, cosmetic dentist, emergency dentist, dental office, USA",
  authors: [{ name: "Dentist Near Me Now" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.dentistnearmenow.com",
    title: "Dentist Near Me Now - Find Dentists in the USA",
    description: "Find dentists, dental clinics, and orthodontists near you across the United States.",
    siteName: "Dentist Near Me Now",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dentist Near Me Now - Find Dentists in the USA",
    description: "Find dentists, dental clinics, and orthodontists near you across the United States.",
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
  alternates: {
    canonical: "https://www.dentistnearmenow.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Consent Mode - Must be set before AdSense loads */}
        <Script id="google-consent-mode" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'analytics_storage': 'denied',
              'functionality_storage': 'denied',
              'personalization_storage': 'denied',
              'wait_for_update': 500,
            });
          `}
        </Script>
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9667530069853985"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
