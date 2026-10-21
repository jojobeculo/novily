import type { Metadata, Viewport } from "next";
import { cacheLife } from "next/cache";
import { IBM_Plex_Sans, IBM_Plex_Serif } from "next/font/google";
import { MotionProvider } from "@/components/layout/motion-provider";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
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
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "agence web",
    "studio digital",
    "création site internet",
    "site vitrine",
    "site e-commerce",
    "design web haut de gamme",
    "agence web Paris",
    "SEO",
  ],
  authors: [{ name: siteConfig.legalName, url: siteConfig.url }],
  creator: siteConfig.legalName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/",
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
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

async function currentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const year = await currentYear();
  return (
    <html
      lang="fr"
      data-scroll-behavior="smooth"
      className={`${plexSerif.variable} ${plexSans.variable}`}
    >
      <body className="min-h-svh bg-ink text-cream">
        <a
          href="#contenu"
          className="fixed top-4 left-4 z-[60] -translate-y-24 rounded-full bg-cream px-5 py-3 text-sm text-ink transition-transform focus:translate-y-0"
        >
          Aller au contenu
        </a>
        <MotionProvider>
          <Navbar />
          <main id="contenu">{children}</main>
          <Footer year={year} />
        </MotionProvider>
      </body>
    </html>
  );
}
