import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Clock,
  Dumbbell,
  HeartPulse,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

import MainHeroImg from "@/assets/MainHeroImg.png";
import awardImg from "@/assets/award.jpg";
import cardioFitnessImg from "@/assets/cardioFitness.avif";
import circuitTrainingImg from "@/assets/circuitTraining.jpg";
import freeWeightFloorImg from "@/assets/freeWeightFloor.webp";
import gymFitnessImg from "@/assets/gymFitness.jpg";
import indoorCyclingImg from "@/assets/indoorCycling.webp";
import powerYogaImg from "@/assets/powerYoga.webp";
import aerobicsImg from "@/assets/aerobics.avif";
import amenitie from "@/assets/photos/premiumAmmenitie.webp";
import PremAmenitie from "@/assets/photos/premAmenitie.jpg";
import cardioKickboxingImg from "@/assets/cardioKickboxing.jpg";
import outdoorTrainingImg from "@/assets/outdoorTraining.avif";
import YogaImg from "@/assets/photos/yoga.webp";
import strengthTrainingImg from "@/assets/strengthTraining.avif";
import zumbaImg from "@/assets/zumba.avif";

import video1 from "@/assets/videos/finalVideo1.mp4";

import floorImg from "@/assets/photos/img2.jpg";
import { SmartImage } from "@/components/SmartImage";

type AdvantagesProps = {
  withTopPadding?: boolean;
};

