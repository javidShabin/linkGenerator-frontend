import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import axios from "axios";
import { axiosInstance } from "../../config/axiosInstance";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [paymentInfo, setPaymentInfo] = useState(null);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const res = await axiosInstance.get(`/payment/session/${sessionId}`, {
          withCredentials: true,
        });
        setPaymentInfo(res.data);
      } catch (err) {
        console.error("Failed to fetch payment session:", err);
      }
    };

    if (sessionId) fetchPaymentDetails();
  }, [sessionId]);

  if (!paymentInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white">
        <p className="text-lg font-medium">Verifying your payment...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#1e293b] px-4">
      <div className="max-w-md w-full bg-white/5 border border-white/20 rounded-3xl p-8 backdrop-blur-md shadow-xl text-white text-center">
        <CheckCircle2 className="w-16 h-16 mx-auto text-green-400 mb-4 animate-bounce" />
        <h1 className="text-3xl font-bold mb-2">Payment Successful</h1>
        <p className="text-gray-300 mb-4">Plan: <span className="text-white font-semibold">{paymentInfo.plan}</span></p>
        <p className="text-gray-300 mb-6">Amount Paid: ₹{paymentInfo.amount}</p>
        <Link
          to="/dashboard"
          className="inline-block bg-purple-600 hover:bg-purple-700 transition text-white px-6 py-3 rounded-xl font-medium text-lg"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
