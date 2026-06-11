import React from 'react';

export const LoremIpsumMarquee: React.FC = () => {
  const loremText = "LOREM IPSUM DOLOR SIT AMET • CONSECTETUR ADIPISCING ELIT • SED DO EIUSMOD TEMPOR • UT LABORE ET DOLORE MAGNA ALIQUA";

  return (
    <div 
      className="w-full overflow-hidden py-6 md:py-8 border-b border-white/5 select-none relative z-20"
      style={{
        background: 'linear-gradient(90deg, #7E8900 44%, #1B1C12 80%)'
      }}
    >
      <div className="flex whitespace-nowrap w-max animate-marquee-slow">
        {/* Loop part 1 */}
        <div className="flex items-center gap-8 px-4">
          <span className="text-sm md:text-base font-medium tracking-[0.2em] text-[#FAF9F6]">
            {loremText}
          </span>
          <span className="text-[#FAF9F6]/40 select-none font-light">•</span>
          <span className="text-sm md:text-base font-medium tracking-[0.2em] text-[#FAF9F6]">
            {loremText}
          </span>
          <span className="text-[#FAF9F6]/40 select-none font-light">•</span>
          <span className="text-sm md:text-base font-medium tracking-[0.2em] text-[#FAF9F6]">
            {loremText}
          </span>
          <span className="text-[#FAF9F6]/40 select-none font-light">•</span>
        </div>
        {/* Loop part 2 (exact duplicate for seamless joining) */}
        <div className="flex items-center gap-8 px-4">
          <span className="text-sm md:text-base font-medium tracking-[0.2em] text-[#FAF9F6]">
            {loremText}
          </span>
          <span className="text-[#FAF9F6]/40 select-none font-light">•</span>
          <span className="text-sm md:text-base font-medium tracking-[0.2em] text-[#FAF9F6]">
            {loremText}
          </span>
          <span className="text-[#FAF9F6]/40 select-none font-light">•</span>
          <span className="text-sm md:text-base font-medium tracking-[0.2em] text-[#FAF9F6]">
            {loremText}
          </span>
          <span className="text-[#FAF9F6]/40 select-none font-light">•</span>
        </div>
      </div>
    </div>
  );
};
