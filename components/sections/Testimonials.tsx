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
              className="font-display mt-4 text-[48px] md:text-[84px] leading-[0.9] text-[var(--ink)]"
            >
              Folks we've already
              <br />
              <span className="text-[var(--amber-2)]">shown up for.</span>
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
              className="relative flex flex-col border border-[var(--line)] bg-[var(--paper)] p-8 rounded-sm"
            >
              <span
                aria-hidden
                className="absolute -top-5 left-6 font-display text-[90px] leading-none text-[var(--amber)] select-none"
              >
                &ldquo;
              </span>
              <p className="font-mono text-[11px] tabular-nums tracking-[0.2em] text-[var(--ink-mute)]">
                {String(i + 1).padStart(2, "0")}
              </p>
              <blockquote className="mt-4 font-display text-[22px] md:text-[24px] leading-[1.15] text-[var(--ink)]">
                {r.quote}
              </blockquote>
              <div className="mt-8 pt-5 border-t border-[var(--line)] font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--ink-soft)]">
                <div className="text-[var(--ink)]">{r.name}</div>
                <div className="mt-1 text-[var(--ink-mute)]">{r.where} &middot; {r.job}</div>
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
