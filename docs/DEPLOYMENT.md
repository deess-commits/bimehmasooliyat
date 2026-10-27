# مستندات استقرار — BimehMasooliyat.ir

## ۱. پیش‌نیازها

- Node.js ≥ 20 یا Bun ≥ 1.1
- (پیشنهادی) PostgreSQL در production — تغییر `datasource db` در schema.prisma و اجرای migrate

## ۲. متغیرهای محیطی (`.env`)

```env
DATABASE_URL=file:/home/z/my-project/db/custom.db   # dev (SQLite)
# production پیشنهادی:
# DATABASE_URL=postgresql://user:pass@host:5432/bimeh
```

هیچ کلید API سمت کلاینت وجود ندارد (بند ۱۰). SDKهای AI در این پلتفرم استفاده نشده‌اند.

## ۳. راه‌اندازی

```bash
bun install
bun run db:push        # ایجاد جداول
bun prisma/seed.ts     # محتوا (idempotent — قابل اجرای مکرر)
bun run dev            # dev روی :3000
```

## ۴. Production

```bash
bun run build          # next build + standalone
bun run start          # سرور standalone
```

پیش از اولین استقرار production این ۳ مورد الزامی است:

1. **جایگزینی NAP واقعی** در `src/lib/site.ts` (تلفن، آدرس، شماره پروانه، ایمیل، sameAs)
   و هم‌سان‌سازی با Google Business Profile و دایرکتوری‌ها.
2. **تطبیق جدول دیه** با ابلاغیه رسمی سال جاری (قوه قضائیه) — در `prisma/seed-data/site.ts`،
   مقاله `diyeh-1404` و جدول صفحه اصلی. اکنون با برچسب «نمایشی» منتشر می‌شوند.
3. **جایگزینی پروفایل نویسندگان** (`prisma/seed-data/site.ts → authors`) با افراد واقعی + عکس،
   سپس `db:seed`.

## ۵. عملیات پس از استقرار

### ۵.۱ معرفی به گوگل (Google Search Console) — ترتیب دقیق

1. **اعتبارسنجی مالکیت:** در Search Console یک property با پیشوند
   `https://bimehmasooliyat.ir` بسازید، روش «HTML tag» را انتخاب کنید و
   توکن را به‌صورت متغیر محیطی بگذارید — تگ خودکار در `<head>` همه صفحات
   تزریق می‌شود (هیچ کدنیازی نیست):
   ```env
   NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=<توکن-گوگل>
   ```
   سپس یک بار rebuild/restart و «Verify» را بزنید.
2. **ثبت Sitemap:** در بخش Sitemaps آدرس `sitemap.xml` را ثبت کنید
   (روبوت‌ها هم از طریق robots.txt آن را می‌یابند). تعداد URLهای کشف‌شده
   باید طی چند روز با تعداد loc در sitemap هم‌خوان شود.
3. **درخواست ایندکس صفحات کلیدی:** با ابزار URL Inspection صفحات زیر را
   دستی برای ایندکس بخواهید (نوبت اول سریع‌ترین مسیر ورود است):
   `/` ، `/liability` ، `/liability/professional/medical-doctors` ،
   `/liability/commercial/employers` ، `/dih` ، `/industry` ، `/quote`.
4. **Rich Results:** پس از ایندکس، صفحات FAQ را با ابزار Rich Results Test
   بررسی کنید (FAQPage/HowTo/Service/Breadcrumb باید معتبر باشند).
5. **Google Business Profile:** پروفایل نمایندگی را با همان NAP
   (نام، تلفن 09981313724، کد ۲۰۶۱۶) بسازید و به سایت لینک بدهید —
   NAP consistency بین GBP و JSON-LD الزامی است.

### ۵.۲ موتورهای دیگر + IndexNow

**اعتبارسنجی Bing و Yandex** (متغیرهای محیطی — تگ خودکار در `<head>` تزریق می‌شود؛
Bing منبع جست‌وجوی ChatGPT است و ثبتش مستقیماً روی ارجاع‌پذیری AI اثر دارد):
```env
NEXT_PUBLIC_BING_SITE_VERIFICATION=<توکن-بینگ>    # Bing Webmaster Tools — روش XML/auth tag
NEXT_PUBLIC_YANDEX_VERIFICATION=<توکن-یاندکس>     # Yandex Webmaster
```

