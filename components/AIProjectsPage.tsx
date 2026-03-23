import React, { useRef } from 'react';
import { ArrowUpRight, Database, Cpu, Car, MessageSquare, Languages, ScanFace, Dna } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BlurText } from './react-bits/BlurText';
import { SpotlightCard } from './react-bits/SpotlightCard';
import Squares from './react-bits/Squares';

const projects = [
  {
    id: '01',
    category: 'Data Extraction',
    title: 'AI Data Extraction',
    icon: Database,
    description: "Leveraging artificial intelligence, we streamline the capture of visual and textual data from diverse origins. Our methods encompass on-location scanning, aerial drone imagery, and strategic partnerships.",
    image: "https://images.unsplash.com/photo-1633526543814-9718c8922b7a?q=80&w=2940&auto=format&fit=crop"
  },
  {
    id: '02',
    category: 'Machine Learning',
    title: 'ML Enablement',
    icon: Cpu,
    description: "Ranging from basic datasets to advanced deep learning inputs, our adaptable data solutions support a vast spectrum of Machine Learning systems, accommodating models of any complexity.",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2940&auto=format&fit=crop"
  },
  {
    id: '03',
    category: 'Automotive',
    title: 'Autonomous Driving',
    icon: Car,
    description: "Our precision labeling builds the foundation for AI to navigate real-world complexities. We utilize a multifaceted mapping approach involving 2D and 3D models to generate comprehensive cognitive driving systems.",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2940&auto=format&fit=crop"
  },
  {
    id: '04',
    category: 'Customer Experience',
    title: 'AI Customer Service',
    icon: MessageSquare,
    description: "AI-driven support is the premier path for delivering fast, personalized, and proactive user experiences. By enhancing engagement, our AI solutions multiply opportunities for growth and retention.",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=2940&auto=format&fit=crop"
  },
  {
    id: '05',
    category: 'Linguistics',
    title: 'NLP & Speech',
    icon: Languages,
    description: "Collaborating with global leaders in NLP, we provide robust solutions across 50+ languages. Our global workforce excels in collecting and transcribing native speaker recordings at scale.",
    image: "https://time.com/redesign/_next/image/?url=https%3A%2F%2Fapi.time.com%2Fwp-content%2Fuploads%2F2023%2F05%2FGettyImages-1367728606.jpg%3Fquality%3D85%26w%3D1800&w=1920&q=75"
  },
  {
    id: '06',
    category: 'Visual AI',
    title: 'Computer Vision',
    icon: ScanFace,
    description: "Teaching AI to perceive the world demands massive amounts of high-quality data. We offer comprehensive Computer Vision solutions—from collection to annotation—enabling machines to interpret visual inputs.",
    image: "https://images.unsplash.com/photo-1561736778-92e52a7769ef?q=80&w=2940&auto=format&fit=crop"
  },
  {
    id: '07',
    category: 'Heritage',
    title: 'Genealogy',
    icon: Dna,
    description: "With over 18 years of heritage, Lifewood leverages AI to process genealogical records at unprecedented speed and scale. We preserve family histories and archives by capturing, scanning, and indexing diverse record types.",
    image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=2940&auto=format&fit=crop"
  }
];

const getGridClass = (index: number) => {
  switch (index) {
    case 0: return 'md:col-span-2 lg:col-span-2';
    case 1: return 'md:col-span-1 lg:col-span-1';
    case 2: return 'md:col-span-1 lg:col-span-1';
    case 3: return 'md:col-span-1 lg:col-span-1';
    case 4: return 'md:col-span-1 lg:col-span-1';
    case 5: return 'md:col-span-1 lg:col-span-1';
    case 6: return 'md:col-span-1 lg:col-span-2';
    default: return 'col-span-1';
  }
};

export const AIProjectsPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div ref={containerRef} className="bg-[#f5eedb] min-h-screen font-sans text-[#133020] selection:bg-[#FFB347] selection:text-[#133020] overflow-hidden">
      
      {/* Hero Section with Squares Background */}
      <section className="relative w-full min-h-[70vh] flex items-center justify-center pt-32 pb-20 overflow-hidden">
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

        <div className="relative z-20 px-6 max-w-7xl mx-auto w-full flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#133020]/5 border border-[#133020]/10 text-[#046241] text-sm font-semibold tracking-wider uppercase mb-8 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-[#046241]"></span>
            Our Portfolio
          </motion.div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 leading-[1.1] flex flex-wrap justify-center gap-x-4 md:gap-x-6">
            <BlurText text="AI" delay={0} duration={0.8} className="text-[#133020]" />
            <BlurText text="Projects" delay={0.1} duration={0.8} className="text-[#133020]" />
            <BlurText text="&" delay={0.2} duration={0.8} className="text-[#046241]" />
            <BlurText text="Innovations." delay={0.3} duration={0.8} className="text-[#046241]" />
          </h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-[#133020]/80 leading-relaxed font-light max-w-3xl mx-auto mb-12"
          >
            From constructing multilingual AI datasets to creating platforms that boost efficiency, discover how Lifewood creates the future through innovation.
          </motion.p>
        </div>
      </section>

      {/* Bento Grid Projects Section */}
      <section className="px-6 max-w-7xl mx-auto pb-32 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className={getGridClass(index)}
            >
              <SpotlightCard 
                className="group flex flex-col h-full overflow-hidden rounded-[2rem] bg-white/80 border border-[#133020]/10 shadow-lg hover:shadow-2xl transition-all duration-500"
                spotlightColor="rgba(4, 98, 65, 0.1)"
              >
                <div className="relative h-64 md:h-72 overflow-hidden shrink-0">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                  
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-sm">
                    <project.icon size={16} className="text-[#046241]" />
                    <span className="text-xs font-bold text-[#133020] uppercase tracking-wider">{project.category}</span>
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-grow bg-white/40 backdrop-blur-sm">
                  <h3 className="text-3xl font-bold text-[#133020] mb-4">{project.title}</h3>
                  <p className="text-[#133020]/70 leading-relaxed font-light mb-8 flex-grow text-lg">
                    {project.description}
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between border-t border-[#133020]/10 pt-6">
                    <span className="text-[#046241] font-semibold text-sm uppercase tracking-widest group-hover:text-[#FFB347] transition-colors duration-300">
                      Explore Project
                    </span>
                    <div className="w-12 h-12 rounded-full border border-[#133020]/10 flex items-center justify-center text-[#133020] group-hover:bg-[#046241] group-hover:text-white group-hover:border-[#046241] transition-all duration-300">
                      <ArrowUpRight size={20} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};
