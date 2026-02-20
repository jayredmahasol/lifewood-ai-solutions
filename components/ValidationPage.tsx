import React, { useEffect, useState } from 'react';
import { AlertTriangle, ArrowRight } from 'lucide-react';

export const ValidationPage: React.FC = () => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    // Redirect timeout
    const redirect = setTimeout(() => {
      window.location.hash = ''; // Redirect to home
      window.scrollTo(0, 0);
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, []);

  return (
    <div className="min-h-screen bg-lifewood-beige flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-lifewood-orange rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-lifewood-primaryGreen rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 bg-lifewood-white/80 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-2xl max-w-lg w-full border border-white/50">
        <div className="w-20 h-20 bg-lifewood-orange/20 text-lifewood-orange rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle size={40} strokeWidth={1.5} />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-lifewood-darkGreen mb-4 tracking-tight">
          System Validation
        </h1>
        
        <p className="text-gray-600 mb-8 text-lg leading-relaxed">
          We encountered an unexpected issue with your request. To ensure system integrity, we are redirecting you to the home page.
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-8 overflow-hidden">
          <div 
            className="bg-lifewood-darkGreen h-full transition-all duration-1000 ease-linear"
            style={{ width: `${(countdown / 5) * 100}%` }}
          ></div>
        </div>

        <button 
          onClick={() => { window.location.hash = ''; window.scrollTo(0, 0); }}
          className="w-full py-4 bg-lifewood-darkGreen text-white rounded-full font-medium hover:bg-lifewood-primaryGreen transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg shadow-green-900/20"
        >
          <span>Return to Home Now</span>
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
        
        <p className="mt-6 text-xs text-gray-400 uppercase tracking-widest">
          Redirecting in {countdown}s
        </p>
      </div>
    </div>
  );
};
