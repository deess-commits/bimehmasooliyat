# سند معماری — BimehMasooliyat.ir

> پلتفرم تک‌محصولی بیمه مسئولیت | Next.js 16 (App Router) + TypeScript + Tailwind 4 + shadcn/ui + Prisma (SQLite)

## ۱. اصل معماری: «محتوا به‌مثابه داده»

کل محتوای بیمه‌ای (۳۳ محصول، ۶ مقاله، ۸ شهر، ~۲۱۵ FAQ) در **Prisma/SQLite** نگهداری می‌شود و صفحات
از طریق `generateStaticParams` + `revalidate=3600` به‌صورت ISR/SSG رندر می‌شوند. این انتخاب سه دلیل دارد:

1. **Performance (بند ۹):** خروجی نهایی HTML استاتیک با LCP پایین؛ بدون فچ کلاینتی محتوا.
2. **مدیریت محتوا:** افزودن محصول جدید = یک آبجکت در `prisma/seed-data/` + اجرای `db:seed` — بدون کد.
3. **همخوانی JSON-LD ↔ محتوای قابل مشاهده:** Schema و UI از یک منبع داده مشترک می‌خوانند (الزام بند ۵).

## ۲. جریان داده (Flow)

```
seed-data/*.ts  ──db:seed──►  SQLite (db/custom.db)
                                   │
            ┌──────────────────────┼──────────────────────────┐
            ▼                      ▼                          ▼
   src/lib/data.ts (queries)   /api/quote (POST)          /api/contact (POST)
            │                      │                          │
            ▼                      ▼                          ▼
   صفحات SSG/ISR            Prisma QuoteRequest         Prisma ContactMessage
   (layout, home, product,    + rate-limit + Zod          + rate-limit + Zod
   city, blog, faq)           + honeypot/captcha          + honeypot
```

## ۳. ساختار پوشه‌ها

```
prisma/
  schema.prisma          ← ۹ موجودیت (بند ۸)
  seed.ts                ← seed idempotent
  seed-data/
    types.ts             ← قرارداد داده (SeedProduct, SeedCity, ...)
    products-*.ts        ← ۳۳ محصول در ۳ فایل
    cities.ts, articles.ts, site.ts
src/app/
  layout.tsx             ← RTL، Vazirmatn، InsuranceAgency+WebSite JSON-LD
  page.tsx               ← صفحه اصلی (intent hub)
  liability/             ← فهرست + [category] + [category]/[slug] (ساختار ۱۲بخشی)
  quote/  claims/  blog/  faq/  city/[slug]/  about/  contact/  privacy/
  api/quote, api/contact ← بک‌اند (بند ۱۰)
  sitemap.ts  robots.ts  not-found.tsx
src/components/          ← site-header/footer + AnswerBlock + NumberedSteps + FaqSection + ...
src/lib/
  site.ts                ← NAP + sameAs (تنها جای قابل ویرایش برای اطلاعات نمایندگی)
  seo.tsx                ← سازنده‌های JSON-LD
  data.ts                ← لایه query
  validation.ts          ← Zod مشترک کلاینت/سرور
  rate-limit.ts          ← limiter درون‌حافظه‌ای
docs/                    ← این سند + ماتریس نیت + چک‌لیست + استقرار
public/llms.txt          ← راهنمای LLMها
```

## ۴. تصمیم‌های کلیدی و ریسک‌ها

| تصمیم | دلیل | ریسک / پادزهر |
|---|---|---|
| محتوا در DB (نه MDX) | مدیریت متمرکز + خواندن مشترک UI/Schema | وابستگی به seed؛ پادزهر: seed idempotent + version control داده |
| FAQ جدا از محصول (مدل Faq) | FAQPage جهانی و محصولی با یک مدل | — |
| آرایه‌ها همه `Json` | قید «primitive list ممنوع» پروژه | تایپ‌سیفتی با cast به types.ts کنترل می‌شود |
| rate-limit درون‌حافظه‌ای | تک‌سرور، بدون Redis | در serverless باید Redis/Upstash شود (مستند در فایل) |
| کپچای ریاضی + Honeypot | بدون وابستگی خارجی؛ WCAG-friendly | برای production می‌توان hCaptcha جایگزین کرد |
| دیه با برچسب «نمایشی» | YMYL — بدون منبع رسمی لحظه‌ای، عدد قطعی نمی‌گوییم | باید سالانه با ابلاغیه قوه قضائیه به‌روز شود |
| NAP placeholder | داده واقعی نمایندگی در دسترس نبود | فقط `src/lib/site.ts` را ویرایش کنید + GBP را هم‌سان کنید |

