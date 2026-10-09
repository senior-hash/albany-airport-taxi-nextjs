import { RouteLine } from "@/components/RouteLine";

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
    <div className="relative overflow-hidden bg-primary py-12 sm:py-16">
      <RouteLine className="pointer-events-none absolute inset-0 h-full w-full text-accent-bright" />
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {eyebrow && (
          <p className="text-sm font-medium uppercase tracking-wide text-accent-bright">{eyebrow}</p>
        )}
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base text-white/75">{description}</p>
        )}
      </div>
    </div>
  );
}
