import type { Metadata } from "next";
import type { LinkItem } from "@/shared";
import { SiteHeader, SiteFooter } from "@/shared";
import { site } from "@/lib/site";
import "./globals.css";

const headerLinks: LinkItem[] = [
  { href: "/services", title: "Services" },
  { href: "/work", title: "Work" },
  { href: "/process", title: "Process" },
  { href: "/contact", title: "Contact" },
];

const footerLinks: LinkItem[] = [
  ...headerLinks,
  { href: "/privacy", title: "Privacy Policy" },
];

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: "%s | AgentForge",
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    siteName: site.name,
    type: "website",
  },
  verification: {
    google: "-B9bH2Tq907nNACPq7T4jLKYd_LEZivoeEFX4uDS3dc",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-stone-100 antialiased">
        <SiteHeader brand={site.name} links={headerLinks} />
        {children}
        <SiteFooter
          brand={site.name}
          links={footerLinks}
          note="Custom AI agents and workflow automation for small teams. Fixed price, written spec first, delivered from UTC+8."
        />
      </body>
    </html>
  );
}
