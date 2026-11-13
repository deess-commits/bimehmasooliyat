"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { searchProducts } from "@/lib/product-search";
import type { CategoryKey, SeedProduct } from "@/prisma/seed-data/types";

const CATEGORY_ORDER: CategoryKey[] = ["professional", "commercial", "corporate", "public"];

export function LiabilityExplorer({
  products,
  categoryLabels,
}: {
  products: SeedProduct[];
  categoryLabels: Record<string, string>;
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<CategoryKey | "all">("all");

  // جست‌وجوی توکنی فارسی با مترادف‌ها: «پزشک چشم» → بیمه مسئولیت پزشکان
  const matched = useMemo(() => searchProducts(products, query), [products, query]);

  const filtered = useMemo(() => {
    if (!query.trim()) {
      return products.filter((p) => active === "all" || p.category === active);
    }
    return matched.map((m) => m.product).filter((p) => active === "all" || p.category === active);
  }, [products, matched, query, active]);

  const grouped = useMemo(() => {
    return CATEGORY_ORDER.map((key) => ({
      key,
      label: categoryLabels[key] ?? key,
      items: filtered.filter((p) => p.category === key),
    })).filter((g) => g.items.length > 0);
  }, [filtered, categoryLabels]);

  return (
    <div>
      {/* Filter bar */}
      <div className="sticky top-16 z-30 -mx-4 mb-8 border-b bg-background/90 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="جستجو: پزشک چشم، پرستار، کارفرما، آسانسور، D&O…"
              className="ps-9"
              aria-label="جستجوی نوع بیمه مسئولیت"
              type="search"
            />
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="فیلتر دسته">
            <Button
              size="sm"
              variant={active === "all" ? "default" : "outline"}
              onClick={() => setActive("all")}
            >
              همه ({products.length})
            </Button>
            {CATEGORY_ORDER.map((key) => (
              <Button
                key={key}
                size="sm"
                variant={active === key ? "default" : "outline"}
                onClick={() => setActive(key)}
              >
                {categoryLabels[key]}
                <span className="ms-1 opacity-70">({products.filter((p) => p.category === key).length})</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      {grouped.length === 0 ? (
        <p className="rounded-2xl border bg-card p-10 text-center text-sm text-muted-foreground">
          نتیجه‌ای یافت نشد. عبارت دیگری جستجو کنید یا همه دسته‌ها را ببینید.
        </p>
      ) : (
        grouped.map((g) => (
          <section key={g.key} className="mb-10 scroll-mt-32" id={g.key} aria-labelledby={`h-${g.key}`}>
            <h2 id={`h-${g.key}`} className="mb-4 text-lg font-extrabold sm:text-xl">
              {g.label} <span className="text-sm font-medium text-muted-foreground">({g.items.length} محصول)</span>
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {g.items.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
