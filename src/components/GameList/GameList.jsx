import { useState } from "react";

import GameCard from "../GameCard/GameCard";
import FilterSelect from "../FilterSelect/FilterSelect";

export default function GameList({
  games,
  setSelectedGamePk,
  selectedGamePk,
  handlePlayerClick,
}) {
  const [filters, setFilters] = useState({
    teams: [],
    divisions: [],
    status: [],
  });

  const handleFilterChange = (filterKey, values) => {
    setFilters((prev) => ({
      ...prev,
      [filterKey]: values,
    }));
  };

  const resetFilters = () => {
    setFilters({
      teams: [],
      divisions: [],
      status: [],
    });
  };

  const divisionNames = [
    ...new Set(
      games
        .flatMap((game) => [
          game.teams.away.team.division?.name,
          game.teams.home.team.division?.name,
        ])
        .filter(Boolean),
    ),
  ].sort();

  const teamNames = [
    ...new Set(
      games.flatMap((game) => [
        game.teams.away.team.name,
        game.teams.home.team.name,
      ]),
    ),
  ].sort();

  const statusNames = [
    ...new Set(
      games.map((game) => game.status?.abstractGameState).filter(Boolean),
    ),
  ].sort();

  const filteredGames = games.filter((game) => {
    const awayTeam = game.teams.away.team;
    const homeTeam = game.teams.home.team;

    const matchesTeam =
      filters.teams.length === 0 ||
      filters.teams.includes(homeTeam.name) ||
      filters.teams.includes(awayTeam.name);

    const matchesDivision =
      filters.divisions.length === 0 ||
      filters.divisions.includes(homeTeam.division?.name) ||
      filters.divisions.includes(awayTeam.division?.name);

    const matchesStatus =
      filters.status.length === 0 ||
      filters.status.includes(game.status?.abstractGameState);

    return matchesTeam && matchesDivision && matchesStatus;
  });

  return (
    <>
      <div className="filter">
        <div className="filters">
          <div className="filters-header">
            <h2>Filter by</h2>
            <p className="filter-hint">Hold Ctrl/Cmd to select multiple</p>
          </div>
          <div className="flex">
            <FilterSelect
              label="Team"
              options={teamNames}
              value={filters.teams}
              onChange={(values) => handleFilterChange("teams", values)}
            />

            <FilterSelect
              label="Division"
              options={divisionNames}
              value={filters.divisions}
              onChange={(values) => handleFilterChange("divisions", values)}
            />

            <FilterSelect
              label="Status"
              options={statusNames}
              value={filters.status}
              onChange={(values) => handleFilterChange("status", values)}
            />
          </div>
        </div>

        <button className="btn" type="button" onClick={resetFilters}>
          Reset Filters
        </button>
      </div>

      <ul className="gameList">
        {filteredGames.map((game) => {
          const numInnings = Math.max(game.linescore?.innings.length || 0, 9);
          const innings = Array.from({ length: numInnings }, (_, i) => {
            return game.linescore?.innings?.[i] || {};
          });

          return (
            <li
              key={game.gamePk}
              className={`gameCard ${
                selectedGamePk === game.gamePk ? "highlight" : ""
              }`}
              onClick={() => {
                setSelectedGamePk(game.gamePk);
              }}
            >
              <GameCard
                game={game}
                innings={innings}
                handlePlayerClick={handlePlayerClick}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
}
