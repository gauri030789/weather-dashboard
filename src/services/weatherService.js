import axios from "axios";

// 🌦 WEATHER (DATE BASED)
export const fetchWeather = async (lat, lon, date) => {
  const formattedDate = date.toISOString().split("T")[0];

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,precipitation,windspeed_10m,winddirection_10m,visibility&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max,windspeed_10m_max&start_date=${formattedDate}&end_date=${formattedDate}`;

  const res = await axios.get(url);
  return res.data;
};

// 🌫 AIR QUALITY
export const fetchAirQuality = async (lat, lon) => {
  const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&hourly=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide`;

  const res = await axios.get(url);
  return res.data;
};

// 📊 HISTORY WEATHER (FIXED)
export const fetchHistoricalWeather = async (lat, lon, startDate, endDate) => {
  const start = startDate.toISOString().split("T")[0];
  const end = endDate.toISOString().split("T")[0];

  const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${start}&end_date=${end}&daily=temperature_2m_max,temperature_2m_min,windspeed_10m_max,precipitation_sum,sunrise,sunset&hourly=winddirection_10m`;

  const res = await axios.get(url);
  return res.data;
};

// 📊 HISTORY AIR
export const fetchHistoricalAir = async (lat, lon, startDate, endDate) => {
  const start = startDate.toISOString().split("T")[0];
  const end = endDate.toISOString().split("T")[0];

  const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&start_date=${start}&end_date=${end}&hourly=pm10,pm2_5`;

  const res = await axios.get(url);
  return res.data;
};