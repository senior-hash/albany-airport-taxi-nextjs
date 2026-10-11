import Link from "next/link";
import Image from "next/image";
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
      <Container className="py-12">
        <div className="relative aspect-[16/7] overflow-hidden rounded-xl border border-border">
          <Image
            src="/images/fleet/fleet-group-three-vehicles-1.jpg"
            alt="Three vehicles from the US Limo and Taxi fleet parked side by side"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => {
            const cover = car.images[0];
            return (
              <Link
                key={car.id}
                href={`/cars/${car.slug}`}
                className="group overflow-hidden rounded-xl border border-border bg-surface transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-md"
              >
                {cover && (
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={cover.src}
                      alt={cover.alt}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                  </div>
                )}
                <p className="p-6 text-lg font-semibold text-primary">{car.title}</p>
              </Link>
            );
          })}
        </div>
      </Container>
    </>
  );
}
