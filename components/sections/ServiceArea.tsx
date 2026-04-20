import { BUSINESS } from "@/lib/config";
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
            className="font-display mt-4 text-display-xl leading-[0.9] text-[var(--ink)]"
          >
            {BUSINESS.address.city} and the
            <br />
            <span className="text-[var(--amber-on-light)]">rest of Broward.</span>
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
          <div className="relative overflow-hidden rounded-sm border border-[var(--line-strong)] bg-blueprint aspect-[4/3]">
            {/* compass + coords */}
            <div aria-hidden className="absolute top-4 right-4 flex flex-col items-end gap-1 font-mono text-[10px] tracking-[0.22em] text-[var(--ink-mute)]">
              <span>N</span>
              <span className="h-10 w-[1px] bg-[var(--ink-mute)]" />
              <span>25.98&deg;N</span>
              <span>80.23&deg;W</span>
            </div>
            <span className="absolute top-4 left-4 stamp text-[var(--amber-on-light)] bg-[var(--paper)]">
              Broward &middot; Active zones
            </span>

            {/* pins */}
            <ul aria-hidden className="absolute inset-0">
              {[
                { top: "38%", left: "22%" },
                { top: "48%", left: "34%" },
                { top: "30%", left: "46%" },
                { top: "58%", left: "52%" },
                { top: "42%", left: "64%" },
                { top: "26%", left: "72%" },
                { top: "66%", left: "78%" },
                { top: "52%", left: "82%" },
              ].map((p, i) => (
                <li
                  key={i}
                  className="absolute flex items-center gap-1.5"
                  style={{ top: p.top, left: p.left }}
                >
                  <span className="relative flex size-2.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--amber-on-light)] opacity-60 animate-ping" />
                    <span className="relative inline-flex size-2.5 rounded-full bg-[var(--amber-on-light)] border border-[var(--ink)]" />
                  </span>
                </li>
              ))}
            </ul>

            {/* horizon */}
            <div aria-hidden className="absolute left-0 right-0 bottom-[30%] h-[2px] bg-[var(--ink-mute)]/30" />
            <div aria-hidden className="absolute left-0 right-0 bottom-[30%] h-[1px] bg-[var(--amber-on-light)]/40" style={{ transform: "translateY(2px)" }} />

            <p className="absolute bottom-4 left-4 right-4 font-display text-[22px] md:text-[28px] leading-[0.95] text-[var(--ink)]">
              Broward County <span className="text-[var(--amber-on-light)]">&mdash; on the clock today.</span>
            </p>
          </div>
          <ul
            className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-y border-[var(--line)] py-6"
            role="list"
          >
            {BUSINESS.serviceAreas.map((town, i) => (
              <li
                key={town.slug}
                className="flex items-baseline gap-3 font-mono text-[13px] uppercase tracking-[0.14em] text-[var(--ink)]"
              >
                <span className="size-1.5 rounded-full bg-[var(--amber-on-light)] shrink-0" aria-hidden />
                <span className="tabular-nums text-[var(--ink-mute)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <a
                  href={`/service-area/${town.slug}`}
                  className="hover:text-[var(--amber-on-light)] underline-offset-4 hover:underline"
                >
                  {town.name}
                </a>
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
