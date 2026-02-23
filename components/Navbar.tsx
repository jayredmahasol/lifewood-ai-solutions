import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { NavItem } from '../types';
import GlassSurface from './react-bits/GlassSurface';

const navItems: NavItem[] = [
  { label: 'Home', href: '#' },
  {
    label: 'AI Initiatives',
    href: '#ai',
    children: [
      { label: 'AI Services', href: '#ai-services' },
      { label: 'AI Projects', href: '#ai-projects' },
    ]
  },
  {
    label: 'Our Company',
    href: '#company',
    children: [
      { label: 'About Us', href: '#about' },
      { label: 'Offices', href: '#offices' },
    ]
  },
  {
    label: 'What We Offer',
    href: '#offer',
    children: [
      { label: 'Type A- Data Servicing', href: '#type-a' },
      { label: 'Type B- Horizontal LLM Data', href: '#type-b' },
      { label: 'Type C- Vertical LLM Data', href: '#type-c' },
      { label: 'Type D- AIGC', href: '#type-d' },
    ]
  },
  { label: 'Philanthropy & Impact', href: '#impact' },
  { label: 'Careers', href: '#careers' },
  { label: 'Contact Us', href: '#contact' },
  { label: 'Internal News', href: '#news' },
];

export const Navbar: React.FC<{ currentRoute: string }> = ({ currentRoute }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
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
    <nav className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 ${isScrolled ? 'pt-2' : 'pt-6'}`}>
      <GlassSurface
        width={isScrolled ? '95%' : '90%'}
        height={60}
        borderRadius={isScrolled ? 20 : 32}
        borderWidth={1}
        displace={5}
        distortionScale={-110}
        redOffset={0}
        greenOffset={10}
        blueOffset={20}
        brightness={85}
        opacity={1}
        mixBlendMode="screen"
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 cursor-pointer">
          <img
            src="https://framerusercontent.com/images/BZSiFYgRc4wDUAuEybhJbZsIBQY.png"
            alt="Lifewood"
            className="h-8 w-auto object-contain pr-36"
          />
        </a>


        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navItems.map((item) => {
            const active = isActive(item.href) || (item.children && isParentActive(item.children));
            const hasChildren = item.children && item.children.length > 0;

            return (
              <div key={item.label} className="relative group">
                {hasChildren ? (
                  <div
                    className={`
                    flex items-center gap-1 text-sm font-medium transition-colors py-2 cursor-default
                    ${active ? 'text-lifewood-orange' : 'text-black hover:text-lifewood-primaryGreen'}
                  `}
                  >
                    {item.label}
                    <ChevronDown
                      size={14}
                      className="group-hover:rotate-180 transition-transform duration-200"
                    />
                  </div>
                ) : (
                  <a
                    href={item.href}
                    className={`
                    flex items-center gap-1 text-sm font-medium transition-colors py-2
                    ${active ? 'text-lifewood-orange' : 'text-black hover:text-lifewood-primaryGreen'}
                  `}
                  >
                    {item.label}
                  </a>
                )}

                {/* Desktop Dropdown */}
                {item.children && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                    <div className="bg-lifewood-white/95 backdrop-blur-xl border border-white/50 rounded-xl p-2 shadow-xl flex flex-col overflow-hidden">
                      {item.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${currentRoute === child.href ? 'text-lifewood-orange bg-lifewood-beige/50' : 'text-lifewood-darkGreen hover:bg-lifewood-beige/50 hover:text-lifewood-primaryGreen'}`}
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
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-lifewood-darkGreen"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 mt-4 p-6 bg-lifewood-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 flex flex-col gap-2 lg:hidden max-h-[80vh] overflow-y-auto">
            {navItems.map((item) => (
              <div key={item.label} className="border-b border-gray-100 last:border-0">
                <div
                  className="flex items-center justify-between py-3 cursor-pointer"
                  onClick={() => item.children ? toggleMobileExpand(item.label) : setMobileMenuOpen(false)}
                >
                  <a
                    href={item.children ? '#' : item.href}
                    className={`text-lg font-medium text-lifewood-darkGreen ${item.children ? 'pointer-events-none' : ''}`}
                    onClick={(e) => { if (item.children) e.preventDefault(); else setMobileMenuOpen(false); }}
                  >
                    {item.label}
                  </a>
                  {item.children && (
                    <ChevronDown
                      size={20}
                      className={`text-lifewood-darkGreen transition-transform duration-300 ${mobileExpanded === item.label ? 'rotate-180' : ''}`}
                    />
                  )}
                </div>

                {/* Mobile Submenu */}
                {item.children && (
                  <div className={`overflow-hidden transition-all duration-300 ${mobileExpanded === item.label ? 'max-h-96 pb-3 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="flex flex-col gap-2 pl-4 border-l-2 border-lifewood-orange/30 ml-2">
                      {item.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          className="text-base text-lifewood-darkGreen/80 hover:text-lifewood-primaryGreen py-1"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      </GlassSurface>
    </nav>
  );
};