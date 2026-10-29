import Link from "next/link";
import type { City } from "@/scripts/lib/schemas";

export function NearbyCities({
  cities,
  currentSlug,
}: {
  cities: City[];
  currentSlug: string;
  /** @deprecated unused now that every city links to its /towns/{slug} hub
   * instead of an airport-specific path — kept optional so existing call
   * sites don't need updating. */
  airportSlug?: string;
}) {
  // No cap — every city needs at least one real on-site link to it, or it's
  // reachable only via the sitemap. This is a plain wrapping text-link list,
  // so it scales fine even for a 50+ city county. Links to the town's hub
  // page (every city has one) rather than this specific airport's city
  // page, since the hub is now the canonical URL for that town.
  const others = cities.filter((c) => c.slug !== currentSlug);
  if (others.length === 0) return null;
  return (
    <div className="mt-12">
      <h2 className="text-xl font-semibold text-primary">Nearby Cities We Serve</h2>
      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
        {others.map((city) => (
          <li key={city.id}>
            <Link href={`/towns/${city.slug}`} className="text-accent hover:underline">
              {city.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
