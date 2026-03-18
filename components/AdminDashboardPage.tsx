import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import { 
  Users, Search, Filter, MoreVertical, ShieldCheck, 
  User, Mail, MapPin, Briefcase, Clock, LogOut, ChevronLeft, ChevronRight, X, Save, Loader2, BarChart2, PieChart as PieChartIcon, Bell
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import AdminSidebar from './AdminSidebar';

export const AdminDashboardPage = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // Modal State
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState<any>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Check if admin
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      window.location.hash = '#login';
      return;
    }

    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .order('updated_at', { ascending: false });

        if (error) {
          // If table doesn't exist or error, just set empty array
          console.error('Error fetching users:', error);
          setUsers([]);
        } else {
          setUsers(data || []);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    window.location.hash = '#login';
  };

  const handleRowClick = (user: any) => {
    setSelectedUser(user);
    setEditFormData({ ...user });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSaveUser = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: editFormData.first_name,
          last_name: editFormData.last_name,
          email: editFormData.email,
          contact_number: editFormData.contact_number,
          school: editFormData.school,
          designation: editFormData.designation,
          present_address: editFormData.present_address,
          status: editFormData.status,
          updated_at: new Date().toISOString()
        })
        .eq('id', selectedUser.id);

      if (error) throw error;

      // Update local state
      setUsers(prev => prev.map(u => u.id === selectedUser.id ? { ...u, ...editFormData } : u));
      handleModalClose();
    } catch (err) {
      console.error('Error updating user:', err);
      alert('Failed to update user.');
    } finally {
      setSaving(false);
    }
  };

  const handleSuspendUser = async () => {
    if (!selectedUser) return;
    
    const isCurrentlySuspended = selectedUser.website === 'suspended';
    const newWebsiteValue = isCurrentlySuspended ? null : 'suspended';
    
    if (!confirm(`Are you sure you want to ${isCurrentlySuspended ? 'unsuspend' : 'suspend'} this user?`)) {
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          website: newWebsiteValue,
          updated_at: new Date().toISOString()
        })
        .eq('id', selectedUser.id);

      if (error) throw error;

      // Update local state
      setUsers(prev => prev.map(u => u.id === selectedUser.id ? { ...u, website: newWebsiteValue } : u));
      setSelectedUser((prev: any) => ({ ...prev, website: newWebsiteValue }));
    } catch (err) {
      console.error('Error suspending user:', err);
      alert(`Failed to ${isCurrentlySuspended ? 'unsuspend' : 'suspend'} user.`);
    } finally {
      setSaving(false);
    }
  };

  // Filter users based on search
  const filteredUsers = users.filter(user => 
    (user.full_name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (user.first_name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (user.last_name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (user.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (user.school?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Analytics Data
  const schoolData = useMemo(() => {
    const counts: Record<string, number> = {};
    users.forEach(u => {
      const school = u.school || 'Unknown';
      counts[school] = (counts[school] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // Top 5 schools
  }, [users]);

  const designationData = useMemo(() => {
    const counts: Record<string, number> = {};
    users.forEach(u => {
      const desig = u.designation || 'Intern';
      counts[desig] = (counts[desig] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [users]);

  const COLORS = ['#046241', '#FFB347', '#133020', '#ccff00', '#8E9299'];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5eedb] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-[#046241] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F7F7] flex font-sans overflow-hidden">
      <AdminSidebar activeTab="admin-dashboard" onLogout={handleLogout} />

      {/* Main Content */}
      <main className="flex-1 relative h-screen overflow-hidden flex flex-col bg-[#F9F7F7] text-[#133020] ml-64">
        
        {/* Top Header */}
        <header className="h-20 px-8 border-b border-[#133020]/5 bg-white flex items-center justify-between shrink-0 z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-[#133020]">Users</h1>
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
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2rem] p-6 shadow-sm border border-[#133020]/5 flex items-center gap-6"
          >
            <div className="w-16 h-16 rounded-full bg-[#046241]/10 flex items-center justify-center text-[#046241]">
              <Users size={32} />
            </div>
            <div>
              <p className="text-[#133020]/50 text-sm font-bold uppercase tracking-wider mb-1">Total Users</p>
              <h3 className="text-4xl font-bold text-[#133020]">{users.length}</h3>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-[2rem] p-6 shadow-sm border border-[#133020]/5 flex items-center gap-6"
          >
            <div className="w-16 h-16 rounded-full bg-[#FFB347]/20 flex items-center justify-center text-[#133020]">
              <Briefcase size={32} />
            </div>
            <div>
              <p className="text-[#133020]/50 text-sm font-bold uppercase tracking-wider mb-1">Active Schools</p>
              <h3 className="text-4xl font-bold text-[#133020]">
                {new Set(users.map(u => u.school).filter(Boolean)).size}
              </h3>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#133020] rounded-[2rem] p-6 shadow-xl flex items-center gap-6 text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFB347] rounded-full blur-[50px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-[#FFB347] relative z-10">
              <Clock size={32} />
            </div>
            <div className="relative z-10">
              <p className="text-white/60 text-sm font-bold uppercase tracking-wider mb-1">Recent Updates</p>
              <h3 className="text-4xl font-bold text-white">
                {users.filter(u => new Date(u.updated_at || Date.now()) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
              </h3>
            </div>
          </motion.div>
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Bar Chart: Users by School */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-[2rem] p-6 shadow-sm border border-[#133020]/5"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#046241]/10 flex items-center justify-center text-[#046241]">
                <BarChart2 size={20} />
              </div>
              <h3 className="text-lg font-bold text-[#133020]">Top Schools</h3>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={schoolData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#13302010" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#13302080' }} 
                    tickFormatter={(val) => val.length > 15 ? val.substring(0, 15) + '...' : val}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#13302080' }} 
                    allowDecimals={false}
                  />
                  <Tooltip 
                    cursor={{ fill: '#13302005' }}
                    contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Bar dataKey="count" fill="#046241" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Pie Chart: Users by Designation */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-[2rem] p-6 shadow-sm border border-[#133020]/5"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#FFB347]/20 flex items-center justify-center text-[#133020]">
                <PieChartIcon size={20} />
              </div>
              <h3 className="text-lg font-bold text-[#133020]">Designations</h3>
            </div>
            <div className="h-[300px] w-full flex items-center justify-center">
              {designationData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={designationData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={110}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {designationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-[#133020]/40 text-sm">No data available</div>
              )}
            </div>
            {/* Custom Legend */}
            <div className="flex flex-wrap justify-center gap-4 mt-2">
              {designationData.slice(0, 5).map((entry, index) => (
                <div key={index} className="flex items-center gap-2 text-xs text-[#133020]/70">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  <span>{entry.name} ({entry.value})</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Users Table Section */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-[#133020]/5 overflow-hidden">
          {/* Table Header / Controls */}
          <div className="p-6 border-b border-[#133020]/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-xl font-bold text-[#133020]">Registered Users</h2>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#133020]/40" size={18} />
                <input 
                  type="text" 
                  placeholder="Search users..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-[#f5eedb]/50 border border-[#133020]/10 rounded-full py-2 pl-12 pr-4 outline-none focus:border-[#046241] focus:ring-2 focus:ring-[#046241]/20 transition-all w-64 text-sm"
                />
              </div>
              <button className="p-2.5 rounded-full border border-[#133020]/10 text-[#133020]/60 hover:bg-[#f5eedb] hover:text-[#133020] transition-colors">
                <Filter size={18} />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f5eedb]/30 text-[#133020]/60 text-xs uppercase tracking-wider border-b border-[#133020]/5">
                  <th className="p-4 pl-6 font-bold">User</th>
                  <th className="p-4 font-bold">Contact</th>
                  <th className="p-4 font-bold">School / Designation</th>
                  <th className="p-4 font-bold">Location</th>
                  <th className="p-4 font-bold text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.length > 0 ? (
                  currentUsers.map((user, index) => (
                    <motion.tr 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      key={user.id || index} 
                      onClick={() => handleRowClick(user)}
                      className="border-b border-[#133020]/5 hover:bg-[#f5eedb]/20 transition-colors cursor-pointer"
                    >
                      <td className="p-4 pl-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#133020]/5 flex items-center justify-center overflow-hidden border border-[#133020]/10">
                            {user.avatar_url ? (
                              <img src={user.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-[#133020] font-bold text-sm">
                                {(user.first_name?.[0] || user.full_name?.[0] || '?').toUpperCase()}
                              </span>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-bold text-[#133020] text-sm">
                                {user.first_name && user.last_name ? `${user.first_name} ${user.last_name}` : user.full_name || 'Unknown User'}
                              </p>
                              {user.website === 'suspended' && (
                                <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Suspended</span>
                              )}
                            </div>
                            <p className="text-xs text-[#133020]/50">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 text-xs text-[#133020]/70">
                            <Mail size={12} className="text-[#046241]" />
                            {user.email || 'N/A'}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-[#133020]/70">
                            <Phone size={12} className="text-[#046241]" />
                            {user.contact_number || 'N/A'}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-sm font-medium text-[#133020]">{user.school || 'N/A'}</p>
                        <p className="text-xs text-[#133020]/50">{user.designation || 'Intern'}</p>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-sm text-[#133020]/70">
                          <MapPin size={14} className="text-[#FFB347]" />
                          <span className="truncate max-w-[150px]">{user.present_address || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <button className="p-2 text-[#133020]/40 hover:text-[#046241] hover:bg-[#046241]/10 rounded-lg transition-colors">
                          <MoreVertical size={18} />
                        </button>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-[#133020]/50">
                      No users found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="p-4 border-t border-[#133020]/5 flex items-center justify-between bg-[#f5eedb]/10">
              <p className="text-xs text-[#133020]/50 font-medium">
                Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} entries
              </p>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 rounded-lg border border-[#133020]/10 text-[#133020]/60 hover:bg-[#133020]/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === i + 1 
                          ? 'bg-[#046241] text-white' 
                          : 'text-[#133020]/60 hover:bg-[#133020]/5'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-1.5 rounded-lg border border-[#133020]/10 text-[#133020]/60 hover:bg-[#133020]/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
          </div>
        </div>
      </main>

      {/* User Details Modal */}
      <AnimatePresence>
        {isModalOpen && selectedUser && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleModalClose}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="bg-[#133020] p-6 text-white flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center overflow-hidden border border-white/20">
                    {selectedUser.avatar_url ? (
                      <img src={selectedUser.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <User size={24} className="text-white/50" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold">Edit User Profile</h2>
                      {selectedUser.website === 'suspended' && (
                        <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Suspended</span>
                      )}
                    </div>
                    <p className="text-white/60 text-sm">ID: {selectedUser.id}</p>
                  </div>
                </div>
                <button 
                  onClick={handleModalClose}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic Info */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#133020]/50 border-b border-[#133020]/10 pb-2">Basic Information</h3>
                    
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#133020]/70">First Name</label>
                      <input 
                        type="text" 
                        name="first_name"
                        value={editFormData.first_name || ''}
                        onChange={handleInputChange}
                        className="w-full bg-[#f5eedb]/30 border border-[#133020]/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-[#046241]"
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#133020]/70">Last Name</label>
                      <input 
                        type="text" 
                        name="last_name"
                        value={editFormData.last_name || ''}
                        onChange={handleInputChange}
                        className="w-full bg-[#f5eedb]/30 border border-[#133020]/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-[#046241]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#133020]/70">Email Address</label>
                      <input 
                        type="email" 
                        name="email"
                        value={editFormData.email || ''}
                        onChange={handleInputChange}
                        className="w-full bg-[#f5eedb]/30 border border-[#133020]/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-[#046241]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#133020]/70">Contact Number</label>
                      <input 
                        type="text" 
                        name="contact_number"
                        value={editFormData.contact_number || ''}
                        onChange={handleInputChange}
                        className="w-full bg-[#f5eedb]/30 border border-[#133020]/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-[#046241]"
                      />
                    </div>
                  </div>

                  {/* Academic & Status */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#133020]/50 border-b border-[#133020]/10 pb-2">Academic & Status</h3>
                    
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#133020]/70">School</label>
                      <input 
                        type="text" 
                        name="school"
                        value={editFormData.school || ''}
                        onChange={handleInputChange}
                        className="w-full bg-[#f5eedb]/30 border border-[#133020]/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-[#046241]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#133020]/70">Designation</label>
                      <input 
                        type="text" 
                        name="designation"
                        value={editFormData.designation || ''}
                        onChange={handleInputChange}
                        className="w-full bg-[#f5eedb]/30 border border-[#133020]/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-[#046241]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#133020]/70">Present Address</label>
                      <input 
                        type="text" 
                        name="present_address"
                        value={editFormData.present_address || ''}
                        onChange={handleInputChange}
                        className="w-full bg-[#f5eedb]/30 border border-[#133020]/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-[#046241]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-[#133020]/70">Civil Status</label>
                      <select 
                        name="status"
                        value={editFormData.status || ''}
                        onChange={handleInputChange}
                        className="w-full bg-[#f5eedb]/30 border border-[#133020]/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-[#046241]"
                      >
                        <option value="">Select Status</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Widowed">Widowed</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-[#133020]/10 bg-[#f5eedb]/30 flex justify-between gap-3 shrink-0">
                <button 
                  onClick={handleSuspendUser}
                  disabled={saving}
                  className={`px-6 py-2.5 rounded-xl font-bold transition-colors flex items-center gap-2 disabled:opacity-70 ${selectedUser.website === 'suspended' ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' : 'bg-red-100 text-red-700 hover:bg-red-200'}`}
                >
                  {saving ? <Loader2 size={18} className="animate-spin" /> : <ShieldCheck size={18} />}
                  {selectedUser.website === 'suspended' ? 'Unsuspend User' : 'Suspend User'}
                </button>
                <div className="flex gap-3">
                  <button 
                    onClick={handleModalClose}
                    className="px-6 py-2.5 rounded-xl text-[#133020] font-bold hover:bg-[#133020]/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSaveUser}
                    disabled={saving}
                    className="px-6 py-2.5 rounded-xl bg-[#046241] text-white font-bold hover:bg-[#035436] transition-colors flex items-center gap-2 disabled:opacity-70"
                  >
                    {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                    Save Changes
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Simple Phone icon since it wasn't imported from lucide-react in the main block
const Phone = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);
