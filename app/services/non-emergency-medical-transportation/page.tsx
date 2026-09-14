import type { Metadata } from "next";
import { PageHeading } from "@/components/PageHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { CallButton } from "@/components/CallButton";
import { JsonLd } from "@/components/JsonLd";
import { serviceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Non-Emergency Medical Transportation (Self-Pay)",
  description:
    "Self-pay non-emergency medical transportation in the Albany, NY area. Reliable rides to appointments — no insurance billing.",
  alternates: { canonical: "/services/non-emergency-medical-transportation" },
};

export default function NemtPage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Non-Emergency Medical Transportation",
          description: "Self-pay non-emergency medical transportation to and from appointments.",
          areaServedName: "Albany, NY and the Capital Region",
          url: "/services/non-emergency-medical-transportation",
        })}
      />
      <PageHeading
        eyebrow="Services"
        title="Non-Emergency Medical Transportation"
        description="Reliable transportation to and from medical appointments."
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Non-Emergency Medical Transportation", path: "/services/non-emergency-medical-transportation" },
        ]}
      />
      <Container className="grid gap-12 py-12 lg:grid-cols-[2fr_1fr]">
        <div className="prose prose-neutral max-w-none prose-headings:text-primary">
          <p className="rounded-md border border-accent/40 bg-accent/10 px-4 py-3 text-sm font-medium text-primary">
            This is a <strong>self-pay</strong> service — we do not bill
            insurance or Medicaid. Payment is due at the time of your ride.
          </p>
          <p>
            We provide comfortable, dependable transportation to and from
            medical appointments, treatments, and procedures for anyone who
            prefers to arrange and pay for their own ride directly, without
            going through an insurance-billed medical transportation broker.
          </p>
          <h2>Who this is for</h2>
          <p>
            Patients and families who want a straightforward, reliable ride to
            appointments — doctor visits, physical therapy, dialysis,
            outpatient procedures — and would rather pay directly than
            navigate insurance authorization for transportation.
          </p>
          <h2>How to book</h2>
          <p>
            Call us to schedule your ride. Let us know your pickup time,
            destination, and any mobility needs so we can make sure the right
            vehicle is available.
          </p>
        </div>
        <aside className="rounded-lg border border-border bg-surface p-6">
          <p className="font-medium text-primary">Schedule a ride</p>
          <p className="mt-2 text-sm text-ink-muted">Self-pay only. Call to book and confirm pricing.</p>
          <CallButton className="mt-4 w-full" />
        </aside>
      </Container>
    </>
  );
}
