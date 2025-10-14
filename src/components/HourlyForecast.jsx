import React, { useEffect, useState } from "react";
import HourlyCard from "./HourlyCard";

export default function HourlyForecast() {
  const [todayHours, setTodayHours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 6;

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=51.5085&longitude=-0.1257&hourly=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation_probability,wind_speed_10m,cloud_cover,uv_index&timezone=auto"
        );
        if (!res.ok) throw new Error("Failed to fetch weather data");
        const data = await res.json();

        const today = new Date();
        const todayYear = today.getFullYear();
        const todayMonth = today.getMonth();
        const todayDate = today.getDate();

        const hours = data.hourly.time
          .map((time, idx) => ({
            time,
            temp: data.hourly.temperature_2m[idx],
            feelsLike: data.hourly.apparent_temperature[idx],
            humidity: data.hourly.relative_humidity_2m[idx],
            rainProb: data.hourly.precipitation_probability[idx],
            wind: data.hourly.wind_speed_10m[idx],
            clouds: data.hourly.cloud_cover[idx],
            uv: data.hourly.uv_index[idx],
          }))
          .filter((hour) => {
            const hourDate = new Date(hour.time);
            return (
              hourDate.getFullYear() === todayYear &&
              hourDate.getMonth() === todayMonth &&
              hourDate.getDate() === todayDate
            );
          });

        setTodayHours(hours);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, []);

  const handlePrevious = () => {
    setCurrentPage((p) => Math.max(p - 1, 0));
  };

  const handleNext = () => {
    setCurrentPage((p) => Math.min(p + 1, totalPages - 1));
  };

  if (loading) return <p className="loading">⏳ Loading hourly forecast…</p>;
  if (error) return <p className="error">⚠️ {error}</p>;

  const totalPages = Math.ceil(todayHours.length / cardsPerPage);
  const startIndex = currentPage * cardsPerPage;
  const visibleHours = todayHours.slice(startIndex, startIndex + cardsPerPage);

  return (
    <div className="carousel-container">
      <button
        className="carousel-btn"
        onClick={handlePrevious}
        disabled={currentPage === 0}
        aria-label="Previous hours"
      >
        ◀
      </button>

      <div className="carousel">
        {visibleHours.map((hour) => (
          <HourlyCard key={hour.time} {...hour} />
        ))}
      </div>

      <button
        className="carousel-btn"
        onClick={handleNext}
        disabled={currentPage === totalPages - 1}
        aria-label="Next hours"
      >
        ▶
      </button>
    </div>
  );
}
