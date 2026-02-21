import React from 'react';
import { Linkedin, Facebook, Instagram, Youtube, ArrowUpRight, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="mx-4 mb-4 rounded-[2rem] bg-[#133020] text-[#f5eedb] py-12 px-6 md:px-12 overflow-hidden relative font-sans shadow-2xl">
      
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#046241] rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Top Section: Logo & Tagline */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
          <a href="#" className="block group">
            <img 
              src="https://framerusercontent.com/images/Ca8ppNsvJIfTsWEuHr50gvkDow.png" 
              alt="Lifewood" 
              className="h-10 w-auto object-contain brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity"
            />
          </a>
          <h2 className="text-2xl md:text-3xl font-light leading-tight max-w-xl text-left md:text-right">
            Empowering AI with <br/>
            <span className="text-[#FFB347] font-serif italic">Human Intelligence.</span>
          </h2>
        </div>

        {/* Middle Section: Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12 border-t border-[#f5eedb]/10 pt-12">
          
          {/* Column 1: Contact */}
          <div className="md:col-span-5">
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-[#046241] mb-6">READY TO START?</h3>
            
            <a 
               href="#contact"
               className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFB347] text-[#133020] rounded-full font-bold text-base hover:bg-[#FFC370] transition-all hover:scale-105 shadow-lg mb-6"
             >
                Get in Touch <ArrowRight size={18} />
             </a>

            <p className="text-[#f5eedb]/60 text-base max-w-sm leading-relaxed">
              Global Data Engineering Services enabling the next generation of AI Solutions.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="md:col-span-3 md:col-start-7">
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-[#046241] mb-6">Explore</h3>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '#' },
                { label: 'AI Services', href: '#ai-services' },
                { label: 'AI Projects', href: '#ai-projects' },
                { label: 'About Us', href: '#about' },
                { label: 'Careers', href: '#careers' }
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-base hover:text-[#FFB347] transition-colors flex items-center gap-2 group w-fit">
                    {item.label}
                    <ArrowUpRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#FFB347]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-[#046241] mb-6">Legal</h3>
            <ul className="space-y-3">
              {['Privacy Policy', 'Cookie Policy', 'Terms & Conditions'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-base text-[#f5eedb]/60 hover:text-[#FFB347] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section: Socials & Copyright */}
        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-6 pt-6 border-t border-[#f5eedb]/10">
          <p className="text-[#f5eedb]/40 text-xs font-mono">
            © {new Date().getFullYear()} Lifewood Data Technology Ltd.
          </p>

          <div className="flex gap-3">
            {[
              { Icon: Linkedin, href: "https://www.linkedin.com/company/lifewood-data-technology-ltd./posts/?feedView=all", label: "LinkedIn" },
              { Icon: Facebook, href: "https://www.facebook.com/LifewoodPH", label: "Facebook" },
              { Icon: Instagram, href: "https://www.instagram.com/lifewood_official/?hl=af", label: "Instagram" },
              { Icon: Youtube, href: "https://www.youtube.com/@LifewoodDataTechnology", label: "Youtube" }
            ].map((social) => (
              <a 
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#f5eedb]/10 bg-[#f5eedb]/5 flex items-center justify-center text-[#f5eedb] hover:bg-[#FFB347] hover:border-[#FFB347] hover:text-[#133020] transition-all duration-300 group"
                aria-label={social.label}
              >
                <social.Icon size={18} className="group-hover:scale-110 transition-transform" />
              </a>
            ))}
          </div>
        </div>
      </div>
      
      {/* Floating Action Button for Call */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="flex items-center gap-3 bg-[#FFB347] text-[#133020] px-5 py-3 rounded-full shadow-2xl hover:bg-[#FFC370] transition-all hover:scale-105 hover:-translate-y-1 group font-bold border-2 border-[#133020]/10">
            <div className="relative flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-[#046241] animate-ping absolute opacity-75"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#046241] relative z-10"></div>
            </div>
            <span className="pr-1 tracking-wide text-sm">Start a call</span>
        </button>
      </div>
    </footer>
  );
};
