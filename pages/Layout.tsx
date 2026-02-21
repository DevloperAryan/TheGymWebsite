import React, { useEffect, useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

const HOME_SECTIONS = ["home", "programs", "ai-trainer", "trainers"] as const;

type HomeSectionId = (typeof HOME_SECTIONS)[number];

const Layout: React.FC = () => {
  const location = useLocation();
  const isHome = useMemo(() => location.pathname === "/", [location.pathname]);

  const [activeSection, setActiveSection] = useState<HomeSectionId>("home");

  useEffect(() => {
    if (!isHome) return;

    const handleScroll = () => {
      const current = HOME_SECTIONS.find((section) => {
        const element = document.getElementById(section);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top >= -100 && rect.top <= 300;
      });

      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHome]);

  useEffect(() => {
    // When navigating between routes, reset scroll so new pages start at top.
    // Keep Home's in-page scroll behavior when navigation includes { state: { scrollTo } }.
    const scrollTo = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (location.pathname === "/" && scrollTo) return;

    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [location.pathname, location.state]);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-orange-500 selection:text-white">
      <Navbar activeSection={isHome ? activeSection : undefined}/>
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
