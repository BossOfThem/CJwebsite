"use client";

import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AuthResult } from "@/app/actions/auth";

type Field = {
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
};

export function AuthForm({
  action,
  fields,
  submitLabel,
  hiddenFields = {},
  footer,
  accent = "brand",
}: {
  action: (formData: FormData) => Promise<AuthResult>;
  fields: Field[];
  submitLabel: string;
  hiddenFields?: Record<string, string>;
  footer?: React.ReactNode;
  accent?: "brand" | "danger";
}) {
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await action(fd);
      if (res && !res.ok) setError(res.error);
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {Object.entries(hiddenFields).map(([k, v]) => (
        <input key={k} type="hidden" name={k} defaultValue={v} />
      ))}
      {fields.map((f) => (
        <div key={f.name}>
          <label htmlFor={f.name} className="block font-semibold mb-1.5 text-[0.95rem]">
            {f.label}
          </label>
          <input
            id={f.name}
            name={f.name}
            type={f.type ?? "text"}
            autoComplete={f.autoComplete}
            placeholder={f.placeholder}
            required
            className="w-full rounded-sm border border-[var(--line)] bg-[var(--bg)] p-3.5 text-[1.0625rem] min-h-[52px] font-sans focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/20 outline-none"
          />
        </div>
      ))}
      {error && <p role="alert" className="text-[var(--danger)] text-sm font-medium">{error}</p>}
      <button
        type="submit"
        disabled={pending}
        className={cn(
          "w-full inline-flex items-center justify-center gap-2 rounded-sm text-white px-6 py-3 font-bold font-sans min-h-[56px] disabled:opacity-60 transition-colors",
          accent === "brand"
            ? "bg-[var(--brand)] hover:bg-[color-mix(in_oklab,var(--brand)_88%,#000_12%)]"
            : "bg-[var(--danger)] hover:bg-[color-mix(in_oklab,var(--danger)_88%,#000_12%)]",
        )}
      >
        {pending && <Loader2 className="size-4 animate-spin" aria-hidden />}
        {pending ? "Working..." : submitLabel}
      </button>
      {footer}
    </form>
  );
}
