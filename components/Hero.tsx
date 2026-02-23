import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { BlurText } from './react-bits/BlurText';
import Squares from './react-bits/Squares';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#f5eedb]">
      {/* Squares Background */}
      <div className="absolute inset-0 z-0">
        <Squares 
          speed={0.55} 
          squareSize={100} 
          direction="right" 
          borderColor="#000000" 
          hoverFillColor="#046241" 
        />
        {/* Overlay to blend with the theme */}
        <div className="absolute inset-0 bg-[#f5eedb]/30 mix-blend-overlay pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#f5eedb] pointer-events-none"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto text-center px-6 flex flex-col items-center">
        <div className="mb-12">
          <BlurText
            text="The world's leading provider"
            className="text-xl md:text-4xl lg:text-5xl font-bold tracking-tight text-black leading-tight mb-6"
            delay={0.1}
          />
          <BlurText
            text="of AI-powered data solutions."
            className="text-xl md:text-4xl lg:text-5xl font-bold tracking-tight text-black leading-tight mb-6"
            delay={0.6}
          />
        </div>

        

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, type: "spring", stiffness: 100, damping: 20 }}
          className="flex justify-center"
        >
          <motion.a 
            href="#contact" 
            className="group relative inline-flex items-center gap-3 px-8 py-3 bg-white rounded-full text-[#133020] text-sm font-bold shadow-lg"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <span>Contact Us</span>
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#133020] text-white group-hover:rotate-45 transition-transform duration-300">
              <ArrowRight size={16} />
            </span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
