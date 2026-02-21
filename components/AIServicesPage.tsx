import React, { useRef } from 'react';
import { ArrowRight, Sparkles, ArrowUpRight, CheckCircle2, Database, Scan, FileText, Mic, Video, Image as ImageIcon } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const marqueeItems = [
  {
    category: "Text",
    text: "Text collection, labelling, transcription, utterance collection, sentiment analysis",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=2940&auto=format&fit=crop"
  },
  {
    category: "Video",
    text: "Collection, labelling, audit, live broadcast, subtitle generation",
    image: "https://www.vidyard.com/wp-content/uploads/ai-video-vs-manual-video-1982x1114-1-768x432.jpeg"
  },
  {
    category: "Image",
    text: "Collection, labelling, classification, audit, object detection and tagging",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2940&auto=format&fit=crop"
  },
  {
    category: "Audio",
    text: "Collection, labelling, voice categorization, music categorization, intelligent cs",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2940&auto=format&fit=crop"
  }
];

export const AIServicesPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div ref={containerRef} className="bg-[#f5eedb] min-h-screen font-sans text-[#133020] selection:bg-[#FFB347] selection:text-[#133020] overflow-hidden pt-32 pb-20">
      
      {/* Header Section */}
      <section className="px-6 max-w-7xl mx-auto mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3 mb-8"
        >
           <div className="h-[1px] w-12 bg-[#046241]"></div>
           <span className="text-[#046241] font-mono text-sm tracking-widest uppercase font-semibold">AI Data Services</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-6xl md:text-8xl font-bold tracking-tighter text-[#133020] mb-12 leading-[0.9]"
        >
          Intelligent <br/>
          <span className="text-[#046241]">Data Solutions.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl text-xl text-[#133020]/80 leading-relaxed mb-12 font-light"
        >
          Lifewood delivers end-to-end AI data solutions—from multi-language data collection and annotation to model training and generative AI content. Leveraging our global workforce, industrialized methodology, and proprietary LiFT platform, we enable organizations to scale efficiently, reduce costs, and accelerate decision-making with high-quality, domain-specific datasets.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center gap-4"
        >
          <a href="#contact" className="group relative px-8 py-4 bg-[#133020] text-white rounded-full font-bold text-lg overflow-hidden flex items-center gap-2 shadow-lg hover:shadow-xl transition-all">
             <span className="relative z-10 group-hover:text-[#f5eedb] transition-colors duration-300">Contact Us</span>
             <ArrowUpRight className="relative z-10 group-hover:text-[#f5eedb] transition-colors duration-300" size={20} />
             <div className="absolute inset-0 bg-[#046241] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </a>
        </motion.div>
      </section>

      {/* Video Section - Preserved */}
      <section className="px-6 max-w-7xl mx-auto mb-32">
        <motion.div 
          style={{ y }}
          className="relative w-full aspect-video rounded-[3rem] overflow-hidden shadow-2xl bg-black border border-[#133020]/5"
        >
          <iframe 
            width="100%" 
            height="100%" 
            src="https://www.youtube.com/embed/g_JvAVL0WY4?si=Lifewood" 
            title="Lifewood AI Services" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowFullScreen
            className="absolute inset-0 w-full h-full object-cover"
          ></iframe>
        </motion.div>
      </section>

      {/* Services Marquee Section - Preserved & Enhanced */}
      <section className="mb-32 overflow-hidden py-16 bg-[#133020] -skew-y-2 transform origin-left">
        <div className="relative w-full">
           <motion.div 
             className="flex gap-8 w-max px-4"
             animate={{ x: ["0%", "-50%"] }}
             transition={{ 
               repeat: Infinity, 
               ease: "linear", 
               duration: 30 
             }}
           >
             {[...marqueeItems, ...marqueeItems].map((item, index) => (
               <div 
                 key={index} 
                 className="flex-shrink-0 w-[400px] md:w-[500px] bg-[#f5eedb] rounded-[2rem] overflow-hidden border border-[#ffffff]/10 group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
               >
                 <div className="h-64 overflow-hidden relative">
                    <img 
                      src={item.image} 
                      alt={item.category} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-[#133020]/40 group-hover:bg-transparent transition-colors duration-500"></div>
                    <div className="absolute bottom-6 left-6 bg-[#ffffff]/90 backdrop-blur-md px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider text-[#133020] shadow-lg">
                      {item.category}
                    </div>
                 </div>
                 <div className="p-8 bg-[#F9F7F7]">
                   <p className="text-lg text-[#133020]/80 leading-relaxed font-medium">
                     {item.text}
                   </p>
                 </div>
               </div>
             ))}
           </motion.div>
        </div>
      </section>

      {/* Comprehensive Data Solutions Section - Redesigned Bento Grid */}
      <section className="px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-4 text-sm font-semibold uppercase tracking-wider text-[#046241]"
          >
            <Sparkles size={16} fill="currentColor" />
            <span>Why brands trust us</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-medium tracking-tight text-[#133020] mb-8"
          >
            Comprehensive <br/> Data Solutions
          </motion.h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[400px]">
          
          {/* Data Validation - Dark Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#133020] text-white p-10 rounded-[2.5rem] flex flex-col justify-between group hover:shadow-xl transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#046241]/20 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-[#ffffff]/10 rounded-xl flex items-center justify-center mb-6 backdrop-blur-sm">
                 <CheckCircle2 className="text-[#FFB347]" size={24} />
              </div>
              <h3 className="text-3xl font-medium mb-6">Data Validation</h3>
              <p className="text-[#f5eedb]/70 leading-relaxed mb-6 text-lg">
                The goal is to create data that is consistent, accurate and complete, preventing data loss or errors.
              </p>
            </div>
            <div className="w-full h-1 bg-[#ffffff]/10 mt-8 group-hover:bg-[#FFB347] transition-colors duration-500"></div>
          </motion.div>

          {/* Data Collection - Light Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-[#F9F7F7] text-[#133020] p-10 rounded-[2.5rem] flex flex-col justify-between group hover:shadow-xl transition-all duration-300 relative overflow-hidden border border-[#133020]/5"
          >
            <div className="relative z-10">
              <div className="w-12 h-12 bg-[#133020]/5 rounded-xl flex items-center justify-center mb-6">
                 <Database className="text-[#046241]" size={24} />
              </div>
              <h3 className="text-3xl font-medium mb-6">Data Collection</h3>
              <p className="text-[#133020]/70 leading-relaxed text-lg">
                Lifewood delivers multi-modal data collection across <strong>text, audio, image, and video</strong>.
              </p>
            </div>
            <div className="mt-8 flex gap-2">
               <div className="h-2 w-2 rounded-full bg-[#FFB347]"></div>
               <div className="h-2 w-2 rounded-full bg-[#046241]"></div>
               <div className="h-2 w-2 rounded-full bg-[#133020]"></div>
            </div>
          </motion.div>

           {/* Data Acquisition - Accent Card */}
           <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-[#FFB347] text-[#133020] p-10 rounded-[2.5rem] flex flex-col justify-between group hover:shadow-xl transition-all duration-300 relative overflow-hidden"
           >
            <div className="relative z-10">
              <div className="w-12 h-12 bg-[#133020]/10 rounded-xl flex items-center justify-center mb-6">
                 <Scan className="text-[#133020]" size={24} />
              </div>
              <h3 className="text-3xl font-medium mb-6">Data Acquisition</h3>
              <p className="text-[#133020]/80 leading-relaxed mb-8 text-lg">
                We provide <strong>end-to-end data acquisition solutions</strong>—capturing, processing, and managing large-scale datasets.
              </p>
            </div>
            {/* Abstract Graphic */}
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-[#ffffff]/20 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700"></div>
          </motion.div>

          {/* Data Curation - White Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-[#ffffff] border border-[#133020]/5 p-10 rounded-[2.5rem] flex flex-col group hover:shadow-xl transition-all duration-300"
          >
            <div className="w-12 h-12 bg-[#F9F7F7] rounded-xl flex items-center justify-center mb-6">
               <FileText className="text-[#046241]" size={24} />
            </div>
            <h3 className="text-3xl font-medium mb-6 text-[#133020]">Data Curation</h3>
            <p className="text-[#133020]/70 leading-relaxed mb-auto text-lg">
              We sift, select and index data to ensure reliability, accessibility and ease of classification.
            </p>
          </motion.div>

          {/* Data Annotation - Large Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 bg-[#046241] text-white p-10 rounded-[2.5rem] flex flex-col md:flex-row gap-8 group hover:shadow-xl transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="flex-1 flex flex-col relative z-10">
                <div className="w-12 h-12 bg-[#ffffff]/10 rounded-xl flex items-center justify-center mb-6 backdrop-blur-sm">
                   <Sparkles className="text-[#FFB347]" size={24} />
                </div>
                <h3 className="text-3xl font-medium mb-6">Data Annotation</h3>
                <p className="text-[#f5eedb]/90 leading-relaxed mb-8 text-lg">
                In the age of AI, data is the fuel for all analytic and machine learning. With our in-depth library of services, we're here to be an integral part of your digital strategy.
                </p>
                <div className="mt-auto bg-[#133020]/50 backdrop-blur-md text-white p-6 rounded-2xl max-w-sm border border-[#ffffff]/10">
                   <div className="flex gap-4 mb-2">
                      <Mic size={16} className="text-[#FFB347]" />
                      <Video size={16} className="text-[#FFB347]" />
                      <ImageIcon size={16} className="text-[#FFB347]" />
                   </div>
                   <p className="text-sm opacity-90">High quality annotation services for text, image, audio and video.</p>
                </div>
            </div>
            
            <div className="flex-1 relative overflow-hidden rounded-[2rem] min-h-[300px] shadow-2xl border border-[#ffffff]/10 transform md:rotate-2 group-hover:rotate-0 transition-transform duration-500">
               <img 
                 src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2670&auto=format&fit=crop" 
                 alt="Hands collaborating" 
                 className="absolute inset-0 w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#046241]/80 to-transparent mix-blend-multiply"></div>
            </div>
          </motion.div>

        </div>
      </section>

    </div>
  );
};