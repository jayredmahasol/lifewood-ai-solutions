import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Stats } from './components/Stats';
import { Clients } from './components/Clients';
import { Innovation } from './components/Innovation';
import { Services } from './components/Services';
import { Footer } from './components/Footer';
import { AIServicesPage } from './components/AIServicesPage';
import { AIProjectsPage } from './components/AIProjectsPage';
import { AboutUsPage } from './components/AboutUsPage';
import { OfficesPage } from './components/OfficesPage';
import { TypeAServicingPage } from './components/TypeAServicingPage';
import { TypeBLLMDataPage } from './components/TypeBLLMDataPage';
import { TypeCVerticalLLMDataPage } from './components/TypeCVerticalLLMDataPage';
import { TypeDAIGCPage } from './components/TypeDAIGCPage';
import { PhilanthropyPage } from './components/PhilanthropyPage';
import { ValidationPage } from './components/ValidationPage';
import { ApplicationFormPage } from './components/ApplicationFormPage';
import { ApplicationStatusPage } from './components/ApplicationStatusPage';

import { CareersPage } from './components/CareersPage';
import { ContactUsPage } from './components/ContactUsPage';
import { InternalNewsPage } from './components/InternalNewsPage';
import { LoginPage } from './components/LoginPage';
import { DashboardPage } from './components/DashboardPage';
import { AdminDashboardPage } from './components/AdminDashboardPage';
import { AdminApplicantsPage } from './components/AdminApplicantsPage';
import { AdminNotificationsPage } from './components/AdminNotificationsPage';
import { AdminFeedbackPage } from './components/AdminFeedbackPage';

import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, X } from 'lucide-react';
import { supabase } from './lib/supabaseClient';

