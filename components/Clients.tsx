import React from 'react';
import { motion } from 'framer-motion';

const clientLogos = [
  "https://framerusercontent.com/images/m37jhLfPRl449iXOe8op7cY68c.png",
  "https://framerusercontent.com/images/RyIkooWlUn6nQYbljETePWzd2Ac.png",
  "https://framerusercontent.com/images/Yq2A1QFJLXgGQ3b7NZPthsD9RBk.png",
  "https://framerusercontent.com/images/2rRd2Mk1HzeDgPbL0e8wwkUPo.png",
  "https://framerusercontent.com/images/cjJDncfOy71yWizT3ZRdsZB4W0.png",
  "https://framerusercontent.com/images/HWbvpkExIBUbdXEGILLSX4PTcEE.png"
];

export const Clients: React.FC = () => {
  return (
    <section className="py-24 bg-lifewood-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-light text-lifewood-darkGreen mb-8 tracking-tight"
        >
          Our Clients And Partners
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto text-lg text-gray-600 mb-16 leading-relaxed font-normal"
        >
          We are proud to partner and work with leading organizations worldwide in transforming data into meaningful solutions. Lifewood's commitment to innovation and excellence has earned the trust of global brands across industries.
        </motion.p>

        {/* Marquee Container */}
        <div className="relative w-full overflow-hidden mask-gradient-x">
           <motion.div 
             className="flex items-center gap-16 md:gap-24 w-max"
             animate={{ x: ["0%", "-50%"] }}
             transition={{ 
               repeat: Infinity, 
               ease: "linear", 
               duration: 20 
             }}
           >
             {/* Duplicate logos to create seamless loop */}
             {[...clientLogos, ...clientLogos].map((logo, index) => (
               <div key={index} className="flex-shrink-0 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                 <img 
                   src={logo} 
                   alt={`Client Partner ${index + 1}`} 
                   className="h-12 md:h-16 w-auto object-contain"
                 />
               </div>
             ))}
           </motion.div>
        </div>
      </div>
    </section>
  );
};