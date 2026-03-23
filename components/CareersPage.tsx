import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  ArrowRight,
  MapPin,
  Sparkles,
  Users,
  Zap,
  Globe,
  Heart,
  Rocket,
  CheckCircle2,
  Building2,
  Briefcase,
  Laptop,
  Compass
} from 'lucide-react';
import Squares from './react-bits/Squares';
import { BlurText } from './react-bits/BlurText';
import { SpotlightCard } from './react-bits/SpotlightCard';
import GlassSurface from './react-bits/GlassSurface';
import CardSwap, { Card } from './react-bits/CardSwap';
import Stepper, { Step } from './react-bits/Stepper';

export const CareersPage: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<Record<string, any>>({});
  const boundsRef = useRef<any>(null);
  const [activeHubId, setActiveHubId] = useState<string>('all');
  const [isHiringComplete, setIsHiringComplete] = useState(false);

  const hubs = [
    {
      id: 'manila',
      name: 'Manila, PH',
      focus: 'Ops & Delivery',
      center: [14.5995, 120.9842],
      zoom: 6,
      type: 'Hybrid',
      color: '#2F7C6F',
      roles: ['AI QA Specialist', 'Project Operations Lead']
    },
    {
      id: 'nairobi',
      name: 'Nairobi, KE',
      focus: 'Community Training',
      center: [-1.286389, 36.817223],
      zoom: 6,
      type: 'On-site',
      color: '#0E5D4B',
      roles: ['Training Coordinator', 'Community Manager']
    },
    {
      id: 'accra',
      name: 'Accra, GH',
      focus: 'Talent Programs',
      center: [5.6037, -0.187],
      zoom: 6,
      type: 'Hybrid',
      color: '#1F6B5C',
      roles: ['Learning Designer', 'Recruitment Partner']
    },
    {
      id: 'bangalore',
      name: 'Bengaluru, IN',
      focus: 'AI Delivery',
      center: [12.9716, 77.5946],
      zoom: 6,
      type: 'Remote-first',
      color: '#F0A541',
      roles: ['Data Quality Lead', 'Client Success Analyst']
    }
  ];

  const activeHub = useMemo(() => hubs.find(hub => hub.id === activeHubId), [activeHubId, hubs]);

  const values = [
    { text: 'Mission-led', icon: Rocket },
    { text: 'Human-first', icon: Heart },
    { text: 'Global teams', icon: Globe },
    { text: 'Craft & quality', icon: Sparkles },
    { text: 'Fast-learning', icon: Zap },
    { text: 'Collaborative', icon: Users }
  ];

  const hiringSteps = [
    {
      title: 'Apply & Introduce',
      description: 'Share your story and the work you want to do with our teams.'
    },
    {
      title: 'Meet the Team',
      description: 'Connect with leaders, peers, and the teams you will partner with.'
    },
    {
      title: 'Build the Plan',
      description: 'Align on goals, growth paths, and the impact you will drive.'
    }
  ];

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const L = (window as any).L;
    if (!L) return;

    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
      dragging: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false
    }).setView([8, 20], 2.8);

    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    const bounds = L.latLngBounds([]);

    hubs.forEach(hub => {
      const marker = L.circleMarker(hub.center, {
        radius: 9,
        color: hub.color,
        weight: 2,
        fillColor: hub.color,
        fillOpacity: 0.9,
        className: 'career-marker'
      }).addTo(map);

      marker.bindTooltip(hub.name, { direction: 'top', offset: [0, -8], opacity: 0.9 });
      marker.on('click', () => setActiveHubId(hub.id));

      markersRef.current[hub.id] = marker;
      bounds.extend(hub.center);
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
  }, [hubs]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    map.invalidateSize();
    if (activeHubId === 'all') {
      if (boundsRef.current) {
        map.fitBounds(boundsRef.current, { padding: [60, 60] });
      }
    } else if (activeHub) {
      map.flyTo(activeHub.center, activeHub.zoom, { duration: 1.3 });
    }

    Object.entries(markersRef.current).forEach(([id, marker]) => {
      const isActive = id === activeHubId;
      marker.setStyle({
        radius: isActive ? 12 : 9,
        weight: isActive ? 3 : 2,
        fillOpacity: isActive ? 1 : 0.8
      });
    });

    requestAnimationFrame(() => map.invalidateSize());
    const timeoutId = window.setTimeout(() => map.invalidateSize(), 240);
    return () => window.clearTimeout(timeoutId);
  }, [activeHubId, activeHub]);

  return (
    <div className="bg-[#F6F4EF] min-h-screen font-sans text-[#102A24] selection:bg-[#F0A541] selection:text-[#102A24] overflow-hidden pt-24 pb-20">
      <style>
        {`
          .career-marker {
            filter: drop-shadow(0 8px 12px rgba(0,0,0,0.2));
          }
          .career-marker:after {
            content: '';
            position: absolute;
            left: 50%;
            top: 50%;
            width: 22px;
            height: 22px;
            border-radius: 999px;
            transform: translate(-50%, -50%);
            background: rgba(47, 124, 111, 0.25);
            animation: careerPulse 2.8s ease-out infinite;
          }
          @keyframes careerPulse {
            0% { transform: translate(-50%, -50%) scale(0.6); opacity: 0.9; }
            70% { transform: translate(-50%, -50%) scale(1.6); opacity: 0; }
            100% { opacity: 0; }
          }
        `}
      </style>

      {/* Hero */}
      <section className="relative px-6 pb-24 overflow-hidden">
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

        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
          <div>
            <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-[#2F7C6F] font-semibold">
              <span className="h-px w-10 bg-[#2F7C6F]"></span>
              Careers
            </div>
            <BlurText
              text="Build bold careers with human-first AI"
              className="mt-6 text-5xl md:text-7xl font-semibold leading-[0.95] text-[#102A24]"
            />
            <p className="mt-8 text-lg md:text-xl text-[#102A24]/70 max-w-xl">
              Join global teams shaping responsible AI delivery, workforce opportunity, and long-term impact.
              We grow leaders who move fast and build with care.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#application-form"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#102A24] text-white font-semibold shadow-lg shadow-[#102A24]/20 hover:bg-[#0B1F19] transition"
              >
                Apply Now
                <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="#career-map"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#102A24]/15 text-[#102A24] font-semibold hover:border-[#102A24]/40 transition"
              >
                Explore Locations
                <ArrowRight size={18} />
              </a>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-4 max-w-lg">
              {[
                { icon: Briefcase, label: 'Roles Open', value: '48' },
                { icon: Users, label: 'Team Members', value: '3.2K+' },
                { icon: Laptop, label: 'Remote Friendly', value: '65%' },
                { icon: Building2, label: 'Hubs', value: '14' }
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
                  <p className="text-xs uppercase tracking-[0.2em] text-[#102A24]/50">Team Stories</p>
                  <h3 className="text-2xl font-semibold text-[#102A24]">Life at Lifewood</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#102A24] text-white flex items-center justify-center">
                  <Compass size={20} />
                </div>
              </div>

              <div className="relative h-[360px]">
                <CardSwap cardDistance={55} verticalDistance={60} pauseOnHover className="h-full">
                  {[
                    {
                      title: 'Growth Sprint',
                      body: 'Mentorship circles helped me step into a leadership role within 6 months.',
                      image:
                        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop'
                    },
                    {
                      title: 'Global Collaboration',
                      body: 'We solve problems with teammates across four time zones every day.',
                      image:
                        'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop'
                    },
                    {
                      title: 'Purpose in Practice',
                      body: 'Projects here directly improve local livelihood programs.',
                      image:
                        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop'
                    }
                  ].map(card => (
                    <Card key={card.title}>
                      <div className="w-full h-full rounded-[2.2rem] overflow-hidden relative">
                        <img src={card.image} alt={card.title} className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#102A24]/80 via-[#102A24]/30 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                          <p className="text-xs uppercase tracking-[0.2em] text-white/70">Career Note</p>
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

      {/* Values */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[0.7fr_1.3fr] gap-10 items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#2F7C6F] font-semibold">Our Culture</p>
            <h2 className="text-3xl md:text-5xl font-semibold text-[#102A24] mt-4">A culture that stays human.</h2>
            <p className="text-[#102A24]/70 mt-4">
              We build teams that listen, learn fast, and invest in each other. The work is ambitious and the support is real.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {values.map(item => (
                <div
                  key={item.text}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#102A24]/10 bg-white/80 text-sm font-semibold text-[#102A24]/70"
                >
                  <item.icon size={14} className="text-[#2F7C6F]" />
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                title: 'Learning Budget',
                description: 'Annual stipend for courses, certifications, and conferences.',
                icon: Sparkles
              },
              {
                title: 'Flexible Schedules',
                description: 'Remote-friendly and thoughtful scheduling across regions.',
                icon: Laptop
              },
              {
                title: 'Team Mobility',
                description: 'Opportunities to shift teams, roles, and regions.',
                icon: Globe
              },
              {
                title: 'Wellbeing Focus',
                description: 'Health support and balanced workloads built in.',
                icon: Heart
              }
            ].map(item => (
              <SpotlightCard
                key={item.title}
                className="rounded-[2rem] bg-white/80 border border-white/90 p-6 shadow-lg"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#2F7C6F]/15 flex items-center justify-center text-[#2F7C6F] mb-4">
                  <item.icon size={20} />
                </div>
                <h3 className="text-lg font-semibold text-[#102A24]">{item.title}</h3>
                <p className="text-sm text-[#102A24]/60 mt-2">{item.description}</p>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Journey */}
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
              <p className="text-sm uppercase tracking-[0.3em] text-[#2F7C6F] font-semibold">Hiring Journey</p>
              <h2 className="text-3xl md:text-5xl font-semibold text-[#102A24] mt-3">Fast, clear, human.</h2>
            </div>
            <div className="flex items-center gap-3 text-[#102A24]/70">
              <CheckCircle2 size={18} />
              <span className="text-sm">We keep you updated at every step</span>
            </div>
          </motion.div>

          {isHiringComplete ? (
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
                    Thanks for exploring the process.
                  </h3>
                  <p className="text-[#102A24]/70 mt-2 max-w-2xl">
                    We focus on speed, clarity, and a great candidate experience from start to finish.
                  </p>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#application-form"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#102A24] text-white font-semibold hover:bg-[#0B1F19] transition"
                >
                  Apply Now
                  <ArrowUpRight size={18} />
                </a>
                <button
                  onClick={() => setIsHiringComplete(false)}
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
              onFinalStepCompleted={() => setIsHiringComplete(true)}
            >
              {hiringSteps.map(step => (
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
      <section id="career-map" className="px-6 pb-28">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[#2F7C6F] font-semibold">Career Hubs</p>
              <h2 className="text-3xl md:text-5xl font-semibold text-[#102A24] mt-3">
                Choose where you grow
              </h2>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#102A24]/60">
              <MapPin size={16} />
              <span>Tap a hub to explore</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-[0.95fr_1.3fr] gap-8">
            <div className="space-y-6">
              <SpotlightCard className="rounded-[2rem] bg-white/80 border border-white/90 p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-[#102A24]">Locations</h3>
                  <button
                    onClick={() => setActiveHubId('all')}
                    className={`text-xs uppercase tracking-[0.2em] font-semibold px-3 py-1 rounded-full border transition ${
                      activeHubId === 'all'
                        ? 'bg-[#102A24] text-white border-[#102A24]'
                        : 'border-[#102A24]/10 text-[#102A24]/60 hover:border-[#102A24]/30'
                    }`}
                  >
                    View All
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {hubs.map(hub => (
                    <button
                      key={hub.id}
                      onClick={() => setActiveHubId(hub.id)}
                      className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
                        activeHubId === hub.id
                          ? 'bg-[#2F7C6F] text-white border-[#2F7C6F]'
                          : 'border-[#102A24]/10 text-[#102A24]/70 hover:border-[#102A24]/30'
                      }`}
                    >
                      {hub.name}
                    </button>
                  ))}
                </div>
              </SpotlightCard>

              <div className="rounded-[2rem] border border-[#102A24]/10 bg-white/80 p-6 shadow-lg">
                {activeHub ? (
                  <>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-[#2F7C6F] font-semibold">Active Hub</p>
                        <h3 className="text-2xl font-semibold text-[#102A24] mt-2">{activeHub.name}</h3>
                        <p className="text-[#102A24]/70 mt-2">{activeHub.focus}</p>
                      </div>
                      <div className="w-12 h-12 rounded-2xl bg-[#2F7C6F]/15 flex items-center justify-center text-[#2F7C6F]">
                        <Building2 size={20} />
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div className="rounded-2xl bg-[#F6F4EF] border border-[#102A24]/5 px-4 py-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-[#102A24]/50">Work Style</p>
                        <p className="text-lg font-semibold text-[#102A24] mt-2">{activeHub.type}</p>
                      </div>
                      <div className="rounded-2xl bg-[#F6F4EF] border border-[#102A24]/5 px-4 py-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-[#102A24]/50">Open Roles</p>
                        <p className="text-lg font-semibold text-[#102A24] mt-2">{activeHub.roles.length}</p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <p className="text-xs uppercase tracking-[0.2em] text-[#102A24]/50 mb-2">Focus Roles</p>
                      <div className="flex flex-wrap gap-2">
                        {activeHub.roles.map(role => (
                          <span
                            key={role}
                            className="px-3 py-1 rounded-full text-xs font-semibold bg-[#2F7C6F]/10 text-[#2F7C6F]"
                          >
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button className="mt-6 w-full py-3 rounded-xl bg-[#102A24] text-white font-semibold flex items-center justify-center gap-2 hover:bg-[#0B1F19] transition">
                      Explore Roles
                      <ArrowRight size={16} />
                    </button>
                  </>
                ) : (
                  <div className="text-[#102A24]/70">Select a hub to view details.</div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Briefcase, title: 'Role Matching', value: 'Curated by skill set' },
                  { icon: Users, title: 'Team Pods', value: 'Cross-functional teams' },
                  { icon: Laptop, title: 'Remote Options', value: 'Flexible schedules' },
                  { icon: Sparkles, title: 'Growth Paths', value: 'Quarterly reviews' }
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
                  <p className="text-xs uppercase tracking-[0.3em] text-[#2F7C6F] font-semibold">Career Map</p>
                  <p className="text-sm text-[#102A24]/60 mt-2">Hubs, training centers, and delivery sites</p>
                </div>
                <button
                  onClick={() => setActiveHubId('all')}
                  className="px-4 py-2 rounded-full border border-[#102A24]/10 text-sm font-semibold text-[#102A24]/70 hover:border-[#102A24]/30 transition"
                >
                  Reset View
                </button>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 max-w-6xl mx-auto text-center mb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-[#102A24] rounded-[3rem] p-12 md:p-16 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#2F7C6F] via-transparent to-transparent"></div>
          </div>

          <div className="relative z-10 grid md:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
            <div className="text-left">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">Your Next Chapter</p>
              <h2 className="text-3xl md:text-5xl font-semibold mt-4">Ready to build whats next?</h2>
              <p className="text-white/70 mt-4">
                We are hiring across delivery, operations, training, and client success. Your impact starts here.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <a
                href="#application-form"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-[#102A24] font-semibold hover:bg-[#F6F4EF] transition"
              >
                Apply Now
                <ArrowUpRight size={18} />
              </a>
              <a
                href="#application-status"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/30 text-white font-semibold hover:border-white/60 transition"
              >
                Track Application
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
