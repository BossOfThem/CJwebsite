import Link from "next/link";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import { BUSINESS, IMAGES, buildWhatsAppLink, prefillForService } from "@/lib/config";

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate bg-[var(--shadow-bg)] text-[var(--shadow-ink)] min-h-[92vh] flex flex-col scroll-mt-20"
      aria-labelledby="hero-heading"
    >
      {/* Full-bleed photo */}
      <img
        src={IMAGES.hero}
        alt=""
        aria-hidden
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-60"
      />
      {/* Tint: warm darken bottom, lighten top-right for depth */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-[rgba(20,17,13,0.35)] via-[rgba(20,17,13,0.55)] to-[rgba(20,17,13,0.92)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(224,160,51,0.25),transparent_55%)]"
      />

      <div className="relative flex-1 flex flex-col justify-end mx-auto max-w-6xl w-full px-6 md:px-10 pt-28 md:pt-32 pb-14 md:pb-20">
        <p className="eyebrow rise flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-[var(--amber)]" aria-hidden />
          On the clock today &nbsp;/&nbsp; {BUSINESS.address.city}, {BUSINESS.address.region}
        </p>

        <h1
          id="hero-heading"
          className="font-display mt-5 text-display-2xl leading-[0.92] md:leading-[0.88] rise-2"
        >
          Built right.
          <br />
          <span className="text-[var(--amber-on-dark)]">Built once.</span>
        </h1>

        <p className="mt-8 max-w-2xl text-[17px] md:text-[20px] text-[var(--shadow-ink-soft)] leading-[1.55] rise-3">
          Home repair, remodels, tile, pressure washing, doors — from one licensed crew in
          {" "}{BUSINESS.address.city} and the rest of Broward. We answer the phone, show up when we say we
          will, and clean up before we leave.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 rise-3">
          <Link
            href={`tel:${BUSINESS.phone.raw}`}
            className="btn btn-primary"
            aria-label={`Call ${BUSINESS.name}`}
          >
            <Phone className="size-4" aria-hidden />
            Call {BUSINESS.phone.display}
          </Link>
          <Link
            href={buildWhatsAppLink(prefillForService())}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost-light"
          >
            <MessageCircle className="size-4" aria-hidden />
            WhatsApp a photo
          </Link>
          <Link href="#quote" className="btn btn-ghost-light">
            Get a quote
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>

        <dl className="mt-16 grid grid-cols-3 gap-6 max-w-2xl border-t border-[var(--shadow-line)] pt-6 rise-4">
          <Stat k={`${BUSINESS.yearsInBusiness}+`} v="Years on the job" />
          <Stat k="< 1 hr" v="Reply time, business hrs" />
          <Stat k="500+" v="Jobs done in Broward" />
        </dl>
      </div>

      {/* torn-paper transition into the next section */}
      <div aria-hidden className="rough-top absolute -bottom-[1px] inset-x-0" />
    </section>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="font-display text-[var(--fs-6)] leading-none text-[var(--bone)]">
        {k}
      </dt>
      <dd className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--shadow-ink-soft)]">
        {v}
      </dd>
    </div>
  );
}
