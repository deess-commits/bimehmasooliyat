import Link from "next/link";
import { ArrowLeft, BadgeCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { CategoryKey, SeedProduct } from "@/prisma/seed-data/types";
import { productUrl } from "@/lib/format";

const CATEGORY_LABEL: Record<CategoryKey, string> = {
  professional: "حرفه‌ای",
  commercial: "کسب‌وکار و صنعت",
  corporate: "شرکتی",
  public: "عمومی و فردی",
};

export function ProductCard({ product }: { product: SeedProduct }) {
  return (
    <Card className="group flex h-full flex-col transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="mb-2 flex flex-wrap items-center gap-1.5">
          <Badge variant="secondary" className="text-[11px]">
            {CATEGORY_LABEL[product.category]}
          </Badge>
          {product.phase === 1 ? (
            <Badge className="bg-primary/15 text-primary hover:bg-primary/20 text-[11px] border-0" variant="secondary">
              <BadgeCheck className="me-1 size-3" aria-hidden="true" />
              پرفروش
            </Badge>
          ) : null}
        </div>
        <CardTitle className="text-base leading-7 group-hover:text-primary">
          <Link href={productUrl(product.category, product.slug)}>{product.nameFa}</Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-3">
        <p className="text-sm leading-7 text-muted-foreground">{product.summaryFa}</p>
        <p className="mt-3 text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">مخاطب:</span> {product.audienceFa}
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t pt-3">
        {product.priceFromFa ? (
          <span className="text-xs font-bold text-primary">{product.priceFromFa}</span>
        ) : (
          <span className="text-xs text-muted-foreground">قیمت پس از استعلام</span>
        )}
        <Link
          href={productUrl(product.category, product.slug)}
          className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
        >
          جزئیات پوشش
          <ArrowLeft className="size-3.5" aria-hidden="true" />
        </Link>
      </CardFooter>
    </Card>
  );
}
