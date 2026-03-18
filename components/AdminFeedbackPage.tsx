import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import { 
  MessageSquare, Search, Filter, User, LogOut, ChevronLeft, ChevronRight, X, Trash2, Mail
} from 'lucide-react';

import AdminSidebar from './AdminSidebar';
import { Bell } from 'lucide-react';

export const AdminFeedbackPage = () => {
  const [feedback, setFeedback] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modal State
  const [selectedMessage, setSelectedMessage] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Selection & Delete State
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const [deleteModal, setDeleteModal] = useState<{isOpen: boolean, isBulk: boolean, id?: string}>({isOpen: false, isBulk: false});
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // Check if admin
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      window.location.hash = '#login';
      return;
    }

    const fetchFeedback = async () => {
      try {
        const { data, error } = await supabase
          .from('feedback_messages')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          // If table doesn't exist, we just show empty array
          if (error.code === '42P01') {
            console.warn('feedback_messages table does not exist yet.');
            setFeedback([]);
          } else if (error.code === '42501' || error.message.includes('row-level security')) {
            console.error('Permission denied. Please disable RLS or add a SELECT policy for the "feedback_messages" table in Supabase.');
            setFeedback([]);
          } else {
            console.error('Error fetching feedback:', error);
            setFeedback([]);
          }
        } else {
          setFeedback(data || []);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    window.location.hash = '#login';
  };

  const handleRowClick = (msg: any) => {
    setSelectedMessage(msg);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedMessage(null);
  };

  const handleDeleteMessage = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setDeleteModal({ isOpen: true, isBulk: false, id });
  };

  const handleBulkDeleteClick = () => {
    setDeleteModal({ isOpen: true, isBulk: true });
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const currentIds = currentMessages.map(m => m.id);
      setSelectedMessages(prev => {
        const newSelection = new Set([...prev, ...currentIds]);
        return Array.from(newSelection);
      });
    } else {
      const currentIds = currentMessages.map(m => m.id);
      setSelectedMessages(prev => prev.filter(id => !currentIds.includes(id)));
    }
  };

  const handleSelectMessage = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    e.stopPropagation();
    if (e.target.checked) {
      setSelectedMessages(prev => [...prev, id]);
    } else {
      setSelectedMessages(prev => prev.filter(mId => mId !== id));
    }
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      if (deleteModal.isBulk) {
        const { error } = await supabase
          .from('feedback_messages')
          .delete()
          .in('id', selectedMessages);

        if (error) throw error;

        setFeedback(prev => prev.filter(m => !selectedMessages.includes(m.id)));
        setSelectedMessages([]);
      } else if (deleteModal.id) {
        const { error } = await supabase
          .from('feedback_messages')
          .delete()
          .eq('id', deleteModal.id);

        if (error) throw error;

        setFeedback(prev => prev.filter(m => m.id !== deleteModal.id));
        setSelectedMessages(prev => prev.filter(id => id !== deleteModal.id));
      }
      setDeleteModal({ isOpen: false, isBulk: false });
      handleModalClose();
    } catch (err: any) {
      console.error('Error deleting message(s):', err);
      alert(`Failed to delete message(s): ${err.message || 'Unknown error'}`);
    } finally {
      setIsDeleting(false);
    }
  };

  // Filter messages based on search
  const filteredMessages = feedback.filter(msg => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (msg.first_name?.toLowerCase() || '').includes(searchLower) ||
      (msg.last_name?.toLowerCase() || '').includes(searchLower) ||
      (msg.email?.toLowerCase() || '').includes(searchLower) ||
      (msg.message?.toLowerCase() || '').includes(searchLower)
    );
  });

  // Pagination logic
  const indexOfLastMessage = currentPage * itemsPerPage;
  const indexOfFirstMessage = indexOfLastMessage - itemsPerPage;
  const currentMessages = filteredMessages.slice(indexOfFirstMessage, indexOfLastMessage);
  const totalPages = Math.ceil(filteredMessages.length / itemsPerPage);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5eedb] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-[#046241] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F7F7] flex font-sans overflow-hidden">
      <AdminSidebar activeTab="admin-feedback" onLogout={handleLogout} />

      {/* Main Content */}
      <main className="flex-1 relative h-screen overflow-hidden flex flex-col bg-[#F9F7F7] text-[#133020] ml-64">
        
        {/* Top Header */}
        <header className="h-20 px-8 border-b border-[#133020]/5 bg-white flex items-center justify-between shrink-0 z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-[#133020]">Feedback</h1>
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
              <h2 className="text-3xl font-bold text-[#133020]">Feedback Messages</h2>
              <p className="text-[#133020]/60 mt-1">View and manage messages submitted from the Contact Us page.</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#133020]/40" size={20} />
                <input 
                  type="text" 
                  placeholder="Search messages..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2.5 bg-white border border-[#133020]/10 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#046241]/20 w-full md:w-64 transition-all"
                />
              </div>
              
              {selectedMessages.length > 0 && (
                <button
                  onClick={handleBulkDeleteClick}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-colors bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
                >
                  <Trash2 size={18} />
                  Delete Selected ({selectedMessages.length})
                </button>
              )}
            </div>
          </header>

          {/* Messages Table Section */}
          <div className="bg-white rounded-[2rem] shadow-sm border border-[#133020]/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F9F7F7] text-[#133020]/60 text-xs uppercase tracking-wider border-b border-[#133020]/5">
                    <th className="px-6 py-4 font-semibold w-12">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-[#133020]/20 text-[#046241] focus:ring-[#046241]"
                        checked={currentMessages.length > 0 && currentMessages.every(m => selectedMessages.includes(m.id))}
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th className="px-6 py-4 font-semibold">Sender</th>
                    <th className="px-6 py-4 font-semibold">Email</th>
                    <th className="px-6 py-4 font-semibold">Message Preview</th>
                    <th className="px-6 py-4 font-semibold">Date Received</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#133020]/5">
                  {currentMessages.length > 0 ? (
                    currentMessages.map((msg) => (
                      <tr 
                        key={msg.id} 
                        className={`hover:bg-[#F9F7F7]/50 transition-colors cursor-pointer group ${selectedMessages.includes(msg.id) ? 'bg-[#046241]/5' : ''}`}
                        onClick={() => handleRowClick(msg)}
                      >
                        <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                          <input 
                            type="checkbox" 
                            className="w-4 h-4 rounded border-[#133020]/20 text-[#046241] focus:ring-[#046241]"
                            checked={selectedMessages.includes(msg.id)}
                            onChange={(e) => handleSelectMessage(e, msg.id)}
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#046241]/10 flex items-center justify-center text-[#046241] font-bold text-sm">
                              {msg.first_name?.charAt(0)}{msg.last_name?.charAt(0)}
                            </div>
                            <div className="font-semibold text-[#133020]">{msg.first_name} {msg.last_name}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-[#133020]/70 flex items-center gap-2">
                            <Mail size={14} />
                            {msg.email}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-[#133020] truncate max-w-xs" title={msg.message}>
                            {msg.message}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-[#133020]/70">
                            {msg.created_at ? new Date(msg.created_at).toLocaleString() : 'N/A'}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-[#133020]/50">
                        No feedback messages found.
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
                  Showing <span className="font-medium text-[#133020]">{indexOfFirstMessage + 1}</span> to <span className="font-medium text-[#133020]">{Math.min(indexOfLastMessage, filteredMessages.length)}</span> of <span className="font-medium text-[#133020]">{filteredMessages.length}</span> messages
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

      {/* Message Details Modal */}
      <AnimatePresence>
        {isModalOpen && selectedMessage && (
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
                <h3 className="text-lg font-bold text-[#133020]">Message Details</h3>
                <button 
                  onClick={handleModalClose}
                  className="p-2 text-[#133020]/40 hover:text-[#133020] hover:bg-[#F9F7F7] rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-8">
                {/* Sender Header */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#046241]/10 flex items-center justify-center text-[#046241] font-bold text-2xl">
                    {selectedMessage.first_name?.charAt(0)}{selectedMessage.last_name?.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[#133020]">{selectedMessage.first_name} {selectedMessage.last_name}</h4>
                    <p className="text-[#133020]/60 flex items-center gap-2 mt-1">
                      <Mail size={14} />
                      <a href={`mailto:${selectedMessage.email}`} className="hover:text-[#046241] transition-colors">{selectedMessage.email}</a>
                    </p>
                    <p className="text-xs text-[#133020]/40 mt-1">
                      Received: {selectedMessage.created_at ? new Date(selectedMessage.created_at).toLocaleString() : 'N/A'}
                    </p>
                  </div>
                </div>

                {/* Message Content */}
                <div>
                  <h5 className="text-sm font-bold uppercase tracking-wider text-[#133020]/50 mb-4 flex items-center gap-2">
                    <MessageSquare size={16} /> Message
                  </h5>
                  <div className="bg-[#F9F7F7] p-5 rounded-2xl border border-[#133020]/5 whitespace-pre-wrap text-[#133020] leading-relaxed">
                    {selectedMessage.message}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-4 border-t border-[#133020]/5">
                  <a 
                    href={`mailto:${selectedMessage.email}?subject=Re: Your message to Lifewood`}
                    className="flex-1 py-3 bg-[#046241] text-white rounded-xl font-medium hover:bg-[#133020] transition-colors flex items-center justify-center gap-2"
                  >
                    <Mail size={18} />
                    Reply via Email
                  </a>
                  <button 
                    onClick={(e) => handleDeleteMessage(e, selectedMessage.id)}
                    className="px-4 py-3 bg-red-50 text-red-600 border border-red-200 rounded-xl font-medium hover:bg-red-100 transition-colors flex items-center justify-center"
                    title="Delete Message"
                  >
                    <Trash2 size={18} />
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
              onClick={() => setDeleteModal({ isOpen: false, isBulk: false })}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl shadow-2xl z-50 p-8 max-w-md w-full border border-[#133020]/10"
            >
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-6">
                <Trash2 size={24} />
              </div>
              <h3 className="text-2xl font-bold text-[#133020] mb-2">Delete Message{deleteModal.isBulk ? 's' : ''}</h3>
              <p className="text-[#133020]/60 mb-8">
                Are you sure you want to delete {deleteModal.isBulk ? `these ${selectedMessages.length} messages` : 'this message'}? This action cannot be undone.
              </p>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setDeleteModal({ isOpen: false, isBulk: false })}
                  className="flex-1 py-3 px-4 rounded-xl font-medium text-[#133020] bg-[#F9F7F7] hover:bg-gray-200 transition-colors"
                  disabled={isDeleting}
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmDelete}
                  disabled={isDeleting}
                  className="flex-1 py-3 px-4 rounded-xl font-medium text-white bg-red-600 hover:bg-red-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isDeleting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Trash2 size={18} />
                      Delete
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
