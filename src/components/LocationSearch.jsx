import React from "react";

export default function LocationSearch({ location, setLocation, onSearch }) {
  return (
    <div className="location-search">
      <input
        type="text"
        placeholder="Enter city..."
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={() => onSearch(location)}>Search</button>
    </div>
  );
}
