# راهنمای استقرار روی Vercel — bimehmasooliyat.ir

این پروژه از قبل برای Vercel آماده شده است. فقط مراحل زیر را طی کنید.

---

## ۱) ایمپورت ریپو در Vercel

1. وارد [vercel.com/new](https://vercel.com/new) شوید (با همان اکانت GitHub که ریپو در آن است)
2. روی **Import Git Repository** کلیک کنید و ریپو `bimehmasooliyat` را انتخاب کنید
3. Vercel به‌طور خودکار تشخیص می‌دهد:
   - **Framework Preset:** Next.js
   - **Build Command:** `npm run build` (پیش‌فرض — دست نزنید)
   - **Install Command:** خودکار (bun.lock موجود است، Vercel با bun نصب می‌کند)
4. فعلاً Deploy نزنید — اول متغیرهای محیطی بخش بعد را تنظیم کنید

## ۲) متغیرهای محیطی

در همان صفحه ایمپورت (یا بعداً در `Settings → Environment Variables`) این مقادیر را وارد کنید:

| متغیر | مقدار | الزامی | توضیح |
|---|---|---|---|
| `DATABASE_URL` | `file:./db/custom.db` | ✅ | مسیر فایل SQLite — دقیقاً همین مقدار |
| `ADMIN_PASSWORD` | یک رمز قوی دلخواه | ✅ توصیه‌شده | ورود به `/admin` — بدون آن از مقدار پیش‌فرض استفاده می‌شود |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | توکن Google Search Console | اختیاری | متاتگ تأیید مالکیت |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | توکن Bing Webmaster | اختیاری | متاتگ تأیید مالکیت |
| `NEXT_PUBLIC_YANDEX_VERIFICATION` | توکن Yandex Webmaster | اختیاری | متاتگ تأیید مالکیت |

> ⚠️ مقدار `DATABASE_URL` را حتماً به شکل نسبی `file:./db/custom.db` وارد کنید؛
> مسیر مطلق سندباکس (`/home/z/...`) روی Vercel کار نمی‌کند.

سپس **Deploy** را بزنید. اولین بیلد ۲ تا ۴ دقیقه طول می‌کشد.

## ۳) اتصال دامنه bimehmasooliyat.ir

در `Settings → Domains` هر دو را اضافه کنید:

| دامنه | رکورد DNS |
|---|---|
| `bimehmasooliyat.ir` | `A` → `76.76.21.21` |
| `www.bimehmasooliyat.ir` | `CNAME` → `cname.vercel-dns.com` |

- دامنه اصلی (apex) را به‌عنوان **Primary** انتخاب کنید تا www به آن redirect شود
- اگر DNS را در همان ثبت‌کننده فعلی نگه می‌دارید، رکوردها را همان‌جا ویرایش کنید
- گواهی SSL به‌طور خودکار صادر می‌شود

## ۴) دیتابیس (Prisma Postgres — ذخیره‌سازی دائمی)

معماری فعلی:

- **محتوای سایت** (۳۳ محصول، مقالات، شهرها، واژه‌نامه، FAQ و…): کاملاً **استاتیک** —
  مستقیماً از `prisma/seed-data/*.ts` در زمان بیلد رندر و روی CDN سرو می‌شود؛
  هیچ دسترسی به دیتابیس ندارد (ببینید `src/lib/data.ts`)
- **داده‌های کاربر** (استعلام‌ها، پیام‌ها، خبرنامه، نظرات): در **Prisma Postgres** ابری
  ذخیره می‌شود — دائمی و بین همه نمونه‌های serverless مشترک

تنظیمات لازم در Vercel:

1. Project Settings → Environment Variables → متغیر `DATABASE_URL` را با مقدار
   اتصال Prisma Postgres (از [console.prisma.io](https://console.prisma.io)) اضافه کنید
2. متغیر `ADMIN_PASSWORD` را هم برای ورود به `/admin` تنظیم کنید
3. بعد از تغییر متغیرها یک **Redeploy** بزنید

> نکته: provider در `prisma/schema.prisma` حالا `postgresql` است. توسعه محلی هم
> با همان دیتابیس ابری انجام می‌شود (مقدار `DATABASE_URL` در `.env`).
> اگر روزی خواستید به Postgres دیگری (Neon، Vercel Postgres و…) مهاجرت کنید
> فقط کافی است `DATABASE_URL` جدید بدهید و `bun run db:push` اجرا کنید.

## ۵) چک‌لیست بعد از دیپلوی

- [ ] باز کردن `https://bimehmasooliyat.ir` — صفحه اصلی بدون خطا
- [ ] تست فرم استعلام قیمت (باید کد رهگیری بدهد)
- [ ] `https://bimehmasooliyat.ir/sitemap.xml` باز شود
- [ ] `https://bimehmasooliyat.ir/robots.txt` باز شود
- [ ] `https://bimehmasooliyat.ir/llms.txt` باز شود
- [ ] ورود به `/admin` با رمز جدید
- [ ] تأیید مالکیت در [Google Search Console](https://search.google.com/search-console) و ثبت sitemap
- [ ] تأیید مالکیت در [Bing Webmaster](https://www.bing.com/webmasters) و [Yandex Webmaster](https://webmaster.yandex.com)
- [ ] اجرای `bun run seo:ping` در محیط محلی برای پینگ IndexNow

## ۶) نکات نگهداری

- هر push به `main` → دیپلوی production خودکار
- هر Pull Request → دیپلوی preview با URL جدا
- برای رول‌بک: `Deployments → آخرین نسخه سالم → Promote to Production`
- لاگ‌ها: `Deployments → functions` یا تب **Runtime Logs**

---

در صورت بروز خطای بیلد، اول `Build Logs` در Vercel را بررسی کنید؛
اکثر خطاها با متغیر `DATABASE_URL` نامعتبر مرتبط‌اند.
