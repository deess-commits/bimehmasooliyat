import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  Coins,
  FileText,
  Gauge,
  Layers,
  ListOrdered,
  MessagesSquare,
  Search,
  ShieldCheck,
  Users,
  Wallet,
} from "lucide-react";
import { AnswerBlock } from "@/components/answer-block";
import { AuthorBox } from "@/components/author-box";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBanner } from "@/components/cta-banner";
import { FaqSection } from "@/components/faq-section";
import { LegalDisclaimer } from "@/components/legal-disclaimer";
import { NumberedSteps } from "@/components/numbered-steps";
import { ProductFinder } from "@/components/product-finder";
import { SectionHeading } from "@/components/section-heading";
import { TrustStrip } from "@/components/trust-strip";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllProducts } from "@/lib/data";
import { productUrl } from "@/lib/format";
import { faqJsonLd, howToJsonLd, JsonLd, serviceJsonLd } from "@/lib/seo";
import type { SeedProduct } from "@/prisma/seed-data/types";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "خرید بیمه مسئولیت آنلاین — صدور رسمی با نرخ مصوب بیمه ایران",
  description:
    "خرید آنلاین بیمه مسئولیت با استعلام رایگان، پیش‌فاکتور رسمی و صدور بیمه‌نامه با نرخ مصوب بیمه ایران — بدون مراجعه حضوری و مشاوره سقف تعهد از نمایندگی کد ۲۰۶۱۶.",
  alternates: {
    canonical: "/buy",
    languages: {
      "fa-IR": "/buy",
      "x-default": "/buy",
    },
  },
  openGraph: {
    title: "خرید بیمه مسئولیت آنلاین — صدور رسمی با نرخ مصوب بیمه ایران",
    description:
      "خرید آنلاین بیمه مسئولیت با استعلام رایگان، پیش‌فاکتور رسمی و صدور بیمه‌نامه با نرخ مصوب بیمه ایران — بدون مراجعه حضوری و مشاوره سقف تعهد از نمایندگی کد ۲۰۶۱۶.",
    url: "/buy",
    type: "website",
    locale: "fa_IR",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "خرید آنلاین بیمه مسئولیت از نمایندگی رسمی بیمه ایران" }],
  },
};

// ─── /buy — صفحه لندینگ نیت خرید «خرید بیمه مسئولیت آنلاین» ─────────
// YMYL: هیچ رقم اختراعی، هیچ وعده قطعی؛ تنها NAP تأییدشده نمایندگی
// و مبالغ نمایشی seed با فیلد priceFromFa (فقط جایی که وجود دارد).

const BUY_STEPS = [
  {
    title: "انتخاب نوع پوشش مناسب فعالیت",
    description:
      "بر اساس نوع فعالیت، پوشش متناسب را انتخاب کنید: پزشکان بیمه مسئولیت حرفه‌ای، کارفرمایان بیمه مسئولیت کارفرما و کسب‌وکارها بیمه مسئولیت عمومی یا پوشش تخصصی متناسب با ریسک خود.",
  },
  {
    title: "استعلام آنلاین و ارسال مشخصات",
    description:
      "فرم استعلام را با شرح دقیق فعالیت، شهر، تعداد نفرات یا ظرفیت و سقف تقریبی دلخواه تکمیل کنید؛ ارسال مدارک نیز به‌صورت آنلاین و بدون مراجعه انجام می‌شود.",
  },
  {
    title: "دریافت پیش‌فاکتور رسمی و مشاوره سقف تعهد",
    description:
      "پیش‌فاکتور با نرخ مصوب بیمه ایران صادر می‌شود و کارشناس پیش از صدور، سقف تعهد و فرانشیز را بر اساس ریسک واقعی فعالیت با شما تنظیم می‌کند.",
  },
  {
    title: "پرداخت و صدور بیمه‌نامه",
    description:
      "پس از تأیید پیش‌فاکتور و پرداخت حق بیمه، بیمه‌نامه رسمی صادر و نسخه الکترونیکی آن ارسال می‌شود؛ اصالت سند از طریق نمایندگی قابل بررسی است.",
  },
];

