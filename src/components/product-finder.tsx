"use client";

// ─── جست‌وجوی زنده‌ی پوشش مناسب فعالیت کاربر در بخش خرید ─────────────
// مثال: کاربر «پزشک چشم» را تایپ می‌کند و به بیمه مسئولیت پزشکان می‌رسد.

import { useMemo, useState } from "react";
import { ArrowLeft, Calculator, Search, SearchX } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { productUrl, toFaDigits } from "@/lib/format";
import { searchProducts } from "@/lib/product-search";
import type { SeedProduct } from "@/prisma/seed-data/types";

const MAX_VISIBLE = 8;

/** سه محصولی که محاسبه‌گر آنلاین دارند → لینک مستقیم به /order?kind=… */
const CALCULATOR_SLUGS: Record<string, string> = {
  "medical-doctors": "doctors",
  "nurses-paramedics": "nurses",
  engineers: "engineers",
};

const SUGGESTIONS = ["پزشک چشم", "دندان‌پزشک", "پرستار", "مهندس عمران", "وکیل", "کارفرما", "آسانسور", "آرایشگاه"];

const CATEGORY_LABELS: Record<string, string> = {
  professional: "حرفه‌ای",
  commercial: "تجاری",
  corporate: "شرکتی",
  public: "عمومی",
};

export function ProductFinder({ products }: { products: SeedProduct[] }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchProducts(products, query), [products, query]);

  const visible = results.slice(0, MAX_VISIBLE);
  const remaining = results.length - visible.length;
  const noResult = query.trim().length > 0 && results.length === 0;

  return (
    <div className="rounded-2xl border-2 border-primary/25 bg-card p-5 sm:p-6">
      <div className="relative">
        <Search className="absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="شغل یا فعالیت خود را بنویسید: پزشک چشم، پرستار، مهندس عمران، کارفرما…"
          className="h-12 ps-9 text-[15px]"
          aria-label="جستجوی پوشش بیمه مسئولیت مناسب فعالیت شما"
          type="search"
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-muted-foreground">جست‌وجوهای پرکاربرد:</span>
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setQuery(s)}
            className="rounded-full border bg-background px-3 py-1 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            {s}
          </button>
        ))}
      </div>

      {noResult && (
        <div className="mt-5 rounded-xl border bg-accent/30 p-5 text-center">
          <SearchX className="mx-auto size-6 text-muted-foreground" aria-hidden="true" />
          <p className="mt-2 text-sm font-bold">پوشش مستقیمی برای «{query}» یافت نشد</p>
          <p className="mt-1 text-[13px] leading-6 text-muted-foreground">
            فاصله‌ها را کمتر کنید یا با عبارت ساده‌تر جست‌وجو کنید؛ در غیر این صورت فرم استعلام عمومی را تکمیل کنید تا کارشناس پوشش مناسب را پیدا کند.
          </p>
          <Button size="sm" variant="outline" className="mt-3" asChild>
            <a href="/quote">ثبت استعلام عمومی</a>
          </Button>
        </div>
      )}

      {results.length > 0 && (
        <div className="mt-5">
          <p className="text-xs font-semibold text-muted-foreground" role="status" aria-live="polite">
            {query.trim().length > 0
              ? `${toFaDigits(results.length)} پوشش مرتبط با «${query}» پیدا شد`
              : `پیشنهاد ما از بین ${toFaDigits(products.length)} پوشش`}
          </p>
          <ul className="mt-3 divide-y rounded-xl border">
            {visible.map(({ product }) => {
              const calcKind = CALCULATOR_SLUGS[product.slug];
              return (
                <li key={product.slug} className="flex flex-col gap-3 p-4 transition-colors hover:bg-accent/30 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <a href={productUrl(product.category, product.slug)} className="text-sm font-extrabold hover:text-primary">
                        {product.nameFa}
                      </a>
                      <Badge variant="outline" className="shrink-0 text-[11px]">
                        {CATEGORY_LABELS[product.category] ?? product.category}
                      </Badge>
                    </div>
                    <p className="mt-1 text-[13px] leading-6 text-muted-foreground">{product.audienceFa}</p>
                  </div>
                  <div className="flex shrink-0 flex-wrap items-center gap-2">
                    {product.priceFromFa && (
                      <span className="whitespace-nowrap text-xs font-bold text-primary">{product.priceFromFa}</span>
                    )}
                    {calcKind && (
                      <Button size="sm" variant="outline" asChild className="font-bold">
                        <a href={`/order?kind=${calcKind}`}>
                          <Calculator className="size-3.5" aria-hidden="true" />
                          محاسبه قیمت آنلاین
                        </a>
                      </Button>
                    )}
                    <Button size="sm" asChild className="font-bold">
                      <a href={productUrl(product.category, product.slug)}>
                        مشاهده و خرید
                        <ArrowLeft className="size-3.5" aria-hidden="true" />
                      </a>
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
          {remaining > 0 && (
            <p className="mt-2 text-center text-xs text-muted-foreground">
              و {toFaDigits(remaining)} پوشش دیگر مرتبط؛ عبارت را دقیق‌تر کنید.
            </p>
          )}
        </div>
      )}

      {query.trim().length === 0 && (
        <p className="mt-4 text-center text-xs leading-6 text-muted-foreground">
          نمی‌دانید کدام پوشش مناسب است؟ با نرمال‌سازی کامل فارسی جست‌وجو می‌کنیم — «دندانپزشك» با «دندان‌پزشک»، «پزشک چشم» با «چشم‌پزشک» یکسان است.
        </p>
      )}
    </div>
  );
}
