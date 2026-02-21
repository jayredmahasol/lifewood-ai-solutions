import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { BlurText } from './react-bits/BlurText';
import PrismaticBurst from './PrismaticBurst';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#f5eedb]">
      {/* Prismatic Burst Background */}
      <div className="absolute inset-0 z-0">
        <PrismaticBurst
          intensity={2}
          speed={0.3}
          animationType="rotate3d"
          colors={["#133020", "#046241", "#ffb347"]}
          distort={0}
          hoverDampness={0}
          rayCount={0}
        />
        {/* Overlay to blend with the theme */}
        <div className="absolute inset-0 bg-[#f5eedb]/60 mix-blend-overlay pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f5eedb]/10 to-[#f5eedb] pointer-events-none"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto text-center px-6 flex flex-col items-center">
        <div className="mb-12">
          <BlurText
            text="The world's leading provider"
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-[#f5eedb] leading-[1.1] justify-center mb-2"
            delay={0.1}
          />
          <BlurText
            text="of AI-powered data solutions."
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-[#f5eedb] leading-[1.1] justify-center"
            delay={0.6}
          />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-xl md:text-2xl text-[#ffffff]/70 max-w-3xl mx-auto mb-12 font-light leading-relaxed"
        >
          Empowering the next generation of artificial intelligence with precision-engineered data at global scale.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="flex justify-center"
        >
          <a href="#contact" className="group relative inline-flex items-center gap-4 px-10 py-5 bg-[#133020] rounded-full text-white text-lg font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
            <span>Start Your Project</span>
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FFB347] text-[#133020] group-hover:rotate-45 transition-transform duration-300">
              <ArrowRight size={18} />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
