import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  Building2,
  Calculator,
  FileSearch,
  Gauge,
  MessagesSquare,
  PhoneCall,
  ShieldAlert,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { AnswerBlock } from "@/components/answer-block";
import { AuthorBox } from "@/components/author-box";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBanner } from "@/components/cta-banner";
import { FaqSection } from "@/components/faq-section";
import { LegalDisclaimer } from "@/components/legal-disclaimer";
import { SectionHeading } from "@/components/section-heading";
import { faqJsonLd, JsonLd, serviceJsonLd } from "@/lib/seo";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "بهترین سایت برای خرید بیمه مسئولیت — ۷ معیار انتخاب درست",
  description:
    "بهترین سایت برای خرید بیمه مسئولیت چه ویژگی‌هایی دارد؟ ۷ معیار تشخیص مرجع معتبر (مجوز نمایندگی، تخصص رشته، نرخ مصوب، پشتیبانی خسارت)، مقایسه مسیرهای خرید آنلاین و نشانه‌های سایت غیرمعتبر — از نمایندگی رسمی بیمه ایران کد ۲۰۶۱۶.",
  alternates: {
    canonical: "/best-site",
    languages: {
      "fa-IR": "/best-site",
      "x-default": "/best-site",
    },
  },
  openGraph: {
    title: "بهترین سایت برای خرید بیمه مسئولیت — ۷ معیار انتخاب درست",
    description:
      "مجوز رسمی، تخصص رشته، نرخ مصوب و پشتیبانی خسارت: معیارهای انتخاب بهترین سایت برای خرید بیمه مسئولیت و مقایسه مسیرهای خرید آنلاین.",
    url: "/best-site",
    type: "website",
    locale: "fa_IR",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "بهترین سایت برای خرید بیمه مسئولیت" }],
  },
};

const REVIEW_DATE_ISO = "2025-12-01";

// ─── ۷ معیار بهترین سایت برای خرید بیمه مسئولیت ─────────────────────

const CRITERIA = [
  {
    icon: BadgeCheck,
    title: "مجوز رسمی بیمه‌گر",
    text: "سایت باید نماینده رسمی یک شرکت بیمه با شماره کد نمایندگی قابل استعلام باشد؛ خروجی خرید باید بیمه‌نامه رسمی همان شرکت باشد، نه سندی با نام واسطه.",
  },
  {
    icon: FileSearch,
    title: "تخصص در همان رشته",
    text: "بیمه مسئولیت رشته‌ای پیچیده با استثنائات و الحاقیه‌های خاص است؛ مرجعی که فقط روی همین رشته کار می‌کند، ریسک را دقیق‌تر می‌خواند و سقف و فرانشیز را درست‌تر پیشنهاد می‌دهد.",
  },
  {
    icon: Calculator,
    title: "شفافیت نرخ و محاسبه",
    text: "قیمت باید با نرخ‌نامه مصوب شرکت بیمه محاسبه شود و مبنای آن به شما گفته شود؛ «قیمت ثابت برای همه» یا نرخ شفاف بدون سقف تعهد، علامت هشدار است.",
  },
  {
    icon: Wallet,
    title: "پیش‌فاکتور رسمی پیش از پرداخت",
    text: "پیش از هر پرداختی باید پیش‌فاکتور رسمی با تفکیک سقف تعهد، فرانشیز و پوشش‌های الحاقی دریافت کنید و پرداخت به حساب شرکت بیمه یا نمایندگی ثبت‌شده انجام شود.",
  },
  {
    icon: MessagesSquare,
    title: "مشاوره واقعی، نه فقط فرم",
    text: "یک کارشناس انسانی باید سقف تعهد را بر اساس ریسک واقعی فعالیت شما (دیه سال وقوع، ظرفیت، الزامات قراردادی) تنظیم کند؛ استعلام بدون مشاوره، خرید کور است.",
  },
  {
    icon: ShieldCheck,
    title: "پشتیبانی تا زمان خسارت",
    text: "ارزش بیمه‌نامه در زمان خسارت معلوم می‌شود؛ مرجع خوب، راهنمای اعلام خسارت گام‌به‌گام دارد و تا تسویه پرونده پاسخگو می‌ماند.",
  },
  {
    icon: Gauge,
    title: "محتوای قابل راستی‌آزمایی",
    text: "تعریف دقیق پوشش‌ها، استثنائات، مبنای قانونی (قانون مسئولیت مدنی و شرایط عمومی) و جدول دیه سال جاری باید در سایت موجود باشد؛ محتوای عمومی کپی‌شده نشانه سطح پایین است.",
  },
];

