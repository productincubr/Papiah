import React from 'react';
import { useCursor } from '../context/CursorContext';
import s11 from '../assets/s11_nobg.webp';

export const FibreToFeelingSection: React.FC = () => {
  const { setCursorType } = useCursor();

  return (
    <section 
      className="w-full bg-[#F2EDE4] relative z-10 select-none border-b border-papiah-grid/40 py-20 md:py-24 overflow-hidden"
      onMouseEnter={() => setCursorType('philosophy')}
      onMouseLeave={() => setCursorType('default')}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Narrative Content & List */}
          <div className="lg:col-span-3 flex flex-col text-left justify-center">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-papiah-dark font-light tracking-tight mb-10 leading-tight">
              From <span className="font-handwriting text-[1.1em] text-[#84AAD7] italic mr-1">fibre</span> <br />
              to <span className="font-handwriting text-[1.1em] text-[#84AAD7] italic mr-1">feeling</span>.
            </h2>
            
            {/* Step list with dots */}
            <div className="flex flex-col gap-5 mb-10 pl-1">
              <div className="flex items-center gap-4 text-sm md:text-base text-gray-500 font-sans font-light transition-transform duration-300 hover:translate-x-1 cursor-default">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5B09E]"></span>
                Cotton waste.
              </div>
              <div className="flex items-center gap-4 text-sm md:text-base text-gray-500 font-sans font-light transition-transform duration-300 hover:translate-x-1 cursor-default">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5B09E]"></span>
                Handmade paper.
              </div>
              <div className="flex items-center gap-4 text-sm md:text-base text-gray-500 font-sans font-light transition-transform duration-300 hover:translate-x-1 cursor-default">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5B09E]"></span>
                Seed-infused pages.
              </div>
              <div className="flex items-center gap-4 text-sm md:text-base text-gray-500 font-sans font-light transition-transform duration-300 hover:translate-x-1 cursor-default">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5B09E]"></span>
                Thoughtfully crafted journals.
              </div>
            </div>

            <div className="w-12 h-[1.5px] bg-[#C5B09E] mb-8"></div>
            
            <p className="text-base md:text-lg text-gray-500 font-sans font-light italic leading-relaxed max-w-[320px]">
              A circular story told through texture.
            </p>
          </div>

          {/* Right Column: Composite Process Image & Horizontal Flow Chart */}
          <div className="lg:col-span-9 flex flex-col justify-center gap-10">
            
            {/* Process Image (Background card wrapper removed, scaled up, transparent bg) */}
            <div className="w-full transition-transform duration-700 flex justify-center">
              <img 
                src={s11} 
                alt="Handmade paper process: Cotton waste, handmade paper, drying with care, and finished journals" 
                className="w-full h-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.04)] md:drop-shadow-[0_20px_45px_rgba(110,135,165,0.1)]"
                loading="lazy"
              />
            </div>

            {/* Horizontal Flow Chart */}
            <div className="flex items-center justify-between w-full bg-white/40 border border-white/60 p-4 md:p-6 rounded-[20px] backdrop-blur-xs select-none">
              
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-5 h-5 md:w-6 md:h-6 text-[#C5B09E] mb-1.5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span className="text-[7.5px] md:text-[9px] font-sans font-bold tracking-wider text-gray-400 uppercase">COTTON SCRAPS</span>
              </div>

              <span className="text-gray-300 text-base md:text-lg">→</span>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" className="w-5 h-5 md:w-6 md:h-6 text-[#C5B09E] mb-1.5">
                  <circle cx="12" cy="12" r="9" />
                </svg>
                <span className="text-[7.5px] md:text-[9px] font-sans font-bold tracking-wider text-gray-400 uppercase">COTTON PULP</span>
              </div>

              <span className="text-gray-300 text-base md:text-lg">→</span>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" className="w-5 h-5 md:w-6 md:h-6 text-[#C5B09E] mb-1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                </svg>
                <span className="text-[7.5px] md:text-[9px] font-sans font-bold tracking-wider text-gray-400 uppercase">HANDMADE PAPER</span>
              </div>

              <span className="text-gray-300 text-base md:text-lg">→</span>

              {/* Step 4 */}
              <div className="flex flex-col items-center text-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-5 h-5 md:w-6 md:h-6 text-[#C5B09E] mb-1.5">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
                <span className="text-[7.5px] md:text-[9px] font-sans font-bold tracking-wider text-gray-400 uppercase">PAPIAH JOURNAL</span>
              </div>

              <span className="text-gray-300 text-base md:text-lg">→</span>

              {/* Step 5 */}
              <div className="flex flex-col items-center text-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-5 h-5 md:w-6 md:h-6 text-[#C5B09E] mb-1.5">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
                <span className="text-[7.5px] md:text-[9px] font-sans font-bold tracking-wider text-gray-400 uppercase">YOUR STORY</span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
