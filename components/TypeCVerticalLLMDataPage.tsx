import React, { useState, useRef } from 'react';
import { ArrowUpRight, Car, Settings, TrendingUp, MapPin } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const tabs = [
  {
    id: '01',
    label: 'TARGET',
    title: 'Target',
    description: 'Annotate vehicles, pedestrians, and road objects with 2D & 3D techniques to enable accurate object detection for autonomous driving. Self-driving cars rely on precise visual training.',
    image: 'https://images.unsplash.com/photo-1555529902-526e14a139e9?q=80&w=2832&auto=format&fit=crop',
    icon: Car
  },
  {
    id: '02',
    label: 'SOLUTIONS',
    title: 'Solutions',
    description: 'Dedicated Process Engineering team for analysis and optimization. AI-enhanced workflow with multi-level quality checks. Scalable global delivery through crowdsourced workforce management.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop',
    icon: Settings
  },
  {
    id: '03',
    label: 'RESULTS',
    title: 'Results',
    description: 'Achieved 25% production in Month 1 with 95% accuracy and 50% production in Month 2 with 99% accuracy. Maintained an overall accuracy of 99% with on-time delivery.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop',
    icon: TrendingUp
  }
];

export const TypeCVerticalLLMDataPage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const activeTab = tabs[activeIndex];

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
           <span className="text-[#046241] font-mono text-sm tracking-widest uppercase font-semibold">Type C — Vertical LLM Data</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
           <motion.div
             initial={{ opacity: 0, x: -30 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
           >
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9] text-[#133020]">
                Vertical <br/>
                <span className="text-[#046241]">Driving Data.</span>
              </h1>
              <p className="text-xl text-[#133020]/80 leading-relaxed font-light mb-10 max-w-lg">
                 AI data solutions across specific industry verticals including autonomous driving data annotation, in-vehicle data collection and specialized data services.
              </p>
              <a href="#contact" className="group relative px-8 py-4 bg-[#133020] text-white rounded-full font-bold text-lg overflow-hidden flex items-center gap-2 w-fit shadow-lg hover:shadow-xl transition-all">
                 <span className="relative z-10 group-hover:text-[#f5eedb] transition-colors duration-300">Start Project</span>
                 <ArrowUpRight className="relative z-10 group-hover:text-[#f5eedb] transition-colors duration-300" size={20} />
                 <div className="absolute inset-0 bg-[#046241] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </a>
           </motion.div>

           <motion.div
             style={{ y }}
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.8, delay: 0.4 }}
             className="relative h-[500px] w-full rounded-[3rem] overflow-hidden shadow-2xl border border-[#133020]/5"
           >
              <img 
                src="https://images.unsplash.com/photo-1614730341194-75c607400070?q=80&w=2874&auto=format&fit=crop" 
                alt="Abstract Tech" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#133020]/20 mix-blend-multiply"></div>
              
              <div className="absolute top-8 left-8 bg-[#ffffff]/10 backdrop-blur-md p-4 rounded-2xl border border-[#ffffff]/20">
                 <div className="flex items-center gap-2 text-white">
                    <div className="w-3 h-3 bg-[#FFB347] rounded-full animate-pulse"></div>
                    <span className="font-mono text-sm">Live Tracking</span>
                 </div>
              </div>

              <div className="absolute bottom-8 right-8 bg-[#f5eedb]/90 backdrop-blur-md p-6 rounded-2xl max-w-xs border border-[#133020]/10">
                 <div className="flex items-center gap-3 mb-2">
                    <MapPin className="text-[#046241]" size={20} />
                    <span className="font-bold text-[#133020]">Global Expansion</span>
                 </div>
                 <p className="text-sm text-[#133020]/70">Successfully expanded operations to Malaysia and Indonesia with hundreds of annotators.</p>
              </div>
           </motion.div>
        </div>
      </section>

      {/* Vertical Content Switcher Section */}
      <section className="px-6 max-w-[1400px] mx-auto mb-32">
        <div className="mb-12">
           <h2 className="text-3xl md:text-4xl font-bold text-[#133020] uppercase tracking-wider">TYPE C- VERTICAL LLM DATA</h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 min-h-[600px]">
           {/* Left Sidebar: Vertical Navigation */}
           <div className="lg:w-1/3 flex flex-col gap-4">
              {tabs.map((tab, index) => (
                 <div 
                    key={tab.id}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`
                       group cursor-pointer p-8 rounded-[2rem] transition-all duration-300 relative overflow-hidden border
                       ${activeIndex === index 
                          ? 'bg-[#133020] text-white border-[#133020] shadow-xl scale-105 z-10' 
                          : 'bg-white text-[#133020] border-[#133020]/5 hover:bg-[#F9F7F7] hover:border-[#133020]/10'
                       }
                    `}
                 >
                    <div className="flex items-center justify-between relative z-10">
                       <div className="flex flex-col">
                          <span className={`text-xs font-bold tracking-widest mb-2 ${activeIndex === index ? 'text-[#FFB347]' : 'text-[#133020]/40'}`}>
                             {tab.id}
                          </span>
                          <h3 className="text-2xl font-bold">{tab.label}</h3>
                       </div>
                       
                       {/* Arrow Icon */}
                       <div className={`
                          w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
                          ${activeIndex === index ? 'bg-[#FFB347] text-[#133020]' : 'bg-[#133020]/5 text-[#133020]/40 group-hover:bg-[#133020]/10'}
                       `}>
                          <ArrowUpRight size={24} className={`transition-transform duration-300 ${activeIndex === index ? 'rotate-0' : 'rotate-45 opacity-50'}`} />
                       </div>
                    </div>
                 </div>
              ))}
           </div>

           {/* Right Content Pane */}
           <div className="lg:w-2/3 relative rounded-[3rem] overflow-hidden bg-[#F9F7F7] shadow-inner border border-[#133020]/5 min-h-[500px] lg:min-h-auto">
              <AnimatePresence mode="wait">
                 <motion.div
                    key={activeTab.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 flex flex-col"
                 >
                    {/* Image Section */}
                    <div className="relative h-2/3 w-full overflow-hidden">
                       <img 
                          src={activeTab.image} 
                          alt={activeTab.title} 
                          className="w-full h-full object-cover"
                       />
                       <div className="absolute inset-0 bg-[#133020]/10 mix-blend-multiply"></div>
                       <div className="absolute inset-0 bg-gradient-to-t from-[#F9F7F7] to-transparent opacity-80"></div>
                    </div>

                    {/* Text Content Section */}
                    <div className="relative z-10 flex-1 p-8 md:p-12 flex flex-col justify-center">
                       <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2, duration: 0.4 }}
                       >
                          <div className="flex items-center gap-4 mb-6">
                             <div className="w-12 h-12 bg-[#046241] rounded-2xl flex items-center justify-center text-[#FFB347] shadow-lg">
                                <activeTab.icon size={24} />
                             </div>
                             <h3 className="text-4xl font-bold text-[#133020]">{activeTab.title}</h3>
                          </div>
                          <p className="text-xl text-[#133020]/70 leading-relaxed max-w-2xl">
                             {activeTab.description}
                          </p>
                       </motion.div>
                    </div>
                 </motion.div>
              </AnimatePresence>
           </div>
        </div>
      </section>

    </div>
  );
};
