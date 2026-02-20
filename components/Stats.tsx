import React, { useState } from 'react';
import { Plus, Minus, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { StatItem } from '../types';

const statsData: StatItem[] = [
  {
    id: 1,
    title: "40+ Global Delivery Centers",
    content: "Lifewood operates 40+ secure delivery centers worldwide, providing the backbone for AI data operations. These hubs ensure sensitive data is processed in controlled environments, with industrialized workflows and strict compliance standards across all regions.",
    bgColor: "bg-[#f3f0e6]", // Custom beige-ish matching screenshot
    textColor: "text-lifewood-darkGreen"
  },
  {
    id: 2,
    title: "30+ Countries Across All Continents",
    content: "Our presence spans across 30+ countries, ensuring we have the cultural nuance and local expertise required for global AI deployment.",
    bgColor: "bg-lifewood-orange",
    textColor: "text-lifewood-darkGreen"
  },
  {
    id: 3,
    title: "50+ Language Capabilities and Dialects",
    content: "We support over 50 languages and numerous dialects, enabling truly global and inclusive AI models.",
    bgColor: "bg-lifewood-primaryGreen",
    textColor: "text-white"
  },
  {
    id: 4,
    title: "56,000+ Global Online Resources",
    content: "A massive network of over 56,000 skilled resources ready to scale your data operations at speed.",
    bgColor: "bg-black",
    textColor: "text-white"
  }
];

export const Stats: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col gap-4">
        {statsData.map((stat, index) => {
          const isOpen = openId === stat.id;
          
          return (
            <motion.div 
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`
                relative overflow-hidden rounded-2xl transition-all duration-500 ease-in-out cursor-pointer
                ${stat.bgColor} ${stat.textColor}
                ${isOpen ? 'min-h-[280px] md:min-h-[250px]' : 'h-24 hover:opacity-95'}
              `}
              onMouseEnter={() => setOpenId(stat.id)}
              onMouseLeave={() => setOpenId(null)}
            >
              <div className="p-6 md:p-8 flex items-start justify-between">
                <h3 className={`text-2xl md:text-3xl font-semibold tracking-tight ${isOpen ? 'mb-6' : 'm-0'}`}>
                  {stat.title}
                </h3>
                
                <button className={`
                  flex items-center justify-center w-10 h-10 rounded-full transition-colors flex-shrink-0
                  ${stat.textColor === 'text-white' ? 'bg-white text-black' : 'bg-white text-black'}
                `}>
                  {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                </button>
              </div>
              
              <div className={`
                px-6 md:px-8 pb-8 transition-all duration-500
                ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 hidden'}
              `}>
                <p className="max-w-4xl text-lg md:text-xl font-medium leading-relaxed opacity-90">
                  {stat.content}
                </p>
                {isOpen && (
                  <div className="mt-6 flex items-center gap-4">
                    <button className="w-10 h-10 rounded-full border border-current flex items-center justify-center hover:bg-black/10 transition-colors">
                      <ArrowUpRight size={18} />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};