import type { MetadataRoute } from "next";
import { getAirports, getCounties, getCities, getCars, getAllBlogPosts } from "@/lib/content";
import { getVenues } from "@/lib/venues";
import { getDestinations } from "@/lib/long-distance-destinations";
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
    { url: `${SITE_URL}/services/non-emergency-medical-transportation` },
    { url: `${SITE_URL}/services/courier` },
    { url: `${SITE_URL}/services/wedding` },
    { url: `${SITE_URL}/services/corporate` },
    { url: `${SITE_URL}/services/airbnb-transportation` },
    { url: `${SITE_URL}/services/recovery-transportation` },
    { url: `${SITE_URL}/taxi-vs-uber-lyft` },
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

  // Thin city pages (no real local content — see hasRealCityDetail) are
  // noindexed on the page itself; keeping them out of the sitemap too
  // avoids asking Google to crawl ~3,204 pages we've told it not to index.
  const realDetailCities = cities.filter((c) => hasRealCityDetail(c.detailHtml));

  const placeUrls: MetadataRoute.Sitemap = [];
  for (const airport of airports) {
    for (const county of counties) {
      placeUrls.push({ url: `${SITE_URL}/airport-taxi/${airport.slug}/${county.slug}` });
    }
    for (const city of realDetailCities) {
      placeUrls.push({ url: `${SITE_URL}/airport-taxi/${airport.slug}/${city.slug}` });
    }
  }

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
    ...carUrls,
    ...postUrls,
    ...venueUrls,
    ...destinationUrls,
  ];
}
