import React, { useState } from 'react';
import Book1 from '../assets/book_1.jpg';

// Define Interface for checkout forms
interface FormFields {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
}

export const CheckoutPage: React.FC = () => {
  // Navigation back helper
  const navigateBack = () => {
    window.history.pushState(null, '', '/product');
  };

  // State fields
  const [form, setForm] = useState<FormFields>({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
  });

  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'wallet'>('upi');
  const [upiProvider, setUpiProvider] = useState<'gpay' | 'phonepe' | 'upiid'>('gpay');
  const [upiId, setUpiId] = useState('');
  
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  const [netbankBranch, setNetbankBranch] = useState('sbi');
  const [walletProvider, setWalletProvider] = useState('paytm');

  const [quantity, setQuantity] = useState(1);
  const [addGiftNote, setAddGiftNote] = useState(false);
  const [giftNoteText, setGiftNoteText] = useState('');

  // Simple validation & order state
  const [errors, setErrors] = useState<Partial<FormFields>>({});
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Financial values
  const productPrice = 978;
  const subtotal = productPrice * quantity;
  const shippingCost = shippingMethod === 'express' ? 120 : 0;
  const packagingCost = 50; // Special packaging & care
  const taxes = 70;
  const total = subtotal + shippingCost + packagingCost + taxes;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormFields]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    const tempErrors: Partial<FormFields> = {};
    if (!form.email) tempErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) tempErrors.email = 'Email is invalid';
    
    if (!form.firstName) tempErrors.firstName = 'First name is required';
    if (!form.lastName) tempErrors.lastName = 'Last name is required';
    if (!form.address) tempErrors.address = 'Address is required';
    if (!form.city) tempErrors.city = 'City is required';
    if (!form.state) tempErrors.state = 'State is required';
    if (!form.zip) tempErrors.zip = 'ZIP code is required';
    if (!form.phone) tempErrors.phone = 'Phone number is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      // Scroll to top of form or highlights error
      const firstError = Object.keys(errors)[0];
      if (firstError) {
        document.getElementsByName(firstError)[0]?.focus();
      }
      return;
    }

    setIsSubmitting(true);
    // Simulate luxury packing sound/animation delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsOrderPlaced(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F8F5F0] text-[#2E3B2E] font-sans selection:bg-[#DCCAF7]/40 relative pb-16">
      
      {/* 1. SECURE HEADER */}
      <header className="border-b border-[#E9E5DF] bg-[#F8F5F0]/90 backdrop-blur-md sticky top-0 z-40 select-none">
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
          {/* Left: Back to Cart */}
          <button 
            onClick={navigateBack}
            className="flex items-center gap-2 text-[11px] font-sans font-bold tracking-[0.25em] text-[#2E3B2E]/60 hover:text-[#2E3B2E] transition-colors uppercase duration-200 cursor-pointer"
          >
            <svg className="w-3.5 h-3.5 transform translate-y-[-0.5px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Cart
          </button>

          {/* Center: Brand logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
            <span className="font-serif font-light text-2xl tracking-[0.2em] text-[#2E3B2E] uppercase">
              Journelle
            </span>
          </div>

          {/* Right: Security Badge */}
          <div className="flex items-center gap-1.5 text-[10.5px] font-sans font-bold tracking-[0.2em] text-[#2E3B2E]/50 uppercase">
            <svg className="w-3.5 h-3.5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Secure Checkout
          </div>
        </div>
      </header>

      {isOrderPlaced ? (
        /* SUCCESS SCREEN */
        <main className="max-w-xl mx-auto px-6 pt-20 text-center animate-fade-in">
          <div className="bg-white rounded-[24px] border border-[#E9E5DF] p-10 shadow-[0_8px_32px_rgba(46,59,46,0.04)] relative overflow-hidden">
            {/* Sparkles SVG background */}
            <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none"></div>
            
            <div className="w-16 h-16 rounded-full bg-[#DCCAF7]/30 flex items-center justify-center text-[#2E3B2E] mx-auto mb-6">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="font-serif text-[32px] font-light text-[#2E3B2E] tracking-wide mb-4">
              Thank you for your order
            </h1>
            
            <p className="font-sans font-light text-[14.5px] text-[#2E3B2E]/75 leading-relaxed mb-6">
              Order <span className="font-medium">#JN-2026-8802</span> has been placed. We are preparing to pack your journal with care and quiet intention. A confirmation email has been sent to <span className="font-medium text-[#2E3B2E]">{form.email}</span>.
            </p>

            <div className="bg-[#F8F5F0] rounded-[16px] border border-[#E9E5DF]/60 p-5 mb-8 text-left text-[13px] font-sans text-[#2E3B2E]/80">
              <h4 className="font-serif font-semibold text-[14px] text-[#2E3B2E] mb-2 uppercase tracking-wide">SHIPPING ADDRESS</h4>
              <p>{form.firstName} {form.lastName}</p>
              <p>{form.address}</p>
              {form.apartment && <p>{form.apartment}</p>}
              <p>{form.city}, {form.state} {form.zip}</p>
              <p className="mt-2 text-[#2E3B2E]/60">Delivery via: {shippingMethod === 'express' ? 'Express Delivery (2-3 days)' : 'Standard Delivery (5-7 days)'}</p>
            </div>

            <button
              onClick={() => {
                window.history.pushState(null, '', '/');
              }}
              className="w-full bg-[#C8D93B] hover:bg-[#B7C932] text-[#2E3B2E] font-sans font-bold tracking-[0.2em] text-[11px] h-[54px] rounded-[12px] uppercase shadow-[0_4px_16px_rgba(200,217,59,0.2)] transition-all duration-300 cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        </main>
      ) : (
        /* CHECKOUT WORKSPACE */
        <main className="max-w-[1400px] mx-auto px-6 py-12 md:py-16">
          <div className="text-left mb-10">
            <h1 className="font-serif text-[32px] md:text-[40px] font-light text-[#2E3B2E] tracking-wide leading-tight">
              Checkout
            </h1>
            <p className="text-[13px] font-sans text-[#2E3B2E]/50 uppercase tracking-[0.2em] mt-2">
              Review details and complete your stationery order
            </p>
          </div>

          <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-start">
            
            {/* LEFT COLUMN: FORM DETAILS (65%) */}
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-10">
              
              {/* Section 1: Contact Information */}
              <div className="bg-white rounded-[20px] border border-[#E9E5DF] p-6 md:p-8 shadow-[0_4px_20px_rgba(46,59,46,0.015)] text-left">
                <h2 className="font-serif text-[20px] md:text-[22px] font-light text-[#2E3B2E] mb-6 flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#DCCAF7]/30 flex items-center justify-center text-[12px] font-sans font-bold text-[#2E3B2E]/70">1</span>
                  Contact Information
                </h2>

                <div className="flex flex-col gap-1.5 w-full">
                  <label htmlFor="email" className="font-sans font-bold text-[10px] tracking-[0.2em] text-[#2E3B2E]/60 uppercase">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleInputChange}
                    placeholder="name@domain.com"
                    className={`w-full bg-[#FDFCFB] border ${errors.email ? 'border-red-400' : 'border-[#E2DDD5]'} focus:border-[#DCCAF7] focus:ring-1 focus:ring-[#DCCAF7] rounded-[12px] px-4 py-3.5 text-[14px] text-[#2E3B2E] placeholder-[#2E3B2E]/30 font-light font-sans transition-all duration-200 outline-none`}
                  />
                  {errors.email && <span className="text-red-500 text-[11px] font-light mt-1">{errors.email}</span>}
                </div>
              </div>

              {/* Section 2: Shipping Address */}
              <div className="bg-white rounded-[20px] border border-[#E9E5DF] p-6 md:p-8 shadow-[0_4px_20px_rgba(46,59,46,0.015)] text-left">
                <h2 className="font-serif text-[20px] md:text-[22px] font-light text-[#2E3B2E] mb-6 flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#DCCAF7]/30 flex items-center justify-center text-[12px] font-sans font-bold text-[#2E3B2E]/70">2</span>
                  Shipping Address
                </h2>

                <div className="flex flex-col gap-6">
                  {/* First & Last Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="firstName" className="font-sans font-bold text-[10px] tracking-[0.2em] text-[#2E3B2E]/60 uppercase">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleInputChange}
                        placeholder="Evelyn"
                        className={`w-full bg-[#FDFCFB] border ${errors.firstName ? 'border-red-400' : 'border-[#E2DDD5]'} focus:border-[#DCCAF7] focus:ring-1 focus:ring-[#DCCAF7] rounded-[12px] px-4 py-3.5 text-[14px] text-[#2E3B2E] placeholder-[#2E3B2E]/30 font-light font-sans transition-all duration-200 outline-none`}
                      />
                      {errors.firstName && <span className="text-red-500 text-[11px] font-light mt-1">{errors.firstName}</span>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="lastName" className="font-sans font-bold text-[10px] tracking-[0.2em] text-[#2E3B2E]/60 uppercase">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleInputChange}
                        placeholder="Woods"
                        className={`w-full bg-[#FDFCFB] border ${errors.lastName ? 'border-red-400' : 'border-[#E2DDD5]'} focus:border-[#DCCAF7] focus:ring-1 focus:ring-[#DCCAF7] rounded-[12px] px-4 py-3.5 text-[14px] text-[#2E3B2E] placeholder-[#2E3B2E]/30 font-light font-sans transition-all duration-200 outline-none`}
                      />
                      {errors.lastName && <span className="text-red-500 text-[11px] font-light mt-1">{errors.lastName}</span>}
                    </div>
                  </div>

                  {/* Street Address */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="address" className="font-sans font-bold text-[10px] tracking-[0.2em] text-[#2E3B2E]/60 uppercase">
                      Street Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={form.address}
                      onChange={handleInputChange}
                      placeholder="12 Baker Road"
                      className={`w-full bg-[#FDFCFB] border ${errors.address ? 'border-red-400' : 'border-[#E2DDD5]'} focus:border-[#DCCAF7] focus:ring-1 focus:ring-[#DCCAF7] rounded-[12px] px-4 py-3.5 text-[14px] text-[#2E3B2E] placeholder-[#2E3B2E]/30 font-light font-sans transition-all duration-200 outline-none`}
                    />
                    {errors.address && <span className="text-red-500 text-[11px] font-light mt-1">{errors.address}</span>}
                  </div>

                  {/* Apartment / Suite */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="apartment" className="font-sans font-bold text-[10px] tracking-[0.2em] text-[#2E3B2E]/60 uppercase">
                      Apartment, Suite, Unit, etc. <span className="text-[#2E3B2E]/40 font-normal italic">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      id="apartment"
                      name="apartment"
                      value={form.apartment}
                      onChange={handleInputChange}
                      placeholder="Apartment 4B"
                      className="w-full bg-[#FDFCFB] border border-[#E2DDD5] focus:border-[#DCCAF7] focus:ring-1 focus:ring-[#DCCAF7] rounded-[12px] px-4 py-3.5 text-[14px] text-[#2E3B2E] placeholder-[#2E3B2E]/30 font-light font-sans transition-all duration-200 outline-none"
                    />
                  </div>

                  {/* City, State, ZIP */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="city" className="font-sans font-bold text-[10px] tracking-[0.2em] text-[#2E3B2E]/60 uppercase">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={form.city}
                        onChange={handleInputChange}
                        placeholder="Mumbai"
                        className={`w-full bg-[#FDFCFB] border ${errors.city ? 'border-red-400' : 'border-[#E2DDD5]'} focus:border-[#DCCAF7] focus:ring-1 focus:ring-[#DCCAF7] rounded-[12px] px-4 py-3.5 text-[14px] text-[#2E3B2E] placeholder-[#2E3B2E]/30 font-light font-sans transition-all duration-200 outline-none`}
                      />
                      {errors.city && <span className="text-red-500 text-[11px] font-light mt-1">{errors.city}</span>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="state" className="font-sans font-bold text-[10px] tracking-[0.2em] text-[#2E3B2E]/60 uppercase">
                        State
                      </label>
                      <select
                        id="state"
                        name="state"
                        value={form.state}
                        onChange={handleInputChange}
                        className={`w-full bg-[#FDFCFB] border ${errors.state ? 'border-red-400' : 'border-[#E2DDD5]'} focus:border-[#DCCAF7] focus:ring-1 focus:ring-[#DCCAF7] rounded-[12px] px-4 py-3.5 text-[14.5px] text-[#2E3B2E] font-light font-sans transition-all duration-200 outline-none appearance-none`}
                      >
                        <option value="">Select State</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="West Bengal">West Bengal</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Goa">Goa</option>
                      </select>
                      {errors.state && <span className="text-red-500 text-[11px] font-light mt-1">{errors.state}</span>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="zip" className="font-sans font-bold text-[10px] tracking-[0.2em] text-[#2E3B2E]/60 uppercase">
                        ZIP / Postal Code
                      </label>
                      <input
                        type="text"
                        id="zip"
                        name="zip"
                        value={form.zip}
                        onChange={handleInputChange}
                        placeholder="400001"
                        className={`w-full bg-[#FDFCFB] border ${errors.zip ? 'border-red-400' : 'border-[#E2DDD5]'} focus:border-[#DCCAF7] focus:ring-1 focus:ring-[#DCCAF7] rounded-[12px] px-4 py-3.5 text-[14px] text-[#2E3B2E] placeholder-[#2E3B2E]/30 font-light font-sans transition-all duration-200 outline-none`}
                      />
                      {errors.zip && <span className="text-red-500 text-[11px] font-light mt-1">{errors.zip}</span>}
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="font-sans font-bold text-[10px] tracking-[0.2em] text-[#2E3B2E]/60 uppercase">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      className={`w-full bg-[#FDFCFB] border ${errors.phone ? 'border-red-400' : 'border-[#E2DDD5]'} focus:border-[#DCCAF7] focus:ring-1 focus:ring-[#DCCAF7] rounded-[12px] px-4 py-3.5 text-[14px] text-[#2E3B2E] placeholder-[#2E3B2E]/30 font-light font-sans transition-all duration-200 outline-none`}
                    />
                    {errors.phone && <span className="text-red-500 text-[11px] font-light mt-1">{errors.phone}</span>}
                  </div>
                </div>
              </div>

              {/* Section 3: Shipping Method */}
              <div className="bg-white rounded-[20px] border border-[#E9E5DF] p-6 md:p-8 shadow-[0_4px_20px_rgba(46,59,46,0.015)] text-left">
                <h2 className="font-serif text-[20px] md:text-[22px] font-light text-[#2E3B2E] mb-6 flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#DCCAF7]/30 flex items-center justify-center text-[12px] font-sans font-bold text-[#2E3B2E]/70">3</span>
                  Shipping Method
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Standard Shipping */}
                  <div 
                    onClick={() => setShippingMethod('standard')}
                    className={`flex items-start justify-between p-4 border rounded-[12px] cursor-pointer transition-all duration-200 select-none ${
                      shippingMethod === 'standard' 
                        ? 'border-[#DCCAF7] bg-[#DCCAF7]/5 shadow-sm' 
                        : 'border-[#E2DDD5] bg-white hover:border-[#2E3B2E]/20'
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className="mt-1 flex items-center justify-center w-4 h-4 rounded-full border border-[#2E3B2E]/40 p-0.5">
                        {shippingMethod === 'standard' && <div className="w-2.5 h-2.5 rounded-full bg-[#2E3B2E]" />}
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="font-sans font-semibold text-[13px] text-[#2E3B2E]">Standard Delivery</span>
                        <span className="font-sans text-[11.5px] text-[#2E3B2E]/60 mt-0.5">Delivered in 5-7 business days</span>
                      </div>
                    </div>
                    <span className="font-sans font-semibold text-[12px] text-[#2E3B2E] uppercase">Free</span>
                  </div>

                  {/* Express Shipping */}
                  <div 
                    onClick={() => setShippingMethod('express')}
                    className={`flex items-start justify-between p-4 border rounded-[12px] cursor-pointer transition-all duration-200 select-none ${
                      shippingMethod === 'express' 
                        ? 'border-[#DCCAF7] bg-[#DCCAF7]/5 shadow-sm' 
                        : 'border-[#E2DDD5] bg-white hover:border-[#2E3B2E]/20'
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className="mt-1 flex items-center justify-center w-4 h-4 rounded-full border border-[#2E3B2E]/40 p-0.5">
                        {shippingMethod === 'express' && <div className="w-2.5 h-2.5 rounded-full bg-[#2E3B2E]" />}
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="font-sans font-semibold text-[13px] text-[#2E3B2E]">Express Delivery</span>
                        <span className="font-sans text-[11.5px] text-[#2E3B2E]/60 mt-0.5">Delivered in 2-3 business days</span>
                      </div>
                    </div>
                    <span className="font-sans font-semibold text-[12px] text-[#2E3B2E]">₹120</span>
                  </div>
                </div>
              </div>

              {/* Section 4: Payment Method */}
              <div className="bg-white rounded-[20px] border border-[#E9E5DF] p-6 md:p-8 shadow-[0_4px_20px_rgba(46,59,46,0.015)] text-left">
                <h2 className="font-serif text-[20px] md:text-[22px] font-light text-[#2E3B2E] mb-6 flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#DCCAF7]/30 flex items-center justify-center text-[12px] font-sans font-bold text-[#2E3B2E]/70">4</span>
                  Payment Method
                </h2>

                <div className="flex flex-col gap-6">
                  {/* Payment Tabs */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-b border-[#E9E5DF] pb-4">
                    {([
                      { id: 'upi', label: 'UPI' },
                      { id: 'card', label: 'Card' },
                      { id: 'netbanking', label: 'Net Banking' },
                      { id: 'wallet', label: 'Wallets' }
                    ] as const).map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setPaymentMethod(tab.id)}
                        className={`py-2 text-center text-[12px] font-sans font-bold tracking-wider uppercase border-b-2 transition-all duration-200 cursor-pointer ${
                          paymentMethod === tab.id 
                            ? 'border-[#2E3B2E] text-[#2E3B2E]' 
                            : 'border-transparent text-[#2E3B2E]/40 hover:text-[#2E3B2E]/75'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Payment Tab Content Area */}
                  <div className="py-2">
                    {paymentMethod === 'upi' && (
                      <div className="flex flex-col gap-5 animate-fade-in">
                        <span className="text-[12px] font-sans text-[#2E3B2E]/60">Choose your preferred UPI method:</span>
                        
                        <div className="grid grid-cols-3 gap-3">
                          {([
                            { id: 'gpay', name: 'Google Pay' },
                            { id: 'phonepe', name: 'PhonePe' },
                            { id: 'upiid', name: 'Other UPI ID' }
                          ] as const).map((prov) => (
                            <div
                              key={prov.id}
                              onClick={() => setUpiProvider(prov.id)}
                              className={`p-3 border rounded-[10px] text-center text-[12px] font-semibold cursor-pointer select-none transition-all duration-150 ${
                                upiProvider === prov.id
                                  ? 'border-[#DCCAF7] bg-[#DCCAF7]/5 text-[#2E3B2E]'
                                  : 'border-[#E2DDD5] bg-[#FDFCFB] hover:border-[#2E3B2E]/20 text-[#2E3B2E]/70'
                              }`}
                            >
                              {prov.name}
                            </div>
                          ))}
                        </div>

                        {upiProvider === 'upiid' ? (
                          <div className="flex flex-col gap-1.5 mt-2 animate-fade-in">
                            <label htmlFor="upiId" className="font-sans font-bold text-[9px] tracking-[0.2em] text-[#2E3B2E]/60 uppercase">
                              Enter UPI ID / VPA
                            </label>
                            <input
                              type="text"
                              id="upiId"
                              value={upiId}
                              onChange={(e) => setUpiId(e.target.value)}
                              placeholder="evelyn@okaxis"
                              className="w-full sm:max-w-xs bg-[#FDFCFB] border border-[#E2DDD5] focus:border-[#DCCAF7] focus:ring-1 focus:ring-[#DCCAF7] rounded-[10px] px-3.5 py-2.5 text-[13.5px] text-[#2E3B2E] placeholder-[#2E3B2E]/30 font-light font-sans outline-none"
                            />
                          </div>
                        ) : (
                          <p className="text-[11.5px] italic text-[#2E3B2E]/50 mt-1">
                            You will receive a payment request on your {upiProvider === 'gpay' ? 'Google Pay' : 'PhonePe'} app.
                          </p>
                        )}
                      </div>
                    )}

                    {paymentMethod === 'card' && (
                      <div className="flex flex-col gap-4 animate-fade-in">
                        {/* Card Number */}
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="cardNumber" className="font-sans font-bold text-[9px] tracking-[0.2em] text-[#2E3B2E]/60 uppercase">
                            Card Number
                          </label>
                          <input
                            type="text"
                            id="cardNumber"
                            name="number"
                            value={cardDetails.number}
                            onChange={handleCardChange}
                            maxLength={19}
                            placeholder="4111 2222 3333 4444"
                            className="w-full bg-[#FDFCFB] border border-[#E2DDD5] focus:border-[#DCCAF7] focus:ring-1 focus:ring-[#DCCAF7] rounded-[10px] px-3.5 py-2.5 text-[13.5px] text-[#2E3B2E] placeholder-[#2E3B2E]/30 font-light font-sans outline-none"
                          />
                        </div>

                        {/* Expiry & CVV */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label htmlFor="cardExpiry" className="font-sans font-bold text-[9px] tracking-[0.2em] text-[#2E3B2E]/60 uppercase">
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              id="cardExpiry"
                              name="expiry"
                              value={cardDetails.expiry}
                              onChange={handleCardChange}
                              maxLength={5}
                              placeholder="MM/YY"
                              className="w-full bg-[#FDFCFB] border border-[#E2DDD5] focus:border-[#DCCAF7] focus:ring-1 focus:ring-[#DCCAF7] rounded-[10px] px-3.5 py-2.5 text-[13.5px] text-[#2E3B2E] placeholder-[#2E3B2E]/30 font-light font-sans outline-none"
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label htmlFor="cardCvv" className="font-sans font-bold text-[9px] tracking-[0.2em] text-[#2E3B2E]/60 uppercase">
                              CVV / CVC
                            </label>
                            <input
                              type="password"
                              id="cardCvv"
                              name="cvv"
                              value={cardDetails.cvv}
                              onChange={handleCardChange}
                              maxLength={4}
                              placeholder="•••"
                              className="w-full bg-[#FDFCFB] border border-[#E2DDD5] focus:border-[#DCCAF7] focus:ring-1 focus:ring-[#DCCAF7] rounded-[10px] px-3.5 py-2.5 text-[13.5px] text-[#2E3B2E] placeholder-[#2E3B2E]/30 font-light font-sans outline-none"
                            />
                          </div>
                        </div>

                        {/* Cardholder Name */}
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="cardName" className="font-sans font-bold text-[9px] tracking-[0.2em] text-[#2E3B2E]/60 uppercase">
                            Name on Card
                          </label>
                          <input
                            type="text"
                            id="cardName"
                            name="name"
                            value={cardDetails.name}
                            onChange={handleCardChange}
                            placeholder="Evelyn Woods"
                            className="w-full bg-[#FDFCFB] border border-[#E2DDD5] focus:border-[#DCCAF7] focus:ring-1 focus:ring-[#DCCAF7] rounded-[10px] px-3.5 py-2.5 text-[13.5px] text-[#2E3B2E] placeholder-[#2E3B2E]/30 font-light font-sans outline-none"
                          />
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'netbanking' && (
                      <div className="flex flex-col gap-3.5 animate-fade-in">
                        <label htmlFor="netbankBranch" className="font-sans font-bold text-[9px] tracking-[0.2em] text-[#2E3B2E]/60 uppercase">
                          Select Bank
                        </label>
                        <select
                          id="netbankBranch"
                          value={netbankBranch}
                          onChange={(e) => setNetbankBranch(e.target.value)}
                          className="w-full sm:max-w-xs bg-[#FDFCFB] border border-[#E2DDD5] focus:border-[#DCCAF7] focus:ring-1 focus:ring-[#DCCAF7] rounded-[10px] px-3.5 py-2.5 text-[13.5px] text-[#2E3B2E] font-light font-sans outline-none appearance-none"
                        >
                          <option value="sbi">State Bank of India</option>
                          <option value="hdfc">HDFC Bank</option>
                          <option value="icici">ICICI Bank</option>
                          <option value="axis">Axis Bank</option>
                          <option value="kotak">Kotak Mahindra Bank</option>
                        </select>
                      </div>
                    )}

                    {paymentMethod === 'wallet' && (
                      <div className="flex flex-col gap-3.5 animate-fade-in">
                        <label htmlFor="walletProvider" className="font-sans font-bold text-[9px] tracking-[0.2em] text-[#2E3B2E]/60 uppercase">
                          Select Wallet
                        </label>
                        <select
                          id="walletProvider"
                          value={walletProvider}
                          onChange={(e) => setWalletProvider(e.target.value)}
                          className="w-full sm:max-w-xs bg-[#FDFCFB] border border-[#E2DDD5] focus:border-[#DCCAF7] focus:ring-1 focus:ring-[#DCCAF7] rounded-[10px] px-3.5 py-2.5 text-[13.5px] text-[#2E3B2E] font-light font-sans outline-none appearance-none"
                        >
                          <option value="paytm">Paytm</option>
                          <option value="phonepe">PhonePe Wallet</option>
                          <option value="amazon">Amazon Pay</option>
                          <option value="mobikwik">MobiKwik</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Large CTA Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#C8D93B] hover:bg-[#B7C932] disabled:bg-[#C8D93B]/60 text-[#2E3B2E] font-sans font-bold tracking-[0.25em] text-[12px] h-[58px] rounded-[14px] uppercase shadow-[0_4px_16px_rgba(200,217,59,0.25)] hover:shadow-[0_6px_22px_rgba(200,217,59,0.4)] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2.5"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-[#2E3B2E]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Processing...</span>
                  </div>
                ) : (
                  <span>Place Order • ₹{total.toLocaleString('en-IN')}</span>
                )}
              </button>
            </div>

            {/* RIGHT COLUMN: ORDER SUMMARY & GIFTS (35%) */}
            <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6 lg:sticky lg:top-24">
              
              {/* Order Summary Card */}
              <div className="bg-white rounded-[20px] border border-[#E9E5DF] p-6 shadow-[0_4px_20px_rgba(46,59,46,0.015)] text-left">
                <h3 className="font-serif text-[17px] font-medium text-[#2E3B2E] mb-6 uppercase tracking-wider">
                  Order Summary
                </h3>

                {/* Product Detail row */}
                <div className="flex items-center gap-4 mb-6">
                  {/* Thumbnail */}
                  <div className="w-16 h-20 bg-[#FAF9F6] rounded-[10px] border border-[#E9E5DF] flex items-center justify-center p-1.5 shrink-0 select-none">
                    <img 
                      src={Book1} 
                      alt="The Mindful Days Journal Cover" 
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* Title & Qty select */}
                  <div className="flex-1 flex flex-col min-w-0">
                    <span className="font-serif text-[14.5px] text-[#2E3B2E] leading-tight truncate">
                      The Mindful Days Journal
                    </span>
                    <span className="text-[11.5px] text-[#2E3B2E]/50 font-sans mt-0.5">Classic Linen Cover</span>
                    
                    {/* Quantity selectors */}
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[11px] font-sans font-bold text-[#2E3B2E]/40 uppercase tracking-wider">Qty:</span>
                      <div className="flex items-center border border-[#E2DDD5] rounded-[8px] bg-[#FAF9F6] h-7 px-1">
                        <button 
                          type="button"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-5 h-5 flex items-center justify-center text-[#2E3B2E]/60 hover:text-[#2E3B2E] font-medium rounded-full cursor-pointer select-none"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-[12px] font-semibold text-[#2E3B2E]">{quantity}</span>
                        <button 
                          type="button"
                          onClick={() => setQuantity(quantity + 1)}
                          className="w-5 h-5 flex items-center justify-center text-[#2E3B2E]/60 hover:text-[#2E3B2E] font-medium rounded-full cursor-pointer select-none"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <span className="font-sans font-semibold text-[13.5px] text-[#2E3B2E] shrink-0">
                    ₹{(productPrice * quantity).toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="h-[1px] bg-[#E9E5DF] my-5"></div>

                {/* Subtotal, Shipping, Packaging rows */}
                <div className="flex flex-col gap-3 text-[13px] font-sans text-[#2E3B2E]/80">
                  <div className="flex justify-between items-center">
                    <span className="font-light">Subtotal</span>
                    <span className="font-medium text-[#2E3B2E]">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-light">Shipping</span>
                    <span className="font-medium text-[#2E3B2E]">
                      {shippingCost === 0 ? 'Free' : `₹${shippingCost}`}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="font-light flex items-center gap-1">
                      Intentional Packaging
                      <span className="group relative cursor-help">
                        <span className="text-[10px] w-3.5 h-3.5 rounded-full border border-[#2E3B2E]/30 text-[#2E3B2E]/60 flex items-center justify-center font-bold">i</span>
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1.5 hidden group-hover:block w-48 p-2 bg-[#2E3B2E] text-white text-[10.5px] rounded-lg shadow-md font-sans font-light leading-normal z-50 text-center">
                          Packed with linen wrapping & standard lavender ties.
                        </span>
                      </span>
                    </span>
                    <span className="font-medium text-[#2E3B2E]">₹{packagingCost}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="font-light">Estimated GST / Taxes</span>
                    <span className="font-medium text-[#2E3B2E]">₹{taxes}</span>
                  </div>
                </div>

                <div className="h-[1px] bg-[#E9E5DF] my-5"></div>

                {/* Total row */}
                <div className="flex justify-between items-baseline mb-2">
                  <span className="font-serif text-[17px] font-medium text-[#2E3B2E] uppercase tracking-wide">Total</span>
                  <div className="flex flex-col items-end">
                    <span className="font-serif text-[22px] font-medium text-[#2E3B2E]">
                      ₹{total.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10.5px] text-[#2E3B2E]/40 font-light mt-0.5">Includes GST</span>
                  </div>
                </div>
              </div>

              {/* Gift Note Card */}
              <div className="bg-white rounded-[16px] border border-[#E9E5DF] p-5 shadow-[0_4px_20px_rgba(46,59,46,0.015)] text-left transition-all duration-300">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={addGiftNote}
                    onChange={(e) => setAddGiftNote(e.target.checked)}
                    className="w-4.5 h-4.5 rounded-[4px] border-[#E2DDD5] text-[#8E76B8] focus:ring-[#DCCAF7]/60 cursor-pointer"
                  />
                  <div className="flex items-center gap-2 text-[12.5px] font-semibold text-[#2E3B2E]">
                    <span>🎁</span>
                    <span>Add a handwritten gift note</span>
                  </div>
                </label>

                {addGiftNote && (
                  <div className="mt-4 pt-3 border-t border-[#E9E5DF]/50 flex flex-col gap-2.5 animate-fade-in">
                    <label htmlFor="giftNoteText" className="font-sans font-bold text-[9px] tracking-[0.2em] text-[#2E3B2E]/50 uppercase">
                      Your Message (max 180 chars)
                    </label>
                    <textarea
                      id="giftNoteText"
                      rows={3}
                      maxLength={180}
                      value={giftNoteText}
                      onChange={(e) => setGiftNoteText(e.target.value)}
                      placeholder="Write your beautiful thoughts here..."
                      className="w-full bg-[#FAF9F6] border border-[#E2DDD5] focus:border-[#DCCAF7] focus:ring-1 focus:ring-[#DCCAF7] rounded-[10px] p-3 text-[15px] font-handwriting text-[#2E3B2E] placeholder-[#2E3B2E]/30 outline-none resize-none leading-relaxed transition-all duration-200"
                    />
                  </div>
                )}
              </div>

              {/* Brand Message Card */}
              <div className="bg-[#DCCAF7]/10 rounded-[16px] border border-[#DCCAF7]/30 p-6 shadow-[0_4px_20px_rgba(46,59,46,0.01)] text-center relative overflow-hidden select-none">
                {/* Wavy accent line decoration */}
                <div className="absolute top-0 inset-x-0 h-1 bg-[#DCCAF7]/20"></div>
                
                <h4 className="font-serif italic text-[#2E3B2E] text-[15px] mb-3">
                  Little notes from us ♡
                </h4>
                <p className="font-sans font-light text-[12.5px] leading-relaxed text-[#2E3B2E]/75">
                  Every journal order is packed with care and quiet intention. Thank you for supporting thoughtful living.
                </p>
              </div>

            </div>
          </form>
        </main>
      )}

      {/* 2. FOOTER TRUST BAR */}
      <footer className="max-w-[1200px] mx-auto px-6 mt-16 md:mt-24 select-none">
        <div className="border-t border-[#E9E5DF] pt-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { badge: '🚚', title: 'Free Shipping', desc: 'On all orders above ₹1,500' },
              { badge: '📦', title: 'Thoughtfully Packed', desc: 'Eco-friendly wrap with intent' },
              { badge: '✨', title: 'Stationery Quality', desc: '100 GSM fountain-pen friendly' },
              { badge: '↩', title: 'Easy 7-Day Returns', desc: '100% money back guarantee' }
            ].map((trust, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <span className="text-2xl mb-2.5">{trust.badge}</span>
                <span className="font-serif text-[14.5px] font-medium text-[#2E3B2E]">{trust.title}</span>
                <span className="text-[11.5px] font-sans text-[#2E3B2E]/60 mt-1 leading-normal max-w-[180px]">
                  {trust.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
};

export default CheckoutPage;
