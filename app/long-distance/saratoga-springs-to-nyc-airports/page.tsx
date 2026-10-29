import type { Metadata } from "next";
import { CustomRoutePage } from "@/components/CustomRoutePage";

export const metadata: Metadata = {
  title: "Saratoga Springs to NYC Airports Car Service",
  description:
    "Door-to-door car service from Saratoga Springs, NY to JFK, LaGuardia, and Newark airports. Saratoga taxi and car service with round-trip options available.",
  alternates: { canonical: "/long-distance/saratoga-springs-to-nyc-airports" },
};

export default function SaratogaSpringsToNycAirportsPage() {
  return (
    <CustomRoutePage
      slug="saratoga-springs-to-nyc-airports"
      title="Saratoga Springs to NYC Airports Car Service"
      breadcrumbName="Saratoga Springs to NYC Airports"
      description="Door-to-door car service from Saratoga Springs, NY to JFK, LaGuardia, and Newark airports."
      areaServedName="Saratoga Springs, NY and the NYC-area airports"
      intro={
        <>
          <p>
            Flying out of New York City instead of Albany? Our Saratoga
            taxi and car service runs door to door to JFK, LaGuardia, and
            Newark — one driver, one vehicle, no transfers along the way.
          </p>
          <h2>Round trips are the norm, not the exception</h2>
          <p>
            You can book both directions at the same time, so your ride
            home is already arranged before you leave Saratoga Springs.
          </p>
        </>
      }
    />
  );
}
