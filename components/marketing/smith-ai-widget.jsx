"use client";

import Script from "next/script";

/**
 * Optional Smith.ai embed — enable with NEXT_PUBLIC_ENABLE_SMITH_AI=1 and widget id.
 * @param {{ inquiryId?: string | null }} props
 */
export function SmithAiWidget({ inquiryId = null }) {
  const enabled = process.env.NEXT_PUBLIC_ENABLE_SMITH_AI === "1";
  const widgetId = process.env.NEXT_PUBLIC_SMITH_AI_WIDGET_ID?.trim();

  if (!enabled || !widgetId) return null;

  return (
    <>
      <Script id="smith-ai-config" strategy="afterInteractive">
        {`
          window.__HITOUCH_SMITH_AI__ = {
            widgetId: ${JSON.stringify(widgetId)},
            inquiryId: ${JSON.stringify(inquiryId)}
          };
        `}
      </Script>
      <Script
        src={`https://smith.ai/embed/${widgetId}.js`}
        strategy="lazyOnload"
        crossOrigin="anonymous"
      />
    </>
  );
}
