import { site } from "@/lib/site";
import { topicLabel, type QuoteValues } from "@/lib/quote-schema";

/**
 * Escape untrusted visitor input before it goes into an HTML email.
 * Without this, a submitted `<script>` or broken tag could mangle the email
 * or be used for injection against whoever opens it.
 */
function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Preserve the visitor's line breaks in the HTML body. */
function nl2br(value: string): string {
  return esc(value).replace(/\r?\n/g, "<br />");
}

const NAVY = "#1C3B6F";
const MUTED = "#44474F";

/**
 * Email that lands in the BCN inbox. Optimised for reading on a phone:
 * the important facts sit at the top, the brief underneath, and the reply
 * address is set to the customer so hitting Reply just works.
 */
export function notificationEmail(values: QuoteValues) {
  const label = topicLabel(values.topic);

  const subject = `New quote request — ${label} — ${values.area}`;

  const row = (key: string, value: string) => `
    <tr>
      <td style="padding:6px 0;color:${MUTED};font-size:13px;width:120px;vertical-align:top;">${esc(key)}</td>
      <td style="padding:6px 0;color:#1a1a1a;font-size:15px;font-weight:600;">${value}</td>
    </tr>`;

  const html = `
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;padding:24px;">
  <div style="border-left:4px solid ${NAVY};padding-left:16px;margin-bottom:24px;">
    <p style="margin:0 0 4px;color:${MUTED};font-size:12px;text-transform:uppercase;letter-spacing:1.5px;font-weight:600;">New quote request</p>
    <h1 style="margin:0;color:${NAVY};font-size:22px;">${esc(label)}</h1>
  </div>

  <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
    ${row("Name", esc(values.name))}
    ${row("Email", `<a href="mailto:${esc(values.email)}" style="color:${NAVY};">${esc(values.email)}</a>`)}
    ${row("Phone", `<a href="tel:${esc(values.phone.replace(/[^0-9+]/g, ""))}" style="color:${NAVY};">${esc(values.phone)}</a>`)}
    ${row("Area", esc(values.area))}
  </table>

  <div style="background:#F5F6F8;border-radius:12px;padding:18px;margin-bottom:24px;">
    <p style="margin:0 0 8px;color:${MUTED};font-size:12px;text-transform:uppercase;letter-spacing:1.5px;font-weight:600;">Their brief</p>
    <p style="margin:0;color:#1a1a1a;font-size:15px;line-height:1.6;">${nl2br(values.details)}</p>
  </div>

  <a href="https://wa.me/${site.whatsapp.replace(/[^0-9]/g, "")}"
     style="display:inline-block;background:${NAVY};color:#fff;text-decoration:none;padding:11px 22px;border-radius:999px;font-size:14px;font-weight:600;">
    Open WhatsApp
  </a>

  <p style="margin:24px 0 0;color:${MUTED};font-size:12px;line-height:1.5;">
    Reply directly to this email and it goes straight to ${esc(values.name)}.<br />
    Sent from the ${esc(site.name)} website contact form.
  </p>
</div>`;

  // Plain-text alternative. Improves deliverability and covers text-only clients.
  const text = [
    `NEW QUOTE REQUEST — ${label}`,
    ``,
    `Name:  ${values.name}`,
    `Email: ${values.email}`,
    `Phone: ${values.phone}`,
    `Area:  ${values.area}`,
    ``,
    `Their brief:`,
    values.details,
    ``,
    `Reply to this email to reach them directly.`,
  ].join("\n");

  return { subject, html, text };
}

/**
 * Auto-acknowledgement to the customer. The site promises a reply within one
 * working day, so this confirms we actually received the request and gives
 * them a faster route if it is urgent.
 */
export function confirmationEmail(values: QuoteValues) {
  const subject = `We've got your request — ${site.name}`;

  const html = `
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;padding:24px;">
  <h1 style="color:${NAVY};font-size:22px;margin:0 0 16px;">Thank you, ${esc(values.name)}.</h1>

  <p style="color:#1a1a1a;font-size:15px;line-height:1.6;margin:0 0 16px;">
    We have your request for <strong>${esc(topicLabel(values.topic))}</strong> in ${esc(values.area)},
    and we will come back to you within one working day.
  </p>

  <p style="color:#1a1a1a;font-size:15px;line-height:1.6;margin:0 0 24px;">
    If it is urgent, WhatsApp us — we are faster there.
  </p>

  <a href="https://wa.me/${site.whatsapp.replace(/[^0-9]/g, "")}"
     style="display:inline-block;background:${NAVY};color:#fff;text-decoration:none;padding:11px 22px;border-radius:999px;font-size:14px;font-weight:600;">
    WhatsApp ${esc(site.phone)}
  </a>

  <div style="border-top:1px solid #E3E5EA;margin-top:32px;padding-top:16px;">
    <p style="color:${MUTED};font-size:12px;line-height:1.5;margin:0 0 8px;">
      <strong>For your records, this is what you sent us:</strong><br />
      ${nl2br(values.details)}
    </p>
    <p style="color:${MUTED};font-size:12px;line-height:1.5;margin:0;">
      ${esc(site.name)} · ${esc(site.city)} · <a href="${site.url}" style="color:${NAVY};">${esc(site.url.replace("https://", ""))}</a><br />
      You received this because you submitted the contact form on our website.
    </p>
  </div>
</div>`;

  const text = [
    `Thank you, ${values.name}.`,
    ``,
    `We have your request for ${topicLabel(values.topic)} in ${values.area}, and we will come back to you within one working day.`,
    ``,
    `If it is urgent, WhatsApp us on ${site.phone} — we are faster there.`,
    ``,
    `For your records, this is what you sent us:`,
    values.details,
    ``,
    `${site.name} · ${site.city} · ${site.url}`,
  ].join("\n");

  return { subject, html, text };
}
