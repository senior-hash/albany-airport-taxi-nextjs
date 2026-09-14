import Link from "next/link";
import type { City } from "@/scripts/lib/schemas";

export function NearbyCities({
  cities,
  currentSlug,
  airportSlug,
}: {
  cities: City[];
  currentSlug: string;
  airportSlug: string;
}) {
  const others = cities.filter((c) => c.slug !== currentSlug).slice(0, 24);
  if (others.length === 0) return null;
  return (
    <div className="mt-12">
      <h2 className="text-xl font-semibold text-primary">Nearby Cities We Serve</h2>
      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
        {others.map((city) => (
          <li key={city.id}>
            <Link href={`/airport-taxi/${airportSlug}/${city.slug}`} className="text-accent hover:underline">
              {city.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
