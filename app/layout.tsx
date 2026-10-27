import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { AdPhoneProvider } from "@/components/AdPhoneProvider";
import { organizationSchema, SITE_URL } from "@/lib/schema";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Brand wordmark only (Header/Footer logo) — see globals.css's --font-logo.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const GA_MEASUREMENT_ID = "G-6102LQSZD2";

// Google Ads is sold under "US Limo and Taxi" (the real DBA — see
// lib/business.ts), so every page needs to show that name somewhere a Google
// Ads visitor actually sees it (ad-policy landing-page-match requirement,
// and basic trust: someone who clicked an ad for "US Limo and Taxi" shouldn't
// land on a page that only ever says "Albany Airport Taxi"). The title
// template carries it on every single page — and, happily, is shorter than
// the old suffix, so this is a net improvement for the title-length budget
// already tuned for the programmatic city/county pages, not a regression.
const SITE_NAME = "US Limo and Taxi – Albany Airport Taxi & Limo";
const TITLE_TEMPLATE = "%s | US Limo and Taxi";
const SITE_DESCRIPTION =
  "24/7 taxi, car, and limo service to and from Albany International Airport, JFK, LaGuardia, Newark, Boston Logan, and NYC.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: TITLE_TEMPLATE,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    title: { default: SITE_NAME, template: TITLE_TEMPLATE },
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: { default: SITE_NAME, template: TITLE_TEMPLATE },
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${spaceGrotesk.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <AdPhoneProvider>
          <JsonLd data={organizationSchema()} />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AdPhoneProvider>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
