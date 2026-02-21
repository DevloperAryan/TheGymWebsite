import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  CalendarDays,
  Sparkles,
  Timer,
} from 'lucide-react';

import aerobicsImg from '@/assets/aerobics.avif';
import cardioFitnessImg from '@/assets/cardioFitness.avif';
import indoorCyclingImg from '@/assets/indoorCycling.webp';
import powerYogaImg from '@/assets/powerYoga.webp';
import strengthTrainingImg from '@/assets/strengthTraining.avif';
import zumbaImg from '@/assets/zumba.avif';

type FeaturedClass = {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  intensity: 'Low' | 'Medium' | 'High' | 'Extreme';
  category: 'Strength' | 'Cardio' | 'Dance' | 'Mind & Body' | 'Outdoor' | 'Open Gym';
};

const FEATURED_CLASSES: FeaturedClass[] = [
  {
    id: 'strength-training',
    title: 'Strength Training',
    description:
      'Build lean muscle with free weights + machines. Form-first coaching and progressive overload.',
    image: strengthTrainingImg,
    duration: '60 min',
    intensity: 'High',
    category: 'Strength',
  },
  {
    id: 'power-yoga',
    title: 'Power Yoga',
    description:
      'A stronger flow with breath + control. Improve mobility, balance, and resilience while reducing stress.',
    image: powerYogaImg,
    duration: '60 min',
    intensity: 'Medium',
    category: 'Mind & Body',
  },
  {
    id: 'aerobics',
    title: 'Aerobics',
    description:
      'Rhythmic full-body movement for stamina, mobility, and a serious mood boost.',
    image: aerobicsImg,
    duration: '55 min',
    intensity: 'Medium',
    category: 'Cardio',
  },
  {
    id: 'zumba',
    title: 'Zumba',
    description:
      'Dance-party cardio with real fitness results. Big vibes, big sweat.',
    image: zumbaImg,
    duration: '60 min',
    intensity: 'Medium',
    category: 'Dance',
  },  
  {
    id: 'indoor-cycling',
    title: 'Indoor Cycling',
    description:
      'Intervals + endurance on the bike. Ride to the beat, sweat hard, and leave stronger every session.',
    image: indoorCyclingImg,
    duration: '45 min',
    intensity: 'High',
    category: 'Cardio',
  },  
  {
    id: 'cardio-fitness',
    title: 'Cardio Fitness',
    description:
      'Conditioning circuits designed to boost endurance, burn calories, and keep the energy high.',
    image: cardioFitnessImg,
    duration: '45 min',
    intensity: 'High',
    category: 'Cardio',
  },
];

const intensityBadge = (intensity: FeaturedClass['intensity']) => {
  switch (intensity) {
    case 'Low':
      return 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300';
    case 'Medium':
      return 'border-sky-500/20 bg-sky-500/10 text-sky-300';
    case 'High':
      return 'border-orange-500/20 bg-orange-500/10 text-orange-200';
    case 'Extreme':
      return 'border-red-500/20 bg-red-500/10 text-red-300';
  }
};

export const ProgramsSection: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 min-h-[calc(100vh-12rem)] flex flex-col justify-center">
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold tracking-widest uppercase text-zinc-200">
            <Sparkles className="h-4 w-4 text-orange-400" />
            Popular Classes
          </div>
          <h2 className="mt-5 font-bebas text-5xl md:text-7xl leading-none">
            FIND YOUR <span className="text-orange-500">VIBE</span>
          </h2>
          <p className="mt-3 text-zinc-400 max-w-2xl">
            A quick preview of member favorites—built to fit cleanly in one viewport. Want more options? Open the full classes page.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <Link
            to="/classes"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white text-black px-6 py-3 font-bold hover:bg-zinc-200 transition-colors"
          >
            Show all classes
            <ArrowUpRight className="h-5 w-5" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur px-6 py-3 font-bold text-white hover:border-orange-500/40 hover:text-orange-300 transition-colors"
          >
            Book a free trial
            <CalendarDays className="h-5 w-5" />
          </Link>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {FEATURED_CLASSES.slice(0, 4).map((c, idx) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: idx * 0.05 }}
            className="group rounded-3xl border border-white/10 bg-zinc-950 overflow-hidden hover:border-orange-500/30 transition-colors"
          >
            <div className="relative h-32 overflow-hidden">
              <img
                src={c.image}
                alt={c.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full border text-[11px] font-bold ${intensityBadge(c.intensity)}`}>
                  {c.intensity}
                </span>
                <div className="flex items-center gap-1 text-xs font-semibold text-zinc-200">
                  <Timer className="w-4 h-4 text-zinc-300" />
                  {c.duration}
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">{c.category}</div>
              <div className="mt-2 text-white font-bold text-base leading-snug">{c.title}</div>
              <div className="mt-1 text-sm text-zinc-400 leading-relaxed line-clamp-2">{c.description}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
