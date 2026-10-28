import type { Metadata } from "next";
import { PageHeading } from "@/components/PageHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { ContactForm } from "@/components/ContactForm";
import { CallButton } from "@/components/CallButton";
import { SOCIAL } from "@/lib/business";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Albany Airport Taxi and Limo Service — available 24/7.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeading title="Contact Us" description="We're available 24 hours a day, 7 days a week." />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]} />
      <Container className="grid gap-12 py-12 lg:grid-cols-[2fr_1fr]">
        <ContactForm />
        <aside className="space-y-4 rounded-lg border border-border bg-surface p-6 text-sm">
          <div>
            <p className="font-medium text-primary">Call</p>
            <CallButton className="mt-2" />
          </div>
          <div>
            <p className="font-medium text-primary">Service area</p>
            <p className="text-ink-muted">
              23 counties across New York, Vermont, and Massachusetts — the
              Capital Region, Hudson Valley, Adirondacks, and Berkshires.
            </p>
          </div>
          {/* Yelp intentionally not linked — see lib/business.ts. Add a
           * Google review link here once the Business Profile is
           * reinstated (currently suspended). */}
          <div>
            <p className="font-medium text-primary">Reviews</p>
            <p className="mt-2 space-x-3 text-ink-muted">
              <a href={SOCIAL.tripadvisor} target="_blank" rel="noopener noreferrer" className="text-accent underline hover:text-accent-hover">
                Read our reviews on TripAdvisor
              </a>
            </p>
            <p className="mt-1 space-x-3 text-ink-muted">
              <a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer" className="text-accent underline hover:text-accent-hover">
                Follow us on Facebook
              </a>
            </p>
          </div>
        </aside>
      </Container>
    </>
  );
}
