import React, { useEffect, useRef } from 'react';
import { useCursor } from '../context/CursorContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import founderPortraitImg from '../assets/founder_portrait.png';

gsap.registerPlugin(ScrollTrigger);

interface TimelineStep {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const BrandStorytellingSection: React.FC = () => {
  const { setCursorType } = useCursor();
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const founderCardRef = useRef<HTMLDivElement>(null);

  const timelineSteps: TimelineStep[] = [
    {
      number: "01",
      title: "The Beginning",
      description: "Every journal starts as discarded cotton.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M12 22v-4" />
          <path d="M8.5 14.5c1.5.5 2.5 1.5 3.5 3.5c1-2 2-3 3.5-3.5" />
          <path d="M12 7.5a3 3 0 0 1 3 3 2.5 2.5 0 0 1 2.5 2.5 3 3 0 0 1-3 3h-5a3 3 0 0 1-3-3 2.5 2.5 0 0 1 2.5-2.5 3 3 0 0 1 3-3z" />
        </svg>
      )
    },
    {
      number: "02",
      title: "Transformation",
      description: "Waste is broken down and turned into pulp.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
          <path d="M10.5 7.5c1-1 2-1 2.5-1.5" opacity="0.4" />
          <path d="M18.5 4v3M17 5.5h3" strokeWidth="1" />
        </svg>
      )
    },
    {
      number: "03",
      title: "Sheets of Possibility",
      description: "Pulp is pressed, dried and formed into sheets of paper.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <polygon points="12 4 19 7.5 12 11 5 7.5" />
          <path d="M5 11.5l7 3.5 7-3.5" />
          <path d="M5 15.5l7 3.5 7-3.5" />
        </svg>
      )
    },
    {
      number: "04",
      title: "Crafted with Care",
      description: "Each sheet is carefully crafted and bound into a journal.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      )
    },
    {
      number: "05",
      title: "A New Story",
      description: "Thoughtfully made journals, ready to be part of your story.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M12 22V10" />
          <path d="M12 14c-4-1-6-4-6-7 3 0 5 2 6 7z" />
          <path d="M12 10c4-1 6-4 6-7-3 0-5 2-6 7z" />
        </svg>
      )
    }
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Header fade-in
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
          }
        }
      );

      // 2. Timeline cards staggered reveal
      const cards = timelineRef.current?.querySelectorAll('.timeline-step-card');
      if (cards && cards.length > 0) {
        gsap.fromTo(cards,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 80%',
            }
          }
        );
      }

      // 3. Founder Story card reveal
      gsap.fromTo(founderCardRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: founderCardRef.current,
            start: 'top 80%',
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="brand-storytelling-section"
      className="w-full bg-[#FAF9F6] py-20 md:py-28 select-none border-b border-[#EAE6DD]/60"
      onMouseEnter={() => setCursorType('default')}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <h2 className="font-cormorant text-4xl sm:text-5xl md:text-6.5xl text-[#2F3A2A] font-light tracking-tight leading-[1.15] mb-6">
            Our Story, At Every Step
          </h2>
          <p className="font-serif text-sm sm:text-base md:text-lg text-[#2F3A2A]/70 font-light leading-relaxed max-w-xl mx-auto">
            Thoughtfully made. Mindfully crafted. Meaningfully yours.
          </p>
        </div>

        {/* Craftsmanship Steps */}
        <div ref={timelineRef} className="w-full mb-20 md:mb-24">
          <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-between gap-4 lg:gap-3 xl:gap-4 relative z-10">
            {timelineSteps.map((step, idx) => (
              <React.Fragment key={idx}>
                {/* Step Card */}
                <div className="timeline-step-card flex-1 bg-white border border-[#EAE6DD]/60 rounded-2xl p-6 lg:p-4 xl:p-6 flex flex-col items-center text-center shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_30px_rgba(47,58,42,0.03)] hover:-translate-y-0.5 transition-all duration-300 w-full max-w-[280px] lg:max-w-none">
                  {/* Icon Circle */}
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-transform duration-300 hover:scale-105 ${idx % 2 === 0 ? 'bg-[#ECE5F5]' : 'bg-[#FAF2E6]'}`}>
                    <div className="text-[#2F3A2A]">
                      {step.icon}
                    </div>
                  </div>
                  
                  {/* Step Number */}
                  <span className="font-sans text-[11px] font-semibold tracking-[0.25em] text-[#2F3A2A]/40 uppercase mb-4 block">
                    — {step.number} —
                  </span>
                  
                  {/* Title */}
                  <h4 className="font-serif text-lg font-medium text-[#2F3A2A] mb-3">
                    {step.title}
                  </h4>
                  
                  {/* Description */}
                  <p className="font-sans text-xs text-[#2F3A2A]/60 font-light leading-relaxed px-1">
                    {step.description}
                  </p>
                </div>
                
                {/* Connector Arrow */}
                {idx < timelineSteps.length - 1 && (
                  <div className="flex items-center justify-center shrink-0 self-center">
                    {/* Desktop arrow */}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#2F3A2A]/40 hidden lg:block mx-1">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                    {/* Mobile/Tablet arrow */}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#2F3A2A]/40 lg:hidden rotate-90 my-2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Founder Story Section */}
        <div 
          ref={founderCardRef}
          className="bg-[#FAF8F5] border border-[#EAE6DD]/60 rounded-3xl p-8 md:p-12 lg:p-14 shadow-[0_10px_40px_rgba(0,0,0,0.015)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Founder's Story Quote */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
              <span className="text-[10px] md:text-xs font-sans font-bold tracking-[0.25em] text-[#9D85D1] block uppercase">
                OUR FOUNDER'S STORY
              </span>
              <div className="w-12 h-[1.5px] bg-[#9D85D1] mt-3 mb-6 mx-auto lg:mx-0" />
              
              <h3 className="font-cormorant text-3.5xl sm:text-4xl md:text-4.5xl text-[#2F3A2A] font-light leading-tight tracking-tight mb-5 max-w-md lg:max-w-none">
                We saw beauty in what was discarded.
              </h3>
              
              <p className="font-serif text-sm sm:text-base text-[#2F3A2A]/70 font-light leading-relaxed max-w-md">
                Here's how our journey began with a simple belief in mindful creation.
              </p>
            </div>

            {/* Center: Founder Portrait with Double Border */}
            <div className="lg:col-span-4 flex justify-center items-center">
              <div className="relative w-52 h-52 md:w-60 md:h-60 rounded-full border border-[#C5BC9E]/30 flex items-center justify-center p-2.5 transition-transform duration-700 hover:scale-[1.02]">
                <div className="w-full h-full rounded-full border border-[#C5BC9E]/30 overflow-hidden p-1.5">
                  <img 
                    src={founderPortraitImg} 
                    alt="Ananya, Founder of Papiah" 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
            </div>

            {/* Right: Watch & Listen */}
            <div className="lg:col-span-3 flex items-center justify-center lg:justify-start lg:border-l lg:border-[#2F3A2A]/10 lg:pl-10 h-full py-4 w-full">
              <div className="flex items-center gap-4 text-left">
                {/* Elegant Play Button */}
                <button 
                  className="w-14 h-14 rounded-full bg-[#EAE5D9]/70 hover:bg-[#EAE5D9] flex items-center justify-center shadow-sm group cursor-pointer transition-all duration-300 hover:scale-105"
                  aria-label="Play Story"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#2F3A2A] translate-x-0.5">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
                
                <div className="flex flex-col">
                  <span className="text-[10px] font-sans font-bold tracking-[0.2em] text-[#2F3A2A]">
                    WATCH & LISTEN
                  </span>
                  <span className="text-xs text-[#2F3A2A]/70 font-sans mt-0.5">
                    Our founder's story
                  </span>
                  <div className="w-12 h-[1.5px] bg-[#9D85D1] mt-2" />
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
