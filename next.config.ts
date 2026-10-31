import type { NextConfig } from "next";

// روی Vercel خروجی build توسط خود پلتفرم مدیریت می‌شود؛
// output: "standalone" فقط برای self-host (سرور اختصاصی) لازم است.
const isVercel = process.env.VERCEL === "1";

const nextConfig: NextConfig = {
  ...(isVercel ? {} : { output: "standalone" as const }),
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // دیتابیس ابری (Prisma Postgres) است — نیازی به باندل‌کردن فایل db/ نیست.
  // محتوای سایت استاتیک است (src/lib/data.ts) و دیتابیس فقط داده کاربر را نگه می‌دارد.
};

export default nextConfig;
