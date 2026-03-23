import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, FileText, Image as ImageIcon, ArrowUpRight } from 'lucide-react';

const services = [
  {
    id: 'audio',
    title: 'Audio',
    subtitle: 'Speech recognition & synthesis',
    description: 'High-fidelity audio data collection and annotation for training advanced speech models, voice assistants, and acoustic analysis systems.',
    icon: Mic,
    image: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?q=80&w=2940&auto=format&fit=crop'
  },
  {
    id: 'text',
    title: 'Text',
    subtitle: 'NLP & document processing',
    description: 'Comprehensive text annotation, sentiment analysis, and entity extraction to power the next generation of Large Language Models.',
    icon: FileText,
    image: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=2940&auto=format&fit=crop'
  },
  {
    id: 'image',
    title: 'Image',
    subtitle: 'Computer vision & annotation',
    description: 'Pixel-perfect bounding boxes, polygon segmentation, and image classification to train robust computer vision algorithms.',
    icon: ImageIcon,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2940&auto=format&fit=crop'
  }
];

export const Services: React.FC = () => {
  const [activeService, setActiveService] = useState(services[0].id);

  return (
    <section className="py-32 px-6 bg-[#133020] text-[#f5eedb] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-[#FFB347] text-sm font-semibold tracking-wider uppercase mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#FFB347]"></span>
              Our Expertise
            </div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-white"
            >
              AI Data Services
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-white/70 leading-relaxed"
            >
              Lifewood offers AI and IT services that enhance decision-making, reduce costs, and improve productivity to optimize organizational performance.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <a href="#ai-services" className="group flex items-center gap-3 px-8 py-4 bg-[#FFB347] text-[#133020] rounded-full font-bold hover:bg-[#ffc370] transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1">
              <span>Explore Services</span>
              <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </motion.div>
        </div>

        {/* Interactive Expanding Cards */}
        <div className="flex flex-col lg:flex-row gap-4 h-[800px] lg:h-[600px]">
          {services.map((service, index) => {
            const isActive = activeService === service.id;
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => setActiveService(service.id)}
                onClick={() => setActiveService(service.id)}
                className={`relative rounded-[2rem] overflow-hidden cursor-pointer transition-all duration-500 ease-in-out flex flex-col ${isActive ? 'lg:flex-[3] flex-[3]' : 'lg:flex-[1] flex-[1]'}`}
              >
                {/* Background Image */}
                <img 
                  src={service.image} 
                  alt={service.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ${isActive ? 'scale-105' : 'scale-100 grayscale-[30%]'}`}
                />
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 transition-opacity duration-500 ${isActive ? 'bg-gradient-to-t from-[#133020] via-[#133020]/40 to-transparent opacity-90' : 'bg-[#133020]/60 hover:bg-[#133020]/40'}`}></div>

                {/* Content */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md transition-colors duration-300 ${isActive ? 'bg-[#FFB347] text-[#133020]' : 'bg-white/20 text-white'}`}>
                      <service.icon size={24} />
                    </div>
                    <h3 className={`text-3xl md:text-4xl font-bold text-white transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-100 lg:opacity-0 lg:-translate-x-4'}`}>
                      {service.title}
                    </h3>
                  </div>
                  
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isActive ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-[#FFB347] font-medium mb-2 text-lg">{service.subtitle}</p>
                    <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-xl">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Vertical Title for non-active state on desktop */}
                <div className={`hidden lg:flex absolute inset-0 items-center justify-center pointer-events-none transition-all duration-500 ${isActive ? 'opacity-0' : 'opacity-100'}`}>
                  <h3 className="text-3xl font-bold text-white tracking-widest -rotate-90 whitespace-nowrap">
                    {service.title}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};