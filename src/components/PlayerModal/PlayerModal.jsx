import { useEffect, useState } from "react";

import { getPlayerStats } from "../../api/mlbApi";

import "./PlayerModal.css";
import Tabs from "../Tabs/Tabs";

import SeasonStatsPlayer from "./SeasonStatsPlayer";
import GameLogStatsPlayer from "./GameLogStatsPlayer";

export default function PlayerModal({ onClose, playerId, playerName }) {
  const [yearByYearStats, setYearByYearStats] = useState(null);
  const [gameLogStats, setGameLogStats] = useState(null);
  const [activeTab, setActiveTab] = useState("yearByYear");
  const playerModalTabs = [
    { id: "yearByYear", label: "By Season" },
    { id: "gameLog", label: "Game Log" },
  ];

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

  const splits = yearByYearStats?.stats?.[0]?.splits ?? [];
  const gameLogSplits = gameLogStats?.stats?.[0]?.splits ?? [];

  const gameLogSplitsSorted = [...gameLogSplits].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

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
        <Tabs
          tabs={playerModalTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        {activeTab === "yearByYear" && (
          <SeasonStatsPlayer isPitcher={isPitcher} splits={splits} />
        )}
        {activeTab === "gameLog" && (
          <GameLogStatsPlayer
            isPitcher={isPitcher}
            splits={gameLogSplitsSorted}
          />
        )}

        <div className="modal-footer">
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
