/**
 * Single source of truth for all business-facing details.
 * Swap placeholder values here when real business info is provided.
 */

export const BUSINESS = {
  name: "[Your Business Name]",
  tagline: "Licensed contractors you can actually reach.",
  shortName: "[Business]",
  yearsInBusiness: 15,
  phone: {
    raw: "+15555550123",
    display: "(555) 555-0123",
  },
  sms: {
    raw: "+15555550123",
  },
  whatsapp: {
    raw: "15555550123",
    displayNote: "Replies within an hour, 7am–9pm",
  },
  email: "hello@example.com",
  hours: "Mon–Sat, 7:00 AM – 8:00 PM",
  emergencyLine: true,
  address: {
    city: "Miramar",
    region: "FL",
    serviceRadiusMiles: 25,
  },
  serviceAreas: [
    { slug: "miramar",          name: "Miramar",          blurb: "Home base — same-day quotes on small jobs." },
    { slug: "pembroke-pines",   name: "Pembroke Pines",   blurb: "Five minutes up the road. We work Pines daily." },
    { slug: "hollywood",        name: "Hollywood",        blurb: "From Hollywood Hills to the beachside condos." },
    { slug: "hialeah",          name: "Hialeah",          blurb: "Se habla español. Permits pulled, jobs done right." },
    { slug: "davie",            name: "Davie",            blurb: "Ranch-style homes, pool decks, barn sheds — we know Davie." },
    { slug: "weston",           name: "Weston",           blurb: "HOA-friendly work. We read the rules before we quote." },
    { slug: "miami-gardens",    name: "Miami Gardens",    blurb: "Licensed, insured, and on the clock in your zip." },
    { slug: "fort-lauderdale",  name: "Fort Lauderdale",  blurb: "Downtown condos to Coral Ridge single-families." },
  ],
  social: {
    facebook: "",
    instagram: "",
    google: "",
  },
  credentials: {
    licenseNumber: "[LIC #0000000]",
    insured: true,
    bonded: true,
  },
  tawkPropertyId: process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID || "",
  tawkWidgetId: process.env.NEXT_PUBLIC_TAWK_WIDGET_ID || "",
  reviews: {
    // TODO: Carlos to wire Google Business Profile
    count: 0,
    average: 0,
    url: "",
  },
  seasonal: {
    stormInspection: true,
    hurricaneWindow: "Jun 1 – Nov 30",
  },
} as const;

/**
 * Image sources — all hot-swappable. Drop real photo URLs (S3, Cloudinary, local /public/...)
 * in these slots and the site picks them up with zero code changes.
 * Current values are curated Unsplash photos tuned for a rugged-craftsman feel.
 */
const U = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

export const IMAGES = {
  // Full-bleed hero: crew on a jobsite, warm tone, room for overlay copy
  hero: U("photo-1504307651254-35680f356dfd", 1920),
  // Marquee strip under hero
  marquee: [
    U("photo-1581094794329-c8112a89af12", 800),
    U("photo-1572883454114-1cf0031ede2a", 800),
    U("photo-1581578731548-c64695cc6952", 800),
    U("photo-1503594384566-461fe158e797", 800),
    U("photo-1504307651254-35680f356dfd", 800),
    U("photo-1590856029826-c7a73142bbf1", 800),
  ],
  // Services — one photo per service, keyed the same as SERVICES (all distinct)
  services: {
    home: U("photo-1589939705384-5185137a7f0f", 900),
    construction: U("photo-1541888946425-d81bb19240f5", 900),
    "pressure-washing": U("photo-1590856029826-c7a73142bbf1", 900),
    tile: U("photo-1552321554-5fefe8c9ef14", 900),
    bathroom: U("photo-1584622650111-993a426fbf0a", 900),
    doors: U("photo-1558618666-fcd25c85cd64", 900),
    other: U("photo-1503594384566-461fe158e797", 900),
  },
  // Recent-work gallery (all distinct, no pressure-washing stock)
  gallery: [
    { src: U("photo-1552321554-5fefe8c9ef14", 1400), tag: "Tile",         label: "Walk-in shower, Miramar" },
    { src: U("photo-1581094794329-c8112a89af12", 1000), tag: "Home repair", label: "Drywall + paint refresh" },
    { src: U("photo-1584622650111-993a426fbf0a", 1000), tag: "Bathroom",    label: "Guest bath remodel" },
    { src: U("photo-1558618666-fcd25c85cd64", 1000), tag: "Doors",        label: "Impact slider install" },
    { src: U("photo-1541888946425-d81bb19240f5", 1000), tag: "Framing",    label: "Covered patio addition" },
    { src: U("photo-1572883454114-1cf0031ede2a", 1000), tag: "Trim",        label: "Baseboard + crown" },
  ],
} as const;

