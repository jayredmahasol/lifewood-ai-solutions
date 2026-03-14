import React, { useEffect, useRef, useState } from 'react';
// Contact Us Page Component
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

declare global {
  interface Window {
    L: any;
  }
}

export const ContactUsPage: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    try {
      const { error } = await supabase
        .from('feedback_messages')
        .insert([
          {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            message: formData.message
          }
        ]);

      if (error) {
        // If the table doesn't exist, we'll catch it here
        if (error.code === '42P01') {
           throw new Error('The "feedback_messages" table does not exist in the database. Please create it in Supabase.');
        }
        // If RLS is enabled but no policies exist
        if (error.code === '42501' || error.message.includes('row-level security')) {
           throw new Error('Permission denied. Please disable RLS or add an INSERT policy for the "feedback_messages" table in Supabase.');
        }
        throw error;
      }

      setSubmitSuccess(true);
      setFormData({ firstName: '', lastName: '', email: '', message: '' });
    } catch (err: any) {
      console.error('Error submitting feedback:', err);
      setSubmitError(err.message || 'An error occurred while sending your message.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const L = window.L;
    if (!L) return;

    // Cebu IT Park Coordinates
    const cebuCoords = [10.3309, 123.9063];

    const map = L.map(mapContainerRef.current, {
        zoomControl: false, 
        attributionControl: false,
        scrollWheelZoom: false
    }).setView(cebuCoords, 16);

    mapInstanceRef.current = map;

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    const pinSvg = `
      <svg width="40" height="56" viewBox="0 0 30 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 0C6.71573 0 0 6.71573 0 15C0 26.25 15 42 15 42C15 42 30 26.25 30 15C30 6.71573 23.2843 0 15 0Z" fill="#FFB347"/>
        <circle cx="15" cy="15" r="6" fill="white"/>
      </svg>
    `;

    const pinIcon = L.divIcon({
      className: 'custom-pin-icon',
      html: pinSvg,
      iconSize: [40, 56],
      iconAnchor: [20, 56]
    });

    L.marker(cebuCoords, { icon: pinIcon }).addTo(map);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="pt-24 pb-16 min-h-screen bg-lifewood-beige">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-16">
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-lifewood-darkGreen tracking-tight mb-6"
          >
            Let's start a<br />conversation.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-lifewood-darkGreen/70 max-w-2xl"
          >
            Whether you have a question about our services, pricing, or just want to say hello, we're ready to answer all your questions.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-lifewood-darkGreen/5 backdrop-blur-xl rounded-[2rem] p-8 md:p-10 border border-lifewood-darkGreen/10"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {submitSuccess && (
                <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-start gap-3">
                  <CheckCircle2 size={20} className="shrink-0 mt-0.5" />
                  <p className="text-sm">Thank you for reaching out! Your message has been sent successfully.</p>
                </div>
              )}

              {submitError && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-start gap-3">
                  <AlertCircle size={20} className="shrink-0 mt-0.5" />
                  <p className="text-sm">{submitError}</p>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium text-lifewood-darkGreen">First name</label>
                  <input 
                    type="text" 
                    id="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-lifewood-white border-transparent focus:border-lifewood-orange focus:ring-0 transition-colors"
                    placeholder="Jane"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium text-lifewood-darkGreen">Last name</label>
                  <input 
                    type="text" 
                    id="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-lifewood-white border-transparent focus:border-lifewood-orange focus:ring-0 transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-lifewood-darkGreen">Email address</label>
                <input 
                  type="email" 
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-lifewood-white border-transparent focus:border-lifewood-orange focus:ring-0 transition-colors"
                  placeholder="jane@company.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-lifewood-darkGreen">Message</label>
                <textarea 
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-lifewood-white border-transparent focus:border-lifewood-orange focus:ring-0 transition-colors resize-none"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-lifewood-darkGreen text-white rounded-xl font-semibold hover:bg-lifewood-primaryGreen transition-colors flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8 lg:pl-12"
          >
            <div className="bg-lifewood-white rounded-3xl p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-lifewood-darkGreen mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-lifewood-orange/20 flex items-center justify-center shrink-0">
                    <Mail size={20} className="text-lifewood-darkGreen" />
                  </div>
                  <div>
                    <p className="font-medium text-lifewood-darkGreen">Email us</p>
                    <a href="mailto:hr.lifewood@gmail.com" className="text-lifewood-darkGreen/70 hover:text-lifewood-orange transition-colors">hr.lifewood@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-lifewood-orange/20 flex items-center justify-center shrink-0">
                    <Phone size={20} className="text-lifewood-darkGreen" />
                  </div>
                  <div>
                    <p className="font-medium text-lifewood-darkGreen">Call us</p>
                    <a href="tel:+639276155464" className="text-lifewood-darkGreen/70 hover:text-lifewood-orange transition-colors">+63 927 615 5464</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-lifewood-orange/20 flex items-center justify-center shrink-0">
                    <MapPin size={20} className="text-lifewood-darkGreen" />
                  </div>
                  <div>
                    <p className="font-medium text-lifewood-darkGreen">Visit us</p>
                    <p className="text-lifewood-darkGreen/70 text-sm leading-relaxed">
                      Ground Floor i2 Building, Jose Del Mar Street<br />
                      Cebu IT Park, Asia Town, Salinas Drive<br />
                      Apas Lahug, Cebu City, 6000
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-lifewood-darkGreen rounded-3xl h-64 overflow-hidden relative shadow-lg">
               <div ref={mapContainerRef} className="w-full h-full z-0"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};


