import React, { useRef } from 'react';
import { ArrowUpRight, Mic, Globe, BarChart3, Users } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HorizontalTabSwap } from './HorizontalTabSwap';

const tabs = [
  {
    id: '01',
    label: 'TARGET',
    title: 'Target',
    description: 'Capture and transcribe recordings from native speakers from 23 different countries. Voice content involves 6 project types and 9 data domains. A total of 25,400 valid hours durations.',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2874&auto=format&fit=crop',
    icon: Globe
  },
  {
    id: '02',
    label: 'SOLUTIONS',
    title: 'Solutions',
    description: '30,000+ native speaking human resources from more than 30 countries were mobilized. Use our flexible industrial processes and continuously optimize them. Use PBI to track the progress in real time.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2940&auto=format&fit=crop',
    icon: Users
  },
  {
    id: '03',
    label: 'RESULTS',
    title: 'Results',
    description: '5 months to complete the voice collection and annotation of 25,400 valid hours on time and with quality. Achieved high accuracy and client satisfaction.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop',
    icon: BarChart3
  }
];

export const TypeBLLMDataPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

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
           <span className="text-[#046241] font-mono text-sm tracking-widest uppercase font-semibold">Type B — Horizontal LLM Data</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
           <motion.div
             initial={{ opacity: 0, x: -30 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
           >
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9] text-[#133020]">
                Audio <br/>
                <span className="text-[#046241]">Intelligence.</span>
              </h1>
              <p className="text-xl text-[#133020]/80 leading-relaxed font-light mb-10 max-w-lg">
                 Comprehensive AI data solutions covering data collection, annotation, and model testing. Creating multimodal datasets for deep learning and large language models.
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
                src="https://img.freepik.com/premium-photo/sound-wave-audio-technology-ai-generated_941600-14385.jpg" 
                alt="Audio Waves" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#133020]/30 mix-blend-multiply"></div>
              
              <div className="absolute top-8 right-8 bg-[#FFB347] text-[#133020] p-4 rounded-full shadow-lg animate-pulse">
                 <Mic size={32} />
              </div>

              <div className="absolute bottom-8 left-8 bg-[#f5eedb]/90 backdrop-blur-md p-6 rounded-2xl max-w-xs border border-[#133020]/10">
                 <div className="flex items-center gap-3 mb-2">
                    <Globe className="text-[#046241]" size={20} />
                    <span className="font-bold text-[#133020]">Global Scale</span>
                 </div>
                 <p className="text-sm text-[#133020]/70">Voice, image and text for Apple Intelligence. Provided over 50 language sets.</p>
              </div>
           </motion.div>
        </div>
      </section>

      {/* Horizontal Tab Switcher Section */}
      <section className="px-6 max-w-[1400px] mx-auto mb-32">
        <div className="mb-12 text-center">
           <h2 className="text-3xl md:text-4xl font-bold text-[#133020] uppercase tracking-wider">TYPE B- HORIZONTAL LLM DATA</h2>
        </div>

        <HorizontalTabSwap tabs={tabs} />
      </section>

    </div>
  );
};
