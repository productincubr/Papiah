import React from 'react';
import { useCursor } from '../context/CursorContext';
import IconClarity from '../assets/3rd_1.png';
import IconSlowLiving from '../assets/3rd_2.png';
import IconThoughtful from '../assets/3rd_3.png';
import IconPersonal from '../assets/3rd_4.png';

export const PhilosophySection: React.FC = () => {
  const { setCursorType } = useCursor();

  const PhilosophyItem: React.FC<{ iconSrc: string; title: string; description: string }> = ({ iconSrc, title, description }) => (
    <div className="flex items-center gap-5 mx-10 md:mx-16 select-none shrink-0">
      <div className="w-20 h-20 rounded-full bg-white/70 border border-white/90 shadow-[0_6px_16px_rgba(0,0,0,0.02)] flex items-center justify-center overflow-hidden transition-transform duration-300 hover:scale-105 shrink-0">
        <img 
          src={iconSrc} 
          alt={title} 
          className="w-16 h-16 object-contain opacity-95" 
          style={{ mixBlendMode: 'multiply' }}
        />
      </div>
      <div className="flex flex-col items-start justify-center text-left max-w-[280px] md:max-w-[320px] whitespace-normal">
        <span className="font-serif text-[18px] md:text-[22px] text-[#2E3A22] font-semibold tracking-wide leading-snug">
          {title}
        </span>
        <span className="font-sans text-[12px] md:text-[13px] text-[#2E3A22]/75 font-light leading-relaxed mt-1 block">
          {description}
        </span>
      </div>
    </div>
  );

  const Separator = () => (
    <span className="text-[#C96B4B]/40 font-serif text-[20px] md:text-[24px] select-none mx-2">✦</span>
  );

  const items = [
    { 
      icon: IconClarity, 
      title: "Designed for Clarity",
      description: "Tools that help thoughts feel lighter, calmer, and easier to return to."
    },
    { 
      icon: IconSlowLiving, 
      title: "Slow Living Rituals",
      description: "Small daily pauses that make planning feel intentional, not pressured."
    },
    { 
      icon: IconThoughtful, 
      title: "Thoughtful Pages",
      description: "Layouts created to support reflection, creativity, and mindful routines."
    },
    { 
      icon: IconPersonal, 
      title: "Made to Feel Personal",
      description: "Journals that feel intimate, useful, and beautiful in everyday life."
    },
  ];

  return (
    <section 
      className="w-full relative z-40 select-none border-y border-[#2E3A22]/10 py-8 bg-[#EEDDC8]/30 backdrop-blur-[4px]"
      onMouseEnter={() => setCursorType('philosophy')}
      onMouseLeave={() => setCursorType('default')}
    >
      <div className="w-full overflow-hidden relative select-none">
        <div className="flex whitespace-nowrap w-max animate-marquee-cards items-center">
          {/* Group 1 */}
          <div className="flex items-center">
            {items.map((item, idx) => (
              <React.Fragment key={`g1-${idx}`}>
                <PhilosophyItem iconSrc={item.icon} title={item.title} description={item.description} />
                <Separator />
              </React.Fragment>
            ))}
          </div>
          {/* Group 2 (Duplicate for seamless infinite scrolling) */}
          <div className="flex items-center">
            {items.map((item, idx) => (
              <React.Fragment key={`g2-${idx}`}>
                <PhilosophyItem iconSrc={item.icon} title={item.title} description={item.description} />
                <Separator />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
