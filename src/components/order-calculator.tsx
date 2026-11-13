"use client";

// ─── محاسبه‌گر آنلاین حق بیمه مسئولیت + ثبت سفارش ───────────────────
// سه رشته: پزشکان، پرستاران و پیراپزشکان، مهندسین
// قیمت لحظه‌ای با موتور src/lib/pricing — صحت‌سنجی سمت سرور در /api/orders

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  BadgeCheck,
  Calculator,
  CreditCard,
  HardHat,
  Info,
  Loader2,
  PhoneCall,
  Send,
  Stethoscope,
  Syringe,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  calculatePremium,
  DOCTOR_CEILINGS,
  DOCTOR_COVERAGES,
  ENGINEER_CLAUSES,
  ENGINEER_DIH_INCREASE,
  ENGINEER_FIELDS,
  ENGINEER_FINANCIALS,
  ENGINEER_GRADES,
  ENGINEER_RESPONSIBILITIES,
  ENGINEER_TABAREH_66,
  KIND_LABELS,
  NO_CLAIM_DOCTORS,
  NO_CLAIM_ENGINEERS,
  NO_CLAIM_NURSES,
  NURSE_CEILING_LABEL,
  NURSE_EMPLOYMENT,
  SPECIALTIES,
  YEAR_1405,
  type OrderKind,
} from "@/lib/pricing";
import { faNumber, toFaDigits } from "@/lib/format";
import { siteConfig } from "@/lib/site";

const KINDS: { id: OrderKind; label: string; short: string; icon: typeof Stethoscope }[] = [
  { id: "doctors", label: KIND_LABELS.doctors, short: "پزشکان", icon: Stethoscope },
  { id: "nurses", label: KIND_LABELS.nurses, short: "پرستاران و پیراپزشکان", icon: Syringe },
  { id: "engineers", label: KIND_LABELS.engineers, short: "مهندسین", icon: HardHat },
];

const LICENSE_LABEL: Record<OrderKind, string> = {
  doctors: "شماره نظام پزشکی",
  nurses: "شماره نظام پرستاری / پرسنلی",
  engineers: "شماره عضویت نظام مهندسی",
};

const LICENSE_PLACEHOLDER: Record<OrderKind, string> = {
  doctors: "مثلاً: ۱۲۳۴۵",
  nurses: "مثلاً: ۴۵۶۷۸",
  engineers: "مثلاً: TE-۱۲۳۴۵",
};

function rand() {
  return Math.floor(Math.random() * 5) + 1;
}

