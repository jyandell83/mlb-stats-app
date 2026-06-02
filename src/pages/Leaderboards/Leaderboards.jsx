import LeagueLeaderCard from "../../components/LeagueLeaderCard/LeagueLeaderCard";
import Tabs from "../../components/Tabs/Tabs";

import { useState } from "react";

const Leaderboards = () => {
  const [range, setRange] = useState("season");
  const [activeTab, setActiveTab] = useState("hitting");
  const leaderboardTabs = [
    { id: "hitting", label: "Hitting" },
    { id: "pitching", label: "Pitching" },
  ];
  const leaderCards = [
    { title: "Home Runs", category: "homeRuns", statGroup: "hitting" },
    { title: "RBI", category: "runsBattedIn", statGroup: "hitting" },
    { title: "OPS", category: "ops", statGroup: "hitting" },
    { title: "Wins", category: "wins", statGroup: "pitching" },
    { title: "ERA", category: "earnedRunAverage", statGroup: "pitching" },
    { title: "Strikeouts", category: "strikeOuts", statGroup: "pitching" },
    { title: "K/9", category: "strikeoutsPer9Inn", statGroup: "pitching" },
  ];
  const hittingLeaders = leaderCards.filter(
    (card) => card.statGroup === "hitting",
  );

  const pitchingLeaders = leaderCards.filter(
    (card) => card.statGroup === "pitching",
  );
  const leaderRanges = [
    { label: "Season", value: "season" },
    { label: "Last 7 Days", value: "last7" },
    { label: "Last 30 Days", value: "last30" },
  ];
  return (
    <>
      <select value={range} onChange={(e) => setRange(e.target.value)}>
        {leaderRanges.map((range) => (
          <option key={range.value} value={range.value}>
            {range.label}
          </option>
        ))}
      </select>
      <section className="leaderboards">
        <h1>Leaderboards</h1>

        <Tabs
          tabs={leaderboardTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {activeTab === "hitting" && (
          <div className="leader-grid">
            {hittingLeaders.map((card) => (
              <LeagueLeaderCard key={card.category} {...card} range={range} />
            ))}
          </div>
        )}

        {activeTab === "pitching" && (
          <div className="leader-grid">
            {pitchingLeaders.map((card) => (
              <LeagueLeaderCard key={card.category} {...card} range={range} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Leaderboards;
