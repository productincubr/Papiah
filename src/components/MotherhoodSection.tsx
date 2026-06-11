import React, { useState, useEffect, useRef } from 'react';
import { useCursor } from '../context/CursorContext';
import s9_1 from '../assets/s9_1.jpg';
import s9_2 from '../assets/s9_2.jpg';

export const MotherhoodSection: React.FC = () => {
  const { setCursorType } = useCursor();
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="motherhood-section"
      ref={sectionRef}
      className="w-full bg-gradient-to-r from-[#FFFDF6] to-[#FCF9E3] relative z-10 select-none border-b border-papiah-grid/40 py-20 overflow-hidden"
      onMouseEnter={() => setCursorType('bridegroom')}
      onMouseLeave={() => setCursorType('default')}
    >
      {/* Background soft grid pattern */}
      <div className="absolute inset-0 bg-grid opacity-[0.07] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-10 relative z-10">
        
        {/* PART 1: HEADER BANNER GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          
          {/* Left Side: Copy */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <span className="text-[10px] md:text-xs font-sans font-bold tracking-[0.25em] text-[#C3896B] block uppercase mb-4">
              DESIGN A LIFE WITH PURPOSE
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-papiah-dark font-light tracking-tight mb-6 leading-tight">
              Motherhood Journals
            </h2>
            <div className="w-12 h-[1.5px] bg-[#C5B09E] mb-8"></div>
            <p className="text-sm md:text-base text-gray-500 font-sans font-light leading-relaxed mb-10 max-w-lg">
              From daily rituals to meaningful milestones, our journals help you stay connected to what matters most—creating a life filled with intention, balance, and lasting memories.
            </p>
            
            {/* Pill-shaped Button */}
            <button className="bg-[#CBD83B] hover:bg-[#b8c634] active:scale-98 text-[#2E3327] font-sans font-bold tracking-[0.2em] text-[11px] md:text-[12px] px-8 py-4 rounded-full shadow-xs hover:shadow-md transition-all duration-200 uppercase cursor-pointer flex items-center gap-2 max-w-max">
              Explore Collection
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>

          {/* Right Side: Image Banner */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[380px] rounded-[32px] overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.05)] border border-white/60 bg-white p-2">
              <div className="rounded-[24px] overflow-hidden aspect-[3/4]">
                <img 
                  src={s9_1} 
                  alt="Motherhood Journals Illustration" 
                  className="w-full h-full object-cover transition-transform duration-700"
                />
              </div>
            </div>
          </div>

        </div>

        {/* TIMELINE SECTION */}
        <div className="w-full max-w-4xl mx-auto mt-12 mb-10 px-6 sm:px-12 select-none relative">
          {/* Timeline Track Line */}
          <div className="absolute top-[18px] left-[48px] right-[48px] h-[1.5px] pointer-events-none z-0">
            {/* Segment 1: Solid active line */}
            <div 
              className="absolute left-0 top-0 h-full bg-[#C3896B] transition-all duration-1000 ease-out"
              style={{ 
                width: isInView ? '25%' : '0%',
              }}
            />
            {/* Segment 2: Dashed line */}
            <div 
              className="absolute left-[25%] top-0 h-full border-b border-dashed border-[#C5B09E]/70 transition-all duration-700 ease-out"
              style={{ 
                width: isInView ? '25%' : '0%',
                transitionDelay: '1000ms'
              }}
            />
            {/* Segment 3: Dashed line */}
            <div 
              className="absolute left-[50%] top-0 h-full border-b border-dashed border-[#C5B09E]/70 transition-all duration-700 ease-out"
              style={{ 
                width: isInView ? '25%' : '0%',
                transitionDelay: '1700ms'
              }}
            />
            {/* Segment 4: Dashed line */}
            <div 
              className="absolute left-[75%] top-0 h-full border-b border-dashed border-[#C5B09E]/70 transition-all duration-700 ease-out"
              style={{ 
                width: isInView ? '25%' : '0%',
                transitionDelay: '2400ms'
              }}
            />
          </div>

          {/* Timeline Milestones Row */}
          <div className="flex justify-between items-start relative z-10 w-full">
            {/* Milestone 1: First Kick */}
            <div className="flex flex-col items-center w-24 text-center relative">
              <div className="flex items-center h-9 justify-center relative w-full">
                {/* Heart Icon to the left of the dot */}
                <svg 
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" 
                  className={`absolute left-[calc(50%-28px)] w-5 h-5 text-[#C3896B] transition-all duration-500 transform ${isInView ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                <div 
                  className={`w-3.5 h-3.5 rounded-full bg-[#C3896B] border-2 border-[#FFFDF6] shadow-xs transition-all duration-500 transform ${isInView ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
                  style={{ transitionDelay: '200ms' }}
                />
              </div>
              <span 
                className={`text-[11px] md:text-[12.5px] font-serif font-medium mt-3 tracking-wide transition-all duration-500 ${
                  isInView ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                } text-[#C3896B]`}
                style={{ transitionDelay: '400ms' }}
              >
                First Kick
              </span>
            </div>

            {/* Milestone 2: Baby Shower */}
            <div className="flex flex-col items-center w-24 text-center relative">
              <div className="flex items-center h-9 justify-center relative w-full">
                <div 
                  className={`w-3.5 h-3.5 rounded-full border-2 border-[#C5B09E] bg-[#FFFDF6] transition-all duration-500 transform ${isInView ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
                  style={{ transitionDelay: '1000ms' }}
                />
              </div>
              <span 
                className={`text-[11px] md:text-[12.5px] font-serif font-medium mt-3 tracking-wide transition-all duration-500 text-gray-700 ${
                  isInView ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                }`}
                style={{ transitionDelay: '1100ms' }}
              >
                Baby Shower
              </span>
            </div>

            {/* Milestone 3: Birth Story */}
            <div className="flex flex-col items-center w-24 text-center relative">
              <div className="flex items-center h-9 justify-center relative w-full">
                <div 
                  className={`w-3.5 h-3.5 rounded-full border-2 border-[#C5B09E] bg-[#FFFDF6] transition-all duration-500 transform ${isInView ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
                  style={{ transitionDelay: '1700ms' }}
                />
              </div>
              <span 
                className={`text-[11px] md:text-[12.5px] font-serif font-medium mt-3 tracking-wide transition-all duration-500 text-gray-700 ${
                  isInView ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                }`}
                style={{ transitionDelay: '1800ms' }}
              >
                Birth Story
              </span>
            </div>

            {/* Milestone 4: First Smile */}
            <div className="flex flex-col items-center w-24 text-center relative">
              <div className="flex items-center h-9 justify-center relative w-full">
                <div 
                  className={`w-3.5 h-3.5 rounded-full border-2 border-[#C5B09E] bg-[#FFFDF6] transition-all duration-500 transform ${isInView ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
                  style={{ transitionDelay: '2400ms' }}
                />
              </div>
              <span 
                className={`text-[11px] md:text-[12.5px] font-serif font-medium mt-3 tracking-wide transition-all duration-500 text-gray-700 ${
                  isInView ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                }`}
                style={{ transitionDelay: '2500ms' }}
              >
                First Smile
              </span>
            </div>

            {/* Milestone 5: First Steps */}
            <div className="flex flex-col items-center w-24 text-center relative">
              <div className="flex items-center h-9 justify-center relative w-full">
                <svg 
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                  className={`w-4 h-4 text-[#C5B09E] transition-all duration-500 transform ${isInView ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
                  style={{ transitionDelay: '3100ms' }}
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <span 
                className={`text-[11px] md:text-[12.5px] font-serif font-medium mt-3 tracking-wide transition-all duration-500 text-gray-700 ${
                  isInView ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                }`}
                style={{ transitionDelay: '3200ms' }}
              >
                First Steps
              </span>
            </div>
          </div>
        </div>


        {/* PART 2: FEATURES GRID AROUND CENTER PRODUCT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center pt-2 select-none">
          
          {/* Left Column: 3 Features */}
          <div className="lg:col-span-4 flex flex-col gap-6 lg:gap-0">
            
            {/* Feature 1 */}
            <div 
              className={`flex flex-col items-start text-left group cursor-pointer transition-all duration-700 ease-out transform ${
                isInView ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <div className="w-10 h-10 rounded-full border border-[#DBC4B5]/50 flex items-center justify-center mb-3 text-[#C3896B] transition-all duration-300 group-hover:bg-[#C3896B] group-hover:text-white group-hover:border-[#C3896B] group-hover:scale-105">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <h4 className="font-serif text-[17.5px] text-papiah-dark group-hover:text-[#C3896B] font-medium mb-0 transition-colors duration-300 flex items-center gap-1.5">
                Capture Memories
                <span className="inline-block transition-all duration-300 group-hover:translate-x-1 text-[12px] opacity-0 group-hover:opacity-100 text-[#C3896B]">
                  →
                </span>
              </h4>
              <p className="text-[11.5px] text-gray-500 font-sans font-light leading-relaxed max-w-[260px] max-h-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:max-h-[80px] group-hover:opacity-100 group-hover:mt-2">
                Record every milestone, firsts, and special moments.
              </p>
            </div>

            {/* Dashed Separator */}
            <div className="w-full h-[1px] border-b border-dashed border-[#DBC4B5]/30 my-6"></div>

            {/* Feature 2 */}
            <div 
              className={`flex flex-col items-start text-left group cursor-pointer transition-all duration-700 ease-out transform ${
                isInView ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
              }`}
              style={{ transitionDelay: '500ms' }}
            >
              <div className="w-10 h-10 rounded-full border border-[#DBC4B5]/50 flex items-center justify-center mb-3 text-[#C3896B] transition-all duration-300 group-hover:bg-[#C3896B] group-hover:text-white group-hover:border-[#C3896B] group-hover:scale-105">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </div>
              <h4 className="font-serif text-[17.5px] text-papiah-dark group-hover:text-[#C3896B] font-medium mb-0 transition-colors duration-300 flex items-center gap-1.5">
                Strengthen the Bond
                <span className="inline-block transition-all duration-300 group-hover:translate-x-1 text-[12px] opacity-0 group-hover:opacity-100 text-[#C3896B]">
                  →
                </span>
              </h4>
              <p className="text-[11.5px] text-gray-500 font-sans font-light leading-relaxed max-w-[260px] max-h-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:max-h-[80px] group-hover:opacity-100 group-hover:mt-2">
                Reflect on your journey and cherish the connection.
              </p>
            </div>

            {/* Dashed Separator */}
            <div className="w-full h-[1px] border-b border-dashed border-[#DBC4B5]/30 my-6"></div>

            {/* Feature 3 */}
            <div 
              className={`flex flex-col items-start text-left group cursor-pointer transition-all duration-700 ease-out transform ${
                isInView ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
              }`}
              style={{ transitionDelay: '700ms' }}
            >
              <div className="w-10 h-10 rounded-full border border-[#DBC4B5]/50 flex items-center justify-center mb-3 text-[#C3896B] transition-all duration-300 group-hover:bg-[#C3896B] group-hover:text-white group-hover:border-[#C3896B] group-hover:scale-105">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </div>
              <h4 className="font-serif text-[17.5px] text-papiah-dark group-hover:text-[#C3896B] font-medium mb-0 transition-colors duration-300 flex items-center gap-1.5">
                A Journal for Every Stage
                <span className="inline-block transition-all duration-300 group-hover:translate-x-1 text-[12px] opacity-0 group-hover:opacity-100 text-[#C3896B]">
                  →
                </span>
              </h4>
              <p className="text-[11.5px] text-gray-500 font-sans font-light leading-relaxed max-w-[260px] max-h-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:max-h-[80px] group-hover:opacity-100 group-hover:mt-2">
                From pregnancy to motherhood and beyond.
              </p>
            </div>

          </div>

          {/* Center Column: Tilted Book Product */}
          <div className="lg:col-span-4 flex justify-center py-6">
            <div 
              className={`relative transition-all duration-1000 ease-out transform ${
                isInView 
                  ? 'scale-100 opacity-100 translate-y-0' 
                  : 'scale-90 opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              
              {/* Love sticker on top-left */}
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-[#FAF5F2] border border-[#E8D9D0] shadow-xs flex flex-col items-center justify-center rotate-[-12deg] z-20">
                <span className="text-[5.5px] font-sans font-bold tracking-widest text-[#C3896B] leading-none mb-0.5">LOVE</span>
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-2.5 h-2.5 text-[#C3896B]">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>

              {/* Tilted frame around the book */}
              <div className="bg-white p-3 rounded-[28px] shadow-[0_20px_50px_rgba(110,135,165,0.08)] border border-gray-100/60 transform rotate-[-2deg] hover:rotate-[0deg] transition-all duration-500 max-w-[280px] sm:max-w-[320px] relative group cursor-pointer">
                
                {/* Book Image */}
                <div className="rounded-[20px] overflow-hidden aspect-[4/5] relative">
                  <img 
                    src={s9_2} 
                    alt="My Pregnancy Journal Cover" 
                    className="w-full h-full object-cover transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
                </div>

                {/* Floating Heart Badge at bottom right of the book frame */}
                <div className="absolute -bottom-3 -right-3 w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#DBC4B5]/65 shadow-md flex items-center justify-center text-[#C3896B] transition-transform duration-300">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>

              </div>

            </div>
          </div>

          {/* Right Column: 3 Features */}
          <div className="lg:col-span-4 flex flex-col gap-6 lg:gap-0 lg:pl-4">
            
            {/* Feature 4 */}
            <div 
              className={`flex flex-col items-start text-left group cursor-pointer transition-all duration-700 ease-out transform ${
                isInView ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <div className="w-10 h-10 rounded-full border border-[#DBC4B5]/50 flex items-center justify-center mb-3 text-[#C3896B] transition-all duration-300 group-hover:bg-[#C3896B] group-hover:text-white group-hover:border-[#C3896B] group-hover:scale-105">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </div>
              <h4 className="font-serif text-[17.5px] text-papiah-dark group-hover:text-[#C3896B] font-medium mb-0 transition-colors duration-300 flex items-center gap-1.5">
                Document the Journey
                <span className="inline-block transition-all duration-300 group-hover:translate-x-1 text-[12px] opacity-0 group-hover:opacity-100 text-[#C3896B]">
                  →
                </span>
              </h4>
              <p className="text-[11.5px] text-gray-500 font-sans font-light leading-relaxed max-w-[260px] max-h-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:max-h-[80px] group-hover:opacity-100 group-hover:mt-2">
                Track growth, milestones, habits, and precious memories.
              </p>
            </div>

            {/* Dashed Separator */}
            <div className="w-full h-[1px] border-b border-dashed border-[#DBC4B5]/30 my-6"></div>

            {/* Feature 5 */}
            <div 
              className={`flex flex-col items-start text-left group cursor-pointer transition-all duration-700 ease-out transform ${
                isInView ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              <div className="w-10 h-10 rounded-full border border-[#DBC4B5]/50 flex items-center justify-center mb-3 text-[#C3896B] transition-all duration-300 group-hover:bg-[#C3896B] group-hover:text-white group-hover:border-[#C3896B] group-hover:scale-105">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
              </div>
              <h4 className="font-serif text-[17.5px] text-papiah-dark group-hover:text-[#C3896B] font-medium mb-0 transition-colors duration-300 flex items-center gap-1.5">
                Beautifully Designed
                <span className="inline-block transition-all duration-300 group-hover:translate-x-1 text-[12px] opacity-0 group-hover:opacity-100 text-[#C3896B]">
                  →
                </span>
              </h4>
              <p className="text-[11.5px] text-gray-500 font-sans font-light leading-relaxed max-w-[260px] max-h-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:max-h-[80px] group-hover:opacity-100 group-hover:mt-2">
                Minimal, thoughtful, and made with love.
              </p>
            </div>

            {/* Dashed Separator */}
            <div className="w-full h-[1px] border-b border-dashed border-[#DBC4B5]/30 my-6"></div>

            {/* Feature 6 */}
            <div 
              className={`flex flex-col items-start text-left group cursor-pointer transition-all duration-700 ease-out transform ${
                isInView ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
              }`}
              style={{ transitionDelay: '800ms' }}
            >
              <div className="w-10 h-10 rounded-full border border-[#DBC4B5]/50 flex items-center justify-center mb-3 text-[#C3896B] transition-all duration-300 group-hover:bg-[#C3896B] group-hover:text-white group-hover:border-[#C3896B] group-hover:scale-105">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <polyline points="20 12 20 22 4 22 4 12" />
                  <rect x="2" y="7" width="20" height="5" />
                  <line x1="12" y1="22" x2="12" y2="7" />
                  <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                  <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                </svg>
              </div>
              <h4 className="font-serif text-[17.5px] text-papiah-dark group-hover:text-[#C3896B] font-medium mb-0 transition-colors duration-300 flex items-center gap-1.5">
                A Gift that Lasts Forever
                <span className="inline-block transition-all duration-300 group-hover:translate-x-1 text-[12px] opacity-0 group-hover:opacity-100 text-[#C3896B]">
                  →
                </span>
              </h4>
              <p className="text-[11.5px] text-gray-500 font-sans font-light leading-relaxed max-w-[260px] max-h-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:max-h-[80px] group-hover:opacity-100 group-hover:mt-2">
                The perfect keepsake for moms and little ones.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
