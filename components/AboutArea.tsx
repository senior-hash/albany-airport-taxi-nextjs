import type { CountyArea } from "@/lib/county-area";

// Mirrors the "About Area" pattern on our sister site
// (fabius-ny-taxi-service.uslimoandtaxi.com): a short paragraph naming a real,
// verified local landmark and the area's government site — a genuine local-trust
// signal, not just internal links.
export function AboutArea({
  area,
  countyName,
  stateName,
}: {
  area: CountyArea;
  countyName: string;
  stateName: string;
}) {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold tracking-tight text-primary">About {countyName}</h2>
      <p className="mt-3 text-ink-muted">
        We provide door-to-door taxi and car service throughout {countyName}, {stateName}. One
        local highlight worth a visit is{" "}
        <a
          href={area.landmarkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline-offset-2 hover:underline"
        >
          {area.landmarkName}
        </a>
        , {area.landmarkBlurb}. For local services and information, visit{" "}
        <a
          href={area.govUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline-offset-2 hover:underline"
        >
          {area.govName}
        </a>
        &rsquo;s official website.
      </p>
    </div>
  );
}
