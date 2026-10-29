import type { Metadata } from "next";
import Link from "next/link";
import { CustomRoutePage } from "@/components/CustomRoutePage";

export const metadata: Metadata = {
  title: "Kingston, NY to NYC Car Service",
  description:
    "Door-to-door car service between Kingston, New York and New York City, or JFK, LaGuardia, and Newark airports. Round-trip options available.",
  alternates: { canonical: "/long-distance/kingston-to-nyc" },
};

export default function KingstonToNycPage() {
  return (
    <CustomRoutePage
      slug="kingston-to-nyc"
      title="Kingston, NY to NYC Car Service"
      breadcrumbName="Kingston to NYC"
      description="Door-to-door car service between Kingston, New York and New York City, or JFK, LaGuardia, and Newark airports."
      areaServedName="Kingston, NY and New York City"
      intro={
        <>
          <p>
            Door-to-door car service between Kingston and New York City —
            we also run this route to JFK, LaGuardia, and Newark, which
            covers a lot of our Kingston calls directly: plenty of our
            Hudson Valley customers here keep a home in the city and split
            time between the two.
          </p>
          <h2>Round trips are the norm, not the exception</h2>
          <p>
            You can book both directions at the same time. See our{" "}
            <Link href="/airport-taxi">full list of airports we serve</Link>{" "}
            if you&rsquo;re headed somewhere else.
          </p>
        </>
      }
    />
  );
}