```bash
bun run seo:ping   # ارسال کل sitemap به api.indexnow.org (Bing/Yandex/Seznam/Naver)
```
- کلید: `public/indexnow-key.txt` (فایل کلید به‌صورت عمود در ریشه سایت سرو می‌شود).
- پاسخ 200/202 یعنی پذیرفته شد؛ 422 یعنی قبلاً ارسال شده. بعد از هر موج محتوایی جدید یک بار اجرا شود.
- برای Bing Webmaster Tools می‌توانید با همان حساب گوگل وارد شوید و sitemap را نیز آنجا ثبت کنید.

### ۵.۳ راستی‌آزمایی ارجاع‌پذیری AI (GEO)

- `curl -s https://bimehmasooliyat.ir/robots.txt | grep -i bot` →
  GPTBot/OAI-SearchBot/PerplexityBot/ClaudeBot باید Allow باشند.
- `curl -s https://bimehmasooliyat.ir/llms.txt` و `llms-full.txt` →
  پاسخ 200 با متن کامل.
- پایش ماهانه: پرسش‌های ماتریس را در ChatGPT/Perplexity/AI Overviews بپرسید
  و استناد به دامنه را ثبت کنید (`docs/AIO-MONITORING.md`).

### ۵.۴ سایر عملیات دوره‌ای

- اعتبارسنجی Rich Results برای FAQPage/Service/HowTo پس از هر موج محتوایی
- راه‌اندازی `next.config.ts → redirects()` برای تغییر مسیرهای آینده (301)
- پایش استناد AI (Perplexity/ChatGPT/AIO) روی کوئری‌های ماتریس بند ۲ — ماهانه
- بکاپ روزانه `db/custom.db` (یا دیتابیس production)

## ۶. امنیت (بند ۱۰)

- اعتبارسنجی دوگانه با Zod (کلاینت + سرور) — `src/lib/validation.ts`
- Rate limit: ۵ درخواست/دقیقه بر هر IP (هش‌شده) برای هر دو فرم — `src/lib/rate-limit.ts`
- Honeypot + کپچای ریاضی روی فرم استعلام
- بدون ذخیره IP خام؛ لاگ‌ها فاقد داده شخصی حساس
- سیاست حریم خصوصی در `/privacy`

## ۷. نکته سندباکس dev

در محیط محدودحافظه، سرور dev با این پیکربندی پایدار است:
`experimental.turbopackMemoryLimit: 1024` (next.config.ts) + `NODE_OPTIONS=--max-old-space-size=1400`
+ گرم‌کردن تدریجی مسیرها. در production استاندارد این تنظیمات لازم نیست.

---

## الحاق دسته ۴ (Task 11)

### متغیرهای محیطی جدید

```env
ADMIN_PASSWORD=<رمز-قوی-تولید کنید>   # پنل /admin — پیش‌فرض سندباکس: bimeh-admin-1404 (هرگز در production!)
```

### مراحل استقرار اضافه

```bash
bun run db:push && bun prisma/seed.ts   # محتوا (۳۳ محصول، ۲۸ شهر، ۱۸ مقاله، ۳۶ واژه، …)
bun run build && bun run start
# پس از بالا آمدن:
bun scripts/ping-indexnow.ts            # ایندکس فوری (Bing/Yandex/…) — کلید: public/indexnow-key.txt
```

### چک‌لیست پس از استقرار (به‌روزرسانی)

- [ ] `ADMIN_PASSWORD` قوی ست شده و پیش‌فرض سندباکس حذف شده؟
- [ ] NAP واقعی نمایندگی جایگزین placeholderها شده؟ (`src/lib/site.ts`)
- [ ] ورود به `/admin` با رمز production تست شده؟
- [ ] `/track` با یک کد واقعی تست شده؟
- [ ] `bun scripts/ping-indexnow.ts` اجرا شده و HTTP 200/202 برگردانده؟
- [ ] hreflang: `curl -s https://bimehmasooliyat.ir/liability/commercial/employers | grep hreflang` → fa-IR + en؟
- [ ] sitemap شامل `/en` و ۸ صفحه EN است؟ (۱۳۹ URL)
