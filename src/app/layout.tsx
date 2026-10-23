import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, IBM_Plex_Serif } from "next/font/google";
import { MotionProvider } from "@/components/layout/motion-provider";
import { CookieConsent } from "@/components/layout/cookie-consent";
import { Cursor } from "@/components/layout/cursor";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { SmoothScrollProvider } from "@/components/layout/smooth-scroll";
import { motionInitScript } from "@/lib/motion-preference";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const plexSerif = IBM_Plex_Serif({
  variable: "--font-plex-serif",
  subsets: ["latin"],
  weight: "300",
  style: ["normal", "italic"],
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  // Origin only: Next adds the base path to file-based images (OG image, icons) itself.
  metadataBase: new URL(new URL(siteConfig.url).origin),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "agence web",
    "agence web Clermont-Ferrand",
    "création site internet Clermont-Ferrand",
    "studio digital",
    "création site internet",
    "site vitrine",
    "site e-commerce",
    "audit accessibilité RGAA",
    "conformité RGPD site internet",
    "intégration intelligence artificielle entreprise",
    "motion design",
    "design web haut de gamme",
    "agence web France",
    "SEO",
  ],
  authors: [{ name: siteConfig.legalName, url: siteConfig.url }],
  creator: siteConfig.legalName,
  alternates: { canonical: `${siteConfig.url}/` },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: `${siteConfig.url}/`,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: false, email: false, address: false },
  ...(siteConfig.googleVerification ? { verification: { google: siteConfig.googleVerification } } : {}),
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  // Static export: the year is set at build time, and each deploy rebuilds the site.
  const year = new Date().getFullYear();
  return (
    // The init script sets data-motion before React hydrates.
    <html
      lang="fr"
      data-scroll-behavior="smooth"
      className={`${plexSerif.variable} ${plexSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionInitScript }} />
        {/* Without JavaScript, reveal animations never run: show their content as is. */}
        <noscript>
          <style>{`[style*="opacity:0"],[style*="clip-path"]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-svh bg-ink text-cream">
        <a
          href="#contenu"
          className="fixed top-4 left-4 z-[60] -translate-y-40 rounded-full bg-cream px-5 py-3 text-sm text-ink transition-transform focus:translate-y-0"
        >
          Aller au contenu
        </a>
        <MotionProvider>
          <SmoothScrollProvider>
            <Navbar />
            <main id="contenu" tabIndex={-1} className="outline-none">
              {children}
            </main>
            <Footer year={year} />
          </SmoothScrollProvider>
          <CookieConsent />
          <Cursor />
        </MotionProvider>
      </body>
    </html>
  );
}