const CRITERIA_ROWS = [
  {
    criterion: "تخصص",
    value: "فقط بیمه مسئولیت — بیش از ۳۳ پوشش تخصصی در یک مرجع، بدون پراکندگی اطلاعات.",
  },
  {
    criterion: "مجوز",
    value: "نمایندگی رسمی شرکت سهامی بیمه ایران با کد ۲۰۶۱۶؛ صدور مستقیم و قابل پیگیری.",
  },
  {
    criterion: "قیمت",
    value: "پیش‌فاکتور با نرخ مصوب بیمه ایران و بدون کارمزد واسطه؛ استعلام رایگان و بدون تعهد.",
  },
  {
    criterion: "مشاوره",
    value: "تعیین سقف تعهد بر اساس ریسک واقعی فعالیت، دیه سال جاری و الزامات قرارداد.",
  },
  {
    criterion: "پشتیبانی خسارت",
    value: "راهنمای گام‌به‌گام اعلام خسارت از تشکیل پرونده تا تسویه، به تفکیک نوع پوشش.",
  },
  {
    criterion: "سرعت",
    value: "پاسخ استعلام حداکثر یک روز کاری و صدور بیمه‌نامه پس از تأیید پیش‌فاکتور و پرداخت.",
  },
];

const BUY_FAQS = [
  {
    question: "آیا خرید آنلاین بیمه مسئولیت در ایران ممکن است؟",
    answer:
      "بله؛ فرایند خرید بیمه مسئولیت به‌صورت آنلاین در تمام ایران انجام می‌شود. متقاضی نوع فعالیت، شهر و سقف دلخواه را در فرم استعلام ثبت می‌کند، کارشناس کد ریسک را ارزیابی و پیش‌فاکتور رسمی صادر می‌شود. پس از پرداخت آنلاین، بیمه‌نامه الکترونیکی یا کاغذی ارسال می‌گردد و مراجعه حضوری الزامی نیست.",
  },
  {
    question: "آیا بیمه‌نامه خریداری‌شده آنلاین رسمی و معتبر است؟",
    answer:
      "بله؛ بیمه‌نامه‌ای که از این طریق صادر می‌شود، سند رسمی شرکت سهامی بیمه ایران است و همان اعتبار بیمه‌نامه‌های حضوری را دارد. شماره بیمه‌نامه، شرایط عمومی و سقف تعهد در متن سند درج می‌شود و اصالت آن از طریق نمایندگی رسمی کد ۲۰۶۱۶ قابل استعلام و بررسی است.",
  },
  {
    question: "خرید آنلاین بیمه مسئولیت چقدر طول می‌کشد؟",
    answer:
      "زمان خرید به دو بخش تقسیم می‌شود: پاسخ استعلام و صدور بیمه‌نامه. پاسخ استعلام حداکثر تا یک روز کاری اعلام می‌شود و پس از تأیید پیش‌فاکتور و پرداخت، صدور بیمه‌نامه معمولاً همان روز کاری انجام می‌گیرد. برای ریسک‌هایی که بازدید فنی یا مجوز تکمیلی نیاز دارند، زمان ممکن است کمی بیشتر شود.",
  },
  {
    question: "برای خرید بیمه مسئولیت چه مدارکی لازم است؟",
    answer:
      "مدارک اصلی شامل تصویر کارت ملی و شناسنامه، اطلاعات ثبتی برای شرکت‌ها، شرح دقیق فعالیت و مشخصات ریسک مانند تعداد نفرات یا ظرفیت است. فهرست کامل مدارک به تفکیک هر نوع بیمه مسئولیت در صفحه مدارک لازم آمده است؛ ارسال اسناد به‌صورت آنلاین انجام می‌شود و ارسال حضوری لازم نیست.",
  },
  {
    question: "سقف تعهد را هنگام خرید چگونه انتخاب کنم؟",
    answer:
      "مبنای عمومی انتخاب سقف، دیه کامل سال وقوع خسارت است؛ برای فعالیت‌های پرتراکم یا پرخطر باید چند برابر آن انتخاب شود. در قراردادهای پیمانکاری، سقف حداقلی مندرج در قرارداد نیز باید رعایت گردد. راهنمای کامل انتخاب سقف در صفحه سقف تعهد موجود است و کارشناس در مرحله مشاوره پیش از صدور همراهی می‌کند.",
  },
  {
    question: "مشاوره خرید بیمه مسئولیت هزینه دارد؟",
    answer:
      "خیر؛ مشاوره پیش از خرید، بخشی از خدمات استعلام رایگان است. کارشناس نمایندگی، ریسک فعالیت را بررسی، سقف تعهد و فرانشیز مناسب را پیشنهاد و تخفیف عدم خسارت بیمه‌نامه قبلی را اعمال می‌کند. استعلام هیچ تعهدی برای خرید ایجاد نمی‌کند و تنها پس از تأیید پیش‌فاکتور و پرداخت، بیمه‌نامه صادر می‌شود.",
  },
];

