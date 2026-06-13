import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import step1 from '../assets/journey_step_1_new.png';
import step2 from '../assets/journey_step_2_new.png';
import step3 from '../assets/journey_step_3_new.png';
import step4 from '../assets/journey_step_4_new.png';
import step5 from '../assets/journey_step_5_new.png';
import brushStrokeBg from '../assets/brush_stroke_bg.png';
import grassImg from '../assets/grass.png';

gsap.registerPlugin(ScrollTrigger);

export const PlantableJourneySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const particlesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial State Setup
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

      // 2. Timeline Animation triggered when section enters viewport
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      });

      // Intro paragraph fades up
      tl.to('.story-intro-text', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power2.out'
      });

      // Animate cloud, sparkles, paper airplane
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

      // Sequentially animate the steps and connecting arrows
      // Step 1: You write
      tl.to('.story-step-0', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: 'power2.out'
      }, '-=0.2')
      .to('.story-arrow-path-0', { strokeDashoffset: 0, duration: 0.35, ease: 'none' })
      .to('.story-arrow-head-0', { strokeDashoffset: 0, duration: 0.15, ease: 'none' });

      // Step 2: Tear it
      tl.to('.story-step-1', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: 'power2.out'
      }, '-=0.1')
      .to('.story-arrow-path-1', { strokeDashoffset: 0, duration: 0.35, ease: 'none' })
      .to('.story-arrow-head-1', { strokeDashoffset: 0, duration: 0.15, ease: 'none' });

      // Step 3: Soak it
      tl.to('.story-step-2', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: 'power2.out'
      }, '-=0.1')
      .to('.story-arrow-path-2', { strokeDashoffset: 0, duration: 0.35, ease: 'none' })
      .to('.story-arrow-head-2', { strokeDashoffset: 0, duration: 0.15, ease: 'none' });

      // Step 4: Plant it
      tl.to('.story-step-3', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: 'power2.out'
      }, '-=0.1')
      .to('.story-arrow-path-3', { strokeDashoffset: 0, duration: 0.35, ease: 'none' })
      .to('.story-arrow-head-3', { strokeDashoffset: 0, duration: 0.15, ease: 'none' });

      // Step 5: Watch it grow (Tree)
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

      // Animate Info Card
      tl.to('.story-card', {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power2.out'
      }, '-=1.0');

      // Tagline Brush stroke slides in
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
      className="w-full py-20 md:py-28 relative z-10 overflow-hidden select-none"
      style={{
        background: 'linear-gradient(180deg, #F8F6F1 0%, #F5F1E8 100%)'
      }}
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
      {/* 1. DECORATIVE BACKGROUND ELEMENTS */}

      {/* Soft Cloud - Top Left */}
      <div className="story-cloud absolute top-10 left-6 sm:left-12 md:left-24 w-24 h-16 pointer-events-none opacity-20 z-0">
        <svg className="w-full h-full text-[#2F3A2A]/50" viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 20 45 C 10 45, 5 35, 12 28 C 10 15, 25 10, 35 15 C 45 5, 65 10, 68 20 C 78 18, 85 28, 80 38 C 88 45, 78 55, 68 52 C 58 55, 22 55, 20 45 Z" />
        </svg>
      </div>

      {/* Sparkles / Tiny Stars */}
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

      {/* Paper Airplane - Top Right */}
      <div className="absolute top-10 right-8 sm:right-16 md:right-32 w-28 h-16 pointer-events-none z-0">
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

      {/* 2. SECTION HEADER */}
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

      {/* 3. STORY FLOW (5 STEPS) */}
      <div className="max-w-[95%] lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[1450px] mx-auto px-4 sm:px-8 mb-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-between w-full gap-6 lg:gap-2">
          
          {/* Step 1: You write. */}
          <div className="story-step story-step-0 flex flex-col items-center text-center max-w-[150px] sm:max-w-[195px] lg:max-w-[155px] xl:max-w-[205px] 2xl:max-w-[245px] shrink-0">
            <div className="w-36 h-36 sm:w-44 sm:h-44 lg:w-32 lg:h-32 xl:w-40 xl:h-40 2xl:w-52 2xl:h-52 flex items-center justify-center pointer-events-none select-none">
              <img src={step1} className="w-full h-full object-contain" alt="Write" />
            </div>
            <span className="font-handwriting text-xl sm:text-2xl lg:text-lg xl:text-2xl 2xl:text-3xl text-[#2F3A2A] mt-2">You write.</span>
          </div>

          {/* Arrow 1 */}
          <div className="flex items-center justify-center h-12 lg:h-32 xl:h-40 2xl:h-52 w-12 lg:w-8 xl:w-12 2xl:w-16 shrink-0">
            {/* Horizontal Arrow (Desktop) */}
            <svg className="hidden lg:block w-full h-8 text-[#2F3A2A]/40" viewBox="0 0 80 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path className="story-arrow-path story-arrow-path-0" d="M 10 12 Q 40 8, 70 12" strokeDasharray="100" strokeDashoffset="100" />
              <path className="story-arrow-head story-arrow-head-0" d="M 62 6 L 72 12 L 62 18" strokeDasharray="30" strokeDashoffset="30" />
            </svg>
            {/* Vertical Arrow (Mobile) */}
            <svg className="block lg:hidden w-8 h-full text-[#2F3A2A]/40" viewBox="0 0 24 80" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path className="story-arrow-path story-arrow-path-0" d="M 12 10 Q 8 40, 12 70" strokeDasharray="100" strokeDashoffset="100" />
              <path className="story-arrow-head story-arrow-head-0" d="M 6 62 L 12 72 L 18 62" strokeDasharray="30" strokeDashoffset="30" />
            </svg>
          </div>

          {/* Step 2: Tear it. */}
          <div className="story-step story-step-1 flex flex-col items-center text-center max-w-[150px] sm:max-w-[195px] lg:max-w-[155px] xl:max-w-[205px] 2xl:max-w-[245px] shrink-0">
            <div className="w-36 h-36 sm:w-44 sm:h-44 lg:w-32 lg:h-32 xl:w-40 xl:h-40 2xl:w-52 2xl:h-52 flex items-center justify-center pointer-events-none select-none">
              <img src={step2} className="w-full h-full object-contain" alt="Tear" />
            </div>
            <span className="font-handwriting text-xl sm:text-2xl lg:text-lg xl:text-2xl 2xl:text-3xl text-[#2F3A2A] mt-2">Tear it.</span>
          </div>

          {/* Arrow 2 */}
          <div className="flex items-center justify-center h-12 lg:h-32 xl:h-40 2xl:h-52 w-12 lg:w-8 xl:w-12 2xl:w-16 shrink-0">
            {/* Horizontal Arrow */}
            <svg className="hidden lg:block w-full h-8 text-[#2F3A2A]/40" viewBox="0 0 80 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path className="story-arrow-path story-arrow-path-1" d="M 10 12 Q 40 8, 70 12" strokeDasharray="100" strokeDashoffset="100" />
              <path className="story-arrow-head story-arrow-head-1" d="M 62 6 L 72 12 L 62 18" strokeDasharray="30" strokeDashoffset="30" />
            </svg>
            {/* Vertical Arrow */}
            <svg className="block lg:hidden w-8 h-full text-[#2F3A2A]/40" viewBox="0 0 24 80" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path className="story-arrow-path story-arrow-path-1" d="M 12 10 Q 8 40, 12 70" strokeDasharray="100" strokeDashoffset="100" />
              <path className="story-arrow-head story-arrow-head-1" d="M 6 62 L 12 72 L 18 62" strokeDasharray="30" strokeDashoffset="30" />
            </svg>
          </div>

          {/* Step 3: Soak it. */}
          <div className="story-step story-step-2 flex flex-col items-center text-center max-w-[150px] sm:max-w-[195px] lg:max-w-[155px] xl:max-w-[205px] 2xl:max-w-[245px] shrink-0">
            <div className="w-36 h-36 sm:w-44 sm:h-44 lg:w-32 lg:h-32 xl:w-40 xl:h-40 2xl:w-52 2xl:h-52 flex items-center justify-center pointer-events-none select-none">
              <img src={step3} className="w-full h-full object-contain" alt="Soak" />
            </div>
            <span className="font-handwriting text-xl sm:text-2xl lg:text-lg xl:text-2xl 2xl:text-3xl text-[#2F3A2A] mt-2">Soak it.</span>
          </div>

          {/* Arrow 3 */}
          <div className="flex items-center justify-center h-12 lg:h-32 xl:h-40 2xl:h-52 w-12 lg:w-8 xl:w-12 2xl:w-16 shrink-0">
            {/* Horizontal Arrow */}
            <svg className="hidden lg:block w-full h-8 text-[#2F3A2A]/40" viewBox="0 0 80 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path className="story-arrow-path story-arrow-path-2" d="M 10 12 Q 40 8, 70 12" strokeDasharray="100" strokeDashoffset="100" />
              <path className="story-arrow-head story-arrow-head-2" d="M 62 6 L 72 12 L 62 18" strokeDasharray="30" strokeDashoffset="30" />
            </svg>
            {/* Vertical Arrow */}
            <svg className="block lg:hidden w-8 h-full text-[#2F3A2A]/40" viewBox="0 0 24 80" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path className="story-arrow-path story-arrow-path-2" d="M 12 10 Q 8 40, 12 70" strokeDasharray="100" strokeDashoffset="100" />
              <path className="story-arrow-head story-arrow-head-2" d="M 6 62 L 12 72 L 18 62" strokeDasharray="30" strokeDashoffset="30" />
            </svg>
          </div>

          {/* Step 4: Plant it. */}
          <div className="story-step story-step-3 flex flex-col items-center text-center max-w-[150px] sm:max-w-[195px] lg:max-w-[155px] xl:max-w-[205px] 2xl:max-w-[245px] shrink-0">
            <div className="w-36 h-36 sm:w-44 sm:h-44 lg:w-32 lg:h-32 xl:w-40 xl:h-40 2xl:w-52 2xl:h-52 flex items-center justify-center pointer-events-none select-none">
              <img src={step4} className="w-full h-full object-contain" alt="Plant" />
            </div>
            <span className="font-handwriting text-xl sm:text-2xl lg:text-lg xl:text-2xl 2xl:text-3xl text-[#2F3A2A] mt-2">Plant it.</span>
          </div>

          {/* Arrow 4 */}
          <div className="flex items-center justify-center h-12 lg:h-32 xl:h-40 2xl:h-52 w-12 lg:w-8 xl:w-12 2xl:w-16 shrink-0">
            {/* Horizontal Arrow */}
            <svg className="hidden lg:block w-full h-8 text-[#2F3A2A]/40" viewBox="0 0 80 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path className="story-arrow-path story-arrow-path-3" d="M 10 12 Q 40 8, 70 12" strokeDasharray="100" strokeDashoffset="100" />
              <path className="story-arrow-head story-arrow-head-3" d="M 62 6 L 72 12 L 62 18" strokeDasharray="30" strokeDashoffset="30" />
            </svg>
            {/* Vertical Arrow */}
            <svg className="block lg:hidden w-8 h-full text-[#2F3A2A]/40" viewBox="0 0 24 80" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path className="story-arrow-path story-arrow-path-3" d="M 12 10 Q 8 40, 12 70" strokeDasharray="100" strokeDashoffset="100" />
              <path className="story-arrow-head story-arrow-head-3" d="M 6 62 L 12 72 L 18 62" strokeDasharray="30" strokeDashoffset="30" />
            </svg>
          </div>

          {/* Step 5: Watch it grow. */}
          <div className="story-step story-step-4 flex flex-col items-center text-center max-w-[170px] sm:max-w-[215px] lg:max-w-[165px] xl:max-w-[215px] 2xl:max-w-[265px] shrink-0 relative">
            <div className="w-36 h-36 sm:w-44 sm:h-44 lg:w-32 lg:h-32 xl:w-40 xl:h-40 2xl:w-52 2xl:h-52 flex items-center justify-center pointer-events-none select-none relative">
              <img src={step5} className="story-tree-img w-full h-full object-contain origin-bottom" alt="Grow" />
              
              {/* Decorative Watering Can (absolute to the right of the tree) */}
              <div className="story-watering-can absolute -right-10 lg:-right-10 xl:-right-12 2xl:-right-16 top-2 lg:top-2 xl:top-2 2xl:top-4 w-12 h-12 lg:w-12 lg:h-12 xl:w-16 xl:h-16 2xl:w-20 2xl:h-20 pointer-events-none hidden md:block">
                <svg className="w-full h-full text-[#8A9B6E]/70 transform" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 28 h24 l-3 20 h-18 Z" fill="#EFE7DA" fillOpacity="0.4" />
                  <path d="M22 28 A 12 12 0 0 1 34 28" />
                  <path d="M16 32 C 10 32, 10 44, 16 44" />
                  <path d="M40 38 L 52 26" />
                  <path d="M50 24 L 54 28" />
                  {/* Droplets path */}
                  <path className="story-water-spray" d="M 54 24 Q 62 30 65 38 M 52 22 Q 62 26 66 33" stroke="#8A9B6E" strokeWidth="1.5" strokeDasharray="3,3" strokeDashoffset="50" fill="none" />
                </svg>
              </div>
            </div>
            <span className="font-handwriting text-xl sm:text-2xl lg:text-lg xl:text-2xl 2xl:text-3xl text-[#2F3A2A] mt-2">Watch it grow.</span>
          </div>

        </div>
      </div>

      {/* 4. INFO CARD */}
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div 
          className="story-card rounded-2xl md:rounded-3xl p-6 md:py-6 md:px-8 max-w-2xl mx-auto relative shadow-[0_4px_20px_rgba(47,58,42,0.02)] flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left"
          style={{
            background: 'linear-gradient(180deg, #F7F2E7 0%, #F2EBDC 100%)',
            border: '1px solid #D9D0BE'
          }}
        >
          {/* Flower Icon */}
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
          
          {/* Content */}
          <div className="flex-1">
            <p className="font-serif text-[#2F3A2A] text-lg font-medium leading-snug tracking-wide">
              Our paper is embedded with seeds.
            </p>
            <p className="font-sans text-[#5E665A] text-sm sm:text-base mt-1 leading-relaxed">
              Nurture it. Watch it grow. Pass it on.
            </p>
          </div>
          
          {/* Subtle Decorative Leaf */}
          <div className="absolute right-6 bottom-4 text-[#8A9B6E]/70 pointer-events-none hidden sm:block">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 21c10-10 12-14 12-14s2 6-4 12c-3.5 3.5-8 2-8 2Z" fill="currentColor" fillOpacity="0.1" />
              <path d="M9 15l-3 3" />
            </svg>
          </div>
        </div>
      </div>

      {/* 5. BOTTOM TAGLINE */}
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="story-tagline-container flex items-center justify-center mt-20 relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl h-12 sm:h-16 md:h-20 mx-auto origin-center">
          {/* Watercolor Brush stroke bg */}
          <img 
            src={brushStrokeBg} 
            className="absolute inset-0 w-full h-full object-fill pointer-events-none select-none z-0 filter drop-shadow-[0_4px_12px_rgba(47,58,42,0.12)]" 
            alt="" 
          />
          {/* Black handwritten tagline */}
          <p className="story-tagline-text relative z-10 font-handwriting text-xl sm:text-2xl md:text-3xl text-black text-center px-8 tracking-wide transform translate-y-[-2px] sm:translate-y-[-4px]">
            From waste to wonder. From paper to purpose.
          </p>
        </div>
      </div>

      {/* 6. BOTTOM DECORATIVE ENVIRONMENTAL GRASS LAYER */}
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
        
        {/* Subtle Floating Particles and Drifting Leaves */}
        <div ref={particlesContainerRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />
      </div>

    </section>
  );
};
