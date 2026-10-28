import Link from "next/link";
import type { Metadata } from "next";
import { getVenueGroups } from "@/lib/venues";
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
  const groups = getVenueGroups();
  return (
    <>
      <PageHeading
        eyebrow="Destinations"
        title="Venues We Serve"
        description="Hospitals, malls, arenas, transit hubs, colleges, hotels, museums, and wineries and farms across the whole service area — book a ride to and from the places you actually go."
      />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Venues", path: "/venues" }]} />
      <Container className="py-12">
        <nav aria-label="Venue categories" className="flex flex-wrap gap-2 border-b border-border pb-8">
          {groups.map((group) => (
            <a
              key={group.slug}
              href={`#${group.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-sm text-ink-muted transition-colors hover:border-accent/50 hover:text-ink"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              {group.label} <span className="text-ink-muted/70">({group.venues.length})</span>
            </a>
          ))}
        </nav>
        {groups.map((group) => (
          <section key={group.slug} id={group.slug} className="scroll-mt-24 border-b border-border py-10 last:border-0">
            <h2 className="font-display text-xl font-extrabold tracking-tight text-primary">{group.label}</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {group.venues.map((venue) => (
                <Link
                  key={venue.slug}
                  href={`/venues/${venue.slug}`}
                  className="group rounded-[20px] border border-border bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:border-accent/50 hover:shadow-md"
                >
                  <MapPinIcon className="h-6 w-6 text-accent" />
                  <p className="mt-4 text-xs font-medium uppercase tracking-wide text-accent">{venue.category}</p>
                  <p className="mt-1 text-lg font-semibold text-primary">{venue.name}</p>
                  <p className="mt-2 text-sm text-ink-muted">{venue.locality}</p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </Container>
    </>
  );
}
