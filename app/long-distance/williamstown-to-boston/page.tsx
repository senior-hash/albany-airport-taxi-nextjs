import type { Metadata } from "next";
import { CustomRoutePage } from "@/components/CustomRoutePage";

export const metadata: Metadata = {
  title: "Williamstown, MA to Boston Car Service",
  description:
    "Door-to-door car service between Williamstown, Massachusetts and Boston, including Boston Logan International Airport. We also pick up throughout the Berkshires and the wider Capital Region.",
  alternates: { canonical: "/long-distance/williamstown-to-boston" },
};

export default function WilliamstownToBostonPage() {
  return (
    <CustomRoutePage
      slug="williamstown-to-boston"
      title="Williamstown, MA to Boston Car Service"
      breadcrumbName="Williamstown to Boston"
      description="Door-to-door car service between Williamstown, Massachusetts and Boston, including Boston Logan International Airport."
      areaServedName="Williamstown, MA and Boston, MA"
      intro={
        <>
          <p>
            Door-to-door car service between Williamstown and Boston,
            including Boston Logan International Airport — useful for
            Williams College families flying out of Logan instead of
            Albany, or anyone headed into the city itself.
          </p>
          <h2>Round trips are the norm, not the exception</h2>
          <p>
            You can book both directions at the same time, so your return
            trip is already arranged before you leave.
          </p>
        </>
      }
    />
  );
}
