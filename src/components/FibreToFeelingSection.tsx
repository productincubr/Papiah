import React, { useRef, useEffect, useState } from 'react';
import { useCursor } from '../context/CursorContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import step1 from '../assets/fibre_step_1.webp';
import step2 from '../assets/fibre_step_2.webp';
import step3 from '../assets/fibre_step_3.webp';
import step4 from '../assets/fibre_step_4.webp';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    label: 'Cotton waste',
    desc: 'Sourcing discarded cotton scraps from garment units, giving a second life to forgotten organic fibers.',
    img: step1,
  },
  {
    label: 'Handmade paper',
    desc: 'Beating fibers into refined pulp and pulling sheets hand-by-hand on traditional wooden deckles.',
    img: step2,
  },
  {
    label: 'Seed-infused pages',
    desc: 'Integrating live wildflower seeds into the wet pulp, creating organic paper that blooms when planted.',
    img: step3,
  },
  {
    label: 'Thoughtfully crafted journals',
    desc: 'Hand-stitching and binding pages with organic threads into soft, tactile leather-free journals.',
    img: step4,
  }
];

export const FibreToFeelingSection: React.FC = () => {
  const { setCursorType } = useCursor();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const headingRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const storyStatementRef = useRef<HTMLParagraphElement>(null);
  const timelineCardRef = useRef<HTMLDivElement>(null);
  const signatureRef = useRef<HTMLDivElement>(null);

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const listRefs = useRef<(HTMLDivElement | null)[]>([]);
  const listDotsRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const [isMobile, setIsMobile] = useState(false);

  // Spawn floating paper dust particles around the active card
  const spawnPaperDust = (cardEl: HTMLElement) => {
    const particleCount = 15;
    const colors = ['#FAF9F6', '#EAE6DD', '#C5B09E', '#B89CE8'];
    for (let i = 0; i < particleCount; i++) {
      const p = document.createElement('div');
      p.className = 'absolute pointer-events-none rounded-full bg-current z-10';
      const size = Math.random() * 4 + 2; // 2px to 6px
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.color = colors[Math.floor(Math.random() * colors.length)];
      p.style.left = `${Math.random() * 100}%`;
      p.style.top = `${Math.random() * 80 + 10}%`;
      p.style.opacity = '0';
      cardEl.appendChild(p);

      gsap.fromTo(p,
        { opacity: 0, y: 15, x: 0 },
        {
          opacity: Math.random() * 0.45 + 0.15,
          y: -45,
          x: (Math.random() - 0.5) * 35,
          duration: Math.random() * 2.2 + 1.8,
          ease: 'power1.out',
          onComplete: () => p.remove()
        }
      );
    }
  };

  // Custom premium paper burst & golden sparks
  const triggerPaperBurst = (x: number, y: number) => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Expand a soft circular warm pulse ring
    const pulse = document.createElement('div');
    pulse.className = 'absolute pointer-events-none rounded-full bg-transparent border border-[#B89CE8] z-30';
    pulse.style.width = '30px';
    pulse.style.height = '30px';
    pulse.style.left = `${x}px`;
    pulse.style.top = `${y}px`;
    pulse.style.transform = 'translate(-50%, -50%)';
    container.appendChild(pulse);

    gsap.to(pulse, {
      scale: 6.5,
      opacity: 0,
      duration: 1.6,
      ease: 'power2.out',
      onComplete: () => pulse.remove()
    });

    // 2. Tiny paper particles burst (subtle paper dust)
    const particleCount = 40;
    const colors = ['#FAF9F6', '#EAE6DD', '#C5B09E', '#B89CE8'];
    for (let i = 0; i < particleCount; i++) {
      const el = document.createElement('div');
      el.className = 'absolute pointer-events-none z-30 rounded-full';
      
      const size = Math.random() * 4 + 1.5; // 1.5px to 5.5px
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      el.style.transform = 'translate(-50%, -50%)';
      container.appendChild(el);

      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 110 + 30;
      const dx = Math.cos(angle) * speed;
      const dy = Math.sin(angle) * speed;

      // Drift downwards like light paper dust
      gsap.fromTo(el,
        { scale: 0.6, opacity: 1, x: 0, y: 0 },
        {
          x: dx,
          y: dy + 35,
          scale: 0.15,
          opacity: 0,
          duration: Math.random() * 1.6 + 1.2,
          ease: 'power2.out',
          onComplete: () => el.remove()
        }
      );
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // GSAP ScrollTrigger Animations
  useEffect(() => {
    const cards = cardRefs.current.filter((el): el is HTMLDivElement => el !== null);
    const dots = dotRefs.current.filter((el): el is HTMLDivElement => el !== null);
    const listItems = listRefs.current.filter((el): el is HTMLDivElement => el !== null);
    const listDots = listDotsRefs.current.filter((el): el is HTMLSpanElement => el !== null);

    const ctx = gsap.context(() => {
      // 1. Heading fades up
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 35 },
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

      // 2. Heading divider line drawing
      if (dividerRef.current) {
        gsap.fromTo(dividerRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: dividerRef.current,
              start: 'top 85%'
            }
          }
        );
      }

      // 3. Bullet points appear
      if (listItems.length > 0) {
        gsap.fromTo(listItems,
          { opacity: 0, x: -15 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: listItems[0],
              start: 'top 85%'
            }
          }
        );
      }

      // 4. Description fades up
      if (descriptionRef.current) {
        gsap.fromTo(descriptionRef.current,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: descriptionRef.current,
              start: 'top 88%'
            }
          }
        );
      }

      if (isMobile) {
        // Mobile Animation Sequence
        gsap.set(cards, { opacity: 0.35, filter: 'blur(1.5px)', pointerEvents: 'none' });
        gsap.set(dots, { scale: 1 });
        gsap.set(storyStatementRef.current, { opacity: 0, y: 15 });

        // Stagger visual journey cards in on scroll
        gsap.fromTo(cards,
          { opacity: 0.35, y: 35, filter: 'blur(1.5px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cards[0],
              start: 'top 80%',
              onEnter: () => {
                cards.forEach((card) => {
                  gsap.to(card, { pointerEvents: 'auto', duration: 0 });
                  spawnPaperDust(card);
                  const wrapper = card.querySelector('.id-card-wrapper');
                  if (wrapper) {
                    gsap.to(wrapper, { borderColor: '#B89CE8', boxShadow: '0 0 20px rgba(184, 156, 232, 0.2)', duration: 0.4 });
                  }
                });
              }
            }
          }
        );

        // Highlight story list items dynamically as you scroll through cards
        cards.forEach((card, idx) => {
          const listText = listItems[idx];
          const listDot = listDots[idx];
          const dot = dots[idx];

          if (listText && listDot) {
            gsap.timeline({
              scrollTrigger: {
                trigger: card,
                start: 'top 75%',
                end: 'bottom 25%',
                toggleActions: 'play reverse play reverse'
              }
            })
            .to(listText, { color: '#2F3A2A', fontWeight: '500', duration: 0.3 })
            .to(listDot, { backgroundColor: '#B89CE8', scale: 1.4, duration: 0.2 }, '-=0.3');
          }

          // Trigger burst and statement on final card
          if (idx === 3) {
            ScrollTrigger.create({
              trigger: card,
              start: 'top 70%',
              onEnter: () => {
                if (dot) {
                  gsap.to(dot, { scale: 2.0, backgroundColor: '#FAF9F6', boxShadow: '0 0 10px #FAF9F6', duration: 0.4 });
                  const rect = dot.getBoundingClientRect();
                  const container = containerRef.current;
                  if (container) {
                    const parentRect = container.getBoundingClientRect();
                    const x = rect.left - parentRect.left + rect.width / 2;
                    const y = rect.top - parentRect.top + rect.height / 2;
                    setTimeout(() => {
                      triggerPaperBurst(x, y);
                      gsap.to(storyStatementRef.current, { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' });
                    }, 400);
                  }
                }
              }
            });
          }
        });

      } else {
        // Desktop Animation Timeline
        gsap.set(cards, { opacity: 0.35, filter: 'blur(1.5px)', pointerEvents: 'none' });
        gsap.set(dots, { scale: 1, opacity: 0.4 });
        gsap.set(listItems, { color: '#9CA3AF', fontWeight: '300' });
        gsap.set(listDots, { backgroundColor: '#C5B09E', scale: 1, opacity: 0.4 });
        gsap.set(storyStatementRef.current, { opacity: 0, y: 15 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 65%',
            toggleActions: 'play none none none',
          }
        });

        // Step 1 entrance
        const card0 = cards[0];
        const dot0 = dots[0];
        const listText0 = listItems[0];
        const listDot0 = listDots[0];

        if (card0) {
          tl.to(card0, { opacity: 1, filter: 'blur(0px)', pointerEvents: 'auto', duration: 0.5 });
          const wrapper = card0.querySelector('.id-card-wrapper');
          if (wrapper) {
            tl.to(wrapper, { borderColor: '#B89CE8', boxShadow: '0 0 20px rgba(184, 156, 232, 0.2)', duration: 0.4 }, '-=0.5');
          }
          tl.add(() => spawnPaperDust(card0));
        }
        
        if (dot0) {
          tl.to(dot0, { scale: 1.3, opacity: 1, duration: 0.2, ease: 'back.out(2)' }, '-=0.3')
            .to(dot0, { scale: 1, duration: 0.2 });
        }

        if (listText0) {
          tl.to(listText0, { color: '#2F3A2A', fontWeight: '500', duration: 0.3 }, '-=0.4');
        }

        if (listDot0) {
          tl.to(listDot0, { backgroundColor: '#B89CE8', scale: 1.4, opacity: 1, duration: 0.3 }, '-=0.3');
        }

        // Sequential card transitions
        for (let i = 0; i < 3; i++) {
          const nextIdx = i + 1;
          const nextCard = cards[nextIdx];
          const nextDot = dots[nextIdx];
          const currentListText = listItems[i];
          const nextListText = listItems[nextIdx];
          const currentListDot = listDots[i];
          const nextListDot = listDots[nextIdx];

          tl.to({}, { duration: 1.0 });

          if (currentListText) {
            tl.to(currentListText, { color: '#9CA3AF', fontWeight: '300', duration: 0.3 }, '-=0.3');
          }
          if (currentListDot) {
            tl.to(currentListDot, { backgroundColor: '#C5B09E', scale: 1, opacity: 0.4, duration: 0.3 }, '-=0.3');
          }

          if (nextCard) {
            tl.to(nextCard, { opacity: 1, filter: 'blur(0px)', pointerEvents: 'auto', duration: 0.5 }, '-=0.3');
            const wrapper = nextCard.querySelector('.id-card-wrapper');
            if (wrapper) {
              tl.to(wrapper, { borderColor: '#B89CE8', boxShadow: '0 0 20px rgba(184, 156, 232, 0.2)', duration: 0.4 }, '-=0.5');
            }
          }

          if (nextDot) {
            tl.to(nextDot, { scale: 1.3, opacity: 1, duration: 0.2, ease: 'back.out(2)' }, '-=0.3')
              .to(nextDot, { scale: 1, duration: 0.2 });
          }

          if (nextListText) {
            tl.to(nextListText, { color: '#2F3A2A', fontWeight: '500', duration: 0.3 }, '-=0.4');
          }

          if (nextListDot) {
            tl.to(nextListDot, { backgroundColor: '#B89CE8', scale: 1.4, opacity: 1, duration: 0.3 }, '-=0.3');
          }

          // Special card effects
          if (nextCard) {
            tl.add(() => spawnPaperDust(nextCard), '-=0.3');
            if (nextIdx === 1) {
              const img = nextCard.querySelector('img');
              if (img) {
                tl.to(img, { scale: 1.15, duration: 0.3 }, '-=0.3')
                  .to(img, { scale: 1.1, duration: 0.3 });
              }
            } else if (nextIdx === 2) {
              tl.to(nextCard, { rotation: 1.5, duration: 0.4, yoyo: true, repeat: 3, transformOrigin: 'top center' }, '-=0.3');
            } else if (nextIdx === 3) {
              tl.to(nextCard, { y: -10, duration: 0.6, ease: 'power2.out' }, '-=0.3');
              if (nextDot) {
                tl.to(nextDot, { scale: 2.2, backgroundColor: '#FAF9F6', boxShadow: '0 0 15px #FAF9F6', duration: 0.4 })
                  .add(() => {
                    const container = containerRef.current;
                    if (container) {
                      const rect = nextDot.getBoundingClientRect();
                      const parentRect = container.getBoundingClientRect();
                      const x = rect.left - parentRect.left + rect.width / 2;
                      const y = rect.top - parentRect.top + rect.height / 2;
                      triggerPaperBurst(x, y);
                    }
                  })
                  .to(storyStatementRef.current, { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' }, '+=0.2');
              }
            }
          }
        }

        // Parallax image scrolling on desktop
        cards.forEach((card) => {
          const img = card.querySelector('img');
          if (img) {
            gsap.fromTo(img,
              { y: -15 },
              {
                y: 15,
                ease: 'none',
                scrollTrigger: {
                  trigger: card,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: true
                }
              }
            );
          }
        });
      }

      // 5. Timeline steps animate sequentially
      const timelineSteps = timelineCardRef.current?.querySelectorAll('.timeline-step');
      if (timelineSteps) {
        gsap.fromTo(timelineSteps,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.25,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: timelineCardRef.current,
              start: 'top 80%'
            }
          }
        );
      }

      // 6. Closing handwritten note appears last
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

    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section 
      ref={containerRef}
      className="w-full bg-[#F8F6F1] relative z-10 select-none border-b border-[#E7E1D6]/60 py-12 px-6 md:py-24 md:px-12 overflow-hidden"
      onMouseEnter={() => setCursorType('philosophy')}
      onMouseLeave={() => setCursorType('default')}
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center w-full">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10 lg:gap-16 items-center w-full">
          
          {/* Left Column: Narrative Content & List */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-left justify-center w-full">
            
            {/* Elegant Serif & Lavender Script Heading */}
            <h2 ref={headingRef} className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#2F3A2A] font-light tracking-tight mb-6 leading-tight">
              From <br className="hidden lg:inline" />
              <span className="font-handwriting text-[1.1em] text-[#B89CE8] italic mr-1">fibre</span> <br />
              to <span className="font-handwriting text-[1.1em] text-[#B89CE8] italic mr-1">feeling</span>.
            </h2>
            
            {/* Divider line */}
            <div ref={dividerRef} className="w-12 h-[1.5px] bg-[#C5B09E] mb-8 mx-auto lg:mx-0"></div>
            
            {/* Step list with dots */}
            <div className="flex flex-col items-center lg:items-start gap-5 mb-10 pl-1 w-full">
              {steps.map((step, idx) => (
                <div 
                  key={idx}
                  ref={(el) => { listRefs.current[idx] = el; }}
                  className="flex items-center gap-4 text-sm md:text-base text-gray-400 font-sans font-light transition-all duration-300 hover:translate-x-1 cursor-default"
                >
                  <span 
                    ref={(el) => { listDotsRefs.current[idx] = el; }}
                    className="w-1.5 h-1.5 rounded-full bg-[#E7E1D6] transition-all duration-300 shrink-0"
                  />
                  {step.label.charAt(0).toUpperCase() + step.label.slice(1)}.
                </div>
              ))}
            </div>
            
            {/* Description Paragraph */}
            <p ref={descriptionRef} className="text-base md:text-lg text-[#6F746B]/80 font-sans font-light italic leading-relaxed max-w-[320px] mx-auto lg:mx-0">
              A sensory documentation told through texture.
            </p>
          </div>

          {/* Right Column: Process Cards & Timelines */}
          <div className="lg:col-span-9 flex flex-col justify-center gap-10 w-full">
            
            {/* 2x2 Grid on Mobile, 4 columns on Desktop */}
            <div className="relative w-[90%] md:w-full mx-auto md:mx-0 py-6 select-none">
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 relative z-10 w-full">
                {steps.map((step, idx) => (
                  <div 
                    key={idx}
                    ref={(el) => { cardRefs.current[idx] = el; }}
                    className="flex flex-col items-center text-center w-full pointer-events-none"
                    style={{ opacity: 0.35, filter: 'blur(1.5px)' }}
                  >
                    {/* Label & Dot */}
                    <div className="h-14 md:h-20 flex flex-col justify-end items-center mb-4 relative w-full px-2">
                      <span className="font-handwriting text-[#B89CE8] text-sm md:text-lg mb-1 select-none leading-tight transition-all duration-300">
                        {step.label}
                      </span>
                      <div 
                        ref={(el) => { dotRefs.current[idx] = el; }}
                        className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#B89CE8] relative z-30 shadow-[0_0_8px_rgba(184,156,232,0.3)] transition-all duration-300"
                      />
                    </div>
                    
                    {/* Card container (Rounded corners 20px) */}
                    <div className="w-full aspect-[3/4] overflow-hidden rounded-[20px] shadow-[0_8px_30px_rgba(47,58,42,0.03)] border border-[#E7E1D6]/40 id-card-wrapper relative group cursor-pointer">
                      <img 
                        src={step.img} 
                        alt={step.label}
                        className="w-full h-full object-cover transform scale-110 transition-transform duration-700 ease-out block"
                        loading="lazy"
                      />
                      {/* Black Glass Hover Overlay */}
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-left z-20">
                        <span className="font-serif text-[#B89CE8] text-[10px] md:text-xs uppercase tracking-wider mb-1 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-75">
                          Step {idx + 1}
                        </span>
                        <h4 className="font-serif text-white text-xs md:text-base font-light mb-1 leading-tight opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-100">
                          {step.label}
                        </h4>
                        <p className="font-sans text-gray-300 text-[9px] md:text-xs font-light leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-150">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Story Statement: Your Story Begins Here */}
            <div className="flex flex-col items-center justify-center py-4 text-center w-full">
              <p ref={storyStatementRef} className="font-serif italic text-2xl md:text-3xl lg:text-4xl text-[#2F3A2A] font-light opacity-0 translate-y-4 tracking-wide">
                Your Story Begins Here
              </p>
            </div>

            {/* Process Timeline Card (Rounded, Cream background, Light border) */}
            <div 
              ref={timelineCardRef}
              className="w-[90%] md:w-full mx-auto bg-[#FBF8F2] border border-[#E7E1D6] rounded-[24px] p-6 md:p-8 relative select-none"
            >
              
              {/* Mobile Vertical Timeline (lg:hidden) */}
              <div className="flex lg:hidden flex-col gap-6 items-start relative pl-4">
                {/* Delicate connecting line */}
                <div className="absolute left-[33px] top-7 bottom-7 w-[1px] bg-[#E7E1D6] z-0" />
                
                {/* Step 1 */}
                <div className="timeline-step flex items-start gap-4 relative z-10 w-full text-left">
                  <div className="w-9 h-9 rounded-full border border-[#E7E1D6] bg-white flex items-center justify-center text-[#8B7A5F] shrink-0 shadow-2xs">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-5 h-5 text-[#8B7A5F]">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div className="flex flex-col justify-center py-0.5">
                    <h5 className="font-serif text-[13px] font-semibold text-[#2F3A2A] mb-0.5">Cotton Scraps</h5>
                    <p className="font-sans text-[11px] text-[#6F746B] leading-relaxed">
                      Discarded cotton from hosiery units.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="timeline-step flex items-start gap-4 relative z-10 w-full text-left">
                  <div className="w-9 h-9 rounded-full border border-[#E7E1D6] bg-white flex items-center justify-center text-[#8B7A5F] shrink-0 shadow-2xs">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" className="w-5 h-5 text-[#8B7A5F]">
                      <circle cx="12" cy="12" r="9" />
                    </svg>
                  </div>
                  <div className="flex flex-col justify-center py-0.5">
                    <h5 className="font-serif text-[13px] font-semibold text-[#2F3A2A] mb-0.5">Cotton Pulp</h5>
                    <p className="font-sans text-[11px] text-[#6F746B] leading-relaxed">
                      Broken down and prepared with care.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="timeline-step flex items-start gap-4 relative z-10 w-full text-left">
                  <div className="w-9 h-9 rounded-full border border-[#E7E1D6] bg-white flex items-center justify-center text-[#8B7A5F] shrink-0 shadow-2xs">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" className="w-5 h-5 text-[#8B7A5F]">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                    </svg>
                  </div>
                  <div className="flex flex-col justify-center py-0.5">
                    <h5 className="font-serif text-[13px] font-semibold text-[#2F3A2A] mb-0.5">Handmade Paper</h5>
                    <p className="font-sans text-[11px] text-[#6F746B] leading-relaxed">
                      Handcrafted by artisans using traditional techniques.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="timeline-step flex items-start gap-4 relative z-10 w-full text-left">
                  <div className="w-9 h-9 rounded-full border border-[#E7E1D6] bg-white flex items-center justify-center text-[#8B7A5F] shrink-0 shadow-2xs">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-5 h-5 text-[#8B7A5F]">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    </svg>
                  </div>
                  <div className="flex flex-col justify-center py-0.5">
                    <h5 className="font-serif text-[13px] font-semibold text-[#2F3A2A] mb-0.5">PAPIAH Journal</h5>
                    <p className="font-sans text-[11px] text-[#6F746B] leading-relaxed">
                      Thoughtfully designed to hold your everyday stories.
                    </p>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="timeline-step flex items-start gap-4 relative z-10 w-full text-left">
                  <div className="w-9 h-9 rounded-full border border-[#E7E1D6] bg-white flex items-center justify-center text-[#8B7A5F] shrink-0 shadow-2xs">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-5 h-5 text-[#8B7A5F]">
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                  </div>
                  <div className="flex flex-col justify-center py-0.5">
                    <h5 className="font-serif text-[13px] font-semibold text-[#2F3A2A] mb-0.5">Your Story</h5>
                    <p className="font-sans text-[11px] text-[#6F746B] leading-relaxed">
                      Captured, cherished and passed on.
                    </p>
                  </div>
                </div>
              </div>

              {/* Desktop Horizontal Timeline (hidden lg:flex) */}
              <div className="hidden lg:flex items-center justify-between w-full">
                
                {/* Step 1 */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-full border border-[#E7E1D6] bg-white flex items-center justify-center text-[#8B7A5F] mb-2 shadow-2xs">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-5 h-5 text-[#8B7A5F]">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <span className="text-[9px] font-sans font-bold tracking-wider text-gray-500 uppercase">COTTON SCRAPS</span>
                </div>

                <span className="text-gray-300 text-lg">→</span>

                {/* Step 2 */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-full border border-[#E7E1D6] bg-white flex items-center justify-center text-[#8B7A5F] mb-2 shadow-2xs">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" className="w-5 h-5 text-[#8B7A5F]">
                      <circle cx="12" cy="12" r="9" />
                    </svg>
                  </div>
                  <span className="text-[9px] font-sans font-bold tracking-wider text-gray-500 uppercase">COTTON PULP</span>
                </div>

                <span className="text-gray-300 text-lg">→</span>

                {/* Step 3 */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-full border border-[#E7E1D6] bg-white flex items-center justify-center text-[#8B7A5F] mb-2 shadow-2xs">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" className="w-5 h-5 text-[#8B7A5F]">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                    </svg>
                  </div>
                  <span className="text-[9px] font-sans font-bold tracking-wider text-gray-500 uppercase">HANDMADE PAPER</span>
                </div>

                <span className="text-gray-300 text-lg">→</span>

                {/* Step 4 */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-full border border-[#E7E1D6] bg-white flex items-center justify-center text-[#8B7A5F] mb-2 shadow-2xs">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-5 h-5 text-[#8B7A5F]">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    </svg>
                  </div>
                  <span className="text-[9px] font-sans font-bold tracking-wider text-gray-500 uppercase">PAPIAH JOURNAL</span>
                </div>

                <span className="text-gray-300 text-lg">→</span>

                {/* Step 5 */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-full border border-[#E7E1D6] bg-white flex items-center justify-center text-[#8B7A5F] mb-2 shadow-2xs">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-5 h-5 text-[#8B7A5F]">
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                  </div>
                  <span className="text-[9px] font-sans font-bold tracking-wider text-gray-500 uppercase">YOUR STORY</span>
                </div>

              </div>

            </div>

            {/* 6. Handwritten Closing Note (Bottom of section, Soft Lavender, Center aligned) */}
            <div ref={signatureRef} className="flex flex-col items-center justify-center py-6 text-center w-full mt-10">
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
