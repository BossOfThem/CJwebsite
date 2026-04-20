import { listLeads } from "@/lib/leads";
import { Phone, MessageCircle, Mail, MapPin } from "lucide-react";
import { SERVICE_BY_KEY } from "@/lib/config";

export const metadata = {
  title: "Leads",
  robots: { index: false, follow: false },
};

export default async function LeadsPage() {
  const leads = await listLeads();

  return (
    <div>
      <h1 className="text-3xl font-black tracking-tight">Leads</h1>
      <p className="text-[var(--ink-soft)] mt-1">
        {leads.length} total · newest first
      </p>

      {leads.length === 0 ? (
        <div className="mt-8 rounded-2xl border-2 border-dashed border-[var(--line)] p-10 text-center">
          <p className="font-semibold">No submissions yet.</p>
          <p className="mt-1 text-sm text-[var(--ink-soft)]">
            Live leads will appear here the moment the form is submitted.
          </p>
        </div>
      ) : (
        <ul className="mt-6 grid gap-3" role="list">
          {leads.map((l) => (
            <li key={l.id} className="rounded-2xl border border-[var(--line)] bg-[var(--bg-raised)] p-5">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-lg">{l.name}</span>
                    <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--brand-2)]/15 text-[var(--brand-2)]">
                      {l.status}
                    </span>
                    <span className="text-xs text-[var(--ink-mute)]">
                      {new Date(l.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="text-sm text-[var(--ink-soft)] mt-1 flex flex-wrap gap-x-3 gap-y-0.5">
                    <span>Service: <b>{SERVICE_BY_KEY[l.service]?.title ?? l.service}</b></span>
                    <span>Contact: <b>{l.contact}</b></span>
                    <span>Preferred: <b>{l.preferredMethod}</b></span>
                    {l.zip && <span className="inline-flex items-center gap-1"><MapPin className="size-3.5" aria-hidden /> {l.zip}</span>}
                  </div>
                </div>
                <div className="flex gap-1.5 shrink-0">
                  <a href={`tel:${l.contact}`} className="inline-flex size-9 items-center justify-center rounded-lg border border-[var(--line)] hover:border-[var(--brand)]" aria-label="Call"><Phone className="size-4" aria-hidden /></a>
                  <a href={`sms:${l.contact}`} className="inline-flex size-9 items-center justify-center rounded-lg border border-[var(--line)] hover:border-[var(--brand)]" aria-label="SMS"><MessageCircle className="size-4" aria-hidden /></a>
                  <a href={`mailto:${l.contact}`} className="inline-flex size-9 items-center justify-center rounded-lg border border-[var(--line)] hover:border-[var(--brand)]" aria-label="Email"><Mail className="size-4" aria-hidden /></a>
                </div>
              </div>
              <p className="mt-3 text-[var(--ink)] whitespace-pre-wrap bg-[var(--bg)] rounded-xl p-3 text-[0.95rem]">
                {l.details}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
