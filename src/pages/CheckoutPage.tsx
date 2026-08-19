import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { API_URL } from '../config/api';

interface Address {
  id: string;
  label: string;
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  postal_code: string;
  is_default: boolean;
}

interface NewAddressForm {
  label: string;
  full_name: string;
  phone: string;
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  postal_code: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const loadRazorpayScript = (): Promise<boolean> =>
  new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

const emptyAddressForm: NewAddressForm = {
  label: 'Home',
  full_name: '',
  phone: '',
  address_line1: '',
  address_line2: '',
  city: '',
  state: '',
  postal_code: '',
};

export const CheckoutPage: React.FC = () => {
  const { user, token } = useAuth();
  const { cartItems, cartSubtotal, loading: cartLoading } = useCart();

  const navigateBack = () => {
    window.history.pushState(null, '', '/cart');
  };

  // Address state
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loadingAddresses, setLoadingAddresses] = useState(true);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressForm, setAddressForm] = useState<NewAddressForm>(emptyAddressForm);
  const [savingAddress, setSavingAddress] = useState(false);
  const [addressError, setAddressError] = useState('');

  // Shipping / coupon / payment
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [couponCode, setCouponCode] = useState('');
  const [couponApplying, setCouponApplying] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountAmount: number } | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'cod'>('razorpay');

  // Order placement
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderError, setOrderError] = useState('');
  const [placedOrder, setPlacedOrder] = useState<any | null>(null);
  const [paymentPending, setPaymentPending] = useState(false);

  useEffect(() => {
    if (!token) {
      setLoadingAddresses(false);
      return;
    }
    fetch(`${API_URL}/addresses`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => (res.ok ? res.json() : []))
      .then((data: Address[]) => {
        setAddresses(data);
        const def = data.find((a) => a.is_default) || data[0];
        if (def) setSelectedAddressId(def.id);
        if (data.length === 0) setShowAddressForm(true);
      })
      .catch(() => setAddresses([]))
      .finally(() => setLoadingAddresses(false));
  }, [token]);

  const subtotal = cartSubtotal;
  const shippingCost = shippingMethod === 'express' ? 120 : subtotal >= 999 ? 0 : 49;
  const discount = appliedCoupon?.discountAmount || 0;
  const taxes = parseFloat(((subtotal - discount) * 0.18).toFixed(2));
  const total = parseFloat((subtotal - discount + shippingCost + taxes).toFixed(2));

  const handleAddressFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAddressForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveAddress = async () => {
    setAddressError('');
    const { full_name, phone, address_line1, city, state, postal_code } = addressForm;
    if (!full_name || !phone || !address_line1 || !city || !state || !postal_code) {
      setAddressError('Please fill in all required address fields.');
      return;
    }
    setSavingAddress(true);
    try {
      const res = await fetch(`${API_URL}/addresses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(addressForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save address');
      setAddresses((prev) => [data, ...prev]);
      setSelectedAddressId(data.id);
      setShowAddressForm(false);
      setAddressForm(emptyAddressForm);
    } catch (err: any) {
      setAddressError(err.message || 'Failed to save address');
    } finally {
      setSavingAddress(false);
    }
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponError('');
    setCouponApplying(true);
    try {
      const res = await fetch(`${API_URL}/coupons/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponCode.trim(), orderAmount: subtotal }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Invalid coupon');
      setAppliedCoupon({ code: data.code, discountAmount: data.discountAmount });
    } catch (err: any) {
      setAppliedCoupon(null);
      setCouponError(err.message || 'Invalid coupon');
    } finally {
      setCouponApplying(false);
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setOrderError('');

    if (!token) {
      window.history.pushState(null, '', '/login');
      return;
    }
    if (cartItems.length === 0) {
      setOrderError('Your cart is empty.');
      return;
    }
    if (!selectedAddressId) {
      setOrderError('Please select or add a delivery address.');
      return;
    }

    setIsSubmitting(true);
    try {
      const orderRes = await fetch(`${API_URL}/orders/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          addressId: selectedAddressId,
          couponCode: appliedCoupon?.code,
          shippingSpeed: shippingMethod,
          paymentMethod: paymentMethod === 'cod' ? 'COD' : 'Razorpay',
        }),
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.error || 'Failed to place order');
      const order = orderData.order;

      if (paymentMethod === 'cod') {
        setPlacedOrder(order);
        setIsSubmitting(false);
        return;
      }

      // Razorpay flow
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Could not load payment gateway. Please check your connection and try again.');
      }

      const rpRes = await fetch(`${API_URL}/payment/create-razorpay-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ orderId: order.id }),
      });
      const rpOrder = await rpRes.json();
      if (!rpRes.ok) throw new Error(rpOrder.error || 'Failed to initiate payment');

      const rzp = new window.Razorpay({
        key: rpOrder.key_id,
        amount: rpOrder.amount,
        currency: rpOrder.currency,
        order_id: rpOrder.id,
        name: 'Papiah',
        description: `Order ${order.order_number}`,
        prefill: {
          name: `${user?.firstName || ''} ${user?.lastName || ''}`.trim(),
          email: user?.email,
          contact: user?.phone,
        },
        theme: { color: '#C8D93B' },
        handler: async (response: any) => {
          try {
            const verifyRes = await fetch(`${API_URL}/payment/verify`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
              body: JSON.stringify({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
                orderId: order.id,
              }),
            });
            const verifyData = await verifyRes.json();
            if (!verifyRes.ok) throw new Error(verifyData.error || 'Payment verification failed');
            setPlacedOrder(verifyData.order || order);
          } catch (err: any) {
            setOrderError(err.message || 'Payment verification failed. Contact support with your order number: ' + order.order_number);
          } finally {
            setIsSubmitting(false);
          }
        },
        modal: {
          ondismiss: () => {
            setIsSubmitting(false);
            setPaymentPending(true);
          },
        },
      });
      rzp.on('payment.failed', () => {
        setIsSubmitting(false);
        setPaymentPending(true);
      });
      rzp.open();
    } catch (err: any) {
      setOrderError(err.message || 'Failed to place order');
      setIsSubmitting(false);
    }
  };

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId);

  return (
    <div className="min-h-screen bg-[#F8F5F0] text-[#2E3B2E] font-sans selection:bg-[#DCCAF7]/40 relative pb-16">

      {/* 1. SECURE HEADER */}
      <header className="border-b border-[#E9E5DF] bg-[#F8F5F0]/90 backdrop-blur-md sticky top-0 z-40 select-none">
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
          <button
            onClick={navigateBack}
            className="flex items-center gap-2 text-[11px] font-sans font-bold tracking-[0.25em] text-[#2E3B2E]/60 hover:text-[#2E3B2E] transition-colors uppercase duration-200 cursor-pointer"
          >
            <svg className="w-3.5 h-3.5 transform translate-y-[-0.5px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Cart
          </button>

          <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
            <span className="font-serif font-light text-2xl tracking-[0.2em] text-[#2E3B2E] uppercase">
              Papiah
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[10.5px] font-sans font-bold tracking-[0.2em] text-[#2E3B2E]/50 uppercase">
            <svg className="w-3.5 h-3.5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Secure Checkout
          </div>
        </div>
      </header>

      {!token ? (
        <main className="max-w-xl mx-auto px-6 pt-20 text-center">
          <div className="bg-white rounded-[24px] border border-[#E9E5DF] p-10 shadow-[0_8px_32px_rgba(46,59,46,0.04)]">
            <h1 className="font-serif text-[26px] font-light text-[#2E3B2E] mb-4">Please log in to checkout</h1>
            <p className="text-[13px] text-[#2E3B2E]/70 mb-6">You need to be signed in to place an order.</p>
            <button
              onClick={() => window.history.pushState(null, '', '/login')}
              className="bg-[#C8D93B] hover:bg-[#B7C932] text-[#2E3B2E] font-sans font-bold tracking-[0.2em] text-[11px] h-[52px] px-8 rounded-[12px] uppercase cursor-pointer"
            >
              Go to Login
            </button>
          </div>
        </main>
      ) : placedOrder ? (
        /* SUCCESS SCREEN */
        <main className="max-w-xl mx-auto px-6 pt-20 text-center animate-fade-in">
          <div className="bg-white rounded-[24px] border border-[#E9E5DF] p-10 shadow-[0_8px_32px_rgba(46,59,46,0.04)] relative overflow-hidden">
            <div className="w-16 h-16 rounded-full bg-[#DCCAF7]/30 flex items-center justify-center text-[#2E3B2E] mx-auto mb-6">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="font-serif text-[32px] font-light text-[#2E3B2E] tracking-wide mb-4">
              Thank you for your order
            </h1>

            <p className="font-sans font-light text-[14.5px] text-[#2E3B2E]/75 leading-relaxed mb-6">
              Order <span className="font-medium">#{placedOrder.order_number}</span> has been placed. A confirmation email is on its way to <span className="font-medium text-[#2E3B2E]">{user?.email}</span>.
            </p>

            <div className="bg-[#F8F5F0] rounded-[16px] border border-[#E9E5DF]/60 p-5 mb-8 text-left text-[13px] font-sans text-[#2E3B2E]/80">
              <h4 className="font-serif font-semibold text-[14px] text-[#2E3B2E] mb-2 uppercase tracking-wide">Order Summary</h4>
              {(placedOrder.order_items || []).map((item: any) => (
                <div key={item.id} className="flex justify-between py-1">
                  <span>{item.product_title} × {item.quantity}</span>
                  <span>₹{Number(item.total).toLocaleString('en-IN')}</span>
                </div>
              ))}
              <div className="flex justify-between font-semibold pt-2 mt-2 border-t border-[#E9E5DF]">
                <span>Total</span>
                <span>₹{Number(placedOrder.total).toLocaleString('en-IN')}</span>
              </div>
              <p className="mt-2 text-[#2E3B2E]/60">
                Payment: {placedOrder.payment_method} ({placedOrder.payment_status})
              </p>
            </div>

            <button
              onClick={() => window.history.pushState(null, '', '/profile')}
              className="w-full bg-[#C8D93B] hover:bg-[#B7C932] text-[#2E3B2E] font-sans font-bold tracking-[0.2em] text-[11px] h-[54px] rounded-[12px] uppercase shadow-[0_4px_16px_rgba(200,217,59,0.2)] transition-all duration-300 cursor-pointer"
            >
              View My Orders
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
              Review your order and complete purchase
            </p>
          </div>

          {cartItems.length === 0 && !cartLoading ? (
            <div className="bg-white rounded-[20px] border border-[#E9E5DF] p-10 text-center">
              <p className="text-[14px] text-[#2E3B2E]/70 mb-6">Your cart is empty.</p>
              <button
                onClick={() => window.history.pushState(null, '', '/collection')}
                className="bg-[#C8D93B] hover:bg-[#B7C932] text-[#2E3B2E] font-sans font-bold tracking-[0.2em] text-[11px] h-[52px] px-8 rounded-[12px] uppercase cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-start">

              {/* LEFT COLUMN */}
              <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-10">

                {/* Section 1: Delivery Address */}
                <div className="bg-white rounded-[20px] border border-[#E9E5DF] p-6 md:p-8 shadow-[0_4px_20px_rgba(46,59,46,0.015)] text-left">
                  <h2 className="font-serif text-[20px] md:text-[22px] font-light text-[#2E3B2E] mb-6 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#DCCAF7]/30 flex items-center justify-center text-[12px] font-sans font-bold text-[#2E3B2E]/70">1</span>
                    Delivery Address
                  </h2>

                  {loadingAddresses ? (
                    <p className="text-[13px] text-[#2E3B2E]/50">Loading addresses...</p>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {addresses.map((addr) => (
                        <label
                          key={addr.id}
                          className={`flex items-start gap-3 p-4 border rounded-[12px] cursor-pointer transition-all duration-200 ${
                            selectedAddressId === addr.id ? 'border-[#DCCAF7] bg-[#DCCAF7]/5' : 'border-[#E2DDD5] hover:border-[#2E3B2E]/20'
                          }`}
                        >
                          <input
                            type="radio"
                            name="addressId"
                            checked={selectedAddressId === addr.id}
                            onChange={() => setSelectedAddressId(addr.id)}
                            className="mt-1"
                          />
                          <div className="text-[13px] text-[#2E3B2E]">
                            <span className="font-semibold">{addr.label}</span> — {addr.full_name} · {addr.phone}
                            <p className="text-[#2E3B2E]/60 mt-0.5">
                              {addr.address_line1}{addr.address_line2 ? `, ${addr.address_line2}` : ''}, {addr.city}, {addr.state} {addr.postal_code}
                            </p>
                          </div>
                        </label>
                      ))}

                      {!showAddressForm ? (
                        <button
                          type="button"
                          onClick={() => setShowAddressForm(true)}
                          className="text-[12px] font-sans font-bold tracking-wider text-[#8E76B8] uppercase self-start cursor-pointer"
                        >
                          + Add New Address
                        </button>
                      ) : (
                        <div className="border border-[#E2DDD5] rounded-[12px] p-5 flex flex-col gap-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <input name="full_name" value={addressForm.full_name} onChange={handleAddressFormChange} placeholder="Full Name" className="bg-[#FDFCFB] border border-[#E2DDD5] rounded-[10px] px-3.5 py-2.5 text-[13.5px] outline-none" />
                            <input name="phone" value={addressForm.phone} onChange={handleAddressFormChange} placeholder="Phone Number" className="bg-[#FDFCFB] border border-[#E2DDD5] rounded-[10px] px-3.5 py-2.5 text-[13.5px] outline-none" />
                          </div>
                          <input name="address_line1" value={addressForm.address_line1} onChange={handleAddressFormChange} placeholder="Street Address" className="bg-[#FDFCFB] border border-[#E2DDD5] rounded-[10px] px-3.5 py-2.5 text-[13.5px] outline-none" />
                          <input name="address_line2" value={addressForm.address_line2} onChange={handleAddressFormChange} placeholder="Apartment, Suite, etc. (optional)" className="bg-[#FDFCFB] border border-[#E2DDD5] rounded-[10px] px-3.5 py-2.5 text-[13.5px] outline-none" />
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <input name="city" value={addressForm.city} onChange={handleAddressFormChange} placeholder="City" className="bg-[#FDFCFB] border border-[#E2DDD5] rounded-[10px] px-3.5 py-2.5 text-[13.5px] outline-none" />
                            <input name="state" value={addressForm.state} onChange={handleAddressFormChange} placeholder="State" className="bg-[#FDFCFB] border border-[#E2DDD5] rounded-[10px] px-3.5 py-2.5 text-[13.5px] outline-none" />
                            <input name="postal_code" value={addressForm.postal_code} onChange={handleAddressFormChange} placeholder="ZIP / Postal Code" className="bg-[#FDFCFB] border border-[#E2DDD5] rounded-[10px] px-3.5 py-2.5 text-[13.5px] outline-none" />
                          </div>
                          {addressError && <span className="text-red-500 text-[11.5px]">{addressError}</span>}
                          <div className="flex gap-3 mt-1">
                            <button
                              type="button"
                              disabled={savingAddress}
                              onClick={handleSaveAddress}
                              className="bg-[#2E3B2E] text-white text-[11px] font-bold tracking-wider uppercase px-5 py-2.5 rounded-[10px] cursor-pointer disabled:opacity-60"
                            >
                              {savingAddress ? 'Saving...' : 'Save Address'}
                            </button>
                            {addresses.length > 0 && (
                              <button type="button" onClick={() => setShowAddressForm(false)} className="text-[11px] font-bold tracking-wider uppercase px-3 py-2.5 text-[#2E3B2E]/60 cursor-pointer">
                                Cancel
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Section 2: Shipping Method */}
                <div className="bg-white rounded-[20px] border border-[#E9E5DF] p-6 md:p-8 shadow-[0_4px_20px_rgba(46,59,46,0.015)] text-left">
                  <h2 className="font-serif text-[20px] md:text-[22px] font-light text-[#2E3B2E] mb-6 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#DCCAF7]/30 flex items-center justify-center text-[12px] font-sans font-bold text-[#2E3B2E]/70">2</span>
                    Shipping Method
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div
                      onClick={() => setShippingMethod('standard')}
                      className={`flex items-start justify-between p-4 border rounded-[12px] cursor-pointer transition-all duration-200 select-none ${
                        shippingMethod === 'standard' ? 'border-[#DCCAF7] bg-[#DCCAF7]/5 shadow-sm' : 'border-[#E2DDD5] bg-white hover:border-[#2E3B2E]/20'
                      }`}
                    >
                      <div className="flex gap-3">
                        <div className="mt-1 flex items-center justify-center w-4 h-4 rounded-full border border-[#2E3B2E]/40 p-0.5">
                          {shippingMethod === 'standard' && <div className="w-2.5 h-2.5 rounded-full bg-[#2E3B2E]" />}
                        </div>
                        <div className="flex flex-col text-left">
                          <span className="font-sans font-semibold text-[13px] text-[#2E3B2E]">Standard Delivery</span>
                          <span className="font-sans text-[11.5px] text-[#2E3B2E]/60 mt-0.5">3-5 business days</span>
                        </div>
                      </div>
                      <span className="font-sans font-semibold text-[12px] text-[#2E3B2E] uppercase">{subtotal >= 999 ? 'Free' : '₹49'}</span>
                    </div>

                    <div
                      onClick={() => setShippingMethod('express')}
                      className={`flex items-start justify-between p-4 border rounded-[12px] cursor-pointer transition-all duration-200 select-none ${
                        shippingMethod === 'express' ? 'border-[#DCCAF7] bg-[#DCCAF7]/5 shadow-sm' : 'border-[#E2DDD5] bg-white hover:border-[#2E3B2E]/20'
                      }`}
                    >
                      <div className="flex gap-3">
                        <div className="mt-1 flex items-center justify-center w-4 h-4 rounded-full border border-[#2E3B2E]/40 p-0.5">
                          {shippingMethod === 'express' && <div className="w-2.5 h-2.5 rounded-full bg-[#2E3B2E]" />}
                        </div>
                        <div className="flex flex-col text-left">
                          <span className="font-sans font-semibold text-[13px] text-[#2E3B2E]">Express Delivery</span>
                          <span className="font-sans text-[11.5px] text-[#2E3B2E]/60 mt-0.5">1-2 business days</span>
                        </div>
                      </div>
                      <span className="font-sans font-semibold text-[12px] text-[#2E3B2E]">₹120</span>
                    </div>
                  </div>
                </div>

                {/* Section 3: Payment Method */}
                <div className="bg-white rounded-[20px] border border-[#E9E5DF] p-6 md:p-8 shadow-[0_4px_20px_rgba(46,59,46,0.015)] text-left">
                  <h2 className="font-serif text-[20px] md:text-[22px] font-light text-[#2E3B2E] mb-6 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#DCCAF7]/30 flex items-center justify-center text-[12px] font-sans font-bold text-[#2E3B2E]/70">3</span>
                    Payment Method
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div
                      onClick={() => setPaymentMethod('razorpay')}
                      className={`flex items-center gap-3 p-4 border rounded-[12px] cursor-pointer transition-all duration-200 select-none ${
                        paymentMethod === 'razorpay' ? 'border-[#DCCAF7] bg-[#DCCAF7]/5 shadow-sm' : 'border-[#E2DDD5] bg-white hover:border-[#2E3B2E]/20'
                      }`}
                    >
                      <div className="flex items-center justify-center w-4 h-4 rounded-full border border-[#2E3B2E]/40 p-0.5 shrink-0">
                        {paymentMethod === 'razorpay' && <div className="w-2.5 h-2.5 rounded-full bg-[#2E3B2E]" />}
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="font-sans font-semibold text-[13px] text-[#2E3B2E]">Pay Online</span>
                        <span className="font-sans text-[11px] text-[#2E3B2E]/60">UPI, Card, Net Banking, Wallets via Razorpay</span>
                      </div>
                    </div>

                    <div
                      onClick={() => setPaymentMethod('cod')}
                      className={`flex items-center gap-3 p-4 border rounded-[12px] cursor-pointer transition-all duration-200 select-none ${
                        paymentMethod === 'cod' ? 'border-[#DCCAF7] bg-[#DCCAF7]/5 shadow-sm' : 'border-[#E2DDD5] bg-white hover:border-[#2E3B2E]/20'
                      }`}
                    >
                      <div className="flex items-center justify-center w-4 h-4 rounded-full border border-[#2E3B2E]/40 p-0.5 shrink-0">
                        {paymentMethod === 'cod' && <div className="w-2.5 h-2.5 rounded-full bg-[#2E3B2E]" />}
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="font-sans font-semibold text-[13px] text-[#2E3B2E]">Cash on Delivery</span>
                        <span className="font-sans text-[11px] text-[#2E3B2E]/60">Pay when your order arrives</span>
                      </div>
                    </div>
                  </div>
                </div>

                {orderError && (
                  <div className="bg-red-50 border border-red-200 text-red-600 text-[13px] rounded-[12px] p-4">{orderError}</div>
                )}
                {paymentPending && (
                  <div className="bg-amber-50 border border-amber-200 text-amber-700 text-[13px] rounded-[12px] p-4">
                    Payment was not completed. Your order has been saved as pending — you can complete payment or contact us from your Orders page.
                  </div>
                )}

                {/* Large CTA Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || cartItems.length === 0}
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

              {/* RIGHT COLUMN: ORDER SUMMARY */}
              <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6 lg:sticky lg:top-24">

                <div className="bg-white rounded-[20px] border border-[#E9E5DF] p-6 shadow-[0_4px_20px_rgba(46,59,46,0.015)] text-left">
                  <h3 className="font-serif text-[17px] font-medium text-[#2E3B2E] mb-6 uppercase tracking-wider">
                    Order Summary
                  </h3>

                  <div className="flex flex-col gap-4 mb-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <div className="w-14 h-16 bg-[#FAF9F6] rounded-[10px] border border-[#E9E5DF] flex items-center justify-center p-1 shrink-0 overflow-hidden">
                          {item.image && <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />}
                        </div>
                        <div className="flex-1 flex flex-col min-w-0">
                          <span className="font-serif text-[13.5px] text-[#2E3B2E] leading-tight truncate">{item.name}</span>
                          <span className="text-[11px] text-[#2E3B2E]/50 font-sans mt-0.5">Qty: {item.quantity}</span>
                        </div>
                        <span className="font-sans font-semibold text-[13px] text-[#2E3B2E] shrink-0">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="h-[1px] bg-[#E9E5DF] my-4"></div>

                  {/* Coupon */}
                  <div className="flex gap-2 mb-4">
                    <input
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="Coupon code"
                      className="flex-1 bg-[#FDFCFB] border border-[#E2DDD5] rounded-[10px] px-3 py-2 text-[12.5px] outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      disabled={couponApplying}
                      className="text-[11px] font-bold tracking-wider uppercase px-4 py-2 bg-[#2E3B2E] text-white rounded-[10px] cursor-pointer disabled:opacity-60"
                    >
                      {couponApplying ? '...' : 'Apply'}
                    </button>
                  </div>
                  {couponError && <p className="text-red-500 text-[11px] mb-3">{couponError}</p>}
                  {appliedCoupon && <p className="text-[#2E7D32] text-[11px] mb-3">Coupon "{appliedCoupon.code}" applied!</p>}

                  <div className="flex flex-col gap-3 text-[13px] font-sans text-[#2E3B2E]/80">
                    <div className="flex justify-between items-center">
                      <span className="font-light">Subtotal</span>
                      <span className="font-medium text-[#2E3B2E]">₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-light">Shipping</span>
                      <span className="font-medium text-[#2E3B2E]">{shippingCost === 0 ? 'Free' : `₹${shippingCost}`}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="font-light">Discount</span>
                        <span className="font-medium text-[#2E7D32]">-₹{discount.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="font-light">Estimated GST (18%)</span>
                      <span className="font-medium text-[#2E3B2E]">₹{taxes.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div className="h-[1px] bg-[#E9E5DF] my-5"></div>

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

                {selectedAddress && (
                  <div className="bg-[#DCCAF7]/10 rounded-[16px] border border-[#DCCAF7]/30 p-5 text-left">
                    <h4 className="font-serif text-[13px] text-[#2E3B2E] mb-2 uppercase tracking-wide">Deliver to</h4>
                    <p className="text-[12.5px] text-[#2E3B2E]/75 leading-relaxed">
                      {selectedAddress.full_name}<br />
                      {selectedAddress.address_line1}{selectedAddress.address_line2 ? `, ${selectedAddress.address_line2}` : ''}<br />
                      {selectedAddress.city}, {selectedAddress.state} {selectedAddress.postal_code}
                    </p>
                  </div>
                )}
              </div>
            </form>
          )}
        </main>
      )}

      {/* 2. FOOTER TRUST BAR */}
      <footer className="max-w-[1200px] mx-auto px-6 mt-16 md:mt-24 select-none">
        <div className="border-t border-[#E9E5DF] pt-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { badge: '🚚', title: 'Free Shipping', desc: 'On all orders above ₹999' },
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
