import { CallButton } from "@/components/CallButton";
import { ClockIcon } from "@/components/icons";

export function BookingCard({
  heading = "Book your ride",
  note = "Available 24 hours a day, 7 days a week.",
  phone,
  phoneDisplay,
  className = "",
}: {
  heading?: string;
  note?: string | null;
  phone?: string;
  phoneDisplay?: string;
  className?: string;
}) {
  return (
    <div className={`rounded-lg border border-border bg-surface p-6 ${className}`}>
      <p className="font-medium text-primary">{heading}</p>
      {note && (
        <p className="mt-2 flex items-start gap-2 text-sm text-ink-muted">
          <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          <span>{note}</span>
        </p>
      )}
      <CallButton className="mt-4 w-full" phone={phone} phoneDisplay={phoneDisplay} />
    </div>
  );
}
