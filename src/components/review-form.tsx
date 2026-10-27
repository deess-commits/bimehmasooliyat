"use client";

import { useState } from "react";
import { Star, MessageSquarePlus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface ProductOption {
  slug: string;
  nameFa: string;
}

export function ReviewForm({ products }: { products: ProductOption[] }) {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [productSlug, setProductSlug] = useState("");
  const [rating, setRating] = useState("5");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (name.trim().length < 3) {
      toast.error("نام را کامل وارد کنید");
      return;
    }
    if (text.trim().length < 20) {
      toast.error("متن نظر حداقل ۲۰ نویسه باشد");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          city: city.trim(),
          productSlug,
          rating: Number(rating),
          text: text.trim(),
        }),
      });
      const data = (await res.json()) as { ok?: boolean; message?: string; error?: string };
      if (!res.ok) throw new Error(data.error ?? "خطایی رخ داد؛ دوباره تلاش کنید");
      toast.success(data.message ?? "نظر شما ثبت شد");
      setName("");
      setCity("");
      setText("");
      setRating("5");
      setProductSlug("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "خطایی رخ داد؛ دوباره تلاش کنید");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-2xl border bg-card p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="rv-name">نام و نام خانوادگی *</Label>
          <Input
            id="rv-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={60}
            autoComplete="name"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="rv-city">شهر (اختیاری)</Label>
          <Input
            id="rv-city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            maxLength={60}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="rv-product">بیمه‌نامه مرتبط (اختیاری)</Label>
          <Select value={productSlug} onValueChange={setProductSlug}>
            <SelectTrigger id="rv-product" className="w-full">
              <SelectValue placeholder="انتخاب کنید" />
            </SelectTrigger>
            <SelectContent className="max-h-64">
              <SelectItem value="none">بدون محصول خاص</SelectItem>
              {products.map((p) => (
                <SelectItem key={p.slug} value={p.slug}>
                  {p.nameFa}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="rv-rating">امتیاز شما *</Label>
          <Select value={rating} onValueChange={setRating}>
            <SelectTrigger id="rv-rating" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {["5", "4", "3", "2", "1"].map((r) => (
                <SelectItem key={r} value={r}>
                  <span className="inline-flex items-center gap-1.5">
                    {r} <Star className="size-3.5 fill-amber-400 text-amber-500" aria-hidden="true" />
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="rv-text">تجربه خود را بنویسید *</Label>
        <Textarea
          id="rv-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          rows={4}
          maxLength={600}
          placeholder="از سرعت صدور، مشاوره سقف تعهد یا روند خسارت بنویسید…"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs leading-6 text-muted-foreground">
          نظر شما پس از بررسی کارشناس منتشر می‌شود؛ اطلاعات تماس شما منتشر نمی‌شود.
        </p>
        <Button type="submit" disabled={loading} className="font-bold">
          <MessageSquarePlus className="size-4" aria-hidden="true" />
          {loading ? "در حال ثبت…" : "ثبت نظر"}
        </Button>
      </div>

      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
    </form>
  );
}
