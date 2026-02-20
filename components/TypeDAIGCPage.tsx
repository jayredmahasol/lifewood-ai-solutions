import React, { useRef } from 'react';
import { ArrowUpRight, Infinity, Play, Globe, Mic, Layers, Zap } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const TypeDAIGCPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div ref={containerRef} className="bg-[#f5eedb] min-h-screen font-sans text-[#133020] selection:bg-[#FFB347] selection:text-[#133020] overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 pt-32 pb-20">
        {/* Background Gradients - Adjusted for light theme */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FFB347]/20 rounded-full blur-[120px] pointer-events-none mix-blend-multiply"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#046241]/10 rounded-full blur-[120px] pointer-events-none mix-blend-multiply"></div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             className="flex items-center gap-3 mb-8"
           >
              <div className="h-[1px] w-12 bg-[#046241]"></div>
              <span className="text-[#046241] font-mono text-sm tracking-widest uppercase font-semibold">Type D — AIGC</span>
           </motion.div>

           <motion.h1 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.1 }}
             className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-12 leading-[0.9] text-[#133020]"
           >
             Generative <br/>
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#046241] via-[#133020] to-[#FFB347]">Reality.</span>
           </motion.h1>

           <div className="grid md:grid-cols-2 gap-16 items-end">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-[#133020]/80 leading-relaxed font-light"
              >
                Lifewood's early adoption of AI tools has rapidly evolved into a powerhouse of AI Generated Content. We blend text, voice, image, and video synthesis with traditional storytelling to create cinematic worlds.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex justify-start md:justify-end"
              >
                <a href="#contact" className="group relative px-8 py-4 bg-[#133020] text-white rounded-full font-bold text-lg overflow-hidden flex items-center gap-2 shadow-lg hover:shadow-xl transition-all">
                   <span className="relative z-10 group-hover:text-[#f5eedb] transition-colors duration-300">Start Project</span>
                   <ArrowUpRight className="relative z-10 group-hover:text-[#f5eedb] transition-colors duration-300" size={20} />
                   <div className="absolute inset-0 bg-[#046241] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </a>
              </motion.div>
           </div>
        </div>
      </section>

      {/* Video Showcase - Floating */}
      <section className="px-4 max-w-[1800px] mx-auto mb-40">
        <motion.div 
          style={{ y }}
          className="relative w-full h-[70vh] rounded-[3rem] overflow-hidden shadow-2xl border border-white/20 bg-[#133020]"
        >
          <video 
            src="https://framerusercontent.com/assets/OYykWaWrUmfZYDy3CJnT4GUNL8.mp4" 
            loop 
            muted 
            autoPlay 
            playsInline
            className="w-full h-full object-cover opacity-90 mix-blend-overlay"
          ></video>
          <div className="absolute inset-0 bg-gradient-to-t from-[#133020] via-transparent to-transparent"></div>
          
          <div className="absolute bottom-12 left-8 md:left-16 text-[#f5eedb]">
             <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#f5eedb]/10 backdrop-blur-md flex items-center justify-center border border-[#f5eedb]/20">
                   <Play size={20} fill="currentColor" className="text-[#f5eedb] ml-1" />
                </div>
                <span className="text-sm font-mono uppercase tracking-wider text-[#f5eedb]/80">Showreel 2025</span>
             </div>
             <h3 className="text-3xl md:text-5xl font-medium tracking-tight">Cinematic Synthesis</h3>
          </div>
        </motion.div>
      </section>

      {/* Bento Grid Features */}
      <section className="px-6 max-w-7xl mx-auto mb-40">
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mb-20"
         >
            <h2 className="text-4xl md:text-6xl font-medium mb-6 text-[#133020]">The AIGC Suite</h2>
            <p className="text-xl text-[#133020]/70 max-w-2xl">Advanced film techniques combined with generative AI to deliver surprise and originality.</p>
         </motion.div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
            
            {/* Card 1 - Large */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="md:col-span-2 relative group rounded-[2.5rem] overflow-hidden bg-[#F9F7F7] border border-[#133020]/5 shadow-sm hover:shadow-md transition-shadow"
            >
               <img 
                 src="https://images.unsplash.com/photo-1626785774573-4b79931256ce?q=80&w=2940&auto=format&fit=crop" 
                 alt="Storyboarding" 
                 className="absolute inset-0 w-full h-full object-cover opacity-100 transition-transform duration-700 group-hover:scale-105"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#133020]/90 via-[#133020]/20 to-transparent"></div>
               <div className="absolute bottom-10 left-10 right-10 text-white">
                  <Layers className="text-[#FFB347] mb-4" size={32} />
                  <h3 className="text-3xl font-bold mb-2">Story & Visuals</h3>
                  <p className="text-[#f5eedb]/80 text-lg">From script to screen, we use AI to storyboard, edit, and enhance visual narratives with unprecedented speed.</p>
               </div>
            </motion.div>

            {/* Card 2 - Tall */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="md:row-span-2 relative group rounded-[2.5rem] overflow-hidden bg-[#133020] text-white border border-[#133020]/5 shadow-lg"
            >
               <img 
                 src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2874&auto=format&fit=crop" 
                 alt="Node Graph" 
                 className="absolute inset-0 w-full h-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-30"
               />
               <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#133020]/50 to-[#133020]"></div>
               <div className="absolute bottom-10 left-10 right-10">
                  <Zap className="text-[#FFB347] mb-4" size={32} />
                  <h3 className="text-3xl font-bold mb-2">Generative Tech</h3>
                  <p className="text-[#f5eedb]/80 text-lg">Leveraging the latest diffusion models and LLMs to generate assets that were previously impossible.</p>
               </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative group rounded-[2.5rem] overflow-hidden bg-[#FFB347] border border-[#133020]/5 shadow-sm hover:shadow-md transition-shadow"
            >
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-multiply"></div>
               <div className="absolute inset-0 flex flex-col justify-center items-center p-8 text-center text-[#133020]">
                  <span className="text-7xl font-bold mb-2">100+</span>
                  <span className="text-xl font-medium opacity-80">Countries Supported</span>
               </div>
            </motion.div>

            {/* Card 4 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="relative group rounded-[2.5rem] overflow-hidden bg-[#F9F7F7] border border-[#133020]/5 shadow-sm hover:shadow-md transition-shadow"
            >
               <img 
                 src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=2787&auto=format&fit=crop" 
                 alt="Microphone" 
                 className="absolute inset-0 w-full h-full object-cover opacity-100 transition-transform duration-700 group-hover:scale-105"
               />
               <div className="absolute inset-0 bg-[#133020]/60 group-hover:bg-[#133020]/40 transition-colors"></div>
               <div className="absolute bottom-10 left-10 text-white">
                  <Mic className="text-[#FFB347] mb-4" size={32} />
                  <h3 className="text-2xl font-bold">Voice Synthesis</h3>
               </div>
            </motion.div>

         </div>
      </section>

      {/* Localization / Globe Section */}
      <section className="px-6 max-w-7xl mx-auto mb-40">
         <div className="bg-[#133020] rounded-[3rem] p-8 md:p-20 border border-[#133020]/5 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-full h-full opacity-30 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#046241] via-transparent to-transparent"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center relative z-10 text-white">
               <div>
                  <div className="w-16 h-16 rounded-2xl bg-[#ffffff]/10 flex items-center justify-center mb-8 border border-[#ffffff]/10">
                     <Globe className="text-[#FFB347]" size={32} />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-medium mb-6">Global Adaptation</h2>
                  <p className="text-xl text-[#f5eedb]/80 leading-relaxed mb-8">
                     We don't just translate; we adapt. Our AI models can quickly adjust the culture, language, and tone of your video to suit different world markets instantly.
                  </p>
                  <ul className="space-y-4">
                     {['Cultural Nuance Adjustment', 'Lip-Sync Dubbing', 'Regional Tone Matching'].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-[#f5eedb]/90">
                           <div className="w-2 h-2 rounded-full bg-[#FFB347]"></div>
                           {item}
                        </li>
                     ))}
                  </ul>
               </div>
               
               <div className="relative h-[400px] w-full rounded-3xl overflow-hidden shadow-lg border border-white/10">
                  <img 
                    src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2832&auto=format&fit=crop" 
                    alt="Global Faces" 
                    className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#133020] via-transparent to-transparent"></div>
               </div>
            </div>
         </div>
      </section>

      {/* Quote Section */}
      <section className="px-6 max-w-4xl mx-auto text-center mb-40">
         <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
         >
            <Infinity className="text-[#046241] mx-auto mb-8" size={64} strokeWidth={1} />
            <blockquote className="text-3xl md:text-5xl font-light leading-tight mb-10 text-[#133020]">
               “Finding the one, most important thing on which to build your message is integral to our approach.”
            </blockquote>
            <cite className="text-sm text-[#133020]/60 font-mono uppercase tracking-[0.3em] not-italic">
               — Lifewood AIGC
            </cite>
         </motion.div>
      </section>

    </div>
  );
};
