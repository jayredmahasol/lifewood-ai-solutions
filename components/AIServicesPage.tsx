import React, { useRef } from 'react';
import { ArrowRight, Sparkles, ArrowUpRight, CheckCircle2, Database, Scan, FileText, Mic, Video, Image as ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Threads from './react-bits/Threads';
import { BlurText } from './react-bits/BlurText';

const mediaTypes = [
  {
    category: "Text",
    text: "Collection, labelling, transcription, sentiment analysis",
    icon: <FileText size={24} className="text-[#046241]" />
  },
  {
    category: "Video",
    text: "Collection, labelling, audit, live broadcast, subtitle generation",
    icon: <Video size={24} className="text-[#046241]" />
  },
  {
    category: "Image",
    text: "Collection, labelling, classification, object detection",
    icon: <ImageIcon size={24} className="text-[#046241]" />
  },
  {
    category: "Audio",
    text: "Collection, labelling, voice categorization, intelligent cs",
    icon: <Mic size={24} className="text-[#046241]" />
  }
];

const services = [
  {
    title: "Data Validation",
    description: "The goal is to create data that is consistent, accurate and complete, preventing data loss or errors.",
    icon: <CheckCircle2 size={32} className="text-[#FFB347]" />,
    color: "bg-[#133020]",
    textColor: "text-white",
    descColor: "text-[#fcfbf7]/70"
  },
  {
    title: "Data Collection",
    description: "Lifewood delivers multi-modal data collection across text, audio, image, and video to fuel your AI models.",
    icon: <Database size={32} className="text-[#046241]" />,
    color: "bg-[#F9F7F7]",
    textColor: "text-[#133020]",
    descColor: "text-[#133020]/70"
  },
  {
    title: "Data Acquisition",
    description: "We provide end-to-end data acquisition solutions—capturing, processing, and managing large-scale datasets.",
    icon: <Scan size={32} className="text-[#133020]" />,
    color: "bg-[#FFB347]",
    textColor: "text-[#133020]",
    descColor: "text-[#133020]/80"
  },
  {
    title: "Data Curation",
    description: "We sift, select and index data to ensure reliability, accessibility and ease of classification.",
    icon: <FileText size={32} className="text-[#046241]" />,
    color: "bg-white border border-[#133020]/10",
    textColor: "text-[#133020]",
    descColor: "text-[#133020]/70"
  }
];

export const AIServicesPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 482 : 344;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div ref={containerRef} className="bg-[#fcfbf7] min-h-screen font-sans text-[#133020] selection:bg-[#FFB347] selection:text-[#133020] overflow-hidden">
      
      {/* Hero Section with Threads Background */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
        {/* Threads Animation Background */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-auto">
          <Threads
            amplitude={1.5}
            distance={0.2}
            color={[0.015, 0.384, 0.255]} // #046241
            enableMouseInteraction={true}
          />
        </div>
        
        <div className="relative z-10 px-6 max-w-5xl mx-auto text-center pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#046241]/10 text-[#046241] font-mono text-sm tracking-widest uppercase font-semibold mb-8 backdrop-blur-sm border border-[#046241]/20"
          >
            <Sparkles size={16} />
            <span>AI Data Services</span>
          </motion.div>
          
          <div className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-[#133020] mb-8 leading-[1.05]">
            <BlurText text="Intelligent" delay={0} />
            <br />
            <span className="text-[#046241]">
              <BlurText text="Data Solutions." delay={0.2} />
            </span>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl mx-auto text-xl md:text-2xl text-[#133020]/70 leading-relaxed mb-12 font-light"
          >
            Lifewood delivers end-to-end AI data solutions—from multi-language data collection and annotation to model training and generative AI content.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center justify-center gap-4 pointer-events-auto"
          >
            <a href="#contact" className="group relative px-8 py-4 bg-[#133020] text-white rounded-full font-bold text-lg overflow-hidden flex items-center gap-2 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
               <span className="relative z-10">Partner With Us</span>
               <ArrowUpRight className="relative z-10 group-hover:rotate-45 transition-transform duration-300" size={20} />
               <div className="absolute inset-0 bg-[#046241] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </a>
          </motion.div>
        </div>
        
        {/* Gradient fade at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#fcfbf7] to-transparent z-10 pointer-events-none"></div>
      </section>

      {/* Media Types - Clean Minimal Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {mediaTypes.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-[2rem] bg-white border border-[#133020]/5 hover:shadow-xl hover:border-[#046241]/20 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#fcfbf7] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#046241]/10 transition-all duration-300">
                {item.icon}
              </div>
              <h3 className="text-2xl font-semibold text-[#133020] mb-4">{item.category}</h3>
              <p className="text-[#133020]/60 leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services - Carousel Layout */}
      <section className="py-32 border-t border-[#133020]/5 overflow-hidden">
        <div className="px-6 max-w-7xl mx-auto mb-16">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12">
            <div className="max-w-2xl">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 mb-6 text-sm font-semibold uppercase tracking-wider text-[#046241]"
              >
                <Sparkles size={16} fill="currentColor" />
                <span>Capabilities</span>
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-6xl font-medium tracking-tight text-[#133020] mb-8 leading-[1.1]"
              >
                Comprehensive <br/> Data Solutions
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-xl text-[#133020]/70 leading-relaxed font-light"
              >
                We provide end-to-end data solutions to ensure your AI models are trained on the highest quality datasets available.
              </motion.p>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-end gap-6"
            >
              <a 
                href="#contact" 
                className="inline-flex items-center gap-3 text-[#046241] font-semibold text-lg hover:gap-5 transition-all group"
              >
                <span className="border-b-2 border-transparent group-hover:border-[#046241] pb-1 transition-all">Explore all services</span>
                <ArrowRight size={20} />
              </a>
              
              {/* Navigation Buttons */}
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => scroll('left')}
                  className="w-12 h-12 rounded-full border border-[#133020]/20 flex items-center justify-center text-[#133020] hover:bg-[#133020] hover:text-white transition-all shadow-sm"
                  aria-label="Scroll Left"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={() => scroll('right')}
                  className="w-12 h-12 rounded-full border border-[#133020]/20 flex items-center justify-center text-[#133020] hover:bg-[#133020] hover:text-white transition-all shadow-sm"
                  aria-label="Scroll Right"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Scrolling Carousel */}
        <div className="pl-6 md:pl-12 lg:pl-24 pb-12">
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 md:gap-8 pb-12 pt-4 pr-6 md:pr-12 lg:pr-24 snap-x snap-mandatory custom-scrollbar"
            style={{ scrollBehavior: 'smooth' }}
          >
            {services.map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex-shrink-0 w-[320px] md:w-[450px] ${service.color} p-10 md:p-12 rounded-[2.5rem] flex flex-col gap-8 items-start group snap-center hover:-translate-y-2 transition-transform duration-500 shadow-sm hover:shadow-xl`}
              >
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 backdrop-blur-sm border border-white/5">
                  {service.icon}
                </div>
                <div className="flex-grow">
                  <h3 className={`text-3xl font-medium mb-4 ${service.textColor}`}>{service.title}</h3>
                  <p className={`text-lg leading-relaxed ${service.descColor}`}>
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Large Featured Card */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: services.length * 0.1 }}
              className="relative flex-shrink-0 w-[320px] md:w-[600px] bg-[#046241] text-white p-10 md:p-12 rounded-[2.5rem] overflow-hidden group snap-center hover:-translate-y-2 transition-transform duration-500 shadow-sm hover:shadow-xl"
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 backdrop-blur-sm border border-white/5 mb-8">
                  <Sparkles size={32} className="text-[#FFB347]" />
                </div>
                <h3 className="text-4xl font-medium mb-6">Data Annotation</h3>
                <p className="text-[#fcfbf7]/80 leading-relaxed mb-10 text-xl font-light">
                  In the age of AI, data is the fuel for all analytic and machine learning. With our in-depth library of services, we're here to be an integral part of your digital strategy.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-sm font-medium">High Quality</div>
                  <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-sm font-medium">Multi-modal</div>
                </div>
              </div>
              <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#FFB347] rounded-full blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="px-6 max-w-7xl mx-auto mb-32">
        <motion.div 
          style={{ y }}
          className="relative w-full aspect-video rounded-[3rem] overflow-hidden shadow-2xl bg-[#133020] border border-[#133020]/10 group"
        >
          <iframe 
            width="100%" 
            height="100%" 
            src="https://www.youtube.com/embed/g_JvAVL0WY4?si=Lifewood" 
            title="Lifewood AI Services" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowFullScreen
            className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
          ></iframe>
        </motion.div>
      </section>

    </div>
  );
};
