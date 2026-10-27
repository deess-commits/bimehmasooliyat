import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Briefcase,
  CalendarClock,
  CalendarHeart,
  ClipboardCheck,
  Coins,
  FileSignature,
  FileText,
  Gauge,
  GitCompareArrows,
  HeartPulse,
  Percent,
  Rocket,
  Scale,
  ScrollText,
  ShieldCheck,
} from "lucide-react";
import { AnswerBlock } from "@/components/answer-block";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBanner } from "@/components/cta-banner";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JsonLd, itemListJsonLd } from "@/lib/seo";

export const revalidate = 3600;

// ─── /guides — هاب راهنماهای عمومی بیمه مسئولیت ──────────────────────
// نقطه ورود منسجم لایه راهنماها برای کاربر و موتورهای AI (ItemList).

export const metadata: Metadata = {
  title: "راهنماهای عمومی بیمه مسئولیت — سقف، فرانشیز، تمدید و الزامات",
  description:
    "دوازده راهنمای کاربردی بیمه مسئولیت: سقف، فرانشیز، تمدید، مدارک، اجباری/اختیاری، تفاوت‌ها، چک‌لیست امضا، شرکت تازه‌تأسیس، قراردادها، حرفه‌ای/عمومی، گروه‌های درمانی و رویدادها.",
  alternates: { canonical: "/guides" },
  openGraph: {
    title: "راهنماهای عمومی بیمه مسئولیت",
    description:
      "سقف تعهد، فرانشیز، تمدید و الحاقیه، مدارک و صدور — چهار راهنمای کاربردی با پاسخ کوتاه و گام‌به‌گام.",
    url: "/guides",
    type: "website",
    images: [{ url: "/og/guides.png", width: 1200, height: 630, alt: "راهنماهای عمومی بیمه مسئولیت" }],
  },
};

const GUIDES = [
  {
    href: "/coverage-limit",
    icon: Coins,
    title: "راهنمای انتخاب سقف تعهد",
    text: "حداقل منطقی سقف بر مبنای دیه سال وقوع، جدول منطق سقف به تفکیک فعالیت و عواقب سقف ناکافی.",
  },
  {
    href: "/deductible",
    icon: Percent,
    title: "راهنمای انتخاب فرانشیز",
    text: "تفاوت فرانشیز قطعی و درصدی، اثر آن بر نرخ و توازن فرانشیز با سقف تعهد با مثال آموزشی.",
  },
  {
    href: "/renewal",
    icon: CalendarClock,
    title: "راهنمای تمدید و الحاقیه",
    text: "زمان تمدید پیش از انقضا، کاربردهای الحاقیه، بازنگری سقف با دیه سالانه و پنج گام تمدید بدون وقفه.",
  },
  {
    href: "/documents",
    icon: FileText,
    title: "مدارک و فرایند صدور",
    text: "مدارک پایه و مدارک به تفکیک نوع بیمه‌گزار و پنج گام صدور از استعلام تا تحویل بیمه‌نامه.",
  },
  {
    href: "/liability-mandatory",
    icon: Scale,
    title: "اجباری یا اختیاری؟",
    text: "فعالیت‌هایی که بیمه مسئولیت برایشان الزام یا شرط مجوز است، مبنای قانونی هر الزام و ریسک بی‌بیمه‌ماندن.",
  },
  {
    href: "/liability-vs-other-insurance",
    icon: GitCompareArrows,
    title: "تفاوت با بیمه‌های خسارتی",
    text: "زیان‌دیده ثالث و مسئولیت قانونی در برابر خسارت اموال خود بیمه‌گزار — جدول مقایسه با مثال موازی.",
  },
  {
    href: "/policy-review-checklist",
    icon: ClipboardCheck,
    title: "چک‌لیست بازبینی قبل از امضا",
    text: "هشت فیلد کلیدی پیش از امضای بیمه‌نامه: شرح فعالیت، سقف تفکیکی، فرانشیز، استثناها، مدت اعتبار و الحاقیه‌ها.",
  },
  {
    href: "/startup-guide",
    icon: Rocket,
    title: "شرکت‌های تازه‌تأسیس",
    text: "ریسک‌های مسئولیت از روز نخست، اولویت‌بندی پوشش‌ها با بودجه محدود و پنج گام خرید بیمه‌نامه اول.",
  },
  {
    href: "/contract-tender",
    icon: FileSignature,
    title: "قراردادها و مناقصات",
    text: "شرط بیمه مسئولیت در قرارداد، تطبیق سقف با متن و صدور گواهی رسمی — با توضیح صادقانه تمایز از بیمه تضمین.",
  },
  {
    href: "/professional-vs-general",
    icon: Briefcase,
    title: "مسئولیت حرفه‌ای یا عمومی؟",
    text: "خطای اجرای خدمت تخصصی در برابر حوادث محل فعالیت — جدول مقایسه و مشاغلی که به هر دو نیاز دارند.",
  },
  {
    href: "/medical-liability-guide",
    icon: HeartPulse,
    title: "گروه‌های درمانی",
    text: "راهنمای مسئولیت پزشکان، دندان‌پزشکان، پیراپزشکان و داروسازان — الزام، سقف و مسیر صدور.",
  },
  {
    href: "/events-insurance-guide",
    icon: CalendarHeart,
    title: "رویدادها و همایش‌ها",
    text: "مسئولیت برگزارکننده در برابر شرکت‌کنندگان و ثالث — ریسک‌های رویداد و پنج گام صدور پیش از شروع.",
  },
];

