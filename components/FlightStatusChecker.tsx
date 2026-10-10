"use client";

import { useState } from "react";

// Links out to FlightAware's own public flight-tracking page rather than
// embedding anything — no API key needed, and it's the same real,
// free, live data FlightAware itself publishes. The flight ident format
// (e.g. "DL1234", "AAL100") is what FlightAware's URL pattern expects.
export function FlightStatusChecker({ className = "" }: { className?: string }) {
  const [flightNumber, setFlightNumber] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const code = flightNumber.trim().toUpperCase().replace(/\s+/g, "");
    if (!code) return;
    window.open(`https://flightaware.com/live/flight/${encodeURIComponent(code)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <div className={`rounded-lg border border-border bg-surface p-6 ${className}`}>
      <p className="font-medium text-primary">Check a flight&rsquo;s status</p>
      <p className="mt-2 text-sm text-ink-muted">
        We track your flight automatically once you book — but you can look
        one up yourself anytime.
      </p>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-wrap gap-2">
        <input
          type="text"
          value={flightNumber}
          onChange={(e) => setFlightNumber(e.target.value)}
          placeholder="Flight number (e.g. DL1234)"
          aria-label="Flight number"
          className="min-w-0 flex-1 rounded-md border border-border px-3 py-2 text-sm"
        />
        <button
          type="submit"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
        >
          Check Status
        </button>
      </form>
      <p className="mt-2 text-xs text-ink-muted">Powered by FlightAware</p>
    </div>
  );
}
