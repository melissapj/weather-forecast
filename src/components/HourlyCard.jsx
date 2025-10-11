import React, { useState } from "react";

export default function HourlyCard({
  time,
  temp,
  feelsLike,
  humidity,
  rainProb,
  wind,
  windDir,
  clouds,
  uv,
}) {
  const [expanded, setExpanded] = useState(false);
  const hour = new Date(time).getHours();

  return (
    <div className="hourCard">
      <p className="hour">{hour}:00</p>
      <p className="temp">🌡️ {temp}°C</p>

      <button className="moreInfoBtn" onClick={() => setExpanded(!expanded)}>
        {expanded ? "Hide Info" : "More Info"}
      </button>

      {expanded && (
        <div className="hourDetails">
          <p>🤗 Feels Like: {feelsLike}°C</p>
          <p>💧 Humidity: {humidity}%</p>
          <p>🌧️ Precipitation Probability: {rainProb}%</p>
          <p>💨 Wind: {wind} m/s ({windDir}°)</p>
          <p>☁️ Cloud Cover: {clouds}%</p>
          <p>🌞 UV Index: {uv}</p>
        </div>
      )}
    </div>
  );
}