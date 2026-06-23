/**
 * Single source of truth for site content.
 * Edit this file to update navigation, services, team, testimonials, etc.
 */

export const site = {
  name: "BCN Ideal Services",
  shortName: "BCN Ideal",
  tagline: "Reliable Services for Rentals & Residences",
  description:
    "Your stop for reliable, expert and friendly home services to the International Community in Barcelona.",
  url: "https://bcnidealservices.com",
  email: "info@bcnidealservices.com",
  phone: "+34 604 264 911",
  phoneRaw: "+34604264911",
  whatsapp: "+34604264911",
  city: "Barcelona",
  /** Public Google Business URL. All testimonial cards link here. */
  googleReviewsUrl:
    "https://www.google.com/search?q=BCN+Ideal+Services+Barcelona+reviews",
  social: {
    instagram: "https://www.instagram.com/bcnidealservices/",
    facebook:
      "https://www.facebook.com/Bcn-Ideal-Services-104998294869468",
    twitter: "https://twitter.com/BcnIdeal",
  },
} as const;

export const nav = [
  { label: "News", href: "/news" },
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Process", href: "/process" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
] as const;

export type ServiceSlug = "home-cleaning" | "company-cleaning" | "uhnw";

export const services = [
  {
    slug: "home-cleaning",
    title: "Home Cleaning",
    eyebrow: "For homes & residences",
    short: "Meticulous home cleaning for Barcelona's international community.",
    description:
      "Weekly, bi-weekly or one-off home cleans delivered by two-person teams of professional, bilingual, background-checked cleaners. Every home is different, so we walk through yours, agree the priorities, and quote a tailored package.",
    longCopy:
      "Whether you have a one-bedroom in Eixample, a townhouse in Sarrià, or a holiday apartment by the beach, the way we work is the same. We arrive in twos so the job takes hours, not half a day. We use professional products (eco-friendly on request) and treat your home like ours. You meet the team before they start, you set the non-negotiables, and you have a single WhatsApp number for any change. There is no fixed rate. Pricing depends on the home, the frequency and the inclusions. The quote is free.",
    bullets: [
      "Two-person teams for half the on-site time",
      "Bilingual (EN · ES · FIL) and background-checked",
      "Weekly, bi-weekly, monthly or one-off",
      "Eco-friendly products on request",
      "Optional ironing, laundry, fridge & oven deep-clean",
      "WhatsApp support, easy reschedules",
    ],
    color: "primary",
    icon: "sparkles",
    heroVideo: "/videos/ad-3.mp4",
    accentVideo: "/videos/ad-nov-7.mp4",
    backgroundVideo: "/videos/quality.mp4",
    poster: "/photos/interior-2.jpg",
    galleryPhotos: [
      "/photos/interior-2.jpg",
      "/photos/interior-5.jpg",
      "/photos/interior-6.jpg",
      "/photos/cleaning-1.jpg",
    ],
  },
  {
    slug: "company-cleaning",
    title: "Company Cleaning",
    eyebrow: "For offices & businesses",
    short: "Office, co-working and short-term rental cleaning on a schedule that fits.",
    description:
      "Reliable corporate cleaning for offices, co-working spaces, short-term rentals and co-living. We send two-person teams to keep turnaround times short and quality consistent, so the place is ready when your next guest, tenant or shift walks in.",
    longCopy:
      "Offices have their own rhythm. Early before the team arrives, between meetings, or after-hours when the building is empty. We work around your schedule, not the other way around. Every account has a single point of contact, a documented cleaning checklist, and a key-holding agreement so we can let ourselves in and out without disrupting your day. Invoicing is monthly and predictable. The quote is free and tailored to the space.",
    bullets: [
      "Daily, weekly or turnover schedules",
      "Two-person teams for speed and consistency",
      "Single point of contact + key-holding agreement",
      "Eco-friendly products on request",
      "Linen and inventory checks for short-term rentals",
      "Predictable monthly invoicing",
    ],
    color: "gold",
    icon: "building-2",
    heroVideo: "/videos/office.mp4",
    accentVideo: "/videos/office.mp4",
    backgroundVideo: "/videos/office.mp4",
    poster: "/photos/team-work.jpg",
    galleryPhotos: ["/photos/team-work.jpg"],
  },
  {
    slug: "uhnw",
    title: "UHNW Lifestyle Management",
    eyebrow: "Ultra High Net Worth · Private",
    short: "Discreet, white-glove lifestyle management for UHNW individuals and families in Barcelona.",
    description:
      "A private concierge service for Ultra High Net Worth individuals and families migrating to, vacationing in, or maintaining a second residence in Barcelona. One trusted point of contact for the people, vendors and operations that make a Mediterranean lifestyle effortless.",
    longCopy:
      "We work with a small number of private clients each year. The service is built around your life, not a fixed scope. That includes the household staff, the driver, the contractors, the bookings, the seasonal opening and closing of the property, and the things that come up at short notice. Engagements begin with a private conversation and a signed NDA. From there we propose a structure (monthly retainer, day-rate, or project basis) that fits the way you want to be supported. Every introduction is hand-made.",
    bullets: [
      "Full household team recruitment & management",
      "Estate and vendor coordination (works, gardeners, security)",
      "Private bookings, travel and reservations",
      "Seasonal property opening & closing",
      "Single discreet point of contact, signed NDA",
      "Bespoke retainer or project-basis engagement",
    ],
    color: "primary",
    icon: "diamond",
    heroVideo: "/videos/linkedin-feb.mp4",
    accentVideo: "/videos/linkedin-apr.mp4",
    backgroundVideo: "/videos/era-architects.mp4",
    poster: "/photos/lifestyle-9.jpg",
    galleryPhotos: [],
  },
] as const;

