import { useRouteError } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  // Detect 404 error (or fallback)
  const is404 =
    error?.status === 404 ||
    error?.statusText === "Not Found" ||
    error?.message?.toLowerCase().includes("not found");

  return (
    <div
      id="error-page"
      className="min-h-screen w-full bg-[#05030e] text-white flex flex-col justify-center items-center px-6"
    >
      <div className="relative bg-white/5 border border-white/10 backdrop-blur-lg p-10 rounded-3xl shadow-[0_0_60px_#7e22ce33] max-w-xl w-full text-center transition-all duration-300">
        {/* Glow ring */}
        <div className="absolute inset-0 border border-purple-900/20 rounded-3xl shadow-[0_0_40px_10px_#a855f733] pointer-events-none" />

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-red-600/20 border border-red-500/30 p-5 rounded-full shadow-md shadow-red-700/30 animate-pulse">
            <AlertTriangle className="w-10 h-10 text-red-400" />
          </div>
        </div>

        {/* Dynamic Title */}
        <h1 className="text-4xl font-extrabold text-purple-200 mb-3 tracking-tight">
          {is404 ? "404 – Page Not Found" : "Oops! Something went wrong"}
        </h1>

        {/* Dynamic Message */}
        <p className="text-base text-gray-300 mb-2">
          {is404
            ? "The page you're looking for doesn't exist or has been moved."
            : "Sorry, an unexpected error has occurred."}
        </p>

        {/* Optional debug message */}
        {!is404 && (
          <p className="text-sm text-gray-400 italic mb-6">
            {error?.statusText || error?.message || "Unknown error"}
          </p>
        )}

        {/* Button */}
        <a
          href="/"
          className="inline-block bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white px-6 py-2 rounded-full font-semibold transition duration-300 shadow-lg"
        >
          ⬅ Go Back Home
        </a>
      </div>
    </div>
  );
}
