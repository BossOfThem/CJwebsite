import { BUSINESS, IMAGES } from "@/lib/config";
import { SectionNav } from "@/components/nav/SectionNav";

export function ServiceArea() {
  return (
    <section
      id="area"
      className="relative bg-[var(--paper)] border-t border-[var(--line)] py-24 md:py-36 scroll-mt-20"
      aria-labelledby="area-heading"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10 grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-start">
        <div>
          <p className="eyebrow">06 &nbsp;/ &nbsp;Coverage</p>
          <h2
            id="area-heading"
            className="font-display mt-4 text-[48px] md:text-[84px] leading-[0.9] text-[var(--ink)]"
          >
            {BUSINESS.address.city} and the
            <br />
            <span className="text-[var(--amber-2)]">rest of Broward.</span>
          </h2>
          <p className="mt-6 text-[15px] text-[var(--ink-soft)] max-w-md leading-relaxed">
            Based in {BUSINESS.address.city}, {BUSINESS.address.region}. If your town's not listed, ask anyway — we travel for bigger jobs.
          </p>

          <dl className="mt-12 grid grid-cols-2 gap-6 max-w-md border-t border-[var(--line)] pt-6">
            <div>
              <dt className="font-display text-[48px] md:text-[56px] leading-none text-[var(--ink)]">
                {BUSINESS.address.serviceRadiusMiles}mi
              </dt>
              <dd className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink-mute)]">
                Standard radius
              </dd>
            </div>
            <div>
              <dt className="font-display text-[48px] md:text-[56px] leading-none text-[var(--ink)]">
                {BUSINESS.serviceAreas.length}
              </dt>
              <dd className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink-mute)]">
                Towns covered
              </dd>
            </div>
          </dl>
        </div>

        <div>
          <div className="relative overflow-hidden rounded-sm border border-[var(--line)] bg-[var(--ink)] aspect-[4/3]">
            <img
              src={IMAGES.hero}
              alt="Crew on a jobsite in Broward County"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-85"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[rgba(20,17,13,0.75)] via-transparent to-transparent" />
            <span className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-widest bg-[var(--amber)]/90 text-[var(--ink)] px-2 py-1">
              Jobsite
            </span>
            <p className="absolute bottom-3 left-3 right-3 font-display text-[20px] md:text-[24px] leading-tight text-[var(--bone)]">
              Broward County &mdash; on the clock today.
            </p>
          </div>
          <ul
            className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-y border-[var(--line)] py-6"
            role="list"
          >
            {BUSINESS.serviceAreas.map((town, i) => (
              <li
                key={town}
                className="flex items-baseline gap-3 font-mono text-[13px] uppercase tracking-[0.14em] text-[var(--ink)]"
              >
                <span className="size-1.5 rounded-full bg-[var(--amber)] shrink-0" aria-hidden />
                <span className="tabular-nums text-[var(--ink-mute)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{town}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <SectionNav
          prev={{ href: "#reviews", label: "Reviews" }}
          next={{ href: "#faq", label: "FAQ" }}
        />
      </div>
    </section>
  );
}
