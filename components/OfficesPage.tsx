import React, { useEffect, useRef } from 'react';
import { ArrowDown, Globe, MapPin, Users, Building2, ArrowUpRight } from 'lucide-react';
import { motion, useInView, animate } from 'framer-motion';

declare global {
  interface Window {
    L: any;
  }
}

const Counter = ({ value, duration = 2 }: { value: number, duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      const node = ref.current;
      const controls = animate(0, value, {
        duration,
        onUpdate(value) {
          if (node) {
            node.textContent = Math.floor(value).toLocaleString();
          }
        }
      });
      return () => controls.stop();
    }
  }, [inView, value, duration]);

  return <span ref={ref}>0</span>;
};

export const OfficesPage: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Wait for Leaflet to load
    const L = window.L;
    if (!L) return;

    // Initialize Map
    // Centering roughly to show most continents
    const map = L.map(mapContainerRef.current, {
        zoomControl: false, 
        attributionControl: false,
        scrollWheelZoom: false,
        minZoom: 2,
        maxBounds: [[-90, -180], [90, 180]],
        maxBoundsViscosity: 1.0
    }).setView([20, 10], 2);

    mapInstanceRef.current = map;

    // Add CartoDB Positron Tile Layer (Clean, light style similar to screenshot)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19,
      noWrap: true,
      bounds: [[-90, -180], [90, 180]]
    }).addTo(map);

    // Add Zoom Control to top right to match screenshot
    L.control.zoom({
      position: 'topright'
    }).addTo(map);

    // Custom Icon Definition
    const orangeIcon = L.divIcon({
      className: 'custom-div-icon',
      html: `<div style="background-color: #FFB347; width: 16px; height: 16px; border-radius: 50%; border: 3px solid #133020; box-shadow: 0 0 0 4px rgba(255, 179, 71, 0.4);"></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8]
    });

    // Locations (Approximate based on global presence)
    const locations = [
      { lat: 51.505, lng: -0.09, title: "London" }, // UK
      { lat: 48.8566, lng: 2.3522, title: "Paris" }, // France
      { lat: 52.5200, lng: 13.4050, title: "Berlin" }, // Germany
      { lat: 40.7128, lng: -74.0060, title: "New York" }, // USA East
      { lat: 34.0522, lng: -118.2437, title: "Los Angeles" }, // USA West
      { lat: -23.5505, lng: -46.6333, title: "Sao Paulo" }, // Brazil
      { lat: 35.6762, lng: 139.6503, title: "Tokyo" }, // Japan
      { lat: 31.2304, lng: 121.4737, title: "Shanghai" }, // China
      { lat: 28.6139, lng: 77.2090, title: "New Delhi" }, // India
      { lat: -33.8688, lng: 151.2093, title: "Sydney" }, // Australia
      { lat: 30.0444, lng: 31.2357, title: "Cairo" }, // Egypt
      { lat: 25.2048, lng: 55.2708, title: "Dubai" }, // UAE
      { lat: 55.7558, lng: 37.6173, title: "Moscow" }, // Russia
      { lat: 1.3521, lng: 103.8198, title: "Singapore" }, // Singapore
      { lat: 6.5244, lng: 3.3792, title: "Lagos" }, // Nigeria
    ];

    locations.forEach(loc => {
      L.marker([loc.lat, loc.lng], { icon: orangeIcon }).addTo(map);
    });

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="pt-32 pb-20 bg-[#f5eedb] min-h-screen font-sans text-[#133020] selection:bg-[#FFB347] selection:text-[#133020] overflow-hidden">
      
      {/* Header Section */}
      <section className="px-6 max-w-7xl mx-auto mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3 mb-8"
        >
           <div className="h-[1px] w-12 bg-[#046241]"></div>
           <span className="text-[#046241] font-mono text-sm tracking-widest uppercase font-semibold">Global Presence</span>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-between items-end gap-12">
           <motion.div
             initial={{ opacity: 0, x: -30 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="max-w-4xl"
           >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 leading-[0.9] text-[#133020]">
                Largest Global <br/>
                <span className="text-[#046241]">Data Distribution.</span>
              </h1>
              <p className="text-xl md:text-2xl text-[#133020]/80 leading-relaxed font-light max-w-2xl">
                Connecting resources across continents to deliver unparalleled data solutions.
              </p>
           </motion.div>

           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.8, delay: 0.3 }}
             className="hidden md:flex flex-col items-center"
           >
              <div className="relative w-32 h-32 flex items-center justify-center animate-[spin_10s_linear_infinite]">
                 <svg viewBox="0 0 100 100" width="120" height="120">
                   <defs>
                     <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                   </defs>
                   <text fontSize="11" fontWeight="bold" letterSpacing="2">
                     <textPath xlinkHref="#circle" className="fill-[#046241] uppercase">
                       global reach • global reach • global reach •
                     </textPath>
                   </text>
                 </svg>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#FFB347] rounded-full border-4 border-[#f5eedb] shadow-sm"></div>
           </motion.div>
        </div>
      </section>

      {/* Main Grid: Map & Stats */}
      <section className="px-6 max-w-[1400px] mx-auto mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-auto lg:h-[600px]">
          
          {/* Map Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-8 xl:col-span-9 bg-[#F9F7F7] rounded-[3rem] overflow-hidden relative shadow-inner min-h-[400px] border border-[#133020]/5"
          >
            <div ref={mapContainerRef} className="absolute inset-0 z-0 grayscale opacity-80 hover:grayscale-0 transition-all duration-700"></div>
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-[#F9F7F7]/50"></div>
          </motion.div>

          {/* Stats Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="lg:col-span-4 xl:col-span-3 bg-[#133020] rounded-[3rem] p-8 md:p-10 flex flex-col justify-between text-white shadow-2xl relative overflow-hidden"
          >
             {/* Decorative shine */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-[#046241] opacity-20 rounded-full -translate-y-1/2 translate-x-1/2 blur-[80px]"></div>
             <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#FFB347] opacity-10 rounded-full translate-y-1/2 -translate-x-1/2 blur-[60px]"></div>

             <div className="relative z-10 flex flex-col gap-12 h-full justify-center">
                
                {/* Stat 1 */}
                <div className="group">
                  <div className="flex items-center gap-3 mb-2 text-[#FFB347]">
                     <Users size={24} />
                     <span className="text-sm font-mono tracking-widest uppercase opacity-80">Resources</span>
                  </div>
                  <div className="text-5xl md:text-6xl font-bold mb-2 group-hover:text-[#FFB347] transition-colors duration-300">
                    <Counter value={56788} />
                  </div>
                  <div className="text-lg font-light opacity-60">Active Online Contributors</div>
                </div>

                <div className="w-full h-[1px] bg-white/10"></div>

                {/* Stat 2 */}
                <div className="group">
                  <div className="flex items-center gap-3 mb-2 text-[#FFB347]">
                     <Globe size={24} />
                     <span className="text-sm font-mono tracking-widest uppercase opacity-80">Coverage</span>
                  </div>
                  <div className="text-5xl md:text-6xl font-bold mb-2 group-hover:text-[#FFB347] transition-colors duration-300">
                    <Counter value={30} /> +
                  </div>
                  <div className="text-lg font-light opacity-60">Countries Represented</div>
                </div>

                <div className="w-full h-[1px] bg-white/10"></div>

                {/* Stat 3 */}
                <div className="group">
                  <div className="flex items-center gap-3 mb-2 text-[#FFB347]">
                     <Building2 size={24} />
                     <span className="text-sm font-mono tracking-widest uppercase opacity-80">Network</span>
                  </div>
                  <div className="text-5xl md:text-6xl font-bold mb-2 group-hover:text-[#FFB347] transition-colors duration-300">
                    <Counter value={40} /> +
                  </div>
                  <div className="text-lg font-light opacity-60">Global Centers</div>
                </div>

             </div>
          </motion.div>

        </div>
        
        {/* Footer note for map */}
        <div className="mt-4 flex justify-between items-center text-xs text-[#133020]/40 px-4">
           <span>Global Operations Map</span>
           <span>Leaflet | © OpenStreetMap contributors</span>
        </div>

      </section>

      {/* CTA Section */}
      <section className="px-6 max-w-5xl mx-auto text-center">
         <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="bg-[#FFB347] rounded-[3rem] p-12 md:p-20 text-[#133020] relative overflow-hidden shadow-xl"
         >
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
            </div>
            
            <div className="relative z-10">
               <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-8">
                  Expand your reach with our <br/>
                  <span className="font-serif italic text-white">global network.</span>
               </h2>
               
               <a 
                 href="#contact"
                 className="inline-flex items-center gap-3 px-8 py-4 bg-[#133020] text-white rounded-full font-bold text-lg hover:bg-[#046241] transition-all hover:scale-105 shadow-lg"
               >
                  Partner with Us <ArrowUpRight size={20} />
               </a>
            </div>
         </motion.div>
      </section>

    </div>
  );
};
