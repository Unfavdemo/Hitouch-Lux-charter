import { redirect } from "next/navigation";

/** Legacy Moovs deep-link — public path is the quote questionnaire. */
export default function BookARidePage() {
  redirect("/experience-request");
}
