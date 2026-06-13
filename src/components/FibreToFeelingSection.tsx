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
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const listRefs = useRef<(HTMLDivElement | null)[]>([]);
  const listDotsRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const [isMobile, setIsMobile] = useState(false);

  // Spawn floating paper dust particles around the active card
  const spawnPaperDust = (cardEl: HTMLElement) => {
    const particleCount = 15;
    const colors = ['#FAF9F6', '#EAE6DD', '#C5B09E', '#A7A0D9'];
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

  // Custom premium paper burst & golden sparks (No fireworks, no confetti)
  const triggerPaperBurst = (x: number, y: number) => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Expand a soft circular warm pulse ring
    const pulse = document.createElement('div');
    pulse.className = 'absolute pointer-events-none rounded-full bg-transparent border border-[#A7A0D9] z-30';
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
    const colors = ['#FAF9F6', '#EAE6DD', '#C5B09E', '#A7A0D9'];
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

    // 3. Subtle golden spark lines
    const sparkCount = 8;
    for (let i = 0; i < sparkCount; i++) {
      const el = document.createElement('div');
      el.className = 'absolute pointer-events-none z-30 bg-[#C5B09E]';
      el.style.width = '1px';
      el.style.height = '12px';
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      
      const angle = (i / sparkCount) * 360;
      el.style.transformOrigin = 'center bottom';
      el.style.transform = `translate(-50%, -100%) rotate(${angle}deg)`;
      container.appendChild(el);

      // Shoot outwards and fade
      gsap.fromTo(el,
        { opacity: 0.8, scaleY: 0.4 },
        {
          y: Math.sin(angle * Math.PI / 180) * 22,
          x: Math.cos(angle * Math.PI / 180) * 22,
          scaleY: 1.4,
          opacity: 0,
          duration: 0.9,
          ease: 'power2.out',
          onComplete: () => el.remove()
        }
      );
    }

    // 4. Ribbon Flow Blast (Premium curling & twisting ribbons flowing out)
    const ribbonCount = 40;
    const ribbonColors = ['#A7A0D9', '#84AAD7', '#C5B09E', '#8DA987', '#EAE6DD', '#FAF9F6'];
    for (let i = 0; i < ribbonCount; i++) {
      const el = document.createElement('div');
      el.className = 'absolute pointer-events-none z-30';
      
      // Mix of long curling ribbons and standard rectangular ribbon pieces
      const isLong = Math.random() > 0.55;
      const width = isLong ? Math.random() * 2 + 3 : Math.random() * 4 + 4; // 3-5px or 4-8px
      const height = isLong ? Math.random() * 30 + 35 : Math.random() * 10 + 15; // 35-65px or 15-25px
      
      el.style.width = `${width}px`;
      el.style.height = `${height}px`;
      el.style.backgroundColor = ribbonColors[Math.floor(Math.random() * ribbonColors.length)];
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      el.style.borderRadius = isLong ? '6px' : '2px';
      el.style.transform = 'translate(-50%, -50%)';
      el.style.transformStyle = 'preserve-3d';
      container.appendChild(el);

      // Shoot upwards and outwards with velocity (mostly angle between -165deg and -15deg)
      const angle = (Math.random() * 150 - 165) * (Math.PI / 180);
      const speed = Math.random() * 280 + 140; // explosive velocity
      
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;

      // 3D spin properties for twisting effect
      const spinX = Math.random() * 900 + 450;
      const spinY = Math.random() * 900 + 450;
      const spinZ = Math.random() * 450;

      const tl = gsap.timeline({
        onComplete: () => el.remove()
      });

      // Set initial state
      gsap.set(el, {
        rotationX: Math.random() * 360,
        rotationY: Math.random() * 360,
        rotationZ: Math.random() * 360,
        scale: 0.2,
        opacity: 1
      });

      // Blast outwards
      tl.to(el, {
        x: vx,
        y: vy,
        scale: 1.1,
        rotationX: `+=${spinX / 2}`,
        rotationY: `+=${spinY / 2}`,
        rotationZ: `+=${spinZ / 2}`,
        duration: Math.random() * 0.25 + 0.35,
        ease: 'power2.out'
      })
      // Gravity falling and fluttering phase
      .to(el, {
        x: `+=${vx * 0.35 + (Math.random() - 0.5) * 140}`, // slow down horizontal velocity and sway
        y: `+=${Math.random() * 200 + 280}`, // fall downwards
        rotationX: `+=${spinX / 2}`,
        rotationY: `+=${spinY / 2}`,
        rotationZ: `+=${spinZ / 2}`,
        scale: 0.4,
        opacity: 0,
        duration: Math.random() * 2.0 + 1.8,
        ease: 'power1.out'
      }, '-=0.15');
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // GSAP ScrollTrigger Animations
  useEffect(() => {
    // Filter out null refs to prevent GSAP type errors in browser
    const cards = cardRefs.current.filter((el): el is HTMLDivElement => el !== null);
    const dots = dotRefs.current.filter((el): el is HTMLDivElement => el !== null);
    const listItems = listRefs.current.filter((el): el is HTMLDivElement => el !== null);
    const listDots = listDotsRefs.current.filter((el): el is HTMLSpanElement => el !== null);

    if (isMobile) {
      // Mobile animation layout triggers step-by-step as you scroll
      const ctx = gsap.context(() => {
        // Set initial states
        gsap.set(cards, { opacity: 0.35, filter: 'blur(1.5px)', pointerEvents: 'none' });
        gsap.set(dots, { scale: 1 });
        gsap.set('.id-story-begins-text', { opacity: 0, y: 15 });

        cards.forEach((card, idx) => {
          const dot = dots[idx];
          const listText = listItems[idx];
          const listDot = listDots[idx];

          gsap.fromTo(card,
            { opacity: 0.35, y: 35, filter: 'blur(1.5px)' },
            {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.7,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 75%',
                toggleActions: 'play none none none',
                onEnter: () => {
                  spawnPaperDust(card);
                  gsap.to(card, { pointerEvents: 'auto', duration: 0 });
                  const wrapper = card.querySelector('.id-card-wrapper');
                  if (wrapper) {
                    gsap.to(wrapper, { borderColor: '#A7A0D9', boxShadow: '0 0 20px rgba(167, 160, 217, 0.3)', duration: 0.4 });
                  }
                  if (idx === 1) {
                    const img = card.querySelector('img');
                    if (img) gsap.fromTo(img, { scale: 1.15 }, { scale: 1.1, duration: 0.6 });
                  } else if (idx === 2) {
                    gsap.to(card, { rotation: 1.5, duration: 0.4, yoyo: true, repeat: 3, transformOrigin: 'top center' });
                  } else if (idx === 3) {
                    gsap.to(card, { y: -8, duration: 0.5 });
                  }
                }
              }
            }
          );

          if (dot) {
            gsap.fromTo(dot,
              { scale: 0.6, opacity: 0.4 },
              {
                scale: 1,
                opacity: 1,
                duration: 0.4,
                ease: 'back.out(2)',
                scrollTrigger: {
                  trigger: dot,
                  start: 'top 85%',
                  toggleActions: 'play none none none',
                }
              }
            );
          }

          // Left list item highlights
          if (listText && listDot) {
            gsap.timeline({
              scrollTrigger: {
                trigger: card,
                start: 'top 75%',
                end: 'bottom 25%',
                toggleActions: 'play reverse play reverse'
              }
            })
            .to(listText, { color: '#1C1B19', fontWeight: '500', duration: 0.3 })
            .to(listDot, { backgroundColor: '#A7A0D9', scale: 1.4, duration: 0.2 }, '-=0.3');
          }

          // Trigger Burst & Story Text on mobile
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
                      gsap.to('.id-story-begins-text', { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' });
                    }, 400);
                  }
                }
              }
            });
          }
        });
      }, containerRef);

      return () => ctx.revert();
    }

    // Desktop Animation Timeline
    const ctx = gsap.context(() => {
      // 1. Hide/Dim elements initially to avoid layout lock issues
      gsap.set(cards, { opacity: 0.35, filter: 'blur(1.5px)', pointerEvents: 'none' });
      gsap.set(dots, { scale: 1, opacity: 0.4 });
      gsap.set(listItems, { color: '#9CA3AF', fontWeight: '300' });
      gsap.set(listDots, { backgroundColor: '#C5B09E', scale: 1, opacity: 0.4 });
      gsap.set('.id-story-begins-text', { opacity: 0, y: 15 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 65%',
          toggleActions: 'play none none none',
        }
      });

      // 2. Step 1 entrance (becomes active/glows)
      const card0 = cards[0];
      const dot0 = dots[0];
      const listText0 = listItems[0];
      const listDot0 = listDots[0];

      if (card0) {
        tl.to(card0, { opacity: 1, filter: 'blur(0px)', pointerEvents: 'auto', duration: 0.5 });
        const wrapper = card0.querySelector('.id-card-wrapper');
        if (wrapper) {
          tl.to(wrapper, { borderColor: '#A7A0D9', boxShadow: '0 0 20px rgba(167, 160, 217, 0.3)', duration: 0.4 }, '-=0.5');
        }
        tl.add(() => {
          spawnPaperDust(card0);
        });
      }
      
      if (dot0) {
        tl.to(dot0, { scale: 1.3, opacity: 1, duration: 0.2, ease: 'back.out(2)' }, '-=0.3')
          .to(dot0, { scale: 1, duration: 0.2 });
      }

      if (listText0) {
        tl.to(listText0, { color: '#1C1B19', fontWeight: '500', duration: 0.3 }, '-=0.4');
      }

      if (listDot0) {
        tl.to(listDot0, { backgroundColor: '#A7A0D9', scale: 1.4, opacity: 1, duration: 0.3 }, '-=0.3');
      }

      // 3. Sequentially transition step highlights
      for (let i = 0; i < 3; i++) {
        const nextIdx = i + 1;
        const nextCard = cards[nextIdx];
        const nextDot = dots[nextIdx];
        const currentListText = listItems[i];
        const nextListText = listItems[nextIdx];
        const currentListDot = listDots[i];
        const nextListDot = listDots[nextIdx];

        // Wait before transitioning to next card
        tl.to({}, { duration: 1.0 });

        // Dim previous list item focus
        if (currentListText) {
          tl.to(currentListText, { color: '#9CA3AF', fontWeight: '300', duration: 0.3 }, '-=0.3');
        }
        if (currentListDot) {
          tl.to(currentListDot, { backgroundColor: '#C5B09E', scale: 1, opacity: 0.4, duration: 0.3 }, '-=0.3');
        }

        // Highlight next card, dot, and list item
        if (nextCard) {
          tl.to(nextCard, { opacity: 1, filter: 'blur(0px)', pointerEvents: 'auto', duration: 0.5 }, '-=0.3');
          const wrapper = nextCard.querySelector('.id-card-wrapper');
          if (wrapper) {
            tl.to(wrapper, { borderColor: '#A7A0D9', boxShadow: '0 0 20px rgba(167, 160, 217, 0.3)', duration: 0.4 }, '-=0.5');
          }
        }

        if (nextDot) {
          tl.to(nextDot, { scale: 1.3, opacity: 1, duration: 0.2, ease: 'back.out(2)' }, '-=0.3')
            .to(nextDot, { scale: 1, duration: 0.2 });
        }

        if (nextListText) {
          tl.to(nextListText, { color: '#1C1B19', fontWeight: '500', duration: 0.3 }, '-=0.4');
        }

        if (nextListDot) {
          tl.to(nextListDot, { backgroundColor: '#A7A0D9', scale: 1.4, opacity: 1, duration: 0.3 }, '-=0.3');
        }

        // Step-specific activations
        if (nextIdx === 1 && nextCard) {
          const img = nextCard.querySelector('img');
          if (img) {
            tl.to(img, { scale: 1.15, duration: 0.3 }, '-=0.3')
              .to(img, { scale: 1.1, duration: 0.3 });
          }
          tl.add(() => spawnPaperDust(nextCard), '-=0.3');
        } else if (nextIdx === 2 && nextCard) {
          tl.to(nextCard, { rotation: 1.5, duration: 0.4, yoyo: true, repeat: 3, transformOrigin: 'top center' }, '-=0.3');
          tl.add(() => spawnPaperDust(nextCard), '-=0.3');
        } else if (nextIdx === 3 && nextCard) {
          tl.to(nextCard, { y: -10, duration: 0.6, ease: 'power2.out' }, '-=0.3');
          tl.add(() => spawnPaperDust(nextCard), '-=0.3');
          
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
              // Reveal text "Your Story Begins Here"
              .to('.id-story-begins-text', { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' }, '+=0.2');
          }
        }
      }

      // Parallax scrolling setup for each card image
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

    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section 
      ref={containerRef}
      className="w-full bg-[#F2EDE4] relative z-10 select-none border-b border-papiah-grid/40 py-20 md:py-24 overflow-hidden"
      onMouseEnter={() => setCursorType('philosophy')}
      onMouseLeave={() => setCursorType('default')}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Narrative Content & List */}
          <div className="lg:col-span-3 flex flex-col text-left justify-center">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-papiah-dark font-light tracking-tight mb-10 leading-tight">
              From <span className="font-handwriting text-[1.1em] text-[#84AAD7] italic mr-1">fibre</span> <br />
              to <span className="font-handwriting text-[1.1em] text-[#84AAD7] italic mr-1">feeling</span>.
            </h2>
            
            {/* Step list with dots */}
            <div className="flex flex-col gap-5 mb-10 pl-1">
              {steps.map((step, idx) => (
                <div 
                  key={idx}
                  ref={(el) => { listRefs.current[idx] = el; }}
                  className="flex items-start gap-4 text-sm md:text-base text-gray-400 font-sans font-light transition-all duration-300 hover:translate-x-1 cursor-default"
                >
                  <span 
                    ref={(el) => { listDotsRefs.current[idx] = el; }}
                    className="w-1.5 h-1.5 rounded-full bg-[#C5B09E] mt-2 transition-all duration-300"
                  />
                  {step.label.charAt(0).toUpperCase() + step.label.slice(1)}.
                </div>
              ))}
            </div>

            <div className="w-12 h-[1.5px] bg-[#C5B09E] mb-8"></div>
            
            <p className="text-base md:text-lg text-gray-500 font-sans font-light italic leading-relaxed max-w-[320px]">
              A sensory documentation told through texture.
            </p>
          </div>

          {/* Right Column: Process Cards */}
          <div className="lg:col-span-9 flex flex-col justify-center gap-10">
            
            <div className="relative w-full py-6 select-none">
              
              {/* Responsive layout: 4 columns on desktop, stacked on mobile */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 relative z-10 w-full max-w-[280px] md:max-w-none mx-auto md:mx-0 px-4 md:px-0">
                {steps.map((step, idx) => (
                  <div 
                    key={idx}
                    ref={(el) => { cardRefs.current[idx] = el; }}
                    className="flex flex-col items-center text-center w-full pointer-events-none"
                    style={{ opacity: 0.35, filter: 'blur(1.5px)' }}
                  >
                    {/* Label & Dot */}
                    <div className="h-16 md:h-20 flex flex-col justify-end items-center mb-6 relative w-full px-2">
                      <span className="font-handwriting text-[#A7A0D9] text-base lg:text-lg mb-2 select-none leading-tight transition-all duration-300">
                        {step.label}
                      </span>
                      <div 
                        ref={(el) => { dotRefs.current[idx] = el; }}
                        className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#A7A0D9] relative z-30 shadow-[0_0_8px_rgba(167,160,217,0.3)] transition-transform duration-300"
                      />
                    </div>
                    
                    {/* Card container */}
                    <div className="w-full aspect-[3/4] overflow-hidden rounded-[15px] md:rounded-[18px] shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-transparent id-card-wrapper relative group cursor-pointer">
                      <img 
                        src={step.img} 
                        alt={step.label}
                        className="w-full h-full object-cover transform scale-110 transition-transform duration-700 ease-out block"
                        loading="lazy"
                      />
                      {/* Black Glass Hover Overlay */}
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-left z-20">
                        <span className="font-serif text-[#A7A0D9] text-[10px] md:text-xs uppercase tracking-wider mb-1 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-75">
                          Step {idx + 1}
                        </span>
                        <h4 className="font-serif text-white text-sm md:text-base font-light mb-1.5 leading-tight opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-100">
                          {step.label}
                        </h4>
                        <p className="font-sans text-gray-300 text-[10px] md:text-xs font-light leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-150">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Your Story Begins Here Reveal */}
            <div className="flex flex-col items-center justify-center py-4 text-center">
              <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-[#2F3A2A] font-light italic opacity-0 translate-y-4 id-story-begins-text tracking-wide">
                Your Story Begins Here
              </p>
            </div>

            {/* Horizontal Flow Chart */}
            <div className="flex items-center justify-between w-full bg-white/40 border border-white/60 p-4 md:p-6 rounded-[20px] backdrop-blur-xs select-none">
              
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-5 h-5 md:w-6 md:h-6 text-[#C5B09E] mb-1.5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span className="text-[7.5px] md:text-[9px] font-sans font-bold tracking-wider text-gray-400 uppercase">COTTON SCRAPS</span>
              </div>

              <span className="text-gray-300 text-base md:text-lg">→</span>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" className="w-5 h-5 md:w-6 md:h-6 text-[#C5B09E] mb-1.5">
                  <circle cx="12" cy="12" r="9" />
                </svg>
                <span className="text-[7.5px] md:text-[9px] font-sans font-bold tracking-wider text-gray-400 uppercase">COTTON PULP</span>
              </div>

              <span className="text-gray-300 text-base md:text-lg">→</span>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" className="w-5 h-5 md:w-6 md:h-6 text-[#C5B09E] mb-1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                </svg>
                <span className="text-[7.5px] md:text-[9px] font-sans font-bold tracking-wider text-gray-400 uppercase">HANDMADE PAPER</span>
              </div>

              <span className="text-gray-300 text-base md:text-lg">→</span>

              {/* Step 4 */}
              <div className="flex flex-col items-center text-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-5 h-5 md:w-6 md:h-6 text-[#C5B09E] mb-1.5">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
                <span className="text-[7.5px] md:text-[9px] font-sans font-bold tracking-wider text-gray-400 uppercase">PAPIAH JOURNAL</span>
              </div>

              <span className="text-gray-300 text-base md:text-lg">→</span>

              {/* Step 5 */}
              <div className="flex flex-col items-center text-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-5 h-5 md:w-6 md:h-6 text-[#C5B09E] mb-1.5">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
                <span className="text-[7.5px] md:text-[9px] font-sans font-bold tracking-wider text-gray-400 uppercase">YOUR STORY</span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
