import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getVenues, getVenueBySlug } from "@/lib/venues";
import { PageHeading } from "@/components/PageHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { BookingCard } from "@/components/BookingCard";
import { JsonLd } from "@/components/JsonLd";
import { serviceSchema } from "@/lib/schema";

export function generateStaticParams() {
  return getVenues().map((v) => ({ venueSlug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ venueSlug: string }>;
}): Promise<Metadata> {
  const { venueSlug } = await params;
  const venue = getVenueBySlug(venueSlug);
  if (!venue) return {};
  return {
    title: `Taxi to ${venue.name}`,
    description: venue.description,
    alternates: { canonical: `/venues/${venue.slug}` },
  };
}

export default async function VenuePage({ params }: { params: Promise<{ venueSlug: string }> }) {
  const { venueSlug } = await params;
  const venue = getVenueBySlug(venueSlug);
  if (!venue) notFound();

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: `Taxi to ${venue.name}`,
          description: venue.description,
          areaServedName: venue.locality,
          url: `/venues/${venue.slug}`,
        })}
      />
      <PageHeading eyebrow={venue.category} title={`Taxi & Car Service to ${venue.name}`} description={venue.locality} />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Venues", path: "/venues" },
          { name: venue.name, path: `/venues/${venue.slug}` },
        ]}
      />
      <Container className="grid gap-12 py-12 lg:grid-cols-[2fr_1fr]">
        <div className="prose prose-neutral max-w-none prose-headings:text-primary">
          <p>{venue.description}</p>
          <p>
            We provide door-to-door pickup and drop-off, with drivers who
            know the area well. Book ahead or call for same-day service.
          </p>
        </div>
        <aside>
          <BookingCard />
        </aside>
      </Container>
    </>
  );
}
