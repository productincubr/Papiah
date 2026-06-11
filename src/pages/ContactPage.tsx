import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [subscribe, setSubscribe] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      // Logic for message submission
      console.log('Contact message submitted:', { name, email, subject, message, subscribe });
      setSubmitted(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setSubscribe(false);
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1C1B19] font-sans relative overflow-hidden paper-texture selection:bg-[#EAD9FA] selection:text-[#1C1B19] flex flex-col justify-between">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none"></div>

      <div>
        {/* Navigation */}
        <Navbar />

        {/* ============================================================================
            HERO / HEADER SECTION
            ============================================================================ */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 pt-16 pb-8 relative z-10 text-center select-none">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#8E76B8] uppercase mb-4 block">
            GET IN TOUCH
          </span>
          <h1 className="font-playfair text-4xl sm:text-5xl md:text-[54px] text-[#2F3A2A] font-light leading-[1.15] tracking-tight mb-5 max-w-2xl mx-auto">
            We'd love to hear from you.
          </h1>
          <p className="text-[14.5px] text-gray-500 font-sans font-light leading-relaxed max-w-lg mx-auto">
            Whether you have a question about orders, custom embossing, wholesale opportunities, or just want to say hello—our team is here to assist.
          </p>
          <div className="border-t border-[#1C1B19]/10 w-16 mx-auto mt-8"></div>
        </section>

        {/* ============================================================================
            CONTACT CONTENT & FORM SECTION
            ============================================================================ */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 py-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            
            {/* Left Column - Contact Details */}
            <div className="flex flex-col text-left gap-10">
              
              {/* Studio Info */}
              <div>
                <h3 className="font-playfair text-xl text-[#2F3A2A] font-medium tracking-tight mb-3">
                  The Studio
                </h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2 font-sans">Address</p>
                <p className="text-[14px] text-gray-600 font-sans font-light leading-relaxed">
                  Papiah Creative Studio<br />
                  DLF Phase 3, Gurugram<br />
                  Haryana, 122002<br />
                  India
                </p>
              </div>

              {/* Inquiry Channels */}
              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1 font-sans">Customer Support</p>
                  <a href="mailto:care@papiah.com" className="text-[15px] font-medium text-[#8E76B8] hover:text-[#7D62A5] transition-colors font-sans">
                    care@papiah.com
                  </a>
                  <p className="text-[11.5px] text-gray-400 font-sans font-light mt-1">
                    For order queries, shipping, and return help.
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1 font-sans">Wholesale & Customs</p>
                  <a href="mailto:partnerships@papiah.com" className="text-[15px] font-medium text-[#8E76B8] hover:text-[#7D62A5] transition-colors font-sans">
                    partnerships@papiah.com
                  </a>
                  <p className="text-[11.5px] text-gray-400 font-sans font-light mt-1">
                    For bulk retail, customized planners, and branding collaborations.
                  </p>
                </div>
              </div>

              {/* Support Hours */}
              <div>
                <h3 className="font-playfair text-lg text-[#2F3A2A] font-medium tracking-tight mb-2">
                  Operating Hours
                </h3>
                <p className="text-[13.5px] text-gray-600 font-sans font-light leading-relaxed">
                  Monday to Friday: 10:00 AM &ndash; 6:00 PM IST<br />
                  Closed on Weekends and Public Holidays.
                </p>
              </div>

              {/* Social Channels */}
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-3 font-sans">Follow Our Journey</p>
                <div className="flex items-center gap-4 text-[#2F3A2A]/70">
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#8E76B8] transition-colors" aria-label="Instagram">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </a>
                  <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="hover:text-[#8E76B8] transition-colors" aria-label="Pinterest">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.16 9.4 7.63 11.1-.1-.95-.2-2.4.04-3.43.22-.94 1.4-5.97 1.4-5.97s-.36-.72-.36-1.77c0-1.66.96-2.9 2.16-2.9 1.02 0 1.51.77 1.51 1.68 0 1.03-.65 2.56-.99 3.98-.28 1.19.6 2.16 1.77 2.16 2.12 0 3.76-2.24 3.76-5.48 0-2.86-2.06-4.86-5-4.86-3.4 0-5.4 2.56-5.4 5.2 0 1.03.4 2.14.9 2.74.1.12.1.23.08.35l-.34 1.43c-.06.24-.18.3-.42.18-1.58-.74-2.57-3.05-2.57-4.9 0-3.99 2.9-7.65 8.35-7.65 4.39 0 7.8 3.13 7.8 7.3 0 4.36-2.75 7.87-6.57 7.87-1.28 0-2.49-.67-2.9-1.46l-.8 3.01c-.28 1.1-.96 2.47-1.44 3.25C8.86 23.82 10.37 24 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0z" />
                    </svg>
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-[#8E76B8] transition-colors" aria-label="Facebook">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                </div>
              </div>

            </div>

            {/* Right Column - Interactive Form */}
            <div className="bg-white border border-[#2F3A2A]/5 rounded-[2rem] p-8 md:p-10 shadow-[0_12px_45px_rgba(46,58,42,0.03)] relative">
              {submitted ? (
                <div className="min-h-[350px] flex flex-col justify-center items-center text-center animate-fade-in">
                  <div className="w-14 h-14 rounded-full bg-[#CBD83B]/20 text-[#2F3A2A] flex items-center justify-center mb-5">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-playfair text-2xl text-[#2F3A2A] font-medium mb-3">
                    Message Sent
                  </h3>
                  <p className="text-[13.5px] text-gray-500 font-sans font-light leading-relaxed max-w-xs">
                    Thank you for reaching out to PAPIAH. Our customer experience team will get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="text-left">
                    <h3 className="font-playfair text-2xl text-[#2F3A2A] font-medium tracking-tight mb-2">
                      Send a Message
                    </h3>
                    <p className="text-[12.5px] text-gray-400 font-sans font-light">
                      Fill out the form below and we'll connect with you shortly.
                    </p>
                  </div>

                  {/* Name Input */}
                  <div className="flex flex-col text-left">
                    <label htmlFor="name" className="text-[10px] font-bold tracking-wider text-[#2F3A2A]/50 uppercase mb-2">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      required
                      className="border border-[#1C1B19]/10 focus:border-[#8E76B8]/50 focus:outline-none rounded-xl px-4 py-3.5 text-xs text-[#1C1B19] placeholder-gray-400/80 bg-[#FAF9F6]/50 font-sans transition-colors"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="flex flex-col text-left">
                    <label htmlFor="email" className="text-[10px] font-bold tracking-wider text-[#2F3A2A]/50 uppercase mb-2">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      required
                      className="border border-[#1C1B19]/10 focus:border-[#8E76B8]/50 focus:outline-none rounded-xl px-4 py-3.5 text-xs text-[#1C1B19] placeholder-gray-400/80 bg-[#FAF9F6]/50 font-sans transition-colors"
                    />
                  </div>

                  {/* Subject Dropdown */}
                  <div className="flex flex-col text-left">
                    <label htmlFor="subject" className="text-[10px] font-bold tracking-wider text-[#2F3A2A]/50 uppercase mb-2">
                      Subject
                    </label>
                    <div className="relative">
                      <select
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full border border-[#1C1B19]/10 focus:border-[#8E76B8]/50 focus:outline-none rounded-xl px-4 py-3.5 text-xs text-[#1C1B19] bg-[#FAF9F6]/50 font-sans transition-colors appearance-none"
                      >
                        <option value="">Select a subject</option>
                        <option value="orders">Order Status & Shipping</option>
                        <option value="wholesale">Wholesale & Partnerships</option>
                        <option value="custom">Custom Orders / Corporate Gifting</option>
                        <option value="feedback">Product Feedback</option>
                        <option value="other">General Inquiry</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="flex flex-col text-left">
                    <label htmlFor="message" className="text-[10px] font-bold tracking-wider text-[#2F3A2A]/50 uppercase mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can we help you today?"
                      required
                      rows={4}
                      className="border border-[#1C1B19]/10 focus:border-[#8E76B8]/50 focus:outline-none rounded-xl px-4 py-3.5 text-xs text-[#1C1B19] placeholder-gray-400/80 bg-[#FAF9F6]/50 font-sans transition-colors resize-none"
                    ></textarea>
                  </div>

                  {/* Newsletter Checkbox */}
                  <div className="flex items-center gap-2.5 text-left mt-2 cursor-pointer select-none">
                    <input
                      id="newsletter"
                      type="checkbox"
                      checked={subscribe}
                      onChange={(e) => setSubscribe(e.target.checked)}
                      className="w-4 h-4 accent-[#CBD83B] rounded border-gray-300 focus:ring-[#CBD83B] cursor-pointer"
                    />
                    <label htmlFor="newsletter" className="text-[11.5px] text-gray-500 font-sans font-light cursor-pointer">
                      Subscribe to our newsletter for mindful inspiration.
                    </label>
                  </div>

                  {/* Submit Button (Lime Green CTA Style) */}
                  <button
                    type="submit"
                    className="w-full bg-[#CBD83B] hover:bg-[#b8c634] active:scale-[0.99] text-[#2E3327] font-sans font-bold tracking-[0.2em] text-[11px] py-4 rounded-xl shadow-[0_4px_14px_rgba(203,216,59,0.2)] hover:shadow-[0_6px_20px_rgba(203,216,59,0.35)] transition-all duration-300 uppercase cursor-pointer flex items-center justify-center select-none mt-2"
                  >
                    SEND MESSAGE
                  </button>
                </form>
              )}
            </div>

          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
