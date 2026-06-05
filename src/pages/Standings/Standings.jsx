import { useEffect, useState } from "react";

import { getStandings } from "../../api/mlbApi";

import StatsTable from "../../components/StatsTable/StatsTable";
import Header from "../../components/Header/Header";
import FilterSection from "../../components/FilterSection/FilterSection";
import FilterSelect from "../../components/FilterSelect/FilterSelect";

const Standings = () => {
  const [standings, setStandings] = useState(null);
  const [filters, setFilters] = useState({
    leagues: [],
    divisions: [],
  });

  const handleFilterChange = (filterKey, values) => {
    setFilters((prev) => ({
      ...prev,
      [filterKey]: values,
    }));
  };

  const resetFilters = () => {
    setFilters({
      leagues: [],
      divisions: [],
    });
  };

  const divisions = standings?.records ?? [];

  const leagueNames = [
    ...new Set(
      divisions.map((division) => division.league?.name).filter(Boolean),
    ),
  ].sort();

  const divisionNames = [
    ...new Set(
      divisions.map((division) => division.division?.name).filter(Boolean),
    ),
  ].sort();

  const filteredDivisions = divisions.filter((division) => {
    const matchesLeague =
      filters.leagues.length === 0 ||
      filters.leagues.includes(division.league?.name);

    const matchesDivision =
      filters.divisions.length === 0 ||
      filters.divisions.includes(division.division?.name);

    return matchesLeague && matchesDivision;
  });
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
      <Header text="Standings" />
      <FilterSection title="Filter by" hint="Hold Ctrl/Cmd to select multiple">
        <div className="flex stack-on-mobile">
          <FilterSelect
            label="League"
            options={leagueNames}
            value={filters.leagues}
            onChange={(values) => handleFilterChange("leagues", values)}
          />

          <FilterSelect
            label="Division"
            options={divisionNames}
            value={filters.divisions}
            onChange={(values) => handleFilterChange("divisions", values)}
          />
        </div>

        <div className="flex">
          <button className="btn" type="button" onClick={resetFilters}>
            Clear Filters
          </button>
        </div>
      </FilterSection>
      {filteredDivisions.map((division) => (
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
