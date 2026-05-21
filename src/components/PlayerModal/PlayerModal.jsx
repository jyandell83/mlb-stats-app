import { useEffect, useState } from "react";

import { getPlayerStats } from "../../api/mlbApi";

import "./PlayerModal.css";

export default function PlayerModal({ onClose, playerId, playerName }) {
  const [yearByYearStats, setYearByYearStats] = useState(null);
  const [gameLogStats, setGameLogStats] = useState(null);

  useEffect(() => {
    if (!playerId) return;

    const fetchStats = async () => {
      try {
        const [yearByYear, gameLog] = await Promise.all([
          fetch(getPlayerStats(playerId, "yearByYear")).then((res) =>
            res.json(),
          ),
          fetch(getPlayerStats(playerId, "gameLog")).then((res) => res.json()),
        ]);

        setYearByYearStats(yearByYear);
        setGameLogStats(gameLog);
      } catch (err) {
        console.error("Failed to fetch player stats:", err);
      }
    };

    fetchStats();
  }, [playerId]);

  // console.log(gameLogStats);
  // console.log(yearByYearStats);

  const splits = yearByYearStats?.stats?.[0]?.splits ?? [];

  const isPitcher =
    yearByYearStats?.stats?.[0]?.group?.displayName === "pitching";

  if (!splits) {
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
                    <th>Team</th>
                    <th>Year</th>
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
                  {splits.map((split) => {
                    return (
                      <tr>
                        <td>{split?.team?.name}</td>
                        <td>{split?.season}</td>
                        <td>{split?.stat?.wins}</td>
                        <td>{split?.stat?.losses}</td>
                        <td>{split?.stat?.era}</td>
                        <td>{split?.stat?.gamesPitched}</td>
                        <td>{split?.stat?.gamesStarted}</td>
                        <td>{split?.stat?.saves}</td>
                        <td>{split?.stat?.inningsPitched}</td>
                        <td>{split?.stat?.hits}</td>
                        <td>{split?.stat?.runs}</td>
                        <td>{split?.stat?.earnedRuns}</td>
                        <td>{split?.stat?.baseOnBalls}</td>
                        <td>{split?.stat?.strikeOuts}</td>
                        <td>{split?.stat?.whip}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <table className="stats-table">
              <thead>
                <tr>
                  <th>Team</th>
                  <th>Year</th>
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
                {splits.map((split) => {
                  return (
                    <tr>
                      <td>{split?.team?.name}</td>
                      <td>{split?.season}</td>
                      <td>{split?.stat?.avg}</td>
                      <td>{split?.stat?.gamesPlayed}</td>
                      <td>{split?.stat?.atBats}</td>
                      <td>{split?.stat?.runs}</td>
                      <td>{split?.stat?.hits}</td>
                      <td>{split?.stat?.doubles}</td>
                      <td>{split?.stat?.triples}</td>
                      <td>{split?.stat?.homeRuns}</td>
                      <td>{split?.stat?.rbi}</td>
                      <td>{split?.stat?.baseOnBalls}</td>
                      <td>{split?.stat?.strikeOuts}</td>
                      <td>{split?.stat?.stolenBases}</td>
                      <td>{split?.stat?.obp}</td>
                      <td>{split?.stat?.slg}</td>
                      <td>{split?.stat?.ops}</td>
                    </tr>
                  );
                })}
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
