import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, ExternalLink, Gavel } from "lucide-react";
import {
  EnAnswerBlock,
  EnBreadcrumbs,
  EnLegalDisclaimer,
  EnNumberedSteps,
  EnSectionHeading,
} from "@/components/en/en-blocks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CtaBanner } from "@/components/cta-banner";
import { howToJsonLd, JsonLd } from "@/lib/seo";

export const revalidate = 3600;
export const dynamicParams = false;

// ── English specialized claim guides — adapted from the authoritative
// Persian seed data (prisma/seed-data/claim-guides.ts). Rules: answer
// block 40-60 words; every step description 25-45 words; deadlines
// follow the Persian guides only (Insurance Act 1936 Art. 30 /
// five-working-day convention where the Persian text uses it; Labor
// Law Arts. 91 & 95; medical commissions under Penal Code Art. 86;
// Consumer Protection Act Art. 14). No invented amounts or statistics.

type EnGuide = {
  slug: string;
  title: string;
  h1: string;
  metaDescription: string;
  answer: string;
  deadlineNote: string;
  product: { href: string; label: string };
  steps: { title: string; description: string }[];
};

const EN_GUIDES: readonly EnGuide[] = [
  // ── medical — from /claims/medical seed ──
  {
    slug: "medical",
    title: "Medical Malpractice Claim in Iran",
    h1: "Medical Malpractice Claim in Iran",
    metaDescription:
      "How physicians in Iran handle a malpractice claim: notify the insurer fast, keep the medical file intact, follow the medical commission route and settle.",
    answer:
      "In a medical malpractice dispute in Iran, the patient's claim is examined by the medical commissions under Article 86 of the Islamic Penal Code and, where necessary, the courts. The physician or paramedical practitioner must notify the insurer immediately, keep the medical file intact and, once liability and cover are confirmed, receive indemnity subject to the policy deductible.",
    deadlineNote:
      "Under the common general conditions of liability policies the incident must be reported within a maximum of five working days from the moment you learn of it; the exact deadline written in your policy prevails. Objections to a medical commission's opinion follow the deadlines of its executive bylaw, stated in the notification of the opinion.",
    product: {
      href: "/en/liability/professional/medical-doctors",
      label: "Medical doctors' liability insurance (EN guide)",
    },
    steps: [
      {
        title: "Notify the insurer at once",
        description:
          "As soon as you learn of a patient's complaint, a complication or a death, report the event to the agency in person or by phone. Delaying the notification makes it harder for the insurer to examine whether the cover applies.",
      },
      {
        title: "Complete the claim notification form",
        description:
          "The claim form is completed and signed with a precise account of the event, the date of the medical act, the patient's details and the complaint raised. Describe only what documents can support, since the file is judged on records.",
      },
      {
        title: "Collect the medical file documents",
        description:
          "Assemble the patient's complete medical record, the operation report, medication orders, the informed-consent form and the visit history without altering any document. Corrections or additions made after a complaint can undermine the examining bodies' trust and complicate the insurance review.",
      },
      {
        title: "Referral to the medical commission (Article 86)",
        description:
          "In cases involving disability or death the matter is usually referred to the medical commissions under Article 86 of the Islamic Penal Code; their opinion fixes the percentage of fault or the erc that grounds the compensation claim.",
      },
      {
        title: "Liability assessment and diyeh calculation",
        description:
          "On the basis of the commission's opinion or a court judgment, the diyeh or erc is calculated and documented using the official table issued for the year in which the incident occurred. The figures then anchor the insurer's computation.",
      },
      {
        title: "Agreement or court judgment",
        description:
          "Compensation is fixed either by agreement between the parties within the policy framework or through a ruling by the competent authority. The signed settlement or the judgment must be sent to the insurance file so payment can proceed.",
      },
      {
        title: "Payment subject to the deductible",
        description:
          "After liability is proven and the scope of cover confirmed, the insurer settles its obligation subject to the agreed deductible and up to the limit of liability stated in the policy schedule. Payment follows the general conditions.",
      },
    ],
  },
  // ── employers — from /claims/employers seed ──
  {
    slug: "employers",
    title: "Employer Liability Claim in Iran",
    h1: "Employer Liability Claim in Iran",
    metaDescription:
      "How employers in Iran handle a work-injury claim: report at once, file the labour inspector's report, fix the disability percentage, then settle diyeh.",
    answer:
      "Employer liability insurance compensates work-related injury to staff when the employer's responsibility and the policy's cover are proven. The file moves from immediate notification and a labour inspection report through the medical commission fixing the disability percentage, to payment of diyeh and recovery-period compensation subject to the deductible, up to the policy limit.",
    deadlineNote:
      "Under the common general conditions the accident must be reported to the insurer within a maximum of five working days from the moment you learn of it; the exact deadline in your policy prevails. Fatal accidents and disabilities must also be reported to the labour inspection and social security bodies without delay, per the Labor Law regulations.",
    product: {
      href: "/en/liability/commercial/employers",
      label: "Employers liability insurance (EN guide)",
    },
    steps: [
      {
        title: "Report the accident immediately",
        description:
          "As soon as you learn of the accident, report it to the agency in person or by phone and, depending on severity, alert emergency services and the police. Preserve the scene and the condition of the equipment.",
      },
      {
        title: "Open the file and complete the form",
        description:
          "Complete the claim form with the exact time, place and type of accident and the injured worker's details, and file it with the employment record and the wage documents. These records support every later calculation.",
      },
      {
        title: "Labour inspector's report",
        description:
          "In serious accidents the labour inspector's report and the minutes of the competent bodies document how the accident happened and any safety defect in the workplace. This record is the basis for fixing the employer's responsibility.",
      },
      {
        title: "Medical commission for the disability percentage",
        description:
          "The percentage of disability, the recovery duration and the diyeh or erc are determined by referral to the medical commissions under Article 86 of the Islamic Penal Code. Their opinion is the medical backbone of the file.",
      },
      {
        title: "Liability and quantum calculation",
        description:
          "Citing the reports and the commission's opinion, the loss adjuster computes the employer's share of responsibility and the compensation for the recovery days in line with Article 95 of the Labor Law. Accurate wage records speed this up.",
      },
      {
        title: "Agreement, judgment and payment",
        description:
          "After an agreement between the parties or a ruling by the competent authority, the diyeh and compensation are paid — the employer's liability and the scope of cover proven — subject to the deductible and up to the policy limit.",
      },
    ],
  },
  // ── public — from /claims/public seed ──
  {
    slug: "public",
    title: "Public Liability Claim in Iran",
    h1: "Public Liability Claim in Iran (Third-Party Claims)",
    metaDescription:
      "How businesses in Iran handle public liability claims for visitor injuries or property damage: notify, document the scene, adjuster assessment and payment.",
    answer:
      "Public liability insurance covers bodily and property damage a third party suffers from your business activity, premises or property. A sound file starts with immediate notification, an untouched scene and photographic and witness evidence; after the adjuster's assessment and a liability decision, indemnity is paid — cover proven — subject to the deductible and the policy limit.",
    deadlineNote:
      "Under the common general conditions of liability policies the incident must be reported within a maximum of five working days from the moment you learn of it; the exact deadline in your policy prevails. If you receive a formal notice or a lawsuit from the third party, inform the insurer immediately so the defence is filed within the procedural deadline.",
    product: {
      href: "/en/liability/commercial/public-liability",
      label: "Public liability insurance (EN guide)",
    },
    steps: [
      {
        title: "Notify at once and document the scene",
        description:
          "As soon as the incident happens, inform the insurer and document the scene, the traces of damage and the condition of the premises with photos and video. Do not rearrange anything before the adjuster's visit.",
      },
      {
        title: "Record identities and minutes",
        description:
          "Write down the injured party's and witnesses' details and, where needed, arrange local minutes or a police report so the account of what happened is formally documented from the first day.",
      },
      {
        title: "Complete the claim notification form",
        description:
          "The claim form is completed and signed with a precise account of the accident, the date, the place and the figures the injured party claims. Enter claims only to the extent documents support them.",
      },
      {
        title: "Collect repair and treatment invoices",
        description:
          "Official repair invoices, purchase receipts and the injured party's medical documents are the basis for assessing the amount of loss. Unofficial papers are not accepted as the basis of payment, so keep every formal invoice.",
      },
      {
        title: "Loss adjustment and assessment",
        description:
          "The insurance adjuster visits the scene or the damaged property and evaluates the cause of the accident, the extent of the loss and whether it is compensable under the policy's conditions and exclusions.",
      },
      {
        title: "Determining liability",
        description:
          "Your share of fault in the accident and its connection with the activity covered by the policy are established; the policy's exclusions and special conditions are also examined in this stage before any payment is agreed.",
      },
      {
        title: "Agreement or judgment and payment",
        description:
          "After an agreement with the injured party or a ruling by the competent authority, the loss is paid — cover confirmed — subject to the deductible and up to the limit of liability set in the policy.",
      },
    ],
  },
  // ── elevators — from /claims/elevators seed ──
  {
    slug: "elevators",
    title: "Elevator Liability Claim in Iran",
    h1: "Elevator Liability Claim in Iran",
    metaDescription:
      "How managers and maintenance firms in Iran handle an elevator injury claim: stop the device, keep evidence, maintenance report, technical inspection, payment.",
    answer:
      "An elevator accident exposes the building manager, the operator and the maintenance company to claims at the same time. The first action is to stop the device and preserve the scene; the maintenance report and technical inspection then establish the cause, and — liability and cover proven — diyeh and compensation are paid subject to the deductible.",
    deadlineNote:
      "Under the common general conditions the accident must be reported to the insurer within a maximum of five working days from the moment you learn of it. Separately, the periodic technical inspection must be renewed before the certificate expires: operating with an expired certificate is usually outside the scope of cover, leaving liability with the operator and the maintenance company.",
    product: {
      href: "/en/liability/commercial/elevators",
      label: "Elevator liability insurance (EN guide)",
    },
    steps: [
      {
        title: "Stop the elevator and preserve the scene",
        description:
          "Take the device out of service and mark the cabin door and the accident location. Until the adjuster's visit, no part may be replaced or readjusted, since even small repairs destroy the evidence of the cause.",
      },
      {
        title: "Rescue and first aid",
        description:
          "Release the trapped passenger using trained staff of the maintenance company and transfer the injured person to a medical centre. Record the rescue operation and every measure taken so the file reflects the response.",
      },
      {
        title: "The maintenance company's report",
        description:
          "The service company must state in writing the device's condition, the date of the last service and the measures taken. This report is the key document for establishing what caused the accident.",
      },
      {
        title: "Notify the insurer and complete the form",
        description:
          "Report the accident within the policy deadline and complete the claim form with the device's specifications, the number of the valid technical inspection certificate and a written account of what happened.",
      },
      {
        title: "Technical inspection and cause",
        description:
          "The insurance adjuster or the technical inspection body separates the cause among maintenance defects, worn parts, improper operation or installation error. The finding decides which party's responsibility is engaged.",
      },
      {
        title: "Identifying the responsible party",
        description:
          "Based on the inspection result, responsibility is divided between the building manager as the occupier, the maintenance company and, where relevant, the installer, and each party's share is fixed for the claim.",
      },
      {
        title: "Agreement or judgment and payment",
        description:
          "Once the diyeh and compensation are fixed by agreement or by a ruling of the competent authority, the loss is paid — cover confirmed — subject to the deductible and up to the limit of liability.",
      },
    ],
  },
  // ── contractors — from /claims/contractors seed ──
  {
    slug: "contractors",
    title: "Contractor Liability Claim in Iran",
    h1: "Contractor Liability Claim in Iran",
    metaDescription:
      "How contractors in Iran handle a third-party claim: notify, secure the site, send contract documents, loss adjustment, liability shares and settlement.",
    answer:
      "Contractors' liability insurance in Iran reviews damage from site operations — harm to neighbouring properties, passers-by or site workers. The journey runs from immediate notification, securing the site and documentation through loss adjustment and the allocation of liability shares to payment — fault and cover proven — after the deductible and within the policy limit.",
    deadlineNote:
      "Under Article 30 of the Insurance Act of 1936 the incident must be reported to the insurer within five days from the date of knowledge; many common general conditions convert this into five working days, and your policy text prevails. The insurer, in turn, must state its position in writing within fifteen days of the file being completed.",
    product: {
      href: "/en/liability/commercial/contractors",
      label: "Contractors liability insurance (EN guide)",
    },
    steps: [
      {
        title: "Notify and secure the site",
        description:
          "As soon as you learn of the accident or a third party's claim, inform the insurer and make the site safe. Emergency rescue measures are allowed, and their reasonable costs can be claimed back.",
      },
      {
        title: "Preserve the scene and document",
        description:
          "Record the condition of the equipment, the materials and the accident scene with photos and video, and note witnesses' and the third-party owner's details. Make no change until the adjuster's visit.",
      },
      {
        title: "Complete the claim notification form",
        description:
          "The claim form is completed and signed with a precise account of the event, the date, the project section involved and the figures the injured party claims. Enter only claims the documents support.",
      },
      {
        title: "Send contract and technical documents",
        description:
          "Send the construction contract, work orders, drawings, permits and the site's safety reports so the insurer can review the scope of cover and the conditions under which the project was executed.",
      },
      {
        title: "Loss adjustment and cause",
        description:
          "Visiting the site and reviewing the documents, the adjuster assesses the cause and its link with the insured operations. In bodily-injury cases the labour inspector's report and the medical commission's opinion also govern.",
      },
      {
        title: "Allocating liability shares",
        description:
          "The shares of the main contractor, subcontractors and the employer are separated on the basis of the construction contract, the adjustment findings and the technical protection regulations, fixing each party's portion.",
      },
      {
        title: "Agreement or judgment and payment",
        description:
          "After an agreement with the injured party or a ruling by the competent authority, the loss is paid — liability and cover proven — after deducting the deductible and up to the limit of the policy.",
      },
    ],
  },
  // ── product-liability — from /claims/product-liability seed ──
  {
    slug: "product-liability",
    title: "Product Liability Claim in Iran",
    h1: "Product Liability Claim in Iran",
    metaDescription:
      "How manufacturers in Iran handle a defective-product claim: stop the batch, notify the insurer, send quality records, expert defect testing, then settle.",
    answer:
      "Product liability insurance compensates bodily and property damage a consumer suffers from a manufacturing defect, an incomplete instruction or a production shortfall, once liability and cover are proven. The file runs from stopping the affected batch and notifying the insurer through expert defect testing to settlement across the production and distribution chain.",
    deadlineNote:
      "Under Article 30 of the Insurance Act of 1936 the event must be reported to the insurer within five days from the date of knowledge; the exact deadline in your policy's general conditions prevails. The insurer must state its position in writing within fifteen days of the file being completed, counting from receipt of the last document.",
    product: {
      href: "/en/liability/commercial/product-liability",
      label: "Product liability insurance (EN guide)",
    },
    steps: [
      {
        title: "Stop the affected batch and log the event",
        description:
          "Once damage or a consumer complaint becomes known, stop distributing the affected batch and record the batch number, the production date and the event in writing. Keep a sample of the product safe.",
      },
      {
        title: "Notify the insurer immediately",
        description:
          "Report the event to the insurer within the policy deadline. Late notification makes it harder to examine whether the cover applies and to defend the file, so treat this as the first administrative step.",
      },
      {
        title: "Complete the claim notification form",
        description:
          "The claim form is completed and signed with a precise account of the injury, the product and batch details, the consumer's details and the amounts claimed. Enter only claims the documents support.",
      },
      {
        title: "Send quality-control and technical records",
        description:
          "Send the quality-control history, the batch test results, the usage instructions and the product's technical specifications. Transparent production documentation is the backbone of the defence in a product file.",
      },
      {
        title: "Defect testing and sample examination",
        description:
          "The insurance adjuster or an official expert examines the sample and matches the batch number to trace the defect's origin among manufacturing, storage, transport or improper use. The finding grounds liability.",
      },
      {
        title: "Responsibility across the supply chain",
        description:
          "Based on the expert's finding, the shares of the manufacturer, the distributor or seller and the consumer's own improper use are determined, and the scope of each party's insurance policy is identified.",
      },
      {
        title: "Agreement or judgment and payment",
        description:
          "After an agreement with the consumer or a ruling by the competent authority, the loss is paid — liability and cover proven — after deducting the deductible and up to the limit of the policy.",
      },
    ],
  },
] as const;

