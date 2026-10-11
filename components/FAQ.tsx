import type { FAQItem } from "@/lib/faq";

// Native <details>/<summary> — works with zero JavaScript, fully
// keyboard/screen-reader accessible, no client component needed.
export function FAQ({
  items,
  title = "Frequently Asked Questions",
}: {
  items: FAQItem[];
  title?: string;
}) {
  if (items.length === 0) return null;
  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight text-primary">{title}</h2>
      <div className="mt-6 divide-y divide-border rounded-lg border border-border bg-surface">
        {items.map((item) => (
          <details key={item.question} className="group p-6">
            <summary className="cursor-pointer list-none font-medium text-primary [&::-webkit-details-marker]:hidden">
              <span className="flex items-center justify-between gap-4">
                {item.question}
                <span className="shrink-0 text-accent text-xl leading-none transition-transform group-open:rotate-45">
                  +
                </span>
              </span>
            </summary>
            <p className="mt-3 text-sm text-ink-muted">{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
