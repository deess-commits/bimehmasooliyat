"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ChevronLeft, ChevronRight, Loader2, Send, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { quoteSchema } from "@/lib/validation";
import { toFaDigits } from "@/lib/format";
import type { SeedProduct } from "@/prisma/seed-data/types";

const STEPS = ["انتخاب محصول", "اطلاعات تماس", "نیاز پوششی"] as const;

const COVERAGE_OPTIONS = [
  "تا ۵۰۰ میلیون تومان",
  "۵۰۰ میلیون تا ۱ میلیارد تومان",
  "۱ تا ۲ میلیارد تومان",
  "۲ تا ۵ میلیارد تومان",
  "بیش از ۵ میلیارد تومان / مشاوره می‌خواهم",
];

export function QuoteForm({ products }: { products: SeedProduct[] }) {
  const sp = useSearchParams();
  const preSlug = sp.get("slug") ?? "";
  const preName = sp.get("product") ?? "";
  const preIndustry = sp.get("industry") ?? "";

  const [step, setStep] = useState(0);
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState<string | null>(null);

  const [productSlug, setProductSlug] = useState(preSlug);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [desiredCoverage, setDesiredCoverage] = useState("");
  const [message, setMessage] = useState(
    preIndustry
      ? `استعلام برای فعالیت در ${preIndustry} — ترکیب پوشش پیشنهادی صفحه صنعت مدنظر است.`
      : "",
  );
  const [consent, setConsent] = useState(false);
  // honeypot + math captcha (تولید فقط بعد از mount — بدون hydration mismatch)
  const [website, setWebsite] = useState(""); // must stay empty
  const [captcha, setCaptcha] = useState({ a: 0, b: 0 });
  useEffect(() => {
    setCaptcha({ a: rand(), b: rand() });
  }, []);

  const product = useMemo(
    () => products.find((p) => p.slug === productSlug),
    [products, productSlug],
  );
  const productName = product?.nameFa ?? preName;

  function next() {
    if (step === 0 && !productSlug) {
      toast.error("ابتدا نوع بیمه مسئولیت را انتخاب کنید");
      return;
    }
    if (step === 1) {
      if (fullName.trim().length < 3) return toast.error("نام و نام خانوادگی را کامل وارد کنید");
      if (!/^09\d{9}$/.test(phone.trim()))
        return toast.error("شماره موبایل معتبر (۰۹xxxxxxxxx) وارد کنید");
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  async function submit() {
    const payload = {
      fullName: fullName.trim(),
      phone: phone.trim(),
      city,
      productSlug,
      productName,
      desiredCoverage,
      message,
      consent: consent === true,
      website,
      captcha: { ...captcha, answer: Number(captchaAnswer) },
    };

    const parsed = quoteSchema.safeParse(payload);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "اطلاعات فرم ناقص است");
      return;
    }

    setPending(true);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data?.error ?? "ثبت استعلام ناموفق بود؛ دوباره تلاش کنید");
        return;
      }
      setDone(data.trackingCode as string);
      toast.success("استعلام شما ثبت شد");
    } catch {
      toast.error("خطای شبکه — دوباره تلاش کنید");
    } finally {
      setPending(false);
    }
  }

  const [captchaAnswer, setCaptchaAnswer] = useState("");

  if (done) {
    return (
      <div className="rounded-2xl border-2 border-primary/30 bg-accent/50 p-8 text-center">
        <CheckCircle2 className="mx-auto size-14 text-primary" aria-hidden="true" />
        <h2 className="mt-4 text-xl font-extrabold">استعلام شما با موفقیت ثبت شد</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-muted-foreground">
          کارشناس ما حداکثر تا یک روز کاری با شما تماس می‌گیرد. کد پیگیری استعلام شما:
        </p>
        <p className="mt-3 inline-block rounded-xl border bg-card px-6 py-3 font-extrabold tracking-wider text-primary" dir="ltr">
          {done}
        </p>
        <p className="mt-4 text-xs text-muted-foreground">
          این کد را نگه دارید؛ در تماس تلفنی و پیگیری‌ها استفاده می‌شود.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border bg-card p-5 sm:p-7">
      {/* Stepper */}
      <ol className="mb-6 flex items-center gap-2" aria-label="مراحل استعلام">
        {STEPS.map((s, i) => (
          <li key={s} className="flex flex-1 items-center gap-2">
            <span
              className={`grid size-7 shrink-0 place-items-center rounded-full text-xs font-extrabold ${
                i === step
                  ? "bg-primary text-primary-foreground"
                  : i < step
                    ? "bg-primary/15 text-primary"
                    : "bg-secondary text-muted-foreground"
              }`}
              aria-current={i === step ? "step" : undefined}
            >
              {i < step ? "✓" : toFaDigits(i + 1)}
            </span>
            <span className={`hidden text-xs font-bold sm:block ${i === step ? "text-foreground" : "text-muted-foreground"}`}>
              {s}
            </span>
            {i < STEPS.length - 1 ? <span className="h-px flex-1 bg-border" aria-hidden="true" /> : null}
          </li>
        ))}
      </ol>

      {/* Honeypot (hidden) */}
      <input
        type="text"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] size-0 opacity-0"
      />

      {step === 0 ? (
        <div className="space-y-4">
          <div>
            <Label htmlFor="productSlug">نوع بیمه مسئولیت *</Label>
            <Select value={productSlug} onValueChange={setProductSlug}>
              <SelectTrigger id="productSlug" className="mt-1.5 w-full">
                <SelectValue placeholder="انتخاب کنید…" />
              </SelectTrigger>
              <SelectContent className="max-h-72 nice-scroll">
                {products.map((p) => (
                  <SelectItem key={p.slug} value={p.slug}>
                    {p.nameFa}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {product ? (
              <p className="mt-2 rounded-lg bg-accent/50 p-3 text-xs leading-6 text-muted-foreground">
                {product.summaryFa}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}

      {step === 1 ? (
        <div className="space-y-4">
          <div>
            <Label htmlFor="fullName">نام و نام خانوادگی *</Label>
            <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="مثلاً: علی رضایی" className="mt-1.5" autoComplete="name" />
          </div>
          <div>
            <Label htmlFor="phone">شماره موبایل *</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/[^\d]/g, ""))}
              placeholder="۰۹xxxxxxxxx"
              inputMode="tel"
              dir="ltr"
              className="mt-1.5 text-start"
              autoComplete="tel"
            />
          </div>
          <div>
            <Label htmlFor="city">شهر (اختیاری)</Label>
            <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} placeholder="مثلاً: تهران" className="mt-1.5" />
          </div>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="space-y-4">
          <div>
            <Label htmlFor="coverage">سقف تعهد مورد نیاز</Label>
            <Select value={desiredCoverage} onValueChange={setDesiredCoverage}>
              <SelectTrigger id="coverage" className="mt-1.5 w-full">
                <SelectValue placeholder="انتخاب کنید…" />
              </SelectTrigger>
              <SelectContent>
                {COVERAGE_OPTIONS.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="message">توضیحات (اختیاری)</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              placeholder="مثلاً: تعداد کارکنان، نوع فعالیت، سابقه خسارت و…"
              className="mt-1.5"
            />
          </div>
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <Label htmlFor="captcha">
                سوال امنیتی: حاصل {toFaDigits(captcha.a)} + {toFaDigits(captcha.b)} چند است؟ *
              </Label>
              <Input
                id="captcha"
                value={captchaAnswer}
                onChange={(e) => setCaptchaAnswer(e.target.value.replace(/[^\d]/g, ""))}
                inputMode="numeric"
                className="mt-1.5 max-w-32"
              />
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <Checkbox id="consent" checked={consent} onCheckedChange={(v) => setConsent(v === true)} />
            <Label htmlFor="consent" className="text-xs leading-6 font-normal text-muted-foreground">
              اطلاعات من برای پاسخ به استعلام استفاده می‌شود و با سیاست حریم خصوصی موافقم *
            </Label>
          </div>
        </div>
      ) : null}

      {/* Nav buttons */}
      <div className="mt-6 flex items-center justify-between gap-3">
        <Button variant="ghost" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0 || pending}>
          <ChevronRight className="size-4" aria-hidden="true" />
          قبلی
        </Button>
        {step < STEPS.length - 1 ? (
          <Button onClick={next}>
            بعدی
            <ChevronLeft className="size-4" aria-hidden="true" />
          </Button>
        ) : (
          <Button onClick={submit} disabled={pending}>
            {pending ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <Send className="size-4" aria-hidden="true" />}
            ثبت استعلام
          </Button>
        )}
      </div>

      <p className="mt-4 flex items-start gap-1.5 text-[11px] leading-5 text-muted-foreground">
        <ShieldAlert className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
        اطلاعات شما فقط برای پاسخ به استعلام استفاده می‌شود و در اختیار شخص ثالث قرار نمی‌گیرد. ثبت استعلام
        هیچ تعهد خریدی ایجاد نمی‌کند.
      </p>
    </div>
  );
}

function rand() {
  return Math.floor(Math.random() * 5) + 1;
}
