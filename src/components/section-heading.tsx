import { Sparkles } from "lucide-react";

export function SectionHeading({
  title,
  hint,
  icon: Icon,
}: {
  title: string;
  hint?: string;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="mb-5 flex items-start gap-3">
      {Icon ? (
        <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
          <Icon className="size-5" aria-hidden="true" />
        </span>
      ) : (
        <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
          <Sparkles className="size-5" aria-hidden="true" />
        </span>
      )}
      <div>
        <h2 className="text-xl font-extrabold sm:text-2xl">{title}</h2>
        {hint ? <p className="mt-1 text-sm text-muted-foreground">{hint}</p> : null}
      </div>
    </div>
  );
}
