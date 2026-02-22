import React, { useRef } from 'react';
import { ArrowUpRight, Database, Scan, FileText, CheckCircle } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HorizontalTabSwap } from './HorizontalTabSwap';

const tabs = [
  {
    id: '01',
    label: 'OBJECTIVE',
    title: 'Objective',
    description: 'Scan document for preservation, extract data and structure into database.',
    image: 'https://images.unsplash.com/photo-1633526543814-9718c8922b7a?q=80&w=2940&auto=format&fit=crop',
    icon: Database
  },
  {
    id: '02',
    label: 'KEY FEATURES',
    title: 'Key Features',
    description: 'Features include Auto Crop, Auto De-skew, Blur Detection, Foreign Object Detection, and AI Data Extraction.',
    image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=2864&auto=format&fit=crop',
    icon: Scan
  },
  {
    id: '03',
    label: 'RESULTS',
    title: 'Results',
    description: 'Accurate and precise data is ensured through validation and quality assurance. The system is efficient and scalable, enabling fast and adaptable data extraction. It supports multiple languages and formats.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop',
    icon: CheckCircle
  }
];

export const TypeAServicingPage: React.FC = () => {
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
           <span className="text-[#046241] font-mono text-sm tracking-widest uppercase font-semibold">Type A — Data Servicing</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
           <motion.div
             initial={{ opacity: 0, x: -30 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
           >
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9] text-[#133020]">
                Data <br/>
                <span className="text-[#046241]">Servicing.</span>
              </h1>
              <p className="text-xl text-[#133020]/80 leading-relaxed font-light mb-10 max-w-lg">
                 End-to-end data services specializing in multi-language datasets, including document capture, data collection, extraction, cleaning, and quality assurance.
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
                src="https://www.thoughtco.com/thmb/NSRe2tfljK1rIO2apVL6JwFVoew=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-108757759-5aef2840119fa80037901b41.jpg" 
                alt="Abstract Data" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#133020]/20 mix-blend-multiply"></div>
              
              <div className="absolute bottom-8 left-8 bg-[#f5eedb]/90 backdrop-blur-md p-6 rounded-2xl max-w-xs border border-[#133020]/10">
                 <div className="flex items-center gap-3 mb-2">
                    <FileText className="text-[#046241]" size={20} />
                    <span className="font-bold text-[#133020]">Multi-language</span>
                 </div>
                 <p className="text-sm text-[#133020]/70">Genealogy documents, newspapers, and archives facilitating global ancestry research.</p>
              </div>
           </motion.div>
        </div>
      </section>

      {/* Horizontal Tab Switcher Section */}
      <section className="px-6 max-w-[1400px] mx-auto mb-32">
        <div className="mb-12 text-center">
           <h2 className="text-3xl md:text-4xl font-bold text-[#133020] uppercase tracking-wider">TYPE A- DATA SERVICING</h2>
        </div>

        <HorizontalTabSwap tabs={tabs} />
      </section>

    </div>
  );
};
