import { z } from "zod";

/**
 * Single source of truth for the quote-request form.
 *
 * Imported by BOTH the client form (`components/ContactForm.tsx`) and the
 * server route (`app/api/quote/route.ts`). Client-side validation is a
 * convenience for the visitor; the server re-validates because anything can
 * POST to the endpoint.
 *
 * Max lengths exist so a bot cannot post a megabyte of text into our inbox.
 */
export const quoteSchema = z.object({
  topic: z.string().min(1, "Please choose what you need"),
  name: z.string().min(2, "Please tell us your name").max(100),
  email: z.string().email("Please use a valid email").max(200),
  phone: z
    .string()
    .min(6, "Please include a phone number we can reach you on")
    .max(40),
  area: z.string().min(2, "Where in Barcelona?").max(120),
  details: z
    .string()
    .min(20, "A little more detail helps us give a useful quote")
    .max(5000),
  consent: z.literal(true, { error: "Please accept the privacy notice" }),

  /**
   * Honeypot. Hidden from real users, so it must stay empty. Bots that fill
   * every field will populate it and get silently dropped by the server.
   * Optional and unvalidated on purpose — it must never block a real person.
   */
  company: z.string().optional(),
});

export type QuoteValues = z.infer<typeof quoteSchema>;

/**
 * Human-readable labels for the notification email subject/body. Keyed by the
 * `topic` values used in the form's option cards.
 */
export const TOPIC_LABELS: Record<string, string> = {
  "home-cleaning": "Home cleaning",
  "company-cleaning": "Office cleaning",
  uhnw: "UHNW lifestyle",
  careers: "Job application",
};

export function topicLabel(topic: string): string {
  return TOPIC_LABELS[topic] ?? topic;
}