export const servicesBySlug: Record<ServiceSlug, (typeof services)[number]> = Object.fromEntries(
  services.map((s) => [s.slug, s])
) as Record<ServiceSlug, (typeof services)[number]>;

/**
 * Core team. Bios from the brief.
 *
 * Photos: drop a file at `public/team/<slug>.jpg` (or .png / .webp) and it
 * shows up automatically. If the file is missing, the card falls back to a
 * stylised initial monogram. No code change needed when you add a portrait.
 */
export const team = [
  {
    slug: "lyn-lozano-galicia",
    name: "Lyn Lozano Galicia",
    role: "Founder / CEO",
    bio: "Born to her humble parents in the South Eastern part of Luzon in The Philippines, Lyn moved to the beautiful city of Barcelona over a decade ago looking for a new blueprint for the future. Back in the Philippines she has experience as a prototype/project technician in a multinational-level company in the engineering department. Being strong-willed, persistent, unstoppable and with tons of ideas in mind, she started to develop a skillset to make it happen, leveraging her hunger for learning, excellent communication skills, natural leadership, strong social conscience, an imaginative problem-solver and oozing confidence. Lyn founded BCN Ideal Services right after the pandemic hit in 2020, with the help of her long-time friend and confidant Manuel Silva Manzanero. As a professional with a decade of experience catering to international clients, Lyn founded the company in mission to help expat community and locals alike to make their life easier by providing ideal services such as nannies, babysitters and housekeepers and more. She is also a certified massage therapist and an employee before becoming sole practitioner in the craft.",
    shortBio:
      "Founder of BCN Ideal Services. A decade catering to international families in Barcelona, building a team where service quality and trust come first.",
  },
  {
    slug: "nina-ruzel-paggao",
    name: "Nina Ruzel Paggao",
    role: "Administrative Assistant / Team Support",
    bio: "Hola! I am Nina Ruzel Paggao. I work at BCN Ideal Services as administrative staff. My task is to provide support to ensure the efficient operation of the office such as arranging interviews, coordinating hiring efforts, and onboarding new employees. More so, my task is to ensure proper filing of procurement papers and other administrative deliverables.",
    shortBio:
      "Keeps the office running. Interviews, hiring coordination, onboarding and the paperwork everyone forgets about.",
  },
  {
    slug: "gezyll-ramirez",
    name: "Gezyll Ramirez",
    role: "Team Leader",
    bio: "Hi! I am Gezyll Ramirez. As a team leader and support to the management, my role is to do the emergency purchases and other errands as needed to ensure no backlogs as well as support to the team.",
    shortBio:
      "Leads the field team. Handles emergencies, supply runs and the day-to-day support that keeps clients smiling.",
  },
  {
    slug: "soledad-abella",
    name: "Soledad Abella",
    role: "Social Media Marketing",
    bio: "Soledad is BCN Ideal Services' social media manager. She has worked for years in social media and digital communications, and is the owner of social media agency Soulcial Marketing. Soledad loves working with and helping the Barcelona international community, where she lived for many years.",
    shortBio:
      "Runs our social and digital. Owner of Soulcial Marketing and a long-time member of Barcelona's international community.",
  },
] as const;

/**
 * Verified Google reviews. Each one links out to BCN's public Google
 * reviews page so visitors can see them on Google directly.
 */
