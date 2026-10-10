import sanitizeHtml from "sanitize-html";

/**
 * Allowlist sanitizer for legacy `detail` fields, which contain
 * hand-authored HTML from the old admin panel's FCKeditor. This is the fix
 * for the unescaped-output vulnerability that let a script tag get stored
 * and rendered on the live legacy site (see plan: Security Fixes).
 */
export function sanitizeDetailHtml(raw: string): string {
  return sanitizeHtml(raw, {
    allowedTags: [
      "p",
      "div",
      "span",
      "ul",
      "ol",
      "li",
      "strong",
      "b",
      "em",
      "i",
      "u",
      "a",
      "br",
      "h2",
      "h3",
      "h4",
      "table",
      "tbody",
      "thead",
      "tr",
      "td",
      "th",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }),
    },
  }).trim();
}

/**
 * Strips all markup from legacy `title`/`mtitle` fields, which should be
 * plain text but were stored unsanitized — a `<script>` injection from the
 * original security incident survived in the `nyc` airport's title field
 * until this was added. `allowedTags: []` discards both the tag and its
 * content for non-text-bearing elements like `<script>`/`<style>`.
 */
export function sanitizePlainText(raw: string): string {
  return sanitizeHtml(raw, { allowedTags: [], allowedAttributes: {} }).trim();
}

const PLACEHOLDER_MARKERS = [
  "gauto",
  "themescare",
  "lorem ipsum",
  "example@mail.com",
  // Two spun city-level content templates discovered Oct 2026 — 525 of 563
  // cities shared one of these word-for-word with only the name swapped
  // in. Confirmed via scripts/lib/meta.ts's hasRealCityDetail(), which
  // guards rendering today; listed here too so a future parse-dump re-run
  // flags them instead of silently reintroducing the duplicate-content bug.
  "best known car service in",
  "professional taxi cab company in",
  // Matching mtitle/mdesc override template — see meta.ts's
  // isPlaceholderCityMeta() for the render-time guard.
  "taxi service is only a phone call away",
];

/** Flags content that still contains known legacy-template placeholder text. */
export function containsPlaceholderText(text: string): string | null {
  const lower = text.toLowerCase();
  for (const marker of PLACEHOLDER_MARKERS) {
    if (lower.includes(marker)) return marker;
  }
  return null;
}
