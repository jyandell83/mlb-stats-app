import { useEffect, useState } from "react";

export default function App() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [highlightId, setHighlightId] = useState(null);

  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];

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

      <ul className="gameList">
        {games.map((game) => {
          const home = game.teams.home.team.name;
          const away = game.teams.away.team.name;
          const homeScore = game.teams.home.score ?? "-";
          const awayScore = game.teams.away.score ?? "-";
          const homeTeamWins = game.teams.home.leagueRecord.wins;
          const homeTeamLosses = game.teams.home.leagueRecord.losses;
          const awayTeamWins = game.teams.away.leagueRecord.wins;
          const awayTeamLosses = game.teams.away.leagueRecord.losses;
          const status = game.status.detailedState;
          const gameTime = new Date(game.gameDate).toLocaleTimeString();

          return (
            <li
              className={`gameCard ${
                highlightId === game.gamePk ? "highlight" : ""
              }`}
            >
              <div className="font-semibold">
                {away} Record: {awayTeamWins} - {awayTeamLosses} @ {home}
                Record: {homeTeamWins} - {homeTeamLosses}
              </div>
              <div className="score">
                Score: {awayScore} - {homeScore}
              </div>
              <div className="status">{status}</div>
              <div className="status">{gameTime}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
