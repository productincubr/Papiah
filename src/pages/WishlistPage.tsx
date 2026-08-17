import React, { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { API_URL } from "../config/api";

// Fallback images matching collection catalog
import Book1 from "../assets/book_1.webp";
import Book2 from "../assets/book_2.webp";
import Book3 from "../assets/book_3.webp";
import Book4 from "../assets/book_4.webp";
import Book5 from "../assets/book_5.webp";
import Product2 from "../assets/Product2.webp";

interface WishlistProduct {
  id: string;
  name: string;
  category: string;
  variant: string;
  price: number;
  image: string;
  slug: string;
}

export default function WishlistPage() {
  const { user, token, logout } = useAuth();
  const { addToCart } = useCart();
  const [wishlistItems, setWishlistItems] = useState<WishlistProduct[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const fallbackImages = [Book1, Book5, Book3, Product2, Book2, Book4];

  // Fetch Wishlist Items
  const fetchWishlist = async () => {
    if (!token) {
      // Load guest wishlist from localStorage
      const guestWishlist = localStorage.getItem("papiah_guest_wishlist");
      if (guestWishlist) {
        try {
          setWishlistItems(JSON.parse(guestWishlist));
        } catch (e) {
          setWishlistItems([]);
        }
      } else {
        setWishlistItems([]);
      }
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/wishlist`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        // data returns array of { id, products: { id, title, slug, price, cover_image } }
        if (Array.isArray(data)) {
          const mapped: WishlistProduct[] = data.map((item: any, idx: number) => ({
            id: item.products.id,
            name: item.products.title,
            category: "Premium Journal",
            variant: "Standard • A5",
            price: Number(item.products.price) || 0,
            image: item.products.cover_image || fallbackImages[idx % fallbackImages.length],
            slug: item.products.slug || "product"
          }));
          setWishlistItems(mapped);
        }
      }
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [token]);

  // Remove item from wishlist
  const handleRemoveWishlist = async (productId: string) => {
    if (token) {
      try {
        const res = await fetch(`${API_URL}/wishlist/${productId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (res.ok) {
          setWishlistItems(prev => prev.filter(item => item.id !== productId));
        }
      } catch (err) {
        console.error("Error removing from wishlist backend:", err);
      }
    } else {
      setWishlistItems(prev => {
        const updated = prev.filter(item => item.id !== productId);
        localStorage.setItem("papiah_guest_wishlist", JSON.stringify(updated));
        return updated;
      });
    }
  };

  // Clear all items in wishlist
  const handleClearWishlist = async () => {
    if (wishlistItems.length === 0) return;
    if (!window.confirm("Are you sure you want to clear your wishlist?")) return;
    
    if (token) {
      try {
        // Sequentially remove all items on backend or clear
        for (const item of wishlistItems) {
          await fetch(`${API_URL}/wishlist/${item.id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
          });
        }
        setWishlistItems([]);
      } catch (err) {
        console.error("Error clearing wishlist backend:", err);
      }
    } else {
      setWishlistItems([]);
      localStorage.removeItem("papiah_guest_wishlist");
    }
  };

  // Share wishlist (triggers simple copy link alert)
  const handleShareWishlist = () => {
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert("Wishlist link copied to clipboard! You can share it with family and friends.");
    }).catch(err => {
      console.error("Could not copy text: ", err);
    });
  };

  // Move item to Cart (adds to cart and removes from wishlist)
  const handleMoveToCart = async (item: WishlistProduct) => {
    await addToCart(item.id, 1, {
      name: item.name,
      price: item.price,
      coverImage: item.image,
      category: item.category,
      slug: item.slug
    });
    await handleRemoveWishlist(item.id);
  };

  // Newsletter Submit
  const handleNewsletterSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    try {
      const res = await fetch(`${API_URL}/newsletter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail })
      });
      if (res.ok) {
        setNewsletterSubscribed(true);
        setNewsletterEmail("");
      } else {
        setNewsletterSubscribed(true);
        setNewsletterEmail("");
      }
    } catch (err) {
      console.error(err);
      setNewsletterSubscribed(true);
      setNewsletterEmail("");
    }
  };

  // SPA Sidebar Routing Handler
  const handleSidebarClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    window.history.pushState(null, "", href);
  };

  // Logout Handler
  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to log out?")) {
      await logout();
    }
  };

  // Navigation Sidebar Options
  const accountNavItems = [
    { name: "My Profile", href: "/profile" },
    { name: "Orders", href: "/profile" },
    { name: "Addresses", href: "/profile" },
    { name: "Wishlist", href: "/wishlist" },
    { name: "Payment Methods", href: "/profile" },
    { name: "Rewards", href: "/profile" },
    { name: "Notifications", href: "/profile" },
    { name: "Settings", href: "/profile" },
    { name: "Log Out", href: "/profile" }
  ];

  // User details placeholder for guest
  const userInitials = user ? `${user.firstName?.charAt(0) || ""}${user.lastName?.charAt(0) || ""}`.toUpperCase() : "U";
  const userDisplayName = user ? `${user.firstName || ""} ${user.lastName || ""}` : "Guest User";
  const userDisplayEmail = user ? user.email : "guest@papiah.com";

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#2C2B29] font-sans relative overflow-hidden paper-texture select-none selection:bg-[#EAD9FA]">
      
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="w-full bg-[#2F3A2A] py-2.5 px-4 text-center z-50 relative">
        <span className="text-[10px] md:text-xs font-semibold tracking-[0.2em] text-[#FAF9F6] uppercase">
          FREE SHIPPING ON ORDERS OVER ₹775
        </span>
      </div>

      {/* 2. NAVBAR */}
      <Navbar />

      {/* 3. MAIN CONTENT LAYOUT */}
      <main className="max-w-7xl mx-auto px-4 md:px-10 lg:px-12 py-10 md:py-14 relative z-10 flex-grow">
        
        {/* Breadcrumbs */}
        <nav className="text-[10px] md:text-[11px] font-sans font-bold tracking-[0.25em] text-[#7D7D7D] uppercase mb-6 text-left">
          <a href="/" className="hover:text-papiah-dark transition-colors">Home</a>
          <span className="mx-2 text-[#E9E5DF]">/</span>
          <a href="/profile" className="hover:text-papiah-dark transition-colors">Account</a>
          <span className="mx-2 text-[#E9E5DF]">/</span>
          <span className="text-papiah-dark">Wishlist</span>
        </nav>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#E8E7E3] pb-6 mb-10 gap-4 text-left">
          <div>
            <h1 className="font-playfair text-3xl md:text-4xl text-[#2F3A2A] font-light leading-tight tracking-tight">
              My Wishlist
            </h1>
            <p className="text-xs md:text-sm text-gray-500 font-light mt-1.5 uppercase tracking-widest">
              The pieces you love, saved for later.
            </p>
          </div>

          {/* Share & Clear buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={handleShareWishlist}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E8E7E3] hover:bg-gray-50 rounded-xl text-xs font-bold text-[#2F3A2A] uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
              aria-label="Share Wishlist"
            >
              <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 10.742l-1.996 1.155a3.001 3.001 0 11-1.077-1.455l1.996-1.155a3 3 0 113.882 1.455zM12 21a3 3 0 100-6 3 3 0 000 6z" />
              </svg>
              <span>Share</span>
            </button>
            <button 
              onClick={handleClearWishlist}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E8E7E3] hover:bg-[#9E4C41]/5 rounded-xl text-xs font-bold text-[#9E4C41] uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
              aria-label="Clear Wishlist"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* ==========================================================
              LEFT ACCOUNT SIDEBAR
              ========================================================== */}
          <aside className="lg:col-span-3 bg-white border border-[#E8E7E3] rounded-2xl p-6 shadow-xs text-center shrink-0">
            <div className="flex flex-col items-center mb-6">
              <div className="w-16 h-16 rounded-full bg-[#F3ECFC] flex items-center justify-center border border-[#8E76B8]/10 shadow-xs mb-3">
                <span className="font-playfair text-[#2F3A2A] text-xl font-normal tracking-wide">
                  {userInitials}
                </span>
              </div>
              <h2 className="font-playfair text-md text-[#2F3A2A] font-semibold mb-0.5">
                {userDisplayName}
              </h2>
              <p className="text-[11px] text-gray-500 font-light mb-2">
                {userDisplayEmail}
              </p>
            </div>

            {/* Sidebar Account Navigation */}
            <nav className="flex flex-col gap-1 text-left">
              {accountNavItems.map((item) => {
                const isActive = item.name === "Wishlist";
                const isLogout = item.name === "Log Out";
                return (
                  <button
                    key={item.name}
                    onClick={(e) => {
                      if (isLogout) {
                        handleLogout();
                      } else {
                        handleSidebarClick(e, item.href);
                      }
                    }}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-[#FAF9F6] text-[#2F3A2A] border-l-2 border-[#2F3A2A] pl-2.5 shadow-2xs font-bold"
                        : isLogout
                        ? "text-[#9E4C41] hover:bg-red-50/50"
                        : "text-gray-500 hover:bg-[#FAF9F6] hover:text-[#2F3A2A]"
                    }`}
                  >
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* ==========================================================
              RIGHT CONTENT AREA (WISHLIST PRODUCTS)
              ========================================================== */}
          <section className="lg:col-span-9 w-full">
            
            {loading ? (
              // Loading Skeleton
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex flex-col animate-pulse">
                    <div className="w-full aspect-[4/5] bg-gray-150 border border-gray-100 rounded-2xl" />
                    <div className="flex flex-col gap-2 mt-3 text-left">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-150 rounded w-1/2" />
                      <div className="h-4 bg-gray-200 rounded w-1/4 mt-1" />
                    </div>
                  </div>
                ))}
              </div>
            ) : wishlistItems.length === 0 ? (
              // Empty State Layout
              <div className="bg-white border border-[#E8E7E3] rounded-2xl p-14 shadow-xs text-center flex flex-col justify-center items-center min-h-[360px]">
                <div className="w-14 h-14 rounded-full bg-[#EAD9FA]/25 flex items-center justify-center text-[#8E76B8] mb-4 shadow-3xs">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="font-playfair text-xl text-[#2F3A2A] font-semibold mb-2">
                  Your Wishlist Is Empty
                </h3>
                <p className="text-xs text-gray-500 font-light mb-6 leading-relaxed max-w-sm">
                  Save products you love and revisit them anytime to curate your mindful collection.
                </p>
                <button
                  onClick={() => window.history.pushState(null, "", "/collection")}
                  className="bg-[#CBD83B] hover:bg-[#b8c634] text-[#2E3327] font-sans font-bold tracking-widest text-[10px] py-4.5 px-8 rounded-xl shadow-[0_4px_14px_rgba(203,216,59,0.25)] hover:shadow-[0_6px_22px_rgba(203,216,59,0.4)] transition-colors duration-250 uppercase cursor-pointer"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              // Wishlist Products Grid
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-8 w-full">
                {wishlistItems.map((item) => (
                  <div key={item.id} className="flex flex-col bg-white border border-[#E8E7E3]/60 rounded-2xl p-3 shadow-3xs group relative select-none hover:shadow-2xs transition-all duration-300">
                    
                    {/* Image Container */}
                    <div className="w-full aspect-[4/5] bg-[#FAF9F6] rounded-xl overflow-hidden relative flex items-center justify-center p-2 mb-3">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="max-h-[95%] max-w-[95%] object-contain drop-shadow-md transform group-hover:scale-[1.03] transition-transform duration-500 ease-out" 
                        loading="lazy"
                      />
                      
                      {/* Heart Button Top Right */}
                      <button
                        onClick={() => handleRemoveWishlist(item.id)}
                        className="absolute top-2.5 right-2.5 w-8.5 h-8.5 rounded-full bg-white/95 border border-gray-150/45 shadow-sm flex items-center justify-center text-[#9E4C41] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                        aria-label={`Remove ${item.name} from wishlist`}
                      >
                        <svg className="w-4.5 h-4.5 fill-[#9E4C41]" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>

                    {/* Details */}
                    <div className="flex-grow flex flex-col text-left px-1 pb-1">
                      <h4 className="font-playfair text-[13px] md:text-[14.5px] text-papiah-dark font-semibold leading-tight mb-1 truncate">
                        {item.name}
                      </h4>
                      <p className="text-[9.5px] text-gray-400 font-bold tracking-wider uppercase mb-1">
                        {item.category}
                      </p>
                      <span className="text-[9px] font-semibold text-[#8E76B8] bg-[#F3ECFC] px-2 py-0.5 rounded-full w-max mb-2">
                        {item.variant}
                      </span>
                      <span className="text-[13.5px] font-bold text-papiah-dark mt-auto">
                        ₹{item.price.toLocaleString()}
                      </span>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col gap-1.5 mt-3">
                      <button 
                        onClick={() => handleMoveToCart(item)}
                        className="w-full bg-[#CBD83B] hover:bg-[#b8c634] text-[#2E3327] text-[9.5px] font-bold tracking-widest py-3.5 rounded-xl uppercase transition-colors duration-250 shadow-[0_4px_14px_rgba(203,216,59,0.25)] hover:shadow-[0_6px_22px_rgba(203,216,59,0.4)] cursor-pointer"
                      >
                        Add to Cart
                      </button>
                      <button 
                        onClick={() => handleMoveToCart(item)}
                        className="w-full bg-[#EAD9FA]/20 border border-[#EAD9FA]/40 hover:bg-[#EAD9FA]/35 text-[#8E76B8] text-[9.5px] font-bold tracking-widest py-3.5 rounded-xl uppercase transition-colors duration-250 cursor-pointer"
                      >
                        Move to Bag
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* ==========================================================
            4. WISHLIST BENEFITS SECTION
            ========================================================== */}
        <section className="mt-20 border-t border-[#E8E7E3] pt-14 text-left">
          <h3 className="font-playfair text-xl md:text-2xl text-[#2F3A2A] font-semibold mb-8 text-center sm:text-left">
            Why use your PAPIAH Wishlist?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Benefit 1 */}
            <div className="bg-white border border-[#E8E7E3]/60 rounded-2xl p-5 shadow-3xs flex flex-col items-center sm:items-start text-center sm:text-left gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#F3ECFC] flex items-center justify-center text-[#8E76B8] shadow-3xs">
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-playfair text-sm text-[#2F3A2A] font-semibold mb-1">Save Your Favorites</h4>
                <p className="text-[11px] text-gray-500 font-light leading-relaxed">Keep track of the tools, planners, and journals you love.</p>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white border border-[#E8E7E3]/60 rounded-2xl p-5 shadow-3xs flex flex-col items-center sm:items-start text-center sm:text-left gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#FAF2FE] flex items-center justify-center text-[#8E76B8] shadow-3xs">
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 009 11v-4a4 4 0 118 0v4c0 1.948.368 3.821 1.036 5.546M8 11.667v.003m8-.003v.003m-5-5.333h.01m3 0H14" />
                </svg>
              </div>
              <div>
                <h4 className="font-playfair text-sm text-[#2F3A2A] font-semibold mb-1">Easy Access</h4>
                <p className="text-[11px] text-gray-500 font-light leading-relaxed">Find your saved items anytime on any device with one tap.</p>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white border border-[#E8E7E3]/60 rounded-2xl p-5 shadow-3xs flex flex-col items-center sm:items-start text-center sm:text-left gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#E6ECE0]/70 flex items-center justify-center text-[#2F3A2A] shadow-3xs">
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <div>
                <h4 className="font-playfair text-sm text-[#2F3A2A] font-semibold mb-1">Get Notified</h4>
                <p className="text-[11px] text-gray-500 font-light leading-relaxed">Receive instant updates when products return or price changes.</p>
              </div>
            </div>

            {/* Benefit 4 */}
            <div className="bg-white border border-[#E8E7E3]/60 rounded-2xl p-5 shadow-3xs flex flex-col items-center sm:items-start text-center sm:text-left gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#FAF9F6] flex items-center justify-center text-gray-600 shadow-3xs">
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h4 className="font-playfair text-sm text-[#2F3A2A] font-semibold mb-1">Private & Secure</h4>
                <p className="text-[11px] text-gray-500 font-light leading-relaxed">Your curation is personal, protected and stored securely.</p>
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* ==========================================================
          5. NEWSLETTER SIGNUP STRIP
          ========================================================== */}
      <section className="w-full bg-gradient-to-br from-[#2F3A2A] to-[#1C2419] py-14 px-6 md:px-10 text-center relative selection:bg-white selection:text-[#2F3A2A]">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-4">
          <h2 className="font-playfair text-2xl md:text-3xl font-light text-[#FAF9F6] tracking-tight leading-tight">
            Be the first to know
          </h2>
          <p className="text-xs md:text-sm text-gray-300 font-light leading-relaxed max-w-md">
            Get early access to new collections, exclusive customer offers, and mindful daily inspirations.
          </p>

          {newsletterSubscribed ? (
            <div className="bg-[#FAF9F6]/10 border border-[#FAF9F6]/15 py-3 px-8 rounded-xl text-xs font-semibold text-[#FAF9F6] uppercase tracking-widest mt-4">
              ✓ Thank you for subscribing
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubscribe} className="flex flex-col sm:flex-row gap-3 w-full max-w-md mt-4">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-grow px-5 py-3.5 rounded-xl border border-transparent bg-[#FAF9F6] text-xs font-semibold text-papiah-dark placeholder-gray-450 focus:outline-none focus:ring-1 focus:ring-white/20"
                required
              />
              <button 
                type="submit"
                className="bg-[#CBD83B] hover:bg-[#b8c634] text-[#2E3327] font-sans font-bold tracking-[0.16em] text-[10.5px] py-3.5 px-8 rounded-xl uppercase transition-colors cursor-pointer shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 6. FOOTER */}
      <Footer />

    </div>
  );
}
