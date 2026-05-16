/**
 * Send transactional email via Resend API.
 * @param {{ to: string; subject: string; html: string; text?: string }} opts
 * @returns {Promise<{ ok: boolean; skipped?: boolean; error?: string }>}
 */
export async function sendTransactionalEmail({ to, subject, html, text }) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return { ok: false, skipped: true, error: "RESEND_API_KEY is not set." };
  }
  const from = process.env.CORPORATE_PORTAL_FROM_EMAIL?.trim();
  if (!from) {
    return { ok: false, skipped: true, error: "CORPORATE_PORTAL_FROM_EMAIL is not set." };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      html,
      text: text ?? undefined,
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    return { ok: false, error: errText || `Resend HTTP ${res.status}` };
  }
  return { ok: true };
}
