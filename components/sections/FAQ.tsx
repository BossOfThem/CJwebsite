"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { BUSINESS } from "@/lib/config";
import { SectionNav } from "@/components/nav/SectionNav";

const FAQS = [
  {
    q: "Do you give free estimates?",
    a: "Yes — always. Call, text, WhatsApp, or fill out the quote form. Most jobs get a rough number on the phone and a firm one after a quick visit.",
  },
  {
    q: "Are you licensed and insured?",
    a: `Yes. ${BUSINESS.credentials.licenseNumber}, general liability insured${BUSINESS.credentials.bonded ? " and bonded" : ""}. Happy to send proof.`,
  },
  {
    q: "How fast can you come out?",
    a: "Most small jobs get quoted same-day and started within a few days. Emergencies — leaks, broken doors, storm damage — call first and we'll fit you in.",
  },
  {
    q: "Do you pull permits?",
    a: "Yes, whenever the job requires one. We handle the paperwork so you don't have to.",
  },
  {
    q: "What happens after I send the form?",
    a: "You'll hear back within an hour during business hours, usually sooner. No call centers — you talk to the person doing the work.",
  },
  {
    q: "Do you do work outside of this list?",
    a: 'Often, yes. Pick "Something else" on the quote form or just message us. Not our specialty? We\'ll tell you straight and sometimes refer someone we trust.',
  },
];

export function FAQ() {
  return (
    <section
      id="faq"
      className="relative bg-[var(--paper-2)] border-t border-[var(--line)] py-24 md:py-36 scroll-mt-20"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-4xl px-6 md:px-10">
        <div className="mb-14 max-w-2xl">
          <p className="eyebrow">07 &nbsp;/ &nbsp;Straight answers</p>
          <h2
            id="faq-heading"
            className="font-display mt-4 text-[48px] md:text-[84px] leading-[0.9] text-[var(--ink)]"
          >
            Questions we get
            <br />
            <span className="text-[var(--amber-2)]">every week.</span>
          </h2>
        </div>

        <Accordion.Root
          type="single"
          collapsible
          className="border-y border-[var(--line-strong)]"
        >
          {FAQS.map((f, i) => (
            <Accordion.Item
              key={i}
              value={`item-${i}`}
              className="border-b border-[var(--line)] last:border-b-0"
            >
              <Accordion.Header>
                <Accordion.Trigger className="group w-full flex items-center justify-between gap-6 py-6 text-left">
                  <span className="flex items-baseline gap-5">
                    <span className="font-mono text-[11px] tabular-nums tracking-[0.2em] text-[var(--amber-2)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-[22px] md:text-[28px] leading-tight text-[var(--ink)]">
                      {f.q}
                    </span>
                  </span>
                  <Plus
                    className="size-5 shrink-0 transition-transform group-data-[state=open]:rotate-45 text-[var(--amber-2)]"
                    aria-hidden
                  />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden data-[state=open]:animate-[accordion-down_240ms_ease-out] data-[state=closed]:animate-[accordion-up_200ms_ease-out]">
                <p className="pb-6 pl-[46px] pr-10 text-[15px] text-[var(--ink-soft)] leading-relaxed">
                  {f.a}
                </p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>

        <SectionNav
          prev={{ href: "#area", label: "Service area" }}
          next={{ href: "#quote", label: "Get a quote" }}
        />
      </div>

      <style>{`
        @keyframes accordion-down { from { height: 0 } to { height: var(--radix-accordion-content-height) } }
        @keyframes accordion-up { from { height: var(--radix-accordion-content-height) } to { height: 0 } }
      `}</style>
    </section>
  );
}
