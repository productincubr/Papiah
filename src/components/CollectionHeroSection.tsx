import React from 'react';
import collection1 from '../assets/collection_1.svg';

export const CollectionHeroSection: React.FC = () => {
  return (
    <section className="w-full bg-[#FAF9F6] relative overflow-hidden paper-texture pt-16 md:pt-24 pb-[20px] border-b border-papiah-grid/40">
      {/* Background decoration matching brand theme */}
      <div className="absolute inset-0 bg-grid opacity-[0.06] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 xl:gap-20 items-center">
          
          {/* LEFT CONTENT AREA (50%) */}
          <div className="flex flex-col text-left">
            {/* Top Navigation Path / Breadcrumb */}
            <nav className="flex items-center gap-2 text-[10px] md:text-[11px] font-sans font-bold tracking-[0.25em] text-[#A8A6A0] uppercase mb-8 md:mb-10 select-none">
              <a href="/" className="hover:text-papiah-dark transition-colors duration-200">HOME</a>
              <span className="text-gray-300">/</span>
              <a href="/shop" className="hover:text-papiah-dark transition-colors duration-200">SHOP</a>
              <span className="text-gray-300">/</span>
              <span className="text-papiah-dark">ALL PRODUCTS</span>
            </nav>

            {/* Main Heading and Floating Note Container */}
            <div className="relative">
              {/* Main Heading */}
              <h1 className="font-playfair text-[52px] sm:text-[76px] xl:text-[88px] leading-[1.08] text-papiah-dark font-light tracking-tight select-none mb-6 md:mb-10">
                Shop the <br />
                <span className="md:inline-flex md:items-center md:gap-5 xl:gap-6">
                  Collection
                </span>
              </h1>

              {/* Torn Paper Note Container */}
              <div className="relative inline-block mt-2 mb-2 md:mb-0 md:absolute md:-right-[260px] md:top-12 z-20">
                <div 
                  className="relative rotate-[1.5deg] shadow-[0_12px_28px_rgba(0,0,0,0.05)] bg-[#F7F2E8] px-5 py-5 pr-8 min-w-[230px] max-w-[250px] text-left shrink-0 select-none transform transition-all duration-300 hover:rotate-0 hover:scale-[1.02] hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] cursor-default" 
                  style={{ 
                    clipPath: 'polygon(0% 3%, 8% 0%, 15% 4%, 22% 1%, 30% 3%, 38% 0%, 45% 4%, 52% 1%, 60% 3%, 68% 0%, 75% 4%, 82% 1%, 90% 3%, 98% 0%, 100% 4%, 99% 15%, 100% 30%, 98% 45%, 100% 60%, 99% 75%, 100% 90%, 98% 97%, 92% 100%, 85% 97%, 78% 99%, 70% 96%, 63% 98%, 55% 95%, 48% 97%, 40% 95%, 33% 98%, 25% 96%, 18% 99%, 10% 96%, 3% 99%, 0% 95%, 1% 80%, 0% 65%, 2% 50%, 0% 35%, 1% 15%)' 
                  }}
                >
                  {/* Pin on top-left */}
                  <div className="absolute top-2.5 left-2.5 w-4.5 h-4.5 rounded-full bg-[#D2C2F8] border border-[#C0B0EC] shadow-[0_1.5px_3px_rgba(0,0,0,0.12)] flex items-center justify-center z-10">
                    <span className="text-[7px] text-[#5A4B80] leading-none select-none">♥</span>
                  </div>

                  {/* Translucent Washi Tape on top-right */}
                  <div 
                    className="absolute -top-3.5 -right-3.5 w-14 h-5.5 bg-[#E4D5FC]/55 backdrop-blur-[0.5px] z-10 origin-center rotate-[28deg] shadow-[0_1px_2px_rgba(0,0,0,0.03)] border-l border-r border-white/20"
                    style={{
                      clipPath: 'polygon(4% 0%, 96% 0%, 100% 20%, 97% 50%, 100% 80%, 96% 100%, 4% 100%, 0% 80%, 3% 50%, 0% 20%)'
                    }}
                  />

                  {/* Note Content */}
                  <div className="font-sans text-[11px] text-[#4C4B49] leading-[1.3] tracking-wide mt-2">
                    <p className="font-light">let's make your</p>
                    <p className="font-light">
                      everyday a little <span className="font-handwriting text-xl text-[#8E76B8] inline-block ml-1 rotate-[-2deg] font-normal leading-none">softer</span>
                    </p>
                    
                    <div className="w-8 h-[1px] bg-[#D8D3C9] my-2"></div>
                    
                    <p className="text-[9.5px] text-gray-500 font-light leading-relaxed max-w-[170px] italic">
                      thoughtful tools, made for<br />
                      real life and gentle routines.
                    </p>
                  </div>

                  {/* Leaf sprig doodle on bottom right */}
                  <div className="absolute right-3.5 bottom-2.5 text-[#A699BC]/40">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8">
                      <path d="M4 20C4 20 8 16 12 15C16 14 20 16 20 16" strokeDasharray="1 1" />
                      <path d="M12 15C11 12 8 10 8 10C8 10 10 11 12 15Z" fill="currentColor" fillOpacity="0.06" />
                      <path d="M15 14.5C16.5 12 18 11 18 11C18 11 17 12.5 15 14.5Z" fill="currentColor" fillOpacity="0.06" />
                      <path d="M9 17C7.5 15.5 6 15 6 15C6 15 7 16 9 17Z" fill="currentColor" fillOpacity="0.06" />
                    </svg>
                  </div>
                </div>

                {/* Purple Swirl Doodle */}
                <div className="absolute -right-10 bottom-6 text-[#8E76B8]/50 pointer-events-none select-none">
                  <svg viewBox="0 0 40 30" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-10 h-8">
                    <path d="M4 14 C12 6, 26 5, 34 12 C37 15, 35 22, 29 21 C23 20, 19 12, 25 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* CTA AREA: Rounded buttons with high hierarchy and spacing (Desktop only) */}
            <div className="hidden md:flex flex-row items-center gap-4 mt-16 lg:mt-20">
              {/* Primary Button */}
              <a 
                href="#shop"
                className="bg-[#CBD83B] hover:bg-[#b8c634] active:scale-[0.98] text-[#2E3327] font-sans font-bold tracking-[0.2em] text-[11px] md:text-[12px] h-[54px] px-8 md:px-10 rounded-[12px] shadow-[0_6px_20px_rgba(203,216,59,0.2)] hover:shadow-[0_8px_25px_rgba(203,216,59,0.35)] transition-all duration-300 uppercase cursor-pointer flex items-center justify-center whitespace-nowrap"
              >
                Shop the collection
              </a>

              {/* Secondary Button */}
              <a 
                href="#find-journal"
                className="bg-transparent hover:bg-gray-50 active:scale-[0.98] text-papiah-dark border border-papiah-dark/40 font-sans font-bold tracking-[0.2em] text-[11px] md:text-[12px] h-[54px] px-8 md:px-10 rounded-[12px] transition-all duration-300 uppercase cursor-pointer flex items-center justify-center whitespace-nowrap"
              >
                Find your journal
              </a>
            </div>
          </div>

          {/* RIGHT VISUAL AREA (50%) */}
          <div className="w-full relative">
            {/* Ambient subtle glow matching color palette */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#EAD9FA]/20 to-[#CBD83B]/10 blur-2xl rounded-full opacity-60 pointer-events-none"></div>

            {/* Premium product photography container */}
            <div className="w-full aspect-[1.1] sm:aspect-[1.2] lg:aspect-auto lg:h-[460px] xl:h-[500px] rounded-[28px] overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.04)] border border-[#E8E7E3]/50 relative select-none bg-white">
              <img 
                src={collection1} 
                alt="Luxury Stationery and Journals Collection" 
                className="w-full h-full object-cover object-center transform hover:scale-[1.015] transition-transform duration-700 ease-out"
                loading="eager"
              />
              
              {/* Red sealing wax target dot on top-right of image container */}
              <div className="absolute top-4 right-4 w-4.5 h-4.5 rounded-full bg-[#A05C55] border border-white/80 shadow-[0_2px_4px_rgba(0,0,0,0.15)] flex items-center justify-center z-15">
                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
              </div>
            </div>

            {/* Mobile CTA Area (Mobile only) */}
            <div className="flex flex-col items-stretch gap-4 mt-8 md:hidden">
              {/* Primary Button */}
              <a 
                href="#shop"
                className="bg-[#CBD83B] hover:bg-[#b8c634] active:scale-[0.98] text-[#2E3327] font-sans font-bold tracking-[0.2em] text-[11px] h-[54px] rounded-[12px] shadow-[0_6px_20px_rgba(203,216,59,0.2)] hover:shadow-[0_8px_25px_rgba(203,216,59,0.35)] transition-all duration-300 uppercase cursor-pointer flex items-center justify-center"
              >
                Shop the collection
              </a>

              {/* Secondary Button */}
              <a 
                href="#find-journal"
                className="bg-transparent hover:bg-gray-50 active:scale-[0.98] text-papiah-dark border border-papiah-dark/40 font-sans font-bold tracking-[0.2em] text-[11px] h-[54px] rounded-[12px] transition-all duration-300 uppercase cursor-pointer flex items-center justify-center"
              >
                Find your journal
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
