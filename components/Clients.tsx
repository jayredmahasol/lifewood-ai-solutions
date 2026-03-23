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
    <section className="py-32 bg-white overflow-hidden border-t border-[#133020]/5">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#f5eedb] text-[#133020] text-sm font-semibold tracking-wider uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-[#046241]"></span>
            Trusted By
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#133020] mb-6">Global Leaders</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed">
            We are proud to partner and work with leading organizations worldwide in transforming data into meaningful solutions.
          </p>
        </motion.div>

        {/* Marquee Container */}
        <div className="relative w-full overflow-hidden mask-gradient-x">
           <motion.div 
             className="flex items-center gap-16 md:gap-24 w-max"
             animate={{ x: ["0%", "-50%"] }}
             transition={{ 
               repeat: Infinity, 
               ease: "linear", 
               duration: 30 
             }}
           >
             {/* Duplicate logos to create seamless loop */}
             {[...clientLogos, ...clientLogos].map((logo, index) => (
               <div key={index} className="flex-shrink-0 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 hover:scale-110">
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