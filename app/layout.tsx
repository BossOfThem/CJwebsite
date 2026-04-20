import type { Metadata, Viewport } from "next";
import { Inter, Oswald, JetBrains_Mono, Lora } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { BUSINESS } from "@/lib/config";
import { ContactDock } from "@/components/contact/ContactDock";
import { BackToTop } from "@/components/nav/BackToTop";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});
const display = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});
const serif = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${BUSINESS.name} — ${BUSINESS.tagline}`,
  description: `${BUSINESS.address.city} ${BUSINESS.address.region} contractor: home repair, construction, pressure washing, tile, bathroom remodels, doors. Call, text, WhatsApp, or email — free estimates.`,
  applicationName: BUSINESS.name,
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: BUSINESS.name,
  },
  icons: {
    icon: "/icon.svg",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: BUSINESS.name,
    description: BUSINESS.tagline,
    type: "website",
    locale: "en_US",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#141210",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const tawkId = BUSINESS.tawkPropertyId;
  const tawkWidget = BUSINESS.tawkWidgetId;

  return (
    <html lang="en" className={`${inter.variable} ${display.variable} ${mono.variable} ${serif.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-[var(--ink)] focus:text-white focus:px-4 focus:py-2 focus:rounded-sm"
        >
          Skip to main content
        </a>
        {children}
        <BackToTop />
        <ContactDock />
        {tawkId && tawkWidget && (
          <Script id="tawkto-widget" strategy="afterInteractive">
            {`var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/${tawkId}/${tawkWidget}';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();`}
          </Script>
        )}
      </body>
    </html>
  );
}
