"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { signIn, signOut } from "@/auth";
import { createUser, findUserByEmail } from "@/lib/users";

const LoginSchema = z.object({
  email: z.string().email("Valid email, please."),
  password: z.string().min(6, "At least 6 characters."),
  scope: z.enum(["user", "admin"]).default("user"),
  from: z.string().optional(),
});

const SignupSchema = z.object({
  name: z.string().min(2, "Your name, please."),
  email: z.string().email("Valid email, please."),
  password: z.string().min(8, "At least 8 characters."),
});

export type AuthResult =
  | { ok: true }
  | { ok: false; error: string };

export async function loginAction(formData: FormData): Promise<AuthResult> {
  const parsed = LoginSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }
  const { email, password, scope, from } = parsed.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (e) {
    if (e instanceof AuthError) {
      return { ok: false, error: "Email or password didn't match." };
    }
    throw e;
  }

  const dest =
    from ||
    (scope === "admin" ? "/admin/dashboard" : "/account");
  redirect(dest);
}

export async function signupAction(formData: FormData): Promise<AuthResult> {
  const parsed = SignupSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }
  const { name, email, password } = parsed.data;

  const existing = await findUserByEmail(email);
  if (existing) return { ok: false, error: "An account with that email already exists." };

  try {
    await createUser({ name, email, password });
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Could not create account." };
  }

  try {
    await signIn("credentials", { email, password, redirect: false });
  } catch {
    // swallow — they can still log in
  }

  redirect("/account");
}

export async function signOutAction(): Promise<void> {
  await signOut({ redirectTo: "/" });
}
