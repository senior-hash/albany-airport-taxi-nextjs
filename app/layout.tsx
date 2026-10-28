import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { JsonLd } from "@/components/JsonLd";
import { AdPhoneProvider } from "@/components/AdPhoneProvider";
import { organizationSchema, SITE_URL } from "@/lib/schema";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Display/heading font — also the brand wordmark (Header/Footer logo). See
// globals.css's --font-display and --font-logo.
const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["800"],
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
    images: [
      {
        url: "/images/fleet/fleet-group-three-vehicles-1.jpg",
        width: 1600,
        height: 1200,
        alt: "US Limo and Taxi fleet vehicles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: { default: SITE_NAME, template: TITLE_TEMPLATE },
    description: SITE_DESCRIPTION,
    images: ["/images/fleet/fleet-group-three-vehicles-1.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${bricolageGrotesque.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <AdPhoneProvider>
          <JsonLd data={organizationSchema()} />
          <Header />
          <main className="flex-1">{children}</main>
          <div className="pb-20 lg:pb-0">
            <Footer />
          </div>
          <MobileStickyBar />
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
