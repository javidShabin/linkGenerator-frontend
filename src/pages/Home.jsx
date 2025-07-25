import React from "react";
import { Link } from "react-router-dom";
import heroImage from "../../public/hero.svg";
import { useSelector } from "react-redux";

const Home = () => {
  const { isUserExist } = useSelector((state) => state.user);

  return (
    <main className="bg-gradient-to-br from-white via-[#f9f9ff] to-[#f3f3ff] text-gray-800">
      {/* Hero Section */}
      <section className="w-full min-h-screen flex flex-col lg:flex-row items-center justify-between px-6 md:px-16 py-16">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-[#3f3d56]">
            Generate Custom{" "}
            <span className="text-[#dd63ff]">WhatsApp Links</span>
            <br />& QR Codes Instantly
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-lg">
            Tailored for freelancers, creators, and businesses to create branded
            WhatsApp chat links with optional QR, history, and landing pages.
          </p>
          <div className="flex gap-4">
            <Link to="/user/link-generating">
              <button className="bg-[#dd63ff] hover:bg-[#c755e2] text-white px-6 py-3 text-lg rounded-2xl shadow-lg transition">
                🚀 Get Started
              </button>
            </Link>

            {/* 🔐 Show Login button only if user is NOT authenticated */}
            {!isUserExist && (
              <Link to="/login-page">
                <button
                  variant="outline"
                  className="px-6 py-3 text-lg rounded-2xl border-gray-400 text-[#3f3d56] hover:bg-gray-100"
                >
                  🔐 Login
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* Hero Image */}
        <div className="flex-1 mt-10 lg:mt-0">
          <img
            src={heroImage}
            alt="WhatsApp Tool"
            className="w-full max-w-xl"
          />
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 md:px-16 bg-white">
        <h2 className="text-3xl font-bold text-center mb-14 text-[#3f3d56]">
          ✨ Core Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              title: "📞 Link Generator",
              desc: "Create click-to-chat links with message & number. Share anywhere instantly.",
            },
            {
              title: "📲 QR Code Generator",
              desc: "Generate high-res QR codes with custom color/logo (Pro users).",
            },
            {
              title: "📁 History & Edit",
              desc: "Logged-in users can view, edit, or delete previously created links.",
            },
            {
              title: "🌐 Branded Pages",
              desc: "Premium landing pages to match your identity. Drive conversions.",
            },
            {
              title: "🛡 Secure Auth",
              desc: "Email/Google login with JWT-based secure dashboard access.",
            },
            {
              title: "📊 Admin Insights",
              desc: "Admin dashboard to manage users, usage stats, and feature control.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="rounded-2xl p-6 bg-[#f9f9ff] border border-gray-100 shadow hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold text-[#3f3d56] mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#dd63ff] py-20 px-6 md:px-16 text-white text-center rounded-t-3xl">
        <h2 className="text-3xl font-bold mb-4">
          Upgrade to Pro for ₹199/year
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Unlock QR customization, branded pages, and usage history. One-time
          payment. No monthly fees.
        </p>
        <Link to="/pricing">
          <button className="bg-white text-[#dd63ff] font-semibold px-8 py-3 text-lg rounded-xl shadow-lg hover:bg-gray-100 transition">
            💎 View Pricing
          </button>
        </Link>
      </section>
    </main>
  );
};

export default Home;