const POPULAR_SLUGS = [
  "medical-doctors",
  "lawyers",
  "engineers",
  "employers",
  "contractors",
  "public-liability",
  "elevators",
  "beauty-salons",
];

const AUDIENCES = [
  {
    title: "پزشکان و پیراپزشکان",
    tag: "حرفه‌ای",
    href: "/liability/professional/medical-doctors",
    text: "پوشش خطای حرفه‌ای پزشکان، دندان‌پزشکان و پیراپزشکان در برابر ادعای بیماران، مطابق شرایط نظام پزشکی.",
  },
  {
    title: "وکلا و مشاوران",
    tag: "حرفه‌ای",
    href: "/liability/professional/lawyers",
    text: "جبران خسارت مالی موکل ناشی از خطای حقوقی، از دست رفتن مهلت قانونی تا ایراد دادخواست.",
  },
  {
    title: "مهندسان و ناظران",
    tag: "حرفه‌ای",
    href: "/liability/professional/engineers",
    text: "پوشش مسئولیت نظارت، طراحی و محاسبات مهندسی مطابق ماده ۳۳ قانون نظام مهندسی.",
  },
  {
    title: "کارفرمایان",
    tag: "تجاری",
    href: "/liability/commercial/employers",
    text: "پوشش حوادث کارکنان در محیط کار بر پایه ماده ۹۱ قانون کار و متناسب با تعداد نفرات.",
  },
  {
    title: "کسب‌وکارها و صنایع",
    tag: "صنایع",
    href: "/industry",
    text: "پوشش‌های مسئولیت عمومی، محصول، آسانسور و ریسک‌های صنعتی به تفکیک صنعت در بخش صنایع.",
  },
  {
    title: "افراد و خانواده‌ها",
    tag: "عمومی",
    href: "/liability/public",
    text: "پوشش مسئولیت فردی در برابر خسارت به دیگران، از نگهداری حیوانات تا حوادث محل سکونت.",
  },
];

const REVIEW_DATE_ISO = "2025-12-01";

