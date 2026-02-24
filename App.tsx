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

import { CareersPage } from './components/CareersPage';
import { ContactUsPage } from './components/ContactUsPage';
import { InternalNewsPage } from './components/InternalNewsPage';
import { LoginPage } from './components/LoginPage';

import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [currentRoute, setCurrentRoute] = useState(window.location.hash);

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
  const isContactPage = currentRoute === '#contact';
  const isNewsPage = currentRoute === '#news';
  const isLoginPage = currentRoute === '#login';

  return (
    <div className="min-h-screen bg-lifewood-beige text-lifewood-darkGreen selection:bg-lifewood-primaryGreen selection:text-white font-sans">
      {!isValidationPage && !isLoginPage && <Navbar currentRoute={currentRoute} />}
      
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
                         <button className="px-6 py-3 border border-lifewood-darkGreen rounded-full font-medium text-sm hover:bg-lifewood-darkGreen hover:text-white transition-colors flex items-center gap-2">
                             <span className="text-lg leading-none">↗</span> Explore more
                         </button>
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
      
      {!isValidationPage && <Footer />}
    </div>
  );
}

export default App;
