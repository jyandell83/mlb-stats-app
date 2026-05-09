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
        </table>
      </div>
    </div>
  );
};

export default BoxScore;
