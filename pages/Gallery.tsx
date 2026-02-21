import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Film,
  Image as ImageIcon,
  Sparkles,
  X,
} from "lucide-react";

import { SmartImage } from "@/components/SmartImage";

import MainHeroImg from "@/assets/MainHeroImg.png";
import aerobicsImg from "@/assets/aerobics.avif";
import amenitie from "@/assets/photos/premiumAmmenitie.webp";
import bhangraImg from "@/assets/bhangra.webp";
import cardioKickboxingImg from "@/assets/cardioKickboxing.jpg";
import circuitTrainingImg from "@/assets/circuitTraining.jpg";
import freeWeightFloorImg from "@/assets/photos/freeWeights.webp";
import gymFitnessImg from "@/assets/gymFitness.jpg";
import indoorCyclingImg from "@/assets/photos/indoorcycling.webp";
import cardioFitnessImg from "@/assets/photos/cardioCycles.webp";
import outdoorTrainingImg from "@/assets/outdoorTraining.avif";
import YogaImg from "@/assets/photos/yoga.webp";
import strengthTrainingImg from "@/assets/strengthTraining.avif";
import zumbaImg from "@/assets/zumba.avif";


import floorImg from "@/assets/photos/img2.jpg"

type GalleryFilter = "all" | "photos" | "videos" | "facility" | "classes" | "training";

type TileSize = "sm" | "md" | "lg" | "xl";

type GalleryTile = {
  size?: TileSize;
  className?: string;
};

type PhotoItem = {
  kind: "photo";
  id: string;
  title: string;
  subtitle?: string;
  srcs: string[];
  tags: GalleryFilter[];
  tile?: GalleryTile;
};

type VideoItem = {
  kind: "video";
  id: string;
  title: string;
  subtitle?: string;
  posterSrcs: string[];
  tags: GalleryFilter[];
  tile?: GalleryTile;
  source:
    | { type: "mp4"; src: string }
    | { type: "youtube"; embedUrl: string };
};

type GalleryItem = PhotoItem | VideoItem;

const picsum = (id: number, w: number, h: number) =>
  `https://picsum.photos/id/${id}/${w}/${h}`;

const FILTERS: Array<{ id: GalleryFilter; label: string; icon: React.ReactNode }> = [
  { id: "all", label: "All", icon: <Sparkles className="h-4 w-4" /> },
  { id: "photos", label: "Photos", icon: <ImageIcon className="h-4 w-4" /> },
  { id: "videos", label: "Videos", icon: <Film className="h-4 w-4" /> },
  { id: "facility", label: "Facility", icon: <Sparkles className="h-4 w-4" /> },
  { id: "classes", label: "Classes", icon: <Sparkles className="h-4 w-4" /> },
  { id: "training", label: "Training", icon: <Sparkles className="h-4 w-4" /> },
];

const TILE_SIZE_CLASS: Record<TileSize, string> = {
  sm: "h-[200px] sm:h-[220px] md:h-[220px] lg:h-[240px]",
  md: "h-[260px] sm:h-[280px] md:h-[300px] lg:h-[320px]",
  lg: "h-[320px] sm:h-[360px] md:h-[380px] lg:h-[420px]",
  xl: "h-[420px] sm:h-[480px] md:h-[520px] lg:h-[560px]",
};

const DEFAULT_TILE_PATTERN: TileSize[] = [
  "lg",
  "xl",
  "sm",
  "md",
  "md",
  "sm",
  "md",
  "xl",
  "lg",
  "md",
  "md",
  "sm",
];

const getResponsiveColumnCount = (width: number) => {
  if (width >= 1024) return 4; // lg
  if (width >= 768) return 3; // md
  if (width >= 640) return 2; // sm
  return 1;
};

