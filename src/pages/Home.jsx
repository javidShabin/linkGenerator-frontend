import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white min-h-screen w-full">
      {/* Hero Section (Text Only) */}
      <section className="flex items-center justify-center text-center px-6 md:px-16 py-24">
        <div className="max-w-3xl space-y-6 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Build Beautiful{" "}
            <span className="text-[#00ffd0]">WhatsApp Links</span> & QR Codes
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            The ultimate toolkit for freelancers, creators & brands to design,
            track, and share personalized links.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/user/link-generating">
              <button className="bg-[#00ffd0] hover:bg-[#0fffc8] text-[#0f2027] px-6 py-3 text-lg rounded-xl shadow-lg transition-all font-semibold">
                🚀 Get Started
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 md:px-16">
        <h2 className="text-3xl font-bold text-center mb-14 text-[#00ffd0]">
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
              className="rounded-2xl p-6 bg-white/10 border border-white/20 backdrop-blur-md text-white shadow-xl hover:scale-[1.02] transition"
            >
              <h3 className="text-xl font-semibold text-[#00ffd0] mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-200">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      {/* CTA Section */}
      <section className="bg-gradient-to-tr from-[#102b35] via-[#1c3c47] to-[#294e5f] py-20 px-6 md:px-16 text-white text-center rounded-t-3xl shadow-inner">
        <h2 className="text-3xl font-bold mb-4">Upgrade to Pro – ₹199/year</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto text-white/90">
          Unlock premium features like QR customization, branded pages, and
          analytics with a one-time payment. No hidden fees.
        </p>
        <Link to="/user/check-out">
          <button className="bg-[#00ffd0] hover:bg-[#0fffc8] text-[#0f2027] font-semibold px-8 py-3 text-lg rounded-xl shadow-lg transition">
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
