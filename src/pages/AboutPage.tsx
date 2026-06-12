import React, { useState } from "react";
import luxuryJournalsVase from "../assets/luxury_journals_vase.webp";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export default function AboutPage() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log("Newsletter subscription:", email);
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1C1B19] font-sans relative overflow-hidden paper-texture selection:bg-[#EAD9FA] selection:text-[#1C1B19]">
      {/* Background Grids */}
      <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none"></div>

      {/* Navigation */}
      <Navbar />

      {/* ============================================================================
          HERO SECTION
          ============================================================================ */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-start pt-6">
          
          {/* Left Side Content */}
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#8E76B8] uppercase mb-4 select-none">
              ABOUT PAPIAH
            </span>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-[54px] text-[#2F3A2A] font-light leading-[1.12] tracking-tight mb-5">
              We create journals<br />
              that hold space for<br />
              your story.
            </h1>
            <p className="font-handwriting text-2xl md:text-3xl text-[#8E76B8] leading-snug mb-8 transform -rotate-[1deg] origin-left select-none">
              Thoughtfully crafted for a more intentional life.
            </p>
            <div className="border-t border-[#1C1B19]/10 w-20 mb-8"></div>
            <p className="text-[14.5px] text-gray-600 font-sans font-light leading-relaxed max-w-[460px]">
              At Papiah, we believe in the power of putting pen to paper. Our journals are designed to help you slow down, reflect, plan, and grow—one page at a time. We prioritize premium materials, elegant layouts, and minimal design to bring structure and calm to your everyday life.
            </p>
          </div>

          {/* Right Side - Luxury Generated Image */}
          <div className="relative w-full aspect-[4/3] lg:aspect-[1.2/1] max-w-[540px] mx-auto select-none rounded-[2rem] overflow-hidden border border-[#2F3A2A]/5 shadow-[0_12px_40px_rgba(46,58,42,0.06)]">
            <img 
              src={luxuryJournalsVase} 
              alt="Papiah luxury journals and stationery" 
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* ============================================================================
          OUR MISSION SECTION
          ============================================================================ */}
      <section className="w-full bg-white border-t border-b border-[#2E3A20]/5 py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12">
          {/* Main Mission split-layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
            
            {/* Circular Icon Container */}
            <div className="lg:col-span-3 flex justify-start">
              <div className="w-24 h-24 rounded-full bg-[#EAD9FA]/35 flex items-center justify-center text-[#8E76B8] shadow-2xs">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                </svg>
              </div>
            </div>

            {/* Title and Body */}
            <div className="lg:col-span-9 text-left">
              <h2 className="font-serif text-3xl text-[#2F3A2A] mb-4 tracking-tight">Our Mission</h2>
              <p className="text-[17px] text-[#2F3A2A]/80 font-sans font-light leading-relaxed max-w-2xl">
                To inspire mindful living through beautifully crafted journals that empower individuals to reflect, plan, and grow with intention.
              </p>
            </div>
          </div>

          {/* Three supporting pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 border-t border-[#1C1B19]/5 pt-12">
            {/* Pillar 1 */}
            <div className="flex items-start gap-4 text-left">
              <div className="w-10 h-10 rounded-full bg-[#FAF9F6] border border-[#2F3A2A]/5 flex items-center justify-center text-[#2F3A2A] shrink-0">
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="font-serif text-[15.5px] text-[#1C1B19] font-medium leading-tight">Encourage self-reflection</h4>
                <p className="text-[12px] text-gray-500 font-sans font-light leading-relaxed">
                  Deepen self-awareness and check in with yourself daily using thoughtfully structured prompt blocks.
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="flex items-start gap-4 text-left">
              <div className="w-10 h-10 rounded-full bg-[#FAF9F6] border border-[#2F3A2A]/5 flex items-center justify-center text-[#2F3A2A] shrink-0">
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="font-serif text-[15.5px] text-[#1C1B19] font-medium leading-tight">Support mindful productivity</h4>
                <p className="text-[12px] text-gray-500 font-sans font-light leading-relaxed">
                  Formulate clean, manageable habits and align your daily plans with key priorities.
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="flex items-start gap-4 text-left">
              <div className="w-10 h-10 rounded-full bg-[#FAF9F6] border border-[#2F3A2A]/5 flex items-center justify-center text-[#2F3A2A] shrink-0">
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="font-serif text-[15.5px] text-[#1C1B19] font-medium leading-tight">Promote personal growth</h4>
                <p className="text-[12px] text-gray-500 font-sans font-light leading-relaxed">
                  Nurture steady long-term development through weekly reviews and targeted goals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================================
          IMPACT SECTION
          ============================================================================ */}
      <section className="w-full py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-14">
            
            {/* Globe Circle icon */}
            <div className="lg:col-span-3 flex justify-start">
              <div className="w-24 h-24 rounded-full bg-[#E8E7E3] flex items-center justify-center text-[#2F3A2A] shadow-2xs">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
            </div>

            {/* Impact Text */}
            <div className="lg:col-span-9 text-left">
              <h2 className="font-serif text-3xl text-[#2F3A2A] mb-4 tracking-tight">Impact</h2>
              <p className="text-[17px] text-[#2F3A2A]/80 font-sans font-light leading-relaxed max-w-2xl">
                Every journal you purchase helps us give back. A portion of our proceeds supports education and mental wellness initiatives for underprivileged communities.
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 pt-6">
            
            {/* Stat Card 1 */}
            <div className="bg-white rounded-2xl p-8 border border-[#1C1B19]/5 shadow-xs text-center flex flex-col justify-center gap-2">
              <span className="font-serif text-4xl md:text-5xl text-[#2F3A2A] font-light">25,000+</span>
              <span className="text-[11px] font-bold tracking-widest text-[#2F3A2A]/55 uppercase">Journals Donated</span>
            </div>

            {/* Stat Card 2 */}
            <div className="bg-white rounded-2xl p-8 border border-[#1C1B19]/5 shadow-xs text-center flex flex-col justify-center gap-2">
              <span className="font-serif text-4xl md:text-5xl text-[#2F3A2A] font-light">50+</span>
              <span className="text-[11px] font-bold tracking-widest text-[#2F3A2A]/55 uppercase">Communities Impacted</span>
            </div>

            {/* Stat Card 3 */}
            <div className="bg-white rounded-2xl p-8 border border-[#1C1B19]/5 shadow-xs text-center flex flex-col justify-center gap-2">
              <span className="font-serif text-4xl md:text-5xl text-[#2F3A2A] font-light">10%</span>
              <span className="text-[11px] font-bold tracking-widest text-[#2F3A2A]/55 uppercase">Of Profits Contributed</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================================
          CAREERS SECTION
          ============================================================================ */}
      <section className="w-full bg-white border-t border-[#2E3A20]/5 py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column - Careers Intro */}
            <div className="lg:col-span-7 text-left">
              <div className="w-20 h-20 rounded-full bg-[#EBE7DF] flex items-center justify-center text-[#2F3A2A] mb-8 shadow-2xs">
                <svg className="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>

              <h2 className="font-serif text-3xl text-[#2F3A2A] mb-4 tracking-tight">Careers</h2>
              <p className="text-[15.5px] text-gray-500 font-sans font-light leading-relaxed mb-8 max-w-xl">
                We're a growing team of dreamers, doers, and creatives who believe in making a difference through thoughtful design and meaningful products.
              </p>

              {/* View Positions Button - EXACT REGISTER CTA STYLE (Limegreen #CBD83B / text #2E3327) */}
              <button 
                onClick={() => window.history.pushState(null, '', '/careers')}
                className="bg-[#CBD83B] hover:bg-[#b8c634] active:scale-[0.99] text-[#2E3327] font-sans font-bold tracking-[0.2em] text-[11.5px] py-4.5 px-8 rounded-xl shadow-[0_4px_14px_rgba(203,216,59,0.25)] hover:shadow-[0_6px_22px_rgba(203,216,59,0.4)] transition-all duration-300 uppercase cursor-pointer flex items-center justify-center gap-2 select-none"
              >
                VIEW OPEN POSITIONS
              </button>
            </div>

            {/* Right Column - Secondary Card */}
            <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
              <div className="w-full max-w-[420px] bg-[#FAF9F6] rounded-[2rem] p-8 border border-[#2F3A2A]/5 shadow-[0_8px_32px_rgba(0,0,0,0.02)] text-left flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-full bg-[#EAD9FA]/40 flex items-center justify-center text-[#8E76B8] mb-6">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-[18px] text-[#2F3A2A] mb-3">Join our mission</h3>
                  <p className="text-[12.5px] text-gray-500 font-sans font-light leading-relaxed mb-6">
                    Build a career with purpose. Help us inspire millions to live more intentionally, reflect daily, and build mindful habits.
                  </p>
                </div>
                <a 
                  href="/careers" 
                  className="text-xs font-bold text-[#8E76B8] hover:text-[#7D62A5] tracking-widest uppercase transition-colors flex items-center gap-1.5"
                >
                  Learn more
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================================
          WHY PAPIAH SECTION
          ============================================================================ */}
      <section className="w-full py-20 relative z-10 select-none">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-[#2F3A2A] mb-12 tracking-tight">Why PAPIAH?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            
            {/* Card 1 */}
            <div className="bg-white rounded-[1.5rem] p-6 border border-[#1C1B19]/5 shadow-2xs hover:shadow-xs transition-shadow duration-300 flex flex-col justify-start items-center text-center gap-4 group">
              <div className="w-10 h-10 rounded-full bg-[#EAD9FA]/25 flex items-center justify-center text-[#8E76B8] group-hover:scale-105 transition-transform shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="font-serif text-[14.5px] font-medium text-[#1C1B19] leading-tight">Thoughtful Design</h4>
                <p className="text-[11px] text-gray-500 font-sans font-light leading-relaxed">
                  Minimal, aesthetic, and made to inspire.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-[1.5rem] p-6 border border-[#1C1B19]/5 shadow-2xs hover:shadow-xs transition-shadow duration-300 flex flex-col justify-start items-center text-center gap-4 group">
              <div className="w-10 h-10 rounded-full bg-[#EAD9FA]/25 flex items-center justify-center text-[#8E76B8] group-hover:scale-105 transition-transform shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="font-serif text-[14.5px] font-medium text-[#1C1B19] leading-tight">Premium Quality</h4>
                <p className="text-[11px] text-gray-500 font-sans font-light leading-relaxed">
                  Crafted with high-quality materials.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-[1.5rem] p-6 border border-[#1C1B19]/5 shadow-2xs hover:shadow-xs transition-shadow duration-300 flex flex-col justify-start items-center text-center gap-4 group">
              <div className="w-10 h-10 rounded-full bg-[#EAD9FA]/25 flex items-center justify-center text-[#8E76B8] group-hover:scale-105 transition-transform shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="font-serif text-[14.5px] font-medium text-[#1C1B19] leading-tight">Made for You</h4>
                <p className="text-[11px] text-gray-500 font-sans font-light leading-relaxed">
                  Journals for every season of your life.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-[1.5rem] p-6 border border-[#1C1B19]/5 shadow-2xs hover:shadow-xs transition-shadow duration-300 flex flex-col justify-start items-center text-center gap-4 group">
              <div className="w-10 h-10 rounded-full bg-[#EAD9FA]/25 flex items-center justify-center text-[#8E76B8] group-hover:scale-105 transition-transform shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5a2 2 0 10-2 2h2zm0 0h4m-4 0H8m12 3a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="font-serif text-[14.5px] font-medium text-[#1C1B19] leading-tight">Perfect Gifting</h4>
                <p className="text-[11px] text-gray-500 font-sans font-light leading-relaxed">
                  Meaningful gifts for every occasion.
                </p>
              </div>
            </div>

            {/* Card 5 */}
            <div className="bg-white rounded-[1.5rem] p-6 border border-[#1C1B19]/5 shadow-2xs hover:shadow-xs transition-shadow duration-300 flex flex-col justify-start items-center text-center gap-4 group">
              <div className="w-10 h-10 rounded-full bg-[#EAD9FA]/25 flex items-center justify-center text-[#8E76B8] group-hover:scale-105 transition-transform shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="font-serif text-[14.5px] font-medium text-[#1C1B19] leading-tight">Secure Shopping</h4>
                <p className="text-[11px] text-gray-500 font-sans font-light leading-relaxed">
                  Safe payments and hassle-free experience.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================================
          NEWSLETTER CTA SECTION
          ============================================================================ */}
      <section className="w-full relative z-10 px-6 md:px-10 lg:px-12 py-16 md:py-20 bg-gradient-to-r from-[#2F3A2A] to-[#1C2518] rounded-none md:rounded-[2rem] max-w-7xl mx-auto mb-16 shadow-[0_16px_40px_rgba(47,58,42,0.12)]">
        <div className="w-full max-w-2xl mx-auto text-center flex flex-col items-center">
          <h2 className="font-serif text-3xl md:text-4xl text-[#FAF9F6] mb-3 tracking-tight">Be the first to know</h2>
          <p className="text-[14px] text-[#FAF9F6]/80 font-sans font-light leading-relaxed mb-8 max-w-md">
            Get early access to new collections, exclusive offers, and mindful inspiration.
          </p>

          {subscribed ? (
            <div className="bg-white/10 border border-white/20 px-6 py-4 rounded-xl text-[#FAF9F6] text-xs font-semibold tracking-wider uppercase animate-fade-in">
              Thank you for subscribing!
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="w-full flex flex-col sm:flex-row gap-3 items-stretch">
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow px-5 py-4.5 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/40 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-white/40 focus:border-white/40 focus:bg-white/15 transition-all"
              />
              
              {/* Subscribe button - EXACT REGISTER CTA STYLE (Limegreen #CBD83B / text #2E3327) */}
              <button
                type="submit"
                className="bg-[#CBD83B] hover:bg-[#b8c634] active:scale-[0.99] text-[#2E3327] font-sans font-bold tracking-[0.2em] text-[11px] md:text-[12px] py-4.5 px-8 rounded-xl shadow-[0_4px_14px_rgba(203,216,59,0.25)] hover:shadow-[0_6px_22px_rgba(203,216,59,0.4)] transition-all duration-300 uppercase cursor-pointer"
              >
                SUBSCRIBE
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
