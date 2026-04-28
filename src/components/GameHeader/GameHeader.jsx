const GameHeader = ({ game }) => {
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
  return (
    <>
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
    </>
  );
};

export default GameHeader;
