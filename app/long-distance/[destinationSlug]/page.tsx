import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getDestinations, getDestinationBySlug } from "@/lib/long-distance-destinations";
import { PageHeading } from "@/components/PageHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { BookingCard } from "@/components/BookingCard";
import { JsonLd } from "@/components/JsonLd";
import { FAQ } from "@/components/FAQ";
import { serviceSchema, faqSchema } from "@/lib/schema";
import { getPageFAQ } from "@/lib/faq";

export function generateStaticParams() {
  return getDestinations().map((d) => ({ destinationSlug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ destinationSlug: string }>;
}): Promise<Metadata> {
  const { destinationSlug } = await params;
  const destination = getDestinationBySlug(destinationSlug);
  if (!destination) return {};
  return {
    title: `Albany to ${destination.name} Car Service`,
    description: destination.description,
    alternates: { canonical: `/long-distance/${destination.slug}` },
  };
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ destinationSlug: string }>;
}) {
  const { destinationSlug } = await params;
  const destination = getDestinationBySlug(destinationSlug);
  if (!destination) notFound();
  const pageFAQ = getPageFAQ(`long-distance/${destination.slug}`);

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: `Albany to ${destination.name} Car Service`,
          description: destination.description,
          areaServedName: `Albany, NY and ${destination.name}`,
          url: `/long-distance/${destination.slug}`,
        })}
      />
      {pageFAQ.length > 0 && <JsonLd data={faqSchema(pageFAQ)} />}
      <PageHeading eyebrow="Long Distance" title={`Albany to ${destination.name} Car Service`} />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Long Distance", path: "/long-distance" },
          { name: destination.name, path: `/long-distance/${destination.slug}` },
        ]}
      />
      <Container className="grid gap-12 py-12 lg:grid-cols-[2fr_1fr]">
        <div className="prose prose-neutral max-w-none prose-headings:text-primary">
          <p>{destination.description}</p>
          <p>
            Booking a round trip? Let us know when you call — most
            long-distance customers book both legs at once. Traveling as a
            group? See our <Link href="/cars">fleet</Link> for larger vehicle
            options.
          </p>
          {pageFAQ.length > 0 && (
            <div className="not-prose mt-12">
              <FAQ items={pageFAQ} title={`Albany to ${destination.name} FAQ`} />
            </div>
          )}
        </div>
        <aside>
          <BookingCard heading="Book your trip" />
        </aside>
      </Container>
    </>
  );
}
