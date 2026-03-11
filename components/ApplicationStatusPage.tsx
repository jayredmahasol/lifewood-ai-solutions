import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Search, Loader2, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

export const ApplicationStatusPage: React.FC = () => {
  const [applicationId, setApplicationId] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [applicationData, setApplicationData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicationId.trim()) return;

    setIsSearching(true);
    setError(null);
    setApplicationData(null);

    try {
      const { data, error } = await supabase
        .from('applicants')
        .select('*')
        .eq('unique_id', applicationId.trim())
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          setError('Application not found. Please check your ID and try again.');
        } else {
          throw error;
        }
      } else if (data) {
        setApplicationData(data);
      }
    } catch (err) {
      console.error('Error fetching application:', err);
      // Fallback for demo purposes if table doesn't exist
      setError('Could not connect to database. Please try again later.');
    } finally {
      setIsSearching(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'approved':
      case 'hired':
        return <CheckCircle className="text-green-500" size={24} />;
      case 'rejected':
        return <XCircle className="text-red-500" size={24} />;
      case 'interview':
        return <AlertCircle className="text-blue-500" size={24} />;
      default:
        return <Clock className="text-[#FFB347]" size={24} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'approved':
      case 'hired':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'interview':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-[#FFB347]/20 text-[#133020] border-[#FFB347]/30';
    }
  };

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
          className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-[#133020]/5 relative overflow-hidden min-h-[500px]"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFB347] rounded-full blur-[80px] opacity-10 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold text-[#133020] mb-4">Application Status</h1>
            <p className="text-[#133020]/70 mb-10">Enter your unique Application ID to check the current status of your application.</p>

            <form onSubmit={handleSearch} className="mb-12">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#133020]/40" size={20} />
                  <input 
                    type="text" 
                    value={applicationId}
                    onChange={(e) => setApplicationId(e.target.value)}
                    placeholder="e.g. APP-A1B2C3"
                    className="w-full bg-[#F9F7F7] border border-[#133020]/10 rounded-xl py-4 pl-12 pr-4 text-[#133020] outline-none focus:border-[#046241] focus:ring-2 focus:ring-[#046241]/20 transition-all font-mono uppercase"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isSearching || !applicationId.trim()}
                  className="px-8 py-4 bg-[#133020] text-white rounded-xl font-bold hover:bg-[#046241] transition-colors shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[160px]"
                >
                  {isSearching ? <Loader2 size={20} className="animate-spin" /> : 'Check Status'}
                </button>
              </div>
            </form>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  key="error"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl flex items-center gap-3"
                >
                  <AlertCircle size={20} />
                  <p>{error}</p>
                </motion.div>
              )}

              {applicationData && (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-[#F9F7F7] border border-[#133020]/10 rounded-2xl p-6 md:p-8"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-[#133020]/10 pb-6">
                    <div>
                      <p className="text-sm text-[#133020]/50 uppercase tracking-wider font-bold mb-1">Application ID</p>
                      <p className="text-2xl font-mono font-bold text-[#133020]">{applicationData.unique_id}</p>
                    </div>
                    <div className={`px-4 py-2 rounded-full border flex items-center gap-2 ${getStatusColor(applicationData.status || 'Pending Review')}`}>
                      {getStatusIcon(applicationData.status || 'Pending Review')}
                      <span className="font-bold">{applicationData.status || 'Pending Review'}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <p className="text-sm text-[#133020]/50 uppercase tracking-wider font-bold mb-1">Applicant Name</p>
                      <p className="text-lg font-medium text-[#133020]">{applicationData.first_name} {applicationData.last_name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#133020]/50 uppercase tracking-wider font-bold mb-1">Position Applied</p>
                      <p className="text-lg font-medium text-[#133020]">{applicationData.position_applied}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#133020]/50 uppercase tracking-wider font-bold mb-1">Email Address</p>
                      <p className="text-lg font-medium text-[#133020]">{applicationData.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[#133020]/50 uppercase tracking-wider font-bold mb-1">Date Applied</p>
                      <p className="text-lg font-medium text-[#133020]">
                        {applicationData.created_at ? new Date(applicationData.created_at).toLocaleDateString() : 'Recently'}
                      </p>
                    </div>
                  </div>

                  {applicationData.status === 'Failed' && applicationData.rejection_reason && (
                    <div className="mt-8 p-5 bg-red-50 border border-red-100 rounded-xl">
                      <p className="text-sm font-bold text-red-800 mb-2 uppercase tracking-wider">Message from Recruitment</p>
                      <p className="text-red-700 leading-relaxed">{applicationData.rejection_reason}</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
