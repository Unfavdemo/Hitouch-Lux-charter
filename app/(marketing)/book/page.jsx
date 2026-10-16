import { redirect } from "next/navigation";

/** Public booking is quote-first — no instant online reservation. */
export default function BookPage() {
  redirect("/experience-request");
}
