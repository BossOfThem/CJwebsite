import Link from "next/link";
import { BUSINESS } from "@/lib/config";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--paper)] p-8">
      <div className="max-w-xl">
        <p className="eyebrow">404</p>
        <h1 className="font-display text-display-xl mt-4 leading-[0.9]">
          We don't have a page for that city — yet.
        </h1>
        <p className="mt-6 text-[15px] text-[var(--ink-soft)] leading-relaxed">
          We still might work your area. Call {BUSINESS.phone.display} and ask.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-primary">Back home</Link>
          <Link href="/#area" className="btn btn-ghost">See our service area</Link>
        </div>
      </div>
    </main>
  );
}
