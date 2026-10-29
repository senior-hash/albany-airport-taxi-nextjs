import type { Metadata } from "next";
import Link from "next/link";
import { CustomRoutePage } from "@/components/CustomRoutePage";

export const metadata: Metadata = {
  title: "Bennington, VT to NYC Car Service",
  description:
    "Door-to-door car service between Bennington, Vermont and New York City, with round-trip options. We pick up throughout southern Vermont, the Berkshires, and the wider Capital Region too.",
  alternates: { canonical: "/long-distance/bennington-to-nyc" },
};

export default function BenningtonToNycPage() {
  return (
    <CustomRoutePage
      slug="bennington-to-nyc"
      title="Bennington, VT to NYC Car Service"
      breadcrumbName="Bennington to NYC"
      description="Door-to-door car service between Bennington, Vermont and New York City, with round-trip booking available."
      areaServedName="Bennington, VT and New York City"
      intro={
        <>
          <p>
            Traveling between Bennington and New York City? We run this
            route door to door — no train transfer in Albany or Rensselaer,
            no coordinating a bus schedule, just a private car from your
            address in Bennington straight to your destination in the city.
          </p>
          <h2>Round trips are the norm, not the exception</h2>
          <p>
            You can book both directions at the same time. If you&rsquo;re
            flying out of a <Link href="/airport-taxi">NYC-area airport</Link>{" "}
            instead, we run that trip too — just let us know which airport
            when you call.
          </p>
        </>
      }
    />
  );
}
