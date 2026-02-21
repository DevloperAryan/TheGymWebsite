import React from 'react';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

// --- Orange/Black AI Placeholder Component ---
// Usage: Place this inside your right-side div. 
// It is designed to fill the available height/width of its parent.
const OrangeAIPlaceholder = () => {
  return (
    <div className="bg-zinc-900/50 backdrop-blur-xl px-3 sm:px-6 md:px-8 py-8 flex items-center justify-center min-h-[620px] rounded-[2rem]">
        <div className="absolute inset-0 opacity-[0.05] rounded-[2rem]" 
             style={{ 
               backgroundImage: 'linear-gradient(#f97316 1px, transparent 1px), linear-gradient(90deg, #f97316 1px, transparent 1px)', 
               backgroundSize: '40px 40px' 
             }} 
        />
 {/* 2. Main Animated Core */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* The "AI Brain" Container */}
        <div className="relative w-38 h-38 mb-10">
          
          {/* Inner Pulsing Core (Orange) */}
          <motion.div
            className="absolute inset-0 bg-orange-600 rounded-full blur-2xl opacity-40"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3] 
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
          
          {/* Outer Ring 1 (Solid Orange) */}
          <motion.div
            className="absolute inset-[-4px] rounded-full border-2 border-transparent border-t-orange-500 border-r-orange-500/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Outer Ring 2 (Dashed Dark Orange) */}
          <motion.div
            className="absolute inset-[-12px] rounded-full border border-zinc-800 border-b-orange-700 dashed"
            animate={{ rotate: -360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />

          {/* Central Icon Container */}
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 rounded-full border border-zinc-800 shadow-[0_0_15px_rgba(249,115,22,0.3)] z-10">
            <motion.div
              animate={{ 
                color: ["#f97316", "#fb923c", "#f97316"], // Fluctuating orange shades
                filter: ["brightness(1)", "brightness(1.3)", "brightness(1)"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Brain size={40} className="text-orange-500" />
            </motion.div>
          </div>

          {/* Orbiting Particles */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-orange-400 rounded-full shadow-[0_0_8px_rgba(249,115,22,1)]"
              animate={{ 
                rotate: [0, 360],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "linear",
              }}
              style={{ 
                top: '50%', 
                left: '50%', 
                transformOrigin: `${30 + (i * 10)}px ${30 + (i * 10)}px` // Spiral offsets
              }}
            />
          ))}
        </div>

        {/* 3. Text Status */}
        <div className="text-center space-y-2">
          <motion.h3 
            className="text-xl font-bold tracking-tight text-white"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            GENERATING
          </motion.h3>
          <p className="text-sm text-zinc-500 uppercase tracking-widest text-[10px]">
            Synthesizing Data
          </p>
        </div>

        {/* 4. Loading Bar (Tech Style) */}
        <div className="mt-8 w-48 h-1 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
          <motion.div 
            className="h-full bg-orange-500 shadow-[0_0_10px_#f97316]"
            animate={{ 
              x: ["-100%", "100%"],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>
        
    
    
    </div>
  );
};

export default OrangeAIPlaceholder;