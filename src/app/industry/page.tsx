import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Factory, Scale } from "lucide-react";
import { AnswerBlock } from "@/components/answer-block";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBanner } from "@/components/cta-banner";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { INDUSTRIES } from "@/lib/industry";
import { JsonLd, itemListJsonLd } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "بیمه مسئولیت صنایع | راهنمای پوشش به تفکیک صنعت",
  description:
    "راهنمای بیمه مسئولیت صنایع: نساجی، غذایی، خودروسازی، معدن، لجستیک و هتل‌داری. ریسک‌های اختصاصی هر صنعت، پوشش‌های پیشنهادی بیمه ایران و مراحل خرید با نمایندگی رسمی ۲۰۶۱۶.",
  alternates: {
    canonical: "/industry",
    languages: {
      "fa-IR": "/industry",
      en: "/en/industry",
      "x-default": "/industry",
    },
  },
};

export default function IndustryHubPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <JsonLd
        data={itemListJsonLd({
          name: "بیمه مسئولیت به تفکیک صنعت",
          url: "/industry",
          items: INDUSTRIES.map((i) => ({ name: i.name, href: `/industry/${i.slug}` })),
        })}
      />
      <Breadcrumbs items={[{ name: "بیمه مسئولیت صنایع", href: "/industry" }]} />

      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="border border-primary/25 bg-primary/10 text-primary hover:bg-primary/10">
            <Factory className="size-3.5" aria-hidden="true" />
            لایه راهنمای صنایع
          </Badge>
        </div>
        <h1 className="mt-3 text-2xl font-extrabold leading-[1.6] sm:text-3xl">
          بیمه مسئولیت صنایع — پوشش ریسک‌ها به تفکیک صنعت
        </h1>
      </header>

      <div className="mt-6 max-w-3xl">
        <AnswerBlock
          title="بیمه مسئولیت صنایع چیست؟"
          text="هر صنعت، ترکیب ریسک مخصوص خود را دارد: نساجی با حریق الیاف و حوادث ماشین‌آلات، صنعت غذایی با دعاوی سلامت‌محور مصرف‌کنندگان و خودروسازی با عیب قطعه و حریق کارگاه. در این بخش، برای هر صنعت ریسک‌های اصلی، پوشش‌های پیشنهادی بیمه ایران و مراحل خرید به‌تفکیک مستند شده است تا انتخاب بیمه‌نامه از واقعیت کارگاه شما آغاز شود."
        />
      </div>

      <div className="mt-10 flex flex-col gap-10">
        <section id="list-h" aria-labelledby="list-h">
          <SectionHeading
            icon={Factory}
            title="فهرست صنایع"
            hint="هر صفحه شامل ریسک‌های کیفی، پوشش‌های پیشنهادی با لینک به صفحات محصول و مراحل خرید است."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {INDUSTRIES.map((ind) => (
              <Link key={ind.slug} href={`/industry/${ind.slug}`} className="group">
                <Card className="h-full py-5 transition-all group-hover:border-primary/40 group-hover:shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base group-hover:text-primary">{ind.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-[13px] leading-7 text-muted-foreground">{ind.riskSummary}</p>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-primary">
                      ریسک‌ها، پوشش‌ها و مراحل خرید
                      <ArrowLeft className="size-3.5" aria-hidden="true" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <section id="how-h" aria-labelledby="how-h">
          <SectionHeading
            icon={Scale}
            title="چطور از این بخش استفاده کنیم؟"
          />
          <div className="rounded-2xl border bg-card p-5 text-sm leading-8 text-muted-foreground">
            <p>
              برای هر صنعت، ابتدا <strong className="text-foreground">ریسک‌های اصلی</strong> را بخوانید تا بدانید
              کدام رخدادها می‌توانند دعوای مسئولیت بسازند؛ سپس{" "}
              <strong className="text-foreground">پوشش‌های پیشنهادی</strong> را ببینید که هر کدام به صفحه محصول
              واقعی با جزئیات پوشش، استثناها و شرایط صدور لینک شده است. اگر صنعت شما در فهرست نیست،{" "}
              <Link href="/liability" className="font-bold text-primary hover:underline">
                فهرست کامل انواع بیمه مسئولیت
              </Link>{" "}
              را ببینید، {" "}
              <Link href="/city" className="font-bold text-primary hover:underline">
                راهنمای شهرهای صنعتی
              </Link>{" "}
              را بررسی کنید یا از طریق فرم استعلام، ریسک فعالیت خود را شرح دهید تا ترکیب مناسب پیشنهاد شود.
            </p>
          </div>
        </section>
      </div>

      <div className="mt-14">
        <CtaBanner
          title="ریسک کارگاه شما با هیچ الگوی آماده‌ای یکی نیست"
          text="فرم استعلام را تکمیل کنید؛ کارشناس ما بر اساس شرح فعالیت، ترکیب بیمه‌نامه‌ها و سقف تعهد را با شما تنظیم می‌کند. بدون هزینه و بدون تعهد."
          href="/quote"
          cta="استعلام بیمه مسئولیت صنایع"
        />
      </div>
    </div>
  );
}
