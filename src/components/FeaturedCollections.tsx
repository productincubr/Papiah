import React, { useState, useRef, useEffect } from 'react';
import { useCursor } from '../context/CursorContext';
import Product1 from '../assets/Product1.webp';
import Product2 from '../assets/Product2.webp';
import Product3 from '../assets/Product3.webp';
import Product4 from '../assets/Product4.webp';
import Product5 from '../assets/Product5.webp';
import Book1 from '../assets/book_1.webp';
import Book2 from '../assets/book_2.webp';
import Book3 from '../assets/book_3.webp';
import Book4 from '../assets/book_4.webp';
import Book5 from '../assets/book_5.webp';
import VideoWebm from '../assets/featured_hover.webm';
import FeaturedBg from '../assets/featured_collections_bg.webp';

interface ProductData {
  id: number;
  title: string;
  desc: string;
  price: string;
  image: string;
  coverImage: string;
}

export const FeaturedCollections: React.FC = () => {
  const { setCursorType } = useCursor();
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);
  const cardVideoRef = useRef<HTMLVideoElement>(null);

  const [featuredProducts] = useState<ProductData[]>([
    {
      id: 1,
      title: "Daily Joy Journal",
      desc: "Capture little happy moments, gratitude notes, and everyday wins to make your day feel lighter.",
      price: "₹300",
      image: Product1,
      coverImage: Book1,
    },
    {
      id: 2,
      title: "The Clarity Journal",
      desc: "Organize your thoughts, clear mental clutter, and find direction when life feels overwhelming.",
      price: "₹300",
      image: Product2,
      coverImage: Book2,
    },
    {
      id: 3,
      title: "Content Ideas Journal",
      desc: "Plan reels, captions, campaigns, and creative ideas in one place before they disappear.",
      price: "₹300",
      image: Product3,
      coverImage: Book3,
    },
    {
      id: 4,
      title: "Pet Care Planner",
      desc: "Track your pet's meals, grooming, vet visits, medicines, and daily care routine with ease.",
      price: "₹300",
      image: Product4,
      coverImage: Book4,
    },
    {
      id: 5,
      title: "Recipe Keeper",
      desc: "Save your favorite recipes, family dishes, ingredients, and cooking notes in one beautiful place.",
      price: "₹300",
      image: Product5,
      coverImage: Book5,
    },
  ]);

  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const children = carouselRef.current.children;
      let closestIndex = 0;
      let minDistance = Infinity;
      
      for (let i = 0; i < children.length; i++) {
        const child = children[i] as HTMLElement;
        const distance = Math.abs(child.offsetLeft - scrollLeft - (clientWidth - child.clientWidth) / 2);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = i;
        }
      }
      if (closestIndex !== activeSlide && closestIndex >= 0 && closestIndex < featuredProducts.length) {
        setActiveSlide(closestIndex);
      }
    }
  };

  useEffect(() => {
    if (cardVideoRef.current) {
      if (hoveredProductId === 1) {
        cardVideoRef.current.play().catch((err) => {
          console.warn("Card video failed to play:", err);
        });
      } else {
        cardVideoRef.current.pause();
        cardVideoRef.current.currentTime = 0;
      }
    }
  }, [hoveredProductId]);

  return (
    <section 
      className="w-full relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${FeaturedBg})` }}
      onMouseEnter={() => setCursorType('featured')}
      onMouseLeave={() => setCursorType('default')}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />

      <div className="max-w-7xl mx-auto pt-20 pb-24 px-4 md:px-10 relative z-10">
        
        {/* Section Header */}
        <div className="relative mb-12 select-none">
          {/* Top small text */}
          <div className="text-center mb-2 flex items-center justify-center gap-1.5">
            <span className="text-[10px] md:text-[11px] font-sans font-medium tracking-[0.25em] text-gray-500 uppercase">
              Designed for clarity. creativity. calm.
            </span>
            <span className="text-[11px] text-gray-400">🤍</span>
          </div>

          <div className="relative flex items-center justify-center min-h-[50px] px-12">
            {/* Left Sparkles */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 text-[#84AAD7] opacity-80 hidden md:block">
              <svg className="w-9 h-9" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6L14.5 13L21.5 15.5L14.5 18L12 25L9.5 18L2.5 15.5L9.5 13L12 6Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M26 18L27.2 21.5L30.7 22.7L27.2 23.9L26 27.4L24.8 23.9L21.3 22.7L24.8 21.5L26 18Z" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>

            {/* Main Title */}
            <h2 className="font-serif text-3xl md:text-[44px] text-papiah-dark font-light tracking-wider text-center">
              FEATURED COLLECTIONS
            </h2>

            {/* Right See All */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2">
              <a 
                href="#see-all" 
                className="text-[11px] md:text-[12px] font-sans font-bold tracking-widest text-gray-700 hover:text-papiah-dark uppercase relative group pb-1.5"
              >
                See All
                {/* Wavy Underline */}
                <svg className="absolute left-0 right-0 -bottom-1 w-full h-1 text-[#84AAD7] opacity-90 transition-transform duration-300 group-hover:scale-x-105" viewBox="0 0 100 10" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 7 C 20 2, 30 12, 50 7 C 70 2, 80 12, 100 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </a>
            </div>
          </div>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-4 max-w-md mx-auto mt-4">
            <div className="h-[1px] flex-1 bg-gray-200/80"></div>
            <div className="text-[#84AAD7] opacity-85">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="currentColor" />
              </svg>
            </div>
            <div className="h-[1px] flex-1 bg-gray-200/80"></div>
          </div>
        </div>

        {/* Grid and Browse container */}
        <div className="relative">
          {/* Floating BROWSE Badge — smaller, lower opacity, further from cards */}
          <div className="absolute left-[40%] top-[200px] xl:top-[220px] -translate-x-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col items-center justify-center w-[58px] h-[58px] bg-white/80 rounded-full border border-gray-100/70 shadow-[0_4px_14px_rgba(0,0,0,0.04)] cursor-pointer opacity-60 hover:opacity-90 hover:scale-105 transition-all duration-300 group">
            <div className="w-8 h-8 rounded-full bg-[#FAF9F6] flex items-center justify-center mb-0.5 group-hover:bg-[#EAD9FA] transition-colors duration-300">
              <svg className="w-3.5 h-3.5 text-[#9E4C41]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <span className="text-[6.5px] font-sans font-bold tracking-[0.12em] text-[#6C6A65] uppercase">
              BROWSE
            </span>
          </div>

          {/* Collections Container — Carousel on Mobile, Grid on Desktop */}
          <div 
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex flex-row overflow-x-auto md:grid md:grid-cols-3 lg:grid-cols-5 gap-5 lg:gap-6 xl:gap-7 scrollbar-none snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 pb-4 md:pb-0"
          >

            {featuredProducts.map((prod) => (
              <div
                key={prod.id}
                className="w-[245px] shrink-0 snap-center md:w-full md:shrink md:snap-align-none bg-[#FFFFFF] border border-gray-200/40 rounded-[20px] overflow-visible flex flex-col group relative transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.07)] shadow-[0_4px_16px_rgba(0,0,0,0.03)]"
                onMouseEnter={() => setHoveredProductId(prod.id)}
                onMouseLeave={() => setHoveredProductId(null)}
              >
                {/* ── IMAGE ZONE ── */}
                <div className="relative w-full rounded-t-[20px] overflow-hidden">
                  {/* Lifestyle image — 4:5 ratio */}
                  <div className="w-full aspect-[4/5] bg-transparent">
                    {prod.id === 1 ? (
                      <div className="w-full h-full relative">
                        <img
                          src={prod.coverImage}
                          alt={prod.title}
                          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.03] ${
                            hoveredProductId === 1 ? 'opacity-0' : 'opacity-100'
                          }`}
                          loading="lazy"
                        />
                        <video
                          ref={cardVideoRef}
                          src={VideoWebm}
                          muted
                          loop
                          playsInline
                          className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-[1.03] ${
                            hoveredProductId === 1 ? 'opacity-100' : 'opacity-0'
                          }`}
                        />
                      </div>
                    ) : (
                      <img
                        src={prod.coverImage}
                        alt={prod.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                    )}
                  </div>
                </div>

                {/* Thumbnail anchor layer — zero-height div at image bottom edge, no overflow clipping */}
                <div className="relative h-0">
                  <div
                    className="absolute z-20 select-none -top-[46px] right-[16px] md:-top-[54px] md:right-[22px]"
                  >
                    <div
                      className="w-[68px] h-[68px] md:w-[82px] md:h-[82px] rounded-full border-[4px] md:border-[5px] border-white shadow-[0_4px_12px_rgba(0,0,0,0.10)] overflow-hidden transition-transform duration-300 group-hover:scale-105"
                      style={{ backgroundColor: '#F7F1E8' }}
                    >
                      <img
                        src={prod.image}
                        alt={`${prod.title} Lifestyle`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>

                {/* ── CONTENT ZONE ── */}
                <div className="flex flex-col flex-1 px-4 md:px-5 pt-10 md:pt-14 pb-4 md:pb-5">

                  {/* Title — max 2 lines, fixed height, line-height 1.25 */}
                  <h3
                    className="font-serif text-[16px] md:text-[18px] text-[#2C2B29] font-medium group-hover:text-[#9E4C41] transition-colors duration-200 text-left mb-2"
                    style={{ lineHeight: '1.25', minHeight: '2.5em', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                  >
                    {prod.title}
                  </h3>

                  {/* Description — max 2 lines, fixed height, consistent across all cards */}
                  <p
                    className="text-[11px] md:text-[11.5px] text-[#6C6A65]/80 font-light leading-[1.6] text-left mb-5"
                    style={{ minHeight: '3.2em', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                  >
                    {prod.desc}
                  </p>

                  {/* Price + CTA pushed to bottom */}
                  <div className="mt-auto flex flex-col gap-3">
                    <span className="text-[15px] md:text-[17px] text-[#2C2B29] font-bold tracking-wide">
                      {prod.price}
                    </span>

                    <button className="w-full bg-[#CBD83B] hover:bg-[#b8c634] text-[#2E3327] transition-all duration-300 py-[9px] md:py-[11px] text-[10px] md:text-[11px] tracking-[0.2em] font-bold uppercase rounded-[11px] shadow-[0_4px_14px_rgba(203,216,59,0.25)] hover:shadow-[0_6px_22px_rgba(203,216,59,0.4)] select-none cursor-pointer">
                      Add To Cart
                    </button>
                  </div>

                </div>
              </div>
            ))}

          </div>

          {/* Mobile Page Indicator Dots */}
          <div className="flex md:hidden justify-center items-center gap-1.5 mt-5">
            {featuredProducts.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (carouselRef.current) {
                    const children = carouselRef.current.children;
                    if (children[idx]) {
                      (children[idx] as HTMLElement).scrollIntoView({
                        behavior: 'smooth',
                        inline: 'center',
                        block: 'nearest'
                      });
                    }
                  }
                }}
                className={`h-1.5 rounded-full transition-all duration-355 ${
                  idx === activeSlide 
                    ? 'w-6 bg-[#9E4C41]' 
                    : 'w-1.5 bg-[#9E4C41]/20'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom features strip */}
        <div className="mt-20 max-w-5xl mx-auto relative px-4">
          <div className="bg-[#FFFFFF] rounded-[24px] md:rounded-full border border-gray-200/60 shadow-[0_8px_32px_rgba(0,0,0,0.02)] py-8 px-6 md:py-4 md:px-10 relative z-10">
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-4 w-full max-w-[245px] md:max-w-none mx-auto md:mx-0">
              {/* Feature 1 */}
              <div className="flex items-center gap-3.5 w-full md:flex-1 justify-start">
                <div className="text-[#84AAD7] shrink-0">
                  <svg className="w-5.5 h-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22V12" />
                    <path d="M12 12c-4 0-6-2-6-6 0 0 2 0 6 4" />
                    <path d="M12 14c4 0 6-2 6-6 0 0-2 0-6 4" />
                  </svg>
                </div>
                <span className="text-[12.5px] md:text-[13px] text-[#4C4B49] font-sans font-light tracking-wide">
                  Thoughtfully designed
                </span>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-[1px] h-6 bg-gray-200/80"></div>

              {/* Feature 2 */}
              <div className="flex items-center gap-3.5 w-full md:flex-1 justify-start md:justify-center">
                <div className="text-[#84AAD7] shrink-0">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                    <path d="m15 5 4 4" />
                  </svg>
                </div>
                <span className="text-[12.5px] md:text-[13px] text-[#4C4B49] font-sans font-light tracking-wide">
                  Made for real life
                </span>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-[1px] h-6 bg-gray-200/80"></div>

              {/* Feature 3 */}
              <div className="flex items-center gap-3.5 w-full md:flex-1 justify-start md:justify-center">
                <div className="text-[#84AAD7] shrink-0">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </div>
                <span className="text-[12.5px] md:text-[13px] text-[#4C4B49] font-sans font-light tracking-wide">
                  Loved by 15,000+
                </span>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-[1px] h-6 bg-gray-200/80"></div>

              {/* Feature 4 */}
              <div className="flex items-center gap-3.5 w-full md:flex-1 justify-start md:justify-end">
                <div className="text-[#84AAD7] shrink-0">
                  <svg className="w-5.5 h-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" />
                  </svg>
                </div>
                <span className="text-[12.5px] md:text-[13px] text-[#4C4B49] font-sans font-light tracking-wide">
                  For a more intentional you
                </span>
              </div>
            </div>

          </div>

          {/* Double floating hearts bottom right */}
          <div className="absolute -right-2 -bottom-9 text-[#84AAD7]/70 animate-float hidden md:block select-none pointer-events-none">
            <svg className="w-12 h-12" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Heart 1 */}
              <path d="M18 28C18 28 10 23 10 17C10 13.5 12.5 11 15.5 11C17.3 11 18 12.5 18 12.5C18 12.5 18.7 11 20.5 11C23.5 11 26 13.5 26 17C26 23 18 28 18 28Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              {/* Heart 2 */}
              <path d="M26 31C26 31 20 27 20 22C20 19 22 17 24.5 17C26 17 26.5 18.2 26.5 18.2C26.5 18.2 27 17.0 28.5 17.0C31 17.0 33 19 33 22C33 27 26 31 26 31Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

      </div>
    </section>
  );
};
