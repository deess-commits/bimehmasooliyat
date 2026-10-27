import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, CalendarClock, ClipboardList, FileText, GraduationCap, Gavel, Scale, Search } from "lucide-react";
import { AnswerBlock } from "@/components/answer-block";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBanner } from "@/components/cta-banner";
import { FaqSection } from "@/components/faq-section";
import { NumberedSteps } from "@/components/numbered-steps";
import { SectionHeading } from "@/components/section-heading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getGeneralFaqs, getProduct } from "@/lib/data";
import { productUrl } from "@/lib/format";
import { claimCases, claimGuides } from "@/prisma/seed-data/claim-guides";
import { faqJsonLd, howToJsonLd, JsonLd } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "مراحل دریافت خسارت بیمه مسئولیت — از اعلام تا پرداخت",
  description:
    "راهنمای گام‌به‌گام اعلام و دریافت خسارت بیمه مسئولیت: مهلت اعلام، مدارک لازم، نقش رأی دادگاه و راهکار در صورت عدم پذیرش خسارت توسط بیمه.",
  alternates: {
    canonical: "/claims",
    languages: {
      "fa-IR": "/claims",
      en: "/en/claims",
      "x-default": "/claims",
    },
  },
};

const CLAIM_STEPS = [
  {
    title: "اعلام فوری رخداد",
    description:
      "بلافاصله پس از اطلاع از رخداد، آن را به نمایندگی اعلام کنید. طبق ماده ۳۰ قانون بیمه، مهلت اعلام معمولاً حداکثر ۵ روز کاری است مگر آنکه در بیمه‌نامه مهلت دیگری توافق شده باشد.",
  },
  {
    title: "جلوگیری از تشدید خسارت",
    description:
      "تا زمان کارشناسی، وضعیت رخداد را تغییر ندهید؛ اقدامات اضطراری نجات‌بخش مجاز است و هزینه منطقی آن قابل مطالبه است.",
  },
  {
    title: "تکمیل فرم اعلام خسارت",
    description:
      "فرم رسمی را با شرح دقیق وقایع، تاریخ، شاهدان و خسارت‌های ادعایی تکمیل و امضا کنید. هر اعلامیه مشابه قبلی را صادقانه ذکر کنید.",
  },
  {
    title: "ارسال مدارک",
    description:
      "پرونده مرتبط، اسناد هویتی، مدارک حرفه‌ای (پروانه/مجوز)، صورتحساب‌ها و در دعاوی جانی، مدارک کمیسیون طبی یا پزشکی قانونی ارسال می‌شود.",
  },
  {
    title: "کارشناسی و تعیین مسئولیت",
    description:
      "کارشناس خسارت رابطه سببیت و میزان تقصیر را بررسی می‌کند. در دعاوی جانی، رأی مرجع قضایی یا نظر کمیسیون طبی مبنای محاسبه است.",
  },
  {
    title: "توافق یا رأی و پرداخت",
    description:
      "پس از تعیین خسارت قابل پرداخت (پس از کسر فرانشیز)، مبلغ به ذی‌نفع پرداخت می‌شود. در صورت اختلاف، مرجع قضایی یا داوری مبنای نهایی است.",
  },
];

const DOCUMENTS = [
  "فرم اعلام خسارت تکمیل و امضاشده",
  "کپی بیمه‌نامه و رسید پرداخت حق بیمه",
  "اسناد هویتی بیمه‌شده و شاکی",
  "مدارک اثبات رخداد (پرونده، عکس، گزارش مقامات، گواهی پزشکی)",
  "مدارک حرفه‌ای: پروانه نظام پزشکی، مجوز کسب، قرارداد یا ماده ۳۳ نظارت",
  "در دعوای مالی: فاکتورها و مستندات مالکیت و ارزش",
];

const DEADLINES = [
  { item: "اعلام رخداد به بیمه‌گر", value: "حداکثر ۵ روز کاری از زمان اطلاع (ماده ۳۰ قانون بیمه)" },
  { item: "اعلام دعوای حقوقی علیه بیمه‌شده", value: "فوراً و قبل از مواجهه در دادگاه" },
  { item: "دعوای ثالث علیه بیمه‌گر", value: "مطابق ماده ۳۰ — پس از قطعی شدن مسئولیت و تا انقضای مهلت دو ساله دعاوی" },
  { item: "مهلت پرداخت خسارت", value: "طبق شرایط عمومی؛ معمولاً حداکثر ۱۵ روز پس از توافق یا صدور رأی قطعی" },
];

