import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, User, LogIn } from 'lucide-react';
import { NavItem } from '../types';
import { supabase } from '../lib/supabaseClient';

const navItems: NavItem[] = [
  { label: 'Home', href: '#' },
  { 
    label: 'AI Initiatives', 
    href: '#ai-initiatives',
    children: [
      { label: 'AI Projects', href: '#ai-projects' },
      { label: 'AI Services', href: '#ai-services' }
    ]
  },
  { 
    label: 'Our Company', 
    href: '#our-company',
    children: [
      { label: 'About Us', href: '#about' }
    ]
  },
  { 
    label: 'What We Offer', 
    href: '#what-we-offer',
    children: [
      { label: 'Type A-Servicing', href: '#type-a' },
      { label: 'Type B-LLM Data', href: '#type-b' },
      { label: 'Type C-Vertical LLM Data', href: '#type-c' },
      { label: 'Type D-AIGC', href: '#type-d' }
    ]
  },
  { label: 'Philanthropy & Impact', href: '#impact' },
  { label: 'Careers', href: '#careers' },
  { label: 'Contact Us', href: '#contact' },
  { label: 'Internal News', href: '#news' }
];

export const Navbar: React.FC<{ currentRoute: string }> = ({ currentRoute }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [fullName, setFullName] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Check auth state
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user;
      if (user) {
        setUser(user);
        setFullName(user.user_metadata?.full_name || 'User');
      }
    };
    checkUser();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileExpand = (label: string) => {
    setMobileExpanded(mobileExpanded === label ? null : label);
  };

  const isActive = (href: string) => {
    if (href === '#' && (currentRoute === '' || currentRoute === '#')) return true;
    return currentRoute === href;
  };

  const isParentActive = (children: { href: string }[]) => {
    return children.some(child => child.href === currentRoute);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="w-full max-w-7xl px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 cursor-pointer">
          <img 
            src="https://framerusercontent.com/images/BZSiFYgRc4wDUAuEybhJbZsIBQY.png" 
            alt="Lifewood Logo" 
            className="h-10 object-contain"
            referrerPolicy="no-referrer"
          />
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => {
            const active = isActive(item.href) || (item.children && isParentActive(item.children));
            const hasChildren = item.children && item.children.length > 0;

            return (
              <div key={item.label} className="relative group">
                {hasChildren ? (
                  <div
                    className={`
                    flex items-center gap-1 text-sm font-medium transition-colors py-2 cursor-default
                    ${active ? 'text-[#f59e0b]' : 'text-[#133020] hover:text-[#f59e0b]'}
                  `}
                  >
                    {item.label}
                    <ChevronDown
                      size={16}
                      className="group-hover:rotate-180 transition-transform duration-200"
                    />
                  </div>
                ) : (
                  <a
                    href={item.href}
                    className={`
                    flex items-center gap-1 text-sm font-medium transition-colors py-2
                    ${active ? 'text-[#f59e0b]' : 'text-[#133020] hover:text-[#f59e0b]'}
                  `}
                  >
                    {item.label}
                  </a>
                )}

                {/* Desktop Dropdown */}
                {item.children && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                    <div className="bg-white/95 backdrop-blur-xl border border-gray-100 rounded-xl p-2 shadow-xl flex flex-col overflow-hidden">
                      {item.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          className={`block px-4 py-2 text-sm font-medium rounded-lg transition-colors ${currentRoute === child.href ? 'text-[#f59e0b] bg-gray-50' : 'text-[#133020] hover:bg-gray-50 hover:text-[#f59e0b]'}`}
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
          
          {/* Sign In Button / User Profile */}
          {user ? (
            <a 
              href="#profile"
              className="ml-4 px-6 py-2 bg-[#133020] text-white rounded-full text-sm font-medium hover:bg-[#046241] transition-all hover:scale-105 shadow-md flex items-center gap-2"
            >
              <User size={16} />
              {fullName}
            </a>
          ) : (
            <a 
              href="#login"
              className="ml-4 group relative px-6 py-2.5 rounded-full text-sm font-semibold text-white overflow-hidden shadow-[0_12px_28px_rgba(19,48,32,0.25)] bg-gradient-to-r from-[#0F2A24] to-[#2F7C6F] hover:shadow-[0_16px_32px_rgba(47,124,111,0.35)] transition-all hover:-translate-y-0.5"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#2F7C6F] via-[#0F2A24] to-[#2F7C6F] opacity-0 group-hover:opacity-100 transition-opacity"></span>
              <span className="relative z-10 flex items-center gap-2">
                <span className="relative flex items-center justify-center">
                  <span className="absolute w-2 h-2 rounded-full bg-white/70 animate-ping"></span>
                  <LogIn size={16} />
                </span>
                Sign In
              </span>
            </a>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-[#133020]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile/Desktop Side Drawer */}
        <div 
          className={`
            fixed inset-0 z-[60] transition-all duration-300
            ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
          `}
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
          
          {/* Drawer */}
          <div 
            className={`
              absolute top-0 right-0 bottom-0 w-full max-w-sm bg-white border-l border-gray-100 shadow-2xl flex flex-col transition-transform duration-300
              ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
            `}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <img 
                  src="https://framerusercontent.com/images/BZSiFYgRc4wDUAuEybhJbZsIBQY.png" 
                  alt="Lifewood Logo" 
                  className="h-6 object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <button 
                className="text-gray-500 hover:text-gray-900 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-2">
              {navItems.map((item) => (
                <div key={item.label} className="border-b border-gray-100 last:border-0">
                  <div
                    className="flex items-center justify-between py-4 cursor-pointer group"
                    onClick={() => item.children ? toggleMobileExpand(item.label) : setMobileMenuOpen(false)}
                  >
                    <a
                      href={item.children ? '#' : item.href}
                      className={`text-sm font-medium transition-colors ${item.children ? 'pointer-events-none text-[#133020]' : 'text-gray-600 group-hover:text-[#f59e0b]'}`}
                      onClick={(e) => { if (item.children) e.preventDefault(); else setMobileMenuOpen(false); }}
                    >
                      {item.label}
                    </a>
                    {item.children && (
                      <ChevronDown
                        size={16}
                        className={`text-gray-400 group-hover:text-[#f59e0b] transition-all duration-200 ${mobileExpanded === item.label ? 'rotate-180' : ''}`}
                      />
                    )}
                  </div>
                  {item.children && mobileExpanded === item.label && (
                    <div className="flex flex-col gap-2 pb-4 pl-4">
                      {item.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          className="text-sm font-medium text-gray-500 hover:text-[#f59e0b] py-2 transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="p-6 border-t border-gray-100 bg-gray-50">
              {user ? (
                <a 
                  href="#profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-[#133020] text-white rounded-full text-sm font-medium hover:bg-[#046241] transition-colors shadow-md"
                >
                  <User size={16} />
                  {fullName}
                </a>
              ) : (
                <a 
                  href="#login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="group relative block w-full py-3 rounded-full text-sm font-semibold text-white overflow-hidden bg-gradient-to-r from-[#0F2A24] to-[#2F7C6F] shadow-[0_12px_28px_rgba(19,48,32,0.25)] hover:shadow-[0_16px_32px_rgba(47,124,111,0.35)] transition-all"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#2F7C6F] via-[#0F2A24] to-[#2F7C6F] opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <span className="relative z-10 inline-flex items-center justify-center gap-2">
                    <LogIn size={16} />
                    Sign In
                  </span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
