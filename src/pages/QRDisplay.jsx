import { useEffect, useState } from 'react';
import { getConnectorStatus } from '../services/stationService';

function QRDisplay() {
  const [qrValue, setQrValue] = useState('');
  const [apiResponse, setApiResponse] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('scannedQR'); // ✅ Match with QRScanner
    if (stored) {
      const parsed = JSON.parse(stored);
      setQrValue(parsed);

      const { charger_id, station_id, connector_id } = parsed;

      // ✅ Call API
      getConnectorStatus(station_id, charger_id, connector_id)
        .then((res) => {
          console.log("API Success:", res.data);
          setApiResponse(res.data);

          // ✅ Store full response to localStorage
          localStorage.setItem('connectorStatusData', JSON.stringify(res.data));
        })
        .catch((err) => {
          console.error("API Error:", err);
        });
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 " >
      <h1 className="text-2xl font-bold mb-4">Scanned QR Data</h1>

      {qrValue ? (
        <p className="text-lg text-gray-700 bg-white p-4 rounded shadow mb-4">
          {JSON.stringify(qrValue)}
        </p>
      ) : (
        <p>No QR data found</p>
      )}

      {apiResponse && (
        <div className="bg-white p-4 rounded shadow w-full max-w-md">
          <h2 className="text-xl font-semibold mb-2">API Response</h2>
          <pre className="text-sm">{JSON.stringify(apiResponse, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default QRDisplay;
