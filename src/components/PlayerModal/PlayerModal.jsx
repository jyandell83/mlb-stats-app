import { useEffect, useState } from "react";

import { getPlayerStats } from "../../api/mlbApi";

import "./PlayerModal.css";
import StatsTable from "../StatsTable/StatsTable";

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

  console.log(gameLogStats);
  console.log(yearByYearStats);

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
              <StatsTable
                columns={[
                  { label: "Team", key: "team" },
                  { label: "Year", key: "season" },
                  { label: "W", key: "wins" },
                  { label: "L", key: "losses" },
                  { label: "ERA", key: "era" },
                  { label: "G", key: "gamesPitched" },
                  { label: "GS", key: "gamesStarted" },
                  { label: "SV", key: "saves" },
                  { label: "IP", key: "inningsPitched" },
                  { label: "H", key: "hits" },
                  { label: "R", key: "runs" },
                  { label: "ER", key: "earnedRuns" },
                  { label: "BB", key: "baseOnBalls" },
                  { label: "SO", key: "strikeOuts" },
                  { label: "WHIP", key: "whip" },
                ]}
                rows={splits.map((split) => ({
                  team: split?.team?.name,
                  season: split?.season,
                  wins: split?.stat?.wins,
                  losses: split?.stat?.losses,
                  era: split?.stat?.era,
                  gamesPitched: split?.stat?.gamesPitched,
                  gamesStarted: split?.stat?.gamesStarted,
                  saves: split?.stat?.saves,
                  inningsPitched: split?.stat?.inningsPitched,
                  hits: split?.stat?.hits,
                  runs: split?.stat?.runs,
                  earnedRuns: split?.stat?.earnedRuns,
                  baseOnBalls: split?.stat?.baseOnBalls,
                  strikeOuts: split?.stat?.strikeOuts,
                  whip: split?.stat?.whip,
                }))}
              />
            </div>
          ) : (
            <StatsTable
              columns={[
                { label: "Team", key: "team" },
                { label: "Year", key: "season" },
                { label: "AVG", key: "avg" },
                { label: "G", key: "gamesPlayed" },
                { label: "AB", key: "atBats" },
                { label: "R", key: "runs" },
                { label: "H", key: "hits" },
                { label: "2B", key: "doubles" },
                { label: "3B", key: "triples" },
                { label: "HR", key: "homeRuns" },
                { label: "RBI", key: "rbi" },
                { label: "BB", key: "baseOnBalls" },
                { label: "SO", key: "strikeOuts" },
                { label: "SB", key: "stolenBases" },
                { label: "OBP", key: "obp" },
                { label: "SLG", key: "slg" },
                { label: "OPS", key: "ops" },
              ]}
              rows={splits.map((split) => ({
                team: split?.team?.name,
                season: split?.season,
                avg: split?.stat?.avg,
                gamesPlayed: split?.stat?.gamesPlayed,
                atBats: split?.stat?.atBats,
                runs: split?.stat?.runs,
                hits: split?.stat?.hits,
                doubles: split?.stat?.doubles,
                triples: split?.stat?.triples,
                homeRuns: split?.stat?.homeRuns,
                rbi: split?.stat?.rbi,
                baseOnBalls: split?.stat?.baseOnBalls,
                strikeOuts: split?.stat?.strikeOuts,
                stolenBases: split?.stat?.stolenBases,
                obp: split?.stat?.obp,
                slg: split?.stat?.slg,
                ops: split?.stat?.ops,
              }))}
            />
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
