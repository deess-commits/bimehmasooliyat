# چک‌لیست SEO / GEO / AIO — BimehMasooliyat.ir

## Technical SEO (سمت سرور)

- [x] `metadataBase` در `app/layout.tsx`
- [x] `generateMetadata` برای صفحات پویا (محصول/شهر/مقاله/دسته)
- [x] عنوان و description یکتا برای هر صفحه (تست: هر ۳۳ محصول seoTitle اختصاصی)
- [x] canonical یکتا در همه صفحات (`alternates.canonical`)
- [x] `sitemap.ts` پویا — ۶۰ URL (۹ ثابت + ۴ دسته + ۳۳ محصول + ۸ شهر + ۶ مقاله)
- [x] `robots.ts` با مسیر sitemap + اجازه صریح به خزنده‌های AI (GPTBot, PerplexityBot, ClaudeBot…)
- [x] `llms.txt` در ریشه دامنه
- [x] Open Graph + Twitter Cards همه صفحات (`/og.png` ۱۲۰۰×۶۳۰)
- [x] `next/image` با alt معنادار + `next/font/local` (Vazirmatn — ۵ وزن، preload)
- [x] URLهای تمیز پایدار `/liability/[category]/[slug]`
- [x] ۴۰۴ برندشده (`not-found.tsx`)
- [x] Heading سلسله‌مراتبی (H1 یکتا → H2 → H3) — تست‌شده در صفحه محصول
- [x] ISR (`revalidate=3600`) + SSG (`generateStaticParams`) برای محتوای اصلی
- [x] `noindex` لازم نیست — صفحات فیلتر کلاینتی‌اند و URL جدید نمی‌سازند (canonical ثابت)

## Structured Data (JSON-LD معتبر — پارس‌شده و تأییدشده)

- [x] `InsuranceAgency` (layout): NAP، geo، ساعات کاری، parentOrganization، sameAs، areaServed
- [x] `WebSite` + SearchAction
- [x] `BreadcrumbList` — همه صفحات عمق‌دار
- [x] `Service` (serviceType = نام فارسی محصول) — ۳۳ صفحه محصول
- [x] `FAQPage` — صفحه اصلی، /faq، ۳۳ صفحه محصول، ۶ مقاله، ۸ صفحه شهری (همخوان با محتوای قابل مشاهده)
- [x] `HowTo` ×۲ در هر محصول (خرید + خسارت) و در /claims
- [x] `Article` با author/datePublished/dateModified — بلاگ
- [x] `Dataset` — جدول دیه صفحه اصلی (با conditionsOfAccess)
- [ ] `AggregateRating` — عمداً فعال نشده تا وجود نظرات واقعی قابل‌تأیید (قاعده بند ۵)
- [x] `LegalService` — عمداً استفاده نشده (با احتیاط، طبق بند ۵)

## E-E-A-T / YMYL

- [x] نویسنده + بازبین حقوقی در همه صفحات محصول و مقالات (`AuthorBox` + تاریخ بازبینی)
- [x] `/about`: مجوز، پروانه، تیم، متدولوژی محتوا
- [x] ارجاع صریح به قانون مسئولیت مدنی، قانون بیمه ۱۳۱۶، ماده ۳۰، دیات، آیین‌نامه ۵۷
- [x] سلب مسئولیت حقوقی در همه صفحات محصول/مقالات + فوتر سراسری
- [x] NAP یکسان در فوتر همه صفحات + `/contact`
- [x] `sameAs` به پروفایل‌های رسمی (placeholder — جایگزینی قبل از انتشار)
- [x] بدون آمار جعلی؛ دیه با برچسب «نمایشی — تطبیق با ابلاغیه رسمی»

## GEO / AIO (فنی — ۲۰٪)

- [x] Answer Block مستقل ۴۰–۶۰ کلمه فوراً زیر H1/H2 هر صفحه محصول و مقاله
- [x] ساختار «پاسخ اول، توضیح بعد» در تمام بخش‌ها
- [x] جداول قابل استخراج (پوشش، مهلت‌ها، دیه، مقایسه)
- [x] اجازه خزنده‌های AI در robots + llms.txt با نقشه موجودیت
- [x] پاسخ‌های FAQ مستقل و قابل‌استناد (۴۰–۶۰ کلمه)
- [ ] پایش سهم استناد (ChatGPT/Perplexity/AI Overviews) — عملیات off-site فاز ۴
- [ ] حضور رسانه‌ای/صنففی و GBP — off-site، خارج از محدوده کد

## Performance / A11y

- [x] RTL کامل (`dir=rtl`, `lang=fa`) + فونت متغیر محلی (بدون FOUT خارجی)
- [x] موبایل: بدون overflow افقی (تست iPhone 14) — منوی Sheet
- [x] فوتر sticky (flex + mt-auto) — پایش‌شده در صفحات کوتاه و بلند
- [x] ARIA: nav/main/section/article/aria-labels/role
- [x] stateهای loading (Skeleton، Loader)، toast برای بازخورد
- [ ] Lighthouse ≥۹۵ — اجرای نهایی پس از استقرار (در dev سندباکس معیار معتبر نیست)

---

## الحاق دسته ۴ (Task 11)

### hreflang و نسخه انگلیسی

- [ ] ۸ صفحه پرچمدار فارسی ↔ EN با `alternates.languages` دوسویه متصل‌اند (fa-IR / en / x-default)
- [ ] `/en` و `/en/liability` canonical دارند و در sitemap هستند (۱۰ URL جدید — کل: ۱۳۹)
- [ ] llms.txt بخش «## English Edition» دارد
- [ ] لینک «EN» در هدر دسکتاپ + شیت موبایل

### JSON-LD آرشیوها

- [ ] ItemList روی `/liability` (۳۳ آیتم)، ۴ صفحه دسته، `/blog` (۱۸)، `/glossary` (۳۶)
- [ ] آیتم‌های ItemList دقیقاً همان لینک‌های قابل مشاهده‌اند (قاعده همخوانی schema ↔ محتوا)

### ابزارهای عملیاتی

- [ ] `/track` noindex + بدون sitemap + rate-limit ۱۰/دقیقه
- [ ] `/admin` disallow در robots + noindex + cookie HMAC + rate-limit ورود
- [ ] IndexNow: فایل کلید در ریشه در دسترس است (`/{key}.txt` → 200)

### لینک‌سازی داخلی

- [ ] ماژول «استعلام در شهر شما» در همه صفحات محصول (تا ۶ شهر)
- [ ] «پیگیری استعلام» در ناوبری اصلی و فوتر
