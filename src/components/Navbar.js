import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const linkStyle = (path) =>
    `px-4 py-2 rounded-lg transition ${
      location.pathname === path
        ? "bg-white text-black"
        : "text-white hover:bg-white/20"
    }`;

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 shadow-lg flex justify-between items-center">
      <h1 className="text-white font-bold text-xl">🌦 WeatherPro</h1>

      <div className="flex gap-4">
        <Link to="/" className={linkStyle("/")}>
          Home
        </Link>
        <Link to="/history" className={linkStyle("/history")}>
          History
        </Link>
      </div>
    </div>
  );
}

export default Navbar;