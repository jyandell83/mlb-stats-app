import LeagueLeaderCard from "../../components/LeagueLeaderCard/LeagueLeaderCard";

import { useState } from "react";

const Leaderboards = () => {
  const [range, setRange] = useState("season");
  const leaderCards = [
    { title: "Home Runs", category: "homeRuns", statGroup: "hitting" },
    { title: "RBI", category: "runsBattedIn", statGroup: "hitting" },
    { title: "OPS", category: "ops", statGroup: "hitting" },
    { title: "Wins", category: "wins", statGroup: "pitching" },
    { title: "ERA", category: "earnedRunAverage", statGroup: "pitching" },
    { title: "Strikeouts", category: "strikeOuts", statGroup: "pitching" },
    { title: "K/9", category: "strikeoutsPer9Inn", statGroup: "pitching" },
  ];
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
      <div className="leader-grid">
        {leaderCards.map((card) => (
          <LeagueLeaderCard key={card.category} {...card} range={range} />
        ))}
      </div>
    </>
  );
};

export default Leaderboards;
