# 🌦 Weather Dashboard

A responsive weather dashboard built using ReactJS and the Open-Meteo API.  
This application provides real-time and historical weather insights with interactive charts and air quality data.

##  Features

### Location-Based Weather
- Automatically detects user location using browser GPS
- Displays real-time weather data for the current location

###  Current Weather (Page 1)
- Current, Minimum, and Maximum Temperature
- Relative Humidity
- Precipitation
- UV Index
- Sunrise and Sunset (IST format)
- Wind Speed and Direction
- Precipitation Probability

###  Air Quality Metrics
- PM10 and PM2.5
- Carbon Monoxide (CO)
- Nitrogen Dioxide (NO2)
- Sulphur Dioxide (SO2)

> Note: CO2 is not provided by the Open-Meteo API.

###  Hourly Charts
- Temperature (°C ⇄ °F toggle)
- Relative Humidity
- Precipitation
- Visibility
- Wind Speed (10m)
- PM10 & PM2.5 (combined chart)

### Interactive Graph Features
- Horizontal scrolling
- Zoom in / Zoom out (using Recharts Brush)

###  Historical Data (Page 2)
- Select date range (max 2 years)
- Temperature (Mean, Max, Min)
- Precipitation (total)
- Wind Speed
- Wind Direction (derived from hourly data)
- PM10 & PM2.5 trends
- Sunrise and Sunset (IST)


## Responsive Design
- Fully mobile-friendly UI
- Adaptive charts and layouts


## Tech Stack

- ReactJS
- Recharts
- Open-Meteo API
- Tailwind CSS
- Axios

## Performance

- Optimized API calls
- Efficient data mapping
- Fast rendering within required limits

---

## 📂 GitHub Repository

👉 https://github.com/gauri030789/weather-project
