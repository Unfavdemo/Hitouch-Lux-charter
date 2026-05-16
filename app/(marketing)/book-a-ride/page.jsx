import { redirect } from "next/navigation";
import { site } from "@/content/site";

/** @type {import('next').Metadata} */
export const metadata = {
  title: "Book a ride",
  description: "Redirecting to secure external booking.",
};

export default function BookARidePage() {
  redirect(site.moovsBookingUrl);
}
