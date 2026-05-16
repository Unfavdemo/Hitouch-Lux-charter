import { redirect } from "next/navigation";

/** Common typo: corprate → corporate */
export default function PortalCorporateTypoPage() {
  redirect("/portal/corporate");
}
