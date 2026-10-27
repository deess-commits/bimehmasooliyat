import Link from "next/link";
import { ChevronLeft, FileSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export function CtaBanner({
  title = "سقف تعهد مناسب ریسک خود را نمی‌دانید؟",
  text = "فرم استعلام را تکمیل کنید؛ کارشناس ما پیش از صدور، پوشش و سقف مناسب را با شما تنظیم می‌کند. بدون هزینه و بدون تعهد.",
  href = "/quote",
  cta = "استعلام رایگان قیمت",
  productName,
  industryName,
}: {
  title?: string;
  text?: string;
  href?: string;
  cta?: string;
  productName?: string;
  industryName?: string;
}) {
  const params = new URLSearchParams();
  if (productName) params.set("product", productName);
  if (industryName) params.set("industry", industryName);
  const qs = params.toString();
  const url = qs ? `${href}?${qs}` : href;
  return (
    <section
      aria-label="فراخوان استعلام"
      className="rounded-2xl bg-primary px-6 py-8 text-primary-foreground sm:px-10 sm:py-10"
    >
      <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-lg font-extrabold sm:text-xl">{title}</h2>
          <p className="mt-2 text-sm leading-7 text-primary-foreground/85">{text}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:items-end">
          <Button size="lg" variant="secondary" asChild className="font-bold">
            <Link href={url}>
              <FileSearch className="size-4" aria-hidden="true" />
              {cta}
            </Link>
          </Button>
          <a
            href={`tel:${siteConfig.nap.phone}`}
            className="text-xs font-semibold text-primary-foreground/85 hover:text-primary-foreground"
          >
            یا تلفنی: <span dir="ltr">{siteConfig.nap.phoneDisplay}</span>
          </a>
        </div>
      </div>
      <p className="mt-5 flex items-center gap-1 text-[11px] text-primary-foreground/70">
        <ChevronLeft className="size-3" aria-hidden="true" />
        پاسخ استعلام حداکثر تا یک روز کاری — استعلام هیچ تعهدی برای خرید ایجاد نمی‌کند.
      </p>
    </section>
  );
}
