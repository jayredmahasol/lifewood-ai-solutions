import React from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export const Innovation: React.FC = () => {
  return (
    <section className="py-32 px-6 bg-[#f5eedb]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white text-[#133020] text-sm font-semibold tracking-wider uppercase mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#046241]"></span>
            Innovation
          </div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#133020] mb-6"
          >
            Constant Innovation: <br className="hidden md:block" />
            <span className="text-[#046241]">Unlimited Possibilities</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            No matter the industry, size or the type of data involved, our solutions are capable of satisfying any AI-data processing requirement.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="group relative h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden cursor-pointer shadow-xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop" 
              alt="Global Team" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#133020]/90 via-[#133020]/20 to-transparent"></div>
            
            <div className="absolute bottom-10 left-10 text-white">
              <h3 className="text-4xl md:text-5xl font-bold mb-3 flex items-start gap-2">
                Global <span className="text-[#046241] mt-2"><Plus size={28} strokeWidth={4} /></span>
              </h3>
              <p className="text-lg font-medium text-white/80">AI Data Projects at Scale</p>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="group relative h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden cursor-pointer shadow-xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2940&auto=format&fit=crop" 
              alt="Meeting" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-[#133020]/90 via-[#133020]/20 to-transparent"></div>
             <div className="absolute bottom-10 left-10 text-white">
              <h3 className="text-4xl md:text-5xl font-bold mb-3 flex items-start gap-2">
                Innovation <span className="text-[#046241] mt-2"><Plus size={28} strokeWidth={4} /></span>
              </h3>
              <p className="text-lg font-medium text-white/80">Driving the Future of AI</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};