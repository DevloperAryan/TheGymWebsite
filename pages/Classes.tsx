import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Activity,
  Clock,
  Filter,
  Search,
  X,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

import aerobicsImg from '@/assets/aerobics.avif';
import bhangraImg from '@/assets/bhangra.webp';
import cardioFitnessImg from '@/assets/cardioFitness.avif';
import cardioKickboxingImg from '@/assets/cardioKickboxing.jpg';
import circuitTrainingImg from '@/assets/circuitTraining.jpg';
import freeWeightFloorImg from '@/assets/freeWeightFloor.webp';
import gymFitnessImg from '@/assets/gymFitness.jpg';
import indoorCyclingImg from '@/assets/indoorCycling.webp';
import outdoorTrainingImg from '@/assets/outdoorTraining.avif';
import powerYogaImg from '@/assets/powerYoga.webp';
import strengthTrainingImg from '@/assets/strengthTraining.avif';
import zumbaImg from '@/assets/zumba.avif';

type Intensity = 'Low' | 'Medium' | 'High' | 'Extreme';

interface GymClass {
  id: string;
  title: string;
  description: string;
  intensity: Intensity;
  duration: string;
  image: string;
  category:
    | 'Strength'
    | 'Cardio'
    | 'Mind & Body'
    | 'Dance'
    | 'Outdoor'
    | 'Open Gym';
}

const GYM_CLASSES: GymClass[] = [
  {
    id: 'gym-fitness',
    title: 'Gym Fitness',
    description:
      'A complete fitness session using modern equipment to build strength, stamina, and confidence. Great for beginners and regulars.',
    intensity: 'Medium',
    duration: '60 min',
    image: gymFitnessImg,
    category: 'Strength',
  },
  {
    id: 'indoor-cycling',
    title: 'Indoor Cycling',
    description:
      'Intervals + endurance on the bike. Ride to the beat, sweat hard, and leave stronger every session.',
    intensity: 'High',
    duration: '45 min',
    image: indoorCyclingImg,
    category: 'Cardio',
  },
  {
    id: 'power-yoga',
    title: 'Power Yoga',
    description:
      'A stronger flow with breath + control. Improve mobility, balance, and resilience while reducing stress.',
    intensity: 'Medium',
    duration: '60 min',
    image: powerYogaImg,
    category: 'Mind & Body',
  },
  {
    id: 'cardio-fitness',
    title: 'Cardio Fitness',
    description:
      'Heart-pumping circuits designed to improve conditioning and burn calories through dynamic full-body movement.',
    intensity: 'High',
    duration: '45 min',
    image: cardioFitnessImg,
    category: 'Cardio',
  },
  {
    id: 'cardio-kickboxing',
    title: 'Cardio Kickboxing',
    description:
      'Fast-paced combos for power + coordination. Punch, kick, sweat—perfect for a serious cardio hit.',
    intensity: 'High',
    duration: '50 min',
    image: cardioKickboxingImg,
    category: 'Cardio',
  },
  {
    id: 'aerobics-classes',
    title: 'Aerobics',
    description:
      'Rhythmic routines that improve overall fitness—endurance, mobility, and strength in one fun session.',
    intensity: 'Medium',
    duration: '55 min',
    image: aerobicsImg,
    category: 'Cardio',
  },
  {
    id: 'circuit-training',
    title: 'Circuit Training',
    description:
      'Move through stations targeting different muscle groups with minimal rest. Efficient, intense, and addictive.',
    intensity: 'High',
    duration: '45 min',
    image: circuitTrainingImg,
    category: 'Strength',
  },
  {
    id: 'zumba',
    title: 'Zumba',
    description:
      'Dance-party energy with real fitness results. Great vibes, big sweat, and a killer calorie burn.',
    intensity: 'Medium',
    duration: '60 min',
    image: zumbaImg,
    category: 'Dance',
  },
  {
    id: 'strength-classes',
    title: 'Strength',
    description:
      'Build lean muscle using free weights, bands, and bodyweight patterns. Form-first, progress always.',
    intensity: 'High',
    duration: '60 min',
    image: strengthTrainingImg,
    category: 'Strength',
  },
  {
    id: 'outdoor-training',
    title: 'Outdoor Training',
    description:
      'Bootcamp-style sessions outdoors: functional drills, running, and team energy in fresh air.',
    intensity: 'High',
    duration: '60 min',
    image: outdoorTrainingImg,
    category: 'Outdoor',
  },
  {
    id: 'free-weights-floor',
    title: 'Free Weights Floor',
    description:
      'Train classic lifts like squats and deadlifts in our dedicated free weights area. Serious strength zone.',
    intensity: 'Extreme',
    duration: 'Open',
    image: freeWeightFloorImg,
    category: 'Open Gym',
  },
  {
    id: 'bhangra',
    title: 'Bhangra',
    description:
      'High-energy Punjabi dance cardio. Fun, cultural, and surprisingly intense—expect to sweat.',
    intensity: 'High',
    duration: '50 min',
    image: bhangraImg,
    category: 'Dance',
  },
];

