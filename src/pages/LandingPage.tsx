import React from 'react';
import { MarqueeBanner } from '../components/MarqueeBanner';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { PhilosophyIntroSection } from '../components/PhilosophyIntroSection';
import { FeaturedCollections } from '../components/FeaturedCollections';
import { LoremIpsumMarquee } from '../components/LoremIpsumMarquee';
import { GreenBannerSection } from '../components/GreenBannerSection';
import { CustomerTestimonialsSection } from '../components/CustomerTestimonialsSection';
import { FibreToFeelingSection } from '../components/FibreToFeelingSection';
import { BrandStorytellingSection } from '../components/BrandStorytellingSection';
import { PlantableJourneySection } from '../components/PlantableJourneySection';
import { Footer } from '../components/Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen relative paper-texture bg-papiah-cream text-papiah-dark">
      {/* 1. TOP HEADER SCROLLING STRIP (Marquee) */}
      <MarqueeBanner />

      {/* 2. NAVIGATION BAR */}
      <Navbar />

      {/* 3. HERO CONTENT SECTION */}
      <HeroSection />

      {/* 3.5. BRAND STORY & PHILOSOPHY INTRO SECTION */}
      <PhilosophyIntroSection />

      {/* 4.1. LOREM IPSUM SCROLLING STRIP */}
      <LoremIpsumMarquee />

      {/* Decorative page ticks grid divider */}
      <div className="relative w-full h-[1px] bg-papiah-grid/65 select-none z-10">
        <div className="absolute top-[-4.5px] left-0 border-l-5 border-t-5 border-r-5 border-b-5 border-transparent border-l-gray-300"></div>
        <div className="absolute top-[-4.5px] right-0 border-r-5 border-t-5 border-l-5 border-b-5 border-transparent border-r-gray-300"></div>
      </div>

      {/* 4. SECOND SECTION: FEATURED COLLECTIONS */}
      <FeaturedCollections />

      {/* 4.5. GREEN DECORATIVE BANNER */}
      <GreenBannerSection />

      {/* Decorative page ticks grid divider */}
      <div className="relative w-full h-[1px] bg-papiah-grid/65 select-none z-10">
        <div className="absolute top-[-4.5px] left-0 border-l-5 border-t-5 border-r-5 border-b-5 border-transparent border-l-gray-300"></div>
        <div className="absolute top-[-4.5px] right-0 border-r-5 border-t-5 border-l-5 border-b-5 border-transparent border-r-gray-300"></div>
      </div>


      {/* Decorative page ticks grid divider */}
      <div className="relative w-full h-[1px] bg-papiah-grid/65 select-none z-10">
        <div className="absolute top-[-4.5px] left-0 border-l-5 border-t-5 border-r-5 border-b-5 border-transparent border-l-gray-300"></div>
        <div className="absolute top-[-4.5px] right-0 border-r-5 border-t-5 border-l-5 border-b-5 border-transparent border-r-gray-300"></div>
      </div>

      {/* 10.5. TESTIMONIALS SECTION */}
      <CustomerTestimonialsSection />

      {/* Decorative page ticks grid divider */}
      <div className="relative w-full h-[1px] bg-papiah-grid/65 select-none z-10">
        <div className="absolute top-[-4.5px] left-0 border-l-5 border-t-5 border-r-5 border-b-5 border-transparent border-l-gray-300"></div>
        <div className="absolute top-[-4.5px] right-0 border-r-5 border-t-5 border-l-5 border-b-5 border-transparent border-r-gray-300"></div>
      </div>

      {/* 14. BRAND STORYTELLING SECTION */}
      <BrandStorytellingSection />

      {/* Decorative page ticks grid divider */}
      <div className="relative w-full h-[1px] bg-papiah-grid/65 select-none z-10">
        <div className="absolute top-[-4.5px] left-0 border-l-5 border-t-5 border-r-5 border-b-5 border-transparent border-l-gray-300"></div>
        <div className="absolute top-[-4.5px] right-0 border-r-5 border-t-5 border-l-5 border-b-5 border-transparent border-r-gray-300"></div>
      </div>

      {/* 13. TENTH SECTION: FIBRE TO FEELING PROCESS */}
      <FibreToFeelingSection /> 

      {/* Decorative page ticks grid divider */}
      <div className="relative w-full h-[1px] bg-papiah-grid/65 select-none z-10">
        <div className="absolute top-[-4.5px] left-0 border-l-5 border-t-5 border-r-5 border-b-5 border-transparent border-l-gray-300"></div>
        <div className="absolute top-[-4.5px] right-0 border-r-5 border-t-5 border-l-5 border-b-5 border-transparent border-r-gray-300"></div>
      </div>

      {/* 13.5. PLANTABLE PAPER LIFE CYCLE JOURNEY */}
      <PlantableJourneySection />

      {/* 13. BOTTOM FOOTER */}
      <Footer />
    </div>
  );
};

export default LandingPage;
