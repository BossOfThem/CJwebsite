# CJ Contractor Site — Alpha

Lead-generation web app for a contracting business covering home repair, construction,
pressure washing, tile, bathroom remodels, doors, and more. Built for South Florida
(Miramar / Broward County) with visitor-friendly contact on every channel.

## Stack

- **Next.js 16** (App Router, Turbopack) + **TypeScript**
- **Tailwind CSS v4** + CSS variables for theming
- **Radix UI** primitives
- **react-hook-form** + **Zod** for the quote wizard
- **Resend** for transactional email (server action)
- **Tawk.to** live chat (script tag, env-gated)
- **PWA** installable via `app/manifest.ts`
- Target host: **Vercel**

## Run

```bash
npm install
cp .env.local.example .env.local   # fill in API keys when ready
npm run dev
```

Open http://localhost:3000

## Configure the business

All business-facing strings live in **`lib/config.ts`**. Swap name, phone, email,
WhatsApp number, service area, license number, and hours here — no other file
edits needed to go from alpha → real data.

Required env vars before live email + chat:

| Var | Where |
|---|---|
| `RESEND_API_KEY` | [resend.com](https://resend.com) |
| `QUOTE_TO_EMAIL` | your inbox |
| `QUOTE_FROM_EMAIL` | verified Resend domain |
| `NEXT_PUBLIC_TAWK_PROPERTY_ID` | [tawk.to dashboard](https://dashboard.tawk.to) |
| `NEXT_PUBLIC_TAWK_WIDGET_ID` | same |

Without these, the site still works — form submissions log to the server
console, and the chat widget is simply not rendered.

## Sections

1. Hero — headline + 4 contact CTAs + proof card
2. Services — 7 cards
3. Trust strip — licensed, insured, on-time, warranty, owner-operated
4. Quote — 3-step wizard + side-rail contact options
5. Gallery — placeholder masonry
6. Testimonials — 3 sample reviews
7. Service area — Miramar + ~25 mi radius
8. FAQ — accordion
9. Footer — contact repeat + links
10. Sticky mobile contact dock (Call · WhatsApp · Text)

## Accessibility

- 18px base body type, 20px+ CTAs, ≥56px touch targets
- WCAG AA+ contrast on primary surfaces
- Full keyboard navigation, visible focus ring, skip-to-content link
- Proper `tel:` / `sms:` / `mailto:` / `wa.me` schemes
- `prefers-reduced-motion` respected

## Deploy to Vercel

```bash
npx vercel
```

Set env vars in the Vercel dashboard. Push to `main` → auto-deploy.
