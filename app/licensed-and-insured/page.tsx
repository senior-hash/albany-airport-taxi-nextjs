import type { Metadata } from "next";
import { PageHeading } from "@/components/PageHeading";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { BookingCard } from "@/components/BookingCard";
import { PlaceholderNotice } from "@/components/PlaceholderNotice";

export const metadata: Metadata = {
  title: "Licensed & Insured",
  description: "Licensing and insurance information for Albany Airport Taxi and Limo Service.",
  alternates: { canonical: "/licensed-and-insured" },
};

export default function LicensedAndInsuredPage() {
  return (
    <>
      <PageHeading title="Licensed &amp; Insured" />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Licensed & Insured", path: "/licensed-and-insured" }]} />
      <Container className="grid gap-12 py-12 lg:grid-cols-[2fr_1fr]">
        <div className="prose prose-neutral max-w-none prose-headings:text-primary">
          <p>
            Albany Airport Taxi and Limo Service (Albany Airport Taxi LLC) operates as a licensed,
            insured for-hire vehicle service. Drivers are commercially licensed to operate for
            hire in the states we serve.
          </p>
          <PlaceholderNotice>
            Add your operating authority / livery license number(s) and issuing state agency or
            municipality (e.g. NY DOT, a specific city/county taxi license, VT or MA equivalents),
            plus your commercial auto insurance carrier, policy type, and coverage amount. If
            drivers go through a specific screening or background-check process, state it here —
            otherwise leave it out rather than imply one that doesn&rsquo;t happen.
          </PlaceholderNotice>
          <h2>Questions about our credentials</h2>
          <p>
            Call us at any time and we&rsquo;re happy to answer specific questions about licensing
            or insurance for your trip.
          </p>
        </div>
        <aside>
          <BookingCard />
        </aside>
      </Container>
    </>
  );
}
