import type { Metadata } from "next";
import Link from "next/link";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import { Header } from "@/components/header/Header";
import { Quote } from "@/components/sections/Quote";
import { Footer } from "@/components/sections/Footer";
import { BUSINESS, IMAGES, buildWhatsAppLink, prefillForService } from "@/lib/config";
import { ES } from "@/lib/copy.es";

export const metadata: Metadata = {
  title: `${BUSINESS.shortName} — Contratista Licenciado en ${BUSINESS.address.city}`,
  description: ES.lede,
  alternates: { canonical: "/es", languages: { "en-US": "/", "es-US": "/es" } },
};

export default function SpanishLanding() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1" lang="es">
        <section
          id="top"
          className="relative isolate bg-[var(--shadow-bg)] text-[var(--shadow-ink)] min-h-[80vh] flex flex-col scroll-mt-20"
        >
          <img
            src={IMAGES.hero}
            alt=""
            aria-hidden
            className="absolute inset-0 -z-10 h-full w-full object-cover opacity-60"
          />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-[rgba(20,17,13,0.4)] to-[rgba(20,17,13,0.92)]" />
          <div className="relative flex-1 flex flex-col justify-end mx-auto max-w-6xl w-full px-6 md:px-10 pt-28 md:pt-32 pb-14 md:pb-20">
            <p className="eyebrow flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[var(--amber-on-dark)]" aria-hidden />
              {ES.eyebrow} &nbsp;/&nbsp; {BUSINESS.address.city}, {BUSINESS.address.region}
            </p>
            <h1 className="font-display mt-5 text-display-2xl leading-[0.92]">
              {ES.h1a}
              <br />
              <span className="text-[var(--amber-on-dark)]">{ES.h1b}</span>
            </h1>
            <p className="mt-8 max-w-2xl text-[17px] md:text-[20px] text-[var(--shadow-ink-soft)] leading-[1.55]">
              {ES.lede}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Link href={`tel:${BUSINESS.phone.raw}`} className="btn btn-primary">
                <Phone className="size-4" aria-hidden />
                {ES.callCta} {BUSINESS.phone.display}
              </Link>
              <Link href={buildWhatsAppLink(prefillForService())} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light">
                <MessageCircle className="size-4" aria-hidden />
                {ES.waCta}
              </Link>
              <Link href="#quote" className="btn btn-ghost-light">
                {ES.quoteCta}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
          <div aria-hidden className="rough-top absolute -bottom-[1px] inset-x-0" />
        </section>

        <section className="bg-[var(--paper)] py-24 md:py-32 border-t border-[var(--line)]">
          <div className="mx-auto max-w-4xl px-6 md:px-10">
            <p className="eyebrow">Confianza</p>
            <h2 className="font-display text-display-xl mt-4 leading-[0.9]">
              {ES.trust.title}
            </h2>
            <p className="mt-6 text-[15px] text-[var(--ink-soft)] leading-relaxed max-w-2xl">
              {ES.trust.body}
            </p>
            <dl className="mt-12 grid gap-6 sm:grid-cols-3 border-t border-[var(--line)] pt-10">
              {ES.faq.map((f, i) => (
                <div key={i}>
                  <dt className="font-display text-[22px] md:text-[26px] leading-tight text-[var(--ink)]">
                    {f.q}
                  </dt>
                  <dd className="mt-3 text-[14px] text-[var(--ink-soft)] leading-relaxed">
                    {f.a}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <Quote />
      </main>
      <Footer />
    </>
  );
}
