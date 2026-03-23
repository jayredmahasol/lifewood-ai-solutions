import React, { useState } from 'react';
import { Linkedin, Facebook, Instagram, Youtube, MessageSquare, ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { Chatbot } from './Chatbot';

export const Footer: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <footer id="contact" className="relative bg-[#0F2A24] text-white py-20 px-6 md:px-12 font-sans overflow-hidden">
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute -top-32 -right-24 w-[420px] h-[420px] rounded-full bg-[#2F7C6F] blur-[140px]"></div>
        <div className="absolute -bottom-32 -left-24 w-[420px] h-[420px] rounded-full bg-[#F0A541] blur-[140px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] mb-16">
          <div className="space-y-6">
            <img
              src="https://framerusercontent.com/images/BZSiFYgRc4wDUAuEybhJbZsIBQY.png"
              alt="Lifewood"
              className="h-10 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
            <p className="text-white/75 max-w-md">
              Empowering AI with human intelligence. We build data pipelines, community programs, and responsible delivery at global scale.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
                <input
                  type="email"
                  placeholder="Work email"
                  className="w-full pl-11 pr-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-[#F0A541]"
                />
              </div>
              <button className="px-6 py-3 rounded-full bg-[#F0A541] text-[#0F2A24] font-semibold hover:bg-white transition">
                Get updates
              </button>
            </div>
            <div className="flex items-center gap-4 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <MapPin size={14} />
                Cebu IT Park, PH
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} />
                +63 927 615 5464
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div className="flex flex-col gap-3">
              <p className="text-sm uppercase tracking-[0.2em] text-white/50">Company</p>
              <a href="#" className="text-sm text-white/75 hover:text-white transition-colors">Home</a>
              <a href="#about" className="text-sm text-white/75 hover:text-white transition-colors">About Us</a>
              <a href="#careers" className="text-sm text-white/75 hover:text-white transition-colors">Careers</a>
              <a href="#impact" className="text-sm text-white/75 hover:text-white transition-colors">Impact</a>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-sm uppercase tracking-[0.2em] text-white/50">Solutions</p>
              <a href="#ai-services" className="text-sm text-white/75 hover:text-white transition-colors">AI Services</a>
              <a href="#ai-projects" className="text-sm text-white/75 hover:text-white transition-colors">AI Projects</a>
              <a href="#offices" className="text-sm text-white/75 hover:text-white transition-colors">Offices</a>
              <a href="#news" className="text-sm text-white/75 hover:text-white transition-colors">Internal News</a>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-sm uppercase tracking-[0.2em] text-white/50">Legal</p>
              <a href="#privacy" className="text-sm text-white/75 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#cookie" className="text-sm text-white/75 hover:text-white transition-colors">Cookie Policy</a>
              <a href="#terms" className="text-sm text-white/75 hover:text-white transition-colors">Terms & Conditions</a>
              <a href="#contact" className="text-sm text-white/75 hover:text-white transition-colors">Contact Us</a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/10">
          <div className="flex items-center gap-4">
            {[
              { Icon: Facebook, href: 'https://www.facebook.com/LifewoodPH', label: 'Facebook' },
              { Icon: Youtube, href: 'https://www.youtube.com/@LifewoodDataTechnology', label: 'Youtube' },
              { Icon: Linkedin, href: 'https://www.linkedin.com/company/lifewood-data-technology-ltd./posts/?feedView=all', label: 'LinkedIn' },
              { Icon: Instagram, href: 'https://www.instagram.com/lifewood_official/?hl=af', label: 'Instagram' }
            ].map(social => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-[#F0A541] hover:text-[#0F2A24] transition-all"
                aria-label={social.label}
              >
                <social.Icon size={18} />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3 text-white/60 text-sm">
            <span> {new Date().getFullYear()} Lifewood. All rights reserved.</span>
            <span className="hidden md:inline"></span>
            <a href="#" className="hidden md:inline-flex items-center gap-1 text-white/70 hover:text-white">
              Back to top <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>

      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="flex items-center gap-3 bg-[#F0A541] text-[#0F2A24] px-5 py-3 rounded-full shadow-2xl hover:bg-[#ffc370] transition-all hover:scale-105 hover:-translate-y-1 group font-bold border-2 border-white/10"
        >
          <div className="relative flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-[#0F2A24] animate-ping absolute opacity-75"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#0F2A24] relative z-10"></div>
          </div>
          <span className="pr-1 tracking-wide text-sm">Talk to us</span>
        </button>
      </div>

      <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </footer>
  );
};
