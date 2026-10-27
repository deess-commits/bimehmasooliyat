import { Info } from "lucide-react";

export function LegalDisclaimer() {
  return (
    <aside className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-xs leading-7 text-muted-foreground" role="note">
      <p className="flex items-start gap-2">
        <Info className="mt-0.5 size-4 shrink-0 text-amber-600" aria-hidden="true" />
        <span>
          <strong className="text-foreground">سلب مسئولیت حقوقی:</strong> این محتوا صرفاً آموزشی و اطلاع‌رسانی است،
          جایگزین شرایط عمومی و خصوصی بیمه‌نامه یا مشاوره حقوقی تخصصی نیست و هیچ وعده قطعی حقوقی ایجاد نمی‌کند. جزئیات
          پوشش همیشه منوط به بیمه‌نامه صادرشده و آیین‌نامه‌های بیمه مرکزی است.
        </span>
      </p>
    </aside>
  );
}
