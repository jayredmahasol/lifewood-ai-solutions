import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail,
  Lock,
  Loader2,
  Check,
  ArrowUpRight,
  Target,
  Zap,
  Award,
  MoreHorizontal,
  Bell,
  Search,
  Phone,
  GraduationCap,
  Briefcase,
  MapPin,
  Settings
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import Sidebar from './Sidebar';
import ProfilePage from './ProfilePage';

// Color Palette
const colors = {
  paper: '#f5eedb',
  white: '#ffffff',
  seaSalt: '#F9F7F7',
  darkSerpent: '#133020',
  castletonGreen: '#046241',
  saffaron: '#FFB347',
  earthYellow: '#FFC370',
};

const InputField = ({ label, icon: Icon, ...props }: any) => (
  <div className="space-y-2">
    <label className="text-xs font-bold uppercase tracking-wider text-[#133020]/50 ml-1">
      {label}
    </label>
    <div className="relative group">
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-[#133020]/30 group-focus-within:text-[#046241] transition-colors" size={18} />
      <input 
        {...props}
        className="w-full bg-[#F9F7F7] border border-[#133020]/10 rounded-xl focus:border-[#046241] focus:ring-4 focus:ring-[#046241]/5 py-3.5 pl-12 pr-4 outline-none text-[#133020] placeholder:text-[#133020]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
      />
    </div>
  </div>
);

const StatCard = ({ label, value, subtext }: any) => (
  <div className="flex flex-col">
    <h4 className="text-3xl font-bold text-[#133020] mb-1">{value}</h4>
    <p className="text-[#133020]/60 text-xs uppercase tracking-wider font-bold">{label}</p>
    {subtext && <p className="text-[#133020]/40 text-[10px] mt-1 font-medium">{subtext}</p>}
  </div>
);

export const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState<any>(null);
  const [applicant, setApplicant] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [school, setSchool] = useState('');
  const [designation, setDesignation] = useState('');
  const [presentAddress, setPresentAddress] = useState('');
  const [email, setEmail] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);
  
  const fullName = `${firstName} ${lastName}`.trim() || 'User';
  
  // Settings State
  const [password, setPassword] = useState('');
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['dashboard', 'workstreams', 'analytics', 'profile', 'settings'].includes(hash)) {
        setActiveTab(hash);
      } else {
        setActiveTab('dashboard');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check on mount

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const user = session?.user;
        if (!user) {
          window.location.hash = '#login';
          return;
        }
        setUser(user);
        
        // Fetch profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        // Fetch applicant data
        const { data: applicantData } = await supabase
          .from('applicants')
          .select('*')
          .eq('email', user.email)
          .single();

        if (applicantData) {
          setApplicant(applicantData);
        }

        if (profile) {
          if (profile.website === 'suspended') {
            await supabase.auth.signOut();
            window.location.hash = '#login';
            alert('Your account has been suspended. Please contact the administrator.');
            return;
          }
          setFirstName(profile.first_name || user.user_metadata?.full_name?.split(' ')[0] || 'User');
          setLastName(profile.last_name || user.user_metadata?.full_name?.split(' ').slice(1).join(' ') || '');
          setContactNumber(profile.contact_number || '');
          setSchool(profile.school || '');
          setDesignation(profile.designation || '');
          setPresentAddress(profile.present_address || '');
          setEmail(profile.email || user.email || '');
          if (profile.avatar_url) {
            setAvatarUrl(profile.avatar_url);
          }
        } else {
          setFirstName(user.user_metadata?.full_name?.split(' ')[0] || 'User');
          setLastName(user.user_metadata?.full_name?.split(' ').slice(1).join(' ') || '');
          setEmail(user.email || '');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    setMessage(null);

    try {
      const updates: any = {
        data: { full_name: `${firstName} ${lastName}`.trim() },
      };

      if (email !== user.email) {
        updates.email = email;
      }

      const { data, error } = await supabase.auth.updateUser(updates);

      if (error) throw error;

      // Update profile table
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          first_name: firstName,
          last_name: lastName,
          contact_number: contactNumber,
          school: school,
          designation: designation,
          present_address: presentAddress,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (profileError) throw profileError;

      // Update applicant table if exists
      if (applicant) {
        const { error: applicantError } = await supabase
          .from('applicants')
          .update({
            first_name: firstName,
            last_name: lastName,
            contact_number: contactNumber,
            school: school,
            designation: designation,
            present_address: presentAddress
          })
          .eq('id', applicant.id);
        
        if (applicantError) throw applicantError;
      }

      setUser(data.user);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      
      // Clear success message after 3 seconds
      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setUpdating(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setMessage({ type: 'error', text: 'Please enter a new password.' });
      return;
    }
    
    setUpdating(true);
    setMessage(null);

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;

      setPassword(''); // Clear password field
      setMessage({ type: 'success', text: 'Password updated successfully!' });
      
      // Clear success message after 3 seconds
      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.hash = '#login';
  };

  const [lastActivity, setLastActivity] = useState(Date.now());

  // Idle Timer Logic
  useEffect(() => {
    const handleActivity = () => setLastActivity(Date.now());
    
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('click', handleActivity);
    window.addEventListener('scroll', handleActivity);

    const interval = setInterval(() => {
      if (Date.now() - lastActivity > 5 * 60 * 1000) { // 5 minutes
        handleLogout();
      }
    }, 10000); // Check every 10 seconds

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      clearInterval(interval);
    };
  }, [lastActivity]);

  if (loading) return (
    <div className="min-h-screen bg-[#f5eedb] flex items-center justify-center">
      <div className="animate-spin w-8 h-8 border-4 border-[#046241] border-t-transparent rounded-full"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F9F7F7] flex font-sans overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab: string) => {
          setActiveTab(tab);
          window.location.hash = `#${tab}`;
        }} 
        onLogout={handleLogout} 
      />

      {/* Main Content */}
      <main className="flex-1 relative h-screen overflow-hidden flex flex-col bg-[#F9F7F7] text-[#133020] ml-64">
        
        {/* Top Header */}
        <header className="h-20 px-8 border-b border-[#133020]/5 bg-white flex items-center justify-between shrink-0 z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-[#133020] capitalize">
              {activeTab === 'dashboard' ? 'Overview' : activeTab}
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-[#133020]/40 hover:text-[#046241] transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FFB347] rounded-full border-2 border-white"></span>
            </button>
            
            <div className="h-8 w-px bg-[#133020]/10"></div>

            <button 
              onClick={() => {
                setActiveTab('profile');
                window.location.hash = '#profile';
              }}
              className="flex items-center gap-3 group"
            >
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-[#133020] group-hover:text-[#046241] transition-colors">{fullName}</p>
                <p className="text-[10px] font-bold text-[#133020]/40 uppercase tracking-wider">{applicant?.position_applied || 'Data Specialist'}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#f5eedb] border-2 border-white shadow-sm flex items-center justify-center text-[#133020] font-bold text-sm overflow-hidden group-hover:border-[#046241]/20 transition-colors">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  fullName.charAt(0).toUpperCase()
                )}
              </div>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar relative">
          
          {activeTab === 'workstreams' ? (
            <div className="p-8">
              <ProfilePage />
            </div>
          ) : activeTab === 'profile' ? (
            <div className="p-8 max-w-3xl mx-auto">
              <div className="bg-white border border-[#133020]/10 rounded-3xl p-8 md:p-10 shadow-sm">
                  <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-[#133020]">
                    <div className="p-2.5 rounded-xl bg-[#046241]/10 text-[#046241]">
                      <User size={24} />
                    </div>
                    Personal Information
                  </h3>
                  
                  <form onSubmit={handleUpdateProfile} className="space-y-8">
                  {message && (
                      <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-xl text-sm flex items-center gap-3 font-bold ${
                          message.type === 'success' 
                          ? 'bg-[#046241]/10 text-[#046241] border border-[#046241]/20' 
                          : 'bg-red-50 text-red-600 border border-red-100'
                      }`}
                      >
                      {message.type === 'success' ? <Check size={18} /> : <div className="w-4 h-4 border-2 border-current border-t-transparent animate-spin" />}
                      {message.text}
                      </motion.div>
                  )}

                  <div className="grid grid-cols-1 gap-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField 
                          label="First Name" 
                          icon={User} 
                          value={firstName}
                          onChange={(e: any) => setFirstName(e.target.value)}
                          placeholder="First Name"
                        />
                        <InputField 
                          label="Last Name" 
                          icon={User} 
                          value={lastName}
                          onChange={(e: any) => setLastName(e.target.value)}
                          placeholder="Last Name"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField 
                          label="Email Address" 
                          icon={Mail} 
                          type="email"
                          value={email}
                          onChange={(e: any) => setEmail(e.target.value)}
                          placeholder="name@company.com"
                        />
                        <InputField 
                          label="Contact Number" 
                          icon={Phone} 
                          value={contactNumber}
                          onChange={(e: any) => setContactNumber(e.target.value)}
                          placeholder="+1 234 567 8900"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField 
                          label="School" 
                          icon={GraduationCap} 
                          value={school}
                          onChange={(e: any) => setSchool(e.target.value)}
                          placeholder="University Name"
                        />
                        <InputField 
                          label="Designation" 
                          icon={Briefcase} 
                          value={designation}
                          onChange={(e: any) => setDesignation(e.target.value)}
                          placeholder="Current Role"
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-6">
                        <InputField 
                          label="Present Address" 
                          icon={MapPin} 
                          value={presentAddress}
                          onChange={(e: any) => setPresentAddress(e.target.value)}
                          placeholder="Full Address"
                        />
                      </div>
                  </div>

                  <div className="flex justify-end pt-4">
                      <button 
                      type="submit"
                      disabled={updating}
                      className="bg-[#046241] hover:bg-[#035436] rounded-xl text-white px-8 py-3.5 font-bold transition-all shadow-md shadow-[#046241]/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 hover:-translate-y-0.5"
                      >
                      {updating ? <Loader2 size={20} className="animate-spin" /> : 'Save Changes'}
                      </button>
                  </div>
                  </form>
              </div>
            </div>
          ) : activeTab === 'settings' ? (
            <div className="p-8 max-w-3xl mx-auto">
              <div className="bg-white border border-[#133020]/10 rounded-3xl p-8 md:p-10 shadow-sm">
                  <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-[#133020]">
                    <div className="p-2.5 rounded-xl bg-[#046241]/10 text-[#046241]">
                      <Settings size={24} />
                    </div>
                    Account Settings
                  </h3>
                  
                  <form onSubmit={handleUpdatePassword} className="space-y-8">
                  {message && (
                      <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-xl text-sm flex items-center gap-3 font-bold ${
                          message.type === 'success' 
                          ? 'bg-[#046241]/10 text-[#046241] border border-[#046241]/20' 
                          : 'bg-red-50 text-red-600 border border-red-100'
                      }`}
                      >
                      {message.type === 'success' ? <Check size={18} /> : <div className="w-4 h-4 border-2 border-current border-t-transparent animate-spin" />}
                      {message.text}
                      </motion.div>
                  )}

                  <div className="grid grid-cols-1 gap-6">
                      <div className="pt-2">
                          <h4 className="text-base font-bold mb-6 flex items-center gap-2 text-[#133020]">
                            <Lock size={18} className="text-[#133020]/40" />
                            Security
                          </h4>
                          <InputField 
                            label="New Password" 
                            icon={Lock} 
                            type="password"
                            value={password}
                            onChange={(e: any) => setPassword(e.target.value)}
                            placeholder="Leave blank to keep current"
                          />
                      </div>
                  </div>

                  <div className="flex justify-end pt-4">
                      <button 
                      type="submit"
                      disabled={updating}
                      className="bg-[#046241] hover:bg-[#035436] rounded-xl text-white px-8 py-3.5 font-bold transition-all shadow-md shadow-[#046241]/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 hover:-translate-y-0.5"
                      >
                      {updating ? <Loader2 size={20} className="animate-spin" /> : 'Update Password'}
                      </button>
                  </div>
                  </form>
              </div>
            </div>
          ) : activeTab === 'analytics' ? (
            <div className="p-8 flex items-center justify-center h-full">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-[#FFB347]/20 text-[#FFB347] rounded-full flex items-center justify-center mx-auto">
                  <Target size={32} />
                </div>
                <h2 className="text-2xl font-bold text-[#133020]">Analytics Dashboard</h2>
                <p className="text-[#133020]/60 font-medium">Detailed analytics are currently being generated for your account.</p>
              </div>
            </div>
          ) : (
            /* Dashboard Overview */
            <div className="p-8 max-w-7xl mx-auto space-y-8 pb-12">
              
              {/* Hero Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-3xl bg-[#f5eedb] border border-[#133020]/10 p-8 md:p-10 relative overflow-hidden flex flex-col justify-between"
              >
                {/* Decorative Elements */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#FFB347] rounded-full blur-[80px] opacity-20 pointer-events-none"></div>
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#046241] rounded-full blur-[80px] opacity-10 pointer-events-none"></div>
                
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-6">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#133020]/10 text-xs font-bold text-[#133020]/80 mb-4 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-[#046241] animate-pulse"></span>
                        System Optimal
                      </div>
                      <h1 className="text-4xl md:text-5xl font-bold leading-tight text-[#133020] mb-2">
                        Welcome back, <br/>
                        <span className="text-[#046241]">{applicant?.first_name || fullName.split(' ')[0]}</span>
                      </h1>
                      <p className="text-[#133020]/60 font-medium text-lg max-w-md">
                        You have 4 active tasks pending review. Your overall accuracy rate is up by 2.4% this week.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-8 pt-4">
                      <StatCard label="Tasks Completed" value="1,284" />
                      <div className="w-px h-12 bg-[#133020]/10"></div>
                      <StatCard label="Accuracy Rate" value="98.2%" subtext="+2.4% this week" />
                      <div className="w-px h-12 bg-[#133020]/10"></div>
                      <StatCard label="Hours Logged" value="42h" />
                    </div>
                  </div>

                  <div className="hidden lg:flex lg:col-span-5 justify-end">
                    <div className="bg-white border border-[#133020]/10 rounded-3xl p-6 w-full max-w-sm shadow-sm relative group">
                      <div className="flex justify-between items-center mb-6">
                        <div>
                            <h4 className="text-lg font-bold text-[#133020]">Current Focus</h4>
                            <p className="text-[#133020]/40 text-xs font-bold uppercase tracking-wider">Project Hercules</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#FFB347]/20 text-[#133020] flex items-center justify-center">
                          <Target size={20} />
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm font-bold text-[#133020]">
                            <span>Video Annotation</span>
                            <span>75%</span>
                          </div>
                          <div className="w-full h-2 bg-[#F9F7F7] rounded-full overflow-hidden">
                            <div className="h-full bg-[#046241] rounded-full w-3/4"></div>
                          </div>
                        </div>
                        <button 
                          onClick={() => {
                            setActiveTab('workstreams');
                            window.location.hash = '#workstreams';
                          }}
                          className="w-full py-3 rounded-xl bg-[#133020] text-white font-bold text-sm hover:bg-[#046241] transition-colors flex items-center justify-center gap-2 mt-4"
                        >
                          Continue Work
                          <ArrowUpRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Activity Feed */}
                <div className="lg:col-span-2 bg-white border border-[#133020]/10 rounded-3xl p-8 shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-[#133020]">Recent Activity</h3>
                      <p className="text-[#133020]/50 text-sm font-medium">Your latest actions and updates</p>
                    </div>
                    <button className="text-sm font-bold text-[#046241] hover:text-[#133020] transition-colors">View All</button>
                  </div>

                  <div className="space-y-4">
                    {/* Highlighted Item */}
                    <div className="bg-[#f5eedb] border border-[#133020]/10 rounded-2xl p-5 flex items-center gap-5 text-[#133020] transition-transform duration-300 hover:-translate-y-1 cursor-pointer">
                      <div className="w-12 h-12 rounded-full bg-[#FFB347] flex items-center justify-center text-[#133020] font-bold shadow-sm">
                        <Award size={20} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg mb-0.5">Achieved 99% Accuracy</h4>
                        <p className="text-[#133020]/60 text-sm font-medium">Project Titan • 2 hours ago</p>
                      </div>
                    </div>

                    {/* Standard Items */}
                    <div className="flex items-center gap-5 p-4 hover:bg-[#F9F7F7] rounded-2xl transition-colors cursor-pointer border border-transparent hover:border-[#133020]/5">
                        <div className="w-12 h-12 rounded-full bg-[#133020]/5 flex items-center justify-center text-[#133020]/60">
                          <Check size={20} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-[#133020] text-sm mb-0.5">Completed Batch #8492</h4>
                          <p className="text-[#133020]/50 text-xs font-medium">Video Annotation • 5 hours ago</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-5 p-4 hover:bg-[#F9F7F7] rounded-2xl transition-colors cursor-pointer border border-transparent hover:border-[#133020]/5">
                        <div className="w-12 h-12 rounded-full bg-[#133020]/5 flex items-center justify-center text-[#133020]/60">
                          <Zap size={20} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-[#133020] text-sm mb-0.5">Speed Bonus Unlocked</h4>
                          <p className="text-[#133020]/50 text-xs font-medium">Maintained &gt;50 tasks/hr • Yesterday</p>
                        </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                  {/* Efficiency Card */}
                  <div className="bg-[#046241] rounded-3xl p-8 relative overflow-hidden shadow-md group hover:-translate-y-1 transition-transform duration-300">
                      <div className="flex justify-between items-start mb-6 relative z-10">
                        <span className="text-xs font-bold uppercase tracking-widest text-white/80">Efficiency Score</span>
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white backdrop-blur-sm">
                          <Zap size={18} />
                        </div>
                      </div>
                      <h3 className="text-5xl font-bold text-white mb-2 relative z-10">98<span className="text-2xl text-white/60">%</span></h3>
                      <p className="text-white/80 text-sm font-medium relative z-10">Top 5% of annotators</p>
                      
                      {/* Decorative Background */}
                      <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-[#FFB347] rounded-full blur-[60px] opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                  </div>

                  {/* Level Card */}
                  <div className="bg-white border border-[#133020]/10 rounded-3xl p-8 relative overflow-hidden shadow-sm group hover:-translate-y-1 transition-transform duration-300">
                      <div className="flex justify-between items-start mb-6">
                        <span className="text-xs font-bold uppercase tracking-widest text-[#133020]/50">Current Level</span>
                        <div className="w-10 h-10 rounded-full bg-[#133020]/5 flex items-center justify-center text-[#133020]">
                          <User size={18} />
                        </div>
                      </div>
                      <h3 className="text-4xl font-bold text-[#133020] mb-1">Level 4</h3>
                      <p className="text-[#133020]/60 text-sm font-medium">Senior Data Specialist</p>
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
