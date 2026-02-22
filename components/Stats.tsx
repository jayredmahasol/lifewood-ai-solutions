import React, { useState, useEffect, useRef } from 'react';
import { Plus, Minus, ArrowUpRight } from 'lucide-react';
import { motion, useInView, animate } from 'framer-motion';
import { StatItem } from '../types';

const statsData = [
  {
    id: 1,
    value: 40,
    suffix: "+",
    label: "Global Delivery Centers",
    content: "Lifewood operates 40+ secure delivery centers worldwide, providing the backbone for AI data operations. These hubs ensure sensitive data is processed in controlled environments, with industrialized workflows and strict compliance standards across all regions.",
    bgColor: "bg-[#f3f0e6]", // Custom beige-ish matching screenshot
    textColor: "text-lifewood-darkGreen"
  },
  {
    id: 2,
    value: 30,
    suffix: "+",
    label: "Countries Across All Continents",
    content: "Our presence spans across 30+ countries, ensuring we have the cultural nuance and local expertise required for global AI deployment.",
    bgColor: "bg-lifewood-orange",
    textColor: "text-lifewood-darkGreen"
  },
  {
    id: 3,
    value: 50,
    suffix: "+",
    label: "Language Capabilities and Dialects",
    content: "We support over 50 languages and numerous dialects, enabling truly global and inclusive AI models.",
    bgColor: "bg-lifewood-primaryGreen",
    textColor: "text-white"
  },
  {
    id: 4,
    value: 56000,
    suffix: "+",
    label: "Global Online Resources",
    content: "A massive network of over 56,000 skilled resources ready to scale your data operations at speed.",
    bgColor: "bg-black",
    textColor: "text-white"
  }
];

const CountUp: React.FC<{ to: number; duration?: number; className?: string }> = ({ to, duration = 2, className }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-20px" });
  
  useEffect(() => {
    if (!inView) return;
    
    const node = nodeRef.current;
    if (!node) return;

    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate(value) {
        node.textContent = Math.floor(value).toLocaleString();
      },
    });

    return () => controls.stop();
  }, [to, duration, inView]);

  return <span ref={nodeRef} className={className}>0</span>;
};

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
              transition={{ type: "spring", stiffness: 300, damping: 30, delay: index * 0.1 }}
              className={`
                relative overflow-hidden rounded-2xl cursor-pointer
                ${stat.bgColor} ${stat.textColor}
                ${isOpen ? 'shadow-2xl' : 'hover:opacity-95'}
              `}
              onMouseEnter={() => setOpenId(stat.id)}
              onMouseLeave={() => setOpenId(null)}
              layout
              style={{
                height: isOpen ? 'auto' : '6rem', // 24 * 0.25rem = 6rem
              }}
            >
              <motion.div 
                layout="position"
                className="p-6 md:p-8 flex items-start justify-between"
              >
                <motion.h3 
                  layout="position"
                  className={`text-2xl md:text-3xl font-semibold tracking-tight flex items-center gap-2 ${isOpen ? 'mb-6' : 'm-0'}`}
                >
                  <span className="font-bold">
                    <CountUp to={stat.value} />{stat.suffix}
                  </span>
                  <span className="font-medium opacity-90">{stat.label}</span>
                </motion.h3>
                
                <motion.button 
                  layout="position"
                  className={`
                    flex items-center justify-center w-10 h-10 rounded-full transition-colors flex-shrink-0
                    ${stat.textColor.includes('white') ? 'bg-white text-black' : 'bg-black/10 text-black'}
                  `}
                >
                  {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                </motion.button>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.3, delay: isOpen ? 0.1 : 0 }}
                className={`px-6 md:px-8 pb-8 ${!isOpen && 'hidden'}`}
              >
                <p className="max-w-4xl text-lg md:text-xl font-medium leading-relaxed opacity-90">
                  {stat.content}
                </p>
                {isOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-6 flex items-center gap-4"
                  >
                    <button className="w-10 h-10 rounded-full border border-current flex items-center justify-center hover:bg-black/10 transition-colors">
                      <ArrowUpRight size={18} />
                    </button>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};