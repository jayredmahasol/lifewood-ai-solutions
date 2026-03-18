import React from 'react';
import { 
  Users, 
  FileText, 
  Bell, 
  MessageSquare, 
  LogOut, 
  User
} from 'lucide-react';

interface AdminSidebarProps {
  activeTab: string;
  onLogout: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeTab, onLogout }) => {
  const menuItems = [
    { id: 'admin-dashboard', label: 'Users', icon: Users },
    { id: 'admin-applicants', label: 'Applicants', icon: FileText },
    { id: 'admin-notifications', label: 'Notifications', icon: Bell },
    { id: 'admin-feedback', label: 'Feedback', icon: MessageSquare }
  ];

  return (
    <aside className="w-64 h-screen bg-white flex flex-col fixed left-0 top-0 z-50 border-r border-[#133020]/5">
      {/* Logo Section */}
      <div className="h-24 flex items-center px-8 border-b border-[#133020]/5">
        <div className="w-32 h-auto relative">
          <img 
            src="https://framerusercontent.com/images/BZSiFYgRc4wDUAuEybhJbZsIBQY.png" 
            alt="Logo" 
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group ${
                isActive 
                  ? 'bg-[#046241] text-white shadow-md shadow-[#046241]/20' 
                  : 'text-[#133020]/60 hover:bg-[#F9F7F7] hover:text-[#133020]'
              }`}
            >
              <item.icon size={20} className={`${isActive ? 'text-white' : 'text-[#133020]/40 group-hover:text-[#046241] transition-colors'}`} />
              <span className="text-sm font-bold tracking-wide">{item.label}</span>
            </a>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-[#133020]/5">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-[#133020]/40 hover:bg-red-50 hover:text-red-600 transition-all group"
        >
          <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold tracking-wide">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
