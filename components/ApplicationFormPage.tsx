import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, CheckCircle, Loader2, Copy } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

export const ApplicationFormPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uniqueId, setUniqueId] = useState<string>('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    age: '',
    email: '',
    phone: '',
    country: '',
    address: '',
    position: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateUniqueId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'APP-';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const newUniqueId = generateUniqueId();
    let cvUrl = '';
    
    try {
      // Try to upload file to Supabase Storage if file exists
      if (file) {
        const fileExt = file.name.split('.').pop();
        const filePath = `${newUniqueId}-${Math.random()}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('resumes')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          });
          
        if (uploadError) {
          console.error('Upload error details:', uploadError);
          alert(`Failed to upload resume: ${uploadError.message}. Please check your storage bucket permissions.`);
          setIsSubmitting(false);
          return;
        } else if (uploadData) {
          const { data: publicUrlData } = supabase.storage
            .from('resumes')
            .getPublicUrl(filePath);
          cvUrl = publicUrlData.publicUrl;
        }
      }

      // Try to insert into Supabase
      const { data: insertData, error } = await supabase
        .from('applicants')
        .insert([
          {
            unique_id: newUniqueId,
            first_name: formData.firstName,
            last_name: formData.lastName,
            gender: formData.gender,
            age: parseInt(formData.age) || null,
            email: formData.email,
            phone_number: formData.phone,
            country: formData.country,
            current_address: formData.address,
            position_applied: formData.position,
            status: 'Pending Review',
            cv_name: fileName,
            cv_url: cvUrl
          }
        ])
        .select();
        
      if (error) {
        console.error('Supabase insert error:', error);
        alert(`Failed to submit application: ${error.message}`);
        setIsSubmitting(false);
        return;
      }
      
      if (!insertData || insertData.length === 0) {
        alert("Application submitted, but the database didn't return the saved record. This might be due to Row Level Security (RLS) policies.");
      }
      
      setUniqueId(newUniqueId);
      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (err: any) {
      console.error('Error submitting application:', err);
      alert(`An error occurred while submitting your application: ${err.message || 'Unknown error'}`);
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(uniqueId);
    alert('Application ID copied to clipboard!');
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#f5eedb] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[2rem] p-12 max-w-lg w-full text-center shadow-xl border border-[#133020]/5"
        >
          <div className="w-20 h-20 bg-[#046241]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-[#046241]" />
          </div>
          <h2 className="text-3xl font-bold text-[#133020] mb-4">Application Submitted!</h2>
          <p className="text-[#133020]/70 mb-6">
            Thank you for applying to Lifewood. Our recruitment team will review your application and get back to you soon.
          </p>
          
          <div className="bg-[#F9F7F7] border border-[#133020]/10 rounded-2xl p-6 mb-8">
            <p className="text-sm text-[#133020]/60 mb-2 font-medium uppercase tracking-wider">Your Application ID</p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-3xl font-bold text-[#046241] tracking-wider">{uniqueId}</span>
              <button 
                onClick={copyToClipboard}
                className="p-2 text-[#133020]/40 hover:text-[#046241] hover:bg-[#046241]/10 rounded-lg transition-colors"
                title="Copy ID"
              >
                <Copy size={20} />
              </button>
            </div>
            <p className="text-xs text-[#133020]/50 mt-3">
              Please save this ID. You can use it to check your application status later.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#careers"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-[#133020] text-white rounded-full font-bold hover:bg-[#046241] transition-colors"
            >
              Back to Careers
            </a>
            <a 
              href="#application-status"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white text-[#133020] border border-[#133020]/20 rounded-full font-bold hover:bg-[#F9F7F7] transition-colors"
            >
              Check Status
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5eedb] pt-32 pb-20 px-6 font-sans">
      <div className="max-w-3xl mx-auto">
        <a 
          href="#careers"
          className="inline-flex items-center gap-2 text-[#133020]/60 hover:text-[#046241] transition-colors mb-8 font-medium"
        >
          <ArrowLeft size={20} />
          Back to Careers
        </a>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-[#133020]/5 relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFB347] rounded-full blur-[80px] opacity-10 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#046241] rounded-full blur-[80px] opacity-5 translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-[#133020] mb-4">Join Our Team</h1>
            <p className="text-[#133020]/70 text-lg mb-10">Please fill out the form below to apply for a position at Lifewood.</p>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#133020]/50 border-b border-[#133020]/10 pb-3 mb-6">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#133020]">First Name *</label>
                    <input required name="firstName" value={formData.firstName} onChange={handleInputChange} type="text" className="w-full bg-[#F9F7F7] border border-[#133020]/10 rounded-xl px-4 py-3 text-[#133020] outline-none focus:border-[#046241] focus:ring-2 focus:ring-[#046241]/20 transition-all" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#133020]">Last Name *</label>
                    <input required name="lastName" value={formData.lastName} onChange={handleInputChange} type="text" className="w-full bg-[#F9F7F7] border border-[#133020]/10 rounded-xl px-4 py-3 text-[#133020] outline-none focus:border-[#046241] focus:ring-2 focus:ring-[#046241]/20 transition-all" placeholder="Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#133020]">Gender *</label>
                    <select required name="gender" value={formData.gender} onChange={handleInputChange} className="w-full bg-[#F9F7F7] border border-[#133020]/10 rounded-xl px-4 py-3 text-[#133020] outline-none focus:border-[#046241] focus:ring-2 focus:ring-[#046241]/20 transition-all appearance-none">
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#133020]">Age *</label>
                    <input required name="age" value={formData.age} onChange={handleInputChange} type="number" min="18" className="w-full bg-[#F9F7F7] border border-[#133020]/10 rounded-xl px-4 py-3 text-[#133020] outline-none focus:border-[#046241] focus:ring-2 focus:ring-[#046241]/20 transition-all" placeholder="25" />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#133020]/50 border-b border-[#133020]/10 pb-3 mb-6">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#133020]">Email Address *</label>
                    <input required name="email" value={formData.email} onChange={handleInputChange} type="email" className="w-full bg-[#F9F7F7] border border-[#133020]/10 rounded-xl px-4 py-3 text-[#133020] outline-none focus:border-[#046241] focus:ring-2 focus:ring-[#046241]/20 transition-all" placeholder="john.doe@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#133020]">Phone Number *</label>
                    <input required name="phone" value={formData.phone} onChange={handleInputChange} type="tel" className="w-full bg-[#F9F7F7] border border-[#133020]/10 rounded-xl px-4 py-3 text-[#133020] outline-none focus:border-[#046241] focus:ring-2 focus:ring-[#046241]/20 transition-all" placeholder="+1 (555) 000-0000" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#133020]">Country *</label>
                    <select required name="country" value={formData.country} onChange={handleInputChange} className="w-full bg-[#F9F7F7] border border-[#133020]/10 rounded-xl px-4 py-3 text-[#133020] outline-none focus:border-[#046241] focus:ring-2 focus:ring-[#046241]/20 transition-all appearance-none">
                      <option value="">Select Country</option>
                      <option value="Philippines">Philippines</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Malaysia">Malaysia</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#133020]">Current Address *</label>
                    <input required name="address" value={formData.address} onChange={handleInputChange} type="text" className="w-full bg-[#F9F7F7] border border-[#133020]/10 rounded-xl px-4 py-3 text-[#133020] outline-none focus:border-[#046241] focus:ring-2 focus:ring-[#046241]/20 transition-all" placeholder="123 Main St, City, State, Zip" />
                  </div>
                </div>
              </div>

              {/* Application Details */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#133020]/50 border-b border-[#133020]/10 pb-3 mb-6">Application Details</h3>
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#133020]">Position Applied For *</label>
                    <select required name="position" value={formData.position} onChange={handleInputChange} className="w-full bg-[#F9F7F7] border border-[#133020]/10 rounded-xl px-4 py-3 text-[#133020] outline-none focus:border-[#046241] focus:ring-2 focus:ring-[#046241]/20 transition-all appearance-none">
                      <option value="">Select Position</option>
                      <option value="AI Data Annotator">AI Data Annotator</option>
                      <option value="Machine Learning Engineer">Machine Learning Engineer</option>
                      <option value="Data Scientist">Data Scientist</option>
                      <option value="Software Developer">Software Developer</option>
                      <option value="Project Manager">Project Manager</option>
                      <option value="Quality Assurance Specialist">Quality Assurance Specialist</option>
                      <option value="Internship Program">Internship Program</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#133020]">Upload CV / Resume *</label>
                    <div className="relative">
                      <input 
                        required 
                        type="file" 
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                      />
                      <div className={`w-full border-2 border-dashed rounded-2xl p-8 text-center transition-colors ${fileName ? 'border-[#046241] bg-[#046241]/5' : 'border-[#133020]/20 bg-[#F9F7F7] hover:border-[#046241]/50'}`}>
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                          <Upload size={20} className={fileName ? "text-[#046241]" : "text-[#133020]/50"} />
                        </div>
                        {fileName ? (
                          <p className="text-[#046241] font-bold">{fileName}</p>
                        ) : (
                          <>
                            <p className="text-[#133020] font-bold mb-1">Click to upload or drag and drop</p>
                            <p className="text-[#133020]/50 text-sm">PDF, DOC, or DOCX (Max 5MB)</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#133020] text-white rounded-xl font-bold text-lg hover:bg-[#046241] transition-colors shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={24} className="animate-spin" />
                      Submitting Application...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
