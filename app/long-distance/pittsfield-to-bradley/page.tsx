import type { Metadata } from "next";
import { CustomRoutePage } from "@/components/CustomRoutePage";

export const metadata: Metadata = {
  title: "Pittsfield, MA to Bradley Airport Car Service",
  description:
    "Door-to-door Pittsfield taxi and car service to Bradley International Airport (BDL), with round-trip options available.",
  alternates: { canonical: "/long-distance/pittsfield-to-bradley" },
};

export default function PittsfieldToBradleyPage() {
  return (
    <CustomRoutePage
      slug="pittsfield-to-bradley"
      title="Pittsfield, MA to Bradley Airport Car Service"
      breadcrumbName="Pittsfield to Bradley"
      description="Door-to-door car service between Pittsfield, Massachusetts and Bradley International Airport (BDL)."
      areaServedName="Pittsfield, MA and Bradley International Airport"
      intro={
        <>
          <p>
            Door-to-door Pittsfield taxi and car service to Bradley
            International Airport (BDL) in Windsor Locks, Connecticut — a
            straight shot down I-91, no connections.
          </p>
          <h2>Round trips are the norm, not the exception</h2>
          <p>
            You can book both directions at the same time, so your ride
            home from Bradley is already arranged before you fly out.
          </p>
        </>
      }
    />
  );
}
