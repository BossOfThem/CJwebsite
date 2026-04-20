import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { AuthForm } from "@/components/auth/AuthForm";
import { loginAction } from "@/app/actions/auth";

export const metadata = {
  title: "Staff sign-in",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[var(--ink)] text-white">
      <div className="w-full max-w-md rounded-[var(--radius-xl)] bg-[var(--bg-raised)] text-[var(--ink)] p-8 shadow-[var(--shadow-lg)]">
        <div className="inline-flex size-12 items-center justify-center rounded-xl bg-[var(--brand)] text-white">
          <ShieldCheck className="size-6" aria-hidden />
        </div>
        <h1 className="mt-5 text-2xl font-black tracking-tight">Staff sign-in</h1>
        <p className="mt-1 text-[var(--ink-soft)] text-sm">
          Restricted. Admins only.
        </p>

        <div className="mt-6">
          <AuthForm
            action={loginAction}
            submitLabel="Enter dashboard"
            hiddenFields={{ scope: "admin", from: from ?? "" }}
            fields={[
              { name: "email", label: "Staff email", type: "email", autoComplete: "email" },
              { name: "password", label: "Password", type: "password", autoComplete: "current-password" },
            ]}
          />
        </div>

        <p className="mt-6 text-xs text-[var(--ink-mute)]">
          Not staff?{" "}
          <Link href="/login" className="underline">
            User sign-in is here.
          </Link>
        </p>
      </div>
    </div>
  );
}
