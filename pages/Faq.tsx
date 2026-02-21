import React, { useMemo, useState } from "react";
import {
  ChevronDown,
  Dumbbell,
  ShieldCheck,
  Sparkles,
  Wifi,
  Users,
  Droplets,
  Lock,
  Video,
} from "lucide-react";
import { Link } from "react-router-dom";

import gymFitnessImg from "@/assets/gymFitness.jpg";
import freeWeightFloorImg from "@/assets/freeWeightFloor.webp";
import cardioKickboxingImg from "@/assets/cardioKickboxing.jpg";

type FaqItem = {
  question: string;
  answer: string;
};

const FAQS: FaqItem[] = [
  {
    question: "Do you offer a free trial?",
    answer:
      "Yes — most locations run introductory trials or day passes. Availability and timing can vary by center, so the quickest way is to reach us via the Contact page.",
  },
  {
    question: "What are your opening hours?",
    answer:
      "Hours differ by location and season. Open the Find Gym page to pick a center, then use the 'Locate on Maps' link or contact details to confirm exact timings.",
  },
  {
    question: "Do you have personal training?",
    answer:
      "Yes. Our coaches can help with strength, fat loss, conditioning, and sport-specific goals. Packages are tailored based on your schedule and training history.",
  },
  {
    question: "Are lockers and changing rooms available?",
    answer:
      "Most centers have dedicated changing rooms and locker facilities. Some locations offer additional amenities depending on space and membership tier.",
  },
  {
    question: "Do you provide towels or complimentary drinks?",
    answer:
      "Amenities vary by center. Many locations provide towels and hydration options as part of select memberships — ask your chosen location for the current inclusion list.",
  },
  {
    question: "Is there Wi‑Fi at the gym?",
    answer:
      "Several centers offer a Wi‑Fi zone for members. Availability depends on the branch infrastructure.",
  },
  {
    question: "Can beginners join?",
    answer:
      "Absolutely. We'll guide you through an onboarding plan (movement basics, progressive overload, recovery, and nutrition habits) so you can train safely and confidently.",
  },
  {
    question: "How do I get membership pricing?",
    answer:
      "Pricing is location-specific. Tap 'Join Now' on a location and we’ll connect you with the team for current plans and offers.",
  },
];

const AMENITIES = [
  {
    title: "Men & Women Changing Rooms",
    description: "Clean, private spaces to refresh before and after training.",
    icon: Users,
  },
  {
    title: "Membership Card Access",
    description: "Quick entry and a smoother member experience at the center.",
    icon: ShieldCheck,
  },
  {
    title: "Members Lounge",
    description: "A comfortable place to cool down, recover, and reset.",
    icon: Sparkles,
  },
  {
    title: "Complimentary Drinks",
    description: "Hydration support options (availability varies by location).",
    icon: Droplets,
  },
  {
    title: "Towels & Lockers",
    description:
      "Secure storage and convenience amenities (location dependent).",
    icon: Lock,
  },
  {
    title: "Free Wi‑Fi Zone",
    description: "Stay connected between sessions or while you recover.",
    icon: Wifi,
  },
];

