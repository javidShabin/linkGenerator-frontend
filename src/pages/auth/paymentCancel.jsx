import React from "react";
import { XCircle } from "lucide-react";
import { Link } from "react-router-dom";

const PaymentCancel = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1e293b] to-[#0f172a] px-4">
      <div className="max-w-md w-full bg-white/5 border border-white/20 rounded-3xl p-8 backdrop-blur-md shadow-xl text-white text-center">
        <XCircle className="w-16 h-16 mx-auto text-red-500 mb-4 animate-pulse" />
        <h1 className="text-3xl font-bold mb-2">Payment Cancelled</h1>
        <p className="text-gray-300 mb-4">
          Your payment was not completed. If this was a mistake, please try
          again.
        </p>
        <Link
          to="/pricing"
          className="inline-block bg-red-600 hover:bg-red-700 transition text-white px-6 py-3 rounded-xl font-medium text-lg"
        >
          Try Again
        </Link>
      </div>
    </div>
  );
};

export default PaymentCancel;