export type ServiceKey =
  | "home"
  | "construction"
  | "pressure-washing"
  | "tile"
  | "bathroom"
  | "doors"
  | "other";

export type Service = {
  key: ServiceKey;
  title: string;
  blurb: string;
  bullets: string[];
  accent: string;
};

export const SERVICES: Service[] = [
  {
    key: "home",
    title: "Home Repair",
    blurb: "Drywall, trim, flooring, small fixes that keep your house tight.",
    bullets: ["Drywall & paint", "Flooring repair", "Trim & molding", "Handyman jobs"],
    accent: "from-amber-500/20 to-amber-500/5",
  },
  {
    key: "construction",
    title: "General Construction",
    blurb: "Additions, framing, and structural work done to code.",
    bullets: ["Framing & additions", "Decks & porches", "Permits handled", "Licensed crew"],
    accent: "from-sky-500/20 to-sky-500/5",
  },
  {
    key: "pressure-washing",
    title: "Pressure Washing",
    blurb: "Driveways, siding, decks — back to looking new.",
    bullets: ["Soft-wash siding", "Concrete restoration", "Deck prep", "Gutter cleaning"],
    accent: "from-cyan-500/20 to-cyan-500/5",
  },
  {
    key: "tile",
    title: "Tile Work",
    blurb: "Kitchens, baths, floors, backsplashes — laid level and clean.",
    bullets: ["Floor tile", "Showers & tubs", "Backsplashes", "Grout & re-grout"],
    accent: "from-emerald-500/20 to-emerald-500/5",
  },
  {
    key: "bathroom",
    title: "Bathroom Remodels",
    blurb: "Full remodels or quick refreshes — on time and on budget.",
    bullets: ["Full remodels", "Vanity & fixtures", "Shower conversions", "Accessibility upgrades"],
    accent: "from-violet-500/20 to-violet-500/5",
  },
  {
    key: "doors",
    title: "Doors & Entries",
    blurb: "Interior, exterior, sliding, storm — installed right.",
    bullets: ["Exterior doors", "Interior doors", "Sliding & patio", "Storm doors"],
    accent: "from-rose-500/20 to-rose-500/5",
  },
  {
    key: "other",
    title: "Something Else?",
    blurb: "If it involves a house and a toolbox, just ask.",
    bullets: ["Free estimates", "Honest quotes", "One call, no runaround"],
    accent: "from-stone-500/20 to-stone-500/5",
  },
];

export const SERVICE_BY_KEY = Object.fromEntries(
  SERVICES.map((s) => [s.key, s]),
) as Record<ServiceKey, Service>;

export function buildWhatsAppLink(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${BUSINESS.whatsapp.raw}?text=${encoded}`;
}

export function buildSmsLink(message: string): string {
  // iOS uses `&body=`, Android uses `?body=` — ?body= works on both modern OSes.
  const encoded = encodeURIComponent(message);
  return `sms:${BUSINESS.sms.raw}?body=${encoded}`;
}

export function buildMailtoLink(subject: string, body: string): string {
  return `mailto:${BUSINESS.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}

export function prefillForService(serviceKey?: ServiceKey): string {
  const svc = serviceKey ? SERVICE_BY_KEY[serviceKey]?.title : undefined;
  return svc
    ? `Hi ${BUSINESS.shortName}, I'd like a quote for ${svc.toLowerCase()}.`
    : `Hi ${BUSINESS.shortName}, I'd like a quote on a project.`;
}
