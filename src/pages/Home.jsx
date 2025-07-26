import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="bg-gradient-to-br from-[#0f172a] via-[#131925] to-[#0d1528] text-[#e5e7eb] min-h-screen w-full">
      {/* Hero Section */}
      <section className="flex items-center justify-center text-center px-6 md:px-16 py-24">
        <div className="max-w-3xl space-y-6 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white">
            Create Elegant{" "}
            <span className="text-[#14b8a6]">WhatsApp Links</span> & QR Codes
          </h1>
          <p className="text-lg md:text-xl text-[#94a3b8]">
            A premium solution for freelancers and creators to craft personalized links, manage engagement, and build trust.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/user/link-generating">
              <button className="bg-[#14b8a6] hover:bg-[#0d9488] text-white px-6 py-3 text-lg rounded-xl shadow-xl transition-all font-semibold">
                🚀 Get Started
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 md:px-16">
        <h2 className="text-3xl font-bold text-center mb-14 text-[#14b8a6]">
          ✨ Premium Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              title: "📞 Link Generator",
              desc: "Create WhatsApp links with pre-filled messages that feel personal and professional.",
            },
            {
              title: "📲 QR Code Generator",
              desc: "Custom-designed QR codes with high-definition output and brand integration.",
            },
            {
              title: "📁 History & Edit",
              desc: "Track, manage, and update your links effortlessly anytime.",
            },
            {
              title: "🌐 Branded Pages",
              desc: "Personalized landing pages to reflect your business style and tone.",
            },
            {
              title: "🛡 Secure Auth",
              desc: "OAuth & JWT-based authentication to protect your assets.",
            },
            {
              title: "📊 Admin Insights",
              desc: "See real-time analytics and optimize engagement from your dashboard.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="rounded-2xl p-6 bg-white/5 border border-white/10 backdrop-blur-xl text-white shadow-lg hover:scale-[1.02] transition duration-300"
            >
              <h3 className="text-xl font-semibold text-[#14b8a6] mb-2">
                {feature.title}
              </h3>
              <p className="text-[#cbd5e1]">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-tr from-[#1e293b] via-[#0f172a] to-[#1e293b] py-20 px-6 md:px-16 text-center rounded-t-3xl shadow-inner">
        <h2 className="text-3xl font-bold mb-4 text-white">
          Upgrade to Pro – ₹199/year
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto text-[#94a3b8]">
          Unlock advanced customization, branded experiences, and insightful
          analytics — all with one premium plan. No subscriptions. No limits.
        </p>
        <Link to="/user/check-out">
          <button className="bg-[#14b8a6] hover:bg-[#0d9488] text-white font-semibold px-8 py-3 text-lg rounded-xl shadow-lg transition">
            💎 View Pricing
          </button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-[#64748b]">
        &copy; {new Date().getFullYear()} YourBrand. All rights reserved.
      </footer>
    </main>
  );
};

export default Home;
