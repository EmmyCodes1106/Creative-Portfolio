import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/data/site";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { LoaderProvider } from "@/components/providers/loader-provider";
import { ThemeScript } from "@/components/theme-script";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { Preloader } from "@/components/site/preloader";
import { CustomCursor } from "@/components/site/custom-cursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const description =
  "Portfolio of Fadayomi Emmanuel (EmmyCodes) — a software developer and creative technologist turning ideas into functional and creative solutions.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.owner} — ${siteConfig.role}`,
    template: `%s — ${siteConfig.name}`,
  },
  description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.owner }],
  creator: siteConfig.owner,
  publisher: siteConfig.name,
  keywords: [
    "Fadayomi Emmanuel",
    "EmmyCodes",
    "software developer",
    "frontend developer",
    "creative technologist",
    "Next.js",
    "React",
    "TypeScript",
    "portfolio",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: siteConfig.name,
    title: `${siteConfig.owner} — ${siteConfig.role}`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.owner} — ${siteConfig.role}`,
    description,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-theme="light"
      data-accent="violet"
    >
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} min-h-dvh bg-bg font-sans text-ink`}
      >
        <ThemeScript />
        <ThemeProvider>
          <LoaderProvider>
            <Preloader />
            <CustomCursor />
            <a href="#main" className="skip-link">
              Skip to content
            </a>
            <SiteNav />
            <main id="main">{children}</main>
            <SiteFooter />
          </LoaderProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
