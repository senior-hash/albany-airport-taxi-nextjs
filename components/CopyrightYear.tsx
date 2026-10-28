"use client";

import { useEffect, useRef } from "react";

// Baked into the static export at build time — correct as of the last
// build, and the only thing a no-JS visitor or a crawler ever sees. Once
// the page hydrates, the effect below writes the visitor's actual current
// year straight to the DOM (not React state — this only needs to run once
// and shouldn't trigger a re-render), so the footer stays correct even
// across a year boundary without needing a rebuild.
const BUILD_YEAR = 2026;

export function CopyrightYear() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (node) node.textContent = String(new Date().getFullYear());
  }, []);

  return <span ref={ref}>{BUILD_YEAR}</span>;
}