## ۵. فازهای تحویل (مطابق بند ۱۱)

- **فاز ۰ ✅** معماری، مدل داده، URL structure، CMS-style seed، مستندات
- **فاز ۱ (MVP) ✅** پزشکان/وکلا/مهندسان/کارفرمایان (featured) + استعلام + FAQ + JSON-LD + sitemap + robots
- **فاز ۲ ✅ (پایه)** ۲۹ محصول دیگر + ۸ صفحه شهری + بلاگ + منابع قانونی (واژه‌نامه مستقل → فاز بعد)
- **فاز ۳ ⏳** نسخه انگلیسی (/en)، مقایسه پیشرفته، پنل کاربری، خسارت آنلاین — ساختار URL از قبل رزرو شده
- **فاز ۴ ⏳** پایش استناد AI، محتوای برنامه‌ای

## ۶. نکته سندباکس (اجرای dev)

سرور dev در این سندباکس محدودیت حافظه cgroup دارد. تنظیمات اعمال‌شده:
`experimental.turbopackMemoryLimit=1024` در next.config.ts + `NODE_OPTIONS=--max-old-space-size=1400`
+ گرم‌کردن تدریجی مسیرها. برای production (`next build` + standalone) این محدودیت‌ها حذف‌شدنی‌اند.

---

## الحاق دسته ۴ (Task 11) — لایه‌های جدید معماری

### الف) نسخه انگلیسی (`/en`) — فاز ۳

- **رویکرد:** محتوای انگلیسی «محتوا به‌مثابه کد» است (برخلاف نسخه فارسی) — بدون تغییر DB.
- `src/lib/en/config.ts` ← قرارداد `EN_PAGES` (۸ محصول پرچمدار: medical-doctors, lawyers, engineers, employers, contractors, public-liability, product-liability, elevators) + توابع hreflang.
- `src/lib/en/content.ts` ← محتوای استاتیک ۸ صفحه + متون home/hub/footer + ۲۵ خلاصه یک‌خطی.
- `src/app/en/*` ← layout با chrome انگلیسی (`dir="ltr"` روی wrapper، بدون تغییر root html)، home، hub (همه ۳۳ محصول — ۸ لینک کامل + ۲۵ ارجاع به فارسی)، صفحه محصول ۱۲-عنصری با JSON-LD انگلیسی (Service + FAQPage + 2×HowTo + BreadcrumbList).
- **hreflang دوسویه:** صفحات EN با `alternates.languages` و ۸ صفحه فارسی قرینه (توسط `generateMetadata` و چک `EN_PAGES`).
- هر محصول جدید EN = یک entry در `EN_PAGES` + یک آبجکت در `content.ts`.

### ب) پنل مدیریت (`/admin`)

- احراز هویت: HMAC cookie (`src/lib/admin-auth.ts`) — رمز از `ADMIN_PASSWORD` (پیش‌فرض سندباکس: `bimeh-admin-1404`)؛ ۵ تلاش/دقیقه.
- ساختار: layout محافظت‌شده + ۵ صفحه (داشبورد، استعلام‌ها، نظرات، پیام‌ها، خبرنامه) + ۴ API (`/api/admin/login|logout`، `PATCH /api/admin/quotes/[id]`، `PATCH /api/admin/reviews/[id]`).
- جریان تأیید نظر: ثبت عمومی (pending) → تأیید ادمین → نمایش در `/reviews` و بخش «تجربه مشتریان» صفحات محصول.
- robots: `/admin` disallow + `noindex`.

### ج) پیگیری استعلام (`/track` + `GET /api/track`)

- جست‌وجوی عمومی با کد `Q-YYMMDD-XXXX` — Zod regex + rate-limit (۱۰/دقیقه) — بدون افشای PII (فقط وضعیت/محصول/تاریخ).
- وضعیت‌ها: new → contacted → quoted → won/lost (مشترک با پنل ادمین).
- noindex (ابزار کاربردی، محتوای نازک) — در sitemap نیست.

### د) IndexNow

- کلید: `public/{key}.txt` (keyLocation) + `public/indexnow-key.txt` (منبع اسکریپت).
- `scripts/ping-indexnow.ts` ← پینگ کامل sitemap به `api.indexnow.org` (اجرای دستی پس از deploy).

### هـ) JSON-LD اضافه‌شده

- `itemListJsonLd()` در `src/lib/seo.tsx` ← استفاده در `/liability`، `/liability/[category]`، `/blog` (واژه‌نامه از قبل داشت).
- ماژول «استعلام در شهر شما» در قالب محصول ← لینک‌سازی متقابل شهر↔محصول (`getCitiesForProduct`).
