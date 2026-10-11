"use client";

import { useState } from "react";

export function EmbedCodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API can fail (permissions, insecure context) — the code is
      // already visible in the box for manual copy, so just no-op.
    }
  }

  return (
    <div className="rounded-xl border border-border bg-background">
      <pre className="overflow-x-auto p-4 text-xs text-ink-muted">
        <code>{code}</code>
      </pre>
      <div className="border-t border-border p-3">
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
        >
          {copied ? "Copied!" : "Copy embed code"}
        </button>
      </div>
    </div>
  );
}
