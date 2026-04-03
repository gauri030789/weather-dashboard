import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function TemperatureChart({ data }) {
  return (
    <div style={{
      background: "white",
      padding: "20px",
      borderRadius: "15px",
      marginTop: "20px"
    }}>
      <h3>🌡 Temperature (Hourly)</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="temp" stroke="#3b82f6" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TemperatureChart;