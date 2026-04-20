"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";
import { BUSINESS, buildWhatsAppLink, prefillForService } from "@/lib/config";

export function StickyCallBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setVisible(window.scrollY > 300);
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={[
        "fixed inset-x-0 bottom-0 z-40 md:hidden safe-bottom",
        "transition-transform duration-300 ease-out",
        visible ? "translate-y-0" : "translate-y-full",
      ].join(" ")}
    >
      <div className="flex items-stretch h-14 bg-[var(--amber-on-dark)] text-[var(--ink)] border-t border-[var(--ink)]/20 shadow-[0_-6px_24px_rgba(20,17,13,0.25)]">
        <Link
          href={`tel:${BUSINESS.phone.raw}`}
          className="flex-1 flex items-center justify-center gap-2 font-display text-[18px] tracking-tight"
          aria-label={`Call ${BUSINESS.name}`}
        >
          <Phone className="size-5" aria-hidden />
          Call {BUSINESS.phone.display}
        </Link>
        <Link
          href={buildWhatsAppLink(prefillForService())}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center px-5 border-l border-[var(--ink)]/20 bg-[var(--ink)] text-[var(--amber-on-dark)]"
          aria-label="WhatsApp us"
        >
          <MessageCircle className="size-5" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
