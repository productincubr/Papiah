import React from 'react';

interface PhilosophyCardProps {
  iconSrc: string;
  bgImageSrc?: string;
  title: string;
  description: string;
}

export const PhilosophyCard: React.FC<PhilosophyCardProps> = ({
  iconSrc,
  bgImageSrc,
  title,
  description
}) => {
  return (
    <div className="flex flex-col items-center text-center w-[250px] sm:w-[270px] md:w-[290px] h-[360px] sm:h-[380px] md:h-[400px] justify-between p-6 sm:p-8 md:p-10 rounded-[32px] bg-black/[0.08] border border-white/45 shadow-[0_12px_40px_rgba(0,0,0,0.02)] backdrop-blur-[16px] group flex-shrink-0 px-6 whitespace-normal transition-all duration-350 hover:bg-black/[0.12] hover:border-white/55 hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] cursor-default">
      
      {/* Circle glass container for the icon */}
      <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white/45 border border-white/60 shadow-[0_8px_24px_rgba(0,0,0,0.03),inset_0_2px_4px_rgba(255,255,255,0.6)] backdrop-blur-sm flex items-center justify-center mb-4 relative overflow-hidden transition-all duration-500 group-hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)]">
        {bgImageSrc && (
          <img 
            src={bgImageSrc} 
            alt="" 
            className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale-[10%]" 
          />
        )}
        <img 
          src={iconSrc} 
          alt={title} 
          className="w-18 h-18 sm:w-22 sm:h-22 object-contain opacity-95 relative z-10" 
          style={{ mixBlendMode: 'multiply' }}
        />
      </div>

      {/* Title & Description Container */}
      <div className="flex flex-col items-center flex-grow justify-center mt-2">
        <h3 className="font-serif text-lg sm:text-xl md:text-2xl text-papiah-dark font-medium mb-3 select-none">
          {title}
        </h3>
        <p className="text-[11px] sm:text-xs md:text-sm text-gray-700 font-sans font-light leading-relaxed select-none max-w-[220px]">
          {description}
        </p>
      </div>

    </div>
  );
};
