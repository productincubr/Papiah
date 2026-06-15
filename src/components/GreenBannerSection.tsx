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
    lines: ["For the days", "when you need", "absolute clarity."],
    subtitle: "WRITE. REFLECT. BLOOM."
  },
  {
    lines: ["For the dreams", "that you are", "still becoming."],
    subtitle: "PAUSE. BREATHE. BEGIN."
  },
  {
    lines: ["For the memories", "that are deeply", "worth keeping."],
    subtitle: "CAPTURE. KEEP. CHERISH."
  },
  {
    lines: ["For the chapters", "that are yet", "to be written."],
    subtitle: "PLANT. NURTURE. BLOOM."
  },
  {
    lines: ["Some stories", "deserve to be", "on paper."],
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

    // 2. Continuous spotlight slow pulse (breathing effect)
    if (spotlightRef.current) {
      gsap.fromTo(spotlightRef.current, 
        { opacity: 0.65, scale: 0.98, transformOrigin: "50% 0%" },
        {
          opacity: 0.85,
          scale: 1.02,
          transformOrigin: "50% 0%",
          duration: 5,
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
      {/* Top Spotlight Source - Bright Core */}
      <div 
        className="absolute top-0 left-1/2 w-[180px] h-[40px] rounded-full pointer-events-none z-0 opacity-95 blur-[12px]"
        style={{
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(ellipse at center, rgba(200, 211, 63, 0.65) 0%, rgba(200, 211, 63, 0.15) 70%, transparent 100%)'
        }}
      />

      {/* Top Spotlight Beam - Large Conic/Elliptical Glow */}
      <div 
        ref={spotlightRef}
        className="absolute top-0 left-1/2 w-[95%] max-w-[1000px] h-full pointer-events-none z-0"
        style={{
          transform: 'translateX(-50%)',
          background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(200, 211, 63, 0.22) 0%, rgba(200, 211, 63, 0.04) 50%, transparent 80%)'
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
        
        {/* Combined container to prevent layout shifts and maintain a constant, elegant gap */}
        <div className="flex flex-col items-center justify-center select-none w-full min-h-[290px] sm:min-h-[350px] md:min-h-[440px] lg:min-h-[500px]">
          {/* Headline Container */}
          <div className="flex flex-col items-center justify-center w-full">
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
          <div className="w-60 sm:w-72 md:w-96 h-6 mt-4 relative">
            <svg className="w-full h-full text-[#C8D33F]" viewBox="0 0 200 30" fill="none" preserveAspectRatio="none">
              <path 
                ref={underlinePathRef}
                d="M 5 20 C 40 4, 80 26, 120 12 C 150 2, 185 18, 195 10 C 145 22, 95 8, 20 22" 
                stroke="currentColor" 
                strokeWidth="2.6" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                fill="none" 
              />
            </svg>
          </div>

          {/* Subtitle */}
          <p 
            ref={subtitleRef}
            className="font-sans text-xs md:text-sm font-semibold tracking-[0.38em] text-[#C8D33F] mt-8 md:mt-10 leading-relaxed select-none"
          >
            {currentQuote.subtitle}
          </p>
        </div>

      </div>

      {/* Decorative Divider Line & Star at bottom center */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none select-none z-10 opacity-30">
        <div className="w-[1px] h-10 bg-[#C8D33F]/40" />
        <svg className="w-3 h-3 text-[#C8D33F] mt-2.5 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L14.3 9.7L22 12L14.3 14.3L12 22L9.7 14.3L2 12L9.7 9.7L12 2Z" />
        </svg>
      </div>
    </section>
  );
};
