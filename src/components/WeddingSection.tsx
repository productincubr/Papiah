import React, { useState, useEffect, useRef } from 'react';
import { useCursor } from '../context/CursorContext';
import BgElements from '../assets/bg_elements.webp';
import weddingJournalMockup from '../assets/wedding_journal_mockup.webp';
import iconEngagement from '../assets/icon_engagement.webp';
import iconMehendi from '../assets/icon_mehendi.webp';
import iconHaldi from '../assets/icon_haldi.webp';
import iconWedding from '../assets/icon_wedding.webp';
import iconReception from '../assets/icon_reception.webp';
import iconHoneymoon from '../assets/icon_honeymoon.webp';

interface Milestone {
  title: string;
  desc: string;
  image: string;
}

export const WeddingSection: React.FC = () => {
  const { setCursorType } = useCursor();
  const [isInView, setIsInView] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
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

  const milestones: Milestone[] = [
    {
      title: "Engagement",
      desc: "The beginning of your forever.",
      image: iconEngagement
    },
    {
      title: "Mehendi",
      desc: "Moments of color, laughter and love.",
      image: iconMehendi
    },
    {
      title: "Haldi",
      desc: "Traditions that bless your journey.",
      image: iconHaldi
    },
    {
      title: "Wedding Day",
      desc: "The day your dreams come true.",
      image: iconWedding
    },
    {
      title: "Reception",
      desc: "Celebrating love with your people.",
      image: iconReception
    },
    {
      title: "Honeymoon",
      desc: "The start of your next adventure.",
      image: iconHoneymoon
    }
  ];

  return (
    <section 
      id="wedding-section"
      ref={sectionRef}
      className="w-full relative z-20 select-none border-b border-papiah-grid/40 py-20 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FFFDF9 0%, #FAF8F5 100%)' }}
      onMouseEnter={() => setCursorType('wedding')}
      onMouseLeave={() => setCursorType('default')}
    >
      {/* Background soft grid pattern */}
      <div className="absolute inset-0 bg-grid opacity-[0.05] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-10 relative z-10">
        
        {/* PART 1: HEADER BANNER GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-8">
          
          {/* Left Column: Copy */}
          <div 
            className={`lg:col-span-7 flex flex-col justify-center text-left transition-all duration-1000 ease-out transform ${
              isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <span className="text-[10px] md:text-xs font-sans font-bold tracking-[0.25em] text-[#C3896B] block uppercase mb-4">
              DESIGN A LIFE WITH PURPOSE
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-papiah-dark font-light tracking-tight mb-6 leading-tight">
              Wedding Collection
            </h2>
            <div className="w-12 h-[1.5px] bg-[#C5B09E] mb-8"></div>
            <p className="text-sm md:text-base text-gray-500 font-sans font-light leading-relaxed mb-10 max-w-lg">
              From the first promise to forever after, our journals help you cherish every beautiful chapter of your journey.
            </p>
            
            {/* Pill-shaped Button */}
            <button className="bg-[#CBD83B] hover:bg-[#b8c634] active:scale-98 text-[#2E3327] font-sans font-bold tracking-[0.2em] text-[11px] md:text-[12px] px-8 py-4 rounded-full shadow-xs hover:shadow-md transition-all duration-200 uppercase cursor-pointer flex items-center gap-2 max-w-max">
              Explore Collection
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Right Column: Book Showcase with Theme Glow Backdrop */}
          <div className="lg:col-span-5 flex items-center justify-center relative w-full h-[360px] sm:h-[440px] order-2 lg:order-2">
            
            {/* Theme Glow Backdrop */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
              <div className="w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] rounded-full bg-radial from-[#84AAD7]/15 via-[#C3896B]/5 to-transparent blur-2xl"></div>
            </div>
            
            {/* Radial Glow Backdrop Image (from theme assets) */}
            <img 
              src={BgElements} 
              alt="Glow Backdrop" 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[440px] h-[340px] sm:h-[440px] object-contain pointer-events-none opacity-60 select-none mix-blend-multiply"
            />

            {/* Premium Book Container (No white border/padding/background frame) */}
            <div 
              className={`relative z-10 transition-all duration-1000 ease-out transform ${
                isInView ? 'scale-100 translate-y-0 opacity-100' : 'scale-90 translate-y-8 opacity-0'
              } w-[200px] sm:w-[240px] md:w-[265px] aspect-[1/1.4] rounded-[16px] overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.08)] hover:shadow-[0_25px_45px_rgba(0,0,0,0.12)] transition-all duration-500 cursor-pointer`} 
              style={{ transitionDelay: '200ms' }}
            >
              <img 
                src={weddingJournalMockup} 
                alt="Wedding Journal Cover Mockup" 
                className="w-full h-full object-cover"
              />
            </div>

          </div>

        </div>

        {/* Divider with Center Text */}
        <div 
          className={`w-full flex items-center justify-center my-12 select-none transition-all duration-1000 ease-out ${
            isInView ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          <div className="w-full h-[1px] bg-[#C5B09E]/30 hidden md:block"></div>
          <span className="px-6 text-[10px] md:text-xs font-sans font-bold tracking-[0.25em] text-[#C3896B] uppercase whitespace-nowrap">
            A Journal for Every Chapter
          </span>
          <div className="w-full h-[1px] bg-[#C5B09E]/30 hidden md:block"></div>
        </div>

        {/* Milestones Timeline */}
        <div className="relative w-full select-none">
          {/* Horizontal Dotted Line (Desktop only) */}
          <div className="absolute top-[44px] left-[8%] right-[8%] h-[1px] border-b border-dashed border-[#84AAD7]/40 hidden lg:block pointer-events-none z-0"></div>

          {/* Milestones List */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-4 relative z-10">
            {milestones.map((milestone, idx) => {
              const isActive = activeIndex === idx;
              return (
                <div 
                  key={idx} 
                  className={`flex flex-col items-center text-center group cursor-pointer transition-all duration-750 ease-out transform ${
                    isInView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                  style={{ transitionDelay: `${400 + idx * 80}ms` }}
                  onMouseEnter={() => setActiveIndex(idx)}
                >
                  {/* Icon Container with Circle Ring */}
                  <div className={`relative w-[88px] h-[88px] rounded-full border flex items-center justify-center transition-all duration-300 bg-[#FFFDFB] overflow-hidden ${
                    isActive 
                      ? 'border-[#84AAD7] scale-105 shadow-sm' 
                      : 'border-gray-250/70 hover:border-[#84AAD7]/60'
                  }`}>
                    <img 
                      src={milestone.image} 
                      alt={milestone.title} 
                      className={`w-[68px] h-[68px] object-contain mix-blend-multiply rounded-full transition-all duration-300 ${
                        isActive ? 'scale-105 opacity-100' : 'opacity-85'
                      }`}
                    />
                    
                    {/* Indicator Dot at the bottom (6 o'clock position) */}
                    <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-[#84AAD7] transition-all duration-300 ${
                      isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                    }`} />
                  </div>

                  <h4 className={`font-serif text-[14.5px] font-medium mt-4 mb-1.5 transition-colors duration-300 ${
                    isActive ? 'text-[#84AAD7]' : 'text-papiah-dark'
                  }`}>
                    {milestone.title}
                  </h4>
                  <p className="text-[11px] text-gray-500 font-sans font-light leading-relaxed max-w-[150px]">
                    {milestone.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
