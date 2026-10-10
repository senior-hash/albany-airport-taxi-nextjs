import Link from "next/link";
import type { Metadata } from "next";
import { PageHeading } from "@/components/PageHeading";
import { Container } from "@/components/Container";
import { CallButton } from "@/components/CallButton";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <>
      <PageHeading
        eyebrow="404"
        title="Page Not Found"
        description="That page doesn't exist, but you can still get where you're going."
      />
      <Container className="py-12">
        <div className="flex flex-wrap items-center gap-4">
          <CallButton />
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 font-medium text-primary transition-colors hover:bg-background"
          >
            Back to homepage
          </Link>
        </div>
        <div className="mt-10">
          <p className="font-medium text-primary">Some popular pages</p>
          <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
            <li><Link href="/airport-taxi" className="text-accent hover:underline">Airport Taxi Service</Link></li>
            <li><Link href="/long-distance/albany-to-nyc" className="text-accent hover:underline">Albany to NYC</Link></li>
            <li><Link href="/hudson-valley" className="text-accent hover:underline">Hudson Valley Car Service</Link></li>
            <li><Link href="/venues" className="text-accent hover:underline">Venues We Serve</Link></li>
            <li><Link href="/cars" className="text-accent hover:underline">Our Fleet</Link></li>
            <li><Link href="/contact" className="text-accent hover:underline">Contact</Link></li>
          </ul>
        </div>
      </Container>
    </>
  );
}
