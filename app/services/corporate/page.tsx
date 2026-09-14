import type { Metadata } from "next";
import { PageHeading } from "@/components/PageHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { CallButton } from "@/components/CallButton";
import { JsonLd } from "@/components/JsonLd";
import { serviceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Corporate Transportation",
  description: "Reliable corporate and business travel transportation in the Albany, NY area.",
  alternates: { canonical: "/services/corporate" },
};

export default function CorporatePage() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: "Corporate Transportation",
          description: "Business travel, client, and executive transportation.",
          areaServedName: "Albany, NY and the Capital Region",
          url: "/services/corporate",
        })}
      />
      <PageHeading
        eyebrow="Services"
        title="Corporate Transportation"
        description="Dependable transportation for business travel, meetings, and clients."
      />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Corporate Transportation", path: "/services/corporate" }]} />
      <Container className="grid gap-12 py-12 lg:grid-cols-[2fr_1fr]">
        <div className="prose prose-neutral max-w-none prose-headings:text-primary">
          <p>
            Make the right impression for business travel. We provide
            on-time, professional transportation for executives, employees,
            and visiting clients — airport transfers, meetings across town,
            and everything in between.
          </p>
          <h2>Recurring accounts</h2>
          <p>
            If your business needs transportation on a regular basis, call
            us to set up an account — we can coordinate recurring pickups
            and simplify billing.
          </p>
        </div>
        <aside className="rounded-lg border border-border bg-surface p-6">
          <p className="font-medium text-primary">Set up corporate service</p>
          <CallButton className="mt-4 w-full" />
        </aside>
      </Container>
    </>
  );
}
