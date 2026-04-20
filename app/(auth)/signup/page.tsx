import Link from "next/link";
import { AuthForm } from "@/components/auth/AuthForm";
import { signupAction } from "@/app/actions/auth";

export const metadata = { title: "Create account" };

export default function SignupPage() {
  return (
    <>
      <h1 className="text-3xl font-black tracking-tight">Create an account.</h1>
      <p className="mt-1 text-[var(--ink-soft)]">
        Save your quotes, see past work, and reply faster.
      </p>

      <div className="mt-8">
        <AuthForm
          action={signupAction}
          submitLabel="Create account"
          fields={[
            { name: "name", label: "Full name", autoComplete: "name" },
            { name: "email", label: "Email", type: "email", autoComplete: "email" },
            { name: "password", label: "Password (8+ chars)", type: "password", autoComplete: "new-password" },
          ]}
          footer={
            <p className="pt-2 text-sm text-[var(--ink-soft)]">
              Already have one?{" "}
              <Link href="/login" className="font-semibold text-[var(--brand)] underline">
                Sign in
              </Link>
            </p>
          }
        />
      </div>
    </>
  );
}
