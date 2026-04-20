# Carlos Decisions — what needs to be real before beta

> **Purpose:** a concrete checklist of every placeholder in the codebase,
> grouped so Carlos can answer in one sitting. Each item lists *where it
> lives*, *what the placeholder is*, and *the exact question to ask*.
>
> **How to use:** walk through with Carlos (phone or in person). Write
> answers in the **Answer:** field. After the call, a single edit session
> can populate everything — most answers land in `lib/config.ts`.

---

## Meta questions (ask first — these change scope)

These set the shape of the beta. Get these before filling in details.

### M1. Are we collecting leads through the site yet?

- **Why it matters:** if no, we can hide the wizard and keep only Call /
  WhatsApp buttons. If yes, we need his email and SMS to wire
  notifications.
- **Default if unsure:** yes — keep the wizard but leave Resend off so
  leads only go to the local JSON (which nobody monitors). Essentially
  dry-run mode.
- **Answer:** _______________________________________________

### M2. Is the goal right now to *attract clients*, or to *show people who already called* that you're legit?

- **Why it matters:** a "proof" site leans on photos + testimonials + credentials. A "lead-gen" site leans on the quote form + pricing + SEO copy. Same skeleton, different emphasis.
- **Default if unsure:** proof-first. Carlos's book-of-business comes
  from word of mouth; site backs that up.
- **Answer:** _______________________________________________

### M3. Do you want customer accounts (people can sign up and track their quote)?

- **Why it matters:** scaffolding exists (`/account`, `/signup`,
  `role: "user"`) but no one's using it. If no, we leave it but hide the
  link.
- **Default if unsure:** no. Remove from header UI; keep code behind
  the scenes for future.
- **Answer:** _______________________________________________

### M4. Who has admin access and what do they do with it?

- **Why it matters:** currently two seeded admins (`admin_creator` = me/designer,
  `admin_manager` = Carlos/ops). If only Carlos is admin, collapse to one
  role. If someone else handles leads, they need a login too.
- **Default if unsure:** one admin (Carlos) only. Creator login stays
  for dev work but isn't marketed.
- **Answer:** _______________________________________________

---

## 1. Identity — who the business is

All of these live in [`lib/config.ts`](../lib/config.ts) under `BUSINESS`.

| # | Field | Placeholder | Question |
|---|-------|-------------|----------|
| I1 | `name` | `"[Your Business Name]"` | What's the business name on paperwork? Any abbreviation? |
| I2 | `shortName` | `"[Business]"` | Short form for header + WhatsApp prefills? |
| I3 | `tagline` | `"Licensed contractors you can actually reach."` | Keep, tweak, or replace with your own line? |
| I4 | `yearsInBusiness` | `15` | How many years on the job? |
| I5 | `phone.raw` / `.display` | `+15555550123` / `(555) 555-0123` | Real phone for Call button? |
| I6 | `sms.raw` | `+15555550123` | Same number as `phone`, or a separate texting line? |
| I7 | `whatsapp.raw` | `15555550123` | Real WhatsApp number (digits only, country code first)? |
| I8 | `whatsapp.displayNote` | `"Replies within an hour, 7am–9pm"` | True? Adjust hours. |
| I9 | `email` | `hello@example.com` | Business email — this is where quotes will land. |
| I10 | `hours` | `"Mon–Sat, 7:00 AM – 8:00 PM"` | Real hours? |
| I11 | `emergencyLine` | `true` | Do you take emergency calls outside hours? |
| I12 | `address.city` | `"Miramar"` | Home base — confirm. |
| I13 | `address.region` | `"FL"` | State — confirm. |
| I14 | `address.serviceRadiusMiles` | `25` | How far will you travel for a normal job? |
| I15 | `serviceAreas[]` | 8 towns: Miramar, Pembroke Pines, Hollywood, Hialeah, Davie, Weston, Miami Gardens, Fort Lauderdale | Add/remove towns. Any we're missing? Hialeah feels far — keep? |
| I16 | `credentials.licenseNumber` | `"[LIC #0000000]"` | Real Florida GC license number — this appears in FAQ answers and footer. |
| I17 | `credentials.insured` | `true` | Confirm insurance in place. |
| I18 | `credentials.bonded` | `true` | Confirm bonded. |

