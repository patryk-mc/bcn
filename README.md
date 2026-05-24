# BCN Ideal Services

The website for [BCN Ideal Services](https://bcnidealservices.com). Reliable home and concierge services for the international community in Barcelona.

Built with **Next.js 16 (App Router) · React 19 · Tailwind v4 · TypeScript · Motion (Framer Motion)** and an MDX-based blog.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build (statically generates ~19 routes)
npm run start      # serve the production build
```

## Project structure

```
src/
  app/                    # App Router routes
    layout.tsx            # Root layout (fonts, Nav, Footer, FloatingUtilities, skip link)
    page.tsx              # Home (composes /components/home/*)
    about/
    blog/                 # Blog index + dynamic [slug]
    contact/
    process/
    services/             # /services and /services/[slug] (3 services)
    sitemap.ts            # Auto-generated sitemap from data + posts
    robots.ts             # robots.txt
    icon.svg              # Favicon (BCN house mark)
    opengraph-image.tsx   # Dynamic OG image (1200x630)
    globals.css           # Tailwind v4 @theme tokens + utilities + prose-bcn

  components/
    Nav.tsx               # Glass bubble nav with scroll-state, mobile sheet
    Footer.tsx            # Wave divider, CTA card, 4-col footer
    Logo.tsx              # Brand SVG (full / mark / stacked variants, navy or white)
    Motion.tsx            # Reveal, Stagger, Parallax, FloatingBubbles, MagneticHover, CountUp
    ContactForm.tsx       # 3-step form (zod + react-hook-form + AnimatePresence)
    FloatingUtilities.tsx # WhatsApp + scroll-to-top
    PageHero.tsx          # Shared hero for inner pages
    home/                 # Home page sections

  lib/
    cn.ts                 # clsx + tailwind-merge
    site.ts               # All site copy: services, team, testimonials, process
    team-photos.ts        # Server-only: auto-detect /public/team/<slug>.{jpg,png,webp}
    blog.ts               # MDX loader

content/
  blog/*.mdx              # Blog posts (drop a file and it shows up)

public/
  videos/                 # BCN brand videos
  photos/                 # Lifestyle / interior / cleaning stills
  team/                   # Team portraits, named by slug (see below)
```

## Editing content

Everything visitor-facing lives in **[`src/lib/site.ts`](src/lib/site.ts)**: services, team bios, testimonials, the process, footer links, social URLs.

### Adding team portraits

Drop a file in `public/team/` named after the team member's slug. The site picks it up automatically on the next build (or hot-reload in dev).

| Person                | Filename                              |
|-----------------------|---------------------------------------|
| Lyn Lozano Galicia    | `lyn-lozano-galicia.jpg`              |
| Nina Ruzel Paggao     | `nina-ruzel-paggao.jpg`               |
| Gezyll Ramirez        | `gezyll-ramirez.jpg`                  |
| Soledad Abella        | `soledad-abella.jpg`                  |

Supported extensions: `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`. Recommended size: portrait, 1200×1500 px, face roughly centred.

If a file is missing, the card falls back to a gradient initial monogram automatically.

### Adding a blog post

Create `content/blog/your-slug.mdx`:

```yaml
---
title: "Your post title"
excerpt: "One-sentence excerpt for the cards."
date: "2026-06-01"
author: "Lyn Lozano"
category: "Cleaning"
cover: "/photos/cleaning-1.jpg"
---
```

Write the body in markdown / MDX below. The post appears at `/blog/your-slug` and on the blog index automatically.

### Updating services

Edit the `services` array in `src/lib/site.ts`. Each entry drives:
- The home page service overview cards
- The full `/services` page sections
- The `/services/<slug>` detail page

## Google reviews

The testimonials section reads from `testimonials` in `site.ts`. Every card and the section's main button link to `site.googleReviewsUrl` (currently a Google search for "BCN Ideal Services Barcelona reviews"). Replace that URL in `site.ts` with the direct Google Maps URL for the BCN business listing once it's live so visitors land directly on the reviews tab.

To grab the direct URL: open Google Maps, search "BCN Ideal Services Barcelona", click the listing, click "Reviews", then copy the URL from the browser. Paste it into `site.googleReviewsUrl`.

## Adding a chatbot

A chatbot fits naturally next to the existing WhatsApp button (bottom-left). Three options, easiest to most powerful:

### Option 1 — WhatsApp Business (free, 30 minutes)

Easiest path. You already have a WhatsApp number on the site. Upgrade it to **WhatsApp Business** (free app), add quick-reply templates for common questions ("What's a free quote?", "What areas do you cover?", etc.), set an away-message for off-hours. Visitors click the WhatsApp button on the site, message you on their own phone, and get answers from a real human (or the templated reply when you're away).

Pros: free, no code change needed, conversations stay in WhatsApp where Lyn / Nina already work.
Cons: not on-site, no instant auto-answers for FAQs.

### Option 2 — Hosted chat widget (Crisp, Tidio, Intercom) — 1 hour

Drop-in chat bubble that lives on every page. The good ones (Crisp Free or Tidio Free) include:
- An automated bot for FAQs ("What does cleaning cost?", "Do you cover Pedralbes?", "What's your reply time?")
- WhatsApp + email handoff if the bot can't answer
- A unified inbox for the team across all channels

Recommended for BCN: **Crisp** (free tier covers a small team, has WhatsApp bridge, has an FAQ bot). Tidio's free tier is also generous.

To wire it up: create the account, copy their script tag, paste it into `src/app/layout.tsx` inside `<body>`. That's the whole change.

Pros: works in 1 hour, FAQ auto-answers, mobile app for the team.
Cons: branded with their logo on free tiers; paid tier is roughly €15–€30 / month.

### Option 3 — Custom AI assistant with the site as context — 1 day

The premium version. A Claude (Anthropic) or OpenAI assistant trained on the BCN content (services, process, FAQs, blog posts). Answers questions naturally in any language, books quote requests via a tool call into the contact form, escalates to WhatsApp when it doesn't know.

Stack: Anthropic Claude (or OpenAI) + a small Next.js API route at `/api/chat` + a floating chat component on the site. Optional: vector-index your blog posts and service copy so the assistant cites them.

Cost: roughly €30–€100 / month at low volume (a few hundred conversations).

To go this route, tell me, and I'll wire it up with the contact form, your service descriptions, and a fallback to WhatsApp. Should take a few hours end-to-end.

**Suggested path for now**: ship the site with the WhatsApp button (already there). Add Crisp or Tidio after launch if traffic is high enough that you want auto-answers for the basics. Skip the custom AI assistant unless conversation volume becomes a real cost on the team.

## Connecting the contact form to email

The form in [`src/components/ContactForm.tsx`](src/components/ContactForm.tsx) currently logs submissions to the console after a fake 800ms delay (search for `// No backend wired`). To wire it up:

1. Create a route handler at `src/app/api/contact/route.ts` that accepts `POST` with the validated form payload.
2. In `ContactForm.tsx`, replace the body of `onSubmit` with `fetch("/api/contact", { method: "POST", body: JSON.stringify(values) })`.
3. Inside the route handler, forward to **Resend** (`resend.com`, simplest), **Postmark**, or your CRM. Resend gives you a free tier of 100 emails/day with `npm i resend`.

The zod schema in the form file is the single source of truth for validation, and can be re-used server-side.

## Deploy

### Vercel vs Netlify

**Use Vercel.** Reasons specific to this project:

- This is a Next.js 16 app, and Vercel builds Next.js. New features (Turbopack builds, Cache Components, async params) land first on Vercel.
- Native MDX, ISR, image optimisation, and dynamic OG images all work out of the box with zero config.
- The free hobby tier covers this site comfortably (bandwidth, builds, deployments). The team plan only becomes necessary if commercial use grows.
- Deploy by connecting a GitHub repo, picking the project, and pressing Deploy. First production URL is live in ~2 minutes.

Netlify also works (Next 16 is supported via their adapter) but you'll occasionally hit edge cases where a Next feature works on Vercel before Netlify catches up. There's no upside to Netlify for this specific stack.

### Before you deploy

In `src/lib/site.ts`, set `site.url` to the production domain (e.g. `https://bcnidealservices.com`). That fixes:
- `metadataBase` (used for OG image URLs)
- Sitemap entries
- Social card URLs

### Deploy steps (Vercel)

1. Push the repo to GitHub.
2. Go to `vercel.com/new`, import the repo.
3. Framework preset: **Next.js** (auto-detected).
4. Click Deploy. Done.
5. Add the custom domain under **Project → Settings → Domains**.

## Visual QA

```bash
node scripts/screenshot.mjs
# Writes viewport screenshots to ./screenshots/
```
