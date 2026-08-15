import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import step1 from '../assets/journey_step_1_new.webp';
import step2 from '../assets/journey_step_2_new.webp';
import step3 from '../assets/journey_step_3_new.webp';
import step4 from '../assets/journey_step_4_new.webp';
import step5 from '../assets/journey_step_5_new.webp';
import brushStrokeBg from '../assets/brush_stroke_bg.webp';
import grassImg from '../assets/grass.webp';

gsap.registerPlugin(ScrollTrigger);

interface Step {
  image: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const PlantableJourneySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const particlesContainerRef = useRef<HTMLDivElement>(null);

  const steps: Step[] = [
    {
      image: step1,
      title: "1. Pen your thoughts.",
      description: "Capture your reflections, memories, and ideas.",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2v10M12 12a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
          <path d="M17 12l-5-10-5 10c0 3 2 5 5 5s5-2 5-5z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 17v4" strokeLinecap="round" />
        </svg>
      )
    },
    {
      image: step2,
      title: "2. Tear the pages.",
      description: "When its purpose is complete, begin a new one.",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
          <path d="M16 13H8M16 17H8M10 9H8" />
        </svg>
      )
    },
    {
      image: step3,
      title: "3. Soak it.",
      description: "Allow the paper to soften naturally.",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-13-7-13S5 10.7 5 15a7 7 0 0 0 7 7z" />
        </svg>
      )
    },
    {
      image: step4,
      title: "4. Plant it.",
      description: "Place the seed-infused paper into soil.",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 10a6 6 0 0 0-6-6H3v3a6 6 0 0 0 6 6h3" />
          <path d="M12 14a6 6 0 0 1 6-6h3v3a6 6 0 0 1-6 6h-3" />
          <path d="M12 10v10" />
        </svg>
      )
    },
    {
      image: step5,
      title: "5. Watch it grow.",
      description: "Watch your story take root.",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <circle cx="12" cy="12" r="2.2" />
          <path d="M12 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
          <path d="M12 22a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
          <path d="M4 12a3 3 0 1 1 6 0 3 3 0 0 1 -6 0z" />
          <path d="M20 12a3 3 0 1 1 -6 0 3 3 0 0 1 6 0z" />
        </svg>
      )
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial State Setup
      // DESKTOP ANIMATIONS
      gsap.set('.story-intro-text', { opacity: 0, y: 25 });
      gsap.set('.story-cloud', { opacity: 0, scale: 0.8 });
      gsap.set('.story-sparkle', { opacity: 0, scale: 0, rotate: -20 });
      gsap.set('.story-airplane-path path', { strokeDashoffset: 150, strokeDasharray: 150 });
      gsap.set('.story-airplane', { opacity: 0, scale: 0.6, x: -30, y: 30 });
      gsap.set('.story-step', { opacity: 0, y: 40, scale: 0.92 });
      gsap.set('.story-arrow-path', { strokeDashoffset: 100, strokeDasharray: 100 });
      gsap.set('.story-arrow-head', { strokeDashoffset: 30, strokeDasharray: 30 });
      gsap.set('.story-tree-img', { scale: 0.85 });
      gsap.set('.story-watering-can', { opacity: 0, rotate: -45, scale: 0.7 });
      gsap.set('.story-water-spray', { strokeDashoffset: 50, strokeDasharray: 50 });
      gsap.set('.story-card', { opacity: 0, y: 40 });
      gsap.set('.story-tagline-container', { opacity: 0, scaleX: 0.75, transformOrigin: 'center center' });
      gsap.set('.story-tagline-text', { opacity: 0 });

      // MOBILE ANIMATIONS
      gsap.set('.mobile-story-intro-text', { opacity: 0, y: 25 });
      gsap.set('.mobile-story-headline', { opacity: 0, y: 25 });
      gsap.set('.mobile-story-step-item', { opacity: 0, y: 35 });
      gsap.set('.mobile-story-card', { opacity: 0, y: 30 });
      gsap.set('.mobile-story-tagline-container', { opacity: 0, y: 20 });

      // 2. Timeline Animation triggered when section enters viewport
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      });

      // DESKTOP TIMELINE FLOW
      tl.to('.story-intro-text', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power2.out'
      }, '0');

      tl.to('.story-cloud', {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'power2.out'
      }, '-=1.0')
      .to('.story-sparkle', {
        opacity: 1,
        scale: 1,
        rotate: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'back.out(1.7)'
      }, '-=1.0')
      .to('.story-airplane-path path', {
        strokeDashoffset: 0,
        duration: 1.0,
        ease: 'power1.inOut'
      }, '-=0.8')
      .to('.story-airplane', {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
      }, '-=0.6');

      tl.to('.story-step-0', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: 'power2.out'
      }, '-=0.2')
      .to('.story-arrow-path-0', { strokeDashoffset: 0, duration: 0.35, ease: 'none' })
      .to('.story-arrow-head-0', { strokeDashoffset: 0, duration: 0.15, ease: 'none' });

      tl.to('.story-step-1', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: 'power2.out'
      }, '-=0.1')
      .to('.story-arrow-path-1', { strokeDashoffset: 0, duration: 0.35, ease: 'none' })
      .to('.story-arrow-head-1', { strokeDashoffset: 0, duration: 0.15, ease: 'none' });

      tl.to('.story-step-2', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: 'power2.out'
      }, '-=0.1')
      .to('.story-arrow-path-2', { strokeDashoffset: 0, duration: 0.35, ease: 'none' })
      .to('.story-arrow-head-2', { strokeDashoffset: 0, duration: 0.15, ease: 'none' });

      tl.to('.story-step-3', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: 'power2.out'
      }, '-=0.1')
      .to('.story-arrow-path-3', { strokeDashoffset: 0, duration: 0.35, ease: 'none' })
      .to('.story-arrow-head-3', { strokeDashoffset: 0, duration: 0.15, ease: 'none' });

      tl.to('.story-step-4', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: 'power2.out'
      }, '-=0.1')
      .to('.story-tree-img', {
        scale: 1.04,
        duration: 1.5,
        ease: 'elastic.out(1.1, 0.6)'
      }, '-=0.3')
      .to('.story-watering-can', {
        opacity: 1,
        rotate: -15,
        scale: 1,
        duration: 0.8,
        ease: 'back.out(1.4)'
      }, '-=1.2')
      .to('.story-water-spray', {
        strokeDashoffset: 0,
        duration: 0.6,
        ease: 'none'
      }, '-=0.6');

      tl.to('.story-card', {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power2.out'
      }, '-=1.0');

      tl.to('.story-tagline-container', {
        opacity: 1,
        scaleX: 1,
        duration: 1.0,
        ease: 'power3.out'
      }, '-=0.7')
      .to('.story-tagline-text', {
        opacity: 1,
        duration: 0.6
      }, '-=0.5');

      // MOBILE TIMELINE FLOW (RUNS IN PARALLEL)
      tl.to('.mobile-story-intro-text', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
      }, '0')
      .to('.mobile-story-headline', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
      }, '+=0.1')
      .to('.mobile-story-step-item', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.25,
        ease: 'power2.out'
      }, '+=0.2')
      .to('.mobile-story-card', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
      }, '-=0.4')
      .to('.mobile-story-tagline-container', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
      }, '-=0.4');

      // 3. Dynamic Particle and Drifting Leaf Generation
      const container = particlesContainerRef.current;
      if (container) {
        container.innerHTML = '';
        const particleCount = 18;
        const leafCount = 8;
        
        // Spawn Particles
        for (let i = 0; i < particleCount; i++) {
          const p = document.createElement('div');
          p.className = 'absolute rounded-full bg-[#8A9B6E]/30 pointer-events-none';
          const size = gsap.utils.random(3, 6);
          gsap.set(p, {
            width: size,
            height: size,
            x: gsap.utils.random(2, 98, true) + '%',
            y: gsap.utils.random(60, 100, true) + '%',
            opacity: gsap.utils.random(0.1, 0.4),
            filter: 'blur(0.5px)'
          });
          container.appendChild(p);
          
          gsap.to(p, {
            y: '-=150',
            x: `+=${gsap.utils.random(-30, 30)}`,
            opacity: 0,
            duration: gsap.utils.random(15, 25),
            ease: 'none',
            repeat: -1,
            delay: gsap.utils.random(0, 15)
          });
        }

        // Spawn Leaves
        for (let i = 0; i < leafCount; i++) {
          const leaf = document.createElement('div');
          leaf.className = 'absolute pointer-events-none text-[#8A9B6E]/40';
          leaf.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M21 3C11.5 3 4 10.5 4 20C4 20 13.5 20 21 10.5C22.5 8.5 22.5 5 21 3Z" fill="currentColor" fillOpacity="0.4" />
              <path d="M4 20Q12.5 11.5 21 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          `;
          const scale = gsap.utils.random(0.6, 1.2);
          const side = i % 2 === 0 ? 'left' : 'right';
          gsap.set(leaf, {
            x: side === 'left' ? gsap.utils.random(2, 20, true) + '%' : gsap.utils.random(80, 98, true) + '%',
            y: gsap.utils.random(40, 85, true) + '%',
            scale: scale,
            rotate: gsap.utils.random(0, 360),
            opacity: gsap.utils.random(0.2, 0.55)
          });
          container.appendChild(leaf);
          
          gsap.to(leaf, {
            y: `+=${gsap.utils.random(40, 80)}`,
            x: side === 'left' ? `+=${gsap.utils.random(15, 40)}` : `-=${gsap.utils.random(15, 40)}`,
            rotate: '+=360',
            opacity: 0,
            duration: gsap.utils.random(18, 30),
            ease: 'sine.inOut',
            repeat: -1,
            delay: gsap.utils.random(0, 10)
          });
        }
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="w-full relative z-10 overflow-hidden select-none"
    >
      {/* Subtle Texture Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          opacity: 0.03,
          mixBlendMode: 'multiply',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Decorative Cloud & Sparkles (Shared top background) */}
      <div className="story-cloud absolute top-10 left-6 sm:left-12 md:left-24 w-20 h-12 md:w-24 md:h-16 pointer-events-none opacity-20 z-0">
        <svg className="w-full h-full text-[#2F3A2A]/50" viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 20 45 C 10 45, 5 35, 12 28 C 10 15, 25 10, 35 15 C 45 5, 65 10, 68 20 C 78 18, 85 28, 80 38 C 88 45, 78 55, 68 52 C 58 55, 22 55, 20 45 Z" />
        </svg>
      </div>

      <div className="story-sparkle absolute top-6 left-[18%] w-4 h-4 pointer-events-none z-0">
        <svg className="w-full h-full text-[#B89CE8]/70" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L14.3 9.7L22 12L14.3 14.3L12 22L9.7 14.3L2 12L9.7 9.7L12 2Z" />
        </svg>
      </div>
      <div className="story-sparkle absolute top-20 left-[24%] w-3 h-3 pointer-events-none z-0">
        <svg className="w-full h-full text-[#8A9B6E]/60" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L14.3 9.7L22 12L14.3 14.3L12 22L9.7 14.3L2 12L9.7 9.7L12 2Z" />
        </svg>
      </div>
      <div className="story-sparkle absolute top-14 right-[28%] w-4 h-4 pointer-events-none z-0">
        <svg className="w-full h-full text-[#B89CE8]/70" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L14.3 9.7L22 12L14.3 14.3L12 22L9.7 14.3L2 12L9.7 9.7L12 2Z" />
        </svg>
      </div>

      <div className="absolute top-10 right-8 sm:right-16 md:right-32 w-24 h-12 md:w-28 md:h-16 pointer-events-none z-0">
        <svg className="story-airplane-path w-full h-full text-[#2F3A2A]/15" viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M 10 35 Q 40 10, 80 15" strokeDasharray="150" strokeDashoffset="150" />
        </svg>
        <div className="story-airplane absolute right-2 top-0 w-8 h-8 transform rotate-[15deg]">
          <svg className="w-full h-full text-[#2F3A2A]/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 2L2 8.66L11.5 12.5L22 2Z" />
            <path d="M22 2L11.5 12.5V22L16 17.5" />
          </svg>
        </div>
      </div>

      {/* ========================================== */}
      {/* A. LAPTOP/DESKTOP VIEW (hidden on mobile) */}
      {/* ========================================== */}
      <div 
        className="hidden lg:block w-full py-20 md:py-28"
        style={{
          background: 'linear-gradient(180deg, #F8F6F1 0%, #F5F1E8 100%)'
        }}
      >
        {/* Section Header */}
        <div className="max-w-3xl mx-auto px-6 text-center mb-16 relative z-10">
          <div className="story-intro-text font-serif text-[#2F3A2A]/85 text-[15px] sm:text-[17px] md:text-[19px] font-light leading-relaxed tracking-wide space-y-4 max-w-2xl mx-auto">
            <p>
              At PAPIAH, every journal begins its journey long before it reaches you.
            </p>
            <p>
              Crafted from seed paper and guided by intention, each one is made to be written, planted, and grown — turning your thoughts today into a greener tomorrow.
            </p>
            <p className="font-semibold text-lg sm:text-xl md:text-2xl pt-2 text-[#2F3A2A]/95">
              This is not just paper. This is possibility.
            </p>
          </div>
        </div>

        {/* Steps Horizontal Flow */}
        <div className="max-w-[95%] lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[1450px] mx-auto px-4 sm:px-8 mb-16 relative z-10">
          <div className="flex flex-row items-start justify-between w-full gap-2">
            
            {/* Step 1 */}
            <div className="story-step story-step-0 flex flex-col items-center text-center max-w-[155px] xl:max-w-[205px] 2xl:max-w-[245px] shrink-0">
              <div className="w-32 h-32 xl:w-40 xl:h-40 2xl:w-52 2xl:h-52 flex items-center justify-center pointer-events-none select-none">
                <img src={step1} className="w-full h-full object-contain" alt="Write" />
              </div>
              <span className="font-handwriting text-lg xl:text-2xl 2xl:text-3xl text-[#2F3A2A] mt-2">You write.</span>
            </div>

            {/* Arrow 1 */}
            <div className="flex items-center justify-center h-32 xl:h-40 2xl:h-52 w-8 xl:w-12 2xl:w-16 shrink-0">
              <svg className="w-full h-8 text-[#2F3A2A]/40" viewBox="0 0 80 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path className="story-arrow-path story-arrow-path-0" d="M 10 12 Q 40 8, 70 12" strokeDasharray="100" strokeDashoffset="100" />
                <path className="story-arrow-head story-arrow-head-0" d="M 62 6 L 72 12 L 62 18" strokeDasharray="30" strokeDashoffset="30" />
              </svg>
            </div>

            {/* Step 2 */}
            <div className="story-step story-step-1 flex flex-col items-center text-center max-w-[155px] xl:max-w-[205px] 2xl:max-w-[245px] shrink-0">
              <div className="w-32 h-32 xl:w-40 xl:h-40 2xl:w-52 2xl:h-52 flex items-center justify-center pointer-events-none select-none">
                <img src={step2} className="w-full h-full object-contain" alt="Tear" />
              </div>
              <span className="font-handwriting text-lg xl:text-2xl 2xl:text-3xl text-[#2F3A2A] mt-2">Tear it.</span>
            </div>

            {/* Arrow 2 */}
            <div className="flex items-center justify-center h-32 xl:h-40 2xl:h-52 w-8 xl:w-12 2xl:w-16 shrink-0">
              <svg className="w-full h-8 text-[#2F3A2A]/40" viewBox="0 0 80 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path className="story-arrow-path story-arrow-path-1" d="M 10 12 Q 40 8, 70 12" strokeDasharray="100" strokeDashoffset="100" />
                <path className="story-arrow-head story-arrow-head-1" d="M 62 6 L 72 12 L 62 18" strokeDasharray="30" strokeDashoffset="30" />
              </svg>
            </div>

            {/* Step 3 */}
            <div className="story-step story-step-2 flex flex-col items-center text-center max-w-[155px] xl:max-w-[205px] 2xl:max-w-[245px] shrink-0">
              <div className="w-32 h-32 xl:w-40 xl:h-40 2xl:w-52 2xl:h-52 flex items-center justify-center pointer-events-none select-none">
                <img src={step3} className="w-full h-full object-contain" alt="Soak" />
              </div>
              <span className="font-handwriting text-lg xl:text-2xl 2xl:text-3xl text-[#2F3A2A] mt-2">Soak it.</span>
            </div>

            {/* Arrow 3 */}
            <div className="flex items-center justify-center h-32 xl:h-40 2xl:h-52 w-8 xl:w-12 2xl:w-16 shrink-0">
              <svg className="w-full h-8 text-[#2F3A2A]/40" viewBox="0 0 80 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path className="story-arrow-path story-arrow-path-2" d="M 10 12 Q 40 8, 70 12" strokeDasharray="100" strokeDashoffset="100" />
                <path className="story-arrow-head story-arrow-head-2" d="M 62 6 L 72 12 L 62 18" strokeDasharray="30" strokeDashoffset="30" />
              </svg>
            </div>

            {/* Step 4 */}
            <div className="story-step story-step-3 flex flex-col items-center text-center max-w-[155px] xl:max-w-[205px] 2xl:max-w-[245px] shrink-0">
              <div className="w-32 h-32 xl:w-40 xl:h-40 2xl:w-52 2xl:h-52 flex items-center justify-center pointer-events-none select-none">
                <img src={step4} className="w-full h-full object-contain" alt="Plant" />
              </div>
              <span className="font-handwriting text-lg xl:text-2xl 2xl:text-3xl text-[#2F3A2A] mt-2">Plant it.</span>
            </div>

            {/* Arrow 4 */}
            <div className="flex items-center justify-center h-32 xl:h-40 2xl:h-52 w-8 xl:w-12 2xl:w-16 shrink-0">
              <svg className="w-full h-8 text-[#2F3A2A]/40" viewBox="0 0 80 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path className="story-arrow-path story-arrow-path-3" d="M 10 12 Q 40 8, 70 12" strokeDasharray="100" strokeDashoffset="100" />
                <path className="story-arrow-head story-arrow-head-3" d="M 62 6 L 72 12 L 62 18" strokeDasharray="30" strokeDashoffset="30" />
              </svg>
            </div>

            {/* Step 5 */}
            <div className="story-step story-step-4 flex flex-col items-center text-center max-w-[165px] xl:max-w-[215px] 2xl:max-w-[265px] shrink-0 relative">
              <div className="w-32 h-32 xl:w-40 xl:h-40 2xl:w-52 2xl:h-52 flex items-center justify-center pointer-events-none select-none relative">
                <img src={step5} className="story-tree-img w-full h-full object-contain origin-bottom" alt="Grow" />
                
                <div className="story-watering-can absolute -right-10 xl:-right-12 top-2 xl:top-2 w-12 h-12 xl:w-16 xl:h-16 pointer-events-none">
                  <svg className="w-full h-full text-[#8A9B6E]/70 transform" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 28 h24 l-3 20 h-18 Z" fill="#EFE7DA" fillOpacity="0.4" />
                    <path d="M22 28 A 12 12 0 0 1 34 28" />
                    <path d="M16 32 C 10 32, 10 44, 16 44" />
                    <path d="M40 38 L 52 26" />
                    <path d="M50 24 L 54 28" />
                    <path className="story-water-spray" d="M 54 24 Q 62 30 65 38 M 52 22 Q 62 26 66 33" stroke="#8A9B6E" strokeWidth="1.5" strokeDasharray="3,3" strokeDashoffset="50" fill="none" />
                  </svg>
                </div>
              </div>
              <span className="font-handwriting text-lg xl:text-2xl 2xl:text-3xl text-[#2F3A2A] mt-2">Watch it grow.</span>
            </div>

          </div>
        </div>

        {/* Info Card */}
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div 
            className="story-card rounded-2xl md:rounded-3xl p-6 md:py-6 md:px-8 max-w-2xl mx-auto relative shadow-[0_4px_20px_rgba(47,58,42,0.02)] flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left"
            style={{
              background: 'linear-gradient(180deg, #F7F2E7 0%, #F2EBDC 100%)',
              border: '1px solid #D9D0BE'
            }}
          >
            <div className="p-2.5 bg-[#FAF9F6]/40 rounded-full shrink-0 text-[#8A9B6E]">
              <svg className="w-10 h-10 text-currentColor" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="10" r="2.2" />
                <path d="M12 6 C10 3, 14 3, 12 6 Z" />
                <path d="M12 14 C10 17, 14 17, 12 14 Z" />
                <path d="M8 10 C5 8, 5 12, 8 10 Z" />
                <path d="M16 10 C19 8, 19 12, 16 10 Z" />
                <path d="M9.2 7.2 C7 5.5, 8.5 4, 9.2 7.2 Z" />
                <path d="M14.8 12.8 C17 14.5, 15.5 16, 14.8 12.8 Z" />
                <path d="M9.2 12.8 C7 14.5, 8.5 16, 9.2 12.8 Z" />
                <path d="M14.8 7.2 C17 5.5, 15.5 4, 14.8 7.2 Z" />
                <path d="M12 12v8" />
                <path d="M12 15c1.5-0.5 2.5-1.5 2-3" />
                <path d="M12 17c-1.5-0.5-2.5-1.5-2-3" />
              </svg>
            </div>
            
            <div className="flex-1">
              <p className="font-serif text-[#2F3A2A] text-lg font-medium leading-snug tracking-wide">
                Our paper is embedded with seeds.
              </p>
              <p className="font-sans text-[#5E665A] text-sm sm:text-base mt-1 leading-relaxed">
                Nurture it. Watch it grow. Pass it on.
              </p>
            </div>
            
            <div className="absolute right-6 bottom-4 text-[#8A9B6E]/70 pointer-events-none hidden sm:block">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21c10-10 12-14 12-14s2 6-4 12c-3.5 3.5-8 2-8 2Z" fill="currentColor" fillOpacity="0.1" />
                <path d="M9 15l-3 3" />
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom Tagline */}
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="story-tagline-container flex items-center justify-center mt-20 relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl h-12 sm:h-16 md:h-20 mx-auto origin-center">
            <img 
              src={brushStrokeBg} 
              className="absolute inset-0 w-full h-full object-fill pointer-events-none select-none z-0 filter drop-shadow-[0_4px_12px_rgba(47,58,42,0.12)]" 
              alt="" 
            />
            <p className="story-tagline-text relative z-10 font-handwriting text-xl sm:text-2xl md:text-3xl text-black text-center px-8 tracking-wide transform translate-y-[-2px] sm:translate-y-[-4px]">
              From waste to wonder. From paper to purpose.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* B. MOBILE VIEW (hidden on desktop)         */}
      {/* ========================================== */}
      <div 
        className="block lg:hidden w-full pt-32 pb-16 px-6 max-w-[390px] mx-auto sm:max-w-md"
        style={{
          background: '#F8F6F1'
        }}
      >
        {/* Mobile Header Introduction */}
        <div className="text-center mb-10 relative z-10">
          <div className="mobile-story-intro-text font-serif text-[#2F3A2A]/85 text-[15px] sm:text-[17px] font-light leading-relaxed tracking-wide space-y-4">
            <p>
              AT PAPIAH, every journal begins its journey long before it reaches you.
            </p>
            <p>
              Crafted from seed paper and guided by intention, each one is made to be written, planted, and grown — turning your thoughts today into a greener tomorrow.
            </p>
          </div>
          
          {/* Main Headline (Focal Point) */}
          <h3 className="mobile-story-headline font-cormorant font-serif text-[28px] sm:text-[32px] text-[#2F3A2A] font-semibold leading-tight tracking-wide mt-8">
            This is not just paper.<br />
            This is possibility.
          </h3>
        </div>

        {/* Mobile Process Vertical Timeline */}
        <div className="space-y-10 mb-12 relative z-10">
          {steps.map((step, idx) => (
            <div key={idx} className="mobile-story-step-item flex flex-col items-center">
              
              {/* Illustration Container */}
              <div className="w-[160px] h-[160px] bg-[#FAF8F5] border border-[#EBE6DC] rounded-[24px] shadow-sm flex items-center justify-center p-4">
                <img src={step.image} className="w-full h-full object-contain" alt={step.title} />
              </div>

              {/* Connector line down to Badge */}
              <div className="w-[1px] h-6 bg-[#8A9B6E]/40" />

              {/* Small olive badge icon */}
              <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#D9D0BE] flex items-center justify-center text-[#8A9B6E] shadow-xs">
                {step.icon}
              </div>

              {/* Connector line down to Text */}
              <div className="w-[1px] h-6 bg-[#8A9B6E]/40" />

              {/* Title & Description */}
              <div className="max-w-[320px] text-center px-2">
                <h4 className="font-serif font-semibold text-lg text-[#2F3A2A] tracking-wide">
                  {step.title}
                </h4>
                <p className="font-sans text-[#6F746B] text-[14px] mt-1.5 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Vertical line connecting to next step */}
              {idx < steps.length - 1 && (
                <div className="w-[1px] h-10 bg-[#8A9B6E]/30 mt-6 -mb-4" />
              )}

            </div>
          ))}
        </div>

        {/* Mobile Info Card */}
        <div className="relative z-10 w-full mb-12">
          <div 
            className="mobile-story-card rounded-[24px] p-6 relative shadow-xs flex flex-col items-center gap-4 text-center bg-[#F5F0E4] border border-[#D9D0BE]"
          >
            {/* Botanical Flower Icon */}
            <div className="p-3 bg-[#FAF9F6]/50 rounded-full text-[#8A9B6E]">
              <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="10" r="2.2" />
                <path d="M12 6 C10 3, 14 3, 12 6 Z" />
                <path d="M12 14 C10 17, 14 17, 12 14 Z" />
                <path d="M8 10 C5 8, 5 12, 8 10 Z" />
                <path d="M16 10 C19 8, 19 12, 16 10 Z" />
                <path d="M9.2 7.2 C7 5.5, 8.5 4, 9.2 7.2 Z" />
                <path d="M14.8 12.8 C17 14.5, 15.5 16, 14.8 12.8 Z" />
                <path d="M9.2 12.8 C7 14.5, 8.5 16, 9.2 12.8 Z" />
                <path d="M14.8 7.2 C17 5.5, 15.5 4, 14.8 7.2 Z" />
                <path d="M12 12v8" />
              </svg>
            </div>
            
            {/* Content */}
            <div>
              <p className="font-serif text-[#2F3A2A] text-[17px] font-semibold leading-snug tracking-wide">
                Our paper is embedded with seeds.
              </p>
              <p className="font-sans text-[#6F746B] text-[13px] mt-1.5 leading-relaxed">
                Nurture it. Watch it grow. Pass it on.
              </p>
            </div>
            
            {/* Decorative Leaf (Right side) */}
            <div className="absolute right-4 bottom-3 text-[#8A9B6E]/70 pointer-events-none">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21c10-10 12-14 12-14s2 6-4 12c-3.5 3.5-8 2-8 2Z" fill="currentColor" fillOpacity="0.1" />
                <path d="M9 15l-3 3" />
              </svg>
            </div>
          </div>
        </div>

        {/* Mobile Tagline Quote */}
        <div className="mobile-story-tagline-container flex flex-col items-center justify-center mt-12 mb-16 relative z-10">
          <p className="font-handwriting text-2xl text-[#2F3A2A] text-center tracking-wide leading-tight">
            From waste to wonder.<br />
            From paper to purpose.
          </p>
          {/* Olive brush stroke underline */}
          <div className="w-36 h-3 mt-3 relative opacity-60">
            <img 
              src={brushStrokeBg} 
              className="w-full h-full object-contain filter brightness-[0.7] saturate-[0.8]" 
              alt="" 
            />
          </div>
        </div>
      </div>

      {/* Shared bottom grass layer */}
      <div className="absolute bottom-0 left-0 w-full h-[180px] sm:h-[240px] md:h-[270px] lg:h-[360px] xl:h-[400px] 2xl:h-[450px] pointer-events-none select-none z-0 overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src={grassImg} 
            className="w-full h-full object-cover object-bottom opacity-95 mix-blend-multiply" 
            style={{
              maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%), linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,1) 75%, rgba(0,0,0,1) 100%)',
              WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%), linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,1) 75%, rgba(0,0,0,1) 100%)',
              maskComposite: 'intersect',
              WebkitMaskComposite: 'source-in'
            }}
            alt="" 
          />
        </div>
        
        {/* Floating Particles and Leaves */}
        <div ref={particlesContainerRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />
      </div>

    </section>
  );
};
