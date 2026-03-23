import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  ArrowRight,
  Calendar,
  Clock,
  Tag,
  Bookmark,
  BookmarkCheck,
  Search,
  Filter,
  Play,
  Sparkles,
  Users,
  Globe,
  Mic
} from 'lucide-react';
import Squares from './react-bits/Squares';
import { BlurText } from './react-bits/BlurText';
import { SpotlightCard } from './react-bits/SpotlightCard';
import GlassSurface from './react-bits/GlassSurface';
import CardSwap, { Card } from './react-bits/CardSwap';

const newsItems = [
  {
    id: 1,
    title: 'Rootstech 2026: Lifewood Demo Recap',
    category: 'Events',
    date: 'Feb 22, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2000&auto=format&fit=crop',
    excerpt:
      'Highlights from our genealogy data and multilingual archive demo, including the new review workflow.',
    tags: ['Rootstech', 'Launch'],
    team: 'Product'
  },
  {
    id: 2,
    title: 'Q1 Impact Update: Community Training Milestones',
    category: 'Impact',
    date: 'Feb 10, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2000&auto=format&fit=crop',
    excerpt: 'We closed Q1 with 18 new cohorts, 5 new hubs, and 1,300 learners trained.',
    tags: ['Training', 'Growth'],
    team: 'People'
  },
  {
    id: 3,
    title: 'AI Quality Ops: New Review Playbook',
    category: 'Operations',
    date: 'Jan 28, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2000&auto=format&fit=crop',
    excerpt:
      'A practical guide to the updated QA standard, new escalation path, and measurement rubric.',
    tags: ['QA', 'Process'],
    team: 'Ops'
  },
  {
    id: 4,
    title: 'Leadership Offsite: What We Learned',
    category: 'Culture',
    date: 'Jan 15, 2026',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop',
    excerpt: 'Top priorities for Q2 and the leadership behaviors we are doubling down on.',
    tags: ['Leadership', 'Culture'],
    team: 'Leadership'
  },
  {
    id: 5,
    title: 'Ethical AI: Updated Data Stewardship Policy',
    category: 'Compliance',
    date: 'Dec 30, 2025',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop',
    excerpt: 'Policy updates, new audit checkpoints, and the governance checklist now in effect.',
    tags: ['Policy', 'Trust'],
    team: 'Compliance'
  },
  {
    id: 6,
    title: 'Expansion Update: New Hubs in SEA',
    category: 'Expansion',
    date: 'Dec 12, 2025',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop',
    excerpt: 'New delivery hubs launched in Malaysia and Indonesia to support multi-language data.',
    tags: ['SEA', 'Growth'],
    team: 'Expansion'
  }
];

const featuredStories = newsItems.slice(0, 3);

