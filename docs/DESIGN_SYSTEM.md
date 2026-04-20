# Design System — tokens, type, components

> **Scope:** what colors, fonts, spacing, and component patterns exist,
> and how to stay consistent when adding a new section. Read this before
> introducing a new surface, a new button, or a new heading size.

---

## The one-line summary

**Rugged craftsman.** Warm wheat paper + dark ink + amber accent. Heavy
condensed Oswald for display; Inter for body; JetBrains Mono for labels.
No rounded corners beyond 2px. No gradients except to darken photos.
Every interactive element gets a visible amber focus ring.

Inspiration: Filson, Shinola, Best Made, Carhartt WIP. Not Stripe. Not
Notion. Not a SaaS.

---

## Color tokens

All live in `app/globals.css` as CSS custom properties inside
`@theme inline`. Use them via `text-[var(--token)]` or
`bg-[var(--token)]` — do not re-declare them.

### Paper / light surfaces

| Token | Hex | Role |
|-------|-----|------|
| `--paper` | `#F4ECD8` | default light surface (page, cards) |
| `--paper-2` | `#ECE2C8` | alt light surface (striping sections) |
| `--ink` | `#141210` | primary text on paper, also the dark header bg |
| `--ink-soft` | `#3C362E` | secondary text on paper |
| `--line` | `rgba(20,17,13,0.10)` | hairline borders on paper |
| `--line-strong` | `rgba(20,17,13,0.18)` | card borders / form borders |

### Dark / shadow surfaces

| Token | Hex | Role |
|-------|-----|------|
| `--shadow-bg` | `#141210` | darkest surface (hero, footer) |
| `--bone` | `#F4ECD8` | primary text on dark |
| `--shadow-ink` | `#E8DFC7` | default text on dark |
| `--shadow-ink-soft` | `#D4C9AC` | secondary text on dark (AA-checked) |
| `--shadow-line` | `rgba(244,236,216,0.15)` | dividers on dark |

### Accent

| Token | Hex | Role |
|-------|-----|------|
| `--amber` | `#E0A033` | single accent — CTAs, active state, spans in headlines, focus rings |
| `--amber-ink` | `#141210` | ink that sits on amber (buttons) |

**Rule:** one accent. Don't add red, green, or blue. If you need urgency
use amber. If you need success use amber. If you need a third color
you're overloading the page.

---

## Surfaces (named backgrounds)

Defined in `app/globals.css`. Apply as a class.

| Class | Texture | When |
|-------|---------|------|
| default (none) | flat `--paper` | light sections (Services, Gallery, FAQ) |
| `.bg-wood` | dark wood grain gradient + `--shadow-bg` | Trust, Footer — heavy "builder" moments |
| `.bg-concrete` | subtle noise on `--shadow-bg` | Quote — form surface against a jobsite feel |
| `.bg-grid` | faint ink grid on paper | optional overlay on light |
| `.bg-grid-light` | faint bone grid on dark | optional overlay on wood/concrete |
| `.rough-top` | torn-paper SVG mask | divider between hero and next section |

Dark surfaces require `text-[var(--bone)]` base + `/85` minimum opacity
for body copy. Lower than `/80` on wood/concrete fails contrast.

---

## Typography

Wired in `app/layout.tsx` via `next/font/google`:

- **Oswald** — `--font-display`, used via `.font-display` utility.
  Weights: 400, 500, 600, 700. Condensed, heavy, shout-y.
- **Inter** — default body font (Tailwind `font-sans`). 400/500/600.
- **JetBrains Mono** — `--font-mono`, used via `font-mono`. 400/500/600/700.

### Scale (display)

| Element | Size | Class recipe |
|---------|------|--------------|
| Hero H1 | 56 → 136px | `font-display text-[56px] leading-[0.92] sm:text-[96px] md:text-[136px] md:leading-[0.88]` |
| Section H2 | 40 → 72px | `font-display text-[40px] md:text-[72px] leading-[0.95]` |
| Section H3 | 24 → 28px | `font-display text-[24px] md:text-[28px]` |
| Stat number | 40 → 52px | `font-display text-[40px] md:text-[52px] leading-none` |

Always include a `<span className="text-[var(--amber)]">` on line 2 of
section headlines — this is the signature move. Example:
`"Tell us what's broke. / <span>We'll tell you what it costs.</span>"`

### Scale (body + UI)

- Body: 16–18px Inter, `leading-[1.6]`, color depends on surface.
- Eyebrow: `.eyebrow` → 12px mono, 700, `tracking-[0.22em]`, uppercase,
  color `--amber`. Always prefixed with `0N / Label` (see below).
- Button label: 13–14px, weight 600, sentence case. Never uppercase on
  buttons — uppercase is reserved for eyebrows and mono labels.
- Mono label: 11–12px, 600, tracking 0.16–0.2em, uppercase. Used for
  nav, footer headings, stat subtitles.

### Eyebrow numbering

Every section gets a numbered eyebrow matching its page order:

```
01 / Services
02 / Standards      (Trust)
03 / Get a quote    (Quote)
04 / Recent work    (Gallery)
05 / Neighbors      (Testimonials)
06 / Coverage       (ServiceArea)
07 / Straight answers (FAQ)
```

