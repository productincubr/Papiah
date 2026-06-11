import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const CursorReactivePaper: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 12 Pool Slots (Max 12 visible elements for high-density fast flow)
  const poolRefs = useRef<(HTMLDivElement | null)[]>([]);
  const innerRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // State for pooling
  const itemStates = useRef(
    Array(12).fill(null).map((_, idx) => ({
      active: false,
      timeline: null as gsap.core.Timeline | null,
      trailLag: [1, 1, 2, 2, 3, 3][idx % 6], // Tighter lag offsets for extremely close tracking
      speedFactor: [0.85, 0.95, 1.05, 1.15, 1.25, 1.35][idx % 6], // Speed factors mapped to sizes
    }))
  );

  // Mouse history and velocity tracking
  const trail = useRef<{ x: number; y: number }[]>([]);
  const mouseVelocity = useRef({ x: 0, y: 0 });
  const lastMousePos = useRef({ x: 0, y: 0 });
  const lastMouseTime = useRef(Date.now());
  const lastProcessedPos = useRef({ x: 0, y: 0 });
  const nextSpawnIndex = useRef(0); // Circular pointer for round-robin spawning

  useEffect(() => {
    const items = itemStates.current;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const dt = Math.max(1, now - lastMouseTime.current);
      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;
      
      // Calculate mouse velocity for interactive parallax sways
      mouseVelocity.current.x = dx / dt;
      mouseVelocity.current.y = dy / dt;
      
      lastMousePos.current = { x: e.clientX, y: e.clientY };
      lastMouseTime.current = now;

      trail.current.push({ x: e.clientX, y: e.clientY });
      
      // Keep trail capped at last 30 coordinates
      if (trail.current.length > 30) {
        trail.current.shift();
      }
    };

    const spawnItem = (index: number, point: { x: number; y: number }) => {
      const item = items[index];
      const el = poolRefs.current[index];
      const innerEl = innerRefs.current[index];
      if (!el || !innerEl) return;

      item.active = true;

      // Ensure only the variation for this slot is visible (6 variations cycled)
      const variations = innerEl.children;
      const variationIndex = index % variations.length;
      for (let i = 0; i < variations.length; i++) {
        (variations[i] as HTMLElement).style.display = i === variationIndex ? 'block' : 'none';
      }

      // Add a tiny random offset to start positions so they don't look completely static
      const startX = point.x + (Math.random() - 0.5) * 8;
      const startY = point.y + (Math.random() - 0.5) * 8;

      // Reset DOM transforms before animation (force-recycle if active)
      gsap.killTweensOf(el);
      gsap.killTweensOf(innerEl);

      const startRotation = (Math.random() - 0.5) * 12; // -6 to +6 deg

      gsap.set(el, {
        x: startX,
        y: startY,
        scale: 0.8,
        opacity: 0,
        rotation: startRotation,
      });

      gsap.set(innerEl, { x: 0, y: 0 }); // reset inner parallax displacement

      // Create animated timeline
      const tl = gsap.timeline({
        onComplete: () => {
          item.active = false;
        }
      });

      item.timeline = tl;

      // Phase 1: Quick Rise Up & Fade In
      // Animate up by 100px quickly to stay close to cursor
      const riseDuration = 0.75 / item.speedFactor;
      const midRotation = startRotation + (Math.random() - 0.5) * 8;

      tl.to(el, {
        y: startY - 100,
        opacity: 1,
        scale: 1.0,
        rotation: midRotation,
        duration: riseDuration,
        ease: 'power2.out',
      });

      // Phase 2: Gentle Float Upward & Fade Out
      // Animate up another 50px while quickly fading out to recycle
      const floatDuration = 0.65 / item.speedFactor;
      const endRotation = midRotation + (Math.random() - 0.5) * 6;

      tl.to(el, {
        y: startY - 150,
        opacity: 0,
        rotation: endRotation,
        duration: floatDuration,
        ease: 'power1.in',
      }, '+=0.05'); // minimal hold for snappy fast trail feel
    };

    const parentElement = containerRef.current?.parentElement;
    if (parentElement) {
      parentElement.addEventListener('mousemove', handleMouseMove);
    }

    // High-speed spawn ticker (120ms) using a circular queue to guarantee continuous flow
    const spawnInterval = setInterval(() => {
      const len = trail.current.length;
      if (len < 5) return;

      const latest = trail.current[len - 1];
      // Skip if mouse has stopped moving
      if (latest.x === lastProcessedPos.current.x && latest.y === lastProcessedPos.current.y) {
        return;
      }
      lastProcessedPos.current = latest;

      // Circular round-robin spawning: always fetch the next slot and recycle it instantly
      const index = nextSpawnIndex.current;
      const targetLag = items[index].trailLag;
      const point = trail.current[Math.max(0, len - 1 - targetLag)];
      
      if (point) {
        spawnItem(index, point);
        nextSpawnIndex.current = (index + 1) % items.length;
      }
    }, 120);

    // 60 FPS requestAnimationFrame loop for real-time wind sways
    let animFrameId: number;

    const updateParallax = () => {
      // Slowly decay mouse velocity
      mouseVelocity.current.x *= 0.93;
      mouseVelocity.current.y *= 0.93;

      const vx = mouseVelocity.current.x;
      const vy = mouseVelocity.current.y;

      // Apply real-time reactive sways on the inner layers of active items
      items.forEach((item, idx) => {
        if (!item.active) return;
        const innerEl = innerRefs.current[idx];
        if (!innerEl) return;

        // Shift inner element opposite to cursor speed direction
        const parallaxX = -15 * item.speedFactor;
        const parallaxY = -12 * item.speedFactor;

        const targetPX = vx * parallaxX;
        const targetPY = vy * parallaxY;

        const currentPX = gsap.getProperty(innerEl, 'x') as number;
        const currentPY = gsap.getProperty(innerEl, 'y') as number;

        // Smoothly lerp towards the target offset
        const newPX = currentPX + (targetPX - currentPX) * 0.08;
        const newPY = currentPY + (targetPY - currentPY) * 0.08;

        gsap.set(innerEl, {
          x: newPX,
          y: newPY
        });
      });

      animFrameId = requestAnimationFrame(updateParallax);
    };

    animFrameId = requestAnimationFrame(updateParallax);

    return () => {
      if (parentElement) {
        parentElement.removeEventListener('mousemove', handleMouseMove);
      }
      clearInterval(spawnInterval);
      cancelAnimationFrame(animFrameId);
      items.forEach(item => {
        if (item.timeline) {
          item.timeline.kill();
        }
      });
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 pointer-events-none overflow-hidden z-25"
    >
      {/* 12 Pool Elements representing the trail items */}
      {Array(12).fill(null).map((_, idx) => (
        <div
          key={idx}
          ref={el => { poolRefs.current[idx] = el; }}
          className="absolute pointer-events-none select-none opacity-0"
          style={{ willChange: 'transform, opacity' }}
        >
          {/* Inner Parallax Layer */}
          <div 
            ref={el => { innerRefs.current[idx] = el; }}
            className="pointer-events-none select-none"
            style={{ willChange: 'transform' }}
          >
            {/* Slot 0 / 6: Moss Green Journal Cover */}
            <div className="hidden">
              <div className="w-[88px] h-[120px] bg-[#5C6B58] rounded-[6px] border border-[#485445] shadow-[0_8px_16px_rgba(0,0,0,0.1)] p-2 flex flex-col justify-between select-none relative overflow-hidden">
                <div className="absolute top-0 bottom-0 left-1 w-[2px] bg-[#FAF6EE]/20 shadow-xs" />
                <div className="text-right mt-0.5">
                  <span className="text-[6px] tracking-widest text-[#E3DEC9] font-sans font-bold uppercase block">PAPIAH</span>
                </div>
                <div className="my-auto mx-auto text-[#E3DEC9]/80">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                    <path d="M12 2L2 22h20L12 2z" />
                  </svg>
                </div>
                <div className="text-center mb-0.5">
                  <span className="text-[5px] tracking-widest text-[#FAF6EE]/50 uppercase font-semibold block">MINDFUL NOTE</span>
                </div>
              </div>
            </div>

            {/* Slot 1 / 6: Terracotta Star Journal Cover */}
            <div className="hidden">
              <div className="w-[76px] h-[104px] bg-[#A2574A] rounded-[5px] border border-[#894438] shadow-[0_8px_16px_rgba(0,0,0,0.1)] p-2 flex flex-col justify-between select-none relative overflow-hidden">
                <div className="absolute top-0 bottom-0 left-1 w-[2px] bg-white/20 shadow-xs" />
                <div className="text-center mt-0.5 z-10">
                  <span className="text-[5px] tracking-widest text-white/80 font-bold uppercase block">THE STAR</span>
                </div>
                <div className="my-auto mx-auto text-[#E8D4C8] z-10">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                    <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.786 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.41l8.2-1.192z" />
                  </svg>
                </div>
                <div className="text-center mb-0.5 z-10">
                  <span className="text-[5px] tracking-widest text-[#E8D4C8]/50 uppercase font-semibold block">PAPIAH</span>
                </div>
              </div>
            </div>

            {/* Slot 2 / 6: Lavender Gold-Embossed Journal */}
            <div className="hidden">
              <div className="w-[82px] h-[112px] bg-[#8F8CA3] rounded-[6px] border border-[#767389] shadow-[0_8px_16px_rgba(0,0,0,0.1)] p-2 flex flex-col justify-between select-none relative overflow-hidden">
                <div className="absolute top-0 bottom-0 left-1 w-[2px] bg-yellow-100/30 shadow-xs" />
                <div className="text-center mt-0.5">
                  <span className="text-[5px] tracking-widest text-yellow-100/90 font-sans font-bold uppercase block">CELESTIAL</span>
                </div>
                <div className="my-auto mx-auto text-yellow-100/90">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                    <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM6.16 5.1a.75.75 0 0 1 1.06 0l1.59 1.59a.75.75 0 1 1-1.06 1.06L6.16 6.16a.75.75 0 0 1 0-1.06ZM3 12a.75.75 0 0 1 .75-.75h2.25a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12ZM5.16 17.84a.75.75 0 0 1 0-1.06l1.59-1.59a.75.75 0 1 1 1.06 1.06l-1.59 1.59a.75.75 0 0 1-1.06 0ZM12 17.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V18a.75.75 0 0 1 .75-.75ZM16.24 16.24a.75.75 0 0 1 0-1.06l1.59-1.59a.75.75 0 1 1 1.06 1.06l-1.59 1.59a.75.75 0 0 1-1.06 0ZM20.25 12a.75.75 0 0 1 .75-.75H23.25a.75.75 0 0 1 0 1.5H21a.75.75 0 0 1-.75-.75ZM16.24 7.76a.75.75 0 0 1-1.06-1.06l1.59-1.59a.75.75 0 1 1 1.06 1.06L16.24 7.76ZM12 8.25a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5Z" />
                  </svg>
                </div>
                <div className="text-center mb-0.5">
                  <span className="text-[5px] tracking-widest text-yellow-100/60 uppercase font-semibold block">DAILY DEVOTION</span>
                </div>
              </div>
            </div>

            {/* Slot 3 / 6: Navy Blue Moon Journal */}
            <div className="hidden">
              <div className="w-[76px] h-[104px] bg-[#2C3E50] rounded-[5px] border border-[#1B2A36] shadow-[0_8px_16px_rgba(0,0,0,0.1)] p-2 flex flex-col justify-between select-none relative overflow-hidden">
                <div className="absolute top-0 bottom-0 left-1 w-[2px] bg-[#E2B960]/20 shadow-xs" />
                <div className="text-center mt-0.5">
                  <span className="text-[5px] tracking-widest text-[#E2B960]/90 font-sans font-bold uppercase block">LUNA COVE</span>
                </div>
                <div className="my-auto mx-auto text-[#E2B960]">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                    <path d="M12 3a9 9 0 1 0 9 9 9.75 9.75 0 0 1-9-9Z" />
                  </svg>
                </div>
                <div className="text-center mb-0.5">
                  <span className="text-[4px] tracking-widest text-[#E2B960]/50 uppercase font-semibold block">PAPIAH PRESS</span>
                </div>
              </div>
            </div>

            {/* Slot 4 / 6: Rose Gold Recipe Journal Cover */}
            <div className="hidden">
              <div className="w-[82px] h-[112px] bg-[#EEDCD3] rounded-[6px] border border-[#C6A495] shadow-[0_8px_16px_rgba(0,0,0,0.1)] p-2 flex flex-col justify-between select-none relative overflow-hidden">
                <div className="absolute top-0 bottom-0 left-1 w-[2px] bg-white/20 shadow-xs" />
                <div className="text-center mt-0.5">
                  <span className="text-[5px] tracking-widest text-[#A67E6E] font-serif font-bold uppercase block">RECIPE</span>
                </div>
                <div className="my-auto mx-auto text-[#A67E6E]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 4v16M4 12h16" strokeDasharray="2 2" />
                  </svg>
                </div>
                <div className="text-center mb-0.5">
                  <span className="text-[4px] tracking-widest text-[#A67E6E]/60 uppercase font-semibold block">PAPIAH PRESS</span>
                </div>
              </div>
            </div>

            {/* Slot 5 / 6: Sand Botanical Notebook */}
            <div className="hidden">
              <div className="w-[88px] h-[120px] bg-[#C5B09E] rounded-[6px] border border-[#A79281] shadow-[0_8px_16px_rgba(0,0,0,0.1)] p-2 flex flex-col justify-between select-none relative overflow-hidden">
                <div className="absolute top-0 bottom-0 left-1 w-[2px] bg-black/10 shadow-xs" />
                <div className="text-right mt-0.5">
                  <span className="text-[6px] tracking-widest text-[#5C4D41] font-sans font-bold uppercase block">BOTANICAL</span>
                </div>
                <div className="my-auto mx-auto text-[#5C4D41]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-8 h-8">
                    <path d="M12 22V2M12 8c2-2 4-2 5-1M12 12c-2-2-4-2-5-1M12 10c2-2 4-2 5-1M12 14c-2-2-4-2-5-1M12 16c2-2 4-2 5-1M12 18c-2-2-4-2-5-1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="text-center mb-0.5">
                  <span className="text-[5px] tracking-widest text-[#5C4D41]/80 uppercase font-semibold block">PLANT JOURNAL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CursorReactivePaper;
