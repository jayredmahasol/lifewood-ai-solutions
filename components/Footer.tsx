import React, { useState } from 'react';
import { Linkedin, Facebook, Instagram, Youtube, MessageSquare } from 'lucide-react';
import { Chatbot } from './Chatbot';

export const Footer: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <footer id="contact" className="bg-[#046241] text-white py-20 px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Section: 5 Columns */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          
          {/* Col 1: Logo & Slogan */}
          <div className="col-span-2 lg:col-span-1 flex flex-col items-start">
            <img 
              src="https://framerusercontent.com/images/BZSiFYgRc4wDUAuEybhJbZsIBQY.png" 
              alt="Lifewood" 
              className="h-10 w-auto object-contain mb-6"
              style={{ filter: 'brightness(0) saturate(100%) invert(65%) sepia(54%) saturate(3430%) hue-rotate(352deg) brightness(100%) contrast(94%)' }}
              referrerPolicy="no-referrer"
            />
            <p className="text-sm text-white/70 leading-relaxed">
              Empowering AI with<br/>Human Intelligence.
            </p>
          </div>

          {/* Col 2 */}
          <div className="flex flex-col gap-4">
            <a href="#" className="text-sm text-white/70 hover:text-[#FFB347] transition-colors">Home</a>
            <a href="#about" className="text-sm text-white/70 hover:text-[#FFB347] transition-colors">About Us</a>
            <a href="#careers" className="text-sm text-white/70 hover:text-[#FFB347] transition-colors">Careers</a>
          </div>

          {/* Col 3 */}
          <div className="flex flex-col gap-4">
            <a href="#ai-services" className="text-sm text-white/70 hover:text-[#FFB347] transition-colors">AI Services</a>
            <a href="#ai-projects" className="text-sm text-white/70 hover:text-[#FFB347] transition-colors">AI Projects</a>
          </div>

          {/* Col 4 */}
          <div className="flex flex-col gap-4">
            <a href="#privacy" className="text-sm text-white/70 hover:text-[#FFB347] transition-colors">Privacy Policy</a>
            <a href="#cookie" className="text-sm text-white/70 hover:text-[#FFB347] transition-colors">Cookie Policy</a>
          </div>

          {/* Col 5 */}
          <div className="flex flex-col gap-4">
            <a href="#terms" className="text-sm text-white/70 hover:text-[#FFB347] transition-colors">Terms & Conditions</a>
            <a href="#contact" className="text-sm text-white/70 hover:text-[#FFB347] transition-colors">Contact Us</a>
          </div>

        </div>

        {/* Bottom Section: Socials & Copyright */}
        <div className="flex flex-col items-center gap-6 pt-10 border-t border-white/10">
          
          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {[
              { Icon: Facebook, href: "https://www.facebook.com/LifewoodPH", label: "Facebook" },
              { Icon: Youtube, href: "https://www.youtube.com/@LifewoodDataTechnology", label: "Youtube" },
              { Icon: Linkedin, href: "https://www.linkedin.com/company/lifewood-data-technology-ltd./posts/?feedView=all", label: "LinkedIn" },
              { Icon: Instagram, href: "https://www.instagram.com/lifewood_official/?hl=af", label: "Instagram" }
            ].map((social) => (
              <a 
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-[#FFB347] hover:text-[#133020] transition-all"
                aria-label={social.label}
              >
                <social.Icon size={18} />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} Lifewood. All rights reserved.
          </p>
        </div>
      </div>
      
      {/* Floating Action Button for Chat */}
      <div className="fixed bottom-8 right-8 z-50">
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="flex items-center gap-3 bg-[#FFB347] text-[#133020] px-5 py-3 rounded-full shadow-2xl hover:bg-[#ffc370] transition-all hover:scale-105 hover:-translate-y-1 group font-bold border-2 border-[#133020]/10"
        >
            <div className="relative flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-[#133020] animate-ping absolute opacity-75"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#133020] relative z-10"></div>
            </div>
            <span className="pr-1 tracking-wide text-sm">Talk to us</span>
        </button>
      </div>

      {/* Chatbot Panel */}
      <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </footer>
  );
};
