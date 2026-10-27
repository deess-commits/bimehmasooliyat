"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { toFaDigits } from "@/lib/format";
import { NewsletterForm } from "@/components/newsletter-form";

const CATEGORY_LINKS = [
  { href: "/liability/professional", label: "مسئولیت حرفه‌ای" },
  { href: "/liability/commercial", label: "مسئولیت کسب‌وکار و صنعت" },
  { href: "/liability/corporate", label: "مسئولیت شرکتی" },
  { href: "/liability/public", label: "مسئولیت عمومی و فردی" },
];

const RESOURCE_LINKS = [
  { href: "/dih", label: "جدول دیه ۱۴۰۴" },
  { href: "/coverage-limit", label: "راهنمای سقف تعهد" },
  { href: "/deductible", label: "راهنمای فرانشیز" },
  { href: "/renewal", label: "تمدید و الحاقیه" },
  { href: "/documents", label: "مدارک و فرایند صدور" },
  { href: "/policy-review-checklist", label: "چک‌لیست قبل از امضا" },
  { href: "/startup-guide", label: "شرکت‌های تازه‌تأسیس" },
  { href: "/contract-tender", label: "قراردادها و مناقصات" },
  { href: "/professional-vs-general", label: "حرفه‌ای یا عمومی" },
  { href: "/medical-liability-guide", label: "گروه‌های درمانی" },
  { href: "/events-insurance-guide", label: "رویدادها و همایش‌ها" },
  { href: "/guides", label: "همه راهنماهای عمومی" },
  { href: "/compare", label: "مقایسه انواع پوشش" },
  { href: "/industry", label: "بیمه مسئولیت به تفکیک صنعت" },
  { href: "/city", label: "راهنمای ۴۴ شهر" },
  { href: "/glossary", label: "واژه‌نامه اصطلاحات" },
  { href: "/laws", label: "قوانین و مبانی حقوقی" },
  { href: "/blog", label: "دانشنامه بیمه مسئولیت" },
  { href: "/faq", label: "سوالات متداول" },
];

// نوار شهرهای اصلی در فوتر — مسیر خزش دائمی به صفحات محلی (سئوی محلی)
const FOOTER_CITY_LINKS = [
  { slug: "tehran", name: "تهران" },
  { slug: "mashhad", name: "مشهد" },
  { slug: "isfahan", name: "اصفهان" },
  { slug: "shiraz", name: "شیراز" },
  { slug: "tabriz", name: "تبریز" },
  { slug: "karaj", name: "کرج" },
  { slug: "ahvaz", name: "اهواز" },
  { slug: "qom", name: "قم" },
];

const SERVICE_LINKS = [
  { href: "/quote", label: "استعلام قیمت" },
  { href: "/track", label: "پیگیری استعلام" },
  { href: "/claims", label: "مراحل دریافت خسارت" },
  { href: "/about", label: "درباره ما و متدولوژی محتوا" },
  { href: "/contact", label: "تماس با ما" },
  { href: "/privacy", label: "سیاست حریم خصوصی" },
  { href: "/terms", label: "شرایط استفاده" },
];

