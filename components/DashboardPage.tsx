import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  PieChart, 
  FileText, 
  BarChart2, 
  Settings, 
  LogOut, 
  ChevronRight, 
  Zap, 
  User, 
  Award, 
  Target, 
  Activity, 
  Calendar as CalendarIcon,
  MoreHorizontal,
  ArrowUpRight,
  Loader2,
  Check,
  ShieldCheck,
  Users,
  Mail,
  Lock,
  Moon,
  Sun
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import Squares from './react-bits/Squares';
import ProfileCard from './react-bits/ProfileCard';
import ModernBento from './react-bits/ModernBento';
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

const SidebarItem = ({ icon: Icon, label, active, onClick, expanded }: any) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center ${expanded ? 'gap-3 px-4' : 'justify-center px-2'} py-3 rounded-xl transition-all duration-300 relative overflow-hidden group ${
      active 
        ? 'text-[#FFB347]' 
        : 'text-white/40 hover:text-white'
    }`}
  >
    {active && (
      <motion.div
        layoutId="activeTab"
        className="absolute left-0 top-0 bottom-0 w-1 bg-[#FFB347] rounded-r-full"
      />
    )}
    <Icon size={20} className="flex-shrink-0" />
    <span className={`text-sm font-medium whitespace-nowrap transition-all duration-300 origin-left ${expanded ? 'opacity-100 w-auto ml-0' : 'opacity-0 w-0 overflow-hidden'}`}>
      {label}
    </span>
    {active && (
      <div className="absolute inset-0 bg-[#FFB347]/5 pointer-events-none" />
    )}
  </button>
);

const InputField = ({ label, icon: Icon, ...props }: any) => (
  <div className="space-y-2">
    <label className="text-xs font-bold uppercase tracking-wider text-[#133020]/50 ml-1">
      {label}
    </label>
    <div className="relative group">
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-[#133020]/30 group-focus-within:text-[#046241] transition-colors" size={18} />
      <input 
        {...props}
        className="w-full bg-white border border-[#133020]/10 focus:border-[#046241] focus:ring-4 focus:ring-[#046241]/5 py-4 pl-12 pr-4 outline-none text-[#133020] placeholder:text-[#133020]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
      />
    </div>
  </div>
);

const StatCard = ({ label, value, subtext }: any) => (
  <div className="flex flex-col">
    <h4 className="text-3xl font-bold text-white mb-1">{value}</h4>
    <p className="text-white/60 text-xs uppercase tracking-wider font-medium">{label}</p>
    {subtext && <p className="text-white/40 text-[10px] mt-1">{subtext}</p>}
  </div>
);

const ActivityItem = ({ icon: Icon, title, date, score, color }: any) => (
  <div className="flex items-center gap-4 p-4 hover:bg-[#F9F7F7] transition-colors group cursor-pointer">
    <div className={`w-12 h-12 flex items-center justify-center ${color === 'green' ? 'bg-[#046241] text-white' : 'bg-[#f5eedb] text-[#133020]'}`}>
      {score ? <span className="font-bold">{score}</span> : <Icon size={20} />}
    </div>
    <div className="flex-1">
      <h5 className="font-bold text-[#133020] text-sm group-hover:text-[#046241] transition-colors">{title}</h5>
      <p className="text-[#133020]/40 text-xs">{date}</p>
    </div>
    <button className="text-[#133020]/20 group-hover:text-[#046241] transition-colors">
      <ChevronRight size={16} />
    </button>
  </div>
);

export const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  // Settings State
  const [password, setPassword] = useState('');
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'profile') setActiveTab('profile');
      else if (hash === 'settings') setActiveTab('settings');
      else setActiveTab('dashboard');
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check on mount

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          window.location.hash = '#login';
          return;
        }
        setUser(user);
        setFullName(user.user_metadata?.full_name || 'User');
        setEmail(user.email || '');
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
        data: { full_name: fullName },
      };

      if (email !== user.email) {
        updates.email = email;
      }

      if (password) {
        updates.password = password;
      }

      const { data, error } = await supabase.auth.updateUser(updates);

      if (error) throw error;

      setUser(data.user);
      setPassword(''); // Clear password field
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      
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

  if (loading) return null;

  return (
    <div className="min-h-screen bg-[#133020] flex font-sans overflow-hidden relative">
      {/* Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={handleLogout} 
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />

      {/* Main Content */}
      <main 
        className={`flex-1 relative shadow-2xl shadow-black/50 h-screen overflow-hidden flex flex-col transition-all duration-500 ease-in-out ml-80 ${
          isDarkMode ? 'bg-[#060010] text-white' : 'bg-[#f5eedb] text-[#133020]'
        }`}
      >
        <div className="p-6 md:p-8 w-full h-full flex flex-col gap-6">
          
          {/* Header / Theme Toggle */}
          <div className="absolute top-6 right-8 z-50 flex items-center gap-4">
            <a 
              href="#profile"
              className={`flex items-center gap-3 px-4 py-2 border backdrop-blur-sm transition-all hover:bg-opacity-80 hover:scale-105 cursor-pointer ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-[#133020]/5 border-[#133020]/10'}`}
            >
               <div className="w-8 h-8 bg-[#FFB347] flex items-center justify-center text-[#133020] font-bold text-xs">
                 {fullName.charAt(0).toUpperCase()}
               </div>
               <span className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-[#133020]'}`}>{fullName}</span>
            </a>
          </div>

          {activeTab === 'profile' ? (
            <div className="h-full overflow-y-auto custom-scrollbar pr-2">
              <ProfilePage />
            </div>
          ) : activeTab === 'settings' ? (
             <div className="h-full overflow-y-auto custom-scrollbar pr-2 pt-16">
               <div className="max-w-2xl mx-auto">
                  <div className={`border p-8 md:p-10 shadow-xl ${isDarkMode ? 'bg-[#133020] border-white/5 shadow-black/20' : 'bg-white border-[#133020]/5 shadow-[#133020]/5'}`}>
                      <h3 className={`text-xl font-bold mb-8 flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-[#133020]'}`}>
                        <div className="p-2 bg-[#FFB347]/20 text-[#133020]">
                          <User size={24} />
                        </div>
                        Personal Information
                      </h3>
                      
                      <form onSubmit={handleUpdateProfile} className="space-y-8">
                      {message && (
                          <motion.div 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`p-4 text-sm flex items-center gap-3 font-medium ${
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
                              label="Full Name" 
                              icon={User} 
                              value={fullName}
                              onChange={(e: any) => setFullName(e.target.value)}
                              placeholder="Your full name"
                            />
                            
                            <InputField 
                              label="Email Address" 
                              icon={Mail} 
                              type="email"
                              value={email}
                              onChange={(e: any) => setEmail(e.target.value)}
                              placeholder="name@company.com"
                            />
                          </div>

                          <div className={`pt-8 border-t ${isDarkMode ? 'border-white/10' : 'border-[#133020]/5'}`}>
                              <h4 className={`text-base font-bold mb-6 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-[#133020]'}`}>
                                <Lock size={18} className={isDarkMode ? 'text-white/40' : 'text-[#133020]/40'} />
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
                          className="bg-[#046241] hover:bg-[#035436] text-white px-8 py-4 font-bold transition-all shadow-lg shadow-[#046241]/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 hover:-translate-y-1 active:translate-y-0"
                          >
                          {updating ? <Loader2 size={20} className="animate-spin" /> : 'Save Changes'}
                          </button>
                      </div>
                      </form>
                  </div>
               </div>
             </div>
          ) : (
            <>
              {/* Hero Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-[2.5rem] ${isDarkMode ? 'bg-[#133020]' : 'bg-[#046241]'} text-white p-8 md:p-12 relative overflow-hidden flex-shrink-0 flex flex-col justify-between transition-colors duration-300 min-h-[380px] mt-16`}
              >
                {/* Background Animation */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <Squares 
                        direction="diagonal"
                        speed={0.5}
                        squareSize={40}
                        borderColor="#ffffff"
                        hoverFillColor="#046241"
                    />
                </div>
                
                {/* Content */}
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 h-full items-center">
                  <div className="lg:col-span-7 flex flex-col justify-center h-full space-y-6">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffffff]/10 border border-white/10 text-xs font-medium text-white/80 mb-4 backdrop-blur-sm">
                        <span className="w-2 h-2 rounded-full bg-[#FFB347] animate-pulse"></span>
                        Module 12 of 24
                      </div>
                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-2 tracking-tight">
                        Patterns & <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB347] to-[#FFC370]">Architecture.</span>
                      </h1>
                    </div>

                    <div className="flex items-center gap-8">
                      <StatCard label="Completion" value="82%" />
                      <div className="w-px h-12 bg-white/10"></div>
                      <StatCard label="Spent" value="14h" subtext="AVG 2h/day" />
                      <div className="w-px h-12 bg-white/10"></div>
                      <StatCard label="Avg Grade" value="A+" />
                    </div>

                    <button className="w-fit bg-[#FFB347] text-[#133020] px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-[#FFC370] transition-all shadow-lg shadow-[#FFB347]/20 group hover:shadow-[#FFB347]/40 hover:-translate-y-1">
                      Continue Lesson
                      <div className="bg-[#133020]/10 p-1 rounded-full group-hover:bg-[#133020]/20 transition-colors">
                        <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </button>
                  </div>

                  {/* Calendar Widget (Visual) */}
                  <div className="hidden lg:flex lg:col-span-5 justify-end items-center">
                    <div className="bg-[#060010]/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 w-full max-w-sm shadow-2xl relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFB347] rounded-full blur-[60px] opacity-10 group-hover:opacity-20 transition-opacity"></div>
                      
                      <div className="flex justify-between items-center mb-6 relative z-10">
                        <div>
                            <h4 className="text-lg font-bold text-white">March 2026</h4>
                            <p className="text-white/40 text-xs">Thursday, 12th</p>
                        </div>
                        <div className="flex gap-2">
                          <div className="w-2 h-2 rounded-full bg-[#046241]"></div>
                          <div className="w-2 h-2 rounded-full bg-[#FFB347] animate-pulse"></div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-7 gap-2 text-center relative z-10">
                        {['S','M','T','W','T','F','S'].map((d, i) => (
                          <div key={i} className="text-white/30 text-[10px] font-bold py-2 uppercase tracking-wider">{d}</div>
                        ))}
                        {Array.from({length: 31}).map((_, i) => (
                          <div 
                            key={i} 
                            className={`
                              aspect-square flex items-center justify-center rounded-xl text-xs font-medium transition-all duration-300
                              ${i === 11 ? 'bg-[#FFB347] text-[#133020] font-bold shadow-lg shadow-[#FFB347]/30 scale-110' : 'text-white/70 hover:bg-white/10 cursor-pointer hover:scale-105'}
                              ${[8, 14, 21, 28].includes(i) ? 'relative after:absolute after:bottom-1.5 after:w-1 after:h-1 after:bg-[#046241] after:rounded-full' : ''}
                            `}
                          >
                            {i + 1}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Custom Grid Layout */}
              <div className="flex-1 min-h-0 overflow-hidden relative mt-6">
                 <div className="absolute inset-0 overflow-y-auto custom-scrollbar pb-6">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
                      
                      {/* Profile Card (Left) */}
                      <div className="lg:col-span-1 bg-[#060010] rounded-[2.5rem] p-8 flex flex-col items-center justify-between relative overflow-hidden group border border-white/5 shadow-2xl">
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFB347] rounded-full blur-[80px] opacity-10"></div>
                        
                        <div className="flex-1 flex flex-col items-center justify-center w-full relative z-10">
                          <div className="w-32 h-32 rounded-full border border-white/10 flex items-center justify-center mb-6 relative group-hover:scale-105 transition-transform duration-500">
                             {avatarUrl ? (
                               <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover rounded-full" />
                             ) : (
                               <User size={48} className="text-white/20" />
                             )}
                             <div className="absolute inset-0 rounded-full border border-white/5 animate-ping opacity-20"></div>
                          </div>
                          
                          <button 
                            onClick={() => setActiveTab('profile')}
                            className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white text-xs font-bold tracking-widest hover:bg-white hover:text-black transition-all duration-300 uppercase"
                          >
                            <Settings size={14} />
                            Edit Profile
                          </button>
                        </div>

                        <div className="w-full bg-[#133020] rounded-[1.5rem] p-4 flex items-center justify-between relative z-10 border border-white/5 group-hover:border-white/10 transition-colors">
                           <div className="flex items-center gap-3">
                             <div className="w-10 h-10 rounded-full bg-[#ccff00] flex items-center justify-center text-black font-bold text-sm">
                               {fullName.charAt(0).toUpperCase()}
                             </div>
                             <div>
                               <h4 className="text-white text-sm font-bold leading-tight">{fullName}</h4>
                               <p className="text-white/40 text-[10px] uppercase tracking-wider">Lifewood PH Intern</p>
                             </div>
                           </div>
                           <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black">
                             <Award size={20} />
                           </div>
                        </div>
                      </div>

                      {/* Activity Card (Center) */}
                      <div className="lg:col-span-2 bg-[#F2F2F2] rounded-[2.5rem] p-8 flex flex-col relative overflow-hidden shadow-xl">
                        <div className="flex justify-between items-start mb-8">
                          <div>
                            <h3 className="text-2xl font-bold text-black mb-1">Activity</h3>
                            <p className="text-black/40 text-sm font-medium">Recent updates</p>
                          </div>
                          <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black/40 hover:text-black transition-colors">
                            <MoreHorizontal size={20} />
                          </button>
                        </div>

                        <div className="space-y-4 flex-1">
                          {/* Highlighted Item */}
                          <div className="bg-black rounded-[1.5rem] p-5 flex items-center gap-5 text-white shadow-lg transform hover:scale-[1.02] transition-transform duration-300 cursor-pointer">
                            <div className="w-12 h-12 rounded-full bg-[#ccff00] flex items-center justify-center text-black font-bold text-sm shadow-[0_0_20px_rgba(204,255,0,0.3)]">
                              98%
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-lg mb-0.5">Quiz Score: React Hooks</h4>
                              <p className="text-white/40 text-xs font-medium">27 Feb, 2026</p>
                            </div>
                          </div>

                          {/* Standard Items */}
                          <div className="flex items-center gap-5 p-4 hover:bg-white/50 rounded-[1.5rem] transition-colors cursor-pointer group">
                             <div className="w-12 h-12 rounded-full bg-[#E0E0E0] flex items-center justify-center text-black/60 font-bold text-xs group-hover:bg-white transition-colors">
                               x2
                             </div>
                             <div className="flex-1">
                               <h4 className="font-bold text-black text-sm mb-0.5">Productivity Streak</h4>
                               <p className="text-black/40 text-xs font-medium">Increased limits on tasks</p>
                             </div>
                          </div>

                          <div className="flex items-center gap-5 p-4 hover:bg-white/50 rounded-[1.5rem] transition-colors cursor-pointer group">
                             <div className="w-12 h-12 rounded-full bg-[#E0E0E0] flex items-center justify-center text-black/60 font-bold text-xs group-hover:bg-white transition-colors">
                               2%
                             </div>
                             <div className="flex-1">
                               <h4 className="font-bold text-black text-sm mb-0.5">Optimization Bonus</h4>
                               <p className="text-black/40 text-xs font-medium">Code quality improvement</p>
                             </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="lg:col-span-1 flex flex-col gap-6">
                        {/* Efficiency Card */}
                        <div className="bg-[#ccff00] rounded-[2.5rem] p-6 relative overflow-hidden shadow-xl group hover:-translate-y-1 transition-transform duration-300">
                           <div className="flex justify-between items-start mb-6">
                             <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Efficiency</span>
                             <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white">
                               <Zap size={14} />
                             </div>
                           </div>
                           <h3 className="text-4xl font-bold text-black mb-1">98%</h3>
                           <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
                        </div>

                        {/* Level Card */}
                        <div className="bg-black rounded-[2.5rem] p-6 relative overflow-hidden shadow-xl group hover:-translate-y-1 transition-transform duration-300">
                           <div className="flex justify-between items-start mb-6">
                             <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">Level</span>
                             <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">
                               <User size={14} />
                             </div>
                           </div>
                           <h3 className="text-4xl font-bold text-white mb-1">04</h3>
                           <p className="text-white/40 text-xs font-medium">Senior Intern</p>
                        </div>

                        {/* Weekly Goals Card */}
                        <div className="bg-[#E0E0E0] rounded-[2.5rem] p-6 flex items-center justify-between shadow-lg group hover:bg-white transition-colors duration-300 cursor-pointer">
                           <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-black/40 group-hover:bg-black/10 transition-colors">
                               <Target size={18} />
                             </div>
                             <div>
                               <h4 className="font-bold text-black text-sm">Weekly Goals</h4>
                               <p className="text-black/40 text-[10px] font-medium">4 tasks remaining</p>
                             </div>
                           </div>
                           <ChevronRight size={18} className="text-black/20 group-hover:text-black transition-colors" />
                        </div>
                      </div>

                    </div>
                 </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};
