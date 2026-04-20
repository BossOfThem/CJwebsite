# Content Model — where every string and image lives

> **Scope:** a flat map of every placeholder on the site: what it is,
> where it lives in code, and which Carlos-decision it's waiting on.
> Read this when swapping copy, rotating a photo, or answering
> "where does X come from?"

> **Golden rule:** if it's a business fact (name, phone, hours, license,
> photo URL), it lives in [`lib/config.ts`](../lib/config.ts). If it's
> section-local copy (FAQ answer, Trust promise, testimonial quote), it
> lives in the section component. Hunt in those two places first.

---

## 1. `lib/config.ts` — `BUSINESS`

The single source of truth for business facts. Decision IDs link to
[CARLOS_DECISIONS.md](CARLOS_DECISIONS.md).

| Key | Current value | Type | Decision |
|-----|---------------|------|----------|
| `name` | `"[Your Business Name]"` | string | I1 |
| `shortName` | `"[Business]"` | string | I2 |
| `tagline` | `"Licensed contractors you can actually reach."` | string | I3 |
| `yearsInBusiness` | `15` | number | I4 |
| `phone.raw` | `"+15555550123"` | E.164 | I5 |
| `phone.display` | `"(555) 555-0123"` | display | I5 |
| `sms.raw` | `"+15555550123"` | E.164 | I6 |
| `whatsapp.raw` | `"15555550123"` | digits, CC first | I7 |
| `whatsapp.displayNote` | `"Replies within an hour, 7am–9pm"` | string | I8 |
| `email` | `"hello@example.com"` | string | I9 |
| `hours` | `"Mon–Sat, 7:00 AM – 8:00 PM"` | string | I10 |
| `emergencyLine` | `true` | boolean | I11 |
| `address.city` | `"Miramar"` | string | I12 |
| `address.region` | `"FL"` | string | I13 |
| `address.serviceRadiusMiles` | `25` | number | I14 |
| `serviceAreas[]` | 8 towns (Miramar, Pembroke Pines, Hollywood, Hialeah, Davie, Weston, Miami Gardens, Fort Lauderdale) | string[] | I15 |
| `social.facebook` | `""` | URL | N2 |
| `social.instagram` | `""` | URL | N3 |
| `social.google` | `""` | URL | N4 |
| `credentials.licenseNumber` | `"[LIC #0000000]"` | string | I16 |
| `credentials.insured` | `true` | boolean | I17 |
| `credentials.bonded` | `true` | boolean | I18 |
| `tawkPropertyId` | `env.NEXT_PUBLIC_TAWK_PROPERTY_ID \|\| ""` | string | N1 |
| `tawkWidgetId` | `env.NEXT_PUBLIC_TAWK_WIDGET_ID \|\| ""` | string | N1 |

**Consumed by:** Header, Hero, Trust, Quote, Gallery, ServiceArea, FAQ,
Footer, ContactMethods, ContactDock, QuoteWizard, send-quote action,
admin pages, sitemap, metadata.

---

## 2. `lib/config.ts` — `IMAGES`

All images hot-swap here. Currently Unsplash stock via the `U()` helper.
When Carlos sends real photos, drop them in `/public/photos/` and swap
the URL to `/photos/<filename>`.

| Slot | Current | Purpose | Decision |
|------|---------|---------|----------|
| `hero` | Unsplash `1504307651254…` (jobsite) | Full-bleed hero background | P1 |
| `marquee[6]` | 6 Unsplash construction photos | Currently **not rendered** anywhere — leftover | P4 |
| `services.home` | `1589939705384…` | Services section — Home Repair card | P2 |
| `services.construction` | `1541888946425…` | Services — General Construction | P2 |
| `services.pressure-washing` | `1590856029826…` | Services — Pressure Washing (was the broken ID, now live) | P2 |
| `services.tile` | `1552321554…` | Services — Tile Work | P2 |
| `services.bathroom` | `1584622650111…` | Services — Bathroom Remodels | P2 |
| `services.doors` | `1558618666…` | Services — Doors & Entries | P2 |
| `services.other` | `1503594384566…` | Services — Catch-all | P2 |
| `gallery[6]` | 6 distinct photos with `tag` + `label` each | Recent-work grid | P3 |

**Image sizes:** hero 1920w, service cards 900w, gallery 1000–1400w.
Unsplash `U()` handles the width query string. For real photos, resize
once before upload (`sharp` or Photoshop export). Target ~200 KB max.

**Ground rule:** **do not hot-link** real photos from Carlos's phone or
a Google Drive URL. Download, resize, commit to `/public/photos/`.

---

## 3. `lib/config.ts` — `SERVICES[]`

Seven entries, each rendered as a photo card on the landing page and as
a radio option in the QuoteWizard step flow.

