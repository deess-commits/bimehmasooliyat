import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Factory, ShieldCheck } from "lucide-react";
import {
  EnAnswerBlock,
  EnBreadcrumbs,
  EnLegalDisclaimer,
  EnSectionHeading,
} from "@/components/en/en-blocks";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CtaBanner } from "@/components/cta-banner";

export const revalidate = 3600;

// ── EN mini-hub: Liability Insurance by Industry in Iran ────────
// The Persian edition (/industry) is the authoritative layer; this
// page orients English readers and hands them to the Persian guides.
// No hreflang block here — the orchestrator wires hreflang centrally.
// Honest content only: no premiums, no statistics, no EN quote form.

export function generateMetadata(): Metadata {
  const title = "Liability Insurance by Industry in Iran | English Guide";
  const description =
    "Liability insurance risks in 25 Iranian industries: textiles, food, packaging, auto parts, medical equipment, bakeries, cold storage — Persian authoritative.";
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: "/en/industry",
      languages: {
        en: "/en/industry",
        "fa-IR": "/industry",
        "x-default": "/industry",
      },
    },
    openGraph: {
      title,
      description,
      url: "/en/industry",
      type: "article",
      locale: "en_US",
    },
  };
}

// EN one-line risk summaries mirror the Persian riskSummary of each
// industry card on /industry — qualitative only, no figures.
const EN_INDUSTRY_CARDS: {
  slug: string;
  nameFa: string;
  nameEn: string;
  riskEn: string;
}[] = [
  {
    slug: "textile",
    nameFa: "صنعت نساجی",
    nameEn: "Textile Industry",
    riskEn: "Flammable lint and fiber fires spreading to neighboring properties, machine injuries to workers and defective-product claims.",
  },
  {
    slug: "food",
    nameFa: "صنعت غذایی",
    nameEn: "Food Industry",
    riskEn: "Consumer claims over contaminated or defective products, production-line and warehouse accidents, cargo damage in distribution.",
  },
  {
    slug: "automotive",
    nameFa: "صنعت خودروسازی و تعمیرگاه‌ها",
    nameEn: "Automotive & Repair Shops",
    riskEn: "Defective parts and faulty repairs causing road accidents, fuel and oil fires, workshop staff injuries and damage to customer cars.",
  },
  {
    slug: "mining",
    nameFa: "صنعت معدن",
    nameEn: "Mining Industry",
    riskEn: "Pit-face and heavy-equipment accidents to workers, fire spreading from installations to neighboring lands, contractor liability disputes.",
  },
  {
    slug: "logistics",
    nameFa: "لجستیک و انبارداری",
    nameEn: "Logistics & Warehousing",
    riskEn: "Custody damage to goods in carriage and warehousing, loading and unloading accidents, third parties entering the warehouse premises.",
  },
  {
    slug: "hospitality",
    nameFa: "هتل‌داری و گردشگری",
    nameEn: "Hospitality & Tourism",
    riskEn: "Guest injuries on the premises, food-poisoning claims, kitchen and housekeeping staff accidents and events hosted in the hotel.",
  },
  {
    slug: "publishing",
    nameFa: "نشر و چاپ",
    nameEn: "Publishing & Printing",
    riskEn: "Claims over published content, press and bindery machine injuries, paper-store fire spreading to neighbors and defective printed products.",
  },
  {
    slug: "plastics-chemicals",
    nameFa: "پلاستیک و صنایع شیمیایی",
    nameEn: "Plastics & Chemical Industries",
    riskEn: "Fire and chemical release affecting neighbors, worker exposure on production lines, defective polymer products and storage hazards.",
  },
  {
    slug: "metalworking",
    nameFa: "فلزکاری و ریخته‌گری",
    nameEn: "Metalworking & Foundries",
    riskEn: "Molten-metal and press injuries to workers, furnace fire spreading beyond the site, heavy-part handling damage and defective castings.",
  },
  {
    slug: "poultry-livestock",
    nameFa: "مرغداری و دامداری",
    nameEn: "Poultry & Livestock Farming",
    riskEn: "Animal escape and attacks harming third parties, barn fires spreading to adjacent farms, staff injuries and feed or product quality claims.",
  },
  {
    slug: "detergents-hygiene",
    nameFa: "صنعت شوینده و بهداشتی",
    nameEn: "Detergent & Hygiene Products",
    riskEn: "Chemical storage fires spreading to neighboring units, worker exposure on filling and packaging lines, consumer claims over defective or irritating products.",
  },
  {
    slug: "wood-furniture",
    nameFa: "صنعت چوب و مبلمان",
    nameEn: "Wood & Furniture Workshops",
    riskEn: "Flammable sawdust fires spreading to adjacent workshops, saw and machine injuries, damage to customer goods and defective furniture claims.",
  },
  {
    slug: "confectionery",
    nameFa: "صنعت شیرینی و شکلات",
    nameEn: "Confectionery & Chocolate",
    riskEn: "Consumer claims over contaminated or allergen-labeled products, oven and production-line injuries, sugar and flour store fires spreading to neighbors.",
  },
  {
    slug: "flour-grains",
    nameFa: "صنعت آرد و غله",
    nameEn: "Flour & Grain Milling",
    riskEn: "Silo dust explosion and fire, silo and mill machinery injuries, defective flour or feed claims and cargo damage during grain carriage.",
  },
  {
    slug: "recycling",
    nameFa: "صنعت بازیافت",
    nameEn: "Recycling Facilities",
    riskEn: "Separation-line and press injuries, fires in stored recyclables spreading beyond the site, unauthorized entry to the yard and carrier damage in scrap transport.",
  },
  {
    slug: "plumbing-installations",
    nameFa: "صنعت لوله‌کشی و تأسیسات",
    nameEn: "Plumbing & Installations",
    riskEn: "Water leaks spreading to adjacent units, welding and tool accidents to workers and damage to the client's installations during projects.",
  },
  {
    slug: "elevator-manufacturing",
    nameFa: "صنعت آسانسورسازی و تجهیزات",
    nameEn: "Elevator Manufacturing & Equipment",
    riskEn: "Passenger and third-party accidents during installation and service, defects in manufactured equipment and installer falls while working at height.",
  },
  {
    slug: "office-furniture",
    nameFa: "صنعت مبلمان اداری و تجهیزات فضای کار",
    nameEn: "Office Furniture & Workspace Equipment",
    riskEn: "Injuries to users from defective furniture, woodworking and press machine accidents to workers and fire in wood and foam stores.",
  },
  {
    slug: "pharma-manufacturing",
    nameFa: "صنعت داروسازی و تولید مواد دارویی",
    nameEn: "Pharmaceutical Manufacturing",
    riskEn: "Harm to consumers from defective medicines, production-line and laboratory accidents and fire in chemical storage.",
  },
  {
    slug: "call-center-bpo",
    nameFa: "مراکز تماس و برون‌سپاری خدمات (BPO)",
    nameEn: "Call Centers & BPO",
    riskEn: "Disclosure of client customer data, system implementation errors, shift-based staff accidents and injuries to visitors on the premises.",
  },
  {
    slug: "packaging",
    nameFa: "صنعت بسته‌بندی",
    nameEn: "Packaging Industry",
    riskEn: "Glue and flammable-solvent warehouse fires spreading to neighboring units, packaging-machine injuries to workers and defective-packaging claims.",
  },
  {
    slug: "auto-parts",
    nameFa: "لوازم یدکی و قطعات خودرو",
    nameEn: "Auto Parts & Components",
    riskEn: "Defective parts triggering product-liability claims, fires in parts and oil warehouses and production-line staff accidents.",
  },
  {
    slug: "medical-equipment",
    nameFa: "تجهیزات پزشکی و آزمایشگاهی",
    nameEn: "Medical & Laboratory Equipment",
    riskEn: "Harm to users from defective devices, damage to sensitive consignments in transit and sales and service staff accidents.",
  },
  {
    slug: "bakeries",
    nameFa: "نانوایی و واحد خمیر",
    nameEn: "Bakeries & Dough Units",
    riskEn: "Oven and gas-installation fires spreading to neighbors, contamination claims over flour products and injuries to customers on the premises.",
  },
  {
    slug: "cold-storage",
    nameFa: "سردخانه و زنجیره سرد",
    nameEn: "Cold Storage & Cold Chain",
    riskEn: "Third-party goods spoiling after power cuts or equipment failure, damage in refrigerated carriage and fire spreading to adjacent properties.",
  },
];

