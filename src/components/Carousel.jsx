import React from "react";
import HourlyCard from "./HourlyCard";

export default function Carousel({
  visibleHours,
  currentPage,
  totalPages,
  handlePrevious,
  handleNext,
}) {
  return (
    <div className="carousel-container">
      <button
        className="carousel-btn left"
        onClick={handlePrevious}
        disabled={currentPage === 0}
        aria-label="Previous hours"
      >
        ◀
      </button>

      <div className="carousel-wrapper">
        <div className="carousel">
          {visibleHours.map((hour) => (
            <HourlyCard key={hour.time} {...hour} />
          ))}
        </div>
      </div>

      <button
        className="carousel-btn right"
        onClick={handleNext}
        disabled={currentPage === totalPages - 1}
        aria-label="Next hours"
      >
        ▶
      </button>
    </div>
  );
}
