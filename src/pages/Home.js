import { useEffect, useState } from "react";
import { fetchWeather, fetchAirQuality } from "../services/weatherService";
import WeatherChart from "../components/WeatherChart";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Home() {
  const [coords, setCoords] = useState(null);
  const [weather, setWeather] = useState(null);
  const [air, setAir] = useState(null);
  const [activeTab, setActiveTab] = useState("temp");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState("C");

  // 📍 Get Location
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

  // 🌐 Fetch Data
  useEffect(() => {
    if (coords && selectedDate) {
      fetchWeather(coords.lat, coords.lon, selectedDate)
        .then(setWeather)
        .catch(() => setError("Weather failed"));

      fetchAirQuality(coords.lat, coords.lon)
        .then(setAir)
        .catch(() => setError("Air failed"));
    }
  }, [coords, selectedDate]);

  // 🌡 Convert temp
  const convertTemp = (temp) => {
    return unit === "F" ? (temp * 9) / 5 + 32 : temp;
  };

  // 📊 Format Data
  const chartData =
    weather?.hourly?.time?.map((time, i) => ({
      time: time.slice(11, 16),
      temp: convertTemp(weather.hourly.temperature_2m?.[i] ?? 0),
      humidity: weather.hourly.relativehumidity_2m?.[i] ?? 0,
      wind: weather.hourly.windspeed_10m?.[i] ?? 0,
      precipitation: weather.hourly.precipitation?.[i] ?? 0,
      visibility: weather.hourly.visibility?.[i] ?? 0,
      pm10: air?.hourly?.pm10?.[i] ?? 0,
      pm25: air?.hourly?.pm2_5?.[i] ?? 0,
    })) || [];

  // 🎨 Static colors
  const tabColors = {
    temp: "bg-blue-500",
    humidity: "bg-green-500",
    wind: "bg-purple-500",
    rain: "bg-indigo-500",
    pm10: "bg-gray-600",
    visibility: "bg-pink-500",
  };

  const activeColors = {
    temp: "bg-blue-700",
    humidity: "bg-green-700",
    wind: "bg-purple-700",
    rain: "bg-indigo-700",
    pm10: "bg-gray-800",
    visibility: "bg-pink-700",
  };

  return (
    <div className="space-y-6">

      {/* ERROR */}
      {error && <p className="text-red-500">{error}</p>}

      {/* 🔥 TEMP TOGGLE */}
      <div className="flex justify-between items-center">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          className="border p-2 rounded-lg"
        />

        <button
          onClick={() => setUnit(unit === "C" ? "F" : "C")}
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          °{unit}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* 🌡 LEFT PANEL */}
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-3">
          {!weather ? (
            <p className="animate-pulse">Loading...</p>
          ) : (
            <>
              <h2 className="text-5xl font-bold">
                {convertTemp(weather.hourly?.temperature_2m?.[0] ?? 0).toFixed(1)}°
                {unit}
              </h2>

              <p>💨 Wind: {weather.hourly?.windspeed_10m?.[0] ?? "--"} km/h</p>
              <p>🧭 Direction: {weather.hourly?.winddirection_10m?.[0] ?? "--"}°</p>

              <hr />

              <p>🌡 Min: {weather.daily?.temperature_2m_min?.[0] ?? "--"}</p>
              <p>🌡 Max: {weather.daily?.temperature_2m_max?.[0] ?? "--"}</p>

              <p>
                🌅 Sunrise:{" "}
                {weather.daily?.sunrise?.[0]
                  ? new Date(weather.daily.sunrise[0]).toLocaleTimeString()
                  : "--"}
              </p>

              <p>
                🌇 Sunset:{" "}
                {weather.daily?.sunset?.[0]
                  ? new Date(weather.daily.sunset[0]).toLocaleTimeString()
                  : "--"}
              </p>

              <hr />

{/* 🌡 Temperature */}
<p>🌡 Min: {weather.daily?.temperature_2m_min?.[0]}°C</p>
<p>🌡 Max: {weather.daily?.temperature_2m_max?.[0]}°C</p>

{/* 🌧 Rain */}
<p>🌧 Rain Chance: {weather.daily?.precipitation_probability_max?.[0]}%</p>

{/* ☀️ UV */}
<p>☀️ UV Index: {weather.daily?.uv_index_max?.[0]}</p>

{/* 🌅 Sun */}
<p>
  🌅 Sunrise:{" "}
  {weather.daily?.sunrise?.[0]
    ? new Date(weather.daily.sunrise[0]).toLocaleTimeString("en-IN")
    : "--"}
</p>

<p>
  🌇 Sunset:{" "}
  {weather.daily?.sunset?.[0]
    ? new Date(weather.daily.sunset[0]).toLocaleTimeString("en-IN")
    : "--"}
</p>

<hr />

{/* 🌫 Air Quality */}
<p>🌫 PM10: {air?.hourly?.pm10?.[0] ?? "N/A"}</p>
<p>🌫 PM2.5: {air?.hourly?.pm2_5?.[0] ?? "N/A"}</p>

<p>🧪 CO: {air?.hourly?.carbon_monoxide?.[0] ?? "N/A"}</p>
<p>🧪 NO2: {air?.hourly?.nitrogen_dioxide?.[0] ?? "N/A"}</p>
<p>🧪 SO2: {air?.hourly?.sulphur_dioxide?.[0] ?? "N/A"}</p>
            </>
          )}
        </div>

        {/* 📊 RIGHT PANEL */}
        <div className="lg:col-span-3">

          {/* 🔘 TABS */}
          <div className="flex flex-wrap gap-3 mb-4">
            {[
              { key: "temp", label: "Temp" },
              { key: "humidity", label: "Humidity" },
              { key: "wind", label: "Wind" },
              { key: "rain", label: "Rain" },
              { key: "pm10", label: "Air Quality" },
              { key: "visibility", label: "Visibility" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 text-white rounded-lg shadow ${
                  activeTab === tab.key
                    ? activeColors[tab.key]
                    : tabColors[tab.key]
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 📈 CHART */}
          <div className="bg-white p-4 rounded-2xl shadow-lg overflow-x-auto">

            {activeTab === "temp" && (
              <WeatherChart data={chartData} dataKey="temp" title="Temperature" />
            )}

            {activeTab === "humidity" && (
              <WeatherChart data={chartData} dataKey="humidity" title="Humidity" />
            )}

            {activeTab === "wind" && (
              <WeatherChart data={chartData} dataKey="wind" title="Wind Speed" />
            )}

            {activeTab === "rain" && (
              <WeatherChart data={chartData} dataKey="precipitation" title="Precipitation" />
            )}

            {/* 🔥 FIXED: COMBINED PM GRAPH */}
            {activeTab === "pm10" && (
              <WeatherChart
                data={chartData}
                dataKey="pm10"
                secondKey="pm25"
                title="PM10 & PM2.5"
              />
            )}

            {activeTab === "visibility" && (
              <WeatherChart data={chartData} dataKey="visibility" title="Visibility" />
            )}

          </div>

        </div>
      </div>
    </div>
  );
}

export default Home;