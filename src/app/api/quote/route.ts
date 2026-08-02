import { Resend } from "resend";
import { quoteSchema } from "@/lib/quote-schema";
import { notificationEmail, confirmationEmail } from "@/lib/quote-emails";

/**
 * Quote-request endpoint.
 *
 * POST /api/quote  ->  emails the submission to QUOTE_INBOX.
 *
 * The client only shows its success screen on a 200 from here, so a failure
 * surfaces to the visitor instead of silently swallowing a lead.
 */

// Never prerender or cache this; it must run per request.
export const dynamic = "force-dynamic";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 5;

/**
 * Very small in-memory rate limiter, keyed by IP.
 *
 * Caveat: serverless instances do not share memory, so this is a speed bump
 * against casual spam rather than a hard guarantee. That is the right
 * trade-off here — it costs nothing and needs no external store. If real
 * abuse ever shows up, swap this for Upstash/Vercel KV.
 */
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );

  if (recent.length >= RATE_LIMIT_MAX) {
    hits.set(ip, recent);
    return true;
  }

  recent.push(now);
  hits.set(ip, recent);

  // Opportunistic cleanup so the map cannot grow without bound.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) hits.delete(key);
    }
  }

  return false;
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  // --- Config guard -------------------------------------------------------
  const apiKey = process.env.RESEND_API_KEY;
  const inbox = process.env.QUOTE_INBOX;
  const from = process.env.QUOTE_FROM;

  if (!apiKey || !inbox || !from) {
    // Loud in the server logs, vague to the client. Never leak config detail.
    console.error(
      "[quote] Missing env. RESEND_API_KEY:%s QUOTE_INBOX:%s QUOTE_FROM:%s",
      Boolean(apiKey),
      Boolean(inbox),
      Boolean(from)
    );
    return Response.json(
      { ok: false, error: "Email is not configured." },
      { status: 500 }
    );
  }

  // --- Rate limit ---------------------------------------------------------
  if (isRateLimited(clientIp(request))) {
    return Response.json(
      { ok: false, error: "Too many requests. Please try again shortly." },
      { status: 429 }
    );
  }

  // --- Parse --------------------------------------------------------------
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { ok: false, error: "Invalid request." },
      { status: 400 }
    );
  }

  // --- Honeypot -----------------------------------------------------------
  // A real browser never fills this. Return 200 so the bot believes it worked
  // and does not retry with a different shape.
  const honeypot = (body as { company?: unknown })?.company;
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    console.warn("[quote] Honeypot triggered, dropping submission.");
    return Response.json({ ok: true });
  }

  // --- Validate -----------------------------------------------------------
  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      {
        ok: false,
        error: "Please check the form and try again.",
        issues: parsed.error.issues.map((i) => ({
          path: i.path.join("."),
          message: i.message,
        })),
      },
      { status: 400 }
    );
  }

  const values = parsed.data;
  const resend = new Resend(apiKey);

  // --- Notify BCN (must succeed) -----------------------------------------
  const notification = notificationEmail(values);
  const { data, error } = await resend.emails.send({
    from,
    to: inbox,
    replyTo: values.email, // hitting Reply in Gmail reaches the customer
    subject: notification.subject,
    html: notification.html,
    text: notification.text,
  });

  if (error) {
    // The SDK reports API failures here rather than throwing.
    console.error("[quote] Resend failed to send notification:", error);
    return Response.json(
      { ok: false, error: "We could not send your request. Please try again." },
      { status: 502 }
    );
  }

  console.info("[quote] Notification sent. id=%s topic=%s", data?.id, values.topic);

  // --- Acknowledge to the customer (best effort) --------------------------
  // Deliberately after the notification, and deliberately non-fatal: the lead
  // is already safe in the inbox, so a failed courtesy email must not tell the
  // visitor their request failed and make them submit twice.
  try {
    const confirmation = confirmationEmail(values);
    const ack = await resend.emails.send({
      from,
      to: values.email,
      replyTo: inbox,
      subject: confirmation.subject,
      html: confirmation.html,
      text: confirmation.text,
    });
    if (ack.error) {
      console.error("[quote] Confirmation email failed:", ack.error);
    }
  } catch (err) {
    console.error("[quote] Confirmation email threw:", err);
  }

  return Response.json({ ok: true });
}
