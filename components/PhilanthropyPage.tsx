import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowUpRight,
  ArrowRight,
  Globe2,
  HandHeart,
  Leaf,
  MapPin,
  Sparkles,
  Users,
  BarChart3,
  BookOpen,
  ShieldCheck,
  LineChart,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';
import Squares from './react-bits/Squares';
import { BlurText } from './react-bits/BlurText';
import MagicBento from './react-bits/MagicBento';
import { SpotlightCard } from './react-bits/SpotlightCard';
import GlassSurface from './react-bits/GlassSurface';
import CardSwap, { Card } from './react-bits/CardSwap';
import Stepper, { Step } from './react-bits/Stepper';

declare global {
  interface Window {
    L: any;
  }
}

type ImpactRegion = {
  id: string;
  name: string;
  focus: string;
  countries: string[];
  center: [number, number];
  zoom: number;
  color: string;
  metrics: { label: string; value: string }[];
  highlights: string[];
};

const IMPACT_REGIONS: ImpactRegion[] = [
  {
    id: 'west-africa',
    name: 'West Africa',
    focus: 'Community learning hubs and inclusive AI training',
    countries: ['Ghana', 'Nigeria', 'Benin', 'Liberia', 'Sierra Leone'],
    center: [8.4, -2.8],
    zoom: 4,
    color: '#2F7C6F',
    metrics: [
      { label: 'Learners Trained', value: '18.4K' },
      { label: 'Local Partners', value: '42' },
      { label: 'Programs Live', value: '16' }
    ],
    highlights: ['Youth-first pathways', 'Women-led cohorts', 'Local language data sets']
  },
  {
    id: 'east-africa',
    name: 'East & Central Africa',
    focus: 'Workforce readiness and leadership acceleration',
    countries: ['Kenya', 'Uganda', 'Tanzania', 'DRC', 'Ethiopia'],
    center: [1.2, 32.5],
    zoom: 4,
    color: '#0E5D4B',
    metrics: [
      { label: 'Career Pathways', value: '24' },
      { label: 'Regional Mentors', value: '310' },
      { label: 'Community Labs', value: '11' }
    ],
    highlights: ['Leadership tracks', 'Local curriculum co-design', 'Rural connectivity pilots']
  },
  {
    id: 'southern-africa',
    name: 'Southern Africa',
    focus: 'Sustainable livelihoods and responsible AI delivery',
    countries: ['South Africa', 'Zimbabwe', 'Zambia', 'Namibia', 'Madagascar'],
    center: [-20.4, 26.6],
    zoom: 4,
    color: '#1F6B5C',
    metrics: [
      { label: 'Jobs Sustained', value: '7.2K' },
      { label: 'Community Projects', value: '28' },
      { label: 'Impact Partners', value: '36' }
    ],
    highlights: ['Green operations', 'Skills-for-employment', 'Equitable wage programs']
  },
  {
    id: 'south-asia',
    name: 'South Asia',
    focus: 'Data excellence and digital inclusion',
    countries: ['India', 'Bangladesh'],
    center: [22.4, 88.0],
    zoom: 4.5,
    color: '#F0A541',
    metrics: [
      { label: 'Students Upskilled', value: '12.1K' },
      { label: 'Community Chapters', value: '19' },
      { label: 'NGO Alliances', value: '27' }
    ],
    highlights: ['STEM scholarships', 'Remote-first training', 'Inclusive data pipelines']
  }
];

