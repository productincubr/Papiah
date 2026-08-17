import React, { useState, useEffect } from 'react';
import { useCursor } from '../context/CursorContext';
import logo from '../assets/logo.svg';
import { LOCATION_CHANGE_EVENT } from '../utils/navigation';

export const Footer: React.FC = () => {
  const { setCursorType } = useCursor();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Track pathname state to react to client-side navigation
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setPathname(window.location.pathname);
    };

    window.addEventListener(LOCATION_CHANGE_EVENT, handleLocationChange);

    return () => {
      window.removeEventListener(LOCATION_CHANGE_EVENT, handleLocationChange);
    };
  }, []);

  const isHomePage = pathname === '/' || pathname === '' || pathname.toLowerCase() === '/home';

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    window.history.pushState(null, '', href);
  };

  return (
    <footer 
      className="w-full bg-[#FAF9F6] relative z-10 border-t border-papiah-grid/40 select-none flex flex-col items-center"
      onMouseEnter={() => setCursorType('footer')}
      onMouseLeave={() => setCursorType('default')}
    >
      <div className="max-w-7xl mx-auto pt-16 pb-16 px-4 md:px-10 relative w-full flex flex-col items-center text-center">
        
        {isHomePage ? (
          /* ==========================================
             HOME PAGE FOOTER (With "Letters Worth Opening")
             ========================================== */
          <>
            {/* Envelope & Sparkle Container */}
            <div className="relative mb-6">
              {/* Envelope Icon */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-12 h-12 text-papiah-dark">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 6l-10 7L2 6" />
              </svg>
              {/* 4-point Sparkle Icon (top right) */}
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-papiah-dark absolute -top-1.5 -right-2 animate-pulse-slow">
                <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
              </svg>
            </div>

            {/* Headline */}
            <h2 className="font-serif text-3xl md:text-4xl lg:text-[42px] text-papiah-dark font-light tracking-wide mb-4">
              Letters Worth Opening
            </h2>

            {/* Description */}
            <p className="text-sm md:text-base text-gray-500 font-sans font-light leading-relaxed max-w-lg mb-10">
              Slow living ideas, mindful routines, journaling prompts,<br className="hidden sm:inline" />
              recipes and thoughtful launches — sent occasionally.
            </p>

            {/* Input Form */}
            <form onSubmit={handleSubscribe} className="w-full max-w-md flex flex-col sm:flex-row gap-3 items-stretch justify-center mb-16">
              {subscribed ? (
                <div className="w-full bg-[#CBD83B]/20 text-[#2E3327] text-xs font-bold tracking-widest py-4 rounded-none uppercase flex items-center justify-center animate-fade-in">
                  ✓ Thank you for subscribing!
                </div>
              ) : (
                <>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address" 
                    required
                    className="flex-grow px-5 py-3.5 border border-gray-300 !rounded-none bg-transparent text-sm text-papiah-dark placeholder-gray-400 focus:outline-none focus:border-gray-500 italic font-sans"
                  />
                  <button 
                    type="submit" 
                    className="bg-[#CBD83B] hover:bg-[#b8c634] active:scale-98 text-[#2E3327] font-sans font-bold tracking-[0.2em] text-[11px] md:text-[12px] py-3.5 px-7 !rounded-none transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md flex items-center justify-center whitespace-nowrap uppercase"
                  >
                    Join The Ritual
                  </button>
                </>
              )}
            </form>

            {/* Star Divider */}
            <div className="flex items-center gap-4 w-full max-w-[280px] justify-center mb-10">
              <div className="h-[1px] bg-gray-300 flex-grow"></div>
              {/* 4-point star/diamond */}
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-gray-400">
                <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
              </svg>
              <div className="h-[1px] bg-gray-300 flex-grow"></div>
            </div>

            {/* Centered Papiah Logo and Branding */}
            <div className="mb-10 flex flex-col items-center">
              <a href="/" onClick={(e) => handleLinkClick(e, '/')} className="cursor-pointer hover:opacity-90 transition-opacity">
                <img src={logo} alt="Papiah Logo" className="h-10 md:h-12 w-auto object-contain opacity-80" />
              </a>
              <p className="text-[9px] text-gray-400 font-light tracking-[0.2em] uppercase font-sans mt-2">
                intentional living & stationery
              </p>
            </div>
          </>
        ) : (
          /* ==========================================
             OTHER PAGES FOOTER (Logo-centric, No Newsletter)
             ========================================== */
          <>
            {/* Centered Papiah Logo and Branding */}
            <div className="mb-10 flex flex-col items-center">
              <a href="/" onClick={(e) => handleLinkClick(e, '/')} className="cursor-pointer hover:opacity-95 transition-opacity">
                <img src={logo} alt="Papiah Logo" className="h-12 md:h-14 w-auto object-contain" />
              </a>
              <p className="text-[9.5px] text-[#2F3A2A]/40 font-light tracking-[0.25em] uppercase font-sans mt-3 select-none">
                intentional living & stationery
              </p>
            </div>

            {/* structured Footer links */}
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-10 text-[10.5px] font-bold tracking-[0.2em] text-[#2F3A2A]/70 uppercase font-sans">
              <a href="/collection" onClick={(e) => handleLinkClick(e, '/collection')} className="hover:text-papiah-dark transition-colors duration-150">Shop</a>
              <a href="/about" onClick={(e) => handleLinkClick(e, '/about')} className="hover:text-papiah-dark transition-colors duration-150">Our Story</a>
              <a href="/careers" onClick={(e) => handleLinkClick(e, '/careers')} className="hover:text-papiah-dark transition-colors duration-150">Careers</a>
              <a href="/contact" onClick={(e) => handleLinkClick(e, '/contact')} className="hover:text-papiah-dark transition-colors duration-150">Contact Us</a>
              <a href="/privacy" onClick={(e) => handleLinkClick(e, '/privacy')} className="hover:text-papiah-dark transition-colors duration-150">Privacy Policy</a>
            </div>

            {/* Star Divider */}
            <div className="flex items-center gap-4 w-full max-w-[280px] justify-center mb-8">
              <div className="h-[1px] bg-gray-300 flex-grow"></div>
              {/* 4-point star/diamond */}
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-gray-400">
                <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
              </svg>
              <div className="h-[1px] bg-gray-300 flex-grow"></div>
            </div>
          </>
        )}

        {/* Legal Links (Always at the bottom) */}
        <div className="text-[11px] md:text-xs text-gray-400 font-sans font-light flex flex-wrap items-center gap-x-4 gap-y-2 justify-center mb-5">
          <a href="/careers" onClick={(e) => handleLinkClick(e, '/careers')} className="hover:text-papiah-dark transition-colors">Careers</a>
          <span>&bull;</span>
          <a href="/privacy" onClick={(e) => handleLinkClick(e, '/privacy')} className="hover:text-papiah-dark transition-colors">Privacy Policy</a>
          <span>&bull;</span>
          <a href="#terms" className="hover:text-papiah-dark transition-colors">Terms of Service</a>
          <span>&bull;</span>
          <a href="#cookies" className="hover:text-papiah-dark transition-colors">Cookie Settings</a>
        </div>

        {/* Copyright / Subtext */}
        <div className="text-[11px] md:text-xs text-gray-400 font-sans font-light flex items-center gap-1.5 justify-center select-none">
          <span>Designed with intention in India</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5 text-gray-400">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>

      </div>
    </footer>
  );
};
