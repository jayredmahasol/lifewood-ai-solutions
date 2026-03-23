import React, { useRef } from 'react';
import { ArrowUpRight, Car, Settings, TrendingUp, MapPin } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Carousel, { CarouselItem } from './react-bits/Carousel';

const carouselItems: CarouselItem[] = [
  {
    id: 1,
    title: 'Target',
    description: 'Annotate vehicles, pedestrians, and road objects with 2D & 3D techniques to enable accurate object detection for autonomous driving. Self-driving cars rely on precise visual training.',
    icon: <Car size={32} className="text-[#0F764A]" />,
    color: 'bg-[#F0EBE1]',
    textColor: 'text-[#1A3626]',
    descColor: 'text-[#5A655E]'
  },
  {
    id: 2,
    title: 'Solutions',
    description: 'Dedicated Process Engineering team for analysis and optimization. AI-enhanced workflow with multi-level quality checks. Scalable global delivery through crowdsourced workforce management.',
    icon: <Settings size={32} className="text-[#0F764A]" />,
    color: 'bg-[#F0EBE1]',
    textColor: 'text-[#1A3626]',
    descColor: 'text-[#5A655E]'
  },
  {
    id: 3,
    title: 'Results',
    description: 'Achieved 25% production in Month 1 with 95% accuracy and 50% production in Month 2 with 99% accuracy. Maintained an overall accuracy of 99% with on-time delivery.',
    icon: <TrendingUp size={32} className="text-[#0F764A]" />,
    color: 'bg-[#F0EBE1]',
    textColor: 'text-[#1A3626]',
    descColor: 'text-[#5A655E]'
  }
];

export const TypeCVerticalLLMDataPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div ref={containerRef} className="bg-[#F4EFE6] min-h-screen font-sans text-[#1A3626] selection:bg-[#F3E0A6] selection:text-[#1A3626] overflow-hidden relative">
      
      {/* Grid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:100px_100px]"></div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center w-full"
        >
          {/* Pill Label */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#1A3626]/10 bg-[#1A3626]/5 mb-8">
            <div className="w-2 h-2 rounded-full bg-[#0F764A]"></div>
            <span className="text-[#1A3626] font-mono text-xs tracking-[0.1em] uppercase font-medium">Type C — Vertical LLM Data</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-bold tracking-tighter mb-8 leading-[0.95] text-[#1A3626]">
            Vertical <span className="text-[#0F764A]">Driving Data.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-[#5A655E] leading-relaxed font-light mb-12 max-w-3xl">
            AI data solutions across specific industry verticals including autonomous driving data annotation, in-vehicle data collection and specialized data services.
          </p>
          
          <a href="#contact" className="group relative px-8 py-4 bg-[#1A3626] text-white rounded-full font-semibold text-lg overflow-hidden flex items-center gap-3 w-fit shadow-md hover:shadow-xl transition-all mb-20">
             <span className="relative z-10 group-hover:text-[#EAE5D9] transition-colors duration-300">Start Project</span>
             <ArrowUpRight className="relative z-10 group-hover:text-[#EAE5D9] transition-colors duration-300" size={20} />
             <div className="absolute inset-0 bg-[#0F764A] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </a>
        </motion.div>

        {/* Graphic */}
        <motion.div
          style={{ y }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative h-[500px] md:h-[600px] w-full max-w-5xl rounded-[2.5rem] overflow-visible mt-10"
        >
          <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden shadow-2xl">
            <img 
              src="https://png.pngtree.com/background/20250108/original/pngtree-abstract-secure-technology-background-with-lock-and-circuit-image-picture-image_15492692.jpg" 
              alt="Abstract Tech" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#1A3626]/20 mix-blend-multiply"></div>
          </div>
          
          <div className="absolute top-8 left-8 bg-[#ffffff]/10 backdrop-blur-md p-4 rounded-2xl border border-[#ffffff]/20">
             <div className="flex items-center gap-2 text-white">
                <div className="w-3 h-3 bg-[#F3E0A6] rounded-full animate-pulse"></div>
                <span className="font-mono text-sm">Live Tracking</span>
             </div>
          </div>

          <div className="absolute -bottom-8 -right-8 md:right-8 bg-[#F4EFE6] p-8 rounded-3xl max-w-[320px] shadow-xl border border-white/20">
             <div className="flex items-center gap-3 mb-3">
                <MapPin className="text-[#0F764A]" size={24} />
                <span className="font-bold text-xl text-[#1A3626]">Global Expansion</span>
             </div>
             <p className="text-[15px] text-[#5A655E] leading-relaxed">Successfully expanded operations to Malaysia and Indonesia with hundreds of annotators.</p>
          </div>
        </motion.div>
      </section>

      {/* Carousel Section */}
      <section className="px-6 max-w-[1400px] mx-auto mb-32 pt-20 relative z-10">
        <div className="mb-16 text-center">
           <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-4xl md:text-5xl font-medium text-[#1A3626] tracking-tight mb-4"
           >
             What We Offer
           </motion.h2>
           <motion.p
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="text-lg text-[#5A655E] max-w-2xl mx-auto"
           >
             Swipe through to explore our targets, solutions, and the results we deliver.
           </motion.p>
        </div>

        <div className="flex justify-center w-full h-[500px] relative">
          <Carousel
            items={carouselItems}
            baseWidth={400}
            autoplay={false}
            pauseOnHover={true}
            loop={true}
            round={false}
          />
        </div>
      </section>

    </div>
  );
};
