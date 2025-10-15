import React, { useState } from "react";

export default function HourlyCard({
  time,
  temp,
  feelsLike,
  humidity,
  rainProb,
  wind,
  clouds,
  uv,
}) {
  const [expanded, setExpanded] = useState(false);

  let hour = "N/A";
  try {
    const date = new Date(time);
    if (!isNaN(date.getTime())) {
      hour = date.toLocaleTimeString([], {
        hour: "numeric",
        hour12: true,
      });
    }
  } catch (e) {
    console.error("Invalid time:", time);
  }

  return (
    <div
      className={`hour-card ${expanded ? "expanded" : ""}`}
      onClick={() => setExpanded(!expanded)}
    >
      <p className="hour-time">{hour}</p>
      <p className={`hour-temp ${temp >= 30 ? "hot" : temp <= 15 ? "cold" : ""}`}>
        {temp !== undefined ? Math.round(temp) + "°C" : "N/A"}
      </p>

      <p className="info">
        {expanded ? "▼ Click for less information" : "▶ Click for more information"}
      </p>

      {expanded && (
        <div className="hour-details">
          <p>Feels: {feelsLike !== undefined ? Math.round(feelsLike) + "°C" : "N/A"}</p>
          <p>Humidity: {humidity ?? "N/A"}%</p>
          <p>Rain: {rainProb ?? "N/A"}%</p>
          <p>Wind: {wind ?? "N/A"} m/s</p>
          <p>Clouds: {clouds ?? "N/A"}%</p>
          <p>UV: {uv ?? "N/A"}</p>
        </div>
      )}
    </div>
  );
}