export function generateStaticParams() {
  return EN_GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = EN_GUIDES.find((g) => g.slug === slug);
  if (!guide) return {};
  return {
    title: { absolute: `${guide.title} | English Guide` },
    description: guide.metaDescription,
    alternates: {
      canonical: `/en/claims/${guide.slug}`,
      languages: {
        en: `/en/claims/${guide.slug}`,
        "fa-IR": `/claims/${guide.slug}`,
        "x-default": `/claims/${guide.slug}`,
      },
    },
    openGraph: {
      title: `${guide.title} | English Guide`,
      description: guide.metaDescription,
      url: `/en/claims/${guide.slug}`,
      type: "article",
      locale: "en_US",
    },
  };
}

export default async function EnClaimGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = EN_GUIDES.find((g) => g.slug === slug);
  if (!guide) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* HowTo mirrors the visible steps one-to-one */}
      <JsonLd
        data={howToJsonLd({
          name: `${guide.title} — step by step`,
          description: guide.answer,
          steps: guide.steps,
          url: `/en/claims/${guide.slug}`,
        })}
      />

      <EnBreadcrumbs items={[{ name: `${guide.title} (EN)`, href: `/en/claims/${guide.slug}` }]} />

      <header className="mt-6 max-w-3xl">
        <h1 className="text-2xl font-extrabold leading-snug sm:text-3xl">{guide.h1}</h1>
        <p className="mt-2 text-xs leading-6 text-muted-foreground">
          English rendering of the authoritative Persian claim guide for orientation.
        </p>
      </header>

      <div className="mt-6 max-w-3xl">
        <EnAnswerBlock text={guide.answer} />
      </div>

      {/* Steps */}
      <section aria-labelledby="en-guide-steps" className="mt-10 max-w-3xl">
        <h2 id="en-guide-steps" className="sr-only">
          Claim steps
        </h2>
        <EnSectionHeading title={`Claim steps — ${guide.title.toLowerCase()}`} icon={Gavel} />
        <EnNumberedSteps steps={guide.steps} variant="claim" />
        <p className="mt-4 rounded-xl border bg-secondary/40 p-4 text-[13px] leading-7 text-muted-foreground">
          {guide.deadlineNote}
        </p>
      </section>

      {/* Persian authority card + next links */}
      <section aria-labelledby="en-guide-next" className="mt-12 max-w-3xl">
        <h2 id="en-guide-next" className="sr-only">
          Authoritative Persian guide and related pages
        </h2>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm">
              <BookOpen className="size-4 text-primary" aria-hidden="true" />
              Persian authority &amp; related guides
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-7">
            <p className="text-muted-foreground">
              The complete and authoritative edition of this guide — deadlines, documents, tips and
              case FAQs — is published in Persian:
            </p>
            <Link
              href={`/claims/${guide.slug}`}
              className="inline-flex items-center gap-1.5 font-bold text-primary hover:underline"
            >
              Full Persian claim guide (authoritative)
              <ExternalLink className="size-3.5" aria-hidden="true" />
            </Link>
            <div className="flex flex-wrap gap-2.5 border-t pt-3">
              <Link
                href="/en/claims"
                className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3.5 py-2 text-xs font-semibold transition-colors hover:border-primary/40 hover:text-primary"
              >
                All liability claim steps (EN hub)
              </Link>
              <Link
                href={guide.product.href}
                className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3.5 py-2 text-xs font-semibold transition-colors hover:border-primary/40 hover:text-primary"
              >
                {guide.product.label}
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* YMYL note */}
      <section className="mt-12 max-w-3xl">
        <EnLegalDisclaimer text="This English page condenses the Persian claim guide for that specialization and follows the same deadlines and legal anchors. The Persian edition is the authoritative text, and in any dispute the official Persian statutory and policy wording prevails. It is informational content, not legal or insurance advice." />
      </section>

      <div className="mt-10 max-w-3xl">
        <CtaBanner
          title="Need to notify a claim or review your coverage?"
          text="English-speaking visitors can email us and a consultant will respond in English, usually within one business day. The claim form and quotation form are in Persian."
        />
      </div>
    </div>
  );
}
