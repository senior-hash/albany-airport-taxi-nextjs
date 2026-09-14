export function PageHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="border-b border-border bg-surface py-12 sm:py-16">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {eyebrow && (
          <p className="text-sm font-medium uppercase tracking-wide text-accent">{eyebrow}</p>
        )}
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base text-ink-muted">{description}</p>
        )}
      </div>
    </div>
  );
}
