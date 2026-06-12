import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import sectionGrowVideo from '../assets/Section_Grow.mp4';
import s13Image from '../assets/s13.webp';

gsap.registerPlugin(ScrollTrigger);

export const ScrollVideoScrub: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const darkOverlayRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const text4Ref = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const [metadataLoaded, setMetadataLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let ctx: gsap.Context;

    const initScrubber = () => {
      setMetadataLoaded(true);

      ctx = gsap.context(() => {
        // Timeline linked to ScrollTrigger with pinning
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=2000",
            scrub: 1.2,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          }
        });

        // 1. Expand video card from 16:9 centered bounds to full-screen viewport (100% of parent width/height)
        // Using "100%" instead of "100vw" to prevent browser scrollbar offsets from cutting off the left side
        tl.to(videoWrapperRef.current, {
          width: "100%",
          height: "100%",
          borderRadius: "0px",
          maxWidth: "none",
          maxHeight: "none",
          duration: 25,
          ease: "power2.inOut"
        }, 0);

        // 2. Fade out static s13.webp cover image (0% to 18% scroll)
        tl.to(imageRef.current, {
          opacity: 0,
          duration: 18,
          ease: "power1.inOut"
        }, 0);

        // 3. Increase dark overlay opacity to 45% as it becomes fullscreen (to read text easily)
        tl.to(darkOverlayRef.current, {
          opacity: 0.45,
          duration: 25,
          ease: "power2.inOut"
        }, 0);

        // 4. Scrub video currentTime from 0 to end (aligned to entire scroll)
        tl.to(video, {
          currentTime: video.duration || 5,
          duration: 100,
          ease: "none"
        }, 0);

        // 5. Subtle video zoom effect (1 -> 1.06)
        tl.to(video, {
          scale: 1.06,
          duration: 100,
          ease: "none"
        }, 0);

        // 6. Text Overlay 1: "Handcrafted from cotton waste" (Fades in at 26%, out at 38%)
        tl.fromTo(text1Ref.current, 
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 8, ease: "power1.out" },
          26
        );
        tl.to(text1Ref.current, {
          opacity: 0,
          y: -35,
          duration: 8,
          ease: "power1.in"
        }, 38);

        // 7. Text Overlay 2: "Made with intention" (Fades in at 46%, out at 58%)
        tl.fromTo(text2Ref.current, 
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 8, ease: "power1.out" },
          46
        );
        tl.to(text2Ref.current, {
          opacity: 0,
          y: -35,
          duration: 8,
          ease: "power1.in"
        }, 58);

        // 8. Text Overlay 3: "Dried naturally" (Fades in at 66%, out at 78%)
        tl.fromTo(text3Ref.current, 
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 8, ease: "power1.out" },
          66
        );
        tl.to(text3Ref.current, {
          opacity: 0,
          y: -35,
          duration: 8,
          ease: "power1.in"
        }, 78);

        // 9. Text Overlay 4: "Crafted into journals" (Fades in at 83%, out at 91%)
        tl.fromTo(text4Ref.current, 
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 8, ease: "power1.out" },
          83
        );
        tl.to(text4Ref.current, {
          opacity: 0,
          y: -35,
          duration: 8,
          ease: "power1.in"
        }, 91);

        // 10. CTA Block: "Begin your story" (Fades in at 94% - 100%)
        tl.fromTo(ctaRef.current,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 7, ease: "power2.out" },
          94
        );

      }, containerRef);
    };

    if (video.readyState >= 1) {
      initScrubber();
    } else {
      video.addEventListener('loadedmetadata', initScrubber);
    }

    return () => {
      if (video) {
        video.removeEventListener('loadedmetadata', initScrubber);
      }
      if (ctx) {
        ctx.revert();
      }
    };
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="video-section relative w-full h-screen overflow-hidden bg-papiah-cream select-none z-30 flex items-center justify-center"
    >
      {/* Video card wrapper container: starts 16:9 centered card with soft shadow */}
      <div 
        ref={videoWrapperRef}
        className="video-wrapper w-[90vw] h-[50.625vw] md:w-[70vw] md:h-[39.375vw] max-h-[75vh] max-w-[133vh] rounded-[24px] overflow-hidden relative shadow-[0_30px_70px_rgba(0,0,0,0.15)] flex items-center justify-center bg-black transition-shadow duration-300"
      >
        {/* Dark overlay inside video container */}
        <div 
          ref={darkOverlayRef}
          className="absolute inset-0 bg-black opacity-15 z-10 pointer-events-none"
        />

        {/* Static Cover Image (s13.webp) - displayed in object-contain initially */}
        <img
          ref={imageRef}
          src={s13Image}
          alt="Artisanal process cover"
          className="absolute inset-0 w-full h-full object-contain z-15 pointer-events-none bg-papiah-cream"
        />



        {/* Scrub video (fits fully inside fullscreen container with object-cover) */}
        <video
          ref={videoRef}
          src={sectionGrowVideo}
          className="scrub-video absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
          muted
          playsInline
          preload="auto"
        />

        {/* Layer for overlay contents (fading in sequentially during scroll) */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none px-6 text-center">
          
          {/* Overlay 1 */}
          <div 
            ref={text1Ref}
            className="absolute max-w-3xl opacity-0"
          >
            <span className="text-[10px] md:text-xs font-sans font-bold tracking-[0.3em] text-[#FAF6EE]/80 block uppercase mb-4">
              THE ART OF PAPIAH
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl text-white font-light tracking-tight leading-tight">
              Handcrafted from cotton waste
            </h2>
          </div>

          {/* Overlay 2 */}
          <div 
            ref={text2Ref}
            className="absolute max-w-3xl opacity-0"
          >
            <span className="text-[10px] md:text-xs font-sans font-bold tracking-[0.3em] text-[#FAF6EE]/80 block uppercase mb-4">
              OUR PROMISE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl text-white font-light tracking-tight leading-tight">
              Made with intention
            </h2>
          </div>

          {/* Overlay 3 */}
          <div 
            ref={text3Ref}
            className="absolute max-w-3xl opacity-0"
          >
            <span className="text-[10px] md:text-xs font-sans font-bold tracking-[0.3em] text-[#FAF6EE]/80 block uppercase mb-4">
              THE CRAFT
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl text-white font-light tracking-tight leading-tight">
              Dried naturally
            </h2>
          </div>

          {/* Overlay 4 */}
          <div 
            ref={text4Ref}
            className="absolute max-w-3xl opacity-0"
          >
            <span className="text-[10px] md:text-xs font-sans font-bold tracking-[0.3em] text-[#FAF6EE]/80 block uppercase mb-4">
              THE JOURNEY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl text-white font-light tracking-tight leading-tight">
              Crafted into journals
            </h2>
          </div>

          {/* CTA Container */}
          <div 
            ref={ctaRef}
            className="absolute max-w-md opacity-0 pointer-events-auto"
          >
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-light tracking-tight leading-tight mb-8">
              Begin your story
            </h2>
            <button className="bg-[#CBD83B] hover:bg-[#b8c634] text-[#2E3327] font-sans font-bold tracking-[0.2em] text-[11px] md:text-[12px] px-8 py-4 uppercase transition-all duration-300 rounded-none shadow-lg cursor-pointer">
              Explore Journals
            </button>
          </div>

        </div>
      </div>

      {/* Loading feedback */}
      {!metadataLoaded && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-[10px] tracking-widest font-sans uppercase animate-pulse z-20">
          Loading Process Video...
        </div>
      )}
    </section>
  );
};
