import React, { useState, useRef } from 'react';
import { ArrowUpRight, Heart, Lightbulb, Shield, Users, Target, Eye, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

type Tab = 'mission' | 'vision';

export const AboutUsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('mission');
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const values = [
    {
      letter: 'D',
      title: 'Diversity',
      description: 'We celebrate differences in belief, philosophy and ways of life, because they bring unique perspectives and ideas that encourage everyone to move forward.',
      icon: Users
    },
    {
      letter: 'C',
      title: 'Caring',
      description: 'We care for every person deeply and equally, because without care work becomes meaningless.',
      icon: Heart
    },
    {
      letter: 'I',
      title: 'Innovation',
      description: 'Innovation is at the heart of all we do, enriching our lives and challenging us to continually improve ourselves and our service.',
      icon: Lightbulb
    },
    {
      letter: 'I',
      title: 'Integrity',
      description: 'We are dedicated to act ethically and sustainably in everything we do. More than just the bare minimum. It is the basis of our existence as a company.',
      icon: Shield
    }
  ];

  return (
    <div ref={containerRef} className="bg-[#f5eedb] min-h-screen font-sans text-[#133020] selection:bg-[#FFB347] selection:text-[#133020] overflow-hidden pt-32 pb-20">
      
      {/* Header Section */}
      <section className="px-6 max-w-7xl mx-auto mb-20 md:mb-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3 mb-8"
        >
           <div className="h-[1px] w-12 bg-[#046241]"></div>
           <span className="text-[#046241] font-mono text-sm tracking-widest uppercase font-semibold">Who We Are</span>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-between items-end gap-12">
           <motion.div
             initial={{ opacity: 0, x: -30 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="max-w-4xl"
           >
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 leading-[0.9] text-[#133020]">
                About <br/>
                <span className="text-[#046241]">Lifewood.</span>
              </h1>
              <p className="text-xl md:text-2xl text-[#133020]/80 leading-relaxed font-light max-w-3xl">
                While we are motivated by business and economic objectives, we remain committed to our core business beliefs that shape our corporate and individual behaviour around the world.
              </p>
           </motion.div>

           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.8, delay: 0.3 }}
           >
              <a href="#contact" className="group relative px-8 py-4 bg-[#133020] text-white rounded-full font-bold text-lg overflow-hidden flex items-center gap-2 shadow-lg hover:shadow-xl transition-all">
                 <span className="relative z-10 group-hover:text-[#f5eedb] transition-colors duration-300">Contact Us</span>
                 <ArrowUpRight className="relative z-10 group-hover:text-[#f5eedb] transition-colors duration-300" size={20} />
                 <div className="absolute inset-0 bg-[#046241] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </a>
           </motion.div>
        </div>
      </section>

      {/* Hero Image Parallax */}
      <section className="px-4 max-w-[1800px] mx-auto mb-32">
        <motion.div 
          style={{ y }}
          className="relative w-full h-[60vh] md:h-[80vh] rounded-[3rem] overflow-hidden shadow-2xl border border-[#133020]/5"
        >
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2940&auto=format&fit=crop" 
            alt="Team Collaboration" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#133020]/40 via-transparent to-transparent"></div>
        </motion.div>
      </section>

      {/* Core Values Section */}
      <section className="px-6 max-w-7xl mx-auto mb-32">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left: Title & Intro */}
          <div className="lg:w-1/3 lg:sticky lg:top-32 h-fit">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
            >
               <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-[#133020] mb-8">
                 CORE <span className="text-[#FFB347]">VALUES</span>
               </h2>
               <p className="text-xl text-[#133020]/70 leading-relaxed">
                 At Lifewood we empower our company and our clients to realise the transformative power of AI: Bringing big data to life, launching new ways of thinking, innovating, learning, and doing.
               </p>
            </motion.div>
          </div>

          {/* Right: Values List */}
          <div className="lg:w-2/3 flex flex-col gap-6">
            {values.map((value, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-[#F9F7F7] rounded-[2.5rem] p-8 md:p-10 border border-[#133020]/5 hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row gap-8 items-start"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 bg-[#046241] rounded-2xl flex items-center justify-center text-white text-4xl md:text-5xl font-bold flex-shrink-0 group-hover:bg-[#FFB347] group-hover:text-[#133020] transition-colors duration-300 shadow-lg">
                  {value.letter}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-4">
                     <value.icon size={24} className="text-[#FFB347] group-hover:text-[#046241] transition-colors" />
                     <h3 className="text-2xl font-bold text-[#133020] uppercase tracking-wide">{value.title}</h3>
                  </div>
                  <p className="text-[#133020]/70 text-lg leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="px-6 max-w-7xl mx-auto mb-32">
        <div className="text-center mb-16">
           <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-4xl md:text-6xl font-medium text-[#133020] mb-6 max-w-4xl mx-auto"
           >
             What drives us today, and what inspires us for tomorrow
           </motion.h2>
        </div>

        {/* Custom Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-[#133020]/5 p-2 rounded-full inline-flex gap-2">
            <button
              onClick={() => setActiveTab('mission')}
              className={`px-8 py-3 rounded-full text-lg font-bold transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'mission'
                  ? 'bg-[#046241] text-white shadow-lg'
                  : 'text-[#133020]/60 hover:text-[#133020] hover:bg-[#133020]/5'
              }`}
            >
              <Target size={20} />
              Mission
            </button>
            <button
              onClick={() => setActiveTab('vision')}
              className={`px-8 py-3 rounded-full text-lg font-bold transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'vision'
                  ? 'bg-[#046241] text-white shadow-lg'
                  : 'text-[#133020]/60 hover:text-[#133020] hover:bg-[#133020]/5'
              }`}
            >
              <Eye size={20} />
              Vision
            </button>
          </div>
        </div>

        {/* Content Box */}
        <motion.div 
           layout
           className="bg-[#F9F7F7] rounded-[3rem] overflow-hidden shadow-xl border border-[#133020]/5 min-h-[600px] flex flex-col lg:flex-row"
        >
           {/* Image Side */}
           <div className="lg:w-1/2 relative min-h-[300px] lg:min-h-full overflow-hidden">
             <AnimatePresence mode="wait">
                <motion.div
                   key={activeTab}
                   initial={{ opacity: 0, scale: 1.1 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0 }}
                   transition={{ duration: 0.7 }}
                   className="absolute inset-0"
                >
                   <img 
                     src={activeTab === 'mission' 
                        ? "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2940&auto=format&fit=crop"
                        : "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2938&auto=format&fit=crop"
                     }
                     alt={activeTab} 
                     className="w-full h-full object-cover"
                   />
                   <div className="absolute inset-0 bg-[#133020]/20 mix-blend-multiply"></div>
                </motion.div>
             </AnimatePresence>
           </div>

           {/* Text Side */}
           <div className="lg:w-1/2 p-12 md:p-20 flex flex-col justify-center relative">
             <AnimatePresence mode="wait">
                <motion.div
                   key={activeTab}
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   transition={{ duration: 0.5 }}
                >
                   <div className="w-16 h-16 bg-[#FFB347] rounded-2xl flex items-center justify-center mb-8 text-[#133020]">
                      {activeTab === 'mission' ? <Target size={32} /> : <Eye size={32} />}
                   </div>
                   <h3 className="text-4xl md:text-5xl font-bold text-[#133020] mb-8 capitalize">
                      Our {activeTab}
                   </h3>
                   <p className="text-xl md:text-2xl text-[#133020]/70 leading-relaxed font-light">
                      {activeTab === 'mission' 
                         ? "To develop and deploy cutting edge AI technologies that solve real-world problems, empower communities, and advance sustainable practices. We are committed to fostering a culture of innovation."
                         : "To be the global champion in AI data solutions, igniting a culture of innovation and sustainability that enriches lives and transforms communities worldwide."
                      }
                   </p>
                </motion.div>
             </AnimatePresence>
           </div>
        </motion.div>
      </section>

      {/* CTA Section Removed */}
    </div>
  );
};
