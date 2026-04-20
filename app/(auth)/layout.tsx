import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BUSINESS } from "@/lib/config";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[var(--bg)]">
      <div className="relative hidden lg:flex flex-col justify-between p-10 bg-[var(--brand)] text-white overflow-hidden">
        <div aria-hidden className="absolute inset-0 bg-tile opacity-[0.08]" />
        <Link href="/" className="relative inline-flex items-center gap-2 font-semibold text-white/80 hover:text-white">
          <ArrowLeft className="size-4" aria-hidden /> Back to site
        </Link>
        <div className="relative">
          <div className="text-3xl font-black">{BUSINESS.name}</div>
          <p className="mt-2 text-white/70 max-w-sm">{BUSINESS.tagline}</p>
          <p className="mt-8 text-sm text-white/60">
            {BUSINESS.address.city}, {BUSINESS.address.region} · Licensed & Insured
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center p-6 md:p-10">
        <div className="mx-auto w-full max-w-md">
          <Link href="/" className="lg:hidden inline-flex items-center gap-2 text-sm text-[var(--ink-mute)] mb-6">
            <ArrowLeft className="size-4" aria-hidden /> Back to site
          </Link>
          {children}
        </div>
      </div>
    </div>
  );
}
