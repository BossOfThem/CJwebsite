# Lead Pipeline — form submit to admin inbox

> **Scope:** what happens between "customer hits Send" and "Carlos sees
> the lead." Read this before changing the quote form, the email
> provider, or the admin leads page.

---

## One-line summary

Customer fills QuoteWizard → server action validates with Zod → writes
to `data/leads.json` → optionally emails via Resend → returns `{ok:true}`
to the client. That's it. No queue, no webhook, no third-party form
service.

---

## The pipeline, step by step

```
┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐
│  QuoteWizard.tsx │───▶│  sendQuote()     │───▶│  appendLead()    │
│  (client)        │    │  server action   │    │  data/leads.json │
└──────────────────┘    └──────────────────┘    └──────────────────┘
                                │
                                ▼
                        ┌──────────────────┐
                        │  Resend API      │
                        │  (optional)      │
                        └──────────────────┘
                                │
                                ▼
                       Carlos's email inbox
```

All steps are synchronous within the server action. Total latency is
dominated by the Resend call (~200–600 ms) when it's wired.

---

## 1. Client form — `components/contact/QuoteWizard.tsx`

Two modes on one form:

- **Quick message** — single textarea + name + contact. For people who
  just want to type what's broken.
- **Step-by-step** — 3-step wizard (service → details → contact).

Both modes share:

- The same `useForm<QuoteInput>()` instance.
- The same Zod schema at [`lib/schema.ts`](../lib/schema.ts) (`QuoteSchema`).
- The same submit handler that calls `sendQuote(data)`.
- A hidden `<input name="website">` honeypot field.

Submit states:
- `submitting` — disables button, shows spinner.
- `submitted` — replaces form with success message + WhatsApp fallback.
- `error` — shows inline error, form stays editable.

---

## 2. Schema — `lib/schema.ts`

```ts
QuoteSchema = z.object({
  service: z.enum(ServiceKeys),
  details: z.string().min(10),
  name: z.string().min(2),
  contact: z.string().min(5),  // phone OR email — loose validation on purpose
  preferredMethod: z.enum(["call", "text", "whatsapp", "email"]),
  zip: z.string().optional(),
  website: z.string().optional(),  // honeypot
});
```

**Why loose on `contact`:** people type phone numbers every way imaginable.
Strict validation costs more conversions than it saves bad inputs. The
server-side replyTo logic handles both: if it contains `@` it's treated
as an email for the Resend reply-to header, otherwise the recipient
calls back the number.

---

## 3. Server action — `app/actions/send-quote.ts`

Runs on the server (Node runtime). Flow:

```
1. QuoteSchema.safeParse(input)
   → if invalid: return { ok: false, error, fields }
     (client re-renders with per-field errors)

2. Honeypot check
   → if `website` is non-empty: return { ok: true } silently

3. appendLead(data)
   → writes to data/leads.json
   → wrapped in try/catch; console.warn on failure but continue
     (we still want to try the email)

4. Resolve env:
   - apiKey  = RESEND_API_KEY
   - to      = QUOTE_TO_EMAIL || BUSINESS.email
   - from    = QUOTE_FROM_EMAIL || "quotes@example.com"

5. Build plain-text email body
   (Service / Name / Contact / Method / ZIP / Details)

6. If apiKey missing:
   → console.info(…) the would-be email
   → return { ok: true }  (dev-mode happy path)

7. Else:
   → Resend.emails.send({ to, from, subject, replyTo, text })
   → replyTo = data.contact if it looks like an email
   → on error: log + return { ok: false, error: "Couldn't send…" }
   → on success: return { ok: true }
```

**Key property:** the lead is persisted to JSON *before* the email
attempt. If Resend fails, Carlos still has the lead via
`/admin/leads`. We never lose a submission because of a transient
email outage.

---

## 4. Lead store — `lib/leads.ts`

File-backed JSON. Lazy-loaded on first call.