const Advantages: React.FC<AdvantagesProps> = ({ withTopPadding = true }) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const picsum = (id: number, w: number, h: number) =>
    `https://picsum.photos/id/${id}/${w}/${h}`;

  const features = useMemo(
    () => [
      {
        id: 1,
        title: "State-of-the-Art Equipment",
        description:
          "Lift, push, pull—on modern machines and free weights built for smooth motion and better form.",
        icon: Dumbbell,
        highlight: "Premium Gear",
        imageSrcs: [floorImg, gymFitnessImg, circuitTrainingImg],
      },
      {
        id: 2,
        title: "Expert Personal Trainers",
        description:
          "Certified coaches who track your progress, fix technique, and tailor plans to your goals.",
        icon: Users,
        highlight: "1:1 Coaching",
        imageSrcs: [gymFitnessImg, cardioFitnessImg, indoorCyclingImg],
      },
      {
        id: 3,
        title: "Flexible Membership Hours",
        description:
          "Train before work, after work, or late night—your routine stays consistent, even when life gets busy.",
        icon: Clock,
        highlight: "Early → Late",
        imageSrcs: [MainHeroImg, indoorCyclingImg],
      },
      {
        id: 4,
        title: "Nutrition That Works",
        description:
          "Simple, sustainable guidance—macros, meal ideas, and recovery tips that actually fit your lifestyle.",
        icon: HeartPulse,
        highlight: "Fuel Smarter",
        imageSrcs: [amenitie, cardioFitnessImg],
      },
      {
        id: 5,
        title: "High-Energy Group Classes",
        description:
          "HIIT, Yoga, Dance, Strength circuits—find your people and stay accountable week after week.",
        icon: Zap,
        highlight: "Daily Sessions",
        imageSrcs: [zumbaImg, aerobicsImg, powerYogaImg],
      },
      {
        id: 6,
        title: "Recovery & Amenities",
        description:
          "Clean lockers, fresh showers, and recovery-focused spaces so you leave feeling better than you arrived.",
        icon: Award,
        highlight: "Recover Better",
        imageSrcs: [PremAmenitie, gymFitnessImg],
      },
    ],
    [],
  );

  return (
    <div
      className={`min-h-screen bg-zinc-950 ${withTopPadding ? "pt-24" : ""} text-white font-sans selection:bg-red-600 selection:text-white`}
    >
      {/* Hero Section Background Element */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <SmartImage
              srcs={[picsum(903, 2400, 1600), MainHeroImg, gymFitnessImg]}
              alt="Gym training environment"
              className="h-full w-full object-cover opacity-35"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/70 to-zinc-950" />
          </div>

          <div className="relative container mx-auto px-4 py-14 md:py-20">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="lg:pl-20"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/50 px-4 py-2 text-sm text-zinc-200">
                <Sparkles className="h-4 w-4 text-red-500" />
                <span className="font-semibold">Advantages</span>
                <span className="text-zinc-500">•</span>
                <span className="text-zinc-400">
                  built for real transformation
                </span>
              </div>

              <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">
                More than a gym —
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800 pb-4 lg:pl-20">
                  A system that makes you consistent.
                </span>
              </h1>

              <p className=" text-zinc-300 text-lg md:text-xl leading-relaxed ">
                Powerful equipment, expert coaching, recovery-focused amenities,
                and a community that keeps you showing up.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/classes"
                  className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all shadow-[0_0_20px_-5px_rgba(229,9,20,0.55)] hover:shadow-[0_0_30px_-5px_rgba(229,9,20,0.75)] hover:scale-[1.02] flex items-center justify-center"
                >
                  Explore Classes <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-zinc-900/60 hover:bg-zinc-800 text-white font-bold rounded-lg border border-zinc-700/70 transition-all hover:scale-[1.02] flex items-center justify-center"
                >
                  Book a Free Visit
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-950/55 p-5">
                  <div className="text-sm text-zinc-400">Hours</div>
                  <div className="mt-1 text-2xl font-bold">5AM – 11PM</div>
                  <div className="mt-1 text-xs text-zinc-500">
                    7 days a week
                  </div>
                </div>
                <div className="rounded-2xl border border-zinc-800 bg-zinc-950/55 p-5">
                  <div className="text-sm text-zinc-400">Coaching</div>
                  <div className="mt-1 text-2xl font-bold">Certified</div>
                  <div className="mt-1 text-xs text-zinc-500">
                    programs + form checks
                  </div>
                </div>
                <div className="rounded-2xl border border-zinc-800 bg-zinc-950/55 p-5">
                  <div className="text-sm text-zinc-400">Experience</div>
                  <div className="mt-1 text-2xl font-bold">Premium</div>
                  <div className="mt-1 text-xs text-zinc-500">
                    clean, modern, motivating
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="container mx-auto px-4 py-16 md:py-20">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-red-500 font-bold tracking-widest uppercase text-sm mb-4">
              Why Choose Us
            </h2>
            <p className="text-zinc-300 text-xl md:text-2xl font-semibold">
              Every advantage is designed to remove friction and make progress
              inevitable.
            </p>
            <p className="mt-3 text-zinc-500">
              Train smarter, recover faster, and stay consistent.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.id}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="group relative rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden"
                >
                  {/* Glow */}
                  <div
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-r from-red-600/20 to-red-900/10 opacity-0 transition-opacity duration-500 ${
                      hoveredCard === index ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  {/* Image */}
                  <div className="relative h-44">
                    <SmartImage
                      srcs={feature.imageSrcs}
                      alt={feature.title}
                      className="h-full w-full object-cover opacity-80 group-hover:opacity-95 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
                      <div className="inline-flex items-center gap-2 rounded-full bg-zinc-950/70 border border-zinc-800 px-3 py-1.5">
                        <Icon className="w-4 h-4 text-red-500" />
                        <span className="text-sm font-semibold text-zinc-100">
                          {feature.title}
                        </span>
                      </div>
                      <span className="shrink-0 text-xs font-bold px-3 py-1 bg-zinc-950/70 rounded-full text-zinc-300 border border-zinc-800">
                        {feature.highlight}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <p className="text-zinc-400 leading-relaxed">
                      {feature.description}
                    </p>

                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex items-center text-xs text-zinc-500 gap-2">
                        <ShieldCheck className="w-4 h-4 text-zinc-400" />
                        <span>Clean, safe, well-maintained</span>
                      </div>
                      <Link
                        to="/find-gym"
                        className="inline-flex items-center text-sm font-semibold text-red-500 hover:text-red-400 transition-colors"
                      >
                        See location <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Process */}
          <div className="mt-16 md:mt-20 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-7">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-red-600/15 border border-red-500/20 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-red-500" />
                </div>
                <h3 className="text-lg font-bold">Pick a goal</h3>
              </div>
              <p className="mt-3 text-zinc-400">
                Fat loss, strength, muscle, endurance—choose a direction and
                we’ll shape the plan around you.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-7">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-red-600/15 border border-red-500/20 flex items-center justify-center">
                  <Dumbbell className="h-5 w-5 text-red-500" />
                </div>
                <h3 className="text-lg font-bold">Train with structure</h3>
              </div>
              <p className="mt-3 text-zinc-400">
                Follow smart programming with coaching support so every session
                moves you forward.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-7">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-red-600/15 border border-red-500/20 flex items-center justify-center">
                  <HeartPulse className="h-5 w-5 text-red-500" />
                </div>
                <h3 className="text-lg font-bold">Recover & repeat</h3>
              </div>
              <p className="mt-3 text-zinc-400">
                Recovery habits + consistency beat intensity. We make it easy to
                come back tomorrow.
              </p>
            </div>
          </div>

          {/* Social proof */}
          <div className="mt-16 md:mt-20 rounded-3xl border border-zinc-800 bg-zinc-900 overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold">
                    Members feel the difference
                  </h2>
                  <p className="mt-2 text-zinc-400">
                    Better coaching, better vibe, better results.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/50 px-4 py-2 text-sm text-zinc-300">
                  <Sparkles className="h-4 w-4 text-red-500" />
                  <span>High retention community</span>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Coaching that clicks",
                    body: "My form improved in the first week. I finally feel confident on the big lifts.",
                  },
                  {
                    title: "Consistent routine",
                    body: "The hours and the class schedule make it easy to stick to training, even on busy days.",
                  },
                  {
                    title: "Clean + premium",
                    body: "Everything feels fresh and well-maintained. Recovery amenities are a huge bonus.",
                  },
                ].map((t) => (
                  <div
                    key={t.title}
                    className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-6"
                  >
                    <div className="text-sm font-bold text-zinc-100">
                      {t.title}
                    </div>
                    <p className="mt-3 text-zinc-400 leading-relaxed">
                      {t.body}
                    </p>
                    <div className="mt-5 flex items-center gap-2 text-xs text-zinc-500">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>Verified member feedback</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 md:mt-20 relative rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 p-8 md:p-16 text-center">
            <div className="absolute inset-0 bg-gradient-to-r from-red-900/25 to-transparent pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to <span className="text-red-500">level up</span>?
              </h2>
              <p className="text-zinc-400 mb-8 text-lg">
                Start with a visit and a plan. We’ll help you pick the right
                training path.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all shadow-[0_0_20px_-5px_rgba(229,9,20,0.5)] hover:shadow-[0_0_30px_-5px_rgba(229,9,20,0.7)] hover:scale-105 flex items-center justify-center"
                >
                  Book a Free Visit <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/classes"
                  className="px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-lg border border-zinc-700 transition-all hover:scale-105"
                >
                  View Classes
                </Link>
              </div>

              <div className="mt-8 flex items-center justify-center gap-6 text-zinc-500 text-sm flex-wrap">
                <div className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                  <span>No hidden fees</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                  <span>Cancel anytime</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                  <span>Beginner-friendly</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Advantages;
