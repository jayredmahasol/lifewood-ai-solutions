import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, ArrowRight, ArrowDown, Globe, Heart, Users, TrendingUp } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

declare global {
  interface Window {
    L: any;
  }
}

export const PhilanthropyPage: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Wait for Leaflet to load
    const L = window.L;
    if (!L) return;

    // Initialize Map centered on Africa/India region
    const map = L.map(mapContainerRef.current, {
        zoomControl: false, 
        attributionControl: false,
        scrollWheelZoom: false,
        dragging: false,
        doubleClickZoom: false,
        boxZoom: false
    }).setView([5, 20], 3);

    mapInstanceRef.current = map;

    // Add CartoDB Positron Tile Layer (Light theme fits the palette)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    // Custom Pin Icon using the palette colors
    const pinSvg = `
      <svg width="30" height="42" viewBox="0 0 30 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 0C6.71573 0 0 6.71573 0 15C0 26.25 15 42 15 42C15 42 30 26.25 30 15C30 6.71573 23.2843 0 15 0Z" fill="#046241"/>
        <circle cx="15" cy="15" r="6" fill="#FFB347"/>
      </svg>
    `;

    const pinIcon = L.divIcon({
      className: 'custom-pin-icon',
      html: pinSvg,
      iconSize: [30, 42],
      iconAnchor: [15, 42]
    });

    // Locations mentioned in the text
    const locations = [
      { lat: -30.5595, lng: 22.9375 }, // South Africa
      { lat: 9.0820, lng: 8.6753 },    // Nigeria
      { lat: -0.2280, lng: 15.8277 },  // Republic of the Congo
      { lat: -4.0383, lng: 21.7587 },  // DRC
      { lat: 7.9465, lng: -1.0232 },   // Ghana
      { lat: -18.7669, lng: 46.8691 }, // Madagascar
      { lat: 9.3077, lng: 2.3158 },    // Benin
      { lat: 1.3733, lng: 32.2903 },   // Uganda
      { lat: -0.0236, lng: 37.9062 },  // Kenya
      { lat: 7.5400, lng: -5.5471 },   // Ivory Coast
      { lat: 26.8206, lng: 30.8025 },  // Egypt
      { lat: 9.1450, lng: 40.4897 },   // Ethiopia
      { lat: 17.6078, lng: 8.0817 },   // Niger
      { lat: -6.3690, lng: 34.8888 },  // Tanzania
      { lat: -22.9576, lng: 18.4904 }, // Namibia
      { lat: -13.1339, lng: 27.8493 }, // Zambia
      { lat: -19.0154, lng: 29.1549 }, // Zimbabwe
      { lat: 6.4281, lng: -9.4295 },   // Liberia
      { lat: 8.4606, lng: -11.7799 },  // Sierra Leone
      { lat: 23.6850, lng: 90.3563 },  // Bangladesh
      { lat: 20.5937, lng: 78.9629 },  // India
    ];

    locations.forEach(loc => {
      L.marker([loc.lat, loc.lng], { icon: pinIcon }).addTo(map);
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="bg-[#f5eedb] min-h-screen font-sans text-[#133020] selection:bg-[#FFB347] selection:text-[#133020] overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3 mb-8"
        >
           <div className="h-[1px] w-12 bg-[#046241]"></div>
           <span className="text-[#046241] font-mono text-sm tracking-widest uppercase font-semibold">Philanthropy & Impact</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
           <motion.div
             initial={{ opacity: 0, x: -30 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
           >
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9] text-[#133020]">
                Creating <br/>
                <span className="text-[#046241]">Lasting Change.</span>
              </h1>
              <p className="text-xl text-[#133020]/80 leading-relaxed font-light mb-10 max-w-lg">
                We direct resources into education and developmental projects that create lasting change. Our approach goes beyond giving: it builds sustainable growth and empowers communities for the future.
              </p>
              <a href="#contact" className="group relative px-8 py-4 bg-[#133020] text-white rounded-full font-bold text-lg overflow-hidden flex items-center gap-2 w-fit shadow-lg hover:shadow-xl transition-all">
                 <span className="relative z-10 group-hover:text-[#f5eedb] transition-colors duration-300">Start Impact</span>
                 <ArrowUpRight className="relative z-10 group-hover:text-[#f5eedb] transition-colors duration-300" size={20} />
                 <div className="absolute inset-0 bg-[#046241] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </a>
           </motion.div>

           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.8, delay: 0.4 }}
             className="relative"
           >
              <div className="absolute inset-0 bg-[#FFB347] rounded-[3rem] rotate-3 opacity-20 blur-xl"></div>
              <img 
                src="https://framerusercontent.com/images/7RZ9ESz7UTTmxn6ifh8I9jHlHA.png?width=1004&height=591" 
                alt="Community Impact" 
                className="relative rounded-[3rem] shadow-2xl w-full object-cover border border-white/20"
              />
           </motion.div>
        </div>
      </section>

      {/* Vision Statement - Bento Grid Style */}
      <section className="px-6 max-w-7xl mx-auto mb-32">
         <div className="bg-[#F9F7F7] rounded-[3rem] p-8 md:p-16 border border-[#133020]/5 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFC370]/20 rounded-full blur-[80px] pointer-events-none"></div>
            
            <div className="relative z-10 text-center max-w-4xl mx-auto">
               <div className="w-16 h-16 bg-[#ffffff] rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-sm">
                  <Heart className="text-[#046241]" size={32} />
               </div>
               <h2 className="text-3xl md:text-5xl font-light leading-tight text-[#133020] mb-10">
                 "Our vision is of a world where financial investment plays a central role in solving the social and environmental challenges facing the global community."
               </h2>
               <div className="flex flex-wrap justify-center gap-4">
                  <span className="px-6 py-2 bg-[#ffffff] rounded-full text-[#133020] font-medium border border-[#133020]/10 shadow-sm">Africa</span>
                  <span className="px-6 py-2 bg-[#ffffff] rounded-full text-[#133020] font-medium border border-[#133020]/10 shadow-sm">Indian Sub-continent</span>
                  <span className="px-6 py-2 bg-[#ffffff] rounded-full text-[#133020] font-medium border border-[#133020]/10 shadow-sm">Global Community</span>
               </div>
            </div>
         </div>
      </section>

      {/* Map Section */}
      <section className="px-6 max-w-[1400px] mx-auto mb-32 relative">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
           <div>
              <h2 className="text-4xl md:text-6xl font-semibold tracking-tighter text-[#133020] mb-4">
                 Transforming Communities
              </h2>
              <p className="text-xl text-[#133020]/70">Empowering regions across the globe.</p>
           </div>
           
           {/* Animated Spinner Graphic */}
           <div className="hidden md:flex flex-col items-center relative">
             <div className="relative w-24 h-24 flex items-center justify-center animate-spin-slow">
                <svg viewBox="0 0 100 100" width="100" height="100">
                  <defs>
                    <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                  </defs>
                  <text fontSize="11" fontWeight="bold" letterSpacing="4">
                    <textPath xlinkHref="#circle" className="fill-[#046241] uppercase">
                      impact • growth • future •
                    </textPath>
                  </text>
                </svg>
             </div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#FFB347] rounded-full"></div>
           </div>
        </div>

        <div className="bg-[#ffffff] rounded-[2.5rem] overflow-hidden relative h-[500px] md:h-[600px] shadow-xl border border-[#133020]/5">
           <div ref={mapContainerRef} className="absolute inset-0 z-0 grayscale-[20%] contrast-[1.1]"></div>
           <div className="absolute inset-0 pointer-events-none border-[12px] border-[#ffffff]/50 rounded-[2.5rem]"></div>
        </div>
      </section>

      {/* Impact Pillars - Bento Grid */}
      <section className="px-6 max-w-7xl mx-auto mb-32">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Partnership Card */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="md:col-span-2 bg-[#133020] rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden group"
            >
               <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
               <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                     <div className="w-12 h-12 bg-[#ffffff]/10 rounded-xl flex items-center justify-center mb-6 backdrop-blur-sm">
                        <Users className="text-[#FFB347]" size={24} />
                     </div>
                     <h3 className="text-3xl md:text-4xl font-bold mb-4">Partnership</h3>
                     <p className="text-[#f5eedb]/80 text-lg leading-relaxed max-w-xl">
                        In partnership with our philanthropic partners, Lifewood has expanded operations in South Africa, Nigeria, Republic of the Congo, DRC, Ghana, Madagascar, Benin, Uganda, Kenya, Ivory Coast, Egypt, Ethiopia, Niger, Tanzania, Namibia, Zambia, Zimbabwe, Liberia, Sierra Leone, and Bangladesh.
                     </p>
                  </div>
                  <div className="mt-8 flex gap-2">
                     <div className="h-2 w-2 rounded-full bg-[#FFB347]"></div>
                     <div className="h-2 w-2 rounded-full bg-[#046241]"></div>
                     <div className="h-2 w-2 rounded-full bg-[#ffffff]"></div>
                  </div>
               </div>
               <img 
                  src="https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?q=80&w=2940&auto=format&fit=crop" 
                  alt="Partnership" 
                  className="absolute right-0 bottom-0 w-1/2 h-full object-cover opacity-20 mask-image-linear-gradient-to-l"
               />
            </motion.div>

            {/* Application Card */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="bg-[#F9F7F7] rounded-[2.5rem] p-8 md:p-12 border border-[#133020]/5 relative overflow-hidden group hover:shadow-lg transition-shadow"
            >
               <div className="w-12 h-12 bg-[#133020]/5 rounded-xl flex items-center justify-center mb-6">
                  <Globe className="text-[#046241]" size={24} />
               </div>
               <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#133020]">Application</h3>
               <p className="text-[#133020]/70 text-lg leading-relaxed mb-8">
                  Applying our methods and experience for the development of people in under resourced economies.
               </p>
               <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#ffffff] to-transparent"></div>
               <img 
                  src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=2874&auto=format&fit=crop" 
                  alt="Application" 
                  className="absolute bottom-0 right-0 w-32 h-32 object-cover rounded-tl-[2rem] border-t-4 border-l-4 border-[#ffffff]"
               />
            </motion.div>

            {/* Expanding Card */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               className="md:col-span-3 bg-[#046241] rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden flex flex-col md:flex-row items-center gap-12"
            >
               <div className="md:w-1/2 relative z-10">
                  <div className="w-12 h-12 bg-[#ffffff]/10 rounded-xl flex items-center justify-center mb-6 backdrop-blur-sm">
                     <TrendingUp className="text-[#FFC370]" size={24} />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-4">Expanding Horizons</h3>
                  <p className="text-[#f5eedb]/90 text-lg leading-relaxed mb-6">
                     We are expanding access to training, establishing equitable wage structures and career and leadership progression to create sustainable change.
                  </p>
                  <button className="px-6 py-3 bg-[#FFB347] text-[#133020] font-bold rounded-full hover:bg-[#FFC370] transition-colors">
                     Join Our Mission
                  </button>
               </div>
               <div className="md:w-1/2 relative h-64 w-full rounded-3xl overflow-hidden shadow-2xl border border-[#ffffff]/10 transform md:rotate-2 hover:rotate-0 transition-transform duration-500">
                  <img 
                     src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2940&auto=format&fit=crop" 
                     alt="Expansion" 
                     className="absolute inset-0 w-full h-full object-cover"
                  />
               </div>
               
               {/* Decorative Circle */}
               <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#ffffff]/5 rounded-full blur-3xl pointer-events-none"></div>
            </motion.div>

         </div>
      </section>

      {/* Footer Quote */}
      <section className="px-6 max-w-4xl mx-auto text-center mb-32">
         <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
         >
            <h2 className="text-4xl md:text-6xl font-light text-[#133020] leading-tight">
               Working with new <br/>
               <span className="font-serif italic text-[#046241]">intelligence</span> for a better world.
            </h2>
         </motion.div>
      </section>

    </div>
  );
};
