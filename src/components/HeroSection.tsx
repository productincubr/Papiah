import React, { useState, useEffect, useRef } from 'react';
import { useCursor } from '../context/CursorContext';
import { CursorReactivePaper } from './CursorReactivePaper';
import heroImage from '../assets/hero.webp';
import heroMobile from '../assets/hero_mobile.webp';



interface JournalCardData {
  id: number;
  title: string;
  imageSrc: string;
  bgClass: string;
  borderClass: string;
  rotation: string;
  translateY: string;
  zIndex: string;
  hoverScale: string;
}


export const HeroSection: React.FC<{
  title?: React.ReactNode;
  subtitle?: string;
  description?: React.ReactNode;
  hideFloating?: boolean;
  hideCards?: boolean;
  enableCursorReactive?: boolean;
}> = ({ title, subtitle, description, hideFloating = false, hideCards = false, enableCursorReactive = false }) => {
  const { setCursorType } = useCursor();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamically load Google Font for cursive 'favorite'
    const fontId = 'google-font-caveat';
    if (!document.getElementById(fontId)) {
      const link = document.createElement('link');
      link.id = fontId;
      link.href = 'https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
  }, []);

  const [cards] = useState<JournalCardData[]>([
    {
      id: 1,
      title: "Recipe Journal",
      imageSrc: "",
      bgClass: "bg-[#FDF7F3]",
      borderClass: "border-[#DBC4B5]",
      rotation: "-rotate-[6deg]",
      translateY: "translate-y-4 md:translate-y-6",
      zIndex: "z-10",
      hoverScale: "hover:scale-108 hover:-rotate-1 hover:z-50",
    },
    {
      id: 2,
      title: "The Clarity Journal",
      imageSrc: "",
      bgClass: "bg-[#FCFAF5]",
      borderClass: "border-gray-200",
      rotation: "rotate-[3deg]",
      translateY: "-translate-y-2",
      zIndex: "z-20",
      hoverScale: "hover:scale-108 hover:rotate-0 hover:z-50",
    },
    {
      id: 3,
      title: "Social Media Thinking Journal",
      imageSrc: "",
      bgClass: "bg-white",
      borderClass: "border-gray-250",
      rotation: "rotate-[1deg]",
      translateY: "-translate-y-4 md:-translate-y-6",
      zIndex: "z-40",
      hoverScale: "hover:scale-108 hover:-rotate-1 hover:z-50",
    },
    {
      id: 4,
      title: "Open Notebook",
      imageSrc: "",
      bgClass: "bg-white",
      borderClass: "border-gray-150",
      rotation: "-rotate-[3deg]",
      translateY: "translate-y-0 md:translate-y-2",
      zIndex: "z-25",
      hoverScale: "hover:scale-108 hover:rotate-0 hover:z-50",
    },
    {
      id: 5,
      title: "Green Leaf Notebook",
      imageSrc: "",
      bgClass: "bg-[#5D6B59]",
      borderClass: "border-[#4A5547]",
      rotation: "rotate-[5deg]",
      translateY: "translate-y-4 md:translate-y-6",
      zIndex: "z-30",
      hoverScale: "hover:scale-108 hover:rotate-1 hover:z-50",
    }
  ]);

  const renderCardCover = (card: JournalCardData) => {
    switch (card.id) {
      case 1:
        return (
          <div className="w-full h-full flex flex-col justify-between p-3 md:p-4 border border-[#DBC4B5] rounded-md relative overflow-hidden bg-[#FDF7F3] select-none">
            <div className="absolute inset-1 border border-dashed border-[#DBC4B5]/75 rounded-sm pointer-events-none"></div>
            <div className="text-center mt-2 z-10">
              <span className="font-serif text-[8px] md:text-[9px] tracking-[0.2em] text-[#8C6D58] font-bold block uppercase">RECIPE</span>
              <span className="font-serif text-xs md:text-sm tracking-wider text-[#6B513E] font-medium block uppercase -mt-0.5">JOURNAL</span>
            </div>
            <div className="flex justify-center items-center my-auto z-10 text-[#A37B60]">
              <svg viewBox="0 0 100 100" className="w-10 h-10 md:w-12 md:h-12 opacity-80">
                <path d="M50 20 C50 20, 42 35, 32 40 C22 45, 10 40, 10 50 C10 60, 22 55, 32 60 C42 65, 50 80, 50 80 C50 80, 58 65, 68 60 C78 55, 90 60, 90 50 C90 40, 78 45, 68 40 C58 35, 50 20, 50 20 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="50" cy="50" r="3" fill="currentColor" />
              </svg>
            </div>
            <div className="text-center mb-1 z-10">
              <span className="text-[5px] md:text-[7px] tracking-[0.15em] text-[#8C6D58]/65 uppercase font-bold">Papiah Press</span>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="w-full h-full flex flex-col justify-between p-3 md:p-4 border border-gray-250 rounded-md relative overflow-hidden bg-[#FCFAF5] select-none">
            <div className="absolute inset-1 border border-dashed border-gray-300/80 rounded-sm"></div>
            <div className="text-center mt-2 z-10">
              <span className="text-[7px] md:text-[8px] tracking-[0.2em] text-gray-400 font-bold block uppercase">THE</span>
              <span className="font-serif text-xs md:text-sm tracking-[0.05em] text-gray-800 font-medium block uppercase leading-tight">CLARITY</span>
              <span className="font-serif text-[10px] md:text-xs tracking-widest text-gray-650 font-light block uppercase -mt-0.5">JOURNAL</span>
            </div>
            <div className="flex flex-col justify-center items-center my-auto z-10">
              <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 md:w-9 md:h-9 text-gray-855" stroke="currentColor" strokeWidth="1.2">
                <path d="M9 18h6M10 21h4" />
                <path d="M12 3a7 7 0 0 0-7 7c0 2.77 1.62 5.16 4 6.22V18h6v-1.78c2.38-1.06 4-3.45 4-6.22a7 7 0 0 0-7-7z" />
              </svg>
            </div>
            <div className="text-center mb-1 z-10">
              <span className="text-[5px] md:text-[6px] tracking-[0.1em] text-gray-400 uppercase font-medium">A PRACTICE FOR EVERY DAY</span>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="w-full h-full flex flex-col justify-between p-2 md:p-3 border border-gray-250 rounded-md relative overflow-hidden bg-[linear-gradient(90deg,#E8F0EE_50%,#FCFAF7_50%)] bg-[size:10px_100%] select-none">
            <div className="my-auto mx-auto w-full bg-white p-2 border border-dashed border-gray-300 shadow-2xs rounded-sm text-center flex flex-col justify-between min-h-[90%] z-10">
              <div className="mt-1">
                <span className="font-serif text-[7.5px] md:text-[8.5px] tracking-wider text-gray-800 font-bold block uppercase leading-tight">SOCIAL MEDIA</span>
                <span className="font-serif text-[7px] md:text-[8px] tracking-widest text-gray-650 font-medium block uppercase leading-none mt-0.5">THINKING JOURNAL</span>
              </div>
              <div className="my-2 w-full h-[1px] bg-gray-300 relative">
                <div className="absolute top-0 left-[50%] -translate-x-1/2 w-4 h-4 bg-red-50 border border-red-200 flex items-center justify-center rounded-xs rotate-[4deg]">
                  <span className="text-[6px] text-red-400">♥</span>
                </div>
              </div>
              <div>
                <span className="text-[5px] md:text-[6px] text-gray-400 font-bold tracking-widest uppercase block">Papiah</span>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="w-full h-full flex p-1.5 md:p-2 border border-gray-200 rounded-md relative overflow-hidden bg-white shadow-[inset_0_0_8px_rgba(0,0,0,0.02)] select-none">
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-2 bg-gradient-to-r from-black/5 via-black/8 to-transparent z-10 flex flex-col justify-around py-1.5 items-center">
              <div className="w-1 h-[2px] bg-gray-400/50 rounded-full"></div>
              <div className="w-1 h-[2px] bg-gray-400/50 rounded-full"></div>
              <div className="w-1 h-[2px] bg-gray-400/50 rounded-full"></div>
            </div>
            <div className="w-1/2 pr-1.5 pl-0.5 py-1 flex flex-col justify-between">
              <div className="flex flex-col gap-1.5 mt-1">
                <div className="h-[0.5px] bg-blue-100/50 w-full"></div>
                <div className="h-[0.5px] bg-blue-100/50 w-full"></div>
                <div className="h-[0.5px] bg-blue-100/50 w-full"></div>
              </div>
            </div>
            <div className="w-1/2 pl-1.5 pr-0.5 py-1 flex flex-col justify-between items-end">
              <div className="flex flex-col gap-1.5 mt-1 w-full">
                <div className="h-[0.5px] bg-blue-100/50 w-full"></div>
                <div className="h-[0.5px] bg-blue-100/50 w-full"></div>
                <div className="h-[0.5px] bg-blue-100/50 w-full"></div>
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="w-full h-full flex flex-col justify-between p-3 md:p-4 rounded-md relative overflow-hidden bg-[#5D6B59] text-[#FAF8F5] select-none">
            <div className="absolute inset-1 border border-dashed border-[#FAF8F5]/25 rounded-sm pointer-events-none"></div>
            <div className="my-auto mx-auto flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-10 h-10 md:w-12 md:h-12 text-[#FAF8F5]/85" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M35 75 C45 60, 52 42, 58 18" />
              </svg>
            </div>
            <div className="text-center z-10">
              <span className="text-[5px] md:text-[6px] tracking-[0.2em] text-[#FAF8F5]/70 uppercase font-semibold">THE PAPER NOTEBOOK</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const isDefault = !title;

  // Render WorkbooksPage layout if title prop is present
  if (!isDefault) {
    return (
      <main 
        ref={heroRef} 
        className="flex-grow bg-grid relative flex flex-col items-center justify-center pt-28 pb-20 px-4 md:px-10 overflow-hidden select-none"
        style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #EFF4FA 100%)' }}
      >
        {enableCursorReactive && <CursorReactivePaper />}
        {hideFloating && <div className="hidden" />}
        
        {/* Workbooks Hero Copy (Center-aligned) */}
        <div className="text-center max-w-4xl mx-auto z-10 relative px-2 mb-10">
          <span className="text-[10px] md:text-xs font-sans font-bold tracking-[0.25em] text-[#C3896B] block uppercase mb-4">
            {subtitle}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[52px] leading-[1.2] text-papiah-dark font-light tracking-tight">
            {title}
          </h1>
          <p className="text-xs sm:text-sm md:text-[15.5px] text-gray-500 max-w-2xl mx-auto mt-6 leading-relaxed font-sans font-light px-4">
            {description}
          </p>
        </div>

        {/* Original Cards Container for Workbooks listing */}
        {!hideCards && (
          <div className="w-full max-w-6xl mx-auto flex items-center justify-center mt-10 select-none relative z-20">
            <div className="flex items-center justify-center w-full max-w-[280px] sm:max-w-xl md:max-w-3xl lg:max-w-4xl h-[150px] sm:h-[220px] md:h-[260px] lg:h-[300px] relative [perspective:1000px]">
              {cards.map((card) => {
                let positionStyle = "";
                switch (card.id) {
                  case 1:
                    positionStyle = "-translate-x-[75%] sm:-translate-x-[150%] md:-translate-x-[216px] lg:-translate-x-[260px]";
                    break;
                  case 2:
                    positionStyle = "-translate-x-[38%] sm:-translate-x-[75%] md:-translate-x-[108px] lg:-translate-x-[130px]";
                    break;
                  case 3:
                    positionStyle = "translate-x-0";
                    break;
                  case 4:
                    positionStyle = "translate-x-[38%] sm:translate-x-[75%] md:translate-x-[108px] lg:translate-x-[130px]";
                    break;
                  case 5:
                    positionStyle = "translate-x-[75%] sm:translate-x-[150%] md:translate-x-[216px] lg:translate-x-[260px]";
                    break;
                }

                return (
                  <div
                    key={card.id}
                    className={`absolute left-1/2 -translate-x-1/2 transition-all duration-300 ease-out transform
                      ${card.rotation} ${card.translateY} ${card.zIndex} ${positionStyle}
                      w-[80px] h-[108px] sm:w-[130px] sm:h-[175px] md:w-[160px] md:h-[215px] lg:w-[180px] lg:h-[242px]
                    `}
                  >
                    <div className="w-full h-full rounded-md border border-dashed border-gray-300/80 bg-white p-[1.5px] shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.12)] transition-shadow duration-300">
                      <div className="w-full h-full rounded-[4px] overflow-hidden">
                        {renderCardCover(card)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    );
  }

  // Render Redesigned Default Homepage Layout
  return (
    <section 
      ref={heroRef}
      className="w-full min-h-[90vh] md:min-h-[850px] relative z-20 select-none overflow-hidden flex flex-col justify-center items-start py-14 md:py-20 px-6 md:px-16 lg:px-24 xl:px-32 bg-[#FAF8F5] hero-responsive-bg"
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
      onMouseEnter={() => setCursorType('default')}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .hero-responsive-bg {
          background-image: url(${heroMobile});
        }
        @media (min-width: 768px) {
          .hero-responsive-bg {
            background-image: url(${heroImage});
          }
        }
      `}} />
      {/* Background soft grids overlay */}
      <div className="absolute inset-0 bg-grid opacity-[0.02] pointer-events-none"></div>

      <div className="w-full h-full flex-grow flex flex-col justify-between md:justify-center items-start relative z-10 py-4 md:py-0">
        
        {/* Top/Main Content Wrapper */}
        <div className="w-full max-w-[700px] text-left flex flex-col items-start justify-center">
          {/* Eyebrow Text */}
          <span 
            className="hidden md:block font-sans uppercase tracking-[0.25em] text-[#FAF8F5]/75 font-semibold text-[11px] sm:text-[12px] text-left"
            style={{ letterSpacing: '0.25em' }}
          >
            DESIGNED FOR CLARITY. CREATIVITY. CALM.
          </span>

          {/* Decorative Divider */}
          <div className="hidden md:flex items-center justify-start gap-4 w-full max-w-[280px] my-5">
            {/* Heart icon */}
            <svg viewBox="0 0 24 24" fill="#CBD83B" className="w-3.5 h-3.5 text-[#CBD83B] shrink-0">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <div className="h-[1px] bg-white/20 flex-grow"></div>
          </div>

          {/* Main Heading */}
          <h1 className="font-playfair text-[44px] sm:text-[60px] md:text-[76px] lg:text-[92px] text-white font-light leading-[1.08] md:leading-[0.98] text-left tracking-normal mb-2 md:mb-8">
            The Art of <br />
            Living <br />
            <span className="italic text-[#CBD83B] text-[1.08em] font-medium block mt-1 sm:mt-3 select-text text-left">
              Intentionally.
            </span>
          </h1>

          {/* Mobile Heart Accent */}
          <div className="md:hidden flex justify-start my-3.5">
            <svg viewBox="0 0 24 24" fill="none" stroke="#CBD83B" strokeWidth="2" className="w-5 h-5 text-[#CBD83B]">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>

          {/* Description */}
          <p className="font-sans text-[15.5px] sm:text-[17px] md:text-[19px] text-[#FAF8F5]/85 font-light max-w-[300px] md:max-w-[520px] text-left leading-relaxed mb-0 md:mb-12">
            Thoughtfully designed journals, planners and mindful tools for a life well lived.
          </p>
        </div>

        {/* Spacer on mobile to push CTA to the bottom */}
        <div className="flex-grow md:hidden"></div>

        {/* CTA Button Wrapper (for doodles positioning) */}
        <div className="relative w-full md:w-auto flex flex-row items-center gap-3 mt-6 md:mt-2">
          
          {/* Small hand-drawn doodles around the button */}
          {/* Doodle 1: Sparkle top right */}
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#CBD83B" 
            strokeWidth="1.8" 
            strokeLinecap="round" 
            className="hidden md:block absolute -top-7 -right-9 w-9 h-9 opacity-85 select-none pointer-events-none animate-pulse-slow"
          >
            <path d="M12 4c.1 1.8.4 3.2 1.3 4.1C14.2 9 15.6 9.3 17.4 9.4c-1.8.1-3.2.4-4.1 1.3C12.4 11.6 12.1 13 12 14.8c-.1-1.8-.4-3.2-1.3-4.1C9.8 9.8 8.4 9.5 6.6 9.4c1.8-.1 3.2-.4 4.1-1.3C11.6 7.2 11.9 5.8 12 4z" />
          </svg>

          {/* Doodle 2: Curved underline loop bottom left */}
          <svg 
            viewBox="0 0 40 30" 
            fill="none" 
            stroke="#CBD83B" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            className="hidden md:block absolute -bottom-8 -left-10 w-11 h-9 opacity-80 select-none pointer-events-none"
          >
            <path d="M4 14 C12 6, 26 5, 34 12 C37 15, 35 22, 29 21 C23 20, 19 12, 25 7" />
          </svg>

          {/* Doodle 3: Tiny sparkle bottom right */}
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#CBD83B" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            className="hidden md:block absolute -bottom-4 -right-8 w-5 h-5 opacity-70 select-none pointer-events-none"
          >
            <path d="M12 6c0 1.5.5 2.5 1 3 1 .5 2 .5 3 .5-1 0-2 .5-2.5 1-.5.5-.5 1.5-.5 3 0-1.5-.5-2.5-1-3C11 10 10 10 9 10c1 0 2-.5 2.5-1 .5-.5.5-1.5.5-3z" />
          </svg>

          {/* Doodle 4: Delicate leaf swirl top left */}
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#CBD83B" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            className="hidden md:block absolute -top-6 -left-8 w-6 h-6 opacity-75 select-none pointer-events-none"
          >
            <path d="M4 20c4-4 8-6 14-4M10 12c2-2 4-2 6-1M6 16c1-2 3-3 5-3" />
          </svg>

          {/* CTA Button */}
          <button 
            className="flex-grow md:flex-initial w-full md:w-auto bg-[#CBD83B] hover:bg-[#b8c634] active:scale-[0.98] text-[#2E3327] font-sans font-semibold tracking-[0.2em] text-[11px] md:text-[12px] h-[54px] px-[24px] md:px-[36px] rounded-[10px] shadow-[0_6px_20px_rgba(203,216,59,0.2)] hover:shadow-[0_8px_25px_rgba(203,216,59,0.35)] transition-all duration-300 uppercase cursor-pointer flex items-center justify-center gap-2"
          >
            EXPLORE THE COLLECTION
            <span className="text-[1.1em] font-light leading-none mb-0.5">→</span>
          </button>

          {/* Circular down-arrow scroll button */}
          <button 
            onClick={() => {
              const nextSection = heroRef.current?.nextElementSibling;
              if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="w-[54px] h-[54px] shrink-0 border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/10 active:scale-95 transition-all duration-300 cursor-pointer"
            aria-label="Scroll down"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};
