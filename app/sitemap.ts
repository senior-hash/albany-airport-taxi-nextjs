import type { MetadataRoute } from "next";
import { getAirports, getCounties, getCities, getCars, getAllBlogPosts } from "@/lib/content";
import { getVenues } from "@/lib/venues";
import { getDestinations } from "@/lib/long-distance-destinations";
import { getAllTownHubs, getTownHub } from "@/lib/town-hubs";
import { hasRealCityDetail } from "@/scripts/lib/meta";
import { SITE_URL } from "@/lib/schema";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const airports = getAirports();
  const counties = getCounties();
  const cities = getCities();
  const cars = getCars();
  const posts = getAllBlogPosts();
  const venues = getVenues();
  const destinations = getDestinations();

  const staticUrls: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/` },
    { url: `${SITE_URL}/airport-taxi` },
    { url: `${SITE_URL}/cars` },
    { url: `${SITE_URL}/blog` },
    { url: `${SITE_URL}/about` },
    { url: `${SITE_URL}/privacy` },
    { url: `${SITE_URL}/contact` },
    { url: `${SITE_URL}/venues` },
    { url: `${SITE_URL}/service-area` },
    { url: `${SITE_URL}/hudson-valley` },
    { url: `${SITE_URL}/long-distance` },
    { url: `${SITE_URL}/long-distance/albany-to-nyc` },
    { url: `${SITE_URL}/long-distance/albany-to-nyc/vs-train-and-bus` },
    { url: `${SITE_URL}/long-distance/bennington-to-nyc` },
    { url: `${SITE_URL}/long-distance/williamstown-to-boston` },
    { url: `${SITE_URL}/long-distance/kingston-to-nyc` },
    { url: `${SITE_URL}/long-distance/saratoga-springs-to-nyc-airports` },
    { url: `${SITE_URL}/long-distance/pittsfield-to-bradley` },
    { url: `${SITE_URL}/services/non-emergency-medical-transportation` },
    { url: `${SITE_URL}/services/courier` },
    { url: `${SITE_URL}/services/wedding` },
    { url: `${SITE_URL}/services/corporate` },
    { url: `${SITE_URL}/services/airbnb-transportation` },
    { url: `${SITE_URL}/services/recovery-transportation` },
    { url: `${SITE_URL}/taxi-vs-uber-lyft` },
    { url: `${SITE_URL}/jfk-shuttle-vs-private-car` },
    { url: `${SITE_URL}/licensed-and-insured` },
    { url: `${SITE_URL}/cancellation-and-changes` },
    { url: `${SITE_URL}/payment` },
    { url: `${SITE_URL}/safety` },
    { url: `${SITE_URL}/college-rides` },
    { url: `${SITE_URL}/college-rides/williams` },
    { url: `${SITE_URL}/college-rides/cornell-ithaca` },
    { url: `${SITE_URL}/medical-rides` },
    { url: `${SITE_URL}/local-rides` },
    { url: `${SITE_URL}/airport-rides` },
  ];

  const airportUrls: MetadataRoute.Sitemap = airports.map((a) => ({
    url: `${SITE_URL}/airport-taxi/${a.slug}`,
  }));

  // A city page belongs in the sitemap only if it's indexable (real local
  // content, not noindexed) AND self-canonical. Once its town hub passes
  // the quality gate, canonical moves to /towns/{slug} (added below) and
  // this URL drops out — but a city with real content whose hub hasn't
  // qualified yet (or has no hub data at all) still canonicals to itself
  // and still belongs here. See the matching logic in the city page's
  // generateMetadata ([airportSlug]/[placeSlug]/page.tsx).
  const selfCanonicalCities = cities.filter((c) => {
    if (!hasRealCityDetail(c.detailHtml)) return false;
    return getTownHub(c.slug)?.qualifies !== true;
  });

  const placeUrls: MetadataRoute.Sitemap = [];
  for (const airport of airports) {
    for (const county of counties) {
      placeUrls.push({ url: `${SITE_URL}/airport-taxi/${airport.slug}/${county.slug}` });
    }
    for (const city of selfCanonicalCities) {
      placeUrls.push({ url: `${SITE_URL}/airport-taxi/${airport.slug}/${city.slug}` });
    }
  }

  // Town hub pages: only the ones that passed the quality gate (real
  // airport drive times plus at least 2 non-empty place groups) go in the
  // sitemap — the rest stay noindex, live but unlisted.
  const townHubUrls: MetadataRoute.Sitemap = getAllTownHubs()
    .filter((t) => t.qualifies)
    .map((t) => ({ url: `${SITE_URL}/towns/${t.slug}` }));

  const carUrls: MetadataRoute.Sitemap = cars.map((c) => ({ url: `${SITE_URL}/cars/${c.slug}` }));
  const postUrls: MetadataRoute.Sitemap = posts.map((p) => ({ url: `${SITE_URL}/blog/${p.slug}` }));
  const venueUrls: MetadataRoute.Sitemap = venues.map((v) => ({ url: `${SITE_URL}/venues/${v.slug}` }));
  const destinationUrls: MetadataRoute.Sitemap = destinations.map((d) => ({
    url: `${SITE_URL}/long-distance/${d.slug}`,
  }));

  return [
    ...staticUrls,
    ...airportUrls,
    ...placeUrls,
    ...townHubUrls,
    ...carUrls,
    ...postUrls,
    ...venueUrls,
    ...destinationUrls,
  ];
}
