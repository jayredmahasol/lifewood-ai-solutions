import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export const InternalNewsPage: React.FC = () => {
  return (
    <div className="pt-32 pb-20 bg-white min-h-screen font-sans">
      
      {/* Header Section */}
      <section className="px-6 max-w-7xl mx-auto mb-20">
        <div className="flex items-center gap-2 mb-4 opacity-60">
           <div className="flex gap-2">
              <div className="w-4 h-4 rounded-full bg-black"></div>
              <div className="w-4 h-4 rounded-full border border-black"></div>
           </div>
           <div className="h-[1px] w-24 bg-black/30"></div>
        </div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-medium tracking-tight text-black mb-8"
        >
          Rootstech 2026
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-4xl text-xl text-gray-600 leading-relaxed mb-10 font-light"
        >
          Coming Soon!
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-4"
        >
          <a href="#contact" className="px-8 py-3 bg-lifewood-orange text-black font-medium rounded-full hover:bg-lifewood-lightOrange transition-colors flex items-center gap-2">
            Contact Us
          </a>
          <a href="#contact" className="w-12 h-12 bg-lifewood-darkGreen rounded-full flex items-center justify-center text-white hover:scale-105 transition-transform">
            <ArrowUpRight size={20} />
          </a>
        </motion.div>
      </section>

      {/* Video Section */}
      <section className="px-6 max-w-5xl mx-auto mb-32">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-100 rounded-[3rem] p-4 md:p-8 shadow-2xl"
        >
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg bg-black">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/ccyrQ87EJag?si=Lifewood" 
              title="Rootstech 2026 Preview" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
              className="absolute inset-0 w-full h-full object-cover"
            ></iframe>
          </div>
        </motion.div>
      </section>

    </div>
  );
};
