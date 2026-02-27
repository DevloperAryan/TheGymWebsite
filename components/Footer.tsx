
import React from 'react';
import { Dumbbell, Mail, Phone, MapPin } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export const Footer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleScrollNav = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
      return;
    }

    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-zinc-950 pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-8">
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
            <p className="text-zinc-500 leading-relaxed mb-6">
              The premier destination for traditional strength and modern fitness in India. Empowering the warrior within since 2012.
            </p>
          </div>
          <div className='flex md:justify-between justify-evenly'>
          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">Quick Links</h4>
            <ul className="space-y-4 text-zinc-500">
              <li>
                <Link to="/classes">
                <button
                  type="button"
                  className="hover:text-orange-500 transition-colors"
                  >
                  Programs
                </button>
                  </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleScrollNav('home')}
                  className="hover:text-orange-500 transition-colors"
                  >
                  AI Coach
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleScrollNav('home')}
                  className="hover:text-orange-500 transition-colors"
                  >
                  Trainers
                </button>
              </li>
              <li>
                <Link to="/contact">
                <button
                  type="button"
                  className="hover:text-orange-500 transition-colors"
                  >
                  Membership
                </button>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">Support</h4>
            <ul className="space-y-4 text-zinc-500">
              <li>
                <Link to="/privacy" className="hover:text-orange-500 transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-orange-500 transition-colors">Terms of Use</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-orange-500 transition-colors">FAQ</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-orange-500 transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>
          </div>


          <div >
            <h4 className="text-white font-bold mb-2 uppercase tracking-widest text-sm text-center md:text-left">Contact</h4>
            <ul className=" text-zinc-500 flex gap-3 flex-wrap  justify-center md:flex-col">
              <li className="flex items-center gap-3">
                <MapPin size={18} className="text-orange-500" />
                <Link to="/find-gym" className='font-akaya font-extrabold text-orange-500/70 hover:text-zinc-300'>Find The Gym</Link>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-orange-500" />
                <a href="tel:+919811594828" className="hover:text-orange-500 transition-colors">+91 9811594828</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-orange-500" />
                <a href="mailto:info@thegym.in" className="hover:text-orange-500 transition-colors">info@thegym.in</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-500 text-sm">© 2024 The Gym. All rights reserved.</p>
          <div className="flex gap-6 text-zinc-500 text-sm">
            <a href="#" className="hover:text-white">Instagram</a>
            <a href="#" className="hover:text-white">YouTube</a>
            <a href="#" className="hover:text-white">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
