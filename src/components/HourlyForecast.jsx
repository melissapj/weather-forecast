import { useEffect, useState } from "react";
import HourlyCard from "./HourlyCard";


export default function HourlyForecast() {
  const [todayHours, setTodayHours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=51.5085&longitude=-0.1257&hourly=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation_probability,precipitation,wind_speed_10m,wind_direction_10m,cloud_cover,uv_index&timezone=auto"
        );
        if (!res.ok) throw new Error("Failed to fetch weather");
        const data = await res.json();

       
        const todayStr = new Date().toISOString().split("T")[0]; 
        const hoursToday = data.hourly.time
          .map((time, idx) => ({
            time,
            temp: data.hourly.temperature_2m[idx],
            feelsLike: data.hourly.apparent_temperature[idx],
            humidity: data.hourly.relative_humidity_2m[idx],
            rainProb: data.hourly.precipitation_probability[idx],
            wind: data.hourly.wind_speed_10m[idx],
            windDir: data.hourly.wind_direction_10m[idx],
            clouds: data.hourly.cloud_cover[idx],
            uv: data.hourly.uv_index[idx],
          }))
          .filter((h) => h.time.startsWith(todayStr));

        setTodayHours(hoursToday);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) return <p>Loading hourly forecast...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div>
        {todayHours.map((hour, idx) => (
          <HourlyCard key={idx} {...hour} />
        ))}
      </div>
    </div>
  );
}