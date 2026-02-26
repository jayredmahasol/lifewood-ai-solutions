import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowLeft, Mail, Lock, User } from 'lucide-react';
import LightPillar from './react-bits/LightPillar';

const InputField = ({ label, icon: Icon, ...props }: any) => (
  <div className="space-y-2">
    <label className="text-xs font-semibold uppercase tracking-wider text-white/30 ml-1">
      {label}
    </label>
    <div className="relative group">
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-orange-400 transition-colors" size={18} />
      <input 
        {...props}
        className="w-full bg-white/[0.03] border border-white/10 focus:border-orange-500/50 focus:bg-white/[0.05] focus:shadow-[0_0_20px_rgba(251,146,60,0.05)] rounded-2xl py-4 pl-12 pr-4 outline-none text-white placeholder:text-white/10 transition-all duration-300"
      />
    </div>
  </div>
);

const SocialButton = ({ children, icon }: { children: React.ReactNode, icon: React.ReactNode }) => (
  <button className="flex items-center justify-center gap-3 py-3 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 group w-full">
    {icon}
    <span className="text-sm font-medium text-white/60 group-hover:text-white">{children}</span>
  </button>
);

export const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white overflow-hidden relative flex items-center justify-center selection:bg-orange-500/30">
      
      {/* Background */}
      <div className="absolute inset-0 z-0">
         <LightPillar
            topColor="#046241"
            bottomColor="#000000"
            intensity={1.5}
            rotationSpeed={0.15}
            glowAmount={0.005}
            pillarWidth={6}
            pillarHeight={1.5}
            noiseIntensity={0.2}
            pillarRotation={20}
            quality="high"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
      </div>

      {/* Back Button */}
      <a href="/" className="absolute top-8 left-8 z-50 flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm font-medium group">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
        Back to Home
      </a>

      {/* Flip Card Container */}
      <div className="relative z-10 w-full max-w-[420px] perspective-[2000px] px-4">
        <motion.div
          initial={false}
          animate={{ rotateY: isLogin ? 0 : 180 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative w-full grid grid-cols-1 grid-rows-1"
        >
          {/* Front Face - Login */}
          <div 
            className="col-start-1 row-start-1 w-full bg-black/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 sm:p-10 shadow-2xl"
            style={{ backfaceVisibility: "hidden" }}
          >
             {/* Logo & Header */}
             <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 mb-6">
                    <img
                        src="https://framerusercontent.com/images/BZSiFYgRc4wDUAuEybhJbZsIBQY.png"
                        alt="Lifewood"
                        className="h-6 w-auto object-contain"
                    />
                </div>
                <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
                <p className="text-white/40 text-sm">Enter your credentials to access your account</p>
             </div>

             {/* Social */}
             <div className="grid grid-cols-2 gap-4 mb-6">
                <SocialButton icon={<svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="currentColor" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="currentColor" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="currentColor" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="currentColor" /></svg>}>Google</SocialButton>
                <SocialButton icon={<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.504.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.42 22 12c0-5.523-4.477-10-10-10z" /></svg>}>GitHub</SocialButton>
             </div>

             <div className="relative flex items-center mb-6">
                <div className="flex-grow border-t border-white/10"></div>
                <span className="px-4 text-[10px] uppercase tracking-widest text-white/30">Or Login with</span>
                <div className="flex-grow border-t border-white/10"></div>
             </div>

             <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <InputField label="Email Address" icon={Mail} type="email" placeholder="name@company.com" />
                <div className="space-y-2">
                    <div className="flex justify-between items-center px-1">
                        <label className="text-xs font-semibold uppercase tracking-wider text-white/30">Password</label>
                        <button type="button" className="text-[11px] text-white/30 hover:text-orange-400 transition-colors">Forgot?</button>
                    </div>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-orange-400 transition-colors" size={18} />
                        <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="••••••••"
                            className="w-full bg-white/[0.03] border border-white/10 focus:border-orange-500/50 focus:bg-white/[0.05] focus:shadow-[0_0_20px_rgba(251,146,60,0.05)] rounded-2xl py-4 pl-12 pr-12 outline-none text-white placeholder:text-white/10 transition-all duration-300"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>
                <button className="w-full bg-orange-500 hover:bg-orange-400 text-black rounded-2xl py-4 font-bold transition-all mt-4 shadow-lg shadow-orange-500/20">
                    Sign In
                </button>
             </form>

             <div className="mt-8 text-center">
                <p className="text-white/40 text-sm">
                    Don't have an account? 
                    <button onClick={() => setIsLogin(false)} className="text-orange-500 hover:text-orange-400 font-semibold ml-1 transition-colors">
                        Sign Up
                    </button>
                </p>
             </div>
          </div>

          {/* Back Face - Signup */}
          <div 
            className="col-start-1 row-start-1 w-full bg-black/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 sm:p-10 shadow-2xl"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
             {/* Logo & Header */}
             <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 mb-6">
                    <img
                        src="https://framerusercontent.com/images/BZSiFYgRc4wDUAuEybhJbZsIBQY.png"
                        alt="Lifewood"
                        className="h-6 w-auto object-contain"
                    />
                </div>
                <h2 className="text-3xl font-bold mb-2">Create Account</h2>
                <p className="text-white/40 text-sm">Join us and start building the future</p>
             </div>

             <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <InputField label="Full Name" icon={User} type="text" placeholder="John Doe" />
                <InputField label="Email Address" icon={Mail} type="email" placeholder="name@company.com" />
                <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-white/30 ml-1">Password</label>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-orange-400 transition-colors" size={18} />
                        <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="••••••••"
                            className="w-full bg-white/[0.03] border border-white/10 focus:border-orange-500/50 focus:bg-white/[0.05] focus:shadow-[0_0_20px_rgba(251,146,60,0.05)] rounded-2xl py-4 pl-12 pr-12 outline-none text-white placeholder:text-white/10 transition-all duration-300"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>
                <button className="w-full bg-orange-500 hover:bg-orange-400 text-black rounded-2xl py-4 font-bold transition-all mt-4 shadow-lg shadow-orange-500/20">
                    Create Account
                </button>
             </form>

             <div className="mt-8 text-center">
                <p className="text-white/40 text-sm">
                    Already have an account? 
                    <button onClick={() => setIsLogin(true)} className="text-orange-500 hover:text-orange-400 font-semibold ml-1 transition-colors">
                        Sign In
                    </button>
                </p>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
