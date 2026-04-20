import Link from "next/link";
import { redirect } from "next/navigation";
import { Inbox, LayoutDashboard, Settings, Users, LogOut, ShieldCheck } from "lucide-react";
import { auth } from "@/auth";
import { isAdmin, isCreator, roleLabel } from "@/lib/users";
import { BUSINESS } from "@/lib/config";
import { signOutAction } from "@/app/actions/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const role = session?.user?.role;

  // Let the login page itself pass through.
  // The layout wraps /admin and children; /admin/login renders its own shell above.
  // We detect the login route by absence of session + middleware already protects other paths.
  if (session && !isAdmin(role)) redirect("/");
  if (!session) {
    // Children may be /admin/login — allow render.
    return <>{children}</>;
  }

  const nav = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard, all: true },
    { href: "/admin/leads", label: "Leads", icon: Inbox, all: true },
    { href: "/admin/users", label: "Users", icon: Users, all: true },
    { href: "/admin/settings", label: "Settings", icon: Settings, creatorOnly: true },
  ];

  return (
    <div className="min-h-screen grid md:grid-cols-[260px_1fr] bg-[var(--bg)]">
      <aside className="hidden md:flex flex-col border-r border-[var(--line)] bg-[var(--bg-raised)] p-5">
        <Link href="/" className="flex items-center gap-2 font-black text-lg tracking-tight">
          <span className="inline-flex size-8 items-center justify-center rounded-lg bg-[var(--brand)] text-white">
            <ShieldCheck className="size-4" aria-hidden />
          </span>
          {BUSINESS.shortName}
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-2)] ml-1">Admin</span>
        </Link>

        <nav className="mt-6 space-y-0.5" aria-label="Admin navigation">
          {nav
            .filter((n) => !n.creatorOnly || isCreator(role))
            .map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[var(--ink-soft)] hover:bg-[var(--bg)] hover:text-[var(--ink)] font-medium"
              >
                <Icon className="size-4" aria-hidden />
                {label}
              </Link>
            ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-[var(--line)]">
          <div className="text-xs text-[var(--ink-mute)]">Signed in as</div>
          <div className="font-semibold">{session.user?.name ?? session.user?.email}</div>
          <div className="text-xs text-[var(--brand-2)] font-semibold uppercase tracking-wider mt-0.5">
            {roleLabel(role)}
          </div>
          <form action={signOutAction} className="mt-3">
            <button className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--line)] px-3 py-2 text-sm font-medium hover:bg-[var(--bg)]">
              <LogOut className="size-4" aria-hidden /> Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* mobile top bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-[var(--line)] bg-[var(--bg-raised)]">
        <Link href="/admin/dashboard" className="font-black">{BUSINESS.shortName} Admin</Link>
        <form action={signOutAction}>
          <button className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--ink-soft)]">
            <LogOut className="size-4" aria-hidden /> Sign out
          </button>
        </form>
      </div>

      <main className="p-5 md:p-10">{children}</main>
    </div>
  );
}
