// ─── IndexNow Ping (Bing / Yandex / Naver / Seznam) ─────────────────
// Usage: bun scripts/ping-indexnow.ts [url1 url2 ...]
// بدون آرگومان: کل sitemap خوانده و همه URLها ارسال می‌شود.
// مستندات: https://www.indexnow.org/documentation
// نکته production: بعد از deploy یک بار اجرا شود؛ سقف مجاز ۱۰٬۰۰۰ URL در هر درخواست.

import { readFileSync } from "node:fs";
import { join } from "node:path";

const SITE_URL = "https://bimehmasooliyat.ir";
const KEY_FILE = join(process.cwd(), "public", "indexnow-key.txt");

async function main() {
  const key = readFileSync(KEY_FILE, "utf8").trim();
  if (!key) {
    console.error("❌ کلید IndexNow یافت نشد — public/indexnow-key.txt خالی است.");
    process.exit(1);
  }

  let urls: string[] = process.argv.slice(2);
  if (urls.length === 0) {
    console.log("⏳ خواندن sitemap …");
    const res = await fetch(`${SITE_URL}/sitemap.xml`);
    const xml = await res.text();
    urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  }

  if (urls.length === 0) {
    console.error("❌ هیچ URLی برای ارسال یافت نشد.");
    process.exit(1);
  }

  const payload = {
    host: new URL(SITE_URL).host,
    key,
    keyLocation: `${SITE_URL}/${key}.txt`,
    urlList: urls.slice(0, 10_000),
  };

  console.log(`🚀 ارسال ${payload.urlList.length} URL به IndexNow …`);
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });

  // 200/202 = پذیرفته شد؛ 400 کلید/درخواست نامعتبر؛ 403 کلید تأیید نشده؛ 422 قبلاً ارسال شده
  console.log(`نتیجه: HTTP ${res.status}`);
  if (res.ok) console.log("✅ URLها به صف ایندکس فوری موتورهای جست‌وجو اضافه شدند.");
  else console.error("❌ ارسال ناموفق — پاسخ سرور را بررسی کنید.");
}

main().catch((e) => {
  console.error("❌ خطا:", e instanceof Error ? e.message : e);
  process.exit(1);
});
