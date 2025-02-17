import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../configs/axiosInstance";
import { Copy, CheckCircle2 } from "lucide-react";

const PaymentDetails = () => {
  const [payments, setPayments] = useState([]);
  const [copiedId, setCopiedId] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Added loading state

  useEffect(() => {
    const getPaymentDetails = async () => {
      try {
        const response = await axiosInstance.get("/payment/get-payments");
        setPayments(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // ✅ Stop loading after fetch
      }
    };
    getPaymentDetails();
  }, []);

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedId(index);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="relative min-h-screen bg-[#05030e] text-white p-6 md:p-10 overflow-hidden font-inter">
      {/* Glowing Circles */}
      <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-purple-500 rounded-full filter blur-3xl opacity-30 animate-moveCircle1"></div>
      <div className="absolute bottom-[-200px] right-[-250px] w-[400px] h-[400px] bg-blue-500 rounded-full filter blur-3xl opacity-30 animate-moveCircle2"></div>
      <div className="absolute top-[200px] right-[-200px] w-[450px] h-[450px] bg-pink-500 rounded-full filter blur-3xl opacity-20 animate-moveCircle3"></div>

      <h1 className="text-white text-3xl font-bold mb-8 text-center">
        Payment Transactions
      </h1>

      {/* ✅ Loading Indicator */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {payments.map((p, index) => (
            <div
              key={index}
              className="group relative rounded-2xl p-6 backdrop-blur-md bg-white/10 border border-white/20 shadow-lg hover:shadow-purple-500/20 hover:scale-[1.02] transition-all duration-300"
            >
              {/* Header */}
              <div className="mb-4">
                <h2 className="text-lg font-semibold">{p.userName}</h2>
                <p className="text-sm text-gray-300">{p.email}</p>
              </div>

              {/* Info */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Plan</span>
                  <span className="px-2 py-1 rounded-lg text-xs font-medium bg-purple-500/20 text-purple-300">
                    {p.plan}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Amount</span>
                  <span className="text-green-400 font-semibold">
                    {p.amount} {p.currency}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status</span>
                  <span
                    className={`px-2 py-1 rounded-lg text-xs font-medium ${
                      p.status === "paid"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {p.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Date</span>
                  <span className="text-gray-300">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Session ID with copy button */}
                <div>
                  <span className="text-gray-400 block mb-1">Session ID</span>
                  <div className="flex items-center justify-between bg-white/5 px-3 py-2 rounded-lg border border-white/10">
                    <span className="truncate max-w-[150px]">{p.sessionId}</span>
                    <button
                      onClick={() => handleCopy(p.sessionId, index)}
                      className="text-gray-400 hover:text-white transition"
                    >
                      {copiedId === index ? (
                        <CheckCircle2 size={16} className="text-green-400" />
                      ) : (
                        <Copy size={16} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Animations */}
      <style>
        {`
          @keyframes move1 {
            0% { transform: translate(-120px, -60px) scale(1); }
            50% { transform: translate(60px, 120px) scale(1.15); }
            100% { transform: translate(-120px, -60px) scale(1); }
          }
          @keyframes move2 {
            0% { transform: translate(120px, 60px) scale(1); }
            50% { transform: translate(-60px, -120px) scale(1.1); }
            100% { transform: translate(120px, 60px) scale(1); }
          }
          @keyframes move3 {
            0% { transform: translate(-60px, 120px) scale(1); }
            50% { transform: translate(120px, -60px) scale(1.2); }
            100% { transform: translate(-60px, 120px) scale(1); }
          }
          .animate-moveCircle1 { animation: move1 20s ease-in-out infinite; }
          .animate-moveCircle2 { animation: move2 25s ease-in-out infinite; }
          .animate-moveCircle3 { animation: move3 30s ease-in-out infinite; }
        `}
      </style>
    </div>
  );
};

export default PaymentDetails;
