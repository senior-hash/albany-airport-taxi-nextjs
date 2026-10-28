import Link from "next/link";
import type { Metadata } from "next";
import { getDestinations } from "@/lib/long-distance-destinations";
import { PageHeading } from "@/components/PageHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { RouteIcon } from "@/components/icons";
import { PickupAreas } from "@/components/PickupAreas";

export const metadata: Metadata = {
  title: "Long Distance Car Service",
  description:
    "Long-distance car service to and from the Capital Region, Saratoga, Hudson Valley, Catskills, Berkshires, and southern Vermont — including NYC and beyond.",
  alternates: { canonical: "/long-distance" },
};

export default function LongDistanceHubPage() {
  const destinations = getDestinations();
  return (
    <>
      <PageHeading
        eyebrow="Long Distance"
        title="Long Distance Car Service"
        description="Reliable, comfortable trips beyond the Capital Region."
      />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Long Distance", path: "/long-distance" }]} />
      <Container className="py-12">
        <ul className="grid gap-4 sm:grid-cols-2">
          <li>
            <Link
              href="/long-distance/albany-to-nyc"
              className="group block rounded-xl border border-border bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-md"
            >
              <RouteIcon className="h-6 w-6 text-accent" />
              <p className="mt-4 font-medium text-primary">Albany to NYC / New York City</p>
            </Link>
          </li>
          {destinations.map((destination) => (
            <li key={destination.slug}>
              <Link
                href={`/long-distance/${destination.slug}`}
                className="group block rounded-xl border border-border bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-md"
              >
                <RouteIcon className="h-6 w-6 text-accent" />
                <p className="mt-4 font-medium text-primary">Albany to {destination.name}</p>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-12">
          <PickupAreas />
        </div>
      </Container>
    </>
  );
}