| Key | Title | Blurb | Bullets | Decision |
|-----|-------|-------|---------|----------|
| `home` | Home Repair | Drywall, trim, flooring, small fixes | Drywall & paint / Flooring repair / Trim & molding / Handyman jobs | S1 |
| `construction` | General Construction | Additions, framing, structural | Framing & additions / Decks & porches / Permits handled / Licensed crew | S2 |
| `pressure-washing` | Pressure Washing | Driveways, siding, decks | Soft-wash siding / Concrete restoration / Deck prep / Gutter cleaning | S3 |
| `tile` | Tile Work | Floors, baths, backsplashes | Floor tile / Showers & tubs / Backsplashes / Grout & re-grout | S4 |
| `bathroom` | Bathroom Remodels | Full + refreshes | Full remodels / Vanity & fixtures / Shower conversions / Accessibility | S5 |
| `doors` | Doors & Entries | Interior, exterior, sliding, storm | Exterior / Interior / Sliding & patio / Storm | S6 |
| `other` | Something Else? | Catch-all | Free estimates / Honest quotes / One call, no runaround | S7 |

**Missing services** (roofing, painting, screen enclosures, etc.): S8 —
ask Carlos.

Each service also has an `accent` gradient (Tailwind `from-*/to-*`). Not
currently visible since cards use photos instead of gradients — safe to
ignore but kept in the type.

---

## 4. Section-local copy (hardcoded arrays)

These sit inside components because they're opinionated editorial,
not swappable business facts. When rewriting, keep the tradesman voice.

### `components/sections/Trust.tsx`

6 numbered standards on the dark wood band. Each must be defensible —
Carlos confirms at T1–T6:

1. Licensed FL GC (uses `BUSINESS.credentials.licenseNumber`)
2. Insured crew — GL + workers' comp
3. On-time or you don't pay
4. One point of contact — you call the owner
5. Clean-up before we leave
6. 1-year workmanship warranty

### `components/sections/Testimonials.tsx`

3 placeholder reviews (J. Delgado, S. Brown, A. Nguyen). Labeled
"Real reviews pending." Decision at section 3.Testimonials in
CARLOS_DECISIONS.md — keep placeholders, hide the section, or wire
Google Reviews.

### `components/sections/FAQ.tsx`

6 questions (F1–F6 in CARLOS_DECISIONS):

1. Do you do free estimates?
2. Are you licensed and insured? — pulls `credentials.licenseNumber`
3. How soon can you start?
4. Do you pull permits?
5. What happens after I submit the form?
6. Do you work outside your service list?

Questions Carlos might want to add go in F7.

---

## 5. Environment variables

Read at build/runtime. Live in `.env.local` (gitignored).

| Var | Consumer | Required? | Decision |
|-----|----------|-----------|----------|
| `AUTH_SECRET` | NextAuth JWT signing | **Yes** | — (auto-gen once) |
| `RESEND_API_KEY` | `app/actions/send-quote.ts` | No — degrades to `console.info` | L2 |
| `QUOTE_TO_EMAIL` | send-quote recipient | No — defaults to `BUSINESS.email` | L3 |
| `QUOTE_FROM_EMAIL` | send-quote From header | No — defaults to `quotes@example.com` | L4 |
| `NEXT_PUBLIC_TAWK_PROPERTY_ID` | `BUSINESS.tawkPropertyId` | No — empty = no widget | N1 |
| `NEXT_PUBLIC_TAWK_WIDGET_ID` | `BUSINESS.tawkWidgetId` | No | N1 |

Missing optional vars degrade gracefully. Don't commit `.env.local`.

---

## 6. Data stores (runtime-mutable content)

File-backed JSON under `data/` (gitignored). Created on first write.
See [LEAD_PIPELINE.md](LEAD_PIPELINE.md) for the read/write flow.

### `data/leads.json`

Written by `sendQuote` server action via `lib/leads.ts` →
`appendLead()`. Read by `/admin/leads` page via `listLeads()`.

Shape:
```ts
{ id, createdAt, status, service, details, name, contact,
  preferredMethod, zip? }
```

### `data/users.json`

Seeded on first boot with 3 users (creator / manager / demo) — password
`change-me-now` for all. Read via `findUserById` + `verifyPassword`.
Mutated at `/signup`. Admin-manageable via `/admin/users`.

Decision A1–A3: rotate passwords + replace seed emails before beta.

---

## 7. Derived / computed strings

Helpers in `lib/config.ts`:

- `buildWhatsAppLink(message)` → `https://wa.me/<raw>?text=<encoded>`
- `buildSmsLink(message)` → `sms:<raw>?body=<encoded>`
- `buildMailtoLink(subject, body)` → `mailto:<email>?…`
- `prefillForService(serviceKey?)` → `"Hi <shortName>, I'd like a
  quote for <title>."`

**Rule:** when building a tel/sms/wa/mailto link in a component, use
these helpers. Don't hand-roll the URL — you'll forget to encode
something.

---

## 8. What isn't a placeholder (don't touch)

These are decided and shouldn't be edited as part of a copy sweep:

- Section headline pairs (`"Tell us what's broke. / We'll tell you what
  it costs."`, `"Built right. / Built once."`). Voice choices — Carlos
  can veto but design owns these.
- Eyebrow labels and numbering (`01 / Services` … `07 / Straight
  answers`).
- Button labels (`"Call now"`, `"WhatsApp a photo"`, `"Text us"`,
  `"Get a quote"`).
- Error strings in `QuoteWizard` — they're UX, not business copy.

---

## Related

- [CARLOS_DECISIONS.md](CARLOS_DECISIONS.md) — the checklist of what he
  still has to decide, keyed to the IDs above.
- [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) — how these values render.
- [LEAD_PIPELINE.md](LEAD_PIPELINE.md) — what happens to form submissions.
