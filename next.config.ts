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
  // فایل SQLite باید داخل باندل توابع serverless هم قرار بگیرد
  // تا API Route ها (quote/contact/...) روی Vercel به دیتابیس دسترسی داشته باشند
  outputFileTracingIncludes: {
    "/api/**/*": ["./db/**"],
    "/**/*": ["./db/**"],
  },
};

export default nextConfig;
