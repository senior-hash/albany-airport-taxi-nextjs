import reviews from "@/content/reviews.json";
import { SOCIAL } from "@/lib/business";
import { StarIcon, TripAdvisorIcon } from "@/components/icons";

// Real excerpts from our public TripAdvisor listing — reviewer first name
// (as displayed on TripAdvisor), short verbatim excerpt, and a link back to
// the full review. Never write or edit the substance of a review; update
// content/reviews.json by hand from the listing itself.
export function Reviews({ title = "What riders say" }: { title?: string }) {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold tracking-tight text-primary">{title}</h2>
        <a
          href={SOCIAL.tripadvisor}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-accent"
        >
          <TripAdvisorIcon className="h-5 w-5" />
          {SOCIAL.tripadvisorRating} &middot; {SOCIAL.tripadvisorReviewCount} reviews on TripAdvisor
        </a>
      </div>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <figure key={review.name + review.date} className="rounded-xl border border-border bg-surface p-6">
            <div className="flex gap-0.5" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} className="h-4 w-4 text-accent-bright" />
              ))}
            </div>
            <blockquote className="mt-3 text-sm text-ink">&ldquo;{review.excerpt}&rdquo;</blockquote>
            <figcaption className="mt-4 text-xs text-ink-muted">
              {review.name} &middot; {review.date} &middot;{" "}
              <a
                href={SOCIAL.tripadvisor}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-accent"
              >
                via TripAdvisor
              </a>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
