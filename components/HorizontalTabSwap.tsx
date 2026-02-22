import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface Tab {
  id: string;
  label: string;
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
}

interface HorizontalTabSwapProps {
  tabs: Tab[];
}

export const HorizontalTabSwap: React.FC<HorizontalTabSwapProps> = ({ tabs }) => {
  const [activeTabId, setActiveTabId] = useState(tabs[0].id);

  const activeTab = tabs.find((tab) => tab.id === activeTabId) || tabs[0];

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Horizontal Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTabId(tab.id)}
            className={`
              relative px-8 py-4 rounded-full text-sm font-bold tracking-widest uppercase transition-all duration-300
              ${activeTabId === tab.id 
                ? 'text-white shadow-lg scale-105' 
                : 'bg-white text-[#133020] hover:bg-[#133020]/5 border border-[#133020]/10'
              }
            `}
          >
            {activeTabId === tab.id && (
              <motion.div
                layoutId="activeTabBg"
                className="absolute inset-0 bg-[#133020] rounded-full"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <span className={activeTabId === tab.id ? 'text-[#FFB347]' : 'text-[#133020]/40'}>{tab.id}</span>
              {tab.label}
            </span>
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="relative rounded-[3rem] overflow-hidden bg-[#F9F7F7] shadow-2xl border border-[#133020]/5">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col lg:flex-row min-h-[500px]"
          >
            {/* Image Section */}
            <div className="lg:w-1/2 relative min-h-[300px] lg:min-h-full overflow-hidden group">
              <motion.img 
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.7 }}
                src={activeTab.image} 
                alt={activeTab.title} 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#133020]/20 mix-blend-multiply"></div>
              
              {/* Floating Badge */}
              <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md px-5 py-2 rounded-full border border-white/20 shadow-lg z-10">
                  <span className="text-xs font-bold tracking-widest text-[#046241] uppercase">{activeTab.id} — {activeTab.label}</span>
              </div>
            </div>

            {/* Text Content Section */}
            <div className="lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-[#F9F7F7]">
              <div className="flex items-start justify-between mb-8">
                  <div className="flex-1">
                      <motion.h3 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#133020] mb-6 tracking-tight"
                      >
                        {activeTab.title}
                      </motion.h3>
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: 80 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="h-1.5 bg-[#FFB347] rounded-full"
                      />
                  </div>
                  <motion.div 
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                    className="w-16 h-16 bg-[#046241] rounded-2xl flex items-center justify-center text-[#FFB347] shadow-xl border-[4px] border-[#F9F7F7] ml-4 flex-shrink-0"
                  >
                      <activeTab.icon size={32} />
                  </motion.div>
              </div>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl text-[#133020]/80 leading-relaxed font-medium mb-10"
              >
                 {activeTab.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <button className="px-8 py-3 rounded-full bg-[#133020] text-white font-bold hover:bg-[#046241] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Learn More
                </button>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
