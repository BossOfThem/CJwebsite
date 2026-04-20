import { BUSINESS } from "@/lib/config";
import { SectionNav } from "@/components/nav/SectionNav";

const items = [
  { title: "Licensed FL GC", body: `${BUSINESS.credentials.licenseNumber}. Proof on request.` },
  { title: "Insured crew", body: "General liability + workers' comp on every job." },
  { title: "On-time or you don't pay", body: "If we run late, you hear it from us first." },
  { title: "One point of contact", body: "You call the owner. Not a dispatcher." },
  { title: "Clean-up before we leave", body: "Broom swept, debris hauled, done." },
  { title: "1-year workmanship", body: "Something's off? We come back and fix it." },
];

export function Trust() {
  return (
    <section
      id="why"
      className="relative bg-wood text-[var(--bone)] py-24 md:py-32 scroll-mt-20"
      aria-labelledby="trust-heading"
    >
      <div aria-hidden className="absolute inset-0 bg-grid-light opacity-40 pointer-events-none" />
      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <p className="eyebrow">02 &nbsp;/ &nbsp;Standards</p>
            <h2
              id="trust-heading"
              className="font-display mt-4 text-[48px] md:text-[84px] leading-[0.9] text-[var(--bone)]"
            >
              Licensed. Bonded.
              <br />
              <span className="text-[var(--amber)]">Still picks up the phone.</span>
            </h2>
          </div>
          <p className="md:max-w-xs text-[15px] text-[var(--bone)]/85 leading-relaxed">
            The boring promises a contractor is supposed to keep. We keep them.
          </p>
        </div>

        <ul className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {items.map((it, i) => (
            <li key={it.title} className="border-t border-[var(--bone)]/25 pt-5">
              <p className="font-mono text-[12px] font-bold tabular-nums tracking-[0.22em] text-[var(--amber)]">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-display text-[26px] md:text-[30px] leading-tight text-[var(--bone)]">
                {it.title}
              </h3>
              <p className="mt-2 text-[15px] text-[var(--bone)]/85 leading-relaxed">
                {it.body}
              </p>
            </li>
          ))}
        </ul>

        <SectionNav
          surface="dark"
          prev={{ href: "#services", label: "Services" }}
          next={{ href: "#quote", label: "Get a quote" }}
        />
      </div>
    </section>
  );
}