```ts
Lead = {
  id: string,            // nanoid
  createdAt: string,     // ISO
  status: "new" | "contacted" | "scheduled" | "won" | "lost",
  service: ServiceKey,
  details: string,
  name: string,
  contact: string,
  preferredMethod: "call" | "text" | "whatsapp" | "email",
  zip?: string,
}

appendLead(input)          // default status "new"
listLeads()                // newest first
updateLeadStatus(id, s)    // admin dashboard uses this
```

Read/write is via `fs/promises` + a simple in-memory cache. No
transactions — good enough for alpha, will race under concurrent
writes. Swap to Postgres before traffic matters.

---

## 5. Admin surface — `app/admin/leads/page.tsx`

- Server component. Reads `listLeads()` at request time.
- Displays newest first, with status dropdown per lead.
- Status changes call `updateLeadStatus` server action.
- Protected by middleware: requires session with role
  `admin_creator` or `admin_manager`.

---

## Failure modes and how they degrade

| Failure | What happens | Visible to customer? |
|---------|--------------|----------------------|
| Invalid field (Zod fail) | Server returns `{ok:false, fields}` | Yes — inline errors |
| Honeypot filled (bot) | Silent success, nothing persisted | No |
| `appendLead` throws (FS error) | Logged, pipeline continues to email | No |
| `RESEND_API_KEY` missing | Logs the email body to console | No — success screen still shows |
| Resend returns error | Logged, returns `{ok:false, error}` | Yes — generic "call or WhatsApp" message |
| Server action itself throws | Next.js surfaces a 500 | Yes — client treats as failure |

**Design choice:** when the email layer can't deliver, tell the user to
call or WhatsApp instead of silently succeeding. Losing a lead because
of a missing API key is worse than a user seeing one failure screen.

---

## Deploy-time persistence decision

The file-backed JSON store assumes a persistent writable disk. This
matters at deploy time:

| Host | Verdict | Why |
|------|---------|-----|
| **Vercel** | ❌ for JSON store | Serverless functions have ephemeral `/tmp`. Writes disappear. You'd need a DB or KV. |
| **Fly.io** | ✅ with a volume | Attach a Fly volume, mount at `/data`. Works as-is with `DATA_DIR` env pointing there. |
| **Railway** | ✅ with a volume | Same as Fly. |
| **Render** | ✅ with a persistent disk | Same pattern. |
| **Docker on a VPS** | ✅ | Bind-mount a host directory. |

**Recommendation:** for alpha → beta, deploy to Fly.io with a tiny
volume. When leads cross ~50/month, migrate to Postgres + Prisma (see
ROADMAP.md). Vercel becomes viable the moment the JSON store is gone.

If you're reading this and Carlos wants Vercel anyway, the migration
path is:

1. Add `@vercel/postgres` (or Prisma + Neon).
2. Replace `lib/leads.ts` and `lib/users.ts` read/write with SQL.
3. Keep the same function signatures (`appendLead`, `listLeads`,
   `updateLeadStatus`, `findUserById`, `createUser`, `verifyPassword`).
4. Delete `data/` and the fs-based code paths.

The server action and all UI keep working unchanged.

---

## Future extensions (not built)

- **SMS notification on new lead** (L5 in CARLOS_DECISIONS). Twilio
  after the Resend call. Guard behind env var so dev stays silent.
- **reCAPTCHA v3** if spam picks up beyond what the honeypot catches.
- **Webhook** for third-party CRM (e.g. HubSpot) — fire-and-forget
  after the email.
- **Lead scoring** — enrich with Google Places lookup on the ZIP, flag
  out-of-service-area leads. Only makes sense at higher volume.

---

## Related

- [ARCHITECTURE.md](ARCHITECTURE.md) — server actions, data stores,
  auth.
- [CARLOS_DECISIONS.md](CARLOS_DECISIONS.md) — L1–L6 are the decisions
  Carlos still needs to make about this pipeline.
- [CONTENT_MODEL.md](CONTENT_MODEL.md) — env vars and their defaults.
