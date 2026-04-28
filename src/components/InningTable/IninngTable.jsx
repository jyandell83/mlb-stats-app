const InningTable = ({ innings, game, gameDetails }) => {
  console.log(gameDetails);
  return (
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
              <td className="team-cell">
                {gameDetails?.gameData?.teams.away.abbreviation}
              </td>

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
                {gameDetails?.gameData?.teams.home.abbreviation}
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
  );
};

export default InningTable;
