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
  Calendar as CalendarIcon,
  MoreHorizontal,
  ArrowUpRight,
  Loader2,
  Check,
  ShieldCheck,
  Users,
  Mail,
  Lock
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import Squares from './react-bits/Squares';

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

const SidebarItem = ({ icon: Icon, label, active, onClick }: any) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden group ${
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
    <Icon size={20} />
    <span className="text-sm font-medium">{label}</span>
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
        className="w-full bg-white border border-[#133020]/10 focus:border-[#046241] focus:ring-4 focus:ring-[#046241]/5 rounded-2xl py-4 pl-12 pr-4 outline-none text-[#133020] placeholder:text-[#133020]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
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
  <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-[#F9F7F7] transition-colors group cursor-pointer">
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color === 'green' ? 'bg-[#046241] text-white' : 'bg-[#f5eedb] text-[#133020]'}`}>
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
  
  // Settings State
  const [password, setPassword] = useState('');
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

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

  if (loading) return null;

  return (
    <div className="min-h-screen bg-[#133020] flex font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#133020] flex flex-col p-6 z-20">
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="w-8 h-8 rounded-full bg-[#FFB347] flex items-center justify-center text-[#133020]">
            <Zap size={18} fill="currentColor" />
          </div>
          <span className="text-white font-bold text-xl tracking-tight">Lifewood <span className="text-[10px] bg-[#ffffff]/10 px-1.5 py-0.5 rounded text-white/60 ml-1 align-middle">HUB</span></span>
        </div>

        <div className="flex-1 space-y-8 overflow-y-auto custom-scrollbar">
          <div>
            <h3 className="text-white/20 text-xs font-bold uppercase tracking-widest px-4 mb-4">Main Menu</h3>
            <nav className="space-y-1">
              <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
              <SidebarItem icon={PieChart} label="Analytics" active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
              <SidebarItem icon={FileText} label="Evaluation" active={activeTab === 'evaluation'} onClick={() => setActiveTab('evaluation')} />
              <SidebarItem icon={BarChart2} label="Reports" active={activeTab === 'reports'} onClick={() => setActiveTab('reports')} />
            </nav>
          </div>

          <div>
            <h3 className="text-white/20 text-xs font-bold uppercase tracking-widest px-4 mb-4">Settings</h3>
            <nav className="space-y-1">
              <SidebarItem icon={Settings} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
            </nav>
          </div>
        </div>

        {/* User Profile */}
        <div className="mt-auto pt-6">
          <div className="bg-[#ffffff]/5 rounded-2xl p-3 flex items-center gap-3 border border-white/5 hover:bg-[#ffffff]/10 transition-colors cursor-pointer group">
            <div className="w-10 h-10 rounded-full bg-[#FFB347] flex items-center justify-center text-[#133020] font-bold text-sm">
              {fullName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-bold truncate">{fullName}</p>
              <p className="text-white/40 text-xs truncate">Intern Access</p>
            </div>
            <button onClick={handleLogout} className="text-white/20 group-hover:text-white transition-colors">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-[#f5eedb] rounded-l-[2.5rem] overflow-y-auto relative shadow-2xl shadow-black/50">
        <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-8">
          
          {activeTab === 'settings' ? (
             <div className="max-w-2xl mx-auto">
                <div className="bg-white border border-[#133020]/5 rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-[#133020]/5">
                    <h3 className="text-xl font-bold mb-8 flex items-center gap-3 text-[#133020]">
                      <div className="p-2 bg-[#FFB347]/20 rounded-xl text-[#133020]">
                        <User size={24} />
                      </div>
                      Personal Information
                    </h3>
                    
                    <form onSubmit={handleUpdateProfile} className="space-y-8">
                    {message && (
                        <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded-2xl text-sm flex items-center gap-3 font-medium ${
                            message.type === 'success' 
                            ? 'bg-[#046241]/10 text-[#046241] border border-[#046241]/20' 
                            : 'bg-red-50 text-red-600 border border-red-100'
                        }`}
                        >
                        {message.type === 'success' ? <Check size={18} /> : <div className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />}
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

                        <div className="pt-8 border-t border-[#133020]/5">
                            <h4 className="text-base font-bold mb-6 text-[#133020] flex items-center gap-2">
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
                        className="bg-[#046241] hover:bg-[#035436] text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-[#046241]/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 hover:-translate-y-1 active:translate-y-0"
                        >
                        {updating ? <Loader2 size={20} className="animate-spin" /> : 'Save Changes'}
                        </button>
                    </div>
                    </form>
                </div>
             </div>
          ) : (
            <>
              {/* Hero Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-[2.5rem] bg-[#133020] text-white p-8 md:p-12 relative overflow-hidden min-h-[400px] flex flex-col justify-between"
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
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 h-full">
                  <div className="flex flex-col justify-between h-full space-y-8">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffffff]/10 border border-white/10 text-xs font-medium text-white/80 mb-6 backdrop-blur-sm">
                        <span className="w-2 h-2 rounded-full bg-[#FFB347] animate-pulse"></span>
                        Module 12 of 24
                      </div>
                      <h1 className="text-5xl md:text-6xl font-bold leading-[1.1] mb-2">
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

                    <button className="w-fit bg-[#FFB347] text-[#133020] px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-[#FFC370] transition-colors shadow-lg shadow-[#FFB347]/20 group">
                      Continue Lesson
                      <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                  </div>

                  {/* Calendar Widget (Visual) */}
                  <div className="hidden lg:flex justify-end items-center">
                    <div className="bg-[#ffffff]/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 w-80">
                      <div className="flex justify-between items-center mb-6">
                        <h4 className="font-bold">March 2026</h4>
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-[#046241]"></div>
                          <div className="w-2 h-2 rounded-full bg-[#FFB347]"></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-7 gap-2 text-center text-sm">
                        {['S','M','T','W','T','F','S'].map(d => (
                          <div key={d} className="text-white/40 text-xs font-medium py-2">{d}</div>
                        ))}
                        {Array.from({length: 28}).map((_, i) => (
                          <div 
                            key={i} 
                            className={`
                              aspect-square flex items-center justify-center rounded-full text-xs
                              ${i === 15 ? 'bg-[#FFB347] text-[#133020] font-bold shadow-lg shadow-[#FFB347]/30' : 'text-white/80 hover:bg-white/10 cursor-pointer'}
                              ${[8, 11, 14, 21].includes(i) ? 'relative after:absolute after:bottom-1 after:w-1 after:h-1 after:bg-[#046241] after:rounded-full' : ''}
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

              {/* Widgets Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Profile Card */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-[#133020] rounded-[2.5rem] p-8 text-white flex flex-col justify-between min-h-[320px] relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#046241] rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
                  
                  <div className="relative z-10">
                    <div className="w-24 h-24 rounded-full border-2 border-white/10 flex items-center justify-center mb-6 mx-auto">
                      <User size={40} className="text-white/40" />
                    </div>
                    <div className="text-center">
                        <h3 className="text-2xl font-bold mb-1">{fullName}</h3>
                        <p className="text-white/40 text-sm uppercase tracking-wider">Lifewood PH Intern</p>
                    </div>
                  </div>

                  <div className="bg-[#ffffff]/5 rounded-2xl p-4 flex items-center justify-between mt-8 border border-white/5 backdrop-blur-sm">
                    <div className="w-10 h-10 rounded-full bg-[#FFB347] flex items-center justify-center text-[#133020] font-bold">
                      {fullName.charAt(0).toUpperCase()}
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-white/40 uppercase">Status</p>
                      <p className="font-bold text-[#FFB347]">Active</p>
                    </div>
                  </div>
                </motion.div>

                {/* Activity Card */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-[2.5rem] p-8 shadow-sm"
                >
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h3 className="text-xl font-bold text-[#133020]">Activity</h3>
                      <p className="text-[#133020]/40 text-sm">Recent updates</p>
                    </div>
                    <button className="w-8 h-8 rounded-full bg-[#f5eedb] flex items-center justify-center text-[#133020]/40 hover:text-[#133020] transition-colors">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div className="bg-[#133020] rounded-2xl p-4 text-white flex items-center gap-4 shadow-lg shadow-[#133020]/20 transform scale-105 transition-transform">
                      <div className="w-12 h-12 rounded-2xl bg-[#FFB347] flex items-center justify-center text-[#133020] font-bold text-lg">
                        98%
                      </div>
                      <div>
                        <h5 className="font-bold text-sm">Quiz Score: React Hooks</h5>
                        <p className="text-white/40 text-xs">27 Feb, 2026</p>
                      </div>
                    </div>

                    <ActivityItem icon={Zap} title="Productivity Streak" date="Increased limits on tasks" score="x2" />
                    <ActivityItem icon={Award} title="Optimization Bonus" date="Code quality improvement" score="2%" />
                  </div>
                </motion.div>

                {/* Stats Column */}
                <div className="space-y-6 flex flex-col">
                  <div className="grid grid-cols-2 gap-6 flex-1">
                    {/* Efficiency */}
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className="bg-[#FFB347] rounded-[2.5rem] p-6 flex flex-col justify-between relative overflow-hidden group"
                    >
                      <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
                      <div className="flex justify-between items-start">
                        <span className="text-[#133020]/60 text-[10px] font-bold uppercase tracking-widest">Efficiency</span>
                        <div className="w-8 h-8 rounded-full bg-[#133020] text-white flex items-center justify-center">
                          <Zap size={14} />
                        </div>
                      </div>
                      <h3 className="text-4xl font-bold text-[#133020] mt-4">98%</h3>
                    </motion.div>

                    {/* Level */}
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 }}
                      className="bg-[#133020] rounded-[2.5rem] p-6 flex flex-col justify-between text-white relative overflow-hidden"
                    >
                      <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-[#046241] rounded-full blur-xl"></div>
                      <div className="flex justify-between items-start">
                        <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Level</span>
                        <div className="w-8 h-8 rounded-full bg-[#ffffff]/10 flex items-center justify-center">
                          <User size={14} />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold mt-4">04</h3>
                        <p className="text-white/40 text-xs">Senior Intern</p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Weekly Goals */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white rounded-[2.5rem] p-6 flex items-center justify-between shadow-sm flex-1"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#F9F7F7] flex items-center justify-center text-[#133020]/40">
                        <Target size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#133020]">Weekly Goals</h4>
                        <p className="text-[#133020]/40 text-xs">4 tasks remaining</p>
                      </div>
                    </div>
                    <button className="w-10 h-10 rounded-full border border-[#133020]/10 flex items-center justify-center text-[#133020]/40 hover:bg-[#133020] hover:text-white transition-all">
                      <ChevronRight size={20} />
                    </button>
                  </motion.div>
                </div>

              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};
