import type { Metadata } from "next";
import { Outfit, Inter, Space_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://minibrief.ai";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "MiniBrief",
  description:
    "Email intelligence for Gmail and Outlook. Catch-up reports, VIP alerts, voice-matched drafts, and one-click unsubscribe. Your email is never stored on our servers. Launching soon for Chrome and Firefox.",
  openGraph: {
    title: "MiniBrief — Email intelligence for Gmail and Outlook",
    description:
      "Triage your inbox, surface what needs a reply, and draft responses in your own voice. Your email content is processed in your browser and never stored on our servers.",
    type: "website",
    url: siteUrl,
    siteName: "MiniBrief.ai",
  },
  twitter: {
    card: "summary_large_image",
    title: "MiniBrief — Email intelligence for Gmail and Outlook",
    description:
      "Triage your inbox, surface what needs a reply, and draft responses in your own voice. Your email is never stored on our servers.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable} ${spaceMono.variable}`}>
      <body>
        {children}
        <Toaster
          theme="dark"
          position="bottom-center"
          toastOptions={{
            style: {
              background: "rgba(13,21,40,0.97)",
              border: "1px solid rgba(74,98,245,0.3)",
              color: "#fff",
              fontFamily: "var(--font-body)",
            },
          }}
        />
      </body>
    </html>
  );
}
