import { QuoteWizard } from "@/components/contact/QuoteWizard";
import { ContactMethods } from "@/components/contact/ContactMethods";

export function Quote() {
  return (
    <section
      id="quote"
      data-surface="dark"
      className="relative bg-concrete text-[var(--bone)] py-24 md:py-36 scroll-mt-20 paper-grain-dark"
      aria-labelledby="quote-heading"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10 grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <div>
          <div className="inline-flex items-center gap-3 mb-6 font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--bone)]/70 border-t-2 border-[var(--amber-on-dark)] pt-3">
            <span>Est. # Q-{new Date().getFullYear()}</span>
            <span className="text-[var(--bone)]/30">|</span>
            <span>No charge</span>
          </div>
          <p className="eyebrow">03 &nbsp;/ &nbsp;Get a quote</p>
          <h2
            id="quote-heading"
            className="font-display mt-4 text-display-xl leading-[0.9] text-[var(--bone)]"
          >
            Tell us what's broke.
            <br />
            <span className="text-[var(--amber-on-dark)]">We'll tell you what it costs.</span>
          </h2>
          <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--amber-on-dark)]">
            {/* TODO: Carlos to approve storm-season copy */}
            Storm season ready — free insurance inspection
          </p>
          <p className="mt-6 text-[16px] text-[var(--bone)]/90 max-w-md leading-relaxed">
            Prefer not to type? Pick the fastest way to reach us. A real person picks up — within the hour, business hours.
          </p>
          <div className="mt-10">
            <ContactMethods variant="stack" surface="dark" />
          </div>
          <div className="mt-12 pt-6 border-t border-[var(--bone)]/25">
            <p className="font-display text-[28px] leading-tight text-[var(--bone)]">
              No pressure. No upsells.
            </p>
            <p className="mt-2 text-[15px] text-[var(--bone)]/85 max-w-sm leading-relaxed">
              Quotes are free and written. Outside our wheelhouse? We'll tell you straight.
            </p>
          </div>
        </div>

        <div>
          <QuoteWizard />
        </div>
      </div>
    </section>
  );
}
