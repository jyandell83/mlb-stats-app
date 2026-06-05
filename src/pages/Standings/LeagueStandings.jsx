import StatsTable from "../../components/StatsTable/StatsTable";

const LeagueStandings = ({ standings, columns }) => {
  const divisions = standings?.records ?? [];

  const getLastTen = (record) => {
    const lastTen = record.records?.splitRecords?.find(
      (split) => split.type === "lastTen",
    );

    return lastTen ? `${lastTen.wins}-${lastTen.losses}` : "-";
  };

  const leagues = divisions.reduce((acc, division) => {
    const leagueName = division.league?.name;

    if (!leagueName) return acc;

    if (!acc[leagueName]) {
      acc[leagueName] = [];
    }

    acc[leagueName].push(...division.teamRecords);

    return acc;
  }, {});

  return (
    <>
      {Object.entries(leagues).map(([leagueName, teams]) => {
        const sortedTeams = [...teams].sort(
          (a, b) => Number(b.winningPercentage) - Number(a.winningPercentage),
        );

        return (
          <section key={leagueName} className="standings-league card">
            <h2>{leagueName}</h2>

            <StatsTable
              columns={columns}
              rows={sortedTeams.map((record) => ({
                team: record.team.name,
                wins: record.wins,
                losses: record.losses,
                pct: record.winningPercentage,
                gamesBack: record.gamesBack,
                wildCardGamesBack: record.wildCardGamesBack ?? "-",
                lastTen: getLastTen(record),
                streak: record.streak?.streakCode ?? "-",
              }))}
            />
          </section>
        );
      })}
    </>
  );
};

export default LeagueStandings;
