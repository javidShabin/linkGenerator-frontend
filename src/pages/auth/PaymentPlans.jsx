import React, { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { axiosInstance } from "../../configs/axiosInstance";
import toast from "react-hot-toast";
import { useBranding } from "../../context/BrandingContext";


const PlanCard = ({ title, price, duration, features, onClick }) => {
  const { buttonColor } = useBranding();
  return (
  <div className="flex flex-col justify-between p-8 rounded-3xl border border-white/10 shadow-xl backdrop-blur-lg transition-all duration-500 relative overflow-hidden group bg-white/5">
    {/* Glow Overlay */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 blur-3xl bg-purple-500/10" />

    <div className="relative z-10">
      <h2 className="text-3xl font-extrabold mb-3 tracking-wide text-white">
        {title}
      </h2>
      <p className="text-2xl font-bold mb-6">
        <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
          {price}
        </span>{" "}
        <span className="text-sm text-gray-400">/{duration}</span>
      </p>
      <ul className="space-y-4 mb-8">
        {features.map((item, idx) => (
          <li key={idx} className="flex items-center text-gray-300">
            <CheckCircle2 className="text-purple-400 w-5 h-5 mr-3" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>

    <button
      onClick={onClick}
      className="w-full py-3 rounded-2xl font-semibold text-lg transition-all duration-300 transform group-hover:scale-105 text-white shadow-lg border border-gray-500 hover:bg-purple-500"
      style={{ backgroundColor: buttonColor || undefined }}
    >
      Choose Plan
    </button>
  </div>
)};

const ProPlanPage = () => {
  const [packages, setPackages] = useState([]);

  console.log(packages)

  useEffect(() => {
    const getPackageDetails = async () => {
      try {
        const response = await axiosInstance.get("/package/get-packages");
        setPackages(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPackageDetails();
  }, []);

  const handleCheckout = async (planId) => {
    try {
      const response = await axiosInstance.post(
        "/payment/create-checkout-session",
        { planId }
      );
      const checkoutUrl = response.data.url;
      window.location.href = checkoutUrl;
    } catch (error) {
      toast.success(error.response.data.message);
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#05030e] px-6 py-16 relative overflow-hidden">
      {/* Floating Gradient Circles */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" />

      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
        {packages.map((item) => (
          <PlanCard
          key={item._id}
            title={item.name}
            price={"₹" + item.price}
            duration={item.duration}
            features={item.features}
            onClick={() => handleCheckout(item._id)}
          />
        ))}
        
      </div>
    </div>
  );
};

export default ProPlanPage;
