import React from "react";
import { Link } from "react-router-dom";
import heroImage from "../../public/whatsapp.png";

const Home = () => {

  return (
    <main className="bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white min-h-screen w-full">
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between px-6 md:px-16 py-20">
        {/* Left Content */}
        <div className="flex-1 space-y-6 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Create Stunning{" "}
            <span className="text-purple-400">WhatsApp Links</span> & QR Codes
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-lg">
            A modern toolkit for freelancers, creators & brands to build WhatsApp links, QR codes, and branded landing pages.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link to="/user/link-generating">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 text-lg rounded-xl shadow-lg transition-all">
                🚀 Get Started
              </button>
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 mt-12 lg:mt-0">
          <img
            src={heroImage}
            alt="Hero"
            className="w-full max-w-xl drop-shadow-2xl"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 md:px-16">
        <h2 className="text-3xl font-bold text-center mb-14 text-purple-300">
          ✨ Core Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              title: "📞 Link Generator",
              desc: "Create click-to-chat WhatsApp links with prefilled messages.",
            },
            {
              title: "📲 QR Code Generator",
              desc: "Generate custom QR codes with your own branding (Pro users).",
            },
            {
              title: "📁 History & Edit",
              desc: "Edit or delete your previously created links with ease.",
            },
            {
              title: "🌐 Branded Pages",
              desc: "Customize landing pages to match your style and brand.",
            },
            {
              title: "🛡 Secure Auth",
              desc: "JWT-secured authentication via email & Google login.",
            },
            {
              title: "📊 Admin Insights",
              desc: "Track usage stats and manage users with admin tools.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="rounded-2xl p-6 bg-white/10 border border-white/20 backdrop-blur-md text-white shadow-lg hover:scale-[1.02] transition"
            >
              <h3 className="text-xl font-semibold text-purple-300 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-200">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call To Action */}
      <section className="bg-black py-20 px-6 md:px-16 text-white text-center rounded-t-3xl">
        <h2 className="text-3xl font-bold mb-4">
          Upgrade to Pro – ₹199/year
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto text-white/90">
          Get access to premium features like QR customization, branded pages, and link history. One-time payment — no subscriptions.
        </p>
        <Link to="/user/check-out">
          <button className="bg-white text-purple-700 font-semibold px-8 py-3 text-lg rounded-xl shadow-lg hover:bg-gray-100 transition">
            💎 View Pricing
          </button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-white/60">
        &copy; {new Date().getFullYear()} YourBrand. All rights reserved.
      </footer>
    </main>
  );
};

export default Home;
