import { useEffect, useState } from "react";

import { getPlayerStats } from "../../api/mlbApi";

export default function PlayerModal({ onClose, playerId, playerName }) {
  const [playerDetails, setPlayerDetails] = useState(null);

  useEffect(() => {
    if (!playerId) return;

    fetch(getPlayerStats(playerId))
      .then((res) => res.json())
      .then(setPlayerDetails);
  }, [playerId]);

  const stats = playerDetails?.stats?.[0]?.splits?.[0]?.stat;

  if (!stats) {
    return <div className="modal-overlay">Loading...</div>;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{playerName}</h2>
        <div className="pitcher-stats">
          <h3>Pitching Stats</h3>

          <table className="stats-table">
            <thead>
              <tr>
                <th>W</th>
                <th>L</th>
                <th>ERA</th>
                <th>G</th>
                <th>GS</th>
                <th>SV</th>
                <th>IP</th>
                <th>H</th>
                <th>R</th>
                <th>ER</th>
                <th>BB</th>
                <th>SO</th>
                <th>WHIP</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{stats?.wins}</td>
                <td>{stats?.losses}</td>
                <td>{stats?.era}</td>
                <td>{stats?.gamesPitched}</td>
                <td>{stats?.gamesStarted}</td>
                <td>{stats?.saves}</td>
                <td>{stats?.inningsPitched}</td>
                <td>{stats?.hits}</td>
                <td>{stats?.runs}</td>
                <td>{stats?.earnedRuns}</td>
                <td>{stats?.baseOnBalls}</td>
                <td>{stats?.strikeOuts}</td>
                <td>{stats?.whip}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