const PILLAR_ITEMS = [
  {
    label: 'Education',
    title: 'Future-Ready Skills',
    description: 'Practical AI literacy, job readiness, and leadership development.',
    color: '#102A24',
    image: 'https://images.pexels.com/photos/7742816/pexels-photo-7742816.jpeg?cs=srgb&dl=pexels-a-darmel-7742816.jpg&fm=jpg',
    imageAlt: 'Students using laptops in a classroom with a teacher'
  },
  {
    label: 'Inclusion',
    title: 'Women in AI',
    description: 'Dedicated cohorts, mentorship, and leadership access for women.',
    color: '#163A30',
    image: 'https://images.pexels.com/photos/8545961/pexels-photo-8545961.jpeg?cs=srgb&dl=pexels-karolina-grabowska-8545961.jpg&fm=jpg',
    imageAlt: 'Women collaborating around a laptop'
  },
  {
    label: 'Livelihoods',
    title: 'Sustainable Work',
    description: 'Ethical wage structures and long-term career growth.',
    color: '#0E5D4B',
    image: 'https://images.pexels.com/photos/4480985/pexels-photo-4480985.jpeg?cs=srgb&dl=pexels-tiger-lily-4480985.jpg&fm=jpg',
    imageAlt: 'Warehouse team discussing logistics'
  },
  {
    label: 'Climate',
    title: 'Responsible Ops',
    description: 'Low-impact infrastructure and climate-aware delivery.',
    color: '#1F6B5C',
    image: 'https://images.pexels.com/photos/2673471/pexels-photo-2673471.jpeg?cs=srgb&dl=pexels-amolmande-2673471.jpg&fm=jpg',
    imageAlt: 'Wind turbines at sunset'
  },
  {
    label: 'Partnerships',
    title: 'Local Co-Design',
    description: 'Built with NGOs, governments, and local innovators.',
    color: '#2F7C6F',
    image: 'https://images.pexels.com/photos/5256819/pexels-photo-5256819.jpeg?cs=srgb&dl=pexels-thirdman-5256819.jpg&fm=jpg',
    imageAlt: 'Team hands together in a meeting'
  },
  {
    label: 'Governance',
    title: 'Trust & Safety',
    description: 'Transparent data practices and ethical oversight.',
    color: '#0B3E33',
    image: 'https://images.pexels.com/photos/5483240/pexels-photo-5483240.jpeg?cs=srgb&dl=pexels-cottonbro-5483240.jpg&fm=jpg',
    imageAlt: 'Laptop screen showing cyber security text'
  }
];

const JOURNEY_STEPS = [
  {
    title: 'Listen & Map',
    description: 'We co-design with local partners to map needs, context, and opportunity.'
  },
  {
    title: 'Build & Train',
    description: 'We deliver job pathways, training cohorts, and community infrastructure.'
  },
  {
    title: 'Scale & Sustain',
    description: 'We measure impact, grow leaders, and keep outcomes locally owned.'
  }
];

