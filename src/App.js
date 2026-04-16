import { useEffect, useState } from "react";

export default function App() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=${formattedDate}`)
      .then((res) => res.json())
      .then((data) => {
        const allGames = data.dates?.[0]?.games || [];
        setGames(allGames);
        setLoading(false);
        console.log("refreshed");
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
    }, 30000); // every 30 sec
  
    return () => clearInterval(interval);
  }, [formattedDate]);

  // useEffect(() => {
    
  //   fetch(`https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=${formattedDate}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const allGames = data.dates?.[0]?.games || [];
  //       setGames(allGames);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       setLoading(false);
  //     });
  // }, [formattedDate]);

  if (loading) {
    return <div className="loading">Loading games...</div>;
  }

  return (
    <div className="container">
      <h1 className="title">MLB Games - {today.toLocaleDateString(undefined, {
  weekday: "long",
  month: "long",
  day: "numeric",
})}</h1>

      {games.length === 0 && <div>No games today.</div>}

      <ul className="gameList">
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
              className="gameCard"
            >
              <div className="font-semibold">
                {away} @ {home}
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
