import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowLeft, Mail, Lock, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import Squares from './react-bits/Squares';

const InputField = ({ label, icon: Icon, ...props }: any) => (
  <div className="space-y-2">
    <label className="text-xs font-semibold uppercase tracking-wider text-[#102A24]/60 ml-1">
      {label}
    </label>
    <div className="relative group">
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-[#102A24]/40 group-focus-within:text-[#2F7C6F] transition-colors" size={18} />
      <input 
        {...props}
        className="w-full bg-[#F9F7F7] border border-[#102A24]/10 focus:border-[#2F7C6F] focus:bg-white focus:shadow-[0_0_0_4px_rgba(47,124,111,0.12)] rounded-2xl py-4 pl-12 pr-4 outline-none text-[#102A24] placeholder:text-[#102A24]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      />
    </div>
  </div>
);

const SocialButton = ({ children, icon, onClick, disabled }: { children: React.ReactNode, icon: React.ReactNode, onClick?: () => void, disabled?: boolean }) => (
  <button 
    type="button"
    onClick={onClick}
    disabled={disabled}
    className="flex items-center justify-center gap-3 py-3 rounded-2xl border border-[#102A24]/10 bg-white hover:bg-[#F9F7F7] hover:border-[#102A24]/20 transition-all duration-300 group w-full disabled:opacity-50 disabled:cursor-not-allowed text-[#102A24]"
  >
    {icon}
    <span className="text-sm font-medium text-[#102A24]/80 group-hover:text-[#102A24]">{children}</span>
  </button>
);

export const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Admin bypass
    if (email === 'admin1' && password === 'admin1') {
      localStorage.setItem('isAdmin', 'true');
      window.location.hash = '#admin-dashboard';
      setLoading(false);
      return;
    }

    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      // Check if user is suspended
      if (authData.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('website')
          .eq('id', authData.user.id)
          .single();
          
        if (profile && profile.website === 'suspended') {
          await supabase.auth.signOut();
          setError('Your account has been suspended. Please contact the administrator.');
          setLoading(false);
          return;
        }
      }
      
      localStorage.removeItem('isAdmin');
      window.location.hash = '#dashboard';
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F7F5F0] text-[#102A24] overflow-hidden relative flex items-center justify-center selection:bg-[#FFB347]/30">
      
      {/* Background Accents */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#F7F5F0] to-[#F3EEE3]"></div>
        <div className="absolute inset-0 opacity-25">
          <Squares
            direction="diagonal"
            speed={0.2}
            borderColor="rgba(16, 42, 36, 0.08)"
            squareSize={52}
            hoverFillColor="rgba(47, 124, 111, 0.08)"
          />
        </div>
      </div>

      {/* Back Button */}
      <a href="/" className="absolute top-8 left-8 z-50 flex items-center gap-2 text-[#102A24]/60 hover:text-[#2F7C6F] transition-colors text-sm font-medium group">
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
        Back to Home
      </a>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#102A24]/10 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#2F7C6F]">
            Secure access
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold text-[#102A24] leading-tight">
            Welcome back to Lifewood
          </h1>
          <p className="text-[#102A24]/60 text-base max-w-xl">
            Manage your profile, track your application progress, and access internal resources in one place.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: 'Single sign-in', description: 'Continue with email or social account.', href: '#dashboard' },
              { title: 'Secure access', description: 'Protected by enterprise-grade security.', href: '#contact' },
              { title: 'Status tracking', description: 'Check your application status anytime.', href: '#application-status' },
              { title: 'Fast support', description: 'Reach our team from your dashboard.', href: '#contact' }
            ].map(item => (
              <a
                key={item.title}
                href={item.href}
                className="rounded-2xl border border-white/80 bg-white/70 p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group"
              >
                <p className="text-sm font-semibold text-[#102A24] group-hover:text-[#2F7C6F]">{item.title}</p>
                <p className="text-xs text-[#102A24]/60 mt-1">{item.description}</p>
              </a>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full bg-white/80 border border-white/90 rounded-[2rem] p-8 sm:p-10 shadow-[0_25px_70px_-25px_rgba(16,42,36,0.25)] backdrop-blur"
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-6">
              <img
                src="https://framerusercontent.com/images/BZSiFYgRc4wDUAuEybhJbZsIBQY.png"
                alt="Lifewood"
                className="h-6 w-auto object-contain"
              />
            </div>
            <h2 className="text-3xl font-bold mb-2 text-[#102A24]">Sign in</h2>
            <p className="text-[#102A24]/60 text-sm">Use your credentials to continue</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <SocialButton onClick={() => handleSocialLogin('google')} disabled={loading} icon={<svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#EA4335" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#4285F4" /></svg>}>Google</SocialButton>
            <SocialButton onClick={() => handleSocialLogin('github')} disabled={loading} icon={<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.504.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.42 22 12c0-5.523-4.477-10-10-10z" /></svg>}>GitHub</SocialButton>
          </div>

          <div className="relative flex items-center mb-6">
            <div className="flex-grow border-t border-[#102A24]/10"></div>
            <span className="px-4 text-[10px] uppercase tracking-widest text-[#102A24]/40 font-semibold">Or sign in with</span>
            <div className="flex-grow border-t border-[#102A24]/10"></div>
          </div>

          <form className="space-y-4" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-600 text-xs text-center font-medium">
                {error}
              </div>
            )}
            
            <InputField 
              label="Email Address or Username" 
              icon={Mail} 
              type="text" 
              placeholder="name@company.com or admin1" 
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
            
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#102A24]/60">Password</label>
                <button type="button" className="text-[11px] font-medium text-[#2F7C6F] hover:text-[#102A24] transition-colors">Forgot?</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#102A24]/40 group-focus-within:text-[#2F7C6F] transition-colors" size={18} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="********"
                  className="w-full bg-[#F9F7F7] border border-[#102A24]/10 focus:border-[#2F7C6F] focus:bg-white focus:shadow-[0_0_0_4px_rgba(47,124,111,0.12)] rounded-2xl py-4 pl-12 pr-12 outline-none text-[#102A24] placeholder:text-[#102A24]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#102A24]/40 hover:text-[#2F7C6F] transition-colors"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-[#102A24] hover:bg-[#2F7C6F] text-white rounded-2xl py-4 font-bold transition-all mt-6 shadow-[0_12px_30px_-15px_rgba(16,42,36,0.45)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : 'Sign In'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};
