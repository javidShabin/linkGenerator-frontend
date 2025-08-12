import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../configs/axiosInstance";
import toast from "react-hot-toast";

export default function QRGenerator() {
  const { slug } = useParams();
  const [qrImage, setQrImage] = useState("");
  const [qrId, setQrId] = useState("");
  const [foregroundColor, setForegroundColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [logoFile, setLogoFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getQRdetails = async () => {
      try {
        const response = await axiosInstance.post(`/qr/generate-qr/${slug}`);
        setQrId(response.data.data._id);
        setQrImage(response.data.data.qrCodeImage);
        toast.success(response.data.message);
      } catch (error) {
        console.log(error);
      }
    };
    getQRdetails();
  }, [slug]);

  const handleUpdateQR = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("foregroundColor", foregroundColor);
      formData.append("backgroundColor", backgroundColor);
      if (logoFile) formData.append("logo", logoFile);

      const response = await axiosInstance.patch(
        `/qr/update-qr/${qrId}`,
        formData
      );

      setQrImage(response.data.data.qrCodeImage);
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (format) => {
    try {
      const response = await axiosInstance.get(
        `/qr/download-qr/${qrId}?format=${format}`,
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.download = `whatsapp-qr.${format.toLowerCase()}`;
      document.body.appendChild(link); // append to body
      link.click();
      link.remove(); // remove after click
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#05030e] p-4">
      <div className="w-full max-w-6xl rounded-2xl shadow-2xl bg-gradient-to-b from-[#0b0710] to-[#0a0810] p-6 md:p-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">QR code generation</h1>
          <p className="text-sm text-gray-400 mt-2">Download or Scan</p>
        </header>

        {/* Main Layout */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Controls */}
          <section className="lg:col-span-5 bg-[#070510] rounded-xl p-5 border border-white/10">
            <h2 className="text-lg font-medium text-white mb-4">
              Design Controls
            </h2>
            <div className="space-y-5">
              {/* Foreground */}
              <div>
                <label className="text-sm text-gray-300 block mb-2">
                  Foreground Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    className="w-12 h-12 rounded-lg border border-white/10 cursor-pointer"
                    value={foregroundColor}
                    onChange={(e) => setForegroundColor(e.target.value)}
                  />
                  <input
                    type="text"
                    className="flex-1 bg-transparent border border-white/10 px-3 py-2 text-sm text-gray-200 rounded-lg"
                    value={foregroundColor}
                    onChange={(e) => setForegroundColor(e.target.value)}
                  />
                </div>
              </div>

              {/* Background */}
              <div>
                <label className="text-sm text-gray-300 block mb-2">
                  Background Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    className="w-12 h-12 rounded-lg border border-white/10 cursor-pointer"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                  />
                  <input
                    type="text"
                    className="flex-1 bg-transparent border border-white/10 px-3 py-2 text-sm text-gray-200 rounded-lg"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                  />
                </div>
              </div>

              {/* Logo */}
              <div>
                <label className="text-sm text-gray-300 block mb-2">
                  Add Logo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setLogoFile(e.target.files[0])}
                  className="block w-full text-sm text-gray-200 bg-transparent border border-white/10 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-purple-600 file:to-indigo-600 file:text-white hover:file:opacity-90 cursor-pointer"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Supported formats: PNG, JPG
                </p>
              </div>

              {/* Update Button */}
              <div>
                <button
                  onClick={handleUpdateQR}
                  disabled={loading}
                  className="w-full p-3 rounded-lg bg-gradient-to-b from-purple-500 to-purple-700 border border-white/10 text-center text-sm text-gray-200 hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Updating..." : "Update QR"}
                </button>
              </div>
            </div>
          </section>

          {/* Right: Preview */}
          <section className="lg:col-span-7 flex flex-col items-center gap-4">
            <div className="w-full text-center text-sm text-gray-400">
              Preview
            </div>

            <div className="w-full flex justify-center">
              <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm">
                {/* QR Code */}
                <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-center mb-4">
                  <img src={qrImage} alt="qrcode" className="w-[280px]" />
                </div>

                {/* Info */}
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-900">
                    Your QR code
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Download now</p>
                </div>

                {/* Download Buttons */}
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {["PNG", "JPG", "SVG", "JPEG"].map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => handleDownload(fmt)}
                      className="py-2 border border-gray-300 text-sm hover:bg-gray-50 rounded-lg"
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