---

## 2. Services — what we actually offer

All in [`lib/config.ts`](../lib/config.ts) under `SERVICES`. Currently 7
entries: `home`, `construction`, `pressure-washing`, `tile`, `bathroom`,
`doors`, `other`.

| # | Key | Current title / blurb | Question |
|---|-----|-----------------------|----------|
| S1 | `home` | "Home Repair" — drywall, trim, flooring, small fixes | Keep? Blurb accurate? |
| S2 | `construction` | "General Construction" — additions, framing, structural | Do you do structural? Or only cosmetic/repair? |
| S3 | `pressure-washing` | "Pressure Washing" — driveways, siding, decks | Keep? |
| S4 | `tile` | "Tile Work" — floors, showers, backsplashes, grout | Keep? |
| S5 | `bathroom` | "Bathroom Remodels" — full remodels + quick refreshes | Keep? |
| S6 | `doors` | "Doors & Entries" — interior, exterior, sliding, storm | Keep? |
| S7 | `other` | "Something Else?" — catch-all | Useful or confusing? |
| S8 | **Missing** | — | Anything you do that's NOT on this list? (roofing? painting? screen enclosures? drywall-only?) |
| S9 | **Bullets** | Each service has 3–4 bullet examples ("Drywall & paint", etc.) | Tell us which bullets to keep / change per service. |

---

## 3. Copy that has opinions

FAQ answers, testimonials, and the Trust promises all make claims in
Carlos's voice. Need him to sign off or rewrite.

### FAQ ([`components/sections/FAQ.tsx`](../components/sections/FAQ.tsx))

