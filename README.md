# بیمه مسئولیت | bimehmasooliyat.ir

پلتفرم تخصصی **بیمه مسئولیت** — نمایندگی رسمی بیمه (پروانه ۲۰۶۱۶)

سایت دو‌زبانه (فارسی RTL + انگلیسی `/en`) با تمرکز کامل بر یک محصول: بیمه مسئولیت.

## تکنولوژی

- **Next.js 16** (App Router) · React 19 · TypeScript 5
- Tailwind CSS 4 · shadcn/ui · فونت Vazirmatn
- Prisma 6 + SQLite · کامپوننت‌های سرور
- SEO/GEO: JSON-LD، `llms.txt`، `feed.xml`، sitemap، IndexNow

## شروع سریع

```bash
bun install            # postinstall خودکار prisma generate را اجرا می‌کند
cp .env.example .env   # مقادیر را تنظیم کنید
bun run db:push        # همگام‌سازی schema با دیتابیس
bun run dev            # http://localhost:3000
```

## اسکریپت‌ها

| کامند | توضیح |
|---|---|
| `bun run dev` | سرور توسعه |
| `bun run build` | بیلد production (روی Vercel خودکار) |
| `bun run lint` | بررسی ESLint |
| `bun run db:push` | اعمال schema روی دیتابیس |
| `bun run db:generate` | ساخت Prisma Client |
| `bun run seo:ping` | پینگ IndexNow به موتورهای جستجو |

## ساختار مهم

```
db/custom.db          ← دیتابیس SQLite (محتوا + فرم‌ها) — committed
prisma/               ← schema و seed
src/app/              ← صفحات فارسی + /en + api
src/lib/site.ts       ← تنظیمات هویتی سایت (دامنه، تماس، لایسنس)
docs/                 ← مستندات معماری و سئو
```

## استقرار روی Vercel

راهنمای کامل و مرحله‌به‌مرحله: **[docs/VERCEL-DEPLOY.md](docs/VERCEL-DEPLOY.md)**

پروژه برای Vercel آماده است:
- `output: standalone` فقط برای self-host فعال است و روی Vercel خودکار غیرفعال می‌شود
- فایل دیتابیس داخل باندل توابع serverless قرار می‌گیرد (`outputFileTracingIncludes`)
- در runtime، SQLite به‌طور خودکار در `/tmp` قابل‌نوشتن می‌شود

## تماس

- تلفن: ۰۹۹۸ ۱۳۱ ۳۷۲۴
- ایمیل: info@bimehmasooliyat.ir
- وب: https://bimehmasooliyat.ir
