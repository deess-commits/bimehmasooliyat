import type { Metadata } from "next";
import Link from "next/link";
import { Scale } from "lucide-react";
import {
  EnAnswerBlock,
  EnBreadcrumbs,
  EnSectionHeading,
} from "@/components/en/en-blocks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CtaBanner } from "@/components/cta-banner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DIYEH_TABLE } from "@/lib/diyeh";
import { JsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: "Diyeh (Blood Money) in Iran 1402–1404 | English Table" },
  description:
    "English table of diyeh (blood money) in Iran for 1402–1404: standard and sacred-month amounts in tomans, plus how diyeh shapes your liability policy limit.",
  alternates: {
    canonical: "/en/dih",
    languages: {
      en: "/en/dih",
      "fa-IR": "/dih",
      "x-default": "/dih",
    },
  },
  openGraph: {
    title: "Diyeh (Blood Money) in Iran 1402–1404 | English Table",
    description:
      "English table of diyeh (blood money) in Iran for 1402–1404: standard and sacred-month amounts in tomans, plus how diyeh shapes your liability policy limit.",
    url: "/en/dih",
    type: "article",
    locale: "en_US",
  },
};

// ── Persian digits → Latin digits for the English table ────────────
// Presentation only: values come verbatim from DIYEH_TABLE (single
// source of truth in src/lib/diyeh.ts) and are never re-rounded.
const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

function enDigits(value: string): string {
  let out = "";
  for (const ch of value) {
    const i = FA_DIGITS.indexOf(ch);
    out += i >= 0 ? String(i) : ch;
  }
  return out.replace(/٬/g, ",");
}

const EN_ANSWER =
  "Diyeh is the legally set compensation for bodily injury or death, defined in the diyat chapter of the Islamic Penal Code. Amounts are revised annually by the Judiciary and announced through the official gazette. A liability policy limit is benchmarked against the full diyeh of the year of occurrence, and the sacred-month figure is higher.";

export default function EnDiyehPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Dataset — mirrors the Persian /dih Dataset with English fields */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Dataset",
          name: "Full diyeh (blood money) table of Iran, 1402–1404",
          description:
            "Full diyeh amounts in tomans for standard and sacred months of 1402–1404, compiled from the official annual Judiciary circulars; figures must be checked against the circular of the year of occurrence before any practical use.",
          url: `${siteConfig.url}/en/dih`,
          creator: { "@id": `${siteConfig.url}/#organization` },
          isAccessibleForFree: true,
          inLanguage: "en",
          dateModified: "2026-10-25",
          conditionsOfAccess:
            "Figures are indicative and must be verified against the latest official Judiciary circular for the year of occurrence.",
        }}
      />

      <EnBreadcrumbs items={[{ name: "Diyeh Reference (EN)", href: "/en/dih" }]} />

      <header className="mt-6 max-w-3xl">
        <h1 className="text-2xl font-extrabold leading-snug sm:text-3xl">
          Diyeh (Blood Money) in Iran — Full Table 1402–1404 and Its Effect on Liability Limits
        </h1>
      </header>

      <div className="mt-6 max-w-3xl">
        <EnAnswerBlock text={EN_ANSWER} />
        <p className="mt-3 text-xs leading-6 text-muted-foreground">
          Last review of this table: <strong className="text-foreground">3 Aban 1405 (25 October 2026)</strong> — amounts
          are updated within one month at most once a new official circular is issued.
        </p>
      </div>

      {/* Table */}
      <section aria-labelledby="en-dih-table-h" className="mt-10">
        <h2 id="en-dih-table-h" className="sr-only">
          Full diyeh table, 1402–1404
        </h2>
        <EnSectionHeading icon={Scale} title="Full diyeh — 1402 to 1404 (toman)" />
        <div className="max-w-2xl overflow-hidden rounded-2xl border">
          <Table>
            <TableHeader>
              <TableRow className="bg-accent/60">
                <TableHead className="text-start">Year</TableHead>
                <TableHead className="text-start">Full diyeh (standard months)</TableHead>
                <TableHead className="text-start">Full diyeh (sacred months)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {DIYEH_TABLE.map((r) => (
                <TableRow key={r.year} className={r.year === "۱۴۰۴" ? "bg-primary/5 font-bold" : undefined}>
                  <TableCell>{enDigits(r.year)}</TableCell>
                  <TableCell>{enDigits(r.standard)} toman</TableCell>
                  <TableCell>{enDigits(r.sacred)} toman</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="mt-3 max-w-2xl text-xs leading-6 text-muted-foreground">
          The sacred months are Muharram, Rajab, Dhu al-Qa&apos;dah and Dhu al-Hijjah.
        </p>
        <p className="mt-3 max-w-2xl text-xs leading-6 text-muted-foreground">
          Amounts are in tomans and compiled from the most recent official circulars announced; the annual figure changes
          with the circular of the Head of the Judiciary. The amounts of a new Iranian year apply only after the official
          gazette announcement — until then, the previous year&apos;s table remains the operative benchmark, and before any
          practical calculation the circular of the year in which the loss occurred governs. The Persian page{" "}
          <Link href="/dih" className="font-semibold text-primary hover:underline">
            /dih
          </Link>{" "}
          is the authoritative version of this reference.
        </p>
      </section>

      {/* Context: diyeh × liability limit */}
      <section aria-labelledby="en-dih-context-h" className="mt-12 max-w-3xl">
        <h2 id="en-dih-context-h" className="text-xl font-extrabold sm:text-2xl">
          How diyeh interacts with your liability cover
        </h2>
        <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground">
          <p>
            The limit of liability is the maximum the insurer pays for the losses the policy covers. Because the heaviest
            realistic bodily-injury award is the full diyeh for death, the accepted starting point for choosing a limit is
            the full diyeh of the year of occurrence. A limit below the full diyeh leaves the shortfall on the insured,
            whom the injured party can pursue directly.
          </p>
          <p>
            The same benchmark applies with force to employers and the professions: employer liability, medical
            professional liability and public liability all respond to bodily-injury awards measured against the diyat
            tables. Several people injured in one event each carry their own diyeh, so a low limit can be exhausted
            quickly.
          </p>
          <p>
            To size the limit against your premium,{" "}
            <Link href="/en/price" className="font-semibold text-primary hover:underline">
              read how pricing works (/en/price)
            </Link>
            , and to act correctly after a bodily-injury incident,{" "}
            <Link href="/en/claims" className="font-semibold text-primary hover:underline">
              follow the claim process (/en/claims)
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Persian twin */}
      <section className="mt-10 max-w-3xl">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Persian twin page (authoritative)</CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-7 text-muted-foreground">
            The authoritative Persian edition of this table, with the full legal notes for Iranian readers:{" "}
            <Link href="/dih" className="font-semibold text-primary hover:underline">
              جدول دیه ۱۴۰۴ (صفحه فارسی)
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
