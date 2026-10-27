// ─── Pre-render per-product OG images (1200×630) ───────────────────
// اجرای یک‌باره: bun scripts/generate-og.tsx
// خروجی: public/og/{category}-{slug}.png — صفحات محصول به این فایل‌ها ارجاع می‌دهند.
// دلیل pre-render: satori در فرایند dev-server در سندباکس OOM می‌شود؛ اینجا ایزوله است.

import { writeFile, mkdir, readFile } from "fs/promises";
import { join } from "path";
import { ImageResponse } from "next/og";

import { professionalProducts } from "../prisma/seed-data/products-professional";
import { commercialProducts } from "../prisma/seed-data/products-commercial";
import { corporatePublicProducts } from "../prisma/seed-data/products-corporate-public";
import type { SeedProduct } from "../prisma/seed-data/types";

const OUT_DIR = join(process.cwd(), "public", "og");

// سatori ترتیب واژه‌های فارسی را LTR می‌چیند؛ با وارونه‌سازی ترتیب واژه‌ها،
// خوانش راست‌به‌چپ درست می‌شود (شکل حروف درست است، فقط ترتیب باید وارونه شود).
// برای متن‌های چندخطی، اول خط‌بندی منطقی می‌کنیم بعد هر خط جدا وارونه می‌شود.
// satori به‌صورت خودکار bidi متون فارسی را اعمال می‌کند (آزمون A/B تأیید شد)؛
// فقط برای شکستن تمیز خط، خط‌بندی صریح ۴واژه‌ای انجام می‌دهیم.
function lines(s: string, maxWords: number): string[] {
  const words = s.split(" ").filter(Boolean);
  const out: string[] = [];
  for (let i = 0; i < words.length; i += maxWords) {
    out.push(words.slice(i, i + maxWords).join(" "));
  }
  return out;
}

async function renderFor(p: SeedProduct, fontData: Buffer): Promise<Buffer> {
  const res = new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #f0fdf4 0%, #ffffff 55%, #ccfbf1 100%)",
          padding: "64px 72px",
          fontFamily: "Vazirmatn",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 18,
                background: "#047857",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2">
                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
              </svg>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ fontSize: 30, fontWeight: 700, color: "#064e3b", }}>
                بیمه مسئولیت ایران
              </div>
              <div style={{ fontSize: 20, color: "#047857", }}>
                نمایندگی رسمی بیمه ایران
              </div>
            </div>
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#047857",
              border: "2px solid #a7f3d0",
              borderRadius: 999,
              padding: "10px 22px"
             
            }}
          >
            فقط بیمه مسئولیت
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 1020 }}>
          {lines(p.nameFa, 4).map((line, i) => (
            <div key={i} style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.35, color: "#022c22", }}>
              {line}
            </div>
          ))}
          <div style={{ fontSize: 30, color: "#047857", }}>
            {`برای ${p.audienceFa}`}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid #a7f3d0",
            paddingTop: 24,
          }}
        >
          <div style={{ fontSize: 24, color: "#334155", display: "flex", flexDirection: "column", gap: 4 }}>
            {lines("پوشش‌ها، استثنائات، قیمت و خسارت — در یک مرجع", 5).map((line, i) => (
              <div key={i} style={{ lineHeight: 1.6 }}>{line}</div>
            ))}
          </div>
          <div style={{ fontSize: 24, fontWeight: 700, color: "#047857" }}>
            bimehmasooliyat.ir
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [{ name: "Vazirmatn", data: fontData, weight: 700, style: "normal" }],
    },
  );
  return Buffer.from(await res.arrayBuffer());
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const fontData = await readFile(
    join(process.cwd(), "node_modules", "vazirmatn", "fonts", "ttf", "Vazirmatn-Bold.ttf"),
  );
  const all = [...professionalProducts, ...commercialProducts, ...corporatePublicProducts];
  for (const p of all) {
    const buf = await renderFor(p, fontData);
    const file = join(OUT_DIR, `${p.category}-${p.slug}.png`);
    await writeFile(file, buf);
    console.log(`✓ ${p.category}-${p.slug}.png (${Math.round(buf.length / 1024)}KB)`);
  }
  console.log(`Done: ${all.length} OG images → public/og/`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
