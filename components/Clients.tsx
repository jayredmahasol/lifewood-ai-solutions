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
    <section className="py-28 bg-gradient-to-b from-white via-[#f9f7f1] to-white border-t border-[#133020]/5">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white border border-[#133020]/10 text-[#133020] text-xs font-semibold tracking-wider uppercase mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#046241]"></span>
            Trusted By
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#133020] mb-4">Global Leaders</h2>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-[#133020]/60 leading-relaxed">
            We partner with organizations worldwide to transform data into meaningful solutions.
          </p>
        </motion.div>

        {/* Marquee Container */}
        <div className="relative w-full overflow-hidden mask-gradient-x">
          <motion.div 
            className="flex items-center gap-6 md:gap-8 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
              repeat: Infinity, 
              ease: "linear", 
              duration: 28 
            }}
          >
            {/* Duplicate logos to create seamless loop */}
            {[...clientLogos, ...clientLogos].map((logo, index) => (
              <div
                key={index}
                className="bg-white border border-[#133020]/10 rounded-2xl px-6 py-4 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
              >
                <img 
                  src={logo} 
                  alt={`Client Partner ${index + 1}`} 
                  className="h-10 md:h-24 w-auto object-contain opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
