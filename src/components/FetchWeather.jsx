export const fetchCoordinates = async (city) => {
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
  );
  const data = await res.json();
  if (data.results && data.results.length > 0) {
    const { latitude, longitude } = data.results[0];
    return { lat: latitude, lon: longitude };
  } else {
    throw new Error("❌ Location not found");
  }
};

export const fetchHourlyWeather = async (lat, lon) => {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation_probability,wind_speed_10m,cloud_cover,uv_index&timezone=auto`
  );
  if (!res.ok) throw new Error("Failed to fetch weather data");
  const data = await res.json();

  const hours = data.hourly.time.map((time, idx) => ({
    time,
    temp: data.hourly.temperature_2m[idx],
    feelsLike: data.hourly.apparent_temperature[idx],
    humidity: data.hourly.relative_humidity_2m[idx],
    rainProb: data.hourly.precipitation_probability[idx],
    wind: data.hourly.wind_speed_10m[idx],
    clouds: data.hourly.cloud_cover[idx],
    uv: data.hourly.uv_index[idx],
  }));

  const dates = [...new Set(hours.map((h) => h.time.split("T")[0]))];

  return { hours, dates };
};
