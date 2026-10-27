import { Quote } from "lucide-react";

/**
 * Answer Block — پاسخ مستقل ۴۰–۶۰ کلمه‌ای برای استخراج و استناد AI.
 * باید فوراً زیر H1/H2 قرار گیرد و بدون بقیه صفحه معنا داشته باشد.
 */
export function AnswerBlock({ text, title }: { text: string; title?: string }) {
  return (
    <section
      aria-label={title ?? "پاسخ کوتاه"}
      className="relative rounded-2xl border-2 border-primary/25 bg-accent/60 p-5 sm:p-6"
    >
      <p className="mb-2 flex items-center gap-2 text-xs font-bold tracking-wide text-primary">
        <Quote className="size-4" aria-hidden="true" />
        پاسخ کوتاه
      </p>
      <p className="text-[15px] font-medium leading-8 text-foreground sm:text-base">{text}</p>
    </section>
  );
}
