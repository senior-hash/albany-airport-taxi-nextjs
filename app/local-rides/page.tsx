import type { Metadata } from "next";
import Link from "next/link";
import { PageHeading } from "@/components/PageHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { BookingCard } from "@/components/BookingCard";
import { QuoteForm } from "@/components/QuoteForm";
import { CallButton } from "@/components/CallButton";
import { JsonLd } from "@/components/JsonLd";
import { serviceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Local Taxi – Hudson, Catskills & Kingston",
  description:
    "Local private car service in Hudson, Hunter, Windham, Tannersville, Kingston, Rhinebeck, and Rhinecliff — rides to dinner and back, 9am-8pm. Advance reservations recommended.",
  alternates: { canonical: "/local-rides" },
};

export default function LocalRidesPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Local Taxi — Hudson, Catskills & Kingston",
          description:
            "Local private car service around Hudson, the Catskills, and Kingston, including rides to dinner and back.",
          areaServedName: "Hudson, NY and the Catskills",
          url: "/local-rides",
        })}
      />
      <PageHeading
        eyebrow="Local rides"
        title="Local Taxi — Hudson, Catskills & Kingston"
        description="Private car service around town, 9am-8pm — including rides to dinner and back."
        cta={<CallButton className="cta-glow" />}
      />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Local Rides", path: "/local-rides" }]} />
      <Container className="grid gap-12 py-12 lg:grid-cols-[2fr_1fr]">
        <div className="prose prose-neutral max-w-none prose-headings:text-primary">
          <p>
            Private car service (not a shared shuttle) for everyday local
            trips around{" "}
            <Link href="/airport-taxi/alb/hudson">Hudson</Link>,{" "}
            <Link href="/airport-taxi/alb/hunter">Hunter</Link>,{" "}
            <Link href="/airport-taxi/alb/windham">Windham</Link>,{" "}
            <Link href="/airport-taxi/alb/tannersville">Tannersville</Link>,{" "}
            <Link href="/airport-taxi/alb/kingston">Kingston</Link>,{" "}
            <Link href="/airport-taxi/alb/rhinebeck">Rhinebeck</Link>, and{" "}
            <Link href="/airport-taxi/alb/rhinecliff">Rhinecliff</Link>.
          </p>
          <h2>What we run</h2>
          <p>
            Local rides from <strong>9am to 8pm</strong> &mdash; dinner
            reservations, appointments, errands, or a ride between towns.
            We&rsquo;ll also wait and bring you home after dinner instead of
            booking a separate return trip, just let us know when you call.
            (For airport and long-distance trips to or from this area,
            see our <Link href="/hudson-valley">Hudson Valley service page</Link>,
            which runs 24/7.)
          </p>
          <h2>How to book</h2>
          <p>
            Call with your pickup time and destination. <strong>Advance
            reservations recommended</strong>, especially for dinner
            reservations on weekends. Rates vary by trip &mdash; call for
            today&rsquo;s rate.
          </p>
        </div>
        <aside className="space-y-6">
          <BookingCard heading="Book a local ride" note="Available 9am-8pm." />
          <QuoteForm />
        </aside>
      </Container>
    </>
  );
}
