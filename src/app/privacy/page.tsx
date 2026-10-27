import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { siteConfig } from "@/lib/site";
import { toFaDigits } from "@/lib/format";

export const metadata: Metadata = {
  title: "سیاست حریم خصوصی",
  description:
    "سیاست حریم خصوصی بیمه مسئولیت ایران: داده‌هایی که جمع‌آوری می‌کنیم، نحوه استفاده، کوکی‌ها و حقوق شما.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

const SECTIONS = [
  {
    h: "چه داده‌هایی جمع‌آوری می‌کنیم؟",
    p: "فقط داده‌هایی که خودتان در فرم استعلام یا فرم تماس وارد می‌کنید: نام، شماره تماس، شهر و توضیحات اختیاری. آدرس IP به‌صورت هش‌شده و فقط برای جلوگیری از سوءاستفاده (محدودیت نرخ) ذخیره می‌شود؛ آدرس خام هرگز نگهداری نمی‌شود.",
  },
  {
    h: "داده‌ها چگونه استفاده می‌شوند؟",
    p: "داده‌ها فقط برای پاسخ به استعلام، صدور پیش‌فاکتور و پیگیری خسارت استفاده می‌شوند و در اختیار شخص ثالث قرار نمی‌گیرد. جز در موارد الزام قانونی، هیچ داده‌ای به اشخاص ثالث منتقل نمی‌شود.",
  },
  {
    h: "کوکی‌ها",
    p: "از کوکی‌های ضروری برای عملکرد سایت (مانند ذخیره تم روشن/تاریک) استفاده می‌کنیم. کوکی ردیابی تبلیغاتی به‌صورت پیش‌فرض استفاده نمی‌شود.",
  },
  {
    h: "امنیت",
    p: "تمام ارتباطات از طریق HTTPS انجام می‌شود. کلیدهای API فقط در سرور نگهداری می‌شوند و هرگز در مرورگر شما قرار نمی‌گیرند. ورودی فرم‌ها با اعتبارسنجی سخت‌گیرانه و محدودیت نرخ محافظت می‌شود.",
  },
  {
    h: "حقوق شما",
    p: "می‌توانید درخواست حذف داده‌های خود را به ایمیل سایت ارسال کنید؛ حداکثر تا ده روز کاری حذف می‌شود.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ name: "سیاست حریم خصوصی", href: "/privacy" }]} />
      <h1 className="mt-6 text-2xl font-extrabold sm:text-3xl">سیاست حریم خصوصی</h1>
      <p className="mt-2 text-xs text-muted-foreground">آخرین بازبینی: {toFaDigits("1404/08/29")}</p>

      <div className="prose-fa mt-8 flex flex-col gap-8">
        {SECTIONS.map((s) => (
          <section key={s.h}>
            <h2 className="mb-2 text-lg font-extrabold">{s.h}</h2>
            <p className="text-[15px] leading-8 text-foreground/90">{s.p}</p>
          </section>
        ))}
        <section>
          <h2 className="mb-2 text-lg font-extrabold">اطلاعات تماس</h2>
          <p className="text-[15px] leading-8 text-foreground/90">
            {siteConfig.nap.legalName} — {siteConfig.nap.address} — تلفن: {siteConfig.nap.phoneDisplay} —
            ایمیل: {siteConfig.nap.email}
          </p>
        </section>
      </div>
    </div>
  );
}
