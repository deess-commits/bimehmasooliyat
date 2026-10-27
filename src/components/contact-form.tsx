"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema } from "@/lib/validation";

export function ContactForm() {
  const [pending, setPending] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
    website: "", // honeypot
  });

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "اطلاعات ناقص است");
      return;
    }
    setPending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data?.error ?? "ارسال پیام ناموفق بود");
        return;
      }
      toast.success("پیام شما ثبت شد — حداکثر یک روز کاری پاسخ می‌دهیم");
      setForm({ fullName: "", phone: "", email: "", subject: "", message: "", website: "" });
    } catch {
      toast.error("خطای شبکه — دوباره تلاش کنید");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border bg-card p-5 sm:p-7" noValidate>
      <h2 className="text-lg font-extrabold">ارسال پیام</h2>
      <p className="mt-1 text-xs text-muted-foreground">
        برای اعلام خسارت فوری، تماس تلفنی سریع‌تر است.
      </p>

      {/* Honeypot */}
      <input
        type="text"
        name="website"
        value={form.website}
        onChange={(e) => set("website", e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] size-0 opacity-0"
      />

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="c-name">نام و نام خانوادگی *</Label>
          <Input id="c-name" value={form.fullName} onChange={(e) => set("fullName", e.target.value)} className="mt-1.5" autoComplete="name" />
        </div>
        <div>
          <Label htmlFor="c-phone">شماره تماس *</Label>
          <Input
            id="c-phone"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value.replace(/[^\d]/g, ""))}
            dir="ltr"
            inputMode="tel"
            className="mt-1.5 text-start"
            autoComplete="tel"
            placeholder="09xxxxxxxxx"
          />
        </div>
        <div>
          <Label htmlFor="c-email">ایمیل (اختیاری)</Label>
          <Input id="c-email" value={form.email} onChange={(e) => set("email", e.target.value)} dir="ltr" className="mt-1.5 text-start" type="email" autoComplete="email" />
        </div>
        <div>
          <Label htmlFor="c-subject">موضوع *</Label>
          <Input id="c-subject" value={form.subject} onChange={(e) => set("subject", e.target.value)} className="mt-1.5" placeholder="مثلاً: اعلام خسارت، سوال پوشش…" />
        </div>
      </div>
      <div className="mt-4">
        <Label htmlFor="c-message">متن پیام *</Label>
        <Textarea id="c-message" value={form.message} onChange={(e) => set("message", e.target.value)} rows={4} className="mt-1.5" />
      </div>
      <Button type="submit" disabled={pending} className="mt-5">
        {pending ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <Send className="size-4" aria-hidden="true" />}
        ارسال پیام
      </Button>
    </form>
  );
}
