import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import WeatherChart from "../components/WeatherChart";
import {
  fetchHistoricalWeather,
  fetchHistoricalAir,
} from "../services/weatherService";
import "react-datepicker/dist/react-datepicker.css";

function History() {
  const [coords, setCoords] = useState(null);
  const [startDate, setStartDate] = useState(new Date("2023-01-01"));
  const [endDate, setEndDate] = useState(new Date());
  const [weather, setWeather] = useState(null);
  const [air, setAir] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 📍 Get location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      () => setError("Location permission denied")
    );
  }, []);

  // ⛔ Validate max 2 years
  const isValidRange = () => {
    const diff = (endDate - startDate) / (1000 * 60 * 60 * 24);
    return diff <= 730;
  };

  // 📊 Fetch Data
  const loadData = async () => {
    if (!coords) return;

    if (!isValidRange()) {
      alert("Max range is 2 years");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const weatherRes = await fetchHistoricalWeather(
        coords.lat,
        coords.lon,
        startDate,
        endDate
      );

      const airRes = await fetchHistoricalAir(
        coords.lat,
        coords.lon,
        startDate,
        endDate
      );

      setWeather(weatherRes);
      setAir(airRes);
    } catch (err) {
      console.error(err);
      setError("Failed to load data");
    }

    setLoading(false);
  };

  // 📈 Format Data (🔥 FIXED)
  const formatData = () => {
    if (!weather?.daily?.time) return [];

    return weather.daily.time.map((date, i) => ({
      time: date,

      // 🌡 Temperature
      tempMax: weather.daily.temperature_2m_max?.[i] ?? 0,
      tempMin: weather.daily.temperature_2m_min?.[i] ?? 0,
      tempMean:
        ((weather.daily.temperature_2m_max?.[i] ?? 0) +
          (weather.daily.temperature_2m_min?.[i] ?? 0)) / 2,

      // 💨 Wind
      wind: weather.daily.windspeed_10m_max?.[i] ?? 0,

      // 🔥 FIX: fallback wind direction
      windDir:
        weather.daily.winddirection_10m?.[i] ??
        weather.hourly?.winddirection_10m?.[i] ??
        0,

      // 🌧 Rain
      rain: weather.daily.precipitation_sum?.[i] ?? 0,

      // 🌅 Sun
      sunrise: weather.daily.sunrise?.[i]
        ? new Date(weather.daily.sunrise[i]).getHours()
        : 0,
      sunset: weather.daily.sunset?.[i]
        ? new Date(weather.daily.sunset[i]).getHours()
        : 0,

      // 🌫 Air
      pm10: air?.hourly?.pm10?.[i] ?? 0,
      pm25: air?.hourly?.pm2_5?.[i] ?? 0,
    }));
  };

  const chartData = formatData();

  return (
    <div className="space-y-6">

      {/* ERROR */}
      {error && <p className="text-red-500">{error}</p>}

      {/* 📅 DATE RANGE */}
      <div className="bg-white p-5 rounded-xl shadow flex flex-wrap gap-4 items-center">

        <div>
          <p className="text-sm text-gray-500">Start Date</p>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="border p-2 rounded-lg"
          />
        </div>

        <div>
          <p className="text-sm text-gray-500">End Date</p>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="border p-2 rounded-lg"
          />
        </div>

        <button
          onClick={loadData}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow mt-5"
        >
          Load Data
        </button>
      </div>

      {/* ⏳ LOADING */}
      {loading && <p className="animate-pulse">Loading data...</p>}

      {/* 📊 CHARTS */}
      {chartData.length > 0 && !loading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* 🌡 Temp */}
          <WeatherChart data={chartData} dataKey="tempMax" title="🌡 Max Temperature" />
          <WeatherChart data={chartData} dataKey="tempMin" title="🌡 Min Temperature" />
          <WeatherChart data={chartData} dataKey="tempMean" title="🌡 Mean Temperature" />

          {/* 💨 Wind */}
          <WeatherChart data={chartData} dataKey="wind" title="💨 Wind Speed" />
          <WeatherChart data={chartData} dataKey="windDir" title="🧭 Wind Direction" />

          {/* 🌧 Rain */}
          <WeatherChart data={chartData} dataKey="rain" title="🌧 Precipitation" />

          {/* 🌅 Sun */}
          <WeatherChart data={chartData} dataKey="sunrise" title="🌅 Sunrise Hour" />
          <WeatherChart data={chartData} dataKey="sunset" title="🌇 Sunset Hour" />

          {/* 🌫 Air (COMBINED) */}
          <WeatherChart
            data={chartData}
            dataKey="pm10"
            secondKey="pm25"
            title="🌫 PM10 & PM2.5"
          />

        </div>
      )}
    </div>
  );
}

export default History;