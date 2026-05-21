import { Routes, Route, NavLink } from "react-router-dom";

import HomeDashboard from "./pages/HomeDashboard/HomeDashboard";
import Standings from "./pages/Standings/Standings";
import Leaderboards from "./pages/Leaderboards/Leaderboards";
import Games from "./pages/Games/Games";

export default function App() {
  return (
    <>
      <nav className="top-nav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/standings">Standings</NavLink>
        <NavLink to="/leaderboards">Leaderboards</NavLink>
        <NavLink to="/games">Games</NavLink>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<HomeDashboard />} />
          <Route path="/standings" element={<Standings />} />
          <Route path="/leaderboards" element={<Leaderboards />} />
          <Route path="/games" element={<Games />} />
        </Routes>
      </main>
    </>
  );
}