const FaqAccordionItem: React.FC<{
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ item, isOpen, onToggle }) => {
  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left hover:bg-zinc-900/50 transition-colors cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="text-white font-semibold">{item.question}</span>
        <ChevronDown
          className={`w-5 h-5 text-zinc-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 text-green-300/90 leading-relaxed text-sm ">
            {item.answer}
          </div>
        </div>
      </div>
    </div>
  );
};

const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const heroStats = useMemo(
    () => [
      { label: "Centers", value: "38+" },
      { label: "Cities", value: "Multiple" },
      { label: "Focus", value: "Strength + Fitness" },
    ],
    [],
  );

  return (
    <main className="bg-black">
      {/* Hero */}
      <section className="relative overflow-hidden pt-36">
        <div className="absolute inset-0">
          <img
            src={gymFitnessImg}
            alt="Gym floor"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/25 rounded-full blur-[120px]" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-red-600/20 rounded-full blur-[140px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-sm font-bold mb-5">
            <Dumbbell className="w-4 h-4" />
            EVERYTHING YOU NEED TO KNOW
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight">
            FAQ &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">
              HELP
            </span>
          </h1>
          <p className="mt-5 text-zinc-300 max-w-3xl text-lg leading-relaxed">
            Train with intent. Progress with consistency. Here are quick answers
            about memberships, amenities, and how to get started.
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
            {heroStats.map((s) => (
              <div
                key={s.label}
                className="bg-zinc-950/60 backdrop-blur border border-zinc-800 rounded-2xl px-5 py-4"
              >
                <div className="text-2xl font-black text-white">{s.value}</div>
                <div className="text-xs uppercase tracking-widest text-zinc-500 mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/find-gym"
              className="bg-white text-black hover:bg-zinc-200 px-6 py-3 rounded-2xl font-bold transition-colors"
            >
              Find a Center
            </Link>
            <Link
              to="/contact"
              className="border border-zinc-700 hover:border-zinc-500 text-white px-6 py-3 rounded-2xl font-bold transition-colors hover:bg-orange-600 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* About (inspired by old FAQ page copy, paraphrased) */}
      <section className="py-20 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black">About THE GYM</h2>
              <p className="mt-5 text-zinc-400 leading-relaxed">
                Our goal is simple: deliver a premium training experience built
                around your fitness needs — with modern equipment, skilled
                trainers, and a focused environment that respects your privacy
                and consistency.
              </p>
              <p className="mt-4 text-zinc-400 leading-relaxed">
                We blend traditional strength culture with practical sports
                science so beginners and experienced lifters can progress
                safely. Whether you're here for fat loss, strength, or
                conditioning, the plan stays the same: train smart, recover
                well, repeat.
              </p>

              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                <div className="bg-black border border-zinc-800 rounded-2xl p-5">
                  <div className="text-white font-bold">
                    High‑quality equipment
                  </div>
                  <div className="text-zinc-500 text-sm mt-2">
                    Strength + cardio + functional training zones.
                  </div>
                </div>
                <div className="bg-black border border-zinc-800 rounded-2xl p-5">
                  <div className="text-white font-bold">
                    Coach-first approach
                  </div>
                  <div className="text-zinc-500 text-sm mt-2">
                    Guidance that adapts to your body and schedule.
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 bg-black border border-zinc-800 rounded-3xl overflow-hidden">
                <img
                  src={freeWeightFloorImg}
                  alt="Free weight floor"
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="bg-black border border-zinc-800 rounded-3xl overflow-hidden">
                <img
                  src={cardioKickboxingImg}
                  alt="Training session"
                  className="w-full h-44 object-cover"
                />
              </div>
              <div className="bg-black border border-zinc-800 rounded-3xl overflow-hidden">
                <Link to="/gallery">
                  <div className="h-44 w-full flex items-center justify-center">
                    <div className="text-center px-6">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 mb-3">
                        <Video className="w-6 h-6 text-orange-500" />
                      </div>
                      <div className="text-white font-bold">Tour the space</div>
                      <div className="text-zinc-500 text-sm mt-1">
                        See what training looks like.
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <h2 className="text-3xl md:text-4xl font-black">Amenities</h2>
              <p className="mt-4 text-zinc-400 max-w-2xl">
                A few member-favorite features inspired by our legacy club
                experience. Amenities can differ by branch.
              </p>
            </div>
            <Link
              to="/find-gym"
              className="text-orange-500 hover:text-orange-400 font-bold"
            >
              Check your location →
            </Link>
          </div>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {AMENITIES.map((a) => {
              const Icon = a.icon;
              return (
                <div
                  key={a.title}
                  className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6"
                >
                  <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-orange-500" />
                  </div>
                  <div className="mt-4 text-white font-bold">{a.title}</div>
                  <div className="mt-2 text-zinc-500 text-sm leading-relaxed">
                    {a.description}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-20 bg-zinc-950">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-zinc-400">
            Still unsure? Drop us a message and we’ll guide you to the right
            plan.
          </p>

          <div className="mt-10 space-y-4">
            {FAQS.map((item, idx) => (
              <FaqAccordionItem
                key={item.question}
                item={item}
                isOpen={openIndex === idx}
                onToggle={() => setOpenIndex((v) => (v === idx ? null : idx))}
              />
            ))}
          </div>

          <div className="mt-10 bg-black border border-zinc-800 rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <div className="text-white font-bold">Need a quick answer?</div>
                <div className="text-zinc-500 text-sm">
                  Contact our team and we’ll respond ASAP.
                </div>
              </div>
            </div>
            <Link
              to="/contact"
              className="bg-orange-600 hover:bg-orange-500 text-white px-6 py-3 rounded-2xl font-bold transition-colors"
            >
              Go to Contact
            </Link>
          </div>
        </div>
      </section>

      {/* Video */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black">
                A quick look inside
              </h2>
              <p className="mt-4 text-zinc-400 leading-relaxed">
                Want to see the vibe before you visit? Watch a short tour, then
                pick your nearest branch and start your first session.
              </p>
              <div className="mt-6 flex gap-3 flex-wrap">
                <Link
                  to="/find-gym"
                  className="border border-zinc-700 hover:border-zinc-500 text-white px-6 py-3 rounded-2xl font-bold transition-colors"
                >
                  Find a Center
                </Link>
                <Link
                  to="/contact"
                  className="bg-white text-black hover:bg-zinc-200 px-6 py-3 rounded-2xl font-bold transition-colors"
                >
                  Ask About Membership
                </Link>
              </div>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden">
              <div className="aspect-video w-full">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/TcXLWmE1Xj0?si=zztCp63TE31TMmyu&amp;start=4"
                  title="Gym video"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Faq;
