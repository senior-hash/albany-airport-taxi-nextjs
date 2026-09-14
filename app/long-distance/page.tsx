import Link from "next/link";
import type { Metadata } from "next";
import { PageHeading } from "@/components/PageHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";

export const metadata: Metadata = {
  title: "Long Distance Car Service",
  description: "Long-distance car service to and from Albany, NY, including NYC and beyond.",
  alternates: { canonical: "/long-distance" },
};

const ROUTES = [
  { href: "/long-distance/albany-to-nyc", label: "Albany to NYC / New York City" },
];

export default function LongDistanceHubPage() {
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
          {ROUTES.map((route) => (
            <li key={route.href}>
              <Link
                href={route.href}
                className="block rounded-lg border border-border bg-surface p-6 font-medium text-primary transition-shadow hover:shadow-md"
              >
                {route.label}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
