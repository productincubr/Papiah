import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

type CursorType = 'default' | 'featured' | 'philosophy' | 'mindset' | 'lifestyle' | 'wedding' | 'bridegroom' | 'footer';

interface CursorContextProps {
  cursorType: CursorType;
  setCursorType: (type: CursorType) => void;
  cursorRef: React.RefObject<HTMLDivElement | null>;
  isVisible: boolean;
}

const CursorContext = createContext<CursorContextProps | undefined>(undefined);

export const CursorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cursorType, setCursorType] = useState<CursorType>('default');
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement | null>(null);

  const mouse = useRef({ x: -100, y: -100 });
  const cursor = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Hide cursor by default on non-touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Spring (Lerp) effect using requestAnimationFrame
    let animationFrameId: number;
    const speed = 0.12; // Smoothness factor (lower = smoother/more lag)

    const updatePosition = () => {
      // Linear Interpolation: current = current + (target - current) * speed
      cursor.current.x += (mouse.current.x - cursor.current.x) * speed;
      cursor.current.y += (mouse.current.y - cursor.current.y) * speed;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursor.current.x}px, ${cursor.current.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    updatePosition();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  return (
    <CursorContext.Provider value={{ cursorType, setCursorType, cursorRef, isVisible }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
};
