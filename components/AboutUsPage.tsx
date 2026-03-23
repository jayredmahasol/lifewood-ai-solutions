import React, { useRef } from 'react';
import { ArrowUpRight, Heart, Lightbulb, Shield, Users, Target, Eye } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BlurText } from './react-bits/BlurText';
import { SpotlightCard } from './react-bits/SpotlightCard';
import Squares from './react-bits/Squares';

export const AboutUsPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const values = [
    {
      title: 'Diversity',
      description: 'We celebrate differences in belief, philosophy and ways of life, because they bring unique perspectives and ideas that encourage everyone to move forward.',
      icon: Users
    },
    {
      title: 'Caring',
      description: 'We care for every person deeply and equally, because without care work becomes meaningless.',
      icon: Heart
    },
    {
      title: 'Innovation',
      description: 'Innovation is at the heart of all we do, enriching our lives and challenging us to continually improve ourselves and our service.',
      icon: Lightbulb
    },
    {
      title: 'Integrity',
      description: 'We are dedicated to act ethically and sustainably in everything we do. More than just the bare minimum. It is the basis of our existence as a company.',
      icon: Shield
    }
  ];

  return (
    <div ref={containerRef} className="bg-[#f5eedb] min-h-screen font-sans text-[#133020] selection:bg-[#FFB347] selection:text-[#133020] overflow-hidden">
      
      {/* Hero Section with Squares Background */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-50">
          <Squares 
            direction="diagonal"
            speed={0.5}
            squareSize={60}
            borderColor="rgba(19, 48, 32, 0.1)"
            hoverFillColor="rgba(4, 98, 65, 0.05)"
          />
        </div>
        
        {/* Gradient fade at the bottom to blend into the next section */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#f5eedb] to-transparent z-10 pointer-events-none"></div>

        <div className="relative z-20 px-6 max-w-7xl mx-auto w-full flex flex-col items-center text-center mt-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#133020]/5 border border-[#133020]/10 text-[#046241] text-sm font-semibold tracking-wider uppercase mb-8 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-[#046241]"></span>
            Who We Are
          </motion.div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 leading-[1.1] flex flex-wrap justify-center gap-x-4 md:gap-x-6">
            <BlurText text="About" delay={0} duration={0.8} className="text-[#133020]" />
            <BlurText text="Lifewood." delay={0.2} duration={0.8} className="text-[#046241]" />
          </h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-[#133020]/80 leading-relaxed font-light max-w-3xl mx-auto mb-12"
          >
            While we are motivated by business and economic objectives, we remain committed to our core business beliefs that shape our corporate and individual behaviour around the world.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
             <a href="#contact" className="group relative px-8 py-4 bg-[#133020] text-white rounded-full font-bold text-lg overflow-hidden flex items-center gap-2 shadow-[0_0_30px_rgba(19,48,32,0.2)] hover:shadow-[0_0_50px_rgba(19,48,32,0.4)] transition-all">
                <span className="relative z-10">Get in Touch</span>
                <ArrowUpRight className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" size={20} />
             </a>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section (Bento Grid Style) */}
      <section className="px-6 max-w-7xl mx-auto py-32 relative z-20">
        <div className="text-center mb-20">
           <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#133020] mb-6 max-w-4xl mx-auto tracking-tight"
           >
             What drives us today, and what inspires us for tomorrow
           </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <SpotlightCard className="p-10 md:p-12 rounded-[2.5rem] bg-white/60 border border-[#133020]/10 backdrop-blur-sm shadow-xl" spotlightColor="rgba(4, 98, 65, 0.15)">
            <div className="w-16 h-16 bg-[#046241] rounded-2xl flex items-center justify-center mb-8 text-white shadow-lg">
              <Target size={32} />
            </div>
            <h3 className="text-4xl font-bold text-[#133020] mb-6">Our Mission</h3>
            <p className="text-xl text-[#133020]/80 leading-relaxed font-light">
              To develop and deploy cutting edge AI technologies that solve real-world problems, empower communities, and advance sustainable practices. We are committed to fostering a culture of innovation.
            </p>
          </SpotlightCard>

          <SpotlightCard className="p-10 md:p-12 rounded-[2.5rem] bg-white/60 border border-[#133020]/10 backdrop-blur-sm shadow-xl" spotlightColor="rgba(255, 179, 71, 0.2)">
            <div className="w-16 h-16 bg-[#FFB347] rounded-2xl flex items-center justify-center mb-8 text-[#133020] shadow-lg">
              <Eye size={32} />
            </div>
            <h3 className="text-4xl font-bold text-[#133020] mb-6">Our Vision</h3>
            <p className="text-xl text-[#133020]/80 leading-relaxed font-light">
              To be the global champion in AI data solutions, igniting a culture of innovation and sustainability that enriches lives and transforms communities worldwide.
            </p>
          </SpotlightCard>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="px-6 max-w-7xl mx-auto pb-32 relative z-20">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mb-16 text-center"
        >
           <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-[#133020] mb-8">
             Core <span className="text-[#046241]">Values</span>
           </h2>
           <p className="text-xl text-[#133020]/80 leading-relaxed max-w-3xl mx-auto">
             At Lifewood we empower our company and our clients to realise the transformative power of AI: Bringing big data to life, launching new ways of thinking, innovating, learning, and doing.
           </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <SpotlightCard 
              key={index}
              className="p-8 rounded-[2rem] bg-white/80 border border-[#133020]/10 hover:bg-white transition-colors duration-500 h-full flex flex-col shadow-lg"
              spotlightColor="rgba(4, 98, 65, 0.1)"
            >
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col h-full"
              >
                <div className="w-14 h-14 bg-[#f5eedb] rounded-xl flex items-center justify-center text-[#046241] mb-6 border border-[#133020]/5">
                  <value.icon size={24} />
                </div>
                <h3 className="text-2xl font-bold text-[#133020] mb-4 tracking-wide">{value.title}</h3>
                <p className="text-[#133020]/70 text-base leading-relaxed flex-grow">
                  {value.description}
                </p>
              </motion.div>
            </SpotlightCard>
          ))}
        </div>
      </section>
    </div>
  );
};
