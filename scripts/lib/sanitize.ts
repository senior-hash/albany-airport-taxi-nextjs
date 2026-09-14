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

const PLACEHOLDER_MARKERS = [
  "gauto",
  "themescare",
  "lorem ipsum",
  "example@mail.com",
];

/** Flags content that still contains known legacy-template placeholder text. */
export function containsPlaceholderText(text: string): string | null {
  const lower = text.toLowerCase();
  for (const marker of PLACEHOLDER_MARKERS) {
    if (lower.includes(marker)) return marker;
  }
  return null;
}