const useResponsiveColumnCount = () => {
  const [count, setCount] = useState(() =>
    typeof window === "undefined" ? 1 : getResponsiveColumnCount(window.innerWidth)
  );

  useEffect(() => {
    const onResize = () => {
      setCount(getResponsiveColumnCount(window.innerWidth));
    };

    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return count;
};

const Gallery: React.FC = () => {
  const [filter, setFilter] = useState<GalleryFilter>("all");
  const columnCount = useResponsiveColumnCount();

  const allItems = useMemo<GalleryItem[]>(() => {
    const photos: PhotoItem[] = [
      {
        kind: "photo",
        id: "gym-hero",
        title: "The Gym Floor",
        subtitle: "Modern space, strong vibe",
        srcs: [floorImg, gymFitnessImg],
        tags: ["photos", "facility"],
      },
      {
        kind: "photo",
        id: "free-weights",
        title: "Free Weight Zone",
        subtitle: "Strength-first layout",
        srcs: [freeWeightFloorImg, strengthTrainingImg],
        tags: ["photos", "facility", "training"],
      },
      {
        kind: "photo",
        id: "strength",
        title: "Strength Training",
        subtitle: "Progress you can measure",
        srcs: [strengthTrainingImg, gymFitnessImg],
        tags: ["photos", "training"],
      },
      {
        kind: "photo",
        id: "cardio",
        title: "Cardio & Conditioning",
        subtitle: "Endurance built daily",
        srcs: [cardioFitnessImg, indoorCyclingImg],
        tags: ["photos", "training"],
      },
      {
        kind: "photo",
        id: "cycling",
        title: "Indoor Cycling",
        subtitle: "Sweat. Rhythm. Repeat.",
        srcs: [indoorCyclingImg, cardioFitnessImg],
        tags: ["photos", "classes"],
      },
      {
        kind: "photo",
        id: "kickboxing",
        title: "Cardio Kickboxing",
        subtitle: "High energy sessions",
        srcs: [cardioKickboxingImg, circuitTrainingImg],
        tags: ["photos", "classes", "training"],
      },
      {
        kind: "photo",
        id: "circuit",
        title: "Circuit Training",
        subtitle: "Full-body, full focus",
        srcs: [circuitTrainingImg, gymFitnessImg],
        tags: ["photos", "training"],
      },
      {
        kind: "photo",
        id: "zumba",
        title: "Zumba",
        subtitle: "Dance-based conditioning",
        srcs: [zumbaImg, aerobicsImg],
        tags: ["photos", "classes"],
      },
      {
        kind: "photo",
        id: "aerobics",
        title: "Aerobics",
        subtitle: "Move with the crowd",
        srcs: [aerobicsImg, zumbaImg],
        tags: ["photos", "classes"],
      },
      {
        kind: "photo",
        id: "yoga",
        title: "Power Yoga",
        subtitle: "Mobility + strength",
        srcs: [YogaImg],
        tags: ["photos", "classes"],
      },
      {
        kind: "photo",
        id: "outdoor",
        title: "Outdoor Training",
        subtitle: "Fresh air sessions",
        srcs: [outdoorTrainingImg, gymFitnessImg],
        tags: ["photos", "training"],
      },
      {
        kind: "photo",
        id: "community",
        title: "Community Moments",
        subtitle: "Train with your people",
        srcs: [bhangraImg, zumbaImg],
        tags: ["photos", "classes"],
      },
      {
        kind: "photo",
        id: "amenities",
        title: "Premium Amenities",
        subtitle: "Clean, safe, motivating",
        srcs: [amenitie],
        tags: ["photos", "facility"],
      },
    ];

    const videos: VideoItem[] = [
      {
        kind: "video",
        id: "sample-video-1",
        title: "Gym Highlight Reel",
        subtitle: "Glance of the Gym",
        posterSrcs: [picsum(971, 1600, 1100), MainHeroImg, gymFitnessImg],
        tags: ["videos", "training"],
        // CC0 sample video; swap src with your own MP4 (local or hosted)
        source: {
          type: "mp4",
          src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        },
      },
      {
        kind: "video",
        id: "sample-video-2",
        title: "Class Energy",
        subtitle: "glance of The Gym",
        posterSrcs: [floorImg, aerobicsImg],
        tags: ["videos", "classes"],
        source: {
          // type: "youtube",
          // embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",

          type:"mp4",
          src:"https://res.cloudinary.com/dthz7fniu/video/upload/v1771654077/finalVideo1_mljjr5.mp4",
        },
      },
    ];

    return [...photos, ...videos];
  }, []);

  const filteredItems = useMemo(() => {
    return allItems
      .filter((item) => {
        if (filter === "all") return true;
        if (filter === "photos") return item.kind === "photo";
        if (filter === "videos") return item.kind === "video";
        return item.tags.includes(filter);
      })
      .slice();
  }, [allItems, filter]);

  const tileClassNameFor = useCallback(
    (item: GalleryItem, index: number) => {
      if (item.tile?.className) return item.tile.className;
      const size = item.tile?.size ?? DEFAULT_TILE_PATTERN[index % DEFAULT_TILE_PATTERN.length];
      return TILE_SIZE_CLASS[size];
    },
    []
  );

  const columns = useMemo(() => {
    const next = Array.from({ length: columnCount }, () => [] as GalleryItem[]);
    filteredItems.forEach((item, index) => {
      next[index % columnCount]?.push(item);
    });
    return next;
  }, [columnCount, filteredItems]);

  const [lightboxId, setLightboxId] = useState<string | null>(null);
  const lightboxIndex = useMemo(() => {
    if (!lightboxId) return -1;
    return filteredItems.findIndex((i) => i.id === lightboxId);
  }, [filteredItems, lightboxId]);

  const activeItem = lightboxIndex >= 0 ? filteredItems[lightboxIndex] : null;

  const closeLightbox = useCallback(() => setLightboxId(null), []);

  const showPrev = useCallback(() => {
    if (filteredItems.length === 0) return;
    const prev = (lightboxIndex - 1 + filteredItems.length) % filteredItems.length;
    setLightboxId(filteredItems[prev]?.id ?? null);
  }, [filteredItems, lightboxIndex]);

  const showNext = useCallback(() => {
    if (filteredItems.length === 0) return;
    const next = (lightboxIndex + 1) % filteredItems.length;
    setLightboxId(filteredItems[next]?.id ?? null);
  }, [filteredItems, lightboxIndex]);

  useEffect(() => {
    if (!activeItem) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeItem, closeLightbox, showNext, showPrev]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-orange-500 selection:text-white ">
      {/* Hero */}
      <section className="relative overflow-hidden pt-15">
        <div className="absolute inset-0">
          <SmartImage
            srcs={[picsum(903, 2400, 1600), MainHeroImg, gymFitnessImg]}
            alt="The Gym gallery hero"
            className="h-full w-full object-cover opacity-35"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/75 to-zinc-950" />
        </div>

        <div className="relative container mx-auto px-4 py-14 md:py-20 lg:pl-20">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-zinc-950/50 px-4 py-2 text-sm text-zinc-200">
              <Sparkles className="h-4 w-4 text-orange-500" />
              <span className="font-semibold">Gallery</span>
              <span className="text-zinc-500">•</span>
              <span className="text-zinc-400">photos + videos</span>
            </div>

            <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05]">
              See the vibe.
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">
                Feel the energy.
              </span>
            </h1>

            <p className="mt-6 text-zinc-300 text-lg md:text-xl leading-relaxed max-w-2xl">
              Explore our training zones, group classes, amenities, and moments that make The Gym feel like home.
            </p>

            {/* Controls */}
            <div className="mt-10 flex flex-wrap items-center gap-2 rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur p-2 max-w-3xl">
              {FILTERS.map((f) => {
                const active = filter === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => setFilter(f.id)}
                    className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-colors border ${
                      active
                        ? "bg-orange-500 text-black border-orange-400"
                        : "bg-zinc-950/30 text-zinc-200 border-white/10 hover:border-orange-500/40 hover:text-orange-300"
                    }`}
                  >
                    {f.icon}
                    {f.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 text-sm text-zinc-400">
              Showing <span className="text-white font-semibold">{filteredItems.length}</span> items
            </div>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex gap-4 md:gap-5 lg:gap-6">
          {columns.map((col, colIndex) => (
            <div key={colIndex} className="flex-1 flex flex-col gap-4 md:gap-5 lg:gap-6">
              {col.map((item) => {
                const index = filteredItems.findIndex((i) => i.id === item.id);
                return (
                  <motion.button
                    key={item.id}
                    type="button"
                    onClick={() => setLightboxId(item.id)}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className={`group relative w-full text-left rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 hover:border-orange-500/30 transition-colors ${tileClassNameFor(
                      item,
                      Math.max(0, index)
                    )}`}
                  >
                    <div className="absolute inset-0">
                      <SmartImage
                        srcs={item.kind === "photo" ? item.srcs : item.posterSrcs}
                        alt={item.title}
                        className="h-full w-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-95" />
                    </div>

                    {item.kind === "video" && (
                      <div className="absolute top-3 right-3 rounded-full bg-black/60 border border-white/10 px-3 py-1.5 text-xs font-bold text-zinc-100 flex items-center gap-2">
                        <Film className="h-4 w-4 text-orange-400" />
                        VIDEO
                      </div>
                    )}

                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                      <div className="text-lg font-extrabold leading-tight line-clamp-2">
                        {item.title}
                      </div>
                      {item.subtitle && (
                        <div className="mt-1 text-sm text-zinc-300 line-clamp-2">
                          {item.subtitle}
                        </div>
                      )}
                      <div className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-orange-300 opacity-0 group-hover:opacity-100 transition-opacity">
                        Open <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="mt-10 rounded-3xl border border-white/10 bg-zinc-900 p-10 text-center">
            <div className="text-xl font-bold">No matches</div>
            <p className="mt-2 text-zinc-400">Try a different filter or search term.</p>
          </div>
        )}
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) closeLightbox();
            }}
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-500/10 rounded-full blur-[120px]" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-900/10 rounded-full blur-[120px]" />
            </div>

            <motion.div
              className="relative h-full w-full flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.98, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <div className="w-full max-w-5xl rounded-3xl overflow-hidden border border-white/10 bg-zinc-950 shadow-2xl">
                <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-white/10">
                  <div className="min-w-0">
                    <div className="text-sm text-zinc-400">
                      {activeItem.kind === "photo" ? "Photo" : "Video"} • {lightboxIndex + 1}/{filteredItems.length}
                    </div>
                    <div className="text-lg font-bold truncate">{activeItem.title}</div>
                    {activeItem.subtitle && (
                      <div className="text-sm text-zinc-400 truncate">{activeItem.subtitle}</div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={showPrev}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 bg-zinc-900 hover:border-orange-500/40 hover:text-orange-200 transition-colors"
                      aria-label="Previous"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      <span className="hidden sm:inline">Prev</span>
                    </button>
                    <button
                      onClick={showNext}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 bg-zinc-900 hover:border-orange-500/40 hover:text-orange-200 transition-colors"
                      aria-label="Next"
                    >
                      <span className="hidden sm:inline">Next</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                    <button
                      onClick={closeLightbox}
                      className="inline-flex items-center justify-center h-10 w-10 rounded-xl border border-white/10 bg-zinc-900 hover:border-orange-500/40 hover:text-orange-200 transition-colors"
                      aria-label="Close"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="bg-black">
                  {activeItem.kind === "photo" ? (
                    <SmartImage
                      srcs={activeItem.srcs}
                      alt={activeItem.title}
                      className="w-full max-h-[78vh] object-contain"
                      loading="eager"
                    />
                  ) : activeItem.source.type === "mp4" ? (
                    <video
                      className="w-full max-h-[78vh] object-contain"
                      controls
                      autoPlay
                      playsInline
                      poster={activeItem.posterSrcs[0]}
                    >
                      <source src={activeItem.source.src} type="video/mp4" />
                    </video>
                  ) : (
                    <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                      <iframe
                        className="absolute inset-0 h-full w-full"
                        src={activeItem.source.embedUrl}
                        title={activeItem.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  )}
                </div>

                <div className="px-5 py-4 border-t border-white/10 text-sm text-zinc-400 flex items-center justify-between flex-wrap gap-3">
                  <div className="inline-flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-orange-500" />
                    Tip: use <span className="text-zinc-200">←</span>/<span className="text-zinc-200">→</span> keys to navigate
                  </div>
                  <div className="inline-flex items-center gap-2">
                    {activeItem.kind === "photo" ? (
                      <>
                        <ImageIcon className="h-4 w-4" />
                        <span>High-quality images</span>
                      </>
                    ) : (
                      <>
                        <Film className="h-4 w-4" />
                        <span>Video playback</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
