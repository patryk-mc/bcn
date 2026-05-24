import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Motion";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How BCN Ideal Services handles your data.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={
          <>
            Privacy <span className="text-accent-gold italic font-light">policy</span>
          </>
        }
        description={
          <>
            How we collect, use, and protect your personal data when you contact us or use our services.
          </>
        }
        imageSrc="/photos/lifestyle-6.jpg"
      />

      <section className="py-20 md:py-28 bg-white">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <div className="prose-bcn">
              <p className="text-sm uppercase tracking-widest font-semibold text-accent-gold mb-4">
                Last updated: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
              </p>

              <h2>Who we are</h2>
              <p>
                This site is operated by Marilyn Lozano Galicia for BCN Ideal Services, based in {site.city}, Spain. You can reach us at{" "}
                <a href={`mailto:${site.email}`}>{site.email}</a> or {site.phone}.
              </p>

              <h2>What data we collect</h2>
              <p>We collect only what you provide directly:</p>
              <ul>
                <li>Your name, email and phone number when you use the contact form</li>
                <li>The neighbourhood and details of your property when relevant to a quote</li>
                <li>Any message or attachment you send via WhatsApp, phone or email</li>
              </ul>
              <p>
                We do not collect data through cookies or tracking pixels beyond what is strictly necessary to load the site (Vercel serves the static pages and may log basic request metadata such as IP address for the duration of the request, for security and rate-limiting purposes only).
              </p>

              <h2>How we use it</h2>
              <ul>
                <li>To respond to your enquiry and prepare a tailored quote</li>
                <li>To deliver the service you have booked (housekeeper match, cleaning schedule, etc.)</li>
                <li>To send service-related communications (schedule changes, invoices) once you are a client</li>
              </ul>
              <p>
                We do <strong>not</strong> sell your data. We do not auto-subscribe you to any marketing list. If we later add an opt-in newsletter, it will be opt-in.
              </p>

              <h2>Who we share it with</h2>
              <ul>
                <li>The specific BCN Ideal Services staff member assigned to your enquiry</li>
                <li>Our legal team, when contracting is required under Spanish labour law</li>
                <li>Spanish tax and social security authorities, where the law obliges us</li>
              </ul>
              <p>No third-party marketing tools. No data brokers.</p>

              <h2>How long we keep it</h2>
              <p>
                We keep enquiry data for as long as the conversation is active and for up to 12 months afterwards in case you come back. Client records are kept for the duration of the engagement plus the legally required retention period for tax and labour documents (typically 5 years in Spain).
              </p>

              <h2>Your rights (GDPR)</h2>
              <p>Under the EU General Data Protection Regulation you can ask us to:</p>
              <ul>
                <li>Access the personal data we hold about you</li>
                <li>Correct anything that is wrong</li>
                <li>Delete your data, where there is no legal obligation to keep it</li>
                <li>Restrict or object to how we use it</li>
                <li>Export your data in a portable format</li>
              </ul>
              <p>
                To exercise any of these, email{" "}
                <a href={`mailto:${site.email}`}>{site.email}</a>. We respond within 30 days. You also have the right to lodge a complaint with the Spanish data protection authority (Agencia Española de Protección de Datos,{" "}
                <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">aepd.es</a>).
              </p>

              <h2>Security</h2>
              <p>
                The site runs on Vercel with HTTPS enforced. Internal communications use Google Workspace and WhatsApp. Where we store client data, access is limited to the assigned team member and the founder.
              </p>

              <h2>Changes to this policy</h2>
              <p>
                If we change this policy, we will update the &ldquo;Last updated&rdquo; date at the top. Material changes will be flagged on the site for at least 30 days.
              </p>

              <hr />

              <p className="text-sm">
                This page is the BCN Ideal Services privacy notice. It has been written in plain language; it is not a substitute for legal advice. If you are a journalist, regulator, or counsel reviewing this notice, please reach out at{" "}
                <a href={`mailto:${site.email}`}>{site.email}</a>.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