export function OrderCalculator() {
  const sp = useSearchParams();
  const initial = (sp.get("kind") ?? "") as OrderKind;
  const [kind, setKind] = useState<OrderKind>(
    initial === "doctors" || initial === "nurses" || initial === "engineers" ? initial : "doctors",
  );

  // ── ورودی محاسبه ──
  const [specialty, setSpecialty] = useState("");
  const [ceiling, setCeiling] = useState("21");
  const [coverages, setCoverages] = useState<string[]>([]);
  const [employment, setEmployment] = useState("rasmi");
  const [noClaim, setNoClaim] = useState("none");
  const [responsibility, setResponsibility] = useState("");
  const [field, setField] = useState("");
  const [grade, setGrade] = useState("");
  const [financial, setFinancial] = useState("f1");
  const [clauses, setClauses] = useState<string[]>([]);
  const [dihIncrease, setDihIncrease] = useState("none");
  const [tabareh66, setTabareh66] = useState("none");

  // ── اطلاعات متقاضی ──
  const [fullName, setFullName] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [workAddress, setWorkAddress] = useState("");
  const [prevPolicyNumber, setPrevPolicyNumber] = useState("");
  const [note, setNote] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot
  // کد امنیتی فقط بعد از mount تولید می‌شود تا با SSR یکسان باشد (بدون hydration mismatch)
  const [captcha, setCaptcha] = useState({ a: 0, b: 0 });
  useEffect(() => {
    setCaptcha({ a: rand(), b: rand() });
  }, []);
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState<{ code: string; total: number } | null>(null);

  const config = useMemo(
    () => ({
      specialty,
      ceiling,
      coverages,
      employment,
      noClaim,
      responsibility,
      field,
      grade,
      financial,
      clauses,
      dihIncrease,
      tabareh66,
    }),
    [specialty, ceiling, coverages, employment, noClaim, responsibility, field, grade, financial, clauses, dihIncrease, tabareh66],
  );

  const breakdown = useMemo(() => calculatePremium(kind, config), [kind, config]);

  const manualEngineer =
    kind === "engineers" &&
    responsibility !== "" &&
    ENGINEER_RESPONSIBILITIES.find((r) => r.id === responsibility)?.rate == null;

  const priceReady = breakdown != null;

  function switchKind(next: OrderKind) {
    setKind(next);
    setSpecialty("");
    setCeiling("21");
    setCoverages([]);
    setNoClaim("none");
    setResponsibility("");
    setField("");
    setGrade("");
    setFinancial("f1");
    setClauses([]);
    setDihIncrease("none");
    setTabareh66("none");
  }

  function toggle(list: string[], setList: (v: string[]) => void, id: string) {
    setList(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);
  }

  async function submit() {
    if (!priceReady || !breakdown) {
      toast.error(manualEngineer
        ? "این نوع مسئولیت محاسبه آنلاین ندارد؛ با کارشناس تماس بگیرید"
        : "ابتدا مشخصات بیمه‌نامه را برای محاسبه قیمت تکمیل کنید");
      return;
    }
    if (fullName.trim().length < 3) return toast.error("نام و نام خانوادگی را کامل وارد کنید");
    if (!/^\d{10}$/.test(nationalId.trim())) return toast.error("کد ملی ۱۰ رقمی معتبر وارد کنید");
    if (!/^09\d{9}$/.test(phone.trim())) return toast.error("شماره موبایل معتبر (۰۹xxxxxxxxx) وارد کنید");
    if (Number(captchaAnswer) !== captcha.a + captcha.b)
      return toast.error("پاسخ سوال امنیتی نادرست است");
    if (!consent) return toast.error("پذیرش شرایط ثبت سفارش الزامی است");

    setPending(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind,
          config,
          fullName: fullName.trim(),
          nationalId: nationalId.trim(),
          phone: phone.trim(),
          email: email.trim(),
          city: city.trim(),
          postalCode: postalCode.trim(),
          birthYear: birthYear.trim() ? Number(birthYear.trim()) : undefined,
          licenseNumber: licenseNumber.trim(),
          workAddress: workAddress.trim(),
          prevPolicyNumber: prevPolicyNumber.trim(),
          note: note.trim(),
          consent: true,
          website,
          captcha: { ...captcha, answer: Number(captchaAnswer) },
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data?.error ?? "ثبت سفارش ناموفق بود؛ دوباره تلاش کنید");
        return;
      }
      setDone({ code: data.trackingCode as string, total: data.total as number });
      toast.success("سفارش شما ثبت شد");
    } catch {
      toast.error("خطای شبکه — دوباره تلاش کنید");
    } finally {
      setPending(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-2xl border-2 border-primary/30 bg-accent/50 p-8 text-center">
        <BadgeCheck className="mx-auto size-14 text-primary" aria-hidden="true" />
        <h2 className="mt-4 text-xl font-extrabold">سفارش شما با موفقیت ثبت شد</h2>
        <p className="mx-auto mt-2 max-w-lg text-sm leading-7 text-muted-foreground">
          حق بیمه محاسبه‌شده: <b>{faNumber(done.total)} تومان</b> — کارشناس ما برای نهایی‌کردن صدور
          بیمه‌نامه و هماهنگی پرداخت (نقدی یا اقساطی) حداکثر تا یک روز کاری تماس می‌گیرد.
        </p>
        <p className="mt-3 inline-block rounded-xl border bg-card px-6 py-3 font-extrabold tracking-wider text-primary" dir="ltr">
          {done.code}
        </p>
        <p className="mt-4 text-xs leading-6 text-muted-foreground">
          این کد را نگه دارید؛ وضعیت سفارش را می‌توانید در صفحه{" "}
          <a href="/track" className="font-bold text-primary hover:underline">
            پیگیری
          </a>{" "}
          بررسی کنید. قیمت نهایی صدور پس از تأیید کارشناس بیمه ایران ممکن است تغییر کند.
        </p>
      </div>
    );
  }

  const noClaimOptions =
    kind === "doctors" ? NO_CLAIM_DOCTORS : kind === "nurses" ? NO_CLAIM_NURSES : NO_CLAIM_ENGINEERS;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
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
      <div className="space-y-5">
        {/* انتخاب رشته */}
        <div className="grid grid-cols-3 gap-2.5" role="tablist" aria-label="انتخاب رشته بیمه">
          {KINDS.map((k) => {
            const Icon = k.icon;
            const active = kind === k.id;
            return (
              <button
                key={k.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => switchKind(k.id)}
                className={`flex flex-col items-center gap-1.5 rounded-xl border-2 px-2 py-3.5 text-center transition-colors min-h-16 ${
                  active
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-card text-muted-foreground hover:border-primary/40"
                }`}
              >
                <Icon className="size-5" aria-hidden="true" />
                <span className="text-xs font-bold leading-5 sm:text-[13px]">{k.short}</span>
              </button>
            );
          })}
        </div>

        {/* مشخصات بیمه‌نامه */}
        <section className="rounded-2xl border bg-card p-5" aria-labelledby="policy-spec">
          <h2 id="policy-spec" className="flex items-center gap-2 text-sm font-extrabold">
            <Calculator className="size-4 text-primary" aria-hidden="true" />
            مشخصات بیمه‌نامه
          </h2>

          <div className="mt-4 space-y-4">
            {kind !== "engineers" ? (
              <>
                <div>
                  <Label htmlFor="specialty">تخصص *</Label>
                  <Select value={specialty} onValueChange={setSpecialty}>
                    <SelectTrigger id="specialty" className="mt-1.5 w-full">
                      <SelectValue placeholder="تخصص خود را انتخاب کنید…" />
                    </SelectTrigger>
                    <SelectContent className="max-h-72 nice-scroll">
                      {SPECIALTIES[kind].map((s) => (
                        <SelectItem key={s.label} value={s.label}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="mt-1.5 text-[11px] text-muted-foreground">
                    {toFaDigits(SPECIALTIES[kind].length)} تخصص — نرخ هر تخصص بر اساس کلاس ریسک فعالیت
                    متفاوت است.
                  </p>
                </div>

                {kind === "doctors" ? (
                  <fieldset>
                    <legend className="mb-2 text-[13px] font-bold">سقف تعهد هر زیان‌دیده *</legend>
                    <RadioGroup value={ceiling} onValueChange={setCeiling} className="gap-2.5">
                      {DOCTOR_CEILINGS.map((c) => (
                        <Label
                          key={c.id}
                          htmlFor={`ceiling-${c.id}`}
                          className={`flex cursor-pointer items-start gap-2.5 rounded-xl border p-3 text-[13px] leading-6 transition-colors ${
                            ceiling === c.id ? "border-primary bg-primary/5" : "hover:border-primary/40"
                          }`}
                        >
                          <RadioGroupItem id={`ceiling-${c.id}`} value={c.id} className="mt-1" />
                          <span>{c.label}</span>
                        </Label>
                      ))}
                    </RadioGroup>
                  </fieldset>
                ) : (
                  <div className="flex items-start gap-2 rounded-xl bg-accent/50 p-3 text-[13px] leading-6">
                    <Info className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <span>
                      سقف تعهد این بیمه‌نامه ثابت است: {NURSE_CEILING_LABEL}
                      {kind === "nurses" ? " — نوع استخدام اثری در قیمت ندارد." : ""}
                    </span>
                  </div>
                )}

                {kind === "nurses" ? (
                  <fieldset>
                    <legend className="mb-2 text-[13px] font-bold">نوع استخدام</legend>
                    <RadioGroup value={employment} onValueChange={setEmployment} className="flex flex-wrap gap-2.5">
                      {NURSE_EMPLOYMENT.map((e) => (
                        <Label
                          key={e.id}
                          htmlFor={`emp-${e.id}`}
                          className={`flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2.5 text-[13px] transition-colors ${
                            employment === e.id ? "border-primary bg-primary/5" : "hover:border-primary/40"
                          }`}
                        >
                          <RadioGroupItem id={`emp-${e.id}`} value={e.id} />
                          <span>{e.label}</span>
                        </Label>
                      ))}
                    </RadioGroup>
                  </fieldset>
                ) : (
                  <fieldset>
                    <legend className="mb-2 text-[13px] font-bold">پوشش‌های تکمیلی (اختیاری)</legend>
                    <div className="space-y-2">
                      {DOCTOR_COVERAGES.map((c) => (
                        <Label
                          key={c.id}
                          htmlFor={`cov-${c.id}`}
                          className="flex cursor-pointer items-start gap-2.5 rounded-lg border p-3 text-[13px] leading-6 transition-colors hover:border-primary/40"
                        >
                          <Checkbox
                            id={`cov-${c.id}`}
                            checked={coverages.includes(c.id)}
                            onCheckedChange={() => toggle(coverages, setCoverages, c.id)}
                            className="mt-0.5"
                          />
                          <span>
                            {c.label}{" "}
                            <span className="text-muted-foreground">
                              ({c.pct > 0 ? "+" : "−"}
                              {toFaDigits(String(Math.abs(Math.round(c.pct * 100 * 100)) / 100))}٪)
                            </span>
                          </span>
                        </Label>
                      ))}
                    </div>
                  </fieldset>
                )}
              </>
            ) : (
              <>
                <div>
                  <Label htmlFor="responsibility">مسئولیت مهندس (موضوع پروانه) *</Label>
                  <Select value={responsibility} onValueChange={setResponsibility}>
                    <SelectTrigger id="responsibility" className="mt-1.5 w-full">
                      <SelectValue placeholder="نوع مسئولیت خود را انتخاب کنید…" />
                    </SelectTrigger>
                    <SelectContent className="max-h-72 nice-scroll">
                      {ENGINEER_RESPONSIBILITIES.map((r) => (
                        <SelectItem key={r.id} value={r.id}>
                          {r.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="field">رشته مهندسی (موضوع پروانه) *</Label>
                  <Select value={field} onValueChange={setField}>
                    <SelectTrigger id="field" className="mt-1.5 w-full">
                      <SelectValue placeholder="رشته مهندسی خود را انتخاب کنید…" />
                    </SelectTrigger>
                    <SelectContent className="max-h-72 nice-scroll">
                      {ENGINEER_FIELDS.map((f) => (
                        <SelectItem key={f.id} value={f.id}>
                          {f.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="grade">پایه مهندسی</Label>
                  <Select value={grade} onValueChange={setGrade}>
                    <SelectTrigger id="grade" className="mt-1.5 w-full">
                      <SelectValue placeholder="پایه مهندسی خود را انتخاب کنید…" />
                    </SelectTrigger>
                    <SelectContent>
                      {ENGINEER_GRADES.map((g) => (
                        <SelectItem key={g.id} value={g.id}>
                          {g.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="mt-1.5 text-[11px] text-muted-foreground">
                    پایه مهندسی اثری در حق بیمه ندارد و فقط برای صدور بیمه‌نامه ثبت می‌شود.
                  </p>
                </div>
                <div>
                  <Label htmlFor="financial">
                    تعهدات خسارت مالی + دیه و هزینه پزشکی در طول مدت بیمه *
                  </Label>
                  <Select value={financial} onValueChange={setFinancial}>
                    <SelectTrigger id="financial" className="mt-1.5 w-full">
                      <SelectValue placeholder="تعهد مورد نظر را انتخاب کنید…" />
                    </SelectTrigger>
                    <SelectContent className="max-h-64 nice-scroll">
                      {ENGINEER_FINANCIALS.map((f) => (
                        <SelectItem key={f.id} value={f.id}>
                          {f.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <fieldset>
                  <legend className="mb-2 text-[13px] font-bold">کلوزهای تکمیلی (اختیاری)</legend>
                  <div className="space-y-2">
                    {ENGINEER_CLAUSES.map((c) => (
                      <Label
                        key={c.id}
                        htmlFor={`cl-${c.id}`}
                        className="flex cursor-pointer items-start gap-2.5 rounded-lg border p-3 text-[13px] leading-6 transition-colors hover:border-primary/40"
                      >
                        <Checkbox
                          id={`cl-${c.id}`}
                          checked={clauses.includes(c.id)}
                          onCheckedChange={() => toggle(clauses, setClauses, c.id)}
                          className="mt-0.5"
                        />
                        <span>
                          {c.label}{" "}
                          <span className="text-muted-foreground">
                            (+{toFaDigits(String(Math.round(c.pct * 100)))}٪)
                          </span>
                        </span>
                      </Label>
                    ))}
                  </div>
                </fieldset>

                <div>
                  <Label htmlFor="dihIncrease">پوشش افزایش ریالی دیه در سال</Label>
                  <Select value={dihIncrease} onValueChange={setDihIncrease}>
                    <SelectTrigger id="dihIncrease" className="mt-1.5 w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ENGINEER_DIH_INCREASE.map((d) => (
                        <SelectItem key={d.id} value={d.id}>
                          {d.label}
                          {d.pct > 0 ? ` (+${toFaDigits(String(Math.round(d.pct * 100)))}٪)` : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="tabareh66">تبصره ۱ ماده ۶۶ تأمین اجتماعی</Label>
                  <Select value={tabareh66} onValueChange={setTabareh66}>
                    <SelectTrigger id="tabareh66" className="mt-1.5 w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ENGINEER_TABAREH_66.map((t) => (
                        <SelectItem key={t.id} value={t.id}>
                          {t.label}
                          {t.billion > 0
                            ? ` (+${toFaDigits(faNumberPlain(297_000 * t.billion))} تومان)`
                            : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </div>
        </section>

        {/* سابقه و تخفیف */}
        <section className="rounded-2xl border bg-card p-5" aria-labelledby="no-claim">
          <h2 id="no-claim" className="text-sm font-extrabold">
            سابقه بیمه‌نامه و تخفیف عدم خسارت
          </h2>
          <div className="mt-4 space-y-4">
            <div>
              <Label htmlFor="noClaim">
                {kind === "doctors"
                  ? "وضعیت بیمه‌نامه سال قبل"
                  : `تعداد سال تخفیف عدم خسارت بیمه ایران`}
              </Label>
              <Select value={noClaim} onValueChange={setNoClaim}>
                <SelectTrigger id="noClaim" className="mt-1.5 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-64 nice-scroll">
                  {noClaimOptions.map((d) => (
                    <SelectItem key={d.id} value={d.id}>
                      {d.label}
                      {d.pct > 0 ? ` — تخفیف ${toFaDigits(String(Math.round(d.pct * 100)))}٪` : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="mt-1.5 text-[11px] leading-5 text-muted-foreground">
                تخفیف عدم خسارت فقط با بیمه‌نامه سال قبل اعمال می‌شود (حداکثر ۳۰۰ روز از اتمام).
                سایر شرکت‌ها نیازمند گواهی عدم خسارت است.
              </p>
            </div>
            {noClaim !== "none" ? (
              <div>
                <Label htmlFor="prevPolicyNumber">شماره بیمه‌نامه سال قبل</Label>
                <Input
                  id="prevPolicyNumber"
                  value={prevPolicyNumber}
                  onChange={(e) => setPrevPolicyNumber(e.target.value)}
                  placeholder="شماره بیمه‌نامه‌ای که تخفیف آن اعمال می‌شود"
                  className="mt-1.5"
                  dir="ltr"
                />
              </div>
            ) : null}
          </div>
        </section>

        {/* اطلاعات متقاضی */}
        <section className="rounded-2xl border bg-card p-5" aria-labelledby="applicant">
          <h2 id="applicant" className="text-sm font-extrabold">
            اطلاعات متقاضی صدور بیمه‌نامه
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label htmlFor="fullName">نام و نام خانوادگی *</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="مثلاً: دکتر علی رضایی"
                className="mt-1.5"
                autoComplete="name"
              />
            </div>
            <div>
              <Label htmlFor="nationalId">کد ملی *</Label>
              <Input
                id="nationalId"
                value={nationalId}
                onChange={(e) => setNationalId(e.target.value.replace(/\D/g, "").slice(0, 10))}
                placeholder="۱۰ رقم"
                inputMode="numeric"
                className="mt-1.5"
                dir="ltr"
              />
            </div>
            <div>
              <Label htmlFor="phone">شماره موبایل *</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 11))}
                placeholder="۰۹xxxxxxxxx"
                inputMode="tel"
                className="mt-1.5 text-start"
                dir="ltr"
                autoComplete="tel"
              />
            </div>
            <div>
              <Label htmlFor="email">ایمیل</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="مثلاً: name@example.com"
                className="mt-1.5"
                dir="ltr"
                autoComplete="email"
              />
            </div>
            <div>
              <Label htmlFor="city">شهر</Label>
              <Input
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="مثلاً: تهران"
                className="mt-1.5"
              />
            </div>
            <div>
              <Label htmlFor="postalCode">کد پستی</Label>
              <Input
                id="postalCode"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value.replace(/\D/g, "").slice(0, 10))}
                placeholder="۱۰ رقم"
                inputMode="numeric"
                className="mt-1.5"
                dir="ltr"
              />
            </div>
            <div>
              <Label htmlFor="birthYear">سال تولد (شمسی)</Label>
              <Input
                id="birthYear"
                value={birthYear}
                onChange={(e) => setBirthYear(e.target.value.replace(/\D/g, "").slice(0, 4))}
                placeholder="مثلاً: ۱۳۶۹"
                inputMode="numeric"
                className="mt-1.5"
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="licenseNumber">{LICENSE_LABEL[kind]}</Label>
              <Input
                id="licenseNumber"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
                placeholder={LICENSE_PLACEHOLDER[kind]}
                className="mt-1.5"
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="workAddress">آدرس محل فعالیت (مطب / بیمارستان / کارگاه / پروژه)</Label>
              <Input
                id="workAddress"
                value={workAddress}
                onChange={(e) => setWorkAddress(e.target.value)}
                placeholder="نام و آدرس محل فعالیت — یا «کلیه مراکز درمانی سراسر کشور»"
                className="mt-1.5"
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="note">توضیحات (اختیاری)</Label>
              <Input
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="مثلاً: تعداد پروژه‌های فعال، شرایط خاص پوشش و…"
                className="mt-1.5"
              />
            </div>
          </div>
        </section>

        {/* تایید و ثبت */}
        <section className="rounded-2xl border bg-card p-5" aria-labelledby="confirm">
          <h2 id="confirm" className="text-sm font-extrabold">
            تایید و ثبت سفارش
          </h2>
          <div className="mt-4 space-y-4">
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <Label htmlFor="captcha">
                  سوال امنیتی: حاصل {toFaDigits(captcha.a)} + {toFaDigits(captcha.b)} چند است؟ *
                </Label>
                <Input
                  id="captcha"
                  value={captchaAnswer}
                  onChange={(e) => setCaptchaAnswer(e.target.value.replace(/\D/g, ""))}
                  inputMode="numeric"
                  className="mt-1.5 max-w-32"
                />
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Checkbox id="order-consent" checked={consent} onCheckedChange={(v) => setConsent(v === true)} />
              <Label htmlFor="order-consent" className="text-xs leading-6 font-normal text-muted-foreground">
                اطلاعات من برای صدور بیمه‌نامه استفاده می‌شود و صحت انتخاب‌های محاسبه را تأیید می‌کنم *
              </Label>
            </div>
            <Button onClick={submit} disabled={pending} className="w-full min-h-12 text-sm">
              {pending ? (
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              ) : (
                <Send className="size-4" aria-hidden="true" />
              )}
              ثبت سفارش بیمه‌نامه
            </Button>
            <p className="text-[11px] leading-5 text-muted-foreground">
              با ثبت سفارش، کارشناس برای نهایی‌سازی صدور و هماهنگی پرداخت تماس می‌گیرد؛ پرداخت به
              انتخاب شما نقدی (با تخفیف) یا اقساطی است. ثبت سفارش تا پیش از پرداخت، تعهد مالی ایجاد
              نمی‌کند.
            </p>
          </div>
        </section>
      </div>

      {/* پنل قیمت — sticky در دسکتاپ */}
      <aside className="lg:sticky lg:top-6 lg:self-start" aria-label="صورت‌حساب محاسبه">
        <div className="rounded-2xl border-2 border-primary/30 bg-card p-5">
          <h2 className="text-sm font-extrabold">صورت‌حساب محاسبه (سالانه — تومان)</h2>
          <p className="mt-1 text-[11px] leading-5 text-muted-foreground">{KIND_LABELS[kind]}</p>

          <div className="mt-4 space-y-2.5 text-[13px] leading-6">
            {priceReady && breakdown ? (
              <>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">نرخ پایه</span>
                  <span className="font-bold tabular-nums">{faNumber(breakdown.base)}</span>
                </div>
                <p className="text-[11px] text-muted-foreground">{breakdown.baseLabel}</p>
                {breakdown.lines.map((l) => (
                  <div key={l.label} className="flex items-start justify-between gap-3">
                    <span className="text-muted-foreground">{l.label}</span>
                    <span className={`tabular-nums ${l.amount >= 0 ? "text-emerald-700 dark:text-emerald-400" : "text-destructive"}`} dir="ltr">
                      {l.amount >= 0 ? "+" : "−"}{faNumber(Math.abs(l.amount))}
                    </span>
                  </div>
                ))}
                <div className="flex items-center justify-between gap-3 border-t border-dashed pt-2.5">
                  <span className="text-muted-foreground">جمع با پوشش‌ها</span>
                  <span className="font-bold tabular-nums">{faNumber(breakdown.subtotal)}</span>
                </div>
                {breakdown.discount ? (
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-muted-foreground">{breakdown.discount.label}</span>
                    <span className="tabular-nums text-emerald-700 dark:text-emerald-400" dir="ltr">
                      −{faNumber(Math.abs(breakdown.discount.amount))}
                    </span>
                  </div>
                ) : null}
                {breakdown.riders.map((l) => (
                  <div key={l.label} className="flex items-start justify-between gap-3">
                    <span className="text-muted-foreground">{l.label}</span>
                    <span className="tabular-nums" dir="ltr">
                      +{faNumber(l.amount)}
                    </span>
                  </div>
                ))}
                <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-primary/10 p-3">
                  <span className="text-sm font-extrabold">قیمت نهایی</span>
                  <span className="text-lg font-extrabold tabular-nums text-primary">
                    {faNumber(breakdown.total)}
                    <span className="ms-1 text-xs font-bold">تومان</span>
                  </span>
                </div>
              </>
            ) : manualEngineer ? (
              <div className="rounded-xl bg-amber-500/10 p-4 text-[13px] leading-7">
                «
                {ENGINEER_RESPONSIBILITIES.find((r) => r.id === responsibility)?.label}
                » محاسبه آنلاین ندارد. با کارشناس تماس بگیرید یا از{" "}
                <a href="/quote" className="font-bold text-primary hover:underline">
                  فرم استعلام عمومی
                </a>{" "}
                استفاده کنید.
                <a href={`tel:${siteConfig.nap.phone}`} className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground">
                  <PhoneCall className="size-4" aria-hidden="true" />
                  <span dir="ltr">{siteConfig.nap.phoneDisplay}</span>
                </a>
              </div>
            ) : (
              <div className="rounded-xl bg-secondary/60 p-4 text-[13px] leading-7 text-muted-foreground">
                {kind === "engineers"
                  ? "برای محاسبه، نوع مسئولیت، رشته و تعهدات مالی را انتخاب کنید."
                  : "برای محاسبه، تخصص خود را انتخاب کنید."}
              </div>
            )}
          </div>

          <div className="mt-4 space-y-2 border-t border-dashed pt-3.5 text-[11px] leading-5 text-muted-foreground">
            <p className="flex items-start gap-1.5">
              <CreditCard className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
              پرداخت اقساطی: {YEAR_1405.installmentNote} — {YEAR_1405.cashDiscountNote}
            </p>
            <p>
              مبنای نرخ: دیه ۱۴۰۵ — ماه عادی {faNumber(YEAR_1405.dihNormalRial / 10)} تومان و ماه
              حرام {faNumber(YEAR_1405.dihHaramRial / 10)} تومان برای هر زیان‌دیده.
            </p>
            <p>قیمت نهایی صدور پس از بررسی کارشناس بیمه ایران قابل تغییر است.</p>
          </div>
        </div>
      </aside>
    </div>
  );
}

/** عدد لاتین با جداکننده — برای ورودی‌های Select */
function faNumberPlain(n: number): string {
  return n.toLocaleString("en-US");
}
