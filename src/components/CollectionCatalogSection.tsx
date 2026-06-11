import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import Book1 from '../assets/book_1.jpg';
import Book2 from '../assets/book_2.jpg';
import Book3 from '../assets/book_3.jpg';
import Book4 from '../assets/book_4.jpg';
import Book5 from '../assets/book_5.jpg';
import Product2 from '../assets/Product2.jpg';

interface Product {
  id: string | number;
  name: string;
  coverImage: string;
  description: string;
  price: number;
  badge: 'BESTSELLER' | 'NEW' | null;
  category: string;
  tags: string[];
  slug: string;
}

export const CollectionCatalogSection: React.FC = () => {
  // 1. STATE FOR FILTERS AND INTERACTION
  const [selectedCategory, setSelectedCategory] = useState<string>('All Products');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(600);
  const [sortBy, setSortBy] = useState<string>('Featured');
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState<boolean>(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // API states
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const API_URL = "http://localhost:3000/api";
  const fallbackImages = [Book1, Book5, Book3, Product2, Book2, Book4];

  // 2. PRODUCT DATA MATCHING SCREENSHOT & IMAGES (Fallback Mock Data)
  const allProductsMock: Product[] = [
    {
      id: 1,
      name: "The Clarity Journal",
      coverImage: Book1,
      description: "For reflection, peace & inner clarity",
      price: 699,
      badge: "BESTSELLER",
      category: "Mindset & Self Growth",
      tags: ["Self Growth", "Mindful Living"],
      slug: "the-clarity-journal"
    },
    {
      id: 2,
      name: "The Gratitude Journal",
      coverImage: Book5,
      description: "Practice gratitude everyday",
      price: 599,
      badge: "NEW",
      category: "Mindset & Self Growth",
      tags: ["Mindful Living", "Self Growth"],
      slug: "the-gratitude-journal"
    },
    {
      id: 3,
      name: "Intentional Living Workbook",
      coverImage: Book3,
      description: "Small steps to a meaningful life",
      price: 399,
      badge: "BESTSELLER",
      category: "Planning & Productivity",
      tags: ["Productivity", "Self Growth"],
      slug: "intentional-living-workbook"
    },
    {
      id: 4,
      name: "Daily Planner",
      coverImage: Product2,
      description: "Plan your days with intention",
      price: 299,
      badge: null,
      category: "Planning & Productivity",
      tags: ["Productivity"],
      slug: "daily-planner"
    },
    {
      id: 5,
      name: "Focus Planner",
      coverImage: Book2,
      description: "Stay focused. Get things done.",
      price: 499,
      badge: null,
      category: "Planning & Productivity",
      tags: ["Productivity", "Creativity"],
      slug: "focus-planner"
    },
    {
      id: 6,
      name: "Recipe Journal",
      coverImage: Book4,
      description: "Your recipes, stories & memories",
      price: 699,
      badge: null,
      category: "Lifestyle Journal",
      tags: ["Creativity", "Mindful Living"],
      slug: "recipe-journal"
    }
  ];

  const fallbackCategories = [
    { name: "All Products", slug: "all-products" },
    { name: "Mindset & Self Growth", slug: "mindset-self-growth" },
    { name: "Planning & Productivity", slug: "planning-productivity" },
    { name: "Lifestyle Journal", slug: "lifestyle-journal" },
    { name: "Wedding Collection", slug: "wedding-collection" },
    { name: "Motherhood", slug: "motherhood" },
    { name: "Kids Collection", slug: "kids-collection" }
  ];

  const [categoriesList, setCategoriesList] = useState<{ name: string; slug: string }[]>(fallbackCategories);

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_URL}/categories`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            const formatted = [
              { name: "All Products", slug: "all-products" },
              ...data.map((cat: any) => ({
                name: cat.name,
                slug: cat.slug || cat.name.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-')
              }))
            ];
            setCategoriesList(formatted);
          }
        }
      } catch (err) {
        console.error("Failed to fetch categories from backend:", err);
      }
    };
    fetchCategories();
  }, []);

  const searchParam = new URLSearchParams(window.location.search).get('search') || '';

  // Fetch products from backend whenever filters/sorting/categories change
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const activeCategoryObj = categoriesList.find(c => c.name === selectedCategory);
        const categorySlugParam = activeCategoryObj && activeCategoryObj.slug !== 'all-products' ? activeCategoryObj.slug : undefined;

        let sortParam = 'latest';
        if (sortBy === 'Price: Low to High') sortParam = 'priceLowHigh';
        else if (sortBy === 'Price: High to Low') sortParam = 'priceHighLow';
        else if (sortBy === 'Featured') sortParam = 'featured';

        const queryParams = new URLSearchParams();
        if (categorySlugParam) queryParams.append('category', categorySlugParam);
        queryParams.append('maxPrice', maxPrice.toString());
        queryParams.append('sort', sortParam);
        if (searchParam) queryParams.append('search', searchParam);

        const res = await fetch(`${API_URL}/products?${queryParams.toString()}`);
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await res.json();
        if (Array.isArray(data)) {
          const mapped = data.map((bp: any, idx: number) => {
            let badge: 'BESTSELLER' | 'NEW' | null = null;
            if (bp.is_bestseller) badge = 'BESTSELLER';
            else if (bp.is_new) badge = 'NEW';

            const categoryName = bp.categories?.name || bp.category?.name || "All Products";

            const tags: string[] = [];
            if (categoryName.includes("Mindset") || categoryName.includes("Self Growth")) {
              tags.push("Self Growth", "Mindful Living");
            } else if (categoryName.includes("Planning") || categoryName.includes("Productivity")) {
              tags.push("Productivity");
            } else if (categoryName.includes("Lifestyle")) {
              tags.push("Creativity", "Mindful Living");
            } else if (categoryName.includes("Wedding")) {
              tags.push("Creativity");
            } else {
              tags.push("Mindful Living");
            }

            const coverImage = bp.cover_image || bp.coverImage || fallbackImages[idx % fallbackImages.length];

            return {
              id: bp.id,
              name: bp.title || bp.name || "Untitled Product",
              coverImage,
              description: bp.short_description || bp.shortDescription || bp.description || "A premium PAPIAH product.",
              price: Number(bp.price) || 0,
              badge,
              category: categoryName,
              tags,
              slug: bp.slug || bp.title?.toLowerCase().replace(/\s+/g, '-') || "product"
            };
          });
          setProducts(mapped);
        } else {
          throw new Error("Invalid product data structure");
        }
      } catch (err: any) {
        console.error("Error fetching products:", err);
        // fallback to local mock products
        setProducts(allProductsMock);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, maxPrice, sortBy, categoriesList, searchParam]);

  // 3. HANDLERS FOR INTERACTION
  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const navigateToProduct = (slug: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState(null, '', `/product/${slug}`);
  };

  const categories = categoriesList.map(c => c.name);

  const bestForTags = [
    "Mindful Living",
    "Productivity",
    "Creativity",
    "Self Growth"
  ];

  // 4. FILTERING & SORTING LOGIC FOR LOCAL TAGS
  const filteredProducts = products.filter(prod => {
    const matchesCategory = selectedCategory === 'All Products' || prod.category === selectedCategory;
    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => prod.tags.includes(tag));
    const matchesPrice = prod.price <= maxPrice;

    return matchesCategory && matchesTags && matchesPrice;
  });

  return (
    <section className="w-full bg-[#FAF9F6] pt-[20px] pb-[20px] select-none relative z-10 paper-texture">
      <style dangerouslySetInnerHTML={{ __html: `
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
      <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-12">
        
        {/* TOP ROW SECTION HEADER */}
        <div className="flex flex-row items-center justify-between border-b border-papiah-grid/50 pb-4 mb-6 gap-2 w-full">
          <div className="text-[11px] md:text-[12px] font-sans text-gray-500 tracking-wider">
            Showing <span className="font-medium text-papiah-dark">{filteredProducts.length}</span> of <span className="font-medium text-papiah-dark">{products.length}</span> products
            {searchParam && (
              <> for "<span className="font-medium text-[#8E76B8]">{searchParam}</span>" <button onClick={() => window.history.pushState(null, '', '/collection')} className="text-[#8E76B8] hover:text-[#7D62A5] ml-1.5 font-bold cursor-pointer underline">Clear</button></>
            )}
          </div>
          
          <div className="flex items-center gap-2 relative">
            <span className="text-[11px] md:text-[12px] font-sans text-gray-400 tracking-wider">Sort by:</span>
            <button 
              className="text-[11px] md:text-[12px] font-sans font-semibold text-papiah-dark flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
              onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
            >
              {sortBy} <span className="text-[9px] text-gray-400">▼</span>
            </button>

            {isSortDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-40 bg-white border border-[#E8E7E3] rounded-lg shadow-lg py-1 z-35 animate-fade-in">
                {['Featured', 'Price: Low to High', 'Price: High to Low'].map((opt) => (
                  <button
                    key={opt}
                    className={`w-full text-left px-4 py-2.5 text-[11px] font-sans tracking-wide transition-colors hover:bg-[#EAD9FA]/10 ${
                      sortBy === opt ? 'text-[#8E76B8] font-bold bg-[#EAD9FA]/5' : 'text-gray-700'
                    }`}
                    onClick={() => {
                      setSortBy(opt);
                      setIsSortDropdownOpen(false);
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Filter Toggle Button */}
        <button 
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          className="lg:hidden w-full bg-white hover:bg-gray-50 border border-gray-200/80 shadow-2xs h-12 rounded-lg flex items-center justify-start px-4 gap-3 text-[11px] font-sans font-bold tracking-[0.2em] text-[#2C2B29] uppercase mb-6 cursor-pointer"
        >
          <svg className="w-4.5 h-4.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
          FILTER
        </button>

        {/* Mobile Categories Scroll (visible only on mobile) */}
        <div className="lg:hidden w-full mb-6 text-left">
          <h3 className="text-[10px] font-sans font-bold tracking-[0.25em] text-[#A8A6A0] uppercase mb-3.5">CATEGORIES</h3>
          <div className="flex flex-row overflow-x-auto gap-3 scrollbar-none -mx-4 px-4 pb-2">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`whitespace-nowrap px-4 py-2.5 text-[11.5px] font-sans tracking-wide rounded-lg border transition-all duration-200 cursor-pointer ${
                    isActive 
                      ? 'bg-[#FAF2FE] text-[#8E76B8] border-[#8E76B8]/30 font-medium' 
                      : 'bg-white text-gray-650 border-gray-200/80 hover:text-papiah-dark'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* MAIN LAYOUT GRID (LEFT FILTERS, RIGHT PRODUCTS) */}
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-14 xl:gap-16">
          
          {/* LEFT SIDEBAR FILTERS */}
          <aside className={`w-full lg:w-[260px] xl:w-[280px] shrink-0 text-left flex flex-col gap-9 lg:sticky lg:top-10 transition-all duration-300 ${
            isMobileFilterOpen ? 'block mb-8 border-b border-gray-200/50 pb-8' : 'hidden lg:flex'
          }`}>
            
            {/* Sidebar Title (Desktop only) */}
            <div className="hidden lg:flex border-b border-papiah-grid/60 pb-3 items-center gap-2">
              <svg className="w-4.5 h-4.5 text-papiah-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
              <h2 className="text-[12px] font-sans font-bold tracking-[0.22em] text-papiah-dark uppercase">FILTER</h2>
            </div>

            {/* Categories (Desktop only) */}
            <div className="hidden lg:flex flex-col gap-4">
              <h3 className="text-[10px] font-sans font-bold tracking-[0.25em] text-[#A8A6A0] uppercase">CATEGORIES</h3>
              <div className="flex flex-col gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`w-full text-left px-3.5 py-2.5 text-[12px] font-sans tracking-wide rounded-lg transition-all duration-200 cursor-pointer ${
                      selectedCategory === cat 
                        ? 'bg-[#EAD9FA]/40 text-papiah-dark font-medium shadow-xs' 
                        : 'text-gray-600 hover:text-papiah-dark hover:bg-gray-100/40'
                    }`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Best For Tags (Desktop only, as mobile handles inline below grid) */}
            <div className="hidden lg:flex flex-col gap-4">
              <h3 className="text-[10px] font-sans font-bold tracking-[0.25em] text-[#A8A6A0] uppercase">BEST FOR</h3>
              <div className="flex flex-col gap-3">
                {bestForTags.map((tag) => {
                  const isChecked = selectedTags.includes(tag);
                  return (
                    <label 
                      key={tag} 
                      className="flex items-center gap-3 text-[12.5px] font-sans text-gray-600 hover:text-papiah-dark cursor-pointer select-none group"
                    >
                      <input 
                        type="checkbox" 
                        checked={isChecked}
                        onChange={() => handleTagToggle(tag)}
                        className="sr-only"
                      />
                      <span className={`w-[18px] h-[18px] rounded-md border transition-all duration-200 flex items-center justify-center shrink-0 ${
                        isChecked 
                          ? 'border-[#8E76B8] bg-[#EAD9FA]/30 text-[#8E76B8]' 
                          : 'border-gray-300 group-hover:border-gray-400 bg-white'
                      }`}>
                        {isChecked && (
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </span>
                      <span>{tag}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Price Slider (Desktop only, as mobile handles inline below grid) */}
            <div className="hidden lg:flex flex-col gap-4">
              <h3 className="text-[10px] font-sans font-bold tracking-[0.25em] text-[#A8A6A0] uppercase">PRICE</h3>
              <div className="flex flex-col gap-2">
                <input 
                  type="range" 
                  min="200" 
                  max="700" 
                  step="50"
                  value={maxPrice} 
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-[#FAF9F6] rounded-lg appearance-none cursor-pointer accent-[#8E76B8] border border-gray-200"
                  style={{
                    background: `linear-gradient(to right, #EAD9FA 0%, #EAD9FA ${((maxPrice - 200) / 500) * 100}%, #FAF9F6 ${((maxPrice - 200) / 500) * 100}%, #FAF9F6 100%)`
                  }}
                />
                <div className="flex items-center justify-between text-[11px] font-sans text-gray-500 font-medium">
                  <span>₹200</span>
                  <span className="text-papiah-dark">Up to ₹{maxPrice}+</span>
                </div>
              </div>
            </div>

            {/* Gift Recommendation Card */}
            <div className="bg-[#EAD9FA]/20 border border-[#EAD9FA]/40 rounded-2xl p-6 text-center flex flex-col items-center gap-3.5 mt-2">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-xs text-[#8E76B8]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div className="flex flex-col gap-1.5">
                <h4 className="font-serif text-[15px] text-papiah-dark font-medium leading-tight">Not sure what to pick?</h4>
                <p className="text-[11px] text-gray-500 font-sans leading-relaxed">Our tools are made to support you in every season of life.</p>
              </div>
              <button className="w-full bg-white hover:bg-gray-50 text-papiah-dark font-sans font-bold tracking-[0.16em] text-[9.5px] py-3 rounded-lg shadow-xs transition-colors duration-200 uppercase cursor-pointer">
                EXPLORE BEST SELLERS
              </button>
            </div>

          </aside>

          {/* RIGHT PRODUCT GRID */}
          <main className="flex-grow w-full">
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-x-3.5 gap-y-6 md:gap-x-7 md:gap-y-12 w-full">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="flex flex-col animate-pulse">
                    <div className="w-full aspect-[4/5] rounded-[16px] md:rounded-[20px] bg-[#E8E7E3]/40 border border-gray-200/20 shadow-[0_4px_16px_rgba(0,0,0,0.03)]" />
                    <div className="flex flex-col gap-2 mt-4 pr-1">
                      <div className="h-4 bg-[#E8E7E3]/60 rounded-md w-3/4" />
                      <div className="h-3 bg-[#E8E7E3]/40 rounded-md w-1/2" />
                      <div className="h-4 bg-[#E8E7E3]/60 rounded-md w-1/4 mt-1" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="w-full h-80 flex flex-col items-center justify-center text-center p-6 border border-dashed border-gray-300 rounded-2xl bg-white/50">
                <svg className="w-10 h-10 text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h3 className="font-serif text-[18px] text-papiah-dark font-medium mb-1">No products match your filters</h3>
                <p className="text-[12px] text-gray-500 font-sans">Try selecting a different category or adjusting the price filter.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-x-3.5 gap-y-6 md:gap-x-7 md:gap-y-12 w-full">
                
                {filteredProducts.map((prod) => (
                  <div key={prod.id} className="flex flex-col group relative">
                    
                    {/* Image Area */}
                    <div 
                      className="w-full aspect-[4/5] rounded-[16px] md:rounded-[20px] overflow-hidden relative shadow-[0_4px_16px_rgba(0,0,0,0.03)] border border-gray-200/20 bg-[#FAF9F6] flex items-center justify-center p-3 select-none transition-all duration-300 group-hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(0,0,0,0.06)] cursor-pointer"
                      onClick={navigateToProduct(prod.slug)}
                    >
                      <img 
                        src={prod.coverImage} 
                        alt={prod.name} 
                        className="max-h-[90%] max-w-[90%] object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.08)] transform group-hover:scale-[1.02] transition-all duration-500 ease-out"
                        loading="lazy"
                      />

                      {/* Overlapping Badge */}
                      {prod.badge && (
                        <div className="absolute top-3.5 left-3 bg-white/95 backdrop-blur-[1px] border border-gray-100 shadow-[0_2px_6px_rgba(0,0,0,0.03)] px-2 py-1 rounded-[4px] text-[7.5px] font-sans font-bold tracking-[0.15em] text-[#8E76B8] uppercase">
                          {prod.badge}
                        </div>
                      )}
                    </div>

                    {/* Content Area */}
                    <div className="flex items-start justify-between mt-4 pr-1">
                      <div className="flex flex-col text-left">
                        <h3 
                          className="font-playfair text-[14px] md:text-[18px] text-[#2C2B29] font-medium leading-tight group-hover:text-[#8E76B8] transition-colors duration-250 cursor-pointer"
                          onClick={navigateToProduct(prod.slug)}
                        >
                          {prod.name}
                        </h3>
                        <p className="text-[11px] md:text-[12px] text-gray-500 font-sans font-light mt-1 leading-snug">
                          {prod.description}
                        </p>
                        <span className="text-[14px] md:text-[15px] text-[#2C2B29] font-bold mt-1.5 tracking-wide">
                          ₹{prod.price}
                        </span>
                      </div>

                      {/* Quick Add Button */}
                      <button 
                        onClick={() => addToCart(prod.id.toString(), 1, prod)}
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white border border-gray-200/50 shadow-[0_2.5px_8px_rgba(0,0,0,0.04)] flex items-center justify-center text-gray-500 hover:text-papiah-dark hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shrink-0 ml-2"
                        aria-label={`Add ${prod.name} to Cart`}
                      >
                        <svg className="w-4 h-4 md:w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>

                  </div>
                ))}

              </div>
            )}

            {/* Mobile Best For Scroll (visible only on mobile) */}
            {filteredProducts.length > 0 && (
              <div className="lg:hidden w-full mt-10 mb-8 text-left">
                <h3 className="text-[10px] font-sans font-bold tracking-[0.25em] text-[#A8A6A0] uppercase mb-3.5">BEST FOR</h3>
                <div className="flex flex-row overflow-x-auto gap-3 scrollbar-none -mx-4 px-4 pb-2">
                  {bestForTags.map((tag) => {
                    const isChecked = selectedTags.includes(tag);
                    let tagIcon = null;
                    switch (tag) {
                      case "Mindful Living":
                        tagIcon = (
                          <svg className="w-3.5 h-3.5 mr-1.5 text-[#84AAD7]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M12 22V12M12 12c-4 0-6-2-6-6 0 0 2 0 6 4M12 14c4 0 6-2 6-6 0 0-2 0-6 4" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        );
                        break;
                      case "Productivity":
                        tagIcon = (
                          <svg className="w-3.5 h-3.5 mr-1.5 text-[#84AAD7]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M3 3v18h18M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        );
                        break;
                      case "Creativity":
                        tagIcon = (
                          <svg className="w-3.5 h-3.5 mr-1.5 text-[#84AAD7]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" />
                          </svg>
                        );
                        break;
                      case "Self Growth":
                        tagIcon = (
                          <svg className="w-3.5 h-3.5 mr-1.5 text-[#84AAD7]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        );
                        break;
                    }

                    return (
                      <button
                        key={tag}
                        onClick={() => handleTagToggle(tag)}
                        className={`flex items-center whitespace-nowrap px-4 py-2.5 text-[11.5px] font-sans tracking-wide rounded-lg border transition-all duration-200 cursor-pointer ${
                          isChecked 
                            ? 'bg-[#FAF2FE] text-[#8E76B8] border-[#8E76B8]/30 font-medium' 
                            : 'bg-white text-gray-650 border-gray-200/80 hover:text-papiah-dark'
                        }`}
                      >
                        {tagIcon}
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Mobile Price Slider (visible only on mobile) */}
            {filteredProducts.length > 0 && (
              <div className="lg:hidden w-full mb-8 text-left px-1">
                <h3 className="text-[10px] font-sans font-bold tracking-[0.25em] text-[#A8A6A0] uppercase mb-3.5">PRICE</h3>
                <div className="flex flex-col gap-3">
                  <input 
                    type="range" 
                    min="200" 
                    max="700" 
                    step="50"
                    value={maxPrice} 
                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#8E76B8] border border-gray-100"
                    style={{
                      background: `linear-gradient(to right, #EAD9FA 0%, #EAD9FA ${((maxPrice - 200) / 500) * 100}%, #E2E8F0 ${((maxPrice - 200) / 500) * 100}%, #E2E8F0 100%)`
                    }}
                  />
                  <div className="flex items-center justify-between text-[11px] font-sans text-gray-500 font-medium">
                    <span>₹200</span>
                    <span className="text-papiah-dark">Up to ₹{maxPrice}+</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* BOTTOM LOAD MORE ACTION */}
            {filteredProducts.length > 0 && (
              <div className="mt-16 md:mt-20 flex justify-center">
                <button className="bg-[#CBD83B] hover:bg-[#b8c634] active:scale-[0.98] text-[#2E3327] font-sans font-bold tracking-[0.2em] text-[11px] md:text-[12px] h-[52px] px-12 rounded-[12px] shadow-[0_6px_20px_rgba(203,216,59,0.2)] hover:shadow-[0_8px_25px_rgba(203,216,59,0.35)] transition-all duration-300 uppercase cursor-pointer">
                  LOAD MORE PRODUCTS
                </button>
              </div>
            )}

          </main>

        </div>

      </div>
    </section>
  );
};