If you add a section, renumber. Hero has no eyebrow.

---

## Buttons

All in `app/globals.css`. Do not inline-style a button.

| Class | Surface | Use |
|-------|---------|-----|
| `.btn .btn-primary` | amber fill, ink text | primary CTA (Call, Submit) |
| `.btn .btn-dark` | ink fill, bone text | secondary CTA on paper |
| `.btn .btn-ghost` | transparent + ink border | ternary CTA on paper |
| `.btn .btn-ghost-light` | transparent + bone border | ternary CTA on dark |

All buttons are min-height 44px (tap target), 2px border radius, 14px
horizontal padding. Icons are 16px lucide-react, rendered with
`aria-hidden`.

Don't invent a new variant. If you think you need one, you don't —
use `.btn-primary` for the action that matters and `.btn-ghost*` for
everything else.

---

## Layout rhythm

### Section skeleton

```tsx
<section id="slug" className="scroll-mt-20 [surface]" aria-labelledby="slug-heading">
  <div className="mx-auto max-w-6xl px-6 md:px-10 py-20 md:py-28">
    <p className="eyebrow">0N / Label</p>
    <h2 id="slug-heading" className="font-display text-[40px] md:text-[72px] leading-[0.95] mt-4">
      First line.
      <br />
      <span className="text-[var(--amber)]">Second line.</span>
    </h2>
    <p className="mt-8 max-w-2xl text-[17px] md:text-[20px] leading-[1.55]">
      Body copy — tradesman voice. Short sentences. No hedging.
    </p>
    {/* content */}
    <SectionNav prev={…} next={…} surface="light|dark" />
  </div>
</section>
```

### Spacing

- Section padding: `py-20 md:py-28` (paper), `py-24 md:py-32` (dark).
- Content max width: `max-w-6xl` (72rem). Headlines can break out to
  `max-w-5xl` if they want to be loud.
- Gap between eyebrow and H2: `mt-4`. Between H2 and body: `mt-8`.
  Between body and CTAs: `mt-10`. Between content and SectionNav:
  `mt-16 md:mt-24`.

### Anchors and scroll-margin

Every section needs `id="…"` and `scroll-mt-20` (or `scroll-mt-24`) so
the fixed 56px header doesn't clip anchor jumps.

---

## Forms

React Hook Form + Zod. See `components/contact/QuoteWizard.tsx` for the
canonical example.

- Labels: 12px mono, 600, tracking `0.16em`, uppercase, color
  `--ink-soft` on paper / `--bone/70` on dark.
- Inputs: `h-11 px-3 bg-transparent border border-[var(--line-strong)]
  focus:border-[var(--amber)] focus:outline-none focus:ring-2
  focus:ring-[var(--amber)]/40 rounded-sm`.
- Errors: 12px, color `--amber` on dark / `#B03A2E` on paper. Wired via
  `aria-describedby` to the input.
- Honeypot: hidden `<input name="website" tabIndex={-1} aria-hidden
  className="sr-only" />` — if filled, server action silent-succeeds.

---

## Navigation

Four redundant paths back to the top of the page. Redundancy is the
feature — visitors never feel stranded:

1. **`components/header/Header.tsx`** — fixed top-0 z-50, always visible,
   home link + anchor nav + Sign in + Call.
2. **`components/nav/SectionNav.tsx`** — end-of-section rail with
   `← prev`, `next →`, and `Back to top`. Every section except Hero and
   Footer ends with one.
3. **`components/nav/BackToTop.tsx`** — client-only floating button
   bottom-right, appears after 800px scroll. Desktop only.
4. **`components/contact/ContactDock.tsx`** — mobile-only fixed bottom
   dock: Call / WhatsApp / Text. Not strictly navigation but keeps the
   primary action one tap away.

---

## Accessibility baseline

- Skip link to `#main` at top of `<body>`.
- Every section has `aria-labelledby` pointing to its heading.
- Every interactive element has a visible focus ring (`--amber`).
- Form errors wired via `aria-describedby`.
- Decorative photos: `alt=""` + `aria-hidden`. Content photos: real
  `alt` text.
- Target: Lighthouse a11y ≥ 95 on `/`.

If you add a new pattern, test it with keyboard-only and with
VoiceOver / NVDA. If the focus disappears anywhere, fix it before merging.

---

## Don't do

- Don't add a new color token. If amber doesn't work for your use case,
  you're solving the wrong problem.
- Don't add rounded-lg/xl/2xl. `rounded-sm` (2px) is the ceiling.
  Hard edges are part of the voice.
- Don't use gradients for decoration. The hero photo tint and torn-paper
  divider are the only exceptions.
- Don't write body copy in Oswald. Oswald is for display only — it's
  hard to read at paragraph sizes.
- Don't uppercase button labels. Uppercase is reserved for eyebrows and
  mono labels.
- Don't skip the SectionNav on a new section. The four-path-home rule
  is a rule.

---

## Related

- [CONTENT_MODEL.md](CONTENT_MODEL.md) — what to fill into these
  components.
- [ARCHITECTURE.md](ARCHITECTURE.md) — how the components connect to
  data and auth.
