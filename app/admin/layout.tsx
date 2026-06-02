import type { Metadata } from "next";

// Internal tool — keep it out of search indexes entirely.
export const metadata: Metadata = {
  title: "Mini Brief — Team Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-bg text-fg">{children}</div>;
}
