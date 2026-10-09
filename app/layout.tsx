import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import { SiteJsonLd } from "@/components/seo/json-ld";
import { metadata as home } from "@/content/home";
import { WORDMARK } from "@/lib/brand";
import { siteUrl } from "@/lib/seo";
import "./globals.css";

// Inter, vendored at app/fonts (SIL OFL 1.1): the one typeface on the site.
// globals.css points --font-body, --font-display and --font-mono at it, so
// the kept dark pages need no restyle.
const inter = localFont({
  src: "./fonts/InterVariable.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: home.title,
  description: home.description,
  openGraph: {
    title: home.title,
    description: home.description,
    type: "website",
    url: siteUrl,
    siteName: WORDMARK,
  },
  twitter: {
    card: "summary_large_image",
    title: home.title,
    description: home.description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteJsonLd />
        {children}
        <Toaster
          theme="dark"
          position="bottom-center"
          toastOptions={{
            style: {
              background: "rgba(13,21,40,0.97)",
              border: "1px solid rgba(74,98,245,0.3)",
              color: "#fff",
              fontFamily: "var(--font-inter)",
            },
          }}
        />
      </body>
    </html>
  );
}
