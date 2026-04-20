import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { isCreator } from "@/lib/users";
import { BUSINESS } from "@/lib/config";
import { Palette, Phone, Mail, MessageCircle, Globe, Shield } from "lucide-react";

export const metadata = {
  title: "Settings",
  robots: { index: false, follow: false },
};

export default async function SettingsPage() {
  const session = await auth();
  if (!isCreator(session?.user?.role)) redirect("/admin/dashboard");

  return (
    <div>
      <h1 className="text-3xl font-black tracking-tight">Settings</h1>
      <p className="text-[var(--ink-soft)] mt-1">
        Creator-only controls. Currently read-only mirrors of{" "}
        <code className="font-mono text-sm bg-[var(--bg-raised)] px-1.5 py-0.5 rounded">lib/config.ts</code>{" "}
        and env vars.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Card icon={Palette} title="Business identity">
          <Row label="Name" value={BUSINESS.name} />
          <Row label="Tagline" value={BUSINESS.tagline} />
          <Row label="Years" value={`${BUSINESS.yearsInBusiness}+`} />
          <Row label="City" value={`${BUSINESS.address.city}, ${BUSINESS.address.region}`} />
        </Card>
        <Card icon={Phone} title="Contact">
          <Row label="Phone" value={BUSINESS.phone.display} />
          <Row label="SMS" value={BUSINESS.sms.raw} />
          <Row label="WhatsApp" value={BUSINESS.whatsapp.raw} />
          <Row label="Email" value={BUSINESS.email} />
        </Card>
        <Card icon={MessageCircle} title="Live chat (Tawk.to)">
          <Row label="Property ID" value={BUSINESS.tawkPropertyId || "— not set —"} />
          <Row label="Widget ID" value={BUSINESS.tawkWidgetId || "— not set —"} />
          <p className="mt-2 text-xs text-[var(--ink-mute)]">
            Set via <code className="font-mono">NEXT_PUBLIC_TAWK_PROPERTY_ID</code> and{" "}
            <code className="font-mono">NEXT_PUBLIC_TAWK_WIDGET_ID</code>.
          </p>
        </Card>
        <Card icon={Mail} title="Transactional email (Resend)">
          <Row label="Quotes to" value={process.env.QUOTE_TO_EMAIL || "— default —"} />
          <Row label="From" value={process.env.QUOTE_FROM_EMAIL || "— default —"} />
          <Row label="API key" value={process.env.RESEND_API_KEY ? "set ✓" : "missing"} />
        </Card>
        <Card icon={Globe} title="Service area">
          <p className="text-sm text-[var(--ink-soft)]">
            {BUSINESS.serviceAreas.join(" · ")}
          </p>
        </Card>
        <Card icon={Shield} title="Credentials">
          <Row label="License #" value={BUSINESS.credentials.licenseNumber} />
          <Row label="Insured" value={BUSINESS.credentials.insured ? "yes" : "no"} />
          <Row label="Bonded" value={BUSINESS.credentials.bonded ? "yes" : "no"} />
        </Card>
      </div>

      <p className="mt-8 text-sm text-[var(--ink-mute)]">
        Editable UI for these values ships in beta. For now, edit{" "}
        <code className="font-mono">lib/config.ts</code> or your env file and redeploy.
      </p>
    </div>
  );
}

function Card({
  title, icon: Icon, children,
}: { title: string; icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <div className="rounded-sm border border-[var(--line)] bg-[var(--bg-raised)] p-5">
      <div className="flex items-center gap-2 mb-3">
        <span className="inline-flex size-8 items-center justify-center rounded-sm bg-[var(--brand)]/10 text-[var(--brand)]">
          <Icon className="size-4" aria-hidden />
        </span>
        <h2 className="font-bold">{title}</h2>
      </div>
      <div className="space-y-1.5 text-sm">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="text-[var(--ink-mute)]">{label}</span>
      <span className="font-semibold text-right break-all">{value}</span>
    </div>
  );
}
