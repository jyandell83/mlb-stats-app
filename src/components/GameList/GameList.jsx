export default function GameList({ games, setSelectedGamePk, selectedGamePk }) {
  return (
    <ul className="gameList">
      {games.map((game) => {
        const home = game.teams.home.team.name;
        const away = game.teams.away.team.name;
        const homeId = game.teams.home.team.id;
        const awayId = game.teams.away.team.id;
        const homeScore = game.teams.home.score ?? "-";
        const awayScore = game.teams.away.score ?? "-";
        const homeTeamWins = game.teams.home.leagueRecord.wins;
        const homeTeamLosses = game.teams.home.leagueRecord.losses;
        const awayTeamWins = game.teams.away.leagueRecord.wins;
        const awayTeamLosses = game.teams.away.leagueRecord.losses;
        const status = game.status.detailedState;
        const gameTime = new Date(game.gameDate).toLocaleTimeString();
        const venue = game.venue.name;
        const numInnings = Math.max(game.linescore?.innings.length || 0, 9);
        const innings = Array.from({ length: numInnings }, (_, i) => {
          return game.linescore?.innings?.[i] || {};
        });

        return (
          <li
            key={game.gamePk}
            className={`gameCard ${
              selectedGamePk === game.gamePk ? "highlight" : ""
            }`}
            onClick={() => {
              setSelectedGamePk(game.gamePk);
            }}
          >
            <div className="flex justify-center">
              <div className="flex flex-col align-center">
                <img
                  src={`https://www.mlbstatic.com/team-logos/${awayId}.svg`}
                  alt="team logo"
                  className="team-logo"
                />
                <div className="text-lg">{away}</div>
                <div className="text-sm">
                  ({awayTeamWins} - {awayTeamLosses})
                </div>
              </div>
              <div>@</div>
              <div className="flex flex-col align-center">
                <img
                  src={`https://www.mlbstatic.com/team-logos/${homeId}.svg`}
                  alt="team logo"
                  className="team-logo"
                />
                <div className="text-lg">{home}</div>
                <div className="text-sm">
                  ({homeTeamWins} - {homeTeamLosses})
                </div>
              </div>
            </div>
            <div className="score text-xl">{`${awayScore} - ${homeScore}`}</div>
            <div className="status">
              {status !== "In Progress"
                ? status
                : `${game.linescore.inningState} of ${game.linescore.currentInning}`}
            </div>
            <div className="status">
              {gameTime} at {venue}
            </div>
            <div>
              <div className="inning-table-wrapper">
                <table className="inning-table w-full">
                  <thead>
                    <tr>
                      <th></th>
                      {innings.map((inning, index) => (
                        <th key={index + 1}>{index + 1}</th>
                      ))}
                      <th>R</th>
                      <th>H</th>
                      <th>E</th>
                    </tr>
                  </thead>

                  <tbody>
                    {/* Away Team */}
                    <tr>
                      <td className="team-cell">ABBR</td>

                      {innings.map((inning) => (
                        <td key={inning.num}>{inning.away?.runs}</td>
                      ))}

                      <td className="bold">
                        {game.linescore?.teams.away?.runs ?? "-"}
                      </td>
                      <td>{game.linescore?.teams.away?.hits ?? "-"}</td>
                      <td>{game.linescore?.teams.away?.errors ?? "-"}</td>
                    </tr>

                    {/* Home Team */}
                    <tr>
                      <td className="team-cell">
                        {game.teams.home.abbreviation}
                      </td>

                      {innings.map((inning) => (
                        <td key={inning.num}>{inning.home?.runs}</td>
                      ))}

                      <td className="bold">
                        {game.linescore?.teams.home?.runs ?? "-"}
                      </td>
                      <td>{game.linescore?.teams.home?.hits ?? "-"}</td>
                      <td>{game.linescore?.teams.home?.errors ?? "-"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