const ROUTE_ROWS = [
  {
    route: "نمایندگی تخصصی آنلاین بیمه مسئولیت (این سایت)",
    license: "کد نمایندگی رسمی ثبت‌شده — بیمه‌نامه رسمی شرکت بیمه",
    depth: "۳۳+ پوشش تخصصی با استثنائات و مبنای قانونی هر یک",
    price: "نرخ مصوب بیمه ایران + محاسبه‌گر آنلاین ۱۴۰۵ برای پزشکان، پرستاران و مهندسین",
    speed: "استعلام تا یک روز کاری؛ صدور پس از تأیید پیش‌فاکتور، همان روز کاری",
    claim: "راهنمای گام‌به‌گام خسارت + کارشناس تا تسویه",
  },
  {
    route: "سایت‌های واسطه و بازارهای چندشرکتی",
    license: "واسطه ثالث؛ صدور معمولاً توسط شرکت دیگر انجام می‌شود",
    depth: "فهرست عمومی پوشش‌ها؛ اغلب بدون استثنائات دقیق",
    price: "نرخ نمایشی متغیر؛ مبنای محاسبه معمولاً شفاف نیست",
    speed: "وابسته به گردش بین واسطه و شرکت بیمه",
    claim: "پشتیبانی خسارت اغلب به شرکت بیمه ارجاع می‌شود",
  },
  {
    route: "خرید حضوری از نمایندگی عمومی",
    license: "کد نمایندگی ثبت‌شده — بیمه‌نامه رسمی",
    depth: "به دانش همان شعبه وابسته است",
    price: "نرخ مصوب؛ اما بدون امکان مقایسه آنلاین پیش از مراجعه",
    speed: "نیازمند حضور حضوری در ساعت اداری",
    claim: "پیگیری حضوری؛ زمان‌بر برای مراجعه‌کننده",
  },
  {
    route: "اپلیکیشن‌های چندرشته‌ای خرید بیمه",
    license: "پلتفرم خرید؛ مجوز رشته‌ای باید جداگانه بررسی شود",
    depth: "تمرکز بر بیمه‌نامه‌های ساده (شخص ثالث، بدنه)؛ مسئولیت معمولاً فرعی",
    price: "قیمت نمایشی؛ برای مسئولیت معمولاً به استعلام دستی برمی‌گردد",
    speed: "سریع برای بیمه‌های ساده؛ کند برای ریسک‌های تخصصی",
    claim: "مسیر خسارت معمولاً داخل اپلیکیشن نیمه‌کاره می‌ماند",
  },
];

const WARNING_SIGNS = [
  "درج شماره کد نمایندگی در هیچ نقطه از سایت یا پیش‌فاکتور",
  "وعده «قیمت قطعی همان‌جا» بدون گرفتن شرح فعالیت و سقف تعهد",
  "درخواست پرداخت به کارت یا حساب شخصی فرد، نه مسیر رسمی شرکت بیمه",
  "بیمه‌نامه‌ای که شماره بیمه‌نامه و شرایط عمومی رسمی ندارد",
  "عدم وجود آدرس ثابت، تلفن تماس و ساعات کاری مشخص",
  "قیمت‌هایی که به‌طور بی‌دلیل از نرخ‌نامه مصوب بسیار پایین‌تر است",
];

