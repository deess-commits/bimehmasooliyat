import { toFaDigits } from "@/lib/format";

export function NumberedSteps({
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
    <ol className="relative space-y-4 border-s-2 ps-5 sm:ps-6" aria-label="مراحل">
      {steps.map((s, i) => (
        <li key={i} className="relative rounded-xl bg-card p-4 shadow-sm border">
          <span
            className={`absolute -start-[34px] sm:-start-[38px] top-4 grid size-7 place-items-center rounded-full text-xs font-extrabold shadow ${accent}`}
            aria-hidden="true"
          >
            {toFaDigits(i + 1)}
          </span>
          <h3 className="font-bold text-[15px]">{s.title}</h3>
          <p className="mt-1 text-sm leading-7 text-muted-foreground">{s.description}</p>
        </li>
      ))}
    </ol>
  );
}
