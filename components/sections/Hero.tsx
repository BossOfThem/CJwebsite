import Link from "next/link";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import { BUSINESS, IMAGES, buildWhatsAppLink, prefillForService } from "@/lib/config";

export function Hero() {
  return (
    <section
      id="top"
      data-surface="dark"
      className="relative isolate bg-[var(--shadow-bg)] text-[var(--shadow-ink)] scroll-mt-20 paper-grain-dark"
      aria-labelledby="hero-heading"
    >
      {/* Top work-order strip */}
      <div className="relative z-10 border-b border-[var(--bone)]/15 bg-[rgba(20,17,13,0.55)]">
        <div className="mx-auto max-w-6xl px-6 md:px-10 flex items-center justify-between gap-6 py-2.5 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.24em] text-[var(--bone)]/70">
          <span className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-[var(--amber-on-dark)]" aria-hidden />Work order {new Date().getFullYear()}-{String(new Date().getMonth()+1).padStart(2,"0")}</span>
          <span className="hidden sm:inline">{BUSINESS.credentials.licenseNumber}</span>
          <span className="hidden md:inline">{BUSINESS.hours}</span>
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl w-full px-6 md:px-10 py-14 md:py-20 grid gap-10 md:gap-14 md:grid-cols-[1.15fr_0.85fr] md:items-center">
        {/* LEFT: type-forward content, readable on first paint */}
        <div>
          <p className="eyebrow rise flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-[var(--amber-on-dark)]" aria-hidden />
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

          <p className="mt-6 max-w-xl text-[16px] md:text-[18px] text-[var(--shadow-ink-soft)] leading-[1.55] rise-3">
            Home repair, remodels, tile, pressure washing, doors — from one licensed crew in
            {" "}{BUSINESS.address.city} and the rest of Broward. We answer the phone, show up when we say we
            will, and clean up before we leave.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 rise-3">
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

          <dl className="mt-12 grid grid-cols-3 gap-6 max-w-lg border-t border-[var(--shadow-line)] pt-5 rise-4">
            <Stat k={`${BUSINESS.yearsInBusiness}+`} v="Years on the job" />
            <Stat k="< 1 hr" v="Reply time, business hrs" />
            <Stat k="500+" v="Jobs done in Broward" />
          </dl>
        </div>

        {/* RIGHT: contained image panel, not a full-bleed blur */}
        <div className="relative aspect-[4/5] md:aspect-[3/4] rounded-sm overflow-hidden border border-[var(--bone)]/15 shadow-lg">
          <div aria-hidden className="absolute inset-0 duotone-ink">
            <img
              src={IMAGES.hero}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-[rgba(20,17,13,0.55)] via-transparent to-[rgba(20,17,13,0.15)]"
          />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--bone)]/85">
            <span className="inline-flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[var(--amber-on-dark)]" aria-hidden />
              Recent work
            </span>
            <span className="hidden sm:inline">Miramar · Broward</span>
          </div>
        </div>
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
