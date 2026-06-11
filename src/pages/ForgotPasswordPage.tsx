import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function ForgotPasswordPage() {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const result = await forgotPassword(email);
    setLoading(false);

    if (result.success) {
      setMessage("Instructions to reset your password have been sent to your email.");
      setEmail("");
    } else {
      setError(result.error || "Failed to send reset link.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1C1B19] font-sans flex items-center justify-center p-6 md:p-12 lg:p-24 relative overflow-hidden paper-texture selection:bg-[#EAD9FA] selection:text-[#1C1B19]">
      {/* Background Grids */}
      <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none"></div>

      {/* Back to Login button */}
      <button 
        onClick={() => window.history.pushState(null, "", "/login")} 
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
        Back to Sign In
      </button>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start relative z-10 mt-16 lg:mt-8">
        
        {/* Left Column - Editorial Intro */}
        <div className="flex flex-col justify-start max-w-lg lg:pr-8 pt-0 lg:pt-4">
          <h1 className="font-playfair text-5xl md:text-6xl text-[#1C1B19] leading-[1.08] font-light tracking-tight mb-4 select-none">
            Reset your<br />
            password
          </h1>
          <p className="font-handwriting text-3xl text-[#8E76B8] leading-snug mb-8 transform -rotate-1 origin-left select-none">
            Take a moment to reconnect<br />
            with your account.
          </p>
          <div className="border-t border-[#1C1B19]/10 w-24 mb-10"></div>
          <p className="text-[14px] text-gray-500 font-sans font-light leading-relaxed max-w-[400px] text-left">
            Enter the email address associated with your account, and we'll send you instructions to reset your password so you can continue your journaling journey.
          </p>
        </div>

        {/* Right Column - Form Card */}
        <div className="flex justify-center lg:justify-start w-full">
          <div className="w-full max-w-[480px] bg-white rounded-[2rem] p-8 md:p-10 border border-[#FAF9F6] shadow-[0_12px_48px_rgba(28,27,25,0.04)]">
            
            <div className="mb-8 text-center lg:text-left">
              <h2 className="font-serif text-3xl text-[#1C1B19] mb-2 tracking-tight">Forgot Password</h2>
              <p className="text-xs text-[#1C1B19]/70">
                We'll email you a link to reset your password.
              </p>
            </div>

            {error && (
              <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-100 text-xs font-medium text-[#9E4C41] text-left">
                {error}
              </div>
            )}

            {message && (
              <div className="mb-5 p-4 rounded-xl bg-green-50 border border-green-100 text-xs font-medium text-green-700 text-left">
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div className="space-y-1.5 text-left">
                <label htmlFor="email" className="text-[11px] font-bold tracking-wider text-[#1C1B19]/60 uppercase block">
                  Email address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    disabled={loading}
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white text-[#1C1B19] placeholder-[#1C1B19]/30 text-xs font-sans focus:outline-none focus:ring-1 focus:ring-[#8E76B8] focus:border-[#8E76B8] transition-all pr-10"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#CBD83B] hover:bg-[#b8c634] active:scale-[0.99] disabled:opacity-50 text-[#2E3327] font-sans font-bold tracking-[0.2em] text-[11px] md:text-[12px] h-[54px] rounded-xl shadow-[0_4px_14px_rgba(203,216,59,0.25)] hover:shadow-[0_6px_22px_rgba(203,216,59,0.4)] transition-all duration-300 uppercase cursor-pointer flex items-center justify-center gap-2"
              >
                {loading ? "SENDING LINK..." : "SEND RESET LINK"}
              </button>
            </form>

            <div className="mt-8 text-center">
              <a 
                href="/login" 
                onClick={(e) => { e.preventDefault(); window.history.pushState(null, "", "/login"); }}
                className="text-xs font-bold text-[#8E76B8] hover:text-[#7D62A5] tracking-widest uppercase transition-colors"
              >
                Return to Login
              </a>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
