import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Users,
  Clock,
  ArrowRight,
  ArrowUpRight
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import Squares from './react-bits/Squares';
import { BlurText } from './react-bits/BlurText';
import { SpotlightCard } from './react-bits/SpotlightCard';
import GlassSurface from './react-bits/GlassSurface';
import Stepper, { Step } from './react-bits/Stepper';

declare global {
  interface Window {
    L: any;
  }
}

type Office = {
  id: string;
  name: string;
  address: string;
  coords: [number, number];
  phone: string;
  email: string;
  hours: string;
  timezone: string;
  color: string;
};

const OFFICES: Office[] = [
  {
    id: 'cebu',
    name: 'Cebu IT Park, PH',
    address: 'Ground Floor i2 Building, Jose Del Mar Street, Cebu IT Park, Cebu City',
    coords: [10.3309, 123.9063],
    phone: '+63 927 615 5464',
    email: 'hr.lifewood@gmail.com',
    hours: 'Mon-Fri, 9AM-6PM',
    timezone: 'GMT+8',
    color: '#2F7C6F'
  },
  {
    id: 'manila',
    name: 'Manila, PH',
    address: 'Taguig City, Metro Manila',
    coords: [14.5176, 121.0509],
    phone: '+63 2 8831 9000',
    email: 'info@lifewood.com',
    hours: 'Mon-Fri, 9AM-6PM',
    timezone: 'GMT+8',
    color: '#0E5D4B'
  },
  {
    id: 'nairobi',
    name: 'Nairobi, KE',
    address: 'Upper Hill, Nairobi',
    coords: [-1.3009, 36.8053],
    phone: '+254 712 000 000',
    email: 'africa@lifewood.com',
    hours: 'Mon-Fri, 8AM-5PM',
    timezone: 'GMT+3',
    color: '#1F6B5C'
  },
  {
    id: 'bangalore',
    name: 'Bengaluru, IN',
    address: 'Indiranagar, Bengaluru',
    coords: [12.9716, 77.5946],
    phone: '+91 80 4000 0000',
    email: 'india@lifewood.com',
    hours: 'Mon-Fri, 9AM-6PM',
    timezone: 'GMT+5:30',
    color: '#F0A541'
  }
];

