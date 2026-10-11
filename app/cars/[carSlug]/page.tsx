import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { getCars, getCarBySlug } from "@/lib/content";
import { PageHeading } from "@/components/PageHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { ProseContent } from "@/components/ProseContent";
import { BookingCard } from "@/components/BookingCard";

export function generateStaticParams() {
  return getCars().map((c) => ({ carSlug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ carSlug: string }>;
}): Promise<Metadata> {
  const { carSlug } = await params;
  const car = getCarBySlug(carSlug);
  if (!car) return {};
  return {
    title: car.title,
    description: `Book the ${car.title} for your airport transfer or long-distance trip.`,
    alternates: { canonical: `/cars/${car.slug}` },
  };
}

export default async function CarPage({ params }: { params: Promise<{ carSlug: string }> }) {
  const { carSlug } = await params;
  const car = getCarBySlug(carSlug);
  if (!car) notFound();

  return (
    <>
      <PageHeading eyebrow="Fleet" title={car.title} />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Fleet", path: "/cars" },
          { name: car.title, path: `/cars/${car.slug}` },
        ]}
      />
      <Container className="grid gap-12 py-12 lg:grid-cols-[2fr_1fr]">
        <div>
          {car.images.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2">
              {car.images.map((img) => (
                <div
                  key={img.src}
                  className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border first:sm:col-span-2"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    priority
                  />
                </div>
              ))}
            </div>
          )}
          <div className="mt-8">
            <ProseContent html={car.detailHtml} />
          </div>
        </div>
        <aside>
          <BookingCard heading="Book this vehicle" />
        </aside>
      </Container>
    </>
  );
}
