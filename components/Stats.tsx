import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Globe, MapPin, Languages, Users } from 'lucide-react';
import { motion, useInView, animate } from 'framer-motion';

const statsData = [
  {
    id: 1,
    value: 40,
    suffix: "+",
    label: "Global Delivery Centers",
    content: "Lifewood operates 40+ secure delivery centers worldwide, providing the backbone for AI data operations. These hubs ensure sensitive data is processed in controlled environments, with industrialized workflows and strict compliance standards across all regions.",
    bgColor: "bg-white/30",
    textColor: "text-[#133020]",
    icon: MapPin
  },
  {
    id: 2,
    value: 30,
    suffix: "+",
    label: "Countries Across All Continents",
    content: "Our presence spans across 30+ countries, ensuring we have the cultural nuance and local expertise required for global AI deployment.",
    bgColor: "bg-[#FFB347]/30",
    textColor: "text-[#133020]",
    icon: Globe
  },
  {
    id: 3,
    value: 50,
    suffix: "+",
    label: "Language Capabilities and Dialects",
    content: "We support over 50 languages and numerous dialects, enabling truly global and inclusive AI models.",
    bgColor: "bg-[#046241]/40",
    textColor: "text-white",
    icon: Languages
  },
  {
    id: 4,
    value: 56000,
    suffix: "+",
    label: "Global Online Resources",
    content: "A massive network of over 56,000 skilled resources ready to scale your data operations at speed.",
    bgColor: "bg-black/40",
    textColor: "text-white",
    icon: Users
  }
];

const CountUp: React.FC<{ to: number; duration?: number; className?: string }> = ({ to, duration = 2, className }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-20px" });
  
  useEffect(() => {
    if (!inView) return;
    
    const node = nodeRef.current;
    if (!node) return;

    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate(value) {
        node.textContent = Math.floor(value).toLocaleString();
      },
    });

    return () => controls.stop();
  }, [to, duration, inView]);

  return <span ref={nodeRef} className={className}>0</span>;
};

export const Stats: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <section className="relative py-32 px-6 bg-gradient-to-br from-[#f5eedb] via-[#f9f7f1] to-[#e8dcc4] overflow-hidden">
      {/* Grainy Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04] mix-blend-multiply pointer-events-none" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-white/40 text-[#133020] text-sm font-semibold tracking-wider uppercase mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#046241]"></span>
            Our Impact
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#133020]">Global Scale & Reach</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => {
            const isOpen = openId === stat.id;
            const Icon = stat.icon;
            
            return (
              <motion.div 
                key={stat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ type: "spring", stiffness: 300, damping: 30, delay: index * 0.15 }}
                className={`
                  relative overflow-hidden rounded-3xl cursor-pointer p-8 flex flex-col justify-between
                  ${stat.bgColor} ${stat.textColor} backdrop-blur-md border border-white/20
                  transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]
                  group
                `}
                onMouseEnter={() => setOpenId(stat.id)}
                onMouseLeave={() => setOpenId(null)}
                style={{ minHeight: '320px' }}
              >
                {/* Watermark Icon */}
                <div className="absolute -bottom-12 -right-12 opacity-5 pointer-events-none transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12">
                  <Icon size={220} />
                </div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl lg:text-6xl font-black tracking-tighter">
                        <CountUp to={stat.value} duration={2.5} />
                      </span>
                      <span className="text-3xl lg:text-4xl font-bold">{stat.suffix}</span>
                    </div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-white/20' : 'bg-transparent'}`}>
                      <ArrowUpRight size={24} className={`transition-all duration-500 ${isOpen ? 'translate-x-1 -translate-y-1 opacity-100' : 'opacity-70'}`} />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold leading-tight mb-4">{stat.label}</h3>
                </div>

                <div className={`relative z-10 overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-sm leading-relaxed opacity-90">{stat.content}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};