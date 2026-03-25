import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Search,
  Loader2,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Mail,
  Briefcase,
  Calendar,
  User
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import Squares from './react-bits/Squares';
import { BlurText } from './react-bits/BlurText';
import { SpotlightCard } from './react-bits/SpotlightCard';
import GlassSurface from './react-bits/GlassSurface';
import Stepper, { Step } from './react-bits/Stepper';

const STATUS_COPY: Record<string, { label: string; message: string }> = {
  pending: {
    label: 'Pending Review',
    message: 'Your application is with our hiring team for initial review.'
  },
  interview: {
    label: 'Interview',
    message: 'We are scheduling interviews with the hiring team.'
  },
  hired: {
    label: 'Offer Extended',
    message: 'Congrats! We are preparing the next steps and documents.'
  },
  approved: {
    label: 'Offer Extended',
    message: 'Congrats! We are preparing the next steps and documents.'
  },
  rejected: {
    label: 'Not Selected',
    message: 'We appreciate your time. Another role may be a better fit.'
  }
};

export const ApplicationStatusPage: React.FC = () => {
  const [applicationId, setApplicationId] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [applicationData, setApplicationData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicationId.trim()) return;

    setIsSearching(true);
    setError(null);
    setApplicationData(null);

    try {
      const { data, error } = await supabase
        .from('applicants')
        .select('*')
        .eq('unique_id', applicationId.trim())
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          setError('Application not found. Please check your ID and try again.');
        } else {
          throw error;
        }
      } else if (data) {
        setApplicationData(data);
      }
    } catch (err) {
      console.error('Error fetching application:', err);
      setError('Could not connect to database. Please try again later.');
    } finally {
      setIsSearching(false);
    }
  };

  const statusKey = useMemo(() => {
    const raw = applicationData?.status?.toLowerCase() || 'pending';
    if (raw.includes('interview')) return 'interview';
    if (raw.includes('reject') || raw.includes('fail')) return 'rejected';
    if (raw.includes('approve') || raw.includes('hire')) return 'hired';
    return 'pending';
  }, [applicationData]);

  const statusMeta = STATUS_COPY[statusKey];

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'approved':
      case 'hired':
        return <CheckCircle className="text-green-500" size={24} />;
      case 'rejected':
      case 'failed':
        return <XCircle className="text-red-500" size={24} />;
      case 'interview':
        return <AlertCircle className="text-blue-500" size={24} />;
      default:
        return <Clock className="text-[#F0A541]" size={24} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'approved':
      case 'hired':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'interview':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-[#F0A541]/20 text-[#102A24] border-[#F0A541]/30';
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F4EF] pt-28 pb-20 px-6 font-sans text-[#102A24] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <Squares
          direction="diagonal"
          speed={0.25}
          borderColor="rgba(16, 42, 36, 0.08)"
          squareSize={46}
          hoverFillColor="rgba(240, 165, 65, 0.2)"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#F6F4EF]/95 via-[#F6F4EF]/85 to-[#F6F4EF]"></div>

      <div className="relative max-w-6xl mx-auto">
        <a
          href="#careers"
          className="inline-flex items-center gap-2 text-[#102A24]/60 hover:text-[#2F7C6F] transition-colors mb-8 font-medium"
        >
          <ArrowLeft size={20} />
          Back to Careers
        </a>

        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-start">
          <SpotlightCard className="rounded-[2.8rem] bg-white/80 border border-white/90 p-8 md:p-12 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F0A541] rounded-full blur-[90px] opacity-10 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <div className="relative z-10">
              <BlurText
                text="Track your application in seconds"
                className="text-3xl md:text-5xl font-semibold leading-tight text-[#102A24] mb-4"
              />
              <p className="text-[#102A24]/70 mb-8">
                Enter your unique Application ID to see your current stage, timeline, and next steps.
              </p>

              <form onSubmit={handleSearch} className="mb-10">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#102A24]/40" size={20} />
                    <input
                      type="text"
                      value={applicationId}
                      onChange={e => setApplicationId(e.target.value)}
                      placeholder="e.g. APP-A1B2C3"
                      className="w-full bg-[#F6F4EF] border border-[#102A24]/10 rounded-xl py-4 pl-12 pr-4 text-[#102A24] outline-none focus:border-[#2F7C6F] focus:ring-2 focus:ring-[#2F7C6F]/20 transition-all font-mono uppercase"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSearching || !applicationId.trim()}
                    className="px-8 py-4 bg-[#102A24] text-white rounded-xl font-bold hover:bg-[#2F7C6F] transition-colors shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[160px]"
                  >
                    {isSearching ? <Loader2 size={20} className="animate-spin" /> : 'Check Status'}
                  </button>
                </div>
              </form>

              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl flex items-start gap-3"
                  >
                    <AlertCircle size={20} className="mt-0.5" />
                    <p>{error}</p>
                  </motion.div>
                )}

                {applicationData && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-[#F6F4EF] border border-[#102A24]/10 rounded-2xl p-6 md:p-8"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-[#102A24]/10 pb-6">
                      <div>
                        <p className="text-sm text-[#102A24]/50 uppercase tracking-wider font-bold mb-1">Application ID</p>
                        <p className="text-2xl font-mono font-bold text-[#102A24]">{applicationData.unique_id}</p>
                      </div>
                      <div className={`px-4 py-2 rounded-full border flex items-center gap-2 ${getStatusColor(applicationData.status || 'Pending Review')}`}>
                        {getStatusIcon(applicationData.status || 'Pending Review')}
                        <span className="font-bold">{applicationData.status || 'Pending Review'}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="rounded-2xl border border-[#102A24]/10 bg-white/70 p-4 flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#2F7C6F]/15 text-[#2F7C6F] flex items-center justify-center">
                          <User size={18} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-[#102A24]/50 uppercase tracking-wider font-bold mb-1">Applicant Name</p>
                          <p className="text-lg font-semibold text-[#102A24]">
                            {applicationData.first_name} {applicationData.last_name}
                          </p>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-[#102A24]/10 bg-white/70 p-4 flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#F0A541]/20 text-[#C97908] flex items-center justify-center">
                          <Briefcase size={18} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-[#102A24]/50 uppercase tracking-wider font-bold mb-1">Position Applied</p>
                          <p className="text-lg font-semibold text-[#102A24]">{applicationData.position_applied}</p>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-[#102A24]/10 bg-white/70 p-4 flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#2F7C6F]/15 text-[#2F7C6F] flex items-center justify-center">
                          <Mail size={18} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-[#102A24]/50 uppercase tracking-wider font-bold mb-1">Email Address</p>
                          <p className="text-base md:text-lg font-semibold text-[#102A24] break-all">{applicationData.email}</p>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-[#102A24]/10 bg-white/70 p-4 flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#102A24]/10 text-[#102A24] flex items-center justify-center">
                          <Calendar size={18} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-[#102A24]/50 uppercase tracking-wider font-bold mb-1">Date Applied</p>
                          <p className="text-lg font-semibold text-[#102A24]">
                            {applicationData.created_at ? new Date(applicationData.created_at).toLocaleDateString() : 'Recently'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 rounded-2xl bg-white/80 border border-white/90 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-[#2F7C6F] font-semibold">Status note</p>
                      <p className="text-[#102A24]/70 mt-2">{statusMeta.message}</p>
                    </div>

                    {statusKey === 'rejected' && applicationData.rejection_reason && (
                      <div className="mt-6 p-5 bg-red-50 border border-red-100 rounded-xl">
                        <p className="text-sm font-bold text-red-800 mb-2 uppercase tracking-wider">Message from Recruitment</p>
                        <p className="text-red-700 leading-relaxed">{applicationData.rejection_reason}</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </SpotlightCard>

          <div className="space-y-6">
            <SpotlightCard className="rounded-[2.5rem] bg-white/80 border border-white/90 p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-[#2F7C6F] font-semibold">Processing timeline</p>
                  <h3 className="text-2xl font-semibold text-[#102A24] mt-2">What to expect</h3>
                </div>
                <ShieldCheck size={20} className="text-[#2F7C6F]" />
              </div>

              <Stepper
                initialStep={1}
                stepCircleContainerClassName="bg-white/70 border border-white/80"
                contentClassName="bg-white/40 rounded-[1.8rem]"
                footerClassName="bg-white/0"
                nextButtonText="Next"
              >
                {[
                  {
                    title: 'Submission received',
                    description: 'We confirm receipt within 24 hours.'
                  },
                  {
                    title: 'Hiring review',
                    description: 'Our team reviews your profile and role fit.'
                  },
                  {
                    title: 'Next steps shared',
                    description: 'We outline interviews or additional steps.'
                  }
                ].map(step => (
                  <Step key={step.title}>
                    <div className="space-y-2">
                      <h4 className="text-lg font-semibold text-[#102A24]">{step.title}</h4>
                      <p className="text-sm text-[#102A24]/70">{step.description}</p>
                    </div>
                  </Step>
                ))}
              </Stepper>
            </SpotlightCard>

            <SpotlightCard className="rounded-[2.5rem] bg-white/80 border border-white/90 p-6 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#2F7C6F]/15 flex items-center justify-center text-[#2F7C6F]">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm text-[#102A24]/60">Need help?</p>
                  <p className="text-lg font-semibold text-[#102A24]">careers@lifewood.com</p>
                </div>
              </div>
              <p className="text-sm text-[#102A24]/60 mt-4">
                Contact our recruiting team for updates or corrections to your application.
              </p>
              <a href="#contact" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#2F7C6F]">
                Contact support
                <ArrowRight size={14} />
              </a>
            </SpotlightCard>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Briefcase, label: 'Role', value: 'Global hiring' },
                { icon: Calendar, label: 'Reviews', value: 'Weekly' },
                { icon: Mail, label: 'Updates', value: 'Email alerts' },
                { icon: ShieldCheck, label: 'Security', value: 'Private data' }
              ].map(item => (
                <GlassSurface
                  key={item.label}
                  width="100%"
                  height="100%"
                  borderRadius={18}
                  className="w-full h-full"
                  backgroundOpacity={0.2}
                  blur={10}
                >
                  <div className="w-full h-full px-4 py-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#2F7C6F]/15 flex items-center justify-center text-[#2F7C6F]">
                      <item.icon size={16} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-[#102A24]/50">{item.label}</p>
                      <p className="text-base font-semibold text-[#102A24]">{item.value}</p>
                    </div>
                  </div>
                </GlassSurface>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
