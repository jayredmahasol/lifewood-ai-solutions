import React from 'react';
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
  return (
    <section className="py-28 px-6 bg-gradient-to-b from-white via-[#f9f7f1] to-white text-[#133020] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-3xl">
            <div className="flex justify-center lg:justify-start mb-6">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white border border-[#133020]/10 text-[#133020] text-xs font-semibold tracking-wider uppercase shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#046241]"></span>
                Our Expertise
              </div>
            </div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 tracking-tight text-[#133020]"
            >
              AI Data Services
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg text-[#133020]/60 leading-relaxed"
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
            <a href="#ai-services" className="group flex items-center gap-3 px-8 py-4 bg-[#133020] text-white rounded-full font-bold hover:bg-[#046241] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
              <span>Explore Services</span>
              <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white border border-[#133020]/10 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#046241]/10 text-[#046241] flex items-center justify-center">
                    <service.icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#133020]">{service.title}</h3>
                    <p className="text-sm text-[#133020]/50">{service.subtitle}</p>
                  </div>
                </div>
                <p className="text-sm text-[#133020]/60 leading-relaxed">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
