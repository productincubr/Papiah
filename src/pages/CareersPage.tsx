import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { MarqueeBanner } from '../components/MarqueeBanner';
import { Footer } from '../components/Footer';

// Asset imports
import careersWorkspace from '../assets/careers_workspace.png';
import careersPackaging from '../assets/careers_packaging.png';
import careersCollaboration from '../assets/careers_collaboration.png';

interface Job {
  id: number;
  title: string;
  type: string;
  location: string;
  department: string;
  desc: string;
  responsibilities: string[];
  requirements: string[];
}

export const CareersPage: React.FC = () => {
  const [openJobId, setOpenJobId] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleJob = (id: number) => {
    setOpenJobId(openJobId === id ? null : id);
  };

  const scrollToRoles = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.getElementById('open-roles');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSection = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const features = [
    {
      title: "Meaningful Impact",
      desc: "Your work touches real lives and becomes part of people's everyday moments of gratitude and mindfulness.",
      icon: (
        <svg className="w-5 h-5 text-[#1C1B19]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      title: "Collaborative Team",
      desc: "A close-knit team of creatives, engineers, and slow-living advocates where every voice is heard and valued.",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    },
    {
      title: "Flexible & Remote",
      desc: "We support remote-first work layouts and flexible schedules, letting you design your own balance and focus.",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      )
    },
    {
      title: "Grow With Us",
      desc: "Take ownership of projects, experiment with fresh ideas, and grow your career alongside our expanding brand.",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
          <path d="M23 6l-9.5 9.5-5-5L1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      )
    }
  ];

  const hiringSteps = [
    {
      step: "1",
      title: "Apply",
      desc: "Submit your application and share your portfolio or work history with us. We want to know what makes you tick.",
      icon: (
        <svg className="w-6 h-6 text-[#1C1B19]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      )
    },
    {
      step: "2",
      title: "Conversation",
      desc: "We will hop on a casual Google Meet to chat about your background, career goals, and our culture and values.",
      icon: (
        <svg className="w-6 h-6 text-[#1C1B19]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      )
    },
    {
      step: "3",
      title: "Practical Exercise",
      desc: "A small, paid take-home exercise related to your day-to-day work, designed to see your strategic skills in action.",
      icon: (
        <svg className="w-6 h-6 text-[#1C1B19]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      )
    },
    {
      step: "4",
      title: "Welcome to Papiah",
      desc: "If we align, we will send an offer. We can't wait to introduce you to the team and co-create future collections.",
      icon: (
        <svg className="w-6 h-6 text-[#1C1B19]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
          <circle cx="12" cy="12" r="10" />
          <path d="m8 11.5 3 3 5-5" />
        </svg>
      )
    }
  ];

  const jobs: Job[] = [
    {
      id: 1,
      title: "Product Designer",
      type: "Full Time",
      location: "Remote",
      department: "Design & Creative",
      desc: "We are seeking a Product Designer to lead the end-to-end design of our paper products, journal layouts, and digital storefront interfaces. You will translate slow-living ideas into physical products and elegant web layouts.",
      responsibilities: [
        "Collaborate with the founding team to design covers, inner page layouts, and layouts for upcoming collections.",
        "Refine our web storefront to ensure a premium, editorial e-commerce checkout flow.",
        "Oversee typography choices, grid alignments, and colorways for all physical product launches.",
        "Create print-ready assets and coordinate with manufacturing partners to review material samples and binding methods."
      ],
      requirements: [
        "3+ years of professional product, graphic, or digital design experience.",
        "A strong portfolio highlighting clean grid systems, high-end editorial layouts, and beautiful typography.",
        "Experience in print design, packaging design, or luxury e-commerce layouts is highly valued.",
        "Proficiency in Figma, Adobe InDesign, Illustrator, and Photoshop."
      ]
    },
    {
      id: 2,
      title: "Frontend Developer",
      type: "Full Time",
      location: "Remote",
      department: "Engineering",
      desc: "We are looking for a Frontend Developer with an eye for design and interaction to implement our web applications. You will be responsible for bringing our premium, high-fidelity UI layout to life using modern tools.",
      responsibilities: [
        "Develop interactive, high-performance UI components using React, TypeScript, and Tailwind CSS.",
        "Implement premium animations, transitions, and micro-interactions using GSAP, Framer Motion, or CSS keyframes.",
        "Optimize codebase for maximum performance, responsive speed, accessibility, and visual detail.",
        "Collaborate closely with our Product Designer to translate Figma mockups into pixel-perfect pages."
      ],
      requirements: [
        "3+ years of experience building modern web apps with React and TypeScript.",
        "Deep familiarity with Tailwind CSS, Vite, and modern bundling practices.",
        "Experience with GSAP or other animation libraries to craft fluid scroll-based scrubbing and canvas animations.",
        "Strong visual empathy — you care about correct paddings, margins, shadows, and clean code."
      ]
    },
    {
      id: 3,
      title: "Growth Marketing Specialist",
      type: "Full Time",
      location: "Remote",
      department: "Marketing",
      desc: "We are looking for a marketing strategist to lead our customer acquisition and brand growth campaigns. You will run our digital campaigns, coordinate content launches, and build community relationships.",
      responsibilities: [
        "Plan and execute organic and paid customer acquisition campaigns across Meta, Pinterest, and Google.",
        "Coordinate email campaigns, newsletter strategies, and product drop announcements.",
        "Formulate partnerships with influencers, authors, and mindful lifestyle creators.",
        "Analyze metrics and run experiments to increase shop conversion rates and average order values."
      ],
      requirements: [
        "2+ years of performance or growth marketing experience for a direct-to-consumer (DTC) or lifestyle brand.",
        "Familiarity with Klaviyo, Shopify, Meta Ads Manager, and Google Analytics.",
        "Exceptional copywriting skills that align with a quiet, mindful, and elegant brand voice.",
        "Data-driven approach to testing channels, creatives, and landing page designs."
      ]
    },
    {
      id: 4,
      title: "Customer Experience Associate",
      type: "Part Time",
      location: "Remote",
      department: "Operations",
      desc: "We are looking for a warm, thoughtful Customer Experience Associate to support our community. You will serve as the primary voice of Papiah, assisting customers with orders, shipping details, and product advice.",
      responsibilities: [
        "Respond warmly and helpfully to customer inquiries via email, chat, and social media channels.",
        "Manage order modifications, returns, tracking requests, and shipping partner coordination.",
        "Identify common customer issues and share feedback with the product and packaging teams.",
        "Surprise our community with thoughtful touches, custom notes, and proactive resolutions."
      ],
      requirements: [
        "1+ years of customer service or client relations experience, ideally for a premium/luxury retailer.",
        "Excellent written communication skills with a compassionate, calm, and articulate tone.",
        "Familiarity with Gorgias, Zendesk, Shopify, or similar e-commerce platforms.",
        "Ability to work independently and manage time efficiently across a remote team layout."
      ]
    }
  ];

  // Pin/Thumb Tack Component
  const PushPin = () => (
    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
      {/* Tack Head */}
      <div className="w-3.5 h-3.5 rounded-full bg-[#A38B7C] shadow-[0_2.5px_4px_rgba(0,0,0,0.25)] border border-white/40"></div>
      {/* Pin shaft */}
      <div className="w-[1.2px] h-2.5 bg-gray-400 mx-auto -mt-[1px] shadow-xs"></div>
    </div>
  );

  return (
    <div 
      className="flex flex-col min-h-screen relative select-none text-[#1C1B19] font-sans"
      style={{ backgroundColor: "#FAF9F6" }}
    >
      {/* 1. TOP HEADER SCROLLING STRIP */}
      <MarqueeBanner />

      {/* 2. NAVIGATION BAR */}
      <Navbar />

      {/* 3. HERO SECTION */}
      <section className="w-full max-w-5xl mx-auto px-6 md:px-10 pt-12 pb-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline and Call to Actions */}
          <div className="lg:col-span-6 flex flex-col text-left justify-center">
            
            <h1 className="font-serif text-5xl md:text-[68px] font-light text-[#1C1B19] tracking-tight leading-[1.05] mb-4">
              Work That <br />
              Leaves A Mark.
            </h1>
            
            <p className="font-handwriting text-2.5xl md:text-[34px] text-[#B79CE5] leading-normal ml-1 mb-8 max-w-[480px]">
              Join us in creating thoughtful journals, planners, and keepsakes that become part of people's stories.
            </p>

            <div className="flex flex-wrap gap-4 items-center mt-2">
              <button 
                onClick={scrollToRoles}
                className="bg-[#CBD83B] hover:bg-[#b8c634] active:scale-[0.98] text-[#2E3327] font-sans font-bold tracking-[0.2em] text-[10.5px] py-4 px-8 uppercase transition-all duration-300 rounded-[12px] cursor-pointer shadow-[0_6px_20px_rgba(203,216,59,0.2)] hover:shadow-[0_8px_25px_rgba(203,216,59,0.35)]"
              >
                View Open Roles
              </button>
              
              <button 
                onClick={(e) => scrollToSection(e, 'culture')}
                className="border border-[#1C1B19]/40 hover:border-[#1C1B19] hover:bg-[#1C1B19]/4 active:scale-[0.98] text-[#1C1B19] font-sans font-bold tracking-[0.2em] text-[10.5px] py-4 px-8 uppercase transition-all duration-300 rounded-[12px] cursor-pointer"
              >
                Learn About Our Culture
              </button>
            </div>

          </div>

          {/* Right Column: Mood Board / Collage Layout */}
          <div className="lg:col-span-6 relative h-[480px] sm:h-[550px] w-full max-w-[500px] lg:max-w-none mx-auto mt-8 lg:mt-0">
            
            {/* Collage 1: Our Mission Pinned Paper */}
            <div className="absolute top-4 left-4 w-[160px] sm:w-[190px] bg-white p-5 rotate-[-4deg] shadow-[0_8px_24px_rgba(0,0,0,0.04)] border border-[#1C1B19]/5 z-10 transition-transform duration-300 hover:rotate-0 hover:z-30">
              <PushPin />
              <h3 className="font-serif text-sm font-medium text-[#1C1B19] border-b border-[#1C1B19]/10 pb-1.5 mb-2.5 tracking-wide italic">Our Mission</h3>
              <p className="text-[11px] sm:text-[11.5px] text-gray-500 font-sans font-light leading-relaxed">
                To help people capture, preserve, and celebrate life's most meaningful moments.
              </p>
            </div>

            {/* Collage 2: Our People Pinned Paper */}
            <div className="absolute top-0 right-4 w-[160px] sm:w-[190px] bg-[#F3ECFC] p-5 rotate-[3deg] shadow-[0_8px_24px_rgba(0,0,0,0.04)] border border-[#B79CE5]/20 z-10 transition-transform duration-300 hover:rotate-0 hover:z-30">
              <PushPin />
              <h3 className="font-serif text-sm font-medium text-[#1C1B19] border-b border-[#1C1B19]/10 pb-1.5 mb-2.5 tracking-wide italic">Our People</h3>
              <p className="text-[11px] sm:text-[11.5px] text-gray-650 font-sans font-light leading-relaxed">
                We're a small team of dreamers, makers, designers, and storytellers who love detail.
              </p>
            </div>

            {/* Collage 3: Polaroid - Workspace Photo */}
            <div className="absolute top-[170px] left-[32%] -translate-x-1/2 w-[160px] sm:w-[180px] bg-white p-2.5 pb-7 rotate-[-6deg] shadow-[0_12px_28px_rgba(0,0,0,0.06)] border border-gray-100 z-20 transition-transform duration-300 hover:rotate-0 hover:scale-105 hover:z-35">
              <PushPin />
              <div className="w-full aspect-[4/5] bg-gray-100 overflow-hidden mb-2.5">
                <img src={careersWorkspace} alt="Collaborative desk workspace" className="w-full h-full object-cover" />
              </div>
              <span className="font-sans text-[11px] font-medium uppercase tracking-wider text-[#1C1B19]/60">creating ideas</span>
            </div>

            {/* Collage 4: Our Promise Pinned Paper */}
            <div className="absolute bottom-12 left-2 w-[150px] sm:w-[175px] bg-[#F7F2E8] p-5 rotate-[5deg] shadow-[0_8px_24px_rgba(0,0,0,0.04)] border border-[#1C1B19]/5 z-10 transition-transform duration-300 hover:rotate-0 hover:z-30">
              <PushPin />
              <h3 className="font-serif text-sm font-medium text-[#1C1B19] border-b border-[#1C1B19]/10 pb-1.5 mb-2.5 tracking-wide italic">Our Promise</h3>
              <p className="text-[10.5px] sm:text-[11px] text-gray-500 font-sans font-light leading-relaxed space-y-1">
                <span>• Thoughtful design</span><br />
                <span>• Quality you can feel</span><br />
                <span>• Stories that last</span>
              </p>
            </div>

            {/* Collage 5: Polaroid - Packaging Photo */}
            <div className="absolute bottom-4 right-0 w-[170px] sm:w-[190px] bg-white p-2.5 pb-7 rotate-[7deg] shadow-[0_12px_28px_rgba(0,0,0,0.06)] border border-gray-100 z-20 transition-transform duration-300 hover:rotate-0 hover:scale-105 hover:z-35">
              <PushPin />
              <div className="w-full aspect-[4/5] bg-gray-100 overflow-hidden mb-2.5">
                <img src={careersPackaging} alt="Mindful desk flatlay" className="w-full h-full object-cover" />
              </div>
              <span className="font-sans text-[11px] font-medium uppercase tracking-wider text-[#1C1B19]/60">finished details</span>
            </div>

            {/* Collage 6: Polaroid - Real Notebook Photo */}
            <div className="absolute top-[220px] -right-4 w-[140px] sm:w-[155px] bg-white p-2.5 pb-6 rotate-[-3deg] shadow-[0_12px_28px_rgba(0,0,0,0.05)] border border-gray-100 z-10 transition-transform duration-300 hover:rotate-0 hover:scale-105 hover:z-30">
              <PushPin />
              <div className="w-full aspect-[4/5] bg-gray-100 overflow-hidden mb-2">
                <img src={careersCollaboration} alt="Open book styling" className="w-full h-full object-cover" />
              </div>
              <span className="font-sans text-[10px] font-medium uppercase tracking-wider text-[#1C1B19]/60">natural textures</span>
            </div>

          </div>

        </div>
      </section>

      {/* 4. WHY JOIN PAPIAH SECTION */}
      <section className="w-full max-w-5xl mx-auto px-6 md:px-10 py-10 border-t border-[#1C1B19]/8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-[40px] text-[#1C1B19] font-light tracking-wide inline-block relative pb-3">
            Why Join Papiah?
            <span className="absolute bottom-0 left-1/4 right-1/4 h-[1px] bg-[#1C1B19]/20"></span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => (
            <div 
              key={idx} 
              className="bg-[#F7F2E8]/60 hover:bg-[#F7F2E8] border border-[#1C1B19]/6 rounded-[20px] p-6 text-left flex flex-col items-start transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(47,58,40,0.03)]"
            >
              <div className="w-10 h-10 rounded-full bg-white border border-[#1C1B19]/5 flex items-center justify-center text-[#1C1B19]/85 mb-5 shrink-0 shadow-xs">
                {feat.icon}
              </div>
              <h3 className="font-serif text-[15.5px] md:text-[16px] text-[#1C1B19] font-medium leading-tight mb-2.5">
                {feat.title}
              </h3>
              <p className="text-[12px] text-gray-500 font-sans font-light leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. LIFE AT PAPIAH SECTION */}
      <section id="culture" className="w-full max-w-5xl mx-auto px-6 md:px-10 py-10 border-t border-[#1C1B19]/8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Content Narrative */}
          <div className="lg:col-span-5 flex flex-col text-left justify-center">
            
            <h2 className="font-serif text-3xl md:text-[40px] text-[#1C1B19] font-light tracking-wide mb-2">
              Life At Papiah
            </h2>
            <div className="w-12 h-[1px] bg-[#1C1B19]/35 mb-6"></div>

            <div className="space-y-5 text-[13.5px] md:text-[14px] text-gray-500 font-sans font-light leading-relaxed">
              <p>
                We are a collection of writers, designers, developers, and makers who care deeply about the details. We make tools that encourage people to slow down, write down, and reflect on their stories.
              </p>
              <p>
                From design brainstorms to checking package textures, everything we make is guided by intentionality, craftsmanship, and love for what we create.
              </p>
              <p>
                Our team layout is flexible, creative, and collaborative. We avoid office politics and corporate red tape, prioritizing honest ideas, personal growth, and work that makes a real impact.
              </p>
            </div>

            <p className="font-handwriting text-2.5xl text-[#B79CE5] mt-8 leading-normal max-w-[320px]">
              "We believe in building a brand that feels personal — because it is."
            </p>

          </div>

          {/* Right Column: Image Grid Masonry */}
          <div className="lg:col-span-7 grid grid-cols-12 gap-4">
            {/* Left large photo */}
            <div className="col-span-7 rounded-2xl overflow-hidden aspect-[4/5] bg-gray-100 shadow-sm border border-[#1C1B19]/5 hover:scale-[1.01] transition-transform duration-350">
              <img src={careersCollaboration} alt="Team collaboration" className="w-full h-full object-cover" />
            </div>

            {/* Right two stacked photos */}
            <div className="col-span-5 flex flex-col gap-4">
              {/* Workspace top */}
              <div className="rounded-2xl overflow-hidden aspect-[1.1] bg-gray-100 shadow-sm border border-[#1C1B19]/5 hover:scale-[1.01] transition-transform duration-350">
                <img src={careersWorkspace} alt="Mindful design planning" className="w-full h-full object-cover" />
              </div>
              {/* Product bottom */}
              <div className="rounded-2xl overflow-hidden aspect-[1.1] bg-gray-100 shadow-sm border border-[#1C1B19]/5 hover:scale-[1.01] transition-transform duration-350">
                <img src={careersPackaging} alt="Mindful stationery layouts" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. OPEN POSITIONS SECTION */}
      <section id="open-roles" className="w-full max-w-5xl mx-auto px-6 md:px-10 py-10 border-t border-[#1C1B19]/8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-[40px] text-[#1C1B19] font-light tracking-wide inline-block relative pb-3">
            Open Positions
            <span className="absolute bottom-0 left-1/4 right-1/4 h-[1px] bg-[#1C1B19]/20"></span>
          </h2>
        </div>

        {/* Job Listings Accordion Box */}
        <div className="bg-white rounded-3xl border border-[#1C1B19]/8 shadow-[0_12px_36px_rgba(47,58,40,0.015)] overflow-hidden">
          {jobs.map((job) => {
            const isOpen = openJobId === job.id;
            return (
              <div 
                key={job.id} 
                className="border-b border-[#1C1B19]/8 last:border-b-0"
              >
                {/* Header Row */}
                <div 
                  className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:px-8 sm:py-6 cursor-pointer transition-colors duration-250 ${
                    isOpen ? 'bg-[#F7F2E8]/40' : 'hover:bg-[#F7F2E8]/25'
                  }`}
                  onClick={() => toggleJob(job.id)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 flex-grow text-left">
                    <h3 className="font-serif text-[17px] md:text-[18.5px] text-[#1C1B19] font-semibold w-full sm:w-[260px] shrink-0">
                      {job.title}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-sans font-medium tracking-wider text-gray-500 uppercase px-2.5 py-1 rounded bg-[#F7F2E8] border border-[#1C1B19]/5">
                        {job.department}
                      </span>
                      <span className="text-[11px] text-gray-400">•</span>
                      <span className="text-[11px] text-gray-500 font-sans tracking-wide">
                        {job.location}
                      </span>
                      <span className="text-[11px] text-gray-400">•</span>
                      <span className="text-[11px] text-gray-500 font-sans tracking-wide">
                        {job.type}
                      </span>
                    </div>
                  </div>

                  {/* Expand Plus/Minus Icon */}
                  <div className="self-end sm:self-auto w-6 h-6 flex items-center justify-center text-[#1C1B19]/45 transition-colors duration-200">
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

                {/* Expanded Details Body */}
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen ? 'max-h-[1200px] opacity-100 border-t border-[#1C1B19]/8 bg-white' : 'max-h-0 opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="p-6 sm:p-8 text-left text-[13.5px] md:text-[14px] text-gray-500 font-sans font-light leading-relaxed max-w-4xl space-y-6">
                    <p className="text-gray-700 italic text-[14px]">
                      {job.desc}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
                      {/* Responsibilities */}
                      <div className="space-y-3">
                        <h4 className="font-serif text-sm font-semibold tracking-wider text-[#1C1B19] uppercase">Key Responsibilities</h4>
                        <ul className="list-disc pl-5 space-y-2">
                          {job.responsibilities.map((resp, i) => (
                            <li key={i}>{resp}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Requirements */}
                      <div className="space-y-3">
                        <h4 className="font-serif text-sm font-semibold tracking-wider text-[#1C1B19] uppercase">What We Look For</h4>
                        <ul className="list-disc pl-5 space-y-2">
                          {job.requirements.map((req, i) => (
                            <li key={i}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Apply Button Inside */}
                    <div className="pt-6 border-t border-[#1C1B19]/5 flex justify-start">
                      <a 
                        href={`mailto:careers@papiah.com?subject=Application for ${job.title} Role`}
                        className="bg-[#CBD83B] hover:bg-[#b8c634] active:scale-[0.98] text-[#2E3327] font-sans font-bold tracking-[0.2em] text-[10px] py-3.5 px-7 uppercase transition-all duration-300 rounded-[12px] shadow-[0_4px_12px_rgba(203,216,59,0.15)] hover:shadow-[0_6px_18px_rgba(203,216,59,0.25)]"
                      >
                        Apply For This Role
                      </a>
                    </div>

                  </div>
                </div>

              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <p className="text-[12.5px] text-gray-500 font-sans font-light italic mb-2">
            Don't see your perfect fit but love what we are co-creating?
          </p>
          <a 
            href="mailto:careers@papiah.com?subject=General Application"
            className="text-[12px] font-sans font-bold tracking-widest text-[#B79CE5] hover:text-[#a586d6] uppercase pb-1 border-b border-[#B79CE5]/40 hover:border-[#B79CE5] transition-all"
          >
            VIEW ALL OPEN ROLES →
          </a>
        </div>
      </section>

      {/* 7. HIRING PROCESS SECTION */}
      <section className="w-full max-w-5xl mx-auto px-6 md:px-10 py-10 border-t border-[#1C1B19]/8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-[40px] text-[#1C1B19] font-light tracking-wide inline-block relative pb-3">
            Our Hiring Process
            <span className="absolute bottom-0 left-1/4 right-1/4 h-[1px] bg-[#1C1B19]/20"></span>
          </h2>
        </div>

        {/* Steps Grid Timeline */}
        <div className="relative">
          {/* Horizontal connecting dotted line on Desktop */}
          <div className="hidden lg:block absolute top-[44px] left-[12%] right-[12%] h-[1px] border-t border-dashed border-[#1C1B19]/20 z-0"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {hiringSteps.map((step, idx) => (
              <div 
                key={idx} 
                className="bg-[#F7F2E8]/60 border border-[#1C1B19]/6 rounded-[22px] p-6 text-center flex flex-col items-center hover:bg-[#F7F2E8] transition-all duration-300 hover:shadow-[0_12px_28px_rgba(47,58,40,0.025)]"
              >
                {/* Step Circle Bubble */}
                <div className="w-7 h-7 rounded-full bg-[#1C1B19] text-white flex items-center justify-center text-xs font-sans font-semibold mb-4 shadow-sm">
                  {step.step}
                </div>

                {/* Icon Wrapper */}
                <div className="w-11 h-11 rounded-full bg-white border border-[#1C1B19]/5 flex items-center justify-center text-[#1C1B19] mb-4 shadow-xs">
                  {step.icon}
                </div>

                <h3 className="font-serif text-[15px] md:text-[15.5px] text-[#1C1B19] font-medium leading-tight mb-2">
                  {step.title}
                </h3>
                
                <p className="text-[11.5px] text-gray-500 font-sans font-light leading-relaxed max-w-[200px]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CTA BANNER - DARK BRAND CHARCOAL GRADIENT */}
      <section className="w-full max-w-5xl mx-auto px-6 md:px-10 mb-10 relative z-10">
        <div className="bg-gradient-to-br from-[#1C1B19] via-[#333230] to-[#1C1B19] rounded-[32px] p-8 md:p-14 relative overflow-hidden shadow-[0_20px_48px_rgba(28,27,25,0.15)]">
          
          {/* Subtle atmospheric glow effects */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#B79CE5]/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-left">
            
            <div className="flex-1 max-w-lg">
              <h2 className="font-serif text-3xl md:text-[42px] text-white font-light tracking-wide leading-tight mb-3">
                Build Something <br className="hidden sm:inline" />
                Meaningful With Us.
              </h2>
              <p className="text-[12.5px] md:text-sm text-white/70 font-sans font-light leading-relaxed">
                If you love detail, design, slow-living products, and want to build a personal brand, we would love to hear from you. Explore our open positions and send in your application today.
              </p>
            </div>

            <div className="shrink-0">
              <button 
                onClick={scrollToRoles}
                className="bg-[#CBD83B] hover:bg-[#b8c634] active:scale-[0.98] text-[#2E3327] font-sans font-bold tracking-[0.18em] text-[11px] py-4 px-8 rounded-[12px] uppercase transition-all duration-200 cursor-pointer shadow-[0_6px_20px_rgba(203,216,59,0.2)] hover:shadow-[0_8px_25px_rgba(203,216,59,0.35)] flex items-center justify-center whitespace-nowrap"
              >
                See Open Roles
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 9. BOTTOM FOOTER */}
      <Footer />

    </div>
  );
};

export default CareersPage;
