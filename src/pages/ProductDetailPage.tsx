import React, { useState, useEffect, useRef } from 'react';
import { MarqueeBanner } from '../components/MarqueeBanner';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useCart } from '../context/CartContext';
import { API_URL } from '../config/api';
import { LOCATION_CHANGE_EVENT } from '../utils/navigation';

// Fallback image used when a product has no cover image / gallery images.
import s10 from '../assets/s10.webp';

interface ProductImage {
  image_url: string;
  sort_order?: number;
}

interface ProductFeature {
  icon?: string;
  title: string;
  description?: string;
}

interface Product {
  id: string;
  title: string;
  slug: string;
  price: number;
  compare_price?: number | null;
  short_description?: string;
  description?: string;
  cover_image?: string;
  stock: number;
  categories?: { name: string } | null;
  is_bestseller?: boolean;
  product_images?: ProductImage[];
  product_features?: ProductFeature[];
}

interface RelatedProduct {
  id: string;
  title: string;
  price: number;
  cover_image?: string;
  slug: string;
}

const getSlugFromPath = () => {
  const parts = window.location.pathname.split('/').filter(Boolean);
  // Path shape: /product/:slug
  return parts.length >= 2 ? decodeURIComponent(parts[1]) : '';
};

export const ProductDetailPage: React.FC = () => {
  const { addToCart } = useCart();

  const [slug, setSlug] = useState<string>(getSlugFromPath());
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);

  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<string>(s10);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>('DETAILS');
  const [addedMessage, setAddedMessage] = useState<string>('');

  const [related, setRelated] = useState<RelatedProduct[]>([]);
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Re-read the slug whenever client-side navigation changes the URL
  // (App.tsx doesn't remount this component when moving between products).
  useEffect(() => {
    const onLocationChange = () => setSlug(getSlugFromPath());
    window.addEventListener(LOCATION_CHANGE_EVENT, onLocationChange);
    return () => window.removeEventListener(LOCATION_CHANGE_EVENT, onLocationChange);
  }, []);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      setNotFound(true);
      return;
    }

    setLoading(true);
    setNotFound(false);
    setQuantity(1);
    setIsZoomed(false);

    fetch(`${API_URL}/products/${slug}`)
      .then(async (res) => {
        if (!res.ok) throw new Error('not found');
        const data = await res.json();
        setProduct(data);
        setSelectedImage(data.cover_image || s10);
      })
      .catch(() => {
        setProduct(null);
        setNotFound(true);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    fetch(`${API_URL}/products/bestsellers`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setRelated(Array.isArray(data) ? data.filter((p: RelatedProduct) => p.slug !== slug).slice(0, 8) : []))
      .catch(() => setRelated([]));
  }, [slug]);

  const galleryImages = product
    ? [
        product.cover_image,
        ...(product.product_images || []).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)).map((img) => img.image_url),
      ].filter((src, idx, arr): src is string => Boolean(src) && arr.indexOf(src) === idx)
    : [s10];

  const inStock = (product?.stock ?? 0) > 0;

  const handleAddToCart = async () => {
    if (!product || !inStock) return;
    await addToCart(product.id, quantity, {
      name: product.title,
      price: product.price,
      coverImage: product.cover_image,
      category: product.categories?.name,
      slug: product.slug,
    });
    setAddedMessage(`Added ${quantity} to cart`);
    setTimeout(() => setAddedMessage(''), 2200);
  };

  const handleBuyNow = async () => {
    if (!product || !inStock) return;
    await addToCart(product.id, quantity, {
      name: product.title,
      price: product.price,
      coverImage: product.cover_image,
      category: product.categories?.name,
      slug: product.slug,
    });
    window.history.pushState(null, '', '/checkout');
  };

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const accordions = [
    { id: 'DETAILS', title: 'DETAILS', content: product?.description || product?.short_description || 'No additional details available for this product yet.' },
    { id: 'SHIPPING_RETURNS', title: 'SHIPPING & RETURNS', content: 'Ships in 2-3 business days. Free standard shipping on all orders above ₹999. Returns are accepted within 7 days of delivery in original unused condition.' },
  ];

  const nextCarousel = () => setCarouselIndex((prev) => (prev + 1) % Math.max(related.length, 1));
  const prevCarousel = () => setCarouselIndex((prev) => (prev - 1 + Math.max(related.length, 1)) % Math.max(related.length, 1));

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
      if (closestIndex !== activeSlide && closestIndex >= 0 && closestIndex < related.length) {
        setActiveSlide(closestIndex);
      }
    }
  };

  const goToProduct = (targetSlug: string) => {
    window.history.pushState(null, '', `/product/${targetSlug}`);
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-[#F8F6F2]">
        <MarqueeBanner />
        <Navbar />
        <div className="flex-grow flex items-center justify-center py-32 text-[#7D7D7D] font-sans text-sm uppercase tracking-widest">
          Loading product...
        </div>
        <Footer />
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="flex flex-col min-h-screen bg-[#F8F6F2]">
        <MarqueeBanner />
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center py-32 gap-4">
          <h1 className="font-serif text-2xl text-[#2D2D2D]">Product not found</h1>
          <a href="/collection" onClick={(e) => { e.preventDefault(); window.history.pushState(null, '', '/collection'); }} className="text-[#8E76B8] underline text-sm">Back to Collection</a>
        </div>
        <Footer />
      </div>
    );
  }

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
          {product.categories?.name && (
            <>
              <span className="mx-2 text-[#E9E5DF]">/</span>
              <span>{product.categories.name.toUpperCase()}</span>
            </>
          )}
          <span className="mx-2 text-[#E9E5DF]">/</span>
          <span className="text-[#2D2D2D]">{product.title.toUpperCase()}</span>
        </nav>

        {/* Product Grid Panel (Left Gallery, Right Details) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-start">

          {/* LEFT COLUMN: Gallery View (48% on desktop) */}
          <div className="lg:col-span-6 flex flex-col items-center w-full lg:sticky lg:top-10">

            {/* Main Product Image display */}
            <div className="w-full aspect-square rounded-[24px] overflow-hidden relative shadow-[0_12px_36px_rgba(0,0,0,0.03)] border border-[#E9E5DF] bg-white flex items-center justify-center p-4">

              <img
                src={selectedImage}
                alt={product.title}
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
            {galleryImages.length > 1 && (
              <div className="grid grid-cols-5 gap-3 w-full mt-6">
                {galleryImages.map((src, idx) => (
                  <button
                    key={idx}
                    className={`aspect-square rounded-xl overflow-hidden relative border transition-all duration-200 bg-white flex items-center justify-center p-1 cursor-pointer ${
                      selectedImage === src
                        ? 'border-[#8E76B8] shadow-md scale-[1.02]'
                        : 'border-[#E9E5DF] hover:border-[#7D7D7D]/40'
                    }`}
                    onClick={() => {
                      setSelectedImage(src);
                      setIsZoomed(false);
                    }}
                  >
                    <img
                      src={src}
                      alt={`${product.title} ${idx + 1}`}
                      className="max-h-[90%] max-w-[90%] object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.04)]"
                    />
                  </button>
                ))}
              </div>
            )}

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
            {product.is_bestseller && (
              <div className="flex items-center gap-1.5 text-[10px] md:text-[11px] font-sans font-bold tracking-[0.25em] text-[#7D7D7D] uppercase mb-3">
                <span>BEST SELLER</span>
                <span className="text-[9px] text-[#8E76B8]">♥</span>
              </div>
            )}

            {/* Product Title & Subtitle */}
            <h1 className="font-serif text-[38px] md:text-[44px] text-[#2D2D2D] font-light leading-tight tracking-wide">
              {product.title}
            </h1>
            {product.short_description && (
              <p className="text-[14px] md:text-[15px] font-serif text-[#7D7D7D] italic tracking-wide mt-2">
                {product.short_description}
              </p>
            )}

            {/* Price section */}
            <div className="mt-5 flex flex-col gap-1">
              <div className="flex items-baseline gap-3">
                <span className="text-[26px] text-[#2D2D2D] font-semibold tracking-wide">
                  ₹{Number(product.price).toLocaleString('en-IN')}
                </span>
                {product.compare_price && Number(product.compare_price) > Number(product.price) && (
                  <span className="text-[15px] text-[#7D7D7D] line-through">
                    ₹{Number(product.compare_price).toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              <span className="text-[9px] text-[#7D7D7D] tracking-[0.15em] font-sans uppercase">
                INCLUSIVE OF ALL TAXES
              </span>
            </div>

            {/* Stock status */}
            <div className="mt-4">
              {inStock ? (
                product.stock <= 5 ? (
                  <span className="text-[12px] font-sans font-semibold text-[#B45309]">Only {product.stock} left in stock</span>
                ) : (
                  <span className="text-[12px] font-sans font-semibold text-[#2E7D32]">In Stock</span>
                )
              ) : (
                <span className="text-[12px] font-sans font-semibold text-red-600">Out of Stock</span>
              )}
            </div>

            {/* Description brief */}
            {product.description && (
              <p className="text-[13px] md:text-[14px] font-sans font-light text-[#7D7D7D] leading-relaxed mt-6">
                {product.description}
              </p>
            )}

            {/* Feature grid (only rendered if the product has curated features) */}
            {product.product_features && product.product_features.length > 0 && (
              <div className="grid grid-cols-3 gap-y-6 gap-x-4 border-t border-b border-[#E9E5DF] py-6 my-8">
                {product.product_features.map((feature, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-[#E8D8F8]/30 flex items-center justify-center text-[#8E76B8] shrink-0 text-[16px]">
                      {feature.icon || '✦'}
                    </div>
                    <span className="text-[9.5px] font-sans font-bold text-[#2D2D2D] uppercase tracking-widest leading-tight">
                      {feature.title}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mt-8 mb-2">
              <span className="text-[10px] font-sans font-bold tracking-[0.2em] text-[#7D7D7D] uppercase">Quantity</span>
              <div className="flex items-center border border-[#E2DDD5] rounded-[10px] bg-white h-10 px-1">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-7 h-7 flex items-center justify-center text-[#2D2D2D]/60 hover:text-[#2D2D2D] font-medium rounded-full cursor-pointer select-none"
                >
                  −
                </button>
                <span className="w-8 text-center text-[13px] font-semibold text-[#2D2D2D]">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="w-7 h-7 flex items-center justify-center text-[#2D2D2D]/60 hover:text-[#2D2D2D] font-medium rounded-full cursor-pointer select-none"
                >
                  +
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3.5 mb-2 w-full">
              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={!inStock}
                className="w-full bg-[#CBD83B] hover:bg-[#b8c634] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed text-[#2E3327] font-sans font-bold tracking-[0.2em] text-[11px] md:text-[12px] h-[54px] rounded-[12px] shadow-[0_4px_14px_rgba(203,216,59,0.3)] hover:shadow-[0_6px_22px_rgba(203,216,59,0.5)] transition-all duration-300 uppercase cursor-pointer flex items-center justify-center gap-2"
              >
                {inStock ? 'ADD TO CART' : 'OUT OF STOCK'}
              </button>

              {/* Buy Now */}
              <button
                onClick={handleBuyNow}
                disabled={!inStock}
                className="w-full bg-white hover:bg-gray-50 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed text-[#2D2D2D] border border-[#2D2D2D]/30 font-sans font-bold tracking-[0.2em] text-[11px] md:text-[12px] h-[54px] rounded-[12px] transition-all duration-300 uppercase cursor-pointer flex items-center justify-center"
              >
                BUY NOW
              </button>

              {addedMessage && (
                <p className="text-[12px] font-sans font-semibold text-[#2E7D32] text-center animate-fade-in">{addedMessage} ✓</p>
              )}
            </div>

            {/* Accordion list */}
            <div className="flex flex-col border-t border-[#E9E5DF] mt-4">
              {accordions.map((acc) => {
                const isOpen = activeAccordion === acc.id;
                return (
                  <div key={acc.id} className="border-b border-[#E9E5DF]">
                    <button
                      className="w-full py-4 flex items-center justify-between font-sans font-bold text-[10.5px] md:text-[11px] tracking-[0.2em] text-[#2D2D2D] hover:text-[#8E76B8] cursor-pointer text-left uppercase"
                      onClick={() => toggleAccordion(acc.id)}
                    >
                      <span>{acc.title}</span>
                      <span className="text-[13px] text-gray-400 font-light ml-4">{isOpen ? '−' : '+'}</span>
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
        {related.length > 0 && (
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
              {[...related.slice(carouselIndex), ...related.slice(0, carouselIndex)].map((prod) => (
                <div key={prod.id} className="flex flex-col group relative">

                  {/* Related product cover image container */}
                  <div
                    className="w-full aspect-[4/5] rounded-[20px] overflow-hidden relative shadow-[0_4px_16px_rgba(0,0,0,0.03)] border border-gray-200/20 bg-white flex items-center justify-center p-3 select-none transition-all duration-300 group-hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(0,0,0,0.06)] cursor-pointer"
                    onClick={() => goToProduct(prod.slug)}
                  >
                    <img
                      src={prod.cover_image || s10}
                      alt={prod.title}
                      className="max-h-[90%] max-w-[90%] object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.06)] transform group-hover:scale-[1.02] transition-all duration-500 ease-out"
                      loading="lazy"
                    />
                  </div>

                  {/* Content info */}
                  <div className="flex items-start justify-between mt-5 pr-1">
                    <div className="flex flex-col cursor-pointer" onClick={() => goToProduct(prod.slug)}>
                      <h3 className="font-serif text-[16px] md:text-[17px] text-[#2C2B29] font-medium leading-tight group-hover:text-[#8E76B8] transition-colors duration-200">
                        {prod.title}
                      </h3>
                      <span className="text-[14px] text-[#7D7D7D] font-medium mt-1.5">
                        ₹{Number(prod.price).toLocaleString('en-IN')}
                      </span>
                    </div>

                    {/* Add Icon button */}
                    <button
                      className="w-9 h-9 rounded-full bg-white border border-gray-200/60 shadow-[0_2px_6px_rgba(0,0,0,0.04)] flex items-center justify-center text-gray-500 hover:text-papiah-dark hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shrink-0 ml-3"
                      aria-label={`Add ${prod.title} to Cart`}
                      onClick={() => addToCart(prod.id, 1, { name: prod.title, price: prod.price, coverImage: prod.cover_image, slug: prod.slug })}
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
              {related.map((prod) => (
                <div key={prod.id} className="w-[210px] shrink-0 snap-center flex flex-col group relative">

                  {/* Related product cover image container */}
                  <div
                    className="w-full aspect-[4/5] rounded-[16px] overflow-hidden relative shadow-[0_4px_16px_rgba(0,0,0,0.03)] border border-gray-200/20 bg-white flex items-center justify-center p-2.5 select-none transition-all duration-300 cursor-pointer"
                    onClick={() => goToProduct(prod.slug)}
                  >
                    <img
                      src={prod.cover_image || s10}
                      alt={prod.title}
                      className="max-h-[90%] max-w-[90%] object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.06)] transform"
                      loading="lazy"
                    />
                  </div>

                  {/* Content info */}
                  <div className="flex items-start justify-between mt-3.5 pr-1">
                    <div className="flex flex-col cursor-pointer" onClick={() => goToProduct(prod.slug)}>
                      <h3 className="font-serif text-[14px] text-[#2C2B29] font-medium leading-tight">
                        {prod.title}
                      </h3>
                      <span className="text-[13px] text-[#7D7D7D] font-medium mt-1">
                        ₹{Number(prod.price).toLocaleString('en-IN')}
                      </span>
                    </div>

                    {/* Add Icon button */}
                    <button
                      className="w-8 h-8 rounded-full bg-white border border-gray-200/60 shadow-[0_2px_6px_rgba(0,0,0,0.04)] flex items-center justify-center text-gray-500 hover:text-[#8E76B8] active:scale-95 transition-all duration-200 cursor-pointer shrink-0 ml-3"
                      aria-label={`Add ${prod.title} to Cart`}
                      onClick={() => addToCart(prod.id, 1, { name: prod.title, price: prod.price, coverImage: prod.cover_image, slug: prod.slug })}
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
              {related.map((_, idx) => (
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
        )}

      </main>

      {/* 4. BOTTOM FOOTER */}
      <Footer />

    </div>
  );
};

export default ProductDetailPage;
