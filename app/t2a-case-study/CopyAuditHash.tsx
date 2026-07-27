"use client";

import { useState } from "react";

export default function CopyAuditHash({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function copyHash() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button className="audit-copy" type="button" onClick={copyHash} aria-live="polite" data-copy-sha={value}>
      {copied ? "已复制 SHA256" : "复制完整 SHA256"}
    </button>
  );
}
