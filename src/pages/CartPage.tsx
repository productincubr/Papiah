import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useCart } from "../context/CartContext";

// Recommended items assets
import Book1 from "../assets/book_1.webp";
import Book2 from "../assets/book_2.webp";
import Book3 from "../assets/book_3.webp";
import Book4 from "../assets/book_4.webp";

export default function CartPage() {
  const { cartItems, updateQuantity: apiUpdateQuantity, removeItem: apiRemoveItem, cartSubtotal } = useCart();

  const [coupon, setCoupon] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");

  const handleQuantityDelta = (itemId: string, currentQty: number, delta: number) => {
    const newQty = currentQty + delta;
    if (newQty >= 1) {
      apiUpdateQuantity(itemId, newQty);
    }
  };

  const removeItem = (itemId: string) => {
    apiRemoveItem(itemId);
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (coupon.trim().toUpperCase() === "PAPIAH10") {
      setAppliedDiscount(0.1); // 10% discount
      setCouponMessage("Promo code 'PAPIAH10' applied! (10% off items)");
    } else {
      setAppliedDiscount(0);
      setCouponMessage("Invalid coupon code.");
    }
  };

  // Pricing calculations
  const subtotal = cartSubtotal;
  const tax = subtotal > 0 ? 50 : 0;
  const discountAmount = Math.round(subtotal * appliedDiscount);
  const total = Math.max(0, subtotal - discountAmount + tax);

  const recommendedProducts = [
    { id: "gratitude", name: "Gratitude Journal", price: "₹499.00", rating: 5, reviews: 112, image: Book1 },
    { id: "daily", name: "Daily Journal", price: "₹699.00", rating: 5, reviews: 128, image: Book2 },
    { id: "habit", name: "Habit Tracker", price: "₹399.00", rating: 5, reviews: 96, image: Book3 },
    { id: "stickers", name: "Sticker Sheet", price: "₹199.00", rating: 5, reviews: 75, image: Book4 },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1C1B19] font-sans relative overflow-hidden paper-texture selection:bg-[#EAD9FA] selection:text-[#1C1B19]">
      {/* Top Olive Green Announcement Bar */}
      <div className="w-full bg-[#2F3A2A] py-2.5 px-4 text-center z-50 relative select-none">
        <span className="text-[10px] md:text-xs font-semibold tracking-[0.2em] text-[#FAF9F6] uppercase">
          FREE SHIPPING ON ORDERS OVER ₹775
        </span>
      </div>

      {/* Navbar Component */}
      <Navbar />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 md:px-10 lg:px-12 py-12 md:py-16 relative z-10">
        
        {/* Breadcrumbs & Header */}
        <div className="text-left mb-8 md:mb-12">
          <nav className="text-xs text-gray-400 mb-3 select-none flex items-center gap-1.5">
            <a href="/" className="hover:text-[#2F3A2A] transition-colors">Home</a>
            <span>/</span>
            <span className="text-gray-600 font-medium">Cart</span>
          </nav>
          
          <h1 className="font-playfair text-3xl md:text-4xl text-[#2F3A2A] font-light leading-tight tracking-tight mb-2">
            Shopping Cart ({cartItems.length} Items)
          </h1>
          <p className="text-sm text-gray-500 font-light">
            Your thoughtfully chosen pieces.
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white border border-[#E8E7E3] rounded-[1.5rem] p-16 shadow-[0_8px_30px_rgba(46,58,42,0.02)] text-center min-h-[300px] flex flex-col justify-center items-center">
            <svg className="w-12 h-12 text-[#2F3A2A]/40 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h3 className="font-playfair text-xl text-[#2F3A2A] font-semibold mb-2">Your Cart is Empty</h3>
            <p className="text-xs text-gray-500 font-light mb-6">
              Explore our collection and choose some intentional paper items.
            </p>
            <button
              onClick={() => window.history.pushState(null, "", "/collection")}
              className="bg-[#CBD83B] hover:bg-[#b8c634] text-[#2E3327] font-sans font-bold tracking-[0.15em] text-[11px] py-4.5 px-8 rounded-xl shadow-[0_4px_14px_rgba(203,216,59,0.25)] hover:shadow-[0_6px_22px_rgba(203,216,59,0.4)] transition-all duration-300 uppercase cursor-pointer"
            >
              Shop Collections
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* ==========================================================
                LEFT COLUMN: PRODUCTS IN CART (70%)
                ========================================================== */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              
              {/* Cart Items Container */}
              <div className="bg-white border border-[#E8E7E3] rounded-[1.5rem] shadow-[0_8px_30px_rgba(46,58,42,0.02)] overflow-hidden">
                <div className="flex flex-col">
                  {cartItems.map((item, index) => (
                    <div 
                      key={item.id} 
                      className={`flex flex-col sm:flex-row items-center gap-6 p-6 md:p-8 ${
                        index !== cartItems.length - 1 ? "border-b border-[#E8E7E3]/60" : ""
                      }`}
                    >
                      {/* Product Image */}
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-24 h-32 object-cover rounded-xl border border-gray-100 shrink-0" 
                      />

                      {/* Product Details */}
                      <div className="flex-grow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 w-full">
                        
                        {/* Name & Variants */}
                        <div className="text-left flex-grow max-w-xs">
                          <h3 className="font-playfair text-lg text-[#2F3A2A] font-semibold mb-1">
                            {item.name}
                          </h3>
                          <p className="text-xs text-gray-400 font-light mb-2">
                            {item.category}
                          </p>
                          <span className="text-[10px] font-semibold text-[#8E76B8] bg-[#F3ECFC] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                            {item.variant}
                          </span>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex flex-col items-start gap-1 select-none">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            Quantity
                          </span>
                          <div className="flex items-center border border-[#E8E7E3] rounded-lg bg-[#FAF9F6] overflow-hidden">
                            <button 
                              onClick={() => handleQuantityDelta(item.id, item.quantity, -1)}
                              className="px-3.5 py-2 text-gray-500 hover:text-[#2F3A2A] hover:bg-gray-100 transition-colors font-medium cursor-pointer"
                            >
                              -
                            </button>
                            <span className="px-4 text-xs font-semibold text-[#2F3A2A] min-w-[32px] text-center">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => handleQuantityDelta(item.id, item.quantity, 1)}
                              className="px-3.5 py-2 text-gray-500 hover:text-[#2F3A2A] hover:bg-gray-100 transition-colors font-medium cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Price & Remove */}
                        <div className="flex flex-col items-end gap-1.5 sm:text-right shrink-0">
                          <span className="text-lg font-bold text-[#2F3A2A]">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </span>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-[10px] font-bold text-[#8E76B8] hover:text-[#7D62A5] tracking-widest uppercase transition-colors underline underline-offset-4 cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-start">
                <button 
                  onClick={() => window.history.pushState(null, "", "/collection")}
                  className="bg-transparent hover:bg-[#2F3A2A]/5 border border-[#2F3A2A] active:scale-[0.99] text-[#2F3A2A] font-sans font-bold tracking-[0.2em] text-[10.5px] py-4 px-8 rounded-xl transition-all uppercase cursor-pointer flex items-center gap-2"
                >
                  <svg className="w-4 h-4 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                  <span>Continue Shopping</span>
                </button>
              </div>

            </div>

            {/* ==========================================================
                RIGHT COLUMN: ORDER SUMMARY (30%)
                ========================================================== */}
            <div className="lg:col-span-4 lg:sticky lg:top-8">
              
              <div className="bg-white border border-[#E8E7E3] rounded-[1.5rem] p-6 shadow-[0_8px_30px_rgba(46,58,42,0.02)] flex flex-col gap-6 text-left">
                
                {/* Heading */}
                <h3 className="font-playfair text-[18px] text-[#2F3A2A] font-semibold tracking-tight border-b border-gray-100 pb-4">
                  Order Summary
                </h3>

                {/* Calculations */}
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center text-xs text-gray-500 font-light">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span className="font-medium text-[#2F3A2A]">₹{subtotal.toLocaleString()}</span>
                  </div>
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between items-center text-xs text-green-600 font-light">
                      <span>Discount (10% Off)</span>
                      <span className="font-medium">-₹{discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-xs text-gray-500 font-light">
                    <span>Packaging</span>
                    <span className="font-medium text-[#2F3A2A]">FREE</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-500 font-light">
                    <span>Shipping</span>
                    <span className="font-medium text-[#2F3A2A]">FREE</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-500 font-light border-b border-gray-100 pb-3">
                    <span>Taxes</span>
                    <span className="font-medium text-[#2F3A2A]">₹{tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-sm font-semibold text-[#2F3A2A]">Total</span>
                    <span className="text-xl font-bold text-[#2F3A2A]">₹{total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Coupon Input */}
                <form onSubmit={handleApplyCoupon} className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">
                    Coupon Code
                  </label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Enter coupon code" 
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      className="flex-grow px-4 py-3 border border-[#E8E7E3] rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#2F3A2A]/30 focus:border-[#2F3A2A]/30 bg-[#FAF9F6]"
                    />
                    <button 
                      type="submit"
                      className="border border-[#2F3A2A] hover:bg-[#2F3A2A]/5 text-[#2F3A2A] font-sans font-bold tracking-widest text-[10px] px-5 rounded-xl uppercase transition-all cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {couponMessage && (
                    <span className={`text-[10px] font-semibold ${appliedDiscount > 0 ? "text-green-600" : "text-[#9E4C41]"}`}>
                      {couponMessage}
                    </span>
                  )}
                </form>

                {/* Free Shipping Success Banner */}
                <div className="bg-[#E6ECE0] border border-[#3C4A33]/5 text-[#3C4A33] py-3 px-4 rounded-xl flex items-center gap-2.5">
                  <svg className="w-4.5 h-4.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-[11.5px] font-semibold uppercase tracking-wider">
                    You've unlocked FREE Shipping!
                  </span>
                </div>

                {/* Main CTA */}
                <button 
                  onClick={() => window.history.pushState(null, "", "/checkout")}
                  className="w-full bg-[#CBD83B] hover:bg-[#b8c634] active:scale-[0.99] text-[#2E3327] font-sans font-bold tracking-[0.2em] text-[11.5px] py-4.5 rounded-xl shadow-[0_4px_14px_rgba(203,216,59,0.25)] hover:shadow-[0_6px_22px_rgba(203,216,59,0.4)] transition-all duration-300 uppercase cursor-pointer text-center flex items-center justify-center gap-2"
                >
                  PROCEED TO CHECKOUT
                </button>

                {/* Security Note */}
                <div className="flex items-center justify-center gap-2 text-[10.5px] text-gray-400 font-light select-none">
                  <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="font-semibold text-gray-500 uppercase tracking-wider">Secure Checkout</span>
                  <span>• Payment 100% secure</span>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ==========================================================
            RECOMMENDED PRODUCTS SECTION
            ========================================================== */}
        <section className="mt-20 border-t border-[#E8E7E3] pt-16 select-none">
          <h2 className="font-playfair text-2xl md:text-3xl text-[#2F3A2A] text-center mb-10 tracking-tight font-light">
            You May Also Love
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedProducts.map((product) => (
              <div 
                key={product.id} 
                className="bg-white border border-[#E8E7E3] rounded-2xl p-4 shadow-3xs flex flex-col justify-between group transition-shadow duration-300 hover:shadow-xs relative"
              >
                {/* Wishlist Heart Icon */}
                <button className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center text-gray-400 hover:text-[#9E4C41] shadow-2xs hover:scale-115 transition-all cursor-pointer z-20">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>

                {/* Product Image */}
                <div className="w-full aspect-[3/4] rounded-xl overflow-hidden bg-[#F8F6F1] mb-4 border border-gray-50 shrink-0">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                </div>

                {/* Info */}
                <div className="text-left flex flex-col gap-1.5 mt-auto">
                  <h4 className="font-playfair text-sm font-semibold text-[#2F3A2A] line-clamp-1">
                    {product.name}
                  </h4>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-[#2F3A2A]">{product.price}</span>
                    
                    {/* Star Rating */}
                    <div className="flex items-center gap-1 scale-90 origin-right">
                      <div className="flex text-yellow-400">
                        {[...Array(product.rating)].map((_, i) => (
                          <svg key={i} className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-[9px] font-bold text-gray-400">({product.reviews})</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}
