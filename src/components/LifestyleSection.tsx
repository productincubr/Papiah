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

export const LifestyleSection: React.FC = () => {
  const { setCursorType } = useCursor();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const cardsData: JournalCard[] = [
    {
      id: 0,
      label: "TRAVEL JOURNAL",
      title: "travel journal",
      subtitle: "EXPLORE THE WORLD WITH PURPOSE",
      desc: "Document your journeys, capture memories, and reflect on your travels. A perfect companion for your adventures near and far.",
      color: "#B7C7D8", // sky blue/grey
      textLight: false,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 md:w-10 md:h-10 opacity-75">
          <path d="m22 2-7 20-4-9-9-4Z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 2 11 13" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      id: 1,
      label: "RECIPE JOURNAL",
      title: "recipe keeper",
      subtitle: "COOK WITH INTENTION",
      desc: "Save your favorite recipes, family dishes, cooking notes, and kitchen stories in one beautiful place to pass down for generations.",
      color: "#DE9875", // warm apricot orange
      textLight: false,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 md:w-10 md:h-10 opacity-75">
          <path d="M6 18h12M12 2v16M8 8a4 4 0 0 1 8 0c0 2-2 4-4 4s-4-2-4-4Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      id: 2,
      label: "WEDDING JOURNAL",
      title: "wedding planner",
      subtitle: "PLAN YOUR LOVE STORY",
      desc: "Stay organized and cherish every step from the first yes to the final I do. Reduce wedding stress and capture beautiful memories.",
      color: "#F3E8E2", // blush ivory/gold
      textLight: false,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 md:w-10 md:h-10 opacity-75">
          <circle cx="8" cy="12" r="5" />
          <circle cx="16" cy="12" r="5" />
        </svg>
      )
    },
    {
      id: 3,
      label: "FITNESS JOURNAL",
      title: "fitness tracker",
      subtitle: "TRAIN YOUR MIND AND BODY",
      desc: "Track your workouts, meals, habits, and progress. Build a healthier lifestyle with daily reflection and intentional fitness planning.",
      color: "#4F6B5F", // deep forest/emerald green
      textLight: true,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7 md:w-9 md:h-9 opacity-80">
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3.5Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    }
  ];

  // For Planning & Productivity, default main book is Product Planner
  const defaultBook = {
    title: "planning & productivity",
    subtitle: "DESIGN A LIFE WITH PURPOSE",
    desc: "From daily rituals to meaningful milestones, our journals help you stay connected to what matters most—creating a life filled with intention, balance, and lasting memories.",
    color: "#6B87A6", // classic slate blue
    textLight: true,
    label: "PRODUCTIVITY PLANNER",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-9 h-9 md:w-11 md:h-11 opacity-80">
        <circle cx="12" cy="12" r="10" />
        <path d="m16.2 7.8-2 5.6-5.6 2 2-5.6z" strokeLinecap="round" strokeLinejoin="round" />
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
      id="lifestyle-section"
      className="w-full relative z-30 select-none border-b border-papiah-dark/15 pt-20 pb-20"
      style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F7FAFD 100%)' }}
      onMouseEnter={() => setCursorType('lifestyle')}
      onMouseLeave={() => setCursorType('default')}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-10 relative">
        
        {/* Top Content Row: Left Column Big Book, Right Column Copy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16">
          
          {/* Left Column: Large Showcase Book with Radial Glow Backdrop */}
          <div className="lg:col-span-5 lg:col-start-1 flex flex-col items-center justify-center relative w-full h-[320px] sm:h-[400px] order-2 lg:order-1">
            
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

          {/* Right Column: Copy & vertical divider */}
          <div className="lg:col-span-7 lg:col-start-6 pt-6 lg:pt-10 font-sans order-1 lg:order-2">
            <div className="w-full lg:w-[550px] lg:mr-auto flex items-start">
              
              {/* Text content block */}
              <div className="flex flex-col items-start flex-grow">
                {/* Title */}
                <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-papiah-dark leading-[1.1] tracking-tight lowercase">
                  planning &<br />productivity
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

              {/* Thin vertical line on the right */}
              <div className="w-[1.5px] h-16 sm:h-20 md:h-24 bg-papiah-dark/40 ml-6 mt-1.5 self-start"></div>

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
