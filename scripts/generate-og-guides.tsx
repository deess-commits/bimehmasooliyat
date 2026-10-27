// ─── Pre-render OG images for general guides (1200×630) ─────────────
// اجرای یک‌باره: bun scripts/generate-og-guides.tsx
// خروجی: public/og/coverage-limit.png ، deductible.png ، renewal.png
// همان قالب برند generate-og.tsx — emerald + Vazirmatn.

import { writeFile, mkdir, readFile } from "fs/promises";
import { join } from "path";
import { ImageResponse } from "next/og";

const OUT_DIR = join(process.cwd(), "public", "og");

function lines(s: string, maxWords: number): string[] {
  const words = s.split(" ").filter(Boolean);
  const out: string[] = [];
  for (let i = 0; i < words.length; i += maxWords) {
    out.push(words.slice(i, i + maxWords).join(" "));
  }
  return out;
}

const GUIDES = [
  {
    file: "coverage-limit.png",
    title: "راهنمای انتخاب سقف تعهد",
    sub: "حداقل منطقی سقف، دیه سال وقوع و عواقب سقف ناکافی",
  },
  {
    file: "deductible.png",
    title: "راهنمای انتخاب فرانشیز",
    sub: "فرانشیز قطعی و درصدی و توازن آن با سقف تعهد",
  },
  {
    file: "renewal.png",
    title: "راهنمای تمدید و الحاقیه",
    sub: "تمدید پیش از انقضا و بازنگری سقف با دیه سالانه",
  },
  {
    file: "documents.png",
    title: "راهنمای مدارک و فرایند صدور",
    sub: "مدارک به تفکیک نوع بیمه‌گزار و پنج گام صدور",
  },
  {
    file: "liability-mandatory.png",
    title: "بیمه مسئولیت اجباری است یا اختیاری؟",
    sub: "الزام به تفکیک فعالیت — پزشکان، مهندس ناظر و شرط مجوز",
  },
  {
    file: "liability-vs-other-insurance.png",
    title: "تفاوت بیمه مسئولیت با بیمه‌های خسارتی",
    sub: "زیان‌دیده ثالث و مسئولیت قانونی در برابر خسارت اموال خود",
  },
  {
    file: "policy-review-checklist.png",
    title: "چک‌لیست بازبینی بیمه قبل از امضا",
    sub: "هشت فیلد کلیدی پیش از امضا — از استثناها تا سقف تفکیکی",
  },
  {
    file: "startup-guide.png",
    title: "بیمه مسئولیت شرکت تازه‌تأسیس",
    sub: "ریسک‌های روز نخست، اولویت‌بندی پوشش‌ها و بیمه‌نامه اول",
  },
  {
    file: "contract-tender.png",
    title: "بیمه مسئولیت در قراردادها و مناقصات",
    sub: "شرط بیمه در قرارداد، تطبیق سقف و گواهی رسمی",
  },
  {
    file: "professional-vs-general.png",
    title: "مسئولیت حرفه‌ای یا عمومی؟",
    sub: "خطای خدمت تخصصی در برابر حوادث محل فعالیت",
  },
  {
    file: "medical-liability-guide.png",
    title: "بیمه مسئولیت گروه‌های درمانی",
    sub: "پزشکان، دندان‌پزشکان، پیراپزشکان و داروسازان — الزام و سقف",
  },
  {
    file: "events-insurance-guide.png",
    title: "بیمه مسئولیت رویدادها و همایش‌ها",
    sub: "مسئولیت برگزارکننده و صدور پیش از شروع رویداد",
  },
  {
    file: "guides.png",
    title: "راهنماهای عمومی بیمه مسئولیت",
    sub: "دوازده راهنمای کاربردی — از سقف تعهد تا رویدادها و درمان",
  },
];

async function renderFor(g: (typeof GUIDES)[number], fontData: Buffer): Promise<Buffer> {
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
              <div style={{ fontSize: 30, fontWeight: 700, color: "#064e3b" }}>
                بیمه مسئولیت ایران
              </div>
              <div style={{ fontSize: 20, color: "#047857" }}>
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
              padding: "10px 22px",
            }}
          >
            راهنمای عمومی
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 1020 }}>
          {lines(g.title, 4).map((line, i) => (
            <div key={i} style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.35, color: "#022c22" }}>
              {line}
            </div>
          ))}
          <div style={{ fontSize: 30, color: "#047857" }}>{g.sub}</div>
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
            {lines("پاسخ کوتاه، گام‌های انتخاب و پرسش‌های متداول", 5).map((line, i) => (
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
  for (const g of GUIDES) {
    const buf = await renderFor(g, fontData);
    await writeFile(join(OUT_DIR, g.file), buf);
    console.log(`✓ ${g.file} (${Math.round(buf.length / 1024)}KB)`);
  }
  console.log(`Done: ${GUIDES.length} guide OG images → public/og/`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
