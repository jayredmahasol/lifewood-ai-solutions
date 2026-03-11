import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, CheckCircle, AlertTriangle, Info, X, Trash2, User, LogOut
} from 'lucide-react';

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
              <p className="text-white/60 text-xs">Manage Lifewood Notifications</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-2 ml-8">
            <a href="#admin-dashboard" className="px-4 py-2 text-white/60 hover:bg-white/5 hover:text-white rounded-lg font-medium text-sm transition-colors">
              Interns
            </a>
            <a href="#admin-applicants" className="px-4 py-2 text-white/60 hover:bg-white/5 hover:text-white rounded-lg font-medium text-sm transition-colors">
              Applicants
            </a>
            <a href="#admin-notifications" className="px-4 py-2 bg-white/10 text-white rounded-lg font-medium text-sm transition-colors relative">
              Notifications
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                  {unreadCount}
                </span>
              )}
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
      <main className="flex-1 p-8 max-w-5xl mx-auto w-full">
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
      </main>
    </div>
  );
};
