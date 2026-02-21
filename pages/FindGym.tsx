import React, { useEffect, useMemo, useState } from 'react';
import { MapPin, Phone, Mail, Search, Navigation, Dumbbell, Map, X, Facebook, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

type GymLocation = {
  id: number;
  name: string;
  state: string;
  address: string[];
  phone?: string[];
  email?: string | null;
  facebook?: string | null;
  youtube?: string | null;
  mapLink: string;
};

const DEFAULT_FACEBOOK_URL = '#';
const DEFAULT_YOUTUBE_URL = '#';

// --- DATA EXTRACTED FROM find-the-gym.html ---
const GYM_DATA: GymLocation[] = [
  {
    id: 1,
    name: "Pitampura",
    state: "Delhi",
    address: ["HD-3, 1st Floor", "Main Road Pitampura", "Opp Metro Pillar No 361", "New Delhi - 110034"],
    phone: ["+91.11.45282222", "+91.9999002222"],
    email: "shiv@thegym.in",
    mapLink: "https://www.google.com/maps/search/?api=1&query=The+Gym+Pitampura+Delhi"
  },
  {
    id: 2,
    name: "Patel Nagar",
    state: "Delhi",
    address: ["6/15, East Patel Nagar", "New Delhi - 110008"],
    phone: ["+91.11.4573320", "+91.9811132031"],
    email: "maneet@thegym.in",
    mapLink: "https://www.google.com/maps/search/?api=1&query=The+Gym+Patel+Nagar+Delhi"
  },
  {
    id: 3,
    name: "Rajouri Garden",
    state: "Delhi",
    address: ["J-13/66, Rajouri Garden", "Next to Kotak Mahindra Bank", "New Delhi - 110027"],
    phone: ["+91.11.45535888", "+91.9811594828"],
    email: "info@thegym.in",
    mapLink: "https://www.google.com/maps/search/?api=1&query=The+Gym+Rajouri+Garden+Delhi"
  },
  {
    id: 4,
    name: "Janak Puri",
    state: "Delhi",
    address: ["B-3/184, Janak Puri", "New Delhi - 110058"],
    phone: ["+91.11.47078707", "+91.9999099212"],
    email: "gumeet@thegym.in",
    mapLink: "https://www.google.com/maps/search/?api=1&query=The+Gym+Janak+Puri+Delhi"
  },
  {
    id: 5,
    name: "Paschim Vihar",
    state: "Delhi",
    address: ["B 2/6, Near Jwala Heri Market", "Opp. Kotak Mahindra Bank", "New Delhi - 110063"],
    phone: ["+91.9910564445"],
    email: "nitin@thegym.in",
    mapLink: "https://www.google.com/maps/search/?api=1&query=The+Gym+Paschim+Vihar+Delhi"
  },
  {
    id: 6,
    name: "Model Town",
    state: "Delhi",
    address: ["H-1, Model Town", "Above ICICI Bank", "New Delhi - 110009"],
    phone: ["+91.9999995950"],
    email: "modeltown@thegym.in",
    mapLink: "https://www.google.com/maps/search/?api=1&query=The+Gym+Model+Town+Delhi"
  },
  {
    id: 7,
    name: "Vikas Puri",
    state: "Delhi",
    address: ["H2/6, Opposite Anupam Banquet", "New Delhi - 110058"],
    phone: ["+91.9313316049"],
    email: null,
    mapLink: "https://www.google.com/maps/search/?api=1&query=The+Gym+Vikas+Puri+Delhi"
  },
  {
    id: 8,
    name: "Malviya Nagar",
    state: "Delhi",
    address: ["D-84, Malviya Nagar", "New Delhi - 110014"],
    phone: ["+91.11.40666668", "+91.7291979798"],
    email: "malvianagar@thegym.in",
    mapLink: "https://www.google.com/maps/search/?api=1&query=The+Gym+Malviya+Nagar+Delhi"
  },
  {
    id: 9,
    name: "Shalimar Bagh",
    state: "Delhi",
    address: ["AG - 38, Shalimar Bagh", "Below Syndicate Bank"],
    phone: ["+91.1147751132"],
    email: "manmeet@thegym.in",
    mapLink: "https://www.google.com/maps/search/?api=1&query=The+Gym+Shalimar+Bagh+Delhi"
  },
  {
    id: 10,
    name: "Rohini Sec 15",
    state: "Delhi",
    address: ["8B/10 Basement", "Sector - 15, Rohini - 110085"],
    phone: ["+91.11.27852913", "+91.9582741741"],
    email: "lovepreet@thegym.in",
    mapLink: "https://www.google.com/maps/search/?api=1&query=The+Gym+Rohini+Sector+15+Delhi"
  },
  {
    id: 11,
    name: "Rohini Sec 9",
    state: "Delhi",
    address: ["1st Floor, Harsha Arcade, Plot no.11", "DC Chowk, Sector - 9, Rohini - 110085"],
    phone: ["+91.11.45432999", "+91.9811628578"],
    email: "siddharth@thegym.in",
    mapLink: "https://www.google.com/maps/search/?api=1&query=The+Gym+Rohini+Sector+9+Delhi"
  },
  {
    id: 12,
    name: "Ashok Vihar",
    state: "Delhi",
    address: ["B-3/3, Lower Ground Floor", "Ashok Vihar Phase 2, New Delhi - 110052", "Adj. SBI, Opp. Police Station"],
    phone: ["+91 83760 22221"],
    email: "kulbhatia@thegym.in",
    mapLink: "https://www.google.com/maps/search/?api=1&query=The+Gym+Ashok+Vihar+Delhi"
  },
  {
    id: 13,
    name: "Kailash Colony",
    state: "Delhi",
    address: ["A-56, Kailash Colony", "Above Hyundai outlet", "New Delhi - 110048"],
    phone: ["+91.9899589959"],
    email: "kailashcolony@thegym.in",
    mapLink: "https://www.google.com/maps/search/?api=1&query=The+Gym+Kailash+Colony+Delhi"
  },
  {
    id: 14,
    name: "Karol Bagh",
    state: "Delhi",
    address: ["2C/2, New Rohtak Road", "Karol Bagh", "New Delhi - 110005"],
    phone: ["+91.9891016741"],
    email: "karolbagh@thegym.in",
    mapLink: "https://www.google.com/maps/search/?api=1&query=The+Gym+Karol+Bagh+Delhi"
  },
  {
    id: 15,
    name: "Dwarka",
    state: "Delhi",
    address: ["Rampal Chowk", "Dwarka - New Delhi"],
    phone: ["+91.9911434443"],
    email: "dwarkasec7@thegym.in",
    mapLink: "https://www.google.com/maps/search/?api=1&query=The+Gym+Dwarka+Delhi"
  },
  {
    id: 16,
    name: "Kirti Nagar",
    state: "Delhi",
    address: ["I-102, Kirti Nagar", "New Delhi - 110015"],
    phone: ["+91.9599170550"],
    email: "kirtinagar@thegym.in",
    mapLink: "https://www.google.com/maps/search/?api=1&query=The+Gym+Kirti+Nagar+Delhi"
  },
  {
    id: 17,
    name: "Gurugram",
    state: "Haryana",
    address: ["90-IDC 2nd Floor, 1 MG Road", "Above Tata Motors, Sector - 14", "Gurugram - 122001"],
    phone: ["+91.9711111194", "+91.9911111194"],
    email: null,
    mapLink: "https://www.google.com/maps/search/?api=1&query=The+Gym+Gurugram"
  },
  {
    id: 18,
    name: "Noida",
    state: "Uttar Pradesh",
    address: ["Kirtiman Plaza, Sector-30", "Noida - Uttar Pradesh"],
    phone: ["+91.9871524514"],
    email: "noida@thegym.in",
    mapLink: "https://www.google.com/maps/search/?api=1&query=The+Gym+Noida"
  },
  {
    id: 19,
    name: "Faridabad",
    state: "Haryana",
    address: ["1A/121, NIIT-1", "Faridabad, Haryana - 121001"],
    phone: ["+91.8447717171"],
    email: "faridabad@thegym.in",
    mapLink: "https://www.google.com/maps/search/?api=1&query=The+Gym+Faridabad"
  },
  {
    id: 20,
    name: "Sirsa",
    state: "Haryana",
    address: ["238, B-Block, Civil Hospital Road", "Sirsa, Haryana - 125055"],
    phone: ["+91.1666240065"],
    email: null,
    mapLink: "https://www.google.com/maps/search/?api=1&query=The+Gym+Sirsa+Haryana"
  },
  {
    id: 21,
    name: "Karnal",
    state: "Haryana",
    address: ["504 L Model Town", "Opposite State Bank of India", "Karnal, Haryana - 132001"],
    phone: ["+91.8375976155"],
    email: "karnal@thegym.in",
    mapLink: "https://www.google.com/maps/search/?api=1&query=The+Gym+Karnal+Haryana"
  },
  {
    id: 22,
    name: "Rohtak",
    state: "Haryana",
    address: ["Sector 3, Near Jaat Bhawan", "Rohtak - 124001, Haryana"],
    phone: ["+91.8222933313"],
    email: "rohtak@thegym.in",
    mapLink: "https://www.google.com/maps/search/?api=1&query=The+Gym+Rohtak"
  },
  {
    id: 23,
    name: "Ludhiana",
    state: "Punjab",
    address: ["Daarti Chowk", "Ludhiana, Punjab"],
    phone: ["+91.1614697353", "+91.15143838"],
    email: null,
    mapLink: "https://www.google.com/maps/search/?api=1&query=The+Gym+Ludhiana"
  },
  {
    id: 24,
    name: "Dehradun",
    state: "Uttarakhand",
    address: ["Adarsh Nagar, Chakrata Road", "Dehradun - 248001"],
    phone: ["+91.9837160571"],
    email: "anurag@thegym.in",
    mapLink: "https://www.google.com/maps/search/?api=1&query=The+Gym+Dehradun"
  }
];

const GymListItem: React.FC<{ gym: GymLocation; onShowDetails: (gym: GymLocation) => void }> = ({
  gym,
  onShowDetails,
}) => {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 flex items-center justify-between gap-4 hover:border-orange-500/40 transition-colors">
      <div className="flex items-center gap-4 min-w-0">
        <div className="w-11 h-11 bg-orange-600/10 rounded-xl flex items-center justify-center shrink-0">
          <Dumbbell className="w-5 h-5 text-orange-500" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-3 min-w-0">
            <h3 className="text-lg font-bold text-white truncate">{gym.name}</h3>
            <span className="hidden sm:inline-flex px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-black bg-white rounded-full shrink-0">
              {gym.state}
            </span>
          </div>
          <div className="text-xs text-zinc-500 truncate">{gym.address?.[0] ?? ''}</div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onShowDetails(gym)}
        className="shrink-0 bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-xl font-semibold transition-colors cursor-pointer"
      >
        Show details
      </button>
    </div>
  );
};

