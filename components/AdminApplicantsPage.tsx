import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import emailjs from '@emailjs/browser';
import { 
  Users, Search, Filter, MoreVertical, ShieldCheck, 
  User, Mail, MapPin, Briefcase, Clock, LogOut, ChevronLeft, ChevronRight, X, Save, Loader2, FileText, Download, Trash2
} from 'lucide-react';

import AdminSidebar from './AdminSidebar';
import { Bell } from 'lucide-react';

export const AdminApplicantsPage = () => {
  const [applicants, setApplicants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const [showDeleted, setShowDeleted] = useState(false);

  // Filter State
  const [filterDate, setFilterDate] = useState('');
  const [filterPosition, setFilterPosition] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  // Modal State
  const [selectedApplicant, setSelectedApplicant] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [generatedCredentials, setGeneratedCredentials] = useState<{email: string, password: string} | null>(null);

  // Selection & Delete State
  const [selectedApplicants, setSelectedApplicants] = useState<string[]>([]);
  const [deleteModal, setDeleteModal] = useState<{isOpen: boolean, isBulk: boolean, isPermanent: boolean, id?: string, name?: string}>({isOpen: false, isBulk: false, isPermanent: false});
  const [isDeleting, setIsDeleting] = useState(false);

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
          // Best-effort cleanup for records deleted 30+ days ago
          const cutoff = new Date();
          cutoff.setDate(cutoff.getDate() - 30);
          const staleIds = (data || [])
            .filter((a: any) => a.deleted_at && new Date(a.deleted_at) < cutoff)
            .map((a: any) => a.id);
          if (staleIds.length > 0) {
            await supabase.from('applicants').delete().in('id', staleIds);
          }
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
      let tempPasswordToSave: string | null = null;
      
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
            
            tempPasswordToSave = `TEMP_PASSWORD:${tempPassword}`;

            addNotification('success', 'New Account Created', `A new account was automatically generated for ${selectedApplicant.first_name} ${selectedApplicant.last_name} (${selectedApplicant.email}).`);
          }
        }
      }

      let newRejectionReason = null;
      if (editFormData.status === 'Failed') {
        newRejectionReason = editFormData.rejection_reason?.startsWith('TEMP_PASSWORD:') ? null : editFormData.rejection_reason;
      } else if (editFormData.status === 'Hired') {
        newRejectionReason = tempPasswordToSave || selectedApplicant.rejection_reason;
      }

      const { data, error } = await supabase
        .from('applicants')
        .update({
          status: editFormData.status,
          rejection_reason: newRejectionReason
        })
        .eq('id', selectedApplicant.id)
        .select();

      if (error) throw error;
      
      if (!data || data.length === 0) {
        throw new Error("Update failed. This is likely due to Row Level Security (RLS) policies in your Supabase database preventing updates.");
      }

      // Update local state
      setApplicants(prev => prev.map(a => a.id === selectedApplicant.id ? { ...a, ...editFormData, rejection_reason: newRejectionReason } : a));
      
      // Construct email message
      const tempPass = tempPasswordToSave ? tempPasswordToSave.replace('TEMP_PASSWORD:', '') : (selectedApplicant.rejection_reason?.startsWith('TEMP_PASSWORD:') ? selectedApplicant.rejection_reason.replace('TEMP_PASSWORD:', '') : undefined);
      
      let emailMessage = '';
      if (editFormData.status === 'Hired') {
        emailMessage = `Congratulations! Your application for ${selectedApplicant.position_applied} has been successful and you are hired.\n\nAn account has been created for you on our platform.\n\nIMPORTANT VERIFICATION STEP:\nPlease check your inbox for a verification email from our system and click the link to confirm that this email account belongs to you.\n\nOnce verified, you can log in using the following temporary credentials:\n\nEmail: ${selectedApplicant.email}\nPassword: ${tempPass || '[Your previously created password]'}\n\nPlease change your password immediately after logging in.`;
      } else if (editFormData.status === 'Failed') {
        emailMessage = `Thank you for taking the time to apply for the ${selectedApplicant.position_applied} position at Lifewood.\n\n`;
        if (newRejectionReason) {
          emailMessage += `${newRejectionReason}`;
        } else {
          emailMessage += `Unfortunately, we have decided not to move forward with your application at this time.`;
        }
      } else {
        emailMessage = `We are writing to inform you that the status of your application for ${selectedApplicant.position_applied} has been updated to: ${editFormData.status}.\n\nWe will keep you posted on any further updates.`;
      }

      // Send Email via EmailJS
      try {
        await emailjs.send(
          'service_wfzsrry',
          'template_ynn60zq',
          {
            to_email: selectedApplicant.email,
            to_name: selectedApplicant.first_name,
            position_applied: selectedApplicant.position_applied,
            status: editFormData.status,
            message: emailMessage,
          },
          'a5clkwXSA8Hdruwoh' // Replace with your actual EmailJS public key
        );
        addNotification('success', 'Email Sent', `Notification email sent to ${selectedApplicant.email}.`);
      } catch (emailErr) {
        console.error('Failed to send email via EmailJS:', emailErr);
        addNotification('error', 'Email Failed', `Failed to send email notification to ${selectedApplicant.email}.`);
      }

      if (editFormData.status !== 'Hired') {
        handleModalClose();
      } else {
        // Update selectedApplicant so the UI reflects the new rejection_reason
        setSelectedApplicant((prev: any) => ({ ...prev, ...editFormData, rejection_reason: newRejectionReason }));
      }
    } catch (err: any) {
      console.error('Error updating applicant:', err);
      addNotification('error', 'Update Failed', `Failed to update applicant ${selectedApplicant.first_name} ${selectedApplicant.last_name}: ${err.message || 'Unknown error'}`);
      alert(`Failed to update applicant: ${err.message || 'Unknown error'}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteApplicant = (e: React.MouseEvent, id: string, name: string) => {
    e.stopPropagation();
    setDeleteModal({ isOpen: true, isBulk: false, isPermanent: showDeleted, id, name });
  };

  const handleBulkDeleteClick = () => {
    setDeleteModal({ isOpen: true, isBulk: true, isPermanent: showDeleted });
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const currentIds = currentApplicants.map(a => a.id);
      setSelectedApplicants(prev => {
        const newSelection = new Set([...prev, ...currentIds]);
        return Array.from(newSelection);
      });
    } else {
      const currentIds = currentApplicants.map(a => a.id);
      setSelectedApplicants(prev => prev.filter(id => !currentIds.includes(id)));
    }
  };

  const handleSelectApplicant = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    e.stopPropagation();
    if (e.target.checked) {
      setSelectedApplicants(prev => [...prev, id]);
    } else {
      setSelectedApplicants(prev => prev.filter(aId => aId !== id));
    }
  };

  const restoreApplicants = async (ids: string[]) => {
    if (ids.length === 0) return;
    setIsDeleting(true);
    try {
      const { data, error } = await supabase
        .from('applicants')
        .update({ deleted_at: null })
        .in('id', ids)
        .select();

      if (error) throw error;
      if (!data || data.length === 0) {
        throw new Error("Restore failed. This is likely due to Row Level Security (RLS) policies in your Supabase database preventing updates.");
      }

      setApplicants(prev => prev.map(a => ids.includes(a.id) ? { ...a, deleted_at: null } : a));
      setSelectedApplicants(prev => prev.filter(id => !ids.includes(id)));
      addNotification('success', 'Applicants Restored', `Restored ${ids.length} applicant${ids.length > 1 ? 's' : ''}.`);
      handleModalClose();
    } catch (err: any) {
      console.error('Error restoring applicant(s):', err);
      addNotification('error', 'Restore Failed', `Failed to restore applicant(s): ${err.message || 'Unknown error'}`);
    } finally {
      setIsDeleting(false);
    }
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      if (deleteModal.isBulk) {
        const action = deleteModal.isPermanent
          ? supabase.from('applicants').delete().in('id', selectedApplicants).select()
          : supabase.from('applicants').update({ deleted_at: new Date().toISOString() }).in('id', selectedApplicants).select();
        const { data, error } = await action;

        if (error) throw error;
        
        if (!data || data.length === 0) {
          throw new Error(deleteModal.isPermanent
            ? "Delete failed. This is likely due to Row Level Security (RLS) policies in your Supabase database preventing deletions."
            : "Soft delete failed. This is likely due to Row Level Security (RLS) policies in your Supabase database preventing updates.");
        }

        if (deleteModal.isPermanent) {
          setApplicants(prev => prev.filter(a => !selectedApplicants.includes(a.id)));
          addNotification('info', 'Applicants Deleted', `Successfully deleted ${selectedApplicants.length} applicants.`);
        } else {
          setApplicants(prev => prev.map(a => selectedApplicants.includes(a.id) ? { ...a, deleted_at: new Date().toISOString() } : a));
          addNotification('info', 'Applicants Moved to Recently Deleted', `Moved ${selectedApplicants.length} applicants to Recently Deleted.`);
        }
        setSelectedApplicants([]);
      } else if (deleteModal.id) {
        const action = deleteModal.isPermanent
          ? supabase.from('applicants').delete().eq('id', deleteModal.id).select()
          : supabase.from('applicants').update({ deleted_at: new Date().toISOString() }).eq('id', deleteModal.id).select();
        const { data, error } = await action;

        if (error) throw error;
        
        if (!data || data.length === 0) {
          throw new Error(deleteModal.isPermanent
            ? "Delete failed. This is likely due to Row Level Security (RLS) policies in your Supabase database preventing deletions."
            : "Soft delete failed. This is likely due to Row Level Security (RLS) policies in your Supabase database preventing updates.");
        }

        if (deleteModal.isPermanent) {
          setApplicants(prev => prev.filter(a => a.id !== deleteModal.id));
          addNotification('info', 'Applicant Deleted', `The application for ${deleteModal.name} was permanently deleted.`);
        } else {
          setApplicants(prev => prev.map(a => a.id === deleteModal.id ? { ...a, deleted_at: new Date().toISOString() } : a));
          addNotification('info', 'Applicant Moved to Recently Deleted', `The application for ${deleteModal.name} was moved to Recently Deleted.`);
        }
        setSelectedApplicants(prev => prev.filter(id => id !== deleteModal.id));
      }
      setDeleteModal({ isOpen: false, isBulk: false, isPermanent: false });
      handleModalClose();
    } catch (err: any) {
      console.error('Error deleting applicant(s):', err);
      addNotification('error', 'Delete Failed', `Failed to delete applicant(s): ${err.message || 'Unknown error'}`);
    } finally {
      setIsDeleting(false);
    }
  };

  // Filter applicants based on search and filters
  const filteredApplicants = applicants.filter(applicant => {
    const isDeleted = !!applicant.deleted_at;
    if (showDeleted && !isDeleted) return false;
    if (!showDeleted && isDeleted) return false;
    const matchesSearch = (applicant.first_name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (applicant.last_name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (applicant.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (applicant.unique_id?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (applicant.position_applied?.toLowerCase() || '').includes(searchTerm.toLowerCase());
      
    const matchesDate = filterDate ? (applicant.created_at && applicant.created_at.startsWith(filterDate)) : true;
    const matchesPosition = filterPosition ? applicant.position_applied === filterPosition : true;
    const matchesStatus = filterStatus ? applicant.status === filterStatus : true;

    return matchesSearch && matchesDate && matchesPosition && matchesStatus;
  });

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
    <div className="min-h-screen bg-[#F9F7F7] flex font-sans overflow-hidden">
      <AdminSidebar activeTab="admin-applicants" onLogout={handleLogout} />

      {/* Main Content */}
      <main className="flex-1 relative h-screen overflow-hidden flex flex-col bg-[#F9F7F7] text-[#133020] ml-64">
        
        {/* Top Header */}
        <header className="h-20 px-8 border-b border-[#133020]/5 bg-white flex items-center justify-between shrink-0 z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-[#133020]">Applicants</h1>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-[#133020]/60 hover:text-[#133020] transition-colors rounded-full hover:bg-[#133020]/5">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-px h-6 bg-[#133020]/10"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-[#133020]">Administrator</p>
                <p className="text-xs font-bold uppercase tracking-wider text-[#133020]/40">System Admin</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#046241] text-white flex items-center justify-center font-bold overflow-hidden">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
          <div className="max-w-7xl mx-auto w-full">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl font-bold text-[#133020]">{showDeleted ? 'Recently Deleted' : 'Applicants'}</h2>
              <p className="text-[#133020]/60 mt-1">
                {showDeleted
                  ? 'Applicants here will be permanently deleted after 30 days or when you delete them here.'
                  : 'Manage job applications and track hiring status.'}
              </p>
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
              
              {selectedApplicants.length > 0 && (
                <button
                  onClick={handleBulkDeleteClick}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-colors bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
                >
                  <Trash2 size={18} />
                  {showDeleted ? 'Delete Permanently' : 'Delete Selected'} ({selectedApplicants.length})
                </button>
              )}

              {showDeleted && selectedApplicants.length > 0 && (
                <button
                  onClick={() => restoreApplicants(selectedApplicants)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-colors bg-green-50 text-green-700 border border-green-200 hover:bg-green-100"
                >
                  Restore Selected ({selectedApplicants.length})
                </button>
              )}

              <button
                onClick={() => {
                  setShowDeleted(prev => !prev);
                  setSelectedApplicants([]);
                  setCurrentPage(1);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-colors border ${
                  showDeleted
                    ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'
                    : 'bg-white text-[#133020] border-[#133020]/10 hover:bg-[#F9F7F7]'
                }`}
              >
                <Trash2 size={18} />
                {showDeleted ? 'Back to Applicants' : 'Recently Deleted'}
              </button>
              
              <div className="relative">
                <button 
                  onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-colors border ${
                    isFilterMenuOpen || filterDate || filterPosition || filterStatus
                      ? 'bg-[#046241] text-white border-[#046241]' 
                      : 'bg-white text-[#133020] border-[#133020]/10 hover:bg-[#F9F7F7]'
                  }`}
                >
                  <Filter size={18} />
                  Filter
                  {(filterDate || filterPosition || filterStatus) && (
                    <span className="flex items-center justify-center w-5 h-5 bg-white text-[#046241] rounded-full text-xs font-bold ml-1">
                      {[filterDate, filterPosition, filterStatus].filter(Boolean).length}
                    </span>
                  )}
                </button>
                
                <AnimatePresence>
                  {isFilterMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-[#133020]/10 p-5 z-50"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-[#133020]">Filters</h3>
                        <button 
                          onClick={() => {
                            setFilterDate('');
                            setFilterPosition('');
                            setFilterStatus('');
                          }}
                          className="text-xs text-[#046241] font-medium hover:underline"
                        >
                          Clear All
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#133020]/60 mb-1.5 uppercase tracking-wider">Date Applied</label>
                          <input 
                            type="date" 
                            value={filterDate}
                            onChange={(e) => setFilterDate(e.target.value)}
                            className="w-full bg-[#F9F7F7] border border-[#133020]/10 rounded-xl px-3 py-2 text-sm text-[#133020] outline-none focus:border-[#046241] focus:ring-1 focus:ring-[#046241]/20"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-xs font-semibold text-[#133020]/60 mb-1.5 uppercase tracking-wider">Position</label>
                          <select 
                            value={filterPosition}
                            onChange={(e) => setFilterPosition(e.target.value)}
                            className="w-full bg-[#F9F7F7] border border-[#133020]/10 rounded-xl px-3 py-2 text-sm text-[#133020] outline-none focus:border-[#046241] focus:ring-1 focus:ring-[#046241]/20"
                          >
                            <option value="">All Positions</option>
                            {Array.from(new Set(applicants.map(a => a.position_applied).filter(Boolean))).map(pos => (
                              <option key={pos as string} value={pos as string}>{pos as string}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-xs font-semibold text-[#133020]/60 mb-1.5 uppercase tracking-wider">Status</label>
                          <select 
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="w-full bg-[#F9F7F7] border border-[#133020]/10 rounded-xl px-3 py-2 text-sm text-[#133020] outline-none focus:border-[#046241] focus:ring-1 focus:ring-[#046241]/20"
                          >
                            <option value="">All Statuses</option>
                            <option value="Pending Review">Pending Review</option>
                            <option value="AI Pre-Screening">AI Pre-Screening</option>
                            <option value="Hired">Hired</option>
                            <option value="Failed">Failed</option>
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </header>

          {/* Applicants Table Section */}
          <div className="bg-white rounded-[2rem] shadow-sm border border-[#133020]/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F9F7F7] text-[#133020]/60 text-xs uppercase tracking-wider border-b border-[#133020]/5">
                    <th className="px-6 py-4 font-semibold w-12">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-[#133020]/20 text-[#046241] focus:ring-[#046241]"
                        checked={currentApplicants.length > 0 && currentApplicants.every(a => selectedApplicants.includes(a.id))}
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th className="px-6 py-4 font-semibold">Applicant</th>
                    <th className="px-6 py-4 font-semibold">Unique ID</th>
                    <th className="px-6 py-4 font-semibold">Position</th>
                    <th className="px-6 py-4 font-semibold">Date Applied</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#133020]/5">
                  {currentApplicants.length > 0 ? (
                    currentApplicants.map((applicant) => (
                      <tr 
                        key={applicant.id} 
                        className={`hover:bg-[#F9F7F7]/50 transition-colors cursor-pointer group ${selectedApplicants.includes(applicant.id) ? 'bg-[#046241]/5' : ''}`}
                        onClick={() => handleRowClick(applicant)}
                      >
                        <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                          <input 
                            type="checkbox" 
                            className="w-4 h-4 rounded border-[#133020]/20 text-[#046241] focus:ring-[#046241]"
                            checked={selectedApplicants.includes(applicant.id)}
                            onChange={(e) => handleSelectApplicant(e, applicant.id)}
                          />
                        </td>
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
                              'bg-yellow-50 text-yellow-700 border-yellow-200'}`}
                          >
                            {applicant.status || 'Pending Review'}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-[#133020]/50">
                        {showDeleted ? 'No recently deleted applicants.' : 'No applicants found matching your search.'}
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
          </div>
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
                        value={editFormData.rejection_reason?.startsWith('TEMP_PASSWORD:') ? '' : (editFormData.rejection_reason || '')}
                        onChange={handleInputChange}
                        placeholder="Write a custom reason or select a template above..."
                        className="w-full bg-white border border-[#133020]/10 rounded-xl px-4 py-3 text-[#133020] outline-none focus:border-[#046241] focus:ring-2 focus:ring-[#046241]/20 transition-all min-h-[100px] resize-y"
                      />
                    </div>
                  )}

                  {(generatedCredentials || selectedApplicant.status === 'Hired') && (
                    <div className="mt-4 p-5 bg-green-50 border border-green-200 rounded-xl">
                      <h4 className="text-sm font-bold text-green-800 mb-2">
                        {generatedCredentials ? 'Account Created Successfully!' : 'Temporary Account Credentials'}
                      </h4>
                      <p className="text-xs text-green-700 mb-4">
                        {generatedCredentials 
                          ? 'The account has been created. Please email the temporary credentials to the applicant. Supabase has automatically sent them a verification email.'
                          : 'This applicant has a temporary account. You can email them their credentials if they forgot them.'}
                      </p>
                      <div className="mb-4 bg-white p-3 rounded border border-green-200 font-mono text-sm text-green-800">
                        <div><strong>Email:</strong> {selectedApplicant.email}</div>
                        <div><strong>Password:</strong> {
                          generatedCredentials 
                            ? generatedCredentials.password 
                            : (selectedApplicant.rejection_reason?.startsWith('TEMP_PASSWORD:') 
                                ? selectedApplicant.rejection_reason.replace('TEMP_PASSWORD:', '') 
                                : <span className="text-gray-400 italic">Hidden (Created previously)</span>)
                        }</div>
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

                {/* Danger Zone */}
                <div className="pt-6 border-t border-red-100 mt-6">
                  <h5 className="text-sm font-bold uppercase tracking-wider text-red-500 mb-4 flex items-center gap-2">
                    <Trash2 size={16} /> Danger Zone
                  </h5>
                  {showDeleted && (
                    <button 
                      onClick={() => restoreApplicants([selectedApplicant.id])}
                      className="w-full py-3 mb-3 bg-green-50 text-green-700 border border-green-200 rounded-xl font-medium hover:bg-green-100 transition-colors flex items-center justify-center gap-2"
                    >
                      Restore Applicant
                    </button>
                  )}
                  <button 
                    onClick={(e) => {
                      handleDeleteApplicant(e, selectedApplicant.id, `${selectedApplicant.first_name} ${selectedApplicant.last_name}`);
                      handleModalClose();
                    }}
                    className="w-full py-3 bg-red-50 text-red-600 border border-red-200 rounded-xl font-medium hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <Trash2 size={18} />
                    {showDeleted ? 'Delete Permanently' : 'Move to Recently Deleted'}
                  </button>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteModal.isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#133020]/40 backdrop-blur-sm z-50"
              onClick={() => setDeleteModal({ isOpen: false, isBulk: false, isPermanent: false })}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white rounded-3xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-6">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 mb-4">
                  <Trash2 size={24} />
                </div>
                <h3 className="text-xl font-bold text-[#133020] mb-2">
                  {deleteModal.isPermanent
                    ? (deleteModal.isBulk ? 'Delete Selected Applicants' : 'Delete Applicant')
                    : (deleteModal.isBulk ? 'Move Selected Applicants to Recently Deleted' : 'Move Applicant to Recently Deleted')}
                </h3>
                <p className="text-[#133020]/60 mb-6">
                  {deleteModal.isPermanent
                    ? (deleteModal.isBulk 
                        ? `Are you sure you want to permanently delete ${selectedApplicants.length} selected applicants? This action cannot be undone.`
                        : `Are you sure you want to permanently delete the application for ${deleteModal.name}? This action cannot be undone.`
                      )
                    : (deleteModal.isBulk
                        ? `Are you sure you want to move ${selectedApplicants.length} selected applicants to Recently Deleted?`
                        : `Are you sure you want to move the application for ${deleteModal.name} to Recently Deleted?`)
                  }
                </p>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setDeleteModal({ isOpen: false, isBulk: false, isPermanent: false })}
                    disabled={isDeleting}
                    className="flex-1 py-3 px-4 rounded-xl font-medium border border-[#133020]/10 text-[#133020] hover:bg-[#F9F7F7] transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={confirmDelete}
                    disabled={isDeleting}
                    className="flex-1 py-3 px-4 rounded-xl font-medium bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isDeleting ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                    {isDeleting ? 'Deleting...' : deleteModal.isPermanent ? 'Delete' : 'Move'}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
