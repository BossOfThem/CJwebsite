"use server";

import { Resend } from "resend";
import { QuoteSchema, type QuoteInput } from "@/lib/schema";
import { BUSINESS, SERVICE_BY_KEY } from "@/lib/config";
import { appendLead } from "@/lib/leads";

export type QuoteResult =
  | { ok: true }
  | { ok: false; error: string; fields?: Partial<Record<keyof QuoteInput, string>> };

export async function sendQuote(input: QuoteInput): Promise<QuoteResult> {
  const parsed = QuoteSchema.safeParse(input);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { ok: false, error: "Please check the fields below.", fields: fieldErrors };
  }

  const data = parsed.data;

  // Honeypot — if a bot filled "website", pretend success and drop silently.
  if (data.website && data.website.length > 0) return { ok: true };

  // Persist to the local lead store so the admin dashboard has data.
  try {
    await appendLead(data);
  } catch (e) {
    console.warn("[sendQuote] could not persist lead", e);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_TO_EMAIL || BUSINESS.email;
  const from = process.env.QUOTE_FROM_EMAIL || "quotes@example.com";

  const serviceTitle = SERVICE_BY_KEY[data.service]?.title ?? data.service;
  const subject = `New quote request: ${serviceTitle}`;

  const body = [
    `Service: ${serviceTitle}`,
    `Name: ${data.name}`,
    `Contact: ${data.contact}`,
    `Preferred method: ${data.preferredMethod}`,
    data.zip ? `ZIP: ${data.zip}` : null,
    ``,
    `Details:`,
    data.details,
  ]
    .filter(Boolean)
    .join("\n");

  // In dev (no key configured) just log and succeed so we can iterate end-to-end.
  if (!apiKey) {
    console.info("[sendQuote] RESEND_API_KEY missing — logging instead of emailing:\n", { to, subject, body });
    return { ok: true };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      to,
      from,
      subject,
      replyTo: data.contact.includes("@") ? data.contact : undefined,
      text: body,
    });
    if (error) {
      console.error("[sendQuote] Resend error", error);
      return { ok: false, error: "Couldn't send right now — please call or WhatsApp us." };
    }
    return { ok: true };
  } catch (e) {
    console.error("[sendQuote] threw", e);
    return { ok: false, error: "Couldn't send right now — please call or WhatsApp us." };
  }
}