export default async function BuyPage() {
  const products = await getAllProducts();
  const bySlug = new Map<string, SeedProduct>(products.map((p) => [p.slug, p]));
  const popular = POPULAR_SLUGS.map((slug) => bySlug.get(slug)).filter(
    (p): p is SeedProduct & { priceFromFa: string } =>
      Boolean(p && p.priceFromFa),
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <JsonLd
        data={serviceJsonLd({
          name: "خرید بیمه مسئولیت آنلاین",
          description:
            "سرویس خرید آنلاین بیمه مسئولیت: استعلام رایگان، پیش‌فاکتور رسمی و صدور بیمه‌نامه با نرخ مصوب بیمه ایران از نمایندگی رسمی کد ۲۰۶۱۶.",
          url: "/buy",
          category: "بیمه مسئولیت — بیمه ایران",
          areaServed: "ایران",
          dateModified: REVIEW_DATE_ISO,
        })}
      />
      <JsonLd
        data={howToJsonLd({
          name: "خرید آنلاین بیمه مسئولیت در ۴ گام",
          description:
            "چهار گام خرید بیمه مسئولیت به‌صورت آنلاین: از انتخاب پوشش تا پرداخت و دریافت بیمه‌نامه رسمی.",
          steps: BUY_STEPS,
          url: "/buy",
        })}
      />
      <JsonLd data={faqJsonLd(BUY_FAQS)} />

      <Breadcrumbs items={[{ name: "خرید بیمه مسئولیت", href: "/buy" }]} />

      <header className="mt-6">
        <h1 className="text-2xl font-extrabold leading-[1.6] sm:text-3xl">
          خرید بیمه مسئولیت آنلاین
        </h1>
      </header>

      <div className="mt-6 max-w-3xl">
        <AnswerBlock
          title="خرید بیمه مسئولیت در ایران چگونه انجام می‌شود؟"
          text="خرید بیمه مسئولیت در ایران با ثبت استعلام آنلاین انجام می‌شود؛ نوع فعالیت و سقف دلخواه را در فرم اعلام خطر ثبت می‌کنید، پیش‌فاکتور رسمی با نرخ مصوب بیمه ایران صادر و پس از پرداخت، بیمه‌نامه بدون نیاز به مراجعه حضوری ارسال می‌شود. اعتبار بیمه‌نامه با خرید حضوری برابر است."
        />
      </div>

      {/* جست‌وجوی پوشش */}
      <section aria-labelledby="finder-h" className="mt-10">
        <SectionHeading
          icon={Search}
          title="پوشش مناسب فعالیت خود را جست‌وجو کنید"
          hint="شغل، تخصص یا رشته خود را بنویسید؛ مثلاً «پزشک چشم»، «مهندس عمران» یا «کارفرما» — بدون نگرانی از فاصله، نیم‌فاصله و حروف عربی/فارسی."
        />
        <ProductFinder products={products} />
      </section>

      {/* گام‌ها */}
      <section aria-labelledby="steps-h" className="mt-12 max-w-3xl">
        <SectionHeading
          icon={ListOrdered}
          title="خرید آنلاین بیمه مسئولیت در ۴ گام"
          hint="از انتخاب پوشش تا تحویل بیمه‌نامه، بدون مراجعه حضوری."
        />
        <NumberedSteps steps={BUY_STEPS} variant="buy" />
      </section>

      {/* چرا ما */}
      <section aria-labelledby="why-h" className="mt-12">
        <SectionHeading
          icon={BadgeCheck}
          title="چرا بیمه‌مسئولیتی برای خرید بیمه مسئولیت؟"
          hint="معیارهایی که هنگام انتخاب مرجع خرید باید بسنجید."
        />
        <div className="overflow-x-auto rounded-2xl border nice-scroll">
          <Table>
            <TableHeader>
              <TableRow className="bg-accent/60">
                <TableHead className="text-start whitespace-nowrap">معیار</TableHead>
                <TableHead className="text-start">ارائه بیمه‌مسئولیتی</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {CRITERIA_ROWS.map((row) => (
                <TableRow key={row.criterion}>
                  <TableCell className="align-top font-bold whitespace-nowrap">
                    {row.criterion}
                  </TableCell>
                  <TableCell className="align-top text-sm leading-7 text-muted-foreground">
                    {row.value}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* مشاوره خرید */}
      <section aria-labelledby="advisory-h" className="mt-12">
        <SectionHeading
          icon={MessagesSquare}
          title="مشاوره خرید بیمه مسئولیت شامل چیست؟"
          hint="مشاوره پیش از صدور، بخشی از خدمات استعلام رایگان است."
        />
        <div className="grid gap-4 max-w-4xl sm:grid-cols-2">
          {[
            "تحلیل ریسک فعالیت بر اساس شرح دقیق شغل، ظرفیت و شرایط محیطی.",
            "پیشنهاد سقف تعهد متناسب با دیه سال جاری و امکان حکم ضربات زیان‌بار.",
            "انتخاب فرانشیز متناسب با توان مالی و اثر آن بر نرخ نهایی.",
            "بررسی تخفیف عدم خسارت بیمه‌نامه قبلی و سوابق بیمه‌ای شما.",
            "بازبینی شرایط عمومی بیمه‌نامه، استثناها و پوشش‌های الحاقی پیش از صدور.",
          ].map((item) => (
            <div key={item} className="flex items-start gap-2.5 rounded-2xl border bg-card p-5">
              <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              <p className="text-sm leading-7 text-muted-foreground">{item}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 max-w-4xl">
          <CtaBanner
            title="قیمت پزشکان، پرستاران و مهندسین را خودتان محاسبه کنید"
            text="محاسبه‌گر آنلاین با نرخ مصوب بیمه ایران ۱۴۰۵: تخصص و سقف دیه را انتخاب کنید، قیمت نهایی سالانه را همان لحظه ببینید و سفارش صدور بیمه‌نامه را با کد پیگیری ثبت کنید — برای سایر رشته‌ها فرم استعلام عمومی فعال است."
            href="/order"
            cta="محاسبه آنلاین قیمت و ثبت سفارش"
          />
        </div>
        <div className="mt-4 max-w-4xl">
          <CtaBanner
            title="مشاوره خرید بیمه مسئولیت را همین حالا شروع کنید"
            text="نوع فعالیت و سقف دلخواه را ثبت کنید؛ کارشناس، سقف و فرانشیز مناسب را پیشنهاد و پیش‌فاکتور رسمی با نرخ مصوب بیمه ایران ارسال می‌کند — رایگان و بدون تعهد."
            href="/quote"
            cta="ثبت استعلام و درخواست مشاوره"
          />
        </div>
      </section>

      {/* قیمت شروع */}
      <section aria-labelledby="prices-h" className="mt-12">
        <SectionHeading
          icon={Wallet}
          title="قیمت شروع انواع پرتقاضا"
          hint="فقط پوشش‌هایی که بازه شروع تخمینی اعلام‌شده دارند؛ نرخ نهایی پس از استعلام."
        />
        <div className="max-w-4xl overflow-x-auto rounded-2xl border nice-scroll">
          <Table>
            <TableHeader>
              <TableRow className="bg-accent/60">
                <TableHead className="text-start whitespace-nowrap">نوع بیمه مسئولیت</TableHead>
                <TableHead className="text-start">مخاطب</TableHead>
                <TableHead className="text-start whitespace-nowrap">قیمت شروع (سالانه)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {popular.map((p) => (
                <TableRow key={p.slug}>
                  <TableCell className="align-top font-bold">
                    <Link href={productUrl(p.category, p.slug)} className="hover:text-primary">
                      {p.nameFa}
                    </Link>
                  </TableCell>
                  <TableCell className="align-top text-sm leading-7 text-muted-foreground">
                    {p.audienceFa}
                  </TableCell>
                  <TableCell className="align-top whitespace-nowrap text-primary">
                    {p.priceFromFa}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="mt-4 max-w-3xl text-[15px] leading-8 text-foreground/90">
          مبالغ جدول، شروع تخمینی حق بیمه سالانه است و با سقف تعهد، ظرفیت و سوابق خسارت تغییر
          می‌کند. عوامل کامل مؤثر بر نرخ و منطق قیمت‌گذاری در صفحه{" "}
          <Link href="/price" className="font-bold text-primary hover:underline">
            قیمت بیمه مسئولیت
          </Link>{" "}
          توضیح داده شده است؛ برای دریافت پیش‌فاکتور رسمی با نرخ مصوب،{" "}
          <Link href="/quote" className="font-bold text-primary hover:underline">
            فرم استعلام
          </Link>{" "}
          را تکمیل کنید.
        </p>
        <p className="mt-3 max-w-3xl text-xs leading-6 text-muted-foreground">
          * مبالغ نمایشی و برای آشنایی با مقیاس هزینه است و باید با نرخ‌نامه جاری بیمه ایران و
          ارزیابی ریسک شما تطبیق داده شود.
        </p>
      </section>

      {/* به تفکیک مخاطب */}
      <section aria-labelledby="audiences-h" className="mt-12">
        <SectionHeading
          icon={Users}
          title="خرید به تفکیک مخاطب"
          hint="نقطه شروع مناسب گروه خود را انتخاب کنید."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AUDIENCES.map((a) => (
            <Link
              key={a.title}
              href={a.href}
              className="group rounded-2xl border bg-card p-5 transition-colors hover:border-primary/40"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-[15px] font-extrabold">{a.title}</h3>
                <Badge variant="outline" className="shrink-0">
                  {a.tag}
                </Badge>
              </div>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{a.text}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-primary">
                مشاهده و خرید
                <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* اعتبار و امنیت */}
      <section aria-labelledby="trust-h" className="mt-12">
        <SectionHeading
          icon={ShieldCheck}
          title="اعتبار و امنیت خرید آنلاین"
          hint="خرید آنلاین از مجوز رسمی عبور می‌کند، نه از کنار آن."
        />
        <p className="max-w-3xl text-[15px] leading-8 text-foreground/90">
          خرید آنلاین به معنای خرید از منبع نامطمئن نیست؛ کل فرایند استعلام، صدور و ارسال
          بیمه‌نامه در چارچوب مجوز نمایندگی رسمی بیمه ایران انجام می‌شود و خروجی آن، سندی رسمی با
          همان اعتبار بیمه‌نامه‌های صادرشده در دفتر نمایندگی است. پیش از پرداخت، پیش‌فاکتور رسمی با
          تفکیک سقف تعهد و فرانشیز در اختیار شما قرار می‌گیرد.
        </p>
        <ul className="mt-4 max-w-3xl space-y-3">
          {[
            "بیمه‌نامه صادره از شرکت سهامی بیمه ایران است و نرخ آن از نرخ‌نامه مصوب همین شرکت محاسبه می‌شود.",
            "استعلام و صدور فقط از طریق نمایندگی رسمی کد ۲۰۶۱۶ انجام می‌شود و واسطه غیرمجاز در فرایند نقشی ندارد.",
            "اصالت بیمه‌نامه پس از دریافت قابل بررسی است؛ شماره بیمه‌نامه و مشخصات سند به‌صورت شفاف ارائه می‌شود.",
            "بیمه‌نامه کاغذی یا الکترونیکی رسمی صادر می‌شود و برای ارائه به نظام پزشکی، شهرداری، کارفرمایان و مراجع قراردادی کاربرد دارد.",
          ].map((t) => (
            <li key={t} className="flex items-start gap-2 text-sm leading-7 text-muted-foreground">
              <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <TrustStrip variant="grid" />
        </div>
      </section>

      {/* سوالات متداول */}
      <section className="mx-auto mt-12 max-w-4xl">
        <FaqSection faqs={BUY_FAQS} title="سوالات متداول خرید بیمه مسئولیت" />
      </section>

      {/* لینک‌های تکمیلی */}
      <section className="mt-12" aria-label="لینک‌های تکمیلی">
        <div className="flex flex-wrap gap-3">
          <Link
            href="/liability"
            className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
          >
            <Layers className="size-4" aria-hidden="true" />
            فهرست کامل پوشش‌های بیمه مسئولیت
            <ArrowLeft className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href="/documents"
            className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
          >
            <FileText className="size-4" aria-hidden="true" />
            مدارک لازم صدور بیمه مسئولیت
            <ArrowLeft className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href="/coverage-limit"
            className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
          >
            <Gauge className="size-4" aria-hidden="true" />
            راهنمای انتخاب سقف تعهد
            <ArrowLeft className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href="/dih"
            className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
          >
            <Coins className="size-4" aria-hidden="true" />
            جدول دیه سال جاری
            <ArrowLeft className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* اعتبار محتوا */}
      <div className="mt-12 space-y-5">
        <AuthorBox
          name="تیم تخصصی نمایندگی ۲۰۶۱۶ بیمه ایران"
          role="کارشناس بیمه مسئولیت"
          reviewDate={REVIEW_DATE_ISO}
        />
        <LegalDisclaimer />
      </div>

      <div className="mt-10">
        <CtaBanner
          title="پیش‌فاکتور رسمی بیمه ایران را همین امروز بگیرید"
          text="فرم استعلام را تکمیل کنید؛ سقف و فرانشیز مناسب فعالیت شما محاسبه و پیش‌فاکتور همان روز کاری ارسال می‌شود — رایگان و بدون تعهد."
        />
      </div>
    </div>
  );
}
