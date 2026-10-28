import { CallButton } from "@/components/CallButton";
import { ClockIcon } from "@/components/icons";

export function BookingCard({
  heading = "Book your ride",
  note = "Available 24 hours a day, 7 days a week.",
  phoneDisplay,
  className = "",
}: {
  heading?: string;
  note?: string | null;
  phoneDisplay?: string;
  className?: string;
}) {
  return (
    <div className={`rounded-[20px] bg-surface p-6 shadow-[0_12px_32px_rgba(11,15,26,0.10)] ${className}`}>
      <p className="font-medium text-primary">{heading}</p>
      {note && (
        <p className="mt-2 flex items-start gap-2 text-sm text-ink-muted">
          <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          <span>{note}</span>
        </p>
      )}
      <CallButton className="mt-4 w-full" phoneDisplay={phoneDisplay} />
    </div>
  );
}
