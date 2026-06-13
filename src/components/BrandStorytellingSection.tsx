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
  const lineRef = useRef<HTMLDivElement>(null);
  const journeyContainerRef = useRef<HTMLDivElement>(null);
  const trustContainerRef = useRef<HTMLDivElement>(null);

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
      gsap.set(lineRef.current, { scaleX: 0 });

      // 2. Left Column Reveal (Image wrapper fade + scale entrance)
      gsap.fromTo(leftColRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%'
          }
        }
      );

      // 3. Right Column Content Reveal
      gsap.fromTo(rightColRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%'
          }
        }
      );

      // 4. Parallax scroll effect on the image
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

      // 5. Blur & opacity reveal for heading
      gsap.fromTo(headingRef.current,
        { opacity: 0, filter: 'blur(15px)' },
        {
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%'
          }
        }
      );

      // 6. Draw Horizontal Journey Line
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

      // 7. Stagger process step icons
      const stepsElements = journeyContainerRef.current?.querySelectorAll('.journey-step');
      if (stepsElements) {
        gsap.fromTo(stepsElements,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: journeyContainerRef.current,
              start: 'top 85%'
            }
          }
        );
      }

      // 8. Stagger trust items
      const trustItems = trustContainerRef.current?.querySelectorAll('.trust-item');
      if (trustItems) {
        gsap.fromTo(trustItems,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: trustContainerRef.current,
              start: 'top 90%'
            }
          }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="brand-storytelling-section"
      className="w-full bg-[#F8F6F1] py-20 md:py-28 select-none border-b border-[#EAE6DD]/60 relative z-10"
      onMouseEnter={() => setCursorType('default')}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: Portrait Image with Hover Card */}
          <div ref={leftColRef} className="lg:col-span-5 w-full flex justify-center">
            <div 
              ref={imageContainerRef}
              className="relative w-full max-w-[430px] h-[560px] rounded-[24px] overflow-hidden border-4 border-white shadow-[0_12px_45px_rgba(0,0,0,0.03)] cursor-pointer select-none group"
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

              {/* Glassy Video Play Card Badge */}
              <div 
                ref={playCardRef}
                className="absolute bottom-6 right-6 bg-white/20 backdrop-blur-md border border-white/35 shadow-[0_8px_32px_0_rgba(0,0,0,0.15)] rounded-2xl px-4 py-3 flex items-center gap-3 z-20 select-none cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95"
              >
                {/* Play Icon Circle */}
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#2F3A2A] shadow-sm">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 translate-x-0.5">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                
                {/* Text Info */}
                <div className="flex flex-col items-start leading-none">
                  <span className="font-sans text-[9px] font-medium tracking-wider text-white/80 uppercase">
                    Watch
                  </span>
                  <span className="font-sans text-[11px] font-bold tracking-widest text-white uppercase mt-0.5">
                    Film
                  </span>
                </div>
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

          {/* RIGHT: Editorial Content & Timelines */}
          <div ref={rightColRef} className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Eyebrow */}
            <span className="font-sans text-[11px] font-semibold tracking-[0.25em] text-[#8B7A5F] uppercase mb-4 block">
              PAPER WITH A PAST
            </span>
            
            {/* Heading */}
            <h3 
              ref={headingRef}
              className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#2F3A2A] font-light leading-[1.12] tracking-tight mb-6"
            >
              Every Papiah page <br className="hidden sm:inline" />
              has lived another life.
            </h3>
            
            {/* Divider */}
            <div className="w-16 h-[1.5px] bg-[#C5B09E] mb-8" />
            
            {/* Paragraphs */}
            <div className="flex flex-col gap-5 text-[#2F3A2A]/75 font-sans font-light text-[14px] md:text-base leading-relaxed max-w-xl mb-12">
              <p>
                Before becoming a journal, our pages begin as discarded cotton from India's hosiery industry.
              </p>
              <p>
                Through the hands of skilled artisans, those forgotten fibres are transformed into beautiful handmade paper designed for reflection, creativity and mindful living.
              </p>
            </div>

            {/* PROCESS JOURNEY */}
            <div 
              ref={journeyContainerRef}
              className="relative w-full mb-12 select-none"
            >
              {/* Horizontal line (desktop only) */}
              <div 
                ref={lineRef}
                className="absolute top-7 left-[10%] right-[10%] h-[1px] bg-[#EAE6DD] -z-10 hidden md:block"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 relative z-10 w-full">
                
                {/* Step 1 */}
                <div className="journey-step flex flex-col items-center md:items-start text-center md:text-left">
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
                <div className="journey-step flex flex-col items-center md:items-start text-center md:text-left">
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
                <div className="journey-step flex flex-col items-center md:items-start text-center md:text-left">
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

            {/* MICRO TRUST INDICATORS */}
            <div 
              ref={trustContainerRef}
              className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-6 md:gap-4 items-start pt-8 border-t border-[#E5DFD3] w-full mb-12"
            >
              {/* Indicator 1 */}
              <div className="trust-item flex items-start gap-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-[#8B7A5F] shrink-0">
                  <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v5" />
                  <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v6" />
                  <path d="M10 10V5a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v5" />
                  <path d="M6 14v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v7c0 4.5 3.5 8 8 8h2a8 8 0 0 0 8-8v-2a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
                  <path d="M12 14.5c-.5-.5-1-.5-1.5 0s-.5 1 0 1.5l1.5 1.5 1.5-1.5c.5-.5.5-1 0-1.5s-1-.5-1.5 0" />
                </svg>
                <div>
                  <h5 className="font-serif text-sm font-semibold text-[#2F3A2A]">Handmade</h5>
                  <p className="font-sans text-[11px] text-[#2F3A2A]/60 leading-normal mt-0.5">
                    Crafted by skilled Indian artisans
                  </p>
                </div>
              </div>

              {/* Vertical line 1 */}
              <div className="hidden md:block w-[1px] h-10 bg-[#EAE6DD] self-center" />

              {/* Indicator 2 */}
              <div className="trust-item flex items-start gap-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-[#8B7A5F] shrink-0">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <line x1="10" y1="9" x2="8" y2="9" />
                </svg>
                <div>
                  <h5 className="font-serif text-sm font-semibold text-[#2F3A2A]">Premium Paper</h5>
                  <p className="font-sans text-[11px] text-[#2F3A2A]/60 leading-normal mt-0.5">
                    Durable, smooth and made to be written on
                  </p>
                </div>
              </div>

              {/* Vertical line 2 */}
              <div className="hidden md:block w-[1px] h-10 bg-[#EAE6DD] self-center" />

              {/* Indicator 3 */}
              <div className="trust-item flex items-start gap-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-[#8B7A5F] shrink-0">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <div>
                  <h5 className="font-serif text-sm font-semibold text-[#2F3A2A]">Made in India</h5>
                  <p className="font-sans text-[11px] text-[#2F3A2A]/60 leading-normal mt-0.5">
                    Thoughtfully designed and locally crafted
                  </p>
                </div>
              </div>

            </div>

            {/* SIGNATURE LINE */}
            <div className="flex flex-col text-left">
              <p className="font-handwriting text-[#84AAD7] text-2xl tracking-wide leading-normal italic select-none">
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
