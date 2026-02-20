import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Star, Users, Zap, Globe, Heart, Rocket } from 'lucide-react';

export const CareersPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const benefits = [
    { text: "Collaborative", icon: Users },
    { text: "Innovative", icon: Zap },
    { text: "Flexible", icon: Star },
    { text: "Supportive", icon: Heart },
    { text: "Global", icon: Globe },
    { text: "Purpose-driven", icon: Rocket },
    { text: "Transparent", icon: Users },
    { text: "Engaging", icon: Zap },
    { text: "Diverse", icon: Globe },
    { text: "Professional", icon: Star },
  ];

  return (
    <div ref={containerRef} className="bg-[#f5eedb] min-h-screen font-sans text-[#133020] selection:bg-[#FFB347] selection:text-[#133020] overflow-hidden pt-24 pb-20">
      
      {/* Hero Section */}
      <section className="relative px-6 max-w-7xl mx-auto mb-20 md:mb-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3 mb-8"
        >
           <div className="h-[1px] w-12 bg-[#046241]"></div>
           <span className="text-[#046241] font-mono text-sm tracking-widest uppercase font-semibold">Join Our Team</span>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-between items-end gap-12">
           <motion.div
             initial={{ opacity: 0, x: -30 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="max-w-3xl"
           >
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 leading-[0.9] text-[#133020]">
                Careers at <br/>
                <span className="text-[#046241]">Lifewood.</span>
              </h1>
              <p className="text-xl md:text-2xl text-[#133020]/80 leading-relaxed font-light max-w-xl">
                Innovation, adaptability and the rapid development of new services separates companies that constantly deliver at the highest level from their competitors.
              </p>
           </motion.div>

           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.8, delay: 0.4 }}
           >
              <a 
                href="https://application-form-ph.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-8 py-4 bg-[#133020] text-white rounded-full font-bold text-lg overflow-hidden flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
              >
                 <span className="relative z-10 group-hover:text-[#f5eedb] transition-colors duration-300">Apply Now</span>
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
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
            alt="Team Collaboration" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#133020]/60 via-transparent to-transparent"></div>
          
          <div className="absolute bottom-12 left-8 md:left-16 text-white max-w-2xl">
             <h3 className="text-3xl md:text-5xl font-medium tracking-tight mb-4">"Always on, never off."</h3>
             <p className="text-lg opacity-90">Join a team that thrives on challenge and innovation across borders.</p>
          </div>
        </motion.div>
      </section>

      {/* Enhanced Marquee Section */}
      <section className="mb-32 overflow-hidden bg-[#133020] py-16 -skew-y-2 transform origin-left">
         <div className="flex whitespace-nowrap">
            <motion.div 
               className="flex gap-8 items-center"
               animate={{ x: [0, -1000] }}
               transition={{ 
                  repeat: Infinity, 
                  ease: "linear", 
                  duration: 20 
               }}
            >
               {[...benefits, ...benefits, ...benefits].map((item, index) => (
                  <div key={index} className="flex items-center gap-4 px-8 py-4 bg-[#ffffff]/5 border border-[#ffffff]/10 rounded-full backdrop-blur-sm hover:bg-[#ffffff]/10 transition-colors cursor-default">
                     <item.icon className="text-[#FFB347]" size={24} />
                     <span className="text-2xl font-bold text-[#f5eedb] uppercase tracking-wider">{item.text}</span>
                  </div>
               ))}
            </motion.div>
         </div>
      </section>

      {/* Values Grid - Bento Style */}
      <section className="px-6 max-w-7xl mx-auto mb-32">
         <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-medium text-[#133020] mb-6">Our Culture</h2>
            <p className="text-xl text-[#133020]/70 max-w-2xl mx-auto">
               It means motivating and growing teams that can initiate and learn on the run in order to deliver evolving technologies and targets.
            </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            
            {/* Card 1 */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="md:col-span-2 bg-[#F9F7F7] rounded-[2.5rem] p-8 md:p-12 border border-[#133020]/5 relative overflow-hidden group hover:shadow-lg transition-all"
            >
               <div className="relative z-10">
                  <div className="w-12 h-12 bg-[#133020]/5 rounded-xl flex items-center justify-center mb-6">
                     <Rocket className="text-[#046241]" size={24} />
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-[#133020]">Innovation First</h3>
                  <p className="text-[#133020]/70 text-lg max-w-md">
                     It's a big challenge, but innovation, especially across borders, has never been the easy path.
                  </p>
               </div>
               <div className="absolute right-0 bottom-0 w-64 h-64 bg-[#FFB347]/10 rounded-full blur-3xl group-hover:bg-[#FFB347]/20 transition-colors"></div>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="bg-[#133020] rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden group"
            >
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
               <div className="relative z-10 h-full flex flex-col justify-between">
                  <Zap className="text-[#FFB347]" size={32} />
                  <div>
                     <h3 className="text-2xl font-bold mb-2">Fast Paced</h3>
                     <p className="text-[#f5eedb]/80">Evolving technologies and targets.</p>
                  </div>
               </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               className="bg-[#FFB347] rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group"
            >
               <div className="relative z-10 h-full flex flex-col justify-between">
                  <Globe className="text-[#133020]" size={32} />
                  <div>
                     <h3 className="text-2xl font-bold mb-2 text-[#133020]">Global Reach</h3>
                     <p className="text-[#133020]/80">Connecting talent across the world.</p>
                  </div>
               </div>
               <div className="absolute top-0 right-0 w-full h-full bg-white/10 transform scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full origin-top-right"></div>
            </motion.div>

            {/* Card 4 */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.3 }}
               className="md:col-span-2 bg-[#ffffff] rounded-[2.5rem] p-8 md:p-12 border border-[#133020]/5 relative overflow-hidden group hover:shadow-lg transition-all"
            >
               <div className="flex flex-col md:flex-row items-center gap-8 h-full">
                  <div className="flex-1">
                     <div className="w-12 h-12 bg-[#133020]/5 rounded-xl flex items-center justify-center mb-6">
                        <Users className="text-[#046241]" size={24} />
                     </div>
                     <h3 className="text-3xl font-bold mb-4 text-[#133020]">Team Growth</h3>
                     <p className="text-[#133020]/70 text-lg">
                        We focus on motivating and growing teams that can initiate and learn on the run.
                     </p>
                  </div>
                  <div className="w-full md:w-1/3 h-48 rounded-2xl overflow-hidden relative">
                     <img 
                        src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2832&auto=format&fit=crop" 
                        alt="Team Growth" 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                     />
                  </div>
               </div>
            </motion.div>

         </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 max-w-5xl mx-auto text-center mb-32">
         <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="bg-[#133020] rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden"
         >
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#046241] via-transparent to-transparent"></div>
            </div>
            
            <div className="relative z-10">
               <h2 className="text-3xl md:text-5xl font-light leading-tight mb-8">
                  Ready to turn the page on a <br/>
                  <span className="font-serif italic text-[#FFB347]">new chapter?</span>
               </h2>
               <p className="text-xl text-[#f5eedb]/80 mb-12 max-w-2xl mx-auto">
                  If you're looking to turn the page on a new chapter in your career make contact with us today. At Lifewood, the adventure is always before you.
               </p>
               
               <a 
                 href="https://application-form-ph.vercel.app/"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="inline-flex items-center gap-3 px-8 py-4 bg-[#FFB347] text-[#133020] rounded-full font-bold text-lg hover:bg-[#FFC370] transition-all hover:scale-105 shadow-lg"
               >
                  Join Us Now <ArrowRight size={20} />
               </a>
            </div>
         </motion.div>
      </section>

    </div>
  );
};
