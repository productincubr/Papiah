import React from 'react';

export const CollectionFeaturesStrip: React.FC = () => {
  const features = [
    {
      icon: (
        <svg className="w-6 h-6 text-[#8E76B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          <path d="M2 12h20" />
        </svg>
      ),
      title: "Mindful by design",
      description: "Tools that help you slow down and be present."
    },
    {
      icon: (
        <svg className="w-6 h-6 text-[#8E76B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
      title: "Made to inspire",
      description: "Beautiful layouts that spark creativity."
    },
    {
      icon: (
        <svg className="w-6 h-6 text-[#8E76B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "Thoughtful gifting",
      description: "Meaningful gifts for every occasion."
    },
    {
      icon: (
        <svg className="w-6 h-6 text-[#8E76B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      ),
      title: "Sustainable choice",
      description: "Responsibly made with care for our planet."
    }
  ];

  return (
    <section className="w-full bg-[#FAF9F6] border-t border-papiah-grid/50 pt-[20px] pb-12 select-none relative z-10 paper-texture">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-8 xl:gap-12">
          {features.map((feat, index) => (
            <div key={index} className="flex items-start gap-4 text-left">
              <div className="shrink-0 mt-0.5">
                {feat.icon}
              </div>
              <div className="flex flex-col gap-1.5">
                <h4 className="font-serif text-[15.5px] md:text-[16px] text-[#2C2B29] font-medium leading-tight">
                  {feat.title}
                </h4>
                <p className="text-[12px] text-gray-500 font-sans font-light leading-relaxed max-w-[220px]">
                  {feat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
