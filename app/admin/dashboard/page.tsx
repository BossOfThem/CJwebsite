import Link from "next/link";
import { Inbox, Phone, MessageCircle, Mail, TrendingUp, Clock, CheckCircle2, XCircle } from "lucide-react";
import { auth } from "@/auth";
import { listLeads, leadCounts } from "@/lib/leads";
import { roleLabel } from "@/lib/users";

export const metadata = {
  title: "Admin dashboard",
  robots: { index: false, follow: false },
};

const STATUS_META = {
  new: { label: "New", icon: Inbox, color: "bg-[var(--brand-2)]/15 text-[var(--brand-2)]" },
  contacted: { label: "Contacted", icon: Clock, color: "bg-blue-500/15 text-blue-700" },
  scheduled: { label: "Scheduled", icon: TrendingUp, color: "bg-amber-500/15 text-amber-700" },
  won: { label: "Won", icon: CheckCircle2, color: "bg-[var(--success)]/15 text-[var(--success)]" },
  lost: { label: "Lost", icon: XCircle, color: "bg-[var(--danger)]/10 text-[var(--danger)]" },
} as const;

export default async function AdminDashboard() {
  const session = await auth();
  const [counts, leads] = await Promise.all([leadCounts(), listLeads()]);
  const recent = leads.slice(0, 5);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-[var(--brand-2)]">
            {roleLabel(session?.user?.role)} view
          </p>
          <h1 className="mt-1 text-3xl md:text-4xl font-black tracking-tight">
            Hey {session?.user?.name ?? "there"}.
          </h1>
          <p className="text-[var(--ink-soft)] mt-1">
            Here's what's happening with leads right now.
          </p>
        </div>
        <Link
          href="/admin/leads"
          className="inline-flex items-center gap-2 rounded-xl bg-[var(--brand)] text-white px-4 py-2.5 font-semibold min-h-[48px]"
        >
          <Inbox className="size-4" aria-hidden />
          Open inbox
        </Link>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {(Object.keys(STATUS_META) as (keyof typeof STATUS_META)[]).map((k) => {
          const meta = STATUS_META[k];
          const Icon = meta.icon;
          return (
            <div key={k} className="rounded-2xl border border-[var(--line)] bg-[var(--bg-raised)] p-4">
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${meta.color}`}>
                  <Icon className="size-3.5" aria-hidden /> {meta.label}
                </span>
              </div>
              <div className="mt-3 text-3xl font-black tracking-tight">{counts[k]}</div>
            </div>
          );
        })}
      </div>

      <section className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Recent leads</h2>
          <Link href="/admin/leads" className="text-sm font-semibold text-[var(--brand)]">View all →</Link>
        </div>
        {recent.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-[var(--line)] p-10 text-center">
            <Inbox className="size-8 mx-auto text-[var(--ink-mute)]" aria-hidden />
            <p className="mt-3 font-semibold">No leads yet.</p>
            <p className="mt-1 text-sm text-[var(--ink-soft)]">
              When someone submits the quote form, they'll show up here.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-[var(--line)] rounded-2xl border border-[var(--line)] bg-[var(--bg-raised)] overflow-hidden" role="list">
            {recent.map((l) => (
              <li key={l.id} className="p-4 flex flex-wrap items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold truncate">{l.name}</span>
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold ${STATUS_META[l.status].color}`}>
                      {STATUS_META[l.status].label}
                    </span>
                  </div>
                  <div className="text-sm text-[var(--ink-soft)] truncate">
                    {l.service} · {l.details.slice(0, 70)}{l.details.length > 70 && "…"}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <QuickAction href={`tel:${l.contact}`} icon={Phone} />
                  <QuickAction href={`sms:${l.contact}`} icon={MessageCircle} />
                  <QuickAction href={`mailto:${l.contact}`} icon={Mail} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function QuickAction({ href, icon: Icon }: { href: string; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center size-9 rounded-lg border border-[var(--line)] hover:border-[var(--brand)] hover:text-[var(--brand)]"
      aria-label="Quick contact"
    >
      <Icon className="size-4" aria-hidden />
    </a>
  );
}
