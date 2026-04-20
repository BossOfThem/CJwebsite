import Link from "next/link";
import { ArrowRight, ArrowUp } from "lucide-react";

type NavLink = { href: string; label: string };

type Props = {
  prev?: NavLink;
  next?: NavLink;
  surface?: "light" | "dark";
  /** Include a "Back to top" chip on the right. Defaults true. */
  backToTop?: boolean;
};

/**
 * Footer rail inside every section so a visitor always has 2+ ways forward
 * and one way home. Keeps the page stitched together.
 */
export function SectionNav({ prev, next, surface = "light", backToTop = true }: Props) {
  const dark = surface === "dark";
  const borderCls = dark ? "border-[var(--bone)]/25" : "border-[var(--line)]";
  const labelCls = dark ? "text-[var(--bone)]/75" : "text-[var(--ink-mute)]";
  const linkCls = dark
    ? "text-[var(--bone)] hover:text-[var(--amber)]"
    : "text-[var(--ink)] hover:text-[var(--amber-2)]";

  return (
    <nav
      aria-label="Section navigation"
      className={`mt-16 pt-6 border-t ${borderCls} flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between font-mono text-[12px] uppercase tracking-[0.18em]`}
    >
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        {prev && (
          <Link href={prev.href} className={`inline-flex items-center gap-2 ${linkCls}`}>
            <span aria-hidden>&larr;</span>
            <span>{prev.label}</span>
          </Link>
        )}
        {next && (
          <Link href={next.href} className={`inline-flex items-center gap-2 ${linkCls}`}>
            <span>{next.label}</span>
            <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        )}
      </div>
      {backToTop && (
        <Link
          href="#top"
          className={`inline-flex items-center gap-2 ${labelCls} hover:${dark ? "text-[var(--bone)]" : "text-[var(--ink)]"}`}
        >
          <ArrowUp className="size-3.5" aria-hidden />
          Back to top
        </Link>
      )}
    </nav>
  );
}
