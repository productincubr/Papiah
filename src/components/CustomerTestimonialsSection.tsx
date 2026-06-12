import React, { useState, useRef } from 'react';
import customerTestimonial from '../assets/customer_testimonial.webp';

interface TestimonialCard {
  id: number;
  title: string;
  desc: string;
  price: string;
  imageSrc: string;
}

export const CustomerTestimonialsSection: React.FC = () => {
  const cards: TestimonialCard[] = [
    {
      id: 1,
      title: "Daily Joy Journal",
      desc: "Capture little happy moments, gratitude notes, and everyday wins to make your day feel lighter.",
      price: "₹300",
      imageSrc: customerTestimonial
    },
    {
      id: 2,
      title: "Daily Joy Journal",
      desc: "Capture little happy moments, gratitude notes, and everyday wins to make your day feel lighter.",
      price: "₹300",
      imageSrc: customerTestimonial
    },
    {
      id: 3,
      title: "Daily Joy Journal",
      desc: "Capture little happy moments, gratitude notes, and everyday wins to make your day feel lighter.",
      price: "₹300",
      imageSrc: customerTestimonial
    },
    {
      id: 4,
      title: "Daily Joy Journal",
      desc: "Capture little happy moments, gratitude notes, and everyday wins to make your day feel lighter.",
      price: "₹300",
      imageSrc: customerTestimonial
    }
  ];

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
      if (closestIndex !== activeSlide && closestIndex >= 0 && closestIndex < cards.length) {
        setActiveSlide(closestIndex);
      }
    }
  };

  return (
    <section className="w-full bg-[#FAF8F5] py-20 select-none">
      <style dangerouslySetInnerHTML={{ __html: `
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        
        {/* Section Heading */}
        <h2 className="font-serif text-3xl sm:text-4xl md:text-[42px] tracking-[0.25em] text-[#2E3327] uppercase font-light text-center mb-16">
          OUR CUSTOMERS WORDS
        </h2>

        {/* Testimonials Container — Carousel on Mobile, Grid on Desktop */}
        <div 
          ref={carouselRef}
          onScroll={handleScroll}
          className="flex flex-row overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10 scrollbar-none snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0 pb-4 md:pb-0"
        >
          {cards.map((card) => (
            <div key={card.id} className="w-[245px] shrink-0 snap-center md:w-full md:shrink md:snap-align-none flex flex-col items-center group">
              
              {/* Image / Video Card Container */}
              <div className="w-full aspect-[3/4] rounded-[24px] overflow-hidden relative shadow-[0_4px_20px_rgba(0,0,0,0.03)] bg-gray-100">
                <img 
                  src={card.imageSrc} 
                  alt={card.title} 
                  className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-103"
                />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                  <button className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/25 backdrop-blur-[6px] border border-white/40 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-white/35 active:scale-95 shadow-lg" aria-label="Play Testimonial">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-6 md:h-6 text-white translate-x-0.5">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <h3 className="font-serif text-base md:text-lg lg:text-xl text-[#2E3327] font-semibold mt-4 md:mt-6 mb-2 text-center">
                {card.title}
              </h3>
              <p className="font-sans text-[11px] md:text-[11.5px] text-gray-500 font-light leading-relaxed max-w-[280px] text-center mb-3 min-h-[3.2em] flex items-center justify-center">
                {card.desc}
              </p>
              <span className="font-sans text-sm md:text-base text-gray-650 font-bold text-center mb-4 block">
                {card.price}
              </span>

              {/* Add to Cart CTA Button */}
              <button className="w-full bg-[#CBD83B] hover:bg-[#b8c634] active:scale-[0.97] text-[#2E3327] font-sans font-bold tracking-[0.2em] text-[11px] md:text-[12px] py-3 md:py-3.5 uppercase cursor-pointer flex items-center justify-center transition-all duration-200">
                ADD TO CART
              </button>

            </div>
          ))}
        </div>

        {/* Mobile Page Indicator Dots */}
        <div className="flex md:hidden justify-center items-center gap-1.5 mt-5">
          {cards.map((_, idx) => (
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
                  ? 'w-6 bg-[#CBD83B]' 
                  : 'w-1.5 bg-[#CBD83B]/20'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
