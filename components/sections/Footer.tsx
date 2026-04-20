import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";
import { BUSINESS, buildWhatsAppLink, prefillForService } from "@/lib/config";

export function Footer() {
  const displayName = BUSINESS.name.replace(/[\[\]]/g, "");

  return (
    <footer
      className="relative mt-auto bg-wood text-[var(--bone)]"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">Contact and links</h2>

      <div className="relative mx-auto max-w-6xl px-6 md:px-10 pt-24 pb-10">
        <div className="border-b border-[var(--bone)]/25 pb-14">
          <p className="eyebrow">08 &nbsp;/ &nbsp;Call us</p>
          <div className="mt-5 font-display text-[64px] md:text-[120px] leading-[0.88] tracking-[-0.01em] text-[var(--bone)]">
            {displayName}
          </div>
          <p className="mt-6 max-w-xl text-[15px] text-[var(--bone)]/85 leading-relaxed">
            {BUSINESS.tagline}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
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
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-3 py-14">
          <div>
            <p className="eyebrow">Visit</p>
            <ul className="mt-5 space-y-2 text-[14px] text-[var(--bone)]/85">
              <li>{BUSINESS.address.city}, {BUSINESS.address.region}</li>
              <li>Within ~{BUSINESS.address.serviceRadiusMiles} miles</li>
              <li>{BUSINESS.hours}</li>
            </ul>
          </div>
          <div>
            <p className="eyebrow">Reach</p>
            <ul className="mt-5 space-y-2 text-[14px] text-[var(--bone)]/85">
              <li><a href={`tel:${BUSINESS.phone.raw}`} className="hover:text-[var(--amber)]">{BUSINESS.phone.display}</a></li>
              <li><a href={`mailto:${BUSINESS.email}`} className="hover:text-[var(--amber)]">{BUSINESS.email}</a></li>
              <li><a href={buildWhatsAppLink(prefillForService())} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--amber)]">WhatsApp us</a></li>
            </ul>
          </div>
          <div>
            <p className="eyebrow">Sections</p>
            <ul className="mt-5 space-y-2 text-[14px] text-[var(--bone)]/85">
              <li><Link href="#services" className="hover:text-[var(--amber)]">Services</Link></li>
              <li><Link href="#work" className="hover:text-[var(--amber)]">Recent work</Link></li>
              <li><Link href="#quote" className="hover:text-[var(--amber)]">Get a quote</Link></li>
              <li><Link href="#area" className="hover:text-[var(--amber)]">Service area</Link></li>
              <li><Link href="#faq" className="hover:text-[var(--amber)]">FAQ</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-[var(--bone)]/25 flex flex-col sm:flex-row gap-3 justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--bone)]/70">
          <p>&copy; {new Date().getFullYear()} {displayName} &nbsp;/&nbsp; {BUSINESS.credentials.licenseNumber} &nbsp;/&nbsp; Insured</p>
          <Link
            href="/admin/login"
            className="text-[var(--bone)]/20 hover:text-[var(--bone)]/60"
            title="Staff only"
            rel="nofollow"
          >
            Staff
          </Link>
        </div>
      </div>

      {/* bottom padding so mobile dock doesn't overlap */}
      <div aria-hidden className="h-16 md:hidden" />
    </footer>
  );
}
