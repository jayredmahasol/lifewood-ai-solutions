import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen pt-32 pb-20 px-6 flex flex-col justify-center items-center overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* 1. The Video Layer */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover grayscale brightness-50 contrast-125"
        >
          <source src="https://www.pexels.com/download/video/10922866/" type="video/mp4" />
        </video>

        {/* 2. Advanced Overlay: Radial Gradient + Grain */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] mix-blend-multiply"></div>

        {/* 3. The Subtle Grid (Keeping your wireframe vibe but cleaner) */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

        {/* 4. Light Leak / Glow (Simulating the AI pulse) */}
        <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-lifewood-orange/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center mt-10">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-2xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-lifewood-white leading-tight mb-8"
        >
          The world's leading provider <br />
          <span className="inline-block">of AI-powered data solutions.</span>
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex justify-center"
        >
          <a href="#contact" className="group relative inline-flex items-center gap-3 px-8 py-4 bg-lifewood-white rounded-full text-lifewood-darkGreen text-lg font-bold shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
            <span>Contact Us</span>
            <span className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 group-hover:bg-lifewood-darkGreen group-hover:text-white transition-colors duration-300">
              <ArrowRight size={16} />
            </span>
          </a>
        </motion.div>
      </div>

      {/* Decorative gradient blur at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-lifewood-beige to-transparent"></div>
    </section>
  );
};