export function SiteFooter() {
  const pathname = usePathname();
  // نسخه انگلیسی chrome خودش را دارد — فوتر فارسی فقط برای مسیرهای فارسی
  if (pathname.startsWith("/en")) return null;
  const year = toFaDigits(1404);
  return (
    <footer className="mt-auto border-t bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand + NAP */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <img src="/bimeh-iran-emblem.png" alt="آرم بیمه ایران" className="size-10 shrink-0 rounded-xl bg-white object-contain p-1 ring-1 ring-black/5" />
              <div>
                <p className="font-extrabold">{siteConfig.name}</p>
                <p className="text-[11px] text-muted-foreground">{siteConfig.nameEn}</p>
              </div>
            </div>
            <p className="text-sm leading-7 text-muted-foreground">
              {siteConfig.tagline} — فقط و فقط بیمه مسئولیت: از تشخیص ریسک تا دریافت خسارت.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="mt-1 size-4 shrink-0 text-primary" aria-hidden="true" />
                <span>{siteConfig.nap.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4 shrink-0 text-primary" aria-hidden="true" />
                <a href={`tel:${siteConfig.nap.phone}`} className="hover:text-primary" dir="ltr">
                  {siteConfig.nap.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 shrink-0 text-primary" aria-hidden="true" />
                <a href={`mailto:${siteConfig.nap.email}`} className="hover:text-primary" dir="ltr">
                  {siteConfig.nap.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="size-4 shrink-0 text-primary" aria-hidden="true" />
                <span>{siteConfig.nap.hours}</span>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <nav aria-label="دسته‌های بیمه مسئولیت">
            <h2 className="mb-3 text-sm font-bold">انواع بیمه مسئولیت</h2>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {CATEGORY_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/liability" className="font-semibold text-primary hover:underline">
                  همه ۳۳+ نوع بیمه مسئولیت
                </Link>
              </li>
            </ul>
          </nav>

          {/* Reference resources */}
          <nav aria-label="منابع مرجع">
            <h2 className="mb-3 text-sm font-bold">منابع مرجع</h2>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {RESOURCE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services + legal */}
          <nav aria-label="خدمات و صفحات قانونی">
            <h2 className="mb-3 text-sm font-bold">خدمات</h2>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {SERVICE_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Trust + license line — فقط ادعاهای تأییدشده (YMYL) */}
        <div className="mt-8 rounded-xl border bg-card p-4 text-sm leading-7 text-muted-foreground">
          <p className="font-semibold text-foreground">{siteConfig.nap.legalName}</p>
          <p className="mt-1">
            {siteConfig.nap.licenseNo}؛ این وب‌سایت تنها محصولات بیمه مسئولیت{" "}
            <a href={siteConfig.parentOrganization.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              {siteConfig.parentOrganization.name}
            </a>{" "}
            را ارائه می‌کند.
          </p>
        </div>

        {/* City strip — هاب شهرها + شهرهای اصلی */}
        <nav aria-label="راهنمای شهرها" className="mt-4 rounded-xl border bg-card p-4">
          <p className="text-sm font-semibold text-foreground">بیمه مسئولیت در شهرها</p>
          <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1.5 text-[13px] text-muted-foreground">
            {FOOTER_CITY_LINKS.map((c) => (
              <li key={c.slug}>
                <Link href={`/city/${c.slug}`} className="hover:text-primary">
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/city" className="font-semibold text-primary hover:underline">
                همه ۴۴ شهر ←
              </Link>
            </li>
          </ul>
        </nav>

        {/* Newsletter */}
        <div className="mt-6 flex flex-col gap-4 rounded-xl border bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold">خبرنامه تغییرات دیه و نرخ‌ها</p>
            <p className="mt-1 text-xs leading-6 text-muted-foreground">
              هر ماه: ابلاغیه‌های جدید دیه، تغییرات آیین‌نامه‌ها و مقالات تخصصی بیمه مسئولیت — بدون تبلیغات.
            </p>
          </div>
          <NewsletterForm />
        </div>

        {/* Disclaimer */}
        <div className="mt-8 rounded-xl border bg-background p-4 text-xs leading-6 text-muted-foreground">
          <strong className="text-foreground">سلب مسئولیت حقوقی:</strong> محتوای این وب‌سایت صرفاً آموزشی و اطلاع‌رسانی است و
          جایگزین شرایط عمومی بیمه‌نامه، مشاوره حقوقی تخصصی یا ابلاغیه‌های رسمی نیست. جزئیات پوشش‌ها همیشه منوط به شرایط
          عمومی و خصوصی بیمه‌نامه صادرشده و آیین‌نامه‌های بیمه مرکزی است.
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t pt-5 text-xs text-muted-foreground sm:flex-row">
          <p>© {year} {siteConfig.name} — کلیه حقوق محفوظ است.</p>
          <p dir="ltr" className="font-mono">{siteConfig.domain}</p>
        </div>
      </div>
    </footer>
  );
}
