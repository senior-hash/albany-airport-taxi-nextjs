import Link from "next/link";
import type { Metadata } from "next";
import { getCars } from "@/lib/content";
import { PageHeading } from "@/components/PageHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";

export const metadata: Metadata = {
  title: "Our Fleet",
  description: "The vehicles available for your airport transfer, long-distance trip, or event.",
  alternates: { canonical: "/cars" },
};

export default function CarsPage() {
  const cars = getCars();
  return (
    <>
      <PageHeading eyebrow="Fleet" title="Our Vehicles" />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Fleet", path: "/cars" }]} />
      <Container className="grid gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (
          <Link
            key={car.id}
            href={`/cars/${car.slug}`}
            className="rounded-lg border border-border bg-surface p-6 transition-shadow hover:shadow-md"
          >
            <p className="text-lg font-semibold text-primary">{car.title}</p>
          </Link>
        ))}
      </Container>
    </>
  );
}
