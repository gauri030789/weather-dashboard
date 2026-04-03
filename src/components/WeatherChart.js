import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Brush,
} from "recharts";

function WeatherChart({ data, dataKey, secondKey, title }) {
  return (
    <div
      className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-4 shadow-xl 
      transition duration-300 hover:scale-105 hover:shadow-2xl overflow-x-auto"
    >
      <h3 className="mb-3 font-semibold text-lg">{title}</h3>

      {/* Scroll wrapper */}
      <div style={{ minWidth: "600px" }}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="time" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />

            {/* 🔥 MAIN LINE */}
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke="#38bdf8"
              strokeWidth={2}
              dot={false}
            />

            {/* 🔥 SECOND LINE (PM etc.) */}
            {secondKey && (
              <Line
                type="monotone"
                dataKey={secondKey}
                stroke="#22c55e"
                strokeWidth={2}
                dot={false}
              />
            )}

            {/* 🔥 ZOOM FEATURE */}
            <Brush
              dataKey="time"
              height={30}
              stroke="#8884d8"
              travellerWidth={10}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default WeatherChart;