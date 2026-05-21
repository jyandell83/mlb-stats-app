import { Routes, Route, NavLink } from "react-router-dom";

import HomeDashboard from "./pages/HomeDashboard/HomeDashboard";
import Standings from "./pages/Standings/Standings";
import Leaderboards from "./pages/Leaderboards/Leaderboards";
import Games from "./pages/Games/Games";

export default function App() {
  return (
    <>
      <nav className="top-nav">
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/standings">Standings</NavLink>
        <NavLink to="/leaderboards">Leaderboards</NavLink>
        <NavLink to="/">Games</NavLink>
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