export const testimonials = [
  {
    name: "Ceren Nomer DePree",
    date: "14/02/2026",
    quote:
      "What fast, reliable and polished service. I've been having BCN clean my house for a month now and I just love how efficient it is. They regularly send two people so the cleaning is only 2 to 3 hours rather than 5 to 6. The quality of cleaning is great and everyone is super friendly!",
  },
  {
    name: "Marco Capi",
    date: "05/02/2026",
    quote:
      "VERY well-recommended for regular or one-off cleaning services. The cleaner they sent was absolutely polite and professional, and did an amazing job. Better than all the other cleaners I have had in the past. She even did a few things I didn't ask for, proactively, and did them very well!",
  },
  {
    name: "Rachel Jensen",
    date: "26/01/2026",
    quote:
      "Fantastic service! Lyn and her team are wonderful. Easy communications and detailed work. We will be booking again.",
  },
  {
    name: "Klaudia Batkiewicz",
    date: "23/01/2026",
    quote:
      "I have an apartment in Barcelona and BCN Ideal Services manages the cleaning. They are trustworthy and provide a perfect service. The cleaners are very professional, and it's always easy to organize everything with them. They are bilingual, speaking English and Spanish, which makes communication seamless. Highly recommended.",
  },
  {
    name: "Joey Garr",
    date: "23/01/2026",
    quote:
      "They're professional, friendly, and always willing to work with my schedule, which I really appreciate. It's clear they care about their clients.",
  },
  {
    name: "Britt Bohannan",
    date: "23/01/2026",
    quote:
      "Love this service! Flexible and attentive staff, very responsive and responsible company.",
  },
  {
    name: "Mehran Sanei",
    date: "02/08/2025",
    quote:
      "Jesusa and her colleague were fantastic. They cleaned everything well, worked quickly, and had lovely personalities. It was a pleasure having them. Highly recommend!",
  },
  {
    name: "Priyanka Naithani",
    date: "08/04/2025",
    quote:
      "Best cleaning experience I have ever had! Amazing team and truly exceptional service. Thank you, Lyn!",
  },
] as const;

export const processSteps = [
  {
    n: "01",
    title: "Tell us what you need",
    body: "A short call or message to understand your home, schedule and any non-negotiables.",
  },
  {
    n: "02",
    title: "Free in-home walk-through",
    body: "We visit (or video-call), see the property and quote you a tailored package. Every home is different.",
  },
  {
    n: "03",
    title: "Trial & meet the team",
    body: "Meet the proposed team, run a trial clean, and confirm what works.",
  },
  {
    n: "04",
    title: "Legal & onboarding",
    body: "Our legal team handles Spanish labour and contracting where applicable. You get a clean handover.",
  },
  {
    n: "05",
    title: "Ongoing support",
    body: "WhatsApp us anytime. We swap, scale or pause service as your life changes.",
  },
] as const;

/**
 * Frequently asked questions. Single source of truth, rendered both as the
 * accordion at the bottom of the homepage and on the dedicated `/faq` page.
 * Edit here to update both places at once.
 */
export const faqs = [
  {
    q: "What services do expats in Barcelona typically need when settling into a new home?",
    a: "Expats in Barcelona often require more than just cleaning—they need reliable household support, trusted staff, and structured help managing day-to-day life. BCN Ideal Services works with international families to provide cleaning, childcare support, and ongoing household coordination, ensuring a smooth transition into life in the city. Our services are designed to remove friction so expats can focus on work, family, and settling in comfortably.",
  },
  {
    q: "Do you offer UHNW household support services in Barcelona?",
    a: "Yes. BCN Ideal Services provides discreet UHNW lifestyle support in Barcelona for high-net-worth individuals and families who require a higher level of household management. This includes staffing coordination, vendor management, private bookings, estate support, and confidential day-to-day assistance delivered under NDA. Each service is fully tailored to the client's lifestyle and expectations.",
  },
  {
    q: "How do expats in Barcelona find trusted household staff?",
    a: "Finding trusted household staff in Barcelona can be challenging for expats unfamiliar with local systems, language, and labour regulations. BCN Ideal Services simplifies this by carefully selecting and matching experienced professionals, ensuring legal compliance and cultural alignment. Every placement is designed for long-term reliability, discretion, and peace of mind.",
  },
  {
    q: "What kind of lifestyle management do UHNW clients expect in Barcelona?",
    a: "UHNW clients in Barcelona typically expect a fully managed, discreet, and highly responsive lifestyle service. This includes household staff oversight, seasonal property preparation, travel coordination, restaurant and private bookings, and urgent request handling. BCN Ideal Services provides a single point of contact to manage all aspects of daily life seamlessly and privately.",
  },
  {
    q: "Why do expats and UHNW families prefer managed services over hiring independently in Barcelona?",
    a: "Many expats in Barcelona and UHNW households prefer managed services because they offer structure, legal compliance, and continuity. Instead of navigating contracts, recruitment, and supervision alone, clients rely on BCN Ideal Services to handle everything end-to-end. This ensures consistency, accountability, and a trusted support system that adapts as their needs evolve.",
  },
] as const;
