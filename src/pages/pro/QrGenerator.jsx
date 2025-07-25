import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';

const QrGenerator = () => {
  const { slug } = useParams();
  const [qrImage, setQrImage] = useState('');
  const [whatsappLink, setWhatsappLink] = useState('');
  const [qrId, setQrId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('png');

  useEffect(() => {
    const generateQr = async () => {
      try {
        const response = await axiosInstance.post(`/qr/generate-qr/${slug}`);
        setQrImage(response.data.data.qrCodeImage);
        setWhatsappLink(response.data.whatsappLink);
        setQrId(response.data.data._id);
      } catch (err) {
        console.error(err);
        setError('❌ Failed to generate QR Code. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    generateQr();
  }, [slug]);

  const handleDownload = () => {
    const downloadUrl = `${axiosInstance.defaults.baseURL}/qr/download/${qrId}?format=${selectedFormat}`;
    console.log(downloadUrl, "====result")
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `whatsapp-qr.${selectedFormat}`;
    link.click();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#141E30] to-[#243B55] px-4">
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 p-8 sm:p-10 rounded-3xl shadow-2xl max-w-md w-full text-white animate-fadeIn">
        {loading ? (
          <div className="flex flex-col items-center justify-center">
            <div className="w-16 h-16 border-4 border-dashed border-purple-400 rounded-full animate-spin mb-4"></div>
            <p className="text-lg font-medium">Generating QR Code...</p>
          </div>
        ) : error ? (
          <div className="text-center text-red-400 font-semibold">{error}</div>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-center mb-6 tracking-wide">Your Premium WhatsApp QR</h1>
            <div className="flex justify-center mb-6">
              <img
                src={qrImage}
                alt="WhatsApp QR Code"
                className="w-56 h-56 object-cover rounded-xl border-4 border-white shadow-md"
              />
            </div>

            <div className="flex flex-col gap-4">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl text-lg font-semibold transition-all duration-300"
              >
                Open in WhatsApp
              </a>

              <div className="flex flex-col sm:flex-row items-center gap-3 ">
                <select
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                  className="w-full sm:w-1/2 bg-white/20 text-white border border-white/30 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option className='text-black' value="png">PNG</option>
                  <option className='text-black' value="jpg">JPG</option>
                  <option className='text-black' value="jpeg">JPEG</option>
                  <option className='text-black' value="svg">SVG</option>
                </select>

                <button
                  onClick={handleDownload}
                  className="w-full sm:w-1/2 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl font-semibold transition-all duration-300"
                >
                  Download as {selectedFormat.toUpperCase()}
                </button>
              </div>
            </div>

            <p className="text-center text-gray-300 text-sm mt-6">
              Powered by <span className="text-purple-300 font-semibold">YourBrand</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default QrGenerator;
