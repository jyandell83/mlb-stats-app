import LeagueLeaderCard from "../../components/LeagueLeaderCard/LeagueLeaderCard";

const Leaderboards = () => {
  const leaderCards = [
    { title: "Home Runs", category: "homeRuns", statGroup: "hitting" },
    { title: "RBI", category: "runsBattedIn", statGroup: "hitting" },
    { title: "OPS", category: "ops", statGroup: "hitting" },
    { title: "ERA", category: "earnedRunAverage", statGroup: "pitching" },
    { title: "Strikeouts", category: "strikeOuts", statGroup: "pitching" },
    { title: "K/9", category: "strikeoutsPer9Inn", statGroup: "pitching" },
  ];
  return (
    <div className="leader-grid">
      {leaderCards.map((card) => (
        <LeagueLeaderCard key={card.category} {...card} />
      ))}
    </div>
  );
};

export default Leaderboards;
