import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, ShieldCheck, LayoutDashboard, ListTodo, 
  BarChart2, Activity, HelpCircle, PlayCircle,
  CheckCircle2, Clock, AlertCircle, ChevronRight,
  User, Settings, FileText, Lock, Briefcase
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

// --- Types ---
interface Workstream {
  id: string;
  name: string;
  status: 'In Progress' | 'Pending QA' | 'Completed';
  completionRate: number;
}

// --- Mock Data ---
const MOCK_WORKSTREAMS: Workstream[] = [
  { id: '1', name: 'Project Hercules - Video Annotation', status: 'In Progress', completionRate: 68 },
  { id: '2', name: 'Project Titan - Audio Transcription', status: 'Pending QA', completionRate: 92 },
  { id: '3', name: 'Project Apollo - Image Classification', status: 'In Progress', completionRate: 45 },
];

export const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [applicant, setApplicant] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const user = session?.user;
        if (user) {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
          
          const { data: applicantData } = await supabase
            .from('applicants')
            .select('*')
            .eq('email', user.email)
            .single();

          if (applicantData) {
            setApplicant(applicantData);
          }

          if (!error && data) {
            setProfile(data);
          } else {
            setProfile({
              first_name: user.user_metadata?.full_name?.split(' ')[0] || 'User',
              last_name: user.user_metadata?.full_name?.split(' ').slice(1).join(' ') || '',
              email: user.email
            });
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // --- Components ---

  const StatusBadge: React.FC<{ status: Workstream['status'] }> = ({ status }) => {
    let colorClass = '';
    let dotClass = '';
    switch (status) {
      case 'In Progress':
        colorClass = 'bg-[#046241]/10 text-[#046241] border-[#046241]/20';
        dotClass = 'bg-[#046241]';
        break;
      case 'Pending QA':
        colorClass = 'bg-[#FFB347]/20 text-[#133020] border-[#FFB347]/40';
        dotClass = 'bg-[#FFB347]';
        break;
      case 'Completed':
        colorClass = 'bg-[#133020]/10 text-[#133020] border-[#133020]/20';
        dotClass = 'bg-[#133020]';
        break;
    }
    return (
      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-bold tracking-wide ${colorClass}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${dotClass} animate-pulse`} />
        {status}
      </div>
    );
  };

  const WorkstreamCard: React.FC<{ workstream: Workstream }> = ({ workstream }) => (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-[#133020]/10 rounded-2xl p-6 flex flex-col gap-6 hover:border-[#046241]/30 hover:shadow-lg hover:shadow-[#046241]/5 transition-all"
    >
      <div className="flex justify-between items-start gap-4">
        <h4 className="text-[#133020] font-bold text-lg leading-tight">{workstream.name}</h4>
        <StatusBadge status={workstream.status} />
      </div>
      
      <div className="flex-1 flex flex-col justify-end gap-5">
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold text-[#133020]/60 uppercase tracking-wider">
            <span>Progress</span>
            <span className="text-[#046241]">{workstream.completionRate}%</span>
          </div>
          <div className="w-full h-2 bg-[#F9F7F7] rounded-full overflow-hidden inset-shadow-sm">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${workstream.completionRate}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-[#046241] rounded-full"
            />
          </div>
        </div>

        <button className="w-full py-3 rounded-xl border border-[#133020]/10 text-[#133020] font-bold text-sm hover:bg-[#046241] hover:border-[#046241] hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
          {workstream.status === 'In Progress' ? (
            <>
              <PlayCircle size={18} />
              Enter Workspace
            </>
          ) : (
            <>
              <FileText size={18} />
              Review Task
            </>
          )}
        </button>
      </div>
    </motion.div>
  );

  if (loading) return <div className="h-full flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-[#046241] border-t-transparent rounded-full"></div></div>;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      
      {/* Top Section: Profile & Goal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Summary */}
        <div className="lg:col-span-2 bg-white border border-[#133020]/10 rounded-3xl p-8 flex items-center gap-6 shadow-sm">
          <div className="w-24 h-24 rounded-full bg-[#f5eedb] border-4 border-white shadow-md flex items-center justify-center overflow-hidden shrink-0">
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User size={40} className="text-[#133020]/40" />
            )}
          </div>
          <div>
            <h2 className="text-3xl font-bold text-[#133020] mb-2">{applicant?.first_name || profile?.first_name} {applicant?.last_name || profile?.last_name}</h2>
            <p className="text-[#133020]/60 font-bold flex items-center gap-2">
              <Briefcase size={18} /> {applicant?.position_applied || 'Data Specialist'}
            </p>
          </div>
        </div>

        {/* Project Hercules Goal */}
        <div className="bg-white border border-[#133020]/10 rounded-3xl p-8 shadow-sm flex items-center gap-6">
          <div className="relative w-20 h-20 shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-[#F9F7F7]"
                strokeWidth="4"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <motion.path
                className="text-[#046241]"
                strokeWidth="4"
                strokeDasharray="100, 100"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                initial={{ strokeDasharray: "0, 100" }}
                animate={{ strokeDasharray: "75, 100" }} // 90/120 = 75%
                transition={{ duration: 1.5, ease: "easeOut" }}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-[#133020]">
              75%
            </div>
          </div>
          <div className="flex-1">
            <h4 className="text-xs font-bold text-[#133020]/50 uppercase tracking-wider mb-1">Project Hercules</h4>
            <div className="text-2xl font-bold text-[#133020]">90 / 120</div>
            <div className="text-sm font-bold text-[#046241]">Videos Annotated</div>
          </div>
        </div>
      </div>

      {/* Active Workstreams */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-[#133020]">Active Workstreams</h3>
          <button className="text-sm font-bold text-[#046241] hover:text-[#133020] transition-colors">View All</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_WORKSTREAMS.map((workstream) => (
            <WorkstreamCard key={workstream.id} workstream={workstream} />
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="pt-4">
        <h3 className="text-2xl font-bold text-[#133020] mb-6">Recent Activity</h3>
        <div className="bg-white border border-[#133020]/10 rounded-3xl overflow-hidden shadow-sm">
          {[1, 2, 3].map((i, idx) => (
            <div key={i} className={`flex items-center gap-6 p-6 hover:bg-[#F9F7F7] transition-colors cursor-pointer ${idx !== 2 ? 'border-b border-[#133020]/5' : ''}`}>
              <div className="w-12 h-12 rounded-full bg-[#046241]/10 flex items-center justify-center text-[#046241] shrink-0">
                <CheckCircle2 size={24} />
              </div>
              <div className="flex-1">
                <p className="text-base font-bold text-[#133020]">Completed Video Annotation Task #409{i}</p>
                <p className="text-sm font-bold text-[#133020]/50 mt-1">Project Hercules • {i * 2} hours ago</p>
              </div>
              <button className="p-3 text-[#133020]/30 hover:text-[#046241] transition-colors">
                <ChevronRight size={24} />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ProfilePage;