function App() {
  const [currentRoute, setCurrentRoute] = useState(window.location.hash);
  const [showIdleModal, setShowIdleModal] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const IDLE_TIMEOUT = 5 * 60 * 1000; // 5 minutes

    const handleIdle = async () => {
      // Check if user is logged in
      const isAdmin = localStorage.getItem('isAdmin');
      const { data: { session } } = await supabase.auth.getSession();

      if (isAdmin || session) {
        // Log them out
        if (isAdmin) {
          localStorage.removeItem('isAdmin');
        }
        if (session) {
          await supabase.auth.signOut();
        }
        
        // Show modal and redirect
        setShowIdleModal(true);
        window.location.hash = '#login';
      }
    };

    let lastResetTime = Date.now();
    const resetTimer = () => {
      const now = Date.now();
      if (now - lastResetTime > 1000) {
        lastResetTime = now;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(handleIdle, IDLE_TIMEOUT);
      }
    };

    // Initial timer setup
    timeoutId = setTimeout(handleIdle, IDLE_TIMEOUT);

    // Set up event listeners
    const events = ['mousemove', 'keydown', 'mousedown', 'touchstart', 'scroll'];
    
    const setupTimer = () => {
      events.forEach(event => document.addEventListener(event, resetTimer));
    };

    const cleanupTimer = () => {
      events.forEach(event => document.removeEventListener(event, resetTimer));
      clearTimeout(timeoutId);
    };

    setupTimer();

    return cleanupTimer;
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(window.location.hash);
      // Scroll to top on route change
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const isAIServicesPage = currentRoute === '#ai-services';
  const isAIProjectsPage = currentRoute === '#ai-projects';
  const isAboutUsPage = currentRoute === '#about';
  const isOfficesPage = currentRoute === '#offices';
  const isTypeAPage = currentRoute === '#type-a';
  const isTypeBPage = currentRoute === '#type-b';
  const isTypeCPage = currentRoute === '#type-c';
  const isTypeDPage = currentRoute === '#type-d';
  const isImpactPage = currentRoute === '#impact';
  const isValidationPage = currentRoute === '#validation';
  const isCareersPage = currentRoute === '#careers';
  const isApplicationFormPage = currentRoute === '#application-form';
  const isApplicationStatusPage = currentRoute === '#application-status';
  const isContactPage = currentRoute === '#contact';
  const isNewsPage = currentRoute === '#news';
  const isLoginPage = currentRoute === '#login';
  const isAdminDashboardPage = currentRoute === '#admin-dashboard';
  const isAdminApplicantsPage = currentRoute === '#admin-applicants';
  const isAdminNotificationsPage = currentRoute === '#admin-notifications';
  const isAdminFeedbackPage = currentRoute === '#admin-feedback';
  const isDashboardPage = currentRoute === '#dashboard' || currentRoute === '#profile' || currentRoute === '#settings' || currentRoute === '#workstreams' || currentRoute === '#analytics';

  return (
    <div className="min-h-screen bg-lifewood-beige text-lifewood-darkGreen selection:bg-lifewood-primaryGreen selection:text-white font-sans">
      {!isValidationPage && !isLoginPage && !isDashboardPage && !isAdminDashboardPage && !isAdminApplicantsPage && !isAdminNotificationsPage && !isAdminFeedbackPage && <Navbar currentRoute={currentRoute} />}
      
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentRoute}
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {isValidationPage ? (
              <ValidationPage />
            ) : isLoginPage ? (
              <LoginPage />
            ) : isAdminDashboardPage ? (
              <AdminDashboardPage />
            ) : isAdminApplicantsPage ? (
              <AdminApplicantsPage />
            ) : isAdminNotificationsPage ? (
              <AdminNotificationsPage />
            ) : isAdminFeedbackPage ? (
              <AdminFeedbackPage />
            ) : isDashboardPage ? (
              <DashboardPage />
            ) : isAIServicesPage ? (
              <AIServicesPage />
            ) : isAIProjectsPage ? (
              <AIProjectsPage />
            ) : isAboutUsPage ? (
              <AboutUsPage />
            ) : isOfficesPage ? (
              <OfficesPage />
            ) : isTypeAPage ? (
              <TypeAServicingPage />
            ) : isTypeBPage ? (
              <TypeBLLMDataPage />
            ) : isTypeCPage ? (
              <TypeCVerticalLLMDataPage />
            ) : isTypeDPage ? (
              <TypeDAIGCPage />
            ) : isImpactPage ? (
              <PhilanthropyPage />
            ) : isCareersPage ? (
              <CareersPage />
            ) : isApplicationFormPage ? (
              <ApplicationFormPage />
            ) : isApplicationStatusPage ? (
              <ApplicationStatusPage />
            ) : isContactPage ? (
              <ContactUsPage />
            ) : isNewsPage ? (
              <InternalNewsPage />
            ) : (
              <>
                <Hero />
                <About />
                
                {/* Contact/Explore Banner */}
                <div className="px-6 py-8">
                     <div className="max-w-7xl mx-auto flex gap-4">
                         <a href="#contact" className="px-6 py-3 bg-lifewood-orange rounded-full font-medium text-sm hover:bg-lifewood-lightOrange transition-colors">
                             Contact us now
                         </a>
                         <a href="#ai-services" className="px-6 py-3 border border-lifewood-darkGreen rounded-full font-medium text-sm hover:bg-lifewood-darkGreen hover:text-white transition-colors flex items-center gap-2">
                             <span className="text-lg leading-none">↗</span> Explore more
                         </a>
                     </div>
                </div>

                <Stats />
                <Clients />
                <Innovation />
                <Services />
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
      
      {!isValidationPage && !isLoginPage && !isDashboardPage && !isAdminDashboardPage && !isAdminApplicantsPage && !isAdminNotificationsPage && !isAdminFeedbackPage && <Footer />}

      {/* Idle Timeout Modal */}
      <AnimatePresence>
        {showIdleModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setShowIdleModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 overflow-hidden z-10"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center shrink-0 text-red-500">
                  <AlertCircle size={24} />
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Session Expired</h3>
                  <p className="text-gray-600 mb-6">
                    You have been automatically logged out due to 5 minutes of inactivity. Please log in again to continue.
                  </p>
                  <button 
                    onClick={() => setShowIdleModal(false)}
                    className="w-full py-2.5 bg-[#046241] text-white rounded-xl font-medium hover:bg-[#035436] transition-colors"
                  >
                    Log In Again
                  </button>
                </div>
                <button 
                  onClick={() => setShowIdleModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors absolute top-4 right-4"
                >
                  <X size={20} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
