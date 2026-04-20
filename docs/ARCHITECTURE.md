# Architecture — routes, auth, data flow

> **Scope:** how requests move through the app. Read this when adding a
> route, changing auth, or wondering where a piece of state lives.

---

## Stack

| Layer | Pick | Why |
| ----- | ---- | --- |
| Framework | Next.js 16 App Router, Turbopack | Server components, server actions, zero client-bundle for most of the site |
| Styling | Tailwind v4 via `@theme inline` | Tokens in CSS vars, utilities everywhere |
| Forms | React Hook Form + Zod | Client validation + shared schema with server action |
| Auth | NextAuth v5 (Credentials) | JWT session, edge-safe config split |
| Data | File-backed JSON (`data/*.json`) | Good enough for alpha; swap for Postgres when it hurts |
| Email | Resend (optional) | Drop-in if `RESEND_API_KEY` is set, otherwise logs |
| UI primitives | Radix UI (Accordion) + lucide-react | Accessible, unopinionated |
| Fonts | `next/font/google` — Oswald, Inter, JetBrains_Mono | Self-hosted, zero layout shift |

---

## Route map

```
/                     landing page — composes all sections
/login                customer login (NextAuth credentials)
/signup               customer signup
/account              customer dashboard (placeholder)
/admin/login          stealth admin login (noindex)
/admin/dashboard      admin home (metrics placeholder)
/admin/leads          lead inbox (reads data/leads.json)
/admin/users          user manager
/admin/settings       placeholder
/admin                redirects to /admin/dashboard
/api/auth/[...nextauth]   NextAuth handler (runtime = "nodejs")
/manifest.webmanifest     static PWA manifest
```

Middleware (`middleware.ts`):

- `/admin/*` (except `/admin/login`) → requires session with
  `role ∈ { admin_creator, admin_manager }`. Non-admin redirects to
  `/admin/login`.
- `/account/*` → requires any session. Unauth redirects to
  `/login?from=<original>`.

---

## Edge-safe NextAuth split

NextAuth v5 runs in two contexts: middleware (edge) and route handlers
(Node). bcrypt only works in Node. Split:

- **`auth.config.ts`** — middleware-safe. Callbacks only. No bcrypt,
  no file I/O. Imported by `middleware.ts`.
- **`auth.ts`** — full config with `CredentialsProvider` that calls
  `verifyPassword()` (bcrypt). Imported by server components / actions.
- **`auth-handlers.ts`** — re-exports NextAuth handlers for the
  App Router API route.
- **`app/api/auth/[...nextauth]/route.ts`** — pins `runtime = "nodejs"`
  so the full config runs.

**Golden rule:** don't import `auth.ts` from anything that might run on
the edge. If middleware starts failing with "bcrypt not supported",
that's the leak.

---

## Session shape

JWT, with custom claims:

```ts
// auth.config.ts callbacks
token.role = user.role;   // "admin_creator" | "admin_manager" | "user"
token.uid  = user.id;
session.user.role = token.role;
session.user.id   = token.uid;
```

Read via `await auth()` in server components / `useSession()` in client.

---

## Landing page composition

`app/page.tsx` composes sections in visual-story order:

```
<Header />            fixed, outside page.tsx (in layout.tsx actually — check)
<Hero />              hero photo, CTAs, stats
<Services />          7 photo cards, click → #quote
<Trust />             dark wood, 6 numbered promises
<Quote />             dark concrete, QuickMessage | StepByStep wizard
<Gallery />           2x2-hero photo grid
<Testimonials />      3 review cards (placeholder)
<ServiceArea />       stat blocks + town list + jobsite photo
<FAQ />               Radix accordion, 6 questions
<Footer />            dark wood, wordmark, sitemap, stealth Staff link
<ContactDock />       mobile-only fixed bottom dock
<BackToTop />         floating button after 800px scroll
```

Each section has `id="…"` + `scroll-mt-20` so the fixed header doesn't
clip anchor jumps. Every section (except Hero/Footer) has a
`<SectionNav>` rail at the bottom with ← prev / next → / Back to top.

---

## Server actions

### `app/actions/send-quote.ts`

