
import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Linkedin } from 'lucide-react';

const trainers = [
  {
    name: 'Vikram Singh',
    role: 'Lead Strength Coach',
    image: 'https://img.freepik.com/premium-photo/handsome-man-standing-strong-gym-flexing-muscles-muscular-athletic-bodybuilder-fitness_286419-155.jpg'
  },
  {
    name: 'Priya Sharma',
    role: 'Yoga & Mobility Expert',
    image: 'https://t3.ftcdn.net/jpg/03/27/48/96/360_F_327489617_OsmQVwhaH1eC445XFW6jZywKnOF2veFA.jpg'
  },
  {
    name: 'Arjun Mehra',
    role: 'Nutrition Specialist',
    image: 'https://img.freepik.com/free-photo/young-adult-doing-indoor-sport-gym_23-2149205542.jpg?semt=ais_hybrid&w=740&q=80'
  }
];

export const TrainersSection: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
        <div>
          <h2 className="font-bebas text-5xl md:text-7xl mb-4">OUR ELITE <span className="text-orange-500">TRAINERS</span></h2>
          <p className="text-zinc-500 max-w-xl">Work with certified experts who understand the nuances of both modern physiology and traditional wellness.</p>
        </div>
        <button className="text-orange-500 font-bold hover:underline">View All Coaches</button>
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        {trainers.map((trainer, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group"
          >
            <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden mb-6 border border-white/5">
              <img src={trainer.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={trainer.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="absolute bottom-6 left-6 right-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="flex justify-center gap-4">
                  {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                    <button key={i} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-orange-600 transition-colors">
                      <Icon className="w-5 h-5" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-1">{trainer.name}</h3>
            <p className="text-orange-500 font-semibold tracking-wide uppercase text-xs">{trainer.role}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
