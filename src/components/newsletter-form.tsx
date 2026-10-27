"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      toast.error("ایمیل معتبر وارد کنید");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value }),
      });
      const data = (await res.json()) as { ok?: boolean; message?: string; error?: string };
      if (!res.ok) throw new Error(data.error ?? "خطایی رخ داد؛ دوباره تلاش کنید");
      toast.success(data.message ?? "ایمیل شما در خبرنامه ثبت شد");
      setEmail("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "خطایی رخ داد؛ دوباره تلاش کنید");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="flex w-full max-w-md gap-2" aria-label="عضویت در خبرنامه">
      <Input
        type="email"
        dir="ltr"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="h-11 bg-background"
        aria-label="آدرس ایمیل"
      />
      <Button type="submit" disabled={loading} className="h-11 shrink-0 font-bold">
        <Send className="size-4" aria-hidden="true" />
        {loading ? "در حال ثبت…" : "عضویت"}
      </Button>
    </form>
  );
}
