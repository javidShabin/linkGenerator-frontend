import React from "react";
import { useNavigate } from "react-router-dom";
import { XCircle } from "lucide-react";
import { useBranding } from "../../context/BrandingContext";

export default function PaymentCancel() {
  const navigate = useNavigate();
  const { buttonColor } = useBranding();

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-[#05030e] via-[#12061f] to-[#05030e] overflow-hidden">
      {/* Animated blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-purple-800 rounded-full filter blur-[80px] opacity-30 animate-moveBlob"></div>
      <div className="absolute bottom-[-150px] right-[-100px] w-[350px] h-[350px] bg-pink-800 rounded-full filter blur-[80px] opacity-30 animate-moveBlob delay-3000"></div>
      <div className="absolute top-[50%] left-[70%] w-[250px] h-[250px] bg-blue-900 rounded-full filter blur-[80px] opacity-20 animate-moveBlob delay-6000"></div>

      {/* Card */}
      <div className="relative z-10 bg-white/10 backdrop-blur-[20px] p-8 rounded-2xl max-w-lg w-[90%] text-center border border-white/20 shadow-2xl">
        <XCircle className="mx-auto text-red-500 w-20 h-20" />
        <h1 className="text-3xl md:text-4xl font-bold text-white mt-4">
          Payment Canceled
        </h1>
        <p className="text-gray-300 mt-3">
          Your payment was not completed. You can try again or contact support
          if you need help.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => navigate("/user/check-out")}
            className="px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 shadow-lg"
            style={{ backgroundColor: buttonColor || "#6b21a8" }}
          >
            Try Again
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 shadow-lg"
            style={{ backgroundColor: buttonColor || "#374151" }}
          >
            Go to Home
          </button>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes moveBlob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(50px, -50px) scale(1.1); }
        }
        .animate-moveBlob {
          animation: moveBlob 20s ease-in-out infinite;
        }
        .delay-3000 {
          animation-delay: 3s;
        }
        .delay-6000 {
          animation-delay: 6s;
        }

        @media (max-width: 480px) {
          h1 {
            font-size: 1.5rem;
          }
          svg {
            width: 60px;
            height: 60px;
          }
          .mt-6.flex {
            flex-direction: column;
          }
          .mt-6.flex button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