const GymDetailsModal: React.FC<{ gym: GymLocation; onClose: () => void }> = ({ gym, onClose }) => {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const facebookUrl = gym.facebook ?? DEFAULT_FACEBOOK_URL;
  const youtubeUrl = gym.youtube ?? DEFAULT_YOUTUBE_URL;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${gym.name} details`}
      onMouseDown={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-zinc-800 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-600/10 rounded-xl flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-orange-500" />
              </div>
              <div className="min-w-0">
                <h3 className="text-2xl font-black text-white truncate">{gym.name}</h3>
                <p className="text-sm text-zinc-500">{gym.state}</p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="flex items-start gap-3 text-zinc-300">
            <MapPin className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
            <div className="text-sm">
              {gym.address.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          </div>

          {gym.phone && gym.phone.length > 0 && (
            <div className="flex items-start gap-3 text-zinc-300">
              <Phone className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
              <div className="text-sm flex flex-col gap-1">
                {gym.phone.map((num, i) => (
                  <a
                    key={i}
                    href={`tel:${num.replace(/\./g, '').replace(/\+/g, '')}`}
                    className="hover:text-white transition-colors"
                  >
                    {num}
                  </a>
                ))}
              </div>
            </div>
          )}

          {gym.email && (
            <div className="flex items-start gap-3 text-zinc-300">
              <Mail className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
              <a href={`mailto:${gym.email}`} className="hover:text-white transition-colors break-all text-sm">
                {gym.email}
              </a>
            </div>
          )}

          <div className="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row gap-3">
            <Link
              to="/contact"
              className="flex-1 bg-orange-600 hover:bg-orange-500 text-white py-3 px-5 rounded-2xl font-bold transition-colors text-center"
            >
              Join Now
            </Link>
            <a
              href={gym.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 border border-zinc-700 hover:border-zinc-500 text-zinc-200 hover:text-white py-3 px-5 rounded-2xl font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Navigation className="w-4 h-4" />
              Locate on Maps
            </a>
          </div>

          <div className="pt-4 border-t border-zinc-800">
            <div className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-3">Social</div>
            <div className="flex gap-3">
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-2xl border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition-colors"
              >
                <Facebook className="w-4 h-4" />
                Facebook
              </a>
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-2xl border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition-colors"
              >
                <Youtube className="w-4 h-4" />
                YouTube
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FindGym = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [selectedGym, setSelectedGym] = useState<GymLocation | null>(null);

  const states = useMemo(() => {
    const allStates = GYM_DATA.map(gym => gym.state);
    return ["All", ...new Set(allStates)];
  }, []);

  const filteredGyms = useMemo(() => {
    return GYM_DATA.filter(gym => {
      const matchesSearch = gym.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            gym.state.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTab = activeTab === "All" || gym.state === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [searchTerm, activeTab]);

  return (
    <div className="min-h-screen bg-zinc-950  text-white font-sans selection:bg-orange-500/30">
      
      {/* Hero Section */}
      <div className="relative pt-12 pb-16 overflow-hidden pt-40">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full opacity-30 pointer-events-none">
           <div className="absolute top-20 left-10 w-72 h-72 bg-orange-600 rounded-full mix-blend-screen filter blur-[100px] animate-pulse"></div>
           <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-600 rounded-full mix-blend-screen filter blur-[120px] opacity-60"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
            FIND YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">TRAINING HOME</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto italic mb-12">
            "Train with intent. Progress with consistency."
          </p>
          
          {/* Search & Filter Container */}
          <div className="max-w-4xl mx-auto bg-zinc-900/60 backdrop-blur-lg border border-zinc-700/50 p-4 rounded-2xl shadow-2xl">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow group">
                <Search className="absolute left-4 top-3.5 w-5 h-5 text-zinc-500 group-focus-within:text-orange-500 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search by city, area or state..." 
                  className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl py-3 pl-12 pr-4 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-3 lg:pb-2 pr-2 scrollbar-x-sm">
                {states.map((state) => (
                  <button
                    key={state}
                    onClick={() => setActiveTab(state)}
                    className={`whitespace-nowrap px-6 py-3 rounded-xl font-medium transition-all duration-300 border ${
                      activeTab === state 
                        ? 'bg-orange-600 text-white border-orange-500 shadow-lg shadow-orange-900/20' 
                        : 'bg-zinc-800/50 text-zinc-400 border-zinc-700 hover:bg-zinc-800 hover:text-white'
                    }`}
                  >
                    {state}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="flex items-center justify-between mb-8">
           <h2 className="text-2xl font-bold text-white flex items-center gap-2">
             <Map className="text-orange-500" />
             {activeTab === "All" ? "All Locations" : `${activeTab} Locations`}
             <span className="ml-3 text-sm font-normal text-zinc-500 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">
               {filteredGyms.length} Centers
             </span>
           </h2>
        </div>

        {filteredGyms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredGyms.map((gym) => (
              <GymListItem key={gym.id} gym={gym} onShowDetails={setSelectedGym} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-zinc-900/30 rounded-3xl border border-zinc-800/50 border-dashed">
            <div className="bg-zinc-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-zinc-600" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No gyms found</h3>
            <p className="text-zinc-500">We couldn't find any locations matching your search.</p>
            <button 
              onClick={() => {setSearchTerm(""); setActiveTab("All")}}
              className="mt-6 text-orange-500 hover:text-orange-400 font-medium hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {selectedGym && <GymDetailsModal gym={selectedGym} onClose={() => setSelectedGym(null)} />}

      {/* Footer CTA */}
      <div className="bg-zinc-900 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to train smarter?</h2>
            <button className="bg-white text-black hover:bg-zinc-200 px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-xl">
              Claim Your Free Trial
            </button>
        </div>
      </div>
    </div>
  );
};

export default FindGym;