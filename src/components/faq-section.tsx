"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqSection({
  faqs,
  title = "سوالات متداول",
}: {
  faqs: { question: string; answer: string }[];
  title?: string;
}) {
  if (!faqs.length) return null;
  return (
    <section aria-labelledby="faq-heading">
      {title ? (
        <h2 id="faq-heading" className="mb-4 text-xl font-extrabold sm:text-2xl">
          {title}
        </h2>
      ) : null}
      <Accordion type="single" collapsible className="w-full space-y-3">
        {faqs.map((f, i) => (
          <AccordionItem
            key={i}
            value={`faq-${i}`}
            className="rounded-xl border bg-card px-4 shadow-sm last:border-b"
          >
            <AccordionTrigger className="text-start text-[15px] font-bold hover:no-underline [&>svg]:shrink-0">
              {f.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm leading-8 text-muted-foreground">
              {f.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
