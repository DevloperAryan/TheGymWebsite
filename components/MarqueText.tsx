import React from "react";
import { motion } from "framer-motion";

interface MarqueProps {
  /** Speed of the animation in seconds */
  duration?: number;
  className?: string;
}

const MarqueText: React.FC<MarqueProps> = ({ 
  duration = 20, 
  className = "" 
}) => {
  // You can adjust the number of repetitions based on your font size
  const SloganBlock = () => (
    <div className="flex shrink-0 items-center justify-around gap-30 pr-10 font-rubix">
      <span className="text-4xl tracking-wide lg:text-6xl font-black uppercase text-white">No <span className="text-orange-500/40"> Pain</span> No <span className="text-orange-500/40"> Gain</span></span>
      <span className="text-4xl tracking-wide lg:text-6xl font-black uppercase text-gray-500">No <span className="text-orange-500"> Pain</span> No <span className="text-orange-500"> Gain</span></span>
      <span className="text-4xl tracking-wide lg:text-6xl font-black uppercase text-white">No <span className="text-orange-500/40"> Pain</span> No <span className="text-orange-500/40"> Gain</span></span>
      <span className="text-4xl tracking-wide lg:text-6xl font-black uppercase text-gray-500">No <span className="text-orange-500"> Pain</span> No <span className="text-orange-500"> Gain</span></span>
    </div>
  );

  return (
    <div 
      className={`relative flex overflow-hidden bg-zinc-950 py-6 ${className}`}
    >
      <motion.div
        className="flex whitespace-nowrap gap-30"
        animate={{ x: "-50%" }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: duration,
        }}
      >
        {/* Render the content twice to create the infinite loop buffer */}
        <SloganBlock />
        <SloganBlock />
      </motion.div>

      {/* Optional: Vignette effect for a polished look */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent z-10" />
    </div>
  );
};

export default MarqueText;