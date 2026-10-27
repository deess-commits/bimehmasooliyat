"use client";

// ─── تأیید/رد نظر مشتری در پنل ادمین ────────────────────────────────

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ReviewActions({ id, status }: { id: string; status: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  async function set(next: "approved" | "rejected") {
    setBusy(next);
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (res.ok) startTransition(() => router.refresh());
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        variant={status === "approved" ? "secondary" : "default"}
        onClick={() => set("approved")}
        disabled={busy !== null || status === "approved"}
      >
        {busy === "approved" ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <Check className="size-4" aria-hidden="true" />}
        تأیید
      </Button>
      <Button
        size="sm"
        variant={status === "rejected" ? "secondary" : "destructive"}
        onClick={() => set("rejected")}
        disabled={busy !== null || status === "rejected"}
      >
        {busy === "rejected" ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <X className="size-4" aria-hidden="true" />}
        رد
      </Button>
    </div>
  );
}
