// ─── نظرات کاربران (تنها لایه محتوایی وابسته به دیتابیس) ────────────
// نظرات توسط کاربران ثبت می‌شوند → داده پویا است و از دیتابیس خوانده می‌شود.
// بقیه محتوای سایت از فایل‌های seed-data به‌صورت استاتیک سرو می‌شود (lib/data.ts).

import { db } from "@/lib/db";

export interface PublicReview {
  id: string;
  name: string;
  city?: string;
  productSlug?: string;
  rating: number;
  text: string;
  createdAt: Date;
}

export async function getApprovedReviews(
  productSlug?: string,
): Promise<PublicReview[]> {
  const rows = await db.review.findMany({
    where: { status: "approved", ...(productSlug ? { productSlug } : {}) },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    city: r.city ?? undefined,
    productSlug: r.productSlug ?? undefined,
    rating: r.rating,
    text: r.text,
    createdAt: r.createdAt,
  }));
}
