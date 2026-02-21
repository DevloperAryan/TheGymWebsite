import React from "react";
import { Send } from "lucide-react";
import girl3D from "@/assets/girl3D.png"

export const Newsletter: React.FC = () => {
  return (
    <div className=" relative max-w-7xl mx-auto px-2 sm:px-6 lg:px-16">
      <div className="bg-orange-600 h-[500px] max-h-[600px] p-2 text-center relative rounded-xl overflow-hidden [clip-path:polygon(0%_0%,100%_30%,100%_100%,100%_100%,0_100%)] ">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="min-h-full flex items-center">
          <div className="relative">
            <h2 className="font-bebas text-3xl md:text-6xl text-white mb-6">
              READY TO JOIN THE CLAN?
            </h2>
            <p className="text-orange-100 text-lg mb-10 max-w-xl mx-auto">
              Subscribe for exclusive training tips, early access to workshops,
              and member-only events.
            </p>

            <form className="max-w-md mx-auto flex gap-1 sm:gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-2 md:px-6 md:py-4 text-white placeholder:text-orange-200 focus:outline-none focus:bg-white/20 transition-all"
              />
              <button className="bg-white text-orange-600 p-4 rounded-2xl font-bold hover:bg-black hover:text-white transition-all">
                <Send className="w-6 h-6" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
