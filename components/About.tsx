import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const About: React.FC = () => {
  return (
    <section className="py-24 px-6 relative bg-lifewood-white/50 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-gray-400 mb-8">
          <span className="text-black text-xl align-middle mr-2">•</span> 
          About Us
        </h2>
        
        <p className="text-2xl md:text-4xl font-light leading-relaxed text-lifewood-darkGreen mb-12">
          At <strong className="font-bold">Lifewood</strong> we empower our company and our clients to realize the transformative power of AI: bringing big data to life: launching new ways of thinking, learning and doing; for the good of humankind.
        </p>

        <div className="flex justify-center gap-4">
          <a href="#about" className="flex items-center gap-2 px-8 py-3 bg-lifewood-darkGreen text-white rounded-full font-medium hover:bg-lifewood-primaryGreen transition-colors shadow-lg shadow-green-900/20">
            Know Us Better
          </a>
          <a href="#about" className="w-12 h-12 rounded-full border border-lifewood-darkGreen text-lifewood-darkGreen flex items-center justify-center hover:bg-lifewood-darkGreen hover:text-white transition-colors">
            <ArrowRight size={20} />
          </a>
        </div>
      </motion.div>
    </section>
  );
};
