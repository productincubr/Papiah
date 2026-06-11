import React, { useState } from 'react';
import logo from '../assets/logo.svg';
import { useCursor } from '../context/CursorContext';

export const NotFoundPage: React.FC = () => {
  const { setCursorType } = useCursor();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchVal.trim();
    if (query) {
      window.history.pushState(null, '', `/collection?search=${encodeURIComponent(query)}`);
    } else {
      window.history.pushState(null, '', `/collection`);
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const handleNavigation = (href: string) => {
    window.history.pushState(null, '', href);
  };

  return (
    <div className="flex flex-col min-h-screen relative paper-texture bg-[#F8F6F1] text-[#2F3A2A] font-sans selection:bg-[#B89CE8]/20 select-none">
      
      {/* 1. TOP ANNOUNCEMENT BAR (Lime Green CTA Style) */}
      <div className="w-full bg-[#CBD83B] py-2.5 px-4 text-center z-50 relative select-none">
        <p className="text-[#2E3327] font-sans font-semibold tracking-[0.2em] text-[10px] md:text-[11px] uppercase leading-none">
          FREE SHIPPING ON ORDERS OVER ₹775
        </p>
      </div>

      {/* 2. NAVBAR (Minimal Luxury Styling) */}
      <header className="w-full bg-transparent border-b border-[#2F3A2A]/10 relative z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-10 py-5 flex items-center justify-between">
          {/* Logo on Left */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation('/');
            }}
            className="flex items-center cursor-pointer hover:opacity-90 transition-opacity"
          >
            <img src={logo} alt="Papiah Logo" className="h-12 md:h-14 w-auto object-contain" />
          </a>

          {/* Navigation Links - Center */}
          <nav className="hidden lg:flex items-center gap-8">
            <a
              href="/collection"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('/collection');
              }}
              className="text-[11px] font-bold tracking-[0.2em] text-[#2F3A2A]/70 hover:text-[#2F3A2A] transition-colors duration-200 relative group"
            >
              COLLECTION
              <span className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-[#B89CE8] transition-all duration-200 group-hover:w-full"></span>
            </a>
            <a
              href="/privacy"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('/privacy');
              }}
              className="text-[11px] font-bold tracking-[0.2em] text-[#2F3A2A]/70 hover:text-[#2F3A2A] transition-colors duration-200 relative group"
            >
              PRIVACY
              <span className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-[#B89CE8] transition-all duration-200 group-hover:w-full"></span>
            </a>
            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('/contact');
              }}
              className="text-[11px] font-bold tracking-[0.2em] text-[#2F3A2A]/70 hover:text-[#2F3A2A] transition-colors duration-200 relative group"
            >
              CONTACT US
              <span className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-[#B89CE8] transition-all duration-200 group-hover:w-full"></span>
            </a>
            <a
              href="/about"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('/about');
              }}
              className="text-[11px] font-bold tracking-[0.2em] text-[#2F3A2A]/70 hover:text-[#2F3A2A] transition-colors duration-200 relative group"
            >
              ABOUT US
              <span className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-[#B89CE8] transition-all duration-200 group-hover:w-full"></span>
            </a>
            <a
              href="/profile"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('/profile');
              }}
              className="text-[11px] font-bold tracking-[0.2em] text-[#2F3A2A]/70 hover:text-[#2F3A2A] transition-colors duration-200 relative group"
            >
              PROFILE
              <span className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-[#B89CE8] transition-all duration-200 group-hover:w-full"></span>
            </a>
            <a
              href="/careers"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('/careers');
              }}
              className="text-[11px] font-bold tracking-[0.2em] text-[#2F3A2A]/70 hover:text-[#2F3A2A] transition-colors duration-200 relative group"
            >
              CAREERS
              <span className="absolute bottom-[-4px] left-0 w-0 h-[1px] bg-[#B89CE8] transition-all duration-200 group-hover:w-full"></span>
            </a>
          </nav>

          {/* Icons - Right */}
          <div className="flex items-center gap-5 md:gap-6 text-[#2F3A2A]">
            {/* Search Input / Button */}
            <form onSubmit={handleSearchSubmit} className="hidden sm:flex items-center gap-2 border border-[#2F3A2A]/10 bg-white/40 px-3 py-1 rounded-full transition-all duration-300 w-44">
              <input
                type="text"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="Search..."
                className="bg-transparent border-none outline-none text-[10px] text-[#2F3A2A] placeholder-[#2F3A2A]/40 w-full font-sans"
              />
              <button type="submit" className="hover:text-papiah-dark shrink-0 cursor-pointer p-0.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </button>
            </form>

            {/* Mobile/Default Search Icon */}
            <button
              onClick={() => handleNavigation('/collection')}
              className="sm:hidden hover:scale-105 transition-all duration-150 p-1.5 cursor-pointer"
              aria-label="Search"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>

            {/* Account Icon */}
            <button
              onClick={() => handleNavigation('/profile')}
              className="hover:scale-105 transition-all duration-150 p-1.5 cursor-pointer"
              aria-label="Account"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>

            {/* Cart Icon */}
            <button
              onClick={() => handleNavigation('/cart')}
              className="hover:scale-105 transition-all duration-150 p-1.5 cursor-pointer"
              aria-label="Shopping Cart"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION (Two Column Layout) */}
      <main className="flex-grow max-w-7xl mx-auto px-4 md:px-10 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
        {/* Left Side */}
        <div className="flex flex-col items-start text-left z-10">
          <div className="font-serif text-[120px] md:text-[160px] font-extralight text-[#2F3A2A]/90 leading-none tracking-tight select-none">
            404
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-[#2F3A2A] font-light tracking-tight mb-4 mt-2">
            Page Not Found
          </h1>
          <p className="text-[#2F3A2A]/70 text-sm md:text-base font-sans font-light leading-relaxed max-w-md mb-8">
            The page you're looking for may have been moved, renamed, or no longer exists.
          </p>

          {/* Small lavender divider line */}
          <div className="w-20 h-[2px] bg-[#B89CE8] mb-8 rounded-full"></div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            {/* Primary CTA (Lime Green #CBD83B / Text #2E3327) */}
            <button
              onClick={() => handleNavigation('/')}
              className="bg-[#CBD83B] hover:bg-[#b8c634] active:scale-[0.99] text-[#2E3327] font-sans font-bold tracking-[0.2em] text-[11px] md:text-[12px] py-4.5 px-8 rounded-xl shadow-[0_4px_14px_rgba(203,216,59,0.25)] hover:shadow-[0_6px_22px_rgba(203,216,59,0.4)] transition-all duration-300 uppercase cursor-pointer flex items-center justify-center gap-2 select-none"
            >
              GO TO HOMEPAGE
            </button>

            {/* Secondary CTA (Outlined Button) */}
            <button
              onClick={() => handleNavigation('/collection')}
              className="border border-[#2F3A2A] hover:bg-[#2F3A2A] hover:text-[#F8F6F1] active:scale-[0.99] text-[#2F3A2A] font-sans font-bold tracking-[0.2em] text-[11px] md:text-[12px] py-4.5 px-8 rounded-xl transition-all duration-300 uppercase cursor-pointer flex items-center justify-center gap-2 select-none"
            >
              BROWSE COLLECTIONS
            </button>
          </div>

          {/* Go Back Link */}
          <button
            onClick={() => {
              if (window.history.length > 1) {
                window.history.back();
              } else {
                handleNavigation('/');
              }
            }}
            className="mt-6 text-[#2F3A2A]/60 hover:text-[#2F3A2A] transition-colors font-sans text-xs uppercase tracking-widest cursor-pointer font-bold flex items-center gap-1.5"
          >
            &larr; Go Back
          </button>
        </div>

        {/* Right Side (Abstract Vector Graphics) */}
        <div className="flex justify-center items-center w-full relative h-[420px] md:h-[520px]">
          {/* Subtle Olive-Green/Lime Orb Background */}
          <div className="absolute bg-gradient-to-tr from-[#2F3A2A]/10 to-[#CBD83B]/20 blur-3xl rounded-full w-72 h-72 md:w-96 md:h-96 animate-pulse-slow"></div>

          {/* Large Soft Ivory Circular Frame */}
          <div className="w-[380px] h-[380px] md:w-[480px] md:h-[480px] rounded-full border border-[#2F3A2A]/5 bg-white/20 backdrop-blur-md shadow-[0_20px_60px_rgba(46,58,42,0.03)] flex items-center justify-center overflow-hidden animate-breathe relative">
            
            {/* Compass Card - Floating Top Left */}
            <div className="absolute top-[16%] left-[10%] w-[145px] h-[90px] bg-[#F8F6F1]/85 backdrop-blur-lg border border-[#2F3A2A]/10 rounded-2xl shadow-md p-3 select-none flex flex-col justify-between animate-float-paper-1 hover:scale-[1.03] transition-transform duration-500">
              <div className="flex justify-between items-start">
                <div className="text-[8.5px] font-bold tracking-widest text-[#2F3A2A]/40 uppercase font-sans">COMPASS</div>
                <div className="p-1 rounded-full bg-[#B89CE8]/10 text-[#B89CE8]">
                  {/* Compass SVG */}
                  <svg className="w-3 h-3 animate-spin" style={{ animationDuration: '20s' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88" fill="currentColor" fillOpacity="0.2" />
                  </svg>
                </div>
              </div>
              <div>
                <div className="text-[12px] font-medium font-serif text-[#2F3A2A] tracking-tight">Direction</div>
                <div className="text-[8.5px] font-sans text-gray-500 font-light mt-0.5 tracking-wider">LAT 28.61° N</div>
              </div>
            </div>

            {/* Map Pin Card - Floating Bottom Right */}
            <div className="absolute bottom-[16%] right-[10%] w-[155px] h-[95px] bg-[#F8F6F1]/85 backdrop-blur-lg border border-[#2F3A2A]/10 rounded-2xl shadow-md p-3 select-none flex flex-col justify-between animate-float-paper-2 hover:scale-[1.03] transition-transform duration-500">
              <div className="flex justify-between items-start">
                <div className="text-[8.5px] font-bold tracking-widest text-[#2F3A2A]/40 uppercase font-sans">LOCATION</div>
                <div className="p-1 rounded-full bg-[#CBD83B]/20 text-[#2F3A2A]">
                  {/* Map Pin SVG */}
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
              </div>
              <div>
                <div className="text-[12px] font-medium font-serif text-[#2F3A2A] tracking-tight">Lost & Found</div>
                <div className="text-[8.5px] font-sans text-gray-500 font-light mt-0.5 tracking-wider">LNG 77.20° E</div>
              </div>
            </div>

            {/* Small Floating Panel: Searching State - Center/Right */}
            <div className="absolute top-[45%] right-[10%] bg-white/90 backdrop-blur-md border border-[#2F3A2A]/10 rounded-xl px-3 py-2 rotate-[-2deg] shadow-xs flex items-center gap-2.5 animate-float-paper-3 hover:scale-105 transition-transform duration-300">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B89CE8] animate-ping"></span>
              <span className="text-[8.5px] font-bold tracking-widest text-[#2F3A2A]/70 uppercase font-sans">RE-ROUTING</span>
            </div>

            {/* Large central SVG containing the minimal elegant curved lines, direction arrow & search icon */}
            <svg className="w-4/5 h-4/5 text-[#2F3A2A]/10 absolute inset-0 m-auto select-none pointer-events-none" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Concentric subtle circles */}
              <circle cx="150" cy="150" r="120" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" />
              <circle cx="150" cy="150" r="80" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="150" cy="150" r="40" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 2" />

              {/* Curved path representing being lost */}
              <path
                d="M 60,200 C 90,80 180,240 220,100"
                stroke="#2F3A2A"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeDasharray="6 4"
                className="animate-dashed-path text-[#2F3A2A]/40"
                style={{ stroke: 'url(#path-grad)' }}
              />

              {/* Vector arrow icon placed along the path */}
              <g transform="translate(190, 150) rotate(-45)">
                <path d="M0,0 L12,4 L8,8 L4,12 Z" fill="#B89CE8" />
              </g>

              {/* Search magnifier icon overlay on vector */}
              <g transform="translate(85, 110)" stroke="#2F3A2A" strokeWidth="1" strokeOpacity="0.4" fill="none">
                <circle cx="6" cy="6" r="4" />
                <line x1="9" y1="9" x2="14" y2="14" strokeLinecap="round" />
              </g>

              {/* Compass Needle/Crosshairs in center */}
              <line x1="150" y1="20" x2="150" y2="280" stroke="currentColor" strokeWidth="0.4" />
              <line x1="20" y1="150" x2="280" y2="150" stroke="currentColor" strokeWidth="0.4" />

              {/* Gradients */}
              <defs>
                <linearGradient id="path-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2F3A2A" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#B89CE8" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#CBD83B" stopOpacity="0.2" />
                </linearGradient>
              </defs>
            </svg>

            {/* Tiny Floating Compass/Pin details */}
            <div className="absolute top-[35%] left-[42%] animate-pulse-slow">
              {/* Direction Arrow Icon */}
              <svg className="w-5 h-5 text-[#2F3A2A]/35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </div>
          </div>
        </div>
      </main>

      {/* 4. HELPFUL LINKS SECTION */}
      <section className="bg-transparent py-16 border-t border-[#2F3A2A]/5 relative z-10 w-full max-w-7xl mx-auto px-4 md:px-10">
        <h2 className="font-serif text-2xl md:text-3xl text-[#2F3A2A] font-light tracking-tight mb-10 text-center">
          Looking for something?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {/* Card 1: Shop Journals */}
          <div
            onClick={() => handleNavigation('/collection')}
            className="group bg-white/50 border border-[#2F3A2A]/10 rounded-2xl p-6 shadow-3xs hover:shadow-md hover:border-[#2F3A2A]/20 transition-all duration-300 cursor-pointer flex flex-col justify-between h-[150px] hover:translate-y-[-2px]"
          >
            <div>
              <h3 className="font-serif text-[18px] text-[#2F3A2A] font-medium tracking-tight mb-1.5">
                Shop Journals
              </h3>
              <p className="text-[11px] text-gray-500 font-light font-sans leading-relaxed">
                Discover our curated collection of luxury planners and writing sketchbooks.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#2F3A2A] tracking-wider uppercase mt-4">
              Explore
              <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Card 2: Explore Collections */}
          <div
            onClick={() => handleNavigation('/collection')}
            className="group bg-white/50 border border-[#2F3A2A]/10 rounded-2xl p-6 shadow-3xs hover:shadow-md hover:border-[#2F3A2A]/20 transition-all duration-300 cursor-pointer flex flex-col justify-between h-[150px] hover:translate-y-[-2px]"
          >
            <div>
              <h3 className="font-serif text-[18px] text-[#2F3A2A] font-medium tracking-tight mb-1.5">
                Explore Collections
              </h3>
              <p className="text-[11px] text-gray-500 font-light font-sans leading-relaxed">
                Browse through our beautifully structured lifestyle and wellness series.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#2F3A2A] tracking-wider uppercase mt-4">
              Browse
              <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Card 3: Track Your Order */}
          <div
            onClick={() => handleNavigation('/profile')}
            className="group bg-white/50 border border-[#2F3A2A]/10 rounded-2xl p-6 shadow-3xs hover:shadow-md hover:border-[#2F3A2A]/20 transition-all duration-300 cursor-pointer flex flex-col justify-between h-[150px] hover:translate-y-[-2px]"
          >
            <div>
              <h3 className="font-serif text-[18px] text-[#2F3A2A] font-medium tracking-tight mb-1.5">
                Track Your Order
              </h3>
              <p className="text-[11px] text-gray-500 font-light font-sans leading-relaxed">
                Check delivery estimates, active updates, and purchase history.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#2F3A2A] tracking-wider uppercase mt-4">
              Track
              <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Card 4: Contact Support */}
          <div
            onClick={() => handleNavigation('/about#contact')}
            className="group bg-white/50 border border-[#2F3A2A]/10 rounded-2xl p-6 shadow-3xs hover:shadow-md hover:border-[#2F3A2A]/20 transition-all duration-300 cursor-pointer flex flex-col justify-between h-[150px] hover:translate-y-[-2px]"
          >
            <div>
              <h3 className="font-serif text-[18px] text-[#2F3A2A] font-medium tracking-tight mb-1.5">
                Contact Support
              </h3>
              <p className="text-[11px] text-gray-500 font-light font-sans leading-relaxed">
                Reach out directly to our dedicated customer experience team.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#2F3A2A] tracking-wider uppercase mt-4">
              Connect
              <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* 5. NEWSLETTER SECTION */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-10 mb-20 relative z-10">
        <div className="bg-gradient-to-r from-[#2F3A2A] to-[#1F261B] text-[#F8F6F1] py-16 px-8 md:px-16 rounded-[2.5rem] relative overflow-hidden shadow-lg flex flex-col lg:flex-row items-center justify-between gap-10">
          
          {/* Subtle blurred orb decoration */}
          <div className="absolute top-[-50%] right-[-10%] bg-[#CBD83B]/10 blur-3xl w-96 h-96 rounded-full pointer-events-none"></div>
          
          {/* Left Text content */}
          <div className="max-w-xl text-left relative z-10">
            <h2 className="font-serif text-3xl md:text-4xl font-light tracking-wide mb-3">
              Be the first to know
            </h2>
            <p className="text-[#F8F6F1]/70 text-sm md:text-base font-light font-sans leading-relaxed">
              Get early access to new collections, exclusive offers, and mindful inspiration.
            </p>
          </div>

          {/* Right Email Signup Form */}
          <form onSubmit={handleSubscribe} className="w-full lg:max-w-md flex flex-col sm:flex-row gap-3 items-stretch justify-center relative z-10">
            {subscribed ? (
              <div className="text-center sm:text-left py-4 px-6 bg-white/10 border border-white/20 rounded-xl text-xs font-bold tracking-widest text-[#CBD83B] uppercase w-full animate-fade-in">
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
                  className="flex-grow px-5 py-4 border border-white/20 rounded-xl bg-white/5 text-sm text-[#F8F6F1] placeholder-white/40 focus:outline-none focus:border-white/40 italic font-sans"
                />
                <button
                  type="submit"
                  className="bg-[#CBD83B] hover:bg-[#b8c634] active:scale-[0.98] text-[#2E3327] font-sans font-bold tracking-[0.2em] text-[11px] py-4 px-8 rounded-xl transition-all duration-200 cursor-pointer shadow-[0_4px_12px_rgba(203,216,59,0.15)] flex items-center justify-center whitespace-nowrap uppercase"
                >
                  SUBSCRIBE
                </button>
              </>
            )}
          </form>
        </div>
      </section>

      {/* 6. FOOTER (5-Column Footer, Minimal Luxury Styling) */}
      <footer
        className="w-full bg-[#F8F6F1] relative z-10 border-t border-[#2F3A2A]/10 select-none"
        onMouseEnter={() => setCursorType('footer')}
        onMouseLeave={() => setCursorType('default')}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-10 pt-20 pb-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 md:gap-12 mb-16 text-left">
            
            {/* Column 1: Shop */}
            <div className="flex flex-col gap-4">
              <h4 className="font-serif text-sm font-semibold tracking-wider text-[#2F3A2A] uppercase">
                Shop
              </h4>
              <ul className="flex flex-col gap-2.5 text-xs text-[#2F3A2A]/70 font-light font-sans">
                <li><a href="/collection" onClick={(e) => { e.preventDefault(); handleNavigation('/collection'); }} className="hover:text-[#2F3A2A] transition-colors">Daily Planners</a></li>
                <li><a href="/collection" onClick={(e) => { e.preventDefault(); handleNavigation('/collection'); }} className="hover:text-[#2F3A2A] transition-colors">Notebooks & Journals</a></li>
                <li><a href="/collection" onClick={(e) => { e.preventDefault(); handleNavigation('/collection'); }} className="hover:text-[#2F3A2A] transition-colors">Sketchbooks</a></li>
                <li><a href="/collection" onClick={(e) => { e.preventDefault(); handleNavigation('/collection'); }} className="hover:text-[#2F3A2A] transition-colors">Sticky Notes</a></li>
                <li><a href="/collection" onClick={(e) => { e.preventDefault(); handleNavigation('/collection'); }} className="hover:text-[#2F3A2A] transition-colors">Writing Accessories</a></li>
              </ul>
            </div>

            {/* Column 2: Collections */}
            <div className="flex flex-col gap-4">
              <h4 className="font-serif text-sm font-semibold tracking-wider text-[#2F3A2A] uppercase">
                Collections
              </h4>
              <ul className="flex flex-col gap-2.5 text-xs text-[#2F3A2A]/70 font-light font-sans">
                <li><a href="/collection" onClick={(e) => { e.preventDefault(); handleNavigation('/collection'); }} className="hover:text-[#2F3A2A] transition-colors">The Monogram Series</a></li>
                <li><a href="/collection" onClick={(e) => { e.preventDefault(); handleNavigation('/collection'); }} className="hover:text-[#2F3A2A] transition-colors">Olive & Clay</a></li>
                <li><a href="/collection" onClick={(e) => { e.preventDefault(); handleNavigation('/collection'); }} className="hover:text-[#2F3A2A] transition-colors">Linen Texture</a></li>
                <li><a href="/collection" onClick={(e) => { e.preventDefault(); handleNavigation('/collection'); }} className="hover:text-[#2F3A2A] transition-colors">Wellness Planners</a></li>
                <li><a href="/collection" onClick={(e) => { e.preventDefault(); handleNavigation('/collection'); }} className="hover:text-[#2F3A2A] transition-colors">Gift Sets</a></li>
              </ul>
            </div>

            {/* Column 3: Help */}
            <div className="flex flex-col gap-4">
              <h4 className="font-serif text-sm font-semibold tracking-wider text-[#2F3A2A] uppercase">
                Help
              </h4>
              <ul className="flex flex-col gap-2.5 text-xs text-[#2F3A2A]/70 font-light font-sans">
                <li><a href="/profile" onClick={(e) => { e.preventDefault(); handleNavigation('/profile'); }} className="hover:text-[#2F3A2A] transition-colors">Track Order</a></li>
                <li><a href="/privacy" onClick={(e) => { e.preventDefault(); handleNavigation('/privacy'); }} className="hover:text-[#2F3A2A] transition-colors">Shipping & Returns</a></li>
                <li><a href="/privacy" onClick={(e) => { e.preventDefault(); handleNavigation('/privacy'); }} className="hover:text-[#2F3A2A] transition-colors">FAQs</a></li>
                <li><a href="/about#contact" onClick={(e) => { e.preventDefault(); handleNavigation('/about#contact'); }} className="hover:text-[#2F3A2A] transition-colors">Contact Support</a></li>
                <li><a href="/privacy" onClick={(e) => { e.preventDefault(); handleNavigation('/privacy'); }} className="hover:text-[#2F3A2A] transition-colors">Terms & Privacy</a></li>
              </ul>
            </div>

            {/* Column 4: About PAPIAH */}
            <div className="flex flex-col gap-4">
              <h4 className="font-serif text-sm font-semibold tracking-wider text-[#2F3A2A] uppercase">
                About PAPIAH
              </h4>
              <ul className="flex flex-col gap-2.5 text-xs text-[#2F3A2A]/70 font-light font-sans">
                <li><a href="/about" onClick={(e) => { e.preventDefault(); handleNavigation('/about'); }} className="hover:text-[#2F3A2A] transition-colors">Our Story</a></li>
                <li><a href="/about" onClick={(e) => { e.preventDefault(); handleNavigation('/about'); }} className="hover:text-[#2F3A2A] transition-colors">Sustainability</a></li>
                <li><a href="/about" onClick={(e) => { e.preventDefault(); handleNavigation('/about'); }} className="hover:text-[#2F3A2A] transition-colors">Artisanal Paper</a></li>
                <li><a href="/careers" onClick={(e) => { e.preventDefault(); handleNavigation('/careers'); }} className="hover:text-[#2F3A2A] transition-colors">Careers</a></li>
                <li><a href="/about" onClick={(e) => { e.preventDefault(); handleNavigation('/about'); }} className="hover:text-[#2F3A2A] transition-colors">Press</a></li>
              </ul>
            </div>

            {/* Column 5: Follow Us */}
            <div className="flex flex-col gap-4">
              <h4 className="font-serif text-sm font-semibold tracking-wider text-[#2F3A2A] uppercase">
                Follow Us
              </h4>
              <ul className="flex flex-col gap-2.5 text-xs text-[#2F3A2A]/70 font-light font-sans">
                <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#2F3A2A] transition-colors">Instagram</a></li>
                <li><a href="https://pinterest.com" target="_blank" rel="noreferrer" className="hover:text-[#2F3A2A] transition-colors">Pinterest</a></li>
                <li><a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-[#2F3A2A] transition-colors">Facebook</a></li>
                <li><a href="https://spotify.com" target="_blank" rel="noreferrer" className="hover:text-[#2F3A2A] transition-colors">Spotify</a></li>
                <li><a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-[#2F3A2A] transition-colors">YouTube</a></li>
              </ul>
            </div>

          </div>

          {/* Decorative Star Divider */}
          <div className="flex items-center gap-4 w-full justify-center mb-8">
            <div className="h-[1px] bg-[#2F3A2A]/10 flex-grow"></div>
            {/* 4-point star/diamond */}
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-[#2F3A2A]/40">
              <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" />
            </svg>
            <div className="h-[1px] bg-[#2F3A2A]/10 flex-grow"></div>
          </div>

          {/* Legal / Copyright Bottom */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#2F3A2A]/50 font-sans font-light w-full">
            <div>
              &copy; {new Date().getFullYear()} PAPIAH. All rights reserved.
            </div>
            <div className="flex items-center gap-1.5">
              <span>Designed with intention in India</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5 text-[#2F3A2A]/40">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};
