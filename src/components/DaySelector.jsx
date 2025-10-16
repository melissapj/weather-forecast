import React from "react";

export default function DaySelector({ availableDates, selectedDate, setSelectedDate }) {
  return (
    <div className="day-selector">
      {availableDates.map((date) => {
        const label = new Date(date).toLocaleDateString(undefined, {
          weekday: "short",
          day: "numeric",
          month: "short",
        });
        return (
          <button
            key={date}
            className={`day-btn ${date === selectedDate ? "active" : ""}`}
            onClick={() => setSelectedDate(date)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

