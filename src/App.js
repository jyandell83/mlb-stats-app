import { useEffect, useState } from "react";

import { getSchedule } from "./api/mlbApi";

import Header from "./components/Header/Header";
import GameList from "./components/GameList/GameList";
import PlayerModal from "./components/PlayerModal/PlayerModal";

export default function App() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGamePk, setSelectedGamePk] = useState(null);
  const [highlightId, setHighlightId] = useState(null);
  const [playerModalOpen, setPlayerModalOpen] = useState(false);
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  const [selectedPlayerName, setSelectedPlayerName] = useState(null);

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-CA");

  useEffect(() => {
    const fetchGames = () => {
      fetch(getSchedule(formattedDate))
        .then((res) => res.json())
        .then((data) => {
          const allGames = data.dates?.[0]?.games || [];

          /*** can i refine this to float more interesting games? */
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

  if (loading) {
    return <div className="loading">Loading games...</div>;
  }

  const handlePlayerClick = (playerName, playerId) => {
    setSelectedPlayerId(playerId);
    setSelectedPlayerName(playerName);
    setPlayerModalOpen(true);
  };

  return (
    <div className="container">
      <div>
        {playerModalOpen && (
          <PlayerModal
            playerId={selectedPlayerId}
            playerName={selectedPlayerName}
            onClose={() => setPlayerModalOpen(false)}
          />
        )}
      </div>
      <Header />

      {games.length === 0 && <div>No games today.</div>}
      <div className="flex flex-col">
        <GameList
          games={games}
          setSelectedGamePk={setSelectedGamePk}
          selectedGamePk={selectedGamePk}
          handlePlayerClick={handlePlayerClick}
        />
      </div>
    </div>
  );
}
