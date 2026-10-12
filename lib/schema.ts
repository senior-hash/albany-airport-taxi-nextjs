import { BUSINESS } from "@/lib/content";
import { SOCIAL } from "@/lib/business";

const SITE_URL = "https://albanyairport.taxi";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["TaxiService", "Organization"],
    "@id": `${SITE_URL}/#organization`,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    alternateName: BUSINESS.dba,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.streetAddress,
      addressLocality: BUSINESS.addressLocality,
      addressRegion: BUSINESS.addressRegion,
      postalCode: BUSINESS.postalCode,
      addressCountry: "US",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    areaServed: {
      "@type": "State",
      name: ["New York", "Massachusetts", "Vermont"],
    },
    // Real social/review profile URLs (see plan: Trust Signals). Add
    // Instagram here too once that URL is provided.
    sameAs: [SOCIAL.facebook, SOCIAL.tripadvisor, SOCIAL.yelp] as string[],
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  areaServedName: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: opts.name,
    description: opts.description,
    url: `${SITE_URL}${opts.url}`,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: {
      "@type": "Place",
      name: opts.areaServedName,
    },
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export { SITE_URL };
