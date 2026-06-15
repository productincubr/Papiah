import React, { useEffect, useRef } from 'react';
import { useCursor } from '../context/CursorContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import founderPortraitImg from '../assets/founder_portrait.webp';
import kagajImg from '../assets/kagaj.png';

gsap.registerPlugin(ScrollTrigger);

export const BrandStorytellingSection: React.FC = () => {
  const { setCursorType } = useCursor();
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const hoverCardRef = useRef<HTMLDivElement>(null);
  const playCardRef = useRef<HTMLDivElement>(null);
  
  const headingRef = useRef<HTMLHeadingElement>(null);
  const storyTextRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const journeyContainerRef = useRef<HTMLDivElement>(null);
  const trustContainerRef = useRef<HTMLDivElement>(null);
  const signatureRef = useRef<HTMLDivElement>(null);

  // Mouse hover animation handlers for the portrait card
  const handleMouseEnter = () => {
    gsap.to(imageRef.current, {
      scale: 1.08,
      duration: 0.5,
      ease: 'power2.out',
      overwrite: 'auto'
    });
    gsap.to(hoverCardRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.35,
      ease: 'power3.out',
      overwrite: 'auto'
    });
    gsap.to(playCardRef.current, {
      opacity: 0,
      y: -10,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  };

  const handleMouseLeave = () => {
    gsap.to(imageRef.current, {
      scale: 1.05,
      duration: 0.5,
      ease: 'power2.out',
      overwrite: 'auto'
    });
    gsap.to(hoverCardRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.35,
      ease: 'power3.out',
      overwrite: 'auto'
    });
    gsap.to(playCardRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.35,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Initial hidden state setup
      gsap.set(hoverCardRef.current, { opacity: 0, y: 20 });
      gsap.set(playCardRef.current, { opacity: 1, y: 0 });
      if (lineRef.current) gsap.set(lineRef.current, { scaleX: 0 });

      // 2. Image Reveal (fades in and scale up entrance)
      gsap.fromTo(leftColRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: leftColRef.current,
            start: 'top 85%'
          }
        }
      );

      // 3. Heading Reveal (fades up)
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%'
          }
        }
      );

      // 4. Story Text Reveal (fades up)
      gsap.fromTo(storyTextRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: storyTextRef.current,
            start: 'top 85%'
          }
        }
      );

      // 5. Parallax scroll effect on the image
      gsap.fromTo(parallaxRef.current,
        { y: -30 },
        {
          y: 30,
          ease: 'none',
          scrollTrigger: {
            trigger: imageContainerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );

      // 6. Draw Horizontal Journey Line (Desktop only)
      if (lineRef.current) {
        gsap.fromTo(lineRef.current,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 1.2,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: journeyContainerRef.current,
              start: 'top 85%'
            }
          }
        );
      }

      // 7. Stagger process step icons/items (appear one-by-one)
      const stepsElements = journeyContainerRef.current?.querySelectorAll('.journey-step');
      if (stepsElements) {
        gsap.fromTo(stepsElements,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.25,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: journeyContainerRef.current,
              start: 'top 85%'
            }
          }
        );
      }

      // 8. Stagger benefit cards (appear one-by-one)
      const trustCards = trustContainerRef.current?.querySelectorAll('.trust-card');
      if (trustCards) {
        gsap.fromTo(trustCards,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: trustContainerRef.current,
              start: 'top 90%'
            }
          }
        );
      }

      // 9. Handwritten signature (fades last)
      gsap.fromTo(signatureRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: signatureRef.current,
            start: 'top 95%'
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
      className="w-full bg-[#F8F6F1] py-12 px-6 md:py-28 md:px-12 select-none border-b border-[#EAE6DD]/60 relative z-10"
      onMouseEnter={() => setCursorType('default')}
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* 1. Mobile Eyebrow Label (Centered at very top, hidden on desktop) */}
        <div className="w-full flex justify-center mb-8 lg:hidden">
          <span className="font-sans text-[11px] font-semibold tracking-[0.35em] text-[#8B7A5F] uppercase">
            PAPER WITH A PAST
          </span>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
          
          {/* 2. LEFT: Portrait Image with Hover Card (rounded-24px, 4:5 ratio, 90% width on mobile) */}
          <div ref={leftColRef} className="lg:col-span-5 w-full flex justify-center">
            <div 
              ref={imageContainerRef}
              className="relative w-[90%] md:w-full max-w-[430px] aspect-[4/5] lg:h-[560px] lg:aspect-none rounded-[24px] overflow-hidden border-4 border-white shadow-[0_12px_45px_rgba(0,0,0,0.03)] cursor-pointer select-none group"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Parallax inner container */}
              <div 
                ref={parallaxRef}
                className="absolute inset-0 w-full h-[115%]"
              >
                <img 
                  ref={imageRef}
                  src={founderPortraitImg} 
                  alt="Ananya inspecting stacks of handmade cotton paper" 
                  className="w-full h-full object-cover scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
              </div>

              {/* Glassy Video Play Card Badge (Soft Cream Glass Style) */}
              <div 
                ref={playCardRef}
                className="absolute bottom-6 right-6 bg-[#FBF8F2]/35 backdrop-blur-md border border-[#FAF9F6]/40 shadow-[0_8px_32px_0_rgba(47,58,42,0.08)] rounded-full px-5 py-2.5 flex items-center gap-2.5 z-20 select-none cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 text-[#2F3A2A]"
              >
                {/* Play Icon Circle */}
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#2F3A2A] shadow-xs shrink-0">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 translate-x-0.5">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                
                {/* Text */}
                <span className="font-sans text-[10px] font-bold tracking-[0.18em] text-[#2F3A2A] uppercase">
                  WATCH FILM
                </span>
              </div>

              {/* Floating Story Card overlay */}
              <div 
                ref={hoverCardRef}
                className="absolute bottom-8 left-8 right-8 py-4 px-6 pointer-events-none z-30 transition-all duration-300 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${kagajImg})`,
                  filter: 'drop-shadow(0px 12px 30px rgba(47,58,42,0.12))'
                }}
              >
                {/* Icon wrapper */}
                <div className="w-7 h-7 rounded-full bg-[#EAE5D9]/80 flex items-center justify-center mb-2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5 text-[#8B7A5F]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 22v-4" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 14.5c1.5.5 2.5 1.5 3.5 3.5c1-2 2-3 3.5-3.5" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5a3 3 0 0 1 3 3 2.5 2.5 0 0 1 2.5 2.5 3 3 0 0 1-3 3h-5a3 3 0 0 1-3-3 2.5 2.5 0 0 1 2.5-2.5 3 3 0 0 1 3-3z" />
                  </svg>
                </div>
                
                <h4 className="font-serif text-[13px] sm:text-[14.5px] font-semibold text-[#2F3A2A] mb-1 leading-[1.18]">
                  From Waste <br />
                  To Something Worthwhile
                </h4>
                
                <p className="font-sans text-[10px] sm:text-[10.5px] text-[#2F3A2A]/75 leading-snug mb-2">
                  Discarded cotton is sorted, cleaned and broken down before it begins its transformation.
                </p>
                
                <span className="font-sans text-[8.5px] font-bold tracking-wider text-[#8B7A5F] flex items-center gap-1.5 uppercase">
                  SEE THE JOURNEY <span className="text-xs transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Editorial Content & Journey elements */}
          <div ref={rightColRef} className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left w-full">
            
            {/* Desktop Eyebrow Label (Hidden on mobile) */}
            <span className="hidden lg:block font-sans text-[11px] font-semibold tracking-[0.25em] text-[#8B7A5F] uppercase mb-4">
              PAPER WITH A PAST
            </span>
            
            {/* 3. Main Heading (Elegant serif, Deep olive green, centered on mobile) */}
            <h3 
              ref={headingRef}
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#2F3A2A] font-light leading-[1.12] tracking-tight mb-6 w-full text-center lg:text-left max-w-xl lg:max-w-none"
            >
              Every Papiah page <br className="hidden sm:inline" />
              has lived another life.
            </h3>
            
            {/* Divider */}
            <div className="w-16 h-[1.5px] bg-[#C5B09E] mb-8 mx-auto lg:mx-0" />
            
            {/* 4. Story Text (Short readable paragraphs, centered on mobile) */}
            <div ref={storyTextRef} className="flex flex-col gap-5 text-[#6F746B] font-sans font-light text-[14px] md:text-base leading-relaxed max-w-xl mb-12 text-center lg:text-left mx-auto lg:mx-0 w-[90%] md:w-full">
              <p>
                Before becoming a journal, our pages begin as discarded cotton from India's hosiery industry.
              </p>
              <p>
                Through skilled craftsmanship, these forgotten fibres become beautiful handmade paper.
              </p>
            </div>

            {/* 5. Vertical Story Timeline (Mobile) / Horizontal Process (Desktop) */}
            <div 
              ref={journeyContainerRef}
              className="relative w-full mb-12 select-none"
            >
              {/* Mobile Vertical Timeline */}
              <div className="flex lg:hidden flex-col gap-8 items-start max-w-sm mx-auto w-full relative pl-6 text-left">
                {/* Thin connecting line */}
                <div className="absolute left-[52px] top-7 bottom-7 w-[1px] bg-[#E7E1D6] z-0" />
                
                {/* Step 1 */}
                <div className="journey-step flex items-start gap-5 relative z-10 w-full">
                  <div className="w-14 h-14 rounded-full border border-[#E7E1D6] bg-[#FBF8F2] flex items-center justify-center shadow-xs shrink-0 z-10">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-[#8B7A5F]">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 22v-4" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 14.5c1.5.5 2.5 1.5 3.5 3.5c1-2 2-3 3.5-3.5" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5a3 3 0 0 1 3 3 2.5 2.5 0 0 1 2.5 2.5 3 3 0 0 1-3 3h-5a3 3 0 0 1-3-3 2.5 2.5 0 0 1 2.5-2.5 3 3 0 0 1 3-3z" />
                    </svg>
                  </div>
                  <div className="flex flex-col justify-center py-1">
                    <h4 className="font-serif text-sm font-semibold text-[#2F3A2A] mb-0.5">Cotton Waste</h4>
                    <p className="font-sans text-[11px] text-[#6F746B] leading-normal">
                      Discarded cotton from hosiery units
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="journey-step flex items-start gap-5 relative z-10 w-full">
                  <div className="w-14 h-14 rounded-full border border-[#E7E1D6] bg-[#FBF8F2] flex items-center justify-center shadow-xs shrink-0 z-10">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-[#8B7A5F]">
                      <polygon strokeLinecap="round" strokeLinejoin="round" points="12 4 19 7.5 12 11 5 7.5" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 11.5l7 3.5 7-3.5" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15.5l7 3.5 7-3.5" />
                    </svg>
                  </div>
                  <div className="flex flex-col justify-center py-1">
                    <h4 className="font-serif text-sm font-semibold text-[#2F3A2A] mb-0.5">Handmade Paper</h4>
                    <p className="font-sans text-[11px] text-[#6F746B] leading-normal">
                      Cleaned, processed and handcrafted with care
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="journey-step flex items-start gap-5 relative z-10 w-full">
                  <div className="w-14 h-14 rounded-full border border-[#E7E1D6] bg-[#FBF8F2] flex items-center justify-center shadow-xs shrink-0 z-10">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-[#8B7A5F]">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                  </div>
                  <div className="flex flex-col justify-center py-1 flex-1">
                    <h4 className="font-serif text-sm font-semibold text-[#2F3A2A] mb-0.5">PAPIAH Journal</h4>
                    <p className="font-sans text-[11px] text-[#6F746B] leading-normal">
                      Thoughtfully designed for your everyday story
                    </p>
                  </div>
                </div>
              </div>

              {/* Desktop Horizontal Timeline */}
              <div className="hidden lg:block relative w-full">
                <div 
                  ref={lineRef}
                  className="absolute top-7 left-[10%] right-[10%] h-[1px] bg-[#EAE6DD] -z-10"
                />
                <div className="grid grid-cols-3 gap-8 relative z-10 w-full">
                  {/* Step 1 */}
                  <div className="journey-step flex flex-col items-start text-left">
                    <div className="w-14 h-14 rounded-full border border-[#EAE6DD] bg-[#F8F6F1] flex items-center justify-center mb-4 shadow-xs">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-[#8B7A5F]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 22v-4" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 14.5c1.5.5 2.5 1.5 3.5 3.5c1-2 2-3 3.5-3.5" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5a3 3 0 0 1 3 3 2.5 2.5 0 0 1 2.5 2.5 3 3 0 0 1-3 3h-5a3 3 0 0 1-3-3 2.5 2.5 0 0 1 2.5-2.5 3 3 0 0 1 3-3z" />
                      </svg>
                    </div>
                    <h4 className="font-serif text-sm font-semibold text-[#2F3A2A] mb-1">Cotton Waste</h4>
                    <p className="font-sans text-[11px] text-[#2F3A2A]/60 leading-normal max-w-[170px]">
                      Discarded cotton from hosiery units
                    </p>
                  </div>
                  
                  {/* Step 2 */}
                  <div className="journey-step flex flex-col items-start text-left">
                    <div className="w-14 h-14 rounded-full border border-[#EAE6DD] bg-[#F8F6F1] flex items-center justify-center mb-4 shadow-xs">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-[#8B7A5F]">
                        <polygon strokeLinecap="round" strokeLinejoin="round" points="12 4 19 7.5 12 11 5 7.5" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 11.5l7 3.5 7-3.5" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15.5l7 3.5 7-3.5" />
                      </svg>
                    </div>
                    <h4 className="font-serif text-sm font-semibold text-[#2F3A2A] mb-1">Handmade Paper</h4>
                    <p className="font-sans text-[11px] text-[#2F3A2A]/60 leading-normal max-w-[170px]">
                      Cleaned, processed and handcrafted with care
                    </p>
                  </div>
                  
                  {/* Step 3 */}
                  <div className="journey-step flex flex-col items-start text-left">
                    <div className="w-14 h-14 rounded-full border border-[#EAE6DD] bg-[#F8F6F1] flex items-center justify-center mb-4 shadow-xs">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-[#8B7A5F]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                      </svg>
                    </div>
                    <h4 className="font-serif text-sm font-semibold text-[#2F3A2A] mb-1">PAPIAH Journal</h4>
                    <p className="font-sans text-[11px] text-[#2F3A2A]/60 leading-normal max-w-[170px]">
                      Thoughtfully designed for your everyday story
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 6. Benefits Cards (Stacked on mobile, horizontal row on desktop) */}
            <div 
              ref={trustContainerRef}
              className="flex flex-col lg:flex-row gap-6 w-[90%] md:w-full mb-12 max-w-md lg:max-w-none mx-auto lg:mx-0"
            >
              {/* Card 1: Handmade */}
              <div className="trust-card flex items-start gap-4 p-6 bg-[#FBF8F2] border border-[#E7E1D6] rounded-[24px] w-full text-left transition-all duration-300 hover:shadow-xs">
                <div className="p-3 bg-white rounded-xl border border-[#E7E1D6]/40 text-[#8B7A5F] shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v5" />
                    <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v6" />
                    <path d="M10 10V5a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v5" />
                    <path d="M6 14v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v7c0 4.5 3.5 8 8 8h2a8 8 0 0 0 8-8v-2a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
                    <path d="M12 14.5c-.5-.5-1-.5-1.5 0s-.5 1 0 1.5l1.5 1.5 1.5-1.5c.5-.5.5-1 0-1.5s-1-.5-1.5 0" />
                  </svg>
                </div>
                <div className="flex flex-col justify-center">
                  <h5 className="font-serif text-sm font-semibold text-[#2F3A2A] mb-1">Handmade</h5>
                  <p className="font-sans text-[11px] text-[#6F746B] leading-relaxed">
                    Crafted by skilled Indian artisans
                  </p>
                </div>
              </div>

              {/* Card 2: Premium Paper */}
              <div className="trust-card flex items-start gap-4 p-6 bg-[#FBF8F2] border border-[#E7E1D6] rounded-[24px] w-full text-left transition-all duration-300 hover:shadow-xs">
                <div className="p-3 bg-white rounded-xl border border-[#E7E1D6]/40 text-[#8B7A5F] shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <line x1="10" y1="9" x2="8" y2="9" />
                  </svg>
                </div>
                <div className="flex flex-col justify-center">
                  <h5 className="font-serif text-sm font-semibold text-[#2F3A2A] mb-1">Premium Paper</h5>
                  <p className="font-sans text-[11px] text-[#6F746B] leading-relaxed">
                    Durable, smooth and made to be written on
                  </p>
                </div>
              </div>

              {/* Card 3: Made in India */}
              <div className="trust-card flex items-start gap-4 p-6 bg-[#FBF8F2] border border-[#E7E1D6] rounded-[24px] w-full text-left transition-all duration-300 hover:shadow-xs">
                <div className="p-3 bg-white rounded-xl border border-[#E7E1D6]/40 text-[#8B7A5F] shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="flex flex-col justify-center">
                  <h5 className="font-serif text-sm font-semibold text-[#2F3A2A] mb-1">Made in India</h5>
                  <p className="font-sans text-[11px] text-[#6F746B] leading-relaxed">
                    Thoughtfully designed and locally crafted
                  </p>
                </div>
              </div>
            </div>

            {/* 7. Handwritten Signature Section (Soft Lavender color #B89CE8, centered) */}
            <div ref={signatureRef} className="flex flex-col text-center lg:text-left w-full max-w-[90%] md:max-w-none mx-auto lg:mx-0">
              <p className="font-handwriting text-[#B89CE8] text-2xl md:text-3xl tracking-wide leading-normal italic select-none">
                Nothing wasted.
                <br />
                Everything reimagined. ♡
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
