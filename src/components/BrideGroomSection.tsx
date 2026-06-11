import React from 'react';
import { useCursor } from '../context/CursorContext';
import s8_1 from '../assets/s8_1.jpg';
import s8_2 from '../assets/s8_2.jpg';

export const BrideGroomSection: React.FC = () => {
  const { setCursorType } = useCursor();
  return (
    <section 
      className="w-full bg-[#FAF9F6] relative z-10 select-none border-b border-papiah-grid/40"
      onMouseEnter={() => setCursorType('bridegroom')}
      onMouseLeave={() => setCursorType('default')}
    >
      <div className="max-w-7xl mx-auto pt-20 pb-20 px-4 md:px-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
        
        {/* Left Card: Bride-to-Be Journal */}
        <div className="bg-white border border-gray-100 rounded-[28px] shadow-[0_8px_30px_rgba(0,0,0,0.02)] flex flex-col items-center text-center p-6 pb-10 transition-all duration-300 hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)]">
          {/* Image */}
          <div className="w-full aspect-square overflow-hidden rounded-[20px] mb-8">
            <img 
              src={s8_1} 
              alt="Bride-to-Be Journal" 
              className="w-full h-full object-cover transition-transform duration-700"
            />
          </div>
          
          {/* Badge Icon (Heart) */}
          <div className="w-12 h-12 rounded-full bg-[#E5B5A3]/25 text-[#C57A5D] flex items-center justify-center mb-5">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          
          {/* Title */}
          <h3 className="font-serif text-2xl md:text-3xl text-papiah-dark font-medium mb-3">
            Bride-to-Be Journal
          </h3>
          
          {/* Underline */}
          <div className="w-10 h-[1.5px] bg-[#C5B09E] mb-6"></div>
          
          {/* Description */}
          <p className="text-xs md:text-sm text-gray-500 font-sans font-light leading-relaxed mb-8 max-w-[280px]">
            Plan your big day, dreams, and new beginnings. From &ldquo;yes&rdquo; to &ldquo;i do&rdquo; &ndash; cherish every moment.
          </p>
          
          {/* Button */}
          <button className="w-full max-w-[280px] bg-[#CBD83B] hover:bg-[#b8c634] active:scale-98 text-[#2E3327] font-sans font-bold tracking-[0.2em] text-[11px] md:text-[12px] py-3.5 !rounded-none shadow-xs hover:shadow-md transition-all duration-200 uppercase cursor-pointer flex items-center justify-center">
            Plan your dream day
          </button>
        </div>

        {/* Right Card: Groom Journal */}
        <div className="bg-white border border-gray-100 rounded-[28px] shadow-[0_8px_30px_rgba(0,0,0,0.02)] flex flex-col items-center text-center p-6 pb-10 transition-all duration-300 hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] relative">
          
          {/* Floating Badge "K" */}
          <div className="absolute left-[-22px] top-[50%] w-11 h-11 rounded-full bg-[#362720] text-white flex items-center justify-center font-serif text-lg shadow-md z-20 transition-all cursor-default">
            K
          </div>
          
          {/* Image */}
          <div className="w-full aspect-square overflow-hidden rounded-[20px] mb-8">
            <img 
              src={s8_2} 
              alt="Groom Journal" 
              className="w-full h-full object-cover transition-transform duration-700"
            />
          </div>
          
          {/* Badge Icon (Bowtie) */}
          <div className="w-12 h-12 rounded-full bg-[#8C927D]/25 text-[#6B715C] flex items-center justify-center mb-5">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M5 6.5c-2.48 0-4.5 2.02-4.5 4.5s2.02 4.5 4.5 4.5c1.54 0 2.89-.78 3.7-1.95L12 12l3.3 1.55c.81 1.17 2.16 1.95 3.7 1.95 2.48 0 4.5-2.02 4.5-4.5s-2.02-4.5-4.5-4.5c-1.54 0-2.89.78-3.7 1.95L12 12 8.7 10.45c-.81-1.17-2.16-1.95-3.7-1.95z" />
              <circle cx="12" cy="12" r="2.5" />
            </svg>
          </div>
          
          {/* Title */}
          <h3 className="font-serif text-2xl md:text-3xl text-papiah-dark font-medium mb-3">
            Groom Journal
          </h3>
          
          {/* Underline */}
          <div className="w-10 h-[1.5px] bg-[#C5B09E] mb-6"></div>
          
          {/* Description */}
          <p className="text-xs md:text-sm text-gray-500 font-sans font-light leading-relaxed mb-8 max-w-[280px]">
            Prepare for the big day and everything that comes after. Thoughts, goals, and memories &ndash; all in one place.
          </p>
          
          {/* Button */}
          <button className="w-full max-w-[280px] bg-[#CBD83B] hover:bg-[#b8c634] active:scale-98 text-[#2E3327] font-sans font-bold tracking-[0.2em] text-[11px] md:text-[12px] py-3.5 !rounded-none shadow-xs hover:shadow-md transition-all duration-200 uppercase cursor-pointer flex items-center justify-center">
            Prepare with purpose
          </button>
        </div>

      </div>
    </div>
  </section>
  );
};
