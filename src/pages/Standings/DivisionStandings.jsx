import { useState } from "react";

import FilterSection from "../../components/FilterSection/FilterSection";
import FilterSelect from "../../components/FilterSelect/FilterSelect";
import StatsTable from "../../components/StatsTable/StatsTable";

const DivisionStandings = ({ standings, columns }) => {
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

  return (
    <>
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

export default DivisionStandings;
