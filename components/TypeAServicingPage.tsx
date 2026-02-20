import React, { useState, useRef } from 'react';
import { ArrowUpRight, Database, Scan, FileText, CheckCircle } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const tabs = [
  {
    id: '01',
    label: 'OBJECTIVE',
    title: 'Objective',
    description: 'Scan document for preservation, extract data and structure into database.',
    image: 'https://images.unsplash.com/photo-1633526543814-9718c8922b7a?q=80&w=2940&auto=format&fit=crop',
    icon: Database
  },
  {
    id: '02',
    label: 'KEY FEATURES',
    title: 'Key Features',
    description: 'Features include Auto Crop, Auto De-skew, Blur Detection, Foreign Object Detection, and AI Data Extraction.',
    image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=2864&auto=format&fit=crop',
    icon: Scan
  },
  {
    id: '03',
    label: 'RESULTS',
    title: 'Results',
    description: 'Accurate and precise data is ensured through validation and quality assurance. The system is efficient and scalable, enabling fast and adaptable data extraction. It supports multiple languages and formats.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop',
    icon: CheckCircle
  }
];

export const TypeAServicingPage: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState('01');
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];

  return (
    <div ref={containerRef} className="bg-[#f5eedb] min-h-screen font-sans text-[#133020] selection:bg-[#FFB347] selection:text-[#133020] overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3 mb-8"
        >
           <div className="h-[1px] w-12 bg-[#046241]"></div>
           <span className="text-[#046241] font-mono text-sm tracking-widest uppercase font-semibold">Type A — Data Servicing</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
           <motion.div
             initial={{ opacity: 0, x: -30 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
           >
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9] text-[#133020]">
                Data <br/>
                <span className="text-[#046241]">Servicing.</span>
              </h1>
              <p className="text-xl text-[#133020]/80 leading-relaxed font-light mb-10 max-w-lg">
                 End-to-end data services specializing in multi-language datasets, including document capture, data collection, extraction, cleaning, and quality assurance.
              </p>
              <a href="#contact" className="group relative px-8 py-4 bg-[#133020] text-white rounded-full font-bold text-lg overflow-hidden flex items-center gap-2 w-fit shadow-lg hover:shadow-xl transition-all">
                 <span className="relative z-10 group-hover:text-[#f5eedb] transition-colors duration-300">Start Project</span>
                 <ArrowUpRight className="relative z-10 group-hover:text-[#f5eedb] transition-colors duration-300" size={20} />
                 <div className="absolute inset-0 bg-[#046241] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </a>
           </motion.div>

           <motion.div
             style={{ y }}
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.8, delay: 0.4 }}
             className="relative h-[500px] w-full rounded-[3rem] overflow-hidden shadow-2xl border border-[#133020]/5"
           >
              <img 
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2864&auto=format&fit=crop" 
                alt="Abstract Data" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#133020]/20 mix-blend-multiply"></div>
              
              <div className="absolute bottom-8 left-8 bg-[#f5eedb]/90 backdrop-blur-md p-6 rounded-2xl max-w-xs border border-[#133020]/10">
                 <div className="flex items-center gap-3 mb-2">
                    <FileText className="text-[#046241]" size={20} />
                    <span className="font-bold text-[#133020]">Multi-language</span>
                 </div>
                 <p className="text-sm text-[#133020]/70">Genealogy documents, newspapers, and archives facilitating global ancestry research.</p>
              </div>
           </motion.div>
        </div>
      </section>

      {/* Interactive Tabs Section */}
      <section className="px-6 max-w-[1400px] mx-auto mb-32">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-5xl font-medium text-[#133020] mb-4">Process & Results</h2>
          <p className="text-[#133020]/60 max-w-2xl mx-auto">Explore our comprehensive approach to data servicing.</p>
        </div>

        <div className="bg-[#F9F7F7] rounded-[3rem] p-8 md:p-12 shadow-sm border border-[#133020]/5 overflow-hidden min-h-[600px] flex flex-col md:flex-row gap-12">
           
           {/* Left Side: Navigation Tabs */}
           <div className="flex flex-col gap-4 md:w-1/3">
              {tabs.map((tab) => (
                 <div 
                    key={tab.id}
                    onMouseEnter={() => setActiveTabId(tab.id)}
                    className={`
                       group cursor-pointer p-6 rounded-2xl transition-all duration-300 border relative overflow-hidden
                       ${activeTabId === tab.id 
                          ? 'bg-[#133020] text-white border-[#133020] shadow-lg scale-105 z-10' 
                          : 'bg-white text-[#133020]/60 border-[#133020]/5 hover:bg-white hover:border-[#133020]/20'
                       }
                    `}
                 >
                    <div className="flex items-center justify-between mb-2 relative z-10">
                       <span className={`text-xs font-bold tracking-widest ${activeTabId === tab.id ? 'text-[#FFB347]' : 'text-[#133020]/40'}`}>
                          {tab.id}
                       </span>
                       {activeTabId === tab.id && <ArrowUpRight size={16} className="text-[#FFB347]" />}
                    </div>
                    <h4 className="text-xl font-semibold relative z-10">{tab.label}</h4>
                 </div>
              ))}
           </div>

           {/* Right Side: Content Display */}
           <div className="flex-1 relative rounded-3xl overflow-hidden bg-[#ffffff] min-h-[400px] md:min-h-auto shadow-inner border border-[#133020]/5">
              <AnimatePresence mode="wait">
                 <motion.div
                    key={activeTab.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute inset-0 flex flex-col"
                 >
                    {/* Image Background */}
                    <div className="absolute inset-0 h-2/3">
                       <img 
                          src={activeTab.image} 
                          alt={activeTab.title} 
                          className="w-full h-full object-cover"
                       />
                       <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#ffffff]"></div>
                    </div>

                    {/* Content Overlay */}
                    <div className="relative z-10 mt-auto p-8 md:p-12 h-full flex flex-col justify-end">
                       <div className="bg-[#f5eedb]/80 backdrop-blur-xl p-8 rounded-3xl border border-[#133020]/10 shadow-lg">
                          <div className="w-12 h-12 bg-[#046241] rounded-xl flex items-center justify-center mb-6 text-[#FFB347]">
                             <activeTab.icon size={24} />
                          </div>
                          <h3 className="text-3xl font-bold mb-4 text-[#133020]">
                             {activeTab.title}
                          </h3>
                          <p className="text-lg text-[#133020]/80 leading-relaxed">
                             {activeTab.description}
                          </p>
                       </div>
                    </div>
                 </motion.div>
              </AnimatePresence>
           </div>

        </div>
      </section>

    </div>
  );
};
