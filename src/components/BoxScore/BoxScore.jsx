import { useEffect, useState } from "react";

import { getBoxscore } from "../../api/mlbApi";

const BoxScore = ({ gamePk, handlePlayerClick }) => {
  const [boxScore, setBoxScore] = useState(null);
  useEffect(() => {
    const fetchBoxscore = async () => {
      try {
        const response = await fetch(getBoxscore(gamePk));

        const data = await response.json();

        setBoxScore(data);
      } catch (error) {
        console.error("Error fetching boxscore:", error);
      }
    };

    fetchBoxscore();
  }, [gamePk]);

  const awayLineup = Object.values(boxScore?.teams?.away?.players || {})
    .filter((player) => player.battingOrder)
    .sort((a, b) => Number(a.battingOrder) - Number(b.battingOrder));

  const homeLineup = Object.values(boxScore?.teams?.home?.players || {})
    .filter((player) => player.battingOrder)
    .sort((a, b) => Number(a.battingOrder) - Number(b.battingOrder));

  const homePitchers = Object.values(
    boxScore?.teams?.home?.players || {},
  ).filter(
    (player) =>
      player.stats?.pitching?.inningsPitched &&
      player.stats.pitching.inningsPitched !== "0.0",
  );

  const awayPitchers = Object.values(
    boxScore?.teams?.away?.players || {},
  ).filter(
    (player) =>
      player.stats?.pitching?.inningsPitched &&
      player.stats.pitching.inningsPitched !== "0.0",
  );

  const homeTeamStats = boxScore?.teams?.home?.teamStats;
  const awayTeamStats = boxScore?.teams?.away?.teamStats;

  return (
    <div className="flex justify-evenly">
      <div className="box-score">
        <div>{boxScore?.teams?.away.team.name}</div>
        <table className="stats-table">
          <thead>
            <tr>
              <th>Player</th>
              <th>AB</th>
              <th>R</th>
              <th>H</th>
              <th>RBI</th>
              <th>BB</th>
              <th>SO</th>
            </tr>
          </thead>

          <tbody>
            {awayLineup.map((player) => (
              <tr key={player.person.id}>
                <td>
                  <button
                    className="text-button"
                    onClick={() =>
                      handlePlayerClick(
                        player.person.fullName,
                        player.person.id,
                      )
                    }
                  >
                    {`${player.person.boxscoreName} (${player.position.abbreviation})`}
                  </button>
                </td>
                <td>{player.stats?.batting?.atBats ?? "-"}</td>
                <td>{player.stats?.batting?.runs ?? "-"}</td>
                <td>{player.stats?.batting?.hits ?? "-"}</td>
                <td>{player.stats?.batting?.rbi ?? "-"}</td>
                <td>{player.stats?.batting?.baseOnBalls ?? "-"}</td>
                <td>{player.stats?.batting?.strikeOuts ?? "-"}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td>{awayTeamStats?.batting?.atBats ?? "-"}</td>
              <td>{awayTeamStats?.batting?.runs ?? "-"}</td>
              <td>{awayTeamStats?.batting?.hits ?? "-"}</td>
              <td>{awayTeamStats?.batting?.rbi ?? "-"}</td>
              <td>{awayTeamStats?.batting?.baseOnBalls ?? "-"}</td>
              <td>{awayTeamStats?.batting?.strikeOuts ?? "-"}</td>
            </tr>
          </tfoot>
        </table>
        <table className="stats-table">
          <thead>
            <tr>
              <th>Pitcher</th>
              <th>IP</th>
              <th>H</th>
              <th>R</th>
              <th>ER</th>
              <th>BB</th>
              <th>SO</th>
            </tr>
          </thead>

          <tbody>
            {awayPitchers.map((player) => (
              <tr key={player.person.id}>
                <td>
                  <button
                    className="text-button"
                    onClick={() =>
                      handlePlayerClick(
                        player.person.fullName,
                        player.person.id,
                      )
                    }
                  >
                    {player.person.boxscoreName}
                  </button>
                </td>

                <td>{player.stats?.pitching?.inningsPitched ?? "-"}</td>
                <td>{player.stats?.pitching?.hits ?? "-"}</td>
                <td>{player.stats?.pitching?.runs ?? "-"}</td>
                <td>{player.stats?.pitching?.earnedRuns ?? "-"}</td>
                <td>{player.stats?.pitching?.baseOnBalls ?? "-"}</td>
                <td>{player.stats?.pitching?.strikeOuts ?? "-"}</td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr>
              <td></td>
              <td>{awayTeamStats?.pitching?.inningsPitched ?? "-"}</td>
              <td>{awayTeamStats?.pitching?.hits ?? "-"}</td>
              <td>{awayTeamStats?.pitching?.runs ?? "-"}</td>
              <td>{awayTeamStats?.pitching?.earnedRuns ?? "-"}</td>
              <td>{awayTeamStats?.pitching?.baseOnBalls ?? "-"}</td>
              <td>{awayTeamStats?.pitching?.strikeOuts ?? "-"}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="card">
        <div>{boxScore?.teams?.home.team.name}</div>
        <table className="stats-table">
          <thead>
            <tr>
              <th>Player</th>
              <th>AB</th>
              <th>R</th>
              <th>H</th>
              <th>RBI</th>
              <th>BB</th>
              <th>SO</th>
            </tr>
          </thead>

          <tbody>
            {homeLineup.map((player) => (
              <tr key={player.person.id}>
                <td>
                  <button
                    className="text-button"
                    onClick={() =>
                      handlePlayerClick(
                        player.person.fullName,
                        player.person.id,
                      )
                    }
                  >
                    {`${player.person.boxscoreName} (${player.position.abbreviation})`}
                  </button>
                </td>
                <td>{player.stats?.batting?.atBats ?? "-"}</td>
                <td>{player.stats?.batting?.runs ?? "-"}</td>
                <td>{player.stats?.batting?.hits ?? "-"}</td>
                <td>{player.stats?.batting?.rbi ?? "-"}</td>
                <td>{player.stats?.batting?.baseOnBalls ?? "-"}</td>
                <td>{player.stats?.batting?.strikeOuts ?? "-"}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td>{homeTeamStats?.batting?.atBats ?? "-"}</td>
              <td>{homeTeamStats?.batting?.runs ?? "-"}</td>
              <td>{homeTeamStats?.batting?.hits ?? "-"}</td>
              <td>{homeTeamStats?.batting?.rbi ?? "-"}</td>
              <td>{homeTeamStats?.batting?.baseOnBalls ?? "-"}</td>
              <td>{homeTeamStats?.batting?.strikeOuts ?? "-"}</td>
            </tr>
          </tfoot>
        </table>
        <table className="stats-table">
          <thead>
            <tr>
              <th>Pitcher</th>
              <th>IP</th>
              <th>H</th>
              <th>R</th>
              <th>ER</th>
              <th>BB</th>
              <th>SO</th>
            </tr>
          </thead>

          <tbody>
            {homePitchers.map((player) => (
              <tr key={player.person.id}>
                <td>
                  <button
                    className="text-button"
                    onClick={() =>
                      handlePlayerClick(
                        player.person.fullName,
                        player.person.id,
                      )
                    }
                  >
                    {player.person.boxscoreName}
                  </button>
                </td>

                <td>{player.stats?.pitching?.inningsPitched ?? "-"}</td>
                <td>{player.stats?.pitching?.hits ?? "-"}</td>
                <td>{player.stats?.pitching?.runs ?? "-"}</td>
                <td>{player.stats?.pitching?.earnedRuns ?? "-"}</td>
                <td>{player.stats?.pitching?.baseOnBalls ?? "-"}</td>
                <td>{player.stats?.pitching?.strikeOuts ?? "-"}</td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr>
              <td></td>
              <td>{homeTeamStats?.pitching?.inningsPitched ?? "-"}</td>
              <td>{homeTeamStats?.pitching?.hits ?? "-"}</td>
              <td>{homeTeamStats?.pitching?.runs ?? "-"}</td>
              <td>{homeTeamStats?.pitching?.earnedRuns ?? "-"}</td>
              <td>{homeTeamStats?.pitching?.baseOnBalls ?? "-"}</td>
              <td>{homeTeamStats?.pitching?.strikeOuts ?? "-"}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default BoxScore;
