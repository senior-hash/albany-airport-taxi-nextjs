import { PICKUP_AREAS, getPickupAreaDistance } from "@/lib/long-distance-destinations";

/** "We pick up from" section — shown on the long-distance hub and every
 * route page, so it's clear we run these trips from the whole service
 * area, not just the city of Albany. Pass `destinationSlug` on a route
 * page to attach a real drive time to the 3 areas that have one. */
export function PickupAreas({ destinationSlug }: { destinationSlug?: string }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-primary">We pick up from</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {PICKUP_AREAS.map((area) => {
          const distance =
            destinationSlug && area.distanceKey
              ? getPickupAreaDistance(destinationSlug, area.distanceKey)
              : undefined;
          return (
            <li key={area.name} className="rounded-lg border border-border bg-surface p-4 text-sm">
              <p className="font-medium text-primary">{area.name}</p>
              <p className="mt-1 text-ink-muted">{area.example}</p>
              {distance && (
                <p className="mt-1 text-xs text-ink-muted">
                  {distance.distanceMiles} from {distance.label} &mdash; {distance.driveTime} by car
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
