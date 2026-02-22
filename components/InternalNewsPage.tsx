import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar, Clock, Tag, ChevronRight, Play } from 'lucide-react';

// Mock data for other news items
const newsItems = [
  {
    id: 1,
    title: "Expanding AI Horizons in Southeast Asia",
    category: "Expansion",
    date: "Oct 12, 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    excerpt: "Lifewood announces new operational hubs in Malaysia and Indonesia to support growing demand for vertical LLM data."
  },
  {
    id: 2,
    title: "The Future of Ethical AI Data Sourcing",
    category: "Thought Leadership",
    date: "Sep 28, 2025",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    excerpt: "How we are setting new standards for fair compensation and ethical treatment of data annotators globally."
  },
  {
    id: 3,
    title: "Q3 2025 Impact Report Released",
    category: "Company News",
    date: "Sep 15, 2025",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    excerpt: "A look back at our community initiatives and the positive impact we've created in developing regions."
  }
];

export const InternalNewsPage: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#f5eedb] font-sans text-[#133020] selection:bg-[#FFB347] selection:text-[#133020]">
      
      {/* Hero Section with Featured Video */}
      <section className="pt-32 pb-16 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-end mb-12">
            <div className="flex-1">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 mb-6"
                >
                    <span className="px-3 py-1 rounded-full border border-[#133020]/20 text-xs font-bold tracking-widest uppercase text-[#046241]">Featured</span>
                    <span className="text-[#133020]/60 text-sm font-medium">Feb 22, 2026</span>
                </motion.div>
                
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-6xl md:text-8xl font-bold tracking-tighter text-[#133020] mb-6 leading-[0.9]"
                >
                    Rootstech <br/>
                    <span className="text-[#046241]">2026.</span>
                </motion.h1>
                
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-[#133020]/70 max-w-xl leading-relaxed"
                >
                    Join us as we unveil our latest advancements in genealogy data processing and multi-language archival preservation.
                </motion.p>
            </div>

            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex gap-4"
            >
                <button className="w-16 h-16 rounded-full border border-[#133020]/10 flex items-center justify-center hover:bg-[#133020] hover:text-white transition-colors duration-300 group">
                    <ArrowUpRight className="group-hover:rotate-45 transition-transform duration-300" />
                </button>
            </motion.div>
        </div>

        {/* Video Container */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border border-[#133020]/5 group"
        >
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/ccyrQ87EJag?si=Lifewood&autoplay=0&controls=1&rel=0" 
              title="Rootstech 2026 Preview" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
              className="absolute inset-0 w-full h-full object-cover"
            ></iframe>
        </motion.div>
      </section>

      {/* Latest News Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-[#133020]/10">
        <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-bold text-[#133020]">Latest Updates</h2>
            <a href="#" className="hidden md:flex items-center gap-2 text-[#046241] font-medium hover:gap-3 transition-all">
                View Archive <ChevronRight size={18} />
            </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsItems.map((item, index) => (
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    onMouseEnter={() => setHoveredCard(item.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className="group cursor-pointer flex flex-col h-full"
                >
                    <div className="relative h-64 rounded-[2rem] overflow-hidden mb-6 bg-gray-200">
                        <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-[#133020]/10 group-hover:bg-[#133020]/0 transition-colors duration-500"></div>
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#046241]">
                            {item.category}
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-[#133020]/50 mb-3 font-medium">
                        <span className="flex items-center gap-1"><Calendar size={14} /> {item.date}</span>
                        <span className="flex items-center gap-1"><Clock size={14} /> {item.readTime}</span>
                    </div>

                    <h3 className="text-2xl font-bold text-[#133020] mb-3 leading-tight group-hover:text-[#046241] transition-colors">
                        {item.title}
                    </h3>
                    
                    <p className="text-[#133020]/70 leading-relaxed mb-6 flex-1">
                        {item.excerpt}
                    </p>

                    <div className="flex items-center gap-2 text-[#046241] font-bold text-sm uppercase tracking-widest group-hover:gap-3 transition-all">
                        Read Article <ArrowUpRight size={16} />
                    </div>
                </motion.div>
            ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto bg-[#133020] rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#FFB347] blur-[100px]"></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#046241] blur-[100px]"></div>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="md:w-1/2">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Stay in the loop.</h2>
                    <p className="text-white/70 text-lg leading-relaxed">
                        Subscribe to our internal newsletter to get the latest updates on projects, company culture, and industry insights delivered to your inbox.
                    </p>
                </div>
                
                <div className="md:w-1/2 w-full max-w-md">
                    <form className="flex flex-col gap-4">
                        <input 
                            type="email" 
                            placeholder="Enter your work email" 
                            className="w-full px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:bg-white/20 transition-all"
                        />
                        <button className="w-full px-8 py-4 bg-[#FFB347] text-[#133020] font-bold rounded-2xl hover:bg-white transition-colors duration-300">
                            Subscribe Now
                        </button>
                    </form>
                </div>
            </div>
        </div>
      </section>

    </div>
  );
};
