import { redirect } from "next/navigation";
import { site } from "@/content/site";

/** @type {import('next').Metadata} */
export const metadata = {
  title: "Book a ride",
  description: "Continue to secure online booking for HiTouch Luxury Charter.",
};

export default function BookPage() {
  redirect(site.moovsBookingUrl);
}
