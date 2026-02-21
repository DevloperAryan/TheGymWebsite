import React from "react";
import { motion } from "framer-motion";
import { Menu, User, X } from "lucide-react";

import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

interface NavbarProps {
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const navigate = useNavigate();
  const location = useLocation();

  type ScrollNavItem = { type: "scroll"; id: string; label: string };
  type RouteNavItem = { type: "route"; to: string; label: string };
  type NavItem = ScrollNavItem | RouteNavItem;

  const navItems: NavItem[] = [
    { type: "route", to: "/", label: "Home" },
    { type: "route", to: "/gallery", label: "Gallery" },
    { type: "route", to: "/classes", label: "Classes" },
    { type: "route", to: "/find-gym", label: "Find Gym" },
    { type: "route", to: "/faq", label: "FAQs" },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollNav = (id: string) => {
    setIsMobileMenuOpen(false);

    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
      return;
    }

    scrollTo(id);
  };

  const handleRouteNav = () => {
    setIsMobileMenuOpen(false);
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    // Check if the user is scrolling down
    if (window.scrollY > lastScrollY) {
      setShow(false); // Hide navbar
    } else {
      setShow(true); // Show navbar
    }
    // Remember the current page location for the next scroll event
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    // Add event listener when the component mounts
    window.addEventListener("scroll", controlNavbar);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]); // Add lastScrollY as a dependency

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 py-4 pointer-events-none transition-all duration-300 ease-in-out ${
        show ? "translate-y-0 px-4" : "translate-y-[-14px] px-0 rounded-0"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between bg-zinc-900/50 backdrop-blur-lg border border-white/10 px-6 py-3 rounded-2xl pointer-events-auto">
        <div
          className="flex items-center cursor-pointer select-none group"
          onClick={() => handleScrollNav("home")}
          aria-label="TheGym Health Planet"
        >
          <div className="leading-none">
            <div className="flex items-end gap-1">
              <span className="font-bebas text-3xl sm:text-[34px] tracking-[0.06em] text-red-500 group-hover:text-red-400 transition-colors drop-shadow-[0_0_18px_rgba(239,68,68,0.25)]">
                THE GYM
              </span>
              <span className="text-xs text-zinc-300 mb-1">®</span>
            </div>
            <div className="-mt-1 pl-1">
              <span className="font-akaya italic text-sm text-zinc-200 group-hover:text-white transition-colors">
                health planet
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              if (item.type === "scroll") {
                const isActive = !!activeSection && activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleScrollNav(item.id)}
                    className={`relative text-sm font-semibold transition-colors cursor-pointer after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-orange-500 after:rounded-full after:transition-all after:duration-300 after:w-0 hover:after:w-full ${
                      isActive
                        ? "text-orange-500 after:w-full"
                        : "text-zinc-400 hover:text-orange-500"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              }

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={handleRouteNav}
                  className={({ isActive }) =>
                    `relative text-sm font-semibold transition-colors cursor-pointer after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-orange-500 after:rounded-full after:transition-all after:duration-300 after:w-0 hover:after:w-full ${
                      isActive
                        ? "text-orange-500 after:w-full"
                        : "text-zinc-400 hover:text-orange-500"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <NavLink to={"/contact"} className="hidden sm:flex items-center gap-2 bg-white text-black px-4 py-2 rounded-xl font-bold hover:bg-orange-500 hover:text-white transition-all">
              <User className="w-4 h-4" />
              Join Now
            </NavLink >
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-zinc-400 cursor-pointer "
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="px-4 relative md:opacity-0 md:pointer-events-none mt-2">
          <motion.div
            initial={{
              y: -100,
            }}
            animate={{
              y: 0,
            }}
            transition={{
              duration: 0.3,
            }}
            className="flex flex-col gap-8 items-center absolute w-full left-0 justify-between bg-zinc-900/90 backdrop-blur-lg border border-white/10 px-6 py-8 rounded-2xl pointer-events-auto"
          >
            {navItems.map((item) => (
              item.type === "scroll" ? (
                <button
                  key={item.id}
                  onClick={() => handleScrollNav(item.id)}
                  className={`relative text-sm font-semibold transition-colors cursor-pointer after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-orange-500 after:rounded-full after:transition-all after:duration-300 after:w-0 hover:after:w-full ${
                    !!activeSection && activeSection === item.id
                      ? "text-orange-500 after:w-full"
                      : "text-zinc-200 hover:text-orange-600"
                  }`}
                >
                  {item.label}
                </button>
              ) : (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={handleRouteNav}
                  className={({ isActive }) =>
                    `relative text-sm font-semibold transition-colors cursor-pointer after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-orange-500 after:rounded-full after:transition-all after:duration-300 after:w-0 hover:after:w-full ${
                      isActive
                        ? "text-orange-500 after:w-full"
                        : "text-zinc-200 hover:text-orange-600"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              )
            ))}

            <button className="sm:hidden flex items-center gap-2 bg-white text-black px-12 py-3 cursor-pointer rounded-xl font-bold hover:bg-orange-500 hover:text-white transition-all">
              <User className="w-4 h-4" />
              Join Now
            </button>
          </motion.div>
        </div>
      )}
    </nav>
  );
};
