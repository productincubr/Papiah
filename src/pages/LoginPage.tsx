import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../config/api";

export default function LoginPage() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await login(formData.email, formData.password);
    setLoading(false);

    if (result.success) {
      window.history.pushState(null, "", "/profile");
    } else {
      setError(result.error || "Invalid credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1C1B19] font-sans flex items-center justify-center p-6 md:p-12 lg:p-24 relative overflow-hidden paper-texture selection:bg-[#EAD9FA] selection:text-[#1C1B19]">
      {/* Background grids matching Papiah theme */}
      <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none"></div>

      {/* Back button positioned absolutely on top-left for clean layout grid alignment */}
      <button 
        onClick={() => window.history.back()} 
        className="absolute top-8 left-6 md:top-12 md:left-12 flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] text-[#1C1B19]/50 hover:text-[#1C1B19] transition-colors duration-200 cursor-pointer uppercase select-none group z-30"
      >
        <svg 
          className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to shop
      </button>

      {/* Two-column layout grid, items-start to align left content exactly with login card top */}
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start relative z-10 mt-16 lg:mt-8">
        
        {/* Left Column - Welcome back content */}
        <div className="flex flex-col justify-start max-w-lg lg:pr-8 pt-0 lg:pt-4">
          {/* Main Heading (using Playfair/Cormorant Serif matching home & collection header styles) */}
          <h1 className="font-playfair text-5xl md:text-6xl text-[#1C1B19] leading-[1.08] font-light tracking-tight mb-4 select-none">
            Sign in to<br />
            your account
          </h1>

          {/* Lavender Accent Handwriting */}
          <p className="font-handwriting text-3xl text-[#8E76B8] leading-snug mb-8 transform -rotate-1 origin-left select-none">
            Continue your journaling<br />
            journey with Papiah.
          </p>

          {/* Thin Divider Line matching collection grid lines */}
          <div className="border-t border-[#1C1B19]/10 w-24 mb-10"></div>

          {/* Benefit Items */}
          <div className="space-y-8">
            {/* Benefit 1 */}
            <div className="flex items-start gap-4 text-left">
              <div className="w-11 h-11 rounded-full bg-[#EAD9FA]/30 flex items-center justify-center shrink-0 text-[#8E76B8] shadow-2xs">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <div className="flex flex-col gap-0.5">
                <h3 className="font-serif text-[15.5px] font-medium text-[#1C1B19] leading-tight">Track Orders</h3>
                <p className="text-[12px] text-gray-500 font-sans font-light leading-relaxed max-w-[320px]">
                  View your order history and real-time delivery status.
                </p>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="flex items-start gap-4 text-left">
              <div className="w-11 h-11 rounded-full bg-[#EAD9FA]/30 flex items-center justify-center shrink-0 text-[#8E76B8] shadow-2xs">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <div className="flex flex-col gap-0.5">
                <h3 className="font-serif text-[15.5px] font-medium text-[#1C1B19] leading-tight">Quick Access</h3>
                <p className="text-[12px] text-gray-500 font-sans font-light leading-relaxed max-w-[320px]">
                  Easily manage your billing, shipping, and account details.
                </p>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="flex items-start gap-4 text-left">
              <div className="w-11 h-11 rounded-full bg-[#EAD9FA]/30 flex items-center justify-center shrink-0 text-[#8E76B8] shadow-2xs">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5a2 2 0 10-2 2h2zm0 0h4m-4 0H8m12 3a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m-12 6a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <div className="flex flex-col gap-0.5">
                <h3 className="font-serif text-[15.5px] font-medium text-[#1C1B19] leading-tight">Loyalty Rewards</h3>
                <p className="text-[12px] text-gray-500 font-sans font-light leading-relaxed max-w-[320px]">
                  Check and redeem your earned reward points on checkouts.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Centered White Card */}
        <div className="flex justify-center lg:justify-start w-full">
          <div className="w-full max-w-[480px] bg-white rounded-[2rem] p-8 md:p-10 border border-[#FAF9F6] shadow-[0_12px_48px_rgba(28,27,25,0.04)]">
            
            {/* Form Header */}
            <div className="mb-8 text-center lg:text-left">
              <h2 className="font-serif text-3xl text-[#1C1B19] mb-2 tracking-tight">Sign In</h2>
              <p className="text-xs text-[#1C1B19]/70">
                Don't have an account?{" "}
                <a 
                  href="/register" 
                  onClick={(e) => { e.preventDefault(); window.history.pushState(null, "", "/register"); }}
                  className="text-[#8E76B8] hover:text-[#7D62A5] font-semibold transition-colors underline underline-offset-4 decoration-[#8E76B8]/40"
                >
                  Sign up
                </a>
              </p>
            </div>

            {error && (
              <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-100 text-xs font-medium text-[#9E4C41] text-left">
                {error}
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Email Address */}
              <div className="space-y-1.5 text-left">
                <label htmlFor="email" className="text-[11px] font-bold tracking-wider text-[#1C1B19]/60 uppercase block">
                  Email address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white text-[#1C1B19] placeholder-[#1C1B19]/30 text-xs font-sans focus:outline-none focus:ring-1 focus:ring-[#8E76B8] focus:border-[#8E76B8] transition-all pr-10"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5 text-left">
                <div className="flex justify-between items-center">
                  <label htmlFor="password" className="text-[11px] font-bold tracking-wider text-[#1C1B19]/60 uppercase block">
                    Password
                  </label>
                  <a 
                    href="/forgot-password" 
                    className="text-[10px] text-[#8E76B8] hover:text-[#7D62A5] font-semibold transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white text-[#1C1B19] placeholder-[#1C1B19]/30 text-xs font-sans focus:outline-none focus:ring-1 focus:ring-[#8E76B8] focus:border-[#8E76B8] transition-all pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-papiah-dark transition-colors cursor-pointer"
                  >
                    {showPassword ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center gap-3 pt-2 text-left">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4.5 h-4.5 rounded border-gray-300 text-[#8E76B8] focus:ring-[#8E76B8] cursor-pointer"
                />
                <label htmlFor="rememberMe" className="text-xs text-[#1C1B19]/75 select-none cursor-pointer">
                  Remember me for 30 days
                </label>
              </div>

              {/* Primary CTA Button - Matching collection green style [#CBD83B] */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#CBD83B] hover:bg-[#b8c634] active:scale-[0.99] disabled:opacity-50 text-[#2E3327] font-sans font-bold tracking-[0.2em] text-[11px] md:text-[12px] h-[54px] rounded-xl shadow-[0_4px_14px_rgba(203,216,59,0.25)] hover:shadow-[0_6px_22px_rgba(203,216,59,0.4)] transition-all duration-300 uppercase cursor-pointer flex items-center justify-center gap-2"
              >
                {loading ? "SIGNING IN..." : "SIGN IN"}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#1C1B19]/10"></div>
              </div>
              <span className="relative bg-white px-3 text-[10px] font-bold tracking-widest text-[#1C1B19]/40 uppercase">
                OR
              </span>
            </div>

            {/* Social Logins */}
            <div className="space-y-3">
              {/* Google Social Login */}
              <button
                type="button"
                onClick={() => window.location.href = `${API_URL}/users/auth/google`}
                className="w-full flex items-center justify-center gap-3 border border-gray-200 hover:bg-[#FAF9F6] transition-colors py-3.5 rounded-xl text-xs font-semibold text-[#1C1B19]/90 cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                Continue with Google
              </button>

              {/* Apple Social Login */}
              <button
                type="button"
                onClick={() => window.location.href = `${API_URL}/users/auth/apple`}
                className="w-full flex items-center justify-center gap-3 border border-gray-200 hover:bg-[#FAF9F6] transition-colors py-3.5 rounded-xl text-xs font-semibold text-[#1C1B19]/90 cursor-pointer"
              >
                <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.24.67-2.96 1.51-.61.7-1.15 1.84-1.01 2.96 1.12.09 2.27-.58 2.98-1.41z" />
                </svg>
                Continue with Apple
              </button>
            </div>

            {/* Bottom terms disclaimer */}
            <p className="text-[10px] text-center text-[#1C1B19]/50 leading-relaxed mt-6">
              By signing in, you agree to our{" "}
              <a href="/terms" className="underline hover:text-papiah-dark transition-colors">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="underline hover:text-papiah-dark transition-colors">
                Privacy Policy
              </a>.
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}
