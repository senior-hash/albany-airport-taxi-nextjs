import { PageHeading } from "@/components/PageHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { BookingCard } from "@/components/BookingCard";
import { QuoteForm } from "@/components/QuoteForm";
import { JsonLd } from "@/components/JsonLd";
import { FAQ } from "@/components/FAQ";
import { PickupAreas } from "@/components/PickupAreas";
import { serviceSchema, faqSchema } from "@/lib/schema";
import { getPageFAQ } from "@/lib/faq";

/** Shared template for the 5 one-off long-distance route pages whose origin
 * isn't Albany (Bennington, Williamstown, Kingston, Saratoga, Pittsfield) —
 * same structure as the Albany-origin route pages (PageHeading, pickup
 * areas, FAQ, quote form), just with a fixed origin/destination pair
 * instead of always starting from Albany. */
export function CustomRoutePage({
  slug,
  title,
  breadcrumbName,
  description,
  intro,
  areaServedName,
}: {
  slug: string;
  title: string;
  breadcrumbName: string;
  description: string;
  intro: React.ReactNode;
  areaServedName: string;
}) {
  const pageFAQ = getPageFAQ(`long-distance/${slug}`);

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: title,
          description,
          areaServedName,
          url: `/long-distance/${slug}`,
        })}
      />
      {pageFAQ.length > 0 && <JsonLd data={faqSchema(pageFAQ)} />}
      <PageHeading eyebrow="Long Distance" title={title} />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Long Distance", path: "/long-distance" },
          { name: breadcrumbName, path: `/long-distance/${slug}` },
        ]}
      />
      <Container className="grid gap-12 py-12 lg:grid-cols-[2fr_1fr]">
        <div className="prose prose-neutral max-w-none prose-headings:text-primary">
          {intro}
          <div className="not-prose mt-10">
            <PickupAreas />
          </div>
          {pageFAQ.length > 0 && (
            <div className="not-prose mt-12">
              <FAQ items={pageFAQ} title={`${title} FAQ`} />
            </div>
          )}
        </div>
        <aside className="space-y-6">
          <BookingCard heading="Book your trip" />
          <QuoteForm />
        </aside>
      </Container>
    </>
  );
}
