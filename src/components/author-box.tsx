import { BadgeCheck, GraduationCap } from "lucide-react";
import { faDate } from "@/lib/format";

export function AuthorBox({
  name,
  role,
  bio,
  reviewDate,
}: {
  name: string;
  role: string;
  bio?: string;
  reviewDate: string;
}) {
  return (
    <aside
      aria-label="نویسنده و بازبین محتوا"
      className="rounded-2xl border bg-card p-5"
    >
      <div className="flex items-start gap-4">
        <span className="grid size-12 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
          <GraduationCap className="size-6" aria-hidden="true" />
        </span>
        <div className="text-sm">
          <p className="font-bold">{name}</p>
          <p className="text-xs text-muted-foreground">{role}</p>
          {bio ? <p className="mt-2 leading-7 text-muted-foreground">{bio}</p> : null}
          <p className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-primary">
            <BadgeCheck className="size-4" aria-hidden="true" />
            آخرین بازبینی تخصصی: {faDate(reviewDate)}
          </p>
        </div>
      </div>
    </aside>
  );
}
