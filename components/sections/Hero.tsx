import Link from "next/link";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import { BUSINESS, buildWhatsAppLink, prefillForService } from "@/lib/config";

type LogRow = { id: string; type: string; where: string; status: string };

const recentJobs: LogRow[] = [
  { id: "WO-0412", type: "Door realignment + weatherstrip", where: "Pembroke Pines", status: "Closed" },
  { id: "WO-0411", type: "Water-damaged drywall repair",    where: "Hollywood",       status: "Closed" },
  { id: "WO-0410", type: "Tile re-grout, guest bath",       where: "Miramar",         status: "Closed" },
  { id: "WO-0409", type: "Driveway pressure wash",          where: "Davie",           status: "Closed" },
];

export function Hero() {
  return (
    <section
      id="top"
      data-surface="dark"
      className="relative isolate bg-[var(--shadow-bg)] text-[var(--shadow-ink)] scroll-mt-20 paper-grain-dark overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Subtle amber glow for depth, no photo */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(224,160,51,0.18),transparent_60%)]"
      />

      {/* Top work-order strip */}
      <div className="relative z-10 border-b border-[var(--bone)]/15 bg-[rgba(20,17,13,0.55)]">
        <div className="mx-auto max-w-6xl px-6 md:px-10 flex items-center justify-between gap-6 py-2.5 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.24em] text-[var(--bone)]/70">
          <span className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-[var(--amber-on-dark)]" aria-hidden />Work order {new Date().getFullYear()}-{String(new Date().getMonth()+1).padStart(2,"0")}</span>
          <span className="hidden sm:inline">{BUSINESS.credentials.licenseNumber}</span>
          <span className="hidden md:inline">{BUSINESS.hours}</span>
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl w-full px-6 md:px-10 py-14 md:py-20 grid gap-10 md:gap-14 md:grid-cols-[1.15fr_0.85fr] md:items-center">
        {/* LEFT: headline + CTAs */}
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
            Home repair, remodels, tile, pressure washing, doors &mdash; from one licensed crew in
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

        {/* RIGHT: work-order log card (no photo) */}
        <aside
          aria-labelledby="recent-log-heading"
          className="relative rounded-sm border border-[var(--bone)]/18 bg-[rgba(20,17,13,0.55)] backdrop-blur-sm p-5 md:p-6 shadow-lg"
        >
          <header className="flex items-baseline justify-between gap-3 border-b border-[var(--shadow-line)] pb-3">
            <p id="recent-log-heading" className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--bone)]/75">
              This week&rsquo;s log
            </p>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--amber-on-dark)]">
              {recentJobs.length} closed
            </span>
          </header>

          <ul role="list" className="mt-4 divide-y divide-[var(--shadow-line)]">
            {recentJobs.map((j) => (
              <li key={j.id} className="py-3 flex items-start gap-3">
                <span className="mt-1 font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--bone)]/55 min-w-[58px]">
                  {j.id}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] md:text-[15px] text-[var(--bone)] leading-snug">
                    {j.type}
                  </p>
                  <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--bone)]/65">
                    {j.where}
                  </p>
                </div>
                <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--amber-on-dark)]/85">
                  {j.status}
                </span>
              </li>
            ))}
          </ul>

          <footer className="mt-4 pt-3 border-t border-[var(--shadow-line)] flex items-center justify-between gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--bone)]/60">
              {BUSINESS.address.city} &middot; Broward
            </span>
            <Link
              href="#work"
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--amber-on-dark)] hover:text-[var(--bone)] inline-flex items-center gap-1.5"
            >
              See recent work
              <ArrowRight className="size-3" aria-hidden />
            </Link>
          </footer>
        </aside>
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