```
Client form → sendQuote(QuoteInput) → {
  1. Zod parse (QuoteSchema)         → returns field errors if invalid
  2. Honeypot check (website field)  → silent success if filled
  3. appendLead(data)                → writes data/leads.json
  4. Resend email (if RESEND_API_KEY) → else console.info
  5. return { ok: true }
}
```

### `app/actions/auth.ts`

`loginAction`, `signupAction`, `signOutAction`. Each calls NextAuth
helpers. Returns `{ ok, error? }` shape for the client form.

---

## Data stores

Both are JSON files under `data/`, gitignored, lazy-loaded in-memory.

### `lib/leads.ts`

```
Lead = {
  id: string (nanoid),
  createdAt: ISO string,
  status: "new" | "contacted" | "scheduled" | "won" | "lost",
  service, details, name, contact, preferredMethod, zip?
}

appendLead(input)          add a new lead, default status "new"
listLeads()                return all, newest first
updateLeadStatus(id, s)    mutate status
```

### `lib/users.ts`

```
User = {
  id, email, name, role: "admin_creator" | "admin_manager" | "user",
  passwordHash, createdAt
}

verifyPassword(email, pw)  bcrypt.compare; returns user or null
findUserById(id)
createUser(input)          signup flow
isAdmin(role)              helper for middleware + header
```

Seed (bootstrap on first run): 3 users, all sharing hash for
`"change-me-now"`. **Rotate before any deploy.**

---

## Config surface

Everything business-facing lives in [`lib/config.ts`](../lib/config.ts):

```
BUSINESS   — name, phone, email, hours, address, credentials, Tawk IDs
IMAGES     — hero, marquee, services{key: url}, gallery[]
SERVICES   — array of {key, title, blurb, bullets, accent}
SERVICE_BY_KEY  — lookup helper
buildWhatsAppLink / buildSmsLink / buildMailtoLink / prefillForService
```

**Any time a section needs a business fact, import from here.** Do not
hard-code.

---

## Environment variables

`.env.local` (gitignored), read at build/runtime:

| Var | Purpose | Required? |
|-----|---------|-----------|
| `AUTH_SECRET` | NextAuth JWT signing | Yes (generated on first run) |
| `RESEND_API_KEY` | Quote form → email | No (falls back to console.info) |
| `QUOTE_TO_EMAIL` | Who receives quotes | No (falls back to `BUSINESS.email`) |
| `QUOTE_FROM_EMAIL` | From address | No (falls back to `quotes@example.com`) |
| `NEXT_PUBLIC_TAWK_PROPERTY_ID` | Tawk.to chat | No |
| `NEXT_PUBLIC_TAWK_WIDGET_ID` | Tawk.to chat | No |

Missing optional vars degrade gracefully — no crash, no chat widget, no
email.

---

## Deploy target

Not chosen yet. Next.js + Vercel is the path of least resistance.
Concerns if moving to another host:

- File-backed JSON store assumes persistent disk. Vercel serverless =
  ephemeral. Either (a) ship Postgres before deploy, or (b) deploy to
  a persistent-disk host like Fly.io / Railway for alpha.
- NextAuth needs `AUTH_URL` + `AUTH_SECRET` set in host env.
- `next.config.ts` allows `images.unsplash.com` — add your own
  image CDN when photos move off Unsplash.

See [LEAD_PIPELINE.md](LEAD_PIPELINE.md) for deploy-time lead persistence
decisions.

---

## Build + dev

```
npm run dev     # Turbopack dev server
npm run build   # production build (must stay green)
npm run start   # run the production build locally
```

Known stale-state gotcha: after heavy layout.tsx or config.ts edits,
the Turbopack dev server sometimes holds a cached error. Stop + restart
(`npm run dev`). If a prod build succeeds, the code is fine.

---

## Accessibility checkpoints

- Skip link at top of `<body>` → `#main` (currently `{children}` has no
  id — TODO: add `id="main"` to the first section after `<Header />`).
- Every section has `aria-labelledby` pointing to its heading.
- Every interactive element has a visible focus ring (`--amber`
  outline).
- Form errors link via `aria-describedby`.
- Hero/section photos are decorative (`alt=""` + `aria-hidden`).
- Gallery photos have real `alt` text from the label.

Target: Lighthouse a11y ≥ 95 on `/`.
