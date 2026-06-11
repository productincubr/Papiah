import React from 'react';
import { useCursor } from '../context/CursorContext';

export const CustomCursor: React.FC = () => {
  const { cursorType, cursorRef, isVisible } = useCursor();

  // Do not render anything if mouse is not yet tracked or invisible (e.g. mobile/touch devices)
  if (!isVisible) return null;

  const renderCursorIcon = () => {
    switch (cursorType) {
      case 'featured':
        return (
          <div className="flex flex-col items-center justify-center">
            {/* Shopping Bag SVG */}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5 text-[#9E4C41]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            <span className="text-[7.5px] font-sans font-bold tracking-widest text-[#9E4C41] mt-1 uppercase">Browse</span>
          </div>
        );
      case 'philosophy':
        return (
          <div className="flex flex-col items-center justify-center">
            {/* Origami Crane SVG (Simplified) */}
            <svg viewBox="0 0 100 100" className="w-6 h-6 text-[#9E4C41]" fill="none" stroke="currentColor" strokeWidth="6">
              <path d="M 50,25 L 75,50 L 50,70 L 25,50 Z" />
              <path d="M 50,25 L 50,70" />
              <path d="M 25,50 L 75,50" />
            </svg>
            <span className="text-[7.5px] font-sans font-bold tracking-widest text-[#9E4C41] mt-1.5 uppercase">Reflect</span>
          </div>
        );
      case 'mindset':
        return (
          <div className="flex flex-col items-center justify-center">
            {/* Lotus SVG */}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5 text-[#594B73]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.467 5.99 5.99 0 0 0-1.925-3.546 5.974 5.974 0 0 1-2.133-1A5.978 5.978 0 0 0 6 9c0 1.602.628 3.057 1.657 4.143a3.75 3.75 0 0 0-.495 7.467M12 18a3.75 3.75 0 0 1-.495-7.467 5.99 5.99 0 0 1 1.925-3.546 5.974 5.974 0 0 0 2.133-1A5.978 5.978 0 0 1 18 9c0 1.602-.628 3.057-1.657 4.143a3.75 3.75 0 0 1 .495 7.467M12 18v3m0 0H9m3 0h3" />
            </svg>
            <span className="text-[7.5px] font-sans font-bold tracking-widest text-[#594B73] mt-1 uppercase">Grow</span>
          </div>
        );
      case 'lifestyle':
        return (
          <div className="flex flex-col items-center justify-center">
            {/* Leaf SVG */}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5 text-[#3A5F43]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L12 21m0-18c4.97 0 9 4.03 9 9 0 2.12-.74 4.07-1.97 5.61L12 21" />
            </svg>
            <span className="text-[7.5px] font-sans font-bold tracking-widest text-[#3A5F43] mt-1 uppercase">Journal</span>
          </div>
        );
      case 'wedding':
        return (
          <div className="flex flex-col items-center justify-center">
            {/* Diamond Ring SVG */}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5 text-[#8A7A68]">
              <circle cx="12" cy="14" r="5" />
              <path d="M12 9l-3-3.5h6L12 9z" />
              <path d="M9 5.5l3-3.5 3 3.5" />
            </svg>
            <span className="text-[7.5px] font-sans font-bold tracking-widest text-[#8A7A68] mt-1.5 uppercase">Wedding</span>
          </div>
        );
      case 'bridegroom':
        return (
          <div className="flex flex-col items-center justify-center">
            {/* Heart SVG */}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5 text-[#C57A5D]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
            <span className="text-[7.5px] font-sans font-bold tracking-widest text-[#C57A5D] mt-1 uppercase">Love</span>
          </div>
        );
      case 'footer':
        return (
          <div className="flex flex-col items-center justify-center">
            {/* Mail SVG */}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5 text-[#9E4C41]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
            <span className="text-[7.5px] font-sans font-bold tracking-widest text-[#9E4C41] mt-1 uppercase">Join</span>
          </div>
        );
      default:
        return (
          <div className="w-2.5 h-2.5 bg-[#9E4C41] rounded-full transition-transform duration-300"></div>
        );
    }
  };

  // Determine container classes based on context
  const getContainerStyle = () => {
    if (cursorType === 'default') {
      return 'w-6 h-6 border border-[#9E4C41]/35 bg-white/20';
    }
    
    // Customized colors for section hover badges
    let themeBg = 'bg-white/95';
    let themeBorder = 'border-[#9E4C41]/20';
    
    if (cursorType === 'mindset') {
      themeBg = 'bg-[#F4ECFB]/95';
      themeBorder = 'border-[#594B73]/20';
    } else if (cursorType === 'lifestyle') {
      themeBg = 'bg-[#EBF7EE]/95';
      themeBorder = 'border-[#3A5F43]/20';
    } else if (cursorType === 'wedding') {
      themeBg = 'bg-[#FAF5F0]/95';
      themeBorder = 'border-[#8A7A68]/20';
    } else if (cursorType === 'bridegroom') {
      themeBg = 'bg-[#FFF2EC]/95';
      themeBorder = 'border-[#C57A5D]/20';
    }

    return `w-[72px] h-[72px] ${themeBg} ${themeBorder} shadow-lg backdrop-blur-[3px] scale-100`;
  };

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center"
      style={{
        willChange: 'transform',
        // Hide standard system cursor when hovering over context areas
        cursor: 'none'
      }}
    >
      <div
        className={`rounded-full flex items-center justify-center transition-all duration-300 ease-out border ${getContainerStyle()}`}
      >
        {renderCursorIcon()}
      </div>
    </div>
  );
};
