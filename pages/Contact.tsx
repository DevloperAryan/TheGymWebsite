import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BadgeCheck,
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";

import mainHero from "@/assets/MainHeroImg.png";
import maleImg from "@/assets/male.png";

type InquiryFormState = {
  fullName: string;
  phone: string;
  email: string;
  goal: "Muscle Gain" | "Fat Loss" | "General Fitness" | "Strength" | "Endurance";
  preferredBranch: string;
  membership: "Trial" | "Monthly" | "Quarterly" | "Yearly";
  bestTime: "Morning" | "Afternoon" | "Evening";
  message: string;
  consent: boolean;
};

type InquiryErrors = Partial<Record<keyof InquiryFormState, string>>;

const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
};

const normalizePhone = (value: string) => value.replace(/[^0-9+]/g, "");

const validate = (state: InquiryFormState): InquiryErrors => {
  const errors: InquiryErrors = {};

  if (state.fullName.trim().length < 2) {
    errors.fullName = "Please enter your full name.";
  }

  const cleanedPhone = normalizePhone(state.phone);
  const digits = cleanedPhone.replace(/\D/g, "");
  if (digits.length < 10) {
    errors.phone = "Please enter a valid phone number (min 10 digits).";
  }

  if (!isValidEmail(state.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (state.message.trim().length > 0 && state.message.trim().length < 10) {
    errors.message = "If you add a message, please write at least 10 characters.";
  }

  if (!state.consent) {
    errors.consent = "Consent is required to submit this form.";
  }

  return errors;
};

const FieldLabel: React.FC<{ icon: React.ReactNode; label: string; hint?: string }> = ({
  icon,
  label,
  hint,
}) => {
  return (
    <div className="flex items-center justify-between gap-3 mb-2">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400">
        <span className="text-orange-400">{icon}</span>
        {label}
      </div>
      {hint && <div className="text-xs text-zinc-500">{hint}</div>}
    </div>
  );
};

const Contact: React.FC = () => {
  const [form, setForm] = useState<InquiryFormState>({
    fullName: "",
    phone: "",
    email: "",
    goal: "Muscle Gain",
    preferredBranch: "",
    membership: "Trial",
    bestTime: "Evening",
    message: "",
    consent: true,
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<InquiryErrors>({});

  const branches = useMemo(
    () => [
      "Adarsh Nagar",
      "Pitampura",
      "Patel Nagar",
      "Rajouri Garden",
      "Janak Puri",
      "Paschim Vihar",
      "Model Town",
      "Rohini",
      "Dwarka",
      "Gurugram",
      "Noida",
    ],
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      const payload = {
        ...form,
        phone: normalizePhone(form.phone),
        createdAt: new Date().toISOString(),
      };

      // No backend yet: store locally so it feels real and debuggable.
      const key = "gymInquiry_submissions_v1";
      const existing = localStorage.getItem(key);
      const list = existing ? (JSON.parse(existing) as unknown[]) : [];
      localStorage.setItem(key, JSON.stringify([payload, ...list].slice(0, 50)));

      setSubmitted(true);
    } catch {
      setErrors({
        email: "Could not submit right now. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/5 pt-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-orange-500/20 blur-[140px]" />
          <div className="absolute top-20 -right-24 h-96 w-96 rounded-full bg-red-600/10 blur-[140px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold tracking-widest uppercase text-zinc-200">
                <Sparkles className="h-4 w-4 text-orange-400" />
                Talk to The Indian Gym
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="mt-5 text-4xl sm:text-5xl md:text-6xl font-black tracking-tight"
              >
                Let’s build your
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                  {" "}perfect routine
                </span>
              </motion.h1>

              <p className="mt-4 text-zinc-400 text-base sm:text-lg max-w-2xl">
                Ask about membership, class timings, trainer availability, or the best plan for your goal. Fill the inquiry form and we’ll reach out.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="mailto:contact@theindiangym.com"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-black px-6 py-3 font-bold hover:bg-orange-500 hover:text-white transition-all"
                >
                  <Mail className="h-5 w-5" />
                  Email Us
                </a>
                <a 
                  href="https://www.instagram.com/thegym.in"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-black px-6 py-3 font-bold hover:bg-zinc-300 transition-all"
                >
                  <Instagram className="h-5 w-5 text-[#e312ee]"/>
                </a>
                <a 
                  href="https://www.facebook.co m/search/pages/?q=the%20gym%20health%20planet"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-black px-6 py-3 font-bold hover:bg-zinc-300 transition-all"
                >
                  <Facebook className="h-5 w-5 text-[#0880ff]"/>
                </a>
                <Link
                  to="/find-gym"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-zinc-900/50 backdrop-blur px-6 py-3 font-bold hover:border-orange-500/40 hover:text-orange-300 transition-all"
                >
                  <MapPin className="h-5 w-5" />
                  Find a Gym
                </Link>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-2xl border border-white/10 bg-zinc-900/40 backdrop-blur p-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400">
                    <Phone className="h-4 w-4 text-orange-400" />
                    Phone
                  </div>
                  <a
                    href="tel:+919811594828"
                    className="mt-2 block text-lg font-bold text-white hover:text-orange-200 transition-colors"
                  >
                    +91 9811594828
                  </a>
                  <div className="mt-1 text-sm text-zinc-500">Call for quick inquiries</div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-zinc-900/40 backdrop-blur p-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400">
                    <Clock className="h-4 w-4 text-orange-400" />
                    Hours
                  </div>
                  <div className="mt-2 text-lg font-bold text-white">5:00 AM – 11:00 PM</div>
                  <div className="mt-1 text-sm text-zinc-500">Open 7 days a week</div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-zinc-900/40 backdrop-blur p-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400">
                    <MessageSquare className="h-4 w-4 text-orange-400" />
                    Response
                  </div>
                  <div className="mt-2 text-lg font-bold text-white">Within 24 hours</div>
                  <div className="mt-1 text-sm text-zinc-500">Email / WhatsApp / Call</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-3xl border border-white/10 bg-zinc-900/40 backdrop-blur overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 via-transparent to-red-500/10" />
                <div className="relative p-6">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                      <BadgeCheck className="h-6 w-6 text-orange-400" />
                    </div>
                    <div>
                      <div className="text-sm font-bold uppercase tracking-widest text-zinc-400">
                        New Member Offer
                      </div>
                      <div className="text-xl font-black">Free 3‑Day Trial Pass</div>
                    </div>
                  </div>

                  <div className="mt-5 rounded-2xl overflow-hidden border border-white/10 bg-black">
                    <img
                      src={mainHero}
                      alt="Gym atmosphere"
                      className="w-full h-56 object-cover"
                    />
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                        Trainers
                      </div>
                      <div className="mt-2 text-2xl font-black">Certified</div>
                      <div className="mt-1 text-sm text-zinc-500">Form-first coaching</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                        Plans
                      </div>
                      <div className="mt-2 text-2xl font-black">AI + Human</div>
                      <div className="mt-1 text-sm text-zinc-500">Smart + practical</div>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-3 text-sm text-zinc-400">
                    <img src={maleImg} alt="Coach" className="h-10 w-10 rounded-full border border-white/10 bg-white/5" />
                    <div>
                      <div className="text-white font-semibold">Need help choosing?</div>
                      <div>Tell us your goal—our team suggests the best path.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FORM + INFO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-white/10 bg-zinc-900/40 backdrop-blur p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Gym Inquiry Form</h2>
                  <p className="mt-2 text-zinc-400">
                    Fill the required fields and we’ll contact you with timings, pricing, and recommendations.
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold tracking-widest uppercase text-zinc-200">
                  <ShieldCheck className="h-4 w-4 text-orange-400" />
                  Secure
                </div>
              </div>

              {submitted ? (
                <div className="mt-8 rounded-2xl border border-orange-500/20 bg-orange-500/10 p-6">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-2xl bg-orange-500/15 border border-orange-500/20 flex items-center justify-center">
                      <BadgeCheck className="h-6 w-6 text-orange-300" />
                    </div>
                    <div>
                      <div className="text-xl font-black">Inquiry received</div>
                      <div className="text-zinc-300">We’ll reach out within 24 hours.</div>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setForm((p) => ({ ...p, message: "" }));
                      }}
                      className="rounded-xl bg-white text-black px-6 py-3 font-bold hover:bg-orange-500 hover:text-white transition-all"
                    >
                      Send another
                    </button>
                    <Link
                      to="/find-gym"
                      className="rounded-xl border border-white/10 bg-zinc-950/40 px-6 py-3 font-bold hover:border-orange-500/40 hover:text-orange-200 transition-all text-center"
                    >
                      Find nearest branch
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <FieldLabel icon={<User className="h-4 w-4" />} label="Full Name" hint="Required" />
                      <input
                        value={form.fullName}
                        onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))}
                        className={`w-full rounded-xl bg-black/30 border px-4 py-3 outline-none transition-colors ${
                          errors.fullName ? "border-red-500/50 focus:border-red-400" : "border-white/10 focus:border-orange-500/50"
                        }`}
                        placeholder="e.g., Aryan Kumar"
                        required
                      />
                      {errors.fullName && <div className="mt-2 text-sm text-red-300">{errors.fullName}</div>}
                    </div>

                    <div>
                      <FieldLabel icon={<Phone className="h-4 w-4" />} label="Phone Number" hint="Required" />
                      <input
                        value={form.phone}
                        onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                        className={`w-full rounded-xl bg-black/30 border px-4 py-3 outline-none transition-colors ${
                          errors.phone ? "border-red-500/50 focus:border-red-400" : "border-white/10 focus:border-orange-500/50"
                        }`}
                        placeholder="e.g., +91 98xxxxxx10"
                        inputMode="tel"
                        required
                      />
                      {errors.phone && <div className="mt-2 text-sm text-red-300">{errors.phone}</div>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <FieldLabel icon={<Mail className="h-4 w-4" />} label="Email" hint="Required" />
                      <input
                        value={form.email}
                        onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                        className={`w-full rounded-xl bg-black/30 border px-4 py-3 outline-none transition-colors ${
                          errors.email ? "border-red-500/50 focus:border-red-400" : "border-white/10 focus:border-orange-500/50"
                        }`}
                        placeholder="e.g., aryan@email.com"
                        inputMode="email"
                        required
                      />
                      {errors.email && <div className="mt-2 text-sm text-red-300">{errors.email}</div>}
                    </div>

                    <div>
                      <FieldLabel icon={<Sparkles className="h-4 w-4" />} label="Goal" />
                      <select
                        value={form.goal}
                        onChange={(e) => setForm((p) => ({ ...p, goal: e.target.value as InquiryFormState["goal"] }))}
                        className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-orange-500/50"
                      >
                        <option>Muscle Gain</option>
                        <option>Fat Loss</option>
                        <option>General Fitness</option>
                        <option>Strength</option>
                        <option>Endurance</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div>
                      <FieldLabel icon={<MapPin className="h-4 w-4" />} label="Preferred Branch" />
                      <select
                        value={form.preferredBranch}
                        onChange={(e) => setForm((p) => ({ ...p, preferredBranch: e.target.value }))}
                        className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-orange-500/50"
                      >
                        <option value="">Any / Not sure</option>
                        {branches.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <FieldLabel icon={<BadgeCheck className="h-4 w-4" />} label="Membership" />
                      <select
                        value={form.membership}
                        onChange={(e) => setForm((p) => ({ ...p, membership: e.target.value as InquiryFormState["membership"] }))}
                        className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-orange-500/50"
                      >
                        <option>Trial</option>
                        <option>Monthly</option>
                        <option>Quarterly</option>
                        <option>Yearly</option>
                      </select>
                    </div>

                    <div>
                      <FieldLabel icon={<Clock className="h-4 w-4" />} label="Best time to call" />
                      <select
                        value={form.bestTime}
                        onChange={(e) => setForm((p) => ({ ...p, bestTime: e.target.value as InquiryFormState["bestTime"] }))}
                        className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-orange-500/50"
                      >
                        <option>Morning</option>
                        <option>Afternoon</option>
                        <option>Evening</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <FieldLabel icon={<MessageSquare className="h-4 w-4" />} label="Message" hint="Optional" />
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                      className={`w-full min-h-[120px] resize-y rounded-xl bg-black/30 border px-4 py-3 outline-none transition-colors ${
                        errors.message ? "border-red-500/50 focus:border-red-400" : "border-white/10 focus:border-orange-500/50"
                      }`}
                      placeholder="Tell us your goal, experience level, injuries (if any), preferred timings…"
                    />
                    {errors.message && <div className="mt-2 text-sm text-red-300">{errors.message}</div>}
                  </div>

                  <div>
                    <label className="flex items-start gap-3 text-sm text-zinc-300">
                      <input
                        type="checkbox"
                        checked={form.consent}
                        onChange={(e) => setForm((p) => ({ ...p, consent: e.target.checked }))}
                        className="mt-1 h-4 w-4 rounded border-white/20 bg-black/30"
                        required
                      />
                      <span>
                        I agree to be contacted by The Indian Gym via call/WhatsApp/email regarding my inquiry.
                        <span className="block text-xs text-zinc-500 mt-1">We do not sell your data.</span>
                      </span>
                    </label>
                    {errors.consent && <div className="mt-2 text-sm text-red-300">{errors.consent}</div>}
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white text-black px-6 py-4 font-black hover:bg-orange-500 hover:text-white transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <div className="animate-spin h-5 w-5 border-2 border-black border-t-transparent rounded-full" />
                        Submitting…
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Submit inquiry
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-white/10 bg-zinc-900/40 backdrop-blur p-6">
              <h3 className="text-xl font-black">What happens next?</h3>
              <div className="mt-4 space-y-4">
                {[
                  {
                    title: "We review your goal",
                    desc: "Muscle gain, fat loss, or general fitness—we tailor recommendations.",
                  },
                  {
                    title: "We suggest the best plan",
                    desc: "Membership options + classes + trainer guidance (based on your schedule).",
                  },
                  {
                    title: "You start strong",
                    desc: "Get a trial pass, onboarding, and a clear routine to follow.",
                  },
                ].map((s) => (
                  <div key={s.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-white font-semibold">{s.title}</div>
                    <div className="mt-1 text-sm text-zinc-400">{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-zinc-900/40 backdrop-blur p-6">
              <h3 className="text-xl font-black">FAQ</h3>
              <div className="mt-4 space-y-3">
                {[
                  {
                    q: "Do you have beginner-friendly plans?",
                    a: "Yes. We start with form + consistency, then progress gradually.",
                  },
                  {
                    q: "Can I train for weight loss and strength together?",
                    a: "Absolutely. We balance strength training + cardio + nutrition.",
                  },
                  {
                    q: "Do you offer personal training?",
                    a: "Yes. Ask in the form and we’ll share trainer slots and pricing.",
                  },
                ].map((f) => (
                  <div key={f.q} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-white font-semibold">{f.q}</div>
                    <div className="mt-1 text-sm text-zinc-400">{f.a}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <Link
                  to="/faq"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-zinc-950/40 px-5 py-3 font-bold hover:border-orange-500/40 hover:text-orange-200 transition-all w-full"
                >
                  View all FAQs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
