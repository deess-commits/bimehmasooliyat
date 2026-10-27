import type { Metadata } from "next";
import Link from "next/link";
import {
  BadgeCheck,
  BookOpenCheck,
  Building2,
  FileSearch,
  ListChecks,
  Mail,
  Phone,
  ScrollText,
  ShieldCheck,
} from "lucide-react";
import {
  EnAnswerBlock,
  EnBreadcrumbs,
  EnLegalDisclaimer,
  EnSectionHeading,
} from "@/components/en/en-blocks";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CtaBanner } from "@/components/cta-banner";
import { getAuthors } from "@/lib/data";
import { siteConfig } from "@/lib/site";
import { enDisclaimers, enFooter } from "@/lib/en/content";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: "About Us | Iran Liability Insurance — English Edition" },
  description:
    "English edition of BimehMasooliyat.ir, a licensed Bimeh Iran agency specialized in liability insurance: methodology, team, licensing and contact.",
  alternates: {
    canonical: "/en/about",
    languages: {
      en: "/en/about",
      "fa-IR": "/about",
      "x-default": "/about",
    },
  },
  openGraph: {
    title: "About Us | Iran Liability Insurance — English Edition",
    description:
      "English edition of BimehMasooliyat.ir, a licensed Bimeh Iran agency specialized in liability insurance: methodology, team, licensing and contact.",
    url: "/en/about",
    type: "article",
    locale: "en_US",
  },
};

// ── English author role lines ───────────────────────────────────────
// The Persian bios (roleFa / bio / credentials) are NOT rendered here;
// each author gets a short English role line mapped by slug.

const EN_AUTHOR_ROLES: Record<string, string> = {
  "lead-expert":
    "Senior liability insurance specialist — drafts every product guide, FAQ and city page.",
  "legal-reviewer":
    "Legal advisor and member of the Iranian bar — reviews every statutory reference before publication.",
};

const EN_AUTHOR_FALLBACK_ROLE =
  "Member of the Iran Liability Insurance content and review team.";

// English adaptation of the Persian METHODOLOGY array (src/app/about).
const EN_METHODOLOGY = [
  {
    icon: BookOpenCheck,
    title: "1. Source-based collection",
    text: "Every page is written only from the Bimeh Iran general conditions, the Civil Liability Act of 1960, the Insurance Act of 1936 and Central Insurance regulations. No source, no publication.",
  },
  {
    icon: FileSearch,
    title: "2. Answer-first writing",
    text: "Each section opens with a self-contained 40–60 word answer, so that readers and AI search engines can use it correctly without reading the rest of the page.",
  },
  {
    icon: ListChecks,
    title: "3. Dual review",
    text: "An insurance expert checks the technical accuracy of the coverages, and a legal advisor checks every statutory citation; the review date is recorded on each page.",
  },
  {
    icon: ScrollText,
    title: "4. Periodic updates",
    text: "When diyeh, regulations or general conditions change, the affected pages are updated within one month at the latest and a new review date is recorded.",
  },
];

