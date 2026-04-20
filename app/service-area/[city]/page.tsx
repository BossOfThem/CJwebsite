import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import { Header } from "@/components/header/Header";
import { Services } from "@/components/sections/Services";
import { Trust } from "@/components/sections/Trust";
import { Quote } from "@/components/sections/Quote";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/sections/Footer";
import { BUSINESS, IMAGES, buildWhatsAppLink, prefillForService } from "@/lib/config";

type Params = { city: string };

type Area = { slug: string; name: string; blurb?: string };

export function generateStaticParams() {
  return BUSINESS.serviceAreas.map((a) => ({ city: a.slug }));
}

function find(slug: string): Area | undefined {
  return (BUSINESS.serviceAreas as readonly Area[]).find((a) => a.slug === slug);
}

export async function generateMetadata(
  { params }: { params: Promise<Params> },
): Promise<Metadata> {
  const { city } = await params;
  const area = find(city);
  if (!area) return { title: "Not found" };
  const title = `${area.name} Contractor — ${BUSINESS.shortName}`;
  const description = `Licensed contractor serving ${area.name}, ${BUSINESS.address.region}. Home repair, remodels, tile, pressure washing, doors. ${area.blurb ?? ""}`.trim();
  return {
    title,
    description,
    alternates: { canonical: `/service-area/${area.slug}` },
    openGraph: { title, description, type: "website" },
  };
}

export default async function CityPage({ params }: { params: Promise<Params> }) {
  const { city } = await params;
  const area = find(city);
  if (!area) return notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BUSINESS.name,
    telephone: BUSINESS.phone.display,
    email: BUSINESS.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: BUSINESS.address.city,
      addressRegion: BUSINESS.address.region,
      addressCountry: "US",
    },
    areaServed: area.name,
    priceRange: "$$",
  };

  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <section
          id="top"
          className="relative isolate bg-[var(--shadow-bg)] text-[var(--shadow-ink)] min-h-[70vh] flex flex-col scroll-mt-20"
          aria-labelledby="city-heading"
        >
          <img
            src={IMAGES.hero}
            alt=""
            aria-hidden
            className="absolute inset-0 -z-10 h-full w-full object-cover opacity-55"
          />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-[rgba(20,17,13,0.4)] to-[rgba(20,17,13,0.92)]" />
          <div className="relative flex-1 flex flex-col justify-end mx-auto max-w-6xl w-full px-6 md:px-10 pt-28 md:pt-32 pb-14 md:pb-20">
            <p className="eyebrow flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[var(--amber-on-dark)]" aria-hidden />
              {area.name}, {BUSINESS.address.region} &nbsp;/&nbsp; Licensed {BUSINESS.credentials.licenseNumber}
            </p>
            <h1 id="city-heading" className="font-display mt-5 text-display-2xl leading-[0.92]">
              Contractor in
              <br />
              <span className="text-[var(--amber-on-dark)]">{area.name}.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-[17px] md:text-[20px] text-[var(--shadow-ink-soft)] leading-[1.55]">
              {area.blurb ?? `Home repair, remodels, tile, pressure washing, doors — from one licensed crew serving ${area.name}.`} We answer the phone, show up when we say we will, and clean up before we leave.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Link href={`tel:${BUSINESS.phone.raw}`} className="btn btn-primary">
                <Phone className="size-4" aria-hidden />
                Call {BUSINESS.phone.display}
              </Link>
              <Link href={buildWhatsAppLink(prefillForService())} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light">
                <MessageCircle className="size-4" aria-hidden />
                WhatsApp a photo
              </Link>
              <Link href="#quote" className="btn btn-ghost-light">
                Get a quote
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
          <div aria-hidden className="rough-top absolute -bottom-[1px] inset-x-0" />
        </section>
        <Services />
        <Trust />
        <Quote />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
