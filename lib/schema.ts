import { BUSINESS } from "@/lib/content";

const SITE_URL = "https://albanyairport.taxi";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    "@id": `${SITE_URL}/#organization`,
    name: BUSINESS.name,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      addressLocality: BUSINESS.addressLocality,
      addressRegion: BUSINESS.addressRegion,
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
    // TripAdvisor and Instagram here too once those URLs are provided.
    sameAs: ["https://www.facebook.com/profile.php?id=100073627144127"] as string[],
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

export { SITE_URL };