export const InternalNewsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [savedIds, setSavedIds] = useState<number[]>([]);

  const categories = useMemo(() => {
    const unique = Array.from(new Set(newsItems.map(item => item.category)));
    return ['All', ...unique];
  }, []);

  const filteredItems = useMemo(() => {
    return newsItems.filter(item => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesSaved = !showSavedOnly || savedIds.includes(item.id);
      return matchesCategory && matchesSearch && matchesSaved;
    });
  }, [activeCategory, searchQuery, showSavedOnly, savedIds]);

  const toggleSave = (id: number) => {
    setSavedIds(prev => (prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]));
  };

  return (
    <div className="min-h-screen bg-[#F6F4EF] font-sans text-[#102A24] selection:bg-[#F0A541] selection:text-[#102A24]">
      {/* Hero */}
      <section className="relative pt-28 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <Squares
            direction="diagonal"
            speed={0.3}
            borderColor="rgba(16, 42, 36, 0.08)"
            squareSize={46}
            hoverFillColor="rgba(240, 165, 65, 0.2)"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#F6F4EF]/95 via-[#F6F4EF]/85 to-[#F6F4EF]"></div>

        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-14 items-center">
          <div>
            <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-[#2F7C6F] font-semibold">
              <span className="h-px w-10 bg-[#2F7C6F]"></span>
              Internal News
            </div>
            <BlurText
              text="Everything your team needs, in one feed"
              className="mt-6 text-5xl md:text-7xl font-semibold leading-[0.95] text-[#102A24]"
            />
            <p className="mt-7 text-lg md:text-xl text-[#102A24]/70 max-w-xl">
              Catch up on launches, operations updates, and team highlights. Save what matters and share with your pods.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-4 max-w-lg">
              {[
                { icon: Sparkles, label: 'New posts', value: '12 this month' },
                { icon: Users, label: 'Active teams', value: '18 squads' },
                { icon: Globe, label: 'Regions covered', value: '4 hubs' },
                { icon: Mic, label: 'Leadership notes', value: 'Weekly' }
              ].map(item => (
                <GlassSurface
                  key={item.label}
                  width="100%"
                  height="100%"
                  borderRadius={20}
                  className="w-full h-full"
                  backgroundOpacity={0.2}
                  blur={12}
                >
                  <div className="w-full h-full px-4 py-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#2F7C6F]/15 flex items-center justify-center text-[#2F7C6F]">
                      <item.icon size={18} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-[#102A24]/50">{item.label}</p>
                      <p className="text-lg font-semibold text-[#102A24]">{item.value}</p>
                    </div>
                  </div>
                </GlassSurface>
              ))}
            </div>
          </div>

          <SpotlightCard className="relative rounded-[2.5rem] bg-white/75 border border-white/90 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#2F7C6F]/10 via-transparent to-[#F0A541]/15"></div>
            <div className="relative p-8 md:p-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#102A24]/50">Featured Stories</p>
                  <h3 className="text-2xl font-semibold text-[#102A24]">Top reads</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#102A24] text-white flex items-center justify-center">
                  <Play size={18} />
                </div>
              </div>

              <div className="relative h-[360px]">
                <CardSwap cardDistance={55} verticalDistance={60} pauseOnHover className="h-full">
                  {featuredStories.map(item => (
                    <Card key={item.id}>
                      <div className="w-full h-full rounded-[2.2rem] overflow-hidden relative">
                        <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#102A24]/80 via-[#102A24]/30 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                          <p className="text-xs uppercase tracking-[0.2em] text-white/70">{item.category}</p>
                          <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                          <p className="text-sm text-white/80">{item.excerpt}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </CardSwap>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </section>

      {/* Filters */}
      <section className="px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          <SpotlightCard className="rounded-[2rem] bg-white/80 border border-white/90 p-5 shadow-lg">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#102A24]/40" size={18} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search by topic, tag, or team"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#F6F4EF] border border-transparent focus:border-[#F0A541] focus:ring-0 transition"
                />
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#102A24]/50">
                  <Filter size={14} /> Categories
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold border transition ${
                        activeCategory === category
                          ? 'bg-[#2F7C6F] text-white border-[#2F7C6F]'
                          : 'border-[#102A24]/10 text-[#102A24]/70 hover:border-[#102A24]/30'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setShowSavedOnly(prev => !prev)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold border transition ${
                    showSavedOnly
                      ? 'bg-[#102A24] text-white border-[#102A24]'
                      : 'border-[#102A24]/10 text-[#102A24]/70 hover:border-[#102A24]/30'
                  }`}
                >
                  {showSavedOnly ? 'Saved only' : 'Show saved'}
                </button>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </section>

      {/* News Grid */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#102A24]">Latest updates</h2>
            <a href="#" className="hidden md:flex items-center gap-2 text-[#2F7C6F] font-medium">
              View archive <ArrowRight size={16} />
            </a>
          </div>

          {filteredItems.length === 0 ? (
            <div className="rounded-[2rem] bg-white/80 border border-white/90 p-10 text-center text-[#102A24]/70">
              No stories match your filters yet. Try adjusting the search or categories.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                >
                  <SpotlightCard className="h-full rounded-[2rem] bg-white/85 border border-white/90 p-5 shadow-lg flex flex-col">
                    <div className="relative h-44 rounded-[1.5rem] overflow-hidden mb-4">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-[#102A24]/15"></div>
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 text-xs font-semibold text-[#2F7C6F]">
                        {item.category}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-[#102A24]/50 mb-3">
                      <span className="flex items-center gap-1"><Calendar size={14} /> {item.date}</span>
                      <span className="flex items-center gap-1"><Clock size={14} /> {item.readTime}</span>
                    </div>

                    <h3 className="text-xl font-semibold text-[#102A24] mb-2">{item.title}</h3>
                    <p className="text-sm text-[#102A24]/70 mb-4 flex-1">{item.excerpt}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tags.map(tag => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#2F7C6F]/10 text-[#2F7C6F]"
                        >
                          <Tag size={10} /> {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      <button
                        onClick={() => toggleSave(item.id)}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#102A24]/70 hover:text-[#2F7C6F]"
                      >
                        {savedIds.includes(item.id) ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                        {savedIds.includes(item.id) ? 'Saved' : 'Save'}
                      </button>
                      <button className="inline-flex items-center gap-2 text-sm font-semibold text-[#2F7C6F]">
                        Read more
                        <ArrowUpRight size={14} />
                      </button>
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto bg-[#102A24] rounded-[3rem] p-8 md:p-14 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
            <div className="absolute top-[-20%] right-[-10%] w-[520px] h-[520px] rounded-full bg-[#F0A541] blur-[100px]"></div>
            <div className="absolute bottom-[-20%] left-[-10%] w-[460px] h-[460px] rounded-full bg-[#2F7C6F] blur-[100px]"></div>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="md:w-1/2">
              <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6">Subscribe to the internal digest</h2>
              <p className="text-white/70 text-lg leading-relaxed">
                Get the weekly recap of launches, policy changes, and team highlights straight to your inbox.
              </p>
            </div>

            <div className="md:w-1/2 w-full max-w-md">
              <form className="flex flex-col gap-4">
                <input
                  type="email"
                  placeholder="Enter your work email"
                  className="w-full px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:bg-white/20 transition-all"
                />
                <button className="w-full px-8 py-4 bg-[#F0A541] text-[#102A24] font-bold rounded-2xl hover:bg-white transition-colors duration-300">
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
