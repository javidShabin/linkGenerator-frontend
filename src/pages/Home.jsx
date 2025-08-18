import React, { useEffect, useRef, useState } from "react";
import { BackgroundLines } from "../components/ui/BackgroundLines";
import { HoverEffect } from "../components/ui/card-hover-effect";
import { Link } from "react-router-dom";
import { Vortex } from "../components/ui/Vortext";
import { useBranding } from "../context/BrandingContext";

const Home = () => {
  const [atTop, setAtTop] = useState(true);
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  const { buttonColor, logoText, logoUrl, logoColor, textColor } = useBranding();

  const items = [
    {
      title: "📞 Link Generator",
      description:
        "Create WhatsApp links with pre-filled messages that feel personal and professional.",
    },
    {
      title: "📲 QR Code Generator",
      description:
        "Custom-designed QR codes with high-definition output and brand integration.",
    },
    {
      title: "📁 History & Edit",
      description: "Track, manage, and update your links effortlessly anytime.",
    },
    {
      title: "🌐 Branded Pages",
      description:
        "Personalized landing pages to reflect your business style and tone.",
    },
    {
      title: "🛡 Secure Auth",
      description: "OAuth & JWT-based authentication to protect your assets.",
    },
    {
      title: "📊 Admin Insights",
      description:
        "See real-time analytics and optimize engagement from your dashboard.",
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
      <main style={{ backgroundColor:"#05030e" }}>
        {/* Hero Section */}
        <div
          className="relative h-[91vh] text-white overflow-hidden"
          style={{ backgroundColor: "#05030e" }}
        >
          <Vortex
            particleCount={600}
            baseHue={180}
            baseSpeed={0.5}
            rangeSpeed={1.2}
            baseRadius={1}
            rangeRadius={2}
            rangeY={100}
            containerClassName="rounded-lg overflow-hidden"
            className="text-center px-4"
          />

          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">
            <h1
              className={`text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight transition-all duration-700 ease-out ${
                atTop ? "animate-fade-slide-up" : "opacity-30 scale-95 blur-sm"
              }`}
              style={{ color: textColor || "#ffffff" }}
            >
              Welcome to{" "}
              <span style={{ color: buttonColor || "#a855f7" }}>
                {logoText || "Whats Link"}
              </span>
            </h1>

            <p
              className={`text-lg md:text-xl max-w-2xl transition-all duration-700 ease-out ${
                atTop
                  ? "animate-fade-slide-up delay-150"
                  : "opacity-20 blur-sm scale-95"
              }`}
              style={{ color: textColor ? `${textColor}CC` : "#94a3b8" }}
            >
              A premium solution for freelancers and creators to craft
              personalized links, manage engagement, and build trust.
            </p>

            <Link to={"/user/dashbord/link-generate"}>
              <button
                className="mt-8 px-8 py-3 rounded-full transition duration-300 text-white text-lg font-semibold shadow-xl"
                style={{ backgroundColor: buttonColor || "#9333ea" }}
              >
                🚀 Get Started
              </button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="px-3" style={{ backgroundColor: "#05030e" }}>
          <h2
            className="text-3xl font-bold text-center mb-5"
            style={{ color: buttonColor || "#a855f7" }}
          >
            ✨ Features
          </h2>
          <HoverEffect items={items} />
        </div>

        {/* Pro Upgrade Section with animation on view */}
        <section
        style={{color: textColor || "#ffff"}}
          ref={sectionRef}
          className={`py-20 px-6 md:px-16 text-center rounded-t-3xl shadow-inner transition-all duration-1000 ${
            inView ? "animate-fade-up" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl font-bold mb-4">
            Upgrade to Pro – ₹199/year
          </h2>
          <p
            className="text-lg mb-8 max-w-2xl mx-auto"
            style={{ color: textColor ? `${textColor}CC` : "#94a3b8" }}
          >
            Unlock advanced customization, branded experiences, and insightful
            analytics — all with one premium plan. No subscriptions. No limits.
          </p>
          <Link to="/user/dashbord/check-out">
            <button
              className="font-semibold px-8 py-3 text-lg rounded-xl shadow-lg transition"
              style={{ backgroundColor: buttonColor || "#9333ea", color: "#fff" }}
            >
              💎 View Pricing
            </button>
          </Link>
        </section>

        {/* Footer */}
        <footer
          className="py-6 text-center text-sm"
          style={{ color: textColor ? `${textColor}99` : "#64748b" }}
        >
          &copy; {new Date().getFullYear()} Tegrand Info Tech. All rights
          reserved.
        </footer>
      </main>
    </>
  );
};

export default Home;
