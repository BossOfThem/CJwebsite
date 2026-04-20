import { IMAGES } from "@/lib/config";
import { SectionNav } from "@/components/nav/SectionNav";

export function Gallery() {
  return (
    <section id="work" className="relative bg-[var(--paper-2)] border-t border-[var(--line)] py-24 md:py-36 scroll-mt-20" aria-labelledby="gallery-heading">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <p className="eyebrow">04 &nbsp;/ &nbsp;Recent work</p>
            <h2
              id="gallery-heading"
              className="font-display mt-4 text-display-xl leading-[0.9] text-[var(--ink)]"
            >
              Receipts,
              <br />
              <span className="text-[var(--amber-on-light)]">not promises.</span>
            </h2>
          </div>
          <p className="md:max-w-xs text-[15px] text-[var(--ink-soft)]">
            Real jobs from around Miramar and Broward. Photos swap to your own by editing one file.
          </p>
        </div>

        <div className="grid gap-4 md:gap-5 grid-cols-2 md:grid-cols-4 md:grid-rows-2">
          {IMAGES.gallery.map((g, i) => (
            <figure
              key={g.src}
              className={[
                "relative overflow-hidden rounded-sm border border-[var(--line)] bg-[var(--ink)] group duotone-ink",
                i === 0 && "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto",
                i >= 1 && "aspect-[4/5]",
              ].filter(Boolean).join(" ")}
            >
              <img
                src={g.src}
                alt={g.label}
                loading={i > 1 ? "lazy" : "eager"}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
              />
              <div aria-hidden className="absolute inset-0 z-[1] bg-gradient-to-t from-[rgba(20,17,13,0.85)] via-transparent to-transparent" />
              <span className="absolute top-3 left-3 z-[2] stamp text-[var(--amber-on-dark)] bg-[rgba(20,17,13,0.65)]">
                {g.tag}
              </span>
              <figcaption className="absolute bottom-4 left-4 right-4 z-[2] font-display text-[22px] md:text-[28px] leading-[0.95] text-[var(--bone)]">
                {g.label}
              </figcaption>
              <span className="absolute bottom-4 right-4 z-[2] font-mono text-[11px] tabular-nums tracking-widest text-[var(--amber-on-dark)]">
                {String(i + 1).padStart(2, "0")} / {String(IMAGES.gallery.length).padStart(2, "0")}
              </span>
              <div aria-hidden className="absolute left-4 right-4 bottom-3 z-[2] h-[2px] bg-[var(--amber-on-dark)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </figure>
          ))}
        </div>

        <SectionNav
          prev={{ href: "#quote", label: "Get a quote" }}
          next={{ href: "#reviews", label: "Reviews" }}
        />
      </div>
    </section>
  );
}
