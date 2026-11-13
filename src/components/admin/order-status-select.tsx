"use client";

// ─── تغییر وضعیت سفارش در جدول ادمین ────────────────────────────────

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toFaDigits } from "@/lib/format";

const OPTIONS: { value: string; label: string }[] = [
  { value: "new", label: "جدید" },
  { value: "verifying", label: "در حال بررسی" },
  { value: "issued", label: "بیمه‌نامه صادر شد" },
  { value: "rejected", label: "رد شد" },
];

export function OrderStatusSelect({ id, status }: { id: string; status: string }) {
  const router = useRouter();
  const [value, setValue] = useState(status);
  const [saving, setSaving] = useState(false);
  const [, startTransition] = useTransition();

  async function change(next: string) {
    setValue(next);
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (!res.ok) setValue(status);
      else startTransition(() => router.refresh());
    } catch {
      setValue(status);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Label htmlFor={`o-${id}`} className="sr-only">
        وضعیت سفارش شماره {toFaDigits(id.slice(-4))}
      </Label>
      <Select value={value} onValueChange={change} disabled={saving}>
        <SelectTrigger id={`o-${id}`} size="sm" className="w-44 text-xs">
          {saving ? <Loader2 className="size-3.5 animate-spin" aria-hidden="true" /> : null}
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {OPTIONS.map((o) => (
            <SelectItem key={o.value} value={o.value} className="text-xs">
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
