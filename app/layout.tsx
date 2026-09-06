import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MotionObserver } from "@/components/motion-observer";
import { siteConfig } from "@/data/site";

const inter = localFont({
  src: "./fonts/inter-latin.woff2",
  display: "swap",
  variable: "--font-inter",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "Gercadi Transportes e Logística", template: "%s | Gercadi" },
  description: "Solicite cotações, coletas e acompanhe sua carga com a Gercadi Transportes e Logística em Mato Grosso.",
  applicationName: siteConfig.shortName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: siteConfig.name,
    title: "Gercadi Transportes e Logística",
    description: "Mais de 35 anos conectando empresas e cidades em Mato Grosso.",
    url: siteConfig.url,
    images: [{ url: "/images/company/carreta-gercadi.jpg", width: 1000, height: 608, alt: "Carreta da Gercadi Transportes e Logística" }],
  },
  twitter: { card: "summary_large_image", images: ["/images/company/carreta-gercadi.jpg"] },
  robots: { index: true, follow: true },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/images/brand/gercadi-logo.png`,
  email: siteConfig.email,
  telephone: "+55 65 3667-4700",
  address: { "@type": "PostalAddress", addressLocality: "Cuiabá", addressRegion: "MT", addressCountry: "BR" },
  sameAs: [siteConfig.facebook, siteConfig.instagram],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={inter.variable} data-scroll-behavior="smooth">
      <body className="min-h-screen bg-paper text-ink antialiased">
        <a href="#conteudo" className="skip-link">Ir para o conteúdo</a>
        <MotionObserver />
        <SiteHeader />
        <main id="conteudo">{children}</main>
        <SiteFooter />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
