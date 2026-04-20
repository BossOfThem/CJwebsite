import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SERVICES, IMAGES, type ServiceKey } from "@/lib/config";
import { SectionNav } from "@/components/nav/SectionNav";

export function Services() {
  return (
    <section
      id="services"
      className="relative bg-[var(--paper)] py-24 md:py-36 scroll-mt-20"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <p className="eyebrow">01 &nbsp;/ &nbsp;Trades</p>
            <h2
              id="services-heading"
              className="font-display mt-4 text-display-xl leading-[0.9] text-[var(--ink)]"
            >
              One crew.
              <br />
              <span className="text-[var(--ink-soft)]">Most of the</span>
              <br />
              jobs you've got.
            </h2>
          </div>
          <p className="md:max-w-sm text-[15px] text-[var(--ink-soft)] leading-relaxed">
            Seven trades, one licensed team, one number to call. Pick a service to open a quote —
            not sure? Choose <em>Something else</em> and we'll figure it out on the phone.
          </p>
        </div>

        <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {SERVICES.map((s, i) => (
            <li key={s.key}>
              <Link
                href="#quote"
                data-service={s.key}
                className="group block"
                aria-label={`Get a quote for ${s.title}`}
              >
                <div className="relative overflow-hidden rounded-sm border border-[var(--line)] bg-[var(--ink)] aspect-[4/5]">
                  <img
                    src={IMAGES.services[s.key as ServiceKey]}
                    alt=""
                    aria-hidden
                    className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-[rgba(20,17,13,0.85)] via-[rgba(20,17,13,0.25)] to-transparent"
                  />
                  <span className="absolute top-4 left-4 font-mono text-[11px] tracking-[0.18em] uppercase text-[var(--bone)]/80">
                    {String(i + 1).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}
                  </span>
                  <span className="absolute top-4 right-4 inline-flex items-center justify-center size-9 rounded-full bg-[var(--amber)] text-[var(--ink)] opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="size-4" aria-hidden />
                  </span>
                  <div className="absolute bottom-0 inset-x-0 p-5">
                    <h3 className="font-display text-[28px] md:text-[34px] leading-[0.95] text-[var(--bone)]">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-[13px] text-[var(--bone)]/75 max-w-xs leading-snug">
                      {s.blurb}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-baseline gap-3 text-[13px] text-[var(--ink-soft)]">
                  <span className="font-mono tracking-[0.16em] uppercase text-[var(--ink-mute)]">Includes</span>
                  <span>{s.bullets.slice(0, 3).join(" · ")}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <SectionNav
          prev={{ href: "#top", label: "Home" }}
          next={{ href: "#why", label: "Why hire us" }}
        />
      </div>
    </section>
  );
}