const INTENSITY_STYLES: Record<
  Intensity,
  { label: string; classes: string; dot: string }
> = {
  Low: {
    label: 'Low',
    classes: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300',
    dot: 'bg-emerald-400',
  },
  Medium: {
    label: 'Medium',
    classes: 'border-sky-500/20 bg-sky-500/10 text-sky-300',
    dot: 'bg-sky-400',
  },
  High: {
    label: 'High',
    classes: 'border-orange-500/20 bg-orange-500/10 text-orange-300',
    dot: 'bg-orange-400',
  },
  Extreme: {
    label: 'Extreme',
    classes: 'border-red-500/20 bg-red-500/10 text-red-300',
    dot: 'bg-red-400',
  },
};

const CATEGORY_STYLES: Record<GymClass['category'], string> = {
  Strength: 'border-white/10 bg-zinc-900/50 text-zinc-200',
  Cardio: 'border-white/10 bg-zinc-900/50 text-zinc-200',
  'Mind & Body': 'border-white/10 bg-zinc-900/50 text-zinc-200',
  Dance: 'border-white/10 bg-zinc-900/50 text-zinc-200',
  Outdoor: 'border-white/10 bg-zinc-900/50 text-zinc-200',
  'Open Gym': 'border-white/10 bg-zinc-900/50 text-zinc-200',
};

