import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  User, 
  BarChart2, 
  FileText, 
  Settings, 
  LogOut, 
  ChevronRight,
  PieChart
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, link: '#dashboard' },
    { id: 'profile', label: 'Profile', icon: User, link: '#profile' },
    { id: 'analytics', label: 'Analytics', icon: PieChart, link: '#dashboard' },
    { id: 'evaluation', label: 'Evaluation', icon: BarChart2, link: '#dashboard' },
    { id: 'reports', label: 'Reports', icon: FileText, link: '#dashboard' },
    { id: 'settings', label: 'Settings', icon: Settings, link: '#settings' }
  ];

  return (
    <aside className="w-80 h-screen bg-[#133020] flex flex-col fixed left-0 top-0 z-50 border-r border-white/5">
      {/* Logo Section */}
      <div className="p-8 pb-4 flex items-center justify-center">
        <div className="w-48 h-auto relative">
          <img 
            src="https://framerusercontent.com/images/BZSiFYgRc4wDUAuEybhJbZsIBQY.png" 
            alt="Logo" 
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-6 py-8 space-y-2 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <a
              key={item.id}
              href={item.link}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${
                isActive 
                  ? 'bg-[#FFB347] text-[#133020] shadow-lg shadow-[#FFB347]/20 font-bold' 
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={22} className={`${isActive ? 'text-[#133020]' : 'text-white/40 group-hover:text-white transition-colors'}`} />
              <span className="text-sm tracking-wide">{item.label}</span>
              
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute right-4 w-1.5 h-1.5 rounded-full bg-[#133020]"
                />
              )}
            </a>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-6 border-t border-white/5 mx-6 mb-4 space-y-2">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-white/40 hover:bg-red-500/10 hover:text-red-400 transition-all group"
        >
          <LogOut size={22} className="group-hover:translate-x-1 transition-transform" />
          <span className="text-sm font-medium tracking-wide">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
