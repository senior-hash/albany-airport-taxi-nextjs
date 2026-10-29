// Visually distinct callout for trust-page facts that must come from the
// business owner (license numbers, insurance carrier, specific policy
// terms) rather than being guessed at. Intentionally not styled to blend
// in with normal prose, so it's obvious this still needs real info before
// launch — and easy to grep for once it's filled in and removed.
export function PlaceholderNotice({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose rounded-xl border-2 border-dashed border-accent bg-accent/5 p-4 text-sm">
      <p className="font-semibold text-accent">Placeholder — add the real details before this page goes live</p>
      <p className="mt-1 text-ink-muted">{children}</p>
    </div>
  );
}
