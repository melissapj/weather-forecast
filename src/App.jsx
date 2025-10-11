import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import HourlyForecast from "./components/HourlyForecast";


function App() {
  return (
    <div>
      <Header />
      <main className="dailyWeather">
        <HourlyForecast />
      </main>
    </div>
  );
}

export default App;