export const ContactUsPage: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<Record<string, any>>({});
  const boundsRef = useRef<any>(null);

  const [activeOfficeId, setActiveOfficeId] = useState<string>(OFFICES[0].id);
  const [isStepperComplete, setIsStepperComplete] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    topic: 'Partnerships',
    preferredContact: 'Email',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const activeOffice = useMemo(
    () => OFFICES.find(office => office.id === activeOfficeId) || OFFICES[0],
    [activeOfficeId]
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const capitalizeFirst = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return value;
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
  };

  const capitalizeWords = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return value;
    return trimmed
      .toLowerCase()
      .replace(/(^|[\s-])([a-z])/g, (_, p1: string, p2: string) => `${p1}${p2.toUpperCase()}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    try {
      const { error } = await supabase.from('feedback_messages').insert([
        {
          first_name: capitalizeWords(formData.firstName),
          last_name: capitalizeWords(formData.lastName),
          email: formData.email.trim().toLowerCase(),
          company: formData.company ? capitalizeWords(formData.company) : null,
          topic: formData.topic,
          preferred_contact: formData.preferredContact,
          message: capitalizeFirst(formData.message)
        }
      ]);

      if (error) {
        if (error.code === '42P01') {
          throw new Error('The "feedback_messages" table does not exist in the database. Please create it in Supabase.');
        }
        if (error.code === '42501' || error.message.includes('row-level security')) {
          throw new Error('Permission denied. Please disable RLS or add an INSERT policy for the "feedback_messages" table in Supabase.');
        }
        throw error;
      }

      setSubmitSuccess(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        topic: 'Partnerships',
        preferredContact: 'Email',
        message: ''
      });
    } catch (err: any) {
      console.error('Error submitting feedback:', err);
      setSubmitError(err.message || 'An error occurred while sending your message.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
    }).setView([8, 20], 3);

    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    const bounds = L.latLngBounds([]);

    OFFICES.forEach(office => {
      const marker = L.circleMarker(office.coords, {
        radius: 9,
        color: office.color,
        weight: 2,
        fillColor: office.color,
        fillOpacity: 0.9,
        className: 'contact-marker'
      }).addTo(map);

      marker.bindTooltip(office.name, { direction: 'top', offset: [0, -8], opacity: 0.9 });
      marker.on('click', () => setActiveOfficeId(office.id));

      markersRef.current[office.id] = marker;
      bounds.extend(office.coords);
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
    if (activeOfficeId && activeOffice) {
      map.flyTo(activeOffice.coords, 5.5, { duration: 1.2 });
    }

    Object.entries(markersRef.current).forEach(([id, marker]) => {
      const isActive = id === activeOfficeId;
      marker.setStyle({
        radius: isActive ? 12 : 9,
        weight: isActive ? 3 : 2,
        fillOpacity: isActive ? 1 : 0.8
      });
    });

    requestAnimationFrame(() => map.invalidateSize());
    const timeoutId = window.setTimeout(() => map.invalidateSize(), 240);
    return () => window.clearTimeout(timeoutId);
  }, [activeOfficeId, activeOffice]);

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#F6F4EF] text-[#102A24] overflow-hidden">
      <style>
        {`
          .contact-marker {
            filter: drop-shadow(0 8px 12px rgba(0,0,0,0.2));
          }
          .contact-marker:after {
            content: '';
            position: absolute;
            left: 50%;
            top: 50%;
            width: 22px;
            height: 22px;
            border-radius: 999px;
            transform: translate(-50%, -50%);
            background: rgba(47, 124, 111, 0.2);
            animation: contactPulse 2.8s ease-out infinite;
          }
          @keyframes contactPulse {
            0% { transform: translate(-50%, -50%) scale(0.6); opacity: 0.9; }
            70% { transform: translate(-50%, -50%) scale(1.6); opacity: 0; }
            100% { opacity: 0; }
          }
        `}
      </style>

      <section className="relative px-6 pb-16 overflow-hidden">
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

        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-[#2F7C6F] font-semibold">
              <span className="h-px w-10 bg-[#2F7C6F]"></span>
              Contact Us
            </div>
            <BlurText
              text="Lets build the right connection"
              className="mt-6 text-5xl md:text-7xl font-semibold leading-[0.95] text-[#102A24]"
            />
            <p className="mt-6 text-lg md:text-xl text-[#102A24]/70 max-w-xl">
              Talk to our teams about partnerships, delivery, or careers. We respond fast and make it easy to
              connect with the right people.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-4 max-w-lg">
              {[
                { icon: MessageSquare, label: 'Avg response', value: '< 24 hrs' },
                { icon: Users, label: 'Teams available', value: '4 regions' },
                { icon: Clock, label: 'Business hours', value: 'Mon-Fri' },
                { icon: Mail, label: 'Contact options', value: 'Email + Phone' }
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
            <div className="relative p-8 md:p-10 space-y-6">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#2F7C6F] font-semibold">Quick links</p>
                <h3 className="text-2xl font-semibold text-[#102A24] mt-2">Talk to the right team</h3>
              </div>
              <div className="grid gap-4">
                {[
                  { title: 'Partnerships', description: 'Co-build programs and delivery pipelines.' },
                  { title: 'Support', description: 'Get help with active projects or requests.' },
                  { title: 'Careers', description: 'Open roles, referrals, and applications.' }
                ].map(item => (
                  <div key={item.title} className="rounded-2xl border border-[#102A24]/10 bg-white/80 p-4">
                    <p className="text-sm uppercase tracking-[0.2em] text-[#102A24]/50">{item.title}</p>
                    <p className="text-[#102A24] font-semibold mt-1">{item.description}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 text-[#102A24]/70">
                <MapPin size={16} />
                <span>Visit any hub or book a virtual meeting.</span>
              </div>
              <a
                href="#contact-form"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#102A24] text-white font-semibold hover:bg-[#0B1F19] transition"
              >
                Start the conversation
                <ArrowUpRight size={18} />
              </a>
            </div>
          </SpotlightCard>
        </div>
      </section>

      <section id="contact-form" className="px-6 pb-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-start">
          <SpotlightCard className="rounded-[2.5rem] bg-white/80 border border-white/90 p-8 md:p-10 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {submitSuccess && (
                <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-start gap-3">
                  <CheckCircle2 size={20} className="shrink-0 mt-0.5" />
                  <p className="text-sm">Thank you for reaching out! Your message has been sent successfully.</p>
                </div>
              )}

              {submitError && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-start gap-3">
                  <AlertCircle size={20} className="shrink-0 mt-0.5" />
                  <p className="text-sm">{submitError}</p>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium text-[#102A24]">First name</label>
                  <input
                    type="text"
                    id="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-transparent focus:border-[#F0A541] focus:ring-0 transition-colors"
                    placeholder="Jane"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium text-[#102A24]">Last name</label>
                  <input
                    type="text"
                    id="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-transparent focus:border-[#F0A541] focus:ring-0 transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-[#102A24]">Email address</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-transparent focus:border-[#F0A541] focus:ring-0 transition-colors"
                    placeholder="jane@company.com"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium text-[#102A24]">Company (optional)</label>
                  <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-transparent focus:border-[#F0A541] focus:ring-0 transition-colors"
                    placeholder="Your organization"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="topic" className="text-sm font-medium text-[#102A24]">How can we help?</label>
                  <select
                    id="topic"
                    value={formData.topic}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-transparent focus:border-[#F0A541] focus:ring-0 transition-colors"
                  >
                    {['Partnerships', 'Support', 'Careers', 'Media', 'Other'].map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="preferredContact" className="text-sm font-medium text-[#102A24]">Preferred contact</label>
                  <select
                    id="preferredContact"
                    value={formData.preferredContact}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-transparent focus:border-[#F0A541] focus:ring-0 transition-colors"
                  >
                    {['Email', 'Phone', 'WhatsApp'].map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-[#102A24]">Message</label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-transparent focus:border-[#F0A541] focus:ring-0 transition-colors resize-none"
                  placeholder="Tell us about your project or request..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#102A24] text-white rounded-xl font-semibold hover:bg-[#2F7C6F] transition-colors flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </SpotlightCard>

          <div className="space-y-6">
            <div className="rounded-[2.5rem] bg-white/80 border border-white/90 p-6 shadow-lg">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-[#2F7C6F] font-semibold">Active office</p>
                  <h3 className="text-2xl font-semibold text-[#102A24] mt-2">{activeOffice.name}</h3>
                  <p className="text-[#102A24]/70 mt-2">{activeOffice.address}</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-[#2F7C6F]/15 flex items-center justify-center text-[#2F7C6F]">
                  <MapPin size={20} />
                </div>
              </div>

              <div className="mt-6 grid gap-3">
                <div className="flex items-center gap-3 text-[#102A24]/70">
                  <Phone size={16} />
                  <span>{activeOffice.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-[#102A24]/70">
                  <Mail size={16} />
                  <span>{activeOffice.email}</span>
                </div>
                <div className="flex items-center gap-3 text-[#102A24]/70">
                  <Clock size={16} />
                  <span>{activeOffice.hours} ({activeOffice.timezone})</span>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {OFFICES.map(office => (
                  <button
                    key={office.id}
                    onClick={() => setActiveOfficeId(office.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
                      activeOfficeId === office.id
                        ? 'bg-[#2F7C6F] text-white border-[#2F7C6F]'
                        : 'border-[#102A24]/10 text-[#102A24]/70 hover:border-[#102A24]/30'
                    }`}
                  >
                    {office.name}
                  </button>
                ))}
              </div>
            </div>

            <SpotlightCard className="rounded-[2.5rem] bg-white/80 border border-white/90 p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-[#2F7C6F] font-semibold">Response timeline</p>
                  <h3 className="text-xl font-semibold text-[#102A24] mt-2">What happens next</h3>
                </div>
                <MessageSquare size={18} className="text-[#2F7C6F]" />
              </div>

              {isStepperComplete ? (
                <div className="rounded-2xl bg-[#F6F4EF] border border-[#102A24]/10 p-5">
                  <p className="text-sm text-[#102A24]/70">
                    You are all set. We will reach out to confirm the best next step and connect you with the right team.
                  </p>
                  <button
                    onClick={() => setIsStepperComplete(false)}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#2F7C6F]"
                  >
                    Replay steps
                    <ArrowRight size={14} />
                  </button>
                </div>
              ) : (
                <Stepper
                  initialStep={1}
                  stepCircleContainerClassName="bg-white/70 border border-white/80"
                  contentClassName="bg-white/40 rounded-[1.8rem]"
                  footerClassName="bg-white/0"
                  nextButtonText="Next"
                  onFinalStepCompleted={() => setIsStepperComplete(true)}
                >
                  {[
                    {
                      title: 'We confirm receipt',
                      description: 'You will receive a reply within one business day.'
                    },
                    {
                      title: 'We route to a lead',
                      description: 'Your request is matched to the right team member.'
                    },
                    {
                      title: 'We propose next steps',
                      description: 'We share a plan, timeline, and quick kickoff options.'
                    }
                  ].map(step => (
                    <Step key={step.title}>
                      <div className="space-y-3">
                        <h4 className="text-lg font-semibold text-[#102A24]">{step.title}</h4>
                        <p className="text-sm text-[#102A24]/70">{step.description}</p>
                      </div>
                    </Step>
                  ))}
                </Stepper>
              )}
            </SpotlightCard>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.3fr_0.7fr] gap-10 items-center">
          <SpotlightCard className="relative rounded-[2.5rem] bg-white/80 border border-white/90 overflow-hidden shadow-2xl h-[420px]">
            <div className="absolute inset-0">
              <div ref={mapContainerRef} className="absolute inset-0 h-full w-full"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#102A24]/10 via-transparent to-transparent pointer-events-none"></div>
            </div>
            <div className="relative p-6 flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#2F7C6F] font-semibold">Office Map</p>
                <p className="text-sm text-[#102A24]/60 mt-2">Find the closest Lifewood hub.</p>
              </div>
              <button
                onClick={() => setActiveOfficeId(OFFICES[0].id)}
                className="px-4 py-2 rounded-full border border-[#102A24]/10 text-sm font-semibold text-[#102A24]/70 hover:border-[#102A24]/30 transition"
              >
                Reset View
              </button>
            </div>
          </SpotlightCard>

          <div className="space-y-6">
            <div className="rounded-[2rem] bg-[#102A24] text-white p-6 shadow-xl">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">Need a faster reply?</p>
              <h3 className="text-2xl font-semibold mt-3">Book a 20-min intro call.</h3>
              <p className="text-white/70 mt-3">
                Our team can help you scope the right path for partnership, careers, or support needs.
              </p>
              <a
                href="#contact-form"
                className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-[#102A24] font-semibold hover:bg-[#F6F4EF] transition"
              >
                Schedule a call
                <ArrowUpRight size={16} />
              </a>
            </div>

            <div className="rounded-[2rem] bg-white/80 border border-white/90 p-6 shadow-lg">
              <h4 className="text-lg font-semibold text-[#102A24]">Other ways to connect</h4>
              <div className="mt-4 space-y-3 text-[#102A24]/70">
                <div className="flex items-center gap-3">
                  <Mail size={16} />
                  hr.lifewood@gmail.com
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={16} />
                  +63 927 615 5464
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={16} />
                  Cebu IT Park, Cebu City
                </div>
              </div>
              <a
                href="#application-status"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#2F7C6F]"
              >
                Track an application
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