export default async function EnAboutPage() {
  const authors = await getAuthors();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <EnBreadcrumbs items={[{ name: "About", href: "/en/about" }]} />

      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-extrabold leading-snug sm:text-3xl">
            About {siteConfig.nameEn}
          </h1>
          <Badge variant="secondary" className="font-semibold">
            English edition
          </Badge>
        </div>
      </header>

      <div className="mt-6 max-w-3xl">
        <EnAnswerBlock text="Iran Liability Insurance is the English edition of BimehMasooliyat.ir, operated by an official representative agency of Bimeh Iran (Iran Insurance Company). The agency works exclusively in liability insurance — issuance, limit advisory and claim support for professionals, businesses and individuals — and the Persian edition remains the complete, authoritative site." />
      </div>

      {/* Licensing & representation */}
      <section aria-labelledby="en-about-license" className="mt-10">
        <h2 id="en-about-license" className="sr-only">
          Licensing and representation
        </h2>
        <EnSectionHeading title="Who operates this site" />
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <span className="mb-1 grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground">
                <ShieldCheck className="size-5" aria-hidden="true" />
              </span>
              <CardTitle className="text-[15px]">Official representation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[13px] leading-7 text-muted-foreground">
                {siteConfig.nap.legalName} — {enFooter.brandLine}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <span className="mb-1 grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground">
                <BadgeCheck className="size-5" aria-hidden="true" />
              </span>
              <CardTitle className="text-[15px]">Licensing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[13px] leading-7 text-muted-foreground">
                {enFooter.license}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <span className="mb-1 grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground">
                <Building2 className="size-5" aria-hidden="true" />
              </span>
              <CardTitle className="text-[15px]">Address</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[13px] leading-7 text-muted-foreground">{enFooter.address}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Team */}
      <section className="mt-14" aria-labelledby="en-about-team">
        <h2 id="en-about-team" className="sr-only">
          Content and review team
        </h2>
        <EnSectionHeading title="Content and review team" icon={ShieldCheck} />
        <div className="grid gap-4 sm:grid-cols-2">
          {authors.map((a) => (
            <Card key={a.slug}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{a.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="flex items-start gap-2 text-[13px] leading-7 text-muted-foreground">
                  <BadgeCheck className="mt-1 size-4 shrink-0 text-primary" aria-hidden="true" />
                  {EN_AUTHOR_ROLES[a.slug] ?? EN_AUTHOR_FALLBACK_ROLE}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Methodology */}
      <section className="mt-14" aria-labelledby="en-about-method">
        <h2 id="en-about-method" className="sr-only">
          Content methodology
        </h2>
        <EnSectionHeading
          title="How every page is produced (YMYL methodology)"
          icon={BookOpenCheck}
        />
        <ol className="grid gap-4 md:grid-cols-2">
          {EN_METHODOLOGY.map((m) => (
            <li key={m.title} className="rounded-2xl border bg-card p-5">
              <span className="mb-3 grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <m.icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="font-bold">{m.title}</h3>
              <p className="mt-1.5 text-[13px] leading-7 text-muted-foreground">{m.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Single-product mission */}
      <section className="mt-14 rounded-2xl border bg-secondary/40 p-6">
        <h2 className="text-lg font-extrabold">A deliberately single-product agency</h2>
        <p className="mt-3 max-w-3xl text-sm leading-8 text-muted-foreground">
          We deliberately sell no product other than liability insurance. This focus gives us a
          deeper knowledge of liability risks, litigation and claim procedures in Iran, and lets us
          produce content that is both legally precise and genuinely useful for a purchase decision.
          If you are looking for motor, health or property cover, you will not find it here — and
          that is a conscious choice.
        </p>
      </section>

      {/* Disclaimers */}
      <section className="mt-12 max-w-3xl space-y-4" aria-label="Disclaimers">
        <EnLegalDisclaimer text={enDisclaimers.legal} />
        <p className="text-xs leading-6 text-muted-foreground">{enDisclaimers.review}</p>
      </section>

      {/* Contact */}
      <section className="mt-12" aria-labelledby="en-about-contact">
        <h2 id="en-about-contact" className="sr-only">
          Contact
        </h2>
        <EnSectionHeading title="Contact the agency" icon={Mail} />
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Mail className="size-4 text-primary" aria-hidden="true" />
                Email
              </CardTitle>
            </CardHeader>
            <CardContent>
              <a
                href={`mailto:${enFooter.email}`}
                dir="ltr"
                className="text-sm font-semibold text-primary hover:underline"
              >
                {enFooter.email}
              </a>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Phone className="size-4 text-primary" aria-hidden="true" />
                Phone
              </CardTitle>
            </CardHeader>
            <CardContent>
              <a
                href={`tel:${enFooter.phone}`}
                dir="ltr"
                className="text-sm font-semibold text-primary hover:underline"
              >
                {enFooter.phone}
              </a>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Building2 className="size-4 text-primary" aria-hidden="true" />
                Office
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-7 text-muted-foreground">{enFooter.address}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Persian twin */}
      <section className="mt-10 max-w-3xl">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Persian twin page (authoritative)</CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-7 text-muted-foreground">
            The complete Persian edition of this page:{" "}
            <Link href="/about" className="font-semibold text-primary hover:underline">
              درباره ما (صفحه فارسی)
            </Link>
          </CardContent>
        </Card>
      </section>

      <div className="mt-10">
        <CtaBanner
          title="Request an official Bimeh Iran quotation"
          text="The quotation form is in Persian — English-speaking visitors can also email us and a consultant will respond in English, usually within one business day."
        />
      </div>
    </div>
  );
}
