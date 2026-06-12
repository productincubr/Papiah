import React, { useState } from 'react';
import { useCursor } from '../context/CursorContext';
import BgElements from '../assets/bg_elements.webp';

interface JournalCard {
  id: number;
  label: string;
  title: string;
  subtitle: string;
  desc: string;
  color: string;
  icon: React.ReactNode;
  textLight: boolean;
}

export const MindsetSection: React.FC = () => {
  const { setCursorType } = useCursor();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const cardsData: JournalCard[] = [
    {
      id: 0,
      label: "CLARITY JOURNAL",
      title: "the clarity journal",
      subtitle: "REFLECT ON SELF-REALIZATION",
      desc: "Organize your thoughts, clear mental clutter, and find direction when life feels overwhelming.",
      color: "#E5DEC9", // warm sand beige/ivory
      textLight: false,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 md:w-10 md:h-10 opacity-75">
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" strokeLinecap="round" />
        </svg>
      )
    },
    {
      id: 1,
      label: "GRATITUDE JOURNAL",
      title: "daily joy journal",
      subtitle: "COUNT YOUR DAILY BLESSINGS",
      desc: "Capture little happy moments, gratitude notes, and everyday wins to make your day feel lighter.",
      color: "#D99B82", // soft clay terracotta
      textLight: false,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7 md:w-9 md:h-9 opacity-80">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      id: 2,
      label: "GROWTH JOURNAL",
      title: "daily progress tracker",
      subtitle: "BUILD INTENTIONAL HABITS",
      desc: "Set personal goals, track daily progress, reflect on lessons, and grow into the best version of yourself.",
      color: "#5B6B59", // forest green/sage
      textLight: true,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 md:w-10 md:h-10 opacity-80">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c0 5-1.4 7-6 10h-2M19 2a19.75 19.75 0 0 1-8 18" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      id: 3,
      label: "MINDFULNESS JOURNAL",
      title: "calm & focus notebook",
      subtitle: "PRACTICE PRESENT MOMENT AWARENESS",
      desc: "Practice mindfulness, reduce anxiety, and breathe slowly. Empty your thoughts on premium, tactile paper.",
      color: "#4A5E70", // slate blue/denim
      textLight: true,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 md:w-10 md:h-10 opacity-75">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    }
  ];

  // If selectedIndex is null, we show the main default mindset journal
  const defaultBook = {
    title: "mindset & self growth",
    subtitle: "DESIGN A LIFE WITH PURPOSE",
    desc: "From daily rituals to meaningful milestones, our journals help you stay connected to what matters most—creating a life filled with intention, balance, and lasting memories.",
    color: "#42324C", // deep plum / lavender-black
    textLight: true,
    label: "MINDSET JOURNAL",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-9 h-9 md:w-11 md:h-11 opacity-80">
        <path d="M12 3v18M3 12h18M12 3l3 4.5M12 21l-3-4.5M3 12l4.5 3M21 12l-4.5-3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  };

  const currentBook = selectedIndex !== null ? {
    title: cardsData[selectedIndex].title,
    subtitle: cardsData[selectedIndex].subtitle,
    desc: cardsData[selectedIndex].desc,
    color: cardsData[selectedIndex].color,
    textLight: cardsData[selectedIndex].textLight,
    label: cardsData[selectedIndex].label,
    icon: cardsData[selectedIndex].icon
  } : defaultBook;

  const handleNext = () => {
    setSelectedIndex((prev) => {
      if (prev === null) return 0;
      return (prev + 1) % cardsData.length;
    });
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => {
      if (prev === null) return cardsData.length - 1;
      return (prev - 1 + cardsData.length) % cardsData.length;
    });
  };

  const renderBookCover = (book: { label: string; color: string; icon: React.ReactNode; textLight: boolean }, isLarge = false) => {
    const spineWidth = isLarge ? 'border-l-[5.5px] md:border-l-[8px]' : 'border-l-[3.5px] md:border-l-[5px]';
    const headerTextSize = isLarge ? 'text-[7.5px] md:text-[9px]' : 'text-[5.5px] md:text-[7px]';
    const titleTextSize = isLarge ? 'text-[12.5px] sm:text-[14px] md:text-[18px]' : 'text-[9.5px] sm:text-[10.5px] md:text-[12px]';
    const subtitleTextSize = isLarge ? 'text-[8.5px] sm:text-[9.5px] md:text-[11px]' : 'text-[6.5px] sm:text-[7px] md:text-[8px]';
    const footerTextSize = isLarge ? 'text-[6px] md:text-[8px]' : 'text-[4.5px] md:text-[6px]';
    const emblemSize = isLarge ? 'scale-110 md:scale-125' : 'scale-90 md:scale-100';

    return (
      <div 
        className={`w-full h-full relative flex flex-col justify-between p-3 sm:p-4 md:p-6 rounded-[3px] shadow-md overflow-hidden select-none transition-all duration-300 ${spineWidth}`}
        style={{ 
          backgroundColor: book.color,
          borderColor: 'rgba(0,0,0,0.18)',
        }}
      >
        {/* Subtle cover texture */}
        <div className="absolute inset-0 bg-white/[0.04] pointer-events-none mix-blend-overlay"></div>
        {/* Crease lines */}
        <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/20"></div>
        <div className="absolute left-[1px] top-0 bottom-0 w-[1.5px] bg-black/15"></div>
        
        {/* Title elements */}
        <div className="text-center mt-2 md:mt-3 z-10 w-full px-1">
          <span className={`tracking-[0.25em] font-sans font-bold block uppercase ${headerTextSize} ${book.textLight ? 'text-white/40' : 'text-papiah-dark/40'}`}>
            PAPIAH
          </span>
          <span className={`font-serif tracking-[0.08em] font-medium block uppercase leading-tight mt-1 ${titleTextSize} ${book.textLight ? 'text-white/95' : 'text-papiah-dark/95'}`}>
            {book.label.replace(" JOURNAL", "").replace(" PLANNER", "")}
          </span>
          <span className={`font-serif tracking-[0.2em] font-light block uppercase -mt-0.5 ${subtitleTextSize} ${book.textLight ? 'text-white/60' : 'text-papiah-dark/60'}`}>
            {book.label.includes("JOURNAL") ? "JOURNAL" : "PLANNER"}
          </span>
        </div>

        {/* Center Emblem */}
        <div className={`flex justify-center items-center my-auto z-10 ${emblemSize} ${book.textLight ? 'text-white/75' : 'text-papiah-dark/75'}`}>
          {book.icon}
        </div>

        {/* Footer info */}
        <div className="text-center mb-1.5 z-10 w-full">
          <span className={`tracking-[0.2em] uppercase font-bold ${footerTextSize} ${book.textLight ? 'text-white/35' : 'text-papiah-dark/25'}`}>
            Papiah Press
          </span>
        </div>
      </div>
    );
  };

  return (
    <section 
      id="mindset-section"
      className="w-full relative z-40 select-none border-b border-papiah-dark/15 pt-20 pb-20"
      style={{ background: 'linear-gradient(180deg, #FFFFEB 0%, #F8F2E4 100%)' }}
      onMouseEnter={() => setCursorType('mindset')}
      onMouseLeave={() => setCursorType('default')}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-10 relative">
        
        {/* Top Content Row: Left Column Copy, Right Column Big Book */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16">
          
          {/* Left Column */}
          <div className="lg:col-span-7 lg:col-start-1 pt-6 lg:pt-10 font-sans">
            <div className="w-full lg:w-[550px] lg:ml-auto flex items-start">
              
              {/* Thin vertical line on the left */}
              <div className="w-[1.5px] h-16 sm:h-20 md:h-24 bg-papiah-dark/40 mr-6 mt-1.5 self-start"></div>

              {/* Text content block */}
              <div className="flex flex-col items-start flex-grow">
                {/* Title */}
                <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-papiah-dark leading-[1.1] tracking-tight lowercase">
                  mindset &<br />self growth
                </h2>

                {/* Blue Divider Line */}
                <div className="w-12 h-[2px] bg-[#84AAD7] my-6"></div>

                {/* Subtitle */}
                <span className="font-sans text-[10px] md:text-xs font-bold tracking-[0.25em] text-[#84AAD7] mb-4 uppercase">
                  {currentBook.subtitle}
                </span>

                {/* Description Paragraph */}
                <p className="text-sm md:text-base text-gray-650 font-sans font-light leading-relaxed mb-8 max-w-lg">
                  {currentBook.desc}
                </p>

                {/* CTA Explore Button */}
                <button className="bg-[#CBD83B] hover:bg-[#b8c634] text-[#2E3327] font-sans font-bold tracking-[0.2em] text-[11px] md:text-[12px] px-8 py-3.5 rounded-full shadow-[0_4px_14px_rgba(203,216,59,0.4)] hover:shadow-[0_6px_20px_rgba(203,216,59,0.5)] transition-all duration-200 uppercase flex items-center justify-center gap-2 cursor-pointer border border-transparent">
                  Explore Collection
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

            </div>
          </div>

          {/* Right Column: Large Showcase Book with Radial Glow Backdrop */}
          <div className="lg:col-span-5 lg:col-start-8 flex flex-col items-center justify-center relative w-full h-[320px] sm:h-[400px]">
            
            {/* Radial Glow Backdrop */}
            <img 
              src={BgElements} 
              alt="Glow Backdrop" 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[420px] h-[340px] sm:h-[420px] object-contain pointer-events-none opacity-85 select-none"
            />

            {/* Book Mockup Cover */}
            <div className="relative z-10 w-[180px] sm:w-[240px] md:w-[260px] aspect-[112/150] drop-shadow-[0_15px_35px_rgba(0,0,0,0.12)] hover:drop-shadow-[0_20px_45px_rgba(0,0,0,0.18)] transition-all duration-500">
              {renderBookCover(currentBook, true)}
            </div>

          </div>

        </div>

        {/* Bottom Carousel / Card Selection row with Left/Right Arrows */}
        <div className="relative w-full flex items-center justify-center mt-12 px-2 sm:px-12 select-none">
          
          {/* Left Arrow Button */}
          <button 
            onClick={handlePrev}
            className="absolute left-[-8px] sm:left-0 w-10 h-10 rounded-full border border-gray-200/85 bg-white flex items-center justify-center hover:bg-gray-50 active:scale-95 shadow-sm transition-all cursor-pointer z-10"
            aria-label="Previous Slide"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5 text-gray-700">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" />
            </svg>
          </button>

          {/* 4 Mockup Cards Selection Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-[280px] sm:max-w-md md:max-w-2xl w-full">
            {cardsData.map((card, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <div 
                  key={card.id}
                  className="flex flex-col items-center cursor-pointer group"
                  onClick={() => setSelectedIndex(idx)}
                >
                  {/* Clean book cover with selected ring styling and no extra white background container border */}
                  <div className={`w-full aspect-[112/150] transition-all duration-350 mb-4 rounded-[3px] ${
                    isSelected 
                      ? 'ring-2 ring-[#84AAD7] ring-offset-2 ring-offset-papiah-cream shadow-[0_12px_28px_rgba(132,170,215,0.22)] scale-[1.03]' 
                      : 'shadow-sm hover:shadow-md'
                  }`}>
                    {renderBookCover(card, false)}
                  </div>
                  
                  {/* Card Title Label */}
                  <span className="text-[9.5px] sm:text-[10.5px] md:text-[11px] font-sans font-bold tracking-wider text-gray-700 uppercase mb-1.5 transition-colors group-hover:text-papiah-dark">
                    {card.label}
                  </span>
                  
                  {/* Selected Underline Indicator */}
                  <div className={`h-[2px] bg-[#84AAD7] transition-all duration-350 ${isSelected ? 'w-8' : 'w-0'}`}></div>
                </div>
              );
            })}
          </div>

          {/* Right Arrow Button */}
          <button 
            onClick={handleNext}
            className="absolute right-[-8px] sm:right-0 w-10 h-10 rounded-full border border-gray-200/85 bg-white flex items-center justify-center hover:bg-gray-50 active:scale-95 shadow-sm transition-all cursor-pointer z-10"
            aria-label="Next Slide"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5 text-gray-700">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" />
            </svg>
          </button>

        </div>

      </div>
    </section>
  );
};
