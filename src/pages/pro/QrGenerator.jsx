import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";

const QrGenerator = () => {
  const { slug } = useParams();
  const [qrImage, setQrImage] = useState("");
  const [whatsappLink, setWhatsappLink] = useState("");
  const [qrId, setQrId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("png");

  const [foregroundColor, setForegroundColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [logoFile, setLogoFile] = useState(null);
  const [editLoading, setEditLoading] = useState(false);

  useEffect(() => {
    const generateQr = async () => {
      try {
        const response = await axiosInstance.post(`/qr/generate-qr/${slug}`);
        setQrImage(response.data.data.qrCodeImage);
        setWhatsappLink(response.data.whatsappLink);
        setQrId(response.data.data._id);
      } catch (err) {
        console.error(err);
        setError("❌ Failed to generate QR Code. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    generateQr();
  }, [slug]);

  const handleDownload = () => {
    const downloadUrl = `${axiosInstance.defaults.baseURL}/qr/download/${qrId}?format=${selectedFormat}`;
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `whatsapp-qr.${selectedFormat}`;
    link.click();
  };

  const handleEditQr = async () => {
    try {
      setEditLoading(true);
      const formData = new FormData();
      formData.append("foregroundColor", foregroundColor);
      formData.append("backgroundColor", backgroundColor);
      if (logoFile) formData.append("logo", logoFile);

      const response = await axiosInstance.patch(`/qr/edit-qr/${qrId}`,formData,);

      setQrImage(response.data.qr.qrCodeImage);
    } catch (err) {
      alert("Edit QR Error:", err);
      alert("Failed to update QR");
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#0f172a] px-4 flex items-center justify-center">
      <div className="w-full max-w-md rounded-3xl p-8 sm:p-10 backdrop-blur-xl bg-white/5 border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.3)] text-white">
        {loading ? (
          <div className="flex flex-col items-center justify-center">
            <div className="w-16 h-16 border-4 border-dashed border-teal-400 rounded-full animate-spin mb-4"></div>
            <p className="text-lg font-medium">Generating QR Code...</p>
          </div>
        ) : error ? (
          <div className="text-center text-red-400 font-semibold">{error}</div>
        ) : (
          <>
            <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 tracking-tight">
              Your <span className="text-[#14b8a6]">Luxury</span> QR Code
            </h1>

            <div className="flex items-center justify-center gap-4 mb-6">
              {/* Foreground color selector (left side) */}
              <div>
                <label className="block mb-1 text-xs text-center">
                  Foreground
                </label>
                <input
                  type="color"
                  value={foregroundColor}
                  onChange={(e) => setForegroundColor(e.target.value)}
                  className="w-10 h-10 rounded-full border border-white/20 bg-white/10"
                />
              </div>

              <img
                src={qrImage}
                alt="WhatsApp QR Code"
                className="w-56 h-56 object-cover rounded-2xl border-4 border-white/10 shadow-lg"
              />

              {/* Background color selector (right side) */}
              <div>
                <label className="block mb-1 text-xs text-center">
                  Background
                </label>
                <input
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="w-10 h-10 rounded-full border border-white/20 bg-white/10"
                />
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block mb-2 text-sm">Upload Logo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setLogoFile(e.target.files[0])}
                  className="block w-full text-sm text-white file:bg-purple-700 file:border-none file:px-4 file:py-2 file:rounded-xl file:text-white hover:file:bg-purple-800"
                />
              </div>

              <button
                onClick={handleEditQr}
                disabled={editLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:to-purple-700 text-white py-2 rounded-xl font-semibold transition-all duration-300"
              >
                {editLoading ? "Updating..." : "Update QR Code"}
              </button>
            </div>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-gradient-to-r from-[#14b8a6] to-[#0d9488] hover:to-[#0f766e] text-white py-3 rounded-xl text-lg font-semibold mb-4 transition-all duration-300"
            >
              Open in WhatsApp
            </a>

            <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
              <select
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
                className="w-full sm:w-1/2 bg-white/10 text-white border border-white/20 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#14b8a6]"
              >
                <option className="text-black" value="png">
                  PNG
                </option>
                <option className="text-black" value="jpg">
                  JPG
                </option>
                <option className="text-black" value="jpeg">
                  JPEG
                </option>
                <option className="text-black" value="svg">
                  SVG
                </option>
              </select>

              <button
                onClick={handleDownload}
                className="w-full sm:w-1/2 bg-gradient-to-r from-sky-500 to-blue-600 hover:to-blue-700 text-white py-2 rounded-xl font-semibold transition-all duration-300"
              >
                Download as {selectedFormat.toUpperCase()}
              </button>
            </div>

            <p className="text-center text-[#94a3b8] text-sm">
              Powered by{" "}
              <span className="text-[#14b8a6] font-semibold">YourBrand</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default QrGenerator;
