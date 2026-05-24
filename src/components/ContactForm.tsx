"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, ArrowLeft, Check, Loader2, Sparkles, Building2, Diamond, BriefcaseBusiness } from "lucide-react";
import { cn } from "@/lib/cn";

const schema = z.object({
  topic: z.string().min(1, "Please choose what you need"),
  name: z.string().min(2, "Please tell us your name"),
  email: z.string().email("Please use a valid email"),
  phone: z.string().min(6, "Please include a phone number we can reach you on"),
  area: z.string().min(2, "Where in Barcelona?"),
  details: z.string().min(20, "A little more detail helps us give a useful quote"),
  consent: z.literal(true, { error: "Please accept the privacy notice" }),
});

type FormValues = z.infer<typeof schema>;

const topics = [
  { value: "home-cleaning", label: "Home cleaning", icon: Sparkles, desc: "Weekly, bi-weekly or one-off cleans" },
  { value: "company-cleaning", label: "Office cleaning", icon: Building2, desc: "Office, co-working, short-term rentals" },
  { value: "uhnw", label: "UHNW lifestyle", icon: Diamond, desc: "Discreet lifestyle management" },
  { value: "careers", label: "I'd like to apply", icon: BriefcaseBusiness, desc: "Join the BCN Ideal team" },
];