export default function GuidesHubPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <JsonLd
        data={itemListJsonLd({
          name: "راهنماهای عمومی بیمه مسئولیت",
          url: "/guides",
          items: GUIDES.map((g) => ({ name: g.title, href: g.href })),
        })}
      />
      <Breadcrumbs items={[{ name: "راهنماهای عمومی", href: "/guides" }]} />

      <header className="mt-6">
        <h1 className="text-2xl font-extrabold leading-[1.6] sm:text-3xl">
          راهنماهای عمومی بیمه مسئولیت
        </h1>
      </header>

      <div className="mt-6 max-w-3xl">
        <AnswerBlock
          title="پاسخ کوتاه"
          text="دوازده تصمیم کلیدی هر بیمه‌نامه مسئولیت در این راهنماها پاسخ داده شده است: چقدر سقف تعهد، چه فرانشیز، چه زمانی تمدید، با چه مدارکی، کجا اجباری و کجا اختیاری، چه تفاوتی با بیمه‌های خسارتی دارد، پیش از امضا چه چیزی را بازبینی کنیم، شرکت تازه‌تأسیس به کدام پوشش‌ها نیاز دارد، جایگاه بیمه مسئولیت در قراردادها و مناقصات، تفاوت حرفه‌ای و عمومی، راهنمای گروه‌های درمانی و مسئولیت برگزارکنندگان رویداد. هر راهنما پاسخ کوتاه مستقل و پرسش‌های متداول دارد."
        />
      </div>

      <section aria-labelledby="g-h" className="mt-10">
        <SectionHeading
          icon={ScrollText}
          title="دوازده راهنمای کاربردی"
          hint="هر راهنما مستقل و کامل است؛ ترتیب خواندن پیشنهادی همان ترتیب فهرست است."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {GUIDES.map((g) => (
            <Link key={g.href} href={g.href} className="group">
              <Card className="h-full transition-all group-hover:-translate-y-0.5 group-hover:border-primary/40 group-hover:shadow-md">
                <CardHeader className="pb-2">
                  <span className="mb-2 grid size-11 place-items-center rounded-xl bg-accent text-accent-foreground">
                    <g.icon className="size-5.5" aria-hidden="true" />
                  </span>
                  <CardTitle className="text-[15px] group-hover:text-primary">{g.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[13px] leading-6 text-muted-foreground">{g.text}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="c-h" className="mt-10 max-w-3xl">
        <div className="rounded-2xl border bg-card p-5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-5 text-primary" aria-hidden="true" />
            <h2 id="c-h" className="text-sm font-extrabold">
              راهنماهای خسارت هم داریم
            </h2>
          </div>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            اگر به دنبال مراحل اعلام و دریافت خسارت هستید — از اعلام فوری رخداد تا پرداخت —
            راهنمای گام‌به‌گام خسارت و راهنماهای تخصصی هر محصول را ببینید.
          </p>
          <Link
            href="/claims"
            className="mt-4 inline-flex items-center gap-2 rounded-full border bg-background px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
          >
            فرایند خسارت بیمه مسئولیت
            <ArrowLeft className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <div className="mt-12">
        <CtaBanner
          title="راهنما خواندید و آماده استعلام هستید؟"
          text="مشخصات فعالیت خود را در فرم استعلام ثبت کنید؛ پیش‌فاکتور رسمی با سقف و فرانشیز پیشنهادی و نرخ مصوب بیمه ایران صادر می‌شود — رایگان و بدون تعهد."
        />
      </div>
    </div>
  );
}
