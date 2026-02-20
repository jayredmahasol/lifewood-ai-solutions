import React from 'react';
import { Linkedin, Facebook, Instagram, Youtube, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="mx-4 mb-4 rounded-[2.5rem] bg-lifewood-darkGreen text-white py-16 px-8 md:px-16 overflow-hidden relative">
      <div className="max-w-7xl mx-auto">
        <a href="#" className="flex items-center gap-2 cursor-pointer">
          <img 
            src="https://framerusercontent.com/images/Ca8ppNsvJIfTsWEuHr50gvkDow.png" 
            alt="Lifewood" 
            className="h-8 w-auto object-contain"
          />
        </a>

        <p className="text-2xl md:text-3xl font-light max-w-2xl mb-24">
          We provide global Data Engineering Services to enable AI Solutions.
        </p>

        <div className="flex flex-col md:flex-row justify-between items-end gap-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-light mb-8">Contact Us</h2>
            <div className="flex gap-6 text-sm text-gray-300">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms and Conditions</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
            </div>
          </div>

          <div className="flex flex-col items-end gap-6">
            <p className="text-sm text-gray-400">Find Us On:</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-lifewood-orange transition-colors flex flex-col items-center gap-2 group">
                <Linkedin size={24} />
                <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">LinkedIn</span>
              </a>
              <a href="#" className="hover:text-lifewood-orange transition-colors flex flex-col items-center gap-2 group">
                <Facebook size={24} />
                 <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">Facebook</span>
              </a>
              <a href="#" className="hover:text-lifewood-orange transition-colors flex flex-col items-center gap-2 group">
                <Instagram size={24} />
                 <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">Instagram</span>
              </a>
              <a href="#" className="hover:text-lifewood-orange transition-colors flex flex-col items-center gap-2 group">
                <Youtube size={24} />
                 <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">Youtube</span>
              </a>
            </div>
            <p className="text-sm text-gray-400 mt-4">© 2026 Lifewood</p>
          </div>
        </div>
      </div>
      
      {/* Floating Action Button for Call */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="flex items-center gap-3 bg-black text-white px-5 py-3 rounded-full shadow-2xl hover:bg-gray-900 transition-all group">
            <div className="relative">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-lifewood-orange to-lifewood-primaryGreen animate-spin-slow"></div>
            </div>
            <span className="font-medium pr-2">Start a call</span>
        </button>
      </div>
    </footer>
  );
};