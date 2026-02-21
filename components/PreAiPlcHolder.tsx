import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MousePointer2, Box, Circle, Triangle } from 'lucide-react';

// --- Orange/Black Idle State Component ---
// Usage: Render this when the app is NOT generating and HAS NO content yet.
// Now features a larger, more complex central system with scattering orbital elements.
const OrangeIdleState = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center bg-transparent rounded-[2rem] border-2 border-none p-8 group overflow-hidden transition-colors duration-500 min-h-[610px] overflow-hidden">
      
      {/* 1. Background Ambience */}
      <motion.div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(#f97316 1px, transparent 1px)', 
          backgroundSize: '30px 30px' 
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      
      {/* 2. Main Visual System (Significantly Larger) */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* The Central "Solar System" Container */}
        <div className="relative w-64 h-64 mb-12 flex items-center justify-center">
           
           {/* Layer 1: The Distant Orbit Ring (Slow) */}
           <motion.div 
             className="absolute inset-0 border border-zinc-800/60 rounded-full"
             animate={{ rotate: 360 }}
             transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
           >
              {/* Satellite 1 on orbit */}
              <div className="absolute top-1/2 -right-2 w-3 h-3 bg-zinc-800 border border-zinc-600 rounded-sm flex items-center justify-center">
                <div className="w-1 h-1 bg-orange-500/50 rounded-full" />
              </div>
           </motion.div>

           {/* Layer 2: The Middle Orbit Ring (Medium Speed) */}
           <motion.div 
             className="absolute inset-12 border border-dashed border-zinc-700/50 rounded-full"
             animate={{ rotate: -360 }}
             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
           >
             {/* Satellite 2 on orbit */}
             <div className="absolute -bottom-2 left-1/2 w-4 h-4 bg-zinc-900 border border-orange-500/30 rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
             </div>
           </motion.div>

           {/* Layer 3: Scattered Floating "Sub-Parts" (Independent Floating) */}
           {/* These elements float around the center randomly */}
           
           {/* Top Right Triangle Node */}
           <motion.div 
             className="absolute -top-4 -right-8 p-2 bg-zinc-900/80 border border-zinc-700 rounded-lg backdrop-blur-sm"
             animate={{ 
               y: [0, -10, 0],
               rotate: [0, 5, 0]
             }}
             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
           >
             <Triangle size={12} className="text-zinc-500 fill-zinc-500/20" />
           </motion.div>

           {/* Bottom Left Data Cluster */}
           <motion.div 
             className="absolute bottom-0 -left-10 px-3 py-1.5 bg-zinc-900/90 border border-zinc-800 rounded-full flex gap-2 items-center shadow-lg"
             animate={{ 
               x: [0, -5, 0],
               y: [0, 5, 0]
             }}
             transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
           >
             <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
             <div className="h-1 w-8 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-zinc-600 w-1/2"
                  animate={{ x: [-10, 20] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
             </div>
           </motion.div>

           {/* Top Left Floating Box */}
           <motion.div 
             className="absolute top-4 -left-4 p-1.5 bg-zinc-800 rounded border border-zinc-600"
             animate={{ 
               rotate: [0, -10, 0],
               scale: [1, 0.9, 1]
             }}
             transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
           >
             <Box size={10} className="text-orange-400" />
           </motion.div>


           {/* Layer 4: Inner Energy Field */}
           <motion.div 
             className="absolute inset-20 bg-orange-500/5 rounded-full blur-2xl"
             animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.1, 0.3, 0.1] }}
             transition={{ duration: 3, repeat: Infinity }}
           />

           {/* Layer 5: The MAIN Core Block (Bigger now) */}
           <motion.div 
             className="w-24 h-24 bg-zinc-900 rounded-2xl border flex items-center justify-center shadow-2xl relative overflow-hidden border-orange-500/50 transition-colors duration-300 z-20"
             whileHover={{ scale: 1.05 }}
             animate={{ y: [0, -4, 0] }}
             transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
           >
             <Sparkles size={40} className="text-orange-400 transition-colors z-10" />
             
             {/* Tech Scanlines inside the box */}
             <div className="absolute inset-0 bg-[linear-gradient(transparent_2px,#000_3px)] opacity-20 pointer-events-none" />
             <motion.div 
               className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent"
               animate={{ x: ['-100%', '200%'] }}
               transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }}
             />
           </motion.div>

        </div>

        {/* 3. Text & Call to Action */}
        <div className="text-center space-y-3 z-20 relative">
          <motion.h3 
            className="text-2xl font-bold text-zinc-300 group-hover:text-white transition-colors tracking-tight"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            SMART <span className='text-orange-500'>AI</span> TRAINER
          </motion.h3>
          <p className="text-sm text-zinc-500 max-w-[280px] leading-relaxed mx-auto">
            Fill the preferences to generate customize <span className='text-orange-500'>Workout</span> plan and Proper <span className='text-orange-500'>Meal</span> guide.
          </p>
          
          <motion.div 
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500/70 mt-4 border border-orange-500/20 px-4 py-2 rounded-full bg-orange-500/5"
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(249,115,22,0.1)' }}
          >
            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-ping" />
            Standing By
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default OrangeIdleState;