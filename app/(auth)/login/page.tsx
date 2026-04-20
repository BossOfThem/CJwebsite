import Link from "next/link";
import { AuthForm } from "@/components/auth/AuthForm";
import { loginAction } from "@/app/actions/auth";

export const metadata = { title: "Sign in" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;
  return (
    <>
      <h1 className="text-3xl font-black tracking-tight">Welcome back.</h1>
      <p className="mt-1 text-[var(--ink-soft)]">
        Sign in to track your quotes and past jobs.
      </p>

      <div className="mt-8">
        <AuthForm
          action={loginAction}
          submitLabel="Sign in"
          hiddenFields={{ scope: "user", from: from ?? "" }}
          fields={[
            { name: "email", label: "Email", type: "email", autoComplete: "email", placeholder: "you@example.com" },
            { name: "password", label: "Password", type: "password", autoComplete: "current-password" },
          ]}
          footer={
            <p className="pt-2 text-sm text-[var(--ink-soft)]">
              New here?{" "}
              <Link href="/signup" className="font-semibold text-[var(--brand)] underline">
                Create an account
              </Link>
            </p>
          }
        />
      </div>

      <div className="mt-10 rounded-xl bg-[var(--bg-raised)] border border-[var(--line)] p-4 text-sm text-[var(--ink-soft)]">
        <p className="font-semibold text-[var(--ink)]">Alpha placeholder</p>
        <p className="mt-1">
          A demo user is seeded as <code className="font-mono">demo@cj.local.dev</code>{" "}
          (password <code className="font-mono">change-me-now</code>). Rotate both in{" "}
          <code className="font-mono">lib/users.ts</code>.
        </p>
      </div>
    </>
  );
}
