import Link from "next/link";
import type { Metadata } from "next";
import { getDestinations } from "@/lib/long-distance-destinations";
import { PageHeading } from "@/components/PageHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";

export const metadata: Metadata = {
  title: "Long Distance Car Service",
  description: "Long-distance car service to and from Albany, NY, including NYC and beyond.",
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
              className="block rounded-lg border border-border bg-surface p-6 font-medium text-primary transition-shadow hover:shadow-md"
            >
              Albany to NYC / New York City
            </Link>
          </li>
          {destinations.map((destination) => (
            <li key={destination.slug}>
              <Link
                href={`/long-distance/${destination.slug}`}
                className="block rounded-lg border border-border bg-surface p-6 font-medium text-primary transition-shadow hover:shadow-md"
              >
                Albany to {destination.name}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
