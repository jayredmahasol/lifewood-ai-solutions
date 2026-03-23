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
  Settings,
  Camera,
  Calendar,
  Hash,
  Heart,
  Map,
  Clock,
  Users,
  Activity,
  ChevronRight,
  ChevronLeft
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

const InputField = ({ label, icon: Icon, required, ...props }: any) => (
  <div className="space-y-2">
    <label className="text-xs font-bold uppercase tracking-wider text-[#133020]/50 ml-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative group">
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-[#133020]/30 group-focus-within:text-[#046241] transition-colors" size={18} />
      <input 
        required={required}
        {...props}
        className="w-full bg-[#F9F7F7] border border-[#133020]/10 rounded-xl focus:border-[#046241] focus:ring-4 focus:ring-[#046241]/5 py-3.5 pl-12 pr-4 outline-none text-[#133020] placeholder:text-[#133020]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
      />
    </div>
  </div>
);

const SelectField = ({ label, icon: Icon, options, required, ...props }: any) => (
  <div className="space-y-2">
    <label className="text-xs font-bold uppercase tracking-wider text-[#133020]/50 ml-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative group">
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-[#133020]/30 group-focus-within:text-[#046241] transition-colors" size={18} />
      <select 
        required={required}
        {...props}
        className="w-full bg-[#F9F7F7] border border-[#133020]/10 rounded-xl focus:border-[#046241] focus:ring-4 focus:ring-[#046241]/5 py-3.5 pl-12 pr-4 outline-none text-[#133020] placeholder:text-[#133020]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm appearance-none"
      >
        <option value="" disabled>Select {label}</option>
        {options.map((opt: any) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#133020]/30">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </div>
    </div>
  </div>
);

const SchoolSelect = ({ value, onChange, required }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const schools = [
    { value: 'University of Cebu – Lapu-Lapu and Mandaue', label: 'University of Cebu – Lapu-Lapu and Mandaue', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/87/University_of_Cebu_Logo.png/220px-University_of_Cebu_Logo.png' },
    { value: 'Cebu Institute of Technology – University', label: 'Cebu Institute of Technology – University', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/74/Cebu_Institute_of_Technology_-_University_logo.png/220px-Cebu_Institute_of_Technology_-_University_logo.png' },
    { value: 'Asian College of Technology', label: 'Asian College of Technology', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Asian_College_of_Technology_logo.png/220px-Asian_College_of_Technology_logo.png' },
    { value: 'University of San Carlos', label: 'University of San Carlos', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e9/University_of_San_Carlos_logo.png/220px-University_of_San_Carlos_logo.png' }
  ];

  const selectedSchool = schools.find(s => s.value === value);

  return (
    <div className="space-y-2 relative">
      <label className="text-xs font-bold uppercase tracking-wider text-[#133020]/50 ml-1">
        School {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative group">
        <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-[#133020]/30 group-focus-within:text-[#046241] transition-colors z-10" size={18} />
        
        {/* Hidden input for form validation */}
        <input type="text" value={value || ''} onChange={() => {}} required={required} className="absolute opacity-0 w-full h-full pointer-events-none" tabIndex={-1} />
        
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-[#F9F7F7] border border-[#133020]/10 rounded-xl focus:border-[#046241] focus:ring-4 focus:ring-[#046241]/5 py-3.5 pl-12 pr-4 outline-none text-[#133020] transition-all duration-300 shadow-sm flex items-center justify-between"
        >
          {selectedSchool ? (
            <div className="flex items-center gap-3">
              <img src={selectedSchool.logo} alt={selectedSchool.label} className="w-6 h-6 object-contain" />
              <span className="truncate text-left">{selectedSchool.label}</span>
            </div>
          ) : (
            <span className="text-[#133020]/30">Select School</span>
          )}
          <div className="text-[#133020]/30">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </div>
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 w-full mt-2 bg-white border border-[#133020]/10 rounded-xl shadow-lg z-50 overflow-hidden max-h-60 overflow-y-auto">
            {schools.map((school) => (
              <button
                key={school.value}
                type="button"
                onClick={() => {
                  onChange({ target: { value: school.value } });
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-[#F9F7F7] transition-colors ${value === school.value ? 'bg-[#046241]/5' : ''}`}
              >
                <img src={school.logo} alt={school.label} className="w-8 h-8 object-contain" />
                <span className="text-sm font-medium text-left">{school.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

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
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [school, setSchool] = useState('');
  const [designation, setDesignation] = useState('');
  const [internshipCoordinator, setInternshipCoordinator] = useState('');
  const [requiredHours, setRequiredHours] = useState('');
  const [educationalBackground, setEducationalBackground] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [age, setAge] = useState('');
  const [status, setStatus] = useState('');
  const [permanentAddress, setPermanentAddress] = useState('');
  const [presentAddress, setPresentAddress] = useState('');
  const [distance, setDistance] = useState('');
  const [timeTravel, setTimeTravel] = useState('');
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyRelationship, setEmergencyRelationship] = useState('');
  const [emergencyAddress, setEmergencyAddress] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [email, setEmail] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  
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

        if (profile) {
          if (profile.website === 'suspended') {
            await supabase.auth.signOut();
            window.location.hash = '#login';
            alert('Your account has been suspended. Please contact the administrator.');
            return;
          }
          setFirstName(profile.first_name || user.user_metadata?.full_name?.split(' ')[0] || 'User');
          setMiddleName(profile.middle_name || '');
          setLastName(profile.last_name || user.user_metadata?.full_name?.split(' ').slice(1).join(' ') || '');
          setContactNumber(profile.contact_number || '');
          setSchool(profile.school || '');
          setDesignation(profile.designation || '');
          setInternshipCoordinator(profile.internship_coordinator || '');
          setRequiredHours(profile.required_hours || '');
          setEducationalBackground(profile.educational_background || '');
          setGender(profile.gender || '');
          setDob(profile.dob || '');
          setAge(profile.age || '');
          setStatus(profile.status || '');
          setPermanentAddress(profile.permanent_address || '');
          setPresentAddress(profile.present_address || '');
          setDistance(profile.distance || '');
          setTimeTravel(profile.time_travel || '');
          setEmergencyName(profile.emergency_name || '');
          setEmergencyRelationship(profile.emergency_relationship || '');
          setEmergencyAddress(profile.emergency_address || '');
          setEmergencyContact(profile.emergency_contact || '');
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
          middle_name: middleName,
          last_name: lastName,
          contact_number: contactNumber,
          school: school,
          designation: designation,
          internship_coordinator: internshipCoordinator,
          required_hours: requiredHours,
          educational_background: educationalBackground,
          gender: gender,
          dob: dob,
          age: age,
          status: status,
          permanent_address: permanentAddress,
          present_address: presentAddress,
          distance: distance,
          time_travel: timeTravel,
          emergency_name: emergencyName,
          emergency_relationship: emergencyRelationship,
          emergency_address: emergencyAddress,
          emergency_contact: emergencyContact,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (profileError) throw profileError;

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

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploadingAvatar(true);
      setMessage(null);

      if (!e.target.files || e.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      setAvatarUrl(publicUrl);

      // Update profile with new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user.id);

      if (updateError) {
        throw updateError;
      }

      setMessage({ type: 'success', text: 'Avatar updated successfully!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setUploadingAvatar(false);
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
                <p className="text-[10px] font-bold text-[#133020]/40 uppercase tracking-wider">{designation || 'Data Specialist'}</p>
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
            <div className="p-8 max-w-4xl mx-auto">
              <div className="bg-white border border-[#133020]/10 rounded-3xl p-8 md:p-10 shadow-sm">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
                    <h3 className="text-2xl font-bold flex items-center gap-3 text-[#133020]">
                      <div className="p-2.5 rounded-xl bg-[#046241]/10 text-[#046241]">
                        <User size={24} />
                      </div>
                      Personal Information
                    </h3>
                    
                    {/* Avatar Upload */}
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-[#f5eedb] border-2 border-white shadow-sm flex items-center justify-center text-[#133020] font-bold text-xl overflow-hidden">
                          {avatarUrl ? (
                            <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                          ) : (
                            fullName.charAt(0).toUpperCase()
                          )}
                        </div>
                        <label className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#046241] rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-[#035436] transition-colors shadow-sm">
                          {uploadingAvatar ? <Loader2 size={12} className="animate-spin" /> : <Camera size={12} />}
                          <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} disabled={uploadingAvatar} />
                        </label>
                      </div>
                      <div className="text-sm">
                        <p className="font-bold text-[#133020]">Profile Picture</p>
                        <p className="text-[#133020]/50 text-xs">JPG, PNG or GIF (Max 2MB)</p>
                      </div>
                    </div>
                  </div>

                  {/* Stepper Progress */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between relative">
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-[#F9F7F7] rounded-full -z-10"></div>
                      <div 
                        className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#046241] rounded-full -z-10 transition-all duration-500"
                        style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
                      ></div>
                      
                      {[1, 2, 3, 4].map((step) => (
                        <div 
                          key={step}
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                            currentStep >= step 
                              ? 'bg-[#046241] text-white shadow-md shadow-[#046241]/20' 
                              : 'bg-white text-[#133020]/40 border-2 border-[#F9F7F7]'
                          }`}
                        >
                          {currentStep > step ? <Check size={14} /> : step}
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-2 text-[10px] font-bold uppercase tracking-wider text-[#133020]/50">
                      <span>Personal</span>
                      <span>Education</span>
                      <span>Address</span>
                      <span>Emergency</span>
                    </div>
                  </div>
                  
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

                  <div className="min-h-[300px]">
                    {currentStep === 1 && (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="grid grid-cols-1 gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <InputField label="First Name" icon={User} value={firstName} onChange={(e: any) => setFirstName(e.target.value)} placeholder="First Name" required />
                          <InputField label="Middle Name" icon={User} value={middleName} onChange={(e: any) => setMiddleName(e.target.value)} placeholder="Middle Name" />
                          <InputField label="Last Name" icon={User} value={lastName} onChange={(e: any) => setLastName(e.target.value)} placeholder="Last Name" required />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <SelectField label="Gender" icon={Users} value={gender} onChange={(e: any) => setGender(e.target.value)} options={[
                            { value: 'Male', label: 'Male' },
                            { value: 'Female', label: 'Female' },
                            { value: 'Other', label: 'Other' },
                            { value: 'Prefer not to say', label: 'Prefer not to say' }
                          ]} required />
                          <InputField label="Date of Birth" icon={Calendar} type="date" value={dob} onChange={(e: any) => setDob(e.target.value)} required />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <InputField label="Age" icon={Hash} type="number" value={age} onChange={(e: any) => setAge(e.target.value)} placeholder="Age" required />
                          <SelectField label="Status" icon={Heart} value={status} onChange={(e: any) => setStatus(e.target.value)} options={[
                            { value: 'Single', label: 'Single' },
                            { value: 'Married', label: 'Married' },
                            { value: 'Divorced', label: 'Divorced' },
                            { value: 'Widowed', label: 'Widowed' }
                          ]} required />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <InputField label="Email Address" icon={Mail} type="email" value={email} onChange={(e: any) => setEmail(e.target.value)} placeholder="name@company.com" required />
                          <InputField label="Contact Number" icon={Phone} value={contactNumber} onChange={(e: any) => setContactNumber(e.target.value)} placeholder="+1 234 567 8900" required />
                        </div>
                      </motion.div>
                    )}

                    {currentStep === 2 && (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="grid grid-cols-1 gap-6">
                        <div className="grid grid-cols-1 gap-6">
                          <SchoolSelect value={school} onChange={(e: any) => setSchool(e.target.value)} required />
                          <InputField label="Educational Background" icon={Briefcase} value={educationalBackground} onChange={(e: any) => setEducationalBackground(e.target.value)} placeholder="e.g. BS Information Technology" required />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <InputField label="Designation" icon={Briefcase} value={designation} onChange={(e: any) => setDesignation(e.target.value)} placeholder="Current Role" required />
                          <InputField label="Internship Coordinator" icon={User} value={internshipCoordinator} onChange={(e: any) => setInternshipCoordinator(e.target.value)} placeholder="Coordinator Name" required />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <InputField label="Required OJT Hours" icon={Clock} type="number" value={requiredHours} onChange={(e: any) => setRequiredHours(e.target.value)} placeholder="e.g. 500" required />
                        </div>
                      </motion.div>
                    )}

                    {currentStep === 3 && (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="grid grid-cols-1 gap-6">
                        <InputField label="Permanent Address" icon={MapPin} value={permanentAddress} onChange={(e: any) => setPermanentAddress(e.target.value)} placeholder="Full Permanent Address" required />
                        <InputField label="Present Address" icon={MapPin} value={presentAddress} onChange={(e: any) => setPresentAddress(e.target.value)} placeholder="Full Present Address" required />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <InputField label="Distance (km)" icon={Map} type="number" step="0.1" value={distance} onChange={(e: any) => setDistance(e.target.value)} placeholder="Distance from office" required />
                          <InputField label="Time Travel (min)" icon={Clock} type="number" value={timeTravel} onChange={(e: any) => setTimeTravel(e.target.value)} placeholder="Estimated travel time" required />
                        </div>
                      </motion.div>
                    )}

                    {currentStep === 4 && (
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="grid grid-cols-1 gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <InputField label="Contact Person" icon={User} value={emergencyName} onChange={(e: any) => setEmergencyName(e.target.value)} placeholder="Emergency Contact Name" required />
                          <InputField label="Relationship" icon={Users} value={emergencyRelationship} onChange={(e: any) => setEmergencyRelationship(e.target.value)} placeholder="e.g. Parent, Sibling" required />
                        </div>
                        <InputField label="Address" icon={MapPin} value={emergencyAddress} onChange={(e: any) => setEmergencyAddress(e.target.value)} placeholder="Emergency Contact Address" required />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <InputField label="Contact Number" icon={Phone} value={emergencyContact} onChange={(e: any) => setEmergencyContact(e.target.value)} placeholder="Emergency Contact Number" required />
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <div className="flex justify-between pt-6 border-t border-[#133020]/5 mt-8">
                      <button 
                        type="button"
                        onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                        className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors ${currentStep === 1 ? 'opacity-0 pointer-events-none' : 'text-[#133020]/60 hover:bg-[#F9F7F7]'}`}
                      >
                        <ChevronLeft size={18} /> Back
                      </button>
                      
                      {currentStep < totalSteps ? (
                        <button 
                          type="button"
                          onClick={() => {
                            // Basic validation before proceeding
                            let isValid = true;
                            const form = document.querySelector('form');
                            if (form) {
                              isValid = form.checkValidity();
                              if (!isValid) {
                                form.reportValidity();
                              }
                            }
                            if (isValid) {
                              setCurrentStep(prev => Math.min(totalSteps, prev + 1));
                            }
                          }}
                          className="bg-[#133020] hover:bg-[#0f2619] rounded-xl text-white px-8 py-3 font-bold transition-all flex items-center gap-2"
                        >
                          Next <ChevronRight size={18} />
                        </button>
                      ) : (
                        <button 
                          type="submit"
                          disabled={updating}
                          className="bg-[#046241] hover:bg-[#035436] rounded-xl text-white px-8 py-3 font-bold transition-all shadow-md shadow-[#046241]/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 hover:-translate-y-0.5"
                        >
                          {updating ? <Loader2 size={20} className="animate-spin" /> : 'Save Profile'}
                        </button>
                      )}
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
                        <span className="text-[#046241]">{fullName.split(' ')[0]}</span>
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
                      <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-[#FFB347] rounded-full blur-[60px] opacity-20"></div>
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