export default function EnIndustryPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <EnBreadcrumbs items={[{ name: "Industry Liability Guides (EN)", href: "/en/industry" }]} />

      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="secondary"
            className="border border-primary/25 bg-primary/10 text-primary hover:bg-primary/10"
          >
            <Factory className="size-3.5" aria-hidden="true" />
            Industry layer
          </Badge>
        </div>
        <h1 className="mt-3 text-2xl font-extrabold leading-snug sm:text-3xl">
          Liability Insurance by Industry in Iran
        </h1>
      </header>

      <div className="mt-6 max-w-3xl">
        <EnAnswerBlock text="Every Iranian industry carries its own liability risk mix — flammable fibers in textiles, consumer claims in food, defective parts in automotive, blasting and collapse in mining, custody of goods in logistics, guest safety in hospitality, published-content claims in printing, chemical release in plastics, molten-metal hazards in foundries, animal-related liability on farms, chemical storage in detergents, sawdust fires in woodworking, allergen and contamination claims in confectionery, silo dust explosion in milling, stored-material fires in recycling, water-leak damage to neighbors in plumbing, passenger accidents in elevator manufacturing, defective-furniture claims in office furniture, defective-medicine harm in pharmaceutical plants, client-data disclosure in call centers and BPO, glue and solvent warehouse fires in packaging, defective-part product-liability claims in auto parts, device-failure harm to users in medical equipment, oven and gas-installation fires in bakeries and spoiled third-party consignments in cold storage. Each guide below maps the main risks to the matching Bimeh Iran liability covers; the Persian edition of every page is authoritative." />
      </div>

      {/* Twenty-five industry cards — links point to the authoritative Persian guides */}
      <section aria-labelledby="en-industry-list" className="mt-10">
        <h2 id="en-industry-list" className="sr-only">
          Industry guides
        </h2>
        <EnSectionHeading
          title="Twenty-five industry guides — EN summaries, Persian authoritative"
          icon={Factory}
        />
        <p className="mb-5 max-w-3xl text-sm leading-7 text-muted-foreground">
          Each card summarizes the industry&rsquo;s liability risks in English and links to the full
          Persian guide with risks, suggested coverages linked to real product pages, buying steps
          and FAQs. The Persian edition of every guide is the authoritative text.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {EN_INDUSTRY_CARDS.map((c) => (
            <Card
              key={c.slug}
              className="flex h-full flex-col py-4 transition-all hover:border-primary/40 hover:shadow-sm"
            >
              <CardHeader className="pb-1.5">
                <CardTitle className="text-sm">{c.nameEn}</CardTitle>
                <p className="text-xs text-muted-foreground" dir="rtl">
                  {c.nameFa}
                </p>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between gap-3">
                <p className="text-xs leading-6 text-muted-foreground">{c.riskEn}</p>
                <Link
                  href={`/industry/${c.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                >
                  Full guide — Persian edition (authoritative)
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Note about possible future EN guides */}
      <section aria-labelledby="en-industry-note" className="mt-12 max-w-3xl">
        <h2 id="en-industry-note" className="text-xl font-extrabold sm:text-2xl">
          Will there be full English industry guides?
        </h2>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          Possibly. Detailed English industry guides may follow this hub; until then, the Persian
          pages above are the complete and authoritative source, and this page is a faithful English
          orientation layer. For the legal wording of any cover, the Persian policy conditions and
          the Persian statutory texts always prevail.
        </p>
      </section>

      {/* Persian twin */}
      <section className="mt-10 max-w-3xl">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Persian twin page (authoritative)</CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-7 text-muted-foreground">
            The full Persian industry hub with all twenty-five guides:{" "}
            <Link href="/industry" className="font-semibold text-primary hover:underline">
              بیمه مسئولیت صنایع (صفحه فارسی)
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* YMYL note */}
      <section className="mt-12 max-w-3xl">
        <EnLegalDisclaimer text="This English page describes liability risks by industry in general terms only. It contains no premiums, statistics or legal advice. Which cover responds to which claim depends on the general conditions of each policy and Iranian law, whose authoritative texts are published in Persian. The Persian edition of this page and of every linked guide is authoritative; this English content orients the reader." />
      </section>

      {/* Trust line */}
      <section className="mt-8 max-w-3xl">
        <p className="flex items-start gap-2 rounded-xl border bg-card p-4 text-[13px] leading-6 text-muted-foreground">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
          Guides reviewed by the licensed team of Agency No. 20616, Bimeh Iran — the same team that
          issues the policies behind every linked product page.
        </p>
      </section>

      {/* EN CTA — mirrors /en/claims and /en/dih (no EN quote form exists) */}
      <div className="mt-10">
        <CtaBanner
          title="Need liability cover for your industry in Iran?"
          text="The quotation form is in Persian — English-speaking visitors can also email us and a consultant will respond in English, usually within one business day."
        />
      </div>
    </div>
  );
}
