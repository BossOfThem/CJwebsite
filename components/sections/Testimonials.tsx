import { Star } from "lucide-react";
import { SectionNav } from "@/components/nav/SectionNav";

const REVIEWS = [
  {
    name: "J. Delgado",
    where: "Pembroke Pines",
    job: "Pressure wash + driveway",
    quote:
      "Driveway looked ten years newer by lunch. Fair price. Didn't try to upsell me on anything.",
  },
  {
    name: "S. Brown",
    where: "Miramar",
    job: "Guest bathroom remodel",
    quote:
      "Showed up every day when he said he would. Clean work. My wife is finally done sending me Pinterest links.",
  },
  {
    name: "A. Nguyen",
    where: "Hollywood",
    job: "Hurricane-impact front door",
    quote:
      "Painless. Pulled the permit, installed the door, cleaned up. I hate contractors and I'd call him again.",
  },
];

export function Testimonials() {
  return (
    <section
      id="reviews"
      className="relative bg-[var(--paper-2)] border-t border-[var(--line)] py-24 md:py-36 scroll-mt-20"
      aria-labelledby="reviews-heading"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <p className="eyebrow">05 &nbsp;/ &nbsp;Neighbors</p>
            <h2
              id="reviews-heading"
              className="font-display mt-4 text-display-xl leading-[0.9] text-[var(--ink)]"
            >
              Folks we've already
              <br />
              <span className="text-[var(--amber-on-light)]">shown up for.</span>
            </h2>
          </div>
          <p className="md:max-w-xs text-[15px] text-[var(--ink-soft)]">
            Real reviews pending from real jobs. For now, three neighbors who'd call us back.
          </p>
        </div>

        <ul className="grid gap-8 md:gap-10 md:grid-cols-3" role="list">
          {REVIEWS.map((r, i) => (
            <li
              key={r.name}
              className="relative flex flex-col border border-[var(--line-strong)] bg-[var(--paper)] p-8 rounded-sm shadow-[6px_6px_0_0_var(--line)]"
            >
              <span
                aria-hidden
                className="absolute -top-8 left-4 font-display text-[120px] leading-none text-[var(--amber-on-light)] select-none"
                style={{ fontStyle: "italic" }}
              >
                &ldquo;
              </span>
              <div className="flex items-center justify-between relative z-[1]">
                <div className="flex items-center gap-0.5" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="size-4 text-[var(--amber-on-light)] fill-current" aria-hidden />
                  ))}
                </div>
                <span className="stamp text-[var(--amber-on-light)]">
                  Review &middot; {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <blockquote className="mt-5 font-display text-[24px] md:text-[28px] leading-[1.1] text-[var(--ink)]">
                {r.quote}
              </blockquote>
              <div className="mt-8 pt-5 border-t border-[var(--line)] flex items-baseline justify-between gap-4">
                <div className="font-mono text-[11px] uppercase tracking-[0.18em]">
                  <div className="text-[var(--ink)] font-bold">{r.name}</div>
                  <div className="mt-1 text-[var(--ink-mute)]">{r.where} &middot; {r.job}</div>
                </div>
                <span className="font-display text-[32px] leading-none text-[var(--line-strong)] tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </li>
          ))}
        </ul>

        <SectionNav
          prev={{ href: "#work", label: "Recent work" }}
          next={{ href: "#area", label: "Where we work" }}
        />
      </div>
    </section>
  );
}
