import React from 'react';
import { motion } from 'framer-motion';
import { SpotlightCard } from './react-bits/SpotlightCard';

export const Services: React.FC = () => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-semibold text-lifewood-darkGreen mb-6 uppercase tracking-tighter"
        >
          AI DATA SERVICES
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-lifewood-darkGreen/80 max-w-3xl leading-relaxed font-light"
        >
          Lifewood offers AI and IT services that enhance decision-making, reduce costs, and improve productivity to optimize organizational performance.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Audio Card */}
        <SpotlightCard className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer" spotlightColor="rgba(255, 179, 71, 0.4)">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full h-full"
          >
            <div className="absolute inset-0 bg-black/40 z-10 transition-colors group-hover:bg-black/20"></div>
            <img 
              src="https://images.unsplash.com/photo-1589903308904-1010c2294adc?q=80&w=2940&auto=format&fit=crop" 
              alt="Audio"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <h3 className="absolute top-8 left-8 text-3xl font-semibold tracking-tight text-white z-20">Audio</h3>
          </motion.div>
        </SpotlightCard>

        {/* Text Card */}
        <SpotlightCard className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer" spotlightColor="rgba(255, 179, 71, 0.4)">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full h-full"
          >
            <div className="absolute inset-0 bg-black/40 z-10 transition-colors group-hover:bg-black/20"></div>
            <img 
              src="https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=2940&auto=format&fit=crop" 
              alt="Text"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <h3 className="absolute top-8 left-8 text-3xl font-semibold tracking-tight text-white z-20">Text</h3>
          </motion.div>
        </SpotlightCard>

        {/* Image Card */}
         <SpotlightCard className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer md:col-span-2 lg:col-span-1" spotlightColor="rgba(255, 179, 71, 0.4)">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full h-full"
          >
            <div className="absolute inset-0 bg-black/40 z-10 transition-colors group-hover:bg-black/20"></div>
            <img 
              src="https://images.nightcafe.studio/jobs/hiT2rFOKk6u509cb2NB8/hiT2rFOKk6u509cb2NB8--2--2lo0c.jpg" 
              alt="Image"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <h3 className="absolute top-8 left-8 text-3xl font-semibold tracking-tight text-white z-20">Image</h3>
          </motion.div>
        </SpotlightCard>
      </div>
    </section>
  );
};