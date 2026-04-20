import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { BUSINESS } from "@/lib/config";

export function Consult() {
  return (
    <section
      id="start"
      className="relative bg-[var(--paper)] py-20 md:py-28 scroll-mt-20 border-b border-[var(--line)]"
      aria-labelledby="consult-heading"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-end">
          <div>
            <p className="eyebrow">Start here</p>
            <h2
              id="consult-heading"
              className="font-display mt-4 text-display-xl leading-[0.9] text-[var(--ink)]"
            >
              Start with the problem.
              <br />
              <span className="text-[var(--ink-soft)]">Not the trade.</span>
            </h2>
            <p className="mt-6 max-w-xl text-[16px] md:text-[17px] text-[var(--ink-soft)] leading-relaxed">
              Home issues don&apos;t come labeled. Describe what&apos;s going on &mdash; a leak, a crack, a door that won&apos;t latch &mdash; and we&apos;ll tell you whether it&apos;s ours to fix, or point you to the right specialist. Straight answers, no sales pitch.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 md:justify-end">
            <Link href="#quote" className="btn btn-primary">
              Describe the problem
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              href={`tel:${BUSINESS.phone.raw}`}
              className="btn btn-ghost"
              aria-label={`Call ${BUSINESS.name}`}
            >
              <Phone className="size-4" aria-hidden />
              Call {BUSINESS.phone.display}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
