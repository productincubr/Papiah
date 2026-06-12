import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import added2 from '../assets/added_2.svg';

gsap.registerPlugin(ScrollTrigger);

interface Quote {
  lines: string[];
  subtitle: string;
}

const quotes: Quote[] = [
  {
    lines: ["Most people forget", "the chapters that", "changed them."],
    subtitle: "THE YEAR EVERYTHING CHANGED."
  },
  {
    lines: ["Write the moments", "before they become", "memories."],
    subtitle: "YOUR STORY MATTERS."
  },
  {
    lines: ["A quiet place", "for every version", "of you."],
    subtitle: "REFLECT. GROW. REMEMBER."
  }
];

// Symmetrical padding helper to keep text centered without horizontal shifting
const padStringToLength = (str: string, targetLen: number): string => {
  if (str.length >= targetLen) return str;
  const totalPadding = targetLen - str.length;
  const leftPadding = Math.floor(totalPadding / 2);
  const rightPadding = totalPadding - leftPadding;
  return " ".repeat(leftPadding) + str + " ".repeat(rightPadding);
};

const maxLengths = [18, 18, 13];

const paddedQuotes = quotes.map(q => ({
  lines: q.lines.map((line, idx) => padStringToLength(line, maxLengths[idx])),
  subtitle: q.subtitle
}));

