
import React from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight, Zap } from 'lucide-react';
import CountUp from 'react-countup';
import heroImg from '@/assets/MainHeroImg.png'
import { Link } from 'react-router-dom';

export const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Video/Image Overlay */}
      {/* <div className="absolute inset-0 -z-10">
        <img 
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=2000" 
          alt="Gym background" 
          className="w-full h-full object-cover opacity-40 z-[10]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent" />
      </div> */}

      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="flex flex-row max-md:flex-col md:gap-8 lg:gap-10 items-center justify-between">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className='md:w-4/7 flex flex-col items-center'
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-sm font-bold mb-2 mt-6">
              <Zap className="w-3 h-3 fill-current" />
              "CONNECTING CITIES THROUGH FITNESS"
            </div>

            
            <h1 className="font-bebas text-7xl lg:text-8xl xl:text-9xl leading-[0.9] mb-4">
              UNLEASH YOUR <br />
              <span className="gradient-text">INNER WARRIOR</span>
            </h1>
            
            <p className="text-zinc-400 text-lg lg:text-xl max-w-lg mb-8 font-light leading-relaxed">
              Experience the perfect fusion of traditional Indian strength endurance and cutting-edge sports science. Transform your body, elevate your spirit.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link to="/contact">
              <button className="flex items-center gap-3 bg-orange-700 hover:bg-orange-700 text-white px-5 py-4 rounded-2xl font-bold text-lg transition-all group shadow-lg shadow-orange-600/20 cursor-pointer">
                Start Your Journey
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              </Link>
              
              <Link to="/gallery">
              <button className="flex items-center gap-3 bg-zinc-900/50 backdrop-blur border border-white/10 hover:bg-zinc-800 text-white px-9 py-4 rounded-2xl font-bold text-lg transition-all cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <Play className="w-4 h-4 fill-current" />
                </div>
                See Our Club
              </button>
              </Link>
            </div>

            <div className="mt-16 flex items-center gap-8">
              <div>
                <div className="text-4xl font-bebas text-white"> <CountUp start={10} end={272} duration={2} useEasing={false}/>K+</div>
                <div className="text-zinc-500 text-sm font-semibold uppercase tracking-wider">Warriors</div>
              </div>
              <div className="w-px h-10 bg-zinc-800" />
              <div>
                <div className="text-4xl font-bebas text-white"><CountUp start={0} end={38} duration={2} useEasing={false}/>+</div>
                <div className="text-zinc-500 text-sm font-semibold uppercase tracking-wider">Centers</div>
              </div>
              <div className="w-px h-10 bg-zinc-800" />
              <div>
                <div className="text-4xl font-bebas text-white">4.<CountUp start={0} end={9} duration={2} useEasing={false}/>+</div>
                <div className="text-zinc-500 text-sm font-semibold uppercase tracking-wider">Rating</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative lg:block md:w-3/7"
          >
            
            {/* Hero img */}
             <img src={heroImg} alt="Hero image Gym" width={500} className='relative -bottom-10 md:-bottom-30 z-10'/>
           
            


            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-600/40 rounded-full blur-[80px] animate-pulse " />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-yellow-500/30 rounded-full blur-[100px] z-0 animate-pulse" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
