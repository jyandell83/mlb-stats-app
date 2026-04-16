import { useEffect, useState } from "react";

export default function App() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];

    fetch(`https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=${today}`)
      .then((res) => res.json())
      .then((data) => {
        const allGames = data.dates?.[0]?.games || [];
        setGames(allGames);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-4 text-lg">Loading games...</div>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Today's MLB Games</h1>

      {games.length === 0 && <div>No games today.</div>}

      <ul className="space-y-3">
        {games.map((game) => {
          const home = game.teams.home.team.name;
          const away = game.teams.away.team.name;
          const homeScore = game.teams.home.score ?? "-";
          const awayScore = game.teams.away.score ?? "-";
          const status = game.status.detailedState;
          const gameTime = new Date(game.gameDate).toLocaleTimeString();

          return (
            <li
              key={game.gamePk}
              className="p-4 border rounded-xl shadow-sm"
            >
              <div className="font-semibold">
                {away} @ {home}
              </div>
              <div className="text-sm mt-1">
                Score: {awayScore} - {homeScore}
              </div>
              <div className="text-sm text-gray-500">{status}</div>
              <div className="text-sm text-gray-500">{gameTime}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