const BEST_SITE_FAQS = [
  {
    question: "بهترین سایت برای خرید بیمه مسئولیت کدام است؟",
    answer:
      "بهترین سایت برای خرید بیمه مسئولیت سایتی است که مجوز رسمی نمایندگی بیمه‌گر را شفاف اعلام کند، فقط روی رشته بیمه مسئولیت تخصص داشته باشد، قیمت را با نرخ‌نامه مصوب شرکت بیمه محاسبه و پیش‌فاکتور رسمی صادر کند و در زمان خسارت هم پاسخگو بماند. بیمه‌مسئولیتی به‌عنوان نمایندگی رسمی بیمه ایران (فقط بیمه مسئولیت، با بیش از ۳۳ پوشش تخصصی، محاسبه‌گر آنلاین نرخ ۱۴۰۵ برای پزشکان، پرستاران و مهندسین و پاسخ استعلام حداکثر یک روز کاری) این معیارها را پوشش می‌دهد و می‌توانید قبل از خرید، هر معیار را مستقیم روی خود سایت راستی‌آزمایی کنید.",
  },
  {
    question: "خرید آنلاین بیمه مسئولیت از این سایت چگونه انجام می‌شود؟",
    answer:
      "برای خرید آنلاین بیمه مسئولیت، نوع پوشش را از فهرست ۳۳+ پوشش انتخاب یا در فرم استعلام فعالیت خود را ثبت می‌کنید؛ برای پزشکان، پرستاران و پیراپزشکان و مهندسین محاسبه‌گر آنلاین با نرخ مصوب بیمه ایران ۱۴۰۵ قیمت نهایی را همان لحظه نشان می‌دهد و سفارش صدور با کد پیگیری ثبت می‌شود. کارشناس حداکثر یک روز کاری تماس می‌گیرد، پیش‌فاکتور رسمی صادر و پس از پرداخت، بیمه‌نامه بدون مراجعه حضوری ارسال می‌شود.",
  },
  {
    question: "مشاوره خرید بیمه مسئولیت چگونه دریافت می‌شود؟",
    answer:
      "مشاوره خرید بیمه مسئولیت در این سایت بخشی از استعلام رایگان است: در فرم استعلام شرح دقیق فعالیت، شهر و سقف دلخواه را می‌نویسید، کارشناس ریسک را تحلیل و سقف تعهد و فرانشیز مناسب را بر اساس دیه سال وقوع و الزامات قرارداد پیشنهاد می‌کند، تخفیف عدم خسارت بیمه‌نامه قبلی را بررسی و پیش‌فاکتور رسمی ارسال می‌کند. این مشاوره قبل از صدور هزینه‌ای ندارد و هیچ تعهد خریدی ایجاد نمی‌کند.",
  },
  {
    question: "آیا بیمه‌نامه‌ای که آنلاین می‌خرم با خرید حضوری تفاوتی دارد؟",
    answer:
      "خیر؛ بیمه‌نامه صادره از این مسیر، سند رسمی شرکت سهامی بیمه ایران است و با بیمه‌نامه‌های صادرشده در دفتر نمایندگی برابری می‌کند: شماره بیمه‌نامه، شرایط عمومی، سقف تعهد و فرانشیز در متن سند درج می‌شود و اصالت آن از طریق نمایندگی کد ۲۰۶۱۶ قابل استعلام است. تنها تفاوت، سرعت و امکان مقایسه پوشش‌ها و نرخ‌ها قبل از پرداخت است.",
  },
  {
    question: "قبل از خرید بیمه مسئولیت آنلاین چه چیزهایی را باید بررسی کنم؟",
    answer:
      "پنج چیز را بررسی کنید: اول کد نمایندگی و مجوز صادرکننده، دوم تخصص سایت در رشته مسئولیت، سوم مبنای محاسبه قیمت (نرخ‌نامه مصوب شرکت بیمه)، چهارم دریافت پیش‌فاکتور رسمی پیش از هر پرداخت و پنجم مسیر پشتیبانی خسارت. چک‌لیست کامل بازبینی بیمه‌نامه قبل از امضا نیز در صفحه راهنماها موجود است.",
  },
];

