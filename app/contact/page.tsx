import type { Metadata } from "next";
import { BUSINESS } from "@/lib/content";
import { PageHeading } from "@/components/PageHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { ContactForm } from "@/components/ContactForm";
import { CallButton } from "@/components/CallButton";

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
            <p className="font-medium text-primary">Email</p>
            <a href={`mailto:${BUSINESS.email}`} className="text-accent hover:underline">
              {BUSINESS.email}
            </a>
          </div>
          <div>
            <p className="font-medium text-primary">Service area</p>
            <p className="text-ink-muted">{BUSINESS.addressLocality}, {BUSINESS.addressRegion} and surrounding counties</p>
          </div>
        </aside>
      </Container>
    </>
  );
}
