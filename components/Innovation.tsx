import React from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export const Innovation: React.FC = () => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-6xl font-light tracking-tight text-lifewood-darkGreen mb-12 text-center"
      >
        Constant Innovation: <span className="font-semibold">Unlimited Possibilities</span>
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Card 1 */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="group relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden cursor-pointer"
        >
          <img 
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop" 
            alt="Global Team" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          
          <div className="absolute bottom-8 left-8 text-white">
            <h3 className="text-5xl font-semibold mb-2 flex items-start gap-1 tracking-tight">
              Global <span className="text-lifewood-orange text-2xl mt-1"><Plus size={24} strokeWidth={4} /></span>
            </h3>
            <p className="text-xl font-medium opacity-90">AI Data Projects at Scale</p>
          </div>
        </motion.div>

        {/* Card 2 */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="group relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden cursor-pointer"
        >
          <img 
            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2940&auto=format&fit=crop" 
            alt="Meeting" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
           <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
        </motion.div>
      </div>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-center mt-12 text-xl md:text-2xl text-lifewood-darkGreen/80 max-w-4xl mx-auto font-light leading-relaxed"
      >
        No matter the industry, size or the type of data involved, our solutions are capable of satisfying any AI-data processing requirement.
      </motion.p>
    </section>
  );
};