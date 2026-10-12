import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
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

const SITE_NAME = "Albany Airport Taxi and Limo Service";
const SITE_DESCRIPTION =
  "24/7 taxi, car, and limo service to and from Albany International Airport, JFK, LaGuardia, Newark, Boston Logan, and NYC.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: "%s | Albany Airport Taxi and Limo Service",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    title: { default: SITE_NAME, template: "%s | Albany Airport Taxi and Limo Service" },
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: { default: SITE_NAME, template: "%s | Albany Airport Taxi and Limo Service" },
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${spaceGrotesk.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <JsonLd data={organizationSchema()} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
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