export function ContactForm() {
  const searchParams = useSearchParams();
  const initialTopic = searchParams.get("topic") ?? "";
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    trigger,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { topic: initialTopic },
    mode: "onTouched",
  });

  const topic = watch("topic");

  const next = async () => {
    let ok = true;
    if (step === 0) ok = await trigger("topic");
    if (step === 1) ok = await trigger(["name", "email", "phone"]);
    if (ok) setStep((s) => Math.min(s + 1, 2));
  };

  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = async (values: FormValues) => {
    // No backend wired. Shows a confirmation and logs to console for now.
    await new Promise((r) => setTimeout(r, 800));
    if (typeof window !== "undefined") {
      console.info("[BCN] Contact form submission", values);
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        className="rounded-[28px] border border-outline-variant/40 bg-white p-10 md:p-14 text-center clean-elevation"
      >
        <div className="w-16 h-16 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center mb-6">
          <Check className="w-7 h-7" />
        </div>
        <h3 className="text-display text-2xl md:text-3xl text-primary mb-3">
          Thank you. We have your details.
        </h3>
        <p className="text-on-surface-variant max-w-md mx-auto">
          We will review and come back to you within one working day. If it is urgent, WhatsApp us. We are faster there.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-[28px] border border-outline-variant/40 bg-white clean-elevation overflow-hidden"
    >
      {/* Progress */}
      <div className="px-7 pt-7 pb-4 border-b border-outline-variant/40">
        <div className="flex items-center gap-2 mb-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-all",
                i <= step ? "bg-primary" : "bg-outline-variant/50"
              )}
            />
          ))}
        </div>
        <div className="flex items-center justify-between text-xs uppercase tracking-widest text-on-surface-variant font-semibold">
          <span>Step {step + 1} of 3</span>
          <span>
            {step === 0 && "What you need"}
            {step === 1 && "Who you are"}
            {step === 2 && "The details"}
          </span>
        </div>
      </div>

      <div className="p-7 md:p-10">
        <AnimatePresence mode="wait" initial={false}>
          {step === 0 && (
            <motion.section
              key="step-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-headline text-xl text-primary mb-2">What can we help with?</h3>
              <p className="text-on-surface-variant mb-6">Pick the closest fit. You can always change later.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {topics.map((t) => {
                  const active = topic === t.value;
                  return (
                    <button
                      type="button"
                      key={t.value}
                      onClick={() => setValue("topic", t.value, { shouldValidate: true })}
                      className={cn(
                        "text-left p-5 rounded-2xl border transition-all",
                        active
                          ? "border-primary bg-primary/5 ring-2 ring-primary/30"
                          : "border-outline-variant/60 hover:border-primary/40 hover:bg-surface-container-low"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            "shrink-0 w-10 h-10 rounded-xl flex items-center justify-center",
                            active ? "bg-primary text-white" : "bg-primary/10 text-primary"
                          )}
                        >
                          <t.icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-semibold text-primary">{t.label}</p>
                          <p className="text-xs text-on-surface-variant mt-0.5">{t.desc}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              {errors.topic && <p className="mt-3 text-sm text-error">{errors.topic.message}</p>}
            </motion.section>
          )}

          {step === 1 && (
            <motion.section
              key="step-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-headline text-xl text-primary mb-2">Who shall we reply to?</h3>
              <p className="text-on-surface-variant mb-6">
                We use this only to send our proposal back. We don&apos;t auto-subscribe you to anything.
              </p>
              <div className="space-y-4">
                <Field label="Your name" error={errors.name?.message}>
                  <input
                    {...register("name")}
                    placeholder="Marina Cohen"
                    className="form-input"
                    autoComplete="name"
                  />
                </Field>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="Email" error={errors.email?.message}>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="you@example.com"
                      className="form-input"
                      autoComplete="email"
                    />
                  </Field>
                  <Field label="Phone (incl. country code)" error={errors.phone?.message}>
                    <input
                      {...register("phone")}
                      placeholder="+34 600 000 000"
                      className="form-input"
                      autoComplete="tel"
                    />
                  </Field>
                </div>
                <Field label="Neighbourhood in Barcelona" error={errors.area?.message}>
                  <input
                    {...register("area")}
                    placeholder="Eixample, Sarrià-Sant Gervasi, Gràcia..."
                    className="form-input"
                  />
                </Field>
              </div>
            </motion.section>
          )}

          {step === 2 && (
            <motion.section
              key="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-headline text-xl text-primary mb-2">Tell us the details.</h3>
              <p className="text-on-surface-variant mb-6">
                What is the situation? Size of home, schedule, special requirements. The more we know, the more tailored our reply.
              </p>
              <Field label="Brief" error={errors.details?.message}>
                <textarea
                  {...register("details")}
                  rows={6}
                  placeholder="We have a 3-bed apartment in Sant Gervasi, currently no help. Two children (4 and 7). Looking for weekly cleaning + occasional babysitting on Saturdays..."
                  className="form-input min-h-[140px] resize-y"
                />
              </Field>
              <label className="mt-6 flex items-start gap-3 text-sm text-on-surface-variant">
                <input
                  type="checkbox"
                  {...register("consent")}
                  className="mt-1 w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary"
                />
                <span>
                  I&apos;ve read and accepted the{" "}
                  <a className="text-primary underline" href="/privacy">privacy notice</a>. BCN Ideal Services may use these details to respond to my request.
                </span>
              </label>
              {errors.consent && (
                <p className="mt-2 text-sm text-error">{errors.consent.message}</p>
              )}
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      {/* Footer with nav */}
      <div className="px-7 md:px-10 py-5 border-t border-outline-variant/40 bg-surface-container-low flex items-center justify-between">
        <button
          type="button"
          onClick={prev}
          disabled={step === 0}
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all",
            step === 0
              ? "text-on-surface-variant/40 cursor-not-allowed"
              : "text-primary hover:bg-primary/10"
          )}
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        {step < 2 ? (
          <button
            type="button"
            onClick={next}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary-container transition-all"
          >
            Next <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-accent-gold text-white text-sm font-semibold hover:brightness-110 transition-all disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Sending...
              </>
            ) : (
              <>
                Send request <Check className="w-4 h-4" />
              </>
            )}
          </button>
        )}
      </div>

      <style jsx>{`
        .form-input {
          width: 100%;
          padding: 0.85rem 1rem;
          border-radius: 14px;
          border: 1px solid var(--color-outline-variant);
          background: white;
          color: var(--color-on-surface);
          font-size: 16px;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .form-input:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 4px rgba(28, 59, 111, 0.12);
        }
        .form-input::placeholder { color: rgba(68, 71, 79, 0.55); }
      `}</style>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-widest text-on-surface-variant font-semibold mb-2">
        {label}
      </span>
      {children}
      {error && <span className="mt-1.5 block text-sm text-error">{error}</span>}
    </label>
  );
}
