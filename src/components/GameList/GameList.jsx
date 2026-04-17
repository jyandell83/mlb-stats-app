export default function GameList({ games, setSelectedGamePk }) {
  return (
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
        const venue = game.venue.name;

        console.log(game);

        return (
          <li
            key={game.gamePk}
            className="gameCard"
            onClick={() => {
              setSelectedGamePk(game.gamePk);
            }}
          >
            <div className="flex justify-evenly">
              <div className="flex flex-col align-center">
                <div className="text-lg">{away}</div>
                <div className="text-sm">
                  ({awayTeamWins} - {awayTeamLosses})
                </div>
              </div>
              <div>@</div>
              <div className="flex flex-col align-center">
                <div className="text-lg">{home}</div>
                <div className="text-sm">
                  ({homeTeamWins} - {homeTeamLosses})
                </div>
              </div>
            </div>
            <div className="score text-xl">
              {!awayScore && !homeScore ? `${awayScore} - ${homeScore}` : ""}
            </div>
            <div className="status">{status}</div>
            <div className="status">
              {gameTime} at {venue}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
