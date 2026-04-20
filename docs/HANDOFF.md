# Handoff — paste this into a fresh Claude session

> **Use this when:** starting a new Claude Code session on this project
> and the previous context is gone. The block below is self-contained —
> paste it in, and the new session will orient without re-exploring.
>
> **Maintainer note:** if you add a major feature or change a decision,
> update the block. It should always reflect "what's true right now."

---

## The prompt

```
You're picking up work on a contractor lead-gen site at C:\CJWEBSITE.
It's built by the user as a surprise for their brother Carlos, a
contractor in Miramar, FL. Alpha state — every piece of business copy
is a placeholder.

STACK
- Next.js 16 App Router (Turbopack), React 19
- Tailwind v4 via @theme inline in app/globals.css
- NextAuth v5 Credentials with edge-safe split (auth.config.ts +
  auth.ts + middleware.ts)
- Zod + React Hook Form, Radix UI, lucide-react
- File-backed JSON stores at data/leads.json and data/users.json
- Resend for quote emails (optional — degrades to console.info)
- Fonts: Oswald (display), Inter (body), JetBrains Mono (labels)

READ THESE FIRST (in order, only what your task needs)
1. CLAUDE.md — root index. Directory map + golden rules + what's decided.
2. docs/CARLOS_DECISIONS.md — every placeholder, grouped, with IDs
   (I1–I18 identity, S1–S9 services, F1–F7 FAQ, T1–T6 Trust, P1–P5
   photos, L1–L6 lead pipeline, N1–N7 integrations, A1–A5 auth,
   M1–M4 meta scope). When you need to know "what's fake," this is
   the answer.
3. Pick the topical doc that matches your task:
   - docs/ARCHITECTURE.md — routes, auth split, data flow
   - docs/DESIGN_SYSTEM.md — tokens, typography, components
   - docs/CONTENT_MODEL.md — where every string/image lives
   - docs/LEAD_PIPELINE.md — quote form → admin inbox
   - docs/ROADMAP.md — alpha/beta/prod lanes

GOLDEN RULES (non-negotiable)
- lib/config.ts is the single source of truth for BUSINESS, IMAGES,
  SERVICES. Never hard-code business facts in a component.
- Landing page section order lives in app/page.tsx: Hero → Services →
  Trust → Quote → Gallery → Testimonials → ServiceArea → FAQ → Footer.
  Don't reorder without a reason.
- Every section has id="..." + scroll-mt-20 and ends with a SectionNav
  (except Hero and Footer).
- Dark surfaces (.bg-wood, .bg-concrete, hero) use text-[var(--bone)]
  with /85 opacity minimum for body.
- One accent color: amber (#E0A033). No rounded-lg, no gradients
  except photo tints.
- Voice: confident tradesman ("Tell us what's broke."). Not corporate,
  not chirpy, no hedging.
- npm run build must exit 0. Type errors are yours to fix.

WHAT'S DONE (don't re-do)
- Rugged-craftsman redesign across all sections (Phase 2).
- Fixed header with Sign in + Call, always visible.
- QuoteWizard has Quick (freeform textarea) and Step-by-step modes,
  same Zod schema and server action.
- Navigation: fixed Header + SectionNav rails + BackToTop + mobile
  ContactDock — four paths home at all times.
- Photos are distinct, contrast AA on dark surfaces.
- Docs cascade: CLAUDE.md + 6 topical docs under docs/.

WHAT'S OPEN
- Carlos has not answered CARLOS_DECISIONS.md. Every placeholder
  (name, phone, email, license, photos, FAQ, testimonials) is still
  fake.
- Not deployed. Decision on Fly.io vs. Vercel+Postgres is in
  LEAD_PIPELINE.md.
- Admin surface exists but is unstyled against the new palette —
  low priority until Carlos uses it.
- .env.local only has AUTH_SECRET. RESEND_API_KEY, QUOTE_TO_EMAIL,
  QUOTE_FROM_EMAIL, NEXT_PUBLIC_TAWK_* are unset.

SEED CREDENTIALS (dev only — rotate before deploy)
- creator@cj.local.dev / change-me-now  → admin_creator
- manager@cj.local.dev / change-me-now  → admin_manager
- demo@cj.local.dev    / change-me-now  → user

TYPICAL FIRST MOVE
- If user wants a visual tweak: read DESIGN_SYSTEM.md + the target
  section under components/sections/.
- If user wants a copy tweak: read CONTENT_MODEL.md to find the
  file, then edit.
- If user wants Carlos's answer applied: open CARLOS_DECISIONS.md,
  find the ID, edit lib/config.ts (identity/services/images) or the
  relevant section component (FAQ/Trust/Testimonials).
- If user wants to deploy: read LEAD_PIPELINE.md deploy table.
- If anything about lead pipeline: read LEAD_PIPELINE.md first.
- If anything about auth: read ARCHITECTURE.md edge-split section.

VERIFICATION
- npm run build (must exit 0)
- npm run dev → http://localhost:3000
- Smoke test: submit a quote from /, confirm data/leads.json gains
  an entry, confirm admin sees it at /admin/leads
  (log in as creator@cj.local.dev).

DO NOT
- Re-litigate the visual direction. "Rugged craftsman" is decided.
- Suggest editorial-premium / SaaS-clean / tech-startup aesthetics.
- Add a second accent color.
- Ship Postgres or analytics without the user asking.
- Invent placeholder data that Carlos hasn't confirmed — leave
  brackets or obvious fake strings so it's clear what's unreviewed.

Start by reading CLAUDE.md, then ask the user what they want to
change.
```

---

## When to update this file

Update the prompt block above when any of these change:

- A golden rule is added or broken on purpose.
- A new topical doc is added to the cascade (update the "read these
  first" list).
- A decision moves from open to closed (update "what's done" / "what's
  open").
- Seed credentials change.
- The stack changes (framework version, auth provider, DB).
- The typical first-move recipes change.

Don't bloat it. If the prompt grows past ~100 lines, something should
move into a topical doc instead. The prompt is the map, not the manual.

---

## How to use the handoff prompt

1. Copy the fenced block above (everything between the triple-backticks).
2. Paste as the *first message* in a fresh Claude Code session rooted at
   `C:\CJWEBSITE`.
3. The new session reads CLAUDE.md, orients, and waits for your actual
   request.
4. Give your actual request as the *second message*.

This saves ~15 minutes of re-exploration per session and prevents the
new session from suggesting undoing decisions the previous one made.
