import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Quote {
  lines: string[];
  subtitle: string;
}

const quotes: Quote[] = [
  {
    lines: ["A quiet place", "for every version", "of you."],
    subtitle: "REFLECT. GROW. REMEMBER."
  },
  {
    lines: ["For the days", "you need clarity."],
    subtitle: "WRITE. REFLECT. BLOOM."
  },
  {
    lines: ["For the dreams", "still becoming."],
    subtitle: "PAUSE. BREATHE. BEGIN."
  },
  {
    lines: ["For the memories", "worth keeping."],
    subtitle: "CAPTURE. KEEP. CHERISH."
  },
  {
    lines: ["For the chapters", "yet to be written."],
    subtitle: "PLANT. NURTURE. BLOOM."
  },
  {
    lines: ["Some stories", "deserve paper."],
    subtitle: "WRITE. REFLECT. BLOOM."
  }
];

export const GreenBannerSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const underlinePathRef = useRef<SVGPathElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const isInitialMount = useRef(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // 1. Calculate path length dynamically and hide the path initially
    const path = underlinePathRef.current;
    let pathLength = 0;
    if (path) {
      pathLength = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength
      });
    }

    // 2. Continuous spotlight slow drift left/right and up/down (barely noticeable)
    if (spotlightRef.current) {
      gsap.fromTo(spotlightRef.current, 
        { x: '-=30px', y: '-=10px' },
        {
          x: '+=60px',
          y: '+=20px',
          duration: 16,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut'
        }
      );
    }

    // 3. Initial reveal of first quote when visible in viewport
    const initialTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
        toggleActions: 'play none none none'
      }
    });

    const initialLines = containerRef.current?.querySelectorAll('.quote-line');
    if (initialLines && initialLines.length > 0) {
      initialTl.fromTo(initialLines, 
        {
          opacity: 0,
          y: 20,
          filter: 'blur(18px)'
        }, 
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.2,
          stagger: 0.15,
          ease: 'power3.out'
        }
      );
    }

    if (path) {
      initialTl.to(path, {
        strokeDashoffset: 0,
        duration: 0.8,
        ease: 'power2.out'
      }, '+=0.2'); // Starts drawing after text is fully sharp
    }

    initialTl.fromTo(subtitleRef.current, 
      {
        opacity: 0,
        y: 15
      }, 
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out'
      }, 
      '+=0.1' // Appears after underline finishes drawing
    );

    // 4. Animate background floating ambient elements (sparkles/dots) very slowly
    const elements = containerRef.current?.querySelectorAll('.ambient-item');
    if (elements && elements.length > 0) {
      elements.forEach((el, index) => {
        gsap.to(el, {
          y: `+=${gsap.utils.random(10, 20)}`,
          x: `+=${gsap.utils.random(-10, 10)}`,
          duration: gsap.utils.random(10, 18),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.4
        });
      });
    }
  }, []);

  // 5. Quote change cycle (rotates every 8 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % quotes.length;
      const lines = containerRef.current?.querySelectorAll('.quote-line');
      const path = underlinePathRef.current;
      const pathLength = path ? path.getTotalLength() : 0;

      if (!lines || lines.length === 0) {
        setCurrentIndex(nextIndex);
        return;
      }

      const transitionTl = gsap.timeline();

      // Fade out current quote: opacity 1 -> 0, blur 0 -> 18px, move upward 20px
      transitionTl.to(lines, {
        opacity: 0,
        y: -20,
        filter: 'blur(18px)',
        duration: 0.8,
        stagger: 0.08,
        ease: 'power2.in'
      })
      .to(path, {
        strokeDashoffset: pathLength,
        duration: 0.5,
        ease: 'power2.in'
      }, '-=0.6')
      .to(subtitleRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.5,
        ease: 'power2.in'
      }, '-=0.6')
      .call(() => {
        setCurrentIndex(nextIndex);
      });

    }, 8000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  // 6. Animate new quote in when currentIndex changes
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const lines = containerRef.current?.querySelectorAll('.quote-line');
    const path = underlinePathRef.current;
    const pathLength = path ? path.getTotalLength() : 0;

    if (!lines || lines.length === 0) return;

    // Set starting position for new quote: opacity 0, blur 18px, move upward into position (from y: 20 to 0)
    gsap.set(lines, { y: 20, opacity: 0, filter: 'blur(18px)' });
    if (path) {
      gsap.set(path, { strokeDashoffset: pathLength });
    }
    gsap.set(subtitleRef.current, { y: 15, opacity: 0 });

    // Animate new quote in
    const revealTl = gsap.timeline();
    revealTl.to(lines, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1.0,
      stagger: 0.1,
      ease: 'power3.out'
    });

    if (path) {
      revealTl.to(path, {
        strokeDashoffset: 0,
        duration: 0.8,
        ease: 'power2.out'
      }, '+=0.2'); // Starts drawing after text becomes sharp
    }

    revealTl.to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, '+=0.1'); // Appears after underline finishes

  }, [currentIndex]);

  const currentQuote = quotes[currentIndex];

  return (
    <section 
      ref={containerRef}
      className="w-full min-h-[80vh] py-28 md:py-40 relative overflow-hidden select-none flex items-center justify-center"
      style={{
        background: 'linear-gradient(180deg, #0F180C 0%, #1B2A12 50%, #0C130A 100%)'
      }}
    >
      {/* Center Spotlight Glow */}
      <div 
        ref={spotlightRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] sm:w-[550px] sm:h-[550px] md:w-[750px] md:h-[750px] rounded-full blur-[100px] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(200, 211, 63, 0.07) 0%, rgba(36, 51, 23, 0.25) 50%, transparent 75%)',
          opacity: 0.75,
          transform: 'translate(-50%, -50%) scale(1)'
        }}
      />

      {/* Minimalist Floating Ambient Elements (Stars & Dots only, opacity 10-20%) */}
      {/* Sparkle 1 */}
      <div className="ambient-item absolute top-[18%] left-[15%] text-white/12 pointer-events-none select-none z-0">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L14.3 9.7L22 12L14.3 14.3L12 22L9.7 14.3L2 12L9.7 9.7L12 2Z" />
        </svg>
      </div>
      {/* Dot 1 */}
      <div className="ambient-item absolute top-[28%] right-[18%] w-1.5 h-1.5 rounded-full bg-white/10 pointer-events-none select-none z-0" />
      {/* Sparkle 2 */}
      <div className="ambient-item absolute bottom-[22%] left-[20%] text-white/10 pointer-events-none select-none z-0">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L14.3 9.7L22 12L14.3 14.3L12 22L9.7 14.3L2 12L9.7 9.7L12 2Z" />
        </svg>
      </div>
      {/* Dot 2 */}
      <div className="ambient-item absolute bottom-[32%] right-[25%] w-1 h-1 rounded-full bg-white/12 pointer-events-none select-none z-0" />
      {/* Sparkle 3 */}
      <div className="ambient-item absolute top-[48%] right-[10%] text-white/15 pointer-events-none select-none z-0">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L14.3 9.7L22 12L14.3 14.3L12 22L9.7 14.3L2 12L9.7 9.7L12 2Z" />
        </svg>
      </div>
      {/* Dot 3 */}
      <div className="ambient-item absolute bottom-[18%] left-[10%] w-1.5 h-1.5 rounded-full bg-white/10 pointer-events-none select-none z-0" />

      {/* Editorial Narrative Quote Content */}
      <div className="relative z-10 w-full max-w-[950px] mx-auto flex flex-col items-center justify-center px-6 text-center">
        
        {/* Headline Container with smooth fade, blur, and motion transitions */}
        <div className="flex flex-col items-center justify-center select-none min-h-[160px] sm:min-h-[200px] md:min-h-[250px] lg:min-h-[300px] w-full">
          {currentQuote.lines.map((line, lineIdx) => (
            <h3 
              key={`${currentIndex}-${lineIdx}`} 
              className="quote-line text-3xl sm:text-4xl md:text-[52px] lg:text-[66px] font-serif font-light text-white/95 leading-[1.35] py-2 tracking-wide font-cormorant"
            >
              {line}
            </h3>
          ))}
        </div>

        {/* Handcrafted Brush Underline */}
        <div className="w-60 sm:w-72 md:w-96 h-4 mt-8 relative">
          <svg className="w-full h-full text-[#C8D33F]" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
            <path 
              ref={underlinePathRef}
              d="M 5 7 C 45 4, 90 10, 140 5 C 165 3, 185 7, 195 5 C 150 8, 100 4, 30 9" 
              stroke="currentColor" 
              strokeWidth="2.8" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              fill="none" 
            />
          </svg>
        </div>

        {/* Subtitle */}
        <p 
          ref={subtitleRef}
          className="font-sans text-xs md:text-sm font-semibold tracking-[0.38em] text-[#C8D33F] mt-10 md:mt-12 leading-relaxed select-none"
        >
          {currentQuote.subtitle}
        </p>

      </div>
    </section>
  );
};
