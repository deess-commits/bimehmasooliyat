// ─── English Edition — shared page blocks (LTR, English labels) ────
// Server components only. Mirrors the Persian site's block pattern
// with English labels so the Persian components stay untouched.

import Link from "next/link";
import { ChevronRight, Home, Quote } from "lucide-react";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";

export function EnAnswerBlock({ text }: { text: string }) {
  return (
    <section
      aria-label="Short answer"
      className="relative rounded-2xl border-2 border-primary/25 bg-accent/60 p-5 sm:p-6"
    >
      <p className="mb-2 flex items-center gap-2 text-xs font-bold tracking-wide text-primary">
        <Quote className="size-4" aria-hidden="true" />
        Short answer
      </p>
      <p className="text-[15px] font-medium leading-7 text-foreground sm:text-base">{text}</p>
    </section>
  );
}

export function EnSectionHeading({
  title,
  icon: Icon,
}: {
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="mb-5 flex items-start gap-3">
      <h2 className="text-xl font-extrabold sm:text-2xl">{title}</h2>
      {Icon ? <Icon className="mt-1.5 size-5 shrink-0 text-primary" aria-hidden="true" /> : null}
    </div>
  );
}

export function EnBreadcrumbs({
  items,
}: {
  items: { name: string; href: string }[];
}) {
  const last = items.length - 1;
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(items)} />
      <nav aria-label="Breadcrumb" className="text-xs sm:text-sm">
        <ol className="flex flex-wrap items-center gap-1.5 text-muted-foreground">
          <li>
            <Link href="/en" className="flex items-center gap-1 hover:text-primary">
              <Home className="size-3.5" aria-hidden="true" />
              Home
            </Link>
          </li>
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-1.5">
              <ChevronRight className="size-3.5" aria-hidden="true" />
              {i === last ? (
                <span className="max-w-[60vw] font-semibold text-foreground sm:max-w-none" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-primary">
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

export function EnNumberedSteps({
  steps,
  variant = "buy",
}: {
  steps: { title: string; description: string }[];
  variant?: "buy" | "claim";
}) {
  const accent =
    variant === "buy"
      ? "bg-primary text-primary-foreground"
      : "bg-secondary text-secondary-foreground border border-border";
  return (
    <ol className="relative space-y-4 border-l-2 ps-5 sm:ps-6" aria-label="Steps">
      {steps.map((s, i) => (
        <li key={i} className="relative rounded-xl border bg-card p-4 shadow-sm">
          <span
            className={`absolute -start-[34px] sm:-start-[38px] top-4 grid size-7 place-items-center rounded-full text-xs font-extrabold shadow ${accent}`}
            aria-hidden="true"
          >
            {i + 1}
          </span>
          <h3 className="text-[15px] font-bold">{s.title}</h3>
          <p className="mt-1 text-sm leading-7 text-muted-foreground">{s.description}</p>
        </li>
      ))}
    </ol>
  );
}

export function EnReviewBox({
  reviewDate,
  bio,
}: {
  reviewDate: string;
  bio: string;
}) {
  const dateText = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(reviewDate));
  return (
    <section aria-label="Review information" className="rounded-2xl border bg-card p-5">
      <p className="text-sm font-bold">Reviewed by the Iran Liability Insurance content team</p>
      <p className="mt-1 text-sm leading-7 text-muted-foreground">{bio}</p>
      <p className="mt-2 text-xs text-muted-foreground">
        Legal review: licensed team of Agency No. 20616, Bimeh Iran — Last reviewed:{" "}
        <strong className="text-foreground">{dateText}</strong>
      </p>
    </section>
  );
}

export function EnLegalDisclaimer({ text }: { text: string }) {
  return (
    <aside
      aria-label="Legal disclaimer"
      className="rounded-2xl border border-amber-600/30 bg-amber-500/5 p-4 sm:p-5"
    >
      <p className="text-xs font-bold tracking-wide text-amber-700 dark:text-amber-400">Disclaimer</p>
      <p className="mt-1.5 text-[13px] leading-7 text-muted-foreground">{text}</p>
    </aside>
  );
}
