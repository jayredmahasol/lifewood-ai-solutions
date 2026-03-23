import React from 'react';
import { motion } from 'framer-motion';
import { SpotlightCard } from './react-bits/SpotlightCard';

export const Services: React.FC = () => {
  return (
    <section className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#f5eedb] text-[#133020] text-sm font-semibold tracking-wider uppercase mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#046241]"></span>
            Our Expertise
          </div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#133020] mb-8 tracking-tight"
          >
            AI Data Services
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 max-w-3xl leading-relaxed"
          >
            Lifewood offers AI and IT services that enhance decision-making, reduce costs, and improve productivity to optimize organizational performance.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Audio Card */}
          <SpotlightCard className="group relative h-[450px] rounded-[2rem] overflow-hidden cursor-pointer shadow-lg" spotlightColor="rgba(4, 98, 65, 0.4)">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="w-full h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#133020]/90 via-[#133020]/20 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-80"></div>
              <img 
                src="https://images.unsplash.com/photo-1589903308904-1010c2294adc?q=80&w=2940&auto=format&fit=crop" 
                alt="Audio Data Services"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute bottom-10 left-10 z-20">
                <h3 className="text-4xl font-bold text-white mb-2">Audio</h3>
                <p className="text-white/80 font-medium opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">Speech recognition & synthesis</p>
              </div>
            </motion.div>
          </SpotlightCard>

          {/* Text Card */}
          <SpotlightCard className="group relative h-[450px] rounded-[2rem] overflow-hidden cursor-pointer shadow-lg" spotlightColor="rgba(4, 98, 65, 0.4)">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#133020]/90 via-[#133020]/20 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-80"></div>
              <img 
                src="https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=2940&auto=format&fit=crop" 
                alt="Text Data Services"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute bottom-10 left-10 z-20">
                <h3 className="text-4xl font-bold text-white mb-2">Text</h3>
                <p className="text-white/80 font-medium opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">NLP & document processing</p>
              </div>
            </motion.div>
          </SpotlightCard>

          {/* Image Card */}
           <SpotlightCard className="group relative h-[450px] rounded-[2rem] overflow-hidden cursor-pointer md:col-span-2 lg:col-span-1 shadow-lg" spotlightColor="rgba(4, 98, 65, 0.4)">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-full h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#133020]/90 via-[#133020]/20 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-80"></div>
              <img 
                src="https://images.nightcafe.studio/jobs/hiT2rFOKk6u509cb2NB8/hiT2rFOKk6u509cb2NB8--2--2lo0c.jpg" 
                alt="Image Data Services"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute bottom-10 left-10 z-20">
                <h3 className="text-4xl font-bold text-white mb-2">Image</h3>
                <p className="text-white/80 font-medium opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">Computer vision & annotation</p>
              </div>
            </motion.div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
};