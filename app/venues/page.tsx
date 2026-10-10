import Link from "next/link";
import type { Metadata } from "next";
import { getVenues } from "@/lib/venues";
import { PageHeading } from "@/components/PageHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { MapPinIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Venues We Serve",
  description:
    "Taxi and car service to hospitals, malls, arenas, colleges, hotels, museums, wineries, and farms across the Capital Region, Hudson Valley, Adirondacks, and Berkshires.",
  alternates: { canonical: "/venues" },
};

export default function VenuesPage() {
  const venues = getVenues();
  return (
    <>
      <PageHeading
        eyebrow="Destinations"
        title="Venues We Serve"
        description="Hospitals, malls, arenas, transit hubs, colleges, hotels, museums, and wineries and farms across the whole service area — book a ride to and from the places you actually go."
      />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Venues", path: "/venues" }]} />
      <Container className="grid gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3">
        {venues.map((venue) => (
          <Link
            key={venue.slug}
            href={`/venues/${venue.slug}`}
            className="group rounded-xl border border-border bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-md"
          >
            <MapPinIcon className="h-6 w-6 text-accent" />
            <p className="mt-4 text-xs font-medium uppercase tracking-wide text-accent">{venue.category}</p>
            <p className="mt-1 text-lg font-semibold text-primary">{venue.name}</p>
            <p className="mt-2 text-sm text-ink-muted">{venue.locality}</p>
          </Link>
        ))}
      </Container>
    </>
  );
}
