import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { MarqueeBanner } from '../components/MarqueeBanner';
import { Footer } from '../components/Footer';

interface PolicySection {
  title: string;
  snippet: string;
  fullContent: React.ReactNode;
}

export const PrivacyPolicyPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    // Scroll to top when page is mounted
    window.scrollTo(0, 0);
  }, []);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const trustCards = [
    {
      title: "Secure Data",
      desc: "Your information is encrypted and protected.",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      )
    },
    {
      title: "Privacy First",
      desc: "We prioritize your privacy in everything we do.",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 11 2 2 4-4" />
        </svg>
      )
    },
    {
      title: "User Control",
      desc: "You have full control over your personal information.",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      )
    },
    {
      title: "No Data Selling",
      desc: "We never sell your personal information to anyone.",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
      )
    },
    {
      title: "Transparent Policies",
      desc: "Clear terms so you know exactly how data is handled.",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      )
    }
  ];

  const policySections: PolicySection[] = [
    {
      title: "Information We Collect",
      snippet: "We collect personal information you provide to us, such as your name, email address, shipping address, payment details, and any other information you choose to share.",
      fullContent: (
        <div className="space-y-4">
          <p>We gather various types of information to serve you better, customize your experience, and continuously improve our artisanal offerings. This information includes:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Identity and Contact Data:</strong> Your name, billing address, shipping address, email address, and phone number when you place an order, create an account, or subscribe to our newsletter.</li>
            <li><strong>Transaction Data:</strong> Details about payments to and from you, and other details of products you have purchased from us.</li>
            <li><strong>Technical Data:</strong> Internet protocol (IP) address, login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
            <li><strong>Profile and Usage Data:</strong> Your username, purchase history, products viewed, search terms, page response times, and feedback or survey responses.</li>
          </ul>
        </div>
      )
    },
    {
      title: "How We Use Your Information",
      snippet: "We use your information to process orders, communicate with you, improve our services, and send important updates (only if you opt-in).",
      fullContent: (
        <div className="space-y-4">
          <p>Your data is processed with extreme care, aligned with the legal bases defined by global privacy laws. We utilize your information to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Fulfill Orders:</strong> Process and deliver your purchases, manage payments, fees, and charges, and collect money owed to us.</li>
            <li><strong>Customer Support:</strong> Manage our relationship with you, which includes notifying you about changes to our terms or privacy policy, and asking you to leave a review or take a survey.</li>
            <li><strong>Personalization:</strong> Deliver relevant website content and product recommendations, and measure the effectiveness of our design and messaging.</li>
            <li><strong>Marketing and Updates:</strong> Share news about new product launches, slow living ideas, and journaling rituals (subject to your explicit consent, which can be withdrawn at any time).</li>
          </ul>
        </div>
      )
    },
    {
      title: "How We Protect Your Information",
      snippet: "We use secure technologies and trusted third-party services to protect your personal data from unauthorized access, use, or disclosure.",
      fullContent: (
        <div className="space-y-4">
          <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered, or disclosed.</p>
          <p>All online payment transactions are processed through secure, encrypted gateways (SSL/TLS technology) provided by leading payment processors. We restrict access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know. They will only process your personal data on our instructions, and they are subject to a strict duty of confidentiality.</p>
        </div>
      )
    },
    {
      title: "Sharing Your Information",
      snippet: "We do not sell or rent your personal information. We may share it with trusted service providers who help us operate our website and fulfill your orders.",
      fullContent: (
        <div className="space-y-4">
          <p>We respect the sanctity of your private space and your data. We do not sell, rent, or trade your personal data with third parties for marketing purposes.</p>
          <p>We may share your data with trusted partners who perform services on our behalf:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Service Providers:</strong> Delivery and courier services to ship your journals, payment gateways to process transactions securely, and email service providers to send transactional updates or newsletters.</li>
            <li><strong>Professional Advisors:</strong> Lawyers, bankers, auditors, and insurers who provide consultancy, banking, legal, insurance, and accounting services.</li>
            <li><strong>Legal Obligations:</strong> Regulators, law enforcement agencies, or tax authorities if required by applicable laws.</li>
          </ul>
        </div>
      )
    },
    {
      title: "Cookies",
      snippet: "Our website uses cookies to enhance your browsing experience, analyze traffic, and personalize content. You can choose to disable cookies in your browser settings.",
      fullContent: (
        <div className="space-y-4">
          <p>Cookies are small text files placed on your device to collect standard internet log information and visitor behavior information. When you visit our website, we may collect information from you automatically through cookies or similar technology.</p>
          <p>We use cookies to improve your experience on our website, including keeping you signed in, remembering items in your shopping cart, and understanding how you use our website to refine its aesthetic and functional design.</p>
          <p>You can set your browser not to accept cookies, and you can remove cookies from your browser history. However, in a few cases, some of our website features may not function as intended as a result.</p>
        </div>
      )
    },
    {
      title: "Your Rights",
      snippet: "You have the right to access, update, or delete your personal information. You can also unsubscribe from our emails at any time.",
      fullContent: (
        <div className="space-y-4">
          <p>We believe you should have complete autonomy over your personal details. Depending on your location and local laws (such as GDPR or CCPA), you have the following rights:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>The right to access:</strong> You have the right to request copies of your personal data.</li>
            <li><strong>The right to rectification:</strong> You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.</li>
            <li><strong>The right to erasure:</strong> You have the right to request that we erase your personal data under certain conditions.</li>
            <li><strong>The right to restrict or object to processing:</strong> You have the right to request that we restrict the processing of your personal data, or object to our processing, under certain conditions.</li>
            <li><strong>The right to data portability:</strong> You have the right to request that we transfer the data we have collected to another organization, or directly to you, under certain conditions.</li>
          </ul>
        </div>
      )
    },
    {
      title: "Changes To This Policy",
      snippet: "We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated effective date.",
      fullContent: (
        <div className="space-y-4">
          <p>We keep our privacy policy under regular review to ensure it reflects current legal requirements and our evolving service practices. Any updates will be placed on this webpage.</p>
          <p>If we make material changes to how we treat your personal information, we will notify you through a notice on our homepage or via the email address specified in your account, prior to the change becoming effective.</p>
        </div>
      )
    },
    {
      title: "Contact Us",
      snippet: "If you have any questions about this Privacy Policy, feel free to reach out to us. We're here to help.",
      fullContent: (
        <div className="space-y-4">
          <p>If you have any questions about Papiah's privacy policy, the data we hold on you, or if you would like to exercise one of your data protection rights, please do not hesitate to contact our dedicated privacy officers.</p>
          <p><strong>Email:</strong> privacy@papiah.com</p>
          <p><strong>Address:</strong> Papiah Design Studio, Mumbai, India</p>
          <p>We endeavor to review and address all privacy-related inquiries within 48 hours.</p>
        </div>
      )
    }
  ];

  return (
    <div 
      className="flex flex-col min-h-screen relative select-none text-[#2F3B24] font-sans"
      style={{
        background: `radial-gradient(circle at 15% 20%, rgba(126,137,0,0.10) 0%, transparent 35%),
                     radial-gradient(circle at 85% 25%, rgba(126,137,0,0.06) 0%, transparent 30%),
                     radial-gradient(circle at 75% 80%, rgba(126,137,0,0.08) 0%, transparent 40%),
                     #F7F4EE`
      }}
    >
      {/* 1. TOP HEADER SCROLLING STRIP */}
      <MarqueeBanner />

      {/* 2. NAVIGATION BAR */}
      <Navbar />

      {/* 3. HERO SECTION */}
      <section className="relative w-full overflow-hidden">
        <div className="max-w-5xl mx-auto pt-12 pb-10 px-6 md:px-10 text-left">
          
          <h1 className="font-serif text-[44px] md:text-[80px] font-light text-[#2F3B24] tracking-tight leading-[1.05] mb-2">
            Privacy Policy
          </h1>
          
          <p className="font-handwriting text-[24px] md:text-[36px] text-[#B79CE5] ml-1 mb-6">
            Your privacy matters to us.
          </p>

          {/* Elegant Divider & Leaf SVG */}
          <div className="flex flex-col items-start mb-8">
            <div className="w-20 h-[1px] bg-[#2F3B24]/15 mb-3"></div>
            <svg className="w-7 h-7 text-[#2F3B24]/45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M4 20C7 17 12 11 14 5" />
              <path d="M8 15.5c1.5-1.5 3-2.5 4-2.5" />
              <path d="M11 12.5c1.5-1.5 3-2.5 4-2.5" />
              <path d="M14 9.5c1-1.5 2.5-2 3.5-2" />
              <path d="M6 18c1-1 2-1.5 3-1.5" />
            </svg>
          </div>

          <p className="text-[14.5px] md:text-[16px] text-[#2F3B24]/85 font-sans font-light leading-relaxed max-w-2xl mb-8">
            We are committed to protecting your personal information and being transparent about how it is collected, used, and safeguarded when you visit our website.
          </p>

          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/40 border border-[#2F3B24]/6 text-xs text-[#2F3B24]/80 font-sans tracking-wide">
            <svg className="w-4 h-4 text-[#2F3B24]/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0110 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0114 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
            </svg>
            <span>Last updated: June 2025</span>
          </div>

        </div>
      </section>

      {/* 4. TRUST STRIP */}
      <section className="w-full max-w-5xl mx-auto px-6 md:px-10 mb-10 relative z-10">
        <div className="bg-white/60 backdrop-blur-md rounded-[28px] border border-[#2F3B24]/8 p-8 md:p-10 shadow-[0_12px_36px_rgba(47,59,36,0.015)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
            {trustCards.map((card, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white border border-[#2F3B24]/5 flex items-center justify-center text-[#2F3B24]/75 shrink-0 shadow-xs">
                  {card.icon}
                </div>
                <div className="flex flex-col text-left">
                  <h3 className="font-serif text-[14px] md:text-[15px] font-medium text-[#2F3B24] leading-tight mb-1">
                    {card.title}
                  </h3>
                  <p className="text-[11px] text-gray-500 font-sans font-light leading-normal max-w-[170px]">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. POLICY CONTENT (ACCORDION STYLE) */}
      <section className="w-full max-w-5xl mx-auto px-6 md:px-10 mb-10 relative z-10">
        <div className="bg-white rounded-[32px] border border-[#2F3B24]/8 p-6 md:p-12 shadow-[0_16px_48px_rgba(47,59,36,0.02)] flex flex-col gap-6 md:gap-8">
          {policySections.map((sec, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="border-b border-[#2F3B24]/8 pb-6 md:pb-8 last:border-b-0 last:pb-0">
                
                {/* Accordion Header */}
                <div 
                  className="flex items-center justify-between gap-6 cursor-pointer group py-2"
                  onClick={() => toggleAccordion(idx)}
                >
                  <div className="flex items-center gap-6 flex-grow">
                    {/* Index Circle */}
                    <div className="w-9 h-9 rounded-full bg-[#F5F2EB] flex items-center justify-center text-xs font-sans font-light text-[#2F3B24] shrink-0">
                      {idx + 1}
                    </div>
                    
                    {/* Header Title */}
                    <h2 className="font-serif text-[17px] md:text-[19px] text-[#2F3B24] font-medium group-hover:text-[#B79CE5] transition-colors duration-300 w-1/3 min-w-[150px] md:min-w-[200px] text-left">
                      {sec.title}
                    </h2>
                    
                    {/* Snippet text (hidden on small screen) */}
                    <p className="hidden lg:block text-[12.5px] text-gray-500 font-sans font-light flex-grow leading-relaxed max-w-[480px] text-left">
                      {sec.snippet}
                    </p>
                  </div>
                  
                  {/* Expand/Collapse Plus Icon */}
                  <div className="w-6 h-6 flex items-center justify-center text-[#2F3B24]/40 group-hover:text-[#2F3B24] transition-colors duration-300 shrink-0">
                    {isOpen ? (
                      <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                      </svg>
                    ) : (
                      <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Accordion Content Body */}
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen ? 'max-h-[800px] opacity-100 mt-5' : 'max-h-0 opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="pl-0 md:pl-[60px] pr-2 pb-2 text-[13.5px] md:text-[14px] text-[#2F3B24]/80 font-sans font-light leading-relaxed max-w-3xl text-left">
                    <p className="lg:hidden mb-4 text-gray-500 italic">
                      {sec.snippet}
                    </p>
                    {sec.fullContent}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* 6. BOTTOM FOOTER */}
      <Footer />

    </div>
  );
};

export default PrivacyPolicyPage;
