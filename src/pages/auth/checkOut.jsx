import React from "react";
import { CheckCircle2 } from "lucide-react";
import { createCheckout } from "../../api/stripe"; // This function must accept the selected plan
import toast from "react-hot-toast";

const features = [
  "Generate & download QR codes (PNG, JPEG, SVG)",
  "Save and track link history",
  "Branded landing pages",
  "Custom QR color & logo",
  "Priority support",
];

const PlanCard = ({ title, price, duration, features, onClick, highlight }) => (
  <div
    className={`flex flex-col justify-between p-6 rounded-3xl border shadow-lg backdrop-blur-md transition-all duration-300 ${
      highlight
        ? "bg-white/10 border-purple-500 text-white scale-105"
        : "bg-white/5 border-white/20 text-white"
    }`}
  >
    <div>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-lg text-purple-300 mb-4">
        {price} <span className="text-sm text-gray-300">/{duration}</span>
      </p>
      <ul className="space-y-3 mb-6">
        {features.map((item, idx) => (
          <li key={idx} className="flex items-center">
            <CheckCircle2 className="text-green-400 w-5 h-5 mr-2" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
    <button
      onClick={onClick}
      className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-xl font-semibold text-lg transition"
    >
      Choose Plan
    </button>
  </div>
);

const ProPlanPage = () => {
  const handleCheckout = async (selectedPlan) => {
    try {
      const checkoutUrl = await createCheckout(selectedPlan); // Pass selected plan to backend
      window.location.href = checkoutUrl;
    } catch (err) {
      console.error("Stripe checkout error:", err);
      toast.error(err.response.data.error)
      
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#141E30] to-[#243B55] px-6 py-16">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Plan 1 - One Time */}
        <PlanCard
          title="One-Time Plan"
          price="₹499"
          duration="lifetime"
          features={features}
          onClick={() => handleCheckout("one-time")}
        />

        {/* Plan 2 - Pro Plan */}
        <PlanCard
          title="Pro Plan"
          price="₹199"
          duration="per year"
          features={features}
          onClick={() => handleCheckout("pro-plan")}
          highlight={true}
        />
      </div>
    </div>
  );
};

export default ProPlanPage;
