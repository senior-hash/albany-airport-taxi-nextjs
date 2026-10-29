import type { Metadata } from "next";
import Link from "next/link";
import { PageHeading } from "@/components/PageHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { BookingCard } from "@/components/BookingCard";
import { PlaceholderNotice } from "@/components/PlaceholderNotice";

export const metadata: Metadata = {
  title: "Safety",
  description: "Safety practices for riders booking with Albany Airport Taxi and Limo Service.",
  alternates: { canonical: "/safety" },
};

export default function SafetyPage() {
  return (
    <>
      <PageHeading title="Safety" />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Safety", path: "/safety" }]} />
      <Container className="grid gap-12 py-12 lg:grid-cols-[2fr_1fr]">
        <div className="prose prose-neutral max-w-none prose-headings:text-primary">
          <h2>Who you&rsquo;re riding with</h2>
          <p>
            Drivers are commercially licensed to operate for hire — see our{" "}
            <Link href="/licensed-and-insured">Licensed &amp; Insured page</Link> for details.
          </p>
          <PlaceholderNotice>
            Add any driver screening you want to state publicly (background checks, drug testing,
            driving-record checks), vehicle inspection or maintenance practices, and whether
            vehicles have dash cams, GPS tracking, or similar — only include what&rsquo;s actually
            true and in place.
          </PlaceholderNotice>
          <h2>Flight tracking for airport pickups</h2>
          <p>
            We track your flight automatically once you book, so a delay or early arrival doesn&rsquo;t
            leave you waiting at the curb or us waiting at the gate.
          </p>
          <h2>Child car seats</h2>
          <p>Car seats are available on request, at a small added cost — ask when you book.</p>
          <h2>Real dispatch, not just an app</h2>
          <p>
            Every ride is booked and confirmed by a real person, by phone or text — not an
            anonymous app match. Call or text us directly with any safety concerns before, during,
            or after your ride.
          </p>
        </div>
        <aside>
          <BookingCard />
        </aside>
      </Container>
    </>
  );
}