export const PhilanthropyPage: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<Record<string, any>>({});
  const boundsRef = useRef<any>(null);
  const [activeRegionId, setActiveRegionId] = useState<string>('all');
  const [isJourneyComplete, setIsJourneyComplete] = useState(false);

  const activeRegion = useMemo(
    () => IMPACT_REGIONS.find(region => region.id === activeRegionId),
    [activeRegionId]
  );

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const L = window.L;
    if (!L) return;

    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
      dragging: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false
    }).setView([5, 20], 2.5);

    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    const bounds = L.latLngBounds([]);

    IMPACT_REGIONS.forEach(region => {
      const marker = L.circleMarker(region.center, {
        radius: 9,
        color: region.color,
        weight: 2,
        fillColor: region.color,
        fillOpacity: 0.85,
        className: 'impact-marker'
      }).addTo(map);

      marker.bindTooltip(region.name, { direction: 'top', offset: [0, -8], opacity: 0.9 });
      marker.on('click', () => setActiveRegionId(region.id));

      markersRef.current[region.id] = marker;
      bounds.extend(region.center);
    });

    boundsRef.current = bounds;
    map.fitBounds(bounds, { padding: [60, 60] });
    map.whenReady(() => map.invalidateSize());

    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    resizeObserver.observe(mapContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    map.invalidateSize();
    if (activeRegionId === 'all') {
      if (boundsRef.current) {
        map.fitBounds(boundsRef.current, { padding: [60, 60] });
      }
    } else if (activeRegion) {
      map.flyTo(activeRegion.center, activeRegion.zoom, { duration: 1.3 });
    }

    Object.entries(markersRef.current).forEach(([id, marker]) => {
      const isActive = id === activeRegionId;
      marker.setStyle({
        radius: isActive ? 12 : 9,
        weight: isActive ? 3 : 2,
        fillOpacity: isActive ? 1 : 0.8
      });
    });
    requestAnimationFrame(() => map.invalidateSize());
    const timeoutId = window.setTimeout(() => map.invalidateSize(), 240);
    return () => window.clearTimeout(timeoutId);
  }, [activeRegionId, activeRegion]);

  return (
    <div className="bg-[#F6F4EF] min-h-screen font-sans text-[#102A24] selection:bg-[#F0A541] selection:text-[#102A24] overflow-hidden">
      <style>
        {`
          .impact-marker {
            filter: drop-shadow(0 8px 12px rgba(0,0,0,0.2));
          }
          .impact-marker:after {
            content: '';
            position: absolute;
            left: 50%;
            top: 50%;
            width: 24px;
            height: 24px;
            border-radius: 999px;
            transform: translate(-50%, -50%);
            background: rgba(47, 124, 111, 0.25);
            animation: impactPulse 2.8s ease-out infinite;
          }
          @keyframes impactPulse {
            0% { transform: translate(-50%, -50%) scale(0.6); opacity: 0.9; }
            70% { transform: translate(-50%, -50%) scale(1.6); opacity: 0; }
            100% { opacity: 0; }
          }
        `}
      </style>

      {/* Hero */}
      <section className="relative pt-28 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <Squares
            direction="diagonal"
            speed={0.35}
            borderColor="rgba(16, 42, 36, 0.08)"
            squareSize={46}
            hoverFillColor="rgba(240, 165, 65, 0.18)"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#F6F4EF]/90 via-[#F6F4EF]/80 to-[#F6F4EF]"></div>

        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
          <div>
            <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-[#2F7C6F] font-semibold">
              <span className="h-px w-10 bg-[#2F7C6F]"></span>
              Philanthropy & Impact
            </div>
            <BlurText
              text="Human-first AI for real-world change"
              className="mt-6 text-5xl md:text-7xl font-semibold leading-[0.95] text-[#102A24]"
            />
            <p className="mt-8 text-lg md:text-xl text-[#102A24]/70 max-w-xl">
              We co-create opportunity with communities, invest in local talent, and build long-term economic resilience.
              Our model blends training, employment, and ethical delivery across Africa and South Asia.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#102A24] text-white font-semibold shadow-lg shadow-[#102A24]/20 hover:bg-[#0B1F19] transition"
              >
                Partner With Us
                <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="#impact-map"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#102A24]/15 text-[#102A24] font-semibold hover:border-[#102A24]/40 transition"
              >
                Explore Our Reach
                <ArrowRight size={18} />
              </a>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-4 max-w-lg">
              {[
                { icon: Users, label: 'Community Fellows', value: '32K+' },
                { icon: HandHeart, label: 'Impact Partners', value: '120+' },
                { icon: Globe2, label: 'Countries Reached', value: '22' },
                { icon: Sparkles, label: 'Programs Active', value: '45' }
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

          <SpotlightCard className="relative rounded-[2.5rem] bg-white/70 border border-white/80 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#2F7C6F]/10 via-transparent to-[#F0A541]/15"></div>
            <div className="relative p-8 md:p-10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#102A24]/50">Impact Stories</p>
                  <h3 className="text-2xl font-semibold text-[#102A24]">Community Highlights</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#102A24] text-white flex items-center justify-center">
                  <MapPin size={20} />
                </div>
              </div>

              <div className="relative h-[360px]">
                <CardSwap cardDistance={55} verticalDistance={60} pauseOnHover className="h-full">
                  {[
                    {
                      title: 'Nairobi Learning Hub',
                      body: '1,200 learners completed AI quality assurance training in 6 months.',
                      image:
                        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop'
                    },
                    {
                      title: 'Accra Women Leaders',
                      body: 'Women-led cohort placed into new data stewardship roles.',
                      image:
                        'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop'
                    },
                    {
                      title: 'Dhaka Remote Lab',
                      body: 'Remote-first workstreams improved local income stability.',
                      image:
                        'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1600&auto=format&fit=crop'
                    }
                  ].map(card => (
                    <Card key={card.title}>
                      <div className="w-full h-full rounded-[2.2rem] overflow-hidden relative">
                        <img src={card.image} alt={card.title} className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#102A24]/80 via-[#102A24]/30 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                          <p className="text-xs uppercase tracking-[0.2em] text-white/70">Field Note</p>
                          <h4 className="text-xl font-semibold mb-2">{card.title}</h4>
                          <p className="text-sm text-white/80">{card.body}</p>
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

      {/* Journey */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between flex-wrap gap-6 mb-8"
          >
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[#2F7C6F] font-semibold">Impact Journey</p>
              <h2 className="text-3xl md:text-5xl font-semibold text-[#102A24] mt-3">From listening to long-term lift</h2>
            </div>
            <div className="flex items-center gap-3 text-[#102A24]/70">
              <BarChart3 size={18} />
              <span className="text-sm">Measured outcomes at every step</span>
            </div>
          </motion.div>

          {isJourneyComplete ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[2.5rem] bg-white/80 border border-white/90 shadow-xl p-10"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#2F7C6F] text-white flex items-center justify-center">
                  <CheckCircle2 size={26} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-[#2F7C6F] font-semibold">Journey Complete</p>
                  <h3 className="text-2xl md:text-3xl font-semibold text-[#102A24] mt-2">
                    Thanks for exploring our impact.
                  </h3>
                  <p className="text-[#102A24]/70 mt-2 max-w-2xl">
                    We measure outcomes and reinvest in local leadership so every step builds lasting momentum.
                  </p>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#102A24] text-white font-semibold hover:bg-[#0B1F19] transition"
                >
                  Partner With Us
                  <ArrowUpRight size={18} />
                </a>
                <button
                  onClick={() => setIsJourneyComplete(false)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#102A24]/15 text-[#102A24] font-semibold hover:border-[#102A24]/35 transition"
                >
                  Replay Journey
                  <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          ) : (
            <Stepper
              initialStep={1}
              stepCircleContainerClassName="bg-white/70 border border-white/80"
              contentClassName="bg-white/40 rounded-[2rem]"
              footerClassName="bg-white/0"
              nextButtonText="Next Step"
              onFinalStepCompleted={() => setIsJourneyComplete(true)}
            >
              {JOURNEY_STEPS.map(step => (
                <Step key={step.title}>
                  <div className="grid md:grid-cols-[auto_1fr] gap-6 items-start">
                    <div className="w-14 h-14 rounded-2xl bg-[#2F7C6F]/15 flex items-center justify-center text-[#2F7C6F]">
                      <CheckCircle2 size={22} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-[#102A24]">{step.title}</h3>
                      <p className="text-[#102A24]/70 mt-2 max-w-xl">{step.description}</p>
                    </div>
                  </div>
                </Step>
              ))}
            </Stepper>
          )}
        </div>
      </section>

      {/* Map */}
      <section id="impact-map" className="px-6 pb-28">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[#2F7C6F] font-semibold">Global Footprint</p>
              <h2 className="text-3xl md:text-5xl font-semibold text-[#102A24] mt-3">
                Presence that feels local
              </h2>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#102A24]/60">
              <MapPin size={16} />
              <span>Tap a region to explore</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-[0.95fr_1.3fr] gap-8">
            <div className="space-y-6">
              <SpotlightCard className="rounded-[2rem] bg-white/80 border border-white/90 p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-[#102A24]">Regions</h3>
                  <button
                    onClick={() => setActiveRegionId('all')}
                    className={`text-xs uppercase tracking-[0.2em] font-semibold px-3 py-1 rounded-full border transition ${
                      activeRegionId === 'all'
                        ? 'bg-[#102A24] text-white border-[#102A24]'
                        : 'border-[#102A24]/10 text-[#102A24]/60 hover:border-[#102A24]/30'
                    }`}
                  >
                    View All
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {IMPACT_REGIONS.map(region => (
                    <button
                      key={region.id}
                      onClick={() => setActiveRegionId(region.id)}
                      className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
                        activeRegionId === region.id
                          ? 'bg-[#2F7C6F] text-white border-[#2F7C6F]'
                          : 'border-[#102A24]/10 text-[#102A24]/70 hover:border-[#102A24]/30'
                      }`}
                    >
                      {region.name}
                    </button>
                  ))}
                </div>
              </SpotlightCard>

              <div className="rounded-[2rem] border border-[#102A24]/10 bg-white/80 p-6 shadow-lg">
                {activeRegion ? (
                  <>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-[#2F7C6F] font-semibold">Active Region</p>
                        <h3 className="text-2xl font-semibold text-[#102A24] mt-2">{activeRegion.name}</h3>
                        <p className="text-[#102A24]/70 mt-2">{activeRegion.focus}</p>
                      </div>
                      <div className="w-12 h-12 rounded-2xl bg-[#2F7C6F]/15 flex items-center justify-center text-[#2F7C6F]">
                        <Globe2 size={20} />
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-4">
                      {activeRegion.metrics.map(metric => (
                        <div
                          key={metric.label}
                          className="rounded-2xl bg-[#F6F4EF] border border-[#102A24]/5 px-3 py-4 text-center"
                        >
                          <p className="text-xs uppercase tracking-[0.2em] text-[#102A24]/50">{metric.label}</p>
                          <p className="text-lg font-semibold text-[#102A24] mt-2">{metric.value}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6">
                      <p className="text-xs uppercase tracking-[0.2em] text-[#102A24]/50 mb-2">Countries</p>
                      <div className="flex flex-wrap gap-2">
                        {activeRegion.countries.map(country => (
                          <span
                            key={country}
                            className="px-3 py-1 rounded-full text-xs font-semibold bg-[#2F7C6F]/10 text-[#2F7C6F]"
                          >
                            {country}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 space-y-3">
                      {activeRegion.highlights.map(item => (
                        <div key={item} className="flex items-center gap-3 text-sm text-[#102A24]/70">
                          <span className="w-2 h-2 rounded-full bg-[#F0A541]"></span>
                          {item}
                        </div>
                      ))}
                    </div>

                    <button className="mt-6 w-full py-3 rounded-xl bg-[#102A24] text-white font-semibold flex items-center justify-center gap-2 hover:bg-[#0B1F19] transition">
                      Explore Projects
                      <ArrowRight size={16} />
                    </button>
                  </>
                ) : (
                  <div className="text-[#102A24]/70">Select a region to view details.</div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: BookOpen, title: 'Local Curriculum', value: 'Built with educators' },
                  { icon: ShieldCheck, title: 'Ethical Data', value: 'Transparent practices' },
                  { icon: Leaf, title: 'Green Ops', value: 'Lower footprint delivery' },
                  { icon: LineChart, title: 'Measurable Impact', value: 'Quarterly scorecards' }
                ].map(item => (
                  <div key={item.title} className="rounded-2xl bg-white/80 border border-white/90 p-4 shadow-lg">
                    <div className="w-10 h-10 rounded-full bg-[#2F7C6F]/15 flex items-center justify-center text-[#2F7C6F] mb-3">
                      <item.icon size={18} />
                    </div>
                    <p className="text-sm font-semibold text-[#102A24]">{item.title}</p>
                    <p className="text-xs text-[#102A24]/60 mt-1">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <SpotlightCard className="relative rounded-[2.5rem] bg-white/80 border border-white/90 overflow-hidden shadow-2xl h-[520px] md:h-[560px]">
              <div className="absolute inset-0">
                <div ref={mapContainerRef} className="absolute inset-0 h-full w-full"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#102A24]/10 via-transparent to-transparent pointer-events-none"></div>
              </div>

              <div className="relative p-6 flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-[#2F7C6F] font-semibold">Impact Map</p>
                  <p className="text-sm text-[#102A24]/60 mt-2">Hubs, learning centers, and delivery sites</p>
                </div>
                <button
                  onClick={() => setActiveRegionId('all')}
                  className="px-4 py-2 rounded-full border border-[#102A24]/10 text-sm font-semibold text-[#102A24]/70 hover:border-[#102A24]/30 transition"
                >
                  Reset View
                </button>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="px-6 pb-28">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-6 mb-10">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[#2F7C6F] font-semibold">Impact Pillars</p>
              <h2 className="text-3xl md:text-5xl font-semibold text-[#102A24] mt-3">
                What we invest in
              </h2>
            </div>
            <div className="text-sm text-[#102A24]/60 flex items-center gap-2">
              <HandHeart size={16} />
              Designed for longevity and trust
            </div>
          </div>

          <MagicBento
            items={PILLAR_ITEMS}
            glowColor="47, 124, 111"
            enableTilt
            enableMagnetism
            particleCount={10}
            spotlightRadius={280}
          />
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-6 pb-28">
        <div className="max-w-6xl mx-auto">
          <SpotlightCard className="rounded-[2.8rem] bg-[#102A24] text-white p-10 md:p-14 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute -top-10 -right-10 w-56 h-56 bg-[#F0A541] blur-[90px] rounded-full"></div>
              <div className="absolute bottom-0 left-10 w-56 h-56 bg-[#2F7C6F] blur-[100px] rounded-full"></div>
            </div>
            <div className="relative z-10 grid md:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">Partner With Lifewood</p>
                <h3 className="text-3xl md:text-5xl font-semibold mt-4">Build programs that leave a legacy.</h3>
                <p className="text-white/70 mt-4">
                  Co-invest in local talent pipelines, responsible AI delivery, and measurable community outcomes.
                </p>
              </div>
              <div className="space-y-4">
                {[
                  'Shared impact dashboards',
                  'Local governance frameworks',
                  'Transparent measurement and reporting'
                ].map(item => (
                  <div key={item} className="flex items-center gap-3 text-white/80">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F0A541]"></span>
                    {item}
                  </div>
                ))}
                <a
                  href="#contact"
                  className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-[#102A24] font-semibold hover:bg-[#F6F4EF] transition"
                >
                  Start a Partnership
                  <ArrowUpRight size={18} />
                </a>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </section>
    </div>
  );
};
