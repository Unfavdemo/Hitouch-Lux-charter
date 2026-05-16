import { redirect } from "next/navigation";

/** Corporate portal lives under /portal/corporate; this avoids a bare /portal 404. */
export default function PortalIndexPage() {
  redirect("/portal/corporate");
}
