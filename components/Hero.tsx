import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
// @ts-ignore
import GLOBE from 'vanta/dist/vanta.globe.min';

export const Hero: React.FC = () => {
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const myRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(GLOBE({
        el: myRef.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x046241,
        color2: 0x133020,
        size: 1.5,
        backgroundColor: 0xf5eedb
      }));
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.8
      }
    }
  };

  return (
    <section ref={myRef} className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#f5eedb]">
      {/* Overlay to blend with the theme */}
      <div className="absolute inset-0 bg-[#f5eedb]/30 mix-blend-overlay pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#f5eedb] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-start justify-center w-full h-full pt-32">
        <motion.div 
          className="mb-12 max-w-3xl text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#133020] leading-tight mb-2"
          >
            The world's leading provider
          </motion.h1>
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#133020] leading-tight mb-6"
          >
            of AI-powered data solutions.
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-[#133020]/80 max-w-2xl mb-8"
          >
            Empowering businesses with high-quality, scalable data services for the next generation of artificial intelligence.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 justify-start">
            <motion.a 
              href="#contact" 
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#133020] rounded-full text-white text-lg font-medium shadow-[0_8px_30px_rgb(19,48,32,0.3)] overflow-hidden"
              whileHover={{ scale: 1.02, boxShadow: "0 15px 35px rgb(19,48,32,0.4)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#046241] to-[#133020] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
              <span className="relative z-10">Contact Us</span>
              <span className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white text-[#133020] group-hover:rotate-45 transition-transform duration-500">
                <ArrowRight size={20} />
              </span>
            </motion.a>

            <motion.a 
              href="#careers" 
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-[#133020] rounded-full text-[#133020] text-lg font-medium overflow-hidden"
              whileHover={{ scale: 1.02, boxShadow: "0 15px 35px rgb(19,48,32,0.15)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <div className="absolute inset-0 bg-[#133020] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
              <span className="relative z-10 group-hover:text-white transition-colors duration-500">Join Us</span>
              <span className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-[#133020] text-white group-hover:bg-white group-hover:text-[#133020] group-hover:rotate-45 transition-all duration-500">
                <ArrowRight size={20} />
              </span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
