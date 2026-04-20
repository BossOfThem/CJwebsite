"use client";

import { useState, useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2, Phone, MessageCircle, MessageSquare, Mail } from "lucide-react";
import { QuoteSchema, type QuoteInput } from "@/lib/schema";
import { SERVICES, BUSINESS } from "@/lib/config";
import { sendQuote } from "@/app/actions/send-quote";
import { cn } from "@/lib/utils";

const STEPS = ["Service", "Details", "You"] as const;

const METHODS = [
  { value: "call", label: "Call", icon: Phone },
  { value: "text", label: "Text", icon: MessageSquare },
  { value: "whatsapp", label: "WhatsApp", icon: MessageCircle },
  { value: "email", label: "Email", icon: Mail },
] as const;

type Mode = "quick" | "step";

export function QuoteWizard() {
  const [mode, setMode] = useState<Mode>("quick");
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    control,
    trigger,
    formState: { errors },
    watch,
  } = useForm<QuoteInput>({
    resolver: zodResolver(QuoteSchema),
    mode: "onTouched",
    defaultValues: {
      service: "home",
      details: "",
      name: "",
      contact: "",
      preferredMethod: "call",
      zip: "",
      website: "",
    },
  });

  const service = watch("service");

  async function next() {
    const fields: (keyof QuoteInput)[][] = [
      ["service"],
      ["details"],
      ["name", "contact", "preferredMethod", "zip"],
    ];
    const valid = await trigger(fields[step]);
    if (valid) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function onSubmit(values: QuoteInput) {
    setServerError(null);
    startTransition(async () => {
      const res = await sendQuote(values);
      if (res.ok) setDone(true);
      else setServerError(res.error);
    });
  }

  if (done) {
    return (
      <div className="bg-[var(--paper)] border border-[var(--line)] p-10 md:p-12 rounded-sm">
        <div className="inline-flex size-12 items-center justify-center rounded-full bg-[var(--amber)] text-[var(--ink)]">
          <CheckCircle2 className="size-6" aria-hidden />
        </div>
        <h3 className="font-display mt-6 text-[36px] leading-tight text-[var(--ink)]">Got it — we'll be in touch.</h3>
        <p className="mt-3 text-[15px] text-[var(--ink-soft)] max-w-md leading-relaxed">
          Expect a reply within an hour during business hours. Urgent? Call us at{" "}
          <a href={`tel:${BUSINESS.phone.raw}`} className="font-medium text-[var(--ink)] underline underline-offset-4 decoration-[var(--amber)]">
            {BUSINESS.phone.display}
          </a>.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-[var(--paper)] border border-[var(--line)] p-6 md:p-8 rounded-sm"
      noValidate
    >
      {/* mode toggle */}
      <div
        role="tablist"
        aria-label="Quote form mode"
        className="grid grid-cols-2 gap-0 border border-[var(--line-strong)] rounded-sm overflow-hidden mb-6"
      >
        <button
          type="button"
          role="tab"
          aria-selected={mode === "quick"}
          onClick={() => setMode("quick")}
          className={cn(
            "py-3 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors",
            mode === "quick"
              ? "bg-[var(--ink)] text-[var(--bone)]"
              : "bg-transparent text-[var(--ink-mute)] hover:text-[var(--ink)]",
          )}
        >
          Quick message
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === "step"}
          onClick={() => setMode("step")}
          className={cn(
            "py-3 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors border-l border-[var(--line-strong)]",
            mode === "step"
              ? "bg-[var(--ink)] text-[var(--bone)]"
              : "bg-transparent text-[var(--ink-mute)] hover:text-[var(--ink)]",
          )}
        >
          Step-by-step
        </button>
      </div>

      {/* honeypot */}
      <div aria-hidden className="sr-only">
        <label>
          Leave this field empty
          <input tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>

      {mode === "quick" && (
        <fieldset className="space-y-5">
          <div>
            <legend className="font-display text-[30px] md:text-[34px] leading-tight mb-2 text-[var(--ink)]">
              Just tell us what you need.
            </legend>
            <p className="text-[14px] text-[var(--ink-soft)]">
              Type in plain English. We read every one and reply within the hour during business hours.
            </p>
          </div>

          <Field label="What's the job?" error={errors.details?.message} htmlFor="quick-details">
            <textarea
              id="quick-details"
              rows={5}
              placeholder="Example: Need someone to look at a leaking guest bathroom. Tile's cracked near the drain, maybe full regrout. Miramar, this week if possible."
              className={cn(
                "w-full border bg-[var(--bone)] p-4 text-[15px] leading-relaxed rounded-sm",
                "focus:border-[var(--ink)] focus:bg-white outline-none",
                errors.details ? "border-[var(--danger)]" : "border-[var(--line)]",
              )}
              {...register("details")}
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Your name" error={errors.name?.message} htmlFor="quick-name">
              <input id="quick-name" autoComplete="name" className={inputCls(!!errors.name)} {...register("name")} />
            </Field>
            <Field label="Phone or email" error={errors.contact?.message} htmlFor="quick-contact">
              <input
                id="quick-contact"
                inputMode="email"
                autoComplete="email"
                placeholder="(555) 555-0123 or you@example.com"
                className={inputCls(!!errors.contact)}
                {...register("contact")}
              />
            </Field>
          </div>

          {serverError && (
            <p role="alert" className="text-[var(--danger)] font-medium">{serverError}</p>
          )}

          <div className="pt-2 flex items-center justify-between gap-3 flex-wrap">
            <button type="submit" disabled={pending} className="btn btn-primary disabled:opacity-60">
              {pending ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null}
              {pending ? "Sending…" : "Send message"}
            </button>
            <button
              type="button"
              onClick={() => setMode("step")}
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink-mute)] hover:text-[var(--ink)]"
            >
              Prefer guided steps? &rarr;
            </button>
          </div>
        </fieldset>
      )}

      {/* stepper */}
      {mode === "step" && (
      <>

      <ol className="flex items-center gap-2 mb-8" role="list" aria-label="Quote steps">
        {STEPS.map((label, i) => (
          <li key={label} className="flex-1 flex items-center gap-2">
            <span
              className={cn(
                "inline-flex size-7 items-center justify-center font-mono text-[11px] tabular-nums shrink-0 transition-colors rounded-sm",
                i <= step ? "bg-[var(--amber)] text-[var(--ink)]" : "bg-transparent border border-[var(--line-strong)] text-[var(--ink-mute)]",
              )}
              aria-current={i === step ? "step" : undefined}
            >
              {i + 1}
            </span>
            <span className={cn("font-mono text-[11px] uppercase tracking-[0.18em]", i === step ? "text-[var(--ink)]" : "text-[var(--ink-mute)]")}>
              {label}
            </span>
            {i < STEPS.length - 1 && <span aria-hidden className="flex-1 h-px bg-[var(--line)]" />}
          </li>
        ))}
      </ol>

      {/* STEP 1 — service */}
      {step === 0 && (
        <fieldset>
          <legend className="font-display text-[30px] md:text-[34px] leading-tight mb-2 text-[var(--ink)]">What kind of work?</legend>
          <p className="text-[14px] text-[var(--ink-soft)] mb-6">Pick the closest match. Tell us more next.</p>
          <Controller
            control={control}
            name="service"
            render={({ field }) => (
              <div className="grid gap-2 sm:grid-cols-2" role="radiogroup" aria-label="Service">
                {SERVICES.map((s) => (
                  <label
                    key={s.key}
                    className={cn(
                      "flex items-center gap-3 border p-4 cursor-pointer transition-colors min-h-[56px] rounded-sm",
                      field.value === s.key
                        ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--bone)]"
                        : "border-[var(--line)] hover:border-[var(--ink)]",
                    )}
                  >
                    <input
                      type="radio"
                      className="sr-only"
                      name={field.name}
                      value={s.key}
                      checked={field.value === s.key}
                      onChange={() => field.onChange(s.key)}
                    />
                    <span className={cn("size-2.5 shrink-0 rounded-full", field.value === s.key ? "bg-[var(--amber)]" : "border border-[var(--ink-mute)]")} aria-hidden />
                    <span className="font-mono text-[12px] uppercase tracking-[0.14em]">{s.title}</span>
                  </label>
                ))}
              </div>
            )}
          />
        </fieldset>
      )}

      {/* STEP 2 — details */}
      {step === 1 && (
        <fieldset>
          <legend className="font-display text-[30px] md:text-[34px] leading-tight mb-2 text-[var(--ink)]">Tell us about the job.</legend>
          <p className="text-[14px] text-[var(--ink-soft)] mb-6">A few sentences is plenty. Size, location, anything you've noticed.</p>
          <label htmlFor="details" className="sr-only">Job details</label>
          <textarea
            id="details"
            rows={6}
            placeholder="Example: Master bathroom, shower tile cracking near the drain. Want to regrout or retile the whole shower."
            className={cn(
              "w-full border bg-[var(--bone)] p-4 text-[15px] leading-relaxed rounded-sm",
              "focus:border-[var(--ink)] focus:bg-white outline-none",
              errors.details ? "border-[var(--danger)]" : "border-[var(--line)]",
            )}
            aria-invalid={!!errors.details}
            aria-describedby={errors.details ? "details-error" : undefined}
            {...register("details")}
          />
          {errors.details && (
            <p id="details-error" role="alert" className="mt-2 text-sm text-[var(--danger)]">
              {errors.details.message}
            </p>
          )}
        </fieldset>
      )}

      {/* STEP 3 — contact */}
      {step === 2 && (
        <fieldset className="space-y-5">
          <div>
            <legend className="font-display text-[30px] md:text-[34px] leading-tight mb-2 text-[var(--ink)]">How do we reach you?</legend>
            <p className="text-[14px] text-[var(--ink-soft)]">We only use this to reply about the {SERVICES.find(s => s.key === service)?.title.toLowerCase()} job.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Your name" error={errors.name?.message} htmlFor="name">
              <input id="name" autoComplete="name" className={inputCls(!!errors.name)} {...register("name")} />
            </Field>
            <Field label="Phone or email" error={errors.contact?.message} htmlFor="contact">
              <input id="contact" inputMode="email" autoComplete="email" placeholder="(555) 555-0123 or you@example.com" className={inputCls(!!errors.contact)} {...register("contact")} />
            </Field>
          </div>

          <Field label="ZIP (optional)" error={errors.zip?.message} htmlFor="zip">
            <input id="zip" inputMode="numeric" autoComplete="postal-code" maxLength={5} className={cn(inputCls(!!errors.zip), "max-w-[10rem]")} {...register("zip")} />
          </Field>

          <Controller
            control={control}
            name="preferredMethod"
            render={({ field }) => (
              <div>
                <span className="block font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--ink-mute)] mb-2">Best way to reach you?</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2" role="radiogroup">
                  {METHODS.map(({ value, label, icon: Icon }) => (
                    <label key={value} className={cn(
                      "flex items-center justify-center gap-2 border p-3 cursor-pointer min-h-[52px] font-mono text-[11px] uppercase tracking-[0.14em] rounded-sm",
                      field.value === value
                        ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--bone)]"
                        : "border-[var(--line)] hover:border-[var(--ink)]",
                    )}>
                      <input type="radio" className="sr-only" name={field.name} value={value} checked={field.value === value} onChange={() => field.onChange(value)} />
                      <Icon className="size-4" aria-hidden />
                      {label}
                    </label>
                  ))}
                </div>
              </div>
            )}
          />
          {serverError && (
            <p role="alert" className="text-[var(--danger)] font-medium">{serverError}</p>
          )}
        </fieldset>
      )}

      {/* nav */}
      <div className="mt-8 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className={cn(
            "inline-flex items-center gap-2 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.18em] min-h-[48px]",
            "text-[var(--ink-soft)] hover:text-[var(--ink)] disabled:opacity-30",
          )}
        >
          <ArrowLeft className="size-4" aria-hidden /> Back
        </button>
        {step < STEPS.length - 1 ? (
          <button type="button" onClick={next} className="btn btn-primary">
            Next <ArrowRight className="size-4" aria-hidden />
          </button>
        ) : (
          <button type="submit" disabled={pending} className="btn btn-primary disabled:opacity-60">
            {pending ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null}
            {pending ? "Sending…" : "Send quote"}
          </button>
        )}
      </div>
      </>
      )}
    </form>
  );
}

function inputCls(hasError: boolean) {
  return cn(
    "w-full border bg-[var(--bone)] px-4 text-[15px] min-h-[52px] rounded-sm",
    "focus:border-[var(--ink)] focus:bg-white outline-none",
    hasError ? "border-[var(--danger)]" : "border-[var(--line)]",
  );
}

function Field({
  label, error, htmlFor, children,
}: { label: string; error?: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--ink-mute)] mb-2">{label}</label>
      {children}
      {error && <p role="alert" className="mt-1.5 text-sm text-[var(--danger)]">{error}</p>}
    </div>
  );
}
