"use client";

import { useEffect, useState } from "react";
import { SmithAiWidget } from "@/components/marketing/smith-ai-widget";

const STORAGE_KEY = "hitouch_booking_inquiry_id";

export function SmithAiBridge() {
  const [inquiryId, setInquiryId] = useState(null);

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) setInquiryId(stored);

    const onStorage = () => {
      setInquiryId(sessionStorage.getItem(STORAGE_KEY));
    };
    const onInquiry = () => onStorage();
    window.addEventListener("storage", onStorage);
    window.addEventListener("hitouch-inquiry-updated", onInquiry);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("hitouch-inquiry-updated", onInquiry);
    };
  }, []);

  return <SmithAiWidget inquiryId={inquiryId} />;
}
