import { notFound } from "next/navigation";
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
        <ProseContent html={car.detailHtml} />
        <aside>
          <BookingCard heading="Book this vehicle" />
        </aside>
      </Container>
    </>
  );
}
