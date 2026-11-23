import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Motion";

const BOOKFEST_URL =
  "https://www.thebookfest.com/award_entries/lucky-lyn-lyn-at-big-school/";
const BEST_BOOK_AWARDS_URL =
  "https://www.americanbookfest.com/2026bbapressrelease.html";

const awardLink =
  "font-semibold text-primary underline decoration-accent-gold/60 underline-offset-4 hover:decoration-accent-gold transition-colors";

export function AwardsSpotlight() {
  return (
    <section className="relative py-28 md:py-36 bg-surface-container-low overflow-hidden">
      <div className="mx-auto max-w-[var(--container-max)] px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal>
            <p className="text-eyebrow text-accent-gold mb-3">Recognition</p>
            <h2 className="text-display text-primary text-4xl md:text-5xl text-balance">
              Lucky Lyn-Lyn Celebrates Two International Award Wins!
            </h2>
            <p className="text-lg text-on-surface-variant mt-6 leading-relaxed">
              Big news for Lucky Lyn-Lyn! BCN Ideal Services Founder and CEO, and
              Author Lyn Lozano Galicia&rsquo;s beloved children&rsquo;s book
              series has earned two remarkable international recognitions in
              2026. <em>Lucky Lyn-Lyn at Big School</em>, illustrated by Dan
              Negrut, won{" "}
              <a
                href={BOOKFEST_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={awardLink}
              >
                Second Place at The BookFest Awards
              </a>{" "}
              in the Nonfiction &ndash; Children&rsquo;s &ndash; Family
              category. Adding to the excitement,{" "}
              <em>Lucky Lyn-Lyn&rsquo;s Big Idea</em> was named a{" "}
              <a
                href={BEST_BOOK_AWARDS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={awardLink}
              >
                Finalist in the 2026 Best Book Awards
              </a>{" "}
              by American Book Fest, ranking among only seven finalists in the
              Children&rsquo;s Educational category. These honors celebrate the
              series&rsquo; heartwarming stories and its mission to inspire
              children to dream big, embrace imagination, choose kindness, and
              believe in themselves.
            </p>
            <Link
              href="/news"
              className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/30 text-primary font-semibold text-sm hover:bg-primary hover:text-white transition-all"
            >
              Read the news <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-[24px] bg-white border border-outline-variant/40 clean-elevation p-8 md:p-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/awards/lucky-lyn-lyn-logo.jpg"
                alt="Lucky Lyn-Lyn children's book series logo"
                width={793}
                height={900}
                className="mx-auto w-full max-w-[280px] h-auto"
                loading="lazy"
              />
              <div className="mt-8 pt-8 border-t border-outline-variant/40 grid grid-cols-2 gap-6 items-center">
                <a
                  href={BOOKFEST_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition-transform hover:-translate-y-1"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/awards/bookfest-award-winner.png"
                    alt="The BookFest Award Winner seal"
                    width={497}
                    height={502}
                    className="mx-auto w-full max-w-[170px] h-auto"
                    loading="lazy"
                  />
                </a>
                <a
                  href={BEST_BOOK_AWARDS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition-transform hover:-translate-y-1"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/awards/best-book-awards-finalist-2026.png"
                    alt="Best Book Awards 2026 Award Finalist seal, American Book Fest"
                    width={555}
                    height={450}
                    className="mx-auto w-full max-w-[190px] h-auto"
                    loading="lazy"
                  />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
