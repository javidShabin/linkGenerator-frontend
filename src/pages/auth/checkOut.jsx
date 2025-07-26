import React from "react";
import { CheckCircle2 } from "lucide-react";
import { createCheckout } from "../../api/stripe"; // import the API call

const ProPlanPage = () => {
  const handleProCheckout = async () => {
    try {
      const checkoutUrl = await createCheckout();
      window.location.href = checkoutUrl; // Redirect to Stripe Checkout
    } catch (err) {
      console.error("Stripe checkout error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f3f4f6] to-[#ffffff] flex items-center justify-center px-4 py-10">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Side - Info */}
          <div className="p-10 flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Upgrade to Pro
            </h1>
            <p className="text-gray-600 mb-6 text-lg">
              Unlock powerful features to enhance your link generation,
              branding, and engagement. Ideal for professionals and growing
              businesses.
            </p>
            <ul className="space-y-4">
              {[
                "Generate and download QR codes (PNG, JPEG, SVG)",
                "Save and track link history",
                "Branded landing pages",
                "Custom QR color & logo",
                "Priority support",
              ].map((item, idx) => (
                <li key={idx} className="flex items-center text-gray-700">
                  <CheckCircle2 className="text-green-500 mr-2" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <button
                onClick={handleProCheckout}
                className="inline-block bg-gradient-to-r from-[#7F56D9] to-[#9E77ED] text-white px-6 py-3 rounded-xl font-semibold text-lg hover:scale-105 transition"
              >
                Go Pro – ₹199/year
              </button>
              <p className="text-xs text-gray-500 mt-2">
                One-time: $5 available
              </p>
            </div>
          </div>

          {/* Right Side - Illustration */}
          <div className="bg-gradient-to-br from-[#ede9fe] to-[#f3e8ff] p-10 flex items-center justify-center">
            <img
              src="/assets/premium-illustration.svg"
              alt="Pro Features"
              className="max-w-full h-64 object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProPlanPage;