const CLAIM_FAQS = [
  {
    question: "اگر بیمه خسارت را نپذیرفت چه اقدامی کنم؟",
    answer:
      "ابتدا کتباً دلایل رد پرونده را بخواهید. اگر رد شدن ناشی از برداشت متفاوت از شرایط بیمه‌نامه است، با مستندات و نظر کارشناس مستقل به نمایندگی اعتراض کنید. در صورت عدم توافق، کمیسیون حل اختلاف بیمه مرکزی یا مرجع قضایی مسیر قانونی شماست و رأی دادگاه مبنای پرداخت خواهد بود.",
  },
  {
    question: "رأی دادگاه چه نقشی در پرونده خسارت دارد؟",
    answer:
      "در دعاوی مسئولیت، میزان تقصیر و مبلغ خسارت نهایتاً با رأی مرجع قضایی قطعی می‌شود. بیمه‌گر به‌موجب ماده ۳۰ قانون بیمه موظف است به رأی قطعی دادگاه درباره مسئولیت بیمه‌شده عمل کند و خسارت را تا سقف تعهد بیمه‌نامه بپردازد. هزینه دفاع حقوقی نیز در همین چارچوب پوشش داده می‌شود.",
  },
  {
    question: "مهلت اعلام خسارت را از دست بدهم چه می‌شود؟",
    answer:
      "تأخیر در اعلام می‌تواند به دفاع بیمه‌گر منجر شود، مگر آنکه ثابت کنید تأخیر غیرمسئولانه نبوده یا بیمه‌گر به‌طور رضایی پرونده را پذیرفته است. به همین دلیل توصیه می‌شود رخداد را حتی پیش از تشکیل پرونده کامل، به‌صورت اولیه و مکتوب اعلام کنید تا حق شما محفوظ بماند.",
  },
  {
    question: "فرانشیز در پرداخت خسارت چگونه اعمال می‌شود؟",
    answer:
      "فرانشیز سهمی از خسارت است که بیمه‌نامه آن را بر عهده شما می‌گذارد؛ به‌صورت درصدی از خسارت یا مبلغ قطعی تعیین می‌شود. مثلاً با فرانشیز ۱۰ درصدی، از خسارت ۱۰۰ میلیونی، ۹۰ میلیون پرداخت می‌شود. انتخاب فرانشیز بالاتر، حق بیمه را کاهش می‌دهد.",
  },
];

