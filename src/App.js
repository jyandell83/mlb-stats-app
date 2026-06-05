import { Routes, Route, NavLink } from "react-router-dom";
import { useState } from "react";

import HomeDashboard from "./pages/HomeDashboard/HomeDashboard";
import Standings from "./pages/Standings/Standings";
import Leaderboards from "./pages/Leaderboards/Leaderboards";
import Games from "./pages/Games/Games";

export default function App() {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme);

    document.documentElement.setAttribute("data-theme", newTheme);
  };
  return (
    <>
      <nav className="top-nav">
        <div className="nav-links">
          {/* <NavLink to="/home">Home</NavLink> */}
          <NavLink to="/standings">Standings</NavLink>
          <NavLink to="/leaderboards">Leaderboards</NavLink>
          <NavLink to="/">Games</NavLink>
        </div>

        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </nav>

      <main className="container">
        <Routes>
          <Route path="/home" element={<HomeDashboard />} />
          <Route path="/standings" element={<Standings />} />
          <Route path="/leaderboards" element={<Leaderboards />} />
          <Route path="/" element={<Games />} />
        </Routes>
      </main>
    </>
  );
}
