import { useEffect, useState } from "react";

import { getSchedule, getLiveGameFeed } from "./api/mlbApi";

import GameList from "./components/GameList/GameList";
import GameDetail from "./components/GameDetails/GameDetail";
import PlayerModal from "./components/PlayerModal/PlayerModal";

export default function App() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGamePk, setSelectedGamePk] = useState(null);
  const [gameDetails, setGameDetails] = useState(null);
  const [highlightId, setHighlightId] = useState(null);
  const [playerModalOpen, setPlayerModalOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-CA");

  useEffect(() => {
    const fetchGames = () => {
      console.log("fetch games function");

      fetch(getSchedule(formattedDate))
        .then((res) => res.json())
        .then((data) => {
          const allGames = data.dates?.[0]?.games || [];

          /*** new functions to clean up/ test tomorrow, getPriority and sortGames */
          const getPriority = (game) => {
            const state = game.status?.detailedState;

            if (state === "In Progress") return 0;
            if (state === "Scheduled" || state === "Pre-Game") return 1;
            if (state === "Final") return 2;

            return 3; // fallback (delays, unknown states)
          };
          const sortGames = (games) => {
            return [...games].sort((a, b) => {
              const priorityDiff = getPriority(a) - getPriority(b);
              if (priorityDiff !== 0) return priorityDiff;

              // If both are live → sort by inning
              const inningA = a.linescore?.currentInning ?? 0;
              const inningB = b.linescore?.currentInning ?? 0;

              return inningB - inningA;
            });
          };
          setGames(sortGames(allGames));
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
      fetch(getLiveGameFeed(selectedGamePk))
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

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
    setPlayerModalOpen(true);
  };

  return (
    <div className="container">
      <div>
        <button onClick={() => setPlayerModalOpen(true)}>Open Modal</button>

        {playerModalOpen && (
          <PlayerModal
            player={selectedPlayer}
            onClose={() => setPlayerModalOpen(false)}
          />
        )}
      </div>
      <h1 className="title">
        MLB Games -{" "}
        {today.toLocaleDateString(undefined, {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}
      </h1>

      {games.length === 0 && <div>No games today.</div>}
      <div className="flex">
        <GameList
          games={games}
          setSelectedGamePk={setSelectedGamePk}
          selectedGamePk={selectedGamePk}
        />
        <GameDetail
          handlePlayerClick={handlePlayerClick}
          selectedGamePk={selectedGamePk}
          gameDetails={gameDetails}
        />
      </div>
    </div>
  );
}
