# Roadmap — alpha, beta, prod

> **Scope:** what ships when. Three lanes. Each milestone has an
> explicit exit criterion so you know when it's done.
>
> **How to read this:** the top of each lane is "what's done." The
> bottom is "what's next." When a bottom item ships, it moves up and
> the lane below it gets its first item promoted.

---

## Alpha — now (2026-04)

**Goal:** the site looks and feels right, top to bottom, with
placeholder content. Carlos can open it on his phone and say "yes,
this represents me" before spending time on real content.

**Exit criterion:** Carlos has reviewed `/` on mobile + desktop and
signed off on the design direction. Placeholders stay.

### Done

- [x] Auth scaffolding: NextAuth v5 edge-split, credentials, 3 seed users,
      middleware gating `/admin/*` and `/account/*`.
- [x] Admin surface: `/admin/dashboard`, `/admin/leads`, `/admin/users`,
      `/admin/settings` (placeholder), `/admin/login` (stealth).
- [x] Landing page sections in rugged-craftsman direction: Hero, Services,
      Trust (wood), Quote (concrete), Gallery, Testimonials, ServiceArea,
      FAQ, Footer (wood).
- [x] Navigation redundancy: fixed Header + SectionNav rails +
      BackToTop + mobile ContactDock.
- [x] QuoteWizard with Quick + Step modes, same Zod schema.
- [x] `sendQuote` server action → `appendLead` → Resend (optional).
- [x] Distinct Unsplash photos per service + 6-photo gallery.
- [x] Contrast pass on dark surfaces (bone/85 body, lifted shadow-ink-soft).
- [x] Docs cascade: CLAUDE.md + 6 topical docs.

### Remaining

- [ ] Carlos reviews the site on his phone. Captures yes/no for the
      visual direction.

---

## Beta — "Carlos's real content is live"

**Goal:** every placeholder is replaced with a real answer. The site
represents Carlos's actual business, hosted on a real domain, accepting
real leads via email.

**Exit criterion:** Carlos's name/phone/email/license on the site;
10 real photos in the gallery + service cards; Resend wired with a
verified domain; site on a permanent URL that he can hand out.

### Prerequisites

- Carlos answers [CARLOS_DECISIONS.md](CARLOS_DECISIONS.md) meta
  questions (M1–M4) and Identity (I1–I18).
- Carlos sends 10–15 jobsite photos from his phone.
- Decision on hosting (see LEAD_PIPELINE.md deploy table).

### Work items

1. **Populate `lib/config.ts`** from I1–I18 answers. Single edit.
2. **Rewrite FAQ answers + Trust promises** from F1–F7 and T1–T6.
3. **Drop photos** into `/public/photos/`, resize to ~1600w, swap
   `IMAGES` URLs.
4. **Testimonials decision:** 3 real + hide, or Google Reviews API
   stub.
5. **Env vars:**
   - Sign up for Resend.
   - Verify a domain (Carlos's domain — purchase if needed).
   - Set `RESEND_API_KEY`, `QUOTE_TO_EMAIL`, `QUOTE_FROM_EMAIL`.
6. **Rotate seed passwords.** Generate bcrypt hashes for Carlos's real
   admin account. Delete `demo@` seed.
7. **Deploy.** Fly.io (recommended for file-backed JSON) or decide to
   pay the migration cost now (see Prod lane).
8. **Domain + DNS.** Point to the deployed host. Set `AUTH_URL` env.
9. **Smoke test end-to-end:** submit a lead from Carlos's phone, confirm
   email arrives, confirm `/admin/leads` shows it.

### Not in beta (deferred)

- Postgres / Prisma migration.
- Analytics.
- Real SEO work (schema.org, sitemap beyond the basics).
- Any customer-account-portal polish.
- Social sign-in.

---

## Prod — "beyond a brochure"

**Goal:** the site can carry lead volume and Carlos can make operational
decisions from what it captures.

**Exit criterion:** ambiguous — this lane is open-ended. Each item ships
when it stops being optional.

### Candidate items, rough priority

1. **Postgres + Prisma.** Replace `data/*.json` with a real database.
   Triggered by any of: lead volume > ~50/month, multi-user admin,
   Vercel hosting, Carlos asking for lead history analytics.
2. **Analytics.** Plausible (privacy-friendly) by default. GA4 only if
   Carlos specifically wants it.
3. **SMS notification** on new leads via Twilio (L5 in CARLOS_DECISIONS).
4. **reCAPTCHA v3** if honeypot stops being enough.
5. **Schema.org / LocalBusiness** structured data. Google Business
   Profile linked.
6. **Real images pipeline:** `next/image` with a CDN (Cloudinary or
   Vercel's built-in), AVIF support, proper blur placeholders.
7. **Service-detail pages.** `/services/bathroom-remodels` etc. with
   longer-form copy + SEO-targeted headings.
8. **Job case studies.** Pick 3–5 completed jobs, write 300-word stories
   with before/after.
9. **Customer account portal** (M3 in CARLOS_DECISIONS). Only if Carlos
   decides it's worth the UX surface area.
10. **Multi-tenant / subcontractor marketplace.** The long-game — route
    leads to other trades (cleaning, trash, landscaping). See the
    auto-memory `project_subcontractor_marketplace.md` for context.
    This is a *different product* sharing a skeleton; don't ship
    pieces of it inside the contractor site.

### Never (explicit no's)

- No live-chat widget that auto-opens. Tawk.to is fine as a quiet
  option but don't add modals that interrupt.
- No email collection popup. The Quote form is the capture surface.
- No dark-pattern cookie banners. Plausible doesn't need one.
- No stock testimonial text. Real, hidden, or Google — nothing in between.

---

## Decision log (why we're not doing X yet)

- **Postgres for alpha:** overkill. File-backed JSON reads cleanly and
  ships in minutes. Migration is mechanical when volume justifies.
- **next/image for alpha:** swapping `<img>` works, but the real win is
  when we also move to a CDN. Bundled decision — do both together.
- **Customer accounts for alpha:** scaffolding exists but no real user
  story. Hiding the UI entry point until Carlos wants it.
- **Admin UI restyle for alpha:** functional > pretty. Carlos will see
  the admin 10x less than the landing page. Ship content first.

---

## How to move an item up a lane

1. Check the prerequisites are met.
2. Open [CARLOS_DECISIONS.md](CARLOS_DECISIONS.md) and fill in any
   related answers.
3. Open the most relevant doc in the cascade and edit there
   (DESIGN_SYSTEM / CONTENT_MODEL / LEAD_PIPELINE / ARCHITECTURE).
4. Ship the code change.
5. Update this file: strike the item in the lower lane, add it to the
   "Done" block of the lane it moved to.

---

## Related

- [CARLOS_DECISIONS.md](CARLOS_DECISIONS.md) — the gating questions for
  Beta.
- [LEAD_PIPELINE.md](LEAD_PIPELINE.md) — the hosting / DB decision.
- [HANDOFF.md](HANDOFF.md) — paste-ready prompt for the next session.
