import { useEffect, useState } from "react";

import { getPlayerStats } from "../../api/mlbApi";

import "./PlayerModal.css";

export default function PlayerModal({ onClose, playerId, playerName }) {
  const [playerDetails, setPlayerDetails] = useState(null);

  useEffect(() => {
    if (!playerId) return;

    fetch(getPlayerStats(playerId))
      .then((res) => res.json())
      .then(setPlayerDetails);
  }, [playerId]);

  console.log(playerDetails);

  const stats = playerDetails?.stats?.[0]?.splits?.[0]?.stat;
  const isPitcher =
    playerDetails?.stats?.[0]?.group?.displayName === "pitching";

  if (!stats) {
    return <div className="modal-overlay">Loading...</div>;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="title">{playerName}</h2>

          <button
            className="btn modal-close-x"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>
        <div>
          {isPitcher ? (
            <div className="pitcher-stats">
              <h3>Pitching Stats</h3>
              <table className="stats-table">
                <thead>
                  <tr>
                    <th></th>
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
                    <td>Season</td>
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
          ) : (
            <table className="stats-table">
              <thead>
                <tr>
                  <th></th>
                  <th>AVG</th>
                  <th>G</th>
                  <th>AB</th>
                  <th>R</th>
                  <th>H</th>
                  <th>2B</th>
                  <th>3B</th>
                  <th>HR</th>
                  <th>RBI</th>
                  <th>BB</th>
                  <th>SO</th>
                  <th>SB</th>
                  <th>OBP</th>
                  <th>SLG</th>
                  <th>OPS</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Season</td>
                  <td>{stats?.avg}</td>
                  <td>{stats?.gamesPlayed}</td>
                  <td>{stats?.atBats}</td>
                  <td>{stats?.runs}</td>
                  <td>{stats?.hits}</td>
                  <td>{stats?.doubles}</td>
                  <td>{stats?.triples}</td>
                  <td>{stats?.homeRuns}</td>
                  <td>{stats?.rbi}</td>
                  <td>{stats?.baseOnBalls}</td>
                  <td>{stats?.strikeOuts}</td>
                  <td>{stats?.stolenBases}</td>
                  <td>{stats?.obp}</td>
                  <td>{stats?.slg}</td>
                  <td>{stats?.ops}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
