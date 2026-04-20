# CJ Contractor Site — Claude Context Index

> **Who this is for:** Claude Code sessions working on this codebase.
> **What this is:** A map, not a manual. Each pointer tells you *where* to go,
> not the full story. Follow the pointer only when the current task needs it.

---

## Project at a glance

- **Owner:** Carlos (user's brother) — contractor in Miramar, FL.
- **Status:** Alpha. Every copy/number/photo is placeholder. Brother has not yet
  signed off on content.
- **Stack:** Next.js 16 (App Router, Turbopack) · React 19 · Tailwind v4
  (via `@theme inline` in `app/globals.css`) · NextAuth v5 Credentials
  · Zod · React Hook Form · Radix UI · lucide-react.
- **Long-term:** may evolve into a subcontractor marketplace
  (leads routed to other trades). Auth roles (`admin_creator`,
  `admin_manager`, `user`) are scaffolded for that future.

---

## Docs cascade

Read the doc whose title matches your task. Don't read them all.

| Task | Start here |
| ---- | ---------- |
| Need to know what placeholders Carlos must fill in | [docs/CARLOS_DECISIONS.md](docs/CARLOS_DECISIONS.md) |
| Changing colors, fonts, buttons, layout | [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) |
| Adding/changing a route, auth rule, or data store | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) |
| Where leads go when the form is submitted | [docs/LEAD_PIPELINE.md](docs/LEAD_PIPELINE.md) |
| What copy/photos live where, and which are fake | [docs/CONTENT_MODEL.md](docs/CONTENT_MODEL.md) |
| Planning the next milestone | [docs/ROADMAP.md](docs/ROADMAP.md) |
| Onboarding a new Claude session / handoff prompt | [docs/HANDOFF.md](docs/HANDOFF.md) |

---

## Directory map (only paths you'll touch)

```
/app
  layout.tsx               root shell — fonts, metadata, global chrome
  globals.css              design tokens, .btn, .bg-wood, .bg-concrete
  page.tsx                 landing page (composes sections)
  actions/                 server actions (send-quote, auth)
  admin/                   /admin/* pages (login, dashboard, leads, users, settings)
  (auth)/                  /login, /signup
  account/                 customer account (read-only for now)
  api/auth/[...nextauth]/  NextAuth handler (runtime = "nodejs")
/components
  header/Header.tsx        fixed top bar, z-50
  sections/                Hero, Services, Trust, Quote, Gallery,
                           Testimonials, ServiceArea, FAQ, Footer
  contact/                 QuoteWizard, ContactMethods, ContactDock
  nav/                     SectionNav, BackToTop
  auth/                    AuthForm
/lib
  config.ts                BUSINESS + IMAGES + SERVICES (source of truth)
  schema.ts                Zod: QuoteSchema
  leads.ts                 file-backed lead store (data/leads.json)
  users.ts                 file-backed user store (data/users.json)
  utils.ts                 cn()
/data                      gitignored JSON stores (leads, users)
/docs                      this cascade
auth.ts + auth.config.ts   edge-safe split for NextAuth
middleware.ts              route gating (admin + account)
```

---

## Golden rules

1. **`lib/config.ts` is the single source of truth** for business info
   (phone, email, hours, license #, service list, photos). Never hard-code
   business facts in a component — add them to `BUSINESS` / `IMAGES` /
   `SERVICES` and import.

2. **Landing page sections compose in `app/page.tsx`.** The order is
   visual-story order (Hero → Services → Trust → Quote → Gallery →
   Testimonials → Area → FAQ → Footer). Changing order changes the
   narrative. Don't reorder without a reason.

3. **Every section has `id=` + `scroll-mt-20`** so the fixed header
   doesn't obscure anchor targets.

4. **Dark surfaces** (`.bg-wood`, `.bg-concrete`, hero) use
   `text-[var(--bone)]` with `/85` minimum opacity for body copy.
   Anything dimmer fails contrast on those backgrounds.

5. **Build is the contract.** `npm run build` must exit 0. Type errors
   are not someone else's problem.

6. **Don't mock what you can test.** Lead submission writes to
   `data/leads.json` + optionally emails via Resend. In dev without
   `RESEND_API_KEY` it logs and succeeds — works end-to-end.

---

## What's already decided (don't re-litigate)

- **Visual direction:** rugged craftsman (Filson / Shinola / Carhartt WIP).
  Warm wheat paper + dark ink + amber accent + Oswald display. Not
  editorial premium. Not tech startup.
- **Voice:** confident tradesman ("Built right. Built once.",
  "Tell us what's broke."). Not corporate. Not chirpy.
- **Header:** fixed, solid dark, always visible. Sign in pill + nav +
  Call CTA. `components/header/Header.tsx`.
- **Navigation pattern:** every section has a `SectionNav` rail at the
  bottom with ← prev, next →, and Back to top. Plus a floating
  `BackToTop` button after 800px scroll. Visitors should never feel
  stranded.
- **Quote form has two modes:** Quick message (name + contact + textarea)
  and Step-by-step wizard. Both go through the same `sendQuote` action.
- **Auth stack:** NextAuth v5 Credentials, file-backed users. Seed:
  `creator@cj.local.dev` / `manager@cj.local.dev` / `demo@cj.local.dev`
  — all with password `change-me-now`. Rotate before any deploy.
- **Admin surface is built** but unstyled against the new palette. Low
  priority until Carlos actually wants to use it.

---

## What's open (see CARLOS_DECISIONS.md)

Every placeholder — business name, phone, email, license #, photos,
testimonials, service list, social links, Tawk.to, Resend. Nothing is
hooked to Carlos's real info yet.

---

## If you're stuck

- Grep `lib/config.ts` first — most "where does X come from" questions
  end there.
- Build fails? Read the full error, don't narrow it. Turbopack errors
  often surface stale — restart dev server after big edits.
- Design doesn't look right? Check which surface you're on (light/dark)
  and whether you're using `--ink` vs `--bone` for text.
- Lost the thread? [docs/HANDOFF.md](docs/HANDOFF.md) is the onboarding prompt.
