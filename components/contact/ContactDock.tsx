"use client";

import Link from "next/link";
import { Phone, MessageCircle, MessageSquare } from "lucide-react";
import {
  BUSINESS,
  buildSmsLink,
  buildWhatsAppLink,
  prefillForService,
} from "@/lib/config";

export function ContactDock() {
  const msg = prefillForService();

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-40 md:hidden safe-bottom border-t-2 border-[var(--amber)] bg-[var(--ink)]"
      role="navigation"
      aria-label="Quick contact"
    >
      <div className="grid grid-cols-3 gap-0">
        <Link
          href={`tel:${BUSINESS.phone.raw}`}
          className="flex items-center justify-center gap-2 py-3 font-mono text-[11px] uppercase tracking-[0.18em] bg-[var(--amber)] text-[var(--ink)] min-h-[52px]"
          aria-label={`Call ${BUSINESS.name}`}
        >
          <Phone className="size-4" aria-hidden />
          <span>Call</span>
        </Link>
        <Link
          href={buildWhatsAppLink(msg)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--bone)] hover:bg-[var(--bone)]/10 min-h-[52px]"
          aria-label="WhatsApp"
        >
          <MessageCircle className="size-4" aria-hidden />
          <span>WhatsApp</span>
        </Link>
        <Link
          href={buildSmsLink(msg)}
          className="flex items-center justify-center gap-2 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--bone)] hover:bg-[var(--bone)]/10 min-h-[52px]"
          aria-label="Text us"
        >
          <MessageSquare className="size-4" aria-hidden />
          <span>Text</span>
        </Link>
      </div>
    </div>
  );
}
