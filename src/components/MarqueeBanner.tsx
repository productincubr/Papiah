import React from 'react';

export const MarqueeBanner: React.FC = () => {
  return (
    <div className="w-full bg-[#CBD83B] overflow-hidden py-2 border-b border-papiah-dark/5 select-none relative z-50">
      <div className="flex whitespace-nowrap w-max animate-marquee">
        {/* Loop part 1 */}
        <div className="flex items-center gap-4 px-2">
          <span className="text-[10px] md:text-xs font-semibold tracking-[0.15em] text-[#2E3327]">
            FREE SHIPPING ON THOUGHTFUL PAPER TOOLS ABOVE ₹999
          </span>
          <span className="text-[#2E3327]/30 select-none font-light">•</span>
          <span className="text-[10px] md:text-xs font-semibold tracking-[0.15em] text-[#2E3327]">
            DESIGNED FOR EVERYDAY CLARITY, CREATIVITY & CALM
          </span>
          <span className="text-[#2E3327]/30 select-none font-light">•</span>
          <span className="text-[10px] md:text-xs font-semibold tracking-[0.15em] text-[#2E3327]">
            FREE SHIPPING ON THOUGHTFUL PAPER TOOLS ABOVE ₹999
          </span>
          <span className="text-[#2E3327]/30 select-none font-light">•</span>
          <span className="text-[10px] md:text-xs font-semibold tracking-[0.15em] text-[#2E3327]">
            DESIGNED FOR EVERYDAY CLARITY, CREATIVITY & CALM
          </span>
          <span className="text-[#2E3327]/30 select-none font-light">•</span>
        </div>
        {/* Loop part 2 (exact duplicate for seamless joining) */}
        <div className="flex items-center gap-4 px-2">
          <span className="text-[10px] md:text-xs font-semibold tracking-[0.15em] text-[#2E3327]">
            FREE SHIPPING ON THOUGHTFUL PAPER TOOLS ABOVE ₹999
          </span>
          <span className="text-[#2E3327]/30 select-none font-light">•</span>
          <span className="text-[10px] md:text-xs font-semibold tracking-[0.15em] text-[#2E3327]">
            DESIGNED FOR EVERYDAY CLARITY, CREATIVITY & CALM
          </span>
          <span className="text-[#2E3327]/30 select-none font-light">•</span>
          <span className="text-[10px] md:text-xs font-semibold tracking-[0.15em] text-[#2E3327]">
            FREE SHIPPING ON THOUGHTFUL PAPER TOOLS ABOVE ₹999
          </span>
          <span className="text-[#2E3327]/30 select-none font-light">•</span>
          <span className="text-[10px] md:text-xs font-semibold tracking-[0.15em] text-[#2E3327]">
            DESIGNED FOR EVERYDAY CLARITY, CREATIVITY & CALM
          </span>
          <span className="text-[#2E3327]/30 select-none font-light">•</span>
        </div>
      </div>
    </div>
  );
};
