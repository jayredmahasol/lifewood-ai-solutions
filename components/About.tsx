import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const About: React.FC = () => {
  return (
    <section className="py-32 px-6 relative bg-white">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-5xl mx-auto text-center"
      >
        
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#f5eedb] text-[#133020] text-sm font-semibold tracking-wider uppercase mb-12">
          <span className="w-2 h-2 rounded-full bg-[#046241]"></span>
          About Us
        </div>
        
        <p className="text-3xl md:text-5xl font-medium leading-tight text-[#133020] mb-16">
          At <span className="text-[#046241]">Lifewood</span> we empower our company and our clients to realize the transformative power of AI: bringing big data to life: launching new ways of thinking, learning and doing; for the good of humankind.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <a href="#about" className="group flex items-center gap-3 px-8 py-4 bg-[#133020] text-white rounded-full font-medium hover:bg-[#046241] transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1">
            <span>Know Us Better</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </motion.div>
    </section>
  );
};
