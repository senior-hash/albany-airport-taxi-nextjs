import type { Metadata } from "next";
import { PageHeading } from "@/components/PageHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { BookingCard } from "@/components/BookingCard";

export const metadata: Metadata = {
  title: "Payment",
  description: "Accepted payment methods for Albany Airport Taxi and Limo Service.",
  alternates: { canonical: "/payment" },
};

export default function PaymentPage() {
  return (
    <>
      <PageHeading title="Payment" />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Payment", path: "/payment" }]} />
      <Container className="grid gap-12 py-12 lg:grid-cols-[2fr_1fr]">
        <div className="prose prose-neutral max-w-none prose-headings:text-primary">
          <p>Payment is collected before your ride, once your trip is confirmed and quoted.</p>
          <h2>Accepted payment methods</h2>
          <ul>
            <li>Venmo (preferred)</li>
            <li>Zelle (preferred)</li>
            <li>Cash App (preferred)</li>
            <li>Card payments — accepted, with a 10% processing fee</li>
          </ul>
          <h2>Tipping</h2>
          <p>Tipping is optional and can be added to your payment when you book.</p>
          <h2>Pricing</h2>
          <p>
            Every trip is quoted individually before you book — the price you&rsquo;re quoted is
            the price you pay, with no surge charges for weather, holidays, or traffic.
          </p>
        </div>
        <aside>
          <BookingCard />
        </aside>
      </Container>
    </>
  );
}