export default async function ClaimsPage() {
  const allFaqs = await getGeneralFaqs();
  const claimFaqs = allFaqs.filter((f) => f.group === "claim");
  const caseProducts = await Promise.all([
    ...new Set(claimCases.flatMap((c) => c.relatedProducts)),
  ].map((s) => getProduct(s)));
  const caseProductInfo = new Map(
    caseProducts.filter((p) => p).map((p) => [p!.slug, { nameFa: p!.nameFa, category: p!.category }]),
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <JsonLd
        data={howToJsonLd({
          name: "مراحل دریافت خسارت بیمه مسئولیت",
          description: "از اعلام فوری رخداد تا پرداخت خسارت — شش گام مبتنی بر ماده ۳۰ قانون بیمه.",
          steps: CLAIM_STEPS,
          url: "/claims",
        })}
      />
      <JsonLd data={faqJsonLd([...CLAIM_FAQS, ...claimFaqs])} />

      <Breadcrumbs items={[{ name: "فرایند خسارت", href: "/claims" }]} />

      <header className="mt-6">
        <h1 className="text-2xl font-extrabold leading-snug sm:text-3xl">
          مراحل دریافت خسارت بیمه مسئولیت — از اعلام تا پرداخت
        </h1>
        <div className="mt-4 max-w-3xl">
          <AnswerBlock
            title="خلاصه فرایند خسارت"
            text="دریافت خسارت بیمه مسئولیت شامل شش گام است: اعلام فوری رخداد (حداکثر ۵ روز کاری طبق ماده ۳۰ قانون بیمه)، جلوگیری از تشدید خسارت، تکمیل فرم اعلام، ارسال مدارک، کارشناسی و تعیین مسئولیت، و نهایتاً پرداخت پس از توافق یا رأی قطعی. نقش نمایندگی، مدیریت پرونده و دفاع از حقوق شما در همه مراحل است."
          />
        </div>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-10">
          <section aria-labelledby="steps-h">
            <SectionHeading icon={Gavel} title="شش گام دریافت خسارت" />
            <NumberedSteps steps={CLAIM_STEPS} variant="claim" />
          </section>

          <section aria-labelledby="docs-h">
            <SectionHeading icon={FileText} title="مدارک لازم برای اعلام خسارت" />
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {DOCUMENTS.map((d, i) => (
                <li key={i} className="flex items-start gap-2 rounded-xl border bg-card p-3.5 text-sm leading-7">
                  <FileText className="mt-1 size-4 shrink-0 text-primary" aria-hidden="true" />
                  {d}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="deadline-h">
            <SectionHeading icon={CalendarClock} title="مهلت‌های کلیدی" />
            <div className="overflow-hidden rounded-2xl border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-accent/60">
                    <TableHead className="text-start">واقعه</TableHead>
                    <TableHead className="text-start">مهلت / مبنای قانونی</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {DEADLINES.map((d, i) => (
                    <TableRow key={i}>
                      <TableCell className="align-top font-bold">{d.item}</TableCell>
                      <TableCell className="align-top text-sm leading-7 text-muted-foreground">{d.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </section>

          <section aria-labelledby="reject-h">
            <SectionHeading icon={AlertTriangle} title="اگر بیمه خسارت را نپذیرفت" />
            <div className="rounded-2xl border bg-card p-5 text-sm leading-8">
              <p>
                <strong>گام اول:</strong> استعلام کتبی دلیل رد پرونده. <strong>گام دوم:</strong> اعتراض با
                مستندات و در صورت نیاز کارشناسی مرضی‌الطرفین. <strong>گام سوم:</strong> طرح شکایت در کمیسیون
                حل اختلاف بیمه مرکزی یا مراجع قضایی. رأی قطعی دادگاه درباره مسئولیت بیمه‌شده، برای بیمه‌گر
                الزام‌آور است (ماده ۳۰ قانون بیمه). این مسیر در تمام مراحل با پشتیبانی نمایندگی همراهی می‌شود.
              </p>
            </div>
          </section>

          <section aria-labelledby="guides-h">
            <SectionHeading
              icon={ClipboardList}
              title="راهنماهای تخصصی اعلام خسارت"
              hint="برای هر خانواده ریسک، مراحل و مدارک اختصاصی جداگانه مستند شده است."
            />
            <div className="grid gap-3 sm:grid-cols-2">
              {claimGuides.map((g) => (
                <Link key={g.slug} href={`/claims/${g.slug}`} className="group">
                  <Card className="h-full py-4 transition-all group-hover:border-primary/40 group-hover:shadow-sm">
                    <CardHeader className="pb-1.5">
                      <CardTitle className="text-sm group-hover:text-primary">{g.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="line-clamp-2 text-xs leading-6 text-muted-foreground">{g.answerBlock}</p>
                      <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-primary">
                        راهنمای کامل
                        <ArrowLeft className="size-3.5" aria-hidden="true" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          <section aria-labelledby="cases-h">
            <SectionHeading
              icon={GraduationCap}
              title="سناریوهای آموزشی خسارت"
              hint="نمونه‌های آموزشی واقع‌نما برای فهم بهتر روند تسویه — پرونده واقعی نیستند."
            />
            <Accordion type="single" collapsible className="rounded-2xl border bg-card px-4">
              {claimCases.map((c) => (
                <AccordionItem key={c.slug} value={c.slug} className="border-b last:border-0">
                  <AccordionTrigger className="text-start text-sm font-bold hover:no-underline">
                    {c.title}
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3 pb-5">
                    <div className="rounded-xl bg-secondary/60 p-3.5 text-[13px] leading-7">
                      <Badge variant="secondary" className="mb-2 bg-primary/10 text-primary hover:bg-primary/10">
                        سناریوی آموزشی
                      </Badge>
                      <p className="font-semibold text-foreground">شرح رخداد</p>
                      <p className="text-muted-foreground">{c.scenario}</p>
                    </div>
                    <div className="text-[13px] leading-7">
                      <p className="font-semibold">تحلیل مسئولیت</p>
                      <p className="text-muted-foreground">{c.liability}</p>
                    </div>
                    <div className="text-[13px] leading-7">
                      <p className="font-semibold">روند تسویه</p>
                      <p className="text-muted-foreground">{c.settlement}</p>
                    </div>
                    <div className="text-[13px] leading-7">
                      <p className="font-semibold text-primary">درس کلیدی</p>
                      <p className="text-muted-foreground">{c.lesson}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {c.relatedProducts.map((s) => {
                        const info = caseProductInfo.get(s);
                        return info ? (
                          <Link
                            key={s}
                            href={productUrl(info.category, s)}
                            className="rounded-full border px-3.5 py-1.5 text-xs font-semibold hover:border-primary/40 hover:text-primary"
                          >
                            {info.nameFa}
                          </Link>
                        ) : null;
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <FaqSection faqs={CLAIM_FAQS} title="سوالات متداول خسارت" />
        </div>

        <aside className="top-24 h-fit space-y-4 lg:sticky">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">اعلام خسارت فوری</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p className="leading-7 text-muted-foreground">
                رخداد را همین حالا اعلام کنید تا مهلت قانونی از دست نرود.
              </p>
              <Link
                href="/contact"
                className="block rounded-lg bg-primary px-4 py-3 text-center text-sm font-bold text-primary-foreground hover:opacity-90"
              >
                اعلام خسارت / تماس اضطراری
              </Link>
              <Link href="/quote" className="block rounded-lg border px-4 py-3 text-center text-sm font-bold hover:border-primary/40">
                استعلام بیمه‌نامه جدید
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Search className="size-4 text-primary" aria-hidden="true" />
                نکته کلیدی
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[13px] leading-7 text-muted-foreground">
                هرگز قبل از کارشناسی، محل رخداد را بازسازی یا تغییر ندهید؛ این کار محمل اصلی رد پرونده است.
              </p>
            </CardContent>
          </Card>
        </aside>
      </div>

      <div className="mt-14">
        <CtaBanner
          title="بیمه‌نامه شما خسارت داده؟ همین حالا اعلام کنید"
          text="تیم خسارت ما از اعلام اولیه تا پرداخت، پرونده شما را مدیریت می‌کند."
          href="/contact"
          cta="اعلام خسارت"
        />
      </div>
    </div>
  );
}
