import Link from "next/link";
import { ChevronLeft, Home } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { breadcrumbJsonLd, JsonLd } from "@/lib/seo";

export function Breadcrumbs({
  items,
}: {
  items: { name: string; href: string }[];
}) {
  const last = items.length - 1;
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(items)} />
      <Breadcrumb aria-label="مسیر صفحه">
        <BreadcrumbList className="text-xs sm:text-sm">
          <BreadcrumbItem>
            {last === -1 ? (
              <BreadcrumbPage>خانه</BreadcrumbPage>
            ) : (
              <BreadcrumbLink asChild>
                <Link href="/" className="flex items-center gap-1">
                  <Home className="size-3.5" aria-hidden="true" />
                  خانه
                </Link>
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
          {items.map((item, i) => (
            <span key={i} className="contents">
              <BreadcrumbSeparator>
                <ChevronLeft className="size-3.5" aria-hidden="true" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                {i === last ? (
                  <BreadcrumbPage className="max-w-[60vw] font-semibold sm:max-w-none">
                    {item.name}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={item.href}>{item.name}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </span>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
}
