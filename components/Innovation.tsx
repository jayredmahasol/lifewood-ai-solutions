import React from 'react';
import { Sparkles, Globe2, Layers3, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export const Innovation: React.FC = () => {
  return (
    <section className="py-28 px-6 bg-gradient-to-b from-[#f9f7f1] via-white to-[#f9f7f1]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
          <div>
            <div className="flex justify-center lg:justify-start mb-6">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white border border-[#133020]/10 text-[#133020] text-xs font-semibold tracking-wider uppercase shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#046241]"></span>
                Innovation
              </div>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#133020] mb-6"
            >
              Constant Innovation,
              <span className="block text-[#046241]">Unlimited Possibilities</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-base md:text-lg text-[#133020]/60 leading-relaxed max-w-2xl"
            >
              No matter the industry, size or the type of data involved, our solutions are built to satisfy any AI-data processing requirement with speed, security, and scale.
            </motion.p>
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                { icon: Sparkles, label: 'Adaptive Pipelines' },
                { icon: Globe2, label: 'Global Delivery' },
                { icon: ShieldCheck, label: 'Secure by Design' }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#133020]/10 text-sm text-[#133020] shadow-sm"
                >
                  <item.icon size={16} className="text-[#046241]" />
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            {[
              {
                title: 'Global AI Projects',
                description: 'Multi-market programs delivered with consistent quality and local nuance.',
                image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop',
                icon: Globe2
              },
              {
                title: 'Innovation at Scale',
                description: 'We combine human expertise with automation to move faster and smarter.',
                image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop',
                icon: Layers3
              }
            ].map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white border border-[#133020]/10 rounded-3xl p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden">
                    <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <card.icon size={18} className="text-[#046241]" />
                      <h3 className="text-lg font-semibold text-[#133020]">{card.title}</h3>
                    </div>
                    <p className="text-sm text-[#133020]/60 leading-relaxed">{card.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
