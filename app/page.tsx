import { Header } from "@/components/header/Header";
import { Hero } from "@/components/sections/Hero";
import { Consult } from "@/components/sections/Consult";
import { Services } from "@/components/sections/Services";
import { Trust } from "@/components/sections/Trust";
import { Gallery } from "@/components/sections/Gallery";
import { Quote } from "@/components/sections/Quote";
import { Testimonials } from "@/components/sections/Testimonials";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <Hero />
        <Consult />
        <Services />
        <Trust />
        <Quote />
        <Gallery />
        <Testimonials />
        <ServiceArea />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
