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
  title: "Rides to Medical Appointments",
  description:
    "Self-pay, non-emergency private car service to medical appointments, hospitals, and dialysis — sedan vehicles, wait-and-return available. Advance reservations recommended.",
  alternates: { canonical: "/medical-rides" },
};

export default function MedicalRidesPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Rides to Medical Appointments",
          description:
            "Self-pay, non-emergency private car service to and from medical appointments, with wait-and-return available.",
          areaServedName: "Albany, NY and the Capital Region",
          url: "/medical-rides",
        })}
      />
      <PageHeading
        eyebrow="Medical rides"
        title="Rides to Medical Appointments"
        description="Self-pay, non-emergency private car service — sedan vehicles, wait-and-return available."
        cta={<CallButton className="cta-glow" />}
      />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Medical Rides", path: "/medical-rides" }]} />
      <Container className="grid gap-12 py-12 lg:grid-cols-[2fr_1fr]">
        <div className="prose prose-neutral max-w-none prose-headings:text-primary">
          <p className="rounded-md border border-accent/40 bg-accent/10 px-4 py-3 text-sm font-medium text-primary">
            This is a <strong>self-pay</strong> service &mdash; we do not bill
            insurance or Medicaid, and we run standard sedans, not a
            wheelchair-accessible vehicle.
          </p>
          <p>
            Private car service to and from medical appointments, hospitals,
            and dialysis &mdash; door-to-door, and we&rsquo;ll wait and bring
            you home if your appointment runs short. Not an emergency
            service.
          </p>
          <h2>Who this is for</h2>
          <p>
            Patients and families who want a dependable sedan ride to doctor
            visits, outpatient procedures, or regular dialysis appointments,
            and would rather pay directly than go through an insurance-billed
            medical transportation broker. If you need a wheelchair-accessible
            vehicle, we&rsquo;re not able to accommodate that &mdash; let us
            know when you call and we can point you to the right resource.
          </p>
          <h2>Wait-and-return</h2>
          <p>
            For shorter appointments, we can wait on-site and bring you
            straight home afterward instead of booking a separate return
            trip &mdash; just let us know when you book.
          </p>
          <h2>How to book</h2>
          <p>
            Call to schedule your ride. <strong>Advance reservations
            recommended</strong>, especially for regular appointments like
            dialysis. Rates vary by trip &mdash; call for today&rsquo;s rate.
            See our full{" "}
            <Link href="/services/non-emergency-medical-transportation">
              non-emergency medical transportation
            </Link>{" "}
            page for more detail.
          </p>
        </div>
        <aside className="space-y-6">
          <BookingCard heading="Schedule a medical ride" note="Self-pay only. Call to book and confirm pricing." />
          <QuoteForm />
        </aside>
      </Container>
    </>
  );
}
