export function touchbackEmail({
  contactName,
  inquiryId,
}: {
  contactName: string;
  inquiryId: string;
}) {
  const subject = "Your HiTouch itinerary — concierge follow-up";
  const text = [
    `Hello ${contactName},`,
    "",
    "Thank you for starting a reservation inquiry with HiTouch Luxury Charter.",
    "Our concierge team noticed your request may still be in progress.",
    "",
    "Reply to this email or call our private line to confirm routing, vehicle class, and final pricing.",
    "",
    `Reference: ${inquiryId}`,
    "",
    "— HiTouch Luxury Charter",
  ].join("\n");

  const html = `
    <p>Hello ${escapeHtml(contactName)},</p>
    <p>Thank you for starting a reservation inquiry with <strong>HiTouch Luxury Charter</strong>.</p>
    <p>Our concierge team noticed your request may still be in progress. Reply to this email or call our private line to confirm routing, vehicle class, and final pricing.</p>
    <p style="color:#7d8496;font-size:12px;">Reference: ${escapeHtml(inquiryId)}</p>
    <p>— HiTouch Luxury Charter</p>
  `.trim();

  return { subject, html, text };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
