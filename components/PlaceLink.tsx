"use client";

import Link from "next/link";
import { ExternalLinkIcon } from "@/components/icons";

// Nearby-place entry on a town hub page. If it matches one of our venue
// pages, it links there; otherwise it opens the quote form with the
// drop-off pre-filled ("Get a ride to [place]"). The small website icon
// (only when OSM has a website tag) is a separate, outbound-only link —
// clicking it never triggers the quote-form prefill.
export function PlaceLink({
  name,
  website,
  venueHref,
}: {
  name: string;
  website?: string;
  venueHref?: string;
}) {
  function handleClick() {
    window.dispatchEvent(new CustomEvent("quote-form-prefill-dropoff", { detail: { place: name } }));
    document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      {venueHref ? (
        <Link href={venueHref} className="text-accent hover:underline">
          {name}
        </Link>
      ) : (
        <button
          type="button"
          onClick={handleClick}
          className="text-left text-accent hover:underline"
          aria-label={`Get a ride to ${name}`}
        >
          {name}
        </button>
      )}
      {website && (
        <a
          href={website}
          target="_blank"
          rel="nofollow noopener"
          aria-label={`${name} website (opens in a new tab)`}
          className="ml-1.5 inline-block align-middle text-ink-muted hover:text-accent"
        >
          <ExternalLinkIcon className="h-3.5 w-3.5" />
        </a>
      )}
    </>
  );
}
