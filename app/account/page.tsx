import Link from "next/link";
import { redirect } from "next/navigation";
import { User, FileText, Phone, MessageCircle, LogOut } from "lucide-react";
import { auth } from "@/auth";
import { BUSINESS, buildWhatsAppLink, prefillForService } from "@/lib/config";
import { signOutAction } from "@/app/actions/auth";

export const metadata = { title: "My account" };

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) redirect("/login?from=/account");

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="mx-auto max-w-4xl px-5 md:px-8 py-10">
        <Link href="/" className="text-sm text-[var(--ink-mute)]">← Back to site</Link>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--brand-2)]">My account</p>
            <h1 className="mt-1 text-3xl md:text-4xl font-black tracking-tight">
              Hi {session.user.name ?? "there"}.
            </h1>
            <p className="text-[var(--ink-soft)] mt-1">{session.user.email}</p>
          </div>
          <form action={signOutAction}>
            <button className="inline-flex items-center gap-2 rounded-xl border border-[var(--line)] px-4 py-2.5 font-semibold hover:bg-[var(--bg-raised)]">
              <LogOut className="size-4" aria-hidden /> Sign out
            </button>
          </form>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Card icon={FileText} title="Your quote requests">
            <p className="text-[var(--ink-soft)] text-sm">
              Past and in-progress quotes will show up here.
            </p>
            <p className="mt-3 text-xs text-[var(--ink-mute)]">
              Placeholder — coming in beta when we link requests to accounts.
            </p>
            <Link href="/#quote" className="mt-4 inline-flex items-center gap-2 font-semibold text-[var(--brand)]">
              Start a new quote →
            </Link>
          </Card>

          <Card icon={User} title="Reach us fast">
            <p className="text-[var(--ink-soft)] text-sm">
              Whatever's easiest. We're usually around.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a href={`tel:${BUSINESS.phone.raw}`} className="inline-flex items-center gap-2 rounded-xl bg-[var(--brand)] text-white px-3.5 py-2 font-semibold">
                <Phone className="size-4" aria-hidden /> Call
              </a>
              <a
                href={buildWhatsAppLink(prefillForService())}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] text-white px-3.5 py-2 font-semibold"
              >
                <MessageCircle className="size-4" aria-hidden /> WhatsApp
              </a>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Card({ icon: Icon, title, children }: { icon: React.ComponentType<{ className?: string }>; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--bg-raised)] p-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-flex size-9 items-center justify-center rounded-lg bg-[var(--brand)]/10 text-[var(--brand)]">
          <Icon className="size-4" aria-hidden />
        </span>
        <h2 className="font-bold">{title}</h2>
      </div>
      {children}
    </div>
  );
}
