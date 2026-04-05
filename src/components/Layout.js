import { Link, useLocation } from "react-router-dom";

function Layout({ children }) {
  const location = useLocation();

  const linkStyle = (path) =>
    `block px-4 py-2 rounded-lg mb-2 ${
      location.pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-gray-200"
    }`;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-60 bg-white shadow-lg p-4">
        <h2 className="text-xl font-bold mb-6">🌦 WeatherPro</h2>

        <Link to="/" className={linkStyle("/")}>
          Dashboard
        </Link>

        <Link to="/history" className={linkStyle("/history")}>
          History
        </Link>
      </div>
      <div className="flex-1">
        <div className="bg-white shadow px-6 py-4 flex justify-between">
          <h1 className="font-semibold text-lg">Dashboard</h1>
          <span className="text-gray-500">Live Data</span>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export default Layout;
