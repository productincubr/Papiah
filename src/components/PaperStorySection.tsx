import React from 'react';
import { useCursor } from '../context/CursorContext';
import s10 from '../assets/s10.webp';

export const PaperStorySection: React.FC = () => {
  const { setCursorType } = useCursor();

  return (
    <section 
      id="paper-story-section"
      className="w-full bg-[#F2EDE4] relative z-10 select-none border-b border-papiah-grid/40 py-20 md:py-24 overflow-hidden"
      onMouseEnter={() => setCursorType('philosophy')}
      onMouseLeave={() => setCursorType('default')}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Stacks of Handmade Paper Image */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-[480px] rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(110,135,165,0.06)] border border-white/60 bg-white p-2.5 transition-all duration-500">
              <div className="rounded-[24px] overflow-hidden aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5]">
                <img 
                  src={s10} 
                  alt="Inspection of stacked handmade paper sheets" 
                  className="w-full h-full object-cover transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Narrative / Story copy */}
          <div className="lg:col-span-6 flex flex-col text-left justify-center">
            <span className="text-[10px] md:text-xs font-sans font-bold tracking-[0.25em] text-gray-400 block uppercase mb-4">
              PAPER WITH A PAST
            </span>
            
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-papiah-dark font-light tracking-tight mb-8 leading-tight max-w-md">
              Every Papiah page has lived another life.
            </h2>
            
            <div className="w-12 h-[1.5px] bg-[#C5B09E] mb-8"></div>
            
            <div className="flex flex-col gap-6 mb-10 max-w-[460px]">
              <p className="text-sm md:text-base text-gray-500 font-sans font-light leading-relaxed">
                Before becoming a journal, our pages begin as discarded cotton from India's hosiery industry.
              </p>
              
              <p className="text-sm md:text-base text-gray-500 font-sans font-light leading-relaxed">
                Through the hands of skilled artisans, those forgotten fibres are transformed into beautiful handmade paper designed for reflection, creativity and mindful living.
              </p>
            </div>
            
            {/* Elegant Blue Cursive Signature */}
            <div className="flex flex-col text-left mt-2">
              <span className="font-handwriting text-3xl md:text-4xl text-[#84AAD7] leading-tight select-none">
                Nothing wasted.
              </span>
              <span className="font-handwriting text-3xl md:text-4xl text-[#84AAD7] leading-none select-none mt-1">
                Everything reimagined. <span className="text-2xl md:text-3xl ml-0.5 inline-block opacity-90">♡</span>
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
