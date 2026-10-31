"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const measurementId = process.env.NEXT_PUBLIC_GA_ID?.trim() ?? "";
const analyticsEnabled = /^G-[A-Z0-9]+$/.test(measurementId);

declare global {
  interface Window {
    dataLayer?: unknown[][];
    gtag?: (...args: unknown[]) => void;
  }
}

export default function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!analyticsEnabled || !pathname) return;
    const pagePath = window.location.pathname;
    window.gtag?.("event", "page_view", {
      page_path: pagePath,
      page_location: `${window.location.origin}${pagePath}`,
      page_title: document.title,
    });
  }, [pathname]);

  if (!analyticsEnabled) return null;

  return (
    <>
      <Script id="google-analytics-init" strategy="beforeInteractive">
        {`window.dataLayer = window.dataLayer || [];
window.gtag = function(){ window.dataLayer.push(Array.from(arguments)); };
window.gtag('js', new Date());
window.gtag('config', ${JSON.stringify(measurementId)}, { send_page_view: false });`}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
    </>
  );
}
