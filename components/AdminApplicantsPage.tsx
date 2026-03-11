import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import { 
  Users, Search, Filter, MoreVertical, ShieldCheck, 
  User, Mail, MapPin, Briefcase, Clock, LogOut, ChevronLeft, ChevronRight, X, Save, Loader2, FileText, Download, Trash2
} from 'lucide-react';

export const AdminApplicantsPage = () => {
  const [applicants, setApplicants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // Modal State
  const [selectedApplicant, setSelectedApplicant] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [generatedCredentials, setGeneratedCredentials] = useState<{email: string, password: string} | null>(null);

  const rejectionTemplates = [
    "Thank you for your interest. Unfortunately, we have decided to move forward with other candidates whose qualifications better match our current needs.",
    "While your background is impressive, we are looking for someone with more specific experience in this area.",
    "We have decided to put this position on hold for the time being. We will keep your resume on file for future opportunities."
  ];

  useEffect(() => {
    // Check if admin
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      window.location.hash = '#login';
      return;
    }

    const fetchApplicants = async () => {
      try {
        const { data, error } = await supabase
          .from('applicants')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching applicants:', error);
          setApplicants([]);
        } else {
          setApplicants(data || []);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    window.location.hash = '#login';
  };

  const handleRowClick = (applicant: any) => {
    setSelectedApplicant(applicant);
    setEditFormData({ ...applicant });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedApplicant(null);
    setGeneratedCredentials(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const generateTempPassword = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const addNotification = (type: 'success' | 'error' | 'warning' | 'info', title: string, message: string) => {
    const stored = localStorage.getItem('admin_notifications');
    const notifications = stored ? JSON.parse(stored) : [];
    const newNotification = {
      id: Date.now().toString(),
      type,
      title,
      message,
      date: new Date().toISOString(),
      read: false
    };
    localStorage.setItem('admin_notifications', JSON.stringify([newNotification, ...notifications]));
  };

  const handleSaveApplicant = async () => {
    setSaving(true);
    try {
      // Handle Hired status
      if (editFormData.status === 'Hired' && selectedApplicant.status !== 'Hired') {
        // Check if user already exists in profiles
        const { data: existingProfile, error: profileError } = await supabase
          .from('profiles')
          .select('id')
          .eq('email', selectedApplicant.email)
          .single();

        if (existingProfile) {
          addNotification('warning', 'Account Already Exists', `An account with the email ${selectedApplicant.email} already exists in the system. Status was updated to Hired, but no new account was created.`);
          // We still want to update the applicant status, so we don't return here anymore
        } else {
          // Generate temporary credentials
          const tempPassword = generateTempPassword();
          
          // Create auth user
          const { data: authData, error: authError } = await supabase.auth.signUp({
            email: selectedApplicant.email,
            password: tempPassword,
            options: {
              data: {
                full_name: `${selectedApplicant.first_name} ${selectedApplicant.last_name}`,
              }
            }
          });

          if (authError) {
            if (authError.message.includes('already registered')) {
              addNotification('warning', 'Account Already Exists', `An account with the email ${selectedApplicant.email} already exists in the system. Status was updated to Hired, but no new account was created.`);
            } else {
              throw authError;
            }
          } else {
            // Sign out immediately so admin doesn't get logged in as the new user
            await supabase.auth.signOut();

            setGeneratedCredentials({
              email: selectedApplicant.email,
              password: tempPassword
            });

            addNotification('success', 'New Account Created', `A new account was automatically generated for ${selectedApplicant.first_name} ${selectedApplicant.last_name} (${selectedApplicant.email}).`);
          }
        }
      }

      const { error } = await supabase
        .from('applicants')
        .update({
          status: editFormData.status,
          rejection_reason: editFormData.status === 'Failed' ? editFormData.rejection_reason : null
        })
        .eq('id', selectedApplicant.id);

      if (error) throw error;

      // Update local state
      setApplicants(prev => prev.map(a => a.id === selectedApplicant.id ? { ...a, ...editFormData } : a));
      
      if (editFormData.status !== 'Hired') {
        handleModalClose();
      }
    } catch (err: any) {
      console.error('Error updating applicant:', err);
      addNotification('error', 'Update Failed', `Failed to update applicant ${selectedApplicant.first_name} ${selectedApplicant.last_name}: ${err.message || 'Unknown error'}`);
      alert(`Failed to update applicant: ${err.message || 'Unknown error'}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteApplicant = async (e: React.MouseEvent, id: string, name: string) => {
    e.stopPropagation();
    if (!window.confirm(`Are you sure you want to delete the application for ${name}? This action cannot be undone.`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('applicants')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setApplicants(prev => prev.filter(a => a.id !== id));
      addNotification('info', 'Applicant Deleted', `The application for ${name} was successfully deleted.`);
    } catch (err: any) {
      console.error('Error deleting applicant:', err);
      addNotification('error', 'Delete Failed', `Failed to delete applicant ${name}: ${err.message || 'Unknown error'}`);
      alert(`Failed to delete applicant: ${err.message || 'Unknown error'}`);
    }
  };

  // Filter applicants based on search
  const filteredApplicants = applicants.filter(applicant => 
    (applicant.first_name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (applicant.last_name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (applicant.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (applicant.unique_id?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (applicant.position_applied?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastApplicant = currentPage * usersPerPage;
  const indexOfFirstApplicant = indexOfLastApplicant - usersPerPage;
  const currentApplicants = filteredApplicants.slice(indexOfFirstApplicant, indexOfLastApplicant);
  const totalPages = Math.ceil(filteredApplicants.length / usersPerPage);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5eedb] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-[#046241] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5eedb] font-sans flex flex-col">
      {/* Admin Header */}
      <header className="bg-[#133020] text-white px-8 py-4 flex items-center justify-between sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center overflow-hidden p-1">
              <img src="https://framerusercontent.com/images/BZSiFYgRc4wDUAuEybhJbZsIBQY.png" alt="Lifewood Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-xl font-bold leading-tight">Admin Dashboard</h1>
              <p className="text-white/60 text-xs">Manage Lifewood Applicants</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-2 ml-8">
            <a href="#admin-dashboard" className="px-4 py-2 text-white/60 hover:bg-white/5 hover:text-white rounded-lg font-medium text-sm transition-colors">
              Interns
            </a>
            <a href="#admin-applicants" className="px-4 py-2 bg-white/10 text-white rounded-lg font-medium text-sm transition-colors">
              Applicants
            </a>
            <a href="#admin-notifications" className="px-4 py-2 text-white/60 hover:bg-white/5 hover:text-white rounded-lg font-medium text-sm transition-colors">
              Notifications
            </a>
          </nav>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <User size={16} />
            </div>
            <span className="text-sm font-medium">Administrator</span>
          </div>
          <div className="w-px h-6 bg-white/10"></div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-white/60 hover:text-red-400 transition-colors text-sm font-medium"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl font-bold text-[#133020]">Applicants</h2>
              <p className="text-[#133020]/60 mt-1">Manage job applications and track hiring status.</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#133020]/40" size={20} />
                <input 
                  type="text" 
                  placeholder="Search applicants..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2.5 bg-white border border-[#133020]/10 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#046241]/20 w-full md:w-64 transition-all"
                />
              </div>
            </div>
          </header>

          {/* Applicants Table Section */}
          <div className="bg-white rounded-[2rem] shadow-sm border border-[#133020]/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F9F7F7] text-[#133020]/60 text-xs uppercase tracking-wider border-b border-[#133020]/5">
                    <th className="px-6 py-4 font-semibold">Applicant</th>
                    <th className="px-6 py-4 font-semibold">Unique ID</th>
                    <th className="px-6 py-4 font-semibold">Position</th>
                    <th className="px-6 py-4 font-semibold">Date Applied</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#133020]/5">
                  {currentApplicants.length > 0 ? (
                    currentApplicants.map((applicant) => (
                      <tr 
                        key={applicant.id} 
                        className="hover:bg-[#F9F7F7]/50 transition-colors cursor-pointer group"
                        onClick={() => handleRowClick(applicant)}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#046241]/10 flex items-center justify-center text-[#046241] font-bold text-sm">
                              {applicant.first_name?.charAt(0)}{applicant.last_name?.charAt(0)}
                            </div>
                            <div>
                              <div className="font-semibold text-[#133020]">{applicant.first_name} {applicant.last_name}</div>
                              <div className="text-xs text-[#133020]/60">{applicant.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded text-[#133020]/70">{applicant.unique_id}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-[#133020]">{applicant.position_applied}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-[#133020]/70">
                            {applicant.created_at ? new Date(applicant.created_at).toLocaleDateString() : 'N/A'}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border
                            ${applicant.status === 'Hired' ? 'bg-green-50 text-green-700 border-green-200' : 
                              applicant.status === 'Failed' ? 'bg-red-50 text-red-700 border-red-200' : 
                              applicant.status === 'AI Pre-Screening' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                              applicant.status === 'Post-Screening' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                              'bg-yellow-50 text-yellow-700 border-yellow-200'}`}
                          >
                            {applicant.status || 'Pending Review'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100">
                            <button className="p-2 text-[#133020]/40 hover:text-[#046241] hover:bg-[#046241]/10 rounded-lg transition-colors">
                              <MoreVertical size={18} />
                            </button>
                            <button 
                              onClick={(e) => handleDeleteApplicant(e, applicant.id, `${applicant.first_name} ${applicant.last_name}`)}
                              className="p-2 text-[#133020]/40 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete Applicant"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-[#133020]/50">
                        No applicants found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-6 py-4 border-t border-[#133020]/5 flex items-center justify-between bg-[#F9F7F7]">
                <div className="text-sm text-[#133020]/60">
                  Showing <span className="font-medium text-[#133020]">{indexOfFirstApplicant + 1}</span> to <span className="font-medium text-[#133020]">{Math.min(indexOfLastApplicant, filteredApplicants.length)}</span> of <span className="font-medium text-[#133020]">{filteredApplicants.length}</span> applicants
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-[#133020]/10 text-[#133020]/60 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                          currentPage === page 
                            ? 'bg-[#046241] text-white' 
                            : 'text-[#133020]/60 hover:bg-white border border-transparent hover:border-[#133020]/10'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  <button 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-[#133020]/10 text-[#133020]/60 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
      </main>

      {/* Applicant Details Modal */}
      <AnimatePresence>
        {isModalOpen && selectedApplicant && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleModalClose}
              className="fixed inset-0 bg-[#133020]/40 backdrop-blur-sm z-40"
            />
            <motion.div 
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full md:w-[500px] bg-white shadow-2xl z-50 overflow-y-auto border-l border-[#133020]/10"
            >
              <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-[#133020]/5 px-6 py-4 flex items-center justify-between z-10">
                <h3 className="text-lg font-bold text-[#133020]">Applicant Details</h3>
                <button 
                  onClick={handleModalClose}
                  className="p-2 text-[#133020]/40 hover:text-[#133020] hover:bg-[#F9F7F7] rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-8">
                {/* Profile Header */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#046241]/10 flex items-center justify-center text-[#046241] font-bold text-2xl">
                    {selectedApplicant.first_name?.charAt(0)}{selectedApplicant.last_name?.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[#133020]">{selectedApplicant.first_name} {selectedApplicant.last_name}</h4>
                    <p className="text-[#133020]/60">{selectedApplicant.position_applied}</p>
                    <p className="text-xs font-mono text-[#133020]/40 mt-1">ID: {selectedApplicant.unique_id}</p>
                  </div>
                </div>

                {/* Status Update */}
                <div className="bg-[#F9F7F7] p-5 rounded-2xl border border-[#133020]/5">
                  <label className="block text-sm font-bold text-[#133020] mb-3">Application Status</label>
                  <select 
                    name="status"
                    value={editFormData.status || 'Pending Review'}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-[#133020]/10 rounded-xl px-4 py-3 text-[#133020] outline-none focus:border-[#046241] focus:ring-2 focus:ring-[#046241]/20 transition-all"
                  >
                    <option value="Pending Review">Pending Review</option>
                    <option value="AI Pre-Screening">AI Pre-Screening</option>
                    <option value="Post-Screening">Post-Screening</option>
                    <option value="Interview">Interview</option>
                    <option value="Hired">Hired</option>
                    <option value="Failed">Failed</option>
                  </select>

                  {editFormData.status === 'Failed' && (
                    <div className="mt-4 space-y-3">
                      <label className="block text-sm font-bold text-[#133020]">Rejection Reason</label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {rejectionTemplates.map((template, idx) => (
                          <button
                            key={idx}
                            onClick={() => setEditFormData((prev: any) => ({ ...prev, rejection_reason: template }))}
                            className="text-xs px-3 py-1.5 bg-white border border-[#133020]/10 rounded-lg hover:bg-[#046241]/5 hover:border-[#046241]/20 transition-colors text-left"
                          >
                            Template {idx + 1}
                          </button>
                        ))}
                      </div>
                      <textarea
                        name="rejection_reason"
                        value={editFormData.rejection_reason || ''}
                        onChange={handleInputChange}
                        placeholder="Write a custom reason or select a template above..."
                        className="w-full bg-white border border-[#133020]/10 rounded-xl px-4 py-3 text-[#133020] outline-none focus:border-[#046241] focus:ring-2 focus:ring-[#046241]/20 transition-all min-h-[100px] resize-y"
                      />
                    </div>
                  )}

                  {generatedCredentials && (
                    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                      <h4 className="text-sm font-bold text-green-800 mb-2">Account Created Successfully!</h4>
                      <p className="text-xs text-green-700 mb-3">Please securely share these temporary credentials with the applicant. They will be prompted to change their password upon logging in.</p>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center bg-white p-2 rounded border border-green-100">
                          <span className="text-xs font-bold text-gray-500">Email:</span>
                          <span className="text-sm font-mono text-gray-800">{generatedCredentials.email}</span>
                        </div>
                        <div className="flex justify-between items-center bg-white p-2 rounded border border-green-100">
                          <span className="text-xs font-bold text-gray-500">Password:</span>
                          <span className="text-sm font-mono text-gray-800">{generatedCredentials.password}</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <button 
                    onClick={handleSaveApplicant}
                    disabled={saving || (editFormData.status === selectedApplicant.status && editFormData.rejection_reason === selectedApplicant.rejection_reason)}
                    className="mt-4 w-full py-3 bg-[#046241] text-white rounded-xl font-medium hover:bg-[#133020] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                    Update Status
                  </button>
                </div>

                {/* CV / Resume Section */}
                <div>
                  <h5 className="text-sm font-bold uppercase tracking-wider text-[#133020]/50 mb-4 flex items-center gap-2">
                    <FileText size={16} /> Resume / CV
                  </h5>
                  {selectedApplicant.cv_url ? (
                    <a 
                      href={selectedApplicant.cv_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 border border-[#133020]/10 rounded-xl hover:border-[#046241] hover:bg-[#046241]/5 transition-colors group"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="p-2 bg-[#046241]/10 text-[#046241] rounded-lg">
                          <FileText size={20} />
                        </div>
                        <span className="font-medium text-[#133020] truncate">{selectedApplicant.cv_name || 'Resume Document'}</span>
                      </div>
                      <Download size={18} className="text-[#133020]/40 group-hover:text-[#046241]" />
                    </a>
                  ) : selectedApplicant.cv_name ? (
                    <div className="p-4 border border-[#133020]/10 rounded-xl bg-gray-50 flex items-center gap-3">
                      <FileText size={20} className="text-gray-400" />
                      <span className="text-gray-600">{selectedApplicant.cv_name} (File not uploaded to storage)</span>
                    </div>
                  ) : (
                    <div className="p-4 border border-dashed border-[#133020]/20 rounded-xl text-center text-[#133020]/50 text-sm">
                      No resume uploaded
                    </div>
                  )}
                </div>

                {/* Personal Information */}
                <div>
                  <h5 className="text-sm font-bold uppercase tracking-wider text-[#133020]/50 mb-4 flex items-center gap-2">
                    <User size={16} /> Personal Information
                  </h5>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-[#133020]/50 block mb-1">Gender</label>
                        <div className="font-medium text-[#133020]">{selectedApplicant.gender || 'N/A'}</div>
                      </div>
                      <div>
                        <label className="text-xs text-[#133020]/50 block mb-1">Age</label>
                        <div className="font-medium text-[#133020]">{selectedApplicant.age || 'N/A'}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h5 className="text-sm font-bold uppercase tracking-wider text-[#133020]/50 mb-4 flex items-center gap-2">
                    <Mail size={16} /> Contact Information
                  </h5>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-[#133020]/50 block mb-1">Email Address</label>
                      <a href={`mailto:${selectedApplicant.email}`} className="font-medium text-[#046241] hover:underline break-all">
                        {selectedApplicant.email}
                      </a>
                    </div>
                    <div>
                      <label className="text-xs text-[#133020]/50 block mb-1">Phone Number</label>
                      <a href={`tel:${selectedApplicant.phone_number}`} className="font-medium text-[#046241] hover:underline">
                        {selectedApplicant.phone_number || 'N/A'}
                      </a>
                    </div>
                    <div>
                      <label className="text-xs text-[#133020]/50 block mb-1">Country</label>
                      <div className="font-medium text-[#133020]">{selectedApplicant.country || 'N/A'}</div>
                    </div>
                    <div>
                      <label className="text-xs text-[#133020]/50 block mb-1">Current Address</label>
                      <div className="font-medium text-[#133020]">{selectedApplicant.current_address || 'N/A'}</div>
                    </div>
                  </div>
                </div>
                
                {/* Application Metadata */}
                <div>
                  <h5 className="text-sm font-bold uppercase tracking-wider text-[#133020]/50 mb-4 flex items-center gap-2">
                    <Clock size={16} /> Application History
                  </h5>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-[#133020]/50 block mb-1">Date Applied</label>
                      <div className="font-medium text-[#133020]">
                        {selectedApplicant.created_at ? new Date(selectedApplicant.created_at).toLocaleString() : 'N/A'}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
