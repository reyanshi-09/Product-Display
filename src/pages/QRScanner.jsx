// src/pages/QRScanner.jsx
import { useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useNavigate } from 'react-router-dom';

function QRScanner() {
  const navigate = useNavigate();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("qr-reader", {
      fps: 10,
      qrbox: { width: 250, height: 250 },
    });

    scanner.render(

      async (qrCodeMessage) => {
        const parts = qrCodeMessage.trim().split(" ");

        // ✅ IMPORTANT: Check your QR string format
        if (parts.length === 3) {
          // Correct order: adjust if needed based on QR structure
          const [charger_id, station_id, connector_id] = parts;

          const parsedQR = {
            charger_id,
            station_id,
            connector_id,
          };

          // ✅ Save in localStorage
          localStorage.setItem('scannedQR', JSON.stringify(parsedQR));
          console.log("Parsed QR:", parsedQR);

          alert("QR Code Scanned & Parsed Successfully!");

          // ✅ Clear scanner safely
          await scanner.clear();
          
          // ✅ Navigate to next page
         
           navigate('/station');
        } else {
          alert("Invalid QR Code format!");
        }
      },
      (error) => {
        console.warn("QR Scan error:", error); // optional for debugging
      }
    );
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-xl font-bold mb-4">Scan QR Code</h2>
      <div id="qr-reader" className="w-80" />
    </div>
  );
}

export default QRScanner;
