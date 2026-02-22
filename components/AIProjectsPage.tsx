import React, { useState, useRef } from 'react';
import { ArrowUpRight, Database, Cpu, Car, MessageSquare, Languages, ScanFace, Dna, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const projects = [
  {
    id: '01',
    title: 'AI Data Extraction',
    icon: Database,
    description: "Leveraging artificial intelligence, we streamline the capture of visual and textual data from diverse origins. Our methods encompass on-location scanning, aerial drone imagery, and strategic partnerships.",
    image: "https://images.unsplash.com/photo-1633526543814-9718c8922b7a?q=80&w=2940&auto=format&fit=crop"
  },
  {
    id: '02',
    title: 'Machine Learning Enablement',
    icon: Cpu,
    description: "Ranging from basic datasets to advanced deep learning inputs, our adaptable data solutions support a vast spectrum of Machine Learning systems, accommodating models of any complexity.",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2940&auto=format&fit=crop"
  },
  {
    id: '03',
    title: 'Autonomous Driving',
    icon: Car,
    description: "Our precision labeling builds the foundation for AI to navigate real-world complexities. We utilize a multifaceted mapping approach involving 2D and 3D models to generate comprehensive cognitive driving systems.",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2940&auto=format&fit=crop"
  },
  {
    id: '04',
    title: 'AI Customer Service',
    icon: MessageSquare,
    description: "AI-driven support is the premier path for delivering fast, personalized, and proactive user experiences. By enhancing engagement, our AI solutions multiply opportunities for growth and retention.",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=2940&auto=format&fit=crop"
  },
  {
    id: '05',
    title: 'NLP & Speech',
    icon: Languages,
    description: "Collaborating with global leaders in NLP, we provide robust solutions across 50+ languages. Our global workforce excels in collecting and transcribing native speaker recordings at scale.",
    image: "https://time.com/redesign/_next/image/?url=https%3A%2F%2Fapi.time.com%2Fwp-content%2Fuploads%2F2023%2F05%2FGettyImages-1367728606.jpg%3Fquality%3D85%26w%3D1800&w=1920&q=75"
  },
  {
    id: '06',
    title: 'Computer Vision',
    icon: ScanFace,
    description: "Teaching AI to perceive the world demands massive amounts of high-quality data. We offer comprehensive Computer Vision solutions—from collection to annotation—enabling machines to interpret visual inputs.",
    image: "https://images.unsplash.com/photo-1561736778-92e52a7769ef?q=80&w=2940&auto=format&fit=crop"
  },
  {
    id: '07',
    title: 'Genealogy',
    icon: Dna,
    description: "With over 18 years of heritage, Lifewood leverages AI to process genealogical records at unprecedented speed and scale. We preserve family histories and archives by capturing, scanning, and indexing diverse record types.",
    image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=2940&auto=format&fit=crop"
  }
];

export const AIProjectsPage: React.FC = () => {
  const [activeProject, setActiveProject] = useState(projects[0]);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div ref={containerRef} className="bg-[#f5eedb] min-h-screen font-sans text-[#133020] selection:bg-[#FFB347] selection:text-[#133020] overflow-hidden pt-32 pb-20">
      
      {/* Header Section */}
      <section className="px-6 max-w-7xl mx-auto mb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3 mb-8"
        >
           <div className="h-[1px] w-12 bg-[#046241]"></div>
           <span className="text-[#046241] font-mono text-sm tracking-widest uppercase font-semibold">Our Portfolio</span>
        </motion.div>
        
        <div className="flex flex-col md:flex-row justify-between items-end gap-12">
           <motion.div
             initial={{ opacity: 0, x: -30 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="max-w-3xl"
           >
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9] text-[#133020]">
                AI Projects <br/>
                <span className="text-[#046241]">& Innovations.</span>
              </h1>
              <p className="text-xl md:text-2xl text-[#133020]/80 leading-relaxed font-light max-w-2xl">
                From constructing multilingual AI datasets to creating platforms that boost efficiency, discover how Lifewood creates the future through innovation.
              </p>
           </motion.div>

           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.8, delay: 0.3 }}
           >
              <a href="#contact" className="group relative px-8 py-4 bg-[#133020] text-white rounded-full font-bold text-lg overflow-hidden flex items-center gap-2 shadow-lg hover:shadow-xl transition-all">
                 <span className="relative z-10 group-hover:text-[#f5eedb] transition-colors duration-300">Start Project</span>
                 <ArrowUpRight className="relative z-10 group-hover:text-[#f5eedb] transition-colors duration-300" size={20} />
                 <div className="absolute inset-0 bg-[#046241] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </a>
           </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="px-6 max-w-7xl mx-auto mb-32">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          
          {/* Left Side - Sticky Image Preview */}
          <div className="hidden lg:block w-1/2 sticky top-32 h-[600px]">
             <AnimatePresence mode="wait">
                <motion.div
                   key={activeProject.id}
                   initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                   animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                   exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                   transition={{ duration: 0.5 }}
                   className="relative w-full h-full rounded-[3rem] overflow-hidden shadow-2xl border border-[#133020]/5"
                >
                   <img 
                     src={activeProject.image} 
                     alt={activeProject.title} 
                     className="absolute inset-0 w-full h-full object-cover"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#133020]/80 via-transparent to-transparent"></div>
                   
                   <div className="absolute bottom-10 left-10 right-10 text-white">
                      <div className="flex items-center gap-3 mb-4">
                         <div className="p-3 bg-[#FFB347] rounded-xl text-[#133020]">
                            <activeProject.icon size={24} />
                         </div>
                         <span className="font-mono text-sm tracking-widest uppercase opacity-80">Project {activeProject.id}</span>
                      </div>
                      <h3 className="text-4xl font-bold mb-4">{activeProject.title}</h3>
                      <p className="text-[#f5eedb]/80 text-lg leading-relaxed line-clamp-3">
                         {activeProject.description}
                      </p>
                   </div>
                </motion.div>
             </AnimatePresence>
          </div>

          {/* Right Side - Project List */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            {projects.map((project) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onMouseEnter={() => setActiveProject(project)}
                onClick={() => setActiveProject(project)}
                className={`
                   group cursor-pointer rounded-[2rem] p-8 transition-all duration-300 border
                   ${activeProject.id === project.id 
                      ? 'bg-[#ffffff] border-[#133020]/5 shadow-xl scale-[1.02]' 
                      : 'bg-[#F9F7F7] border-transparent hover:bg-[#ffffff] hover:shadow-md'
                   }
                `}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                   <div className="flex items-center gap-4">
                      <span className={`font-mono text-sm font-bold ${activeProject.id === project.id ? 'text-[#FFB347]' : 'text-[#133020]/30'}`}>
                         {project.id}
                      </span>
                      <h3 className={`text-2xl font-bold ${activeProject.id === project.id ? 'text-[#133020]' : 'text-[#133020]/60'}`}>
                         {project.title}
                      </h3>
                   </div>
                   <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                      ${activeProject.id === project.id ? 'bg-[#133020] text-white rotate-45' : 'bg-[#133020]/5 text-[#133020] group-hover:bg-[#133020] group-hover:text-white'}
                   `}>
                      <ArrowUpRight size={20} />
                   </div>
                </div>
                
                {/* Description - Hidden on Desktop since it's shown in the sticky preview */}
                <div className={`lg:hidden overflow-hidden transition-all duration-500 ${activeProject.id === project.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                   <p className="text-[#133020]/70 leading-relaxed">
                      {project.description}
                   </p>
                </div>

                {/* Mobile Image (Visible only on small screens when active) */}
                <div className={`lg:hidden overflow-hidden transition-all duration-500 mt-4 ${activeProject.id === project.id ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
                   <img 
                     src={project.image} 
                     alt={project.title} 
                     className="w-full h-48 object-cover rounded-xl"
                   />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section Removed */ }
    </div>
  );
};