const Classes: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedIntensity, setSelectedIntensity] = useState<
    Intensity | 'All'
  >('All');
  const [selectedCategory, setSelectedCategory] = useState<
    GymClass['category'] | 'All'
  >('All');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(GYM_CLASSES.map((c) => c.category)));
    return unique;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return GYM_CLASSES.filter((c) => {
      const matchesQuery =
        q.length === 0 ||
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q);
      const matchesIntensity =
        selectedIntensity === 'All' || c.intensity === selectedIntensity;
      const matchesCategory =
        selectedCategory === 'All' || c.category === selectedCategory;
      return matchesQuery && matchesIntensity && matchesCategory;
    });
  }, [query, selectedIntensity, selectedCategory]);

  const selectedClass = useMemo(() => {
    if (!selectedId) return null;
    return GYM_CLASSES.find((c) => c.id === selectedId) ?? null;
  }, [selectedId]);

  useEffect(() => {
    if (!selectedClass) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedId(null);
    };

    document.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [selectedClass]);

  const resetFilters = () => {
    setQuery('');
    setSelectedIntensity('All');
    setSelectedCategory('All');
  };

  return (
    <section className="relative min-h-screen bg-zinc-950 overflow-hidden pt-24">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-orange-500/20 blur-[120px]" />
        <div className="absolute top-40 -right-24 h-80 w-80 rounded-full bg-red-600/10 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-orange-500/10 blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold tracking-widest uppercase text-zinc-200">
              <Sparkles className="h-4 w-4 text-orange-400" />
              Classes & Programs
            </div>
            <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
              Find your next
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                {' '}favorite class
              </span>
            </h1>
            <p className="mt-4 text-zinc-400 text-base sm:text-lg">
              Browse every class we offer—filter by intensity and category, then tap a class to see details.
            </p>
          </div>

          <div className="text-sm text-zinc-400">
            <span className="text-white font-semibold">{filtered.length}</span> class{filtered.length === 1 ? '' : 'es'} found
          </div>
        </div>

        {/* Controls */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur px-4 py-3">
              <Search className="h-5 w-5 text-zinc-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search classes (e.g., yoga, cycling, strength…)"
                className="w-full bg-transparent outline-none text-zinc-100 placeholder:text-zinc-500"
              />
              {query.length > 0 && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="p-1 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-zinc-200"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur px-4 py-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">
                <Filter className="h-4 w-4" />
                Intensity
              </div>
              <div className="flex flex-wrap gap-2">
                {(['All', 'Low', 'Medium', 'High', 'Extreme'] as const).map((level) => {
                  const isActive = selectedIntensity === level;
                  const label = level === 'All' ? 'All' : INTENSITY_STYLES[level].label;
                  return (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setSelectedIntensity(level)}
                      className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-all ${
                        isActive
                          ? level === 'All'
                            ? 'border-orange-500/30 bg-orange-500/10 text-orange-200'
                            : INTENSITY_STYLES[level].classes
                          : 'border-white/10 bg-white/5 text-zinc-300 hover:border-orange-500/30 hover:bg-orange-500/5'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex-1 rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">Category</div>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs font-semibold text-zinc-400 hover:text-orange-300"
                >
                  Reset
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('All')}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-all ${
                    selectedCategory === 'All'
                      ? 'border-orange-500/30 bg-orange-500/10 text-orange-200'
                      : 'border-white/10 bg-white/5 text-zinc-300 hover:border-orange-500/30 hover:bg-orange-500/5'
                  }`}
                >
                  All
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-all ${
                      selectedCategory === cat
                        ? 'border-orange-500/30 bg-orange-500/10 text-orange-200'
                        : 'border-white/10 bg-white/5 text-zinc-300 hover:border-orange-500/30 hover:bg-orange-500/5'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((c) => {
            const intensity = INTENSITY_STYLES[c.intensity];
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedId(c.id)}
                className="group text-left rounded-3xl border border-white/10 bg-zinc-900/40 backdrop-blur overflow-hidden hover:border-orange-500/30 transition-all"
              >
                <div className="relative h-44">
                  <img
                    src={c.image}
                    alt={c.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent scale-107" />

                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${CATEGORY_STYLES[c.category]}`}>
                      {c.category}
                    </span>
                    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${intensity.classes}`}>
                      <span className={`h-2 w-2 rounded-full ${intensity.dot}`} />
                      {intensity.label}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl font-extrabold tracking-tight text-white group-hover:text-orange-200 transition-colors">
                      {c.title}
                    </h3>
                    <ArrowUpRight className="h-5 w-5 text-zinc-500 group-hover:text-orange-300 transition-colors" />
                  </div>

                  <p className="mt-2 text-sm text-zinc-400 line-clamp-2">
                    {c.description}
                  </p>

                  <div className="mt-5 flex items-center gap-5 text-xs font-semibold text-zinc-300">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-orange-400" />
                      {c.duration}
                    </div>
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-orange-400" />
                      {c.intensity}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Empty */}
        {filtered.length === 0 && (
          <div className="mt-12 rounded-3xl border border-white/10 bg-zinc-900/40 backdrop-blur p-10 text-center">
            <h3 className="text-xl font-bold text-white">No classes match your filters</h3>
            <p className="mt-2 text-zinc-400">Try a different keyword, intensity, or category.</p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={resetFilters}
                className="rounded-xl bg-white text-black px-5 py-3 font-bold hover:bg-orange-500 hover:text-white transition-all"
              >
                Reset filters
              </button>
              <Link
                to="/contact"
                className="rounded-xl border border-white/10 bg-zinc-900/50 backdrop-blur px-5 py-3 font-bold text-white hover:border-orange-500/30 hover:text-orange-200 transition-all"
              >
                Contact us
              </Link>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-14 rounded-3xl border border-white/10 bg-gradient-to-r from-zinc-900/70 to-zinc-900/40 backdrop-blur p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h3 className="text-2xl md:text-3xl font-black tracking-tight">Want a custom plan?</h3>
            <p className="mt-2 text-zinc-400">
              We also offer private sessions and goal-based programming.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/find-gym"
              className="rounded-xl bg-white text-black px-6 py-3 font-bold hover:bg-orange-500 hover:text-white transition-all text-center"
            >
              Find a gym
            </Link>
            <Link
              to="/contact"
              className="rounded-xl border border-white/10 bg-zinc-900/50 backdrop-blur px-6 py-3 font-bold text-white hover:border-orange-500/30 hover:text-orange-200 transition-all text-center"
            >
              Talk to us
            </Link>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedClass && (
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/70"
              onClick={() => setSelectedId(null)}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              className="absolute left-1/2 top-1/2 w-[92vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 shadow-2xl"
              initial={{ y: 18, scale: 0.98, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 18, scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <div className="relative h-56 sm:h-64">
                <img
                  src={selectedClass.image}
                  alt={selectedClass.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                <button
                  type="button"
                  onClick={() => setSelectedId(null)}
                  className="absolute top-4 right-4 rounded-xl border border-white/10 bg-orange-500/70 backdrop-blur px-2 py-2 text-white hover:border-orange-500/30"
                  aria-label="Close"
                >
                  <X className="h-7 w-7" />
                </button>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${CATEGORY_STYLES[selectedClass.category]}`}>
                    {selectedClass.category}
                  </span>
                  <span
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${
                      INTENSITY_STYLES[selectedClass.intensity].classes
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        INTENSITY_STYLES[selectedClass.intensity].dot
                      }`}
                    />
                    {selectedClass.intensity} intensity
                  </span>
                </div>

                <h2 className="mt-4 text-3xl sm:text-4xl font-black tracking-tight text-white">
                  {selectedClass.title}
                </h2>
                <p className="mt-3 text-zinc-400 leading-relaxed">
                  {selectedClass.description}
                </p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                      Duration
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-white font-semibold">
                      <Clock className="h-4 w-4 text-orange-400" />
                      {selectedClass.duration}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                      Intensity
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-white font-semibold">
                      <Activity className="h-4 w-4 text-orange-400" />
                      {selectedClass.intensity}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                      Best for
                    </div>
                    <div className="mt-1 text-white font-semibold">
                      {selectedClass.category === 'Mind & Body'
                        ? 'Mobility + balance'
                        : selectedClass.category === 'Cardio'
                          ? 'Conditioning'
                          : selectedClass.category === 'Dance'
                            ? 'Fun cardio'
                            : selectedClass.category === 'Outdoor'
                              ? 'Team energy'
                              : selectedClass.category === 'Open Gym'
                                ? 'Strength focus'
                                : 'Build muscle'}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    className="rounded-xl bg-white text-black px-6 py-3 font-bold hover:bg-orange-500 hover:text-white transition-all"
                  >
                    Join this class
                  </button>
                  <Link
                    to="/find-gym"
                    className="rounded-xl border border-white/10 bg-zinc-900/60 backdrop-blur px-6 py-3 font-bold text-white hover:border-orange-500/30 hover:text-orange-200 transition-all text-center"
                    onClick={() => setSelectedId(null)}
                  >
                    Find a gym
                  </Link>
                  <Link
                    to="/contact"
                    className="rounded-xl border border-white/10 bg-zinc-900/60 backdrop-blur px-6 py-3 font-bold text-white hover:border-orange-500/30 hover:text-orange-200 transition-all text-center"
                    onClick={() => setSelectedId(null)}
                  >
                    Ask a question
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Classes;