import React, { useEffect, useRef } from 'react';
import { useCursor } from '../context/CursorContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import journeyMindset from '../assets/1st_fold.webp';
import secondFoldImg from '../assets/2nd_fold_dash.webp';
import journeyWedding from '../assets/3rd_fold.webp';
import journeyMotherhood from '../assets/s2_p4.webp';

gsap.registerPlugin(ScrollTrigger);

interface FeatureItem {
  icon: React.ReactNode;
  label: string;
}

interface CategoryCardProps {
  number: string;
  title: string;
  description: string;
  image: string;
  targetId: string;
  useSplitPanel?: boolean;
  badgeIcon?: React.ReactNode;
  titleFirstLine?: string;
  titleSecondLine?: string;
  features?: FeatureItem[];
  leftPanelBg?: string;
  headingColor?: string;
  accentColor?: string;
  textColor?: string;
  buttonBg?: string;
}

const CategoryPanel: React.FC<CategoryCardProps> = ({ 
  number, 
  title, 
  description, 
  image, 
  targetId, 
  useSplitPanel, 
  badgeIcon, 
  titleFirstLine, 
  titleSecondLine, 
  features,
  leftPanelBg,
  headingColor,
  accentColor,
  textColor,
  buttonBg
}) => {
  const handleScrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (useSplitPanel && features && titleFirstLine && titleSecondLine) {
    return (
      <div className={`journey-panel absolute inset-0 w-full h-full flex flex-col md:flex-row overflow-hidden rounded-2xl panel-bg-${number}`}
        style={{ 
          boxShadow: '0 20px 50px rgba(0,0,0,0.08)',
          backgroundColor: leftPanelBg || '#F1E4D3',
        }}>
        <style dangerouslySetInnerHTML={{ __html: `
          .left-panel-responsive-${number} {
            background: transparent;
            border-right: none;
            box-shadow: none;
          }
          @media (min-width: 768px) {
            .left-panel-responsive-${number} {
              background: ${leftPanelBg || 'linear-gradient(to bottom right, #F1E4D3, #EEDDC8, #ECDAC3)'} !important;
              border-right: 1px solid rgba(0,0,0,0.05) !important;
              box-shadow: inset -40px 0 60px rgba(255,255,255,0.15) !important;
            }
            .panel-bg-${number} {
              background-image: url(${image}) !important;
              background-size: cover !important;
              background-position: center !important;
              background-repeat: no-repeat !important;
            }
          }
        `}} />

        {/* LEFT PANEL — 45%, matching paper texture bg */}
        <div 
          className={`relative flex flex-col justify-between w-full md:w-[45%] h-[65%] md:h-full pl-5 md:pl-[80px] pr-5 md:pr-10 pt-6 md:pt-[50px] pb-6 md:pb-[50px] shrink-0 z-10 overflow-hidden left-panel-responsive-${number}`}
          style={{ 
            boxSizing: 'border-box',
          }}
        >
          {/* Subtle botanical illustration background */}
          <div className="absolute right-[-10px] bottom-[-10px] opacity-[0.06] pointer-events-none select-none text-[#2E3A22] z-0">
            <svg viewBox="0 0 100 100" className="w-[180px] h-[180px]">
              <path d="M10 90 Q 50 80 80 20 M 30 70 Q 20 50 15 45 M 50 55 Q 40 35 32 30 M 70 35 Q 60 15 52 10 M 30 70 Q 50 50 60 45 M 50 55 Q 70 35 78 30 M 70 35 Q 90 15 95 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div 
            className="absolute left-[-15px] top-[20%] opacity-[0.05] pointer-events-none select-none z-0"
            style={{ color: accentColor || '#C96B4B' }}
          >
            <svg viewBox="0 0 100 100" className="w-[120px] h-[120px]">
              <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" />
            </svg>
          </div>

          {/* Top Badge Area */}
          <div className="flex items-center gap-2.5 relative z-10 mt-1 md:mt-2 select-none">
            <div 
              className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full shrink-0 shadow-xs"
              style={{
                backgroundColor: `${accentColor || '#C96B4B'}1A`,
                border: `1px solid ${accentColor || '#C96B4B'}33`,
                color: accentColor || '#C96B4B'
              }}
            >
              {badgeIcon}
            </div>
            
            <div className="flex flex-col items-start leading-tight">
              <span 
                className="font-handwriting text-[13px] md:text-[15px] font-semibold flex items-center gap-1"
                style={{ color: accentColor || '#C96B4B' }}
              >
                Made with love,
                <svg viewBox="0 0 24 24" fill={accentColor || '#C96B4B'} className="w-2.5 h-2.5 animate-pulse">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </span>
              <span 
                className="font-handwriting text-[11px] md:text-[13px]"
                style={{ color: textColor ? `${textColor}B3` : 'rgba(46, 58, 34, 0.7)' }}
              >
                shared with joy
              </span>
            </div>
          </div>

          {/* Main Heading & Description Group */}
          <div className="flex flex-col items-start my-auto relative z-10 w-full">
            {/* Title */}
            <h3 className="font-playfair leading-[1.02] text-left select-none animate-fade-in"
                style={{ 
                  fontSize: 'clamp(28px, 4.4vw, 58px)', 
                  fontWeight: 300,
                  color: headingColor || '#2E3A22'
                }}>
              {titleFirstLine}<br />
              <span className="font-light italic mr-2" style={{ color: accentColor || '#C96B4B' }}>&amp;</span>
              {titleSecondLine}
            </h3>

            {/* Hand-drawn connecting dashed arrow with heart */}
            <div className="flex items-center gap-2.5 w-[140px] md:w-[180px] my-3 md:my-5 select-none">
              <div 
                className="h-[1px] md:h-[2px] flex-grow rounded-full"
                style={{ backgroundColor: `${accentColor || '#C96B4B'}80` }}
              ></div>
              <svg viewBox="0 0 24 24" fill={accentColor || '#C96B4B'} className="w-3 h-3 md:w-3.5 md:h-3.5 shrink-0">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <div 
                className="h-[1px] md:h-[2px] flex-grow rounded-full"
                style={{ backgroundColor: `${accentColor || '#C96B4B'}80` }}
              ></div>
            </div>

            {/* Description */}
            <p className="font-playfair italic font-light text-left leading-relaxed max-w-[420px]"
               style={{ 
                 fontSize: 'clamp(13px, 1.6vw, 18px)',
                 color: textColor ? `${textColor}E6` : 'rgba(46, 58, 34, 0.9)'
               }}>
              {description}
            </p>
          </div>

          {/* Feature Row */}
          <div 
            className="grid grid-cols-4 gap-2 w-full relative z-10 pt-4 mt-auto mb-4 select-none"
            style={{ borderTop: `1px solid ${textColor ? `${textColor}1A` : 'rgba(46, 58, 34, 0.1)'}` }}
          >
            {features.map((feat, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div 
                  className="flex items-center justify-center w-9 h-9 md:w-12 md:h-12 rounded-full border shadow-2xs hover:scale-105 transition-transform duration-300"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    borderColor: textColor ? `${textColor}1A` : 'rgba(46, 58, 34, 0.1)',
                    color: headingColor || '#2E3A22'
                  }}
                >
                  {feat.icon}
                </div>
                <span 
                  className="font-sans font-medium text-[7.5px] md:text-[10px] tracking-[0.1em] uppercase mt-2 leading-snug max-w-[85px] overflow-hidden text-ellipsis whitespace-nowrap md:whitespace-normal"
                  style={{ color: textColor ? `${textColor}D9` : 'rgba(46, 58, 34, 0.85)' }}
                  title={feat.label}
                >
                  {feat.label}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex-shrink-0 relative z-10 w-full mt-1">
            <a 
              href={`#${targetId}`} 
              onClick={(e) => handleScrollTo(e, targetId)}
              className="group inline-flex items-center justify-center gap-2.5 transition-all duration-300 hover:brightness-105 active:scale-[0.98] w-full md:w-auto"
              style={{
                textDecoration: 'none',
                background: buttonBg || 'linear-gradient(135deg, #E28C6A 0%, #C96B4B 100%)',
                borderRadius: '999px',
                padding: '10px 24px',
                boxShadow: buttonBg 
                  ? `0 6px 18px rgba(217, 138, 108, 0.15)` 
                  : '0 6px 18px rgba(201,107,75,0.15)',
              }}
            >
              <span className="font-sans font-semibold uppercase tracking-[0.18em] text-[10px] md:text-[12px] text-white">
                EXPLORE COLLECTION &rarr;
              </span>
            </a>
          </div>
        </div>

        {/* Hairline divider at 45% */}
        <div className="absolute top-[6%] bottom-[6%] pointer-events-none hidden md:block"
          style={{ left: '45%', width: '1px', background: 'rgba(47,51,40,0.1)' }} />

        {/* RIGHT PANEL — 55%, transparent spacer on desktop, image on mobile */}
        <div className="relative flex-grow w-full md:w-[55%] h-[35%] md:h-full overflow-hidden md:bg-transparent shrink-0">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover md:hidden"
            loading="lazy"
            style={{ 
              filter: 'brightness(1.04) saturate(1.08)' 
            }}
          />
          {/* Soft gradient fade overlay on mobile at the top edge of the image */}
          <div className="absolute inset-x-0 top-0 h-12 md:hidden pointer-events-none"
               style={{
                 backgroundImage: `linear-gradient(to bottom, ${leftPanelBg || '#F1E4D3'} 0%, transparent 100%)`
               }}
          />
        </div>

      </div>
    );
  }

  // Default layout for all other categories
  return (
    <div className="journey-panel absolute inset-0 w-full h-full bg-transparent flex flex-col-reverse md:flex-row items-center justify-between p-6 md:p-10 lg:p-12 gap-6 md:gap-10 lg:gap-16">
      
      {/* Left Column: Content */}
      <div className="flex flex-col justify-center items-start w-full md:w-[46%] text-left py-2 md:py-6 gap-4 sm:gap-5 md:gap-6 md:h-full relative z-10">
        
        {/* Journey Number & Botanical Accent */}
        <div className="flex items-center gap-3 select-none mb-1 md:mb-2">
          <span className="font-playfair text-[72px] sm:text-[96px] md:text-[120px] lg:text-[140px] font-light text-[#B38AC9]/30 leading-none tracking-tight">
            {number}
          </span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-5 h-5 md:w-6 md:h-6 text-[#B38AC9]/40 shrink-0">
            {/* Delicate branch leaf accent */}
            <path d="M12 22C12 22 12 14 12 6C12 6 15 9 15 12C15 15 12 17 12 17" strokeLinecap="round" />
            <path d="M12 18C12 18 9 16 9 13C9 10 12 8 12 8" strokeLinecap="round" />
            <path d="M12 13C12 13 16 11 16 8C16 5 12 3 12 3" strokeLinecap="round" />
          </svg>
        </div>

        {/* Title */}
        <h3 className="font-playfair text-[24px] sm:text-[28px] md:text-[34px] lg:text-[40px] text-[#2F3328] font-medium leading-tight lowercase">
          {title}
        </h3>
        
        {/* Description */}
        <p className="font-sans text-[12.5px] sm:text-[13.5px] md:text-[14.5px] text-[#2F3328]/70 font-light leading-relaxed max-w-[380px] select-text">
          {description}
        </p>

        {/* CTA Link */}
        <a 
          href={`#${targetId}`} 
          onClick={(e) => handleScrollTo(e, targetId)}
          className="flex items-center gap-2 text-[#2F3328]/75 hover:text-[#2F3328] font-sans font-semibold tracking-[0.2em] text-[11px] md:text-[12px] uppercase transition-colors duration-300 group shrink-0"
        >
          <span>Explore Now</span>
          <svg 
            className="w-3.5 h-3.5 transform transition-transform duration-400 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-1.5" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5"
          >
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

      {/* Hand-drawn connecting dashed arrow between left and right (desktop only) */}
      <div className="absolute left-[41%] right-[41%] top-[52%] -translate-y-1/2 h-16 pointer-events-none hidden md:block opacity-65 z-0">
        <svg viewBox="0 0 120 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-full h-full text-[#B38AC9]">
          {/* Gentle wind-blown loop dashed line */}
          <path d="M 5 20 C 35 10, 50 35, 65 20 C 75 10, 95 15, 110 20" strokeDasharray="4 5" />
          {/* Elegant hand-drawn Arrowhead pointing right */}
          <path d="M 102 14 L 111 20 L 102 26" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Right Column: Image Container (bg-transparent, width 48% for larger product scale, no box shadows) */}
      <div className="w-full md:w-[48%] h-[260px] md:h-full bg-transparent shrink-0 flex items-center justify-center relative z-10">
        <img 
          src={image} 
          alt={title} 
          className="max-w-[110%] max-h-[110%] md:scale-110 lg:scale-115 object-contain transition-transform duration-750 hover:scale-[1.18] filter drop-shadow-[0_20px_45px_rgba(47,51,40,0.12)]"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export const PhilosophyIntroSection: React.FC = () => {
  const { setCursorType } = useCursor();
  const sectionRef = useRef<HTMLDivElement>(null);

  const categories = [
    {
      number: "01",
      title: "Planning & Productivity",
      description: "Organize your days, set meaningful goals, and build powerful habits. Designed for clarity, focus, and the intentional pursuit of your best self.",
      image: journeyMindset,
      targetId: "mindset-section",
      bgColor: 'rgba(235, 239, 232, 0.9)', // Soft warm sage cream to harmonize with 1st_fold.webp
      borderColor: 'rgba(196, 202, 190, 0.9)',
      useSplitPanel: true,
      badgeIcon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5.5 h-5.5">
          <circle cx="12" cy="12" r="10" />
          <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      titleFirstLine: "Plan",
      titleSecondLine: "Productivity",
      features: [
        {
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
              <circle cx="12" cy="12" r="10" stroke="#C96B4B" strokeWidth="1.5" />
              <circle cx="12" cy="12" r="6" stroke="#C96B4B" strokeWidth="1.5" />
              <circle cx="12" cy="12" r="2" fill="#C96B4B" />
            </svg>
          ),
          label: "Set goals"
        },
        {
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="#C96B4B" strokeWidth="1.5" />
              <path d="M16 2v4M8 2v4M3 10h18M9 14l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" stroke="#C96B4B" strokeWidth="1.5" />
            </svg>
          ),
          label: "Build habits"
        },
        {
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
              <circle cx="12" cy="12" r="5" stroke="#C96B4B" strokeWidth="1.5" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" strokeLinecap="round" stroke="#C96B4B" strokeWidth="1.5" />
            </svg>
          ),
          label: "Focus"
        },
        {
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
              <path d="M3 3v18h18M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" strokeLinecap="round" strokeLinejoin="round" stroke="#C96B4B" strokeWidth="1.5" />
            </svg>
          ),
          label: "Track progress"
        }
      ]
    },
    {
      number: "02",
      title: "Recipe & Kitchen",
      description: "Journals for every cook, baker & food lover. Preserve family recipes, kitchen notes, and culinary adventures in a beautiful keepsake.",
      image: secondFoldImg,
      targetId: "lifestyle-section",
      bgColor: 'rgba(245, 238, 230, 0.92)', // Warm card bg to match recipe theme
      borderColor: 'rgba(215, 205, 194, 0.9)',
      useSplitPanel: true,
      badgeIcon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5.5 h-5.5">
          <path d="M6 14c-1.5 0-2.5-1-2.5-2.5S5 9 5 9s-.5-2.5 1.5-3.5S10 6 10 6s1-2.5 3-2.5 3 2.5 3 2.5 2-1 3.5 0S21 9.5 21 9.5s1.5 1 1.5 2.5-1.5 2.5-3 2.5H6Z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 14v4a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      titleFirstLine: "Recipe",
      titleSecondLine: "Kitchen",
      features: [
        {
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" strokeLinecap="round" strokeLinejoin="round" stroke="#C96B4B" strokeWidth="1.5" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" strokeLinecap="round" strokeLinejoin="round" stroke="#C96B4B" strokeWidth="1.5" />
              <circle cx="13" cy="10" r="2" stroke="#C96B4B" strokeWidth="1.5" />
            </svg>
          ),
          label: "Save recipes"
        },
        {
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
              <rect x="3" y="5" width="18" height="14" rx="2" strokeLinecap="round" strokeLinejoin="round" stroke="#C96B4B" strokeWidth="1.5" />
              <path d="M7 9h10M7 13h6" strokeLinecap="round" strokeLinejoin="round" stroke="#C96B4B" strokeWidth="1.5" />
            </svg>
          ),
          label: "Organize"
        },
        {
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
              <path d="M12 2c-2.5 0-4.5 3-4.5 7.5S9.5 17 12 17s4.5-3 4.5-7.5S14.5 2 12 2z" strokeLinecap="round" strokeLinejoin="round" stroke="#C96B4B" strokeWidth="1.5" />
              <path d="M12 2c-1.2 0-2 3-2 7.5S10.8 17 12 17s2-3 2-7.5S13.2 2 12 2z" strokeLinecap="round" strokeLinejoin="round" stroke="#C96B4B" strokeWidth="1.5" />
              <path d="M12 17v5M10 22h4" strokeLinecap="round" strokeLinejoin="round" stroke="#C96B4B" strokeWidth="1.5" />
            </svg>
          ),
          label: "Inspire"
        },
        {
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" strokeLinecap="round" strokeLinejoin="round" stroke="#C96B4B" strokeWidth="1.5" />
              <path d="M12 5v6M9 8h6" strokeLinecap="round" strokeLinejoin="round" stroke="#C96B4B" strokeWidth="1.5" />
            </svg>
          ),
          label: "Keepsake"
        }
      ]
    },
    {
      number: "03",
      title: "Wedding Collection",
      description: "Document your love story, wedding planning milestones, and heartfelt guest wishes on premium, heirloom-quality pages designed to last a lifetime.",
      image: journeyWedding,
      targetId: "wedding-section",
      bgColor: '#F1E7D8',
      borderColor: 'rgba(215, 205, 194, 0.6)',
      useSplitPanel: true,
      badgeIcon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5.5 h-5.5">
          <circle cx="9" cy="12" r="4.5" />
          <circle cx="15" cy="12" r="4.5" />
        </svg>
      ),
      titleFirstLine: "Wedding",
      titleSecondLine: "Love",
      leftPanelBg: '#F1E7D8',
      headingColor: '#2E402A',
      accentColor: '#D98A6C',
      textColor: '#55604D',
      buttonBg: '#D98A6C',
      features: [
        {
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" strokeLinecap="round" strokeLinejoin="round" stroke="#D98A6C" strokeWidth="1.5" />
            </svg>
          ),
          label: "Love story"
        },
        {
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round" stroke="#D98A6C" strokeWidth="1.5" />
            </svg>
          ),
          label: "Guest wishes"
        },
        {
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
              <circle cx="12" cy="12" r="10" stroke="#D98A6C" strokeWidth="1.5" />
              <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" stroke="#D98A6C" strokeWidth="1.5" />
            </svg>
          ),
          label: "Organize"
        },
        {
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.9 1.38H2l4.9 3.56a2 2 0 0 1 .727 2.24L5.713 22 12 18.44 18.287 22l-1.912-6.007a2 2 0 0 1 .727-2.24L22 10.193h-6.188a2 2 0 0 1-1.9-1.38L12 3z" strokeLinecap="round" strokeLinejoin="round" stroke="#D98A6C" strokeWidth="1.5" />
            </svg>
          ),
          label: "Keepsake"
        }
      ]
    },
    {
      number: "04",
      title: "Motherhood Journals",
      description: "Document pregnancy milestones and your baby's precious first year in heirloom-quality keepsake memory books designed to last.",
      image: journeyMotherhood,
      targetId: "motherhood-section",
      bgColor: 'rgba(249, 233, 226, 0.9)',
      borderColor: 'rgba(228, 208, 198, 0.9)',
      useSplitPanel: true,
      badgeIcon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5.5 h-5.5">
          <path d="M12 21a9 9 0 0 0 9-9c0-3-2.5-5.5-5.5-5.5h-7A5.5 5.5 0 0 0 3 12a9 9 0 0 0 9 9Z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 14a4 4 0 0 0 8 0" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      titleFirstLine: "Motherhood",
      titleSecondLine: "Baby",
      features: [
        {
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" stroke="#C96B4B" strokeWidth="1.5" />
            </svg>
          ),
          label: "Pregnancy"
        },
        {
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
              <path d="M4 19a8 8 0 0 0 16 0" stroke="#C96B4B" strokeWidth="1.5" />
              <path d="M12 4v7M8 8h8M6 11v8M18 11v8" strokeLinecap="round" stroke="#C96B4B" strokeWidth="1.5" />
            </svg>
          ),
          label: "First year"
        },
        {
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="#C96B4B" strokeWidth="1.5" />
              <circle cx="12" cy="13" r="4" stroke="#C96B4B" strokeWidth="1.5" />
            </svg>
          ),
          label: "Memories"
        },
        {
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
              <path d="M20 12V4H4v8M2 12h20v8H2zM12 16a2 2 0 100-4 2 2 0 000 4z" strokeLinecap="round" strokeLinejoin="round" stroke="#C96B4B" strokeWidth="1.5" />
            </svg>
          ),
          label: "Treasure"
        }
      ]
    }
  ];

  useEffect(() => {
    const panels = gsap.utils.toArray('.journey-panel') as HTMLElement[];
    console.log("PhilosophyIntroSection: panels loaded count =", panels.length);
    if (panels.length === 0) return;

    // Set initial state
    gsap.set(panels.slice(1), { y: 100, opacity: 0, scale: 0.95, pointerEvents: 'none' });
    gsap.set(panels[0], { y: 0, opacity: 1, scale: 1, pointerEvents: 'auto' });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=2600',
          pin: true,
          pinSpacing: true,
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      // Panel 0 hold
      tl.to({}, { duration: 0.5 });

      // Transitions between 4 panels
      for (let i = 0; i < panels.length - 1; i++) {
        tl.to(panels[i], {
          y: -80,
          opacity: 0,
          scale: 0.95,
          pointerEvents: 'none',
          duration: 1,
          ease: 'power3.inOut'
        })
        .fromTo(panels[i + 1], 
          { y: 100, opacity: 0, scale: 0.95, pointerEvents: 'none' }, 
          { y: 0, opacity: 1, scale: 1, pointerEvents: 'auto', duration: 1, ease: 'power3.inOut' }, 
          '<'
        )
        .to('.journey-cards-container', {
          backgroundColor: categories[i + 1].bgColor,
          borderColor: categories[i + 1].borderColor,
          duration: 1,
          ease: 'power3.inOut'
        }, '<')
        // Add a hold pause after each transition
        .to({}, { duration: 0.5 });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full relative">
      <section 
        ref={sectionRef}
        className="w-full h-screen min-h-[780px] lg:h-screen lg:min-h-[800px] relative z-20 select-none overflow-hidden flex flex-col items-center"
        style={{
          backgroundColor: '#F6F0E6',
        }}
        onMouseEnter={() => setCursorType('default')}
      >
        {/* Centered Editorial Content Container at the Top — compact label */}
        <div className="w-full text-center flex flex-col items-center justify-center flex-shrink-0 relative z-25 px-4 h-[120px] sm:h-[140px] mt-2">
          {/* Heading */}
          <h2 
            className="font-playfair text-[28px] sm:text-[44px] md:text-[56px] lg:text-[68px] text-[#2F3328] font-light leading-tight tracking-tight"
          >
            Choose Your Journey
          </h2>

          {/* Subtitle */}
          <p className="font-handwriting text-[15px] md:text-[18px] lg:text-[20px] text-[#B38AC9] font-normal leading-snug select-text mt-2.5">
            Start where you are. Grow <span className="relative inline-block px-0.5">
              where
              <svg className="absolute left-0 bottom-[-1px] w-full h-[4px] text-[#B38AC9]" viewBox="0 0 100 10" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M3 7 C 30 9, 70 8, 97 4" />
              </svg>
            </span> you want to go.
          </p>
        </div>

        {/* Card — Width: 90% on mobile, 78% on desktop. Height scales to fill. */}
        <div 
          className="journey-cards-container w-[90%] md:w-[78%] max-w-[1420px] flex-grow md:flex-initial md:h-[600px] mx-auto mt-4 md:mt-[30px] mb-8 md:mb-[30px] z-10 relative rounded-[28px] md:rounded-[32px] border shadow-[0_12px_36px_rgba(0,0,0,0.04)] paper-texture overflow-hidden min-h-0"
          style={{
            backgroundColor: categories[0].bgColor,
            borderColor: categories[0].borderColor,
          }}
        >
          <div className="relative w-full h-full">
            {categories.map((cat, index) => (
              <CategoryPanel 
                key={index}
                {...cat}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
