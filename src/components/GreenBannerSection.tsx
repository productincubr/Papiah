import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import added2 from '../assets/added_2.svg';

export const GreenBannerSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const slide1Ref = useRef<HTMLDivElement>(null);
  const slide2Ref = useRef<HTMLDivElement>(null);
  const slide3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const slides = [slide1Ref.current, slide2Ref.current, slide3Ref.current];

      // Initial state: hide all slides and translate them down slightly
      gsap.set(slides, {
        opacity: 0,
        y: 25,
        pointerEvents: 'none'
      });

      // Show the first slide initially
      gsap.set(slides[0], {
        opacity: 1,
        y: 0,
        pointerEvents: 'auto'
      });

      // Infinite loop timeline
      const tl = gsap.timeline({ repeat: -1 });
      const slideDuration = 4; // seconds each slide is active
      const fadeDuration = 0.8; // fade transition duration

      // 1. Slide 1 fades out, Slide 2 fades in
      tl.to(slides[0], {
        opacity: 0,
        y: -25,
        duration: fadeDuration,
        ease: 'power2.inOut',
        pointerEvents: 'none',
        delay: slideDuration
      })
      .to(slides[1], {
        opacity: 1,
        y: 0,
        duration: fadeDuration,
        ease: 'power2.inOut',
        pointerEvents: 'auto'
      }, `-=${fadeDuration}`)

      // 2. Slide 2 fades out, Slide 3 fades in
      .to(slides[1], {
        opacity: 0,
        y: -25,
        duration: fadeDuration,
        ease: 'power2.inOut',
        pointerEvents: 'none',
        delay: slideDuration
      })
      .to(slides[2], {
        opacity: 1,
        y: 0,
        duration: fadeDuration,
        ease: 'power2.inOut',
        pointerEvents: 'auto'
      }, `-=${fadeDuration}`)

      // 3. Slide 3 fades out, Slide 1 fades in
      .to(slides[2], {
        opacity: 0,
        y: -25,
        duration: fadeDuration,
        ease: 'power2.inOut',
        pointerEvents: 'none',
        delay: slideDuration
      })
      .to(slides[0], {
        opacity: 1,
        y: 0,
        duration: fadeDuration,
        ease: 'power2.inOut',
        pointerEvents: 'auto'
      }, `-=${fadeDuration}`);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const quotes = [
    {
      title: <>Most people forget <br className="hidden sm:inline" /> the chapters that <br className="hidden sm:inline" /> changed them.</>,
      subtitle: "THE YEAR EVERYTHING CHANGED."
    },
    {
      title: <>Write the moments <br className="hidden sm:inline" /> before they become <br className="hidden sm:inline" /> memories.</>,
      subtitle: "YOUR STORY MATTERS."
    },
    {
      title: <>A quiet place <br className="hidden sm:inline" /> for every version <br className="hidden sm:inline" /> of you.</>,
      subtitle: "REFLECT. GROW. REMEMBER."
    }
  ];

  return (
    <section 
      ref={containerRef}
      className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] relative overflow-hidden select-none bg-[#2F3A24]"
    >
      {/* Background SVG illustration */}
      <img 
        src={added2} 
        alt="Botanical background illustration" 
        className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay pointer-events-none"
      />

      {/* Content Container (fades in states one by one) */}
      <div className="relative w-full h-full max-w-[1400px] mx-auto flex items-center justify-center px-4">
        
        {/* Slide 1 */}
        <div 
          ref={slide1Ref} 
          className="absolute text-center flex flex-col items-center justify-center w-full px-6"
        >
          <h2 className="font-sans font-light text-2xl sm:text-3.5xl md:text-4.5xl lg:text-[52px] text-white tracking-wide max-w-[900px] leading-[1.15]">
            {quotes[0].title}
          </h2>
          <p className="font-sans text-[11px] sm:text-[13px] md:text-[15px] lg:text-[17px] text-[#CBD83B] font-medium tracking-[0.25em] uppercase mt-6 md:mt-10 leading-relaxed">
            {quotes[0].subtitle}
          </p>
        </div>

        {/* Slide 2 */}
        <div 
          ref={slide2Ref} 
          className="absolute text-center flex flex-col items-center justify-center w-full px-6"
        >
          <h2 className="font-sans font-light text-2xl sm:text-3.5xl md:text-4.5xl lg:text-[52px] text-white tracking-wide max-w-[900px] leading-[1.15]">
            {quotes[1].title}
          </h2>
          <p className="font-sans text-[11px] sm:text-[13px] md:text-[15px] lg:text-[17px] text-[#CBD83B] font-medium tracking-[0.25em] uppercase mt-6 md:mt-10 leading-relaxed">
            {quotes[1].subtitle}
          </p>
        </div>

        {/* Slide 3 */}
        <div 
          ref={slide3Ref} 
          className="absolute text-center flex flex-col items-center justify-center w-full px-6"
        >
          <h2 className="font-sans font-light text-2xl sm:text-3.5xl md:text-4.5xl lg:text-[52px] text-white tracking-wide max-w-[900px] leading-[1.15]">
            {quotes[2].title}
          </h2>
          <p className="font-sans text-[11px] sm:text-[13px] md:text-[15px] lg:text-[17px] text-[#CBD83B] font-medium tracking-[0.25em] uppercase mt-6 md:mt-10 leading-relaxed">
            {quotes[2].subtitle}
          </p>
        </div>

      </div>
    </section>
  );
};
