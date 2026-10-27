import type { Metadata } from "next";
import Link from "next/link";
import { FileSearch, PhoneCall } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { TrackForm } from "@/components/track-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "پیگیری استعلام بیمه مسئولیت",
  description:
    "وضعیت استعلام بیمه مسئولیت خود را با کد پیگیری بررسی کنید: ثبت، تماس کارشناس، پیش‌فاکتور رسمی و خرید نهایی — بدون نیاز به تماس تلفنی.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/track" },
};

const HELP_FAQS = [
  {
    q: "کد پیگیری را از کجا دریافت می‌کنم؟",
    a: "پس از ثبت استعلام در فرم قیمت، کد به قالب Q-YYMMDD-XXXX نمایش داده می‌شود و در پیامک تأیید نیز ارسال می‌گردد. اگر کد را گم کرده‌اید، با شماره نمایندگی تماس بگیرید؛ با شماره موبایل ثبت‌شده بازیابی می‌شود.",
  },
  {
    q: "چرا اطلاعات شخصی من در این صفحه نمایش داده نمی‌شود؟",
    a: "برای حفظ حریم خصوصی، پیگیری عمومی فقط وضعیت، نوع پوشش و تاریخ ثبت را نشان می‌دهد. نام و شماره تماس تنها در سامانه داخلی نمایندگی و برای کارشناس مربوطه قابل مشاهده است.",
  },
  {
    q: "استعلام من چند روز کاری بررسی می‌شود؟",
    a: "کارشناس حداکثر یک روز کاری تماس می‌گیرد و پیش‌فاکتور رسمی با نرخ مصوب بیمه ایران صادر می‌شود. اگر بیش از دو روز کاری گذشته و وضعیت تغییر نکرده، از طریق صفحه تماس اطلاع دهید.",
  },
];

export default function TrackPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[
          { name: "پیگیری استعلام", href: "/track" },
        ]}
      />
      <header className="mt-6">
        <h1 className="text-2xl font-extrabold leading-[1.6] sm:text-3xl">
          پیگیری استعلام بیمه مسئولیت
        </h1>
        <p className="prose-fa mt-3 max-w-3xl text-sm leading-8 text-muted-foreground">
          کد پیگیری‌ای که پس از ثبت استعلام دریافت کرده‌اید را وارد کنید تا وضعیت فعلی — ثبت،
          تماس کارشناس، پیش‌فاکتور رسمی یا خرید نهایی — بدون تماس تلفنی نمایش داده شود. اطلاعات
          شخصی شما در این صفحه عمومی نمی‌شود.
        </p>
      </header>

      <div className="mt-8">
        <TrackForm />
      </div>

      <section aria-labelledby="track-help" className="mt-10">
        <h2 id="track-help" className="text-lg font-extrabold">
          پرسش‌های متداول پیگیری
        </h2>
        <div className="mt-4 grid gap-4">
          {HELP_FAQS.map((f) => (
            <Card key={f.q}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm leading-7">{f.q}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[13px] leading-7 text-muted-foreground">{f.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <PhoneCall className="size-4 text-primary" aria-hidden="true" />
              تماس مستقیم با نمایندگی
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-7 text-muted-foreground">
            <a href={`tel:${siteConfig.nap.phone}`} className="font-bold text-foreground hover:text-primary">
              <span dir="ltr">{siteConfig.nap.phoneDisplay}</span>
            </a>
            <p className="mt-1">{siteConfig.nap.hours}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <FileSearch className="size-4 text-primary" aria-hidden="true" />
              استعلام جدید
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-7 text-muted-foreground">
            هنوز استعلام ثبت نکرده‌اید؟{" "}
            <Link href="/quote" className="font-bold text-primary hover:underline">
              فرم استعلام قیمت
            </Link>{" "}
            را تکمیل کنید.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
