import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Mail, Phone, MapPin, Calendar, Clock, 
  Briefcase, GraduationCap, Heart, AlertCircle,
  Save, ChevronDown, ArrowLeft, Camera, Upload, Loader2
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import Stepper, { Step } from './react-bits/Stepper';

const schools = [
  { name: 'University of Cebu', logo: 'https://upload.wikimedia.org/wikipedia/en/6/6c/University_of_Cebu_logo.png' },
  { name: 'Cebu Normal University', logo: 'https://upload.wikimedia.org/wikipedia/en/e/e3/Cebu_Normal_University_logo.png' },
  { name: 'Cebu Institute of Technology – University', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/87/Cebu_Institute_of_Technology_-_University_logo.png/220px-Cebu_Institute_of_Technology_-_University_logo.png' },
  { name: 'Cebu Technological University', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Cebu_Technological_University_logo.png' },
  { name: 'Cebu Eastern College', logo: 'https://upload.wikimedia.org/wikipedia/en/5/58/Cebu_Eastern_College_logo.png' },
  { name: 'Southwestern University', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c2/Southwestern_University_PH_logo.png/220px-Southwestern_University_PH_logo.png' },
  { name: 'University of San Carlos', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3c/University_of_San_Carlos_logo.png/220px-University_of_San_Carlos_logo.png' },
  { name: 'University of San Jose Recoletos', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2a/University_of_San_Jose-Recoletos_logo.png/220px-University_of_San_Jose-Recoletos_logo.png' }
];

const InputGroup = ({ label, icon: Icon, children, className = "" }: any) => (
  <div className={`space-y-2 ${className}`}>
    <label className="text-xs font-bold uppercase tracking-wider text-[#133020]/50 ml-1 flex items-center gap-2">
      {Icon && <Icon size={14} />}
      {label}
    </label>
    {children}
  </div>
);

const TextInput = ({ ...props }) => (
  <input 
    {...props}
    className="w-full bg-[#f5eedb]/50 border border-[#133020]/10 focus:border-[#046241] focus:ring-4 focus:ring-[#046241]/5 rounded-xl py-3 px-4 outline-none text-[#133020] placeholder:text-[#133020]/30 transition-all duration-300"
  />
);

export const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    lastName: '', firstName: '', middleName: '',
    designation: '', internshipCoordinator: '',
    school: '', requiredHours: '', educationalBackground: '',
    gender: '', dob: '', age: '', status: '',
    permanentAddress: '', presentAddress: '',
    distance: '', timeTravel: '',
    email: '', contactNumber: '',
    emergencyName: '', emergencyRelationship: '',
    emergencyAddress: '', emergencyContact: ''
  });

  const [setupRequired, setSetupRequired] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          // Fetch existing profile
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          if (error) {
            if (error.code === 'PGRST205') {
              console.error('Table not found, setup required:', error);
              setSetupRequired(true);
            } else if (error.code !== 'PGRST116') {
              console.error('Error fetching profile:', error);
            }
          }

          if (profile) {
            setFormData({
              lastName: profile.last_name || '',
              firstName: profile.first_name || '',
              middleName: profile.middle_name || '',
              designation: profile.designation || '',
              internshipCoordinator: profile.internship_coordinator || '',
              school: profile.school || '',
              requiredHours: profile.required_hours || '',
              educationalBackground: profile.educational_background || '',
              gender: profile.gender || '',
              dob: profile.dob || '',
              age: profile.age || '',
              status: profile.status || '',
              permanentAddress: profile.permanent_address || '',
              presentAddress: profile.present_address || '',
              distance: profile.distance || '',
              timeTravel: profile.time_travel || '',
              email: profile.email || user.email || '',
              contactNumber: profile.contact_number || '',
              emergencyName: profile.emergency_name || '',
              emergencyRelationship: profile.emergency_relationship || '',
              emergencyAddress: profile.emergency_address || '',
              emergencyContact: profile.emergency_contact || ''
            });
            if (profile.avatar_url) {
              setAvatarUrl(profile.avatar_url);
            }
          } else {
            // Pre-fill from auth metadata if no profile exists
            setFormData(prev => ({
              ...prev,
              email: user.email || '',
              firstName: user.user_metadata?.full_name?.split(' ')[0] || '',
              lastName: user.user_metadata?.full_name?.split(' ').slice(1).join(' ') || ''
            }));
            if (user.user_metadata?.avatar_url) {
              setAvatarUrl(user.user_metadata.avatar_url);
            }
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

  if (setupRequired) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5eedb] p-6">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-2xl w-full border border-red-200">
          <div className="flex items-center gap-3 mb-6 text-red-600">
            <AlertCircle size={32} />
            <h2 className="text-2xl font-bold">Database Setup Required</h2>
          </div>
          <p className="mb-4 text-gray-700">
            The database table <code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">public.profiles</code> is missing. 
            Please run the following SQL in your Supabase SQL Editor to create the necessary tables and policies:
          </p>
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6 text-sm font-mono custom-scrollbar">
            <pre>{`-- Create a table for public profiles
create table profiles (
  id uuid references auth.users not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  website text,
  
  -- Custom fields
  last_name text,
  first_name text,
  middle_name text,
  designation text,
  internship_coordinator text,
  school text,
  required_hours text,
  educational_background text,
  gender text,
  dob text,
  age text,
  status text,
  permanent_address text,
  present_address text,
  distance text,
  time_travel text,
  email text,
  contact_number text,
  emergency_name text,
  emergency_relationship text,
  emergency_address text,
  emergency_contact text,

  constraint username_length check (char_length(username) >= 3)
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Set up Storage!
insert into storage.buckets (id, name, public)
  values ('avatars', 'avatars', true);

create policy "Avatar images are publicly accessible."
  on storage.objects for select
  using ( bucket_id = 'avatars' );

create policy "Anyone can upload an avatar."
  on storage.objects for insert
  with check ( bucket_id = 'avatars' );

create policy "Anyone can update their own avatar."
  on storage.objects for update
  using ( auth.uid() = owner )
  with check ( bucket_id = 'avatars' );`}</pre>
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-[#046241] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#035436] transition-colors w-full"
          >
            I've run the SQL, Refresh Page
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      
      // Display immediately
      const objectUrl = URL.createObjectURL(file);
      setAvatarUrl(objectUrl);

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user logged in');

      // Upload image to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      setAvatarUrl(publicUrl);

      // Update profile with new avatar URL
      // Use update instead of upsert to avoid overwriting other fields
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          avatar_url: publicUrl,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (updateError) {
        // If update fails (e.g. row doesn't exist yet), we upsert with current form data
        const updates = {
          id: user.id,
          last_name: formData.lastName,
          first_name: formData.firstName,
          middle_name: formData.middleName,
          designation: formData.designation,
          internship_coordinator: formData.internshipCoordinator,
          school: formData.school,
          required_hours: formData.requiredHours,
          educational_background: formData.educationalBackground,
          gender: formData.gender,
          dob: formData.dob,
          age: formData.age,
          status: formData.status,
          permanent_address: formData.permanentAddress,
          present_address: formData.presentAddress,
          distance: formData.distance,
          time_travel: formData.timeTravel,
          email: formData.email,
          contact_number: formData.contactNumber,
          emergency_name: formData.emergencyName,
          emergency_relationship: formData.emergencyRelationship,
          emergency_address: formData.emergencyAddress,
          emergency_contact: formData.emergencyContact,
          avatar_url: publicUrl,
          updated_at: new Date().toISOString(),
        };
        await supabase.from('profiles').upsert(updates);
      }
      
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  const handleSave = async () => {
    setSaveStatus('saving');
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user logged in');

      const updates = {
        id: user.id,
        last_name: formData.lastName,
        first_name: formData.firstName,
        middle_name: formData.middleName,
        designation: formData.designation,
        internship_coordinator: formData.internshipCoordinator,
        school: formData.school,
        required_hours: formData.requiredHours,
        educational_background: formData.educationalBackground,
        gender: formData.gender,
        dob: formData.dob,
        age: formData.age,
        status: formData.status,
        permanent_address: formData.permanentAddress,
        present_address: formData.presentAddress,
        distance: formData.distance,
        time_travel: formData.timeTravel,
        email: formData.email,
        contact_number: formData.contactNumber,
        emergency_name: formData.emergencyName,
        emergency_relationship: formData.emergencyRelationship,
        emergency_address: formData.emergencyAddress,
        emergency_contact: formData.emergencyContact,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('profiles')
        .upsert(updates);

      if (error) throw error;
      
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  if (loading) return <div className="h-full flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-[#046241] border-t-transparent rounded-full"></div></div>;

  return (
    <div className="h-full font-sans flex flex-col relative">
      {/* Loading Overlay */}
      {saveStatus !== 'idle' && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full flex flex-col items-center text-center"
          >
            {saveStatus === 'saving' && (
              <>
                <h3 className="text-xl font-bold text-[#133020] mb-4">Updating Profile...</h3>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                  <motion.div 
                    className="h-full bg-[#046241]"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
                  />
                </div>
                <p className="text-sm text-gray-500">Please wait while we save your changes.</p>
              </>
            )}
            
            {saveStatus === 'success' && (
              <>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  >
                    <Save size={32} className="text-[#046241]" />
                  </motion.div>
                </div>
                <h3 className="text-xl font-bold text-[#133020] mb-2">Profile Updated!</h3>
                <p className="text-sm text-gray-500">Your information has been successfully saved.</p>
              </>
            )}

            {saveStatus === 'error' && (
              <>
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <AlertCircle size={32} className="text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-[#133020] mb-2">Update Failed</h3>
                <p className="text-sm text-gray-500">Something went wrong. Please try again.</p>
              </>
            )}
          </motion.div>
        </div>
      )}

      {/* Main Card Container */}
      <div className="flex-1 max-w-[1600px] mx-auto w-full bg-white/80 backdrop-blur-2xl border border-white/50 rounded-r-[3rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        
        {/* Sidebar / Profile Info */}
        <aside className="w-full lg:w-[400px] bg-[#133020] text-white p-10 flex flex-col items-center relative overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#046241] rounded-full blur-[80px] opacity-50 -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FFB347] rounded-full blur-[80px] opacity-20 translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10 flex flex-col items-center w-full h-full">
            {/* Profile Image */}
            <div className="relative group cursor-pointer mb-6">
              <div className="w-48 h-48 rounded-full border-4 border-[#FFB347] overflow-hidden bg-white shadow-2xl">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#f5eedb] text-[#133020]">
                    <User size={64} opacity={0.5} />
                  </div>
                )}
              </div>
              
              {/* Upload Overlay */}
              <div 
                className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => fileInputRef.current?.click()}
              >
                {uploading ? (
                  <Loader2 size={32} className="text-white animate-spin" />
                ) : (
                  <Camera size={32} className="text-white" />
                )}
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                accept="image/*" 
                className="hidden" 
              />
            </div>

            <h2 className="text-3xl font-bold text-center mb-2">{formData.firstName} {formData.lastName || 'User'}</h2>
            <div className="px-4 py-1.5 bg-white/10 rounded-full text-sm font-medium backdrop-blur-sm border border-white/10 mb-8">
              {formData.designation || 'Intern / Student'}
            </div>

            {/* Quick Stats / Info */}
            <div className="w-full space-y-6 mt-auto">
              <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                <div className="flex items-center gap-3 mb-2 text-[#FFB347]">
                  <Briefcase size={18} />
                  <span className="text-xs font-bold uppercase tracking-wider">School</span>
                </div>
                <p className="font-medium text-lg leading-tight">{formData.school || 'Not set'}</p>
              </div>

              <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                <div className="flex items-center gap-3 mb-2 text-[#FFB347]">
                  <Clock size={18} />
                  <span className="text-xs font-bold uppercase tracking-wider">Required Hours</span>
                </div>
                <p className="font-medium text-lg">{formData.requiredHours ? `${formData.requiredHours} Hours` : 'Not set'}</p>
              </div>

              <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                <div className="flex items-center gap-3 mb-2 text-[#FFB347]">
                  <MapPin size={18} />
                  <span className="text-xs font-bold uppercase tracking-wider">Location</span>
                </div>
                <p className="font-medium text-sm opacity-80 leading-relaxed">{formData.presentAddress || 'Not set'}</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content / Stepper */}
        <main className="flex-1 bg-[#F9F7F7] relative flex flex-col">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar p-0">
             <Stepper
              initialStep={1}
              onFinalStepCompleted={handleSave}
              backButtonText="Previous"
              nextButtonText="Next"
              stepCircleContainerClassName="shadow-none border-0 bg-transparent max-w-none w-full h-full flex flex-col"
              stepContainerClassName="px-12 py-8 bg-white border-b border-[#133020]/5 sticky top-0 z-20"
              contentClassName="px-12 py-8 flex-1"
              footerClassName="px-12 py-8 bg-white border-t border-[#133020]/5 sticky bottom-0 z-20"
            >
              {/* Step 1: Personal Information */}
              <Step>
                <div className="max-w-4xl mx-auto">
                  <h3 className="text-2xl font-bold text-[#133020] mb-2">Personal Information</h3>
                  <p className="text-[#133020]/60 mb-8">Please provide your basic personal details.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <InputGroup label="Last Name">
                      <TextInput name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Doe" />
                    </InputGroup>
                    <InputGroup label="First Name">
                      <TextInput name="firstName" value={formData.firstName} onChange={handleChange} placeholder="John" />
                    </InputGroup>
                    <InputGroup label="Middle Name">
                      <TextInput name="middleName" value={formData.middleName} onChange={handleChange} placeholder="Smith" />
                    </InputGroup>
                    
                    <InputGroup label="Gender" icon={User}>
                      <select name="gender" value={formData.gender} onChange={handleChange} className="w-full bg-[#f5eedb]/50 border border-[#133020]/10 rounded-xl py-3 px-4 outline-none text-[#133020]">
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </InputGroup>
                    <InputGroup label="Date of Birth" icon={Calendar}>
                      <TextInput type="date" name="dob" value={formData.dob} onChange={handleChange} />
                    </InputGroup>
                    <InputGroup label="Age">
                      <TextInput type="number" name="age" value={formData.age} onChange={handleChange} placeholder="21" />
                    </InputGroup>
                    
                    <InputGroup label="Civil Status" icon={Heart}>
                      <select name="status" value={formData.status} onChange={handleChange} className="w-full bg-[#f5eedb]/50 border border-[#133020]/10 rounded-xl py-3 px-4 outline-none text-[#133020]">
                        <option value="">Select Status</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Widowed">Widowed</option>
                      </select>
                    </InputGroup>
                  </div>
                </div>
              </Step>

              {/* Step 2: Academic Information */}
              <Step>
                <div className="max-w-4xl mx-auto">
                  <h3 className="text-2xl font-bold text-[#133020] mb-2">Academic Information</h3>
                  <p className="text-[#133020]/60 mb-8">Details about your current education and internship.</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputGroup label="School" icon={GraduationCap} className="md:col-span-2">
                      <div className="relative">
                        <select 
                          name="school" 
                          value={formData.school} 
                          onChange={handleChange} 
                          className="w-full bg-[#f5eedb]/50 border border-[#133020]/10 rounded-xl py-3 pl-12 pr-4 outline-none text-[#133020] appearance-none"
                        >
                          <option value="">Select School</option>
                          {schools.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                        </select>
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 pointer-events-none">
                          {formData.school ? (
                            <img src={schools.find(s => s.name === formData.school)?.logo} alt="Logo" className="w-full h-full object-contain" />
                          ) : (
                            <GraduationCap size={20} className="text-[#133020]/30" />
                          )}
                        </div>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#133020]/30 pointer-events-none" size={16} />
                      </div>
                    </InputGroup>

                    <InputGroup label="Designation" icon={Briefcase}>
                      <TextInput name="designation" value={formData.designation} onChange={handleChange} placeholder="e.g. Web Developer Intern" />
                    </InputGroup>
                    <InputGroup label="Internship Coordinator" icon={User}>
                      <TextInput name="internshipCoordinator" value={formData.internshipCoordinator} onChange={handleChange} placeholder="Coordinator Name" />
                    </InputGroup>
                    <InputGroup label="Required OJT Hours" icon={Clock}>
                      <TextInput type="number" name="requiredHours" value={formData.requiredHours} onChange={handleChange} placeholder="e.g. 600" />
                    </InputGroup>
                    <InputGroup label="Educational Background" icon={GraduationCap}>
                      <TextInput name="educationalBackground" value={formData.educationalBackground} onChange={handleChange} placeholder="BS Computer Science" />
                    </InputGroup>
                  </div>
                </div>
              </Step>

              {/* Step 3: Contact & Address */}
              <Step>
                <div className="max-w-4xl mx-auto">
                  <h3 className="text-2xl font-bold text-[#133020] mb-2">Contact & Address</h3>
                  <p className="text-[#133020]/60 mb-8">How can we reach you?</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputGroup label="Email Address" icon={Mail}>
                      <TextInput type="email" name="email" value={formData.email} onChange={handleChange} />
                    </InputGroup>
                    <InputGroup label="Contact Number" icon={Phone}>
                      <TextInput name="contactNumber" value={formData.contactNumber} onChange={handleChange} placeholder="+63 900 000 0000" />
                    </InputGroup>
                    
                    <InputGroup label="Permanent Address" icon={MapPin} className="md:col-span-2">
                      <TextInput name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} placeholder="Full Address" />
                    </InputGroup>
                    <InputGroup label="Present Address" icon={MapPin} className="md:col-span-2">
                      <TextInput name="presentAddress" value={formData.presentAddress} onChange={handleChange} placeholder="Full Address (if different)" />
                    </InputGroup>
                    
                    <InputGroup label="Distance (km)" icon={MapPin}>
                      <TextInput type="number" name="distance" value={formData.distance} onChange={handleChange} placeholder="e.g. 5.2" />
                    </InputGroup>
                    <InputGroup label="Travel Time (min)" icon={Clock}>
                      <TextInput type="number" name="timeTravel" value={formData.timeTravel} onChange={handleChange} placeholder="e.g. 30" />
                    </InputGroup>
                  </div>
                </div>
              </Step>

              {/* Step 4: Emergency Contact */}
              <Step>
                <div className="max-w-4xl mx-auto">
                  <h3 className="text-2xl font-bold text-[#133020] mb-2">Emergency Contact</h3>
                  <p className="text-[#133020]/60 mb-8">Who should we contact in case of emergency?</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputGroup label="Contact Person">
                      <TextInput name="emergencyName" value={formData.emergencyName} onChange={handleChange} placeholder="Full Name" />
                    </InputGroup>
                    <InputGroup label="Relationship">
                      <TextInput name="emergencyRelationship" value={formData.emergencyRelationship} onChange={handleChange} placeholder="e.g. Parent" />
                    </InputGroup>
                    <InputGroup label="Contact Number" icon={Phone}>
                      <TextInput name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} placeholder="+63 900 000 0000" />
                    </InputGroup>
                    <InputGroup label="Address" icon={MapPin}>
                      <TextInput name="emergencyAddress" value={formData.emergencyAddress} onChange={handleChange} placeholder="Full Address" />
                    </InputGroup>
                  </div>
                </div>
              </Step>
            </Stepper>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
