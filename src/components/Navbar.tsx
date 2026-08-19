import React, { useState } from 'react';
import logo from '../assets/logo.svg';
import { useCart } from '../context/CartContext';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const totalCartItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchVal.trim();
    if (query) {
      window.history.pushState(null, '', `/collection?search=${encodeURIComponent(query)}`);
    } else {
      window.history.pushState(null, '', `/collection`);
    }
  };

  const navLinks = [
    { name: "COLLECTION", href: "/collection" },
    { name: "PRIVACY", href: "/privacy" },
    { name: "CONTACT US", href: "/contact" },
    { name: "ABOUT US", href: "/about" },
    { name: "PROFILE", href: "/profile" },
    { name: "CAREERS", href: "/careers" }
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    // Handle logo/home navigation
    if (href === '/') {
      e.preventDefault();
      window.history.pushState(null, '', href);
      return;
    }

    // Client-side SPA routing for workbooks/workhooks page
    if (href.startsWith('/') && !href.includes('#')) {
      e.preventDefault();
      window.history.pushState(null, '', href);
    } else if (href.startsWith('/#')) {
      // If navigating to a hash section from a subpage
      if (window.location.pathname !== '/') {
        // Let browser do normal page navigation to the home page with the hash
        return;
      } else {
        // Smooth scroll to the target element if already on home page
        e.preventDefault();
        const hash = href.split('#')[1];
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        window.history.pushState(null, '', href);
      }
    }
  };

  return (
    <header className="w-full bg-[#FAF9F6] border-b border-papiah-grid/40 sticky top-0 z-40 select-none">
      <div className="max-w-7xl mx-auto px-4 md:px-10 h-16 md:h-20 flex items-center transition-all duration-300">
        
        {/* Logo on Left - Flex Item (Logo) */}
        <div className="flex items-center shrink-0">
          <a 
            href="/" 
            onClick={(e) => handleLinkClick(e, '/')}
            className="flex items-center cursor-pointer hover:opacity-90 transition-opacity"
          >
            <img src={logo} alt="Papiah Logo" className="h-[2.4rem] md:h-[3.3rem] w-auto object-contain transition-all duration-300" />
          </a>
        </div>
 
        {/* Navigation Links - Center - Flex Item (Grow) */}
        <nav className="hidden lg:flex items-center justify-center flex-grow gap-7 xl:gap-9 px-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-[11px] lg:text-[12px] xl:text-[13px] font-bold tracking-[0.2em] text-gray-600 hover:text-papiah-dark transition-colors duration-200 relative group"
            >
              {link.name}
              <span className="absolute bottom-[-4px] left-0 w-0 h-[1.5px] bg-[#9E4C41] transition-all duration-200 group-hover:w-full"></span>
            </a>
          ))}
        </nav>
 
        {/* Icons - Right - Flex Item */}
        <div className="flex items-center justify-end shrink-0 gap-5 md:gap-6 text-gray-700 ml-auto">
          {/* Search Icon / Input */}
          {isSearchOpen ? (
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 border border-[#E8E7E3] bg-[#FAF9F6] px-3 py-1 md:py-1.5 rounded-full transition-all duration-300 w-40 md:w-56 xl:w-64 animate-fade-in">
              <input 
                type="text" 
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="Search products..." 
                className="bg-transparent border-none outline-none text-[11px] md:text-xs text-papiah-dark placeholder-gray-450 w-full font-sans"
                autoFocus
              />
              <button type="submit" className="text-gray-500 hover:text-papiah-dark shrink-0 cursor-pointer p-0.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 md:w-[0.95rem] md:h-[0.95rem] transition-all duration-300">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                </svg>
              </button>
              <button type="button" onClick={() => setIsSearchOpen(false)} className="text-gray-400 hover:text-papiah-dark text-[10px] font-bold ml-0.5 font-sans shrink-0 cursor-pointer p-0.5">
                ✕
              </button>
            </form>
          ) : (
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="hover:text-papiah-dark hover:scale-105 transition-all duration-150 p-1.5 cursor-pointer" 
              aria-label="Search"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-[1.35rem] md:h-[1.35rem] transition-all duration-300">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
          )}
          {/* Profile Icon */}
          <button 
            onClick={(e) => handleLinkClick(e, '/profile')}
            className="hover:text-papiah-dark hover:scale-105 transition-all duration-150 p-1.5 cursor-pointer" 
            aria-label="Account"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-[1.35rem] md:h-[1.35rem] transition-all duration-300">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
          {/* Cart Icon */}
          <button 
            onClick={(e) => handleLinkClick(e, '/cart')}
            className="hover:text-papiah-dark hover:scale-105 transition-all duration-150 p-1.5 relative cursor-pointer" 
            aria-label="Shopping Cart"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-[1.35rem] md:h-[1.35rem] transition-all duration-300">
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
            {totalCartItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 bg-[#9E4C41] text-[#FAF9F6] rounded-full text-[8.5px] font-sans font-bold flex items-center justify-center px-1 shadow-sm leading-none">
                {totalCartItems}
              </span>
            )}
          </button>
 
          {/* Mobile Menu Toggle Button */}
          <button
            className="lg:hidden p-1.5 hover:text-papiah-dark"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Mobile Menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
              {isMobileMenuOpen ? (
                <path d="M18 6 6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
 
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden w-full bg-papiah-cream/95 backdrop-blur-md border-b border-papiah-grid/60 py-4 px-6 flex flex-col gap-4 animate-fade-in absolute left-0 right-0 z-50">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[12px] font-bold tracking-widest text-gray-700 hover:text-papiah-dark transition-colors"
              onClick={(e) => {
                setIsMobileMenuOpen(false);
                handleLinkClick(e, link.href);
              }}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
