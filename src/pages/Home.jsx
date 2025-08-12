import React, { useEffect, useRef, useState } from "react";
import { BackgroundLines } from "../components/ui/BackgroundLines";
import { HoverEffect } from "../components/ui/card-hover-effect";
import { Link } from "react-router-dom";
import { Vortex } from "../components/ui/Vortext";

const Home = () => {
  const [atTop, setAtTop] = useState(true);
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  const items = [
    {
      title: "📞 Link Generator",
      description:
        "Create WhatsApp links with pre-filled messages that feel personal and professional.",
      link: "/create",
    },
    {
      title: "📲 QR Code Generator",
      description:
        "Custom-designed QR codes with high-definition output and brand integration.",
      link: "/dashboard",
    },
    {
      title: "📁 History & Edit",
      description: "Track, manage, and update your links effortlessly anytime.",
      link: "/analytics",
    },
    {
      title: "🌐 Branded Pages",
      description:
        "Personalized landing pages to reflect your business style and tone.",
      link: "/Brand",
    },
    {
      title: "🛡 Secure Auth",
      description: "OAuth & JWT-based authentication to protect your assets.",
      link: "/auth",
    },
    {
      title: "📊 Admin Insights",
      description:
        "See real-time analytics and optimize engagement from your dashboard.",
      link: "/admin",
    },
  ];

  // Detect scrollY === 0
  useEffect(() => {
    const handleScroll = () => setAtTop(window.scrollY === 0);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for Upgrade section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <main className="bg-[#05030e]">
        {/* Hero Section */}
        <div className="relative h-[91vh] bg-[#05030e] text-white overflow-hidden">
          <Vortex
            particleCount={600}
            baseHue={180}
            baseSpeed={0.5}
            rangeSpeed={1.2}
            baseRadius={1}
            rangeRadius={2}
            rangeY={100}
            containerClassName="rounded-lg overflow-hidden"
            className="text-center text-white px-4"
          />

          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">
            <h1
              className={`text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight transition-all duration-700 ease-out ${
                atTop ? "animate-fade-slide-up" : "opacity-30 scale-95 blur-sm"
              }`}
            >
              Welcome to <span className="text-purple-400">Whats Link</span>
            </h1>

            <p
              className={`text-lg md:text-xl text-gray-400 max-w-2xl transition-all duration-700 ease-out ${
                atTop
                  ? "animate-fade-slide-up delay-150"
                  : "opacity-20 blur-sm scale-95"
              }`}
            >
              A premium solution for freelancers and creators to craft
              personalized links, manage engagement, and build trust.
            </p>

            <Link to={"/user/link-generate"}>
              <button
                className={`mt-8 px-8 py-3 rounded-full bg-purple-600 hover:bg-purple-700 transition duration-300 text-white text-lg font-semibold shadow-xl`}
              >
                🚀 Get Started
              </button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="bg-[#05030e] px-3">
          <h2 className="text-3xl font-bold text-center mb-5 text-purple-500">
            ✨ Features
          </h2>
          <HoverEffect items={items} />
        </div>

        {/* Pro Upgrade Section with animation on view */}
        <section
          ref={sectionRef}
          className={`bg-gradient-to-tr from-[#05030e] via-[#05030e] to-[#05030e] py-20 px-6 md:px-16 text-center rounded-t-3xl shadow-inner transition-all duration-1000 ${
            inView ? "animate-fade-up" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl font-bold mb-4 text-white">
            Upgrade to Pro – ₹199/year
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-[#94a3b8]">
            Unlock advanced customization, branded experiences, and insightful
            analytics — all with one premium plan. No subscriptions. No limits.
          </p>
          <Link to="/user/check-out">
            <button className="bg-purple-600 hover:bg-purple-500 text-white font-semibold px-8 py-3 text-lg rounded-xl shadow-lg transition">
              💎 View Pricing
            </button>
          </Link>
        </section>

        {/* Footer */}
        <footer className="py-6 text-center text-sm text-[#64748b]">
          &copy; {new Date().getFullYear()} Tegrand Info Tech. All rights
          reserved.
        </footer>
      </main>
    </>
  );
};

export default Home;
