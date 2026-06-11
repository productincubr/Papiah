import React from 'react';
import { MarqueeBanner } from '../components/MarqueeBanner';
import { Navbar } from '../components/Navbar';
import { CollectionHeroSection } from '../components/CollectionHeroSection';
import { CollectionCatalogSection } from '../components/CollectionCatalogSection';
import { CollectionFeaturesStrip } from '../components/CollectionFeaturesStrip';
import { Footer } from '../components/Footer';

export const WorkbooksPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen relative paper-texture bg-papiah-cream text-papiah-dark">
      {/* 1. TOP HEADER SCROLLING STRIP (Marquee) */}
      <MarqueeBanner />

      {/* 2. NAVIGATION BAR */}
      <Navbar />

      {/* 3. HERO CONTENT SECTION */}
      <CollectionHeroSection />

      {/* Product Catalog Grid and Filters Section */}
      <CollectionCatalogSection />

      {/* Brand Value Props Feature Strip */}
      <CollectionFeaturesStrip />

      {/* 4. BOTTOM FOOTER */}
      <Footer />
    </div>
  );
};

export default WorkbooksPage;
