import React, { useState, useRef } from 'react';
import { MarqueeBanner } from '../components/MarqueeBanner';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

// Image Imports
import s10 from '../assets/s10.jpg'; // Open journal lifestyle image
import Product1 from '../assets/Product1.jpeg';
import Product3 from '../assets/Product3.jpg';
import Product4 from '../assets/Product4.jpg';
import Product5 from '../assets/Product5.jpg';
import Book1 from '../assets/book_1.jpg';
import Book3 from '../assets/book_3.jpg';
import Book4 from '../assets/book_4.jpg';
import Book5 from '../assets/book_5.jpg';

export const ProductDetailPage: React.FC = () => {
  // 1. INTERACTIVE STATE VARIABLES
  const [selectedImage, setSelectedImage] = useState<string>(s10);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>('DETAILS');
  const [carouselIndex, setCarouselIndex] = useState<number>(0);

  // Gallery Thumbnails list
  const galleryImages = [
    { src: s10, isVideo: false },
    { src: Product1, isVideo: false },
    { src: Product3, isVideo: false },
    { src: Product5, isVideo: false },
    { src: Product4, isVideo: true } // Simulated video review thumbnail
  ];

  // Accordion details
  const accordions = [
    {
      id: 'DETAILS',
      title: 'DETAILS',
      content: 'A beautiful daily companion featuring prompts for morning gratitude, evening reflection, and weekly check-ins. Thoughtfully crafted to help you organize your mind, live with clear intention, and appreciate the small, beautiful details of everyday life.'
    },
    {
      id: 'WHATS_INSIDE',
      title: "WHAT'S INSIDE",
      content: 'Inside you will find: 120 guided reflection pages, monthly goal-mapping sheets, habit trackers, and 10 blank lined notes pages at the back. It also includes mindfulness suggestions and creative exercises.'
    },
    {
      id: 'PAPER_QUALITY',
      title: 'PAPER & QUALITY',
      content: 'Printed on 100 GSM wood-free cream paper that is ink-friendly and bleed-resistant. Features flat-lay binding for a seamless, comfortable writing experience. Wrapped in a luxury hardcover bound with natural book cloth.'
    },
    {
      id: 'SHIPPING_RETURNS',
      title: 'SHIPPING & RETURNS',
      content: 'Ships in 2-3 business days. Free standard shipping on all orders above ₹1500. Returns are accepted within 7 days of delivery in original unused condition.'
    }
  ];

  // Related products mapping
  const relatedProducts = [
    { id: 1, name: "Gratitude Journal", price: 899, image: Book1 },
    { id: 2, name: "Travel Journal", price: 999, image: Book5 },
    { id: 3, name: "Dreams & Plans Journal", price: 999, image: Book3 },
    { id: 4, name: "Daily Notebook", price: 499, image: Book4 }
  ];

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const nextCarousel = () => {
    setCarouselIndex((prev) => (prev + 1) % relatedProducts.length);
  };

  const prevCarousel = () => {
    setCarouselIndex((prev) => (prev - 1 + relatedProducts.length) % relatedProducts.length);
  };

  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const children = carouselRef.current.children;
      let closestIndex = 0;
      let minDistance = Infinity;
      
      for (let i = 0; i < children.length; i++) {
        const child = children[i] as HTMLElement;
        const distance = Math.abs(child.offsetLeft - scrollLeft - (clientWidth - child.clientWidth) / 2);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = i;
        }
      }
      if (closestIndex !== activeSlide && closestIndex >= 0 && closestIndex < relatedProducts.length) {
        setActiveSlide(closestIndex);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative bg-[#F8F6F2] text-[#2D2D2D] paper-texture select-none">
      
      {/* 1. TOP HEADER SCROLLING STRIP (Marquee) */}
      <MarqueeBanner />

      {/* 2. NAVIGATION BAR */}
      <Navbar />

      {/* 3. MAIN PRODUCT CONTEXT CONTAINER */}
      <main className="max-w-[1400px] w-full mx-auto px-6 md:px-10 lg:px-12 py-10 md:py-14 flex-grow">
        
        {/* Luxury Ecommerce Breadcrumb */}
        <nav className="text-[10px] md:text-[11px] font-sans font-bold tracking-[0.25em] text-[#7D7D7D] uppercase mb-10 text-left select-none">
          <a href="/" className="hover:text-[#2D2D2D] transition-colors">HOME</a>
          <span className="mx-2 text-[#E9E5DF]">/</span>
          <a href="/collection" className="hover:text-[#2D2D2D] transition-colors">SHOP</a>
          <span className="mx-2 text-[#E9E5DF]">/</span>
          <a href="/collection" className="hover:text-[#2D2D2D] transition-colors">JOURNALS</a>
          <span className="mx-2 text-[#E9E5DF]">/</span>
          <span className="text-[#2D2D2D]">THE MINDFUL DAYS JOURNAL</span>
        </nav>

        {/* Product Grid Panel (Left Gallery, Right Details) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-start">
          
          {/* LEFT COLUMN: Gallery View (48% on desktop) */}
          <div className="lg:col-span-6 flex flex-col items-center w-full lg:sticky lg:top-10">
            
            {/* Main Product Image display */}
            <div className="w-full aspect-square rounded-[24px] overflow-hidden relative shadow-[0_12px_36px_rgba(0,0,0,0.03)] border border-[#E9E5DF] bg-white flex items-center justify-center p-4">
              
              <img 
                src={selectedImage} 
                alt="The Mindful Days Journal detail" 
                className={`max-h-[95%] max-w-[95%] object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.08)] transition-transform duration-500 ${
                  isZoomed ? 'scale-150 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
              />

              {/* Wishlist Button (Top-left) */}
              <button 
                className={`absolute top-5 left-5 w-11 h-11 rounded-full bg-white/90 backdrop-blur-[1px] border border-[#E9E5DF]/50 shadow-[0_4px_12px_rgba(0,0,0,0.04)] flex items-center justify-center text-[#7D7D7D] hover:text-[#8E76B8] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer`}
                onClick={() => setIsWishlisted(!isWishlisted)}
                aria-label="Add to wishlist"
              >
                <svg className={`w-5.5 h-5.5 ${isWishlisted ? 'fill-[#8E76B8] text-[#8E76B8]' : ''}`} fill={isWishlisted ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>

              {/* Zoom Button (Top-right) */}
              <button 
                className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/90 backdrop-blur-[1px] border border-[#E9E5DF]/50 shadow-[0_4px_12px_rgba(0,0,0,0.04)] flex items-center justify-center text-[#7D7D7D] hover:text-[#2D2D2D] hover:scale-105 transition-all duration-250 cursor-pointer"
                onClick={() => setIsZoomed(!isZoomed)}
                aria-label="Zoom image"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>

            {/* Thumbnail Slider */}
            <div className="grid grid-cols-5 gap-3 w-full mt-6">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  className={`aspect-square rounded-xl overflow-hidden relative border transition-all duration-200 bg-white flex items-center justify-center p-1 cursor-pointer ${
                    selectedImage === img.src 
                      ? 'border-[#8E76B8] shadow-md scale-[1.02]' 
                      : 'border-[#E9E5DF] hover:border-[#7D7D7D]/40'
                  }`}
                  onClick={() => {
                    setSelectedImage(img.src);
                    setIsZoomed(false);
                  }}
                >
                  <img 
                    src={img.src} 
                    alt={`Thumbnail ${idx + 1}`} 
                    className="max-h-[90%] max-w-[90%] object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.04)]"
                  />
                  {/* Play button icon overlay for video thumbnail */}
                  {img.isVideo && (
                    <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-white/95 flex items-center justify-center shadow-md">
                        <svg className="w-3.5 h-3.5 text-papiah-dark fill-current translate-x-0.5" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Editorial Quote */}
            <div className="mt-8 flex flex-col items-center text-center">
              <span className="text-[14px] text-[#8E76B8]/75 mb-1 select-none">♡</span>
              <p className="font-handwriting text-[21px] text-[#8E76B8] leading-tight max-w-[280px]">
                little tools for beautifully ordinary days
              </p>
            </div>

          </div>

          {/* RIGHT COLUMN: Product Details Panel (52% on desktop) */}
          <div className="lg:col-span-6 flex flex-col text-left w-full select-none lg:sticky lg:top-10">
            
            {/* Category label */}
            <div className="flex items-center gap-1.5 text-[10px] md:text-[11px] font-sans font-bold tracking-[0.25em] text-[#7D7D7D] uppercase mb-3">
              <span>BEST SELLER</span>
              <span className="text-[9px] text-[#8E76B8]">♥</span>
            </div>

            {/* Product Title & Subtitle */}
            <h1 className="font-serif text-[38px] md:text-[44px] text-[#2D2D2D] font-light leading-tight tracking-wide">
              The Mindful Days Journal
            </h1>
            <p className="text-[14px] md:text-[15px] font-serif text-[#7D7D7D] italic tracking-wide mt-2">
              for clarity, calm & everyday reflection
            </p>

            {/* Price section */}
            <div className="mt-5 flex flex-col gap-1">
              <span className="text-[26px] text-[#2D2D2D] font-semibold tracking-wide">
                ₹999
              </span>
              <span className="text-[9px] text-[#7D7D7D] tracking-[0.15em] font-sans uppercase">
                INCLUSIVE OF ALL TAXES
              </span>
            </div>

            {/* Review Stars */}
            <div className="mt-4 flex items-center gap-2">
              <div className="flex text-[#8E76B8] text-sm">
                <span>★</span><span>★</span><span>★</span><span>★</span><span className="text-gray-300">★</span>
              </div>
              <span className="text-[12px] font-sans text-[#7D7D7D]">
                <span className="font-semibold text-[#2D2D2D]">4.9</span> (324 reviews)
              </span>
            </div>

            {/* Description brief */}
            <p className="text-[13px] md:text-[14px] font-sans font-light text-[#7D7D7D] leading-relaxed mt-6">
              A guided journal to help you slow down, reflect and stay connected with what truly matters. Crafted for daily check-ins, mindful routines, and mapping out intentions.
            </p>

            {/* 3x2 Grid of Feature Icons */}
            <div className="grid grid-cols-3 gap-y-6 gap-x-4 border-t border-b border-[#E9E5DF] py-6 my-8">
              
              {/* Feature 1 */}
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[#E8D8F8]/30 flex items-center justify-center text-[#8E76B8] shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <span className="text-[9.5px] font-sans font-bold text-[#2D2D2D] uppercase tracking-widest leading-tight">
                  GUIDED<br />SECTIONS
                </span>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[#E8D8F8]/30 flex items-center justify-center text-[#8E76B8] shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <span className="text-[9.5px] font-sans font-bold text-[#2D2D2D] uppercase tracking-widest leading-tight">
                  120 PAGES<br />OF CLARITY
                </span>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[#E8D8F8]/30 flex items-center justify-center text-[#8E76B8] shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <span className="text-[9.5px] font-sans font-bold text-[#2D2D2D] uppercase tracking-widest leading-tight">
                  100 GSM<br />PREMIUM PAPER
                </span>
              </div>

              {/* Feature 4 */}
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[#E8D8F8]/30 flex items-center justify-center text-[#8E76B8] shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </div>
                <span className="text-[9.5px] font-sans font-bold text-[#2D2D2D] uppercase tracking-widest leading-tight">
                  COMES WITH<br />RIBBON
                </span>
              </div>

              {/* Feature 5 */}
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[#E8D8F8]/30 flex items-center justify-center text-[#8E76B8] shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <span className="text-[9.5px] font-sans font-bold text-[#2D2D2D] uppercase tracking-widest leading-tight">
                  INSIDE POCKET<br />FOR KEEPSAKES
                </span>
              </div>

              {/* Feature 6 */}
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[#E8D8F8]/30 flex items-center justify-center text-[#8E76B8] shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <span className="text-[9.5px] font-sans font-bold text-[#2D2D2D] uppercase tracking-widest leading-tight">
                  DESIGNED<br />MINDFULLY
                </span>
              </div>

            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3.5 mb-10 w-full">
              {/* Add to Cart */}
              <button 
                onClick={() => window.history.pushState(null, '', '/checkout')}
                className="w-full bg-[#CBD83B] hover:bg-[#b8c634] active:scale-[0.99] text-[#2E3327] font-sans font-bold tracking-[0.2em] text-[11px] md:text-[12px] h-[54px] rounded-[12px] shadow-[0_4px_14px_rgba(203,216,59,0.3)] hover:shadow-[0_6px_22px_rgba(203,216,59,0.5)] transition-all duration-300 uppercase cursor-pointer flex items-center justify-center gap-2"
              >
                ADD TO CART <span className="text-[#2E3327]/40 font-normal mx-1">•</span> ₹999
              </button>

              {/* Buy Now */}
              <button 
                onClick={() => window.history.pushState(null, '', '/checkout')}
                className="w-full bg-white hover:bg-gray-50 active:scale-[0.99] text-[#2D2D2D] border border-[#2D2D2D]/30 font-sans font-bold tracking-[0.2em] text-[11px] md:text-[12px] h-[54px] rounded-[12px] transition-all duration-300 uppercase cursor-pointer flex items-center justify-center"
              >
                BUY NOW
              </button>
            </div>

            {/* Accordion list */}
            <div className="flex flex-col border-t border-[#E9E5DF]">
              {accordions.map((acc) => {
                const isOpen = activeAccordion === acc.id;
                return (
                  <div key={acc.id} className="border-b border-[#E9E5DF]">
                    <button
                      className="w-full py-4 flex items-center justify-between font-sans font-bold text-[10.5px] md:text-[11px] tracking-[0.2em] text-[#2D2D2D] hover:text-[#8E76B8] cursor-pointer text-left uppercase"
                      onClick={() => toggleAccordion(acc.id)}
                    >
                      <span>{acc.title}</span>
                      <span className="text-[13px] text-gray-400 font-light ml-4">
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="pb-5 text-[12.5px] md:text-[13px] font-sans font-light text-[#7D7D7D] leading-relaxed transition-all duration-300 animate-fade-in">
                        {acc.content}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>

        </div>

        {/* RELATED PRODUCTS SECTION */}
        <section className="mt-24 border-t border-[#E9E5DF] pt-16 text-left">
          <style dangerouslySetInnerHTML={{ __html: `
            .scrollbar-none::-webkit-scrollbar {
              display: none;
            }
            .scrollbar-none {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}} />
          
          {/* Section title & Slider controls */}
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-serif text-[28px] md:text-[34px] font-light text-[#2D2D2D] tracking-wide">
              you may also love <span className="text-[#8E76B8] inline-block ml-0.5">♡</span>
            </h2>

            {/* Carousel navigation buttons (hidden on mobile, visible on desktop) */}
            <div className="hidden md:flex items-center gap-2">
              <button 
                className="w-10 h-10 rounded-full bg-white border border-[#E9E5DF] flex items-center justify-center text-gray-500 hover:text-papiah-dark active:scale-95 transition-all duration-150 cursor-pointer shadow-2xs"
                onClick={prevCarousel}
                aria-label="Previous products"
              >
                &lt;
              </button>
              <button 
                className="w-10 h-10 rounded-full bg-white border border-[#E9E5DF] flex items-center justify-center text-gray-500 hover:text-papiah-dark active:scale-95 transition-all duration-150 cursor-pointer shadow-2xs"
                onClick={nextCarousel}
                aria-label="Next products"
              >
                &gt;
              </button>
            </div>
          </div>

          {/* DESKTOP 4-Item Grid (Visible on md and up) */}
          <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-7">
            {[...relatedProducts.slice(carouselIndex), ...relatedProducts.slice(0, carouselIndex)].map((prod) => (
              <div key={prod.id} className="flex flex-col group relative">
                
                {/* Related product cover image container */}
                <div className="w-full aspect-[4/5] rounded-[20px] overflow-hidden relative shadow-[0_4px_16px_rgba(0,0,0,0.03)] border border-gray-200/20 bg-white flex items-center justify-center p-3 select-none transition-all duration-300 group-hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(0,0,0,0.06)]">
                  <img 
                    src={prod.image} 
                    alt={prod.name} 
                    className="max-h-[90%] max-w-[90%] object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.06)] transform group-hover:scale-[1.02] transition-all duration-500 ease-out"
                    loading="lazy"
                  />
                </div>

                {/* Content info */}
                <div className="flex items-start justify-between mt-5 pr-1">
                  <div className="flex flex-col">
                    <h3 className="font-serif text-[16px] md:text-[17px] text-[#2C2B29] font-medium leading-tight group-hover:text-[#8E76B8] transition-colors duration-200">
                      {prod.name}
                    </h3>
                    <span className="text-[14px] text-[#7D7D7D] font-medium mt-1.5">
                      ₹{prod.price}
                    </span>
                  </div>

                  {/* Add Icon button */}
                  <button 
                    className="w-9 h-9 rounded-full bg-white border border-gray-200/60 shadow-[0_2px_6px_rgba(0,0,0,0.04)] flex items-center justify-center text-gray-500 hover:text-papiah-dark hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shrink-0 ml-3"
                    aria-label={`Add ${prod.name} to Cart`}
                  >
                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* MOBILE Carousel (Visible only on mobile/tablet < md) */}
          <div 
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex md:hidden flex-row overflow-x-auto gap-5 scrollbar-none snap-x snap-mandatory -mx-6 px-6 pb-2"
          >
            {relatedProducts.map((prod) => (
              <div key={prod.id} className="w-[210px] shrink-0 snap-center flex flex-col group relative">
                
                {/* Related product cover image container */}
                <div className="w-full aspect-[4/5] rounded-[16px] overflow-hidden relative shadow-[0_4px_16px_rgba(0,0,0,0.03)] border border-gray-200/20 bg-white flex items-center justify-center p-2.5 select-none transition-all duration-300">
                  <img 
                    src={prod.image} 
                    alt={prod.name} 
                    className="max-h-[90%] max-w-[90%] object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.06)] transform"
                    loading="lazy"
                  />
                </div>

                {/* Content info */}
                <div className="flex items-start justify-between mt-3.5 pr-1">
                  <div className="flex flex-col">
                    <h3 className="font-serif text-[14px] text-[#2C2B29] font-medium leading-tight">
                      {prod.name}
                    </h3>
                    <span className="text-[13px] text-[#7D7D7D] font-medium mt-1">
                      ₹{prod.price}
                    </span>
                  </div>

                  {/* Add Icon button */}
                  <button 
                    className="w-8 h-8 rounded-full bg-white border border-gray-200/60 shadow-[0_2px_6px_rgba(0,0,0,0.04)] flex items-center justify-center text-gray-500 hover:text-[#8E76B8] active:scale-95 transition-all duration-200 cursor-pointer shrink-0 ml-3"
                    aria-label={`Add ${prod.name} to Cart`}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* Mobile Page Indicator Dots */}
          <div className="flex md:hidden justify-center items-center gap-1.5 mt-5">
            {relatedProducts.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (carouselRef.current) {
                    const children = carouselRef.current.children;
                    if (children[idx]) {
                      (children[idx] as HTMLElement).scrollIntoView({
                        behavior: 'smooth',
                        inline: 'center',
                        block: 'nearest'
                      });
                    }
                  }
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeSlide 
                    ? 'w-6 bg-[#8E76B8]' 
                    : 'w-1.5 bg-[#8E76B8]/30'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </section>

      </main>

      {/* 4. BOTTOM FOOTER */}
      <Footer />

    </div>
  );
};

export default ProductDetailPage;
