import { apiFetch } from "api";
import { useUserId } from "hooks/useUserId";
import React, { useState, useEffect } from "react";
import { formatDate } from "utils/formatDate";

const LogTracking = ({ title, trackingId, type, isHistory = false }) => {
  const userId = useUserId();
  const [logs, setLogs] = useState([]);
  const [quantity, setQuantity] = useState("");

  const fetchLogs = async () => {
    try {
      const data = await apiFetch(`/trackings/logs/${userId}/${type}`);
      setLogs(data?.data);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  const logProgress = async () => {
    if (!quantity) return;
    try {
      const newLog = await apiFetch(`/trackings/log`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          type,
          title,
          quantity: Number(quantity),
        }),
      });
      setLogs((prevLogs) =>
        Array.isArray(prevLogs) ? [newLog, ...prevLogs] : [newLog]
      );
      setQuantity("");
    } catch (error) {
      console.error("Error logging progress:", error);
    }
  };

  return (
    <div className="p-4 border rounded-md shadow">
      {/* <h2 className="text-lg font-semibold">Log Progress</h2> */}
      <div style={{ display: "flex", gap: "1rem" }}>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Enter quantity"
          className="border p-2 rounded w-24"
        />
        <button
          onClick={logProgress}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Log
        </button>
      </div>
      {isHistory && (
        <React.Fragment>
          <h5 className="mt-4 font-medium" onClick={fetchLogs}>
            History
          </h5>
          <ul className="mt-2 border-t pt-2 max-h-20">
            {Array.isArray(logs) &&
              logs.map((log, index) => (
                <li key={index} className="flex justify-between p-2 border-b">
                  <span>{log.quantity}</span>
                  <span className="text-sm text-gray-500">
                    {formatDate(log?.timestamp)}
                  </span>
                </li>
              ))}
          </ul>
        </React.Fragment>
      )}
    </div>
  );
};

export default LogTracking;
