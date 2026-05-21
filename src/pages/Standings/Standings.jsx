import { useEffect, useState } from "react";

import { getStandings } from "../../api/mlbApi";

import StatsTable from "../../components/StatsTable/StatsTable";

const Standings = () => {
  const [standings, setStandings] = useState(null);
  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const res = await fetch(getStandings());
        const data = await res.json();

        setStandings(data);
      } catch (err) {
        console.error("Failed to fetch standings:", err);
      }
    };

    fetchStandings();
  }, []);

  const divisions = standings?.records ?? [];

  const columns = [
    { label: "Team", key: "team" },
    { label: "W", key: "wins" },
    { label: "L", key: "losses" },
    { label: "PCT", key: "pct" },
    { label: "GB", key: "gamesBack" },
    { label: "L10", key: "lastTen" },
    { label: "STRK", key: "streak" },
  ];

  return (
    <>
      {divisions.map((division) => (
        <section key={division.division.id} className="standings-division card">
          <h2>{division.division.name}</h2>

          <StatsTable
            columns={columns}
            rows={division.teamRecords.map((record) => ({
              team: record.team.name,
              wins: record.wins,
              losses: record.losses,
              pct: record.winningPercentage,
              gamesBack: record.gamesBack,
              lastTen:
                record.records?.splitRecords?.find(
                  (split) => split.type === "lastTen",
                )?.wins +
                "-" +
                record.records?.splitRecords?.find(
                  (split) => split.type === "lastTen",
                )?.losses,
              streak: record.streak?.streakCode,
            }))}
          />
        </section>
      ))}
    </>
  );
};

export default Standings;