| # | Question | Current answer gist | Carlos confirms? |
|---|----------|---------------------|------------------|
| F1 | Free estimates? | Yes — always. Rough on phone, firm after visit. | Still true? |
| F2 | Licensed and insured? | Yes. [LIC #] + insured + bonded. | Fill real #. |
| F3 | How fast? | Same-day quote, start within a few days. Emergencies first. | Realistic? |
| F4 | Permits? | Yes, we pull when required. | True? |
| F5 | After I send the form? | Reply within an hour business hours. No call centers. | True? |
| F6 | Work outside the list? | Ask — we'll tell you straight, or refer. | True? |
| F7 | **Missing** | — | What questions do customers actually ask that aren't here? |

### Trust promises ([`components/sections/Trust.tsx`](../components/sections/Trust.tsx))

Six claims on the dark wood band. Each must be defensible.

| # | Claim | Carlos stands behind it? |
|---|-------|--------------------------|
| T1 | Licensed FL GC — [license #]. Proof on request. | Y / N |
| T2 | Insured crew — GL + workers' comp on every job. | Y / N |
| T3 | On-time or you don't pay. | Y / N — this is a strong promise, confirm it's OK |
| T4 | One point of contact — you call the owner. | Y / N |
| T5 | Clean-up before we leave. | Y / N |
| T6 | 1-year workmanship warranty. | Y / N — is it actually 1 year? |

### Testimonials ([`components/sections/Testimonials.tsx`](../components/sections/Testimonials.tsx))

Three placeholder reviews (J. Delgado / S. Brown / A. Nguyen). Labeled
"Real reviews pending." Options:

- **Option A:** Carlos provides 3+ real reviews (name initial OK,
  first-name + last-initial, town, job type, quote). Replace inline.
- **Option B:** Carlos doesn't have written reviews yet — we hide the
  section entirely until he does. Better than fake.
- **Option C:** Pull Google reviews via API when he has a Google
  Business profile. Needs setup.
- **Answer:** _______________________________________________

---

## 4. Images

All URLs in [`lib/config.ts`](../lib/config.ts) under `IMAGES`.
Everything is currently Unsplash stock — construction-flavored but
generic.

| # | Slot | Current | Question |
|---|------|---------|----------|
| P1 | `hero` | Unsplash rebar/jobsite photo | Replace with Carlos's real jobsite photo? (landscape, 1920w+, amber-warm tone if possible) |
| P2 | `services.home` through `services.other` | 7 distinct Unsplash photos | Replace with 7 real before/after or completed-work photos, one per service? |
| P3 | `gallery[]` | 6 Unsplash photos with fake labels (e.g., "Walk-in shower, Miramar") | Replace with 6 real completed jobs — each needs a short label + a one-word tag. |
| P4 | `marquee[]` | 6 Unsplash photos (currently not rendered anywhere — leftover) | Leave as-is or remove from config? |
| P5 | Area photo | Unsplash hero reused | Replace with a generic Broward jobsite photo. |

**Cheapest path:** Carlos sends 10–15 jobsite photos from his phone.
We pick the best ones, resize once to ~1600w, drop into `/public/photos/`,
and swap URLs in `config.ts`. Zero backend changes.

---

## 5. Lead pipeline — where a quote request goes

See [LEAD_PIPELINE.md](LEAD_PIPELINE.md) for the full flow.

| # | Decision | Current | Question |
|---|----------|---------|----------|
| L1 | Where do leads land? | `data/leads.json` on server + optional Resend email | Email to Carlos? SMS? Both? |
| L2 | Resend API key | Not set | Sign up for Resend, add `RESEND_API_KEY` + `QUOTE_TO_EMAIL` + `QUOTE_FROM_EMAIL` to `.env.local`. |
| L3 | Quote destination email | `QUOTE_TO_EMAIL` env var, defaults to `BUSINESS.email` | Dedicated inbox (`quotes@...`) or Carlos's personal? |
| L4 | From address | `QUOTE_FROM_EMAIL`, defaults to `quotes@example.com` | Verify a domain in Resend, pick a clean From. |
| L5 | SMS notification | Not implemented | Priority? Twilio would add it but isn't wired. |
| L6 | Honeypot spam guard | Yes (hidden `website` field) | Keep. Add reCAPTCHA later if spam picks up. |

---

## 6. Integrations

| # | Integration | Current | Question |
|---|-------------|---------|----------|
| N1 | Tawk.to live chat | Env vars `NEXT_PUBLIC_TAWK_PROPERTY_ID` + `WIDGET_ID` are empty → widget doesn't render | Do you want chat? If yes, create a Tawk account, paste IDs. If no, leave empty or remove code. |
| N2 | Social — Facebook | Empty | URL or remove. |
| N3 | Social — Instagram | Empty | URL or remove. |
| N4 | Social — Google Business | Empty | URL or remove (this one's worth having for reviews). |
| N5 | Analytics | None | Plausible? GA4? None? |
| N6 | Domain | None | What domain will this live at? |
| N7 | Hosting | Local only | Vercel (default for Next.js) or something else? |

---

## 7. Admin / auth

| # | Decision | Current | Question |
|---|----------|---------|----------|
| A1 | Seed emails | `creator@cj.local.dev`, `manager@cj.local.dev`, `demo@cj.local.dev` | Replace with real emails. Delete demo. |
| A2 | Passwords | All share hash for `"change-me-now"` | Must rotate before deploy. Generate bcrypt hashes for each. |
| A3 | Admin roles | `admin_creator` + `admin_manager` | Keep both or collapse to one? |
| A4 | Customer signup | Enabled at `/signup` but no link from site | Hide completely or leave ambient? |
| A5 | Real database | None — file-backed JSON | OK for alpha. Postgres + Prisma when leads > ~50/month. |

---

## After this call — implementation order

1. **Populate `lib/config.ts`** from answers to sections 1, 2, 6. One edit.
2. **Rewrite FAQ answers + Trust promises** from section 3.
3. **Drop real photos** into `/public/photos/` and swap URLs
   (section 4).
4. **Env vars** for Resend + Tawk (sections 5, 6). `.env.local` only —
   never commit.
5. **Rotate seed passwords** (section 7, A2) — generate with
   `node -e "console.log(require('bcryptjs').hashSync('NEW_PASS', 10))"`.
6. **Decide deploy target** (N7) and ship.

All of this is a single afternoon of work once answers are in hand.
