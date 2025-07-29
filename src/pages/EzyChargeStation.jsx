import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";

const EzyChargeStation = () => {
  const [connectorData, setConnectorData] = useState(null);
  const [chargerStatus, setChargerStatus] = useState("Online");
  const [connectorStatus, setConnectorStatus] = useState("Unknown");

  useEffect(() => {
    const data = localStorage.getItem("connectorStatusData");
    if (data) {
      const parsed = JSON.parse(data);
      const info = parsed?.data?.[0];
      if (!info) return;

      const pingTime = new Date(info.last_ping_datetime.replace(" ", "T"));
      const currentTime = new Date();
      const diffInSeconds = (currentTime - pingTime) / 1000;

      // Logic to set charger + connector status
      if (diffInSeconds <= 30) {
        setChargerStatus("Online");
        setConnectorStatus(info.connector_current_status || "Unknown");
      } else {
        setChargerStatus("Offline");
        setConnectorStatus("Offline");
      }

      setConnectorData(info);
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-sans">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6">
        {/* Header */}
        <div className="flex justify-between items-start text-sm font-semibold text-gray-700 border-b pb-2 mb-2">
          <div className="text-base">{connectorData?.station_name || "demoEzyCharge Station"}</div>

          <div className="text-right">
            <div>
              Charger Status:{" "}
              <span className={`font-bold ${chargerStatus === "Online" ? "text-green-600" : "text-red-600"}`}>
                {chargerStatus}
              </span>
            </div>
            <div>
              Connector Status:{" "}
              <span className={`font-bold ${connectorStatus === "Available" ? "text-green-600" : "text-red-600"}`}>
                {connectorStatus}
              </span>
            </div>
          </div>
        </div>

        {/* Play Button */}
        <div className="flex justify-center my-6">
          <div className="w-24 h-24 border-8 border-teal-500 rounded-full flex items-center justify-center">
            <FaPlay className="text-teal-600 text-3xl" />
          </div>
        </div>

        {/* Time and Meter */}
        <div className="flex justify-around mb-6 text-sm text-gray-600">
          <div className="text-center">
            <p>Charging Time</p>
            <p className="text-blue-600 font-medium">HH:MM:SS</p>
          </div>
          <div className="text-center">
            <p>Meter Current Value</p>
            <p className="text-blue-600 font-medium">0.000Kw/h</p>
          </div>
        </div>

        {/* Charger Info Table */}
        <div className="border rounded-lg overflow-hidden text-sm text-gray-700">
          <div className="grid grid-cols-2 border-b px-4 py-2 bg-gray-100 font-semibold">
            <span>Charger ID</span>
            <span className="text-blue-700">{connectorData?.charger_id || "Charger Value"}</span>
          </div>
          <div className="grid grid-cols-2 border-b px-4 py-2">
            <span>Connector ID</span>
            <span>{connectorData?.connector_id || "1"}</span>
          </div>
          <div className="grid grid-cols-2 border-b px-4 py-2">
            <span>Connector Type</span>
            <span>
              <span className="bg-cyan-600 text-white text-xs px-2 py-1 rounded-full">
                {connectorData?.connector_type_name || "AC001"}
              </span>
            </span>
          </div>
          <div className="grid grid-cols-2 border-b px-4 py-2">
            <span>Last Ping Date</span>
            <span className="text-green-600">{connectorData?.last_ping_datetime || "N/A"}</span>
          </div>
          <div className="grid grid-cols-2 border-b px-4 py-2">
            <span>Charger Type</span>
            <span>{connectorData?.charger_type || "Prepaid"}</span>
          </div>
          <div className="grid grid-cols-2 px-4 py-2">
            <span>Prepaid Unit</span>
            <span className="text-blue-700">{connectorData?.consumption_amt_per_unit || "0.600"} Kw/h</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EzyChargeStation;