export const GreenBannerSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const underlinePathRef = useRef<SVGPathElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
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

      // 2. Continuous spotlight gentle pulse
      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          scale: 1.15,
          opacity: 0.85,
          duration: 7,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut'
        });
      }

      // 3. Initial reveal of first quote when visible
      const initialTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      });

      const initialChars = containerRef.current?.querySelectorAll('.char-line-0, .char-line-1, .char-line-2');
      if (initialChars && initialChars.length > 0) {
        initialTl.fromTo(initialChars, 
          {
            opacity: 0,
            filter: 'blur(15px)',
            scale: 1.05
          }, 
          {
            opacity: 1,
            filter: 'blur(0px)',
            scale: 1,
            duration: 1.5,
            stagger: {
              each: 0.01,
              from: "center"
            },
            ease: 'power3.out'
          }
        );
      }

      initialTl.to(path, {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: 'power2.inOut'
      }, '-=0.6')
      .fromTo(subtitleRef.current, 
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
        '-=0.4'
      );

      // 4. Split-flap loop transition
      let currentIndex = 0;

      const transitionToNextQuote = () => {
        const nextIndex = (currentIndex + 1) % paddedQuotes.length;
        const oldQuote = paddedQuotes[currentIndex];
        const newQuote = paddedQuotes[nextIndex];
        
        const transitionTl = gsap.timeline();

        // a. Fade out subtitle and draw back underline
        transitionTl.to(subtitleRef.current, {
          opacity: 0,
          y: -10,
          duration: 0.4,
          ease: 'power2.in'
        })
        .to(path, {
          strokeDashoffset: pathLength,
          duration: 0.4,
          ease: 'power2.in'
        }, '-=0.3');

        // b. Trigger staggered split-flap flips for changing characters
        transitionTl.addLabel("flipStart", 0.4);

        const line0Spans = containerRef.current?.querySelectorAll('.char-line-0');
        const line1Spans = containerRef.current?.querySelectorAll('.char-line-1');
        const line2Spans = containerRef.current?.querySelectorAll('.char-line-2');
        const allSpans = [line0Spans, line1Spans, line2Spans];

        let maxFlipDelay = 0;

        allSpans.forEach((spans, lineIdx) => {
          if (!spans) return;
          const oldLineText = oldQuote.lines[lineIdx];
          const newLineText = newQuote.lines[lineIdx];

          spans.forEach((spanEl, charIdx) => {
            const oldChar = oldLineText[charIdx] || ' ';
            const newChar = newLineText[charIdx] || ' ';

            if (oldChar !== newChar) {
              const charSpan = spanEl as HTMLSpanElement;
              // Stagger timing
              const delay = charIdx * 0.025 + lineIdx * 0.06;
              maxFlipDelay = Math.max(maxFlipDelay, delay + 0.4);

              // Step 1: Flip Down (towards -90deg)
              transitionTl.to(charSpan, {
                rotateX: -90,
                opacity: 0.3,
                duration: 0.2,
                ease: 'power1.in',
                onComplete: () => {
                  charSpan.innerText = newChar === ' ' ? '\u00A0' : newChar;
                }
              }, `flipStart+=${delay}`);

              // Step 2: Swap position to top and Flip Up (from 90deg back to 0deg)
              transitionTl.set(charSpan, { rotateX: 90 }, `flipStart+=${delay + 0.2}`);
              transitionTl.to(charSpan, {
                rotateX: 0,
                opacity: 1,
                duration: 0.2,
                ease: 'power1.out'
              }, `flipStart+=${delay + 0.2}`);
            }
          });
        });

        // c. Once all flaps settle, redraw underline and fade/slide up new subtitle
        transitionTl.call(() => {
          if (subtitleRef.current) {
            subtitleRef.current.innerText = newQuote.subtitle;
          }
        }, [], `flipStart+=${maxFlipDelay}`);

        transitionTl.to(path, {
          strokeDashoffset: 0,
          duration: 1.0,
          ease: 'power2.out'
        }, `flipStart+=${maxFlipDelay}`);

        transitionTl.fromTo(subtitleRef.current, 
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
          `flipStart+=${maxFlipDelay + 0.2}`
        );

        currentIndex = nextIndex;
      };

      // Quote change cycle interval (7 seconds)
      const interval = setInterval(transitionToNextQuote, 7000);
      return () => clearInterval(interval);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const initialQuote = paddedQuotes[0];

  return (
    <section 
      ref={containerRef}
      className="w-full min-h-[380px] sm:min-h-[460px] md:min-h-[560px] lg:min-h-[620px] py-20 relative overflow-hidden select-none flex items-center justify-center bg-[#1E2417]"
      style={{
        background: 'radial-gradient(circle at center, #262E1C 0%, #171C11 100%)'
      }}
    >
      {/* Background SVG illustration with mix-blend-overlay for a premium subtle textured look */}
      <img 
        src={added2} 
        alt="Botanical background illustration" 
        className="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-overlay pointer-events-none"
      />

      {/* Center Spotlight Glow */}
      <div 
        ref={spotlightRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] md:w-[650px] md:h-[650px] rounded-full blur-3xl pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(203, 216, 59, 0.06) 0%, rgba(92, 112, 71, 0.16) 50%, transparent 75%)',
          opacity: 0.6,
          transform: 'translate(-50%, -50%) scale(1)'
        }}
      />

      {/* Editorial Narrative Content */}
      <div className="relative z-10 w-full max-w-[1000px] mx-auto flex flex-col items-center justify-center px-6 text-center">
        
        {/* Headline Container with character grid for 3D split-flap effect */}
        <div 
          className="flex flex-col items-center justify-center select-none"
          style={{ perspective: '800px', transformStyle: 'preserve-3d' }}
        >
          {initialQuote.lines.map((line, lineIdx) => (
            <div 
              key={lineIdx} 
              className="flex justify-center items-center text-2xl sm:text-3.5xl md:text-4.5xl lg:text-[52px] font-cormorant font-light text-white leading-tight overflow-visible py-1 md:py-2 tracking-wide"
            >
              {line.split("").map((char, charIdx) => (
                <span 
                  key={charIdx} 
                  className={`char-line-${lineIdx} inline-block text-center w-[0.58em] md:w-[0.62em] leading-none`}
                  style={{ 
                    transformStyle: 'preserve-3d', 
                    backfaceVisibility: 'hidden',
                    transform: 'rotateX(0deg)'
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* Handcrafted Olive-Yellow Underline */}
        <div className="w-56 sm:w-64 md:w-80 h-3 mt-5 relative overflow-hidden">
          <svg className="w-full h-full text-[#CBD83B]" viewBox="0 0 200 10" fill="none" preserveAspectRatio="none">
            <path 
              ref={underlinePathRef}
              d="M 5 6 Q 50 3 100 5 T 195 4" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              fill="none" 
            />
          </svg>
        </div>

        {/* Subtitle */}
        <p 
          ref={subtitleRef}
          className="font-sans text-[11px] sm:text-xs md:text-sm font-semibold tracking-[0.3em] text-[#CBD83B] uppercase mt-8 md:mt-10 leading-relaxed select-none"
        >
          {initialQuote.subtitle}
        </p>

      </div>
    </section>
  );
};
