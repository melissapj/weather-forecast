import React, { useEffect, useState } from "react";
import LocationSearch from "./LocationSearch";
import DaySelector from "./DaySelector";
import Carousel from "./Carousel";
import { fetchCoordinates, fetchHourlyWeather } from "./FetchWeather";

export default function HourlyForecast() {
  const [todayHours, setTodayHours] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [location, setLocation] = useState("London");
  const [coords, setCoords] = useState({ lat: 51.5085, lon: -0.1257 });

  const cardsPerPage = 6;

  const handleSearch = async (city) => {
    try {
      const newCoords = await fetchCoordinates(city);
      setCoords(newCoords);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    async function loadWeather() {
      setLoading(true);
      try {
        const { hours, dates } = await fetchHourlyWeather(
          coords.lat,
          coords.lon
        );
        setTodayHours(hours);
        setAvailableDates(dates);
        setSelectedDate(dates[0]);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadWeather();
  }, [coords]);

  const filteredHours = todayHours.filter((hour) =>
    hour.time.startsWith(selectedDate)
  );

  const totalPages = Math.ceil(filteredHours.length / cardsPerPage);
  const startIndex = currentPage * cardsPerPage;
  const visibleHours = filteredHours.slice(
    startIndex,
    startIndex + cardsPerPage
  );

  const handlePrevious = () => setCurrentPage((p) => Math.max(p - 1, 0));
  const handleNext = () =>
    setCurrentPage((p) => Math.min(p + 1, totalPages - 1));

  return (
    <div>
      <LocationSearch
        location={location}
        setLocation={setLocation}
        onSearch={handleSearch}
      />

      <DaySelector
        availableDates={availableDates}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      {loading && <p className="loading">⏳ Loading forecast…</p>}
      {error && <p className="error">⚠️ {error}</p>}

      {!loading && !error && (
        <Carousel
          visibleHours={visibleHours}
          currentPage={currentPage}
          totalPages={totalPages}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
        />
      )}
    </div>
  );
}
