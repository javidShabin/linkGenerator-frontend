import React from "react";

const BrandPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] px-4 py-12 flex items-center justify-center">
      <div className="w-full max-w-xl bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 text-[#e5e7eb] text-center">
        
        {/* Profile Picture */}
        <div className="flex justify-center mb-6">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="w-32 h-32 md:w-36 md:h-36 rounded-full border-4 border-[#14b8a6] shadow-xl object-cover"
          />
        </div>

        {/* Welcome Heading */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#14b8a6] mb-4">
          👋 Hi, I'm Javid
        </h1>

        {/* Custom Message */}
        <p className="text-gray-300 text-lg md:text-xl mb-6">
          I’m available for a quick chat! Whether it’s about your order, collaboration, or just saying hi — I’m happy to hear from you.
        </p>

        {/* Call to Action */}
        <div className="space-y-4">
          <p className="text-gray-400 text-sm md:text-base">
            📲 Tap the button below and reach out to me directly on WhatsApp.
          </p>

          <a
            href="https://wa.me/919526223034?text=Hi%20Javid!%20I%20just%20visited%20your%20page."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#14b8a6] hover:bg-[#0d9488] text-black font-bold py-3 px-8 rounded-xl transition duration-300 shadow-md"
          >
            💬 Chat Now
          </a>
        </div>

        {/* Optional Footer */}
        <div className="mt-10 text-sm text-gray-500">
          Powered by <span className="text-[#14b8a6] font-semibold">WhatsGenie</span>
        </div>
      </div>
    </div>
  );
};

export default BrandPage;
