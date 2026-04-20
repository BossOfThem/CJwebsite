import Link from "next/link";
import { Phone, Home } from "lucide-react";
import { BUSINESS } from "@/lib/config";
import { auth } from "@/auth";
import { isAdmin } from "@/lib/users";
import { signOutAction } from "@/app/actions/auth";

export async function Header() {
  const session = await auth();
  const user = session?.user;
  const displayName = BUSINESS.shortName.replace(/[\[\]]/g, "");

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[var(--ink)] border-b border-[var(--bone)]/15">
      <div className="mx-auto max-w-6xl px-4 md:px-8 h-14 md:h-14 flex items-center justify-between gap-3 md:gap-5">
        <Link
          href="/#top"
          className="flex items-center gap-1.5 font-display text-[17px] md:text-[19px] text-[var(--bone)] tracking-wide hover:text-[var(--amber)] transition-colors"
          aria-label={`${displayName} — back to top`}
        >
          <Home className="size-4 text-[var(--amber)]" aria-hidden />
          <span>{displayName}</span>
        </Link>

        <nav
          className="hidden md:flex items-center gap-5 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--bone)]/85"
          aria-label="Primary"
        >
          <Link href="/#services" className="hover:text-[var(--amber)]">Services</Link>
          <Link href="/#work" className="hover:text-[var(--amber)]">Work</Link>
          <Link href="/#quote" className="hover:text-[var(--amber)]">Quote</Link>
          <Link href="/#area" className="hover:text-[var(--amber)]">Area</Link>
          <Link href="/#faq" className="hover:text-[var(--amber)]">FAQ</Link>
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              {isAdmin(user.role) ? (
                <Link
                  href="/admin/dashboard"
                  className="hidden sm:inline-flex font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--bone)]/85 px-3 py-2 border border-[var(--bone)]/30 hover:border-[var(--amber)] hover:text-[var(--amber)] rounded-sm"
                >
                  Admin
                </Link>
              ) : (
                <Link
                  href="/account"
                  className="hidden sm:inline-flex font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--bone)]/85 px-3 py-2 border border-[var(--bone)]/30 hover:border-[var(--amber)] hover:text-[var(--amber)] rounded-sm"
                >
                  {user.name?.split(" ")[0] ?? "Account"}
                </Link>
              )}
              <form action={signOutAction} className="hidden md:block">
                <button className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--bone)]/70 hover:text-[var(--bone)] px-2 py-2">
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/login"
              className="inline-flex font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--bone)]/85 px-3 py-2 border border-[var(--bone)]/30 hover:border-[var(--amber)] hover:text-[var(--amber)] rounded-sm"
              aria-label="Sign in"
            >
              Sign in
            </Link>
          )}
          <a
            href={`tel:${BUSINESS.phone.raw}`}
            className="btn btn-primary !min-h-[36px] !px-3 !text-[12px]"
            aria-label={`Call ${BUSINESS.name}`}
          >
            <Phone className="size-3.5" aria-hidden />
            <span className="hidden md:inline">{BUSINESS.phone.display}</span>
            <span className="md:hidden">Call</span>
          </a>
        </div>
      </div>
    </header>
  );
}