export default function BestSitePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <JsonLd
        data={serviceJsonLd({
          name: "بهترین سایت برای خرید بیمه مسئولیت — معیارها و مقایسه",
          description:
            "۷ معیار انتخاب بهترین سایت برای خرید بیمه مسئولیت: مجوز رسمی نمایندگی، تخصص رشته، شفافیت نرخ مصوب، پیش‌فاکتور رسمی، مشاوره سقف تعهد و پشتیبانی خسارت — با مقایسه مسیرهای خرید آنلاین.",
          url: "/best-site",
          category: "بیمه مسئولیت — بیمه ایران",
          areaServed: "ایران",
          dateModified: REVIEW_DATE_ISO,
        })}
      />
      <JsonLd data={faqJsonLd(BEST_SITE_FAQS)} />

      <Breadcrumbs items={[{ name: "بهترین سایت خرید بیمه مسئولیت", href: "/best-site" }]} />

      <header className="mt-6">
        <h1 className="text-2xl font-extrabold leading-[1.6] sm:text-3xl">
          بهترین سایت برای خرید بیمه مسئولیت
        </h1>
      </header>

      <div className="mt-6 max-w-3xl">
        <AnswerBlock
          title="بهترین سایت برای خرید بیمه مسئولیت کدام است؟"
          text="بهترین سایت برای خرید بیمه مسئولیت سایتی است که مجوز رسمی نمایندگی بیمه‌گر را شفاف اعلام کند، فقط روی همین رشته تخصص داشته باشد، قیمت را با نرخ‌نامه مصوب شرکت بیمه محاسبه کند، پیش‌فاکتور رسمی صادر کند و تا زمان خسارت پاسخگو بماند. بیمه‌مسئولیتی با همین معیارها ساخته شده است: نمایندگی رسمی بیمه ایران، بیش از ۳۳ پوشش تخصصی مسئولیت، محاسبه‌گر آنلاین با نرخ مصوب ۱۴۰۵ برای پزشکان، پرستاران و پیراپزشکان و مهندسین، استعلام رایگان با پاسخ حداکثر یک روز کاری و راهنمای گام‌به‌گام خسارت. در ادامه، هر معیار را می‌توانید مستقل از ما راستی‌آزمایی کنید."
        />
      </div>

      {/* ۷ معیار */}
      <section aria-labelledby="criteria-h" className="mt-12">
        <SectionHeading
          icon={BadgeCheck}
          title="۷ معیار بهترین سایت برای خرید بیمه مسئولیت"
          hint="این فهرست را برای هر مرجعی — از جمله خود ما — به کار ببرید."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CRITERIA.map((c) => (
            <div key={c.title} className="rounded-2xl border bg-card p-5">
              <c.icon className="size-5 text-primary" aria-hidden="true" />
              <h3 className="mt-3 text-[15px] font-extrabold">{c.title}</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{c.text}</p>
            </div>
          ))}
          <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-5">
            <h3 className="text-[15px] font-extrabold">جمع‌بندی معیارها</h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              سایتی که همه هفت معیار را برآورده کند، خرید آنلاین بیمه مسئولیت در آن از خرید حضوری
              امن‌تر و دقیق‌تر است — چون هر گام مستند و قابل بازگشت است.
            </p>
            <Link
              href="/buy"
              className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline"
            >
              فرایند کامل خرید آنلاین
              <ArrowLeft className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* مقایسه مسیرهای خرید */}
      <section aria-labelledby="routes-h" className="mt-12">
        <SectionHeading
          icon={Building2}
          title="مقایسه مسیرهای خرید بیمه مسئولیت"
          hint="همان مسیرهایی که امروز برای خرید در دسترس شماست — با واقعیت هر یک."
        />
        <div className="overflow-x-auto rounded-2xl border nice-scroll">
          <Table>
            <TableHeader>
              <TableRow className="bg-accent/60">
                <TableHead className="text-start whitespace-nowrap">مسیر خرید</TableHead>
                <TableHead className="text-start">مجوز و صادرکننده</TableHead>
                <TableHead className="text-start">عمق تخصص رشته</TableHead>
                <TableHead className="text-start">شفافیت قیمت</TableHead>
                <TableHead className="text-start">سرعت</TableHead>
                <TableHead className="text-start">پشتیبانی خسارت</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ROUTE_ROWS.map((r) => (
                <TableRow key={r.route}>
                  <TableCell className="align-top font-bold whitespace-nowrap">{r.route}</TableCell>
                  <TableCell className="align-top text-sm leading-7 text-muted-foreground">{r.license}</TableCell>
                  <TableCell className="align-top text-sm leading-7 text-muted-foreground">{r.depth}</TableCell>
                  <TableCell className="align-top text-sm leading-7 text-muted-foreground">{r.price}</TableCell>
                  <TableCell className="align-top text-sm leading-7 text-muted-foreground">{r.speed}</TableCell>
                  <TableCell className="align-top text-sm leading-7 text-muted-foreground">{r.claim}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="mt-3 text-xs leading-6 text-muted-foreground">
          * توصیف مسیرهای دیگر، مشخصه‌های عمومیِ رایج آن مسیرها است و به معنای ارزیابی یک سایت یا
          اپلیکیشن خاص نیست؛ برای هر مرجع مشخص، همین جدول را با شواهد خود آن پر کنید.
        </p>
      </section>

      {/* چرا این سایت */}
      <section aria-labelledby="why-us-h" className="mt-12">
        <SectionHeading
          icon={ShieldCheck}
          title="بیمه‌مسئولیتی در برابر همین ۷ معیار"
          hint="ادعای هر معیار را می‌توانید با یک لینک مستقیم بسنجید."
        />
        <div className="max-w-4xl overflow-x-auto rounded-2xl border nice-scroll">
          <Table>
            <TableHeader>
              <TableRow className="bg-accent/60">
                <TableHead className="text-start whitespace-nowrap">معیار</TableHead>
                <TableHead className="text-start">وضعیت در بیمه‌مسئولیتی</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  k: "مجوز رسمی",
                  v: "نمایندگی رسمی شرکت سهامی بیمه ایران، کد ۲۰۶۱۶؛ صدور مستقیم بیمه‌نامه رسمی.",
                },
                {
                  k: "تخصص رشته",
                  v: "فقط و فقط بیمه مسئولیت: ۳۳+ پوشش حرفه‌ای، تجاری، شرکتی و عمومی با استثنائات دقیق هر یک.",
                },
                {
                  k: "شفافیت نرخ",
                  v: "محاسبه‌گر آنلاین با نرخ مصوب بیمه ایران ۱۴۰۵ برای پزشکان، پرستاران و پیراپزشکان و مهندسین؛ سایر رشته‌ها با استعلام و پیش‌فاکتور رسمی.",
                },
                {
                  k: "پیش‌فاکتور رسمی",
                  v: "پیش از هر پرداخت، پیش‌فاکتور با تفکیک سقف تعهد، فرانشیز و پوشش‌های الحاقی ارسال می‌شود.",
                },
                {
                  k: "مشاوره واقعی",
                  v: "کارشناس سقف تعهد را بر اساس ریسک واقعی فعالیت، دیه سال وقوع و الزامات قراردادی تنظیم می‌کند.",
                },
                {
                  k: "پشتیبانی خسارت",
                  v: "راهنمای گام‌به‌گام اعلام خسارت به تفکیک پوشش، از تشکیل پرونده تا تسویه.",
                },
                {
                  k: "محتوای قابل راستی‌آزمایی",
                  v: "جدول دیه سال جاری، واژه‌نامه، مبنای قانونی هر پوشش و چک‌لیست بازبینی بیمه‌نامه در همین سایت منتشر شده است.",
                },
              ].map((row) => (
                <TableRow key={row.k}>
                  <TableCell className="align-top font-bold whitespace-nowrap">{row.k}</TableCell>
                  <TableCell className="align-top text-sm leading-7 text-muted-foreground">{row.v}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/order"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Calculator className="size-4" aria-hidden="true" />
            محاسبه آنلاین و ثبت سفارش
          </Link>
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
          >
            <FileSearch className="size-4" aria-hidden="true" />
            استعلام رایگان سایر رشته‌ها
          </Link>
          <a
            href="tel:09981313724"
            className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
          >
            <PhoneCall className="size-4" aria-hidden="true" />
            مشاوره تلفنی: ۰۹۹۸ ۱۳۱ ۳۷۲۴
          </a>
        </div>
      </section>

      {/* نشانه‌های هشدار */}
      <section aria-labelledby="warning-h" className="mt-12">
        <SectionHeading
          icon={ShieldAlert}
          title="نشانه‌های سایت غیرمعتبر خرید بیمه مسئولیت"
          hint="اگر حتی یکی از این‌ها را دیدید، از پرداخت خودداری کنید."
        />
        <ul className="grid gap-3 max-w-4xl sm:grid-cols-2">
          {WARNING_SIGNS.map((w) => (
            <li key={w} className="flex items-start gap-2.5 rounded-2xl border bg-card p-4">
              <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-destructive" aria-hidden="true" />
              <p className="text-sm leading-7 text-muted-foreground">{w}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <div className="mt-12 max-w-4xl">
        <CtaBanner
          title="با همان معیارها، همین حالا شروع کنید"
          text="برای پزشکان، پرستاران و پیراپزشکان و مهندسین قیمت را آنلاین محاسبه و سفارش صدور را ثبت کنید؛ برای سایر حرفه‌ها استعلام رایگان با پاسخ حداکثر یک روز کاری فعال است."
          href="/order"
          cta="محاسبه آنلاین و ثبت سفارش"
        />
      </div>

      {/* سوالات متداول */}
      <section className="mx-auto mt-12 max-w-4xl">
        <FaqSection faqs={BEST_SITE_FAQS} title="سوالات متداول بهترین سایت خرید بیمه مسئولیت" />
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
    </div>
  );
}
