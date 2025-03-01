import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { axiosInstance } from "../../configs/axiosInstance";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [paymentInfo, setPaymentInfo] = useState(null);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const res = await axiosInstance.get(`/payment/session/${sessionId}`);
        setPaymentInfo(res.data);
      } catch (err) {
        console.error("Failed to fetch payment session:", err);
      }
    };

    if (sessionId) fetchPaymentDetails();
  }, [sessionId]);

  if (!paymentInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#05030e] via-[#12061f] to-[#05030e] text-white">
        <p className="text-lg font-medium">Verifying your payment...</p>
      </div>
    );
  }

  // Format amount in INR (assuming amount is in paise/cents)
  const formatAmount = (amount) => {
    if (!amount) return "";
    const number = Number(amount);
    return number.toLocaleString("en-IN", { style: "currency", currency: "INR" });
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-[#05030e] via-[#12061f] to-[#05030e] overflow-hidden px-4">
      {/* Animated blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-purple-800 rounded-full filter blur-[80px] opacity-30 animate-moveBlob"></div>
      <div className="absolute bottom-[-150px] right-[-100px] w-[350px] h-[350px] bg-pink-800 rounded-full filter blur-[80px] opacity-30 animate-moveBlob delay-3000"></div>
      <div className="absolute top-[50%] left-[70%] w-[250px] h-[250px] bg-blue-900 rounded-full filter blur-[80px] opacity-20 animate-moveBlob delay-6000"></div>

      {/* Card */}
      <div className="relative z-10 bg-white/10 backdrop-blur-[20px] p-8 rounded-2xl max-w-lg w-[90%] text-center border border-white/20 shadow-2xl">
        <CheckCircle2 className="mx-auto text-green-400 w-20 h-20" />
        <h1 className="text-3xl md:text-4xl font-bold text-white mt-4">
          Payment Successful 🎉
        </h1>
        <p className="text-gray-300 mt-3">
          Thank you for upgrading to{" "}
          <span className="font-semibold text-white">{paymentInfo.plan || "Pro"}</span>!
          You now have full access to all premium features.
        </p>

        {paymentInfo.amount && (
          <p className="text-gray-400 mt-2 text-sm md:text-base">
            Amount paid:{" "}
            <span className="font-semibold text-white">
              {formatAmount(paymentInfo.amount)}
            </span>
          </p>
        )}

        <button
          onClick={() => navigate("/user/dashbord")}
          className="mt-6 px-6 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold transition-all duration-300 shadow-lg"
        >
          Go to Home
        </button>
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
        }
      `}</style>
    </div>
  );
}
