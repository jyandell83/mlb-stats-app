import { useEffect, useState } from "react";

import GameList from "./components/GameList/GameList";
import GameDetail from "./components/GameDetails/GameDetail";

export default function App() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGamePk, setSelectedGamePk] = useState(null);
  const [gameDetails, setGameDetails] = useState(null);
  const [highlightId, setHighlightId] = useState(null);

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-CA");

  useEffect(() => {
    const fetchGames = () => {
      fetch(
        `https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=${formattedDate}`
      )
        .then((res) => res.json())
        .then((data) => {
          const allGames = data.dates?.[0]?.games || [];
          setGames(allGames);
          //just setting first game to highlight, eventually intention is to flash when score changes
          if (allGames.length > 0) {
            setHighlightId(allGames[0].gamePk);

            setTimeout(() => {
              setHighlightId(null);
            }, 1000);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    };

    // run immediately
    fetchGames();

    // then run every 30 sec
    const interval = setInterval(fetchGames, 30000);

    return () => clearInterval(interval);
  }, [formattedDate]);

  useEffect(() => {
    if (!selectedGamePk) return;

    const fetchDetails = () => {
      fetch(
        `https://statsapi.mlb.com/api/v1.1/game/${selectedGamePk}/feed/live`
      )
        .then((res) => res.json())
        .then(setGameDetails);
    };

    fetchDetails();
    const interval = setInterval(fetchDetails, 15000);

    return () => clearInterval(interval);
  }, [selectedGamePk]);

  if (loading) {
    return <div className="loading">Loading games...</div>;
  }

  return (
    <div className="container">
      <h1 className="title">
        MLB Games -{" "}
        {today.toLocaleDateString(undefined, {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}
      </h1>

      {games.length === 0 && <div>No games today.</div>}
      <GameList games={games} setSelectedGamePk={setSelectedGamePk} />
      <GameDetail selectedGamePk={selectedGamePk} gameDetails={gameDetails} />
    </div>
  );
}
