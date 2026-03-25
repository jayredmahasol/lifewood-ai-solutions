import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, CheckCircle, AlertTriangle, Info, X, Trash2, User, LogOut, ListChecks
} from 'lucide-react';

import AdminSidebar from './AdminSidebar';

export interface AdminNotification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  date: string;
  read: boolean;
}

export const AdminNotificationsPage = () => {
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMultiSelect, setShowMultiSelect] = useState(false);
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);

  useEffect(() => {
    // Check if admin
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      window.location.hash = '#login';
      return;
    }

    // Load notifications from localStorage
    const stored = localStorage.getItem('admin_notifications');
    if (stored) {
      try {
        setNotifications(JSON.parse(stored).sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      } catch (e) {
        console.error('Failed to parse notifications', e);
      }
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    window.location.hash = '#login';
  };

  const markAsRead = (id: string) => {
    const updated = notifications.map(n => n.id === id ? { ...n, read: true } : n);
    setNotifications(updated);
    localStorage.setItem('admin_notifications', JSON.stringify(updated));
  };

  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem('admin_notifications', JSON.stringify(updated));
  };

  const deleteNotification = (id: string) => {
    const updated = notifications.filter(n => n.id !== id);
    setNotifications(updated);
    localStorage.setItem('admin_notifications', JSON.stringify(updated));
  };

  const clearAll = () => {
    setNotifications([]);
    localStorage.removeItem('admin_notifications');
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="text-green-500" size={24} />;
      case 'warning': return <AlertTriangle className="text-yellow-500" size={24} />;
      case 'error': return <AlertTriangle className="text-red-500" size={24} />;
      default: return <Info className="text-blue-500" size={24} />;
    }
  };

  const getBgColor = (type: string, read: boolean) => {
    if (read) return 'bg-white';
    switch (type) {
      case 'success': return 'bg-green-50';
      case 'warning': return 'bg-yellow-50';
      case 'error': return 'bg-red-50';
      default: return 'bg-blue-50';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5eedb] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-[#046241] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-[#F9F7F7] flex font-sans overflow-hidden">
      <AdminSidebar activeTab="admin-notifications" onLogout={handleLogout} />

      {/* Main Content */}
      <main className="flex-1 relative h-screen overflow-hidden flex flex-col bg-[#F9F7F7] text-[#133020] ml-64">
        
        {/* Top Header */}
        <header className="h-20 px-8 border-b border-[#133020]/5 bg-white flex items-center justify-between shrink-0 z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-[#133020]">Notifications</h1>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-[#133020]/60 hover:text-[#133020] transition-colors rounded-full hover:bg-[#133020]/5">
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              )}
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
          <div className="max-w-5xl mx-auto w-full">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-[#133020] flex items-center gap-3">
              <Bell size={28} />
              Notifications
            </h2>
            <p className="text-[#133020]/60 mt-1">System alerts, new accounts, and fallbacks.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                setShowMultiSelect(prev => {
                  const next = !prev;
                  if (!next) setSelectedNotifications([]);
                  return next;
                });
              }}
              title={showMultiSelect ? 'Hide selection' : 'Select multiple notifications'}
              aria-label={showMultiSelect ? 'Hide selection' : 'Select multiple notifications'}
              className={`p-2 rounded-lg border transition-colors ${
                showMultiSelect
                  ? 'bg-[#046241] text-white border-[#046241] hover:bg-[#133020]'
                  : 'bg-white text-[#133020]/60 border-[#133020]/10 hover:bg-[#F9F7F7] hover:text-[#133020]'
              }`}
            >
              <ListChecks size={18} />
            </button>
            <button 
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
              className="px-4 py-2 bg-white border border-[#133020]/10 text-[#133020] rounded-lg text-sm font-medium hover:bg-[#F9F7F7] transition-colors disabled:opacity-50"
            >
              Mark all as read
            </button>
            <button 
              onClick={clearAll}
              disabled={notifications.length === 0}
              className="px-4 py-2 bg-red-50 text-red-600 border border-red-100 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              <Trash2 size={16} />
              Clear all
            </button>
          </div>
        </header>

        <div className="bg-white rounded-[2rem] shadow-sm border border-[#133020]/5 overflow-hidden p-2">
          {notifications.length === 0 ? (
            <div className="p-12 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-[#F9F7F7] rounded-full flex items-center justify-center mb-4 text-[#133020]/30">
                <Bell size={32} />
              </div>
              <h3 className="text-lg font-bold text-[#133020] mb-2">No notifications</h3>
              <p className="text-[#133020]/50">You're all caught up! New alerts will appear here.</p>
            </div>
          ) : (
            <div className="divide-y divide-[#133020]/5">
              <AnimatePresence>
                {notifications.map((notification) => (
                  <motion.div 
                    key={notification.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                    className={`p-6 transition-colors flex gap-4 ${getBgColor(notification.type, notification.read)} hover:bg-[#F9F7F7]`}
                    onClick={() => !notification.read && markAsRead(notification.id)}
                  >
                    {showMultiSelect && (
                      <div className="flex items-start pt-1" onClick={(e) => e.stopPropagation()}>
                        <input 
                          type="checkbox"
                          className="w-4 h-4 rounded border-[#133020]/20 text-[#046241] focus:ring-[#046241]"
                          checked={selectedNotifications.includes(notification.id)}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setSelectedNotifications(prev => checked ? [...prev, notification.id] : prev.filter(id => id !== notification.id));
                          }}
                        />
                      </div>
                    )}
                    <div className="flex-shrink-0 mt-1">
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className={`text-base font-bold ${notification.read ? 'text-[#133020]/70' : 'text-[#133020]'}`}>
                            {notification.title}
                          </h4>
                          <p className={`mt-1 text-sm ${notification.read ? 'text-[#133020]/50' : 'text-[#133020]/80'}`}>
                            {notification.message}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className="text-xs text-[#133020]/40 whitespace-nowrap">
                            {new Date(notification.date).toLocaleString()}
                          </span>
                          <button 
                            onClick={(e) => { e.stopPropagation(); deleteNotification(notification.id); }}
                            className="p-1.5 text-[#133020]/30 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
          </div>
        </div>
      </main>
    </div>
  );
};
